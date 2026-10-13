import { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function ProfileScreen() {
  const [fullName, setFullName] = useState("Juan Dela Cruz");
  const [address, setAddress] = useState("Barangay Poblacion");
  const [email, setEmail] = useState("juan@example.com");
  const [phone, setPhone] = useState("09XX XXX XXXX");
  const [verified, setVerified] = useState(false);

  function saveProfile() {
    Alert.alert("Demo profile saved", "Your changes are only held in this screen's local state. No information was sent to a server.");
  }

  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.content}>
      <View style={styles.profileHero}>
        <View style={styles.avatar}><Text style={styles.avatarText}>{fullName.trim().charAt(0).toUpperCase() || "R"}</Text></View>
        <Text style={styles.name}>{fullName || "Resident name"}</Text>
        <Text style={styles.address}>{address}</Text>
        <View style={[styles.verification, verified && styles.verified]}>
          <Text style={styles.verificationText}>{verified ? "Demo status: ID reviewed" : "Verification required"}</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Resident profile</Text>
        <Text style={styles.helper}>Edit your sample contact details below.</Text>
        <Text style={styles.label}>Full name</Text>
        <TextInput style={styles.input} value={fullName} onChangeText={setFullName} placeholder="Full name" />
        <Text style={styles.label}>Barangay address</Text>
        <TextInput style={styles.input} value={address} onChangeText={setAddress} placeholder="Address" />
        <Text style={styles.label}>Email address</Text>
        <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Email" keyboardType="email-address" autoCapitalize="none" />
        <Text style={styles.label}>Mobile number</Text>
        <TextInput style={styles.input} value={phone} onChangeText={setPhone} placeholder="Mobile number" keyboardType="phone-pad" />
        <TouchableOpacity style={styles.primaryButton} onPress={saveProfile}><Text style={styles.primaryButtonText}>Save profile</Text></TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton} onPress={() => setVerified((value) => !value)}>
          <Text style={styles.secondaryText}>{verified ? "Mark as unverified (demo)" : "Simulate staff ID verification"}</Text>
        </TouchableOpacity>
        <Text style={styles.helper}>The verification button is for demonstration only. A real system must never let a resident verify their own identity.</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Privacy and security</Text>
        <Text style={styles.body}>Birth certificate requests contain personal information. A production system needs secure authentication, server-side role checks, encrypted transport, restricted document access, retention rules, and a clear privacy notice.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: "#f3f6f8" },
  content: { padding: 16, paddingBottom: 32 },
  profileHero: { backgroundColor: "#16324f", borderRadius: 18, padding: 22, alignItems: "center", marginBottom: 15 },
  avatar: { width: 68, height: 68, borderRadius: 34, backgroundColor: "#a9ded2", alignItems: "center", justifyContent: "center", marginBottom: 12 },
  avatarText: { fontSize: 30, color: "#16324f", fontWeight: "800" },
  name: { fontSize: 21, color: "#fff", fontWeight: "800" },
  address: { color: "#dce7ef", marginTop: 4 },
  verification: { backgroundColor: "#fff0cf", borderRadius: 10, paddingHorizontal: 12, paddingVertical: 7, marginTop: 12 },
  verified: { backgroundColor: "#d9f3e8" },
  verificationText: { color: "#40566c", fontSize: 12, fontWeight: "800" },
  card: { backgroundColor: "#fff", borderRadius: 16, padding: 16, marginBottom: 14 },
  title: { fontSize: 17, color: "#16324f", fontWeight: "800" },
  helper: { color: "#718096", fontSize: 12, lineHeight: 18, marginTop: 6, marginBottom: 8 },
  label: { color: "#40566c", fontSize: 13, fontWeight: "700", marginBottom: 6, marginTop: 10 },
  input: { backgroundColor: "#f7f9fb", borderColor: "#d9e2ea", borderWidth: 1, borderRadius: 10, padding: 12, color: "#243b53" },
  primaryButton: { backgroundColor: "#176b5b", borderRadius: 10, alignItems: "center", padding: 13, marginTop: 16 },
  primaryButtonText: { color: "#fff", fontWeight: "800" },
  secondaryButton: { backgroundColor: "#e7f4f0", borderRadius: 10, alignItems: "center", padding: 12, marginTop: 9 },
  secondaryText: { color: "#176b5b", fontWeight: "800", textAlign: "center" },
  body: { color: "#526579", fontSize: 14, lineHeight: 21, marginTop: 8 }
});