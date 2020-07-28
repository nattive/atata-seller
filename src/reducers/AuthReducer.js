import {
    REGISTERED,
    IS_REGISTERING_IN,
    STOP_REGISTERING_IN,
    ERROR_REGISTERING_IN,
} from "../Actions/types";

const initialState = {
    registerStatus: null
}

export default function(state = initialState, action) {
    switch (action.type) {
        case REGISTERED:
            return {
                ...state,
                registerStatus: action.payload
            };
        default:
            return state;
    }
}