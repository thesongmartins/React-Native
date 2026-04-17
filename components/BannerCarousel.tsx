import React from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { C } from "../constants/Colors";
import { Layout } from "../constants/Layout";
import { BannerCarouselProps } from "../types";

export function BannerCarousel({ banners }: BannerCarouselProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={s.bannerScroll}
      contentContainerStyle={s.bannerContent}
    >
      {banners.map((b) => (
        <TouchableOpacity
          key={b.id}
          style={[s.banner, { backgroundColor: b.bg }]}
          activeOpacity={0.88}
        >
          <View style={s.bannerInner}>
            <View>
              <Text style={s.bannerTitle}>{b.title}</Text>
              <Text style={s.bannerSub}>{b.subtitle}</Text>
              <Text style={s.bannerDesc}>{b.desc}</Text>
              <View style={s.bannerCta}>
                <Text style={s.bannerCtaText}>Order Now →</Text>
              </View>
            </View>
            <Text style={s.bannerEmoji}>{b.emoji}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const s = StyleSheet.create({
  bannerScroll: { marginTop: 24 },
  bannerContent: { paddingHorizontal: 20, gap: 14 },
  banner: { width: Layout.window.width * 0.72, borderRadius: 22, overflow: "hidden" },
  bannerInner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },
  bannerTitle: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "900",
    letterSpacing: -0.6,
  },
  bannerSub: {
    fontSize: 14,
    color: "rgba(255,255,255,0.9)",
    fontWeight: "600",
    marginTop: 3,
  },
  bannerDesc: { fontSize: 11, color: "rgba(255,255,255,0.65)", marginTop: 3 },
  bannerCta: {
    backgroundColor: "rgba(255,255,255,0.22)",
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    marginTop: 12,
    alignSelf: "flex-start",
  },
  bannerCtaText: { fontSize: 12, color: "#fff", fontWeight: "700" },
  bannerEmoji: { fontSize: 54, marginLeft: 8 },
});
