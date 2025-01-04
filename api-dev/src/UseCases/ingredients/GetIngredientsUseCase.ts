import { getRepository, In } from "typeorm";
import { Ingredient } from "../../Entities/Ingredient";

export class GetIngredientsUseCase {

  static async getIngredients(ingredientIds: number[]): Promise<Ingredient[]> {
    return await getRepository(Ingredient).find({
      where: { id: In(ingredientIds) },
    });

  }
}
