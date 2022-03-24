import { combineReducers } from 'redux';
import { homeReducer } from './questions/questions.reducer';
import { SpeakerReducer } from './speaker/speaker.reducer';
import users from './users/reducer';
import alerts from './alerts/reducer';
import type { Alert } from './alerts/model';

import * as fromUsers from './users/selectors';
import * as fromAlerts from './alerts/selectors';
import * as fromUser from './user/selectors';
import { roleFilterMap } from './users/constants/roles';

import workshops from './workshops/reducer';
import type { WorkshopsState, Workshop, SearchFilter } from './workshops/model';
import * as fromWorkshops from './workshops/selectors';

import { userRegistrationReducer } from './user/user.registation.reducer';
import { userAuthenticationReducer } from './user/user.authentication.reducer';

import type { RootStateType } from './store';
import type { UsersActionType } from './users/constants/actionTypes';
import type { User, UIfiltersRole, UIfiltersSearch } from './users/model';

export const reducersList = {
    home: homeReducer,
    speakers: SpeakerReducer,
    users,
    workshops,
    alerts,
    registration: userRegistrationReducer,
    authentication: userAuthenticationReducer,
};

export const rootReducer = combineReducers(reducersList);

export type AppState = ReturnType<typeof rootReducer>;

export const getRoles: () => UIfiltersRole[] = () => Object.keys(roleFilterMap);
export const roleFilterSelector = (state: RootStateType): UIfiltersRoles => fromUsers.roleFilterSelector(state.users);
export const searchFilterSelector = (state: RootStateType): UIfiltersSearch =>
    fromUsers.searchFilterSelector(state.users);
export const getVisibleUsers = (state: RootStateType): User[] => fromUsers.getVisibleUsers(state.users);
export const isRequestInProgress =
    (request_type: UsersActionType) =>
    (state: RootStateType): boolean =>
        fromUsers.isRequestInProgress(state.users, request_type);
export const getAlerts = (state: RootStateType): Alert[] => fromAlerts.getAlerts(state.alerts);
export const isCurrentUserLoggedIn = (state: RootStateType): boolean =>
    fromUser.isCurrentUserLoggedIn(state.authentication);
export const getWorkshops = (state: WorkshopsState): Workshop[] => fromWorkshops.getWorkshops(state.workshops);
export const workshopSearchFilterSelector = (state: WorkshopsState): SearchFilter =>
    fromWorkshops.searchFilterSelector(state.workshops);
export const getWorkshopById =
    (id: Workshop.id) =>
    (state: RootStateType): Workshop =>
        fromWorkshops.getWorkshopById(state.workshops, id);
export const isWorkshopStoreInialized = (state: RootStateType): boolean =>
    fromWorkshops.isWorkshopStoreInialized(state.workshops);
export const getOrderBy = (state: RootStateType): Workshop.orderBy => fromWorkshops.getOrderBy(state.workshops);
