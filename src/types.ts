export type ProductCategory = 'all' | 'shirts' | 'coats' | 'hats';

export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'JPY';

export interface Product {
  id: string;
  name: string;
  category: 'shirts' | 'coats' | 'hats';
  price: number; // in USD
  originalPrice?: number;
  description: string;
  material: string;
  weightGsm?: number;
  origin: string;
  fit: string;
  image: string;
  secondaryImage?: string;
  availableSizes: string[];
  colors: {
    name: string;
    hex: string;
  }[];
  tag?: string; // e.g. "Signature", "Limited Run", "Archival"
  inStock: boolean;
  stockCount: number;
  details: string[];
}

export interface CartItem {
  id: string; // generated unique key product.id + size + color
  productId: string;
  name: string;
  category: 'shirts' | 'coats' | 'hats';
  price: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
}

export interface LookbookItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  featuredProductIds: string[];
  stylingNote: string;
}

export interface CustomerDetails {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  paymentMethod: 'card' | 'applepay' | 'cod';
  shippingMethod: 'standard' | 'express';
}

export interface OrderConfirmation {
  orderId: string;
  orderDate: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  currency: CurrencyCode;
  customer: CustomerDetails;
  estimatedDelivery: string;
}
