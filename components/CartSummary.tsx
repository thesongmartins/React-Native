import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { C } from "../constants/Colors";
import { CartSummaryProps } from "../types";

export function CartSummary({ cartTotal, deliveryFee, total }: CartSummaryProps) {
  return (
    <View style={s.summary}>
      <Text style={s.summaryTitle}>Order Summary</Text>

      <View style={s.summaryRow}>
        <Text style={s.summaryLabel}>Subtotal</Text>
        <Text style={s.summaryValue}>${cartTotal.toFixed(2)}</Text>
      </View>
      <View style={s.summaryRow}>
        <Text style={s.summaryLabel}>Delivery Fee</Text>
        <Text style={s.summaryValue}>${deliveryFee.toFixed(2)}</Text>
      </View>
      <View style={s.summaryRow}>
        <Text style={s.summaryLabel}>Service Fee</Text>
        <Text style={[s.summaryValue, { color: C.success }]}>FREE</Text>
      </View>

      <View style={s.divider} />

      <View style={s.summaryRow}>
        <Text style={s.totalLabel}>Total</Text>
        <Text style={s.totalValue}>${total.toFixed(2)}</Text>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  summary: {
    backgroundColor: C.card,
    borderRadius: 20,
    padding: 20,
    marginTop: 8,
    borderWidth: 1,
    borderColor: C.border,
  },
  summaryTitle: { fontSize: 16, color: C.text, fontWeight: "700", marginBottom: 16 },
  summaryRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
  summaryLabel: { fontSize: 14, color: C.sub },
  summaryValue: { fontSize: 14, color: C.text, fontWeight: "600" },
  divider: { height: 1, backgroundColor: C.border, marginVertical: 10 },
  totalLabel: { fontSize: 16, color: C.text, fontWeight: "700" },
  totalValue: { fontSize: 20, color: C.primary, fontWeight: "900" },
});
