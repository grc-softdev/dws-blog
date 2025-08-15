import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type Order = "newest" | "oldest";

type FiltersState = {
  order: Order;
  searchTerm: string;
  selectedCategory: string | null;
  selectedAuthor: string | null;
};

const initialState: FiltersState = {
  order: "newest",
  searchTerm: "",
  selectedCategory: null,
  selectedAuthor: null,
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setOrder(state, action: PayloadAction<Order>) {
      state.order = action.payload;
    },
    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
    },
    setCategory(state, action: PayloadAction<string | null>) {
      state.selectedCategory = action.payload;
    },
    setAuthor(state, action: PayloadAction<string | null>) {
      state.selectedAuthor = action.payload;
    },
    clearFilters(state) {
      state.selectedAuthor = null;
      state.selectedCategory = null;
      state.searchTerm = "";
      state.order = "newest";
    },
  },
});

export const { setOrder, setSearchTerm, setCategory, setAuthor, clearFilters } =
  filtersSlice.actions;
export default filtersSlice.reducer;
