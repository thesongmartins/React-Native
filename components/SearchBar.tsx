import React from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { C } from "../constants/Colors";
import { SearchBarProps } from "../types";

export function SearchBar({ searchQuery, setSearchQuery }: SearchBarProps) {
  return (
    <View style={s.searchBox}>
      <Ionicons
        name="search-outline"
        size={18}
        color={C.sub}
        style={{ marginRight: 10 }}
      />
      <TextInput
        style={s.searchInput}
        placeholder="Search dishes, restaurants..."
        placeholderTextColor={C.sub}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      {searchQuery.length > 0 && (
        <TouchableOpacity onPress={() => setSearchQuery("")}>
          <Ionicons name="close-circle" size={18} color={C.sub} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const s = StyleSheet.create({
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: C.card,
    borderRadius: 16,
    marginHorizontal: 20,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: C.border,
  },
  searchInput: { flex: 1, fontSize: 14, color: C.text, padding: 0 },
});
