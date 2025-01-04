import { Tag } from "./Tag"

export interface Ingredient {
  id: number;
  name: string;
  price: number;
  tag: Tag;
}