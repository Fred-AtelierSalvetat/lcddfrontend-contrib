import * as actionTypes from './constants/actionTypes';
import { AlertState, Alert, AlertActions } from './model';

export const alerts = (state: Alert[] = [], action: AlertActions): AlertState => {
    switch (action.type) {
        case actionTypes.NEW_ALERT:
            return [...state.filter((alert) => alert.alertSubject !== action.alert.alertSubject), { ...action.alert }];
        case actionTypes.DISMISS_ALERT:
            return [...state.filter((alert) => alert.id !== action.id)];
        default:
            return state;
    }
};

export default alerts;
