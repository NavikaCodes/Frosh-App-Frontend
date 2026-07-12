import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native'; // 👈 for back button
import { LinearGradient } from 'expo-linear-gradient';   // 👈 correct Expo import
import Icon from 'react-native-vector-icons/Ionicons';

const hostelData = [
  {
    id: 1,
    title: 'BOYS HOSTEL',
    subtitle: 'Built for comfort.\nMade for brotherhood.',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=900',
    color: '#1E88FF',
    facilities: [
      { icon: 'wifi-outline', label: 'Wi-Fi' },
      { icon: 'restaurant-outline', label: 'Mess' },
      { icon: 'barbell-outline', label: 'Gym' },
    ],
  },
  {
    id: 2,
    title: 'GIRLS HOSTEL',
    subtitle: 'A space to thrive.\nA community to grow.',
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=900',
    color: '#B56DFF',
    facilities: [
      { icon: 'wifi-outline', label: 'Wi-Fi' },
      { icon: 'restaurant-outline', label: 'Mess' },
      { icon: 'bed-outline', label: 'Common\nRoom' },
    ],
  },
];

export default function HostelsScreen() {
  const navigation = useNavigation(); // 👈 for back navigation

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#07111E" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()} // 👈 back functionality
          >
            <Icon name="arrow-back" size={30} color="#fff" />
          </TouchableOpacity>

          <View style={{ alignItems: 'center' }}>
            <Text style={styles.heading}>• HOSTELS •</Text>
            <Text style={styles.subHeading}>
              Your home away from home.
            </Text>
            <Text style={styles.subHeading}>
              Comfort, convenience and community.
            </Text>
          </View>

          <TouchableOpacity style={styles.topIcon}>
            <Icon name="bed-outline" size={28} color="#1E88FF" />
          </TouchableOpacity>
        </View>

        {/* Hero Card */}
        <LinearGradient
          colors={['#081A32', '#09111C']}
          style={styles.heroCard}
        >
          <View style={styles.heroLeft}>
            <View style={styles.heroCircle}>
              <Icon name="business-outline" size={72} color="#1E88FF" />
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.heroRight}>
            <Text style={styles.heroTitle}>More Than Just a Room</Text>
            <Text style={styles.heroText}>
              A place to live, learn and make memories that last a lifetime.
            </Text>
          </View>
        </LinearGradient>

        {/* Section Heading */}
        <View style={styles.sectionRow}>
          <View style={styles.line} />
          <Text style={styles.sectionTitle}>• CHOOSE YOUR HOME •</Text>
          <View style={styles.line} />
        </View>

        {/* ✅ Hostel Cards – now inside the ScrollView */}
        {hostelData.map((hostel) => (
          <LinearGradient
            key={hostel.id}
            colors={['#0A172A', '#08121F']}
            style={[styles.hostelCard, { borderColor: hostel.color }]}
          >
            <Image source={{ uri: hostel.image }} style={styles.hostelImage} />

            <View style={styles.hostelContent}>
              <View style={styles.hostelHeader}>
                <View
                  style={[
                    styles.profileCircle,
                    { borderColor: hostel.color },
                  ]}
                >
                  <Icon name="person-outline" size={28} color={hostel.color} />
                </View>

                <View style={{ flex: 1, marginLeft: 14 }}>
                  <Text style={styles.hostelTitle}>{hostel.title}</Text>
                  <Text
                    style={[
                      styles.hostelSubtitle,
                      { color: hostel.color },
                    ]}
                  >
                    {hostel.subtitle}
                  </Text>
                </View>
              </View>

              <View style={styles.smallDivider} />

              <View style={styles.facilityRow}>
                {hostel.facilities.map((item, index) => (
                  <View key={index} style={styles.facility}>
                    <Icon name={item.icon} size={24} color={hostel.color} />
                    <Text style={styles.facilityText}>{item.label}</Text>
                  </View>
                ))}

                <TouchableOpacity
                  style={[
                    styles.arrowButton,
                    { borderColor: hostel.color },
                  ]}
                >
                  <Icon name="arrow-forward" size={26} color={hostel.color} />
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>
        ))}

        {/* ✅ Security Card – now inside the ScrollView */}
        <LinearGradient
          colors={['#0A172A', '#09121F']}
          style={styles.securityCard}
        >
          <View style={styles.securityLeft}>
            <Icon name="shield-checkmark-outline" size={44} color="#1E88FF" />
            <View style={{ marginLeft: 18 }}>
              <Text style={styles.securityTitle}>Safe & Secure Campus</Text>
              <Text style={styles.securityText}>
                24/7 security and dedicated support
              </Text>
              <Text style={styles.securityText}>
                for a worry-free stay.
              </Text>
            </View>
          </View>

          <View style={styles.lockCircle}>
            <Icon name="lock-closed-outline" size={28} color="#D7E7FF" />
          </View>
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
}

// ====== STYLES (unchanged, all included) ======
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#07111E',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 22,
    paddingTop: 20,
    marginBottom: 28,
  },
  backButton: {
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topIcon: {
    width: 62,
    height: 62,
    borderRadius: 31,
    borderWidth: 1.5,
    borderColor: '#157DFF',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#091B32',
  },
  heading: {
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: '700',
    letterSpacing: 3,
    marginBottom: 10,
  },
  subHeading: {
    color: '#C7D5E8',
    fontSize: 17,
    textAlign: 'center',
    lineHeight: 28,
  },
  heroCard: {
    marginHorizontal: 20,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: '#147FFF',
    padding: 22,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 35,
  },
  heroLeft: {
    width: 110,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroCircle: {
    width: 95,
    height: 95,
    borderRadius: 48,
    backgroundColor: '#0B203E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    width: 1,
    height: 120,
    backgroundColor: '#167FFF',
    marginHorizontal: 18,
    opacity: 0.6,
  },
  heroRight: {
    flex: 1,
  },
  heroTitle: {
    color: '#1E88FF',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 12,
  },
  heroText: {
    color: '#D5E4F5',
    fontSize: 18,
    lineHeight: 30,
  },
  sectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 28,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#2A466A',
  },
  sectionTitle: {
    color: '#1E88FF',
    fontSize: 20,
    fontWeight: '700',
    marginHorizontal: 14,
    letterSpacing: 2,
  },
  hostelCard: {
    marginHorizontal: 18,
    marginBottom: 26,
    borderRadius: 24,
    borderWidth: 1.3,
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  hostelImage: {
    width: 145,
    height: 175,
    borderRadius: 20,
  },
  hostelContent: {
    flex: 1,
    marginLeft: 18,
  },
  hostelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileCircle: {
    width: 58,
    height: 58,
    borderRadius: 29,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hostelTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  hostelSubtitle: {
    fontSize: 17,
    lineHeight: 25,
  },
  smallDivider: {
    height: 1,
    backgroundColor: '#29486D',
    marginVertical: 18,
  },
  facilityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  facility: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  facilityText: {
    color: '#FFFFFF',
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
  arrowButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  securityCard: {
    marginHorizontal: 18,
    marginTop: 12,
    marginBottom: 35,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#157DFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 22,
  },
  securityLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  securityTitle: {
    color: '#D7E7FF',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  securityText: {
    color: '#B7C9DE',
    fontSize: 16,
    lineHeight: 24,
  },
  lockCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 1.5,
    borderColor: '#157DFF',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#091B32',
  },
});