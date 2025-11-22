// app/(tabs)/venues/map.tsx
import { useRouter } from 'expo-router';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Pressable, View } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';

import { OrbitHeader } from '@/components/OrbitHeader';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import Colors from '@/constants/Colors';
import { VENUES, Venue } from '@/constants/venues';
import { useOrbit } from '@/context/OrbitContext';
import { useLocationService } from '@/hooks/useLocationService';

const DEFAULT_REGION: Region = {
  latitude: 40.4168,
  longitude: -3.7038,
  latitudeDelta: 0.12,
  longitudeDelta: 0.12,
};

type Checkin = {
  id: string;
  venueId: string;
  createdAt: string;
  note?: string | null;
  mood?: string | null;
  type: 'quick' | 'meaningful';
};

export default function VenuesMapScreen() {
  const router = useRouter();
  const mapRef = useRef<MapView | null>(null);

  const { checkins } = useOrbit() as { checkins: Checkin[] };

  const {
    location,
    locationPermission,
    isRequesting,
    getOrRequestLocation,
  } = useLocationService();

  const accent =
    (Colors as any)?.dark?.accent ??
    (Colors as any)?.dark?.tint ??
    '#4ade80';

  const softBorder =
    (Colors as any)?.dark?.muted ?? 'rgba(148, 163, 184, 0.6)';

  const dotVisited = '#f97316'; // orange
  const dotYou = '#3b82f6'; // blue
  const dotCurious = '#facc15'; // yellow
  const dotSuggested = '#fb7185'; // pink

  // ---------------------------------------------------------------------------
  // Derived data
  // ---------------------------------------------------------------------------

  const visitedIds = useMemo(() => {
    const ids = new Set<string>();
    (checkins ?? []).forEach((c) => {
      if (c.venueId) ids.add(c.venueId);
    });
    return ids;
  }, [checkins]);

  const venuesWithCoords: (Venue & {
    latitude?: number;
    longitude?: number;
  })[] = useMemo(
    () =>
      (VENUES as any[]).filter(
        (v) =>
          typeof v.latitude === 'number' &&
          typeof v.longitude === 'number'
      ),
    []
  );

  const preferredCenter: Region = useMemo(() => {
    if (location?.coords && locationPermission === 'granted') {
      // Tighter zoom when we know where you are
      return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.04,
        longitudeDelta: 0.04,
      };
    }
    return DEFAULT_REGION;
  }, [location, locationPermission]);

  // ---------------------------------------------------------------------------
  // Map region state (controlled MapView)
  // ---------------------------------------------------------------------------

  const [mapRegion, setMapRegion] = useState<Region>(preferredCenter);

  // When our idea of "best center" changes (e.g. a fresh GPS fix),
  // gently move the controlled region towards it.
  useEffect(() => {
    setMapRegion((prev) => ({
      ...prev,
      latitude: preferredCenter.latitude,
      longitude: preferredCenter.longitude,
      latitudeDelta: preferredCenter.latitudeDelta,
      longitudeDelta: preferredCenter.longitudeDelta,
    }));
  }, [
    preferredCenter.latitude,
    preferredCenter.longitude,
    preferredCenter.latitudeDelta,
    preferredCenter.longitudeDelta,
  ]);

  // ---------------------------------------------------------------------------
  // Handlers
  // ---------------------------------------------------------------------------

  const handleRecenter = () => {
    // Decide where to recenter: you if we know you, city if we don't.
    const targetRegion =
      location?.coords && locationPermission === 'granted'
        ? {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.04,
            longitudeDelta: 0.04,
          }
        : DEFAULT_REGION;

    setMapRegion(targetRegion);

    if (mapRef.current) {
      mapRef.current.animateToRegion(targetRegion, 600);
    }

    // Politely ask for a fresh fix in the background
    void getOrRequestLocation();
  };

  const handleMarkerCalloutPress = (venueId: string) => {
    router.push({
      pathname: '/(tabs)/venues/[id]',
      params: { id: venueId },
    });
  };

  const debugLabel =
    locationPermission === 'granted' && location?.coords
      ? `perm: granted · loc: ${location.coords.latitude.toFixed(
          3
        )}, ${location.coords.longitude.toFixed(3)}`
      : `perm: ${locationPermission || 'unknown'}`;

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <ThemedView
      style={{
        flex: 1,
        backgroundColor: '#05090B', // Orbit night
      }}
    >
      <OrbitHeader
        title="Venues map"
        subtitle="A simple orbit of places — where you've been, where you're curious, and a few quiet suggestions nearby."
        padded
      />

      <View
        style={{
          flex: 1,
          paddingHorizontal: 20,
          paddingTop: 8,
          paddingBottom: 32,
        }}
      >
        {/* Big sky map */}
        <View
          style={{
            flex: 1,
            borderRadius: 24,
            borderWidth: 1,
            borderColor: accent,
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <MapView
            ref={mapRef}
            style={{ flex: 1 }}
            region={mapRegion}
            onRegionChangeComplete={(region) => setMapRegion(region)}
            showsUserLocation={locationPermission === 'granted'}
          >
            {/* Debug badge in-map, pinned to current center */}
            <Marker
              coordinate={mapRegion}
              anchor={{ x: 1, y: 0 }}
              tappable={false}
            >
              <View
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 4,
                  borderRadius: 999,
                  backgroundColor: 'rgba(15, 23, 42, 0.9)',
                  borderWidth: 1,
                  borderColor: softBorder,
                }}
              >
                <ThemedText
                  style={{
                    fontSize: 10,
                    opacity: 0.8,
                  }}
                >
                  {debugLabel}
                </ThemedText>
              </View>
            </Marker>

            {/* Venue pins */}
            {venuesWithCoords.map((venue) => {
              const isVisited = visitedIds.has(venue.id);
              const pinColor = isVisited ? dotVisited : dotSuggested;

              return (
                <Marker
                  key={venue.id}
                  coordinate={{
                    latitude: venue.latitude as number,
                    longitude: venue.longitude as number,
                  }}
                  title={venue.name}
                  description={venue.neighborhood}
                  pinColor={pinColor}
                  onCalloutPress={() =>
                    handleMarkerCalloutPress(venue.id)
                  }
                />
              );
            })}
          </MapView>

          {/* Recenter pill */}
          <View
            style={{
              position: 'absolute',
              top: 12,
              right: 12,
            }}
          >
            <Pressable
              disabled={isRequesting}
              onPress={handleRecenter}
              style={({ pressed }) => ({
                paddingHorizontal: 14,
                paddingVertical: 8,
                borderRadius: 999,
                borderWidth: 1,
                borderColor: accent,
                backgroundColor: pressed
                  ? 'rgba(74, 222, 128, 0.18)'
                  : 'rgba(15, 23, 42, 0.92)',
                opacity: isRequesting ? 0.75 : 1,
              })}
            >
              <ThemedText
                style={{
                  fontSize: 12,
                  fontWeight: '500',
                }}
              >
                {isRequesting ? 'Recentering…' : 'Recenter map'}
              </ThemedText>
            </Pressable>
          </View>

          {/* Legend overlay – all four items visible */}
          <View
            style={{
              position: 'absolute',
              left: 16,
              right: 16,
              bottom: 12,
            }}
          >
            <View
              style={{
                alignSelf: 'center',
                borderRadius: 999,
                paddingHorizontal: 16,
                paddingVertical: 8,
                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                borderWidth: 1,
                borderColor: softBorder,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  minWidth: 220,
                  gap: 12,
                }}
              >
                <LegendItem label="visited" color={dotVisited} />
                <LegendItem label="you" color={dotYou} />
                <LegendItem label="curious" color={dotCurious} />
                <LegendItem label="suggested" color={dotSuggested} />
              </View>
            </View>
          </View>
        </View>
      </View>
    </ThemedView>
  );
}

type LegendItemProps = {
  label: string;
  color: string;
};

function LegendItem({ label, color }: LegendItemProps) {
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
          fontSize: 11,
          opacity: 0.8,
        }}
      >
        {label}
      </ThemedText>
    </View>
  );
}
