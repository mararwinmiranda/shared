import { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

type Task = { id: number; title: string; done: boolean };

const initialTasks: Task[] = [
  { id: 1, title: "Prepare a valid government ID", done: false },
  { id: 2, title: "Check the request status", done: true },
  { id: 3, title: "Bring the claim stub when collecting", done: false }
];

export default function DashboardScreen() {
  const [name, setName] = useState("Juan Dela Cruz");
  const [role, setRole] = useState<"Resident" | "Barangay Staff">("Resident");
  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState("");
  const [notice, setNotice] = useState("Welcome! This is a demo notification.");

  const completedTasks = tasks.filter((task) => task.done).length;

  function addTask() {
    if (!newTask.trim()) {
      Alert.alert("Task required", "Please type a task first.");
      return;
    }
    setTasks((currentTasks) => [
      ...currentTasks,
      { id: Date.now(), title: newTask.trim(), done: false }
    ]);
    setNewTask("");
  }

  function toggleTask(id: number) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  }

  function deleteTask(id: number) {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id));
  }

  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>BARANGAY POBLACION</Text>
        <Text style={styles.title}>Birth Certificate Portal</Text>
        <Text style={styles.heroText}>A simpler way to request, track, and claim your document.</Text>
      </View>

      <View style={styles.row}>
        <View style={[styles.statCard, { marginRight: 8 }]}>
          <Text style={styles.statNumber}>2–3</Text>
          <Text style={styles.statLabel}>Working days target</Text>
        </View>
        <View style={[styles.statCard, { marginLeft: 8 }]}>
          <Text style={styles.statNumber}>{completedTasks}/{tasks.length}</Text>
          <Text style={styles.statLabel}>Checklist completed</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Demo session</Text>
        <Text style={styles.muted}>Name shown in the prototype</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Enter your name" />
        <Text style={styles.muted}>Choose a demo role</Text>
        <View style={styles.row}>
          <TouchableOpacity style={[styles.choice, role === "Resident" && styles.choiceActive]} onPress={() => setRole("Resident")}>
            <Text style={[styles.choiceText, role === "Resident" && styles.choiceTextActive]}>Resident</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.choice, role === "Barangay Staff" && styles.choiceActive]} onPress={() => setRole("Barangay Staff")}>
            <Text style={[styles.choiceText, role === "Barangay Staff" && styles.choiceTextActive]}>Staff</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.notice}>Signed in as {name.trim() || "Resident"} · {role}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Latest notification</Text>
        <Text style={styles.body}>{notice}</Text>
        <TouchableOpacity style={styles.secondaryButton} onPress={() => setNotice("Reminder: staff review usually takes 2–3 working days. This is a simulated in-app notification.")}>
          <Text style={styles.secondaryButtonText}>Show reminder</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>My preparation checklist</Text>
        <Text style={styles.muted}>Add, complete, or remove tasks to practice React state and events.</Text>
        <View style={styles.row}>
          <TextInput style={[styles.input, styles.taskInput]} value={newTask} onChangeText={setNewTask} placeholder="Add a task..." onSubmitEditing={addTask} />
          <TouchableOpacity style={styles.addButton} onPress={addTask}><Text style={styles.addButtonText}>Add</Text></TouchableOpacity>
        </View>
        {tasks.length === 0 ? (
          <Text style={styles.muted}>No tasks yet. Add one above.</Text>
        ) : (
          tasks.map((task) => (
            <View style={styles.taskRow} key={task.id}>
              <TouchableOpacity style={styles.taskMain} onPress={() => toggleTask(task.id)}>
                <Text style={styles.check}>{task.done ? "☑" : "□"}</Text>
                <Text style={[styles.taskText, task.done && styles.taskDone]}>{task.title}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteTask(task.id)} accessibilityLabel={`Delete ${task.title}`}>
                <Text style={styles.deleteText}>Delete</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </View>

      <View style={styles.ruleBox}>
        <Text style={styles.sectionTitle}>Basic business rules</Text>
        <Text style={styles.rule}>• Resident must be verified and provide a valid government or Barangay ID.</Text>
        <Text style={styles.rule}>• Target processing time: 2–3 working days.</Text>
        <Text style={styles.rule}>• Maximum of 3 pending requests per resident.</Text>
        <Text style={styles.rule}>• Unclaimed processed documents may be archived after 30 days.</Text>
      </View>
      <Text style={styles.footer}>Classroom demo only · No real records are submitted.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: "#f3f6f8" },
  content: { padding: 16, paddingBottom: 32 },
  hero: { backgroundColor: "#16324f", borderRadius: 18, padding: 22, marginBottom: 16 },
  eyebrow: { color: "#a9ded2", fontSize: 12, fontWeight: "800", letterSpacing: 1.2 },
  title: { color: "#fff", fontSize: 26, fontWeight: "800", marginTop: 8 },
  heroText: { color: "#e2eaf1", fontSize: 14, lineHeight: 21, marginTop: 8 },
  row: { flexDirection: "row", alignItems: "center" },
  statCard: { flex: 1, backgroundColor: "#fff", borderRadius: 14, padding: 16, marginBottom: 16 },
  statNumber: { color: "#176b5b", fontSize: 24, fontWeight: "800" },
  statLabel: { color: "#65758b", fontSize: 12, marginTop: 5 },
  card: { backgroundColor: "#fff", borderRadius: 16, padding: 16, marginBottom: 14 },
  sectionTitle: { fontSize: 17, fontWeight: "800", color: "#16324f", marginBottom: 10 },
  muted: { color: "#718096", fontSize: 13, marginBottom: 8 },
  input: { backgroundColor: "#f7f9fb", borderColor: "#d9e2ea", borderWidth: 1, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 11, fontSize: 15, marginBottom: 12, color: "#243b53" },
  choice: { flex: 1, borderWidth: 1, borderColor: "#d9e2ea", borderRadius: 10, padding: 11, alignItems: "center", marginRight: 6 },
  choiceActive: { backgroundColor: "#176b5b", borderColor: "#176b5b" },
  choiceText: { color: "#526579", fontWeight: "700" },
  choiceTextActive: { color: "#fff" },
  notice: { color: "#176b5b", fontSize: 13, fontWeight: "700", marginTop: 10 },
  body: { color: "#526579", fontSize: 14, lineHeight: 21 },
  secondaryButton: { alignSelf: "flex-start", marginTop: 12, borderRadius: 9, backgroundColor: "#e7f4f0", paddingHorizontal: 14, paddingVertical: 10 },
  secondaryButtonText: { color: "#176b5b", fontWeight: "800" },
  taskInput: { flex: 1, marginBottom: 0, marginRight: 8 },
  addButton: { backgroundColor: "#176b5b", paddingHorizontal: 16, paddingVertical: 13, borderRadius: 10 },
  addButtonText: { color: "#fff", fontWeight: "800" },
  taskRow: { flexDirection: "row", alignItems: "center", borderBottomColor: "#edf1f5", borderBottomWidth: 1, paddingVertical: 12 },
  taskMain: { flex: 1, flexDirection: "row", alignItems: "center", paddingRight: 8 },
  check: { color: "#176b5b", fontSize: 20, marginRight: 10 },
  taskText: { flex: 1, color: "#34495e", fontSize: 14 },
  taskDone: { textDecorationLine: "line-through", color: "#93a1b0" },
  deleteText: { color: "#b42318", fontSize: 12, fontWeight: "700" },
  ruleBox: { backgroundColor: "#e8eef4", borderRadius: 14, padding: 16 },
  rule: { color: "#40566c", fontSize: 13, lineHeight: 20, marginBottom: 5 },
  footer: { color: "#718096", fontSize: 11, textAlign: "center", marginTop: 18 }
});