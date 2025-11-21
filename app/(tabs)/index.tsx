// app/(tabs)/index.tsx
import { Link } from 'expo-router';
import React, { useMemo } from 'react';
import { Pressable, ScrollView, View } from 'react-native';

import { OrbitHeader } from '@/components/OrbitHeader';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { MOOD_COLORS, PALETTE } from '@/constants/palette';
import { VENUES } from '@/constants/venues';
import { useOrbit } from '@/context/OrbitContext';

const HOME_MOODS = [
  'soft',
  'curious',
  'electric',
  'quiet',
  'cozy',
  'reflective',
  'wild',
] as const;

type HomeMood = (typeof HOME_MOODS)[number];

export default function HomeScreen() {
  const { selectedMood, setSelectedMood, getRecentCheckins, checkins } =
    useOrbit();

  const { greetingTitle, greetingSubtitle } = useMemo(
    () => buildGreeting(selectedMood as HomeMood | null),
    [selectedMood]
  );

  const recentCheckins = useMemo(() => {
    if (typeof getRecentCheckins === 'function') {
      return getRecentCheckins(5);
    }
    return [...checkins].slice(-5).reverse();
  }, [getRecentCheckins, checkins]);

  const suggestedVenues = useMemo(() => {
    return VENUES.slice(0, 3);
  }, []);

  // Accent color for CTAs — follows the selected mood if possible,
  // otherwise falls back to a calm default.
  const accentColor = useMemo(() => {
    const key =
      (selectedMood && MOOD_COLORS[selectedMood]) ? MOOD_COLORS[selectedMood] : 'moss';
    return PALETTE[key] ?? '#5FB49C';
  }, [selectedMood]);

  return (
    <ThemedView style={{ flex: 1 }}>
      {/* Shared header – subtitle removed to let ORBIT stand alone */}
      <OrbitHeader padded />

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 16,
          paddingBottom: 32,
          gap: 24,
        }}
      >
        {/* Greeting */}
        <View>
          <ThemedText type="title" style={{ marginBottom: 4 }}>
            {greetingTitle}
          </ThemedText>
          <ThemedText type="default">{greetingSubtitle}</ThemedText>
        </View>

        {/* Mood section */}
        <View>
          <ThemedText
            type="title"
            style={{ fontSize: 20, textAlign: 'center', marginBottom: 12 }}
          >
            What is your mood?
          </ThemedText>

          <ThemedText
            type="default"
            style={{
              marginBottom: 12,
              opacity: 0.9,
              textAlign: 'center',
            }}
          >
            A quick note to yourself about how today feels. No pressure to be
            precise.
          </ThemedText>

          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: 8,
              justifyContent: 'center',
            }}
          >
            {HOME_MOODS.map((mood) => (
              <MoodPill
                key={mood}
                label={mood}
                selected={selectedMood === mood}
                onPress={() => {
                  if (selectedMood === mood) {
                    setSelectedMood(null);
                  } else {
                    setSelectedMood(mood);
                  }
                }}
              />
            ))}
          </View>
        </View>

        {/* Suggestions */}
        <View>
          <ThemedText
            type="title"
            style={{ fontSize: 20, marginBottom: 4, textAlign: 'left' }}
          >
            Suggestions
          </ThemedText>
          <ThemedText
            type="default"
            style={{ marginBottom: 12, opacity: 0.9 }}
          >
            A few places that might fit the shape of today. These will grow
            smarter over time.
          </ThemedText>

          <View style={{ gap: 12 }}>
            {suggestedVenues.map((venue) => (
              <Link
                key={venue.id}
                href={{
                  pathname: '/(tabs)/venues/[id]',
                  params: { id: venue.id },
                }}
                asChild
              >
                <Pressable
                  style={{
                    paddingVertical: 10,
                  }}
                >
                  <ThemedText type="defaultSemiBold">
                    {venue.name}
                  </ThemedText>
                  <ThemedText
                    type="default"
                    style={{ opacity: 0.8, marginTop: 2 }}
                  >
                    {venue.neighborhood}
                  </ThemedText>
                  <ThemedText
                    type="default"
                    style={{ opacity: 0.8, marginTop: 4 }}
                  >
                    {venue.description}
                  </ThemedText>
                </Pressable>
              </Link>
            ))}
          </View>

          {/* Turn "Browse all venues" into a real Orbit-style button */}
          <Link href="/(tabs)/venues" asChild>
            <Pressable
              style={({ pressed }) => ({
                marginTop: 20,
                alignSelf: 'center',
                paddingHorizontal: 18,
                paddingVertical: 10,
                borderRadius: 999,
                borderWidth: 1,
                borderColor: accentColor,
                backgroundColor: pressed ? `${accentColor}33` : 'transparent',
                opacity: pressed ? 0.95 : 1,
              })}
            >
              <ThemedText type="defaultSemiBold">
                Browse all venues →
              </ThemedText>
            </Pressable>
          </Link>
        </View>

        {/* Recent visits */}
        <View>
          <ThemedText
            type="title"
            style={{ fontSize: 20, marginBottom: 4, textAlign: 'left' }}
          >
            Recent visits
          </ThemedText>
          <ThemedText
            type="default"
            style={{ marginBottom: 12, opacity: 0.9 }}
          >
            The last few places you’ve checked in.
          </ThemedText>

          {recentCheckins.length === 0 ? (
            <ThemedText type="default" style={{ opacity: 0.7 }}>
              Once you start marking visits, they’ll appear here.
            </ThemedText>
          ) : (
            <View style={{ gap: 10 }}>
              {recentCheckins.map((checkin: any) => {
                const venue = VENUES.find((v) => v.id === checkin.venueId);
                if (!venue) return null;

                return (
                  <Link
                    key={checkin.id}
                    href={{
                      pathname: '/(tabs)/venues/[id]',
                      params: { id: venue.id },
                    }}
                    asChild
                  >
                    <Pressable
                      style={{
                        paddingVertical: 8,
                        borderBottomWidth: 0.5,
                        borderBottomColor: 'rgba(255,255,255,0.1)',
                      }}
                    >
                      <ThemedText type="defaultSemiBold">
                        {venue.name}
                      </ThemedText>
                      <ThemedText
                        type="default"
                        style={{ opacity: 0.8, marginTop: 2 }}
                      >
                        {venue.neighborhood}
                      </ThemedText>

                      {checkin.mood ? (
                        <ThemedText
                          type="default"
                          style={{ marginTop: 4, opacity: 0.9 }}
                        >
                          Mood: {checkin.mood}
                        </ThemedText>
                      ) : null}

                      {checkin.note ? (
                        <ThemedText
                          type="default"
                          numberOfLines={2}
                          style={{ marginTop: 4, opacity: 0.9 }}
                        >
                          {checkin.note}
                        </ThemedText>
                      ) : null}
                    </Pressable>
                  </Link>
                );
              })}
            </View>
          )}
        </View>
      </ScrollView>
    </ThemedView>
  );
}

type MoodPillProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

function MoodPill({ label, selected, onPress }: MoodPillProps) {
  const key = MOOD_COLORS[label] ?? 'moss';
  const baseColor = PALETTE[key];

  const borderColor = selected ? baseColor : 'rgba(255,255,255,0.3)';
  const backgroundColor = selected ? `${baseColor}33` : 'transparent';

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 999,
        borderWidth: 1,
        borderColor,
        backgroundColor: pressed ? `${baseColor}55` : backgroundColor,
      })}
    >
      <ThemedText
        type="default"
        style={{
          textTransform: 'lowercase',
        }}
      >
        {label}
      </ThemedText>
    </Pressable>
  );
}

function buildGreeting(mood: HomeMood | null) {
  const now = new Date();
  const hour = now.getHours();

  let timeOfDay: 'night' | 'morning' | 'afternoon' | 'evening';
  if (hour < 5) timeOfDay = 'night';
  else if (hour < 12) timeOfDay = 'morning';
  else if (hour < 18) timeOfDay = 'afternoon';
  else timeOfDay = 'evening';

  if (!mood) {
    const baseTitle =
      timeOfDay === 'morning'
        ? 'Morning orbit.'
        : timeOfDay === 'afternoon'
        ? 'Afternoon orbit.'
        : timeOfDay === 'evening'
        ? 'Evening orbit.'
        : 'Late orbit.';

    const baseSubtitle =
      timeOfDay === 'morning'
        ? 'See where today might carry you.'
        : timeOfDay === 'afternoon'
        ? 'Pick up the thread of the day and see what calls you back.'
        : timeOfDay === 'evening'
        ? 'Look over the rooms and corners that might close your day gently.'
        : 'A quiet check-in before tomorrow begins again.';

    return {
      greetingTitle: baseTitle,
      greetingSubtitle: baseSubtitle,
    };
  }

  switch (mood) {
    case 'soft':
      return {
        greetingTitle: 'Soft orbit.',
        greetingSubtitle:
          'Let the day stay gentle. Choose places that feel like a deep breath.',
      };
    case 'curious':
      return {
        greetingTitle: 'Curious orbit.',
        greetingSubtitle:
          'Follow the corners you haven’t turned yet and see what appears.',
      };
    case 'electric':
      return {
        greetingTitle: 'Electric orbit.',
        greetingSubtitle:
          'Lean into the rooms with a little more hum, color, and noise.',
      };
    case 'quiet':
      return {
        greetingTitle: 'Quiet orbit.',
        greetingSubtitle:
          'Find the cafés, benches, and small streets that keep the volume low.',
      };
    case 'cozy':
      return {
        greetingTitle: 'Cozy orbit.',
        greetingSubtitle:
          'Return to the places that feel like a familiar chair and a warm light.',
      };
    case 'reflective':
      return {
        greetingTitle: 'Reflective orbit.',
        greetingSubtitle:
          'Revisit the corners that still echo with something you’re not done thinking about.',
      };
    case 'wild':
      return {
        greetingTitle: 'Wild orbit.',
        greetingSubtitle:
          'Pick somewhere that might surprise you a little — and see what it stirs up.',
      };
    default:
      return {
        greetingTitle: 'Today’s orbit.',
        greetingSubtitle:
          'Notice the places that meet you, and mark the ones that matter.',
      };
  }
}
