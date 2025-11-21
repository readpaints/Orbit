// app/(tabs)/additional/account.tsx
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import React from 'react';
import { ScrollView, View } from 'react-native';

export default function AccountScreen() {
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
          Account
        </ThemedText>
        <ThemedText
          style={{
            fontSize: 13,
            opacity: 0.7,
            marginBottom: 20,
          }}
        >
          A simple place for basic account details. In early versions, everything stays
          on this device.
        </ThemedText>

        <View
          style={{
            borderRadius: 16,
            borderWidth: 1,
            padding: 16,
            marginBottom: 16,
          }}
        >
          <ThemedText
            style={{
              fontSize: 14,
              fontWeight: '600',
              marginBottom: 4,
            }}
          >
            Email
          </ThemedText>
          <ThemedText
            style={{
              fontSize: 13,
              opacity: 0.7,
            }}
          >
            Not set. In future versions, you&apos;ll be able to add an email for backup
            and export.
          </ThemedText>
        </View>

        <View
          style={{
            borderRadius: 16,
            borderWidth: 1,
            padding: 16,
            marginBottom: 16,
          }}
        >
          <ThemedText
            style={{
              fontSize: 14,
              fontWeight: '600',
              marginBottom: 4,
            }}
          >
            Data ownership
          </ThemedText>
          <ThemedText
            style={{
              fontSize: 13,
              lineHeight: 20,
              opacity: 0.8,
            }}
          >
            Your orbit is yours. The goal is for your notes and check-ins to live on your
            device first, with clear tools to export or delete them entirely.
          </ThemedText>
        </View>

        <ThemedText
          style={{
            fontSize: 12,
            opacity: 0.6,
            marginTop: 8,
          }}
        >
          As Orbit grows, this page will be where you manage identity, backups, and any
          connections to other devices.
        </ThemedText>
      </ScrollView>
    </ThemedView>
  );
}
