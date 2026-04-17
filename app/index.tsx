import React, { useState, useCallback, useMemo } from "react";
import { View, Text, ScrollView, StyleSheet, StatusBar } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useCart } from "@/context/CartContext";
import { FoodItem } from "@/types";

// Constants
import { C } from "../constants/Colors";
import { CATEGORIES, FOOD_ITEMS, BANNERS } from "../constants/FoodData";
import { Layout } from "../constants/Layout";

// Components
import { Header } from "../components/Header";
import { SearchBar } from "../components/SearchBar";
import { BannerCarousel } from "../components/BannerCarousel";
import { CategoryPills } from "../components/CategoryPills";
import { FoodCard } from "../components/FoodCard";

export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [failedIds, setFailedIds] = useState<Set<string>>(new Set());
  const { cartCount, addToCart } = useCart();
  const insets = useSafeAreaInsets();

  // Remove any item whose image failed to load
  const handleImageError = useCallback((id: string) => {
    setFailedIds((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  }, []);

  const filteredItems = useMemo(() => {
    return FOOD_ITEMS.filter((item) => {
      if (failedIds.has(item.id)) return false;
      const matchCat =
        selectedCategory === "all" || item.category === selectedCategory;
      const matchSearch = item.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchQuery, failedIds]);

  const rows = useMemo(() => {
    const r: FoodItem[][] = [];
    for (let i = 0; i < filteredItems.length; i += 2) {
      r.push(filteredItems.slice(i, i + 2));
    }
    return r;
  }, [filteredItems]);

  return (
    <View style={[s.root, { paddingTop: insets.top }]}>
      <StatusBar barStyle="light-content" backgroundColor={C.bg} translucent />

      <Header cartCount={cartCount} />

      <ScrollView
        style={s.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={s.scrollContent}
      >
        {/* Greeting */}
        <View style={s.greetBox}>
          <Text style={s.greetTitle}>What are you{"\n"}craving today?</Text>
        </View>

        {/* Search */}
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        {/* Promo Banners */}
        <BannerCarousel banners={BANNERS} />

        {/* Categories */}
        <CategoryPills
          categories={CATEGORIES}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* Section Header */}
        <View style={s.sectionRow}>
          <Text style={s.sectionTitle}>
            {selectedCategory === "all"
              ? "All Items"
              : CATEGORIES.find((c) => c.id === selectedCategory)?.label}
          </Text>
          <Text style={s.sectionCount}>{filteredItems.length} items</Text>
        </View>

        {/* Food Grid */}
        {rows.length === 0 ? (
          <View style={s.empty}>
            <Text style={s.emptyIcon}>🔍</Text>
            <Text style={s.emptyTitle}>Nothing found</Text>
            <Text style={s.emptySub}>Try a different search or category</Text>
          </View>
        ) : (
          rows.map((row, idx) => (
            <View key={idx} style={s.row}>
              {row.map((item) => (
                <FoodCard
                  key={item.id}
                  item={item}
                  onAdd={addToCart}
                  onImageError={handleImageError}
                />
              ))}
              {row.length === 1 && (
                <View style={{ width: Layout.CARD_WIDTH }} />
              )}
            </View>
          ))
        )}

        <View style={{ height: insets.bottom + 16 }} />
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: C.bg,
  },
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 8 },

  // Greeting
  greetBox: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 18 },
  greetTitle: {
    fontSize: 26,
    color: C.text,
    fontWeight: "800",
    lineHeight: 34,
    letterSpacing: -0.4,
  },

  // Section
  sectionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 28,
    marginBottom: 16,
  },
  sectionTitle: { fontSize: 19, color: C.text, fontWeight: "700" },
  sectionCount: { fontSize: 13, color: C.sub },

  // Grid
  row: {
    flexDirection: "row",
    paddingHorizontal: 16,
    gap: 16,
    marginBottom: 16,
  },

  // Empty
  empty: { alignItems: "center", paddingVertical: 56, paddingHorizontal: 40 },
  emptyIcon: { fontSize: 52, marginBottom: 14 },
  emptyTitle: {
    fontSize: 18,
    color: C.text,
    fontWeight: "700",
    marginBottom: 6,
  },
  emptySub: { fontSize: 14, color: C.sub, textAlign: "center" },
});
