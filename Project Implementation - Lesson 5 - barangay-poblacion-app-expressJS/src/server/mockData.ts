export type Role = "resident" | "staff";
export type RequestStatus =
  | "Submitted"
  | "Under Review"
  | "Needs Information"
  | "Ready for Pickup"
  | "Rejected"
  | "Collected"
  | "Cancelled";

export type AppUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  address: string;
  verified: boolean;
};

export type BirthRequest = {
  id: string;
  residentId: string;
  residentName: string;
  subjectName: string;
  birthDate: string;
  placeOfBirth: string;
  purpose: string;
  idDocument: string;
  supportingDocument: string;
  status: RequestStatus;
  createdAt: string;
  updatedAt: string;
  readyAt?: string;
};

export type AppNotification = {
  id: string;
  userId: string;
  title: string;
  message: string;
  createdAt: string;
  channel: "In-app (demo)" | "Email (simulated)" | "SMS (simulated)";
};

export const initialUsers: AppUser[] = [
  {
    id: "u-res-1",
    name: "Maria Santos",
    email: "resident@poblacion.test",
    password: "resident123",
    role: "resident",
    address: "Barangay Poblacion",
    verified: true,
  },
  {
    id: "u-staff-1",
    name: "Barangay Staff",
    email: "staff@poblacion.test",
    password: "staff123",
    role: "staff",
    address: "Barangay Poblacion Hall",
    verified: true,
  },
  {
    id: "u-res-2",
    name: "Juan Dela Cruz",
    email: "juan@poblacion.test",
    password: "resident123",
    role: "resident",
    address: "Poblacion, Main Street",
    verified: false,
  },
];

export const initialRequests: BirthRequest[] = [
  {
    id: "BCR-2026-001",
    residentId: "u-res-1",
    residentName: "Maria Santos",
    subjectName: "Maria Santos",
    birthDate: "1998-04-12",
    placeOfBirth: "Angeles City, Pampanga",
    purpose: "Passport application",
    idDocument: "sample-valid-id.pdf",
    supportingDocument: "supporting-record.jpg",
    status: "Under Review",
    createdAt: "2026-10-07",
    updatedAt: "2026-10-09",
  },
  {
    id: "BCR-2026-002",
    residentId: "u-res-1",
    residentName: "Maria Santos",
    subjectName: "Paolo Santos",
    birthDate: "2020-01-30",
    placeOfBirth: "Angeles City, Pampanga",
    purpose: "School enrollment",
    idDocument: "sample-barangay-id.jpg",
    supportingDocument: "",
    status: "Ready for Pickup",
    createdAt: "2026-09-01",
    updatedAt: "2026-09-03",
    readyAt: "2026-09-03",
  },
  {
    id: "BCR-2026-003",
    residentId: "u-res-2",
    residentName: "Juan Dela Cruz",
    subjectName: "Juan Dela Cruz",
    birthDate: "2001-11-18",
    placeOfBirth: "Pampanga",
    purpose: "Personal records",
    idDocument: "sample-id.png",
    supportingDocument: "",
    status: "Submitted",
    createdAt: "2026-10-08",
    updatedAt: "2026-10-08",
  },
];

export const initialNotifications: AppNotification[] = [
  {
    id: "n-1",
    userId: "u-res-1",
    title: "Request under review",
    message: "BCR-2026-001 is being reviewed by barangay staff.",
    createdAt: "2026-10-09",
    channel: "In-app (demo)",
  },
  {
    id: "n-2",
    userId: "u-res-1",
    title: "Ready for pickup",
    message: "BCR-2026-002 is ready. Bring a claim stub and valid ID.",
    createdAt: "2026-09-03",
    channel: "Email (simulated)",
  },
  {
    id: "n-3",
    userId: "u-staff-1",
    title: "New application submitted",
    message:
      "A new birth certificate request is waiting in the verification queue.",
    createdAt: "2026-10-08",
    channel: "In-app (demo)",
  },
];
