import { ScrollView, Text, View } from "react-native";
import { router } from "expo-router";
import { Button, RequestCard, Screen, SectionTitle, StatCard } from "../../src/components/UI";
import { useApp } from "../../src/context/AppContext";
import { styles } from "../../src/styles";

export default function HomeScreen() {
  const { user, requests, notifications } = useApp();
  if (!user) return null;
  const mine = requests.filter(r => user.role === "staff" || r.residentId === user.id);
  const pending = mine.filter(r => ["Submitted", "Under Review", "Needs Information"].includes(r.status)).length;
  const ready = mine.filter(r => r.status === "Ready for Pickup").length;

  return (
    <Screen scroll>
      <View style={styles.topLine}>
        <View>
          <Text style={styles.eyebrow}>BARANGAY POBLACION</Text>
          <Text style={styles.pageTitle}>Hello, {user.name.split(" ")[0]} 👋</Text>
        </View>
        <View style={styles.avatar}><Text style={styles.avatarText}>{user.name.slice(0,1).toUpperCase()}</Text></View>
      </View>
      <Text style={styles.muted}>{user.role === "staff" ? "Staff verification workspace" : "Your local services, made simpler."}</Text>

      {user.role === "resident" && !user.verified && (
        <View style={styles.warningBox}>
          <Text style={styles.warningTitle}>Verification required</Text>
          <Text style={styles.warningText}>Your profile is not verified yet. Staff must confirm a valid government-issued ID or Barangay ID before you can submit a request.</Text>
          <Button title="View profile" kind="secondary" onPress={() => router.push("/(tabs)/profile")} />
        </View>
      )}

      <View style={styles.statsGrid}>
        <StatCard label={user.role === "staff" ? "Open queue" : "Active requests"} value={String(pending)} icon="🗂️" />
        <StatCard label="Ready for pickup" value={String(ready)} icon="📄" />
        <StatCard label="Notifications" value={String(notifications.filter(n => n.userId === user.id).length)} icon="🔔" />
      </View>

      {user.role === "staff" ? (
        <>
          <SectionTitle title="Staff quick actions" subtitle="Review applications and maintain records." />
          <Button title="Open verification queue" onPress={() => router.push("/(tabs)/requests")} />
          <Button title="View reports" kind="secondary" onPress={() => router.push("/(tabs)/profile")} />
        </>
      ) : (
        <>
          <SectionTitle title="Quick actions" subtitle="Submit a new request or check progress." />
          <Button title="＋  Start a birth certificate request" onPress={() => router.push("/(tabs)/new-request")} />
          <Button title="Track my requests" kind="secondary" onPress={() => router.push("/(tabs)/requests")} />
        </>
      )}

      <SectionTitle title={user.role === "staff" ? "Latest applications" : "Recent requests"} subtitle="A quick view of the most recent activity." />
      {mine.slice(0, 3).map(item => <RequestCard key={item.id} request={item} onPress={() => router.push("/(tabs)/requests")} />)}
      {mine.length === 0 && <Text style={styles.emptyText}>No requests yet. Your applications will appear here.</Text>}
      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>Processing target</Text>
        <Text style={styles.infoText}>Barangay staff aim to review requests within 2–3 working days. This is a service target, not a guaranteed completion time.</Text>
      </View>
    </Screen>
  );
}
