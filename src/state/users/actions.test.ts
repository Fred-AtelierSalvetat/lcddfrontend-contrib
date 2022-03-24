import { expect } from 'chai';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as actions from './actions';
import * as usersActionTypes from './constants/actionTypes';
import * as alertTypes from '../alerts/constants/alertTypes';
import * as alertsActionTypes from '../alerts/constants/actionTypes';
import { fakeDatabase } from '~/api/fetchUsers';

describe("Users'action ", () => {
  it('creates FETCH_USERS_SUCCESS and NEW_ALERT actions when fetching users has been done', () => {
    const expectedActions = [
      { type: usersActionTypes.FETCH_USERS_REQUEST, request_type: usersActionTypes.FETCH_USERS_REQUEST },
      {
        type: alertsActionTypes.NEW_ALERT,
        'alert.alertType': alertTypes.SUCCESS,
        'alert.alertSubject': usersActionTypes.FETCH_USERS_REQUEST,
        'alert.message': 'Chargement des données utilisateurs OK',
      },
      {
        type: usersActionTypes.FETCH_USERS_SUCCESS,
        request_type: usersActionTypes.FETCH_USERS_REQUEST,
        response: fakeDatabase,
      },
    ];
    const mockStore = configureMockStore([thunk]);
    const store = mockStore({ users: { users: [], inProgressRequests: [] } });
    return store.dispatch(actions.fetchUsers('failureAlert')).then(() => {
      const actionStoreArray = store.getActions();
      expect(actionStoreArray[0]).to.nested.include(expectedActions[0]);
      expect(actionStoreArray[1]).to.nested.include(expectedActions[1]);
      expect(actionStoreArray[2]).to.nested.include(expectedActions[2]);
    });
  });

  it('setUsersRoleFilter should create an action to set the roleFilter value', () => {
    const role_filter = 'user';
    const mockStore = configureMockStore([thunk]);
    const store = mockStore({
      users: {
        users: fakeDatabase,
        inProgressRequests: [],
        uiFilters: {
          role: 'admin',
          search: '',
        },
      },
    });
    store.dispatch(actions.setUsersRoleFilter(role_filter));
    const actionStoreArray = store.getActions();
    expect(actionStoreArray[0]).to.nested.include({
      type: usersActionTypes.SET_USER_ROLE_FILTER,
      role_filter,
    });
  });
  it('setUsersSearchFilter should create an action to set the searchFilter value', () => {
    const search_filter = 'Something';
    expect(actions.setUsersSearchFilter(search_filter)).to.deep.include({
      type: usersActionTypes.SET_USER_SEARCH_FILTER,
      search_filter,
    });
  });
});

it('creates ACTIVATE_USER_SUCCESS and NEW_ALERT actions when activate user has been done', () => {
  const expectedActions = [
    { type: usersActionTypes.ACTIVATE_USER_REQUEST, request_type: usersActionTypes.ACTIVATE_USER_REQUEST },
    {
      type: alertsActionTypes.NEW_ALERT,
      'alert.alertType': alertTypes.SUCCESS,
      'alert.alertSubject': usersActionTypes.ACTIVATE_USER_REQUEST,
      'alert.message': 'Activation utilisateur OK',
    },
    {
      type: usersActionTypes.ACTIVATE_USER_SUCCESS,
      request_type: usersActionTypes.ACTIVATE_USER_REQUEST,
      user_id: 0,
    },
  ];
  const mockStore = configureMockStore([thunk]);
  const store = mockStore({ users: { users: fakeDatabase, inProgressRequests: [] } });
  return store.dispatch(actions.activateUser(0)).then(() => {
    const actionStoreArray = store.getActions();
    expect(actionStoreArray[0]).to.nested.include(expectedActions[0]);
    expect(actionStoreArray[1]).to.nested.include(expectedActions[1]);
    expect(actionStoreArray[2]).to.nested.include(expectedActions[2]);
  });
});
it('creates DEACTIVATE_USER_SUCCESS and NEW_ALERT actions when deactivate user has been done', () => {
  const expectedActions = [
    { type: usersActionTypes.DEACTIVATE_USER_REQUEST, request_type: usersActionTypes.DEACTIVATE_USER_REQUEST },
    {
      type: alertsActionTypes.NEW_ALERT,
      'alert.alertType': alertTypes.SUCCESS,
      'alert.alertSubject': usersActionTypes.DEACTIVATE_USER_REQUEST,
      'alert.message': "Désactivation de l'utilisateur OK",
    },
    {
      type: usersActionTypes.DEACTIVATE_USER_SUCCESS,
      request_type: usersActionTypes.DEACTIVATE_USER_REQUEST,
      user_id: 1,
    },
  ];
  const mockStore = configureMockStore([thunk]);
  const store = mockStore({ users: { users: fakeDatabase, inProgressRequests: [] } });
  return store.dispatch(actions.deactivateUser(1)).then(() => {
    const actionStoreArray = store.getActions();
    expect(actionStoreArray[0]).to.nested.include(expectedActions[0]);
    expect(actionStoreArray[1]).to.nested.include(expectedActions[1]);
    expect(actionStoreArray[2]).to.nested.include(expectedActions[2]);
  });
});

