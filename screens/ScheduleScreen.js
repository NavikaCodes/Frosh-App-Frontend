import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
  Animated,
  Easing,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { lightTheme } from "./LightScreen";
import { darkTheme } from "./DarkScreen";

// ---- Sample data (unchanged) ----
const LIVE_EVENTS = [
  {
    id: "l1",
    category: "FROSH",
    title: "Zelexia",
    location: "Main Auditorium",
    time: "Today • 05:00 PM",
    image: require("../assets/concert.jpg"),
  },
];

const UPCOMING_EVENTS = [
  {
    id: "u1",
    category: "FROSH",
    title: "Battle of Hoods",
    location: "Open Air Theater",
    time: "8 July 2026 • 12:00 PM",
    image: require("../assets/concert.jpg"),
  },
  {
    id: "u2",
    category: "FROSH",
    title: "Sportsmania",
    location: "Sports Complex",
    time: "13 July 2026 • 08:00 AM",
    image: require("../assets/concert.jpg"),
  },
  {
    id: "u3",
    category: "FROSH",
    title: "Whodunit",
    location: "Main Auditorium",
    time: "15 July 2026 • 06:30 PM",
    image: require("../assets/concert.jpg"),
  },
];

const PAST_EVENTS = [
  {
    id: "p1",
    category: "FROSH",
    title: "Proem Eve",
    location: "Main Auditorium",
    time: "1 July 2026 • 06:00 PM",
    image: require("../assets/concert.jpg"),
  },
];

function withAlpha(hex, alpha) {
  if (!hex || !hex.startsWith("#")) return hex;
  return `${hex}${alpha}`;
}

// ---- Card components (unchanged) ----
function LiveEventCard({ theme, liveAccent, event }) {
  // ... (unchanged, same as your original)
  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.cardBg,
          borderColor: theme.lineColor,
          shadowColor: theme.shadowColor,
        },
      ]}
    >
      <View style={styles.imageWrap}>
        <Image source={event.image} style={styles.eventImage} />
        <View style={styles.liveBadge}>
          <View style={styles.liveDot} />
          <Text style={styles.liveBadgeText}>LIVE</Text>
        </View>
      </View>

      <Text style={[styles.category, { color: liveAccent }]}>
        {event.category}
      </Text>
      <Text style={[styles.title, { color: theme.textPrimary }]}>
        {event.title}
      </Text>

      <View style={styles.infoRow}>
        <Ionicons name="location-outline" size={15} color={theme.textSecondary} />
        <Text style={[styles.infoText, { color: theme.textSecondary }]}>
          {event.location}
        </Text>
      </View>
      <View style={styles.infoRow}>
        <Feather name="clock" size={14} color={theme.textSecondary} />
        <Text style={[styles.infoText, { color: theme.textSecondary }]}>
          {event.time}
        </Text>
      </View>

      <View style={[styles.divider, { backgroundColor: theme.lineColor }]} />
    </View>
  );
}

function UpcomingEventCard({ theme, liveAccent, event }) {
  // ... (unchanged)
  return (
    <View
      style={[
        styles.rowCard,
        {
          backgroundColor: theme.cardBg,
          borderColor: theme.lineColor,
          shadowColor: theme.shadowColor,
        },
      ]}
    >
      <Image source={event.image} style={styles.thumb} />
      <View style={styles.rowCardBody}>
        <Text style={[styles.category, { color: liveAccent }]}>
          {event.category}
        </Text>
        <Text style={[styles.rowTitle, { color: theme.textPrimary }]}>
          {event.title}
        </Text>
        <View style={styles.infoRow}>
          <Ionicons name="location-outline" size={13} color={theme.textSecondary} />
          <Text style={[styles.infoTextSmall, { color: theme.textSecondary }]}>
            {event.location}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Feather name="clock" size={12} color={theme.textSecondary} />
          <Text style={[styles.infoTextSmall, { color: theme.textSecondary }]}>
            {event.time}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={[
          styles.remindButton,
          { borderColor: withAlpha(theme.accent, "60") },
        ]}
        activeOpacity={0.7}
      >
        <Ionicons name="calendar-outline" size={18} color={theme.accent} />
        <Text style={[styles.remindText, { color: theme.accent }]}>
          Remind Me
        </Text>
      </TouchableOpacity>
    </View>
  );
}

