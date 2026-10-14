import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
export default function DashboardScreen() {
  // State to hold backend message
  const [backendMessage, setBackendMessage] = useState("");
  const router = useRouter();
  const [tasks, setTasks] = useState([
    { id: "1", text: "Buy groceries", completed: false },
    { id: "2", text: "Finish homework", completed: false },
    { id: "3", text: "Call Mom", completed: true },
  ]);
  const [input, setInput] = useState("");
  useEffect(() => {
    // Replace 192.168.5.31 with your computer's IP if running on a
    fetch("http://localhost:5000/api/message")
      .then((res) => res.json())
      .then((data) => setBackendMessage(data.message))
      .catch(() => setBackendMessage("Could not connect to backend."));
  }, []);

  const addTask = () => {
    if (input.trim() === "") return;
    setTasks([
      ...tasks,
      { id: Date.now().toString(), text: input, completed: false },
    ]);
    setInput("");
  };

  const toggleTask = (id: string) => {
    setTasks((tasks) =>
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

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
    inputRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 16,
      gap: 8,
    },
    input: {
      flex: 1,
      borderWidth: 1,
      borderColor: "#D1D5DB",
      borderRadius: 8,
      padding: 10,
      backgroundColor: "#fff",
      fontSize: 16,
    },
    addButton: {
      backgroundColor: "#2563EB",
      paddingVertical: 10,
      paddingHorizontal: 18,
      borderRadius: 8,
    },
    addButtonText: {
      color: "#fff",
      fontWeight: "bold",
    },
    nextButton: {
      marginTop: 24,
      backgroundColor: "#10B981",
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: "center",
    },
    nextButtonText: {
      color: "#fff",
      fontWeight: "bold",
      fontSize: 16,
    },
    doneRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 12,
      marginTop: 8,
    },
    doneLabel: {
      fontSize: 16,
      color: "#374151",
      marginRight: 6,
    },
    doneValue: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#10B981",
    },
    list: {
      gap: 8,
    },
    taskItem: {
      padding: 14,
      borderRadius: 8,
      backgroundColor: "#fff",
      borderWidth: 1,
      borderColor: "#E5E7EB",
    },
    taskItemCompleted: {
      backgroundColor: "#D1FAE5",
      borderColor: "#10B981",
    },
    taskText: {
      fontSize: 16,
    },
    taskTextCompleted: {
      textDecorationLine: "line-through",
      color: "#6B7280",
    },
  });

  const renderTask = ({ item }: any) => (
    <TouchableOpacity
      style={[styles.taskItem, item.completed && styles.taskItemCompleted]}
      onPress={() => toggleTask(item.id)}
    >
      <Text
        style={[styles.taskText, item.completed && styles.taskTextCompleted]}
      >
        {item.text}
      </Text>
    </TouchableOpacity>
  );

  const doneCount = tasks.filter((task) => task.completed).length;

  const goToNextPage = async () => {
    try {
      await fetch("http://localhost:5000/api/done-count", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ doneCount }),
      });
      router.push("/pages/details");
    } catch {
      Alert.alert("Couldn't Catch the data");
      router.push("/pages/details");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("@/assets/images/react-logo.png")}
          style={styles.reactLogo}
        />
        <Text style={styles.title}>To-Do Dashboard</Text>
      </View>
      <View style={{ marginBottom: 16 }}>
        <Text>Backend Message:</Text>
        <Text>{backendMessage}</Text>
      </View>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Add a new task..."
          value={input}
          onChangeText={setInput}
          onSubmitEditing={addTask}
          returnKeyType="done"
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={tasks}
        renderItem={renderTask}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />

      <View style={styles.doneRow}>
        <Text style={styles.doneLabel}>Number of tasks done:</Text>
        <Text style={styles.doneValue}>{doneCount}</Text>
      </View>

      <TouchableOpacity style={styles.nextButton} onPress={goToNextPage}>
        <Text style={styles.nextButtonText}>Next Page</Text>
      </TouchableOpacity>
    </View>
  );
}
