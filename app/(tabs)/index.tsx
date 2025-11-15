// app/(tabs)/index.tsx
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { getCurrentOrbitTheme, OrbitColors } from '../../constants/theme';
import { OrbitCheckin, useOrbit } from '../../context/OrbitContext';

const formatTime = (iso: string) => {
  const date = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.round(diffMs / 60000);

  if (diffMin < 1) return 'Just now';
  if (diffMin < 60) return `${diffMin} min ago`;

  const diffHours = Math.round(diffMin / 60);
  if (diffHours < 24) return `${diffHours} hr${diffHours === 1 ? '' : 's'} ago`;

  return date.toLocaleDateString();
};

const EmptyOrbit = ({ colors }: { colors: OrbitColors }) => (
  <View
    style={[
      styles.emptyState,
      {
        borderColor: colors.border,
        backgroundColor: colors.surfaceAlt,
      },
    ]}
  >
    <Text style={[styles.emptyTitle, { color: colors.text }]}>
      Your orbit is quiet… for now.
    </Text>
    <Text style={[styles.emptyBody, { color: colors.textMuted }]}>
      Visit a place on the Venues tab and check in. The story of your orbit
      will start appearing here.
    </Text>
  </View>
);

const CheckinCard = ({
  checkin,
  colors,
}: {
  checkin: OrbitCheckin;
  colors: OrbitColors;
}) => {
  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
        },
      ]}
    >
      <Text style={[styles.cardTitle, { color: colors.text }]}>
        {checkin.venueName}
      </Text>
      <Text style={[styles.cardMeta, { color: colors.textMuted }]}>
        {formatTime(checkin.createdAt)}
      </Text>

      {checkin.tags.length > 0 && (
        <View style={styles.tagsRow}>
          {checkin.tags.map((tag) => (
            <View
              key={tag}
              style={[
                styles.tagPill,
                { backgroundColor: colors.chipBackground },
              ]}
            >
              <Text style={[styles.tagText, { color: colors.chipText }]}>
                {tag}
              </Text>
            </View>
          ))}
        </View>
      )}

      {checkin.note ? (
        <Text style={[styles.cardNote, { color: colors.text }]}>
          {checkin.note.length > 180
            ? `${checkin.note.slice(0, 180)}…`
            : checkin.note}
        </Text>
      ) : (
        <Text
          style={[
            styles.cardNoteMuted,
            { color: colors.textMuted },
          ]}
        >
          No note this time — just a feeling she wanted to remember.
        </Text>
      )}
    </View>
  );
};

/** Seed / suggested orbits */

type SeedOrbit = {
  id: string;
  title: string;
  locationLine: string;
  status: string;
  description: string;
};

const SEED_ORBITS: SeedOrbit[] = [
  {
    id: 'seed-1',
    title: 'Museo del Prado – Evening Orbit',
    locationLine: 'Madrid · Evenings · Today 18:30',
    status: 'Active orbit',
    description:
      'A recurring evening loop through your favorite galleries. Track how often you return here.',
  },
  {
    id: 'seed-2',
    title: 'Retiro Park – Walk + Notes',
    locationLine: 'Parque del Retiro · Mornings · Most weekdays',
    status: 'Core orbit',
    description:
      'One of your main movement patterns. Great place to jot reflections and notice mood shifts.',
  },
  {
    id: 'seed-3',
    title: 'Neighborhood Café – Check-in',
    locationLine: 'Lavapiés · Afternoons · Sometimes',
    status: 'Emerging orbit',
    description:
      'A newer stop in your pattern. See if it becomes a regular part of your orbit over time.',
  },
];

const SeedOrbitCard = ({
  orbit,
  colors,
}: {
  orbit: SeedOrbit;
  colors: OrbitColors;
}) => {
  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
        },
      ]}
    >
      <Text style={[styles.cardTitle, { color: colors.text }]}>
        {orbit.title}
      </Text>
      <Text style={[styles.cardMeta, { color: colors.textMuted }]}>
        {orbit.locationLine}
      </Text>
      <Text style={[styles.seedStatus, { color: colors.accent }]}>
        {orbit.status}
      </Text>
      <Text style={[styles.cardNote, { color: colors.text }]}>
        {orbit.description}
      </Text>
    </View>
  );
};

export default function HomeScreen() {
  const { checkins } = useOrbit();
  const theme = getCurrentOrbitTheme();
  const { colors, name: themeName } = theme;

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
    >
      <Text style={[styles.appTitle, { color: colors.text }]}>Orbit</Text>
      <Text style={[styles.appTagline, { color: colors.textMuted }]}>
        The places you return to, and what they mean.
      </Text>

      {/* Tiny mode hint – optional, remove if you don’t want it */}
      <Text style={[styles.modeHint, { color: colors.textMuted }]}>
        {themeName}
      </Text>

      {/* Live, real check-ins */}
      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        Your Orbit
      </Text>
      <Text style={[styles.sectionSubtitle, { color: colors.textMuted }]}>
        Cleopatra’s recent check-ins, across the city.
      </Text>

      {checkins.length === 0 ? (
        <EmptyOrbit colors={colors} />
      ) : (
        <FlatList
          data={checkins}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CheckinCard checkin={item} colors={colors} />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Seed / suggested orbits */}
      <View style={styles.seedSection}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Suggested Orbits
        </Text>
        <Text style={[styles.sectionSubtitle, { color: colors.textMuted }]}>
          Places nearby that might become part of your pattern.
        </Text>

        {SEED_ORBITS.map((orbit) => (
          <SeedOrbitCard key={orbit.id} orbit={orbit} colors={colors} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 16,
    backgroundColor: '#050509', // overridden by theme
  },
  appTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#ffffff', // overridden by theme
  },
  appTagline: {
    fontSize: 14,
    color: '#AAAAAA', // overridden by theme
    marginTop: 4,
    marginBottom: 4,
  },
  modeHint: {
    fontSize: 12,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF', // overridden by theme
  },
  sectionSubtitle: {
    fontSize: 13,
    color: '#9A9AA5', // overridden by theme
    marginBottom: 12,
  },
  listContent: {
    paddingBottom: 16,
  },
  card: {
    backgroundColor: '#111118', // overridden by theme
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#252535', // overridden by theme
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF', // overridden by theme
    marginBottom: 2,
  },
  cardMeta: {
    fontSize: 12,
    color: '#888888', // overridden by theme
    marginBottom: 4,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 8,
  },
  tagPill: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: '#222233', // overridden by theme
  },
  tagText: {
    fontSize: 11,
    color: '#CFCFFF', // overridden by theme
  },
  cardNote: {
    fontSize: 13,
    color: '#E0E0E0', // overridden by theme
  },
  cardNoteMuted: {
    fontSize: 13,
    color: '#777788', // overridden by theme
    fontStyle: 'italic',
  },
  emptyState: {
    marginTop: 24,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#252535', // overridden
    backgroundColor: '#0C0C14', // overridden
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF', // overridden
    marginBottom: 6,
  },
  emptyBody: {
    fontSize: 13,
    color: '#B0B0C0', // overridden
  },
  seedSection: {
    marginTop: 24,
    marginBottom: 24,
  },
  seedStatus: {
    fontSize: 12,
    color: '#B8FFCB', // overridden
    fontWeight: '600',
    marginBottom: 4,
  },
});
