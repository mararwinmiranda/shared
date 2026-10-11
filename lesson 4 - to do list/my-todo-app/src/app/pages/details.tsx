import { Alert, Text } from "react-native";

import { Image } from "expo-image";
import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useRouter, router } from "expo-router";

export default function DetailsScreen() {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 24,
      backgroundColor: "#F5F7FA",
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 24,
      gap: 12,
    },
    title: {
      fontSize: 28,
      fontWeight: "bold",
    },
    reactLogo: { height: 48, width: 78, resizeMode: "contain" },
  });
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("@/assets/images/react-logo.png")}
          style={styles.reactLogo}
        />
        <Text style={styles.header}>To-Do Details Page</Text>
      </View>

      <View>
        <Text>To-Do Details</Text>
      </View>
    </View>
  );
}
