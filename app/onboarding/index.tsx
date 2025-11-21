// app/onboarding/index.tsx

import { useRouter } from 'expo-router';
import React, { useCallback, useRef, useState } from 'react';
import {
    Dimensions,
    ImageBackground,
    NativeScrollEvent,
    NativeSyntheticEvent,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    View,
} from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useOrbit } from '@/context/OrbitContext';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

type OnboardingPage = {
  key: string;
  heading: string;
  body: string;
  image: any;  
};

const PAGES: OnboardingPage[] = [
  {
    key: 'page-1',
    heading: 'Orbit is a companion for the places that shape you —',
    body:
      'the cafés where mornings soften,\n' +
      'the galleries that change your breathing,\n' +
      'the corners that become small rituals.',
    image: require('@/assets/onboarding/Page1-companion.png'),
  },
  {
    key: 'page-2',
    heading: 'When a place resonates —',
    body:
      'a quiet bar, a perfect walk, a room filled with warm light —\n' +
      'you can mark it.\n' +
      'Not with stars, but with your own impression of what it meant.',
    image: require('@/assets/onboarding/Page2-resonates.png'),
  },
  {
    key: 'page-3',
    heading: 'Over time, these impressions gather',
    body:
      'into a constellation only you could draw —\n' +
      "a portrait of your life’s quieter truths.",
    image: require('@/assets/onboarding/Page3-constellation.png'),
  },
  {
    key: 'page-4',
    heading: 'Someone out there moves through the world as you do —',
    body:
      'loving the same corners,\n' +
      'returning to the same rooms,\n' +
      'feeling meaning in the same unexpected places.',
    image: require('@/assets/onboarding/Page4-shared-corners.png'),
  },
  {
    key: 'page-5',
    heading: 'Orbit listens for that deeper alignment —',
    body:
      'not shared footsteps,\n' +
      'but shared affection.\n' +
      'When your patterns echo, Orbit may gently ask if you’d like to meet.',
    image: require('@/assets/onboarding/Page5-alignment.png'),
  },
  {
    key: 'page-6',
    heading: 'Absolutely nothing is shared unless you choose it.',
    body:
      'Your moments are yours.\n' +
      'Your impressions are yours.\n' +
      'Orbit protects your pace and your privacy —\n' +
      'and lets connection unfold naturally.',
    image: require('@/assets/onboarding/Page6-privacy.png'),
  },
  {
    key: 'page-7',
    heading: 'Begin your orbit.',
    body:
      'Explore.\n' +
      'Discover.\n' +
      'Connect.\n' +
      'Meet.\n\n' +
      'Start marking the places that feel like yours.',
    image: require('@/assets/onboarding/Page7-your-path.png'),
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const { setOnboardingComplete } = useOrbit();

  const scrollRef = useRef<ScrollView | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleMomentumScrollEnd = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offsetX = event.nativeEvent.contentOffset.x;
      const newIndex = Math.round(offsetX / SCREEN_WIDTH);
      if (newIndex !== activeIndex) {
        setActiveIndex(newIndex);
      }
    },
    [activeIndex],
  );

  const goToPage = useCallback((index: number) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTo({ x: SCREEN_WIDTH * index, animated: true });
    setActiveIndex(index);
  }, []);

  const finishOnboarding = useCallback(() => {
    setOnboardingComplete(true);
    router.replace('/(tabs)');
  }, [router, setOnboardingComplete]);

  const handlePrimaryPress = useCallback(() => {
    const isLast = activeIndex === PAGES.length - 1;
    if (isLast) {
      finishOnboarding();
    } else {
      goToPage(activeIndex + 1);
    }
  }, [activeIndex, finishOnboarding, goToPage]);

  const handleSkip = useCallback(() => {
    finishOnboarding();
  }, [finishOnboarding]);

  const isLastPage = activeIndex === PAGES.length - 1;
  const primaryLabel = isLastPage ? 'Get started' : 'Next';

  return (
    <ThemedView style={styles.root}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        scrollEventThrottle={16}
      >
        {PAGES.map((page) => {
          const isLastCard = page.key === 'page-7';
          const isConstellation = page.key === 'page-3';

          return (
            <View key={page.key} style={styles.pageContainer}>
              <ImageBackground
                source={page.image}
                style={styles.imageBackground}
                resizeMode="cover"
              >
                {/* No dark overlay now – full-bright artwork */}
                <View style={styles.noOverlay} />

                <View style={styles.contentWrapper}>
                  <View
                    style={[
                      styles.cardWrapper,
                      isConstellation && styles.cardWrapperConstellation,
                      isLastCard && styles.cardWrapperLast,
                    ]}
                  >
                    <View style={styles.card}>
                      <ThemedText type="subtitle" style={styles.heading}>
                        {page.heading}
                      </ThemedText>

                      <ThemedText
                        style={isLastCard ? styles.bodyLast : styles.body}
                      >
                        {page.body}
                      </ThemedText>
                    </View>
                  </View>

                  <View style={styles.footer}>
                    <View style={styles.dotsRow}>
                      {PAGES.map((p, index) => {
                        const isActive = index === activeIndex;
                        return (
                          <View
                            key={p.key}
                            style={[
                              styles.dot,
                              isActive && styles.dotActive,
                            ]}
                          />
                        );
                      })}
                    </View>

                    <View style={styles.buttonsRow}>
                      <Pressable
                        onPress={handleSkip}
                        style={styles.secondaryButton}
                      >
                        <ThemedText style={styles.secondaryButtonText}>
                          Skip for now
                        </ThemedText>
                      </Pressable>

                      <Pressable
                        onPress={handlePrimaryPress}
                        style={styles.primaryButton}
                      >
                        <ThemedText style={styles.primaryButtonText}>
                          {primaryLabel}
                        </ThemedText>
                      </Pressable>
                    </View>
                  </View>
                </View>
              </ImageBackground>
            </View>
          );
        })}
      </ScrollView>
    </ThemedView>
  );
}

