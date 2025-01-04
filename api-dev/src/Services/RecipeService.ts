import { getRepository } from "typeorm";
import { Recipe } from "../Entities/Recipe";
import { CreateRecipe } from "../Model/Recipe"

export class RecipeService {
  static async list(): Promise<Recipe[]> {
    const recipes = await getRepository(Recipe).find({
      relations: ["ingredients"],
    });
    return recipes;
  }

  static async create(recipe: CreateRecipe): Promise<Recipe> {
    const newRecipe = await getRepository(Recipe).save(recipe);
    return newRecipe;
  }

  static async update(recipe: Recipe): Promise<Recipe> {
    const updatedRecipe = await getRepository(Recipe).save(recipe);
    return updatedRecipe;
  }

  static async delete(id: number): Promise<void> {
    await getRepository(Recipe).delete(id);
  }

  static async getByIngredient(ingredientId: number): Promise<Recipe[]> {
    return getRepository(Recipe)
        .createQueryBuilder('recipe')
        .leftJoin('recipe.ingredients', 'ingredient')
        .where('ingredient.id = :id', { id: ingredientId })
        .leftJoinAndSelect('recipe.ingredients', 'ingredients')
        .getMany();

  }
}
