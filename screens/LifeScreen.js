import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  Feather,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { lightTheme, darkTheme } from "./themes";

const { width } = Dimensions.get("window");
const PAGE_WIDTH = width - 36;

// ----- Page Data (4 pages) – cardTitle & cardDescription kept for floating card -----
const pages = [
  {
    id: "1",
    heroImage: require("../assets/cos.avif"),
    cardTitle: "Cultural OAT and\nShopping Complex",
    cardDescription:
      "A hub for shopping, dining, and student essentials at Thapar.",
    description:
      "The COS Complex at TIET offers a range of convenient stores and eateries for students. VI Mini Store sells electronic devices, accessories, and sports gear. Shadowz Salon and Spa provides beauty services, while Fashion Point offers skincare essentials. The Stationery Store supplies college essentials, and the Dessert Club offers sweet treats. Kabir Multi-Store stocks everyday essentials, and Pizza Nation serves unique pizzas. Honey Coffee Cafe is a vegetarian snack spot. Iqbal Juice Centre offers fresh juices, and RS Laundry handles garment care.",
  },
  {
    id: "2",
    heroImage: require("../assets/cos.avif"),
    cardTitle: "Sports Complex",
    cardDescription: "World-class facilities for athletes and fitness lovers.",
    description:
      "Sports Complex TIET has many comprehensive sports facilities, from courts for basketball, volleyball, badminton, and tennis to a swimming pool, a cricket ground, and so on. The sports department organises various tournaments, such as URJA, Thaparlympics, SPADES, IGNITE, and the Annual Athletic Meet. Tracksuits with T-shirts are given to freshers for easy identification, providing an impetus to fitness and enthusiasm. Eight full-time coaches and a Deputy Director of Sports ensure coaching and organisation of a high order.",
  },
  {
    id: "3",
    heroImage: require("../assets/cos.avif"),
    cardTitle: "Nava Nalanda\nLibrary",
    cardDescription: "The academic heart of Thapar Institute.",
    description:
      "The Nava Nalanda Library at Thapar Institute is a state-of-the-art facility offering a vast collection of academic resources, including books, journals, and digital materials. It provides a serene environment for study and research, equipped with spacious reading areas, group discussion rooms, and access to online resources. The library's user-friendly services and knowledgeable staff support the academic endeavours of students and faculty, fostering a culture of learning and intellectual growth on campus.",
  },
  {
    id: "4",
    heroImage: require("../assets/cos.avif"),
    cardTitle: "Central Park",
    cardDescription: "A green oasis in the heart of campus.",
    description:
      "The Central Park serves as an oasis of tranquillity amidst the academic bustle. Its lush-green abode helps students to relax and unwind. The sparkling fountains add up to the soothing ambience, their gentle murmur creating a calming backdrop. The fresh air and open space foster a sense of community and well-being among the students, encouraging spontaneous gatherings and peaceful solitude alike. The seating areas in the lap of nature invite both quiet reflection and lively conversations, making the park a cherished retreat.",
  },
];

