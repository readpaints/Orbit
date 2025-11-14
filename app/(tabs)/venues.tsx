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

    console.log('Mock check-in saved:', {
      venueId: venue.id,
      venueName: venue.name,
      tags: chosenTags,
      note,
      timestamp: new Date().toISOString(),
    });

    // For now, just clear the local state as if we "saved"
    setSelectedTags({});
    setNote('');
  };

  const renderVenueItem = ({ item }: { item: Venue }) => {
    const isExpanded = expandedVenueId === item.id;

    return (
      <View style={styles.card}>
        <Pressable onPress={() => handleToggleVenue(item.id)} style={styles.cardHeader}>
          <View style={{ flex: 1 }}>
            <Text style={styles.venueName}>{item.name}</Text>
            <Text style={styles.venueMeta}>
              {item.category.toUpperCase()} · {item.neighborhood}
            </Text>
            <Text style={styles.venueVibe}>{item.shortVibe}</Text>
          </View>
          <Text style={styles.expandIcon}>{isExpanded ? '–' : '+'}</Text>
        </Pressable>

        {isExpanded && (
          <View style={styles.expandedSection}>
            <Text style={styles.sectionLabel}>About</Text>
            <Text style={styles.bodyText}>{item.description}</Text>

            <Text style={styles.sectionLabel}>Address</Text>
            <Text style={styles.bodyText}>{item.address}</Text>

            <Text style={styles.sectionLabel}>Hours</Text>
            <Text style={styles.bodyText}>{item.hours}</Text>

            <Text style={styles.sectionLabel}>Vibe tags</Text>
            <View style={styles.tagsRow}>
              {item.tags.map((tag) => (
                <View key={tag} style={styles.smallTag}>
                  <Text style={styles.smallTagText}>{tag}</Text>
                </View>
              ))}
            </View>

            <View style={styles.divider} />

            <Text style={styles.sectionLabel}>Check in</Text>
            <Text style={styles.helperText}>
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
                      isSelected && styles.checkinTagSelected,
                    ]}
                  >
                    <Text
                      style={[
                        styles.checkinTagText,
                        isSelected && styles.checkinTagTextSelected,
                      ]}
                    >
                      {label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            <Text style={styles.sectionLabel}>Favorites</Text>
            <Text style={styles.helperText}>
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
                      isSelected && styles.favoriteTagSelected,
                    ]}
                  >
                    <Text
                      style={[
                        styles.favoriteTagText,
                        isSelected && styles.favoriteTagTextSelected,
                      ]}
                    >
                      {label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            <Text style={styles.sectionLabel}>Note</Text>
            <Text style={styles.helperText}>
              Leave a small note to your future self.
            </Text>

            <TextInput
              value={note}
              onChangeText={setNote}
              placeholder="Tonight this place felt like..."
              placeholderTextColor="#949494"
              multiline
              style={styles.noteInput}
            />

            <Pressable
              style={styles.saveButton}
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
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Venues</Text>
      <Text style={styles.screenSubtitle}>
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
    backgroundColor: '#050509',
  },
  screenTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 4,
  },
  screenSubtitle: {
    fontSize: 14,
    color: '#AAAAAA',
    marginBottom: 16,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#111118',
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#252535',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  venueName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 2,
  },
  venueMeta: {
    fontSize: 12,
    color: '#888888',
    marginBottom: 4,
  },
  venueVibe: {
    fontSize: 13,
    color: '#CCCCCC',
  },
  expandIcon: {
    fontSize: 22,
    color: '#888888',
    paddingLeft: 8,
  },
  expandedSection: {
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#252535',
    paddingTop: 12,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#DDDDDD',
    marginTop: 8,
    marginBottom: 4,
  },
  bodyText: {
    fontSize: 13,
    color: '#CFCFCF',
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
    backgroundColor: '#222233',
  },
  smallTagText: {
    fontSize: 11,
    color: '#CFCFFF',
  },
  divider: {
    height: 1,
    backgroundColor: '#252535',
    marginVertical: 10,
  },
  helperText: {
    fontSize: 12,
    color: '#909090',
    marginBottom: 4,
  },
  checkinTag: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#44445A',
    marginBottom: 6,
  },
  checkinTagSelected: {
    backgroundColor: '#F5C543',
    borderColor: '#F5C543',
  },
  checkinTagText: {
    fontSize: 12,
    color: '#E5E5E5',
  },
  checkinTagTextSelected: {
    color: '#1A1500',
    fontWeight: '600',
  },
  favoriteTag: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#6A4455',
    marginBottom: 6,
  },
  favoriteTagSelected: {
    backgroundColor: '#E46E8C',
    borderColor: '#E46E8C',
  },
  favoriteTagText: {
    fontSize: 12,
    color: '#EBC7D1',
  },
  favoriteTagTextSelected: {
    color: '#140006',
    fontWeight: '600',
  },
  noteInput: {
    marginTop: 4,
    minHeight: 70,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333344',
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 13,
    color: '#FFFFFF',
    textAlignVertical: 'top',
    backgroundColor: '#0D0D15',
  },
  saveButton: {
    marginTop: 10,
    paddingVertical: 10,
    borderRadius: 999,
    alignItems: 'center',
    backgroundColor: '#3C82F6',
  },
  saveButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
