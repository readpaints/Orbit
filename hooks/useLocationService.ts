// hooks/useLocationService.ts
// Make sure you've run: npx expo install expo-location

import * as Location from 'expo-location';
import { useCallback, useEffect, useState } from 'react';

type LocationPermissionStatus = 'undetermined' | 'granted' | 'denied';

type UserLocation = {
  latitude: number;
  longitude: number;
} | null;

export interface UseLocationServiceResult {
  locationPermission: LocationPermissionStatus;
  userLocation: UserLocation;
  isRequesting: boolean;
  error: string | null;
  getOrRequestLocation: () => Promise<void>;
}

export function useLocationService(): UseLocationServiceResult {
  const [locationPermission, setLocationPermission] =
    useState<LocationPermissionStatus>('undetermined');
  const [userLocation, setUserLocation] = useState<UserLocation>(null);
  const [isRequesting, setIsRequesting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // On mount: check existing permission and, if granted, get location once
  useEffect(() => {
    let isMounted = true;

    const init = async () => {
      try {
        const { status } = await Location.getForegroundPermissionsAsync();
        if (!isMounted) return;

        if (status === Location.PermissionStatus.GRANTED) {
          setLocationPermission('granted');
          const loc = await Location.getCurrentPositionAsync({});
          if (!isMounted) return;

          setUserLocation({
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
          });
        } else if (status === Location.PermissionStatus.DENIED) {
          setLocationPermission('denied');
        } else {
          setLocationPermission('undetermined');
        }
      } catch (e) {
        if (!isMounted) return;
        console.warn('useLocationService: error during init', e);
        setError('Unable to check location permissions right now.');
      }
    };

    void init();

    return () => {
      isMounted = false;
    };
  }, []);

  const getOrRequestLocation = useCallback(async () => {
    setError(null);
    setIsRequesting(true);

    try {
      // Ask for permission (or re-ask if previously undetermined)
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== Location.PermissionStatus.GRANTED) {
        setLocationPermission(
          status === Location.PermissionStatus.DENIED ? 'denied' : 'undetermined'
        );
        setUserLocation(null);
        setError('Location permission was not granted.');
        return;
      }

      setLocationPermission('granted');

      const loc = await Location.getCurrentPositionAsync({});
      setUserLocation({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });
    } catch (e) {
      console.warn('useLocationService: error requesting location', e);
      setError('Unable to get your location right now.');
    } finally {
      setIsRequesting(false);
    }
  }, []);

  return {
    locationPermission,
    userLocation,
    isRequesting,
    error,
    getOrRequestLocation,
  };
}
