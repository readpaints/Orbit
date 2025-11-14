// app/(tabs)/index.tsx
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
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

const EmptyOrbit = () => (
  <View style={styles.emptyState}>
    <Text style={styles.emptyTitle}>Your orbit is quiet… for now.</Text>
    <Text style={styles.emptyBody}>
      Visit a place on the Venues tab and check in. The story of your orbit
      will start appearing here.
    </Text>
  </View>
);

const CheckinCard = ({ checkin }: { checkin: OrbitCheckin }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{checkin.venueName}</Text>
      <Text style={styles.cardMeta}>{formatTime(checkin.createdAt)}</Text>

      {checkin.tags.length > 0 && (
        <View style={styles.tagsRow}>
          {checkin.tags.map((tag) => (
            <View key={tag} style={styles.tagPill}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      )}

      {checkin.note ? (
        <Text style={styles.cardNote}>
          {checkin.note.length > 180
            ? `${checkin.note.slice(0, 180)}…`
            : checkin.note}
        </Text>
      ) : (
        <Text style={styles.cardNoteMuted}>
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

const SeedOrbitCard = ({ orbit }: { orbit: SeedOrbit }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{orbit.title}</Text>
      <Text style={styles.cardMeta}>{orbit.locationLine}</Text>
      <Text style={styles.seedStatus}>{orbit.status}</Text>
      <Text style={styles.cardNote}>{orbit.description}</Text>
    </View>
  );
};

export default function HomeScreen() {
  const { checkins } = useOrbit();

  return (
    <View style={styles.container}>
      <Text style={styles.appTitle}>Orbit</Text>
      <Text style={styles.appTagline}>
        The places you return to, and what they mean.
      </Text>

      {/* Live, real check-ins */}
      <Text style={styles.sectionTitle}>Your Orbit</Text>
      <Text style={styles.sectionSubtitle}>
        Cleopatra’s recent check-ins, across the city.
      </Text>

      {checkins.length === 0 ? (
        <EmptyOrbit />
      ) : (
        <FlatList
          data={checkins}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <CheckinCard checkin={item} />}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Seed / suggested orbits */}
      <View style={styles.seedSection}>
        <Text style={styles.sectionTitle}>Suggested Orbits</Text>
        <Text style={styles.sectionSubtitle}>
          Places nearby that might become part of your pattern.
        </Text>

        {SEED_ORBITS.map((orbit) => (
          <SeedOrbitCard key={orbit.id} orbit={orbit} />
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
    backgroundColor: '#050509',
  },
  appTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#ffffff',
  },
  appTagline: {
    fontSize: 14,
    color: '#AAAAAA',
    marginTop: 4,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  sectionSubtitle: {
    fontSize: 13,
    color: '#9A9AA5',
    marginBottom: 12,
  },
  listContent: {
    paddingBottom: 16,
  },
  card: {
    backgroundColor: '#111118',
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#252535',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  cardMeta: {
    fontSize: 12,
    color: '#888888',
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
    backgroundColor: '#222233',
  },
  tagText: {
    fontSize: 11,
    color: '#CFCFFF',
  },
  cardNote: {
    fontSize: 13,
    color: '#E0E0E0',
  },
  cardNoteMuted: {
    fontSize: 13,
    color: '#777788',
    fontStyle: 'italic',
  },
  emptyState: {
    marginTop: 24,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#252535',
    backgroundColor: '#0C0C14',
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  emptyBody: {
    fontSize: 13,
    color: '#B0B0C0',
  },
  seedSection: {
    marginTop: 24,
    marginBottom: 24,
  },
  seedStatus: {
    fontSize: 12,
    color: '#B8FFCB',
    fontWeight: '600',
    marginBottom: 4,
  },
});
