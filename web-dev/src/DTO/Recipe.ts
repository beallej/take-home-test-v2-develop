import { z } from "zod"
import { IngredientSchema } from "./Ingredient"
export const RecipeSchema = z.object({
    id: z.number(),
    name: z.string().nonempty(),
    timeToCook: z.number().int().positive(),
    numberOfPeople: z.number().int().positive(),
    ingredients: z.array(IngredientSchema),

})

export const RecipeListSchema = z.array(RecipeSchema)

