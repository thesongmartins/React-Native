import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useCart } from "@/context/CartContext";

// Constants
import { C } from "../constants/Colors";

// Components
import { CartRow } from "../components/CartRow";
import { CartSummary } from "../components/CartSummary";

export default function CartScreen() {
  const { cartItems, updateQuantity, cartTotal, clearCart } = useCart();
  const insets = useSafeAreaInsets();

  const DELIVERY = 2.99;
  const total = cartItems.length > 0 ? cartTotal + DELIVERY : 0;

  const handleCheckout = () => {
    Alert.alert(
      "Order Placed! 🎉",
      `Your order totalling $${total.toFixed(2)} is confirmed!\n\nEstimated delivery: 25–35 min`,
      [
        {
          text: "Awesome!",
          onPress: () => {
            clearCart();
            router.back();
          },
        },
      ]
    );
  };

  return (
    <View style={[s.safe, { paddingTop: insets.top }]}>
      <StatusBar barStyle="light-content" backgroundColor={C.bg} translucent />

      {/* Header */}
      <View style={s.header}>
        <TouchableOpacity style={s.backBtn} onPress={() => router.back()} activeOpacity={0.8}>
          <Ionicons name="arrow-back" size={20} color={C.text} />
        </TouchableOpacity>
        <Text style={s.headerTitle}>My Cart</Text>
        {cartItems.length > 0 ? (
          <TouchableOpacity style={s.clearBtn} onPress={clearCart}>
            <Text style={s.clearText}>Clear all</Text>
          </TouchableOpacity>
        ) : (
          <View style={{ width: 72 }} />
        )}
      </View>

      {/* Empty State */}
      {cartItems.length === 0 ? (
        <View style={s.emptyContainer}>
          <Text style={s.emptyEmoji}>🛒</Text>
          <Text style={s.emptyTitle}>Your cart is empty</Text>
          <Text style={s.emptySub}>Browse our menu and add something delicious!</Text>
          <TouchableOpacity style={s.browseBtn} onPress={() => router.back()} activeOpacity={0.85}>
            <Ionicons name="arrow-back" size={16} color={C.text} style={{ marginRight: 6 }} />
            <Text style={s.browseBtnText}>Browse Menu</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <ScrollView 
            style={s.scroll} 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={s.scrollContent}
          >
            {/* Cart Items */}
            {cartItems.map((item) => (
              <CartRow key={item.id} item={item} updateQuantity={updateQuantity} />
            ))}

            {/* Order Summary */}
            <CartSummary cartTotal={cartTotal} deliveryFee={DELIVERY} total={total} />

            {/* Delivery info chip */}
            <View style={s.deliveryChip}>
              <Ionicons name="bicycle-outline" size={16} color={C.primary} />
              <Text style={s.deliveryChipText}>Estimated delivery: 25–35 min</Text>
            </View>

          </ScrollView>

          {/* Checkout Bar */}
          <View style={s.checkoutBar}>
            <TouchableOpacity style={s.checkoutBtn} onPress={handleCheckout} activeOpacity={0.88}>
              <View style={s.checkoutLeft}>
                <View style={s.itemCountBadge}>
                  <Text style={s.itemCountText}>{cartItems.reduce((a, i) => a + i.quantity, 0)}</Text>
                </View>
                <Text style={s.checkoutLabel}>Place Order</Text>
              </View>
              <Text style={s.checkoutTotal}>${total.toFixed(2)}</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg },

  // Header
  header: {
    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
    paddingHorizontal: 20, paddingVertical: 16,
    borderBottomWidth: 1, borderBottomColor: C.border,
  },
  backBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: C.card, borderWidth: 1, borderColor: C.border,
    justifyContent: "center", alignItems: "center",
  },
  headerTitle: { fontSize: 18, color: C.text, fontWeight: "700" },
  clearBtn: {
    paddingHorizontal: 14, paddingVertical: 7,
    borderRadius: 20, borderWidth: 1, borderColor: C.danger,
  },
  clearText: { fontSize: 12, color: C.danger, fontWeight: "600" },

  // Empty
  emptyContainer: {
    flex: 1, justifyContent: "center", alignItems: "center", padding: 40,
  },
  emptyEmoji: { fontSize: 72, marginBottom: 20 },
  emptyTitle: { fontSize: 22, color: C.text, fontWeight: "700", marginBottom: 8 },
  emptySub: { fontSize: 14, color: C.sub, textAlign: "center", marginBottom: 32, lineHeight: 20 },
  browseBtn: {
    flexDirection: "row", alignItems: "center",
    backgroundColor: C.primary, paddingHorizontal: 28, paddingVertical: 15, borderRadius: 20,
  },
  browseBtnText: { fontSize: 15, color: C.text, fontWeight: "700" },

  // List
  scroll: { flex: 1 },
  scrollContent: { padding: 20, paddingBottom: 32 },

  // Delivery chip
  deliveryChip: {
    flexDirection: "row", alignItems: "center", gap: 8,
    backgroundColor: "rgba(255,107,53,0.1)", borderRadius: 20,
    paddingHorizontal: 16, paddingVertical: 12, marginTop: 14,
    borderWidth: 1, borderColor: "rgba(255,107,53,0.25)",
  },
  deliveryChipText: { fontSize: 13, color: C.primary, fontWeight: "600" },

  // Checkout
  checkoutBar: {
    padding: 20, paddingBottom: 32,
    borderTopWidth: 1, borderTopColor: C.border,
    backgroundColor: C.bg,
  },
  checkoutBtn: {
    backgroundColor: C.primary, borderRadius: 20,
    paddingVertical: 18, paddingHorizontal: 20,
    flexDirection: "row", justifyContent: "space-between", alignItems: "center",
  },
  checkoutLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  itemCountBadge: {
    backgroundColor: "rgba(0,0,0,0.25)", width: 28, height: 28,
    borderRadius: 14, justifyContent: "center", alignItems: "center",
  },
  itemCountText: { fontSize: 13, color: C.text, fontWeight: "700" },
  checkoutLabel: { fontSize: 16, color: C.text, fontWeight: "700" },
  checkoutTotal: { fontSize: 18, color: C.text, fontWeight: "900" },
});
