import { useState } from "react";
import { Box, Button } from "@mui/material";
import { ModifyIngredientForm } from "../Forms/ModifyIngredientForm"
import { useQueryIngredientList } from "../Hooks/Query/IngredientQuery";
import { Loader } from "../Components/Loader";
import { Ingredient } from "../Types/Ingredient"
import { ErrorPage } from "./ErrorPage";
import { IngredientTable } from "../Tables/IngredientsTable";
import { CreateIngredientForm } from "../Forms/CreateIngredientForm";

export function IngredientPage(): JSX.Element {
  const [isCreationMode, setIsCreationMode] = useState(false);
  const [currentIngredient, setCurrentIngredient] = useState<Ingredient | null>()
  const activeCreationMode = () => {
    setIsCreationMode(true);
  };

  const cancelCreationMode = () => {
    setIsCreationMode(false);
  };
  const onClickModifyIngredient = (ingredient: Ingredient) => {
    setCurrentIngredient(ingredient)
  }

  const { data, status, isLoading } = useQueryIngredientList();
  const ingredients = data ?? []

  if (status === "error") {
    return <ErrorPage />;
  }
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div id="recipes-pages">
      <h1>INGREDIENTS</h1>
      <Box>
        <Button
          onClick={isCreationMode ? cancelCreationMode : activeCreationMode}
          variant="outlined"
        >
          {isCreationMode ? "Cancel creation" : "Create new ingredient"}
        </Button>
      </Box>
      <Box display={"flex"} gap={2}>
        {isCreationMode && <CreateIngredientForm />}
        {currentIngredient && <ModifyIngredientForm ingredient={currentIngredient} handleClose={() => setCurrentIngredient(undefined)} />}
        <IngredientTable ingredients={ingredients} onClickModifyIngredient={onClickModifyIngredient} />
      </Box>
    </div>
  );
}
