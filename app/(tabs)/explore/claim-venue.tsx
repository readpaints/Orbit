// app/(tabs)/explore/claim-venue.tsx
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import React, { useState } from 'react';
import { Pressable, ScrollView, TextInput, View } from 'react-native';

export default function ClaimVenueScreen() {
  const [submitted, setSubmitted] = useState(false);

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
          Add or claim a venue
        </ThemedText>
        <ThemedText
          style={{
            fontSize: 13,
            opacity: 0.7,
            marginBottom: 16,
          }}
        >
          Suggest a new place, or tell us that you&apos;re connected to one that already
          exists.
        </ThemedText>

        {[
          'Venue name',
          'Neighborhood / area',
          'City',
          'Website or social link',
          'Your relationship to this venue (visitor, owner, staff, etc.)',
          'Anything we should know about this place',
        ].map((label) => (
          <View key={label} style={{ marginBottom: 16 }}>
            <ThemedText
              style={{
                fontSize: 13,
                marginBottom: 6,
              }}
            >
              {label}
            </ThemedText>
            <View
              style={{
                borderRadius: 12,
                borderWidth: 1,
              }}
            >
              <TextInput
                placeholder="(Form not wired yet – this is a sketch.)"
                placeholderTextColor="rgba(255,255,255,0.4)"
                multiline
                style={{
                  paddingHorizontal: 12,
                  paddingVertical: 10,
                  minHeight: 48,
                  fontSize: 14,
                  color: '#ffffff',
                  textAlignVertical: 'top',
                }}
              />
            </View>
          </View>
        ))}

        <Pressable
          onPress={() => setSubmitted(true)}
          style={({ pressed }) => ({
            marginTop: 8,
            alignSelf: 'flex-start',
            paddingHorizontal: 16,
            paddingVertical: 10,
            borderRadius: 999,
            borderWidth: 1,
            opacity: pressed ? 0.7 : 1,
          })}
        >
          <ThemedText
            style={{
              fontSize: 14,
              fontWeight: '500',
            }}
          >
            Submit
          </ThemedText>
        </Pressable>

        {submitted && (
          <ThemedText
            style={{
              fontSize: 12,
              opacity: 0.7,
              marginTop: 10,
            }}
          >
            Thanks for sending this in. In a future version, this will notify the people
            keeping the map up to date.
          </ThemedText>
        )}
      </ScrollView>
    </ThemedView>
  );
}
