import { Image } from "expo-image";
import { Text } from "react-native";

import styles from "@/assets/css/styles";
import { useEffect, useState } from "react";
import { View } from "react-native";

export default function DetailsScreen() {
  const [doneCount, setDoneCount] = useState<number | null>(null);
  useEffect(() => {
    fetch("http://localhost:3000/api/done-count")
      .then((res) => res.json())
      .then((data) => setDoneCount(data.doneCount))
      .catch(() => setDoneCount(null));
  }, []);

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
