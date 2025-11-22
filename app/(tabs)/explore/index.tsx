// app/(tabs)/explore/index.tsx
import { Link } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';

import { OrbitHeader } from '@/components/OrbitHeader';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useOrbit } from '@/context/OrbitContext';

type Checkin = {
  venueId: string;
  type: 'quick' | 'meaningful';
  mood?: string | null;
  note?: string | null;
  createdAt?: string;
};

// SECTION KEYS
type SectionKey = 'yourOrbit' | 'build' | 'connections' | 'crossings';

// Time-of-day accent palette for Explore (local only; does not touch global theme)
type ExploreAccent = {
  border: string;
  pillBackground: string;
  filledBackground: string;
  filledText: string;
  backdrop: string;
};

// Kept for local accents if needed later
const EXPLORE_BACKDROP = '#303943';
const REPLAY_BUTTON_BG = '#E4C5AF';
const REPLAY_BUTTON_TEXT = '#FFFFFF';

const EXPLORE_ACCENT_DAY: ExploreAccent = {
  border: 'rgba(228, 197, 175, 0.8)',
  pillBackground: 'rgba(228, 197, 175, 0.18)',
  filledBackground: '#E4C5AF',
  filledText: '#15110F',
  backdrop: EXPLORE_BACKDROP,
};

const EXPLORE_ACCENT_NIGHT: ExploreAccent = {
  border: 'rgba(116, 181, 165, 0.9)',
  pillBackground: 'rgba(116, 181, 165, 0.22)',
  filledBackground: '#074F57',
  filledText: '#F5EBDD',
  backdrop: EXPLORE_BACKDROP,
};

function getExploreAccentForNow(): ExploreAccent {
  const hour = new Date().getHours();
  const isNight = hour < 6 || hour >= 18;
  return isNight ? EXPLORE_ACCENT_NIGHT : EXPLORE_ACCENT_DAY;
}

