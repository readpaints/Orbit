// app/(tabs)/additional/index.tsx

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';

const COLORS = {
  cardBackground: 'rgba(0, 0, 0, 0.35)',
  border: 'rgba(255, 255, 255, 0.18)',
  softText: 'rgba(255, 255, 255, 0.8)',
  softerText: 'rgba(255, 255, 255, 0.6)',
  accent: '#9ECE9A',
};

export default function MoreScreen() {
  const router = useRouter();

  return (
    <ThemedView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <ThemedText type="title" style={styles.title}>
            More
          </ThemedText>
          <ThemedText style={styles.subtitle}>
            The back of the house — quiet places for profiles, settings, and
            the story of Orbit itself.
          </ThemedText>
        </View>

        {/* Intro card */}
        <View style={styles.card}>
          <ThemedText style={styles.cardTitle}>
            The back of the house
          </ThemedText>
          <ThemedText style={styles.cardText}>
            Most of your time in Orbit happens in Home, Venues, Explore, and
            the Journal. This tab is where you tune the lights behind the
            scenes and read more about what this app is.
          </ThemedText>
        </View>

        {/* Navigation list */}
        <View style={styles.listCard}>
          {/* Account */}
          <RowLink
            label="Account"
            description="Orbit profile and quiet details about you."
            onPress={() => router.push('/(tabs)/additional/account')}
          />

          {/* Connections & privacy */}
          <RowLink
            label="Connections & privacy"
            description="Decide how visible your orbit is to others."
            onPress={() => router.push('/(tabs)/additional/connections')}
          />

          {/* What Orbit Is */}
          <RowLink
            label="What Orbit Is"
            description="A small manifesto about place, memory, and connection."
            onPress={() => router.push('/(tabs)/explore/philosophy')}
          />

          {/* How Orbit Works */}
          <RowLink
            label="How Orbit works"
            description="A gentle step-by-step explanation."
            onPress={() => router.push('/(tabs)/explore/how-orbit-works')}
          />

          {/* Replay the introduction */}
          <RowLink
            label="Replay the introduction"
            description="Walk back through the opening sequence of Orbit."
            onPress={() => router.push('/onboarding')}
          />

          {/* About Orbit */}
          <RowLink
            label="About Orbit"
            description="Where this little app comes from."
            onPress={() => router.push('/(tabs)/additional/about')}
          />

          {/* Settings */}
          <RowLink
            label="Settings"
            description="Future home for notifications, backups, and more."
            onPress={() => router.push('/(tabs)/additional/settings')}
          />
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>
    </ThemedView>
  );
}

type RowLinkProps = {
  label: string;
  description?: string;
  onPress: () => void;
};

function RowLink({ label, description, onPress }: RowLinkProps) {
  return (
    <TouchableOpacity
      style={styles.row}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <View style={{ flex: 1 }}>
        <ThemedText style={styles.rowLabel}>{label}</ThemedText>
        {description ? (
          <ThemedText style={styles.rowDescription}>
            {description}
          </ThemedText>
        ) : null}
      </View>
      <ThemedText style={styles.chevron}>›</ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 16,
    gap: 16,
  },
  header: {
    gap: 8,
    marginBottom: 4,
  },
  title: {
    fontSize: 24,
    letterSpacing: 1.2,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.softText,
  },
  card: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 18,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.border,
    padding: 16,
    gap: 8,
  },
  cardTitle: {
    fontSize: 15,
  },
  cardText: {
    fontSize: 13,
    lineHeight: 19,
    color: COLORS.softText,
  },
  listCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 18,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.border,
    paddingVertical: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.border,
  },
  rowLabel: {
    fontSize: 14,
  },
  rowDescription: {
    fontSize: 12,
    color: COLORS.softerText,
  },
  chevron: {
    fontSize: 20,
    color: COLORS.softerText,
  },
});
