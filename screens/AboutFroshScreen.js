import React, { useRef, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Image,
  Animated,
  Easing,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import Icon from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const fallbackTheme = {
  bgGradient: ['#020B18', '#061528', '#041220'],
  textPrimary: '#FFFFFF',
  textSecondary: '#D5DDF0',
  cardBg: '#0A1A2E',
  accent: '#2F80FF',
  lineColor: 'rgba(255,255,255,0.12)',
};

const BRAND_PURPLE = '#2F80FF';
const BRAND_BLUE = '#4FA3FF';

export default function AboutFroshScreen({ theme: themeProp }) {
  const navigation = useNavigation();
  const route = useRoute();

  const t = themeProp || route.params?.theme || fallbackTheme;
  const isDarkTheme = t.textPrimary?.toUpperCase() === '#FFFFFF';

  // --- Animations ---
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const isNavigating = useRef(false);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
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

  const bgColor = t.bgGradient?.[0] || '#020B18';

  const glassBg = isDarkTheme
    ? 'rgba(255, 255, 255, 0.05)'
    : 'rgba(255, 255, 255, 0.35)';
  const glassBorder = isDarkTheme
    ? 'rgba(255, 255, 255, 0.2)'
    : 'rgba(255, 255, 255, 0.7)';
  const glassSheen = isDarkTheme
    ? ['rgba(255,255,255,0.14)', 'rgba(255,255,255,0)']
    : ['rgba(255,255,255,0.55)', 'rgba(255,255,255,0)'];

  return (
    <View style={{ flex: 1, backgroundColor: bgColor }}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={isDarkTheme ? 'light-content' : 'dark-content'}
      />
      <Animated.View
        style={[
          {
            flex: 1,
            backgroundColor: bgColor,
            opacity: fadeAnim,
          },
          {
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
        <LinearGradient colors={t.bgGradient} style={styles.container}>
          <SafeAreaView style={{ flex: 1 }}>
            {/* Header */}
            <View style={styles.header}>
              <TouchableOpacity style={styles.iconBtn} onPress={handleBack}>
                <Icon name="arrow-back" size={24} color={t.textPrimary} />
              </TouchableOpacity>

              <View style={styles.titleRow}>
                <View style={[styles.dot, { backgroundColor: BRAND_PURPLE }]} />
                <Text style={[styles.title, { color: t.textPrimary }]}>ABOUT FROSH</Text>
                <View style={[styles.dot, { backgroundColor: BRAND_PURPLE }]} />
              </View>

              <TouchableOpacity style={[styles.iconBtn, styles.infoBtn, { borderColor: BRAND_PURPLE }]}>
                <Icon name="information-circle-outline" size={22} color={BRAND_PURPLE} />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
              <BlurView
                intensity={300}
                tint={isDarkTheme ? 'dark' : 'light'}
                experimentalBlurMethod="dimezisBlurView"
                style={[
                  styles.bigCard,
                  { backgroundColor: glassBg, borderColor: glassBorder, shadowColor: BRAND_PURPLE },
                ]}
              >
                <LinearGradient
                  colors={glassSheen}
                  start={{ x: 0.5, y: 0 }}
                  end={{ x: 0.5, y: 1 }}
                  style={styles.glassSheen}
                  pointerEvents="none"
                />
                {/* Logo */}
                <View style={styles.logoContainer}>
                  <Image source={require('../assets/logo.png')} style={styles.logoImage} />
                </View>

                {/* Divider */}
                <View style={styles.dividerRow}>
                  <View style={[styles.dividerLine, { backgroundColor: t.lineColor }]} />
                  <Icon name="sparkles" size={16} color={BRAND_PURPLE} style={{ marginHorizontal: 10 }} />
                  <View style={[styles.dividerLine, { backgroundColor: t.lineColor }]} />
                </View>

                {/* Who We Are */}
                <View style={styles.sectionRow}>
                  <View style={[styles.sectionIconCircle, { borderColor: BRAND_PURPLE }]}>
                    <Icon name="people" size={22} color={BRAND_PURPLE} />
                  </View>
                  <View style={styles.sectionTextContainer}>
                    <Text style={[styles.sectionTitle, { color: BRAND_PURPLE }]}>Who We Are</Text>
                    <Text style={[styles.sectionBody, { color: t.textSecondary }]}>
                      Frosh is the official cultural and student engagement committee of TIET. We
                      are a vibrant community of dreamers, doers and creators who believe in
                      turning ideas into unforgettable experiences.
                    </Text>
                  </View>
                </View>

                {/* What We Do */}
                <View style={styles.sectionRow}>
                  <View style={[styles.sectionIconCircle, { borderColor: BRAND_PURPLE }]}>
                    <Icon name="star-outline" size={22} color={BRAND_PURPLE} />
                  </View>
                  <View style={styles.sectionTextContainer}>
                    <Text style={[styles.sectionTitle, { color: BRAND_PURPLE }]}>What We Do</Text>
                    <Text style={[styles.sectionBody, { color: t.textSecondary }]}>
                      From curating exciting events to celebrating talent and building
                      connections, we work to enrich student life beyond the classroom.
                    </Text>
                  </View>
                </View>

                {/* Our Mission */}
                <View style={styles.sectionRow}>
                  <View style={[styles.sectionIconCircle, { borderColor: BRAND_PURPLE }]}>
                    <MaterialCommunityIcons name="target" size={22} color={BRAND_PURPLE} />
                  </View>
                  <View style={styles.sectionTextContainer}>
                    <Text style={[styles.sectionTitle, { color: BRAND_PURPLE }]}>Our Mission</Text>
                    <Text style={[styles.sectionBody, { color: t.textSecondary }]}>
                      To inspire creativity, encourage collaboration and create a platform where
                      every student feels seen, heard and valued.
                    </Text>
                  </View>
                </View>

                {/* Quote */}
                <View style={[styles.quoteCard, { borderColor: BRAND_PURPLE }]}>
                  <Text style={[styles.quoteMark, { color: BRAND_PURPLE }]}>{'\u201C'}</Text>
                  <View style={styles.quoteTextContainer}>
                    <Text style={[styles.quoteText, { color: t.textPrimary }]}>
                      Frosh is not just a committee, it's a movement. It's where memories are made.
                    </Text>
                  </View>
                  <Icon name="compass-outline" size={30} color={BRAND_PURPLE} style={styles.quoteCompass} />
                </View>
              </BlurView>
            </ScrollView>
          </SafeAreaView>
        </LinearGradient>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  // ... (unchanged)
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 50,
    paddingVertical: 8,
  },
  titleRow: { flexDirection: 'row', alignItems: 'center' },
  dot: { width: 6, height: 6, borderRadius: 3, marginHorizontal: 8 },
  title: { fontSize: 18, fontWeight: '800', letterSpacing: 3 },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
    paddingTop: 8,
  },
  bigCard: {
    borderRadius: 28,
    borderWidth: 1,
    padding: 22,
    overflow: 'hidden',
    shadowOpacity: 0.35,
    shadowRadius: 28,
    shadowOffset: { width: 0, height: 12 },
    elevation: 16,
  },
  glassSheen: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '35%',
    borderTopLeftRadius: 27,
    borderTopRightRadius: 27,
  },
  logoContainer: { alignItems: 'center', marginVertical: 0 },
  logoImage: { width: 200, height: 100, resizeMode: 'contain' },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  dividerLine: { flex: 1, height: 1 },
  sectionRow: {
    flexDirection: 'row',
    marginBottom: 18,
  },
  sectionIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  sectionTextContainer: { flex: 1 },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 4,
  },
  sectionBody: {
    fontSize: 14,
    lineHeight: 21,
  },
  quoteCard: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 22,
  },
  quoteMark: {
    fontSize: 40,
    fontWeight: '900',
    marginRight: 8,
    marginTop: -12,
  },
  quoteTextContainer: { flex: 1 },
  quoteText: {
    fontSize: 15,
    lineHeight: 22,
    fontStyle: 'italic',
  },
  quoteCompass: { marginLeft: 10 },
});