it('creates PROMOTE_USER_TO_ADMIN_SUCCESS and NEW_ALERT actions when promote to admin has been done', () => {
  const expectedActions = [
    {
      type: usersActionTypes.PROMOTE_USER_TO_ADMIN_REQUEST,
      request_type: usersActionTypes.PROMOTE_USER_TO_ADMIN_REQUEST,
    },
    {
      type: alertsActionTypes.NEW_ALERT,
      'alert.alertType': alertTypes.SUCCESS,
      'alert.alertSubject': usersActionTypes.PROMOTE_USER_TO_ADMIN_REQUEST,
      'alert.message': "Promotion de l'utilisateur en tant qu'admin",
    },
    {
      type: usersActionTypes.PROMOTE_USER_TO_ADMIN_SUCCESS,
      request_type: usersActionTypes.PROMOTE_USER_TO_ADMIN_REQUEST,
      user_id: 0,
    },
  ];
  const mockStore = configureMockStore([thunk]);
  const store = mockStore({ users: { users: fakeDatabase, inProgressRequests: [] } });
  return store.dispatch(actions.promoteUserToAdmin(0)).then(() => {
    const actionStoreArray = store.getActions();
    expect(actionStoreArray[0]).to.nested.include(expectedActions[0]);
    expect(actionStoreArray[1]).to.nested.include(expectedActions[1]);
    expect(actionStoreArray[2]).to.nested.include(expectedActions[2]);
  });
});

it('creates PROMOTE_USER_TO_SPEAKER_SUCCESS and NEW_ALERT actions when promote to speaker has been done', () => {
  const expectedActions = [
    {
      type: usersActionTypes.PROMOTE_USER_TO_SPEAKER_REQUEST,
      request_type: usersActionTypes.PROMOTE_USER_TO_SPEAKER_REQUEST,
    },
    {
      type: alertsActionTypes.NEW_ALERT,
      'alert.alertType': alertTypes.SUCCESS,
      'alert.alertSubject': usersActionTypes.PROMOTE_USER_TO_SPEAKER_REQUEST,
      'alert.message': "Promotion de l'utilisateur en tant qu'intervenant",
    },
    {
      type: usersActionTypes.PROMOTE_USER_TO_SPEAKER_SUCCESS,
      request_type: usersActionTypes.PROMOTE_USER_TO_SPEAKER_REQUEST,
      user_id: 1,
    },
  ];
  const mockStore = configureMockStore([thunk]);
  const store = mockStore({ users: { users: fakeDatabase, inProgressRequests: [] } });
  return store.dispatch(actions.promoteUserToSpeaker(1)).then(() => {
    const actionStoreArray = store.getActions();
    expect(actionStoreArray[0]).to.nested.include(expectedActions[0]);
    expect(actionStoreArray[1]).to.nested.include(expectedActions[1]);
    expect(actionStoreArray[2]).to.nested.include(expectedActions[2]);
  });
});