const CARD_MAX_WIDTH = Math.min(SCREEN_WIDTH * 0.85, 420);

const FUTURA_FAMILY = Platform.select({
  ios: 'Futura',
  android: 'sans-serif',
  default: 'System',
});

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#020617',
  },
  pageContainer: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
  },
  noOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
  },
  contentWrapper: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 40,
    justifyContent: 'space-between',
  },
  cardWrapper: {
    flexGrow: 1,
    justifyContent: 'center',
    // base position for most pages
    marginTop: -24,
  },
  cardWrapperConstellation: {
    // page 3: move card further UP so it sits in the cleaner star field
    marginTop: -40,
  },
  cardWrapperLast: {
    // page 7: move card DOWN so it stays clear of artwork
    marginTop: 40,
    marginBottom: 12,
  },
  card: {
    alignSelf: 'center',
    maxWidth: CARD_MAX_WIDTH,
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderRadius: 24,
    backgroundColor: 'rgba(15, 23, 42, 0.65)', // translucent card
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(148, 163, 184, 0.5)',
  },
  heading: {
    fontSize: 26,
    lineHeight: 34,
    marginBottom: 14,
    textAlign: 'center',
    fontFamily: FUTURA_FAMILY,
  },
  body: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
    fontFamily: FUTURA_FAMILY,
  },
  bodyLast: {
    fontSize: 19,
    lineHeight: 26,
    textAlign: 'center',
    fontFamily: FUTURA_FAMILY,
  },
  footer: {
    width: '100%',
    alignItems: 'center',
    gap: 16,
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(148, 163, 184, 0.5)',
  },
  dotActive: {
    width: 18,
    borderRadius: 999,
    backgroundColor: '#fbbf24',
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    width: '100%',
    maxWidth: CARD_MAX_WIDTH,
  },
  secondaryButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 999,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(148, 163, 184, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  secondaryButtonText: {
    fontSize: 15,
  },
  primaryButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fbbf24',
  },
  primaryButtonText: {
    fontSize: 15,
    fontWeight: '600',
  },
});
