import { combineReducers } from 'redux';

import * as types from './constants/actionTypes';
import * as userStatus from './constants/status';
import * as userModel from './constants/roles';
import type { User, UIfilters } from './model';

const users = (state: User[] = [], action) => {
    switch (action.type) {
        case types.FETCH_USERS_SUCCESS:
            return action.response;
        case types.DELETE_USER_SUCCESS:
            return state.filter((user) => user.user_id !== action.user_id);
        case types.PROMOTE_USER_TO_ADMIN_SUCCESS:
            return state.map((user) =>
                user.user_id === action.user_id ? { ...user, role: userModel.ROLE_ADMIN } : user,
            );

        case types.PROMOTE_USER_TO_SPEAKER_SUCCESS:
            return state.map((user) =>
                user.user_id === action.user_id ? { ...user, role: userModel.ROLE_SPEAKER_AWAITING_ANSWER } : user,
            );
        case types.REVOKE_USER_ADMIN_RIGHT_SUCCESS:
        case types.VALIDATE_SPEAKER_SUCCESS:
            return state.map((user) =>
                user.user_id === action.user_id ? { ...user, role: userModel.ROLE_SPEAKER } : user,
            );
        case types.ACTIVATE_USER_SUCCESS:
            return state.map((user) =>
                user.user_id === action.user_id ? { ...user, status: userStatus.ACTIVE } : user,
            );
        case types.DEACTIVATE_USER_SUCCESS:
            return state.map((user) =>
                user.user_id === action.user_id ? { ...user, status: userStatus.INACTIVE } : user,
            );

        default:
            return state;
    }
};

const uiFilters = (
    state: UIfilters = {
        role: userModel.ADMIN_ROLE_KEY,
        search: '',
    },
    action,
) => {
    switch (action.type) {
        case types.SET_USER_SEARCH_FILTER:
            if (state.search === action.search_filter) {
                return state;
            }
            return {
                ...state,
                search: action.search_filter,
            };

        case types.SET_USER_ROLE_FILTER:
            if (state.role === action.role_filter) {
                return state;
            }
            return {
                ...state,
                role: action.role_filter,
            };

        default:
            return state;
    }
};

const inProgressRequests = (state = [], action) => {
    switch (action.type) {
        case types.FETCH_USERS_REQUEST:
        case types.ACTIVATE_USER_REQUEST:
        case types.DEACTIVATE_USER_REQUEST:
        case types.DELETE_USER_REQUEST:
        case types.PROMOTE_USER_TO_ADMIN_REQUEST:
        case types.REVOKE_USER_ADMIN_RIGHT_REQUEST:
        case types.PROMOTE_USER_TO_SPEAKER_REQUEST:
        case types.VALIDATE_SPEAKER_REQUEST:
            return [...state, action.request_type];
        case types.FETCH_USERS_SUCCESS:
        case types.ACTIVATE_USER_SUCCESS:
        case types.DEACTIVATE_USER_SUCCESS:
        case types.FETCH_USERS_FAILURE:
        case types.ACTIVATE_USER_FAILURE:
        case types.DEACTIVATE_USER_FAILURE:
        case types.DELETE_USER_SUCCESS:
        case types.DELETE_USER_FAILURE:
        case types.PROMOTE_USER_TO_ADMIN_SUCCESS:
        case types.PROMOTE_USER_TO_ADMIN_FAILURE:
        case types.REVOKE_USER_ADMIN_RIGHT_SUCCESS:
        case types.REVOKE_USER_ADMIN_RIGHT_FAILURE:
        case types.PROMOTE_USER_TO_SPEAKER_SUCCESS:
        case types.PROMOTE_USER_TO_SPEAKER_FAILURE:
        case types.VALIDATE_SPEAKER_SUCCESS:
        case types.VALIDATE_SPEAKER_FAILURE:
            return state.filter((request_type) => request_type !== action.request_type);
        default:
            return state;
    }
};

const userAdminReducer = combineReducers({
    users,
    inProgressRequests,
    uiFilters,
});

export default userAdminReducer;
