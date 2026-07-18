import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Platform,
  Image,
  Animated,
  Easing,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';

// ---- Token system -------------------------------------------------------
// Each venue gets its own "flavour" accent — the palette reads like a
// scoreboard rather than a generic category system.
const SPORTS = [
  {
    id: 'badminton',
    name: 'Badminton Court',
    tag: 'Indoor Courts',
    description:
      "Fast rallies, faster footwork. The indoor courts stay booked from early morning smashes to late-night doubles with the hostel crew.",
    icon: 'tennisball-outline',
    accent: '#4FD1C5',
    image: require('../assets/cos.avif'),
  },
  {
    id: 'football',
    name: 'Football Ground',
    tag: 'Open Field',
    description:
      "The main turf for five-a-side evenings, department leagues and the odd impromptu match that turns into a two-hour tournament.",
    icon: 'football-outline',
    accent: '#5CC26E',
    image: require('../assets/cos.avif'),
  },
  {
    id: 'basketball',
    name: 'Basketball Ground',
    tag: 'Outdoor Court',
    description:
      "Half-court pickup games at sunset, full-court runs on weekends — the hoop lights up campus energy long after classes end.",
    icon: 'basketball-outline',
    accent: '#F0563C',
    image: require('../assets/cos.avif'),
  },
  {
    id: 'swimming',
    name: 'Swimming Pool',
    tag: 'Aquatics',
    description:
      "Laps before breakfast or a cool-off after a brutal exam week — the pool is campus's reset button, chlorine and all.",
    icon: 'water-outline',
    accent: '#4C9BE8',
    image: require('../assets/cos.avif'),
  },
];

const NOTCH_COUNT = 14;

export default function SportsScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const theme = route.params?.theme;

  const bgColor = theme?.bgGradient?.[0] || '#020B18';

  // --- Entrance + back-navigation animation (matches sibling screens) ---
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const isNavigating = useRef(false);

  // Staggered card entrance
  const cardFade = useRef(SPORTS.map(() => new Animated.Value(0))).current;
  const cardSlide = useRef(SPORTS.map(() => new Animated.Value(18))).current;
  const scaleAnims = useRef(SPORTS.map(() => new Animated.Value(1))).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();

    Animated.stagger(
      100,
      SPORTS.map((_, i) =>
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
          colors={theme?.bgGradient || ['#020B18', '#061528', '#041220']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
              <Ionicons name="arrow-back" size={24} color={theme?.textPrimary} />
            </TouchableOpacity>

            <Text style={[styles.eyebrow, { color: theme?.accent }]}>
              ✦  CAMPUS SPORTS  ✦
            </Text>
            <Text style={[styles.heroTitle, { color: theme?.textPrimary }]}>
              Game{'\n'}
              <Text style={{ color: theme?.accent }}>Zones</Text>
            </Text>
            <Text style={[styles.heroSubtitle, { color: theme?.textSecondary }]}>
              Four arenas, one campus — pick your game.
            </Text>

            {/* ---- VENUE CARDS ---- */}
            <View style={styles.list}>
              {SPORTS.map((item, index) => (
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
                    style={[
                      styles.card,
                      {
                        borderColor: `${item.accent}55`,
                        shadowColor: item.accent,
                      },
                    ]}
                  >
                    {/* Photo */}
                    <View style={styles.photoWrap}>
                      <Image source={item.image} style={styles.photo} />
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
                        <Ionicons name={item.icon} size={15} color={item.accent} />
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
                      intensity={140}
                      tint="dark"
                      experimentalBlurMethod="dimezisBlurView"
                      style={[
                        styles.panel,
                        { backgroundColor: 'rgba(255,255,255,0.04)' },
                      ]}
                    >
                      <View style={styles.panelHeaderRow}>
                        <Text style={[styles.stallName, { color: item.accent }]}>
                          {item.name}
                        </Text>
                      </View>
                      <Text style={[styles.description, { color: theme?.textSecondary }]}>
                        {item.description}
                      </Text>
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
});