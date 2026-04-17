import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { C } from "../constants/Colors";
import { CartRowProps } from "../types";

export function CartRow({ item, updateQuantity }: CartRowProps) {
  const [imgErr, setImgErr] = useState(false);
  return (
    <View style={s.item}>
      {/* Thumbnail */}
      <View style={[s.thumb, { backgroundColor: item.bgColor }]}>
        {!imgErr ? (
          <Image
            source={{ uri: item.imageUrl }}
            style={StyleSheet.absoluteFillObject}
            resizeMode="cover"
            onError={() => setImgErr(true)}
          />
        ) : (
          <Text style={s.thumbEmoji}>{item.emoji}</Text>
        )}
      </View>

      {/* Info */}
      <View style={s.itemInfo}>
        <Text style={s.itemName} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={s.itemUnit}>${item.price.toFixed(2)} each</Text>
        <Text style={s.itemTotal}>
          ${(item.price * item.quantity).toFixed(2)}
        </Text>
      </View>

      {/* Qty controls */}
      <View style={s.qtyRow}>
        <TouchableOpacity
          style={[s.qtyBtn, item.quantity === 1 && s.qtyBtnDanger]}
          onPress={() => updateQuantity(item.id, -1)}
          activeOpacity={0.7}
        >
          <Ionicons
            name={item.quantity === 1 ? "trash-outline" : "remove"}
            size={15}
            color={item.quantity === 1 ? C.danger : C.text}
          />
        </TouchableOpacity>
        <Text style={s.qtyNum}>{item.quantity}</Text>
        <TouchableOpacity
          style={[s.qtyBtn, s.qtyBtnAdd]}
          onPress={() => updateQuantity(item.id, 1)}
          activeOpacity={0.7}
        >
          <Ionicons name="add" size={15} color={C.text} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: C.card,
    borderRadius: 20,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: C.border,
    gap: 14,
  },
  thumb: {
    width: 64,
    height: 64,
    borderRadius: 16,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  thumbEmoji: { fontSize: 30 },
  itemInfo: { flex: 1 },
  itemName: { fontSize: 15, color: C.text, fontWeight: "700", marginBottom: 3 },
  itemUnit: { fontSize: 11, color: C.sub },
  itemTotal: {
    fontSize: 16,
    color: C.primary,
    fontWeight: "800",
    marginTop: 4,
  },
  qtyRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  qtyBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: C.surface,
    borderWidth: 1,
    borderColor: C.border,
    justifyContent: "center",
    alignItems: "center",
  },
  qtyBtnDanger: { borderColor: C.danger },
  qtyBtnAdd: { backgroundColor: C.primary, borderColor: C.primary },
  qtyNum: {
    fontSize: 16,
    color: C.text,
    fontWeight: "700",
    minWidth: 18,
    textAlign: "center",
  },
});
