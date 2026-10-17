import styles from "@/assets/css/styles";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, TextInput, TouchableOpacity } from "react-native";
export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleRegisterNavigation = () => {
    router.push("/pages/register");
  };

  // Login handler
  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }
    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        // Store userId in AsyncStorage for profile page
        if (data.user && data.user.id) {
          await AsyncStorage.setItem("userId", String(data.user.id));
        }
        alert("Login successful!");
        router.push("/pages/todoPage");
      } else {
        alert(data.message || "Login failed.");
      }
    } catch (err) {
      alert("Network error.");
    }
  };

  return (
    <ScrollView style={styles.loginContainer}>
      <ThemedView style={styles.loginContent}>
        {/* Logo Section */}
        <ThemedView style={styles.logoContainer}>
          <ThemedText type="title" style={styles.appName}>
            To Do App
          </ThemedText>
          <ThemedText style={styles.tagline}>
            Welcome back! Please sign in to your account
          </ThemedText>
        </ThemedView>
        {/* Login Form */}
        <ThemedView style={styles.formContainer}>
          {/* Email Input */}
          <ThemedView style={styles.inputContainer}>
            <ThemedText style={styles.label}>Email Address</ThemedText>
            <ThemedView style={styles.inputWrapper}>
              <Ionicons
                name="mail-outline"
                size={20}
                color="#007AFF"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.textInput}
                placeholder="Enter your email"
                placeholderTextColor="#8E8E93"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </ThemedView>
          </ThemedView>
          {/* Password Input */}
          <ThemedView style={styles.inputContainer}>
            <ThemedText style={styles.label}>Password</ThemedText>
            <ThemedView style={styles.inputWrapper}>
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color="#007AFF"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.textInput}
                placeholder="Enter your password"
                placeholderTextColor="#8E8E93"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCorrect={false}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color="#007AFF"
                />
              </TouchableOpacity>
            </ThemedView>
          </ThemedView>
          {/* Forgot Password */}
          <TouchableOpacity style={styles.forgotPasswordContainer}>
            <ThemedText type="link" style={styles.forgotPasswordText}>
              Forgot Password?
            </ThemedText>
          </TouchableOpacity>
          {/* Login Button */}
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <ThemedText style={styles.loginButtonText}>Log In</ThemedText>
          </TouchableOpacity>
          {/* Divider */}
          <ThemedView style={styles.dividerContainer}>
            <ThemedView style={styles.divider} />
            <ThemedText style={styles.dividerText}>or</ThemedText>
            <ThemedView style={styles.divider} />
          </ThemedView>
          {/* Sign Up Link */}
          <ThemedView style={styles.signUpContainer}>
            <ThemedText style={styles.signUpText}>
              Don't have an account?{" "}
            </ThemedText>
            <TouchableOpacity onPress={handleRegisterNavigation}>
              <ThemedText type="link" style={styles.signUpLink}>
                Register
              </ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
}
