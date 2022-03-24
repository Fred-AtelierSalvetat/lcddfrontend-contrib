import React, { FC, forwardRef, useState } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import Feedback from 'react-bootstrap/esm/Feedback';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import styled, { css } from 'styled-components';
import { BiCheckCircle } from 'react-icons/bi';
import PropTypes from 'prop-types';

const hideEye = <AiOutlineEyeInvisible />;
const openEye = <AiOutlineEye />;

const passwordError = {
    required: 'Le mot de passe est requis',
    oneLowerCase: 'Un charactère minuscule',
    oneUpperCase: 'Un charactère majuscule',
    oneDigit: 'Un chiffre',
    oneSpecial: 'Un charactère spécial',
    minLength: 'Au moins 8 caractères',
};

const getValidityErrorOnType = (type, errors) => {
    if (errors) {
        if (errors.password) {
            if (errors.password.types) {
                if (errors.password.types[type]) {
                    console.log(type);
                    return 'invalid';
                }
            }
        }
    }
    return 'valid';
};

const FeedbackStyled = styled(Feedback)`
    ${(props) =>
        !props.activatevalidation &&
        css`
            color: unset;
        `}
`;

const AlertMessage = styled.div`
    position: absolute;
    font-size: 0.9em;
    color: var(--success);
    background-color: #d9eee1;
    border-radius: 2px;
    margin-top: 1em;
    padding: 0.5em;
`;

const BiCheckCircleStyled = styled(BiCheckCircle)`
    font-size: x-large;
    vertical-align: bottom;
    margin-right: 0.2em;
`;
const passwordErrorPropTypes = {
    errors: PropTypes.object,
    className: PropTypes.string,
    activateValidation: PropTypes.bool.isRequired,
    columns: PropTypes.number.isRequired,
};
const PasswordError: FC<PropTypes.InferProps<typeof passwordErrorPropTypes>> = ({
    errors,
    className,
    activateValidation,
}) => {
    if (activateValidation && errors && 'password' in errors && !errors.password) {
        return (
            <AlertMessage>
                <BiCheckCircleStyled />
                <span>Votre mot de passe est bien sécurisé !</span>
            </AlertMessage>
        );
    }
    return (
        <div className={className || ''}>
            {Object.keys(passwordError).map((type, index) => {
                const _type = getValidityErrorOnType(type, errors);
                const _color = activateValidation ? (_type === 'valid' ? 'var(--success)' : 'var(--danger)') : 'none';
                return (
                    <li key={index} style={{ color: _color }}>
                        <FeedbackStyled type={_type} activatevalidation={activateValidation ? 1 : 0}>
                            {passwordError[type]}
                        </FeedbackStyled>
                    </li>
                );
            })}
        </div>
    );
};
PasswordError.propTypes = passwordErrorPropTypes;

const PasswordErrorStyled = styled(PasswordError)`
    column-count: ${(props) => props.columns};
    -moz-column-count: ${(props) => props.columns}
    -webkit-column-count: ${(props) => props.columns};
    position: absolute;
    width: 100%;
    list-style: inside;

    .valid-feedback,
    .invalid-feedback {
        display: contents;
        position: unset;
        margin-top: 0;
    }
`;

const passwordFormGroupPropTypes = {
    controlId: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    id: PropTypes.string,
    className: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func,
    isInvalid: PropTypes.bool,
    isValid: PropTypes.bool,
    errors: PropTypes.object,
    errorColumns: PropTypes.number,
};
type PasswordFormGroupType = PropTypes.InferProps<typeof passwordFormGroupPropTypes>;
const PasswordFormGroup = forwardRef<HTMLInputElement, PasswordFormGroupType>(({ controlId, label, ...props }, ref) => {
    const [showPass, setShowPass] = useState(false);
    const [activateValidation, setActivateValidation] = useState(false);
    // current password eye icon
    const pwdEye = showPass ? openEye : hideEye;

    const handleEyeIconCurrentPassword = () => {
        setShowPass(!showPass);
    };

    const handleChange = (e) => {
        if (props.onChange) {
            setActivateValidation(true);
            props.onChange(e);
        }
    };

    return (
        <Form.Group
            controlId={controlId}
            id={props.id ? props.id : undefined}
            className={props.className ? props.className : undefined}
        >
            <Form.Label>{label}</Form.Label>
            <InputGroup className="passwordInputGroup">
                <Form.Control
                    type={showPass ? 'text' : 'password'}
                    name={props.name ? props.name : undefined}
                    onChange={(e) => handleChange(e)}
                    ref={ref}
                    isInvalid={props.isInvalid}
                    aria-invalid={props.isInvalid}
                    isValid={props.isValid}
                    autoComplete="new-password"
                    tabIndex={1}
                />
                <i onClick={handleEyeIconCurrentPassword}>{pwdEye}</i>
            </InputGroup>
            {props.errors && props.errorColumns && (
                <PasswordErrorStyled
                    errors={props.errors}
                    columns={props.errorColumns}
                    activateValidation={activateValidation}
                />
            )}
        </Form.Group>
    );
});
PasswordFormGroup.propTypes = passwordFormGroupPropTypes;

export default PasswordFormGroup;