export default function LifeScreen({ navigation }) {
  const route = useRoute();
  const theme = route.params?.theme || lightTheme;
  const isDark = theme === darkTheme;

  console.log("LifeScreen theme:", isDark ? "darkTheme" : "lightTheme");

  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const onScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / PAGE_WIDTH);
    setCurrentIndex(index);
  };

  const styles = getStyles(theme);

  const renderPage = ({ item }) => (
    <ScrollView
      style={styles.pageContainer}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.pageContent}
    >
      {/* Hero Section with floating card */}
      <View style={styles.heroSection}>
        <Image
          source={item.heroImage}
          resizeMode="cover"
          style={styles.heroImage}
        />

        {/* Floating Card (kept) */}
        <View style={[
          styles.libraryCard,
          { backgroundColor: theme.cardBg || (isDark ? '#1A2040' : '#FFFFFF') }
        ]}>
          <Text style={styles.libraryTitle}>{item.cardTitle}</Text>
          <View style={styles.blueUnderline} />
          <Text style={styles.libraryDescription}>
            {item.cardDescription}
          </Text>
        </View>
      </View>

      {/* Description (no quote card) */}
      <View style={styles.contentContainer}>
        <Text style={styles.description}>{item.description}</Text>
      </View>

      {/* Dots */}
      <View style={styles.pagination}>
        {pages.map((_, dotIndex) => (
          <View
            key={dotIndex}
            style={[
              styles.dot,
              dotIndex === currentIndex && styles.activeDot,
            ]}
          />
        ))}
      </View>
    </ScrollView>
  );

  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={isDark ? "light-content" : "dark-content"}
      />

      <LinearGradient
        colors={theme.bgGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.background}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <View style={[styles.container, { backgroundColor: theme.cardBg }]}>
            {/* Header */}
            <View style={styles.header}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.goBack()}
              >
                <Feather name="arrow-left" size={36} color={theme.textPrimary} />
              </TouchableOpacity>
              <View style={styles.line} />
              <Text style={styles.headerTitle}>• LIFE AT THAPAR •</Text>
              <View style={styles.line} />
            </View>

            {/* Pages */}
            <FlatList
              ref={flatListRef}
              data={pages}
              renderItem={renderPage}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              onScroll={onScroll}
              scrollEventThrottle={16}
              style={styles.flatList}
              snapToInterval={PAGE_WIDTH}
              snapToAlignment="start"
              decelerationRate="fast"
            />
          </View>
        </SafeAreaView>
      </LinearGradient>
    </>
  );
}

// ---------- StyleSheet factory ----------
const getStyles = (theme) =>
  StyleSheet.create({
    background: { flex: 1 },

    container: {
      flex: 1,
      marginHorizontal: 18,
      marginTop: 30,
      marginBottom: 20,
      borderRadius: 34,
      paddingTop: 22,
      paddingBottom: 20,
      overflow: "hidden",
      shadowColor: theme.shadowColor,
      shadowOpacity: 0.18,
      shadowRadius: 22,
      shadowOffset: { width: 0, height: 10 },
      elevation: 10,
    },

    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 22,
      marginBottom: 22,
    },

    line: {
      flex: 1,
      height: 1,
      backgroundColor: theme.lineColor,
      marginHorizontal: 12,
    },

    headerTitle: {
      fontSize: 18,
      fontWeight: "700",
      color: theme.textPrimary,
      letterSpacing: 1.5,
    },

    flatList: { flex: 1 },

    pageContainer: {
      width: PAGE_WIDTH,
      flex: 1,
    },

    pageContent: {
      paddingBottom: 30,
    },

    heroSection: {
      alignItems: "center",
      marginBottom: 120,      // space for the floating card
    },

    heroImage: {
      width: "88%",
      height: 300,
      borderRadius: 30,
    },

    libraryCard: {
      position: "absolute",
      bottom: -92,
      width: "82%",
      borderRadius: 28,
      alignItems: "center",
      paddingHorizontal: 22,
      paddingTop: 24,
      paddingBottom: 22,
      shadowColor: theme.shadowColor,
      shadowOpacity: 0.16,
      shadowRadius: 20,
      shadowOffset: { width: 0, height: 8 },
      elevation: 12,
    },

    libraryTitle: {
      fontSize: 24,
      fontWeight: "800",
      color: theme.textPrimary,
      textAlign: "center",
    },

    blueUnderline: {
      width: 70,
      height: 4,
      borderRadius: 20,
      backgroundColor: theme.accent,
      marginTop: 10,
      marginBottom: 14,
    },

    libraryDescription: {
      fontSize: 14,
      lineHeight: 22,
      color: theme.textSecondary,
      textAlign: "center",
    },

    contentContainer: {
      paddingHorizontal: 26,
      marginTop: 10,
    },

    description: {
      fontSize: 16,
      color: theme.textSecondary,
      lineHeight: 28,
      textAlign: "justify",
      marginBottom: 10,
    },

    pagination: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 12,
      marginTop: 4,
    },

    dot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: "#D3E3F5",
      marginHorizontal: 6,
    },

    activeDot: {
      backgroundColor: theme.accent,
      width: 20,
    },
  });