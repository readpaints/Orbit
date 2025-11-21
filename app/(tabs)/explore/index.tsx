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
type SectionKey = 'yourOrbit' | 'build' | 'connections' | 'what' | 'how';

// Time-of-day accent palette for Explore (local only; does not touch global theme)
type ExploreAccent = {
  border: string;
  pillBackground: string;
  filledBackground: string;
  filledText: string;
  backdrop: string;
};

const EXPLORE_ACCENT_DAY: ExploreAccent = {
  // warm, linen-gold accent for daytime
  border: 'rgba(228, 197, 175, 0.8)',
  pillBackground: 'rgba(228, 197, 175, 0.18)',
  filledBackground: '#E4C5AF',
  filledText: '#15110F',
  // a very dark, slightly warm backdrop so the page isn’t pure black
  backdrop: '#0C1011',
};

const EXPLORE_ACCENT_NIGHT: ExploreAccent = {
  // cooler, teal-indigo accent for evenings / late hours
  border: 'rgba(116, 165, 127, 0.9)',
  pillBackground: 'rgba(116, 165, 127, 0.20)',
  filledBackground: '#074F57',
  filledText: '#F5EBDD',
  // deep sea-green charcoal — keeps things dark but not flat black
  backdrop: '#041012',
};

function getExploreAccentForNow(): ExploreAccent {
  const hour = new Date().getHours();
  const isNight = hour < 6 || hour >= 18;
  return isNight ? EXPLORE_ACCENT_NIGHT : EXPLORE_ACCENT_DAY;
}

export default function ExploreRootScreen() {
  const { checkins, onboardingComplete } = useOrbit() as any;

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

  return (
    <ThemedView
      style={{
        flex: 1,
        backgroundColor: accent.backdrop,
      }}
    >
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
        style={{
          flex: 1,
        }}
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
                  backgroundColor: pressed
                    ? accent.filledBackground
                    : accent.filledBackground,
                  opacity: pressed ? 0.95 : 1,
                })}
              >
                <ThemedText
                  style={{
                    fontSize: 14,
                    fontWeight: '500',
                    color: accent.filledText,
                  }}
                >
                  Review your venue notes →
                </ThemedText>
              </Pressable>
            </Link>
          </View>

          {/* Orbit map link */}
          <View style={{ marginBottom: 28 }}>
            <Link href="/(tabs)/explore/map" asChild>
              <Pressable
                style={({ pressed }) => ({
                  paddingHorizontal: 18,
                  paddingVertical: 11,
                  borderRadius: 999,
                  borderWidth: 1,
                  borderColor: accent.filledBackground,
                  alignSelf: 'flex-start',
                  backgroundColor: pressed
                    ? accent.pillBackground
                    : accent.pillBackground,
                  opacity: pressed ? 0.95 : 1,
                })}
              >
                <ThemedText
                  style={{
                    fontSize: 14,
                    fontWeight: '500',
                    color: accent.filledText,
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
          subtitle="A small profile helps your notes and places feel more like you."
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
              Name, nickname, a few interests, the kinds of places you feel at
              home in.
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
                  backgroundColor: pressed ? accent.pillBackground : 'transparent',
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
                  backgroundColor: pressed ? accent.pillBackground : 'transparent',
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
          subtitle="Social echoes that may arrive later."
          isOpen={openSection === 'connections'}
          onToggle={() => toggleSection('connections')}
          accent={accent}
        >
          <ThemedText
            style={{
              fontSize: 13,
              lineHeight: 20,
              opacity: 0.8,
            }}
          >
            One day, your orbit might lightly touch other people’s orbits —
            shared venues, overlapping moods, familiar corners in unfamiliar
            cities. For now, this is just a private constellation. No
            followers, no feeds, no pressure.
          </ThemedText>
        </SectionContainer>

        {/* SECTION: What Orbit Is */}
        <SectionContainer
          title="What Orbit Is"
          subtitle="A small place for big moments."
          isOpen={openSection === 'what'}
          onToggle={() => toggleSection('what')}
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
              Orbit is a small place for the cafés, galleries, bars, parks, and
              corners that make your life feel alive — a quiet map of what
              mattered to you.
            </ThemedText>
          </View>

          {/* Link to philosophy page */}
          <Link href="/(tabs)/explore/philosophy" asChild>
            <Pressable
              style={({ pressed }) => ({
                paddingHorizontal: 16,
                paddingVertical: 10,
                borderRadius: 999,
                borderWidth: 1,
                borderColor: accent.border,
                alignSelf: 'flex-start',
                backgroundColor: pressed ? accent.pillBackground : 'transparent',
                opacity: pressed ? 0.9 : 1,
              })}
            >
              <ThemedText
                style={{
                  fontSize: 14,
                  fontWeight: '500',
                }}
              >
                Read the full story →
              </ThemedText>
            </Pressable>
          </Link>
        </SectionContainer>

        {/* SECTION: How Orbit Works */}
        <SectionContainer
          title="How Orbit works"
          subtitle="A quick explanation, with deeper pages if you want them."
          isOpen={openSection === 'how'}
          onToggle={() => toggleSection('how')}
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
              Orbit is a gentle log of the places that shape you. You check in,
              choose a mood, leave a few notes, and let the pattern slowly
              appear over time.
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
              No streaks, no scores. Just a record of how rooms, streets, cafés,
              and corners have met you.
            </ThemedText>
          </View>

          <Link href="/(tabs)/explore/how-orbit-works" asChild>
            <Pressable
              style={({ pressed }) => ({
                paddingHorizontal: 16,
                paddingVertical: 10,
                borderRadius: 999,
                borderWidth: 1,
                borderColor: accent.border,
                alignSelf: 'flex-start',
                backgroundColor: pressed ? accent.pillBackground : 'transparent',
                opacity: pressed ? 0.9 : 1,
              })}
            >
              <ThemedText
                style={{
                  fontSize: 14,
                  fontWeight: '500',
                }}
              >
                See the step-by-step →
              </ThemedText>
            </Pressable>
          </Link>
        </SectionContainer>

        {/* Replay onboarding (we'll probably move this to More later) */}
        <View
          style={{
            marginTop: 32,
            paddingTop: 18,
            borderTopWidth: 1,
            borderTopColor: accent.border,
            gap: 8,
          }}
        >
          <ThemedText
            style={{
              fontSize: 14,
              fontWeight: '600',
              marginBottom: 2,
            }}
          >
            Replay the introduction
          </ThemedText>
          <ThemedText
            style={{
              fontSize: 13,
              opacity: 0.7,
              marginBottom: 10,
            }}
          >
            Step back through the opening sequence and remember why you started
            using Orbit.
          </ThemedText>

          <Link href="/onboarding" asChild>
            <Pressable
              style={({ pressed }) => ({
                paddingHorizontal: 18,
                paddingVertical: 11,
                borderRadius: 999,
                borderWidth: 1,
                borderColor: accent.filledBackground,
                backgroundColor: pressed
                  ? accent.pillBackground
                  : accent.filledBackground,
                alignSelf: 'flex-start',
                opacity: pressed ? 0.95 : 1,
              })}
            >
              <ThemedText
                style={{
                  fontSize: 14,
                  fontWeight: '500',
                  color: accent.filledText,
                }}
              >
                Replay the introduction
              </ThemedText>
            </Pressable>
          </Link>

          {onboardingComplete === false && (
            <ThemedText
              style={{
                fontSize: 11,
                opacity: 0.6,
                marginTop: 4,
              }}
            >
              (You’re currently mid-onboarding; finishing it will return you
              here.)
            </ThemedText>
          )}
        </View>
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
