import { useMutation, UseMutationResult, useQueryClient } from "react-query";
import axios from "../../Utils/axios";
import { Requests } from "../QueriesAndMutationList";

export const useMutationIngredientCreate = (): UseMutationResult<
  any,
  unknown,
  { name: string; price: number }
> => {
  const clientQuery = useQueryClient();

  return useMutation(
    [Requests.createIngredient],
    async ({ name, price }: { name: string; price: number }) => {
      return await axios.post(`/ingredient/create`, {
        name,
        price,
      });
    },
    {
      onSuccess: () => {
        clientQuery.invalidateQueries(Requests.listIngredient);
      },
    }
  );
};

export const useMutationIngredientUpdate = (): UseMutationResult<
    any,
    unknown,
    { name: string; price: number, tag: Tag, id: number }
> => {
  const clientQuery = useQueryClient();

  return useMutation(
      [Requests.updateIngredient],
      async ({ name, price, tag, id }: { name: string; price: number, tag: Tag, id: number }) => {
        return await axios.put(`/ingredient/update/${id.toString()}`, {
          name,
          price,
          tag,
        });
      },
      {
        onSuccess: () => {
          clientQuery.invalidateQueries(Requests.listIngredient);
        },
      }
  );
};

export const useMutationIngredientDelete = (): UseMutationResult<
  any,
  unknown,
  number
> => {
  const clientQuery = useQueryClient();

  return useMutation(
    [Requests.deleteIngredient],
    async (id: number) => {
      return await axios.delete(`/ingredient/delete/${id}`);
    },
    {
      onSuccess: () => {
        clientQuery.invalidateQueries(Requests.listIngredient);
      },
    }
  );
};
