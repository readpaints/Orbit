// app/(tabs)/venues.tsx
import React, { useState } from 'react';
import {
    FlatList,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import { MOCK_VENUES, Venue } from '../../constants/mockVenues';
import { getCurrentOrbitTheme } from '../../constants/theme';
import { useOrbit } from '../../context/OrbitContext';

const CHECKIN_TAGS = [
  'Great experience',
  'Amazing food',
  'Cheap drinks!',
  'Great staff',
  'Cool vibe',
  'Feels like home',
  'The best time out',
];

const FAVORITE_TAGS = ['coffee', 'wines', 'croissants'];

type SelectedTagsState = {
  [label: string]: boolean;
};

export default function VenuesScreen() {
  const [expandedVenueId, setExpandedVenueId] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<SelectedTagsState>({});
  const [note, setNote] = useState('');

  const { addCheckin } = useOrbit();
  const theme = getCurrentOrbitTheme();
  const { colors } = theme;

  const handleToggleVenue = (id: string) => {
    if (expandedVenueId === id) {
      // collapse
      setExpandedVenueId(null);
      setSelectedTags({});
      setNote('');
    } else {
      // expand new venue
      setExpandedVenueId(id);
      setSelectedTags({});
      setNote('');
    }
  };

  const toggleTag = (label: string) => {
    setSelectedTags((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const handleMockSaveCheckin = (venue: Venue) => {
    const chosenTags = Object.entries(selectedTags)
      .filter(([_, isOn]) => isOn)
      .map(([label]) => label);

    addCheckin({
      venueId: venue.id,
      venueName: venue.name,
      tags: chosenTags,
      note,
    });

    console.log('Mock check-in saved:', {
      venueId: venue.id,
      venueName: venue.name,
      tags: chosenTags,
      note,
      timestamp: new Date().toISOString(),
    });

    setSelectedTags({});
    setNote('');
  };

  const renderVenueItem = ({ item }: { item: Venue }) => {
    const isExpanded = expandedVenueId === item.id;

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
        <Pressable
          onPress={() => handleToggleVenue(item.id)}
          style={styles.cardHeader}
        >
          <View style={{ flex: 1 }}>
            <Text style={[styles.venueName, { color: colors.text }]}>
              {item.name}
            </Text>
            <Text style={[styles.venueMeta, { color: colors.textMuted }]}>
              {item.category.toUpperCase()} · {item.neighborhood}
            </Text>
            <Text style={[styles.venueVibe, { color: colors.text }]}>
              {item.shortVibe}
            </Text>
          </View>
          <Text style={[styles.expandIcon, { color: colors.textMuted }]}>
            {isExpanded ? '–' : '+'}
          </Text>
        </Pressable>

        {isExpanded && (
          <View
            style={[
              styles.expandedSection,
              { borderTopColor: colors.border },
            ]}
          >
            <Text style={[styles.sectionLabel, { color: colors.text }]}>
              About
            </Text>
            <Text style={[styles.bodyText, { color: colors.text }]}>
              {item.description}
            </Text>

            <Text style={[styles.sectionLabel, { color: colors.text }]}>
              Address
            </Text>
            <Text style={[styles.bodyText, { color: colors.textMuted }]}>
              {item.address}
            </Text>

            <Text style={[styles.sectionLabel, { color: colors.text }]}>
              Hours
            </Text>
            <Text style={[styles.bodyText, { color: colors.textMuted }]}>
              {item.hours}
            </Text>

            <Text style={[styles.sectionLabel, { color: colors.text }]}>
              Vibe tags
            </Text>
            <View style={styles.tagsRow}>
              {item.tags.map((tag) => (
                <View
                  key={tag}
                  style={[
                    styles.smallTag,
                    { backgroundColor: colors.chipBackground },
                  ]}
                >
                  <Text style={[styles.smallTagText, { color: colors.chipText }]}>
                    {tag}
                  </Text>
                </View>
              ))}
            </View>

            <View
              style={[
                styles.divider,
                { backgroundColor: colors.border },
              ]}
            />

            <Text style={[styles.sectionLabel, { color: colors.text }]}>
              Check in
            </Text>
            <Text style={[styles.helperText, { color: colors.textMuted }]}>
              How did this visit feel? Tap one or more.
            </Text>

            <View style={styles.tagsRow}>
              {CHECKIN_TAGS.map((label) => {
                const isSelected = !!selectedTags[label];
                return (
                  <Pressable
                    key={label}
                    onPress={() => toggleTag(label)}
                    style={[
                      styles.checkinTag,
                      {
                        borderColor: colors.border,
                        backgroundColor: isSelected
                          ? colors.accent
                          : 'transparent',
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.checkinTagText,
                        {
                          color: isSelected
                            ? '#FFFFFF'
                            : colors.text,
                        },
                      ]}
                    >
                      {label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            <Text style={[styles.sectionLabel, { color: colors.text }]}>
              Favorites
            </Text>
            <Text style={[styles.helperText, { color: colors.textMuted }]}>
              Mark what stood out the most.
            </Text>

            <View style={styles.tagsRow}>
              {FAVORITE_TAGS.map((label) => {
                const isSelected = !!selectedTags[label];
                return (
                  <Pressable
                    key={label}
                    onPress={() => toggleTag(label)}
                    style={[
                      styles.favoriteTag,
                      {
                        borderColor: colors.border,
                        backgroundColor: isSelected
                          ? colors.accentSoft
                          : 'transparent',
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.favoriteTagText,
                        {
                          color: isSelected
                            ? colors.text
                            : colors.textMuted,
                        },
                      ]}
                    >
                      {label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            <Text style={[styles.sectionLabel, { color: colors.text }]}>
              Note
            </Text>
            <Text style={[styles.helperText, { color: colors.textMuted }]}>
              Leave a small note to your future self.
            </Text>

            <TextInput
              value={note}
              onChangeText={setNote}
              placeholder="Tonight this place felt like..."
              placeholderTextColor={colors.textMuted}
              multiline
              style={[
                styles.noteInput,
                {
                  borderColor: colors.border,
                  backgroundColor: colors.surfaceAlt,
                  color: colors.text,
                },
              ]}
            />

            <Pressable
              style={[
                styles.saveButton,
                { backgroundColor: colors.accent },
              ]}
              onPress={() => handleMockSaveCheckin(item)}
            >
              <Text style={styles.saveButtonText}>Save check-in (mock)</Text>
            </Pressable>
          </View>
        )}
      </View>
    );
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
    >
      <Text style={[styles.screenTitle, { color: colors.text }]}>
        Venues
      </Text>
      <Text style={[styles.screenSubtitle, { color: colors.textMuted }]}>
        Places in Cleopatra’s orbit — and the ones still waiting for her.
      </Text>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <FlatList
          data={MOCK_VENUES}
          keyExtractor={(item) => item.id}
          renderItem={renderVenueItem}
          scrollEnabled={false} // Scroll handled by outer ScrollView
        />
      </ScrollView>
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
  screenTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#ffffff', // overridden
    marginBottom: 4,
  },
  screenSubtitle: {
    fontSize: 14,
    color: '#AAAAAA', // overridden
    marginBottom: 16,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#111118', // overridden
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#252535', // overridden
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  venueName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff', // overridden
    marginBottom: 2,
  },
  venueMeta: {
    fontSize: 12,
    color: '#888888', // overridden
    marginBottom: 4,
  },
  venueVibe: {
    fontSize: 13,
    color: '#CCCCCC', // overridden
  },
  expandIcon: {
    fontSize: 22,
    color: '#888888', // overridden
    paddingLeft: 8,
  },
  expandedSection: {
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#252535', // overridden
    paddingTop: 12,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#DDDDDD', // overridden
    marginTop: 8,
    marginBottom: 4,
  },
  bodyText: {
    fontSize: 13,
    color: '#CFCFCF', // overridden
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 4,
  },
  smallTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: '#222233', // overridden
  },
  smallTagText: {
    fontSize: 11,
    color: '#CFCFFF', // overridden
  },
  divider: {
    height: 1,
    backgroundColor: '#252535', // overridden
    marginVertical: 10,
  },
  helperText: {
    fontSize: 12,
    color: '#909090', // overridden
    marginBottom: 4,
  },
  checkinTag: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#44445A', // overridden
    marginBottom: 6,
  },
  checkinTagText: {
    fontSize: 12,
    color: '#E5E5E5', // overridden
  },
  favoriteTag: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#6A4455', // overridden
    marginBottom: 6,
  },
  favoriteTagText: {
    fontSize: 12,
    color: '#EBC7D1', // overridden
  },
  noteInput: {
    marginTop: 4,
    minHeight: 70,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333344', // overridden
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 13,
    color: '#FFFFFF', // overridden
    textAlignVertical: 'top',
    backgroundColor: '#0D0D15', // overridden
  },
  saveButton: {
    marginTop: 10,
    paddingVertical: 10,
    borderRadius: 999,
    alignItems: 'center',
    backgroundColor: '#3C82F6', // overridden
  },
  saveButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
