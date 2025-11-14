import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function VenuesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Venues (coming soon)</Text>
      <Text style={styles.subtitle}>
        This tab will show the places that form your orbit — museums, cafés,
        parks, and spots you return to over and over.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
  },
});
