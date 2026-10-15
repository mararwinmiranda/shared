import { FlatList, Text, View } from "react-native";
import { Screen } from "../../src/components/UI";
import { useApp } from "../../src/context/AppContext";
import { styles } from "../../src/styles";

export default function NotificationsScreen() {
  const { user, notifications } = useApp();
  if (!user) return null;
  const items = notifications.filter((n) => n.userId === user.id);
  return (
    <Screen>
      <Text style={styles.eyebrow}>UPDATES</Text>
      <Text style={styles.pageTitle}>Notifications</Text>
      <Text style={styles.muted}>
        Demo in-app alerts for request updates. SMS and email are not actually
        sent.
      </Text>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.notificationCard}>
            <View style={styles.notificationIcon}>
              <Text>🔔</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.bodyText}>{item.message}</Text>
              <Text style={styles.tinyNote}>
                {item.createdAt} · {item.channel}
              </Text>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No notifications yet.</Text>
        }
      />
      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>Future integration</Text>
        <Text style={styles.infoText}>
          A production system could connect an email provider and SMS gateway
          after a request changes status.
        </Text>
      </View>
    </Screen>
  );
}
