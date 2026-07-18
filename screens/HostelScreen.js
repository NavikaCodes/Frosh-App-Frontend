import React, { useRef, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Animated,
  Easing,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import Icon from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Feather from '@expo/vector-icons/Feather';

const GLASS_BG = 'rgba(255, 255, 255, 0.05)';
const GLASS_SHEEN = ['rgba(255,255,255,0.14)', 'rgba(255,255,255,0)'];

const fallbackTheme = {
  bgGradient: ['#020B18', '#061528', '#041220'],
  textPrimary: '#FFFFFF',
  textSecondary: '#D5DDF0',
  accent: '#2F80FF',
  cardBg: '#0A1A2E',
};

export default function HostelsScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const theme = route.params?.theme || fallbackTheme;

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

  const bgColor = theme.bgGradient?.[0] || '#020B18';

  return (
    <View style={{ flex: 1, backgroundColor: bgColor }}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
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
        <LinearGradient colors={theme.bgGradient} style={styles.container}>
          <SafeAreaView style={{ flex: 1 }}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 50 }}>
              {/* Header */}
              <View style={styles.header}>
                <TouchableOpacity style={styles.backBtn} onPress={handleBack}>
                  <Icon name="arrow-back" size={24} color={theme.textPrimary} />
                </TouchableOpacity>

                <View style={styles.titleContainer}>
                  <View style={[styles.dot, { backgroundColor: theme.accent }]} />
                  <Text style={[styles.title, { color: theme.textPrimary }]}>HOSTELS</Text>
                  <View style={[styles.dot, { backgroundColor: theme.accent }]} />
                </View>

                <View style={styles.spacer} />
              </View>

              {/* Subtitle */}
              <View style={styles.subTitleArea}>
                <Text style={[styles.subTitle, { color: theme.textSecondary }]}>Your home away from home.</Text>
                <Text style={[styles.subTitle, { color: theme.textSecondary }]}>Comfort, convenience and community.</Text>
              </View>

              {/* Divider */}
              <View style={styles.sectionRow}>
                <View style={[styles.line, { backgroundColor: theme.accent }]} />
                <Text style={[styles.sectionTitle, { color: theme.accent }]}>CHOOSE YOUR HOME</Text>
                <View style={[styles.line, { backgroundColor: theme.accent }]} />
              </View>

              {/* BOYS HOSTEL */}
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.navigate('Boys', { theme })}
              >
                <BlurView
                  intensity={150}
                  tint="dark"
                  experimentalBlurMethod="dimezisBlurView"
                  style={[styles.hostelCard, { borderColor: theme.accent, backgroundColor: GLASS_BG, shadowColor: theme.accent }]}
                >
                  <LinearGradient
                    colors={GLASS_SHEEN}
                    start={{ x: 0.5, y: 0 }}
                    end={{ x: 0.5, y: 1 }}
                    style={styles.glassSheen}
                    pointerEvents="none"
                  />
                  <Image source={require('../assets/cos.avif')} style={styles.hostelImage} />
                  <View style={styles.cardContent}>
                    <View>
                      <Text style={[styles.hostelTitle, { color: theme.textPrimary }]}>BOYS HOSTEL</Text>
                      <Text style={[styles.hostelSubtitle, { color: theme.textSecondary }]}>Built for comfort.</Text>
                      <Text style={[styles.hostelSubtitle, { color: theme.textSecondary }]}>Made for brotherhood.</Text>
                    </View>
                    <View style={[styles.separator, { backgroundColor: theme.accent }]} />
                    <View style={styles.facilityRow}>
                      <View style={styles.facilityItem}>
                        <Feather name="wifi" size={18} color={theme.accent} />
                        <Text style={[styles.facilityText, { color: theme.textPrimary }]}>Wi-Fi</Text>
                      </View>
                      <View style={styles.facilityItem}>
                        <MaterialCommunityIcons name="silverware-fork-knife" size={18} color={theme.accent} />
                        <Text style={[styles.facilityText, { color: theme.textPrimary }]}>Mess</Text>
                      </View>
                      <View style={styles.facilityItem}>
                        <MaterialCommunityIcons name="dumbbell" size={18} color={theme.accent} />
                        <Text style={[styles.facilityText, { color: theme.textPrimary }]}>Gym</Text>
                      </View>
                    </View>
                  </View>
                </BlurView>
              </TouchableOpacity>

              {/* GIRLS HOSTEL */}
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.navigate('Girls', { theme })}
              >
                <BlurView
                  intensity={150}
                  tint="dark"
                  experimentalBlurMethod="dimezisBlurView"
                  style={[styles.hostelCardPurple, { backgroundColor: GLASS_BG, shadowColor: '#A86CFF' }]}
                >
                  <LinearGradient
                    colors={GLASS_SHEEN}
                    start={{ x: 0.5, y: 0 }}
                    end={{ x: 0.5, y: 1 }}
                    style={styles.glassSheen}
                    pointerEvents="none"
                  />
                  <Image source={require('../assets/cos.avif')} style={styles.hostelImage} />
                  <View style={styles.cardContent}>
                    <View>
                      <Text style={[styles.hostelTitle, { color: theme.textPrimary }]}>GIRLS HOSTEL</Text>
                      <Text style={[styles.hostelSubtitle, { color: '#C99DFF' }]}>A space to thrive.</Text>
                      <Text style={[styles.hostelSubtitle, { color: '#C99DFF' }]}>A community to grow.</Text>
                    </View>
                    <View style={[styles.separatorPurple, { backgroundColor: '#A86CFF' }]} />
                    <View style={styles.facilityRow}>
                      <View style={styles.facilityItem}>
                        <Feather name="wifi" size={18} color="#A86CFF" />
                        <Text style={[styles.facilityText, { color: theme.textPrimary }]}>Wi-Fi</Text>
                      </View>
                      <View style={styles.facilityItem}>
                        <MaterialCommunityIcons name="silverware-fork-knife" size={18} color="#A86CFF" />
                        <Text style={[styles.facilityText, { color: theme.textPrimary }]}>Mess</Text>
                      </View>
                      <View style={styles.facilityItem}>
                        <MaterialCommunityIcons name="sofa-outline" size={18} color="#A86CFF" />
                        <Text style={[styles.facilityText, { color: theme.textPrimary }]}>Common</Text>
                        <Text style={[styles.facilityText, { marginTop: -2, color: theme.textPrimary }]}>Room</Text>
                      </View>
                    </View>
                  </View>
                </BlurView>
              </TouchableOpacity>

              {/* Safe & Secure */}
              <BlurView
                intensity={150}
                tint="dark"
                experimentalBlurMethod="dimezisBlurView"
                style={[styles.securityCard, { borderColor: theme.accent, backgroundColor: GLASS_BG, shadowColor: theme.accent }]}
              >
                <LinearGradient
                  colors={GLASS_SHEEN}
                  start={{ x: 0.5, y: 0 }}
                  end={{ x: 0.5, y: 1 }}
                  style={styles.glassSheen}
                  pointerEvents="none"
                />
                <View style={styles.securityLeft}>
                  <MaterialCommunityIcons name="shield-check-outline" size={34} color={theme.accent} />
                  <View style={{ marginLeft: 12 }}>
                    <Text style={[styles.securityTitle, { color: theme.textPrimary }]}>Safe & Secure Campus</Text>
                    <Text style={[styles.securityText, { color: theme.textSecondary }]}>24/7 security and dedicated support</Text>
                    <Text style={[styles.securityText, { color: theme.textSecondary }]}>for a worry-free stay.</Text>
                  </View>
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
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 50,
    paddingVertical: 8,
  },
  backBtn: { padding: 4 },
  spacer: { width: 40 },
  titleContainer: { flexDirection: 'row', alignItems: 'center' },
  dot: { width: 6, height: 6, borderRadius: 3, marginHorizontal: 10 },
  title: { fontSize: 24, fontWeight: '700', letterSpacing: 4 },
  subTitleArea: { alignItems: 'center', marginTop: 14 },
  subTitle: { fontSize: 15, marginTop: 2 },
  sectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 14,
    paddingHorizontal: 20,
  },
  line: { flex: 1, height: 1 },
  sectionTitle: { fontSize: 16, fontWeight: '700', letterSpacing: 3, marginHorizontal: 14 },
  hostelCard: {
    marginHorizontal: 16,
    marginBottom: 20,
    padding: 12,
    borderRadius: 20,
    borderWidth: 1,
    flexDirection: 'row',
    overflow: 'hidden',
    shadowOpacity: 0.15,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  hostelCardPurple: {
    marginHorizontal: 16,
    marginBottom: 22,
    padding: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#8F5BFF',
    flexDirection: 'row',
    overflow: 'hidden',
    shadowOpacity: 0.15,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  glassSheen: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '55%',
    borderTopLeftRadius: 19,
    borderTopRightRadius: 19,
  },
  hostelImage: { width: 120, height: 150, borderRadius: 16 },
  cardContent: { flex: 1, marginLeft: 14, justifyContent: 'space-between' },
  hostelTitle: { fontSize: 18, fontWeight: '700' },
  hostelSubtitle: { fontSize: 14, marginTop: 2 },
  separator: { height: 1, opacity: 0.3, marginVertical: 10 },
  separatorPurple: { height: 1, opacity: 0.35, marginVertical: 10 },
  facilityRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  facilityItem: { alignItems: 'center' },
  facilityText: { marginTop: 4, fontSize: 11 },
  securityCard: {
    marginHorizontal: 16,
    marginTop: 6,
    padding: 14,
    borderRadius: 18,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    overflow: 'hidden',
    shadowOpacity: 0.15,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  securityLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  securityTitle: { fontSize: 18, fontWeight: '700' },
  securityText: { fontSize: 14, marginTop: 2 },
});