import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type Order = "newest" | "oldest";

type FiltersState = {
  order: Order;
  searchTerm: string;
  selectedCategories: string[];
  selectedAuthor: string | null;
};

const initialState: FiltersState = {
  order: "newest",
  searchTerm: "",
  selectedCategories: [],
  selectedAuthors: [],
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
    toggleCategory(state, action: PayloadAction<string>) {
      const categoryId = action.payload;
      if (state.selectedCategories.includes(categoryId)) {
        state.selectedCategories = state.selectedCategories.filter(
          (id) => id !== categoryId
        );
      }  else {
        state.selectedCategories.push(categoryId);
      } 
      
    },
    setCategories(state, action: PayloadAction<string[]>) {
      state.selectedCategories = action.payload;
    },
    setAuthors(state, action: PayloadAction<string | null>) {
      state.selectedAuthors = action.payload;
    },
    clearFilters(state) {
      state.selectedAuthors = [];
      state.selectedCategories = [];
      state.searchTerm = "";
      state.order = "newest";
    }
  },
});

export const { setOrder, setSearchTerm, toggleCategory, setCategories, setAuthors, clearFilters } = filtersSlice.actions;
export default filtersSlice.reducer;