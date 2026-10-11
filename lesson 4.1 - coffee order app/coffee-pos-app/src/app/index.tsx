import { useRouter } from "expo-router";
import { useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import styles from "../../assets/css/styles";

const coffees = [
  { name: "Espresso", price: 120 },
  { name: "Cappuccino", price: 150 },
  { name: "Latte", price: 140 },
];
const pastries = [
  { name: "Croissant", price: 80 },
  { name: "Danish", price: 90 },
  { name: "Muffin", price: 85 },
];
const addons = [
  { name: "Extra Shot", price: 30 },
  { name: "Whipped Cream", price: 20 },
  { name: "Vanilla Syrup", price: 25 },
];

export default function HomeScreen() {
  const [selectedItems, setSelectedItems] = useState<
    { name: string; price: number }[]
  >([]);
  const [selectedAddons, setSelectedAddons] = useState<
    { name: string; price: number }[]
  >([]);
  const [navOpen, setNavOpen] = useState(false);
  const router = useRouter();

  function ItemButton({
    item,
    onPress,
    type,
  }: {
    item: { name: string; price: number };
    onPress: () => void;
    type: "coffee" | "pastry";
  }) {
    // You can use the type prop for conditional styling or logic if needed
    return (
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>{item.name}</Text>
      </TouchableOpacity>
    );
  }

  function AddonButton({
    addon,
    selected,
    onToggle,
    disabled,
  }: {
    addon: { name: string; price: number };
    selected: boolean;
    onToggle: () => void;
    disabled: boolean;
  }) {
    return (
      <TouchableOpacity
        style={[styles.addonButton, selected && styles.selectedAddon]}
        onPress={onToggle}
        disabled={disabled}
      >
        <Text style={styles.buttonText}>
          {addon.name}
          (+₱{addon.price})
        </Text>
      </TouchableOpacity>
    );
  }

  // Sidebar navigation component
  function Sidebar({
    visible,
    onClose,
  }: {
    visible: boolean;
    onClose: () => void;
  }) {
    return (
      <Modal visible={visible} transparent animationType="none">
        <View style={styles.sidebarOverlay}>
          <View style={styles.sidebarAnimated}>
            <View style={styles.sidebar}>
              <Text style={styles.navHeader}>Menu</Text>
              <TouchableOpacity style={styles.navItem} onPress={onClose}>
                <Text style={styles.navText}>Cashier</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.navClose} onPress={onClose}>
                <Text>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  const handleItemToggle = (item: { name: string; price: number }) => {
    if (selectedItems.some((i) => i.name === item.name)) {
      setSelectedItems(selectedItems.filter((i) => i.name !== item.name));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };
  const handleAddonToggle = (addon: { name: string; price: number }) => {
    if (selectedAddons.some((a) => a.name === addon.name)) {
      setSelectedAddons(selectedAddons.filter((a) => a.name !== addon.name));
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };

  const totalPrice =
    selectedItems.reduce((sum, i) => sum + i.price, 0) +
    selectedAddons.reduce((sum, a) => sum + a.price, 0);

  return (
    <View style={styles.container}>
      {/* Hamburger Navigation */}
      <TouchableOpacity
        style={styles.hamburger}
        onPress={() => setNavOpen(true)}
      >
        <Text style={{ fontSize: 28 }}>☰</Text>
      </TouchableOpacity>
      <Sidebar visible={navOpen} onClose={() => setNavOpen(false)} />
      <Text style={styles.header}>Coffee Ordering App</Text>
      <Text style={styles.section}>Coffees</Text>
      <View style={styles.buttonRow}>
        {coffees.map((item) => (
          <ItemButton
            key={item.name}
            item={item}
            onPress={() => handleItemToggle(item)}
            type="coffee"
          />
        ))}
      </View>
      <Text style={styles.section}>Pastries</Text>
      <View style={styles.buttonRow}>
        {pastries.map((item) => (
          <ItemButton
            key={item.name}
            item={item}
            onPress={() => handleItemToggle(item)}
            type="pastry"
          />
        ))}
      </View>
      {/* Add-ons */}
      <Text style={styles.section}>Add-ons</Text>
      <View style={styles.addonColumn}>
        {addons.map((addon) => (
          <AddonButton
            key={addon.name}
            addon={addon}
            selected={selectedAddons.some((a) => a.name === addon.name)}
            onToggle={() => handleAddonToggle(addon)}
            disabled={selectedItems.length === 0}
          />
        ))}
      </View>
      {selectedItems.length > 0 && (
        <View style={styles.result}>
          <Text style={styles.resultText}>
            Selected:
            {selectedItems.map((i) => i.name).join(", ")}
          </Text>
          {selectedAddons.length > 0 && (
            <Text style={styles.resultText}>
              Add-ons:
              {selectedAddons.map((a) => a.name).join(", ")}
            </Text>
          )}
          <Text style={styles.resultText}>Total Price: ₱{totalPrice}</Text>
          <TouchableOpacity
            style={styles.cashierButton}
            onPress={() => router.push("/pages/cashier")}
          >
            <Text style={styles.cashierButtonText}>Go to Cashier</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
