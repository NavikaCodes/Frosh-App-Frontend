import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import {
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

const GLASS_BG = "rgba(255, 255, 255, 0.05)";
const GLASS_BORDER = "rgba(255, 255, 255, 0.2)";
const GLASS_SHEEN = ["rgba(255,255,255,0.14)", "rgba(255,255,255,0)"];

export default function BootcampScreen({ theme }) {
  // use theme if provided, else fallback colours
  const textPrimary = theme ? theme.textPrimary : "#0B1F4F";
  const textSecondary = theme ? theme.textSecondary : "#6F88B2";
  const accent = theme ? theme.accent : "#3794FF";
  const cardBg = theme ? theme.cardBg : "white";
  const shadowColor = theme ? theme.shadowColor : "#66AAFF";
  const lineColor = theme ? theme.lineColor : "#B8D9FF";

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      {/* ===== LIVE CLASS SECTION ===== */}
      <View style={styles.liveSection}>
        <View style={styles.liveHeadingRow}>
          <View style={[styles.headingLine, { backgroundColor: lineColor }]} />
          <Text style={[styles.liveHeading, { color: accent }]}>• LIVE CLASS •</Text>
          <View style={[styles.headingLine, { backgroundColor: lineColor }]} />
        </View>

        <BlurView
          intensity={150}
          tint="dark"
          experimentalBlurMethod="dimezisBlurView"
          style={[
            styles.liveCard,
            {
              backgroundColor: GLASS_BG,
              borderColor: GLASS_BORDER,
              shadowColor: shadowColor,
            },
          ]}
        >
          <LinearGradient
            colors={GLASS_SHEEN}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={styles.glassSheen}
            pointerEvents="none"
          />
          <LinearGradient
            colors={["#4DA2FF", "#2D7EFF"]}
            style={styles.liveIcon}
          >
            <MaterialCommunityIcons name="broadcast" size={34} color="#fff" />
          </LinearGradient>

          <View style={styles.classInfo}>
            <Text style={[styles.classTitle, { color: textPrimary }]}>
              Logical Reasoning
            </Text>
            <Text style={[styles.batch, { color: textSecondary }]}>
              A3 Batch
            </Text>
            <View style={styles.locationRow}>
              <Ionicons name="location-sharp" size={18} color="#6E7A95" />
              <Text style={styles.location}>LP 101</Text>
            </View>
          </View>

          <View style={styles.liveBadge}>
            <View style={styles.liveDot} />
            <Text style={styles.liveBadgeText}>LIVE</Text>
          </View>
        </BlurView>
      </View>

      {/* ===== TIMETABLE ===== */}
      <View style={styles.timeTableHeader}>
        <MaterialCommunityIcons name="calendar-month-outline" size={28} color="#3A82F6" />
        <Text style={[styles.timeTableTitle, { color: textPrimary }]}>My Timetable</Text>
      </View>

      <BlurView
        intensity={150}
        tint="dark"
        experimentalBlurMethod="dimezisBlurView"
        style={[
          styles.timetableCard,
          {
            backgroundColor: GLASS_BG,
            borderColor: GLASS_BORDER,
            shadowColor: shadowColor,
          },
        ]}
      >
        <LinearGradient
          colors={GLASS_SHEEN}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={styles.glassSheen}
          pointerEvents="none"
        />
        <View style={styles.tableHeader}>
          <Text style={[styles.headerCell, { flex: 1.4, color: textSecondary }]}>Time</Text>
          <Text style={[styles.headerCell, { color: textSecondary }]}>Mon</Text>
          <Text style={[styles.headerCell, { color: textSecondary }]}>Tue</Text>
          <Text style={[styles.headerCell, { color: textSecondary }]}>Wed</Text>
          <Text style={[styles.headerCell, { color: textSecondary }]}>Thu</Text>
          <Text style={[styles.headerCell, { color: textSecondary }]}>Fri</Text>
        </View>

        {/* Row 1 */}
        <View style={styles.tableRow}>
          <Text style={[styles.timeCell, { flex: 1.4, color: textPrimary }]}>09:00{"\n"}–10:00</Text>
          <View style={[styles.subjectBox, styles.green]}><Text style={styles.subjectText}>LR{"\n"}A3</Text></View>
          <View style={styles.emptyCell} />
          <View style={[styles.subjectBox, styles.green]}><Text style={styles.subjectText}>LR{"\n"}A3</Text></View>
          <View style={styles.emptyCell} />
          <View style={[styles.subjectBox, styles.green]}><Text style={styles.subjectText}>LR{"\n"}A3</Text></View>
        </View>

        {/* Row 2 */}
        <View style={styles.tableRow}>
          <Text style={[styles.timeCell, { flex: 1.4, color: textPrimary }]}>10:00{"\n"}–11:00</Text>
          <View style={styles.emptyCell} />
          <View style={[styles.subjectBox, styles.purple]}><Text style={styles.subjectText}>QA{"\n"}B1</Text></View>
          <View style={styles.emptyCell} />
          <View style={[styles.subjectBox, styles.purple]}><Text style={styles.subjectText}>QA{"\n"}B1</Text></View>
          <View style={styles.emptyCell} />
        </View>

        {/* Row 3 */}
        <View style={styles.tableRow}>
          <Text style={[styles.timeCell, { flex: 1.4, color: textPrimary }]}>11:00{"\n"}–12:00</Text>
          <View style={[styles.subjectBox, styles.yellow]}><Text style={styles.subjectText}>VA{"\n"}A2</Text></View>
          <View style={styles.emptyCell} />
          <View style={[styles.subjectBox, styles.yellow]}><Text style={styles.subjectText}>VA{"\n"}A2</Text></View>
          <View style={styles.emptyCell} />
          <View style={[styles.subjectBox, styles.yellow]}><Text style={styles.subjectText}>VA{"\n"}A2</Text></View>
        </View>

        {/* Row 4 (break) */}
        <View style={styles.tableRow}>
          <Text style={[styles.timeCell, { flex: 1.4, color: textPrimary }]}>12:00{"\n"}–01:00</Text>
          <Text style={[styles.dash, { color: textSecondary }]}>—</Text>
          <Text style={[styles.dash, { color: textSecondary }]}>—</Text>
          <Text style={[styles.dash, { color: textSecondary }]}>—</Text>
          <Text style={[styles.dash, { color: textSecondary }]}>—</Text>
          <Text style={[styles.dash, { color: textSecondary }]}>—</Text>
        </View>

        {/* Row 5 */}
        <View style={styles.tableRow}>
          <Text style={[styles.timeCell, { flex: 1.4, color: textPrimary }]}>02:00{"\n"}–03:00</Text>
          <View style={[styles.subjectBox, styles.blue]}><Text style={styles.subjectText}>RC{"\n"}C1</Text></View>
          <View style={styles.emptyCell} />
          <View style={[styles.subjectBox, styles.blue]}><Text style={styles.subjectText}>RC{"\n"}C1</Text></View>
          <View style={styles.emptyCell} />
          <View style={[styles.subjectBox, styles.blue]}><Text style={styles.subjectText}>RC{"\n"}C1</Text></View>
        </View>

        {/* Row 6 */}
        <View style={styles.tableRow}>
          <Text style={[styles.timeCell, { flex: 1.4, color: textPrimary }]}>03:00{"\n"}–04:00</Text>
          <View style={styles.emptyCell} />
          <View style={[styles.subjectBox, styles.red]}><Text style={styles.subjectText}>DI{"\n"}A1</Text></View>
          <View style={styles.emptyCell} />
          <View style={[styles.subjectBox, styles.red]}><Text style={styles.subjectText}>DI{"\n"}A1</Text></View>
          <View style={styles.emptyCell} />
        </View>

        {/* Row 7 */}
        <View style={styles.tableRow}>
          <Text style={[styles.timeCell, { flex: 1.4, color: textPrimary }]}>04:00{"\n"}–05:00</Text>
          <Text style={[styles.dash, { color: textSecondary }]}>—</Text>
          <Text style={[styles.dash, { color: textSecondary }]}>—</Text>
          <Text style={[styles.dash, { color: textSecondary }]}>—</Text>
          <Text style={[styles.dash, { color: textSecondary }]}>—</Text>
          <Text style={[styles.dash, { color: textSecondary }]}>—</Text>
        </View>

        <Text style={[styles.note, { color: textSecondary }]}>* Timetable is subject to change</Text>
      </BlurView>

      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 40,
    paddingHorizontal: 20,
  },

  // LIVE CLASS
  liveSection: { marginTop: 15 },
  liveHeadingRow: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
  headingLine: { flex: 1, height: 2 },
  liveHeading: {
    marginHorizontal: 12,
    fontWeight: "700",
    fontSize: 18,
    letterSpacing: 2,
  },

  liveCard: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 24,
    padding: 16,
    overflow: "hidden",
    borderWidth: 1,
    shadowOpacity: 0.12,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
    marginBottom: 24,
  },
  glassSheen: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "55%",
    borderTopLeftRadius: 23,
    borderTopRightRadius: 23,
  },
  liveIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  classInfo: { flex: 1 },
  classTitle: { fontSize: 18, fontWeight: "700" },
  batch: { fontSize: 14, marginBottom: 4 },
  locationRow: { flexDirection: "row", alignItems: "center" },
  location: { fontSize: 14, color: "#6E7A95", marginLeft: 4 },
  liveBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFE5E5",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  liveDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#FF3B30", marginRight: 6 },
  liveBadgeText: { color: "#FF3B30", fontWeight: "700", fontSize: 14 },

  // TIMETABLE
  timeTableHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  timeTableTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginLeft: 8,
  },
  timetableCard: {
    borderRadius: 24,
    padding: 16,
    overflow: "hidden",
    borderWidth: 1,
    shadowOpacity: 0.12,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
    marginBottom: 24,
  },
  tableHeader: {
    flexDirection: "row",
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E9F0",
  },
  headerCell: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
  },
  timeCell: {
    flex: 1.4,
    fontSize: 12,
    fontWeight: "500",
    textAlign: "left",
  },
  subjectBox: {
    flex: 1,
    borderRadius: 8,
    paddingVertical: 4,
    alignItems: "center",
    marginHorizontal: 2,
  },
  subjectText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#fff",
    textAlign: "center",
  },
  emptyCell: { flex: 1 },
  dash: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
  },
  note: {
    fontSize: 12,
    marginTop: 8,
    textAlign: "center",
  },

  green: { backgroundColor: "#34C759" },
  purple: { backgroundColor: "#AF52DE" },
  yellow: { backgroundColor: "#FFCC00" },
  blue: { backgroundColor: "#007AFF" },
  red: { backgroundColor: "#FF3B30" },

  // UPCOMING EVENT
  eventSection: { marginTop: 8 },
  eventHeadingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  eventHeading: {
    marginHorizontal: 12,
    fontWeight: "700",
    fontSize: 18,
    letterSpacing: 2,
  },
  eventCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 24,
    padding: 16,
    shadowOpacity: 0.12,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
    marginBottom: 12,
  },
  eventLeft: { flexDirection: "row", alignItems: "center", flex: 1 },
  eventIconContainer: { marginRight: 14 },
  eventDetails: { flex: 1 },
  eventTitle: { fontSize: 18, fontWeight: "700", marginBottom: 4 },
  infoRow: { flexDirection: "row", alignItems: "center", marginBottom: 2 },
  infoText: { fontSize: 14, marginLeft: 6 },
  arrowCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#3B82F6",
    justifyContent: "center",
    alignItems: "center",
  },
});