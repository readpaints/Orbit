// app/(tabs)/venues/map.tsx
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import React from 'react';

export default function VenuesMapPlaceholder() {
  return (
    <ThemedView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
      }}
    >
      <ThemedText
        style={{
          fontSize: 20,
          fontWeight: '600',
          marginBottom: 8,
        }}
      >
        Venues map (coming soon)
      </ThemedText>
      <ThemedText
        style={{
          fontSize: 14,
          opacity: 0.7,
          textAlign: 'center',
        }}
      >
        You’ll see your places here as pins on a simple orbit map.
      </ThemedText>
    </ThemedView>
  );
}
