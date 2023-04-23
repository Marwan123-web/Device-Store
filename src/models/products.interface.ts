export interface ProductI {
  brand: string;
  category: string;
  description: string;
  id: string | number;
  img: string;
  price: string;
  rating: string;
  title: string;
  quantity: number;
}

export interface ProductsI {
  products: Array<ProductI>;
}
