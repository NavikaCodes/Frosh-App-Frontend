import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { lightTheme } from "./LightScreen";
import { darkTheme } from "./DarkScreen";

const PROFILE = {
  name: "Navika Gupta",
  email: "navika.gupta@thapar.edu",
  rollNumber: "1025030472",
  branch: "CSE",
  phone: "7009232474",
  dob: "12 March 2006",
  bootcampBatch: "Not assigned yet",
  motherName: "Ritu Gupta",
  fatherName: "Amit Gupta",
};

function withAlpha(hex, alpha) {
  if (!hex || !hex.startsWith("#")) return hex;
  return `${hex}${alpha}`;
}

function InfoRow({ theme, icon, iconColor, label, value }) {
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
      <View
        style={[
          styles.iconCircle,
          { backgroundColor: withAlpha(iconColor, "26") },
        ]}
      >
        {icon(iconColor)}
      </View>
      <View style={[styles.cardDivider, { backgroundColor: theme.lineColor }]} />
      <View style={styles.cardTextWrap}>
        <Text style={[styles.cardLabel, { color: theme.textSecondary }]}>
          {label}
        </Text>
        <Text style={[styles.cardValue, { color: theme.textPrimary }]}>
          {value}
        </Text>
      </View>
    </View>
  );
}

export default function ProfileScreen() {
  const route = useRoute();
  const theme = route?.params?.theme || darkTheme;
  const isDarkMode = theme === darkTheme;
  const familyAccent = theme.secondaryAccent || "#B478FF";

  return (
    <>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
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
          {/* Header */}
          <View style={styles.header}>
            <Text style={[styles.headerTitle, { color: theme.textPrimary }]}>
              My Profile
            </Text>
            <TouchableOpacity
              style={[
                styles.editButton,
                {
                  backgroundColor: withAlpha(theme.accent, "1F"),
                  borderColor: withAlpha(theme.accent, "66"),
                  shadowColor: theme.shadowColor,
                },
              ]}
              activeOpacity={0.7}
            >
              <Feather name="edit-2" size={18} color={theme.accent} />
            </TouchableOpacity>
          </View>

          {/* Avatar */}
          <View style={styles.avatarWrap}>
            <View
              style={[
                styles.avatarCircle,
                {
                  backgroundColor: withAlpha(theme.accent, "14"),
                  borderColor: withAlpha(theme.accent, "80"),
                  shadowColor: theme.shadowColor,
                },
              ]}
            >
              <Ionicons name="person-outline" size={54} color={theme.accent} />
            </View>
          </View>

          {/* Name & email */}
          <Text style={[styles.name, { color: theme.textPrimary }]}>
            {PROFILE.name}
          </Text>
          <Text style={[styles.email, { color: theme.accent }]}>
            {PROFILE.email}
          </Text>

          {/* Info cards */}
          <View style={styles.list}>
            <InfoRow
              theme={theme}
              icon={(c) => (
                <MaterialCommunityIcons
                  name="card-account-details-outline"
                  size={22}
                  color={c}
                />
              )}
              iconColor={theme.accent}
              label="Roll Number"
              value={PROFILE.rollNumber}
            />
            <InfoRow
              theme={theme}
              icon={(c) => <Ionicons name="school-outline" size={22} color={c} />}
              iconColor={theme.accent}
              label="Branch"
              value={PROFILE.branch}
            />
            <InfoRow
              theme={theme}
              icon={(c) => <Feather name="phone" size={20} color={c} />}
              iconColor={theme.accent}
              label="Phone Number"
              value={PROFILE.phone}
            />
            <InfoRow
              theme={theme}
              icon={(c) => <Feather name="calendar" size={20} color={c} />}
              iconColor={theme.accent}
              label="Date of Birth"
              value={PROFILE.dob}
            />
            <InfoRow
              theme={theme}
              icon={(c) => <Ionicons name="people-outline" size={22} color={c} />}
              iconColor={theme.accent}
              label="Bootcamp Batch"
              value={PROFILE.bootcampBatch}
            />
            <InfoRow
              theme={theme}
              icon={(c) => <Ionicons name="person-outline" size={20} color={c} />}
              iconColor={familyAccent}
              label="Mother's Name"
              value={PROFILE.motherName}
            />
            <InfoRow
              theme={theme}
              icon={(c) => <Ionicons name="person-outline" size={20} color={c} />}
              iconColor={familyAccent}
              label="Father's Name"
              value={PROFILE.fatherName}
            />
          </View>
        </ScrollView>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: "800",
  },
  editButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    shadowOpacity: 0.3,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  avatarWrap: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  avatarCircle: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 1.5,
    justifyContent: "center",
    alignItems: "center",
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 20,
    elevation: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
  },
  email: {
    fontSize: 15,
    textAlign: "center",
    marginTop: 4,
    marginBottom: 24,
  },
  list: {
    gap: 14,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderWidth: 1,
    shadowOpacity: 0.15,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  iconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: "center",
    alignItems: "center",
  },
  cardDivider: {
    width: 1,
    height: 32,
    marginHorizontal: 14,
  },
  cardTextWrap: {
    flex: 1,
  },
  cardLabel: {
    fontSize: 13,
    marginBottom: 3,
  },
  cardValue: {
    fontSize: 17,
    fontWeight: "700",
  },
});