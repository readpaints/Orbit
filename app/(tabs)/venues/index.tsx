// app/(tabs)/venues/index.tsx
import { Link } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';

import { OrbitHeader } from '@/components/OrbitHeader';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { VENUES } from '@/constants/venues';
import { useOrbit } from '@/context/OrbitContext';

type Checkin = {
  id: string;
  venueId: string;
  createdAt: string;
  note?: string | null;
  mood?: string | null;
  type: 'quick' | 'meaningful';
};

type SortMode = 'default' | 'alphabetical';

// Local accent for Venues – soft Orbit green
const VENUES_ACCENT = '#5FB49C';
const VENUES_ACCENT_MUTED = 'rgba(95,180,156,0.12)';

export default function VenuesScreen() {
  const {
    checkins,
    addCheckin,
    clearQuickCheckinsForVenue,
    getVenueCheckins,
  } = useOrbit() as any;

  const allCheckins: Checkin[] = useMemo(
    () => ((checkins ?? []) as Checkin[]),
    [checkins]
  );

  const [sortMode, setSortMode] = useState<SortMode>('default');

  const sortedVenues = useMemo(() => {
    if (sortMode === 'alphabetical') {
      return [...VENUES].sort((a: any, b: any) =>
        a.name.localeCompare(b.name)
      );
    }
    return VENUES;
  }, [sortMode]);

  const getVenueData = (venueId: string) => {
    const venueCheckins: Checkin[] =
      typeof getVenueCheckins === 'function'
        ? (getVenueCheckins(venueId) as Checkin[])
        : allCheckins.filter((c) => c.venueId === venueId);

    const visitCount = venueCheckins.length;
    const hasQuickVisit = venueCheckins.some((c) => c.type === 'quick');

    let summaryText: string;
    if (visitCount === 0) summaryText = 'No visits yet';
    else if (visitCount === 1) summaryText = '1 visit to this venue';
    else summaryText = `${visitCount} visits to this venue`;

    return { visitCount, hasQuickVisit, summaryText };
  };

  const handleToggleVisited = (venueId: string, hasQuickVisit: boolean) => {
    if (hasQuickVisit) {
      if (typeof clearQuickCheckinsForVenue === 'function') {
        clearQuickCheckinsForVenue(venueId);
      }
    } else {
      if (typeof addCheckin === 'function') {
        addCheckin({
          venueId,
          type: 'quick',
          mood: null,
          note: '',
        });
      }
    }
  };

  return (
    <ThemedView
      style={{
        flex: 1,
        // No local backgroundColor here – let Colors.ts + ThemedView decide
      }}
    >
      {/* Header without subtitle for this screen */}
      <OrbitHeader padded />

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 16,
          paddingBottom: 44,
          gap: 16,
        }}
      >
        {/* Intro card */}
        <View
          style={{
            borderRadius: 16,
            borderWidth: 1,
            borderColor: VENUES_ACCENT,
            paddingHorizontal: 16,
            paddingVertical: 14,
            backgroundColor: VENUES_ACCENT_MUTED,
          }}
        >
          <ThemedText
            style={{
              fontSize: 12,
              letterSpacing: 2,
              textTransform: 'uppercase',
              marginBottom: 4,
              opacity: 0.9,
            }}
          >
            ORBIT
          </ThemedText>
          <ThemedText
            style={{
              fontSize: 18,
              fontWeight: '600',
              marginBottom: 4,
            }}
          >
            Venues in this orbit
          </ThemedText>
          <ThemedText
            style={{
              fontSize: 13,
              opacity: 0.8,
            }}
          >
            All the cafés, galleries, bars, walks, and corners Orbit currently
            knows about here. Some already feel familiar; others are still
            waiting for their first note from you.
          </ThemedText>
        </View>

        {/* Map + sort row */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 12,
          }}
        >
          {/* Goes to the Venues map, not Explore map */}
          <Link href="/(tabs)/venues/map" asChild>
            <Pressable
              style={({ pressed }) => ({
                alignSelf: 'flex-start',
                paddingHorizontal: 18,
                paddingVertical: 10,
                borderRadius: 999,
                borderWidth: 1,
                borderColor: VENUES_ACCENT,
                backgroundColor: pressed ? VENUES_ACCENT_MUTED : 'transparent',
                opacity: pressed ? 0.95 : 1,
              })}
            >
              <ThemedText
                style={{
                  fontSize: 14,
                  fontWeight: '500',
                }}
              >
                Open map →
              </ThemedText>
            </Pressable>
          </Link>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <ThemedText
              style={{
                fontSize: 12,
                opacity: 0.7,
              }}
            >
              Sort by
            </ThemedText>

            {/* Sort pill: curated */}
            <Pressable
              onPress={() => setSortMode('default')}
              style={({ pressed }) => ({
                paddingHorizontal: 10,
                paddingVertical: 6,
                borderRadius: 999,
                borderWidth: 1,
                borderColor:
                  sortMode === 'default'
                    ? VENUES_ACCENT
                    : 'rgba(255,255,255,0.25)',
                backgroundColor:
                  sortMode === 'default'
                    ? VENUES_ACCENT_MUTED
                    : 'transparent',
                opacity: pressed ? 0.8 : 1,
              })}
            >
              <ThemedText
                style={{
                  fontSize: 12,
                  opacity: sortMode === 'default' ? 0.95 : 0.8,
                }}
              >
                curated
              </ThemedText>
            </Pressable>

            {/* Sort pill: A–Z */}
            <Pressable
              onPress={() => setSortMode('alphabetical')}
              style={({ pressed }) => ({
                paddingHorizontal: 10,
                paddingVertical: 6,
                borderRadius: 999,
                borderWidth: 1,
                borderColor:
                  sortMode === 'alphabetical'
                    ? VENUES_ACCENT
                    : 'rgba(255,255,255,0.25)',
                backgroundColor:
                  sortMode === 'alphabetical'
                    ? VENUES_ACCENT_MUTED
                    : 'transparent',
                opacity: pressed ? 0.8 : 1,
              })}
            >
              <ThemedText
                style={{
                  fontSize: 12,
                  opacity: sortMode === 'alphabetical' ? 0.95 : 0.8,
                }}
              >
                A–Z
              </ThemedText>
            </Pressable>
          </View>
        </View>

        {/* Clarifying line */}
        <ThemedText
          style={{
            fontSize: 12,
            opacity: 0.7,
            marginTop: 4,
          }}
        >
          This list shows every venue in Orbit right now — not just the ones
          you’ve visited.
        </ThemedText>

        {/* Venue list */}
        <View style={{ gap: 12, marginTop: 8 }}>
          {sortedVenues.map((venue) => {
            const { id, name, neighborhood, description, tags } = venue as any;
            const { hasQuickVisit, summaryText } = getVenueData(id);

            return (
              <View
                key={id}
                style={{
                  borderRadius: 16,
                  borderWidth: 1,
                  borderColor: 'rgba(255,255,255,0.16)',
                  padding: 14,
                  gap: 10,
                }}
              >
                <Link
                  href={{
                    pathname: '/(tabs)/venues/[id]',
                    params: { id },
                  }}
                  asChild
                >
                  <Pressable
                    style={({ pressed }) => ({
                      opacity: pressed ? 0.85 : 1,
                    })}
                  >
                    <View style={{ gap: 4 }}>
                      <ThemedText
                        style={{
                          fontSize: 16,
                          fontWeight: '600',
                        }}
                      >
                        {name}
                      </ThemedText>

                      {neighborhood && (
                        <ThemedText
                          style={{
                            fontSize: 12,
                            opacity: 0.8,
                          }}
                        >
                          {neighborhood}
                        </ThemedText>
                      )}

                      {description && (
                        <ThemedText
                          style={{
                            fontSize: 13,
                            opacity: 0.8,
                            marginTop: 4,
                          }}
                        >
                          {description}
                        </ThemedText>
                      )}
                    </View>

                    {Array.isArray(tags) && tags.length > 0 && (
                      <View
                        style={{
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          gap: 6,
                          marginTop: 8,
                        }}
                      >
                        {tags.map((tag: string) => (
                          <View
                            key={tag}
                            style={{
                              paddingHorizontal: 10,
                              paddingVertical: 4,
                              borderRadius: 999,
                              borderWidth: 1,
                              borderColor: 'rgba(255,255,255,0.22)',
                            }}
                          >
                            <ThemedText
                              style={{
                                fontSize: 11,
                                opacity: 0.9,
                              }}
                            >
                              {tag}
                            </ThemedText>
                          </View>
                        ))}
                      </View>
                    )}
                  </Pressable>
                </Link>

                <View
                  style={{
                    marginTop: 4,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 8,
                  }}
                >
                  <ThemedText
                    style={{
                      fontSize: 12,
                      opacity: 0.7,
                      flex: 1,
                    }}
                  >
                    {summaryText}
                  </ThemedText>

                  <Pressable
                    onPress={() => handleToggleVisited(id, hasQuickVisit)}
                    style={({ pressed }) => ({
                      paddingHorizontal: 14,
                      paddingVertical: 8,
                      borderRadius: 999,
                      borderWidth: 1,
                      borderColor: hasQuickVisit
                        ? VENUES_ACCENT
                        : 'rgba(255,255,255,0.35)',
                      backgroundColor: hasQuickVisit
                        ? VENUES_ACCENT_MUTED
                        : 'transparent',
                      opacity: pressed ? 0.8 : 1,
                    })}
                  >
                    <ThemedText
                      style={{
                        fontSize: 12,
                        fontWeight: '500',
                      }}
                    >
                      {hasQuickVisit ? 'Visited' : 'Mark visited'}
                    </ThemedText>
                  </Pressable>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </ThemedView>
  );
}
