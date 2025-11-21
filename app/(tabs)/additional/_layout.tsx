// app/(tabs)/additional/_layout.tsx
import { Stack } from 'expo-router';
import React from 'react';

export default function AdditionalLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