function PastEventCard({ theme, liveAccent, event }) {
  // ... (unchanged)
  return (
    <View
      style={[
        styles.rowCard,
        {
          backgroundColor: theme.cardBg,
          borderColor: theme.lineColor,
          shadowColor: theme.shadowColor,
        },
      ]}
    >
      <Image source={event.image} style={[styles.thumb, { opacity: 0.85 }]} />
      <View style={styles.rowCardBody}>
        <Text style={[styles.category, { color: liveAccent }]}>
          {event.category}
        </Text>
        <Text style={[styles.rowTitle, { color: theme.textPrimary }]}>
          {event.title}
        </Text>
        <View style={styles.infoRow}>
          <Ionicons name="location-outline" size={13} color={theme.textSecondary} />
          <Text style={[styles.infoTextSmall, { color: theme.textSecondary }]}>
            {event.location}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Feather name="clock" size={12} color={theme.textSecondary} />
          <Text style={[styles.infoTextSmall, { color: theme.textSecondary }]}>
            {event.time}
          </Text>
        </View>
      </View>

      <View style={[styles.completedBadge, { borderColor: withAlpha("#34D399", "70") }]}>
        <Ionicons name="checkmark" size={16} color="#34D399" />
        <Text style={styles.completedText}>Completed</Text>
      </View>
    </View>
  );
}

