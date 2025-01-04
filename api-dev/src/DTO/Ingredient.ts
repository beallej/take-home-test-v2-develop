import { z } from "zod"
import { Tag } from "../Model/Tag"

export const IngredientSchema = z.object({
    name: z.string().nonempty(),
    price: z.number().nonnegative(),
    tag: z.nativeEnum(Tag),
})

export type IngredientDTO = z.infer<typeof IngredientSchema>;
