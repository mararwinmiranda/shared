import { Image } from "expo-image";
import { Text } from "react-native";

import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

export default function DetailsScreen() {
  const [doneCount, setDoneCount] = useState<number | null>(null);
  useEffect(() => {
    fetch("http://localhost:5000/api/done-count")
      .then((res) => res.json())
      .then((data) => setDoneCount(data.doneCount))
      .catch(() => setDoneCount(null));
  }, []);

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
        <Text style={styles.title}>To-Do Details</Text>
      </View>
      <Text style={styles.title}>Task Details</Text>
      <View>
        <Text>Number of tasks done:</Text>
        <Text>{doneCount !== null ? doneCount : "Loading..."}</Text>
      </View>
    </View>
  );
}
