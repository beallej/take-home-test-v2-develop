import { Box, Button, FormControl, TextField, Select, MenuItem, Modal } from "@mui/material";
import { useState } from "react";
import { CardCustom } from "../Components/CardCustom";
import { useMutationIngredientUpdate } from "../Hooks/Mutation/IngredientsMutation"
import {
  getInvalidRecipesForModifiedIngredient,
} from "../Hooks/Query/IngredientQuery"
import { Recipe } from "../Types/Recipe"
import { isTag, Tag, TAGS_LIST } from "../Types/Tag"
import { Ingredient } from "../Types/Ingredient";
import ConfirmUpdateIngredientDialog from "./ConfirmUpdateIngredientDialog"

export function ModifyIngredientForm({ ingredient, handleClose }: {
  ingredient: Ingredient,
  handleClose: () => void,
}): JSX.Element {
  const { mutateAsync: ModifyIngredient } = useMutationIngredientUpdate();


  const [name, setName] = useState(ingredient.name);
  const [price, setPrice] = useState<number>(ingredient.price);
  const [tag, setTag] = useState<Tag>(ingredient.tag);
  const [invalidRecipes, setInvalidRecipes] = useState<Recipe[]>([]);
  const submitModifyIngredient = async () => {
    setInvalidRecipes([]);
    await ModifyIngredient({
      name,
      price,
      tag,
      id: ingredient.id
    });

    handleClose()
  }
  const handlerSubmitNewIngredient = async () => {
    if (name === undefined || name === "" || price === undefined) {
      alert("Please fill all the fields");
      return;
    }
    const invalidRecipes = await getInvalidRecipesForModifiedIngredient({
      name,
      price,
      tag,
      id: ingredient.id
    });

    if (invalidRecipes.length > 0) {
      console.log(invalidRecipes);
      setInvalidRecipes(invalidRecipes);
    } else {
      await submitModifyIngredient();
    }
  };

  return (
      <Modal
          open={true}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
      >
        <div id="Modify-recipes-form">
          <Box
              display="flex"
              justifyContent="space-between"
              className="MarginTop16Px"
          >
            <CardCustom isSmall>
              <h2>Modify ingredient</h2>
              <FormControl fullWidth margin="normal">
                <TextField
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    id="name-recipe"
                    label="Name of the ingredient"
                    variant="outlined"
                    fullWidth
                />
              </FormControl>
              <FormControl fullWidth margin="normal">
                <TextField
                    value={price}
                    onChange={(e) =>
                        e.target.value ? setPrice(Number(e.target.value)) : setPrice(0)
                    }
                    id="name-recipe"
                    label="price"
                    variant="outlined"
                    type="number"
                    fullWidth
                />
                <span className="SmallTextExplanation">
              *Keep in mind that the price is for one person. Prices are
              multiplied by the number of people in the recipe.
            </span>
              </FormControl>
              <FormControl fullWidth>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={tag}
                    label="Tag"
                    onChange={(e) => isTag(e.target.value) && setTag(e.target.value)}
                >
                  {TAGS_LIST.map(tagItem => <MenuItem key={tagItem.value}
                                                      value={tagItem.value}>{tagItem.label}</MenuItem>)}
                </Select>
              </FormControl>
              <FormControl margin="normal">
                <Button onClick={handleClose} variant="contained">
                  Cancel
                </Button>
              </FormControl>
              <FormControl margin="normal">
                <Button onClick={handlerSubmitNewIngredient} variant="contained">
                  Submit
                </Button>
              </FormControl>
            </CardCustom>
          </Box>
          {invalidRecipes.length > 0 && <ConfirmUpdateIngredientDialog recipes={invalidRecipes} handleOk={submitModifyIngredient} handleCancel={() => setInvalidRecipes([])} />}
        </div>
      </Modal>

  );
}
