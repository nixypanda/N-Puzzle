/* @flow */

// type imports
import type { ModelType, Store } from "../types";

// library imports
import { createStore } from "redux";

// file imports
import rootReducer from "../IndexReducer";


export default function configureStore(initialState: ModelType): Store {
  // Note: only Redux >= 3.1.0 supports passing enhancer as third argument.
  // See https://github.com/rackt/redux/releases/tag/v3.1.0
  return createStore(rootReducer, initialState);
}
