export interface Inmueble {
  _id?: string;
  title: string;
  description: string;
  address: string;
  department: string;
  city: string;
  latitude: number;
  longitude: number;
  createdAt?: Date;
  createdBy?: string;
  updatedAt?: Date;
  updatedBy?: string;
  bathrooms: number;
  bedrooms: number;
  closet?: number;
  price: number;
}
