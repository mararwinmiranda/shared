import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 24,
  },
  section: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 16,
    marginBottom: 8,
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
});
export default styles;
