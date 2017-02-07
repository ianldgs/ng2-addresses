export class Address {
  id?: number;
  label: string;
  latitude: number;
  longitude: number;
  city?: string;
  zipCode?: string;
  state?: string;
  complement?: string;
  address?: string;
  neighborhood?: string;
  number?: number;
  country: string;
  availableItems?: number[];
}