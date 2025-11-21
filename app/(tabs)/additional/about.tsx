// app/(tabs)/additional/about.tsx
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import React from 'react';
import { ScrollView, View } from 'react-native';

// Soft, warm, Orbit-inspired palette
const ABOUT_PALETTE = {
  canvas: '#F5EBDD',      // warm parchment
  card: '#EFE0CC',        // soft page
  ink: '#2B1A12',         // deep brown ink
  softInk: '#5A4130',     // warm, quieter ink
  border: '#D0B694',      // gentle page edge
};

export default function AboutOrbitScreen() {
  return (
    <ThemedView
      style={{
        flex: 1,
        backgroundColor: ABOUT_PALETTE.canvas,
      }}
    >
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 32,
          paddingBottom: 40,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Title */}
        <ThemedText
          style={{
            fontSize: 26,
            fontWeight: '600',
            marginBottom: 8,
            color: ABOUT_PALETTE.ink,
            letterSpacing: 1,
          }}
        >
          About Orbit
        </ThemedText>

        <ThemedText
          style={{
            fontSize: 15,
            opacity: 0.85,
            marginBottom: 28,
            lineHeight: 22,
            color: ABOUT_PALETTE.softInk,
          }}
        >
          A quiet companion for noticing where you’ve been, how it felt to be
          there, and the small rhythms that shape your days.
        </ThemedText>

        {/* Poetic Foundations */}
        <View style={{ gap: 18, marginBottom: 28 }}>
          <ThemedText
            style={{
              fontSize: 15,
              lineHeight: 24,
              color: ABOUT_PALETTE.ink,
            }}
          >
            Orbit sees a city the way artists do — not as grids or lists, but as
            rooms of meaning, corners of light, and walks you keep returning to.
          </ThemedText>

          <ThemedText
            style={{
              fontSize: 15,
              lineHeight: 24,
              color: ABOUT_PALETTE.ink,
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
              color: ABOUT_PALETTE.ink,
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
              color: ABOUT_PALETTE.ink,
            }}
          >
            It believes that connection comes not from profiles or prompts, but
            from drifting through the same rooms of the world — cafés, benches,
            museums, bars — and sometimes noticing the same people there.
          </ThemedText>
        </View>

        {/* Card: Credits & Version */}
        <View
          style={{
            borderRadius: 16,
            borderWidth: 1,
            borderColor: ABOUT_PALETTE.border,
            backgroundColor: ABOUT_PALETTE.card,
            padding: 18,
            shadowColor: '#000',
            shadowOpacity: 0.12,
            shadowRadius: 6,
            shadowOffset: { width: 0, height: 4 },
          }}
        >
          <ThemedText
            style={{
              fontSize: 15,
              fontWeight: '600',
              marginBottom: 6,
              color: ABOUT_PALETTE.ink,
            }}
          >
            Credits & version
          </ThemedText>

          <ThemedText
            style={{
              fontSize: 14,
              lineHeight: 22,
              opacity: 0.9,
              color: ABOUT_PALETTE.softInk,
            }}
          >
            Artwork, concept, and stories: David Read Lockhart.
          </ThemedText>

          <ThemedText
            style={{
              fontSize: 14,
              opacity: 0.75,
              marginTop: 8,
              color: ABOUT_PALETTE.softInk,
            }}
          >
            App version: 0.1.0 — early orbit.
          </ThemedText>
        </View>
      </ScrollView>
    </ThemedView>
  );
}
