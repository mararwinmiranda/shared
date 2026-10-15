import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  AppNotification,
  AppUser,
  BirthRequest,
  initialNotifications,
  initialRequests,
  initialUsers,
  RequestStatus,
} from "../data/mockData";
import {
  createNotification,
  enterRequest,
  getNotifications,
  getRequests,
  getUsers,
  login,
  registerUser,
  updateRequestStatus,
  verifyUser,
} from "../api";
import { Alert, Platform } from "react-native";

type Result = { ok: true; id?: string } | { ok: false; message: string };
type NewRequest = Pick<
  BirthRequest,
  | "subjectName"
  | "birthDate"
  | "placeOfBirth"
  | "purpose"
  | "idDocument"
  | "supportingDocument"
>;
type RegisterInput = {
  name: string;
  email: string;
  password: string;
  address: string;
};
type AppContextValue = {
  user: AppUser | null;
  users: AppUser[];
  requests: BirthRequest[];
  notifications: AppNotification[];
  signIn: (email: string, password: string) => Promise<any>;
  register: (input: RegisterInput) => Promise<any>;
  signOut: () => void;
  switchDemoRole: () => void;
  submitRequest: (input: NewRequest) => Result;
  updateStatus: (requestId: string, status: RequestStatus) => void;
  verifyResident: (userId: string) => Promise<any>;
  archiveOldRequests: () => number;
};

