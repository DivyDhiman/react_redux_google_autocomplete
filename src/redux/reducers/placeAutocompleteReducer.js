import {
    PLACE_AUTOCOMPLETE_CLEAR,
    PLACE_AUTOCOMPLETE_MARKER,
    PLACE_AUTOCOMPLETE_SEARCH_HISTORY
} from "../actions/placeAutocompleteAction";

// Reducer Default Value
const initialState = {
    marker: null,
    searchHistory : []
};

// Reducer
function placeAutocompleteReducer(state = initialState, action) {
    switch (action.type) {
        case PLACE_AUTOCOMPLETE_MARKER:
            return {
                ...state,
                marker: action.marker,
            };

        case PLACE_AUTOCOMPLETE_SEARCH_HISTORY:
            return {
                ...state,
                searchHistory: [returnObject(action),...state.searchHistory],
            };

        case PLACE_AUTOCOMPLETE_CLEAR:
            return {
                ...state,
                marker: null,
                searchHistory : []
            };

        default:
            return state;
    }
}

function returnObject (action){
    return {
        "lat" : action.lat,
        "lng" : action.lng,
        "address" : action.address,

    }
}


export default placeAutocompleteReducer;
