import { combineReducers } from 'redux';

import * as actionType from './constants/actionTypes';
import * as status from './constants/status';
import { SORT_DEFAULT_VALUE } from './constants/orderBy';
import type { Workshop, SearchFilter } from './model';

const workshops = (state: Workshop[] = [], action) => {
    switch (action.type) {
        case actionType.FETCH_WORKSHOPS:
            return [...action.workshops];
        case actionType.CREATE_WORKSHOP:
            return [...state, action.workshop];
        case actionType.UPDATE_WORKSHOP:
            return state.map((workshop) => (workshop.id !== action.workshop.id ? workshop : action.workshop));
        case actionType.CANCEL_WORKSHOP:
        case actionType.DELETE_WORKSHOP:
            return state.filter((workshop) => workshop.id !== action.id);
        case actionType.GO_LIVE_WORKSHOP:
            return state.map((workshop) =>
                workshop.id !== action.id ? workshop : { ...workshop, status: status.LIVE },
            );
        case actionType.END_LIVE_WORKSHOP:
            return state.map((workshop) =>
                workshop.id !== action.id ? workshop : { ...workshop, status: status.UNPUBLISHED },
            );
        case actionType.ARCHIVE_WORKSHOP:
            return state.map((workshop) =>
                workshop.id !== action.id ? workshop : { ...workshop, status: status.ARCHIVED },
            );
        case actionType.RESTORE_WORKSHOP:
            return state.map((workshop) =>
                workshop.id !== action.id ? workshop : { ...workshop, status: status.PUBLISHED },
            );
        default:
            return state;
    }
};

const searchFilter = (state: SearchFilter = '', action) => {
    switch (action.type) {
        case actionType.SET_WORKSHOP_SEARCH_FILTER:
            return action.search_filter;
        default:
            return state;
    }
};

const orderBy = (state: OrderBy = SORT_DEFAULT_VALUE, action) => {
    switch (action.type) {
        case actionType.SET_ORDER_BY:
            return action.orderBy;
        default:
            return state;
    }
};

const workshopsReducer = combineReducers({
    workshops,
    searchFilter,
    orderBy,
});

export default workshopsReducer;
