import { IngredientDTO } from "../DTO/Ingredient"
import { Ingredient } from "../Entities/Ingredient"
import { CreateIngredient } from "../Model/Ingredient"

export const fromIngredientDTOToCreateIngredient = (dto: IngredientDTO): CreateIngredient => {
    return {
        name: dto.name,
        price: dto.price,
        tag: dto.tag,
    }
}
export const fromIngredientDTOToIngredient = (id: number, dto: IngredientDTO): Ingredient => {
    return {
        name: dto.name,
        price: dto.price,
        tag: dto.tag,
        id: id,
    }
}