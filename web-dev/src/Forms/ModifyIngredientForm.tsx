import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { CardCustom, CardCustomVariant } from "../Components/Card/CardCustom";
import { useMutationIngredientUpdate } from "../Hooks/Mutation/IngredientsMutation"
import { getInvalidRecipesForModifiedIngredient, } from "../Hooks/Query/IngredientQuery"
import { Ingredient } from "../Types/Ingredient";
import { Recipe } from "../Types/Recipe"
import { isTag, Tag, TAGS_LIST } from "../Types/Tag"
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
        <div id="modify-ingredient-form" className={"modal"}>
          <Box
              className="form-box"
          >
            <CardCustom variant={CardCustomVariant.SMALL}>
              <Typography variant="h2">Modify ingredient</Typography>
              <div className={"form-body"}>
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
                      label="Price"
                      variant="outlined"
                      type="number"
                      fullWidth
                  />
                  <span className="text-detail-explanation">
                *Keep in mind that the price is for one person. Prices are
                multiplied by the number of people in the recipe.
              </span>
                </FormControl>
                <FormControl fullWidth margin={"normal"}>
                  <InputLabel id="select-label">Tag</InputLabel>
                  <Select
                      labelId="select-label"
                      value={tag}
                      label="Tag"
                      onChange={(e) => isTag(e.target.value) && setTag(e.target.value)}
                  >
                    {TAGS_LIST.map(tagItem => <MenuItem key={tagItem.value}
                                                        value={tagItem.value}>{tagItem.label}</MenuItem>)}
                  </Select>
                </FormControl>
              </div>
                <FormControl margin="normal">
                  <Button onClick={handleClose} variant="contained" className={"mg-r-sm"}>
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
