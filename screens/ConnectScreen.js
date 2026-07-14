import React, { useState, useRef, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Modal,
  TouchableWithoutFeedback,
  Linking,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from '@expo/vector-icons/Ionicons';
import { Feather } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const fallbackTheme = {
  bgGradient: ['#020B18', '#061528', '#041220'],
  textPrimary: '#FFFFFF',
  textSecondary: '#D5DDF0',
  cardBg: '#0A1A2E',
  accent: '#2F80FF',
  shadowColor: '#2F80FF',
  lineColor: 'rgba(255,255,255,0.1)',
};

const helpLinks = [
  { id: 'website', label: 'Website', icon: 'globe-outline', iconSet: 'Ionicons', url: 'https://tr.ee/ufjIxJszUK' },
  { id: 'instagram', label: 'Instagram', icon: 'logo-instagram', iconSet: 'Ionicons', url: 'https://tr.ee/h1y6A_eYSg' },
  { id: 'youtube', label: 'YouTube', icon: 'logo-youtube', iconSet: 'Ionicons', url: 'https://youtube.com/@froshtiet?si=NUlQHxHSWGTSjJ73' },
  { id: 'facebook', label: 'Facebook', icon: 'logo-facebook', iconSet: 'Ionicons', url: 'https://tr.ee/1G-pzEBp1E' },
  { id: 'github', label: 'GitHub', icon: 'github', iconSet: 'Feather', url: 'https://tr.ee/OczIWYVBps' },
  { id: 'phone', label: 'Phone', icon: 'phone-call', iconSet: 'Feather', url: null },
];

const contacts = [
  { name: 'Vanshaj Kaushik', number: '8439818347' },
  { name: 'Snehil Jhanwar', number: '9057241613' },
  { name: 'Nandini', number: '7009036797' },
];

export default function HelpSupportScreen({ theme: themeProp }) {
  const navigation = useNavigation();
  const route = useRoute();

  const t = themeProp || route.params?.theme || fallbackTheme;
  const isDarkTheme = t.textPrimary?.toUpperCase() === '#FFFFFF';

  const [modalVisible, setModalVisible] = useState(false);

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

  const handlePress = (item) => {
    if (item.id === 'phone') {
      setModalVisible(true);
    } else if (item.url) {
      Linking.openURL(item.url).catch(() => {});
    }
  };

  const renderIcon = (item) => {
    const color = t.textPrimary;
    const size = 48;
    if (item.iconSet === 'Feather') {
      return <Feather name={item.icon} size={size} color={color} />;
    }
    return <Icon name={item.icon} size={size} color={color} />;
  };

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
            <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
              <Icon name="arrow-back" size={24} color={t.textPrimary} />
            </TouchableOpacity>
            <Text style={[styles.title, { color: t.textPrimary }]}>Connect with us</Text>
            <View style={{ width: 40 }} />
          </View>

          {/* Subtitle */}
          <Text style={[styles.subtitle, { color: t.textSecondary }]}>
            Connect with us through any of these channels
          </Text>

          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            <View style={styles.grid}>
              {helpLinks.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.card,
                    { backgroundColor: t.cardBg, borderColor: t.lineColor },
                  ]}
                  onPress={() => handlePress(item)}
                  activeOpacity={0.7}
                >
                  <View style={[styles.iconCircle, { borderColor: t.accent }]}>
                    {renderIcon(item)}
                  </View>
                  <Text style={[styles.label, { color: t.textPrimary }]}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>

      {/* Phone Modal */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View
            style={[
              styles.modalOverlay,
              { backgroundColor: t.overlayColor || 'rgba(0,0,0,0.5)' },
            ]}
          >
            <TouchableWithoutFeedback onPress={() => {}}>
              <View
                style={[
                  styles.modalCard,
                  { backgroundColor: t.cardBg, shadowColor: t.shadowColor },
                ]}
              >
                <Text style={[styles.modalTitle, { color: t.textPrimary }]}>Contact Support</Text>
                <View style={[styles.divider, { backgroundColor: t.lineColor }]} />
                {contacts.map((contact, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.contactRow,
                      index < contacts.length - 1 && {
                        borderBottomWidth: 1,
                        borderBottomColor: t.lineColor,
                      },
                    ]}
                    onPress={() => Linking.openURL(`tel:${contact.number}`)}
                  >
                    <Feather name="phone" size={20} color={t.accent} />
                    <View style={styles.contactTextContainer}>
                      <Text style={[styles.contactName, { color: t.textPrimary }]}>{contact.name}</Text>
                      <Text style={[styles.contactNumber, { color: t.textSecondary }]}>{contact.number}</Text>
                    </View>
                    <Feather name="chevron-right" size={20} color={t.textSecondary} />
                  </TouchableOpacity>
                ))}
                <TouchableOpacity style={[styles.closeButton, { backgroundColor: t.accent }]} onPress={() => setModalVisible(false)}>
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
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
  backBtn: { padding: 4 },
  title: {
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 15,
    textAlign: 'center',
    marginTop: 0,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingBottom: 20,
    justifyContent: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  card: {
    width: '46%',
    height: 180,
    borderRadius: 24,
    marginBottom: 18,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
  },
  iconCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCard: {
    width: width * 0.88,
    borderRadius: 28,
    padding: 24,
    shadowOpacity: 0.3,
    shadowRadius: 24,
    elevation: 12,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 6,
  },
  divider: {
    height: 1,
    marginBottom: 16,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },
  contactTextContainer: {
    flex: 1,
    marginLeft: 14,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '600',
  },
  contactNumber: {
    fontSize: 14,
    marginTop: 2,
  },
  closeButton: {
    marginTop: 16,
    paddingVertical: 12,
    borderRadius: 24,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});