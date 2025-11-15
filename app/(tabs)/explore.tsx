// app/(tabs)/explore.tsx
import { StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Collapsible } from '@/components/ui/collapsible';

export default function ExploreScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor="dark"
      // 🔥 No headerImage — clean, minimal Explore screen
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
});
