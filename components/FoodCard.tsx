import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { C } from "../constants/Colors";
import { Layout } from "../constants/Layout";
import { FoodCardProps } from "../types";

export function FoodCard({ item, onAdd, onImageError }: FoodCardProps) {
  const [flash, setFlash] = useState(false);

  const handleAdd = () => {
    onAdd(item);
    setFlash(true);
    setTimeout(() => setFlash(false), 250);
  };
  return (
    <View style={[s.card, { width: Layout.CARD_WIDTH }]}>
      {/* Photo */}
      <View style={[s.cardImg, { backgroundColor: item.bgColor }]}>
        <Image
          source={{ uri: item.imageUrl }}
          style={StyleSheet.absoluteFillObject}
          resizeMode="cover"
          onError={() => onImageError(item.id)}
        />
        <View style={s.cardImgOverlay} />
        {item.tag && (
          <View style={s.tag}>
            <Text style={s.tagText}>{item.tag}</Text>
          </View>
        )}
      </View>

      {/* Info */}
      <View style={s.cardBody}>
        <Text style={s.cardName} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={s.cardDesc} numberOfLines={1}>
          {item.description}
        </Text>
        <View style={s.cardRatingRow}>
          <Ionicons name="star" size={11} color={C.accent} />
          <Text style={s.cardRating}>{item.rating}</Text>
          <Text style={s.cardReviews}>({item.reviews})</Text>
        </View>
        <View style={s.cardFooter}>
          <Text style={s.cardPrice}>${item.price.toFixed(2)}</Text>
          <TouchableOpacity
            style={[s.addBtn, flash && s.addBtnFlash]}
            onPress={handleAdd}
            activeOpacity={0.75}
          >
            <Ionicons name="add" size={20} color={flash ? C.primary : C.text} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  card: {
    backgroundColor: C.card,
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: C.border,
  },
  cardImg: { height: 148, justifyContent: "center", alignItems: "center" },
  cardImgOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.18)",
  },
  tag: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "rgba(0,0,0,0.55)",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  tagText: { fontSize: 10, color: C.accent, fontWeight: "700" },
  cardBody: { padding: 12 },
  cardName: { fontSize: 14, color: C.text, fontWeight: "700", marginBottom: 2 },
  cardDesc: { fontSize: 11, color: C.sub, marginBottom: 5 },
  cardRatingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    marginBottom: 8,
  },
  cardRating: { fontSize: 12, color: C.accent, fontWeight: "600" },
  cardReviews: { fontSize: 11, color: C.sub },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardPrice: { fontSize: 16, color: C.primary, fontWeight: "900" },
  addBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: C.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  addBtnFlash: {
    backgroundColor: C.card,
    borderWidth: 1.5,
    borderColor: C.primary,
  },
});
