export type ProductCategory = 
  | 'All'
  | 'Apparel'
  | 'Drinkware'
  | 'Bags & Backpacks'
  | 'Accessories'
  | 'Stationery'
  | 'Collections'
  | 'Sale';

export type ProductBrand = 
  | 'Google'
  | 'Google 1998'
  | 'YouTube'
  | 'Android'
  | 'Google Cloud'
  | 'Chrome'
  | 'Pixel';

export type ItemType =
  | 'Sweatshirts & Hoodies'
  | 'T-Shirts'
  | 'Jackets & Outerwear'
  | 'Pants & Shorts'
  | 'Hats & Headwear'
  | 'Socks'
  | 'Bottles & Tumblers'
  | 'Mugs'
  | 'Backpacks & Totes'
  | 'Pins & Patches'
  | 'Journals & Pens'
  | 'Plush & Toys'
  | 'Tech Accessories';

export type ProductSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | '2XL' | '3XL' | 'One Size';

export interface ProductColor {
  name: string;
  hex: string;
  image?: string;
}

export interface SizeStock {
  size: ProductSize;
  available: number;
}

export interface ProductReview {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  sizePurchased?: string;
  fitFeedback?: 'Runs small' | 'True to size' | 'Runs large';
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  price: number;
  compareAtPrice?: number;
  category: ProductCategory;
  subcategory?: string;
  brand: ProductBrand;
  itemType: ItemType;
  sku: string;
  description: string;
  shortDescription: string;
  details: string[];
  materials: string;
  careInstructions: string;
  sustainabilityNote: string;
  images: string[];
  colors: ProductColor[];
  sizes: ProductSize[];
  stockBySize: SizeStock[];
  rating: number;
  reviewCount: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  isRetro1998?: boolean;
  isEcoFriendly?: boolean;
  isKids?: boolean;
  inStock: boolean;
  featuredCollection?: string;
  badge?: string;
  reviews?: ProductReview[];
}

export interface CartItem {
  id: string; // unique cart item id (product.id + size + color)
  productId: string;
  product: Product;
  selectedSize: ProductSize;
  selectedColor: ProductColor;
  quantity: number;
  priceAtAddition: number;
}

export interface WishlistItem {
  productId: string;
  addedAt: string;
}

export interface PromoCode {
  code: string;
  discountType: 'percentage' | 'fixed' | 'free_shipping';
  value: number;
  description: string;
  minSpend?: number;
}

export type CurrencyCode = 'USD' | 'INR' | 'EUR' | 'GBP' | 'CAD' | 'JPY' | 'AUD';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  rate: number; // relative to USD
  flag: string;
  name: string;
}

export interface ShippingOption {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDays: string;
}

export interface CheckoutFormData {
  email: string;
  newsletterOptIn: boolean;
  firstName: string;
  lastName: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  shippingOptionId: string;
  paymentMethod: 'card' | 'gpay' | 'paypal';
  cardNumber: string;
  cardExpMonth: string;
  cardExpYear: string;
  cardCvv: string;
  cardName: string;
  billingSameAsShipping: boolean;
}

export interface OrderConfirmation {
  orderNumber: string;
  date: string;
  customer: {
    name: string;
    email: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  items: CartItem[];
  subtotal: number;
  discountAmount: number;
  shippingAmount: number;
  taxAmount: number;
  total: number;
  currency: CurrencyCode;
  shippingMethod: string;
  estimatedDeliveryDate: string;
  status: 'Processing' | 'Preparing to Ship' | 'Shipped' | 'Out for Delivery' | 'Delivered';
  trackingNumber: string;
}
