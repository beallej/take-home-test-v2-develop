import { RecipeSchema } from "../DTO/Recipe"
import { RecipeService } from "../Services/RecipeService";
import { CreateRecipeUseCase } from "../UseCases/recipe/CreateRecipeUseCase"

export class RecipeController {
  public static async list(req: any, res: any, next: any): Promise<void> {
    try {
      const recipes = await RecipeService.list();
      res.send(recipes);
    } catch (err) {
      console.error("[RecipeController.list] Error listing recipes", err);
      res.send(500);
    }
  }

  public static async create(req: any, res: any, next: any): Promise<void> {
    try {
      const recipeDTO = RecipeSchema.parse(req.body)
      const recipe = await CreateRecipeUseCase.createRecipe(recipeDTO);
      res.send(recipe);
    } catch (err) {
      console.error("[RecipeController.create] Error creating recipe", err);
      res.send(500);
    }
  }

  public static async update(req: any, res: any, next: any): Promise<void> {
    try {
      const recipe = await RecipeService.update(req.body);
      res.send(recipe);
    } catch (err) {
      console.error("[RecipeController.update] Error updating recipe", err);
      res.send(500);
    }
  }

  public static async delete(req: any, res: any, next: any): Promise<void> {
    try {
      await RecipeService.delete(req.params.id);
      res.send();
    } catch (err) {
      console.error("[RecipeController.delete] Error deleting recipe", err);
      res.send(500);
    }
  }
}
