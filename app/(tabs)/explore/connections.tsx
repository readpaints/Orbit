// app/(tabs)/explore/connections.tsx

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useOrbit } from '@/context/OrbitContext';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';

const COLORS = {
  accent: '#9ECE9A', // soft green from your palette
  accentMuted: 'rgba(158, 206, 154, 0.12)',
  cardBackground: 'rgba(0, 0, 0, 0.35)',
  border: 'rgba(255, 255, 255, 0.14)',
  softText: 'rgba(255, 255, 255, 0.78)',
  softerText: 'rgba(255, 255, 255, 0.6)',
};

export default function ConnectionsScreen() {
  const router = useRouter();
  const { connectionsVisibility } = useOrbit();

  const isVisibleToOthers = connectionsVisibility !== 'private';

  const visibilityLabel =
    connectionsVisibility === 'private'
      ? 'Private orbit'
      : connectionsVisibility === 'overlaps'
      ? 'Visible to overlaps'
      : 'Open to connections';

  const visibilityCopy =
    connectionsVisibility === 'private'
      ? "Right now, only you can see these crossings. If you'd like others to find you here, you can reveal your orbit."
      : connectionsVisibility === 'overlaps'
      ? 'Your orbit is visible to people who share real overlaps with you — places, times of day, and moods. You can change this anytime in Settings.'
      : 'Your orbit is open to quiet introductions from people whose paths genuinely cross yours. You can change this anytime in Settings.';

  return (
    <ThemedView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={styles.container}
        bounces
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <ThemedText type="title" style={styles.title}>
            Connections
          </ThemedText>
          <ThemedText style={styles.subtitle}>
            Quiet crossings in your orbit — people who move through
            the same corners of the city in ways that feel familiar.
          </ThemedText>

          <View style={styles.visibilityPill}>
            <ThemedText style={styles.visibilityPillText}>
              {visibilityLabel}
            </ThemedText>
          </View>
        </View>

        {/* Shared Corners */}
        <SectionCard
          title="Shared corners"
          description="Places you return to — and so do others."
        >
          {/* Placeholder items for now; later we’ll map real venues/people */}
          <ConnectionRow
            heading="Acid Café"
            body="You come here often. A few other orbits keep circling this corner."
            pillLabel="Shared corner"
          />
          <ConnectionRow
            heading="Bar Eléctrico"
            body="Evenings here gather a familiar kind of crowd — quiet, attentive, awake."
            pillLabel="Late hours overlap"
          />
        </SectionCard>

        {/* Overlapping Rhythms */}
        <SectionCard
          title="Overlapping rhythms"
          description="Not just where you go, but when."
        >
          <ThemedText style={styles.bodyText}>
            Orbit is learning when your days tend to open and close. Soon,
            you&apos;ll see people who slip into similar mornings, afternoons,
            and late-night corners.
          </ThemedText>
          <View style={styles.chipRow}>
            <SoftChip label="Evening wanderers" />
            <SoftChip label="Slow morning crowd" />
          </View>
        </SectionCard>

        {/* People Who Feel Like You */}
        <SectionCard
          title="People who feel like you"
          description="Lives that move with a similar gravity."
        >
          <ThemedText style={styles.bodyText}>
            As your orbit deepens, Orbit will surface a small handful of
            people whose places, moods, and timings echo your own.
          </ThemedText>
          <View style={styles.previewCard}>
            <ThemedText style={styles.previewName}>
              Someone nearby
            </ThemedText>
            <ThemedText style={styles.previewLine}>
              Often in the same cafés, mostly in the evenings, with
              moods that lean reflective and curious.
            </ThemedText>
            <View style={styles.chipRow}>
              <SoftChip label="Moves like you" />
              <SoftChip label="Shared corners" />
            </View>
          </View>
        </SectionCard>

        {/* Visibility / Privacy */}
        <View style={styles.visibilityBlock}>
          <ThemedText style={styles.visibilityTitle}>
            Who can see you here?
          </ThemedText>
          <ThemedText style={styles.visibilityText}>
            {visibilityCopy}
          </ThemedText>

          {!isVisibleToOthers && (
            <TouchableOpacity
              style={styles.revealButton}
              onPress={() => {
                // Go to Connections & privacy settings screen
                router.push('/(tabs)/additional/connections');
              }}
            >
              <ThemedText style={styles.revealButtonText}>
                Reveal my orbit
              </ThemedText>
            </TouchableOpacity>
          )}

          {isVisibleToOthers && (
            <TouchableOpacity
              style={styles.adjustButton}
              onPress={() => {
                router.push('/(tabs)/additional/connections');
              }}
            >
              <ThemedText style={styles.adjustButtonText}>
                Adjust visibility
              </ThemedText>
            </TouchableOpacity>
          )}
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>
    </ThemedView>
  );
}

