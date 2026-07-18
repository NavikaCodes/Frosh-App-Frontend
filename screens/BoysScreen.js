import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import Icon from '@expo/vector-icons/Ionicons';

const GLASS_BG = 'rgba(255, 255, 255, 0.05)';
const GLASS_SHEEN = ['rgba(255,255,255,0.14)', 'rgba(255,255,255,0)'];

// Fallback theme (used only if no theme is passed at all)
const fallbackTheme = {
  bgGradient: ['#020B18', '#061528', '#041220'],
  textPrimary: '#FFFFFF',
  textSecondary: '#D5DDF0',
  cardBg: '#0A1A2E',
  accent: '#2F80FF',
};

// ---------- UPDATED ROOMS DATA (exact order) ----------
const rooms = [
  {
    id: 1,
    name: 'Agira Hall',
    nickname: 'Hostel A',
    seating: 'Two seater(AC)',
    capacity: '928 capacity',
    image: require('../assets/cos.avif'),
  },
  {
    id: 2,
    name: 'Amritam Hall',
    nickname: 'Hostel B',
    seating: 'One seater (AC)/Two seater(AC)',
    capacity: '928 capacity',
    image: require('../assets/cos.avif'),
  },
  {
    id: 3,
    name: 'Prithvi Hall',
    nickname: 'Hostel C',
    seating: 'Two seater(AC)/Three seater(AC)',
    capacity: '387 capacity',
    image: require('../assets/cos.avif'),
  },
  {
    id: 4,
    name: 'Neeram Hall',
    nickname: 'Hostel D',
    seating: 'Two seater(AC)',
    capacity: '928 capacity',
    image: require('../assets/cos.avif'),
  },
  {
    id: 5,
    name: 'Vyan Hall',
    nickname: 'Hostel H',
    seating: 'Four seater(AC)',
    capacity: '670 capacity',
    image: require('../assets/cos.avif'),
  },
  {
    id: 6,
    name: 'Tejas Hall',
    nickname: 'Hostel J',
    seating: 'One seater(Non AC)/Two seater(AC)',
    capacity: '950 capacity',
    image: require('../assets/cos.avif'),
  },
  {
    id: 7,
    name: 'Ambram Hall',
    nickname: 'Hostel K',
    seating: 'Two seater (AC/Non AC)',
    capacity: '600 capacity',
    image: require('../assets/cos.avif'),
  },
  {
    id: 8,
    name: 'Viyat Hall',
    nickname: 'Hostel L',
    seating: 'Two seater (AC)',
    capacity: '200 capacity',
    image: require('../assets/cos.avif'),
  },
  {
    id: 9,
    name: 'Anantam Hall',
    nickname: 'Hostel M',
    seating: 'Two seater(AC)/One seater(AC)',
    capacity: '1148 capacity',
    image: require('../assets/cos.avif'),
  },
  {
    id: 10,
    name: 'Vyom Hall',
    nickname: 'Hostel O',
    seating: 'Two seater(AC)',
    capacity: '928 capacity',
    image: require('../assets/cos.avif'),
  },
];

export default function BoysScreen({ theme: themeProp }) {
  const navigation = useNavigation();
  const route = useRoute();

  const t = themeProp || route.params?.theme || fallbackTheme;
  const isDarkTheme = t.textPrimary?.toUpperCase() === '#FFFFFF';

  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={isDarkTheme ? 'light-content' : 'dark-content'}
      />
      <LinearGradient colors={t.bgGradient} style={styles.container}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
              <Icon name="arrow-back" size={24} color={t.textPrimary} />
            </TouchableOpacity>
            <Text style={[styles.title, { color: t.textPrimary }]}>BOYS HOSTEL</Text>
            <View style={{ width: 40 }} />
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            {rooms.map((room) => (
              <BlurView
                key={room.id}
                intensity={150}
                tint="dark"
                experimentalBlurMethod="dimezisBlurView"
                style={[
                  styles.hallCard,
                  { borderColor: t.accent, backgroundColor: GLASS_BG, shadowColor: t.accent },
                ]}
              >
                <LinearGradient
                  colors={GLASS_SHEEN}
                  start={{ x: 0.5, y: 0 }}
                  end={{ x: 0.5, y: 1 }}
                  style={styles.glassSheen}
                  pointerEvents="none"
                />
                <Image source={room.image} style={styles.hallImage} />
                <View style={styles.cardContent}>
                  {/* Name */}
                  <Text style={[styles.hallTitle, { color: t.textPrimary }]}>
                    {room.name}
                  </Text>
                  {/* Nickname */}
                  <Text style={[styles.hallSubtitle, { color: t.textSecondary }]}>
                    {room.nickname}
                  </Text>
                  {/* Seating type */}
                  <Text style={[styles.hallSubtitle, { color: t.textSecondary }]}>
                    {room.seating}
                  </Text>
                  {/* Capacity */}
                  <Text style={[styles.hallSubtitle, { color: t.textSecondary }]}>
                    {room.capacity}
                  </Text>
                </View>
              </BlurView>
            ))}
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </>
  );
}

// ---------- STYLES (unchanged) ----------
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
  title: {
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 2,
  },
  scrollContent: {
    paddingBottom: 30,
    paddingTop: 8,
  },
  hallCard: {
    marginHorizontal: 16,
    marginBottom: 14,
    padding: 10,
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    shadowOpacity: 0.12,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  glassSheen: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '60%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  hallImage: { width: 90, height: 100, borderRadius: 12 },
  cardContent: { flex: 1, marginLeft: 12, justifyContent: 'center' },
  hallTitle: { fontSize: 16, fontWeight: '700' },
  hallSubtitle: { fontSize: 13, marginTop: 1 },
});