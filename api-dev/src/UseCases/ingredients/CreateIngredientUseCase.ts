import { IngredientDTO } from "../../DTO/Ingredient"
import { Ingredient } from "../../Entities/Ingredient";
import { fromIngredientDTOToCreateIngredient } from "../../Mappers/Ingredient"
import { IngredientService } from "../../Services/IngredientService"

export class CreateIngredientUseCase {

  static async createIngredient(ingredient: IngredientDTO): Promise<Ingredient> {
    return await IngredientService.create(fromIngredientDTOToCreateIngredient(ingredient))

  }
}
