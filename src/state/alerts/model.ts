import * as actionTypes from './constants/actionTypes';
import { AlertsType } from './constants/alertTypes';

export type Alert = {
  id: string;
  alertType: AlertsType;
  alertSubject: string;
  message: JSX.Element;
};

export type AlertState = Alert[];

type SuccessAlert = { type: typeof actionTypes.NEW_ALERT; alert: Alert };
type FailureAlert = { type: typeof actionTypes.NEW_ALERT; alert: Alert };
export type DismissAlert = { type: typeof actionTypes.DISMISS_ALERT; id: string };

export type AlertActions = SuccessAlert | FailureAlert | DismissAlert;
