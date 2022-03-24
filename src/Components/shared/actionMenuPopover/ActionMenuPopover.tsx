import React, { FC, Children } from 'react';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import PropTypes from 'prop-types';

import './actionMenuPopover.scss';

const propTypes = {
    icon: PropTypes.object.isRequired,
    placement: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};

const ActionMenuPopover: FC<PropTypes.InferProps<typeof propTypes>> = ({ icon, placement, children = [] }) => {
    const popover = (
        <Popover id="ActionMenuPopover">
            <Popover.Content>{Children.map(children, (child) => child)}</Popover.Content>
        </Popover>
    );
    return (
        <OverlayTrigger rootClose trigger="click" placement={placement} overlay={popover}>
            <div className="ActionMenuIcon">{icon}</div>
        </OverlayTrigger>
    );
};
ActionMenuPopover.propTypes = propTypes;

export default ActionMenuPopover;
