import { createSelector } from '@reduxjs/toolkit';
import { UsersState, User, UIfiltersRoles, UIfiltersSearch } from './model';
import { UsersActionType } from './constants/actionTypes';
import { roleFilterMap } from './constants/roles';

const allUsersSelector = (state: UsersState): User[] => state.users;
export const roleFilterSelector = (state: UsersState): UIfiltersRoles => state.uiFilters.role;
export const searchFilterSelector = (state: UsersState): UIfiltersSearch => state.uiFilters.search;

export const getVisibleUsers = createSelector(
    allUsersSelector,
    roleFilterSelector,
    searchFilterSelector,
    (users, roles_filter, search_filter) =>
        users.filter(
            (user) =>
                user.role &&
                roles_filter &&
                roleFilterMap[roles_filter].includes(user.role) &&
                (user.firstname.toLowerCase().includes(search_filter.toLowerCase()) ||
                    user.lastname.toLowerCase().includes(search_filter.toLowerCase())),
        ),
);

export const isRequestInProgress = (state: UsersState, request_type: UsersActionType): boolean =>
    state.inProgressRequests.includes(request_type);
