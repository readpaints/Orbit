// app/(tabs)/additional/settings.tsx
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import React, { useState } from 'react';
import { Alert, Pressable, ScrollView, View } from 'react-native';

export default function SettingsScreen() {
  const [darkPreferred] = useState(true);

  const handleExport = () => {
    Alert.alert(
      'Export (coming soon)',
      'In a future version, this will let you export your orbit as a file you can keep or print.'
    );
  };

  const handleClearAll = () => {
    Alert.alert(
      'Clear all data (future)',
      'Eventually, this will wipe all check-ins and reflections from this device. For now, it is just a preview.'
    );
  };

  return (
    <ThemedView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 40,
          paddingBottom: 40,
        }}
      >
        <ThemedText
          style={{
            fontSize: 22,
            fontWeight: '600',
            marginBottom: 6,
          }}
        >
          Settings
        </ThemedText>
        <ThemedText
          style={{
            fontSize: 13,
            opacity: 0.7,
            marginBottom: 20,
          }}
        >
          A few gentle controls for how Orbit behaves on this device.
        </ThemedText>

        {/* Theme preference (placeholder) */}
        <View
          style={{
            borderRadius: 16,
            borderWidth: 1,
            padding: 16,
            marginBottom: 16,
          }}
        >
          <ThemedText
            style={{
              fontSize: 14,
              fontWeight: '600',
              marginBottom: 4,
            }}
          >
            Theme
          </ThemedText>
          <ThemedText
            style={{
              fontSize: 13,
              opacity: 0.7,
              marginBottom: 10,
            }}
          >
            Orbit currently follows its own built-in theme. Later, you&apos;ll be able to
            choose light, dark, or system.
          </ThemedText>

          <ThemedText
            style={{
              fontSize: 13,
              opacity: 0.8,
            }}
          >
            Preferred: {darkPreferred ? 'Dark' : 'Light'} (preview only)
          </ThemedText>
        </View>

        {/* Data export */}
        <View
          style={{
            borderRadius: 16,
            borderWidth: 1,
            padding: 16,
            marginBottom: 16,
          }}
        >
          <ThemedText
            style={{
              fontSize: 14,
              fontWeight: '600',
              marginBottom: 4,
            }}
          >
            Export your orbit
          </ThemedText>
          <ThemedText
            style={{
              fontSize: 13,
              opacity: 0.7,
              marginBottom: 10,
            }}
          >
            One button to export your check-ins and reflections to a file you can keep,
            print, or move elsewhere.
          </ThemedText>

          <Pressable
            onPress={handleExport}
            style={({ pressed }) => ({
              alignSelf: 'flex-start',
              paddingHorizontal: 16,
              paddingVertical: 10,
              borderRadius: 999,
              borderWidth: 1,
              opacity: pressed ? 0.7 : 1,
            })}
          >
            <ThemedText
              style={{
                fontSize: 14,
                fontWeight: '500',
              }}
            >
              Export (preview)
            </ThemedText>
          </Pressable>
        </View>

        {/* Clear data */}
        <View
          style={{
            borderRadius: 16,
            borderWidth: 1,
            padding: 16,
          }}
        >
          <ThemedText
            style={{
              fontSize: 14,
              fontWeight: '600',
              marginBottom: 4,
            }}
          >
            Clear all data
          </ThemedText>
          <ThemedText
            style={{
              fontSize: 13,
              opacity: 0.7,
              marginBottom: 10,
            }}
          >
            When this is fully wired, it will erase all check-ins and reflections from
            this device. A last-resort reset.
          </ThemedText>

          <Pressable
            onPress={handleClearAll}
            style={({ pressed }) => ({
              alignSelf: 'flex-start',
              paddingHorizontal: 16,
              paddingVertical: 10,
              borderRadius: 999,
              borderWidth: 1,
              opacity: pressed ? 0.7 : 1,
            })}
          >
            <ThemedText
              style={{
                fontSize: 14,
                fontWeight: '500',
              }}
            >
              Clear all (preview)
            </ThemedText>
          </Pressable>

          <ThemedText
            style={{
              fontSize: 11,
              opacity: 0.6,
              marginTop: 8,
            }}
          >
            Don&apos;t worry — for now it only opens this explanation.
          </ThemedText>
        </View>
      </ScrollView>
    </ThemedView>
  );
}
