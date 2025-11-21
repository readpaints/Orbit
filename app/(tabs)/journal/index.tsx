// app/(tabs)/journal/index.tsx
import React, { useState } from 'react';
import { ScrollView, TextInput, View } from 'react-native';

import { OrbitHeader } from '@/components/OrbitHeader';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function JournalScreen() {
  const [text, setText] = useState('');

  // Local palette — warm notebook card, deep ink textarea.
  const cardColor = '#2b2118';
  const borderColor = '#8b6b48';
  const textareaColor = '#132024';
  const placeholderColor = '#c4aa86';

  return (
    <ThemedView style={{ flex: 1 }}>
      <OrbitHeader subtitle="journal" padded />

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 18,
          paddingBottom: 48,
          gap: 28,
        }}
      >
        {/* Intro copy */}
        <View style={{ gap: 8 }}>
          <ThemedText
            style={{
              fontSize: 14,
              lineHeight: 22,
              opacity: 0.95,
            }}
          >
            A quieter room for the parts of your days that don’t fit inside a
            single check-in — the thoughts, scenes, and small echoes worth
            keeping.
          </ThemedText>
        </View>

        {/* Today’s page */}
        <View
          style={{
            borderRadius: 20,
            borderWidth: 1,
            borderColor,
            backgroundColor: cardColor,
            padding: 18,
            gap: 14,
          }}
        >
          {/* Header row */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'baseline',
            }}
          >
            <ThemedText
              style={{
                fontSize: 16,
                fontWeight: '600',
              }}
            >
              Today’s page
            </ThemedText>

            <ThemedText
              style={{
                fontSize: 12,
                opacity: 0.6,
              }}
            >
              {new Date().toLocaleDateString()}
            </ThemedText>
          </View>

          <ThemedText
            style={{
              fontSize: 13,
              lineHeight: 20,
              opacity: 0.9,
            }}
          >
            Begin with a small scene, a sentence, or a passing moment. It
            doesn’t need polish — only presence.
          </ThemedText>

          {/* Text area */}
          <View
            style={{
              borderRadius: 16,
              borderWidth: 1,
              borderColor,
              paddingHorizontal: 12,
              paddingVertical: 10,
              minHeight: 150,
              justifyContent: 'flex-start',
              backgroundColor: textareaColor,
            }}
          >
            <TextInput
              multiline
              value={text}
              onChangeText={setText}
              placeholder="Sketch something you might want to remember…"
              placeholderTextColor={placeholderColor}
              style={{
                fontSize: 14,
                lineHeight: 22,
                padding: 0,
                color: '#f9f5eb',
              }}
            />
          </View>

          {/* Footer row */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 2,
            }}
          >
            <ThemedText
              style={{
                fontSize: 12,
                opacity: 0.75,
              }}
            >
              A quiet note is enough.
            </ThemedText>

            <ThemedText
              style={{
                fontSize: 12,
                opacity: 0.6,
              }}
            >
              page 1 — today
            </ThemedText>
          </View>
        </View>

        {/* Past pages placeholder */}
        <View style={{ gap: 6 }}>
          <ThemedText
            style={{
              fontSize: 14,
              fontWeight: '600',
            }}
          >
            Past pages (coming soon)
          </ThemedText>

          <ThemedText
            style={{
              fontSize: 13,
              lineHeight: 20,
              opacity: 0.8,
            }}
          >
            As your journal grows, this section becomes a soft archive — a list
            of days you’ve written about, like an old notebook kept close at
            hand.
          </ThemedText>
        </View>
      </ScrollView>
    </ThemedView>
  );
}
