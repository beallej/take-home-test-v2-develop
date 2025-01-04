import { RecipeDTO } from "../../DTO/Recipe"
import { Recipe } from "../../Entities/Recipe";
import { fromCreateRecipeDTOToCreateRecipe } from "../../Mappers/Recipe"
import { Tag } from "../../Model/Tag"
import { RecipeService } from "../../Services/RecipeService"
import { GetIngredientsUseCase } from "../ingredients/GetIngredientsUseCase"
import { GetRecipesByIngredientUseCase } from "./GetRecipesByIngredientUseCase"

export class CreateRecipeUseCase {

  static async createRecipe(createRecipeDTO: RecipeDTO): Promise<Recipe> {


    //Verify validity of ingredients
    const ingredients = await GetIngredientsUseCase.getIngredients(createRecipeDTO.ingredients)
    const proteins = ingredients.filter(ingredient => ingredient.tag === Tag.PROTEINE)
    const feculents = ingredients.filter(ingredient => ingredient.tag === Tag.FECULENT)
    if (proteins.length > 1 || feculents.length !== 1) {
      throw new Error("Must have one feculent and maximum one protein")
    }
    const protein = proteins.length > 0 ? proteins[0] : undefined
    if (protein) {
      const otherRecipesWithProteinIngredient = await GetRecipesByIngredientUseCase.getRecipesByIngredient(protein.id)
      if (otherRecipesWithProteinIngredient.length > 0) {
        throw new Error("Protein already in another recipe")
      }
    }
    const createRecipeDomainObj = fromCreateRecipeDTOToCreateRecipe(createRecipeDTO, ingredients)
    return await RecipeService.create(createRecipeDomainObj)

  }
}
