import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Animated,
  Easing,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const AboutScreen = ({ theme }) => {
  const navigation = useNavigation();

  const sections = [
    {
      id: 'team',
      title: 'OUR TEAM',
      subtitle: 'Meet the minds behind Frosh',
      onPress: () => navigation.navigate('Team', { theme }),
    },
    {
      id: 'hostels',
      title: 'HOSTELS',
      subtitle: 'Your home away from home',
      onPress: () => navigation.navigate('Hostels', { theme }),
    },
    {
      id: 'societies',
      title: 'SOCIETIES',
      subtitle: 'Where passions find a platform',
      // ✅ FIX: now navigates to Societies with theme
      onPress: () => navigation.navigate('Societies', { theme }),
    },
    {
      id: 'life',
      title: 'LIFE AT THAPAR',
      subtitle: 'Beyond classrooms, a world of experiences',
      onPress: () => navigation.navigate('Life', { theme }),
    },
  ];

  // Entrance animations
  const fadeAnims = useRef(sections.map(() => new Animated.Value(0))).current;
  const translateAnims = useRef(sections.map(() => new Animated.Value(14))).current;

  // Press feedback animations
  const scaleAnims = useRef(sections.map(() => new Animated.Value(1))).current;
  const chevronAnims = useRef(sections.map(() => new Animated.Value(0))).current;

  const rowCount = 5;
  const marqueeAnims = useRef(
    Array.from({ length: rowCount }, () => new Animated.Value(0))
  ).current;

  const watermarkUnit = 'FROSH '.repeat(12);

  const rowSpeeds = [1500, 4000, 1500, 4000, 1500];
  const rowDirections = [1, -1, 1, -1, 1]; 

  const [unitWidth, setUnitWidth] = useState(0);
  const loopAnimationRef = useRef(null);

  const handleUnitLayout = useCallback((e) => {
    const w = e.nativeEvent.layout.width;
    setUnitWidth((prev) => (prev ? prev : w));
  }, []);

  const startMarquee = (width) => {
    // Stop any previous loop before starting a new one
    if (loopAnimationRef.current) {
      loopAnimationRef.current.stop();
    }

    const animations = marqueeAnims.map((anim, index) => {
      const direction = rowDirections[index];
      const startValue = direction === 1 ? 0 : -width;
      const toValue = direction === 1 ? -width : 0;
      anim.setValue(startValue);
      return Animated.loop(
        Animated.timing(anim, {
          toValue,
          duration: rowSpeeds[index],
          easing: Easing.linear,
          useNativeDriver: true,
        })
      );
    });

    loopAnimationRef.current = Animated.parallel(animations);
    loopAnimationRef.current.start();
  };

  useEffect(() => {
    const entrance = sections.map((_, i) =>
      Animated.parallel([
        Animated.timing(fadeAnims[i], {
          toValue: 1,
          duration: 380,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(translateAnims[i], {
          toValue: 0,
          duration: 380,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ])
    );
    Animated.stagger(70, entrance).start();

    return () => {
      marqueeAnims.forEach((anim) => anim.stopAnimation());
      if (loopAnimationRef.current) {
        loopAnimationRef.current.stop();
      }
    };
  }, []);

  // Start the marquee only once we know the real width of one unit block.
  useEffect(() => {
    if (unitWidth > 0) {
      startMarquee(unitWidth);
    }
  }, [unitWidth]);

  const handlePressIn = (i) => {
    Animated.parallel([
      Animated.spring(scaleAnims[i], {
        toValue: 0.97,
        speed: 20,
        bounciness: 2,
        useNativeDriver: true,
      }),
      Animated.timing(chevronAnims[i], {
        toValue: 1,
        duration: 150,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePressOut = (i) => {
    Animated.parallel([
      Animated.spring(scaleAnims[i], {
        toValue: 1,
        speed: 16,
        bounciness: 3,
        useNativeDriver: true,
      }),
      Animated.timing(chevronAnims[i], {
        toValue: 0,
        duration: 180,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.cardBg },
      ]}
    >
      <View
        style={[
          styles.bigCard,
          {
            backgroundColor: theme.cardBg,
            shadowColor: theme.shadowColor,
          },
        ]}
      >
        {/* Seamless marquee rows — each row is 2 copies of a short unit,
            translated by exactly one unit's width, so the loop reset is invisible */}
        <View style={styles.watermarkContainer} pointerEvents="none">
          {Array.from({ length: rowCount }).map((_, index) => (
            <Animated.View
              key={index}
              style={[
                styles.watermarkRow,
                { transform: [{ translateX: marqueeAnims[index] }] },
              ]}
            >
              <Text
                onLayout={index === 0 ? handleUnitLayout : undefined}
                style={[styles.watermarkText, { color: theme.accent }]}
                numberOfLines={1}
                ellipsizeMode="clip"
              >
                {watermarkUnit}
              </Text>
              <Text
                style={[styles.watermarkText, { color: theme.accent }]}
                numberOfLines={1}
                ellipsizeMode="clip"
              >
                {watermarkUnit}
              </Text>
            </Animated.View>
          ))}
        </View>

        <Text style={[styles.bigCardTitle, { color: theme.textPrimary }]}>
          About Us
        </Text>
        <View style={[styles.divider, { backgroundColor: theme.lineColor }]} />

        {sections.map((item, index) => (
          <Animated.View
            key={item.id}
            style={{
              opacity: fadeAnims[index],
              transform: [{ translateY: translateAnims[index] }],
            }}
          >
            <Pressable
              onPress={item.onPress}
              onPressIn={() => handlePressIn(index)}
              onPressOut={() => handlePressOut(index)}
              android_ripple={{ color: theme.lineColor, borderless: false }}
            >
              <Animated.View
                style={[
                  styles.optionRow,
                  index < sections.length - 1 && {
                    borderBottomWidth: 1,
                    borderBottomColor: theme.lineColor,
                  },
                  { transform: [{ scale: scaleAnims[index] }] },
                ]}
              >
                <View style={styles.optionTextContainer}>
                  <Text style={[styles.optionTitle, { color: theme.textPrimary }]}>
                    {item.title}
                  </Text>
                  <Text style={[styles.optionSubtitle, { color: theme.textSecondary }]}>
                    {item.subtitle}
                  </Text>
                </View>
                <Animated.View
                  style={{
                    transform: [
                      {
                        translateX: chevronAnims[index].interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, 4],
                        }),
                      },
                    ],
                  }}
                >
                  <Ionicons
                    name="chevron-forward"
                    size={22}
                    color={theme.textSecondary}
                  />
                </Animated.View>
              </Animated.View>
            </Pressable>
          </Animated.View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  bigCard: {
    flex: 1,
    borderRadius: 28,
    paddingVertical: 20,
    paddingHorizontal: 20,
    shadowOpacity: 0.25,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
    position: 'relative',
  },
  bigCardTitle: {
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  divider: {
    height: 1,
    marginBottom: 16,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
  },
  optionTextContainer: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  optionSubtitle: {
    fontSize: 14,
    fontWeight: '400',
  },
  watermarkContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingTop: 0,
    zIndex: 0,
    overflow: 'hidden',
  },
  watermarkRow: {
    flexDirection: 'row',
  },
  watermarkText: {
    fontSize: 73,
    fontFamily: 'Baloo2_800ExtraBold',
    opacity: 0.03,
    letterSpacing: 4,
    lineHeight: 85,
  },
});

export default AboutScreen;