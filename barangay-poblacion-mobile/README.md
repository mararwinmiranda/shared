# Barangay Poblacion Online Birth Certificate Request System

A React Native + Expo educational prototype. It uses mock accounts, sample records, and in-memory state only—no backend or real authentication.

## Requirements
- Node.js LTS
- npm
- Expo Go or an Android emulator (Android Studio)

## Run
```bash
npm install
npx expo start
```
Press `a` to launch an Android emulator, or scan the QR code with Expo Go. For web preview, run `npx expo start --web` (React Native web support may require installing `react-native-web` and `@expo/webpack-config` depending on your environment).

## Demo accounts
- Resident: `resident@poblacion.test` / `resident123`
- Staff: `staff@poblacion.test` / `staff123`

The sign-in screen includes demo account shortcuts. Registration creates a mock resident in app memory. Use **Switch demo role** on the profile screen to switch between resident and staff views.

## Included features
- Mock sign-in and resident registration
- Resident profile and verification state
- Birth certificate request form
- Government/Barangay ID and supporting document picker UI
- Request list and status timeline
- Staff queue to review, approve, reject, and mark requests ready for pickup
- Reports summary
- In-app notification examples
- External shared `StyleSheet` file
- Reusable components with props, hooks, event handlers, list rendering, and conditional rendering

## Business rules represented
1. Only verified residents may submit requests.
2. A resident may have no more than 3 pending requests.
3. Staff should process requests within 2–3 working days (shown as a target, not an automated SLA engine).
4. Documents left unclaimed for 30 days are marked for archive/cancellation in the demo. The app checks the elapsed time when it renders; it is not a background scheduler.

## Important limitations
- All records and login state live in React state and reset when the app restarts.
- Passwords and identity details are sample data only. This is not secure production authentication.
- File selection only demonstrates picking a local document. It does not upload files to a server.
- SMS/email notifications are simulated in the app; no messages are sent.
- Report figures are calculated from in-memory mock requests.
- Do not enter real personal data or real government ID documents in this prototype.

## Lesson mapping
- Introduction / setup: Expo project and file layout
- Components + JSX: screens, cards, status badges and form controls
- Props: reusable `Button`, `Field`, `StatusBadge`, and `RequestCard`
- Hooks: `useState`, `useMemo`, `useEffect`
- Events: submit, select document, approve/reject and status changes
- Lists: `FlatList` request and notification lists
- Conditional rendering: resident/staff dashboards, verification prompts, empty states
- External styling: all reusable styles in `styles.ts`
