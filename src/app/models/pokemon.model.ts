export interface Pokemon {
  id: number;
  name: string;
  type: number;  // Pokemon type  id
  image: string;
  power: number;  // between 10 and 100
  life: number;  // between 10 and 100
}
