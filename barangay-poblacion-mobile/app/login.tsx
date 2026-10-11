import { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, Text, View } from "react-native";
import { Link, router } from "expo-router";
import { Button, Field, Screen } from "../src/components/UI";
import { useApp } from "../src/context/AppContext";
import { styles } from "../src/styles";

export default function LoginScreen() {
  const { signIn } = useApp();
  const [email, setEmail] = useState("resident@poblacion.test");
  const [password, setPassword] = useState("resident123");

  const submit = () => {
    const result = signIn(email.trim().toLowerCase(), password);
    if (!result.ok) {
      Alert.alert("Sign in failed", result.message);
      return;
    }
    router.replace("/(tabs)/home");
  };

  return (
    <Screen>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={styles.loginWrap}>
        <View style={styles.brandMark}><Text style={styles.brandEmoji}>🏛️</Text></View>
        <Text style={styles.eyebrow}>BARANGAY POBLACION</Text>
        <Text style={styles.heroTitle}>Birth Certificate{"\n"}Request Portal</Text>
        <Text style={styles.muted}>Sign in to request, review, and track applications.</Text>
        <View style={styles.card}>
          <Field label="Email address" value={email} onChangeText={setEmail} placeholder="you@example.com" keyboardType="email-address" autoCapitalize="none" />
          <Field label="Password" value={password} onChangeText={setPassword} placeholder="Enter password" secureTextEntry />
          <Button title="Sign in" onPress={submit} />
          <Text style={styles.centerMuted}>Demo access</Text>
          <View style={styles.buttonRow}>
            <Button title="Resident demo" kind="secondary" onPress={() => { setEmail("resident@poblacion.test"); setPassword("resident123"); }} />
            <Button title="Staff demo" kind="secondary" onPress={() => { setEmail("staff@poblacion.test"); setPassword("staff123"); }} />
          </View>
          <Text style={styles.centerMuted}>New resident? <Link href="/register" style={styles.link}>Create an account</Link></Text>
        </View>
        <Text style={styles.tinyNote}>Educational demo only · Do not enter real personal information</Text>
      </KeyboardAvoidingView>
    </Screen>
  );
}
