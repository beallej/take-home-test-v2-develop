import { useMemo } from 'react';
import { Ingredient } from "../../Types/Ingredient"
import { OptionsMultiSelectType } from "../../Types/OptionsMultiSelect"

export function useGetIngredientAutocompleteData(data: Ingredient[]) {
    const { options, getIngredients } = useMemo(() => {
        const dataMap: Map<number, Ingredient> = new Map();
        const _options: OptionsMultiSelectType[] = []
        data.forEach((ingredient) => {
            _options.push({
                id: ingredient.id,
                label: ingredient.name,
            });
            dataMap.set(ingredient.id, ingredient);
        })
        const _getIngredients = (values: OptionsMultiSelectType[]): Ingredient[] => {
            return values.map((value) => dataMap.get(value.id)).filter((value) => value !== undefined) as Ingredient[];
        }
        return { options: _options, getIngredients: _getIngredients };
    }, [data])
    return { options, getIngredients };
}