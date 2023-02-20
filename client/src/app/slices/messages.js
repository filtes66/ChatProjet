import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessage: (state, action) => {
      // Redux Toolkit nous permet d'écrire une logique "mutante" dans les réducteurs. Il
      // ne modifie pas réellement l'état car il utilise la bibliothèque Immer,
      // qui détecte les changements d'un "état préliminaire" et produit un tout nouveau
      // immuable basé sur ces changements

      return { message: action.payload };
    },
    clearMessage: () => {
      return { message: "" };
    },
  },
});

const { reducer, actions } = messageSlice;

export const { setMessage, clearMessage } = actions
export default reducer;