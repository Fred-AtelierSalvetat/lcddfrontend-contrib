import { expect } from 'chai';
import deepFreeze from 'deep-freeze';
import reducer from './reducer';

import * as actionTypes from './constants/actionTypes';
import * as alertTypes from './constants/alertTypes';

describe('alerts reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).to.deep.equal([]);
  });
  it('should register new alert', () => {
    expect(
      reducer(deepFreeze([]), {
        type: actionTypes.NEW_ALERT,
        alert: {
          id: 2,
          alertType: alertTypes.SUCCESS,
          alertSubject: 'alert category test',
          message: 'Test Success alert',
        },
      }),
    ).to.deep.include({
      id: 2,
      alertType: alertTypes.SUCCESS,
      alertSubject: 'alert category test',
      message: 'Test Success alert',
    });
  });
  it('should register store one alert per alertSubject and erase previous one if existing', () => {
    const firstAlertState = reducer(deepFreeze([]), {
      type: actionTypes.NEW_ALERT,
      alert: {
        id: 2,
        alertType: alertTypes.FAILED,
        alertSubject: 'alert category test',
        message: 'Test Failed alert',
      },
    });
    const secondAlertState = reducer(deepFreeze(firstAlertState), {
      type: actionTypes.NEW_ALERT,
      alert: {
        id: 3,
        alertType: alertTypes.SUCCESS,
        alertSubject: 'alert category test',
        message: 'Test Success alert',
      },
    });

    expect(secondAlertState).to.not.deep.include({
      id: 2,
      alertType: alertTypes.FAILED,
      alertSubject: 'alert category test',
      message: 'Test Failed alert',
    });

    expect(secondAlertState).to.deep.include({
      id: 3,
      alertType: alertTypes.SUCCESS,
      alertSubject: 'alert category test',
      message: 'Test Success alert',
    });
  });
  it('should allow to dismiss alert', () => {
    const dismissTestState = reducer(
      deepFreeze([
        {
          id: 2,
          alertType: alertTypes.FAILED,
          alertSubject: 'alert category test',
          message: 'Test Failed alert',
        },
        {
          id: 3,
          alertType: alertTypes.SUCCESS,
          alertSubject: 'alert category test',
          message: 'Test Success alert',
        },
      ]),
      {
        type: actionTypes.DISMISS_ALERT,
        id: 2,
      },
    );

    expect(dismissTestState).to.not.deep.include({
      id: 2,
      alertType: alertTypes.FAILED,
      alertSubject: 'alert category test',
      message: 'Test Failed alert',
    });
    expect(dismissTestState).to.deep.include({
      id: 3,
      alertType: alertTypes.SUCCESS,
      alertSubject: 'alert category test',
      message: 'Test Success alert',
    });
  });
});
