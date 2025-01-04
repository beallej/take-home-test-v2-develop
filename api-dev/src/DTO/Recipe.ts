import { z } from "zod"
export const RecipeSchema = z.object({
    name: z.string().nonempty(),
    timeToCook: z.number().int().positive(),
    numberOfPeople: z.number().int().positive(),
    ingredients: z.array(z.number()),

})

export type RecipeDTO = z.infer<typeof RecipeSchema>;
