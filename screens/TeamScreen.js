import React, { useState, useRef, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  FlatList,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from '@expo/vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const H_PADDING = 12; 
const GRID_GAP = 8;    
const CARD_SIZE = Math.floor((width - H_PADDING * 2 - GRID_GAP) / 2);

const fallbackTheme = {
  bgGradient: ['#020B18', '#061528', '#041220'],
  textPrimary: '#FFFFFF',
  textSecondary: '#D5DDF0',
  cardBg: '#0A1A2E',
  accent: '#2F80FF',
  lineColor: 'rgba(255,255,255,0.1)',
};

// ---------- DATA ----------
const facultyData = [
  { id: 1, name: 'Dr. MD Singh', designation: 'President' },
  { id: 2, name: 'Dr. Hemdutt Joshi', designation: 'Vice President' },
  { id: 3, name: 'Dr. Vishal Gupta', designation: 'Vice President' },
  { id: 4, name: 'Dr. Avinash Chandra', designation: 'Vice President' },
  { id: 5, name: 'Dr. Devendar Kumar', designation: 'Vice President' },
  { id: 6, name: 'Dr. Tarunpreet Bhatia', designation: 'Vice President' },
];

const oscData = [
  { id: 1, name: 'Nandini', branch: 'ENC' },
  { id: 2, name: 'Snehil Jhanwar', branch: 'COPC' },
  { id: 3, name: 'Vanshaj Kaushik', branch: 'ENC' },
];

const coreData = [
  { id: 1, name: 'Aarush Sahu', branch: 'MEC' },
  { id: 2, name: 'Agamjot Kaur', branch: 'EEC' },
  { id: 3, name: 'Akshat Walia', branch: 'ENC' },
  { id: 4, name: 'Arpit Kumar', branch: 'ENC' },
  { id: 5, name: 'Dhruv Gupta', branch: 'AIML' },
  { id: 6, name: 'Gyanvi Narayan', branch: 'ECE' },
  { id: 7, name: 'Jatin Garg', branch: 'COE' },
  { id: 8, name: 'Karanbir Singh', branch: 'MEC' },
  { id: 9, name: 'Keshav Gupta', branch: 'ECE' },
  { id: 10, name: 'Lakshya Kaushik', branch: 'ECE' },
  { id: 11, name: 'Prabal Gupta', branch: 'EEC' },
  { id: 12, name: 'Ritagya Chitkara', branch: 'ELE' },
  { id: 13, name: 'Sabhya Mahajan', branch: 'ECE' },
  { id: 14, name: 'Utkarshini Mishra', branch: 'CCA' },
  { id: 15, name: 'Vignesh Jain', branch: 'COE' },
];

const mentorData = Array.from({ length: 94 }, (_, i) => ({
  id: i + 1,
  name: `Mentor ${i + 1}`,
}));

const tabs = ['faculty', 'osc', 'core', 'mentor'];

// ---------- COMPONENT ----------
export default function TeamScreen({ theme: themeProp }) {
  const navigation = useNavigation();
  const route = useRoute();
  const t = themeProp || route.params?.theme || fallbackTheme;
  const isDarkTheme = t.textPrimary?.toUpperCase() === '#FFFFFF';
  const [activeTab, setActiveTab] = useState('faculty');

  // --- Tab slider animation ---
  const [containerWidth, setContainerWidth] = useState(0);
  const sliderAnim = useRef(new Animated.Value(0)).current;

  // --- Screen fade + slide-out animations ---
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideOutAnim = useRef(new Animated.Value(0)).current;
  const isNavigating = useRef(false);

  // Animate slider when activeTab or containerWidth changes
  useEffect(() => {
    if (containerWidth === 0) return;
    const tabWidth = containerWidth / tabs.length;
    const targetOffset = tabs.indexOf(activeTab) * tabWidth;
    Animated.timing(sliderAnim, {
      toValue: targetOffset,
      duration: 300,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [activeTab, containerWidth]);

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

    Animated.timing(slideOutAnim, {
      toValue: 1,
      duration: 250,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      navigation.goBack();
    });
  };

  const bgColor = t.bgGradient?.[0] || '#020B18';

  // --- Render functions (unchanged) ---
  const renderFacultyItem = ({ item }) => (
    <View style={styles.gridItem}>
      <View style={[styles.card, { backgroundColor: t.cardBg, borderColor: t.lineColor }]}>
        <Image source={require('../assets/cos.avif')} style={styles.cardImage} />
      </View>
      <Text style={[styles.cardName, { color: t.textPrimary }]}>{item.name}</Text>
      <Text style={[styles.cardDesignation, { color: t.textSecondary }]}>{item.designation}</Text>
    </View>
  );

  const renderMentorItem = ({ item }) => (
    <View style={styles.gridItem}>
      <View style={[styles.card, { backgroundColor: t.cardBg, borderColor: t.lineColor }]}>
        <Image source={require('../assets/cos.avif')} style={styles.cardImage} />
      </View>
      <Text style={[styles.cardName, { color: t.textPrimary }]}>{item.name}</Text>
    </View>
  );

  const renderOscItem = ({ item, index }) => {
    const isLeft = index % 2 === 0;
    return (
      <View style={[styles.alternatingRow, { flexDirection: isLeft ? 'row' : 'row-reverse' }]}>
        <View style={[styles.card, { backgroundColor: t.cardBg, borderColor: t.lineColor }]}>
          <Image source={require('../assets/cos.avif')} style={styles.cardImage} />
        </View>
        <View style={[styles.textContainer, { alignItems: isLeft ? 'flex-start' : 'flex-end' }]}>
          <Text style={[styles.rowName, { color: t.textPrimary, textAlign: isLeft ? 'left' : 'right' }]}>{item.name}</Text>
          <Text style={[styles.rowDesignation, { color: t.textSecondary, textAlign: isLeft ? 'left' : 'right' }]}>{item.branch}</Text>
        </View>
      </View>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'faculty':
        return (
          <FlatList
            key="faculty-cols-2"
            data={facultyData}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={styles.gridRow}
            contentContainerStyle={styles.listContainer}
            renderItem={renderFacultyItem}
          />
        );
      case 'osc':
        return (
          <FlatList
            key="osc-cols-1"
            data={oscData}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContainer}
            renderItem={renderOscItem}
          />
        );
      case 'core':
        return (
          <FlatList
            key="core-cols-1"
            data={coreData}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContainer}
            renderItem={renderOscItem}
          />
        );
      case 'mentor':
        return (
          <FlatList
            key="mentor-cols-2"
            data={mentorData}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={styles.gridRow}
            contentContainerStyle={styles.listContainer}
            renderItem={renderMentorItem}
          />
        );
      default:
        return null;
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: bgColor }}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={isDarkTheme ? 'light-content' : 'dark-content'}
      />
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
                translateY: slideOutAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 300],
                }),
              },
            ],
          },
        ]}
      >
        <LinearGradient colors={t.bgGradient} style={styles.container}>
          <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.header}>
              <TouchableOpacity style={styles.backBtn} onPress={handleBack}>
                <Icon name="arrow-back" size={24} color={t.textPrimary} />
              </TouchableOpacity>
              <Text style={[styles.title, { color: t.textPrimary }]}>OUR TEAM</Text>
              <View style={{ width: 40 }} />
            </View>

            {/* Tab Bar with sliding indicator */}
            <View
              style={[styles.tabContainer, { borderBottomColor: t.lineColor }]}
              onLayout={(e) => {
                const { width } = e.nativeEvent.layout;
                setContainerWidth(width);
                if (width > 0) {
                  const initialOffset = tabs.indexOf(activeTab) * (width / tabs.length);
                  sliderAnim.setValue(initialOffset);
                }
              }}
            >
              {/* Sliding indicator line */}
              {containerWidth > 0 && (
                <Animated.View
                  style={[
                    styles.slider,
                    {
                      width: containerWidth / tabs.length,
                      transform: [{ translateX: sliderAnim }],
                      backgroundColor: t.accent,
                    },
                  ]}
                />
              )}

              {tabs.map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <TouchableOpacity
                    key={tab}
                    style={styles.tab}
                    onPress={() => setActiveTab(tab)}
                  >
                    <Text
                      numberOfLines={1}
                      style={[
                        styles.tabText,
                        {
                          color: isActive ? t.textPrimary : t.textSecondary,
                          fontWeight: isActive ? '700' : '500',
                        },
                      ]}
                    >
                      {tab.toUpperCase()}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <View style={{ flex: 1 }}>{renderContent()}</View>
          </SafeAreaView>
        </LinearGradient>
      </Animated.View>
    </View>
  );
}

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
    letterSpacing: 1,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
    borderBottomWidth: 1,
    marginHorizontal: 16,
    position: 'relative',
    flexWrap: 'nowrap', // ensures tabs stay in one row
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 8, // reduced slightly to prevent overflow
    flex: 1,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 14,
    letterSpacing: 0.5,
  },
  slider: {
    position: 'absolute',
    bottom: -1,
    left: 0,
    height: 3,
    borderRadius: 2,
  },
  listContainer: {
    paddingHorizontal: H_PADDING,
    paddingBottom: 30,
  },
  gridRow: {
    justifyContent: 'space-between',
  },
  card: {
    marginTop: 10,
    width: CARD_SIZE,
    height: CARD_SIZE,
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  gridItem: {
    width: CARD_SIZE,
    marginBottom: 10,
    alignItems: 'center',
  },
  cardName: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 6,
  },
  cardDesignation: {
    fontSize: 14,
    marginTop: 2,
  },
  alternatingRow: {
    alignItems: 'center',
    marginBottom: 8,
    paddingHorizontal: H_PADDING,
  },
  textContainer: {
    flex: 1,
    marginHorizontal: 12,
    justifyContent: 'center',
  },
  rowName: {
    fontSize: 26,
    fontWeight: '800',
  },
  rowDesignation: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 4,
  },
});