import { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "../../../assets/css/styles";
type OrderItem = { name: string; price: number };
type Order = { items: OrderItem[]; addons: OrderItem[] };
function getTotal(order: Order): number {
  return (
    order.items.reduce((sum: number, i: OrderItem) => sum + i.price, 0) +
    order.addons.reduce((sum: number, a: OrderItem) => sum + a.price, 0)
  );
}
// ...styles are now imported from ../(tabs)/styles
const sampleOrder: Order = {
  items: [
    { name: "Espresso", price: 120 },
    { name: "Croissant", price: 80 },
  ],
  addons: [{ name: "Extra Shot", price: 30 }],
};
export default function Cashier() {
  const [discount, setDiscount] = useState(0);
  const [amountPaid, setAmountPaid] = useState("");
  const [paid, setPaid] = useState(false);
  const total = getTotal(sampleOrder);
  const discountedTotal = total - total * discount;
  const change =
    parseFloat(amountPaid) > discountedTotal
      ? parseFloat(amountPaid) - discountedTotal
      : 0;
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Cashier</Text>
      <View style={styles.receiptBox}>
        <Text style={styles.receiptHeader}>Receipt</Text>
        <Text style={styles.receiptSection}>Items:</Text>
        {sampleOrder.items.map((item) => (
          <Text key={item.name} style={styles.receiptText}>
            {item.name} - ₱{item.price}
          </Text>
        ))}
        {sampleOrder.addons.length > 0 && (
          <Text style={styles.receiptSection}>Add-ons:</Text>
        )}
        {sampleOrder.addons.map((addon) => (
          <Text key={addon.name} style={styles.receiptText}>
            {addon.name} - ₱{addon.price}
          </Text>
        ))}
        <Text style={styles.receiptTotal}>Total: ₱{total.toFixed(2)}</Text>
        {discount > 0 && (
          <Text style={styles.receiptTotal}>
            Discount:
            {Math.round(discount * 100)}%
          </Text>
        )}
        {discount > 0 && (
          <Text style={styles.receiptTotal}>
            Discounted Total: ₱{discountedTotal.toFixed(2)}
          </Text>
        )}
      </View>
      <View style={styles.discountColumn}>
        <TouchableOpacity
          style={styles.discountButton}
          onPress={() => setDiscount(0.2)}
        >
          <Text style={styles.discountText}>PWD 20%</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.discountButton}
          onPress={() => setDiscount(0.25)}
        >
          <Text style={styles.discountText}>Senior 25%</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.discountButton}
          onPress={() => setDiscount(0.1)}
        >
          <Text style={styles.discountText}>Student 10%</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.payBox}>
        <Text style={styles.payLabel}>Amount to Pay:</Text>
        <TextInput
          style={styles.payInput}
          keyboardType="numeric"
          value={amountPaid}
          onChangeText={setAmountPaid}
          placeholder="Enter amount"
        />
        {change > 0 && (
          <Text style={styles.changeText}>Change: ₱{change.toFixed(2)}</Text>
        )}
        <TouchableOpacity
          style={styles.payButton}
          onPress={() => {
            setPaid(true);
            Alert.alert("Payment Successful", "The item has been paid.");
          }}
          disabled={parseFloat(amountPaid) < discountedTotal || !amountPaid}
        >
          <Text style={styles.payButtonText}>Pay</Text>
        </TouchableOpacity>
        {paid && <Text style={styles.paidText}>The item has been paid.</Text>}
      </View>
    </View>
  );
}
