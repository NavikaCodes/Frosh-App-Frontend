import React, { useState, useRef, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Modal,
  TouchableWithoutFeedback,
  Animated,
  Easing,
  Platform,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { Feather, Ionicons } from "@expo/vector-icons";
import AboutScreen from "./AboutScreen";
import BootcampScreen from "./BootcampScreen";
import { lightTheme } from "./LightScreen";
import { darkTheme } from "./DarkScreen";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default function HomeScreen() {
  const navigation = useNavigation();

  const [activeTab, setActiveTab] = useState("bootcamp");
  const [modalVisible, setModalVisible] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const isBootcamp = activeTab === "bootcamp";
  const isFrosh = activeTab === "frosh";
  const isAbout = activeTab === "about";

  const menuOptions = [
    { id: "account", label: "Account", icon: "person-outline" },
    { id: "schedule", label: "Schedule", icon: "calendar-outline" },
    { id: "about", label: "About Frosh", icon: "document-text-outline" },
    { id: "connect", label: "Connect with us", icon: "chatbubble-outline" },
    { id: "switch", label: "Switch Mode", icon: isDarkMode ? "sunny-outline" : "moon-outline" },
  ];

  const handleTabPress = (tabId) => {
    setActiveTab(tabId);
  };

  const handleMenuPress = (id) => {
    setModalVisible(false);

    if (isTransitioning) return;
    setIsTransitioning(true);

    // Fade out
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      // Perform action after fade‑out
      if (id === "switch") {
        setIsDarkMode((prev) => !prev);
        // Fade back in (for switch mode)
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }).start(() => {
          setIsTransitioning(false);
        });
      } else {
        // Navigate
        const theme = isDarkMode ? darkTheme : lightTheme;
        switch (id) {
          case "account":
            navigation.navigate("Profile", { theme });
            break;
          case "schedule":
            navigation.navigate("Schedule", { theme });
            break;
          case "about":
            navigation.navigate("AboutFrosh", { theme });
            break;
          case "connect":
            navigation.navigate("ConnectUs", { theme });
            break;
          default:
            break;
        }
        // Reset transitioning flag after a short delay
        // (navigation will trigger focus, which resets opacity)
        setTimeout(() => setIsTransitioning(false), 500);
      }
    });
  };

  // ---- Automatic fade‑in when screen gains focus ----
  useFocusEffect(
    useCallback(() => {
      // Fade in
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }).start(() => setIsTransitioning(false));
      return () => {
        // Optionally reset on blur (not needed)
      };
    }, [fadeAnim])
  );

  const theme = isDarkMode ? darkTheme : lightTheme;

  const glassBg = isDarkMode
    ? 'rgba(255, 255, 255, 0.08)'
    : 'rgba(255, 255, 255, 0.5)';
  const glassBorder = isDarkMode
    ? 'rgba(255, 255, 255, 0.15)'
    : 'rgba(255, 255, 255, 0.6)';

  return (
    // Outer container with background matching gradient start
    <View style={{ flex: 1, backgroundColor: theme.bgGradient[0] }}>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor="transparent"
        translucent={Platform.OS === "android"}
      />

      <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
        <LinearGradient
          colors={theme.bgGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.container}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 40 }}
          >
            {/* HEADER */}
            <View style={styles.header}>
              <View>
                <Text style={[styles.hello, { color: theme.textPrimary }]}>Hi, Navika</Text>
                <Text style={[styles.welcome, { color: theme.textSecondary }]}>Welcome back!</Text>
              </View>
              <TouchableOpacity
                style={[styles.profileCircle, { backgroundColor: theme.cardBg, shadowColor: theme.shadowColor }]}
                onPress={() => setModalVisible(true)}
              >
                <Feather name="user" size={24} color={theme.iconColor} />
              </TouchableOpacity>
            </View>

            {/* GLASS TOP CARD */}
            <BlurView
              intensity={80}
              tint={isDarkMode ? 'dark' : 'light'}
              experimentalBlurMethod="dimezisBlurView"
              style={[
                styles.topCard,
                {
                  backgroundColor: glassBg,
                  borderColor: glassBorder,
                  shadowColor: theme.shadowColor,
                },
              ]}
            >
              <View style={styles.tabsContainer}>
                <TouchableOpacity
                  style={[styles.tab, isBootcamp && { backgroundColor: theme.tabActiveBg }]}
                  onPress={() => handleTabPress("bootcamp")}
                >
                  <View style={styles.tabContent}>
                    <Ionicons name="calendar-outline" size={24} color={isBootcamp ? theme.tabActiveText : theme.tabInactiveText} />
                    <Text style={[isBootcamp ? styles.tabActive : styles.tabInactive, { color: isBootcamp ? theme.tabActiveText : theme.tabInactiveText }]}>Bootcamp</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.tab, isFrosh && { backgroundColor: theme.tabActiveBg }]}
                  onPress={() => handleTabPress("frosh")}
                >
                  <View style={styles.tabContent}>
                    <Image source={require("../assets/star.png")} resizeMode="contain" style={styles.tabLogoLarge} />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.tab, isAbout && { backgroundColor: theme.tabActiveBg }]}
                  onPress={() => handleTabPress("about")}
                >
                  <View style={styles.tabContent}>
                    <Ionicons name="document-text-outline" size={28} color={isAbout ? theme.tabActiveText : theme.tabInactiveText} />
                    <Text style={[isAbout ? styles.tabActive : styles.tabInactive, { color: isAbout ? theme.tabActiveText : theme.tabInactiveText }]}>About</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </BlurView>

            {/* CONTENT */}
            {isBootcamp ? (
              <BootcampScreen theme={theme} />
            ) : isFrosh ? (
              <View style={[styles.liveCard, theme.liveCard]}>
                <View style={styles.liveHeadingContainer}>
                  <View style={[styles.line, { backgroundColor: theme.lineColor }]} />
                  <Text style={[styles.liveHeading, { color: theme.accent }]}>• LIVE EVENT •</Text>
                  <View style={[styles.line, { backgroundColor: theme.lineColor }]} />
                </View>

                <Image source={require("../assets/concert.jpg")} style={styles.eventImage} />

                <View style={[styles.liveNow, { borderColor: theme.accent }]}>
                  <Text style={[styles.liveNowText, { color: theme.accent }]}>LIVE NOW</Text>
                </View>

                <Text style={[styles.eventTitle, { color: theme.textPrimary }]}>Battle of Hoods</Text>

                <View style={styles.infoRow}>
                  <Ionicons name="location" size={18} color={theme.accent} />
                  <Text style={[styles.location, { color: theme.accent }]}>Main Auditorium</Text>
                </View>

                <View style={styles.infoRow}>
                  <Feather name="calendar" size={16} color={theme.accent} />
                  <Text style={[styles.infoText, { color: theme.textPrimary }]}>07 May 2026</Text>
                </View>

                <View style={[styles.bottomRow, { marginTop: 0 }]}>
                  <View style={styles.infoRow}>
                    <Feather name="clock" size={16} color={theme.accent} />
                    <Text style={[styles.infoText, { color: theme.textPrimary }]}>06:30 PM Onwards</Text>
                  </View>
                  <TouchableOpacity style={[styles.arrowCircle, { borderColor: theme.accent }]}>
                    <Ionicons name="arrow-forward" size={24} color={theme.accent} />
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <AboutScreen theme={theme} />
            )}
          </ScrollView>
        </LinearGradient>
      </Animated.View>

      {/* PROFILE MENU */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>

        <View
          style={[
            styles.modalContainer,
            { backgroundColor: theme.modalBg },
          ]}
        >
          <View style={[styles.modalHandle, { backgroundColor: theme.lineColor }]} />

          {menuOptions.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.menuItem, { borderBottomColor: theme.lineColor }]}
              onPress={() => handleMenuPress(item.id)}
            >
              <Ionicons name={item.icon} size={24} color={theme.textPrimary} />
              <Text style={[styles.menuText, { color: theme.textPrimary }]}>{item.label}</Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
            <Text style={[styles.closeButtonText, { color: theme.textSecondary }]}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

