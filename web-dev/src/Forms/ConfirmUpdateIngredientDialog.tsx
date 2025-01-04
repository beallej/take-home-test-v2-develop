import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Recipe } from "../Types/Recipe"

export default function ConfirmUpdateIngredientDialog({ recipes, handleOk, handleCancel }: { recipes: Recipe[], handleOk: () => void, handleCancel: () => void }): JSX.Element {
    return (
        <Dialog
            open={true}
            onClose={handleCancel}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Are you sure you want to modify this ingredient ?"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    The following recipes will be invalidated if you modify this ingredient:
                </DialogContentText>
                <DialogContentText>
                    {recipes.map((recipe) => recipe.name).join(', ')}
                </DialogContentText>

            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel}>Cancel</Button>
                <Button onClick={handleOk} autoFocus>
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    );
}