import { IngredientDTO } from "../../DTO/Ingredient"
import { Ingredient } from "../../Entities/Ingredient";
import { fromIngredientDTOToIngredient } from "../../Mappers/Ingredient"
import { IngredientService } from "../../Services/IngredientService"

export class ModifyIngredientUseCase {

  static async modifyIngredient(id: number, ingredientDTO: IngredientDTO): Promise<Ingredient> {
    const oldIngredient = await IngredientService.getOne(id)
    if (!oldIngredient) {
      throw new Error("Ingredient does not exist")
    }

    const newIngredient = fromIngredientDTOToIngredient(oldIngredient.id, ingredientDTO)
    return await IngredientService.update(newIngredient)
  }
}
