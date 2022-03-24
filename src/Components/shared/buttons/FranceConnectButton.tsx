import React, { FC } from 'react';
import type { CSSProperties } from 'react';

import { Button } from 'react-bootstrap';

import PropTypes from 'prop-types';
import PropStyle from 'react-style-proptype';
import { ReactComponent as FCLogo } from '~/assets/logos/FC-logo.svg';

const franceConnectButton = {
    text: PropTypes.string.isRequired,
    style: PropStyle.isRequired,
};
export const FranceConnectButton: FC<PropTypes.InferProps<typeof franceConnectButton>> = ({ text, style }) => (
    <Button variant="fc" className="FC-btn" style={style as CSSProperties}>
        <FCLogo />
        <div className="FC-text">
            {text}
            <br />
            <span className="FC-text-bold">FranceConnect</span>
        </div>
    </Button>
);
FranceConnectButton.propTypes = franceConnectButton;

const franceConnectButtonEmail = {
    text: PropTypes.string.isRequired,
    style: PropStyle.isRequired,
    onClick: PropTypes.func.isRequired,
};
export const FranceConnectButtonEmail: FC<PropTypes.InferProps<typeof franceConnectButtonEmail>> = ({
    text,
    style,
    onClick,
}) => (
    <Button className="FC-btn-email" style={style as CSSProperties} onClick={onClick}>
        <div className="FC-text-email">
            {text}
            <br />
            <span className="FC-text-bold">Votre adresse e-mail</span>
        </div>
    </Button>
);
FranceConnectButtonEmail.propTypes = franceConnectButtonEmail;
