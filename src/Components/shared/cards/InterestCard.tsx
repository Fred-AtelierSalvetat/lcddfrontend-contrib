/* eslint @typescript-eslint/no-var-requires: "off" */

import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { ReactComponent as Selected } from '~/assets/icons/Selected.svg';

const MOBILE_VIEW_BREAKPOINT = 991;

const cardPropTypes = {
    className: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    isMobile: PropTypes.bool.isRequired,
    onKeyDown: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};
const Card: FC<PropTypes.InferProps<typeof cardPropTypes>> = ({ className, onClick, onKeyDown, children }) => (
    <div className={className} tabIndex={1} onClick={onClick} onKeyUp={onKeyDown}>
        {children}
    </div>
);
Card.propTypes = cardPropTypes;

const cardImagePropTypes = {
    className: PropTypes.string.isRequired,
    src: PropTypes.object.isRequired,
    alt: PropTypes.string.isRequired,
};
const CardImage: FC<PropTypes.InferProps<typeof cardImagePropTypes>> = ({ className, src, alt }) => (
    <img className={className} src={src} alt={alt} />
);
CardImage.propTypes = cardImagePropTypes;

const cardTextPropTypes = {
    className: PropTypes.string.isRequired,
    isMobile: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
};
const CardText: FC<PropTypes.InferProps<typeof cardTextPropTypes>> = ({ className, children }) => (
    <p className={className}>{children}</p>
);
CardText.propTypes = cardTextPropTypes;

const cardBodyPropTypes = {
    className: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};
const CardBody: FC<PropTypes.InferProps<typeof cardBodyPropTypes>> = ({ className, children }) => (
    <div className={className}>{children}</div>
);
CardBody.propTypes = cardBodyPropTypes;

const InterestCardStyled = styled(Card)`
    display: flex;
    flex-flow: column wrap;
    justify-content: space-between;
    align-items: center;
    height: ${(props) => (props.isMobile ? '180px' : '165px')};
    width: ${(props) => (props.isMobile ? '180px' : '165px')};
    border: 1px solid #113f59;
    border-radius: 2px;
    background-color: white;

    &:hover {
        cursor: pointer;
        box-shadow: 0 0 6px rgba(35, 173, 278, 1);
    }
`;

const SelectedStyled = styled(Selected)`
    align-self: flex-end;
    float: right;
    position: absolute;
`;

const CardImageStyled = styled(CardImage)`
    height: 70%;
`;

const CardBodyStyled = styled(CardBody)`
    display: flex;
    flex-flow: column;
    justify-content: flex-start;
    padding: 0.5rem;
    width: 100%;
    heigth: 30%;
`;

const CardTextStyled = styled(CardText)`
    text-align: center;
    font-size: ${(props) => (props.isMobile ? '0.6rem' : '0.7rem')};
    vertical-align: bottom;
`;

const interestCardPropTypes = {
    src: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    readOnly: PropTypes.bool,
};
const InterestCard: FC<PropTypes.InferProps<typeof interestCardPropTypes>> = (props) => {
    const [selected, setSelected] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < MOBILE_VIEW_BREAKPOINT);

    useEffect(() => {
        window.addEventListener('resize', updatePredicate);
    });

    const updatePredicate = () => {
        setIsMobile(window.innerWidth < MOBILE_VIEW_BREAKPOINT);
    };

    const handleClick = () => {
        if (props.readOnly) {
        } else if (selected) setSelected(false);
        else setSelected(true);
    };

    const handleOnKeyDown = (e) => {
        if (e.keyCode === 32 || e.keyCode === 13) {
            e.preventDefault();
            e.target.click();
            return false;
        }
    };
    console.log('FSA props.src', props.src);
    return (
        <div
            className="col mb-4"
            style={{
                paddingLeft: isMobile ? '1px' : '',
                paddingRight: isMobile ? '1px' : '',
                display: 'flex',
                justifyContent: 'center',
                marginRight: '10px',
            }}
        >
            <InterestCardStyled
                className="hover-shadow"
                onClick={handleClick}
                onKeyDown={handleOnKeyDown}
                isMobile={isMobile}
            >
                <SelectedStyled display={selected ? 'block' : 'none'} />
                <CardImageStyled className="card-img-top" src={props.src} alt={props.title} />
                <CardBodyStyled className="card-body">
                    <CardTextStyled className="card-text" isMobile={isMobile}>
                        {props.title}
                    </CardTextStyled>
                </CardBodyStyled>
            </InterestCardStyled>
        </div>
    );
};
InterestCard.propTypes = interestCardPropTypes;

export default InterestCard;
