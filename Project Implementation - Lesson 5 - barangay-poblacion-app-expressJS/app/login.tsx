import { useState, useEffect } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Text,
  View,
} from "react-native";
import { useApp } from "../src/context/AppContext";
import { Link, router } from "expo-router";
import { Button, Field, Screen } from "../src/components/UI";
import { styles } from "../src/styles";
import { getMessage, login } from "../src/api";

export default function LoginScreen() {
  const { signIn } = useApp();
  const [email, setEmail] = useState("resident@poblacion.test");
  const [password, setPassword] = useState("resident123");
  const [backendMessage, setBackendMessage] = useState("");
  useEffect(() => {
    // Replace 192.168.5.31 with your computer's IP if running on a

    getMessage()
      .then((data) => setBackendMessage(data.message))
      .catch(() => setBackendMessage("Could not connect to backend."));
  }, []);

  const submit = async () => {
    const data = await signIn(email.trim().toLowerCase(), password);
    if (!data.ok) {
      if (Platform.OS === "web") {
        window.alert(`Sign in failed: ${data.message}`);
      } else {
        Alert.alert("Sign in failed", data.message);
      }
      return;
    }
    router.replace("/(tabs)/home");
  };

  return (
    <Screen>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.loginWrap}
      >
        <View style={styles.brandMark}>
          <Text style={styles.brandEmoji}>🏛️</Text>
        </View>
        <Text style={styles.eyebrow}>BARANGAY POBLACION</Text>
        <Text style={styles.heroTitle}>
          Birth Certificate{"\n"}Request Portal
        </Text>
        <View style={{ marginBottom: 16 }}>
          <Text>Backend Message:</Text>
          <Text>{backendMessage}</Text>
        </View>
        <Text style={styles.muted}>
          Sign in to request, review, and track applications.
        </Text>
        <View style={styles.card}>
          <Field
            label="Email address"
            value={email}
            onChangeText={setEmail}
            placeholder="you@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Field
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="Enter password"
            secureTextEntry
          />
          <Button title="Sign in" onPress={submit} />
          <Text style={styles.centerMuted}>Demo access</Text>
          <View style={styles.buttonRow}>
            <Button
              title="Resident demo"
              kind="secondary"
              onPress={() => {
                setEmail("resident@poblacion.test");
                setPassword("resident123");
              }}
            />
            <Button
              title="Staff demo"
              kind="secondary"
              onPress={() => {
                setEmail("staff@poblacion.test");
                setPassword("staff123");
              }}
            />
          </View>
          <Text style={styles.centerMuted}>
            New resident?{" "}
            <Link href="/register" style={styles.link}>
              Create an account
            </Link>
          </Text>
        </View>
        <Text style={styles.tinyNote}>
          Educational demo only · Do not enter real personal information
        </Text>
      </KeyboardAvoidingView>
    </Screen>
  );
}
