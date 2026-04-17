import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { C } from "../constants/Colors";
import { HeaderProps } from "../types";

export function Header({ cartCount }: HeaderProps) {
  return (
    <View style={s.header}>
      <View>
        <Text style={s.deliveryLabel}>Deliver to</Text>
        <Text style={s.location}>New York, USA ▾</Text>
      </View>
      <TouchableOpacity
        style={s.cartBtn}
        onPress={() => router.push("/cart")}
        activeOpacity={0.8}
      >
        <Ionicons name="cart-outline" size={22} color={C.text} />
        {cartCount > 0 && (
          <View style={s.badge}>
            <Text style={s.badgeText}>
              {cartCount > 9 ? "9+" : cartCount}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: C.bg,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: C.border,
  },
  deliveryLabel: {
    fontSize: 11,
    color: C.sub,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
  location: { fontSize: 15, color: C.text, fontWeight: "700", marginTop: 2 },
  cartBtn: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: C.card,
    borderWidth: 1,
    borderColor: C.border,
    justifyContent: "center",
    alignItems: "center",
  },
  badge: {
    position: "absolute",
    top: -3,
    right: -3,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: C.primary,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 3,
  },
  badgeText: { fontSize: 10, color: C.text, fontWeight: "800" },
});