export default function ExploreRootScreen() {
  const { checkins, connectionsVisibility } = useOrbit();

  const allCheckins: Checkin[] = (checkins ?? []) as Checkin[];

  // Stats
  const { placesVisited, totalCheckins, moodsThisWeekCount } = useMemo(() => {
    const uniqueVenues = new Set<string>();
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const moods = new Set<string>();

    allCheckins.forEach((c) => {
      if (c.venueId) uniqueVenues.add(c.venueId);

      if (c.createdAt) {
        const created = new Date(c.createdAt);
        if (created >= weekAgo && c.mood) {
          moods.add(String(c.mood));
        }
      }
    });

    return {
      placesVisited: uniqueVenues.size,
      totalCheckins: allCheckins.length,
      moodsThisWeekCount: moods.size,
    };
  }, [allCheckins]);

  const [openSection, setOpenSection] = useState<SectionKey | null>('yourOrbit');
  const accent = useMemo(() => getExploreAccentForNow(), []);

  const toggleSection = (key: SectionKey) => {
    setOpenSection((current) => (current === key ? null : key));
  };

  // Visibility copy for the Connections section
  const visibilityLabel =
    connectionsVisibility === 'private'
      ? 'Private orbit'
      : connectionsVisibility === 'overlaps'
      ? 'Visible to overlaps'
      : 'Open to connections';

  const visibilityCopy =
    connectionsVisibility === 'private'
      ? 'Right now, only you can see your crossings. You can keep your orbit private, or choose to become visible to people whose paths genuinely overlap with yours.'
      : connectionsVisibility === 'overlaps'
      ? 'Your orbit is visible only to people who share real overlaps with you — places, times of day, and moods. No feeds, no follower counts, just quiet introductions.'
      : 'Your orbit is open to gentle introductions from people whose places, moods, and timing strongly echo your own. You can always step back to overlaps-only or fully private.';

  return (
    <ThemedView style={{ flex: 1 }}>
      {/* Shared Orbit header */}
      <OrbitHeader subtitle="your orbit, from a little distance" padded />

      {/* Gentle divider under the header to anchor the page */}
      <View
        style={{
          borderTopWidth: 0.5,
          borderTopColor: accent.border,
        }}
      />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 12,
          paddingBottom: 56,
        }}
      >
        {/* SECTION: Your Orbit */}
        <SectionContainer
          title="Your Orbit"
          subtitle="This is where you see the shape of your days."
          isOpen={openSection === 'yourOrbit'}
          onToggle={() => toggleSection('yourOrbit')}
          accent={accent}
        >
          {/* Soft intro line above the constellation */}
          <View style={{ marginBottom: 16 }}>
            <ThemedText
              style={{
                fontSize: 14,
                lineHeight: 20,
                opacity: 0.85,
              }}
            >
              From a distance you can see the shape of your days.
            </ThemedText>
          </View>

          {/* Constellation preview placeholder */}
          <View
            style={{
              borderRadius: 16,
              borderWidth: 1,
              borderColor: accent.border,
              padding: 16,
              marginBottom: 20,
            }}
          >
            <ThemedText
              style={{
                fontSize: 14,
                fontWeight: '600',
                marginBottom: 4,
              }}
            >
              Constellation preview
            </ThemedText>
            <ThemedText
              style={{
                fontSize: 13,
                opacity: 0.7,
                marginBottom: 8,
              }}
            >
              A simple sketch of the places you’ve visited. Just dots for now;
              lines will appear once there are enough visits to connect.
            </ThemedText>
            <View
              style={{
                height: 80,
                borderRadius: 12,
                borderWidth: 1,
                borderStyle: 'dashed',
                borderColor: accent.border,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <ThemedText
                style={{
                  fontSize: 12,
                  opacity: 0.6,
                }}
              >
                Constellation view coming soon
              </ThemedText>
            </View>
          </View>

          {/* Stats */}
          <View style={{ marginBottom: 24 }}>
            <ThemedText
              style={{
                fontSize: 14,
                fontWeight: '600',
                marginBottom: 8,
              }}
            >
              Stats
            </ThemedText>

            <View style={{ gap: 8 }}>
              <StatRow label="Places visited" value={placesVisited} />
              <StatRow label="Total check-ins" value={totalCheckins} />
              <StatRow
                label="Moods used this week"
                value={moodsThisWeekCount}
              />
            </View>
          </View>

          {/* Continue your reflections */}
          <View style={{ marginBottom: 20 }}>
            <ThemedText
              style={{
                fontSize: 14,
                fontWeight: '600',
                marginBottom: 6,
              }}
            >
              Continue your reflections
            </ThemedText>
            <ThemedText
              style={{
                fontSize: 13,
                opacity: 0.7,
                marginBottom: 12,
              }}
            >
              Revisit the venues where you’ve already left notes and add new
              layers.
            </ThemedText>

            <Link href="/(tabs)/explore/reflections" asChild>
              <Pressable
                style={({ pressed }) => ({
                  paddingHorizontal: 18,
                  paddingVertical: 11,
                  borderRadius: 999,
                  borderWidth: 1,
                  borderColor: accent.filledBackground,
                  alignSelf: 'flex-start',
                  backgroundColor: accent.filledBackground,
                  opacity: pressed ? 0.95 : 1,
                })}
              >
                <ThemedText
                  style={{
                    fontSize: 14,
                    fontWeight: '500',
                    color: '#FFFFFF',
                  }}
                >
                  Review your venue notes →
                </ThemedText>
              </Pressable>
            </Link>
          </View>

          {/* Orbit map link */}
          <View style={{ marginBottom: 8 }}>
            <ThemedText
              style={{
                fontSize: 14,
                fontWeight: '600',
                marginBottom: 6,
              }}
            >
              Your orbit on the map
            </ThemedText>
            <ThemedText
              style={{
                fontSize: 13,
                opacity: 0.7,
                marginBottom: 12,
              }}
            >
              Step onto a map view of this same orbit — the places you’ve marked
              in this city, gathered into a single field.
            </ThemedText>

            <Link href="/(tabs)/explore/map" asChild>
              <Pressable
                style={({ pressed }) => ({
                  paddingHorizontal: 18,
                  paddingVertical: 11,
                  borderRadius: 999,
                  borderWidth: 1,
                  borderColor: accent.filledBackground,
                  alignSelf: 'flex-start',
                  backgroundColor: accent.filledBackground,
                  opacity: pressed ? 0.95 : 1,
                })}
              >
                <ThemedText
                  style={{
                    fontSize: 14,
                    fontWeight: '500',
                    color: '#FFFFFF',
                  }}
                >
                  View your orbit on the map →
                </ThemedText>
              </Pressable>
            </Link>
          </View>
        </SectionContainer>

        {/* SECTION: Build Your Orbit */}
        <SectionContainer
          title="Build your orbit"
          subtitle="A small profile helps your connections feel more like you."
          isOpen={openSection === 'build'}
          onToggle={() => toggleSection('build')}
          accent={accent}
        >
          {/* Profile snippet */}
          <View style={{ marginBottom: 20 }}>
            <ThemedText
              style={{
                fontSize: 14,
                fontWeight: '600',
                marginBottom: 6,
              }}
            >
              Profile
            </ThemedText>
            <ThemedText
              style={{
                fontSize: 13,
                opacity: 0.7,
                marginBottom: 10,
              }}
            >
              First name, a small bio, the kinds of places you feel at home in.
              This is what others may see when your orbits overlap.
            </ThemedText>

            <Link href="/(tabs)/explore/profile" asChild>
              <Pressable
                style={({ pressed }) => ({
                  paddingHorizontal: 16,
                  paddingVertical: 10,
                  borderRadius: 999,
                  borderWidth: 1,
                  borderColor: accent.border,
                  alignSelf: 'flex-start',
                  backgroundColor: pressed
                    ? accent.pillBackground
                    : 'transparent',
                  opacity: pressed ? 0.9 : 1,
                })}
              >
                <ThemedText
                  style={{
                    fontSize: 14,
                    fontWeight: '500',
                  }}
                >
                  Edit profile →
                </ThemedText>
              </Pressable>
            </Link>
          </View>

          {/* Add / claim venue */}
          <View>
            <ThemedText
              style={{
                fontSize: 14,
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
                marginBottom: 10,
              }}
            >
              Suggest a new place, or claim a venue as an owner so its story can
              be told from the inside too.
            </ThemedText>

            <Link href="/(tabs)/explore/claim-venue" asChild>
              <Pressable
                style={({ pressed }) => ({
                  paddingHorizontal: 16,
                  paddingVertical: 10,
                  borderRadius: 999,
                  borderWidth: 1,
                  borderColor: accent.border,
                  alignSelf: 'flex-start',
                  backgroundColor: pressed
                    ? accent.pillBackground
                    : 'transparent',
                  opacity: pressed ? 0.9 : 1,
                })}
              >
                <ThemedText
                  style={{
                    fontSize: 14,
                    fontWeight: '500',
                  }}
                >
                  Add or claim a venue →
                </ThemedText>
              </Pressable>
            </Link>
          </View>
        </SectionContainer>

        {/* SECTION: Connections */}
        <SectionContainer
          title="Connections"
          subtitle="Where shared corners quietly turn into people."
          isOpen={openSection === 'connections'}
          onToggle={() => toggleSection('connections')}
          accent={accent}
        >
          <View style={{ marginBottom: 10 }}>
            <ThemedText
              style={{
                fontSize: 13,
                lineHeight: 20,
                opacity: 0.8,
              }}
            >
              Orbit notices when your orbit lightly touches other people’s —
              shared venues, overlapping moods, familiar corners in unfamiliar
              cities.
            </ThemedText>
          </View>

          <View style={{ marginBottom: 10 }}>
            <ThemedText
              style={{
                fontSize: 13,
                lineHeight: 20,
                opacity: 0.8,
              }}
            >
              Instead of feeds or follower counts, Connections surfaces a small
              handful of people whose lives seem to move with a similar gravity
              to yours.
            </ThemedText>
          </View>

          {/* Visibility status */}
          <View
            style={{
              marginTop: 8,
              marginBottom: 14,
              paddingHorizontal: 12,
              paddingVertical: 8,
              borderRadius: 999,
              borderWidth: 1,
              borderColor: accent.border,
              alignSelf: 'flex-start',
            }}
          >
            <ThemedText
              style={{
                fontSize: 12,
                fontWeight: '600',
                marginBottom: 2,
              }}
            >
              {visibilityLabel}
            </ThemedText>
            <ThemedText
              style={{
                fontSize: 12,
                lineHeight: 18,
                opacity: 0.75,
              }}
            >
              {visibilityCopy}
            </ThemedText>
          </View>

          {/* Button to full Connections page */}
          <Link href="/(tabs)/explore/connections" asChild>
            <Pressable
              style={({ pressed }) => ({
                marginTop: 4,
                paddingHorizontal: 16,
                paddingVertical: 10,
                borderRadius: 999,
                borderWidth: 1,
                borderColor: accent.filledBackground,
                alignSelf: 'flex-start',
                backgroundColor: accent.filledBackground,
                opacity: pressed ? 0.95 : 1,
              })}
            >
              <ThemedText
                style={{
                  fontSize: 14,
                  fontWeight: '500',
                  color: '#FFFFFF',
                }}
              >
                Open Connections →
              </ThemedText>
            </Pressable>
          </Link>
        </SectionContainer>

        {/* SECTION: Quiet crossings */}
        <SectionContainer
          title="Quiet crossings"
          subtitle="How places become shared corners, not just dots on a map."
          isOpen={openSection === 'crossings'}
          onToggle={() => toggleSection('crossings')}
          accent={accent}
        >
          <View style={{ marginBottom: 12 }}>
            <ThemedText
              style={{
                fontSize: 13,
                lineHeight: 20,
                opacity: 0.8,
              }}
            >
              Quiet crossings are the moments when a place stops being just your
              corner and starts to feel shared — when another life keeps showing
              up in the same rooms and hours you do.
            </ThemedText>
          </View>

          <View style={{ marginBottom: 12 }}>
            <ThemedText
              style={{
                fontSize: 13,
                lineHeight: 20,
                opacity: 0.8,
              }}
            >
              Over time, Orbit will surface these crossings as small, human
              hints — a familiar presence in a favorite café, a recurring
              evening crowd in the same bar, a museum regular who wanders the
              same galleries.
            </ThemedText>
          </View>

          <View style={{ marginBottom: 16 }}>
            <ThemedText
              style={{
                fontSize: 13,
                lineHeight: 20,
                opacity: 0.8,
              }}
            >
              Connections shows the people. Quiet crossings show you how the
              places themselves are carrying those possible introductions.
            </ThemedText>
          </View>

          <Link href="/(tabs)/venues/map" asChild>
            <Pressable
              style={({ pressed }) => ({
                paddingHorizontal: 16,
                paddingVertical: 10,
                borderRadius: 999,
                borderWidth: 1,
                borderColor: accent.border,
                alignSelf: 'flex-start',
                backgroundColor: pressed
                  ? accent.pillBackground
                  : 'transparent',
                opacity: pressed ? 0.9 : 1,
              })}
            >
              <ThemedText
                style={{
                  fontSize: 14,
                  fontWeight: '500',
                }}
              >
                See your crossings on the map →
              </ThemedText>
            </Pressable>
          </Link>
        </SectionContainer>
      </ScrollView>
    </ThemedView>
  );
}

