import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#F5F7FA",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
    gap: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
  reactLogo: { height: 48, width: 78, resizeMode: "contain" },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  addButton: {
    backgroundColor: "#2563EB",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  nextButton: {
    marginTop: 24,
    backgroundColor: "#10B981",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  nextButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  doneRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    marginTop: 8,
  },
  doneLabel: {
    fontSize: 16,
    color: "#374151",
    marginRight: 6,
  },
  doneValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#10B981",
  },
  list: {
    gap: 8,
  },
  taskItem: {
    padding: 14,
    borderRadius: 8,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  taskItemCompleted: {
    backgroundColor: "#D1FAE5",
    borderColor: "#10B981",
  },
  taskText: {
    fontSize: 16,
  },
  taskTextCompleted: {
    textDecorationLine: "line-through",
    color: "#6B7280",
  },
  buttonRow: {
    flexDirection: "row",
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#e0e0e0",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 8,
    marginHorizontal: 6,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
  },
  selectedAddon: {
    backgroundColor: "#c0ffc0",
  },
  result: {
    marginTop: 24,
    alignItems: "center",
  },
  resultText: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 2,
  },
  hamburger: {
    position: "absolute",
    top: 32,
    left: 24,
    zIndex: 10,
  },
  cashierButton: {
    marginTop: 16,
    backgroundColor: "#1D3D47",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: "center",
  },
  cashierButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  sidebarOverlay: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "flex-start",
    alignItems: "stretch",
  },
  sidebarAnimated: {
    width: 240,
    height: "100%",
    backgroundColor: "transparent",
    transform: [{ translateX: 0 }],
    // For a real animation, use Animated.View and interpolate
  },
  sidebar: {
    width: 240,
    backgroundColor: "#fff",
    padding: 24,
    height: "100%",
    elevation: 4,
    justifyContent: "flex-start",
  },
  addonColumn: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 12,
  },
  addonButton: {
    backgroundColor: "#e0e0e0",
    paddingVertical: 12,
    borderRadius: 8,
    marginVertical: 6,
    width: "90%",
    alignItems: "center",
  },
  navHeader: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
  },
  navItem: {
    paddingVertical: 12,
  },
  navText: {
    fontSize: 18,
  },
  navClose: {
    marginTop: 24,
    alignItems: "center",
  },
  // Cashier-specific styles
  receiptBox: {
    width: "90%",
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
  },
  receiptHeader: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
  },
  receiptSection: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 8,
    marginBottom: 4,
  },
  receiptText: {
    fontSize: 16,
    marginBottom: 2,
  },
  receiptTotal: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 8,
  },
  discountColumn: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 16,
    gap: 12,
  },
  discountButton: {
    backgroundColor: "#1D3D47",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 8,
    marginHorizontal: 6,
  },
  discountText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  payBox: {
    width: "90%",
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 16,
    marginTop: 8,
    alignItems: "center",
  },
  payLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  payInput: {
    width: "80%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 8,
    fontSize: 16,
    marginBottom: 8,
    backgroundColor: "#fff",
    textAlign: "center",
  },
  changeText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1D3D47",
    marginTop: 8,
  },
  payButton: {
    marginTop: 12,
    backgroundColor: "#1D3D47",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: "center",
  },
  payButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  paidText: {
    marginTop: 12,
    fontSize: 16,
    color: "green",
    fontWeight: "bold",
  },
  loginContainer: {
    flex: 1,
    backgroundColor: "#F0F5FF",
  },

  loginContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 40,
  },

  logoContainer: {
    alignItems: "center",
    marginBottom: 32,
  },

  appName: {
    fontSize: 34,
    fontWeight: "800",
    color: "#1D4ED8",
    letterSpacing: 0.5,
    marginBottom: 10,
  },

  tagline: {
    fontSize: 15,
    color: "#64748B",
    textAlign: "center",
    lineHeight: 22,
  },

  formContainer: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 24,
    shadowColor: "#1E3A8A",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 5,
  },

  inputContainer: {
    marginBottom: 20,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#334155",
    marginBottom: 9,
  },

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    minHeight: 54,
    paddingHorizontal: 14,
  },

  inputIcon: {
    marginRight: 12,
  },

  textInput: {
    flex: 1,
    fontSize: 15,
    color: "#0F172A",
    paddingVertical: 14,
    outlineStyle: "none",
  } as any,

  eyeIcon: {
    padding: 6,
    marginLeft: 8,
  },

  forgotPasswordContainer: {
    alignSelf: "flex-end",
    marginTop: -4,
    marginBottom: 24,
  },

  forgotPasswordText: {
    color: "#2563EB",
    fontSize: 14,
    fontWeight: "600",
  },

  loginButton: {
    backgroundColor: "#2563EB",
    borderRadius: 12,
    minHeight: 54,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#2563EB",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },

  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.3,
  },

  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 26,
  },

  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#E2E8F0",
  },

  dividerText: {
    color: "#94A3B8",
    fontSize: 13,
    marginHorizontal: 14,
  },

  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
  },

  signUpText: {
    color: "#64748B",
    fontSize: 14,
  },

  signUpLink: {
    color: "#2563EB",
    fontSize: 14,
    fontWeight: "700",
  },
  registerContainer: {
    flex: 1,
    backgroundColor: "#F0F5FF",
  },

  registerContent: {
    flexGrow: 1,
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 40,
  },

  // Header
  registerHeaderContainer: {
    width: "100%",
    maxWidth: 420,
    alignItems: "center",
    marginBottom: 28,
  },

  registerTitle: {
    fontSize: 32,
    fontWeight: "800",
    color: "#2563EB",
    textAlign: "center",
    marginBottom: 10,
  },

  registerSubtitle: {
    fontSize: 15,
    color: "#64748B",
    textAlign: "center",
    lineHeight: 22,
  },

  // Form card
  registerFormContainer: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 24,
    shadowColor: "#1E3A8A",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 5,
  },

  // Individual inputs
  registerInputContainer: {
    marginBottom: 18,
  },

  registerLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#334155",
    marginBottom: 9,
  },

  registerInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 54,
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    paddingHorizontal: 14,
  },

  registerInputIcon: {
    marginRight: 12,
  },

  registerTextInput: {
    flex: 1,
    fontSize: 15,
    color: "#0F172A",
    paddingVertical: 14,
  },

  registerEyeIcon: {
    padding: 6,
    marginLeft: 8,
  },

  // Create Account button
  registerButton: {
    minHeight: 54,
    backgroundColor: "#2563EB",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 6,
    shadowColor: "#2563EB",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },

  registerButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.3,
  },

  // Divider
  registerDividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 26,
  },

  registerDivider: {
    flex: 1,
    height: 1,
    backgroundColor: "#E2E8F0",
  },

  registerDividerText: {
    fontSize: 13,
    color: "#94A3B8",
    marginHorizontal: 14,
  },

  // Sign-in link
  registerLoginLinkContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
  },

  registerLoginText: {
    fontSize: 14,
    color: "#64748B",
  },

  registerLoginLink: {
    fontSize: 14,
    color: "#2563EB",
    fontWeight: "700",
  },
});
export default styles;
