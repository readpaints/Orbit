// app/(tabs)/explore/profile.tsx
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import React from 'react';
import { ScrollView, TextInput, View } from 'react-native';

export default function ExploreProfileScreen() {
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
          Your profile
        </ThemedText>
        <ThemedText
          style={{
            fontSize: 13,
            opacity: 0.7,
            marginBottom: 16,
          }}
        >
          A light sketch of who you are and what kinds of places feel like home.
        </ThemedText>

        {[
          'Name',
          'Nickname',
          'Interests',
          'Places you feel at home',
          'What you’re looking for in new places',
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
                placeholder="(Coming soon – this will autosave.)"
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
                editable={false}
              />
            </View>
          </View>
        ))}

        <ThemedText
          style={{
            fontSize: 12,
            opacity: 0.6,
            marginTop: 8,
          }}
        >
          Later, this page will save to your device and gently inform what Orbit suggests
          to you.
        </ThemedText>
      </ScrollView>
    </ThemedView>
  );
}
