import React, { FC } from 'react';
import { Form } from 'react-bootstrap';

import PropTypes from 'prop-types';

const formFeedbackPropTypes = {
    field: PropTypes.shape({
        type: PropTypes.string,
        message: PropTypes.string,
    }),
};

export const FormFeedback: FC<PropTypes.InferProps<typeof formFeedbackPropTypes>> = (props) => {
    // TODO strange... -> search intended behavior
    if (props.field == 'password') {
        return <Form.Control.Feedback type="invalid">{props.field.type}</Form.Control.Feedback>;
    }
    return <Form.Control.Feedback type="invalid">{props.field && props.field.message}</Form.Control.Feedback>;
};
FormFeedback.propTypes = formFeedbackPropTypes;
