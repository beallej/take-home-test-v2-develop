import { getRepository } from "typeorm";
import { IngredientDTO } from "../DTO/Ingredient"
import { Ingredient } from "../Entities/Ingredient";

export class IngredientService {
  static async getOne(id: number): Promise<Ingredient | undefined> {
    const ingredient = await getRepository(Ingredient).findOne(id);
    return ingredient;
  }

  static async list(): Promise<Ingredient[]> {
    const ingredient = await getRepository(Ingredient).find();
    return ingredient;
  }

  static async create(ingredientDTO: IngredientDTO): Promise<Ingredient> {
    const newIngredient = await getRepository(Ingredient).save(ingredientDTO);
    return newIngredient;
  }

  static async update(ingredient: Ingredient): Promise<Ingredient> {
    const updatedIngredient = await getRepository(Ingredient).save(ingredient);
    return updatedIngredient;
  }

  static async delete(id: number): Promise<void> {
    await getRepository(Ingredient).delete(id);
  }
}
