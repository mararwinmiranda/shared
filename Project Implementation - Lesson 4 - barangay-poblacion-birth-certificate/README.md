# Barangay Poblacion Online Birth Certificate Request

A beginner-friendly Expo + React Native demo project designed to teach React fundamentals while modeling a simplified barangay birth certificate request workflow.

## What is included

- Demo sign-in screen (no real password or backend authentication)
- Resident profile and verification indicator
- Birth certificate request form
- Document-name input as a placeholder for real file uploads
- Resident request list and status tracker
- Staff review mode with approve/reject actions
- Simple report counts
- In-app mock notification messages
- A small dashboard task list that demonstrates add, complete, and delete interactions

## Requirements

- Node.js LTS
- npm
- VS Code
- Expo Go on a phone, or Android Studio emulator

## Run the project

Open a terminal in this folder:

```bash
npm install
npx expo start --clear
```

- Press `w` to open the web version.
- Scan the QR code with Expo Go to run on a phone.
- Press `a` to open an Android emulator if it is configured.

If you get a dependency error, run:

```bash
npx expo-doctor
```

## Demo login

This is a classroom prototype. Type any name and choose **Resident** or **Barangay Staff**, then tap **Sign in**. It does not verify real identities.

## Learning map

| React lesson | Where to look |
|---|---|
| Components | `app/index.tsx`, `app/(tabs)/index.tsx`, `app/(tabs)/requests.tsx`, `app/(tabs)/profile.tsx` |
| JSX | All `.tsx` files |
| State and Hooks | `app/(tabs)/index.tsx` and `app/(tabs)/requests.tsx` (`useState`) |
| Input and events | Sign-in, request form, task input, action buttons |
| Render lists | Request cards and dashboard task list use `.map()` |
| Conditional rendering | Signed-in state, resident/staff mode, status labels |
| Styling | `StyleSheet.create()` in each screen |

## Important limitations

This is a learning prototype, not a production government service.

- Data is kept in React state only and resets when the app reloads.
- Authentication, identity verification, and roles are simulated.
- Document upload is represented by a text field; it does not upload files.
- SMS/email notifications are simulated in the app.
- Status changes are local demo actions, not truly real-time.
- No database, audit trail, privacy controls, or server-side authorization is included.

For a real deployment, connect a secure backend and database, implement actual identity checks and file storage, enforce role permissions on the server, and use an approved SMS/email provider.
