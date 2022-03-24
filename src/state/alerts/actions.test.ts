import { expect } from 'chai';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './actions';
import * as types from './constants/actionTypes';
import * as alertTypes from './constants/alertTypes';

describe("alerts' action creator", () => {
  it('newSuccessAlert should create an action NEW_ALERT and then dismiss it with DISMISS_ALERT', () => {
    const expectedAlertContent = {
      alertSubject: 'alertCategoryTEST',
      message: 'alertMessageTEST',
    };

    const mockStore = configureMockStore([thunk]);
    const store = mockStore({});
    return store.dispatch(actions.newSuccessAlert(expectedAlertContent)).then(() => {
      const actionStoreArray = store.getActions();
      expect(actionStoreArray[0]).to.nested.include({
        type: types.NEW_ALERT,
        'alert.alertType': alertTypes.SUCCESS,
        'alert.alertSubject': expectedAlertContent.alertSubject,
        'alert.message': expectedAlertContent.message,
      });
      expect(actionStoreArray[1]).to.nested.include({ type: types.DISMISS_ALERT });
    });
  });

  it('newFailureAlert function should create an action to add a failure alert then DISMISS_ALERT', () => {
    const expectedAlertContent = {
      alertSubject: 'alertCategoryTEST',
      message: 'alertMessageTEST',
    };
    const mockStore = configureMockStore([thunk]);
    const store = mockStore({});
    return store.dispatch(actions.newFailureAlert(expectedAlertContent)).then(() => {
      const actionStoreArray = store.getActions();
      expect(actionStoreArray[0]).to.nested.include({
        type: types.NEW_ALERT,
        'alert.alertType': alertTypes.FAILURE,
        'alert.alertSubject': expectedAlertContent.alertSubject,
        'alert.message': expectedAlertContent.message,
      });
      expect(actionStoreArray[1]).to.nested.include({ type: types.DISMISS_ALERT });
    });
  });
  it('dismissAlert function should create an action to dismiss the specified alert', () => {
    const id = 8;
    expect(actions.dismissAlert(id)).to.include({
      type: types.DISMISS_ALERT,
      id,
    });
  });
});
