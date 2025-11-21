// app/(tabs)/explore/philosophy.tsx
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { ScrollView } from 'react-native';

export default function PhilosophyScreen() {
  return (
    <ThemedView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingVertical: 24,
          gap: 16,
        }}
      >
        <ThemedText type="title">What Orbit is</ThemedText>

        <ThemedText type="default">
          Orbit is a small place for big moments — the mornings that soften you, the evenings that stay
          with you, and the corners of the world that unexpectedly become yours.
        </ThemedText>

        <ThemedText type="default">
          It isn’t a feed, a scoreboard, or a place to perform. There are no followers. No pressure.
        </ThemedText>

        <ThemedText type="default">
          When a place matters — truly matters — Orbit lets you hold onto the feeling and return to it with time.
        </ThemedText>
      </ScrollView>
    </ThemedView>
  );
}
