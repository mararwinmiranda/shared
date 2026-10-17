import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
export default function ProfilePage() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [user, setUser] = useState({ name: "", email: "", birthday: "" });
  const [birthday, setBirthday] = useState("");
  const [editing, setEditing] = useState(false);
  const [tempBirthday, setTempBirthday] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    loadUserIdAndFetchUser();
  }, []);

  const fetchUser = async (id: string) => {
    setLoading(true);
    try {
      console.log("Fetching user with ID:", id);
      const res = await fetch(`http://localhost:3000/api/users/${id}`);
      console.log("Response status:", res.status);
      if (!res.ok) throw new Error("Failed to fetchuser");
      const data = await res.json();
      console.log("User data received:", data);
      setUser(data);
      setBirthday(data.birthday || "");
      setTempBirthday(data.birthday || "");
    } catch (err) {
      console.log("Error fetching user:", err);
      alert("Could not load user data");
    }
    setLoading(false);
  };

  const loadUserIdAndFetchUser = async () => {
    try {
      const storedUserId = await AsyncStorage.getItem("userId");
      console.log("Stored User ID:", storedUserId);
      if (storedUserId) {
        setUserId(storedUserId);
        await fetchUser(storedUserId);
      } else {
        console.log("No user ID found in AsyncStorage");
        alert("No user ID found. Please login again.");
        setLoading(false);
      }
    } catch (err) {
      console.log("Error loading user ID:", err);
      alert("Could not load user ID");
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setEditing(true);
    setTempBirthday(birthday);
  };

  const handleSave = async () => {
    if (!userId) return;
    if (!tempBirthday) {
      alert("Birthday cannot be empty");
      return;
    }
    try {
      const res = await fetch(
        `http://localhost:3000/api/users/${userId}/birthday`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ birthday: tempBirthday }),
        },
      );
      if (!res.ok) throw new Error("Failed to update birthday");
      setBirthday(tempBirthday);
      setUser((u) => ({ ...u, birthday: tempBirthday }));
      setEditing(false);
    } catch (err) {
      alert("Could not update birthday");
    }
  };

  const handleCancel = () => {
    setTempBirthday(birthday);
    setEditing(false);
  };

  const handleDelete = async () => {
    if (!userId) return;
    try {
      const res = await fetch(
        `http://localhost:3000/api/users/${userId}/birthday`,
        {
          method: "DELETE",
        },
      );
      if (!res.ok) throw new Error("Failed to remove birthday");
      setBirthday("");
      setTempBirthday("");
      setUser((u) => ({ ...u, birthday: "" }));
      setEditing(false);
    } catch (err) {
      alert("Could not remove birthday");
    }
  };

  const handleLogout = async () => {
    // confirm("Are you sure you want to logout?", [
    //   { text: "Cancel", style: "cancel" },
    //   {
    //     text: "Logout",
    //     onPress: async () => {
    //       try {
    //         await AsyncStorage.removeItem("userId");
    //         router.replace("/");
    //       } catch (err) {
    //         console.log("Error during logout:", err);
    //         alert("Could not logout properly");
    //       }
    //     },
    //   },
    // ]);

    const result = window.confirm("Are you sure you want to logout?");
    if (result) {
      await AsyncStorage.removeItem("userId");
      router.replace("/");
    } else {
      console.log("User cancelled");
    }
  };
  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "#fff" }}>
      {/* Profile Content */}
      <>
        <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 24 }}>
          Profile
        </Text>
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 16, marginBottom: 6 }}>Name</Text>
          <TextInput
            value={user.name}
            editable={false}
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 6,
              padding: 10,
              backgroundColor: "#f2f2f2",
              marginBottom: 14,
            }}
          />
          <Text style={{ fontSize: 16, marginBottom: 6 }}>Email</Text>
          <TextInput
            value={user.email}
            editable={false}
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 6,
              padding: 10,
              backgroundColor: "#f2f2f2",
              marginBottom: 14,
            }}
          />
          <Text style={{ fontSize: 16, marginBottom: 6 }}>Birthday</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TextInput
              value={user.birthday}
              placeholder="YYYY-MM-DD"
              editable={false}
              style={{
                flex: 1,
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 6,
                padding: 10,
                backgroundColor: "#f2f2f2",
              }}
            />
            {/* Edit, Save, Cancel, Delete buttons would go here */}
          </View>
        </View>
        <TouchableOpacity
          onPress={handleLogout}
          style={{
            marginTop: 40,
            padding: 12,
            backgroundColor: "#F44336",
            borderRadius: 6,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
            Logout
          </Text>
        </TouchableOpacity>
      </>
      <TextInput
        value={editing ? tempBirthday : birthday}
        onChangeText={setTempBirthday}
        placeholder="YYYY-MM-DD"
        editable={editing}
        style={{
          flex: 1,
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 6,
          padding: 10,
          backgroundColor: editing ? "#fff" : "#f2f2f2",
        }}
      />
      {editing ? (
        <>
          <TouchableOpacity
            onPress={handleSave}
            style={{
              marginLeft: 8,
              padding: 8,
              backgroundColor: "#4CAF50",
              borderRadius: 4,
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "bold" }}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleCancel}
            style={{
              marginLeft: 8,
              padding: 8,
              backgroundColor: "#aaa",
              borderRadius: 4,
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "bold" }}>Cancel</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TouchableOpacity
            onPress={handleEdit}
            style={{
              marginLeft: 8,
              padding: 8,
              backgroundColor: "#2196F3",
              borderRadius: 4,
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "bold" }}>Edit</Text>
          </TouchableOpacity>
          {birthday ? (
            <TouchableOpacity
              onPress={handleDelete}
              style={{
                marginLeft: 8,
                padding: 8,
                backgroundColor: "#F44336",
                borderRadius: 4,
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "bold" }}>Delete</Text>
            </TouchableOpacity>
          ) : null}
        </>
      )}
    </View>
  );
}
