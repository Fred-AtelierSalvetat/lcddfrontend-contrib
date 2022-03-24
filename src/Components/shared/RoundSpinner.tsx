import React, { FC } from 'react';
import { Spinner } from 'react-bootstrap';

import PropTypes from 'prop-types';

const roundSpinnerPropTypes = { size: PropTypes.string };
const RoundSpinner: FC<PropTypes.InferProps<typeof roundSpinnerPropTypes>> = ({ size }) => (
    <Spinner animation="border" role="status" size={size ? 'sm' : undefined}>
        <span className="sr-only">Loading...</span>
    </Spinner>
);
RoundSpinner.propTypes = roundSpinnerPropTypes;
export default RoundSpinner;
