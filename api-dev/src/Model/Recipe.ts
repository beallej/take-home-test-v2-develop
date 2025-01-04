import { Ingredient } from "../Entities/Ingredient"

export interface CreateRecipe {
    name: string;
    timeToCook: number;
    numberOfPeople: number;
    ingredients: Ingredient[];
}