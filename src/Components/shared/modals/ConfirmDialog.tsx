import React, { FC } from 'react';
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

import './ConfirmDialog.scss';

const confirmDialogPropTypes = {
    show: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    cancelButton: PropTypes.string.isRequired,
    okButton: PropTypes.string.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleConfirm: PropTypes.func.isRequired,
};

const ConfirmDialog: FC<PropTypes.InferProps<typeof confirmDialogPropTypes>> = ({
    show,
    title,
    body,
    cancelButton,
    okButton,
    handleClose,
    handleConfirm,
}) => (
    <Modal className="modalOverPopover" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{body}</Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                {cancelButton}
            </Button>
            <Button variant="danger" onClick={handleConfirm}>
                {okButton}
            </Button>
        </Modal.Footer>
    </Modal>
);

ConfirmDialog.propTypes = confirmDialogPropTypes;

export default ConfirmDialog;
