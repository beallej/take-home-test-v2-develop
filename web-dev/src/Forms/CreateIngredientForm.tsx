import { Box, Button, FormControl, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { CardCustom, CardCustomVariant } from "../Components/Card/CardCustom";
import { useMutationIngredientCreate } from "../Hooks/Mutation/IngredientsMutation";
import { isTag, Tag, TAGS_LIST } from "../Types/Tag"

export function CreateIngredientForm(): JSX.Element {
  const { mutateAsync: createIngredient } = useMutationIngredientCreate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [tag, setTag] = useState<Tag | ''>('');

  const resetFields = () => {
    setName("");
    setPrice(0);
    setTag('');
  };

  const handlerSubmitNewIngredient = async () => {
    if (name === undefined || name === "" || price === undefined || tag === '') {
      alert("Please fill all the fields");
      return;
    }
    await createIngredient({
      name,
      price,
      tag
    });

    resetFields();
  };

  return (
    <div id="create-recipes-form">
      <Box
        className="form-box"
      >
        <CardCustom variant={CardCustomVariant.SMALL}>
          <Typography variant="h2">New ingredient</Typography>
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
            <span className="text-detail-explanation">
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
              {TAGS_LIST.map(tagItem => <MenuItem key={tagItem.value} value={tagItem.value}>{tagItem.label}</MenuItem>)}
            </Select>
          </FormControl>
          <FormControl margin="normal">
            <Button onClick={handlerSubmitNewIngredient} variant="contained">
              Submit
            </Button>
          </FormControl>
        </CardCustom>
      </Box>
    </div>
  );
}
