import { useState } from "react";
import { Alert, Platform, Text, View } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { router } from "expo-router";
import { Button, Field, Screen } from "../../src/components/UI";
import { useApp } from "../../src/context/AppContext";
import { styles } from "../../src/styles";

export default function NewRequestScreen() {
  const { user, requests, submitRequest } = useApp();
  const [subjectName, setSubjectName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [placeOfBirth, setPlaceOfBirth] = useState("");
  const [purpose, setPurpose] = useState("Personal records");
  const [idDocument, setIdDocument] = useState("");
  const [supportingDocument, setSupportingDocument] = useState("");
  if (!user) return null;

  const pendingCount = requests.filter(
    (r) =>
      r.residentId === user.id &&
      ["Submitted", "Under Review", "Needs Information"].includes(r.status),
  ).length;
  const pick = async (kind: "id" | "support") => {
    const result = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: true,
      multiple: false,
      type: ["application/pdf", "image/*"],
    });
    if (!result.canceled && result.assets[0]) {
      const name = result.assets[0].name;
      kind === "id" ? setIdDocument(name) : setSupportingDocument(name);
    }
  };
  const submit = () => {
    const result = submitRequest({
      subjectName: subjectName.trim(),
      birthDate: birthDate.trim(),
      placeOfBirth: placeOfBirth.trim(),
      purpose,
      idDocument,
      supportingDocument,
    });

    setSubjectName("");
    setBirthDate("");
    setPlaceOfBirth("");
    setIdDocument("");
    setSupportingDocument("");
    router.push("/(tabs)/requests");
  };

  if (user.role !== "resident")
    return (
      <Screen>
        <Text style={styles.pageTitle}>Resident request form</Text>
        <Text style={styles.muted}>
          Staff accounts review applications. Switch to a resident demo account
          to submit a request.
        </Text>
      </Screen>
    );

  return (
    <Screen scroll>
      <Text style={styles.eyebrow}>ONLINE SERVICE</Text>
      <Text style={styles.pageTitle}>Birth certificate request</Text>
      <Text style={styles.muted}>
        Enter the details as they appear on the record. Fields marked required
        must be completed.
      </Text>

      {!user.verified && (
        <View style={styles.warningBox}>
          <Text style={styles.warningTitle}>
            Resident verification required
          </Text>
          <Text style={styles.warningText}>
            You cannot submit until staff verifies your profile and ID.
          </Text>
        </View>
      )}
      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>Pending request limit</Text>
        <Text style={styles.infoText}>
          {pendingCount} of 3 pending requests used. Requests with Submitted,
          Under Review, or Needs Information status count toward the limit.
        </Text>
      </View>

      <Field
        label="Name on birth record *"
        value={subjectName}
        onChangeText={setSubjectName}
        placeholder="Full name on birth certificate"
      />
      <Field
        label="Date of birth *"
        value={birthDate}
        onChangeText={setBirthDate}
        placeholder="YYYY-MM-DD"
      />
      <Field
        label="Place of birth *"
        value={placeOfBirth}
        onChangeText={setPlaceOfBirth}
        placeholder="Hospital / municipality / province"
      />
      <Field
        label="Purpose of request *"
        value={purpose}
        onChangeText={setPurpose}
        placeholder="e.g. School enrollment"
      />
      <Text style={styles.fieldLabel}>Required ID document *</Text>
      <Text style={styles.fieldHint}>
        Choose a valid government-issued ID or Barangay ID. This demo only
        records the selected file name.
      </Text>
      <Button
        title={idDocument ? `ID: ${idDocument}` : "Choose ID document"}
        kind="secondary"
        onPress={() => pick("id")}
      />
      <Text style={styles.fieldLabel}>Supporting document (optional)</Text>
      <Button
        title={
          supportingDocument
            ? `File: ${supportingDocument}`
            : "Choose supporting document"
        }
        kind="secondary"
        onPress={() => pick("support")}
      />
      <View style={styles.warningBox}>
        <Text style={styles.warningTitle}>Before you submit</Text>
        <Text style={styles.warningText}>
          Only submit accurate information. Processing target is 2–3 working
          days after review. This prototype does not upload files to a server.
        </Text>
      </View>
      <Button title="Submit request" onPress={submit} />
    </Screen>
  );
}