const AppContext = createContext<AppContextValue | null>(null);
const today = () => new Date().toISOString().slice(0, 10);
const pendingStatuses: RequestStatus[] = [
  "Submitted",
  "Under Review",
  "Needs Information",
];

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<AppUser[]>([]);
  const [user, setUser] = useState<AppUser | null>(null);
  const [requests, setRequests] = useState<BirthRequest[]>([]);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  useEffect(() => {
    // Demo-only archive policy check when the app state initializes/renders.
    getNotifications()
      .then((data) => setNotifications(data))
      .catch(() => {
        if (Platform.OS === "web") {
          window.alert(`Could not get notifications data`);
        } else {
          Alert.alert("Could not get notifications data", "");
        }
      });

    getRequests()
      .then((data) => setRequests(data))
      .catch(() => {
        if (Platform.OS === "web") {
          window.alert(`Could not get requests data`);
        } else {
          Alert.alert("Could not get requests data", "");
        }
      });

    const now = new Date();
    setRequests((prev) =>
      prev.map((r) => {
        if (r.status !== "Ready for Pickup" || !r.readyAt) return r;
        const elapsed =
          (now.getTime() - new Date(r.readyAt).getTime()) / 86400000;
        return elapsed >= 30
          ? { ...r, status: "Cancelled", updatedAt: today() }
          : r;
      }),
    );

    getUsers()
      .then((data) => setUsers(data))
      .catch(() => {
        if (Platform.OS === "web") {
          window.alert(`Could not get users data`);
        } else {
          Alert.alert("Could not get users data", "");
        }
      });
  }, []);

  const addNotification = (
    userId: string,
    title: string,
    message: string,
    channel: AppNotification["channel"] = "In-app (demo)",
  ) => {
    createNotification({ userId, title, message, channel }).then((data) => {
      setNotifications((prev) => [
        {
          id: `n-${Date.now()}-${Math.random().toString(16).slice(2, 6)}`,
          userId,
          title,
          message,
          createdAt: today(),
          channel,
        },
        ...prev,
      ]);
    });
  };

  const signIn = async (email: string, password: string): Promise<any> => {
    const data = await login({ email: email, password: password });
    setUser(data.user);

    return data;
  };

  const register = async ({
    name,
    email,
    password,
    address,
  }: RegisterInput): Promise<any> => {
    const data = await registerUser({
      name: name,
      email: email,
      password: password,
      address: address,
    });
    setUsers((prev) => [...prev, data.user]);
    setUser(data.user);

    return data;
  };

  const signOut = () => setUser(null);

  const switchDemoRole = () => {
    if (!user) return;
    const nextRole = user.role === "resident" ? "staff" : "resident";
    const found = users.find((u) => u.role === nextRole);
    if (found) setUser(found);
  };

  const submitRequest = (input: NewRequest): Result => {
    if (!user || user.role !== "resident")
      return {
        ok: false,
        message: "Only resident accounts may submit requests.",
      };
    if (!user.verified)
      return {
        ok: false,
        message: "Your resident profile must be verified by staff first.",
      };
    if (
      !input.subjectName ||
      !input.birthDate ||
      !input.placeOfBirth ||
      !input.purpose
    )
      return { ok: false, message: "Complete all required request details." };
    if (!/^\d{4}-\d{2}-\d{2}$/.test(input.birthDate))
      return { ok: false, message: "Use YYYY-MM-DD for the date of birth." };
    if (!input.idDocument)
      return {
        ok: false,
        message: "Choose a government-issued ID or Barangay ID document.",
      };
    const pending = requests.filter(
      (r) => r.residentId === user.id && pendingStatuses.includes(r.status),
    ).length;
    if (pending >= 3)
      return {
        ok: false,
        message:
          "You already have 3 pending requests. Wait until one is processed before submitting another.",
      };

    const id = `BCR-${new Date().getFullYear()}-${String(requests.length + 1).padStart(3, "0")}`;
    const created: BirthRequest = {
      ...input,
      id,
      residentId: user.id,
      residentName: user.name,
      status: "Submitted",
      createdAt: today(),
      updatedAt: today(),
    };

    enterRequest(created).then((data) => {
      if (!data.ok) {
        if (Platform.OS === "web") {
          window.alert(`Cannot submit request: ${data.message}`);
        } else {
          return Alert.alert("Cannot submit request", data.message);
        }
      } else {
        if (Platform.OS === "web") {
          window.alert(
            `Request submitted: Your demo reference is ${id}. Track the status in My Requests.`,
          );
        } else {
          Alert.alert(
            "Request submitted",
            `Your demo reference is ${id}. Track the status in My Requests.`,
          );
        }
      }
      setRequests((prev) => [created, ...prev]);
      addNotification(
        user.id,
        "Request submitted",
        `${id} was received. Staff aim to review it within 2–3 working days.`,
      );
      const staff = users.find((u) => u.role === "staff");
      if (staff)
        addNotification(
          staff.id,
          "New application submitted",
          `${id} from ${user.name} is waiting for review.`,
        );
    });

    return { ok: true, id };
  };

  const updateStatus = (requestId: string, status: RequestStatus) => {
    const target = requests.find((r) => r.id === requestId);
    if (!target) return;
    updateRequestStatus({ requestId, status }).then((data) => {
      if (data.ok) {
        setRequests((prev) =>
          prev.map((r) =>
            r.id === requestId
              ? {
                  ...r,
                  status,
                  updatedAt: today(),
                  ...(status === "Ready for Pickup"
                    ? { readyAt: today() }
                    : {}),
                }
              : r,
          ),
        );
      }
    });

    addNotification(
      target.residentId,
      `Request ${status.toLowerCase()}`,
      `${requestId} status changed to ${status}.`,
      "Email (simulated)",
    );
  };

  const verifyResident = async (userId: string): Promise<any> => {
    // setUsers((prev) =>
    //   prev.map((u) => (u.id === userId ? { ...u, verified: true } : u)),
    // );
    // if (user?.id === userId)
    //   setUser((prev) => (prev ? { ...prev, verified: true } : prev));

    const data = await verifyUser(userId);
    if (data.ok) {
      // setUser(data.user);
      setUsers(data.users);
      // setUsers((prev) =>
      //   prev.map((u) => (u.id === userId ? { ...u, verified: true } : u)),
      // );
      // if (user?.id === userId)
      //   setUser((prev) => (prev ? { ...prev, verified: true } : prev));
    }
    return data;
  };

  const archiveOldRequests = () => {
    const now = new Date();
    let count = 0;
    setRequests((prev) =>
      prev.map((r) => {
        if (r.status === "Ready for Pickup" && r.readyAt) {
          const days =
            (now.getTime() - new Date(r.readyAt).getTime()) / 86400000;
          if (days >= 30) {
            count += 1;
            addNotification(
              r.residentId,
              "Unclaimed document archived",
              `${r.id} was marked cancelled after 30 days unclaimed.`,
            );
            return { ...r, status: "Cancelled", updatedAt: today() };
          }
        }
        return r;
      }),
    );
    return count;
  };

  const value = useMemo(
    () => ({
      user,
      users,
      requests,
      notifications,
      signIn,
      register,
      signOut,
      switchDemoRole,
      submitRequest,
      updateStatus,
      verifyResident,
      archiveOldRequests,
    }),
    [user, users, requests, notifications],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const value = useContext(AppContext);
  if (!value) throw new Error("useApp must be used inside AppProvider");
  return value;
}
