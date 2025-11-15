// app/(tabs)/explore.tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Collapsible } from '@/components/ui/collapsible';

const STORAGE_KEY = 'orbit.hasSeenOnboarding';

export default function ExploreScreen() {
  const router = useRouter();

  const handleReplayOnboarding = async () => {
    try {
      // Mark onboarding as "not seen" so the entry logic treats it as new again
      await AsyncStorage.setItem(STORAGE_KEY, 'false');
    } catch {
      // If something goes wrong, we still try to navigate
    }
    router.push('/onboarding');
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor="dark"
      // clean, no header icon
    >
      <ThemedView style={styles.container}>
        <ThemedText type="title">Explore Orbit</ThemedText>

        <ThemedText style={styles.subtitle}>
          Learn how Cleopatra can use Orbit to remember the places she loves.
        </ThemedText>

        <Collapsible title="How Orbit works">
          <ThemedText>
            Check in to venues, capture impressions with quick tags and notes, and
            build a personal orbit of meaningful places.
          </ThemedText>
        </Collapsible>

        <Collapsible title="Ideas for Cleopatra">
          <ThemedText>
            Save cozy cafés, wine bars, bookstores, galleries, and parks. Use notes
            to remember details like favorite drinks, staff, or moments.
          </ThemedText>
        </Collapsible>

        <Collapsible title="What&apos;s coming next">
          <ThemedText>
            Maps and QR check-ins, richer venue details, and ways to share orbits
            with friends are on the roadmap.
          </ThemedText>
        </Collapsible>

        <View style={styles.replayContainer}>
          <ThemedText style={styles.replayLabel}>
            Want to see the intro again?
          </ThemedText>
          <Pressable onPress={handleReplayOnboarding} style={styles.replayButton}>
            <ThemedText style={styles.replayButtonText}>
              Replay onboarding
            </ThemedText>
          </Pressable>
        </View>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  subtitle: {
    marginTop: 8,
    marginBottom: 16,
  },
  replayContainer: {
    marginTop: 32,
    paddingTop: 16,
    borderTopWidth: 1,
  },
  replayLabel: {
    marginBottom: 8,
  },
  replayButton: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
  },
  replayButtonText: {
    fontSize: 14,
  },
});
