// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import { OrbitProvider } from '../../context/OrbitContext';

export default function TabsLayout() {
  return (
    <OrbitProvider>
      <Tabs>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: 'Explore',
          }}
        />
        <Tabs.Screen
          name="venues"
          options={{
            title: 'Venues',
          }}
        />
      </Tabs>
    </OrbitProvider>
  );
}
