import { Ingredient } from "../Types/Ingredient"
import { Tag } from "../Types/Tag"
export const areRecipeIngredientsValid = (ingredients: Ingredient[]): boolean => {
    const proteins = ingredients.filter((ingredient) => ingredient.tag === Tag.PROTEINE).length;
    const feculents = ingredients.filter((ingredient) => ingredient.tag === Tag.FECULENT).length;
    return proteins <= 1 && feculents === 1;
}