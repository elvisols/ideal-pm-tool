import {GET_ERRORS} from "../actions/types";

const initialState = {};

export default function(state=initialState, action) {
    switch(action.type) {
        case GET_ERRORS:
            // if we have errors from the server, return the errors and push to the store.
            return action.payload;
        default:
            return state;
    }
}