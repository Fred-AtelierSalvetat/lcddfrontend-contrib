import React, { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Alert from 'react-bootstrap/Alert';

import * as alertTypes from '~/state/alerts/constants/alertTypes';
import * as alertAction from '~/state/alerts/actions';
import { getAlerts } from '~/state/reducers';

import './AlertNotificationBox.scss';

const AlertNotificationBox: FC = () => {
    const alerts = useSelector(getAlerts).reverse();
    const dispatch = useDispatch();

    return (
        <div className="alertBox">
            {alerts &&
                alerts.map((alert) => (
                    <Alert
                        key={alert.id}
                        variant={alert.alertType === alertTypes.SUCCESS ? 'success' : 'danger'}
                        onClose={() => {
                            dispatch(alertAction.dismissAlert(alert.id));
                        }}
                        dismissible
                    >
                        {alert.message}
                    </Alert>
                ))}
        </div>
    );
};

export default AlertNotificationBox;
