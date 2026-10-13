import { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

type RequestStatus = "For Review" | "Approved" | "Rejected" | "Ready for Pickup";
type BirthRequest = { id: string; applicant: string; purpose: string; documentName: string; status: RequestStatus; date: string };

const starterRequests: BirthRequest[] = [
  { id: "BCR-1001", applicant: "Juan Dela Cruz", purpose: "School enrollment", documentName: "barangay-id.jpg", status: "For Review", date: "Oct 12, 2026" },
  { id: "BCR-1002", applicant: "Maria Santos", purpose: "Passport application", documentName: "valid-id.png", status: "Ready for Pickup", date: "Oct 10, 2026" }
];

export default function RequestsScreen() {
  const [requests, setRequests] = useState(starterRequests);
  const [applicant, setApplicant] = useState("Juan Dela Cruz");
  const [purpose, setPurpose] = useState("");
  const [documentName, setDocumentName] = useState("");
  const [isStaff, setIsStaff] = useState(false);
  const pendingCount = requests.filter((request) => request.status === "For Review").length;

  function submitRequest() {
    if (!applicant.trim() || !purpose.trim() || !documentName.trim()) {
      Alert.alert("Missing information", "Enter the applicant name, purpose, and a document filename.");
      return;
    }
    const residentPending = requests.filter((request) => request.applicant.toLowerCase() === applicant.trim().toLowerCase() && ["For Review", "Approved"].includes(request.status)).length;
    if (residentPending >= 3) {
      Alert.alert("Pending request limit", "A resident can have a maximum of 3 pending requests.");
      return;
    }
    const newRequest: BirthRequest = {
      id: `BCR-${1000 + Math.floor(Math.random() * 9000)}`,
      applicant: applicant.trim(),
      purpose: purpose.trim(),
      documentName: documentName.trim(),
      status: "For Review",
      date: new Date().toLocaleDateString()
    };
    setRequests((current) => [newRequest, ...current]);
    setPurpose("");
    setDocumentName("");
    Alert.alert("Request created", `${newRequest.id} was added to the demo tracker. No real submission was sent.`);
  }

  function updateStatus(id: string, status: RequestStatus) {
    setRequests((current) => current.map((request) => request.id === id ? { ...request, status } : request));
  }

  const statusColor = (status: RequestStatus) => {
    if (status === "Ready for Pickup") return "#176b5b";
    if (status === "Rejected") return "#b42318";
    if (status === "Approved") return "#2459a9";
    return "#946200";
  };

  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.content}>
      <Text style={styles.heading}>Birth certificate requests</Text>
      <Text style={styles.subtitle}>Create a demo request and track its status. Staff controls are simulated.</Text>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>New request form</Text>
        <Text style={styles.label}>Resident full name</Text>
        <TextInput style={styles.input} value={applicant} onChangeText={setApplicant} placeholder="Full name" />
        <Text style={styles.label}>Purpose of request</Text>
        <TextInput style={styles.input} value={purpose} onChangeText={setPurpose} placeholder="e.g. School enrollment" />
        <Text style={styles.label}>Supporting document filename</Text>
        <TextInput style={styles.input} value={documentName} onChangeText={setDocumentName} placeholder="e.g. barangay-id.jpg" />
        <Text style={styles.helper}>Demo only: type a filename. This does not select or upload a real file.</Text>
        <TouchableOpacity style={styles.primaryButton} onPress={submitRequest}>
          <Text style={styles.primaryButtonText}>Submit demo request</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.staffToggle}>
        <View style={{ flex: 1 }}>
          <Text style={styles.sectionTitle}>Staff review mode</Text>
          <Text style={styles.helper}>{pendingCount} request(s) currently for review</Text>
        </View>
        <TouchableOpacity style={[styles.toggle, isStaff && styles.toggleOn]} onPress={() => setIsStaff((value) => !value)}>
          <Text style={styles.toggleText}>{isStaff ? "ON" : "OFF"}</Text>
        </TouchableOpacity>
      </View>

      {requests.length === 0 ? (
        <View style={styles.card}><Text style={styles.helper}>No requests yet. Submit a request above to see it here.</Text></View>
      ) : requests.map((request) => (
        <View style={styles.requestCard} key={request.id}>
          <View style={styles.requestTop}>
            <Text style={styles.requestId}>{request.id}</Text>
            <Text style={[styles.status, { color: statusColor(request.status), backgroundColor: `${statusColor(request.status)}15` }]}>{request.status}</Text>
          </View>
          <Text style={styles.applicant}>{request.applicant}</Text>
          <Text style={styles.detail}>Purpose: {request.purpose}</Text>
          <Text style={styles.detail}>Requirement: {request.documentName}</Text>
          <Text style={styles.detail}>Submitted: {request.date}</Text>
          {isStaff && (
            <View style={styles.actions}>
              <TouchableOpacity style={styles.smallButton} onPress={() => updateStatus(request.id, "Approved")}><Text style={styles.smallButtonText}>Approve</Text></TouchableOpacity>
              <TouchableOpacity style={[styles.smallButton, styles.rejectButton]} onPress={() => updateStatus(request.id, "Rejected")}><Text style={styles.rejectText}>Reject</Text></TouchableOpacity>
              <TouchableOpacity style={[styles.smallButton, styles.readyButton]} onPress={() => updateStatus(request.id, "Ready for Pickup")}><Text style={styles.readyText}>Ready</Text></TouchableOpacity>
            </View>
          )}
        </View>
      ))}
      <View style={styles.note}>
        <Text style={styles.noteTitle}>Workflow reminder</Text>
        <Text style={styles.detail}>Staff should review requests within 2–3 working days. A real application must verify resident identity and enforce the three-pending-request rule on the server.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: "#f3f6f8" },
  content: { padding: 16, paddingBottom: 32 },
  heading: { fontSize: 24, fontWeight: "800", color: "#16324f" },
  subtitle: { color: "#718096", fontSize: 13, lineHeight: 19, marginTop: 6, marginBottom: 16 },
  card: { backgroundColor: "#fff", borderRadius: 16, padding: 16, marginBottom: 14 },
  sectionTitle: { fontSize: 16, color: "#16324f", fontWeight: "800" },
  label: { color: "#40566c", fontSize: 13, fontWeight: "700", marginBottom: 6, marginTop: 10 },
  input: { backgroundColor: "#f7f9fb", borderColor: "#d9e2ea", borderWidth: 1, borderRadius: 10, padding: 12, color: "#243b53" },
  helper: { color: "#718096", fontSize: 12, lineHeight: 18, marginTop: 5 },
  primaryButton: { backgroundColor: "#176b5b", borderRadius: 10, alignItems: "center", padding: 13, marginTop: 14 },
  primaryButtonText: { color: "#fff", fontWeight: "800" },
  staffToggle: { flexDirection: "row", alignItems: "center", backgroundColor: "#e8eef4", padding: 14, borderRadius: 14, marginBottom: 14 },
  toggle: { borderRadius: 9, paddingHorizontal: 16, paddingVertical: 10, backgroundColor: "#718096" },
  toggleOn: { backgroundColor: "#176b5b" },
  toggleText: { color: "#fff", fontWeight: "800" },
  requestCard: { backgroundColor: "#fff", borderRadius: 14, padding: 15, marginBottom: 12 },
  requestTop: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", marginBottom: 8 },
  requestId: { color: "#718096", fontSize: 12, fontWeight: "800" },
  status: { fontSize: 11, fontWeight: "800", paddingHorizontal: 9, paddingVertical: 5, borderRadius: 8, overflow: "hidden" },
  applicant: { color: "#16324f", fontSize: 17, fontWeight: "800", marginBottom: 5 },
  detail: { color: "#526579", fontSize: 13, lineHeight: 20 },
  actions: { flexDirection: "row", flexWrap: "wrap", marginTop: 12 },
  smallButton: { backgroundColor: "#e7f4f0", paddingHorizontal: 10, paddingVertical: 8, borderRadius: 8, marginRight: 7, marginBottom: 4 },
  smallButtonText: { color: "#176b5b", fontWeight: "800", fontSize: 12 },
  rejectButton: { backgroundColor: "#fff0ef" },
  rejectText: { color: "#b42318", fontWeight: "800", fontSize: 12 },
  readyButton: { backgroundColor: "#eaf0fb" },
  readyText: { color: "#2459a9", fontWeight: "800", fontSize: 12 },
  note: { backgroundColor: "#fff7e6", padding: 14, borderRadius: 12, marginTop: 2 },
  noteTitle: { color: "#805b00", fontWeight: "800", marginBottom: 5 }
});