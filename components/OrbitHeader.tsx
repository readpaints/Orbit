// components/OrbitHeader.tsx
import React from 'react';
import { View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

type OrbitHeaderProps = {
  subtitle?: string;
  /**
   * If true, adds a bit more padding at the bottom of the header.
   * Most main screens pass padded to give breathing room before content.
   */
  padded?: boolean;
};

/**
 * Universal Orbit header
 * - Acts as the “logo bar” for the whole app.
 * - Light, linen-like during the day.
 * - Deep sea-green in the evening / night.
 * - Same structure everywhere; copy stays screen-specific via `subtitle`.
 */
export function OrbitHeader({ subtitle, padded }: OrbitHeaderProps) {
  const hour = new Date().getHours();
  const isNight = hour < 6 || hour >= 18;

  // Day / night palette is local to the header so we don’t disturb global theme files.
  const backgroundColor = isNight ? '#074F57' : '#F5EBDD'; // sea green at night, light paper by day
  const titleColor = isNight ? '#F5EBDD' : '#15110F'; // warm paper vs ink
  const subtitleColor = isNight
    ? 'rgba(245, 235, 221, 0.92)'
    : 'rgba(21, 17, 15, 0.72)';

  return (
    <ThemedView
      style={{
        backgroundColor,
        borderBottomWidth: 0.5,
        borderBottomColor: isNight
          ? 'rgba(0, 0, 0, 0.4)'
          : 'rgba(0, 0, 0, 0.1)',
      }}
    >
      <View
        style={{
          paddingTop: 48, // faux safe-area + breathing room
          paddingBottom: padded ? 16 : 8,
          paddingHorizontal: 20,
          alignItems: 'center',
        }}
      >
        {/* Wordmark logo */}
        <ThemedText
          style={{
            fontSize: 24,
            letterSpacing: 4,
            textAlign: 'center',
            fontWeight: '600',
            color: titleColor,
          }}
        >
          ORBIT
        </ThemedText>

        {subtitle ? (
          <ThemedText
            style={{
              marginTop: 4,
              fontSize: 14,
              textAlign: 'center',
              color: subtitleColor,
            }}
          >
            {subtitle}
          </ThemedText>
        ) : null}
      </View>
    </ThemedView>
  );
}

export default OrbitHeader;
