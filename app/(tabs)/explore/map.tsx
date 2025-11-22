// app/(tabs)/explore/map.tsx
import { Link } from 'expo-router';
import React, { useMemo } from 'react';
import {
    ActivityIndicator,
    Pressable,
    View,
} from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';

import { OrbitHeader } from '@/components/OrbitHeader';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import Colors from '@/constants/Colors';
import { VENUES, Venue } from '@/constants/venues';
import { useOrbit } from '@/context/OrbitContext';
import { useLocationService } from '@/hooks/useLocationService';

const DEFAULT_REGION: Region = {
  latitude: 40.4168, // Madrid center
  longitude: -3.7038,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};

function distanceInKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export default function ExploreMapScreen() {
  const accent =
    (Colors as any)?.dark?.accent ??
    (Colors as any)?.dark?.tint ??
    '#4ade80';

  const softBorder =
    (Colors as any)?.dark?.muted ?? 'rgba(148, 163, 184, 0.6)';

  const dotVisited = accent;
  const dotCurious = '#facc15';
  const dotSuggested = '#fb7185';

  const pillBaseStyle = {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: accent,
  } as const;

  const { checkins, curiousVenueIds } = useOrbit();
  const {
    locationPermission,
    userLocation,
    isRequesting,
    error,
    getOrRequestLocation,
  } = useLocationService();

  const hasLocation = locationPermission === 'granted' && !!userLocation;

  const region: Region = useMemo(() => {
    if (hasLocation && userLocation) {
      return {
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        latitudeDelta: 0.03,
        longitudeDelta: 0.03,
      };
    }
    return DEFAULT_REGION;
  }, [hasLocation, userLocation]);

  const visitedIds = useMemo(
    () => new Set(checkins.map((c) => c.venueId)),
    [checkins]
  );
  const curiousIds = useMemo(
    () => new Set(curiousVenueIds),
    [curiousVenueIds]
  );

  const visitedVenues: Venue[] = useMemo(() => {
    if (!checkins.length) return [];
    return VENUES.filter(
      (v) =>
        visitedIds.has(v.id) &&
        typeof v.latitude === 'number' &&
        typeof v.longitude === 'number'
    );
  }, [visitedIds]);

  const curiousVenues: Venue[] = useMemo(() => {
    if (!curiousVenueIds.length) return [];
    return VENUES.filter(
      (v) =>
        curiousIds.has(v.id) &&
        !visitedIds.has(v.id) &&
        typeof v.latitude === 'number' &&
        typeof v.longitude === 'number'
    );
  }, [curiousIds, visitedIds, curiousVenueIds.length]);

  const suggestedVenues: Venue[] = useMemo(() => {
    const candidates = VENUES.filter(
      (v) =>
        !visitedIds.has(v.id) &&
        !curiousIds.has(v.id) &&
        typeof v.latitude === 'number' &&
        typeof v.longitude === 'number'
    );

    if (hasLocation && userLocation) {
      const { latitude, longitude } = userLocation;
      const withDistance = candidates.map((v) => ({
        venue: v,
        distance: distanceInKm(
          latitude,
          longitude,
          v.latitude as number,
          v.longitude as number
        ),
      }));
      withDistance.sort((a, b) => a.distance - b.distance);
      return withDistance.slice(0, 10).map((x) => x.venue);
    }

    return candidates.slice(0, 10);
  }, [hasLocation, userLocation, visitedIds, curiousIds]);

  return (
    <ThemedView
      style={{
        flex: 1,
        backgroundColor: '#05090B', // deep Orbit night
      }}
    >
      <OrbitHeader subtitle="your places, from a little higher" padded />

      <View
        style={{
          flex: 1,
          paddingHorizontal: 20,
          paddingBottom: 20,
          paddingTop: 12,
          gap: 12,
        }}
      >
        {/* Back buttons row */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: 12,
          }}
        >
          <Link href="/(tabs)/explore" asChild>
            <Pressable
              style={({ pressed }) => ({
                ...pillBaseStyle,
                flex: 1,
                alignItems: 'center',
                backgroundColor: pressed
                  ? 'rgba(74, 222, 128, 0.12)'
                  : 'transparent',
                opacity: pressed ? 0.85 : 1,
              })}
            >
              <ThemedText
                style={{
                  fontSize: 14,
                  fontWeight: '500',
                }}
              >
                Back to Explore
              </ThemedText>
            </Pressable>
          </Link>

          <Link href="/(tabs)/venues" asChild>
            <Pressable
              style={({ pressed }) => ({
                ...pillBaseStyle,
                flex: 1,
                alignItems: 'center',
                backgroundColor: pressed
                  ? 'rgba(74, 222, 128, 0.12)'
                  : 'transparent',
                opacity: pressed ? 0.85 : 1,
              })}
            >
              <ThemedText
                style={{
                  fontSize: 14,
                  fontWeight: '500',
                }}
              >
                Back to Venues
              </ThemedText>
            </Pressable>
          </Link>
        </View>

        {/* Title + description */}
        <View style={{ gap: 4 }}>
          <ThemedText
            style={{
              fontSize: 20,
              fontWeight: '700',
            }}
          >
            Your orbit on the map
          </ThemedText>

          <ThemedText
            style={{
              fontSize: 12,
              lineHeight: 18,
              opacity: 0.8,
            }}
          >
            A growing sky of your places — cafés, galleries, bars, walks, and
            corners that keep calling you back.
          </ThemedText>
        </View>

        {/* Location explainer only when we truly don't have location */}
        {!hasLocation && (
          <View
            style={{
              borderWidth: 1,
              borderRadius: 14,
              borderColor: softBorder,
              padding: 10,
              gap: 6,
              backgroundColor: 'rgba(15, 23, 42, 0.9)',
            }}
          >
            <ThemedText
              style={{
                fontSize: 12,
                fontWeight: '500',
              }}
            >
              Location & your orbit
            </ThemedText>

            <ThemedText
              style={{
                fontSize: 11,
                lineHeight: 17,
                opacity: 0.8,
              }}
            >
              Orbit can use your location to show nearby cafés, galleries, bars,
              and walks that might feel like you. It&apos;s only used to center
              the map and suggest places — never shared, never shown to other
              people.
            </ThemedText>

            {error && (
              <ThemedText
                style={{
                  fontSize: 11,
                  color: '#f97373',
                }}
              >
                {error}
              </ThemedText>
            )}

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 2,
                gap: 10,
              }}
            >
              <Pressable
                disabled={isRequesting}
                onPress={() => {
                  void getOrRequestLocation();
                }}
                style={({ pressed }) => ({
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 999,
                  borderWidth: 1,
                  borderColor: accent,
                  backgroundColor: pressed
                    ? 'rgba(74, 222, 128, 0.16)'
                    : 'transparent',
                  opacity: isRequesting ? 0.7 : 1,
                })}
              >
                <ThemedText
                  style={{
                    fontSize: 11,
                    fontWeight: '500',
                  }}
                >
                  Enable location
                </ThemedText>
              </Pressable>

              {isRequesting && (
                <ActivityIndicator size="small" color={accent} />
              )}
            </View>

            <ThemedText
              style={{
                fontSize: 10,
                opacity: 0.7,
                marginTop: 2,
              }}
            >
              You can still wander this map without sharing your location. It
              will simply start from a default view.
            </ThemedText>
          </View>
        )}

        {/* Big map */}
        <View
          style={{
            flex: 1,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: softBorder,
            overflow: 'hidden',
            marginTop: hasLocation ? 4 : 0,
          }}
        >
          <MapView
            style={{ flex: 1 }}
            initialRegion={region}
            showsUserLocation={hasLocation}
          >
            {/* Visited venues */}
            {visitedVenues.map((venue) => (
              <Marker
                key={`visited-${venue.id}`}
                coordinate={{
                  latitude: venue.latitude as number,
                  longitude: venue.longitude as number,
                }}
                title={venue.name}
                description={venue.neighborhood}
                pinColor={dotVisited}
              />
            ))}

            {/* Curious venues */}
            {curiousVenues.map((venue) => (
              <Marker
                key={`curious-${venue.id}`}
                coordinate={{
                  latitude: venue.latitude as number,
                  longitude: venue.longitude as number,
                }}
                title={venue.name}
                description={venue.neighborhood}
                pinColor={dotCurious}
              />
            ))}

            {/* Suggested venues */}
            {suggestedVenues.map((venue) => (
              <Marker
                key={`suggested-${venue.id}`}
                coordinate={{
                  latitude: venue.latitude as number,
                  longitude: venue.longitude as number,
                }}
                title={venue.name}
                description={venue.neighborhood}
                pinColor={dotSuggested}
              />
            ))}
          </MapView>

          {/* Floating legend */}
          <View
            style={{
              position: 'absolute',
              left: 10,
              bottom: 10,
              paddingHorizontal: 10,
              paddingVertical: 6,
              borderRadius: 999,
              backgroundColor: 'rgba(15, 23, 42, 0.85)',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <LegendDot label="visited" color={dotVisited} />
            <LegendDot label="you" color="#60a5fa" />
            <LegendDot label="curious" color={dotCurious} />
            <LegendDot label="suggested" color={dotSuggested} />
          </View>

          {/* Tiny debug badge, top-right */}
          <View
            pointerEvents="none"
            style={{
              position: 'absolute',
              right: 10,
              top: 10,
              paddingHorizontal: 8,
              paddingVertical: 4,
              borderRadius: 999,
              backgroundColor: 'rgba(15, 23, 42, 0.6)',
            }}
          >
            <ThemedText
              style={{
                fontSize: 9,
                opacity: 0.9,
              }}
            >
              perm: {locationPermission} · loc:{' '}
              {userLocation
                ? `${userLocation.latitude.toFixed(
                    3
                  )}, ${userLocation.longitude.toFixed(3)}`
                : 'none'}
            </ThemedText>
          </View>
        </View>
      </View>
    </ThemedView>
  );
}

type LegendDotProps = {
  label: string;
  color: string;
};

function LegendDot({ label, color }: LegendDotProps) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
      }}
    >
      <View
        style={{
          width: 8,
          height: 8,
          borderRadius: 999,
          backgroundColor: color,
        }}
      />
      <ThemedText
        style={{
          fontSize: 10,
          opacity: 0.85,
        }}
      >
        {label}
      </ThemedText>
    </View>
  );
}
