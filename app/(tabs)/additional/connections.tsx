// app/(tabs)/additional/connections.tsx

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import {
    useOrbit,
    type ConnectionsVisibility,
} from '@/context/OrbitContext';
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

type Option = {
  key: ConnectionsVisibility;
  title: string;
  description: string;
};

const OPTIONS: Option[] = [
  {
    key: 'private',
    title: 'Private orbit',
    description:
      'You see your overlaps with others, but no one can see you. No profile is shown, and no one can reach out.',
  },
  {
    key: 'overlaps',
    title: 'Visible to overlaps',
    description:
      'People who genuinely share places, moods, and timings with you may see your small Orbit profile in Connections.',
  },
  {
    key: 'open',
    title: 'Open to connections',
    description:
      'You can appear for people whose orbits strongly cross yours, and quiet introductions can begin.',
  },
];

export default function ConnectionsSettingsScreen() {
  const { connectionsVisibility, setConnectionsVisibility } = useOrbit();

  return (
    <ThemedView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <ThemedText type="title" style={styles.title}>
            Connections & privacy
          </ThemedText>
          <ThemedText style={styles.subtitle}>
            Decide how visible your orbit is to others who move through the
            same corners.
          </ThemedText>
        </View>

        {/* Options */}
        {OPTIONS.map((opt) => {
          const active = opt.key === connectionsVisibility;
          return (
            <TouchableOpacity
              key={opt.key}
              style={[styles.card, active && styles.cardActive]}
              activeOpacity={0.85}
              onPress={() => setConnectionsVisibility(opt.key)}
            >
              <View style={styles.cardHeaderRow}>
                <ThemedText style={styles.cardTitle}>{opt.title}</ThemedText>
                <View
                  style={[
                    styles.radioOuter,
                    active && styles.radioOuterActive,
                  ]}
                >
                  {active && <View style={styles.radioInner} />}
                </View>
              </View>
              <ThemedText style={styles.cardDescription}>
                {opt.description}
              </ThemedText>
            </TouchableOpacity>
          );
        })}

        {/* Footer copy */}
        <View style={styles.footer}>
          <ThemedText style={styles.footerText}>
            Orbit never shares your name or profile outside of the app, and
            nothing is broadcast. Every connection begins with consent.
          </ThemedText>
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>
    </ThemedView>
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
  cardActive: {
    borderColor: COLORS.accent,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 16,
  },
  cardDescription: {
    fontSize: 13,
    lineHeight: 19,
    color: COLORS.softText,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 999,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterActive: {
    borderColor: COLORS.accent,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 999,
    backgroundColor: COLORS.accent,
  },
  footer: {
    marginTop: 8,
  },
  footerText: {
    fontSize: 12,
    lineHeight: 18,
    color: COLORS.softerText,
  },
});
