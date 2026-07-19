import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
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
  PanResponder,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
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

  // --- Glass pill slider animation ---
  const [containerWidth, setContainerWidth] = useState(0);
  const slideAnim = useRef(new Animated.Value(0)).current;

  // --- Screen fade + slide-out animations ---
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideOutAnim = useRef(new Animated.Value(0)).current;
  const isNavigating = useRef(false);

  // --- Full-screen swipe-to-change-page effect ---
  const contentDragX = useRef(new Animated.Value(-width * tabs.indexOf('faculty'))).current;
  const contentDragStartIndex = useRef(0);
  const contentDragStartValue = useRef(-width * tabs.indexOf('faculty'));
  const isContentDragging = useRef(false);

  const dragStartValue = useRef(0);
  const dragStartIndex = useRef(0);
  const isDragging = useRef(false);
  const containerWidthRef = useRef(0);
  const activeTabRef = useRef(activeTab);
  
  useEffect(() => {
    containerWidthRef.current = containerWidth;
  }, [containerWidth]);
  useEffect(() => {
    activeTabRef.current = activeTab;
  }, [activeTab]);

  const animateToTab = (tabId, duration = 300) => {
    if (containerWidth === 0) return;
    const tabWidth = containerWidth / tabs.length;
    const targetOffset = tabs.indexOf(tabId) * tabWidth;
    
    slideAnim.stopAnimation();
    
    Animated.timing(slideAnim, {
      toValue: targetOffset,
      duration,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    if (containerWidth === 0 || isDragging.current) return;
    animateToTab(activeTab);
  }, [activeTab, containerWidth]);

  useEffect(() => {
    if (isContentDragging.current) return;
    const idx = tabs.indexOf(activeTab);
    Animated.timing(contentDragX, {
      toValue: -idx * width,
      duration: 250,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [activeTab]);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, []);

  // --- Tab bar swipe gesture ---
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onStartShouldSetPanResponderCapture: () => false,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
        return (
          Math.abs(gestureState.dx) > 6 &&
          Math.abs(gestureState.dx) > Math.abs(gestureState.dy) * 1.5
        );
      },
      onPanResponderGrant: () => {
        isDragging.current = true;
        dragStartIndex.current = tabs.indexOf(activeTabRef.current);
        slideAnim.stopAnimation((value) => {
          dragStartValue.current = value;
        });
      },
      onPanResponderMove: (evt, gestureState) => {
        const width = containerWidthRef.current;
        if (width === 0) return;
        const tabWidth = width / tabs.length;
        const maxOffset = tabWidth * (tabs.length - 1);
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
        const tabWidth = width / tabs.length;
        const startIndex = dragStartIndex.current;
        const dx = gestureState.dx;
        const vx = gestureState.vx;

        const distanceThreshold = tabWidth * 0.18;
        const velocityThreshold = 0.25;

        let targetIndex = startIndex;
        if (dx > distanceThreshold || vx > velocityThreshold) {
          targetIndex = Math.min(tabs.length - 1, startIndex + 1);
        } else if (dx < -distanceThreshold || vx < -velocityThreshold) {
          targetIndex = Math.max(0, startIndex - 1);
        }

        const newTab = tabs[targetIndex];
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

  // --- Content swipe gesture - FULLY OPTIMIZED ---
  const contentPanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onStartShouldSetPanResponderCapture: () => false,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
        return (
          Math.abs(gestureState.dx) > 10 &&
          Math.abs(gestureState.dx) > Math.abs(gestureState.dy) * 1.5
        );
      },
      onPanResponderGrant: () => {
        isContentDragging.current = true;
        contentDragStartIndex.current = tabs.indexOf(activeTabRef.current);
        contentDragX.stopAnimation((value) => {
          contentDragStartValue.current = value;
        });
        slideAnim.stopAnimation((value) => {
          dragStartValue.current = value;
        });
      },
      onPanResponderMove: (evt, gestureState) => {
        const startIndex = contentDragStartIndex.current;
        let dx = gestureState.dx;
        
        if (startIndex === 0 && dx > 0) dx *= 0.35;
        if (startIndex === tabs.length - 1 && dx < 0) dx *= 0.35;
        
        // Directly set content position
        contentDragX.setValue(contentDragStartValue.current + dx);

        // Sync pill indicator - optimized calculation
        const cw = containerWidthRef.current;
        if (cw > 0) {
          const tabWidth = cw / tabs.length;
          const totalWidth = width * tabs.length;
          const currentOffset = contentDragStartValue.current + dx;
          const progress = -currentOffset / totalWidth;
          const pillPosition = progress * (cw - tabWidth);
          const clampedPill = Math.max(0, Math.min(cw - tabWidth, pillPosition));
          
          // Use setValue for immediate response
          slideAnim.setValue(clampedPill);
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        const startIndex = contentDragStartIndex.current;
        const dx = gestureState.dx;
        const vx = gestureState.vx;

        const distanceThreshold = width * 0.22;
        const velocityThreshold = 0.3;

        let targetIndex = startIndex;
        if ((dx < -distanceThreshold || vx < -velocityThreshold) && startIndex < tabs.length - 1) {
          targetIndex = startIndex + 1;
        } else if ((dx > distanceThreshold || vx > velocityThreshold) && startIndex > 0) {
          targetIndex = startIndex - 1;
        }

        const targetPillOffset = targetIndex * (containerWidthRef.current / tabs.length);
        
        // Use native driver for both animations
        Animated.parallel([
          Animated.timing(slideAnim, {
            toValue: targetPillOffset,
            duration: 250,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
          Animated.timing(contentDragX, {
            toValue: -targetIndex * width,
            duration: 250,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          })
        ]).start(() => {
          isContentDragging.current = false;
          if (targetIndex !== startIndex) {
            setActiveTab(tabs[targetIndex]);
          }
        });
      },
      onPanResponderTerminate: () => {
        const startIndex = contentDragStartIndex.current;
        isContentDragging.current = false;
        const startPillOffset = startIndex * (containerWidthRef.current / tabs.length);
        
        Animated.parallel([
          Animated.timing(slideAnim, {
            toValue: startPillOffset,
            duration: 200,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
          Animated.timing(contentDragX, {
            toValue: -startIndex * width,
            duration: 200,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          })
        ]).start();
      },
    })
  ).current;

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

  const glassBg = isDarkTheme
    ? 'rgba(255, 255, 255, 0.05)'
    : 'rgba(255, 255, 255, 0.35)';
  const glassBorder = isDarkTheme
    ? 'rgba(255, 255, 255, 0.2)'
    : 'rgba(255, 255, 255, 0.7)';
  const glassSheen = isDarkTheme
    ? ['rgba(255,255,255,0.14)', 'rgba(255,255,255,0)']
    : ['rgba(255,255,255,0.55)', 'rgba(255,255,255,0)'];

  const renderFacultyItem = useCallback(
    ({ item }) => (
      <View style={styles.gridItem}>
        <View style={[styles.card, { backgroundColor: t.cardBg, borderColor: t.lineColor }]}>
          <Image source={require('../assets/cos.avif')} style={styles.cardImage} />
        </View>
        <Text style={[styles.cardName, { color: t.textPrimary }]}>{item.name}</Text>
        <Text style={[styles.cardDesignation, { color: t.textSecondary }]}>{item.designation}</Text>
      </View>
    ),
    [t]
  );

  const renderMentorItem = useCallback(
    ({ item }) => (
      <View style={styles.gridItem}>
        <View style={[styles.card, { backgroundColor: t.cardBg, borderColor: t.lineColor }]}>
          <Image source={require('../assets/cos.avif')} style={styles.cardImage} />
        </View>
        <Text style={[styles.cardName, { color: t.textPrimary }]}>{item.name}</Text>
      </View>
    ),
    [t]
  );

  const renderOscItem = useCallback(
    ({ item, index }) => {
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
    },
    [t]
  );

  const renderContentForTab = (tabId) => {
    switch (tabId) {
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
            initialNumToRender={8}
            maxToRenderPerBatch={8}
            windowSize={5}
            removeClippedSubviews
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
            initialNumToRender={8}
            maxToRenderPerBatch={8}
            windowSize={5}
            removeClippedSubviews
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
            initialNumToRender={8}
            maxToRenderPerBatch={8}
            windowSize={5}
            removeClippedSubviews
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
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            windowSize={7}
            removeClippedSubviews
          />
        );
      default:
        return null;
    }
  };

  const tabPanes = useMemo(
    () =>
      tabs.map((tabId) => (
        <View key={tabId} style={{ width }}>
          {renderContentForTab(tabId)}
        </View>
      )),
    [t]
  );

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

            <BlurView
              intensity={80}
              tint={isDarkTheme ? 'dark' : 'light'}
              experimentalBlurMethod="dimezisBlurView"
              style={[
                styles.glassCard,
                {
                  backgroundColor: glassBg,
                  borderColor: glassBorder,
                  shadowColor: '#000',
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
                    const initialOffset = tabs.indexOf(activeTab) * (width / tabs.length);
                    slideAnim.setValue(initialOffset);
                  }
                }}
              >
                {containerWidth > 0 && (
                  <Animated.View
                    style={[
                      styles.slider,
                      {
                        width: containerWidth / tabs.length,
                        transform: [{ translateX: slideAnim }],
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
                            color: isActive ? '#FFFFFF' : t.textSecondary,
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
            </BlurView>

            <View
              style={{ flex: 1, overflow: 'hidden' }}
              {...contentPanResponder.panHandlers}
            >
              <Animated.View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  width: width * tabs.length,
                  transform: [{ translateX: contentDragX }],
                }}
              >
                {tabPanes}
              </Animated.View>
            </View>
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
  glassCard: {
    marginHorizontal: 16,
    marginTop: 4,
    marginBottom: 4,
    borderRadius: 24,
    height: 52,
    overflow: 'hidden',
    borderWidth: 1,
    shadowOpacity: 0.15,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  glassSheen: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '55%',
    borderTopLeftRadius: 23,
    borderTopRightRadius: 23,
  },
  tabsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    position: 'relative',
  },
  tab: {
    flex: 1,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabText: {
    fontSize: 13,
    letterSpacing: 0.5,
  },
  slider: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    borderRadius: 20,
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