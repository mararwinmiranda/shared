import { useState } from "react";
import { Alert, Text } from "react-native";
import { router } from "expo-router";
import { Button, Field, Screen } from "../src/components/UI";
import { useApp } from "../src/context/AppContext";
import { styles } from "../src/styles";

export default function RegisterScreen() {
  const { register } = useApp();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");

  const submit = () => {
    const result = register({ name: name.trim(), email: email.trim().toLowerCase(), password, address: address.trim() });
    if (!result.ok) return Alert.alert("Please check your details", result.message);
    Alert.alert("Account created", "Your demo resident account is created but is not verified yet.");
    router.replace("/(tabs)/home");
  };

  return (
    <Screen>
      <Text style={styles.eyebrow}>RESIDENT REGISTRATION</Text>
      <Text style={styles.pageTitle}>Create your account</Text>
      <Text style={styles.muted}>New accounts must be verified by barangay staff before submitting requests.</Text>
      <Field label="Full name" value={name} onChangeText={setName} placeholder="Juan Dela Cruz" />
      <Field label="Email address" value={email} onChangeText={setEmail} placeholder="you@example.com" keyboardType="email-address" autoCapitalize="none" />
      <Field label="Password (at least 6 characters)" value={password} onChangeText={setPassword} placeholder="Create password" secureTextEntry />
      <Field label="Residential address" value={address} onChangeText={setAddress} placeholder="Street, Barangay Poblacion" />
      <Button title="Create account" onPress={submit} />
      <Button title="Back to sign in" kind="ghost" onPress={() => router.replace("/login")} />
    </Screen>
  );
}
