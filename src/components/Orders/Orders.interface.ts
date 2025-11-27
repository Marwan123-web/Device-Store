export interface Product {
  id: number;
  title: string;
  description: string;
  img: string;
  category: string;
  brand: string;
  price: string;
  rating: string;
  stock: number;
}

export interface OrderItem {
  id: number;
  product: Product;
  quantity: number;
  price: string;
}

export interface Order {
  id: number;
  customerId: number;
  shippingMethodId: number;
  shippingCost: string;
  total: number;
  orderItems: OrderItem[];
  status: string;
  createdAt: string;
  updatedAt: string;
}