import React, { FC } from 'react';
import { Modal } from 'react-bootstrap';

import PropTypes from 'prop-types';

const overlayModal = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    header: PropTypes.node,
    body: PropTypes.node,
    footer: PropTypes.node,
};

const OverlayModal: FC<PropTypes.InferType<typeof overlayModal>> = (props) => (
    <Modal show={props.show} onHide={props.onHide}>
        {props.header && <Modal.Header closeButton>{props.header}</Modal.Header>}
        {props.body && <Modal.Body>{props.body}</Modal.Body>}
        {props.footer && <Modal.Footer>{props.footer}</Modal.Footer>}
    </Modal>
);
OverlayModal.propTypes = overlayModal;

export default OverlayModal;
