import React from "react";
import { Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { C } from "../constants/Colors";
import { CategoryPillsProps } from "../types";

export function CategoryPills({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryPillsProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={s.catScroll}
      contentContainerStyle={s.catContent}
    >
      {categories.map((cat) => (
        <TouchableOpacity
          key={cat.id}
          style={[
            s.catPill,
            selectedCategory === cat.id && s.catPillActive,
          ]}
          onPress={() => onSelectCategory(cat.id)}
          activeOpacity={0.8}
        >
          <Text style={s.catEmoji}>{cat.emoji}</Text>
          <Text
            style={[
              s.catLabel,
              selectedCategory === cat.id && s.catLabelActive,
            ]}
          >
            {cat.label}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const s = StyleSheet.create({
  catScroll: { marginTop: 24 },
  catContent: { paddingHorizontal: 20, gap: 10 },
  catPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: C.card,
    borderRadius: 50,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: C.border,
    gap: 7,
  },
  catPillActive: { backgroundColor: C.primary, borderColor: C.primary },
  catEmoji: { fontSize: 16 },
  catLabel: { fontSize: 13, color: C.sub, fontWeight: "600" },
  catLabelActive: { color: C.text },
});
