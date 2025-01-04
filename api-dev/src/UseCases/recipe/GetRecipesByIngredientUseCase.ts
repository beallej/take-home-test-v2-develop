import { Recipe } from "../../Entities/Recipe";
import { RecipeService } from "../../Services/RecipeService"

export class GetRecipesByIngredientUseCase {

  static async getRecipesByIngredient(id: number): Promise<Recipe[]> {
    return RecipeService.getByIngredient(id)
  }
}
