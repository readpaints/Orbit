// app/(tabs)/additional/index.tsx
import { Link } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, View } from 'react-native';

import { OrbitHeader } from '@/components/OrbitHeader';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

const ACCENT = '#5FB49C';
const ACCENT_MUTED = 'rgba(95,180,156,0.12)';

export default function AdditionalRootScreen() {
  return (
    <ThemedView
      style={{
        flex: 1,
        backgroundColor: '#05090B', // match Venues / Map deep backdrop
      }}
    >
      <OrbitHeader subtitle="account, about, settings" padded />

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 16,
          paddingBottom: 44,
          gap: 24,
        }}
      >
        {/* Intro card */}
        <View
          style={{
            borderRadius: 16,
            borderWidth: 1,
            borderColor: ACCENT,
            paddingHorizontal: 16,
            paddingVertical: 14,
            backgroundColor: ACCENT_MUTED,
          }}
        >
          <ThemedText
            style={{
              fontSize: 12,
              letterSpacing: 2,
              textTransform: 'uppercase',
              marginBottom: 4,
              opacity: 0.9,
            }}
          >
            ORBIT
          </ThemedText>
          <ThemedText
            style={{
              fontSize: 18,
              fontWeight: '600',
              marginBottom: 4,
            }}
          >
            The back of the house
          </ThemedText>
          <ThemedText
            style={{
              fontSize: 13,
              opacity: 0.85,
            }}
          >
            A quieter corner for the practical parts of Orbit — your details,
            the story behind the app, and the small switches that shape how it
            feels.
          </ThemedText>
        </View>

        {/* Account */}
        <SectionBlock title="Account">
          <Link href="/(tabs)/additional/account" asChild>
            <Pressable
              style={({ pressed }) => ({
                paddingHorizontal: 16,
                paddingVertical: 12,
                borderRadius: 14,
                borderWidth: 1,
                borderColor: ACCENT,
                marginBottom: 8,
                backgroundColor: pressed ? ACCENT_MUTED : 'transparent',
                opacity: pressed ? 0.95 : 1,
              })}
            >
              <ThemedText
                style={{
                  fontSize: 14,
                  fontWeight: '500',
                  marginBottom: 2,
                }}
              >
                Account →
              </ThemedText>
              <ThemedText
                style={{
                  fontSize: 12,
                  opacity: 0.8,
                }}
              >
                Where your name, email, and data live — kept simple, quiet, and
                under your control.
              </ThemedText>
            </Pressable>
          </Link>
        </SectionBlock>

        {/* About Orbit */}
        <SectionBlock title="About Orbit">
          <Link href="/(tabs)/additional/about" asChild>
            <Pressable
              style={({ pressed }) => ({
                paddingHorizontal: 16,
                paddingVertical: 12,
                borderRadius: 14,
                borderWidth: 1,
                borderColor: 'rgba(255,255,255,0.35)',
                marginBottom: 8,
                backgroundColor: pressed ? 'rgba(255,255,255,0.04)' : 'transparent',
                opacity: pressed ? 0.95 : 1,
              })}
            >
              <ThemedText
                style={{
                  fontSize: 14,
                  fontWeight: '500',
                  marginBottom: 2,
                }}
              >
                About Orbit →
              </ThemedText>
              <ThemedText
                style={{
                  fontSize: 12,
                  opacity: 0.8,
                }}
              >
                How this little app came to be, and the people and places woven
                into its orbit.
              </ThemedText>
            </Pressable>
          </Link>
        </SectionBlock>

        {/* Settings */}
        <SectionBlock title="Settings">
          <Link href="/(tabs)/additional/settings" asChild>
            <Pressable
              style={({ pressed }) => ({
                paddingHorizontal: 16,
                paddingVertical: 12,
                borderRadius: 14,
                borderWidth: 1,
                borderColor: 'rgba(255,255,255,0.35)',
                marginBottom: 8,
                backgroundColor: pressed ? 'rgba(255,255,255,0.04)' : 'transparent',
                opacity: pressed ? 0.95 : 1,
              })}
            >
              <ThemedText
                style={{
                  fontSize: 14,
                  fontWeight: '500',
                  marginBottom: 2,
                }}
              >
                Settings →
              </ThemedText>
              <ThemedText
                style={{
                  fontSize: 12,
                  opacity: 0.8,
                }}
              >
                Small adjustments for theme, data, and future tools — just
                enough to make Orbit feel like yours.
              </ThemedText>
            </Pressable>
          </Link>
        </SectionBlock>
      </ScrollView>
    </ThemedView>
  );
}

type SectionBlockProps = {
  title: string;
  children: React.ReactNode;
};

function SectionBlock({ title, children }: SectionBlockProps) {
  return (
    <View style={{ gap: 8 }}>
      <ThemedText
        style={{
          fontSize: 16,
          fontWeight: '600',
        }}
      >
        {title}
      </ThemedText>
      {children}
    </View>
  );
}
