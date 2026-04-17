export interface FoodItem {
  id: string;
  name: string;
  price: number;
  emoji: string;
  imageUrl: string;
  category: string;
  rating: number;
  reviews: number;
  description: string;
  bgColor: string;
  tag?: string;
}

export interface CartItem extends FoodItem {
  quantity: number;
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  desc: string;
  emoji: string;
  bg: string;
}

export interface Category {
  id: string;
  label: string;
  emoji?: string;
}

export interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: FoodItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  cartCount: number;
  cartTotal: number;
  clearCart: () => void;
}

export interface HeaderProps {
  cartCount: number;
}

export interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export interface BannerCarouselProps {
  banners: Banner[];
}

export interface CategoryPillsProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
}

export interface FoodCardProps {
  item: FoodItem;
  onAdd: (item: FoodItem) => void;
  onImageError: (id: string) => void;
}

export interface CartRowProps {
  item: CartItem;
  updateQuantity: (id: string, delta: number) => void;
}

export interface CartSummaryProps {
  cartTotal: number;
  deliveryFee: number;
  total: number;
}
