import { z } from "zod"
import { Tag } from "../Types/Tag"

export const IngredientSchema = z.object({
    id: z.number(),
    name: z.string().nonempty(),
    price: z.number().nonnegative(),
    tag: z.nativeEnum(Tag),
})
export const IngredientListSchema = z.array(IngredientSchema)


