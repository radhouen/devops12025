export interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
  photoUrl?: string;
  createdDate?: string;
  lastModifiedDate?: string;
}

export interface ProductRequest {
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
}
