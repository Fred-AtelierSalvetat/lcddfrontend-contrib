import { v4 as uuidv4 } from 'uuid';

import * as types from './constants/actionTypes';
import * as alertTypes from './constants/alertTypes';

import { DismissAlert } from './model';
import { AppDispatchType } from '../store';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const newSuccessAlert =
    ({
        alertSubject,
        message,
    }: {
        alertSubject: string;
        message: JSX.Element;
    }): ((dispatch: AppDispatchType) => Promise<DismissAlert>) =>
    (dispatch) => {
        const alertId = uuidv4();
        dispatch({
            type: types.NEW_ALERT,
            alert: {
                id: alertId,
                alertType: alertTypes.SUCCESS,
                alertSubject,
                message,
            },
        });
        // TODOFSA Use react-toastify in place of bad boostrap/custo alertmsg
        return delay(1000).then(() => dispatch(dismissAlert(alertId)));
    };

export const newFailureAlert =
    ({
        alertSubject,
        message,
    }: {
        alertSubject: string;
        message: JSX.Element;
    }): ((dispatch: AppDispatchType) => Promise<DismissAlert>) =>
    (dispatch) => {
        const alertId = uuidv4();
        dispatch({
            type: types.NEW_ALERT,
            alert: {
                id: alertId,
                alertType: alertTypes.FAILURE,
                alertSubject,
                message,
            },
        });
        return delay(3000).then(() => dispatch(dismissAlert(alertId)));
    };

export const dismissAlert = (id: string): DismissAlert => ({
    type: types.DISMISS_ALERT,
    id,
});