type SectionProps = {
  title: string;
  subtitle?: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  accent: ExploreAccent;
};

function SectionContainer({
  title,
  subtitle,
  isOpen,
  onToggle,
  children,
  accent,
}: SectionProps) {
  return (
    <View
      style={{
        marginBottom: 32,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: accent.border,
      }}
    >
      <Pressable
        onPress={onToggle}
        style={({ pressed }) => ({
          paddingHorizontal: 16,
          paddingVertical: 14,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          opacity: pressed ? 0.7 : 1,
        })}
      >
        <View style={{ flex: 1, paddingRight: 12 }}>
          <ThemedText
            style={{
              fontSize: 16,
              fontWeight: '600',
              marginBottom: subtitle ? 2 : 0,
            }}
          >
            {title}
          </ThemedText>
          {subtitle && (
            <ThemedText
              style={{
                fontSize: 12,
                opacity: 0.7,
              }}
            >
              {subtitle}
            </ThemedText>
          )}
        </View>
        <ThemedText
          style={{
            fontSize: 16,
            opacity: 0.7,
          }}
        >
          {isOpen ? '–' : '+'}
        </ThemedText>
      </Pressable>

      {isOpen && (
        <View
          style={{
            paddingHorizontal: 16,
            paddingBottom: 16,
            paddingTop: 8,
            gap: 8,
          }}
        >
          {children}
        </View>
      )}
    </View>
  );
}

function StatRow({ label, value }: { label: string; value: number }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <ThemedText
        style={{
          fontSize: 13,
          opacity: 0.7,
        }}
      >
        {label}
      </ThemedText>
      <ThemedText
        style={{
          fontSize: 13,
          fontWeight: '600',
        }}
      >
        {value}
      </ThemedText>
    </View>
  );
}
