import { Tag } from "./Tag"

export interface CreateIngredient {
    name: string;
    price: number;
    tag: Tag;
}