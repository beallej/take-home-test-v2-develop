import { IngredientSchema } from "../DTO/Ingredient"
import { IngredientService } from "../Services/IngredientService";
import { CreateIngredientUseCase } from "../UseCases/ingredients/CreateIngredientUseCase"
import { ModifyIngredientUseCase } from "../UseCases/ingredients/ModifyIngredientUseCase"
import { GetRecipesByIngredientUseCase } from "../UseCases/recipe/GetRecipesByIngredientUseCase"

export class IngredientController {
  public static async list(req: any, res: any, next: any): Promise<void> {
    try {
      const ingredients = await IngredientService.list();
      res.send(ingredients);
    } catch (err) {
      console.error("[IngredientController.list] Error listing recipes", err);
      res.send(500);
    }
  }

  public static async create(req: any, res: any, next: any): Promise<void> {
    try {
      const ingredientDTO = IngredientSchema.parse(req.body)
      const ingredient = await CreateIngredientUseCase.createIngredient(ingredientDTO);
      res.send(ingredient);
    } catch (err) {
      console.error("[IngredientController.create] Error creating ingredient", err);
      res.send(500);
    }
  }

  public static async update(req: any, res: any, next: any): Promise<void> {
    try {
      const { id } = req.params;
      const ingredientDTO = IngredientSchema.parse(req.body)
      const ingredient = await ModifyIngredientUseCase.modifyIngredient(Number(id), ingredientDTO);
      res.send(ingredient);
    } catch (err) {
      console.error("[IngredientController.update] Error updating ingredient", err);
      res.send(500);
    }
  }

  public static async delete(req: any, res: any, next: any): Promise<void> {
    try {
      await IngredientService.delete(req.params.id);
      res.send();
    } catch (err) {
      console.error("[IngredientController.delete] Error deleting ingredient", err);
      res.send(500);
    }
  }
  public static async getRecipes(req: any, res: any, next: any): Promise<void> {
    try {
      const { id } = req.params;
      const recipes = await GetRecipesByIngredientUseCase.getRecipesByIngredient(Number(id));
      res.send(recipes);
    } catch (err) {
      console.error("[IngredientController.update] Error updating ingredient", err);
      res.send(500);
    }
  }

  //getRecipesWithIngredient
}
