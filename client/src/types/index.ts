import {store} from "../index";
import { TWsActions } from "../redux/actions/ws-actions";
import { ActionCreator, Action } from "redux";
import { ThunkAction } from "redux-thunk";

export type TRootState = ReturnType<typeof store.getState>;
export type TApplicationActions = TWsActions;

export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, TRootState, TApplicationActions>
>;

export type AppDispatch = typeof store.dispatch;