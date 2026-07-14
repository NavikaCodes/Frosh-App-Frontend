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

  // --- Fade‑in animation ---
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={isDarkTheme ? 'light-content' : 'dark-content'}
      />
      <LinearGradient colors={t.bgGradient} style={styles.container}>
        <SafeAreaView style={{ flex: 1 }}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.goBack()}>
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
            <View
              style={[
                styles.bigCard,
                { backgroundColor: t.cardBg, borderColor: BRAND_PURPLE, shadowColor: BRAND_PURPLE },
              ]}
            >
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

            </View>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  // ... (styles exactly as before, unchanged)
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
    shadowOpacity: 0.35,
    shadowRadius: 28,
    shadowOffset: { width: 0, height: 12 },
    elevation: 16,
  },
  logoContainer: {
    alignItems: 'center',
    marginVertical: 0,
  },
  logoImage: {
    width: 200,
    height: 100,
    resizeMode: 'contain',
  },
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
