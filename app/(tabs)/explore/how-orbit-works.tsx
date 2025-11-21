// app/(tabs)/explore/how-orbit-works.tsx
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';
import React from 'react';
import { ScrollView, View } from 'react-native';

export default function HowOrbitWorksScreen() {
  return (
    <ThemedView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 40,
          paddingBottom: 40,
        }}
      >
        <ThemedText
          style={{
            fontSize: 22,
            fontWeight: '600',
            marginBottom: 6,
          }}
        >
          How Orbit works
        </ThemedText>

        <ThemedText
          style={{
            fontSize: 13,
            opacity: 0.7,
            marginBottom: 16,
          }}
        >
          A quick philosophy of why this app exists at all.
        </ThemedText>

        <View style={{ gap: 14 }}>
          <ThemedText
            style={{
              fontSize: 14,
              lineHeight: 22,
            }}
          >
            Orbit is a place to remember where you&apos;ve been — cafés, bars, galleries,
            walks, bookstores — and how those places met you. Each check-in is a small
            note: a mood, a line of text, a memory.
          </ThemedText>

          <ThemedText
            style={{
              fontSize: 14,
              lineHeight: 22,
            }}
          >
            Instead of tracking productivity or steps, Orbit tracks the rooms and
            corners that quietly hold your life. Over time, those points become a kind
            of constellation — not to optimize, but to notice.
          </ThemedText>

          <ThemedText
            style={{
              fontSize: 14,
              lineHeight: 22,
            }}
          >
            There are no streaks and no public feeds. Your orbit is private by default.
            The goal is to make reflection easier, not louder.
          </ThemedText>

          <ThemedText
            style={{
              fontSize: 14,
              lineHeight: 22,
            }}
          >
            When you look back later, you&apos;ll see not just where you went, but how
            you were. Orbit keeps a record of those soft details so you don&apos;t have
            to hold them all in your head.
          </ThemedText>
        </View>

        <Link href="/(tabs)/explore" asChild>
          <View
            style={{
              marginTop: 24,
              alignSelf: 'flex-start',
              paddingHorizontal: 16,
              paddingVertical: 10,
              borderRadius: 999,
              borderWidth: 1,
            }}
          >
            <ThemedText
              style={{
                fontSize: 14,
                fontWeight: '500',
              }}
            >
              Back to Explore
            </ThemedText>
          </View>
        </Link>
      </ScrollView>
    </ThemedView>
  );
}