type SectionCardProps = {
  title: string;
  description?: string;
  children?: React.ReactNode;
};

function SectionCard({ title, description, children }: SectionCardProps) {
  return (
    <View style={styles.sectionCard}>
      <ThemedText type="subtitle" style={styles.sectionTitle}>
        {title}
      </ThemedText>
      {description ? (
        <ThemedText style={styles.sectionDescription}>
          {description}
        </ThemedText>
      ) : null}
      <View style={styles.sectionBody}>{children}</View>
    </View>
  );
}

type ConnectionRowProps = {
  heading: string;
  body: string;
  pillLabel?: string;
};

function ConnectionRow({ heading, body, pillLabel }: ConnectionRowProps) {
  return (
    <View style={styles.connectionRow}>
      <View style={{ flex: 1 }}>
        <ThemedText style={styles.connectionHeading}>{heading}</ThemedText>
        <ThemedText style={styles.connectionBody}>{body}</ThemedText>
      </View>
      {pillLabel ? (
        <View style={styles.pill}>
          <ThemedText style={styles.pillText}>{pillLabel}</ThemedText>
        </View>
      ) : null}
    </View>
  );
}

type SoftChipProps = { label: string };

function SoftChip({ label }: SoftChipProps) {
  return (
    <View style={styles.softChip}>
      <ThemedText style={styles.softChipText}>{label}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 16,
    gap: 20,
  },
  header: {
    marginBottom: 4,
    gap: 8,
  },
  title: {
    fontSize: 24,
    letterSpacing: 1.2,
  },
  subtitle: {
    marginTop: 2,
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.softText,
  },
  visibilityPill: {
    alignSelf: 'flex-start',
    marginTop: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.border,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  visibilityPillText: {
    fontSize: 11,
    color: COLORS.softerText,
  },
  sectionCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 18,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.border,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 4,
  },
  sectionDescription: {
    fontSize: 13,
    lineHeight: 19,
    color: COLORS.softText,
    marginBottom: 10,
  },
  sectionBody: {
    gap: 10,
  },
  connectionRow: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'flex-start',
  },
  connectionHeading: {
    fontSize: 14,
    marginBottom: 2,
  },
  connectionBody: {
    fontSize: 13,
    lineHeight: 18,
    color: COLORS.softText,
  },
  pill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: COLORS.accentMuted,
    alignSelf: 'flex-start',
  },
  pillText: {
    fontSize: 11,
    color: COLORS.accent,
  },
  bodyText: {
    fontSize: 13,
    lineHeight: 19,
    color: COLORS.softText,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  softChip: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.border,
  },
  softChipText: {
    fontSize: 11,
    color: COLORS.softerText,
  },
  previewCard: {
    marginTop: 10,
    padding: 12,
    borderRadius: 14,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.border,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    gap: 6,
  },
  previewName: {
    fontSize: 14,
  },
  previewLine: {
    fontSize: 13,
    lineHeight: 19,
    color: COLORS.softText,
  },
  visibilityBlock: {
    marginTop: 4,
    padding: 16,
    borderRadius: 18,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.border,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    gap: 10,
  },
  visibilityTitle: {
    fontSize: 14,
  },
  visibilityText: {
    fontSize: 13,
    lineHeight: 19,
    color: COLORS.softText,
  },
  revealButton: {
    marginTop: 4,
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: COLORS.accent,
  },
  revealButtonText: {
    fontSize: 13,
    color: '#04110D',
  },
  adjustButton: {
    marginTop: 4,
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.border,
  },
  adjustButtonText: {
    fontSize: 13,
    color: COLORS.softText,
  },
});
