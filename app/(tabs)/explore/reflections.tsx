// app/(tabs)/explore/reflections.tsx
import { Link } from 'expo-router';
import React, { useMemo } from 'react';
import { Pressable, ScrollView, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { VENUES } from '@/constants/venues';
import { useOrbit } from '@/context/OrbitContext';

type Checkin = {
  id: string;
  venueId: string;
  type: 'quick' | 'meaningful';
  mood?: string | null;
  note?: string | null;
  createdAt?: string;
};

type ExploreAccent = {
  border: string;
  softText: string;
};

const EXPLORE_ACCENT_DAY: ExploreAccent = {
  border: 'rgba(228, 197, 175, 0.8)',
  softText: 'rgba(21, 17, 15, 0.7)',
};

const EXPLORE_ACCENT_NIGHT: ExploreAccent = {
  border: 'rgba(116, 165, 127, 0.9)',
  softText: 'rgba(245, 235, 221, 0.8)',
};

function getExploreAccentForNow(): ExploreAccent {
  const hour = new Date().getHours();
  const isNight = hour < 6 || hour >= 18;
  return isNight ? EXPLORE_ACCENT_NIGHT : EXPLORE_ACCENT_DAY;
}

type ReflectionSummary = {
  venueId: string;
  venueName: string;
  neighborhood?: string;
  count: number;
  lastDate: Date | null;
  lastMood?: string | null;
  lastNote?: string | null;
};

export default function ReflectionsScreen() {
  const { checkins } = useOrbit() as any;
  const accent = useMemo(() => getExploreAccentForNow(), []);

  const reflections: ReflectionSummary[] = useMemo(() => {
    const allCheckins: Checkin[] = (checkins ?? []) as Checkin[];

    // Only keep checkins that feel like reflections:
    // - meaningful type, or
    // - has a note
    const reflective = allCheckins.filter((c) => {
      const hasNote = c.note && c.note.trim().length > 0;
      return c.type === 'meaningful' || hasNote;
    });

    if (reflective.length === 0) return [];

    const byVenue = new Map<string, ReflectionSummary>();

    reflective.forEach((c) => {
      const venue = VENUES.find((v) => v.id === c.venueId);
      if (!venue) return;

      const existing = byVenue.get(c.venueId);

      const createdAtDate =
        c.createdAt != null ? new Date(c.createdAt) : null;

      if (!existing) {
        byVenue.set(c.venueId, {
          venueId: c.venueId,
          venueName: venue.name,
          neighborhood: venue.neighborhood,
          count: 1,
          lastDate: createdAtDate,
          lastMood: c.mood ?? null,
          lastNote: c.note ?? null,
        });
      } else {
        const count = existing.count + 1;

        // Decide if this checkin is more recent
        let lastDate = existing.lastDate;
        let lastMood = existing.lastMood;
        let lastNote = existing.lastNote;

        if (
          createdAtDate &&
          (!lastDate || createdAtDate.getTime() > lastDate.getTime())
        ) {
          lastDate = createdAtDate;
          lastMood = c.mood ?? lastMood;
          lastNote = c.note ?? lastNote;
        }

        byVenue.set(c.venueId, {
          ...existing,
          count,
          lastDate,
          lastMood,
          lastNote,
        });
      }
    });

    const list = Array.from(byVenue.values());

    // Sort: most recent reflections first
    list.sort((a, b) => {
      if (!a.lastDate && !b.lastDate) return 0;
      if (!a.lastDate) return 1;
      if (!b.lastDate) return -1;
      return b.lastDate.getTime() - a.lastDate.getTime();
    });

    return list;
  }, [checkins]);

  return (
    <ThemedView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 40,
          paddingBottom: 40,
        }}
      >
        {/* Header copy */}
        <ThemedText
          style={{
            fontSize: 22,
            fontWeight: '600',
            marginBottom: 6,
          }}
        >
          Your reflections
        </ThemedText>
        <ThemedText
          style={{
            fontSize: 13,
            color: accent.softText,
            marginBottom: 18,
          }}
        >
          A quiet list of places you’ve written about — rooms, corners, and
          walks that left enough of an echo to put into words.
        </ThemedText>

        {reflections.length === 0 ? (
          <EmptyState />
        ) : (
          <View style={{ gap: 12 }}>
            {reflections.map((item) => (
              <ReflectionRow
                key={item.venueId}
                item={item}
                accent={accent}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </ThemedView>
  );
}

function EmptyState() {
  return (
    <View
      style={{
        marginTop: 12,
      }}
    >
      <ThemedText
        style={{
          fontSize: 14,
          opacity: 0.8,
          marginBottom: 8,
        }}
      >
        No reflections yet.
      </ThemedText>
      <ThemedText
        style={{
          fontSize: 13,
          opacity: 0.7,
          lineHeight: 20,
        }}
      >
        As you visit places and leave notes on them, the cafés, galleries, bars,
        and walks you’ve written about will gather here — a small index of the
        places that stayed with you.
      </ThemedText>
    </View>
  );
}

function ReflectionRow({
  item,
  accent,
}: {
  item: ReflectionSummary;
  accent: ExploreAccent;
}) {
  const { venueId, venueName, neighborhood, count, lastDate, lastMood, lastNote } =
    item;

  const dateLabel = lastDate
    ? lastDate.toLocaleDateString()
    : undefined;

  let secondaryLine = '';
  if (count === 1) {
    secondaryLine = '1 reflection';
  } else {
    secondaryLine = `${count} reflections`;
  }

  if (dateLabel) {
    secondaryLine += ` · last visit ${dateLabel}`;
  }

  return (
    <Link
      href={{
        pathname: '/(tabs)/venues/[id]',
        params: { id: venueId },
      }}
      asChild
    >
      <Pressable
        style={({ pressed }) => ({
          borderRadius: 14,
          borderWidth: 1,
          borderColor: accent.border,
          paddingHorizontal: 14,
          paddingVertical: 12,
          opacity: pressed ? 0.8 : 1,
        })}
      >
        <ThemedText
          style={{
            fontSize: 15,
            fontWeight: '600',
            marginBottom: 2,
          }}
        >
          {venueName}
        </ThemedText>

        {neighborhood ? (
          <ThemedText
            style={{
              fontSize: 12,
              opacity: 0.7,
              marginBottom: 4,
            }}
          >
            {neighborhood}
          </ThemedText>
        ) : null}

        <ThemedText
          style={{
            fontSize: 12,
            opacity: 0.8,
            marginBottom: lastNote ? 4 : 0,
          }}
        >
          {secondaryLine}
          {lastMood ? ` · mood: ${lastMood}` : ''}
        </ThemedText>

        {lastNote ? (
          <ThemedText
            numberOfLines={2}
            style={{
              fontSize: 12,
              opacity: 0.8,
            }}
          >
            “{lastNote.trim()}”
          </ThemedText>
        ) : null}
      </Pressable>
    </Link>
  );
}
