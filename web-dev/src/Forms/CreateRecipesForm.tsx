import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { CardCustom } from "../Components/CardCustom";
import { Loader } from "../Components/Loader";
import { useGetIngredientAutocompleteData } from "../Hooks/Display/useGetIngredientAutocompleteData"
import { useMutationRecipeCreate } from "../Hooks/Mutation/RecipeMutation";
import { useQueryIngredientList } from "../Hooks/Query/IngredientQuery";
import { ErrorPage } from "../Pages/ErrorPage";
import { OptionsMultiSelectType } from "../Types/OptionsMultiSelect";
import { areRecipeIngredientsValid } from "../Utils/validations"

export function CreateRecipesForm(): JSX.Element {
  const [name, setName] = useState("");
  const [timeToCook, setTimeToCook] = useState<number>(0);
  const [numberOfPeople, setNumberOfPeople] = useState<number>(0);
  const [selectedIngredients, setSelectedIngredients] = useState<
    OptionsMultiSelectType[]
  >([]);
  const { mutateAsync: createRecipe } = useMutationRecipeCreate();
  const { data: _ingredients, status, isLoading } = useQueryIngredientList();
  const ingredients = _ingredients ?? []

  const { options, getIngredients } = useGetIngredientAutocompleteData(ingredients);
  const resetFields = () => {
    setName("");
    setTimeToCook(0);
    setNumberOfPeople(0);
    setSelectedIngredients([]);
  };

  const isValidRecipe = name !== "" && timeToCook > 0 && numberOfPeople > 0 && areRecipeIngredientsValid(getIngredients(selectedIngredients));
  const handlerSubmitNewRecipe = async () => {
    if (!name || !timeToCook || !numberOfPeople || !selectedIngredients || !areRecipeIngredientsValid(getIngredients(selectedIngredients))) {
        alert("Recipe is not valid");
        return;
    }

    await createRecipe({
      name,
      timeToCook,
      numberOfPeople,
      ingredients: selectedIngredients.map((e) => e.id),
    });

    resetFields();
  };

  if (status === "error") {
    return <ErrorPage />;
  }
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div id="create-recipes-form">
      <Box
        display="flex"
        justifyContent="space-between"
        className="MarginTop16Px"
      >
        <CardCustom isSmall>
          <h2>New recipe</h2>
          <FormControl fullWidth margin="normal">
            <TextField
              id="name-recipe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              label="Name of the recipe"
              variant="outlined"
              fullWidth
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            {/* on peut mettre plusieurs fois le même ingrédient dans le formulaire mais après ça l'enregistre qu'une fois*/}
            <Autocomplete
              onChange={(_e, value: OptionsMultiSelectType[]) => {
                setSelectedIngredients(value);
              }}
              value={selectedIngredients}
              multiple
              id="combo-box-demo"
              options={options}
              renderInput={(params: any) => (
                <TextField {...params} label="Ingredients" />
              )}
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField
              value={timeToCook}
              onChange={(e) =>
                e.target.value
                  ? setTimeToCook(Number(e.target.value))
                  : setTimeToCook(0)
              }
              id="name-recipe"
              label="Time to cook"
              variant="outlined"
              type="number"
              fullWidth
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField
              value={numberOfPeople}
              onChange={(e) =>
                e.target.value
                  ? setNumberOfPeople(Number(e.target.value))
                  : setNumberOfPeople(0)
              }
              id="name-recipe"
              label="Number of people"
              variant="outlined"
              type="number"
              fullWidth
            />
          </FormControl>
          <FormControl margin="normal">
            <Button disabled={!isValidRecipe} onClick={handlerSubmitNewRecipe} variant="contained">
              Submit
            </Button>
          </FormControl>
        </CardCustom>
      </Box>
    </div>
  );
}
