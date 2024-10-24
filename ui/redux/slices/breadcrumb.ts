import { BreadcrumbItem } from "@/components/ui/simple/breadcrumb";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const breadcrumbSlice = createSlice({
  name: "breadcrumb",
  initialState: {
    items: [] as BreadcrumbItem[],
  },
  reducers: {
    setBreadcrumb: (state, action: PayloadAction<BreadcrumbItem[]>) => {
      state.items = action.payload;
    },
    pushBreadcrumb: (state, action: PayloadAction<BreadcrumbItem>) => {
      state.items.push(action.payload);
    },
  },
});
const {
  reducer: BreadcrumbReducer,
  actions: { setBreadcrumb, pushBreadcrumb },
} = breadcrumbSlice;

export { pushBreadcrumb, setBreadcrumb };
export default BreadcrumbReducer;
