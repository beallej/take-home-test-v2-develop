import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button } from "@mui/material";
import { Ingredient } from "../Types/Ingredient";
import { useMutationIngredientDelete } from "../Hooks/Mutation/IngredientsMutation";
import { TAGS_OPTIONS } from "../Types/Tag";

export function IngredientTable({
  ingredients,
  onClickModifyIngredient
}: {
  ingredients: Ingredient[];
  onClickModifyIngredient: (ingredient: Ingredient) => void;
}): JSX.Element {
  const { mutateAsync: deleteIngredient } = useMutationIngredientDelete();

  const handlerButtonDelete = async (ingredient: Ingredient) => {
    await deleteIngredient(ingredient.id);
  };
  const handlerButtonModify = (ingredient: Ingredient) => {
    onClickModifyIngredient(ingredient)
  }

  return (
    <Box className="table-container">
      <TableContainer component={Paper}>
        <Table className={"table"} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>My ingredients</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Tag</TableCell>
              <TableCell align="right">Modify</TableCell>
              <TableCell align="right">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ingredients.map((row) => (
              <TableRow
                key={row.name}
                className={"table-row"}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.price} €</TableCell>
                <TableCell align="right">{TAGS_OPTIONS[row.tag]}</TableCell>
                <TableCell align="right">
                  <Button onClick={() => handlerButtonModify(row)}>
                    MODIFY
                  </Button>
                </TableCell>
                <TableCell align="right">
                  <Button onClick={() => handlerButtonDelete(row)}>
                    DELETE
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
