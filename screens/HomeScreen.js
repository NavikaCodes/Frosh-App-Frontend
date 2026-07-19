import React, { useState, useRef, useEffect } from "react";
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
  PanResponder,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
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

  // Sliding indicator for top tabs
  const [containerWidth, setContainerWidth] = useState(0);
  const slideAnim = useRef(new Animated.Value(0)).current;

  const isBootcamp = activeTab === "bootcamp";
  const isFrosh = activeTab === "frosh";
  const isAbout = activeTab === "about";

  const tabIndex = { bootcamp: 0, frosh: 1, about: 2 };
  const tabNames = ["bootcamp", "frosh", "about"];

  // Holds the slider offset at the moment a drag begins
  const dragStartValue = useRef(0);
  // Which tab index the drag started from (used to decide next/prev on release)
  const dragStartIndex = useRef(0);
  // Tracks whether a finger is currently dragging the slider (disables the
  // tab-press-driven effect from fighting the gesture)
  const isDragging = useRef(false);
  // PanResponder is created once, so we mirror fast-changing values into
  // refs here to avoid the gesture handlers ever reading stale state
  const containerWidthRef = useRef(0);
  const activeTabRef = useRef(activeTab);
  useEffect(() => {
    containerWidthRef.current = containerWidth;
  }, [containerWidth]);
  useEffect(() => {
    activeTabRef.current = activeTab;
  }, [activeTab]);

  // Smoothly animate the slider to rest on top of a given tab
  const animateToTab = (tabId, duration = 300) => {
    if (containerWidth === 0) return;
    const tabWidth = containerWidth / 3;
    const targetOffset = tabIndex[tabId] * tabWidth;
    Animated.timing(slideAnim, {
      toValue: targetOffset,
      duration,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  // Animate slider when activeTab or containerWidth changes (tap-triggered)
  useEffect(() => {
    if (containerWidth === 0 || isDragging.current) return;
    animateToTab(activeTab);
  }, [activeTab, containerWidth]);

  // Subtle "pop" for the content card whenever the active tab changes
  const contentOpacity = useRef(new Animated.Value(1)).current;
  const contentScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    contentOpacity.setValue(0);
    contentScale.setValue(0.95);
    Animated.parallel([
      Animated.timing(contentOpacity, {
        toValue: 1,
        duration: 220,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.spring(contentScale, {
        toValue: 1,
        friction: 7,
        tension: 90,
        useNativeDriver: true,
      }),
    ]).start();
  }, [activeTab]);

  // --- Drag-to-slide gesture handling ---
  const panResponder = useRef(
    PanResponder.create({
      // Let taps on the tabs pass through untouched...
      onStartShouldSetPanResponder: () => false,
      onStartShouldSetPanResponderCapture: () => false,
      // ...but claim the gesture as soon as it's a clear horizontal drag
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
        return (
          Math.abs(gestureState.dx) > 6 &&
          Math.abs(gestureState.dx) > Math.abs(gestureState.dy) * 1.5
        );
      },
      onPanResponderGrant: () => {
        isDragging.current = true;
        dragStartIndex.current = tabIndex[activeTabRef.current];
        slideAnim.stopAnimation((value) => {
          dragStartValue.current = value;
        });
      },
      onPanResponderMove: (evt, gestureState) => {
        const width = containerWidthRef.current;
        if (width === 0) return;
        const tabWidth = width / 3;
        const maxOffset = tabWidth * 2;
        const newOffset = Math.max(
          0,
          Math.min(maxOffset, dragStartValue.current + gestureState.dx)
        );
        slideAnim.setValue(newOffset);
      },
      onPanResponderRelease: (evt, gestureState) => {
        const width = containerWidthRef.current;
        if (width === 0) {
          isDragging.current = false;
          return;
        }
        const tabWidth = width / 3;
        const startIndex = dragStartIndex.current;
        const dx = gestureState.dx;
        const vx = gestureState.vx;

        // Only a small drag (or a quick flick) is needed to fully commit to
        // the next/previous tab — no need to drag halfway across.
        const distanceThreshold = tabWidth * 0.18;
        const velocityThreshold = 0.25;

        let targetIndex = startIndex;
        if (dx > distanceThreshold || vx > velocityThreshold) {
          targetIndex = Math.min(2, startIndex + 1);
        } else if (dx < -distanceThreshold || vx < -velocityThreshold) {
          targetIndex = Math.max(0, startIndex - 1);
        }

        const newTab = tabNames[targetIndex];
        isDragging.current = false;
        setActiveTab(newTab);
        animateToTab(newTab, 180);
      },
      onPanResponderTerminate: () => {
        isDragging.current = false;
        animateToTab(activeTabRef.current, 200);
      },
    })
  ).current;

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
    setModalVisible(false); // close the modal instantly

    if (id === "switch") {
      setIsDarkMode((prev) => !prev);
    } else {
      const theme = isDarkMode ? darkTheme : lightTheme;
      switch (id) {
        case "account": navigation.navigate("Profile", { theme }); break;
        case "schedule": navigation.navigate("Schedule", { theme }); break;
        case "about": navigation.navigate("AboutFrosh", { theme }); break;
        case "connect": navigation.navigate("ConnectUs", { theme }); break;
        default: break;
      }
    }
  };

  const theme = isDarkMode ? darkTheme : lightTheme;

  const glassBg = isDarkMode
    ? 'rgba(255, 255, 255, 0.05)'
    : 'rgba(255, 255, 255, 0.35)';
  const glassBorder = isDarkMode
    ? 'rgba(255, 255, 255, 0.2)'
    : 'rgba(255, 255, 255, 0.7)';
  const glassSheen = isDarkMode
    ? ['rgba(255,255,255,0.14)', 'rgba(255,255,255,0)']
    : ['rgba(255,255,255,0.55)', 'rgba(255,255,255,0)'];

  return (
    <View style={{ flex: 1, backgroundColor: theme.bgGradient[0] }}>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor="transparent"
        translucent={Platform.OS === "android"}
      />

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

          {/* GLASS TOP CARD with sliding indicator */}
          <BlurView
            intensity={300}
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
            <LinearGradient
              colors={glassSheen}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              style={styles.glassSheen}
              pointerEvents="none"
            />
            <View
              style={styles.tabsContainer}
              {...panResponder.panHandlers}
              onLayout={(e) => {
                const { width } = e.nativeEvent.layout;
                setContainerWidth(width);
                if (width > 0) {
                  const initialOffset = tabIndex[activeTab] * (width / 3);
                  slideAnim.setValue(initialOffset);
                }
              }}
            >
              {/* Sliding indicator */}
              {containerWidth > 0 && (
                <Animated.View
                  style={[
                    styles.slider,
                    {
                      width: containerWidth / 3,
                      transform: [{ translateX: slideAnim }],
                      backgroundColor: theme.tabActiveBg,
                    },
                  ]}
                />
              )}

              <TouchableOpacity
                style={styles.tab}
                onPress={() => handleTabPress("bootcamp")}
              >
                <View style={styles.tabContent}>
                  <Ionicons name="calendar-outline" size={24} color={isBootcamp ? theme.tabActiveText : theme.tabInactiveText} />
                  <Text style={[isBootcamp ? styles.tabActive : styles.tabInactive, { color: isBootcamp ? theme.tabActiveText : theme.tabInactiveText }]}>Bootcamp</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.tab}
                onPress={() => handleTabPress("frosh")}
              >
                <View style={styles.tabContent}>
                  <Image source={require("../assets/star.png")} resizeMode="contain" style={styles.tabLogoLarge} />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.tab}
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
          <Animated.View
            style={{
              opacity: contentOpacity,
              transform: [{ scale: contentScale }],
            }}
          >
            {isBootcamp ? (
              <BootcampScreen theme={theme} />
            ) : isFrosh ? (
              <BlurView
                intensity={150}
                tint="dark"
                experimentalBlurMethod="dimezisBlurView"
                style={[
                  styles.liveCard,
                  {
                    backgroundColor: glassBg,
                    borderColor: glassBorder,
                    shadowColor: theme.shadowColor,
                  },
                ]}
              >
                <LinearGradient
                  colors={glassSheen}
                  start={{ x: 0.5, y: 0 }}
                  end={{ x: 0.5, y: 1 }}
                  style={styles.glassSheen}
                  pointerEvents="none"
                />
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
              </BlurView>
            ) : (
              <AboutScreen theme={theme} />
            )}
          </Animated.View>
        </ScrollView>
      </LinearGradient>

      {/* PROFILE MENU – no animation, no dark overlay */}
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlayTransparent} />
        </TouchableWithoutFeedback>

        <View style={[styles.modalContainer, { backgroundColor: theme.modalBg }]}>
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

// ---------- STYLES ----------
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
    borderWidth: 1,
    shadowOpacity: 0.15,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  glassSheen: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "55%",
    borderTopLeftRadius: 27,
    borderTopRightRadius: 27,
  },
  tabsContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    position: "relative",
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
  slider: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    borderRadius: 20,
  },
  liveCard: {
    marginHorizontal: 22,
    marginTop: 24,
    borderRadius: 28,
    padding: 18,
    overflow: "hidden",
    borderWidth: 1,
    shadowOpacity: 0.15,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
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
  modalOverlayTransparent: {
    flex: 1,
    backgroundColor: 'transparent',
  },
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