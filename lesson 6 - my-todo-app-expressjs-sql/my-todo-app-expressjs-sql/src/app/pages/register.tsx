import styles from "@/assets/css/styles";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, TextInput, TouchableOpacity, View } from "react-native";
export default function RegisterScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    birthday: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleGoToLogin = () => {
    router.push("/");
  };

  // Register handler
  const handleRegister = async () => {
    if (
      !formData.name ||
      !formData.birthday ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      alert("Please fill in all fields.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    try {
      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          birthday: formData.birthday,
          email: formData.email,
          password: formData.password,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Registration successful!");
        router.push("/pages/todoPage");
      } else {
        alert(data.message || "Registration failed.");
      }
    } catch (err) {
      alert("Network error.");
    }
  };
  return (
    <ScrollView style={styles.registerContainer}>
      <ThemedView style={styles.registerContent}>
        {/* Header Section */}
        <View style={styles.registerHeaderContainer}>
          <ThemedText type="title" style={styles.registerTitle}>
            Create Account
          </ThemedText>
          <ThemedText style={styles.registerSubtitle}>
            Join us and start your journey today
          </ThemedText>
        </View>
        {/* Registration Form */}
        <View style={styles.registerFormContainer}>
          {/* Full Name Input */}
          <View style={styles.registerInputContainer}>
            <ThemedText style={styles.registerLabel}>Full Name</ThemedText>
            <View style={styles.registerInputWrapper}>
              <Ionicons
                name="person-outline"
                size={20}
                color="#007AFF"
                style={styles.registerInputIcon}
              />
              <TextInput
                style={styles.registerTextInput}
                placeholder="Enter your full name"
                placeholderTextColor="#8E8E93"
                value={formData.name}
                onChangeText={(text) =>
                  setFormData((prev) => ({
                    ...prev,
                    name: text,
                  }))
                }
                autoCapitalize="words"
                autoCorrect={false}
              />
            </View>
          </View>
          {/* Birthday Input */}
          <View style={styles.registerInputContainer}>
            <ThemedText style={styles.registerLabel}>Birthday</ThemedText>
            <View style={styles.registerInputWrapper}>
              <Ionicons
                name="calendar-outline"
                size={20}
                color="#007AFF"
                style={styles.registerInputIcon}
              />
              <TextInput
                style={styles.registerTextInput}
                placeholder="MM/DD/YYYY"
                placeholderTextColor="#8E8E93"
                value={formData.birthday}
                onChangeText={(text) =>
                  setFormData((prev) => ({
                    ...prev,
                    birthday: text,
                  }))
                }
                keyboardType="numeric"
                maxLength={10}
              />
            </View>
          </View>
          {/* Email Input */}
          <View style={styles.registerInputContainer}>
            <ThemedText style={styles.registerLabel}>Email Address</ThemedText>
            <View style={styles.registerInputWrapper}>
              <Ionicons
                name="mail-outline"
                size={20}
                color="#007AFF"
                style={styles.registerInputIcon}
              />
              <TextInput
                style={styles.registerTextInput}
                placeholder="Enter your email"
                placeholderTextColor="#8E8E93"
                value={formData.email}
                onChangeText={(text) =>
                  setFormData((prev) => ({
                    ...prev,
                    email: text,
                  }))
                }
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
          </View>
          {/* Password Input */}
          <View style={styles.registerInputContainer}>
            <ThemedText style={styles.registerLabel}>Password</ThemedText>
            <View style={styles.registerInputWrapper}>
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color="#007AFF"
                style={styles.registerInputIcon}
              />
              <TextInput
                style={styles.registerTextInput}
                placeholder="Create a strong password"
                placeholderTextColor="#8E8E93"
                value={formData.password}
                onChangeText={(text) =>
                  setFormData((prev) => ({
                    ...prev,
                    password: text,
                  }))
                }
                secureTextEntry={!showPassword}
                autoCorrect={false}
              />
              <TouchableOpacity
                style={styles.registerEyeIcon}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color="#007AFF"
                />
              </TouchableOpacity>
            </View>
          </View>
          {/* Confirm Password Input */}
          <View style={styles.registerInputContainer}>
            <ThemedText style={styles.registerLabel}>
              Confirm Password
            </ThemedText>
            <View style={styles.registerInputWrapper}>
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color="#007AFF"
                style={styles.registerInputIcon}
              />
              <TextInput
                style={styles.registerTextInput}
                placeholder="Confirm your password"
                placeholderTextColor="#8E8E93"
                value={formData.confirmPassword}
                onChangeText={(text) =>
                  setFormData((prev) => ({
                    ...prev,
                    confirmPassword: text,
                  }))
                }
                secureTextEntry={!showConfirmPassword}
                autoCorrect={false}
              />
              <TouchableOpacity
                style={styles.registerEyeIcon}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <Ionicons
                  name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color="#007AFF"
                />
              </TouchableOpacity>
            </View>
          </View>
          {/* Register Button */}
          {/* Register Button */}
          <TouchableOpacity
            style={styles.registerButton}
            onPress={handleRegister}
          >
            <ThemedText style={styles.registerButtonText}>
              Create Account
            </ThemedText>
          </TouchableOpacity>
          {/* Divider */}
          <View style={styles.registerDividerContainer}>
            <View style={styles.registerDivider} />
            <ThemedText style={styles.registerDividerText}>or</ThemedText>
            <View style={styles.registerDivider} />
          </View>
          {/* Login Link */}
          <View style={styles.registerLoginLinkContainer}>
            <ThemedText style={styles.registerLoginText}>
              Already have an account?{" "}
            </ThemedText>
            <TouchableOpacity onPress={handleGoToLogin}>
              <ThemedText style={styles.registerLoginLink}>Sign In</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </ThemedView>
    </ScrollView>
  );
}
