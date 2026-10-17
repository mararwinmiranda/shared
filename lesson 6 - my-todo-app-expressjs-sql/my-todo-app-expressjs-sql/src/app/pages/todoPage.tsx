import styles from "@/assets/css/styles";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
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
    fetch("http://localhost:3000/api/message")
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
      await fetch("http://localhost:3000/api/done-count", {
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

  const goToProfilePage = async () => {
    router.push("/pages/profile");
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
      <TouchableOpacity style={styles.nextButton} onPress={goToProfilePage}>
        <Text style={styles.nextButtonText}>Profile</Text>
      </TouchableOpacity>
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
