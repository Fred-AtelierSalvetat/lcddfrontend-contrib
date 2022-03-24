import React, { FC, useState } from 'react';
import PropTypes from 'prop-types';

const actionPropTypes = {
    icon: PropTypes.element.isRequired, // ReactComponent
    label: PropTypes.string.isRequired,
    action: PropTypes.func,
    modalConfirmation: PropTypes.node,
};

const Action: FC<PropTypes.InferProps<typeof actionPropTypes>> = ({ icon, label, action, modalConfirmation }) => {
    const [insertModal, setInsertModal] = useState(false);
    return (
        <div className="actionButton">
            <div
                className="actionButtonPanel"
                onClick={() => (modalConfirmation ? setInsertModal(true) : action ? action() : null)}
            >
                {insertModal ? modalConfirmation : null}
                <div className="iconContainer">{icon}</div>
                <span>{label}</span>
            </div>
        </div>
    );
};

Action.propTypes = actionPropTypes;

export default Action;
