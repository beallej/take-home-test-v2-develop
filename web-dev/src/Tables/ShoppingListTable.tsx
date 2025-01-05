import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button } from "@mui/material";
import { ShoppingList } from "../Types/ShoppingList";
import { useNavigate } from "react-router-dom";
import { useMutationShoppingListDelete } from "../Hooks/Mutation/ShoppingListMutation";

export function ShoppingListTable({
  shoppingList,
}: {
  shoppingList: ShoppingList[];
}): JSX.Element {
  const { mutateAsync: deleteRecipe } = useMutationShoppingListDelete();
  const navigate = useNavigate();
  async function handlerButtonDelete(shoppingLit: ShoppingList) {
    await deleteRecipe(shoppingLit.id);
  }

  function handlerRedirectToDetails(shoppingLIst: ShoppingList) {
    navigate(`/shopping-list/${shoppingLIst.id}`);
  }

  return (
    <Box className="table-container">
      <TableContainer component={Paper}>
        <Table className={"table"} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>My shopping lists</TableCell>
              <TableCell>Number of recipes</TableCell>
              <TableCell align="right">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {shoppingList.map((row, index) => (
              <TableRow
                key={`recipe_name${index}`}
                className={"table-row"}
              >
                <TableCell component="th" scope="row">
                  <Button
                    className="mg-r-sm"
                    variant="outlined"
                    color="primary"
                    onClick={() => handlerRedirectToDetails(row)}
                  >
                    Details
                  </Button>
                  {row.name}
                </TableCell>
                <TableCell align="left">
                  {row.recipes ? row.recipes.length : 0}
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
