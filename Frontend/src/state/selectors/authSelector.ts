import { RootState } from "@state/store";
import { createSelector } from "reselect";

export const authSelector = createSelector(
  (state: RootState) => state,
  (state: RootState) => state.auth
);