export default function ScheduleScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const theme = route?.params?.theme || darkTheme;
  const isDarkMode = theme === darkTheme;
  const liveAccent = theme.liveAccent || "#A855F7";

  const [activeTab, setActiveTab] = useState("live");

  const TABS = [
    { id: "live", label: "Live" },
    { id: "upcoming", label: "Upcoming" },
    { id: "past", label: "Past" },
  ];

  const renderTabIcon = (tabId, isActive) => {
    const color = isActive
      ? tabId === "live"
        ? liveAccent
        : theme.textPrimary
      : theme.tabInactiveText;

    if (tabId === "live") {
      return <View style={[styles.liveTabDot, { backgroundColor: color }]} />;
    }
    if (tabId === "upcoming") {
      return <Ionicons name="calendar-outline" size={16} color={color} />;
    }
    return <MaterialCommunityIcons name="history" size={17} color={color} />;
  };

  // --- Animations ---
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const isNavigating = useRef(false);

  // Fade in on mount
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

  const bgColor = theme.bgGradient?.[0] || (isDarkMode ? "#02060D" : "#f5f5f5");

  return (
    <View style={{ flex: 1, backgroundColor: bgColor }}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
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
        <LinearGradient
          colors={theme.bgGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.container}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Header with back button */}
            <View style={styles.headerRow}>
              <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color={theme.textPrimary} />
              </TouchableOpacity>
              <Text style={[styles.headerTitle, { color: theme.textPrimary }]}>
                Schedule
              </Text>
              <View style={styles.headerSpacer} />
            </View>
            <Text style={[styles.headerSubtitle, { color: theme.textSecondary }]}>
              Stay updated with every Frosh event.
            </Text>

            {/* Tabs */}
            <View style={styles.tabsRow}>
              {TABS.map((tab) => {
                const isActive = activeTab === tab.id;
                const activeBorder = tab.id === "live" ? liveAccent : theme.accent;
                return (
                  <TouchableOpacity
                    key={tab.id}
                    onPress={() => setActiveTab(tab.id)}
                    activeOpacity={0.7}
                    style={[
                      styles.tabPill,
                      {
                        backgroundColor: isActive
                          ? withAlpha(activeBorder, "1F")
                          : theme.cardBg,
                        borderColor: isActive
                          ? withAlpha(activeBorder, "90")
                          : theme.lineColor,
                      },
                    ]}
                  >
                    {renderTabIcon(tab.id, isActive)}
                    <Text
                      style={[
                        styles.tabLabel,
                        {
                          color: isActive
                            ? tab.id === "live"
                              ? liveAccent
                              : theme.textPrimary
                            : theme.tabInactiveText,
                        },
                      ]}
                    >
                      {tab.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Live section */}
            {activeTab === "live" && (
              <View style={styles.section}>
                <Text style={[styles.sectionHeading, { color: liveAccent }]}>
                  LIVE NOW
                </Text>
                {LIVE_EVENTS.length === 0 ? (
                  <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
                    Nothing is live right now.
                  </Text>
                ) : (
                  LIVE_EVENTS.map((event) => (
                    <LiveEventCard
                      key={event.id}
                      theme={theme}
                      liveAccent={liveAccent}
                      event={event}
                    />
                  ))
                )}
              </View>
            )}

            {/* Upcoming section */}
            {activeTab === "upcoming" && (
              <View style={styles.section}>
                <Text style={[styles.sectionHeading, { color: theme.accent }]}>
                  UPCOMING EVENTS
                </Text>
                {UPCOMING_EVENTS.length === 0 ? (
                  <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
                    No upcoming events yet.
                  </Text>
                ) : (
                  UPCOMING_EVENTS.map((event) => (
                    <UpcomingEventCard
                      key={event.id}
                      theme={theme}
                      liveAccent={liveAccent}
                      event={event}
                    />
                  ))
                )}
              </View>
            )}

            {/* Past section */}
            {activeTab === "past" && (
              <View style={styles.section}>
                <Text style={[styles.sectionHeading, { color: theme.accent }]}>
                  PAST EVENTS
                </Text>
                {PAST_EVENTS.length === 0 ? (
                  <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
                    No past events to show.
                  </Text>
                ) : (
                  PAST_EVENTS.map((event) => (
                    <PastEventCard
                      key={event.id}
                      theme={theme}
                      liveAccent={liveAccent}
                      event={event}
                    />
                  ))
                )}
              </View>
            )}
          </ScrollView>
        </LinearGradient>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  // ... (your existing styles, unchanged)
  container: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  backButton: { padding: 4 },
  headerTitle: {
    fontSize: 32,
    fontWeight: "800",
    flex: 1,
    textAlign: "center",
  },
  headerSpacer: { width: 40 },
  headerSubtitle: {
    fontSize: 15,
    marginTop: 4,
    marginBottom: 22,
    textAlign: "center",
  },
  tabsRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 26,
  },
  tabPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 22,
    borderWidth: 1.2,
  },
  liveTabDot: { width: 8, height: 8, borderRadius: 4 },
  tabLabel: { fontSize: 14, fontWeight: "700" },
  section: { marginBottom: 10 },
  sectionHeading: {
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 1,
    marginBottom: 12,
  },
  emptyText: { fontSize: 14, marginBottom: 10 },
  card: {
    borderRadius: 22,
    borderWidth: 1,
    padding: 14,
    marginBottom: 16,
    shadowOpacity: 0.2,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 5,
  },
  imageWrap: { borderRadius: 16, overflow: "hidden", marginBottom: 12 },
  eventImage: { width: "100%", height: 160 },
  liveBadge: {
    position: "absolute",
    top: 10,
    left: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.55)",
    borderRadius: 14,
    paddingVertical: 5,
    paddingHorizontal: 10,
    gap: 6,
  },
  liveDot: { width: 7, height: 7, borderRadius: 3.5, backgroundColor: "#EF4444" },
  liveBadgeText: { color: "#FFFFFF", fontSize: 12, fontWeight: "700" },
  category: { fontSize: 12, fontWeight: "700", letterSpacing: 1, marginBottom: 4 },
  title: { fontSize: 22, fontWeight: "800", marginBottom: 8 },
  infoRow: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 4 },
  infoText: { fontSize: 14 },
  infoTextSmall: { fontSize: 12.5 },
  divider: { height: 1, marginVertical: 12 },
  rowCard: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 18,
    borderWidth: 1,
    padding: 10,
    marginBottom: 14,
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  thumb: { width: 70, height: 70, borderRadius: 12 },
  rowCardBody: { flex: 1, marginLeft: 12, marginRight: 8 },
  rowTitle: { fontSize: 16, fontWeight: "700", marginBottom: 4 },
  remindButton: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.2,
    borderRadius: 14,
    paddingVertical: 8,
    paddingHorizontal: 10,
    gap: 2,
    minWidth: 74,
  },
  remindText: { fontSize: 11, fontWeight: "700" },
  completedBadge: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.2,
    borderRadius: 14,
    paddingVertical: 8,
    paddingHorizontal: 10,
    gap: 2,
    minWidth: 74,
  },
  completedText: { fontSize: 11, fontWeight: "700", color: "#34D399" },
});