import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Platform,
  Animated,
  Easing,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import Icon from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Feather from '@expo/vector-icons/Feather';

const fallbackTheme = {
  bgGradient: ['#020B18', '#061528', '#041220'],
  textPrimary: '#FFFFFF',
  textSecondary: '#D5DDF0',
  accent: '#2F80FF',
  cardBg: '#0A1A2E',
};

const NOTCH_COUNT = 14;

// Small helper so a facility list can mix icon families without littering
// the JSX with conditionals.
const FacilityIcon = ({ lib, name, size, color }) => {
  if (lib === 'feather') return <Feather name={name} size={size} color={color} />;
  return <MaterialCommunityIcons name={name} size={size} color={color} />;
};

export default function HostelsScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const theme = route.params?.theme || fallbackTheme;

  const bgColor = theme.bgGradient?.[0] || '#020B18';

  // ---- Wing data ---------------------------------------------------------
  // Each wing gets its own accent, mirroring the "flavour per venue" system
  // used on the Sports screen.
  const HOSTELS = [
    {
      id: 'boys',
      name: 'Boys Hostel',
      tag: 'Brotherhood Wing',
      description:
        'Built for comfort, made for brotherhood — late-night mess runs, early gym sessions and a room that always feels like home base.',
      icon: 'man-outline',
      accent: theme.accent,
      image: require('../assets/cos.avif'),
      route: 'Boys',
      facilities: [
        { lib: 'feather', name: 'wifi', label: 'Wi-Fi' },
        { lib: 'mci', name: 'silverware-fork-knife', label: 'Mess' },
        { lib: 'mci', name: 'dumbbell', label: 'Gym' },
      ],
    },
    {
      id: 'girls',
      name: 'Girls Hostel',
      tag: 'Sisterhood Wing',
      description:
        'A space to thrive and a community to grow — cozy common rooms, warm mess evenings and friendships that outlast the degree.',
      icon: 'woman-outline',
      accent: '#A86CFF',
      image: require('../assets/cos.avif'),
      route: 'Girls',
      facilities: [
        { lib: 'feather', name: 'wifi', label: 'Wi-Fi' },
        { lib: 'mci', name: 'silverware-fork-knife', label: 'Mess' },
        { lib: 'mci', name: 'sofa-outline', label: 'Common Room' },
      ],
    },
  ];

  // --- Entrance + back-navigation animation (matches sibling screens) ---
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const isNavigating = useRef(false);

  // Staggered entrance for the two wing cards
  const ITEM_COUNT = HOSTELS.length;
  const cardFade = useRef(
    Array.from({ length: ITEM_COUNT }, () => new Animated.Value(0))
  ).current;
  const cardSlide = useRef(
    Array.from({ length: ITEM_COUNT }, () => new Animated.Value(18))
  ).current;
  const scaleAnims = useRef(
    HOSTELS.map(() => new Animated.Value(1))
  ).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();

    Animated.stagger(
      100,
      cardFade.map((_, i) =>
        Animated.parallel([
          Animated.timing(cardFade[i], {
            toValue: 1,
            duration: 420,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
          Animated.timing(cardSlide[i], {
            toValue: 0,
            duration: 420,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
        ])
      )
    ).start();
  }, []);

  const handleBack = () => {
    if (isNavigating.current) return;
    isNavigating.current = true;

    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 250,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      navigation.goBack();
    });
  };

  const pressIn = (i) =>
    Animated.spring(scaleAnims[i], {
      toValue: 0.97,
      speed: 24,
      bounciness: 4,
      useNativeDriver: true,
    }).start();

  const pressOut = (i) =>
    Animated.spring(scaleAnims[i], {
      toValue: 1,
      speed: 18,
      bounciness: 6,
      useNativeDriver: true,
    }).start();

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent={Platform.OS === 'android'}
      />
      <Animated.View
        style={[
          styles.flexOne,
          {
            opacity: fadeAnim,
            transform: [
              {
                translateY: slideAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 300],
                }),
              },
            ],
          },
        ]}
      >
        <LinearGradient
          colors={theme.bgGradient || ['#020B18', '#061528', '#041220']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
              <Icon name="arrow-back" size={24} color={theme.textPrimary} />
            </TouchableOpacity>

            <Text style={[styles.eyebrow, { color: theme.accent }]}>
              ✦  CAMPUS HOSTELS  ✦
            </Text>
            <Text style={[styles.heroTitle, { color: theme.textPrimary }]}>
              Hostel{'\n'}
              <Text style={{ color: theme.accent }}>Wings</Text>
            </Text>
            <Text style={[styles.heroSubtitle, { color: theme.textSecondary }]}>
              Boys' and Girls' hostels on campus.
            </Text>

            {/* ---- WING CARDS ---- */}
            <View style={styles.list}>
              {HOSTELS.map((item, index) => (
                <Animated.View
                  key={item.id}
                  style={{
                    opacity: cardFade[index],
                    transform: [
                      { translateY: cardSlide[index] },
                      { scale: scaleAnims[index] },
                    ],
                  }}
                >
                  <TouchableOpacity
                    activeOpacity={0.92}
                    onPressIn={() => pressIn(index)}
                    onPressOut={() => pressOut(index)}
                    onPress={() => navigation.navigate(item.route, { theme })}
                    style={[
                      styles.card,
                      {
                        borderColor: 'rgba(255,255,255,0.22)',
                        shadowColor: item.accent,
                      },
                    ]}
                  >
                    {/* Photo */}
                    <View style={styles.photoWrap}>
                      <Image source={item.image} style={styles.photo} />

                      {/* Faint colour wash so the glass reads as tinted, not clear */}
                      <LinearGradient
                        colors={[`${item.accent}33`, 'transparent']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0.8 }}
                        style={StyleSheet.absoluteFill}
                        pointerEvents="none"
                      />

                      <LinearGradient
                        colors={['transparent', 'rgba(3,8,18,0.85)']}
                        style={styles.photoFade}
                        pointerEvents="none"
                      />

                      {/* Floating tag chip */}
                      <View
                        style={[
                          styles.tagChip,
                          { borderColor: item.accent, backgroundColor: 'rgba(6,14,26,0.55)' },
                        ]}
                      >
                        <Icon name={item.icon} size={15} color={item.accent} />
                        <Text style={[styles.tagChipText, { color: item.accent }]}>
                          {item.tag}
                        </Text>
                      </View>
                    </View>

                    {/* Torn-ticket perforation seam */}
                    <View style={styles.seamRow} pointerEvents="none">
                      {Array.from({ length: NOTCH_COUNT }).map((_, n) => (
                        <View
                          key={n}
                          style={[styles.notch, { backgroundColor: bgColor }]}
                        />
                      ))}
                    </View>

                    {/* Glass description panel */}
                    <BlurView
                      intensity={160}
                      tint="dark"
                      experimentalBlurMethod="dimezisBlurView"
                      style={[
                        styles.panel,
                        {
                          backgroundColor: 'rgba(255,255,255,0.07)',
                          borderTopColor: 'rgba(255,255,255,0.16)',
                        },
                      ]}
                    >
                      <View style={styles.panelHeaderRow}>
                        <Text style={[styles.stallName, { color: item.accent }]}>
                          {item.name}
                        </Text>
                      </View>
                      <Text style={[styles.description, { color: theme.textSecondary }]}>
                        {item.description}
                      </Text>

                      <View style={[styles.facilityDivider, { backgroundColor: `${item.accent}40` }]} />

                      <View style={styles.facilityRow}>
                        {item.facilities.map((f) => (
                          <View key={f.name} style={styles.facilityItem}>
                            <FacilityIcon lib={f.lib} name={f.name} size={18} color={item.accent} />
                            <Text style={[styles.facilityText, { color: theme.textPrimary }]}>
                              {f.label}
                            </Text>
                          </View>
                        ))}
                      </View>
                    </BlurView>
                  </TouchableOpacity>
                </Animated.View>
              ))}
            </View>
          </ScrollView>
        </LinearGradient>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  flexOne: { flex: 1 },
  gradient: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 22,
    paddingTop: 55,
    paddingBottom: 40,
  },
  backButton: {
    marginBottom: 24,
    width: 32,
  },
  eyebrow: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 3,
    marginBottom: 6,
  },
  heroTitle: {
    fontFamily: 'Baloo2_800ExtraBold',
    fontSize: 42,
    lineHeight: 46,
    letterSpacing: 0.5,
  },
  heroSubtitle: {
    marginTop: 12,
    fontSize: 15,
    lineHeight: 22,
    maxWidth: '85%',
  },

  list: {
    marginTop: 28,
    gap: 26,
  },

  card: {
    borderRadius: 26,
    borderWidth: 1,
    overflow: 'hidden',
    shadowOpacity: 0.3,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 8,
  },

  photoWrap: {
    height: 190,
    width: '100%',
    position: 'relative',
  },
  photo: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  photoFade: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '55%',
  },
  tagChip: {
    position: 'absolute',
    left: 14,
    bottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 18,
    borderWidth: 1,
  },
  tagChipText: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.4,
  },

  // Perforation strip: a row of small circles cut from the page background,
  // sitting on the seam between photo and glass panel — the ticket-tear motif.
  seamRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 6,
    marginTop: -9,
    marginBottom: -9,
    zIndex: 2,
  },
  notch: {
    width: 14,
    height: 18,
    borderRadius: 9,
  },

  panel: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
    borderTopWidth: 1,
  },
  panelHeaderRow: {
    marginBottom: 8,
  },
  stallName: {
    fontFamily: 'Baloo2_800ExtraBold',
    fontSize: 22,
    letterSpacing: 0.3,
  },
  description: {
    fontSize: 14,
    lineHeight: 21,
  },
  facilityDivider: {
    height: 1,
    marginTop: 16,
    marginBottom: 14,
  },
  facilityRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  facilityItem: {
    alignItems: 'center',
    gap: 4,
  },
  facilityText: {
    fontSize: 11,
    fontWeight: '600',
  },
});