// ---------- STYLES (unchanged) ----------
const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    marginTop: 55,
    paddingHorizontal: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  hello: { fontSize: 28, fontWeight: "800" },
  welcome: { marginTop: 2, fontSize: 16, fontWeight: "500" },
  profileCircle: {
    width: 50,
    height: 50,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowOpacity: 0.18,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  topCard: {
    marginHorizontal: 22,
    marginTop: 18,
    borderRadius: 28,
    height: 80,
    overflow: "hidden",
    borderWidth: 0.8,
    shadowOpacity: 0.15,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  tabsContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  tab: {
    flex: 1,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    borderRadius: 20,
  },
  tabContent: {
    justifyContent: "center",
    alignItems: "center",
    gap: 2,
  },
  tabLogoLarge: { width: 120, height: 120 },
  tabActive: { fontSize: 12, fontWeight: "700" },
  tabInactive: { fontSize: 12, fontWeight: "500" },
  liveCard: {
    marginHorizontal: 22,
    marginTop: 24,
    borderRadius: 28,
    padding: 18,
  },
  liveHeadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  line: { flex: 1, height: 2 },
  liveHeading: {
    marginHorizontal: 10,
    fontWeight: "700",
    fontSize: 16,
    letterSpacing: 2,
  },
  eventImage: {
    width: "100%",
    height: 200,
    borderRadius: 20,
  },
  liveNow: {
    marginTop: 14,
    borderWidth: 2,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 4,
    alignSelf: "flex-start",
  },
  liveNowText: { fontSize: 14, fontWeight: "700" },
  eventTitle: {
    marginTop: 12,
    fontSize: 26,
    fontWeight: "800",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  location: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: "700",
  },
  infoText: {
    marginLeft: 10,
    fontSize: 16,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  arrowCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.3)" },
  modalContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 30,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: -4 },
    elevation: 10,
  },
  modalHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  menuText: { fontSize: 18, fontWeight: "500", marginLeft: 16 },
  closeButton: { marginTop: 8, paddingVertical: 14, alignItems: "center" },
  closeButtonText: { fontSize: 18, fontWeight: "600" },
});