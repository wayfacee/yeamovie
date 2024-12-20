import {
  AnyAction,
  combineReducers,
  Reducer,
  ReducersMapObject,
} from "@reduxjs/toolkit";
import {
  MountedReducers,
  ReducerManager,
  StateSchema,
  StateSchemaKey,
} from "./StateSchema";

export function createReducerManager(
  initialReducers: ReducersMapObject<StateSchema>,
): ReducerManager {
  // Create an object which maps keys to reducers
  const reducers = { ...initialReducers };

  // Create the initial combinedReducer
  let combinedReducer = combineReducers(reducers);

  // массив хранит назв. редюсеров, которые хотим удалить
  let keysToRemove: StateSchemaKey[] = [];
  const mountedReducers: MountedReducers = {};

  return {
    // возв. список редюсер, и смот. вмонтирован редюс
    // или нет, поэтому код-ревью нужен
    getReducerMap: () => reducers,

    getMountedReducers: () => mountedReducers,

    // редюсер
    reduce: (state: StateSchema, action: AnyAction) => {
      // если в массиве (keysToRemove) есть какие то ключи, то полнотью удаляем
      if (keysToRemove.length > 0) {
        state = { ...state };
        keysToRemove.forEach((key) => {
          // @ts-ignore
          delete state[key];
        });
        keysToRemove = [];
      }

      // Delegate to the combined reducer
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return combinedReducer(state, action);
    },

    add: (key: StateSchemaKey, reducer: Reducer) => {
      if (!key || reducers[key]) {
        return;
      }

      // по ключу добавляют новый редюсер
      reducers[key] = reducer;
      mountedReducers[key] = true;

      // Generate a new combined reducer
      combinedReducer = combineReducers(reducers);
    },

    // Removes a reducer with the specified key
    remove: (key: StateSchemaKey) => {
      if (!key || !reducers[key]) {
        return;
      }

      // удаляет
      // @ts-ignore
      delete reducers[key];
      mountedReducers[key] = false;

      // добавляет ключ в массив
      keysToRemove.push(key);

      // Generate a new combined reducer
      combinedReducer = combineReducers(reducers);
    },
  };
}
