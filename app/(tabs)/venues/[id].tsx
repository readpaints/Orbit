// app/(tabs)/venues/[id].tsx
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { VENUES } from '@/constants/venues';
import { useOrbit } from '@/context/OrbitContext';
import { Link, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    TextInput,
    View,
} from 'react-native';

type ReflectionMood = 'amazing' | 'good' | 'mixed' | 'bad' | null;

const REFLECTION_MOODS: { key: Exclude<ReflectionMood, null>; label: string }[] = [
  { key: 'amazing', label: 'Amazing' },
  { key: 'good', label: 'Good' },
  { key: 'mixed', label: 'Mixed' },
  { key: 'bad', label: 'Bad' },
];

export default function VenueDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { addCheckin, clearQuickCheckinsForVenue, getVenueCheckins } = useOrbit();

  const venue = VENUES.find((v) => v.id === id);

  const checkinsForVenue =
    id && getVenueCheckins ? getVenueCheckins(id) ?? [] : [];

  const hasVisited = checkinsForVenue.length > 0;

  const reflections = checkinsForVenue
    .filter((c: any) => c.type === 'meaningful')
    .slice()
    .reverse();

  const [reflectionMood, setReflectionMood] = useState<ReflectionMood>(null);
  const [note, setNote] = useState('');

  if (!venue) {
    return (
      <ThemedView
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 24,
        }}
      >
        <ThemedText
          style={{
            fontSize: 18,
            fontWeight: '600',
            marginBottom: 8,
          }}
        >
          Venue not found
        </ThemedText>
        <ThemedText
          style={{
            fontSize: 14,
            opacity: 0.7,
            textAlign: 'center',
          }}
        >
          This place slipped out of orbit. Try going back to Your places.
        </ThemedText>
      </ThemedView>
    );
  }

  const handleToggleVisited = () => {
    if (!id) return;

    if (hasVisited) {
      clearQuickCheckinsForVenue(id);
    } else {
      addCheckin({
        venueId: id,
        type: 'quick',
        mood: null,
        note: '',
      });
    }
  };

  const handleAddReflection = () => {
    if (!id || !hasVisited) return;
    if (!note.trim() && !reflectionMood) return;

    addCheckin({
      venueId: id,
      type: 'meaningful',
      mood: reflectionMood,
      note: note.trim(),
    });

    setNote('');
  };

  const reflectionsEnabled = hasVisited;

  return (
    <ThemedView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingTop: 40,
            paddingBottom: 40,
          }}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View style={{ marginBottom: 8 }}>
            <ThemedText
              style={{
                fontSize: 24,
                fontWeight: '600',
                marginBottom: 4,
              }}
            >
              {venue.name}
            </ThemedText>
            <ThemedText
              style={{
                fontSize: 14,
                opacity: 0.7,
                marginBottom: 12,
              }}
            >
              {venue.neighborhood}
            </ThemedText>
          </View>

          {/* Visit status + map link */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 16,
            }}
          >
            <Pressable
              onPress={handleToggleVisited}
              style={({ pressed }) => ({
                paddingHorizontal: 14,
                paddingVertical: 8,
                borderRadius: 999,
                borderWidth: 1,
                opacity: pressed ? 0.7 : 1,
                backgroundColor: hasVisited
                  ? 'rgba(255,255,255,0.08)'
                  : 'transparent',
              })}
            >
              <ThemedText
                style={{
                  fontSize: 13,
                  fontWeight: '500',
                }}
              >
                {hasVisited ? 'Visited' : 'Mark visited'}
              </ThemedText>
            </Pressable>

            <Link
              href={{
                pathname: '/(tabs)/venues/[id]/map',
                params: { id: venue.id },
              }}
              asChild
            >
              <Pressable
                style={({ pressed }) => ({
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  borderRadius: 999,
                  borderWidth: 1,
                  opacity: pressed ? 0.7 : 1,
                })}
              >
                <ThemedText
                  style={{
                    fontSize: 13,
                    fontWeight: '500',
                  }}
                >
                  View on map →
                </ThemedText>
              </Pressable>
            </Link>
          </View>

          {/* Description */}
          <View style={{ marginBottom: 16 }}>
            <ThemedText
              style={{
                fontSize: 14,
                lineHeight: 20,
                marginBottom: 8,
              }}
            >
              {venue.description}
            </ThemedText>
          </View>

          {/* Tags */}
          <View style={{ marginBottom: 24 }}>
            <ThemedText
              style={{
                fontSize: 13,
                opacity: 0.7,
                marginBottom: 6,
              }}
            >
              Tags
            </ThemedText>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: 6,
              }}
            >
              {venue.tags.map((tag) => (
                <View
                  key={tag}
                  style={{
                    paddingHorizontal: 10,
                    paddingVertical: 4,
                    borderRadius: 999,
                    borderWidth: 1,
                  }}
                >
                  <ThemedText
                    style={{
                      fontSize: 11,
                    }}
                  >
                    {tag}
                  </ThemedText>
                </View>
              ))}
            </View>
          </View>

          {/* Mood picker */}
          <View style={{ marginBottom: 20 }}>
            <ThemedText
              style={{
                fontSize: 16,
                fontWeight: '600',
                marginBottom: 6,
              }}
            >
              How did it feel here?
            </ThemedText>
            <ThemedText
              style={{
                fontSize: 13,
                opacity: 0.7,
                marginBottom: 10,
              }}
            >
              Pick the mood that fits this visit. You can change it before saving.
            </ThemedText>

            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: 8,
              }}
            >
              {REFLECTION_MOODS.map((m) => {
                const isActive = reflectionMood === m.key;
                return (
                  <Pressable
                    key={m.key}
                    onPress={() =>
                      setReflectionMood((current) =>
                        current === m.key ? null : m.key
                      )
                    }
                    style={({ pressed }) => ({
                      paddingHorizontal: 14,
                      paddingVertical: 8,
                      borderRadius: 999,
                      borderWidth: 1,
                      opacity: pressed ? 0.7 : 1,
                      backgroundColor: isActive
                        ? 'rgba(255,255,255,0.08)'
                        : 'transparent',
                    })}
                  >
                    <ThemedText
                      style={{
                        fontSize: 13,
                        fontWeight: isActive ? '600' : '400',
                      }}
                    >
                      {m.label}
                    </ThemedText>
                  </Pressable>
                );
              })}
            </View>
          </View>

          {/* Reflection composer */}
          <View style={{ marginBottom: 28 }}>
            <ThemedText
              style={{
                fontSize: 16,
                fontWeight: '600',
                marginBottom: 6,
              }}
            >
              Reflection
            </ThemedText>
            <ThemedText
              style={{
                fontSize: 13,
                opacity: 0.7,
                marginBottom: 10,
              }}
            >
              {reflectionsEnabled
                ? 'Write a few lines to your future self about this visit.'
                : 'Once you have visited this place at least once, you can start leaving reflections here.'}
            </ThemedText>

            <View
              style={{
                borderRadius: 12,
                borderWidth: 1,
                opacity: reflectionsEnabled ? 1 : 0.5,
                marginBottom: 10,
              }}
            >
              <TextInput
                value={note}
                onChangeText={setNote}
                editable={reflectionsEnabled}
                placeholder={
                  reflectionsEnabled
                    ? '“What stayed with me from tonight was…”'
                    : 'Mark this place as visited first.'
                }
                placeholderTextColor="rgba(255,255,255,0.4)"
                multiline
                autoCapitalize="sentences"
                autoCorrect
                style={{
                  paddingHorizontal: 12,
                  paddingVertical: 10,
                  minHeight: 80,
                  fontSize: 14,
                  color: '#ffffff',
                  textAlignVertical: 'top',
                }}
              />
            </View>

            <Pressable
              disabled={!reflectionsEnabled}
              onPress={handleAddReflection}
              style={({ pressed }) => ({
                alignSelf: 'flex-start',
                paddingHorizontal: 16,
                paddingVertical: 10,
                borderRadius: 999,
                borderWidth: 1,
                opacity: !reflectionsEnabled ? 0.4 : pressed ? 0.7 : 1,
              })}
            >
              <ThemedText
                style={{
                  fontSize: 14,
                  fontWeight: '500',
                }}
              >
                Add reflection
              </ThemedText>
            </Pressable>
          </View>

          {/* Visit history */}
          <View>
            <ThemedText
              style={{
                fontSize: 16,
                fontWeight: '600',
                marginBottom: 8,
              }}
            >
              Visit history
            </ThemedText>

            {reflections.length === 0 ? (
              <ThemedText
                style={{
                  fontSize: 13,
                  opacity: 0.7,
                }}
              >
                Your reflections will collect here over time — a small archive of how
                this place has held you.
              </ThemedText>
            ) : (
              <View style={{ gap: 10, marginTop: 8 }}>
                {reflections.map((ref: any, index: number) => {
                  const dateLabel = ref.createdAt
                    ? new Date(ref.createdAt).toLocaleString()
                    : `Visit ${reflections.length - index}`;

                  return (
                    <View
                      key={
                        ref.createdAt ??
                        `${index}-${ref.note?.slice(0, 8) ?? 'ref'}`
                      }
                      style={{
                        paddingHorizontal: 12,
                        paddingVertical: 10,
                        borderRadius: 12,
                        borderWidth: 1,
                      }}
                    >
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginBottom: 6,
                        }}
                      >
                        <ThemedText
                          style={{
                            fontSize: 12,
                            opacity: 0.7,
                          }}
                        >
                          {dateLabel}
                        </ThemedText>
                        {ref.mood && (
                          <View
                            style={{
                              paddingHorizontal: 10,
                              paddingVertical: 4,
                              borderRadius: 999,
                              borderWidth: 1,
                            }}
                          >
                            <ThemedText
                              style={{
                                fontSize: 11,
                                fontWeight: '500',
                              }}
                            >
                              {String(ref.mood)}
                            </ThemedText>
                          </View>
                        )}
                      </View>

                      <ThemedText
                        style={{
                          fontSize: 14,
                          lineHeight: 20,
                        }}
                      >
                        {ref.note || 'No words left here — just the mood.'}
                      </ThemedText>
                    </View>
                  );
                })}
              </View>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}
