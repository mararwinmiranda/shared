import { Alert, Text, View } from "react-native";
import { router } from "expo-router";
import { Button, Screen, SectionTitle, StatCard } from "../../src/components/UI";
import { useApp } from "../../src/context/AppContext";
import { styles } from "../../src/styles";

export default function ProfileScreen() {
  const { user, users, requests, signOut, switchDemoRole, archiveOldRequests } = useApp();
  if (!user) return null;
  const isStaff = user.role === "staff";
  const processed = requests.filter(r => ["Ready for Pickup", "Rejected", "Cancelled"].includes(r.status)).length;
  const unclaimed = requests.filter(r => r.status === "Ready for Pickup").length;

  return (
    <Screen scroll>
      <Text style={styles.eyebrow}>{isStaff ? "STAFF ACCOUNT" : "RESIDENT ACCOUNT"}</Text>
      <Text style={styles.pageTitle}>Profile</Text>
      <View style={styles.profileCard}>
        <View style={styles.profileAvatar}><Text style={styles.profileAvatarText}>{user.name.slice(0,1).toUpperCase()}</Text></View>
        <Text style={styles.profileName}>{user.name}</Text>
        <Text style={styles.muted}>{user.email}</Text>
        <Text style={styles.bodyText}>{user.address || "Address not provided"}</Text>
        <View style={styles.rolePill}><Text style={styles.rolePillText}>{isStaff ? "BARANGAY STAFF" : "RESIDENT"}</Text></View>
        {!isStaff && <Text style={user.verified ? styles.successText : styles.warningText}>{user.verified ? "✓ Profile verified" : "Verification pending"}</Text>}
      </View>

      {isStaff ? (
        <>
          <SectionTitle title="Processing report" subtitle="Calculated from current mock records." />
          <View style={styles.statsGrid}>
            <StatCard label="Total requests" value={String(requests.length)} icon="📋" />
            <StatCard label="Processed" value={String(processed)} icon="✅" />
            <StatCard label="Awaiting pickup" value={String(unclaimed)} icon="📦" />
          </View>
          <Button title="Run 30-day archive check (demo)" kind="secondary" onPress={() => { const count = archiveOldRequests(); Alert.alert("Archive check complete", `${count} request(s) were marked cancelled because they were ready for pickup for at least 30 days.`); }} />
          <Text style={styles.fieldHint}>The check runs only when you press this button; it is not a background scheduler.</Text>
          <SectionTitle title="Residents" subtitle="Demo verification controls." />
          {users.filter(u => u.role === "resident").map(u => (
            <View key={u.id} style={styles.residentRow}>
              <View style={{ flex: 1 }}><Text style={styles.cardTitle}>{u.name}</Text><Text style={styles.tinyNote}>{u.email}</Text></View>
              <Text style={u.verified ? styles.successText : styles.warningText}>{u.verified ? "Verified" : "Pending"}</Text>
            </View>
          ))}
        </>
      ) : (
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Verification and privacy</Text>
          <Text style={styles.infoText}>Bring a valid government-issued ID or Barangay ID to the barangay hall for verification. Use demo data only in this educational prototype.</Text>
        </View>
      )}
      <SectionTitle title="Demo controls" />
      <Button title="Switch demo role" kind="secondary" onPress={() => { switchDemoRole(); router.replace("/(tabs)/home"); }} />
      <Button title="Sign out" kind="danger" onPress={() => { signOut(); router.replace("/login"); }} />
    </Screen>
  );
}
