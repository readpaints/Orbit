import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

type OrbitEvent = {
  id: string;
  title: string;
  location: string;
  time: string;
  status: string;
  description: string;
};

const MOCK_ORBIT_EVENTS: OrbitEvent[] = [
  {
    id: "1",
    title: "Museo del Prado · Evening Orbit",
    location: "Madrid, Spain",
    time: "Today · 18:30",
    status: "Active orbit",
    description:
      "A recurring evening loop through your favorite galleries. Track how often you return here.",
  },
  {
    id: "2",
    title: "Retiro Park · Walk + Notes",
    location: "Parque del Retiro",
    time: "Mornings · Most weekdays",
    status: "Core orbit",
    description:
      "One of your main movement patterns. Great place to jot reflections and notice mood shifts.",
  },
  {
    id: "3",
    title: "Neighborhood Café Check-in",
    location: "Lavapiés",
    time: "Afternoons · Sometimes",
    status: "Emerging orbit",
    description:
      "A newer stop in your pattern. See if it becomes a regular part of your orbit over time.",
  },
];

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.appName}>Orbit</Text>
        <Text style={styles.tagline}>
          See where you keep returning — and what those places say about you.
        </Text>
      </View>

      {/* Section title */}
      <Text style={styles.sectionTitle}>Your Orbit</Text>

      {/* Cards */}
      <View style={styles.cardsWrapper}>
        {MOCK_ORBIT_EVENTS.map((event) => (
          <View key={event.id} style={styles.card}>
            <Text style={styles.cardTitle}>{event.title}</Text>
            <Text style={styles.cardMeta}>
              {event.location} · {event.time}
            </Text>
            <Text style={styles.cardStatus}>{event.status}</Text>
            <Text style={styles.cardDescription}>{event.description}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 24,
  },
  appName: {
    fontSize: 32,
    fontWeight: "700",
    letterSpacing: 1,
    marginBottom: 4,
  },
  tagline: {
    fontSize: 14,
    color: "#555",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },
  cardsWrapper: {
    gap: 12,
  },
  card: {
    borderRadius: 16,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  cardMeta: {
    fontSize: 13,
    color: "#666",
    marginBottom: 4,
  },
  cardStatus: {
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: "#333",
  },
});
