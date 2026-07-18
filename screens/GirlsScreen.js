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
import Icon from '@expo/vector-icons/Ionicons';

// Fallback theme (used only if no theme is passed at all)
const fallbackTheme = {
  bgGradient: ['#020B18', '#061528', '#041220'],
  textPrimary: '#FFFFFF',
  textSecondary: '#D5DDF0',
  cardBg: '#0A1A2E',
  accent: '#8F5BFF', // purple – used for icons/accents if needed
};

// ---------- GIRLS HOSTEL DATA ----------
const rooms = [
  {
    id: 1,
    name: 'Vasudha Hall',
    nickname: 'Hostel G/E',
    seating: 'Three seater(AC)/Four seater(AC)',
    capacity: '360 capacity',
    image: require('../assets/cos.avif'),
  },
  {
    id: 2,
    name: 'Ira Hall',
    nickname: 'Hostel I',
    seating: 'One seater (Non AC)/Three seater(AC)',
    capacity: '320 capacity',
    image: require('../assets/cos.avif'),
  },
  {
    id: 3,
    name: 'Ananta Hall',
    nickname: 'Hostel N',
    seating: 'One seater(AC)/Two seater(AC)',
    capacity: '500 capacity',
    image: require('../assets/cos.avif'),
  },
  {
    id: 4,
    name: 'Dhriti Hall',
    nickname: 'Hostel PG-I',
    seating: 'Two seater(AC)',
    capacity: '928 capacity',
    image: require('../assets/cos.avif'),
  },
  {
    id: 5,
    name: 'Avani Hall',
    nickname: 'Hostel PG-II',
    seating: 'Two seater(AC)',
    capacity: '400 capacity',
    image: require('../assets/cos.avif'),
  },
  {
    id: 6,
    name: 'Vahni Hall',
    nickname: '',
    seating: 'Two seater(AC)',
    capacity: '400 capacity',
    image: require('../assets/cos.avif'),
  },
];

export default function GirlsScreen({ theme: themeProp }) {
  const navigation = useNavigation();
  const route = useRoute();

  const t = themeProp || route.params?.theme || fallbackTheme;
  const isDarkTheme = t.textPrimary?.toUpperCase() === '#FFFFFF';

  // Fixed purple for card outline
  const PURPLE = '#8F5BFF';

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
            <Text style={[styles.title, { color: t.textPrimary }]}>GIRLS HOSTEL</Text>
            <View style={{ width: 40 }} />
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            {rooms.map((room) => (
              <View
                key={room.id}
                style={[
                  styles.hallCard,
                  {
                    borderColor: PURPLE, // ✅ fixed purple outline
                    backgroundColor: t.cardBg,
                  },
                ]}
              >
                <Image source={room.image} style={styles.hallImage} />
                <View style={styles.cardContent}>
                  <Text style={[styles.hallTitle, { color: t.textPrimary }]}>
                    {room.name}
                  </Text>
                  {room.nickname !== '' && (
                    <Text style={[styles.hallSubtitle, { color: t.textSecondary }]}>
                      {room.nickname}
                    </Text>
                  )}
                  <Text style={[styles.hallSubtitle, { color: t.textSecondary }]}>
                    {room.seating}
                  </Text>
                  <Text style={[styles.hallSubtitle, { color: t.textSecondary }]}>
                    {room.capacity}
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </>
  );
}

// ---------- STYLES (unchanged, except borderColor is now fixed purple via inline style) ----------
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
    // borderColor is now applied inline as PURPLE
  },
  hallImage: { width: 90, height: 100, borderRadius: 12 },
  cardContent: { flex: 1, marginLeft: 12, justifyContent: 'center' },
  hallTitle: { fontSize: 16, fontWeight: '700' },
  hallSubtitle: { fontSize: 13, marginTop: 1 },
});