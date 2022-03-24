import { expect } from 'chai';
import deepFreeze from 'deep-freeze';
import reducer from './reducer';
import * as actionType from './constants/actionTypes';
import * as userRole from './constants/roles';
import * as userStatus from './constants/status';

const emptyStore = {
  users: [],
  inProgressRequests: [],
  uiFilters: {
    role: 'admin',
    search: '',
  },
};

const testDB = [
  {
    user_id: 0,
    firstname: 'François',
    lastname: 'Dupont',
    phone: '0102030405',
    email_pro: '',
    email: 'francois.dupont@free.fr',
    town: 'Paris',
    status: userStatus.INACTIVE,
    role: userRole.ROLE_SPEAKER,
  },
  {
    user_id: 1,
    firstname: 'Michel',
    lastname: 'Petit',
    phone: '0607080910',
    email_pro: '',
    email: 'michel.petit@etu-univ.fr',
    town: 'Grenoble',
    status: userStatus.ACTIVE,
    role: userRole.ROLE_PRO_USER,
  },
  {
    user_id: 2,
    firstname: 'Admin',
    lastname: 'ROOT',
    phone: '987654321',
    email_pro: 'admin@root.com',
    email: '',
    town: '@',
    status: userStatus.ACTIVE,
    role: userRole.ROLE_ADMIN,
  },
  {
    user_id: 3,
    firstname: 'Martin',
    lastname: 'Impatient',
    phone: '987654321',
    email_pro: 'martin@lcdd.com',
    email: '',
    town: 'Nantes',
    status: userStatus.ACTIVE,
    role: userRole.ROLE_SPEAKER_AWAITING_VALIDATION,
  },
];

describe('users reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).to.deep.equal(emptyStore);
  });
  it('should handle successful data fetch on backend', () => {
    expect(
      reducer(deepFreeze(emptyStore), { type: actionType.FETCH_USERS_SUCCESS, response: testDB }),
    ).to.deep.equal({
      ...emptyStore,
      users: testDB,
    });
  });
  it('should handle successful user deletion on backend', () => {
    expect(
      reducer(
        deepFreeze({
          ...emptyStore,
          users: testDB,
        }),
        { type: actionType.DELETE_USER_SUCCESS, user_id: 0 },
      ),
    ).to.deep.equal({
      ...emptyStore,
      users: testDB.slice(1),
    });
  });
  it('should manage user promotion to admin role', () => {
    expect(
      reducer(
        deepFreeze({
          ...emptyStore,
          users: testDB,
        }),
        { type: actionType.PROMOTE_USER_TO_ADMIN_SUCCESS, user_id: 0 },
      ).users[0],
    ).to.include({ role: userRole.ROLE_ADMIN });
  });
  it('should manage user promotion to speaker "awaiting answer" role', () => {
    expect(
      reducer(
        deepFreeze({
          ...emptyStore,
          users: testDB,
        }),
        { type: actionType.PROMOTE_USER_TO_SPEAKER_SUCCESS, user_id: 1 },
      ).users[1],
    ).to.include({ role: userRole.ROLE_SPEAKER_AWAITING_ANSWER });
  });
  it('should manage admin demote to speaker role', () => {
    expect(
      reducer(
        deepFreeze({
          ...emptyStore,
          users: testDB,
        }),
        { type: actionType.REVOKE_USER_ADMIN_RIGHT_SUCCESS, user_id: 2 },
      ).users[2],
    ).to.include({ role: userRole.ROLE_SPEAKER });
  });
  it('should manage speaker validation action', () => {
    expect(
      reducer(
        deepFreeze({
          ...emptyStore,
          users: testDB,
        }),
        { type: actionType.VALIDATE_SPEAKER_SUCCESS, user_id: 3 },
      ).users[3],
    ).to.include({ role: userRole.ROLE_SPEAKER });
  });
  it('should manage user activation action', () => {
    expect(
      reducer(
        deepFreeze({
          ...emptyStore,
          users: testDB,
        }),
        { type: actionType.ACTIVATE_USER_SUCCESS, user_id: 0 },
      ).users[0],
    ).to.include({ status: userStatus.ACTIVE });
  });
  it('should manage user deactivation action', () => {
    expect(
      reducer(
        deepFreeze({
          ...emptyStore,
          users: testDB,
        }),
        { type: actionType.DEACTIVATE_USER_SUCCESS, user_id: 1 },
      ).users[1],
    ).to.include({ status: userStatus.INACTIVE });
  });
  it('should set search filter on request', () => {
    expect(
      reducer(
        deepFreeze({
          ...emptyStore,
          users: testDB,
        }),
        { type: actionType.SET_USER_SEARCH_FILTER, search_filter: 'Recherche test' },
      ).uiFilters,
    ).to.include({ search: 'Recherche test' });
  });
  it('should set role filter on request', () => {
    expect(
      reducer(
        deepFreeze({
          ...emptyStore,
          users: testDB,
        }),
        { type: actionType.SET_USER_ROLE_FILTER, role_filter: 'user' },
      ).uiFilters,
    ).to.deep.include({ role: 'user' });
  });
  it('should add new api request to the "requests in progress" list', () => {
    expect(
      reducer(
        reducer(deepFreeze(emptyStore), {
          type: actionType.DEACTIVATE_USER_REQUEST,
          request_type: actionType.DEACTIVATE_USER_REQUEST,
        }),
        { type: actionType.VALIDATE_SPEAKER_REQUEST, request_type: actionType.VALIDATE_SPEAKER_REQUEST },
      ),
    ).to.deep.include({
      inProgressRequests: [actionType.DEACTIVATE_USER_REQUEST, actionType.VALIDATE_SPEAKER_REQUEST],
    });
  });
  it('should remove failed requests from "requests in progress" list', () => {
    const twoRequestsInProgressState = reducer(
      reducer(deepFreeze(emptyStore), {
        type: actionType.DEACTIVATE_USER_REQUEST,
        request_type: actionType.DEACTIVATE_USER_REQUEST,
      }),
      { type: actionType.VALIDATE_SPEAKER_REQUEST, request_type: actionType.VALIDATE_SPEAKER_REQUEST },
    );
    expect(
      reducer(twoRequestsInProgressState, {
        type: actionType.DEACTIVATE_USER_FAILURE,
        request_type: actionType.DEACTIVATE_USER_REQUEST,
      }),
    ).to.deep.include({
      inProgressRequests: [actionType.VALIDATE_SPEAKER_REQUEST],
    });
  });
  it('should remove successful requests from "requests in progress" list', () => {
    const twoRequestsInProgressState = reducer(
      reducer(deepFreeze(emptyStore), {
        type: actionType.DEACTIVATE_USER_REQUEST,
        request_type: actionType.DEACTIVATE_USER_REQUEST,
      }),
      { type: actionType.VALIDATE_SPEAKER_REQUEST, request_type: actionType.VALIDATE_SPEAKER_REQUEST },
    );
    expect(
      reducer(twoRequestsInProgressState, {
        type: actionType.VALIDATE_SPEAKER_SUCCESS,
        request_type: actionType.VALIDATE_SPEAKER_REQUEST,
      }),
    ).to.deep.include({
      inProgressRequests: [actionType.DEACTIVATE_USER_REQUEST],
    });
  });
});