it('creates VALIDATE_SPEAKER_SUCCESS and NEW_ALERT actions when speaker validation deletion has been done', () => {
  const expectedActions = [
    {
      type: usersActionTypes.VALIDATE_SPEAKER_REQUEST,
      request_type: usersActionTypes.VALIDATE_SPEAKER_REQUEST,
    },
    {
      type: alertsActionTypes.NEW_ALERT,
      'alert.alertType': alertTypes.SUCCESS,
      'alert.alertSubject': usersActionTypes.VALIDATE_SPEAKER_REQUEST,
      'alert.message': "Validation de l'intervenant",
    },
    {
      type: usersActionTypes.VALIDATE_SPEAKER_SUCCESS,
      request_type: usersActionTypes.VALIDATE_SPEAKER_REQUEST,
      user_id: 5,
    },
  ];
  const mockStore = configureMockStore([thunk]);
  const store = mockStore({ users: { users: fakeDatabase, inProgressRequests: [] } });
  return store.dispatch(actions.validateSpeaker(5)).then(() => {
    const actionStoreArray = store.getActions();
    expect(actionStoreArray[0]).to.nested.include(expectedActions[0]);
    expect(actionStoreArray[1]).to.nested.include(expectedActions[1]);
    expect(actionStoreArray[2]).to.nested.include(expectedActions[2]);
  });
});

it('creates REVOKE_USER_ADMIN_RIGHT_SUCCESS and NEW_ALERT actions when admin rights are revoked', () => {
  const expectedActions = [
    {
      type: usersActionTypes.REVOKE_USER_ADMIN_RIGHT_REQUEST,
      request_type: usersActionTypes.REVOKE_USER_ADMIN_RIGHT_REQUEST,
    },
    {
      type: alertsActionTypes.NEW_ALERT,
      'alert.alertType': alertTypes.SUCCESS,
      'alert.alertSubject': usersActionTypes.REVOKE_USER_ADMIN_RIGHT_REQUEST,
      'alert.message': 'Suppression des droits administrateur',
    },
    {
      type: usersActionTypes.REVOKE_USER_ADMIN_RIGHT_SUCCESS,
      request_type: usersActionTypes.REVOKE_USER_ADMIN_RIGHT_REQUEST,
      user_id: 4,
    },
  ];
  const mockStore = configureMockStore([thunk]);
  const store = mockStore({ users: { users: fakeDatabase, inProgressRequests: [] } });
  return store.dispatch(actions.revokeUserAdminRight(4)).then(() => {
    const actionStoreArray = store.getActions();
    expect(actionStoreArray[0]).to.nested.include(expectedActions[0]);
    expect(actionStoreArray[1]).to.nested.include(expectedActions[1]);
    expect(actionStoreArray[2]).to.nested.include(expectedActions[2]);
  });
});

it('creates DELETE_USER_SUCCESS and NEW_ALERT actions when user deletion has been done', () => {
  const expectedActions = [
    { type: usersActionTypes.DELETE_USER_REQUEST, request_type: usersActionTypes.DELETE_USER_REQUEST },
    {
      type: alertsActionTypes.NEW_ALERT,
      'alert.alertType': alertTypes.SUCCESS,
      'alert.alertSubject': usersActionTypes.DELETE_USER_REQUEST,
      'alert.message': "Supression de l'utilisateur OK",
    },
    {
      type: usersActionTypes.DELETE_USER_SUCCESS,
      request_type: usersActionTypes.DELETE_USER_REQUEST,
      user_id: 0,
    },
  ];
  const mockStore = configureMockStore([thunk]);
  const store = mockStore({ users: { users: fakeDatabase, inProgressRequests: [] } });
  return store.dispatch(actions.deleteUser(0)).then(() => {
    const actionStoreArray = store.getActions();
    expect(actionStoreArray[0]).to.nested.include(expectedActions[0]);
    expect(actionStoreArray[1]).to.nested.include(expectedActions[1]);
    expect(actionStoreArray[2]).to.nested.include(expectedActions[2]);
  });
});
