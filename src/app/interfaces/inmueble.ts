export interface Inmueble {
  id: string;
  title: string;
  description: string;
  address: string;
  department: string;
  city: string;
  latitude: number;
  longitude: number;
  createAt?: Date;
  createdBy?: string;
  updatedAt?: Date;
  updatedBy?: string;
  bathrooms: number;
  bedrooms: number;
  price: number;
}
