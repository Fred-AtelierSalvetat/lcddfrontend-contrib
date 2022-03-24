import React, { FC, useEffect, useState } from 'react';

import PropTypes from 'prop-types';

const expirePropsTypes = { delay: PropTypes.number.isRequired, children: PropTypes.node.isRequired };

const Expire: FC<PropTypes.InferProps<typeof expirePropsTypes>> = ({ delay, children }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        setTimer(delay);
    }, []);

    const setTimer = (delay) => {
        setTimeout(() => setIsVisible(false), delay);
    };

    return isVisible ? <div>{children}</div> : <span />;
};
Expire.propTypes = expirePropsTypes;

export default Expire;
