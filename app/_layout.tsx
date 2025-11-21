// app/_layout.tsx
import { Stack } from 'expo-router';
import 'react-native-reanimated';

import { OrbitProvider } from '@/context/OrbitContext';

export default function RootLayout() {
  return (
    <OrbitProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </OrbitProvider>
  );
}
