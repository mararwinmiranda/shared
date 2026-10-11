import { useMemo, useState } from "react";
import { Alert, FlatList, Text, View } from "react-native";
import { Button, RequestCard, Screen, SectionTitle, StatusBadge } from "../../src/components/UI";
import { useApp } from "../../src/context/AppContext";
import { RequestStatus } from "../../src/data/mockData";
import { styles } from "../../src/styles";

export default function RequestsScreen() {
  const { user, requests, updateStatus, verifyResident, users } = useApp();
  const [filter, setFilter] = useState("All");
  if (!user) return null;
  const visible = useMemo(() => {
    const list = requests.filter(r => user.role === "staff" || r.residentId === user.id);
    return filter === "All" ? list : list.filter(r => r.status === filter);
  }, [requests, user, filter]);

  const staffActions = (id: string) => Alert.alert("Review request", "Choose a staff action", [
    { text: "Approve / Under Review", onPress: () => updateStatus(id, "Under Review") },
    { text: "Needs Information", onPress: () => updateStatus(id, "Needs Information") },
    { text: "Approve: Ready for Pickup", onPress: () => updateStatus(id, "Ready for Pickup") },
    { text: "Reject", style: "destructive", onPress: () => updateStatus(id, "Rejected") },
    { text: "Cancel", style: "cancel" }
  ]);

  return (
    <Screen>
      <Text style={styles.eyebrow}>{user.role === "staff" ? "STAFF WORKSPACE" : "APPLICATION TRACKER"}</Text>
      <Text style={styles.pageTitle}>{user.role === "staff" ? "Verification queue" : "My requests"}</Text>
      <Text style={styles.muted}>{user.role === "staff" ? "Select an application to review its status." : "Follow each application from submission to pickup."}</Text>
      <View style={styles.filterRow}>
        {["All", "Submitted", "Under Review", "Needs Information", "Ready for Pickup", "Rejected"].map(value => (
          <Text key={value} onPress={() => setFilter(value)} style={[styles.filterChip, filter === value && styles.filterChipActive]}>{value}</Text>
        ))}
      </View>
      {user.role === "staff" && users.filter(u => u.role === "resident" && !u.verified).map(u => (
        <View key={u.id} style={styles.warningBox}>
          <Text style={styles.warningTitle}>Unverified resident: {u.name}</Text>
          <Text style={styles.warningText}>Confirm the applicant's valid government-issued ID or Barangay ID offline before verifying.</Text>
          <Button title="Mark resident verified (demo)" kind="secondary" onPress={() => { verifyResident(u.id); Alert.alert("Updated", `${u.name} is now marked verified in this demo.`); }} />
        </View>
      ))}
      <SectionTitle title={`${visible.length} application${visible.length === 1 ? "" : "s"}`} />
      <FlatList
        data={visible}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <RequestCard request={item} />
            {user.role === "staff" && <Button title="Review / update status" onPress={() => staffActions(item.id)} />}
            {user.role === "resident" && <View style={styles.timelineBox}>
              <Text style={styles.timelineTitle}>Status tracker</Text>
              <View style={styles.timelineRow}><StatusBadge status="Submitted" /><Text style={styles.timelineText}>Request received</Text></View>
              <View style={styles.timelineRow}><StatusBadge status={item.status} /><Text style={styles.timelineText}>Current status · {item.updatedAt}</Text></View>
              {item.status === "Ready for Pickup" && <Text style={styles.successText}>Bring your claim stub and a valid ID to collect your document.</Text>}
            </View>}
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No requests match this filter.</Text>}
        contentContainerStyle={{ paddingBottom: 24 }}
      />
    </Screen>
  );
}
