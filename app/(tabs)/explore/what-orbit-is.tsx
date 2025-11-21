// app/(tabs)/explore/what-orbit-is.tsx
import React from 'react';
import { ScrollView, View } from 'react-native';

import { OrbitHeader } from '@/components/OrbitHeader';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function WhatOrbitIsScreen() {
  return (
    <ThemedView style={{ flex: 1 }}>
      <OrbitHeader subtitle="what this app is" padded />

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 16,
          paddingBottom: 40,
        }}
      >
        <View style={{ marginBottom: 24 }}>
          <ThemedText
            style={{
              fontSize: 20,
              fontWeight: '700',
              textAlign: 'center',
              marginBottom: 12,
            }}
          >
            ORBIT — What This App Is
          </ThemedText>

          <ThemedText
            style={{
              fontSize: 14,
              lineHeight: 22,
              textAlign: 'center',
            }}
          >
            Orbit is a small place for big moments.
          </ThemedText>

          <ThemedText
            style={{
              fontSize: 14,
              lineHeight: 22,
              marginTop: 8,
              textAlign: 'center',
            }}
          >
            A private map of the cafés, galleries, bars, parks, and hidden
            corners that make your life feel alive.
          </ThemedText>

          <ThemedText
            style={{
              fontSize: 14,
              lineHeight: 22,
              marginTop: 8,
              textAlign: 'center',
              fontStyle: 'italic',
            }}
          >
            It’s a way of saying: “This mattered today.”
          </ThemedText>
        </View>

        <View style={{ marginBottom: 24 }}>
          <ThemedText
            style={{
              fontSize: 16,
              fontWeight: '600',
              marginBottom: 8,
            }}
          >
            What Orbit Does
          </ThemedText>

          <ThemedText style={{ fontSize: 14, lineHeight: 22, marginBottom: 8 }}>
            • Check in without being watched. Mark a place you visited and save
            the memory with a single tap.
          </ThemedText>

          <ThemedText style={{ fontSize: 14, lineHeight: 22, marginBottom: 8 }}>
            • See your own patterns. Your orbit grows like a constellation: the
            places you return to, the ones you discover, the ones that feel like
            home.
          </ThemedText>

          <ThemedText style={{ fontSize: 14, lineHeight: 22 }}>
            • Find a little serendipity. Explore new cafés, galleries, and
            venues curated by the people around you — not by ads or algorithms.
          </ThemedText>
        </View>

        <View style={{ marginBottom: 24 }}>
          <ThemedText
            style={{
              fontSize: 16,
              fontWeight: '600',
              marginBottom: 8,
            }}
          >
            Your Privacy, Protected
          </ThemedText>

          <ThemedText style={{ fontSize: 14, lineHeight: 22, marginBottom: 8 }}>
            Orbit never shares your location publicly. Your check-ins are
            yours. No social feed. No followers. No pressure.
          </ThemedText>

          <ThemedText style={{ fontSize: 14, lineHeight: 22, marginBottom: 8 }}>
            Your data isn’t sold, tracked, or traded. You control everything —
            what you save, what you delete, what you keep private forever.
          </ThemedText>

          <ThemedText style={{ fontSize: 14, lineHeight: 22 }}>
            Orbit is built to feel like a journal, not a billboard.
          </ThemedText>
        </View>
      </ScrollView>
    </ThemedView>
  );
}
