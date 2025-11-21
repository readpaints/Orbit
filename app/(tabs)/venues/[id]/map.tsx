// app/(tabs)/venues/[id]/map.tsx
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { VENUES } from '@/constants/venues';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

export default function VenueMapScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const venue = VENUES.find((v) => v.id === id);

  if (!venue) {
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
            fontSize: 18,
            fontWeight: '600',
            marginBottom: 8,
          }}
        >
          Venue not found
        </ThemedText>
        <ThemedText
          style={{
            fontSize: 14,
            opacity: 0.7,
            textAlign: 'center',
          }}
        >
          This place slipped out of orbit. Try going back to Your places.
        </ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView
      style={{
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 40,
        paddingBottom: 40,
      }}
    >
      <ThemedText
        style={{
          fontSize: 20,
          fontWeight: '600',
          marginBottom: 8,
        }}
      >
        {venue.name}
      </ThemedText>
      <ThemedText
        style={{
          fontSize: 14,
          opacity: 0.7,
          marginBottom: 16,
        }}
      >
        {venue.neighborhood}
      </ThemedText>

      <View
        style={{
          flex: 1,
          borderRadius: 16,
          borderWidth: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 24,
        }}
      >
        <ThemedText
          style={{
            fontSize: 16,
            fontWeight: '600',
            marginBottom: 8,
          }}
        >
          Map view (coming soon)
        </ThemedText>
        <ThemedText
          style={{
            fontSize: 14,
            opacity: 0.7,
            textAlign: 'center',
          }}
        >
          Here you’ll see this place pinned in your orbit, using its real location.
        </ThemedText>
      </View>
    </ThemedView>
  );
}
