import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  AppNotification, AppUser, BirthRequest, initialNotifications, initialRequests,
  initialUsers, RequestStatus
} from "../data/mockData";

type Result = { ok: true; id?: string } | { ok: false; message: string };
type NewRequest = Pick<BirthRequest, "subjectName" | "birthDate" | "placeOfBirth" | "purpose" | "idDocument" | "supportingDocument">;
type RegisterInput = { name: string; email: string; password: string; address: string };
type AppContextValue = {
  user: AppUser | null;
  users: AppUser[];
  requests: BirthRequest[];
  notifications: AppNotification[];
  signIn: (email: string, password: string) => Result;
  register: (input: RegisterInput) => Result;
  signOut: () => void;
  switchDemoRole: () => void;
  submitRequest: (input: NewRequest) => Result;
  updateStatus: (requestId: string, status: RequestStatus) => void;
  verifyResident: (userId: string) => void;
  archiveOldRequests: () => number;
};

const AppContext = createContext<AppContextValue | null>(null);
const today = () => new Date().toISOString().slice(0, 10);
const pendingStatuses: RequestStatus[] = ["Submitted", "Under Review", "Needs Information"];

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<AppUser[]>(initialUsers);
  const [user, setUser] = useState<AppUser | null>(null);
  const [requests, setRequests] = useState<BirthRequest[]>(initialRequests);
  const [notifications, setNotifications] = useState<AppNotification[]>(initialNotifications);

  useEffect(() => {
    // Demo-only archive policy check when the app state initializes/renders.
    const now = new Date();
    setRequests(prev => prev.map(r => {
      if (r.status !== "Ready for Pickup" || !r.readyAt) return r;
      const elapsed = (now.getTime() - new Date(r.readyAt).getTime()) / 86400000;
      return elapsed >= 30 ? { ...r, status: "Cancelled", updatedAt: today() } : r;
    }));
  }, []);

  const addNotification = (userId: string, title: string, message: string, channel: AppNotification["channel"] = "In-app (demo)") => {
    setNotifications(prev => [{ id: `n-${Date.now()}-${Math.random().toString(16).slice(2,6)}`, userId, title, message, createdAt: today(), channel }, ...prev]);
  };

  const signIn = (email: string, password: string): Result => {
    const found = users.find(u => u.email.toLowerCase() === email && u.password === password);
    if (!found) return { ok: false, message: "Check your email and password, or use a demo account." };
    setUser(found);
    return { ok: true };
  };

  const register = ({ name, email, password, address }: RegisterInput): Result => {
    if (!name || !email || !password || !address) return { ok: false, message: "Complete all fields." };
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false, message: "Enter a valid email address." };
    if (password.length < 6) return { ok: false, message: "Password must be at least 6 characters." };
    if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) return { ok: false, message: "That email already has a demo account." };
    const created: AppUser = { id: `u-${Date.now()}`, name, email, password, role: "resident", address, verified: false };
    setUsers(prev => [...prev, created]);
    setUser(created);
    return { ok: true };
  };

  const signOut = () => setUser(null);

  const switchDemoRole = () => {
    if (!user) return;
    const nextRole = user.role === "resident" ? "staff" : "resident";
    const found = users.find(u => u.role === nextRole);
    if (found) setUser(found);
  };

  const submitRequest = (input: NewRequest): Result => {
    if (!user || user.role !== "resident") return { ok: false, message: "Only resident accounts may submit requests." };
    if (!user.verified) return { ok: false, message: "Your resident profile must be verified by staff first." };
    if (!input.subjectName || !input.birthDate || !input.placeOfBirth || !input.purpose) return { ok: false, message: "Complete all required request details." };
    if (!/^\d{4}-\d{2}-\d{2}$/.test(input.birthDate)) return { ok: false, message: "Use YYYY-MM-DD for the date of birth." };
    if (!input.idDocument) return { ok: false, message: "Choose a government-issued ID or Barangay ID document." };
    const pending = requests.filter(r => r.residentId === user.id && pendingStatuses.includes(r.status)).length;
    if (pending >= 3) return { ok: false, message: "You already have 3 pending requests. Wait until one is processed before submitting another." };

    const id = `BCR-${new Date().getFullYear()}-${String(requests.length + 1).padStart(3, "0")}`;
    const created: BirthRequest = {
      ...input, id, residentId: user.id, residentName: user.name, status: "Submitted",
      createdAt: today(), updatedAt: today()
    };
    setRequests(prev => [created, ...prev]);
    addNotification(user.id, "Request submitted", `${id} was received. Staff aim to review it within 2–3 working days.`);
    const staff = users.find(u => u.role === "staff");
    if (staff) addNotification(staff.id, "New application submitted", `${id} from ${user.name} is waiting for review.`);
    return { ok: true, id };
  };

  const updateStatus = (requestId: string, status: RequestStatus) => {
    const target = requests.find(r => r.id === requestId);
    if (!target) return;
    setRequests(prev => prev.map(r => r.id === requestId ? {
      ...r, status, updatedAt: today(), ...(status === "Ready for Pickup" ? { readyAt: today() } : {})
    } : r));
    addNotification(target.residentId, `Request ${status.toLowerCase()}`, `${requestId} status changed to ${status}.`, "Email (simulated)");
  };

  const verifyResident = (userId: string) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, verified: true } : u));
    if (user?.id === userId) setUser(prev => prev ? { ...prev, verified: true } : prev);
  };

  const archiveOldRequests = () => {
    const now = new Date();
    let count = 0;
    setRequests(prev => prev.map(r => {
      if (r.status === "Ready for Pickup" && r.readyAt) {
        const days = (now.getTime() - new Date(r.readyAt).getTime()) / 86400000;
        if (days >= 30) {
          count += 1;
          addNotification(r.residentId, "Unclaimed document archived", `${r.id} was marked cancelled after 30 days unclaimed.`);
          return { ...r, status: "Cancelled", updatedAt: today() };
        }
      }
      return r;
    }));
    return count;
  };

  const value = useMemo(() => ({
    user, users, requests, notifications, signIn, register, signOut, switchDemoRole,
    submitRequest, updateStatus, verifyResident, archiveOldRequests
  }), [user, users, requests, notifications]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const value = useContext(AppContext);
  if (!value) throw new Error("useApp must be used inside AppProvider");
  return value;
}
