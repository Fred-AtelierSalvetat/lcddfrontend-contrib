import React, { FC, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import Avatar from '../../assets/shared/avatar.jpg';
import './Speaker.css';

import PropTypes from 'prop-types';

const speakerPropTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    rool: PropTypes.string.isRequired,
    description: PropTypes.string,
};

export const Speaker: FC<PropTypes.InferProps<typeof speakerPropTypes>> = ({ id, name, rool, description }) => {
    const history = useHistory();

    // TO DO - Add components with params
    const Redirection = useCallback(() => {
        return history.push(`/profile/${id}`);
    }, [id, history]);
    return (
        <div className="flex">
            <div>
                <img src={Avatar} className="speaker-image" onClick={Redirection} />
                <div>
                    <h3 style={{ textAlign: 'center', color: '#333333' }}>{name}</h3>
                    <p style={{ textAlign: 'center', color: '#4F4F4F' }}>{rool}</p>
                    <em style={{ textAlign: 'center', color: '#4F4F4F' }}>{description}</em>
                </div>
            </div>
        </div>
    );
};
Speaker.propTypes = speakerPropTypes;
