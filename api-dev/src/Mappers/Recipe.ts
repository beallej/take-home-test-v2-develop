import { RecipeDTO } from "../DTO/Recipe"
import { Ingredient } from "../Entities/Ingredient"
import { CreateRecipe } from "../Model/Recipe"

export const fromCreateRecipeDTOToCreateRecipe = (dto: RecipeDTO, ingredients: Ingredient[]): CreateRecipe => {
    return {
        name: dto.name,
        timeToCook: dto.timeToCook,
        numberOfPeople: dto.numberOfPeople,
        ingredients: ingredients,
    }
}