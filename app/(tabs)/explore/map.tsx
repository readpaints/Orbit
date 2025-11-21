// app/(tabs)/explore/map.tsx
import { Link } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, View } from 'react-native';

import { OrbitHeader } from '@/components/OrbitHeader';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import Colors from '@/constants/Colors';

export default function ExploreMapScreen() {
  const accent =
    (Colors as any)?.dark?.accent ??
    (Colors as any)?.dark?.tint ??
    '#4ade80';

  const softBorder =
    (Colors as any)?.dark?.muted ?? 'rgba(148, 163, 184, 0.6)';

  const dotVisited = accent;
  const dotYou = '#60a5fa';
  const dotCurious = '#facc15';
  const dotSuggested = '#fb7185';

  const pillBaseStyle = {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: accent,
  } as const;

  return (
    <ThemedView
      style={{
        flex: 1,
        backgroundColor: '#05090B', // deep Orbit night, not flat black
      }}
    >
      <OrbitHeader subtitle="your places, from a little higher" padded />

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 16,
          paddingBottom: 40,
          gap: 20,
        }}
      >
        {/* Back buttons row */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: 12,
          }}
        >
          <Link href="/(tabs)/explore" asChild>
            <Pressable
              style={({ pressed }) => ({
                ...pillBaseStyle,
                flex: 1,
                alignItems: 'center',
                backgroundColor: pressed ? 'rgba(74, 222, 128, 0.12)' : 'transparent',
                opacity: pressed ? 0.85 : 1,
              })}
            >
              <ThemedText
                style={{
                  fontSize: 14,
                  fontWeight: '500',
                }}
              >
                Back to Explore
              </ThemedText>
            </Pressable>
          </Link>

          <Link href="/(tabs)/venues" asChild>
            <Pressable
              style={({ pressed }) => ({
                ...pillBaseStyle,
                flex: 1,
                alignItems: 'center',
                backgroundColor: pressed ? 'rgba(74, 222, 128, 0.12)' : 'transparent',
                opacity: pressed ? 0.85 : 1,
              })}
            >
              <ThemedText
                style={{
                  fontSize: 14,
                  fontWeight: '500',
                }}
              >
                Back to Venues
              </ThemedText>
            </Pressable>
          </Link>
        </View>

        {/* Title + description */}
        <View style={{ gap: 8 }}>
          <ThemedText
            style={{
              fontSize: 22,
              fontWeight: '700',
            }}
          >
            Your orbit on the map
          </ThemedText>

          <ThemedText
            style={{
              fontSize: 13,
              lineHeight: 20,
              opacity: 0.8,
            }}
          >
            One day this will be a quiet sky of your places — pins for cafés,
            galleries, bars, walks, and corners that keep calling you back. For
            now, this is a small sketch of what that sky might feel like.
          </ThemedText>
        </View>

        {/* Map placeholder card */}
        <View
          style={{
            borderWidth: 1,
            borderRadius: 24,
            padding: 16,
            borderColor: accent,
          }}
        >
          <View
            style={{
              borderWidth: 1,
              borderStyle: 'dashed',
              borderRadius: 20,
              borderColor: softBorder,
              paddingVertical: 40,
              paddingHorizontal: 12,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Simple “starfield” dots */}
            <View
              style={{
                position: 'absolute',
                top: 18,
                left: 40,
                width: 6,
                height: 6,
                borderRadius: 999,
                backgroundColor: accent,
              }}
            />
            <View
              style={{
                position: 'absolute',
                top: 32,
                right: 36,
                width: 4,
                height: 4,
                borderRadius: 999,
                backgroundColor: dotSuggested,
              }}
            />
            <View
              style={{
                position: 'absolute',
                bottom: 26,
                left: 60,
                width: 5,
                height: 5,
                borderRadius: 999,
                backgroundColor: dotCurious,
              }}
            />
            <View
              style={{
                position: 'absolute',
                bottom: 18,
                right: 70,
                width: 7,
                height: 7,
                borderRadius: 999,
                backgroundColor: dotYou,
              }}
            />

            <ThemedText
              style={{
                fontSize: 14,
                textAlign: 'center',
                lineHeight: 22,
              }}
            >
              Map view coming soon — each dot will become a place you know. Tap
              a pin to see the details and ask, “Need directions?” so Orbit can
              send you on your way.
            </ThemedText>
          </View>

          {/* Legend */}
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 16,
              marginTop: 16,
            }}
          >
            <LegendItem label="Visited" color={dotVisited} />
            <LegendItem label="You" color={dotYou} />
            <LegendItem label="Curious" color={dotCurious} />
            <LegendItem label="Suggested" color={dotSuggested} />
            <LegendItem label="Legend (coming later)" color={softBorder} />
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

type LegendItemProps = {
  label: string;
  color: string;
};

function LegendItem({ label, color }: LegendItemProps) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
      }}
    >
      <View
        style={{
          width: 8,
          height: 8,
          borderRadius: 999,
          backgroundColor: color,
        }}
      />
      <ThemedText
        style={{
          fontSize: 11,
          opacity: 0.8,
        }}
      >
        {label}
      </ThemedText>
    </View>
  );
}
