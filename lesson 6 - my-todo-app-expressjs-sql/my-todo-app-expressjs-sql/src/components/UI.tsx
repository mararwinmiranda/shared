import React from "react";
import { KeyboardTypeOptions, Pressable, ScrollView, Text, TextInput, TextInputProps, View } from "react-native";
import { BirthRequest, RequestStatus } from "../data/mockData";
import { colors, styles } from "../styles";

export function Screen({ children, scroll = false }: { children: React.ReactNode; scroll?: boolean }) {
  if (scroll) return <ScrollView style={styles.screen} contentContainerStyle={styles.screenContent} keyboardShouldPersistTaps="handled">{children}</ScrollView>;
  return <View style={[styles.screen, styles.screenContent]}>{children}</View>;
}

export function Button({ title, onPress, kind = "primary", disabled = false }: { title: string; onPress: () => void; kind?: "primary" | "secondary" | "ghost" | "danger"; disabled?: boolean }) {
  return (
    <Pressable onPress={onPress} disabled={disabled} style={({ pressed }) => [
      styles.button, kind === "primary" && styles.buttonPrimary, kind === "secondary" && styles.buttonSecondary,
      kind === "ghost" && styles.buttonGhost, kind === "danger" && styles.buttonDanger,
      disabled && styles.buttonDisabled, pressed && !disabled && { opacity: 0.82 }
    ]}>
      <Text style={[styles.buttonText, kind === "secondary" && styles.buttonSecondaryText, kind === "ghost" && styles.buttonGhostText]}>{title}</Text>
    </Pressable>
  );
}

type FieldProps = {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
  autoCapitalize?: TextInputProps["autoCapitalize"];
};
export function Field({ label, value, onChangeText, placeholder, keyboardType = "default", secureTextEntry, autoCapitalize }: FieldProps) {
  return (
    <View style={styles.fieldWrap}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput value={value} onChangeText={onChangeText} placeholder={placeholder} placeholderTextColor={colors.muted} keyboardType={keyboardType} secureTextEntry={secureTextEntry} autoCapitalize={autoCapitalize} style={styles.input} />
    </View>
  );
}

export function StatusBadge({ status }: { status: RequestStatus }) {
  const palette: Record<RequestStatus, { bg: string; fg: string }> = {
    "Submitted": { bg: "#E8F1FF", fg: "#2459A9" },
    "Under Review": { bg: "#FFF2D9", fg: "#8A5A00" },
    "Needs Information": { bg: "#FCE7F3", fg: "#9D174D" },
    "Ready for Pickup": { bg: "#DCFCE7", fg: "#166534" },
    "Rejected": { bg: "#FEE2E2", fg: "#991B1B" },
    "Collected": { bg: "#E5E7EB", fg: "#374151" },
    "Cancelled": { bg: "#F3E8FF", fg: "#6B21A8" }
  };
  return <View style={[styles.statusBadge, { backgroundColor: palette[status].bg }]}><Text style={{ color: palette[status].fg, fontSize: 11, fontWeight: "700" }}>{status}</Text></View>;
}

export function RequestCard({ request, onPress }: { request: BirthRequest; onPress?: () => void }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.requestCard, pressed && onPress ? { opacity: 0.85 } : null]}>
      <View style={styles.requestHeader}>
        <Text style={styles.requestId}>{request.id}</Text>
        <StatusBadge status={request.status} />
      </View>
      <Text style={styles.cardTitle}>{request.subjectName}</Text>
      <Text style={styles.bodyText}>Purpose: {request.purpose}</Text>
      <Text style={styles.tinyNote}>Submitted {request.createdAt} · Updated {request.updatedAt}</Text>
      {request.status === "Ready for Pickup" && <Text style={styles.successText}>Ready for collection · Bring valid ID</Text>}
      {request.status === "Needs Information" && <Text style={styles.warningText}>Additional information is required. Contact the barangay hall.</Text>}
    </Pressable>
  );
}

export function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return <View style={styles.sectionHeading}><Text style={styles.sectionTitle}>{title}</Text>{subtitle ? <Text style={styles.muted}>{subtitle}</Text> : null}</View>;
}

export function StatCard({ label, value, icon }: { label: string; value: string; icon: string }) {
  return <View style={styles.statCard}><Text style={styles.statIcon}>{icon}</Text><Text style={styles.statValue}>{value}</Text><Text style={styles.statLabel}>{label}</Text></View>;
}
