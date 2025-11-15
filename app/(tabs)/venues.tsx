// app/(tabs)/venues.tsx
import { useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { VENUES, Venue } from '@/constants/venues';

export default function VenuesScreen() {
  const [visitedIds, setVisitedIds] = useState<Set<string>>(new Set());

  const toggleVisited = (id: string) => {
    setVisitedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const sortedVenues = useMemo(
    () =>
      [...VENUES].sort((a, b) =>
        a.neighborhood.localeCompare(b.neighborhood, 'en'),
      ),
    [],
  );

  const renderItem = ({ item }: { item: Venue }) => {
    const isVisited = visitedIds.has(item.id);

    return (
      <ThemedView style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={{ flex: 1 }}>
            <ThemedText type="subtitle">{item.name}</ThemedText>
            <ThemedText style={styles.meta}>
              {item.category} · {item.neighborhood}
            </ThemedText>
          </View>

          <Pressable
            onPress={() => toggleVisited(item.id)}
            style={[
              styles.chip,
              isVisited && styles.chipVisited,
            ]}
          >
            <ThemedText style={styles.chipText}>
              {isVisited ? 'Visited' : 'Mark visited'}
            </ThemedText>
          </Pressable>
        </View>

        <View style={styles.tagsRow}>
          {item.tags.map((tag) => (
            <View key={tag} style={styles.tag}>
              <ThemedText style={styles.tagText}>{tag}</ThemedText>
            </View>
          ))}
        </View>
      </ThemedView>
    );
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor="dark"
      headerImage={
        <IconSymbol
          size={260}
          color="#808080"
          name="mappin.and.ellipse"
          style={styles.headerImage}
        />
      }
    >
      <ThemedView style={styles.container}>
        <ThemedText type="title">Venues in Cleopatra&apos;s Orbit</ThemedText>
        <ThemedText style={styles.subtitle}>
          Tap a place to mark it visited and start building her orbit of favorites.
        </ThemedText>

        <FlatList
          data={sortedVenues}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          scrollEnabled={false}   // ✅ FIXES THE WARNING
          showsVerticalScrollIndicator={false}
        />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    position: 'absolute',
    bottom: -20,
    right: -20,
  },
  container: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 32,
  },
  subtitle: {
    marginTop: 8,
    marginBottom: 16,
  },
  listContent: {
    gap: 12,
    paddingTop: 8,
    paddingBottom: 32,
  },
  card: {
    borderRadius: 16,
    padding: 12,
    marginBottom: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  meta: {
    marginTop: 2,
  },
  chip: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
  },
  chipVisited: {
    opacity: 0.8,
  },
  chipText: {
    fontSize: 12,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  tag: {
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    opacity: 0.9,
  },
  tagText: {
    fontSize: 11,
  },
});
