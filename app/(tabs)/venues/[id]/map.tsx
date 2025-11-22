// app/(tabs)/venues/[id]/map.tsx
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useMemo } from 'react';
import {
    Linking,
    Platform,
    Pressable,
    View,
} from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import Colors from '@/constants/Colors';
import { VENUES } from '@/constants/venues';
import { useLocationService } from '@/hooks/useLocationService';

const DEFAULT_REGION: Region = {
  latitude: 40.4168,
  longitude: -3.7038,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};

export default function VenueMapScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const venue = VENUES.find((v) => v.id === id);

  const accent =
    (Colors as any)?.dark?.accent ??
    (Colors as any)?.dark?.tint ??
    '#4ade80';

  const softBorder =
    (Colors as any)?.dark?.muted ?? 'rgba(148, 163, 184, 0.6)';

  const dotVenue = accent;

  const {
    locationPermission,
    isRequesting,
    getOrRequestLocation,
  } = useLocationService();

  const hasCoords =
    venue &&
    typeof (venue as any).latitude === 'number' &&
    typeof (venue as any).longitude === 'number';

  const region: Region = useMemo(() => {
    if (hasCoords && venue) {
      return {
        latitude: (venue as any).latitude as number,
        longitude: (venue as any).longitude as number,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
    }
    return DEFAULT_REGION;
  }, [hasCoords, venue]);

  const handleBackToVenue = () => {
    router.back();
  };

  const handleBackToVenuesList = () => {
    router.push('/(tabs)/venues');
  };

  const handleOpenInMaps = () => {
    if (!venue || !hasCoords) return;

    const lat = (venue as any).latitude as number;
    const lon = (venue as any).longitude as number;
    const label = encodeURIComponent(venue.name);

    let url = '';

    if (Platform.OS === 'ios') {
      // Apple Maps with walking directions
      url = `http://maps.apple.com/?daddr=${lat},${lon}&dirflg=w&q=${label}`;
    } else {
      // Google Maps with walking directions
      url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}&travelmode=walking`;
    }

    void Linking.openURL(url).catch((err) => {
      console.warn('Error opening maps for directions', err);
    });
  };

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

  if (!hasCoords) {
    return (
      <ThemedView
        style={{
          flex: 1,
          paddingHorizontal: 20,
          paddingTop: 40,
          paddingBottom: 40,
        }}
      >
        <ThemedText
          style={{
            fontSize: 20,
            fontWeight: '600',
            marginBottom: 8,
          }}
        >
          {venue.name}
        </ThemedText>
        {(venue as any).neighborhood && (
          <ThemedText
            style={{
              fontSize: 14,
              opacity: 0.7,
              marginBottom: 16,
            }}
          >
            {(venue as any).neighborhood}
          </ThemedText>
        )}

        <View
          style={{
            flex: 1,
            borderRadius: 16,
            borderWidth: 1,
            borderColor: softBorder,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 24,
          }}
        >
          <ThemedText
            style={{
              fontSize: 16,
              fontWeight: '600',
              marginBottom: 8,
            }}
          >
            Map coming soon
          </ThemedText>
          <ThemedText
            style={{
              fontSize: 14,
              opacity: 0.7,
              textAlign: 'center',
            }}
          >
            Orbit doesn&apos;t know exactly where this place sits yet. Once you
            add coordinates, you&apos;ll be able to see it on the map and open
            directions in Apple Maps or Google Maps.
          </ThemedText>
        </View>
      </ThemedView>
    );
  }

  return (
    <ThemedView
      style={{
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 40,
        paddingBottom: 40,
      }}
    >
      <ThemedText
        style={{
          fontSize: 20,
          fontWeight: '600',
          marginBottom: 4,
        }}
      >
        {venue.name}
      </ThemedText>
      {(venue as any).neighborhood && (
        <ThemedText
          style={{
            fontSize: 14,
            opacity: 0.7,
            marginBottom: 12,
          }}
        >
          {(venue as any).neighborhood}
        </ThemedText>
      )}

      {/* Map with floating controls */}
      <View
        style={{
          flex: 1,
          borderRadius: 16,
          borderWidth: 1,
          borderColor: softBorder,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <MapView
          style={{ flex: 1 }}
          initialRegion={region}
          showsUserLocation={locationPermission === 'granted'}
        >
          <Marker
            coordinate={{
              latitude: (venue as any).latitude as number,
              longitude: (venue as any).longitude as number,
            }}
            title={venue.name}
            description={(venue as any).neighborhood}
            pinColor={dotVenue}
          />
        </MapView>

        {/* Floating control panel */}
        <View
          style={{
            position: 'absolute',
            left: 12,
            right: 12,
            bottom: 12,
            borderRadius: 24,
            paddingHorizontal: 12,
            paddingVertical: 10,
            backgroundColor: 'rgba(15, 23, 42, 0.9)',
            borderWidth: 1,
            borderColor: softBorder,
            gap: 8,
          }}
        >
          <ThemedText
            style={{
              fontSize: 11,
              opacity: 0.85,
              marginBottom: 2,
            }}
          >
            Step back to the venue, jump to the full list, or open walking
            directions in your maps app.
          </ThemedText>

          {/* Main buttons row */}
          <View
            style={{
              flexDirection: 'row',
              gap: 10,
            }}
          >
            {/* Back to venue page */}
            <Pressable
              onPress={handleBackToVenue}
              style={({ pressed }) => ({
                flex: 1,
                paddingVertical: 8,
                borderRadius: 999,
                borderWidth: 1,
                borderColor: softBorder,
                backgroundColor: pressed
                  ? 'rgba(148, 163, 184, 0.18)'
                  : 'transparent',
                alignItems: 'center',
              })}
            >
              <ThemedText
                style={{
                  fontSize: 13,
                  fontWeight: '500',
                }}
              >
                Back to venue page
              </ThemedText>
            </Pressable>

            {/* Directions */}
            <Pressable
              onPress={handleOpenInMaps}
              style={({ pressed }) => ({
                flex: 1,
                paddingVertical: 8,
                borderRadius: 999,
                borderWidth: 1,
                borderColor: accent,
                backgroundColor: pressed
                  ? 'rgba(74, 222, 128, 0.18)'
                  : 'transparent',
                alignItems: 'center',
              })}
            >
              <ThemedText
                style={{
                  fontSize: 13,
                  fontWeight: '500',
                }}
              >
                {Platform.OS === 'ios'
                  ? 'Open in Apple Maps'
                  : 'Open in Google Maps'}
              </ThemedText>
            </Pressable>
          </View>

          {/* Second row: back to venues list + refresh */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 4,
              gap: 8,
            }}
          >
            <Pressable
              onPress={handleBackToVenuesList}
              style={({ pressed }) => ({
                flex: 1,
                paddingVertical: 6,
                paddingHorizontal: 10,
                borderRadius: 999,
                borderWidth: 1,
                borderColor: softBorder,
                backgroundColor: pressed
                  ? 'rgba(148, 163, 184, 0.18)'
                  : 'transparent',
                alignItems: 'center',
              })}
            >
              <ThemedText
                style={{
                  fontSize: 11,
                  opacity: 0.9,
                }}
              >
                Back to venues list
              </ThemedText>
            </Pressable>

            <Pressable
              disabled={isRequesting}
              onPress={() => {
                void getOrRequestLocation();
              }}
              style={({ pressed }) => ({
                paddingVertical: 6,
                paddingHorizontal: 12,
                borderRadius: 999,
                borderWidth: 1,
                borderColor: softBorder,
                backgroundColor: pressed
                  ? 'rgba(148, 163, 184, 0.18)'
                  : 'transparent',
                opacity: isRequesting ? 0.7 : 1,
                alignItems: 'center',
              })}
            >
              <ThemedText
                style={{
                  fontSize: 10,
                  opacity: 0.85,
                }}
              >
                {isRequesting ? 'Updating…' : 'Refresh your location'}
              </ThemedText>
            </Pressable>
          </View>
        </View>
      </View>
    </ThemedView>
  );
}
