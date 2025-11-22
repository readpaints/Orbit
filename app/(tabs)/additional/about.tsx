// app/(tabs)/additional/about.tsx
import React from 'react';
import { ScrollView, View } from 'react-native';

import { OrbitHeader } from '@/components/OrbitHeader';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

// Local card styling only – global background now comes from ThemedView / Colors.ts
const CARD_BG = '#E4C5AF';
const CARD_BORDER = 'rgba(0,0,0,0.12)';

export default function AboutOrbitScreen() {
  return (
    <ThemedView style={{ flex: 1 }}>
      <OrbitHeader title="About Orbit" padded />

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 16,
          paddingBottom: 40,
          gap: 24,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Title + intro */}
        <View style={{ gap: 8 }}>
          <ThemedText
            style={{
              fontSize: 24,
              fontWeight: '600',
            }}
          >
            About Orbit
          </ThemedText>

          <ThemedText
            style={{
              fontSize: 15,
              opacity: 0.85,
              lineHeight: 22,
            }}
          >
            A quiet companion for noticing where you’ve been, how it felt to be
            there, and the small rhythms that shape your days.
          </ThemedText>
        </View>

        {/* Poetic foundations */}
        <View style={{ gap: 16 }}>
          <ThemedText
            style={{
              fontSize: 15,
              lineHeight: 24,
              opacity: 0.95,
            }}
          >
            Orbit sees a city the way artists do — not as grids or lists, but as
            rooms of meaning, corners of light, and walks you keep returning to.
          </ThemedText>

          <ThemedText
            style={{
              fontSize: 15,
              lineHeight: 24,
              opacity: 0.95,
            }}
          >
            Each check-in is a small act of attention: a café where the morning
            sun opened a thought, a gallery that shifted your mood, a street you
            crossed again without meaning to.
          </ThemedText>

          <ThemedText
            style={{
              fontSize: 15,
              lineHeight: 24,
              opacity: 0.95,
            }}
          >
            Orbit speaks softly on purpose. No scores, no feeds, no pressure to
            perform. Just a quiet rhythm — a personal diary of lived
            intersections.
          </ThemedText>

          <ThemedText
            style={{
              fontSize: 15,
              lineHeight: 24,
              opacity: 0.95,
            }}
          >
            It believes that connection comes not from profiles or prompts, but
            from drifting through the same rooms of the world — cafés, benches,
            museums, bars — and sometimes noticing the same people there.
          </ThemedText>
        </View>

        {/* Credits & version card */}
        <View
          style={{
            marginTop: 8,
            borderRadius: 18,
            borderWidth: 1,
            borderColor: CARD_BORDER,
            backgroundColor: CARD_BG,
            paddingHorizontal: 18,
            paddingVertical: 14,
            shadowColor: '#000',
            shadowOpacity: 0.25,
            shadowRadius: 10,
            shadowOffset: { width: 0, height: 4 },
            elevation: 4,
          }}
        >
          <ThemedText
            style={{
              fontSize: 15,
              fontWeight: '600',
              marginBottom: 6,
              color: '#1B120C',
            }}
          >
            Credits & version
          </ThemedText>

          <ThemedText
            style={{
              fontSize: 14,
              lineHeight: 22,
              color: '#1B120C',
              opacity: 0.9,
            }}
          >
            Artwork, concept, and stories: David Read Lockhart.
          </ThemedText>

          <ThemedText
            style={{
              fontSize: 14,
              marginTop: 8,
              color: '#1B120C',
              opacity: 0.85,
            }}
          >
            App version: 0.1.0 — early orbit.
          </ThemedText>
        </View>
      </ScrollView>
    </ThemedView>
  );
}
