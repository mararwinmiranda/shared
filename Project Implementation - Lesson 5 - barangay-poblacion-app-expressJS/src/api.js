const apiUrl = "http://localhost:5000";

export const getMessage = () => {
  return fetch(`${apiUrl}/api/message`).then((res) => res.json());
};

export const login = async (body) => {
  try {
    const response = await fetch(`${apiUrl}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = response.json();
    return data;
  } catch {
    if (Platform.OS === "web") {
      window.alert(`Sign in failed`);
    } else {
      Alert.alert("Sign in failed", "");
    }
  }
};

export const registerUser = async (body) => {
  try {
    const response = await fetch(`${apiUrl}/api/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = response.json();
    return data;
  } catch {
    if (Platform.OS === "web") {
      window.alert(`Account registration Failed.`);
    } else {
      Alert.alert("Account registration Failed.", "");
    }
  }
};

export const getUsers = () => {
  return fetch(`${apiUrl}/api/users`).then((res) => res.json());
};

export const verifyUser = async (userId) => {
  try {
    const response = await fetch(`${apiUrl}/api/verifyUser`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });
    const data = response.json();
    return data;
  } catch {
    if (Platform.OS === "web") {
      window.alert(`Account verification Failed.`);
    } else {
      Alert.alert("Account verification Failed.", "");
    }
  }
};

export const updateRequestStatus = async (body) => {
  try {
    return fetch(`${apiUrl}/api/updateStatus`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }).then((res) => res.json());
  } catch {
    if (Platform.OS === "web") {
      window.alert(`Update request status failed.`);
    } else {
      Alert.alert("Update request status failed.", "");
    }
  }
};

export const getRequests = () => {
  return fetch(`${apiUrl}/api/requests`).then((res) => res.json());
};

export const enterRequest = async (body) => {
  try {
    return fetch(`${apiUrl}/api/submitRequest`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }).then((res) => res.json());
  } catch {
    if (Platform.OS === "web") {
      window.alert(`Submit request failed.`);
    } else {
      Alert.alert("Submit request failed.", "");
    }
  }
};

export const createNotification = async (body) => {
  try {
    return fetch(`${apiUrl}/api/createNotification`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }).then((res) => res.json());
  } catch {
    if (Platform.OS === "web") {
      window.alert(`Submit request failed.`);
    } else {
      Alert.alert("Submit request failed.", "");
    }
  }
};

export const getNotifications = () => {
  return fetch(`${apiUrl}/api/getNotifications`).then((res) => res.json());
};
