// app/(tabs)/explore/profile.tsx

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { VENUES } from '@/constants/venues';
import { useOrbit, type TimeOfDayPreference } from '@/context/OrbitContext';
import React, { useEffect, useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const COLORS = {
  cardBackground: 'rgba(0, 0, 0, 0.35)',
  border: 'rgba(255, 255, 255, 0.18)',
  softText: 'rgba(255, 255, 255, 0.8)',
  softerText: 'rgba(255, 255, 255, 0.6)',
  accent: '#9ECE9A',
  accentMuted: 'rgba(158, 206, 154, 0.12)',
};

const MOODS = [
  'soft',
  'curious',
  'electric',
  'quiet',
  'cozy',
  'reflective',
  'wild',
];

const TIME_OF_DAY_OPTIONS: { key: TimeOfDayPreference; label: string }[] = [
  { key: 'dawn', label: 'Dawn' },
  { key: 'morning', label: 'Morning' },
  { key: 'afternoon', label: 'Afternoon' },
  { key: 'evening', label: 'Evening' },
  { key: 'late', label: 'Late hours' },
];

export default function OrbitProfileScreen() {
  const { orbitProfile, updateOrbitProfile } = useOrbit();

  const [firstName, setFirstName] = useState(orbitProfile.firstName);
  const [lastInitial, setLastInitial] = useState(orbitProfile.lastInitial ?? '');
  const [bio, setBio] = useState(orbitProfile.bio);
  const [timeOfDayPreference, setTimeOfDayPreference] =
    useState<TimeOfDayPreference>(orbitProfile.timeOfDayPreference);
  const [moodPalette, setMoodPalette] = useState<string[]>(
    orbitProfile.moodPalette || []
  );
  const [favoriteVenueIds, setFavoriteVenueIds] = useState<string[]>(
    orbitProfile.favoriteVenueIds || []
  );
  const [savedAtLeastOnce, setSavedAtLeastOnce] = useState(false);

  // keep local state in sync if profile changes elsewhere
  useEffect(() => {
    setFirstName(orbitProfile.firstName);
    setLastInitial(orbitProfile.lastInitial ?? '');
    setBio(orbitProfile.bio);
    setTimeOfDayPreference(orbitProfile.timeOfDayPreference);
    setMoodPalette(orbitProfile.moodPalette || []);
    setFavoriteVenueIds(orbitProfile.favoriteVenueIds || []);
  }, [orbitProfile]);

  const toggleMood = (mood: string) => {
    setMoodPalette((prev) =>
      prev.includes(mood) ? prev.filter((m) => m !== mood) : [...prev, mood]
    );
  };

  const toggleFavoriteVenue = (venueId: string) => {
    setFavoriteVenueIds((prev) =>
      prev.includes(venueId)
        ? prev.filter((id) => id !== venueId)
        : [...prev, venueId]
    );
  };

  const handleSave = () => {
    updateOrbitProfile({
      firstName: firstName.trim(),
      lastInitial: lastInitial.trim(),
      bio: bio.trim(),
      timeOfDayPreference,
      moodPalette,
      favoriteVenueIds,
    });
    setSavedAtLeastOnce(true);
  };

  // simple starter list; later we can make this smarter (most visited, search, etc.)
  const topVenues = VENUES.slice(0, 6);

  return (
    <ThemedView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <ThemedText type="title" style={styles.title}>
              Orbit profile
            </ThemedText>
            <ThemedText style={styles.subtitle}>
              A small, human sketch of how you move through the world. This is
              what others may see if you choose to be visible in Connections.
            </ThemedText>
          </View>

          {/* Identity */}
          <View style={styles.card}>
            <ThemedText type="subtitle" style={styles.cardTitle}>
              Name
            </ThemedText>
            <ThemedText style={styles.cardDescription}>
              First names and initials keep things personal but soft.
            </ThemedText>

            <View style={styles.row}>
              <View style={{ flex: 2 }}>
                <ThemedText style={styles.label}>First name</ThemedText>
                <TextInput
                  value={firstName}
                  onChangeText={setFirstName}
                  placeholder="Cleo"
                  placeholderTextColor={COLORS.softerText}
                  style={styles.input}
                />
              </View>
              <View style={{ width: 70 }}>
                <ThemedText style={styles.label}>Initial</ThemedText>
                <TextInput
                  value={lastInitial}
                  onChangeText={setLastInitial}
                  placeholder="L"
                  placeholderTextColor={COLORS.softerText}
                  maxLength={2}
                  style={styles.input}
                />
              </View>
            </View>

            <ThemedText style={styles.label}>One-line bio</ThemedText>
            <TextInput
              value={bio}
              onChangeText={setBio}
              placeholder="Evening museum wanderer, café dweller, book carrier."
              placeholderTextColor={COLORS.softerText}
              style={[styles.input, styles.multilineInput]}
              multiline
            />
          </View>

          {/* Time of day */}
          <View style={styles.card}>
            <ThemedText type="subtitle" style={styles.cardTitle}>
              Time of day
            </ThemedText>
            <ThemedText style={styles.cardDescription}>
              When does your orbit feel most like itself?
            </ThemedText>

            <View style={styles.chipRow}>
              {TIME_OF_DAY_OPTIONS.map((opt) => {
                const active = timeOfDayPreference === opt.key;
                return (
                  <TouchableOpacity
                    key={opt.key ?? 'none'}
                    style={[styles.chip, active && styles.chipActive]}
                    onPress={() =>
                      setTimeOfDayPreference(
                        opt.key === timeOfDayPreference ? null : opt.key
                      )
                    }
                  >
                    <ThemedText
                      style={[styles.chipText, active && styles.chipTextActive]}
                    >
                      {opt.label}
                    </ThemedText>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Mood palette */}
          <View style={styles.card}>
            <ThemedText type="subtitle" style={styles.cardTitle}>
              Mood palette
            </ThemedText>
            <ThemedText style={styles.cardDescription}>
              The moods you most often carry into your places.
            </ThemedText>

            <View style={styles.chipRow}>
              {MOODS.map((mood) => {
                const active = moodPalette.includes(mood);
                return (
                  <TouchableOpacity
                    key={mood}
                    style={[styles.chip, active && styles.chipActive]}
                    onPress={() => toggleMood(mood)}
                  >
                    <ThemedText
                      style={[styles.chipText, active && styles.chipTextActive]}
                    >
                      {mood}
                    </ThemedText>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Favorite corners */}
          <View style={styles.card}>
            <ThemedText type="subtitle" style={styles.cardTitle}>
              Favorite corners
            </ThemedText>
            <ThemedText style={styles.cardDescription}>
              A few places that quietly define your orbit. You can always add
              more later.
            </ThemedText>

            <View style={styles.chipRow}>
              {topVenues.map((venue) => {
                const active = favoriteVenueIds.includes(venue.id);
                return (
                  <TouchableOpacity
                    key={venue.id}
                    style={[styles.chip, active && styles.chipActive]}
                    onPress={() => toggleFavoriteVenue(venue.id)}
                  >
                    <ThemedText
                      style={[styles.chipText, active && styles.chipTextActive]}
                    >
                      {venue.name}
                    </ThemedText>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Save */}
          <View style={styles.footerBlock}>
            {savedAtLeastOnce && (
              <ThemedText style={styles.savedText}>
                Profile saved. You can refine this anytime.
              </ThemedText>
            )}
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <ThemedText style={styles.saveButtonText}>
                Save profile
              </ThemedText>
            </TouchableOpacity>
          </View>

          <View style={{ height: 32 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 16,
    gap: 18,
  },
  header: {
    gap: 8,
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
    gap: 10,
  },
  cardTitle: {
    fontSize: 16,
  },
  cardDescription: {
    fontSize: 13,
    lineHeight: 19,
    color: COLORS.softText,
  },
  label: {
    fontSize: 12,
    marginBottom: 4,
    color: COLORS.softText,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  input: {
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.border,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 14,
    color: '#FFFFFF',
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  },
  multilineInput: {
    minHeight: 70,
    textAlignVertical: 'top',
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.border,
  },
  chipActive: {
    backgroundColor: COLORS.accentMuted,
    borderColor: COLORS.accent,
  },
  chipText: {
    fontSize: 12,
    color: COLORS.softerText,
  },
  chipTextActive: {
    color: COLORS.accent,
  },
  footerBlock: {
    marginTop: 8,
    alignItems: 'flex-start',
    gap: 8,
  },
  saveButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: COLORS.accent,
  },
  saveButtonText: {
    fontSize: 14,
    color: '#04110D',
  },
  savedText: {
    fontSize: 12,
    color: COLORS.softText,
  },
});
