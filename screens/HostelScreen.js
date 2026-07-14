import React, { useRef, useEffect } from 'react'; // added useRef, useEffect, Animated, Easing
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

export default function HostelsScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const theme = route.params?.theme || fallbackTheme;

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
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <LinearGradient colors={theme.bgGradient} style={styles.container}>
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 50 }}>
            {/* Header */}
            <View style={styles.header}>
              <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
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
              <View style={[styles.hostelCard, { borderColor: theme.accent, backgroundColor: theme.cardBg }]}>
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
              </View>
            </TouchableOpacity>

            {/* GIRLS HOSTEL */}
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate('Girls', { theme })}
            >
              <View style={[styles.hostelCardPurple, { backgroundColor: theme.cardBg }]}>
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
              </View>
            </TouchableOpacity>

            {/* Safe & Secure */}
            <View style={[styles.securityCard, { borderColor: theme.accent, backgroundColor: theme.cardBg }]}>
              <View style={styles.securityLeft}>
                <MaterialCommunityIcons name="shield-check-outline" size={34} color={theme.accent} />
                <View style={{ marginLeft: 12 }}>
                  <Text style={[styles.securityTitle, { color: theme.textPrimary }]}>Safe & Secure Campus</Text>
                  <Text style={[styles.securityText, { color: theme.textSecondary }]}>24/7 security and dedicated support</Text>
                  <Text style={[styles.securityText, { color: theme.textSecondary }]}>for a worry-free stay.</Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </Animated.View>
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
  },
  hostelCardPurple: {
    marginHorizontal: 16,
    marginBottom: 22,
    padding: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#8F5BFF',
    flexDirection: 'row',
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
  },
  securityLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  securityTitle: { fontSize: 18, fontWeight: '700' },
  securityText: { fontSize: 14, marginTop: 2 },
});
