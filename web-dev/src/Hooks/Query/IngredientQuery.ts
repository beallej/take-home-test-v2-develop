import { useQuery, UseQueryResult, QueryClient } from "react-query";
import { IngredientListSchema } from "../../DTO/Ingredient"
import { RecipeListSchema } from "../../DTO/Recipe"
import { Ingredient } from "../../Types/Ingredient";
import { Recipe } from "../../Types/Recipe"
import axios from "../../Utils/axios";
import { areRecipeIngredientsValid } from "../../Utils/validations"
import { Requests } from "../QueriesAndMutationList";

export const useQueryIngredientList = (): UseQueryResult<Ingredient[], unknown> => {
  return useQuery([Requests.listIngredient], async (): Promise<Ingredient[]> => {
    const { data } = await axios.get<{ data: any }>(
      "/ingredient/list"
    );
    const ingredientList = IngredientListSchema.parse(data)
    return ingredientList ?? [];
  }, {placeholderData: []});
};

const isRecipeValidWithNewIngredient = (recipe: Recipe, ingredient: Ingredient): boolean => {
  const recipeIngredients = recipe.ingredients.map((recipeIngredient) => {
    if (recipeIngredient.id === ingredient.id) {
      return ingredient;
    }
    return recipeIngredient;
  })
  return areRecipeIngredientsValid(recipeIngredients);

}
export const getInvalidRecipesForModifiedIngredient = async (ingredient: Ingredient): Promise<Recipe[]> => {
  const queryClient = new QueryClient()
  const recipeList = await queryClient.fetchQuery(
      [Requests.getRecipesWithIngredient, ingredient],
      async (): Promise<Recipe[]> => {
        const {data} = await axios.get<{ data: Recipe[] }>(
            `/ingredient/${ingredient.id}/recipes`,
        )
        return RecipeListSchema.parse(data)
      }
  )
  return recipeList.filter(recipe => !isRecipeValidWithNewIngredient(recipe, ingredient)) ?? [];
}
