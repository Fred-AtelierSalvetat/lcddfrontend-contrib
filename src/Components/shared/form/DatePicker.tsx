import React, { FC, createElement, forwardRef } from 'react';
import type { HTMLProps, Ref } from 'react';

import { default as ReactDatePicker, registerLocale } from 'react-datepicker';
import { fr, enUS } from 'date-fns/locale';
import PropTypes from 'prop-types';
import { ReactComponent as CalendarIcon } from '~/assets/icons/date_range_24px.svg';

import 'react-datepicker/dist/react-datepicker.css';
import './DatePicker.scss';

registerLocale('fr', fr);
registerLocale('enUS', enUS);

const datePickerPropsTypes = {
    placeholder: PropTypes.string.isRequired,
    dateFormat: PropTypes.string.isRequired,
    isInvalid: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    value: PropTypes.instanceOf(Date),
    inputId: PropTypes.string,
};

const DatePicker: FC<PropTypes.InferProps<typeof datePickerPropsTypes>> = ({
    placeholder,
    dateFormat,
    isInvalid,
    onChange,
    onBlur,
    value,
    inputId,
}) => {
    const DatePickerCustomInput = (props: HTMLProps<HTMLInputElement>, ref: Ref<HTMLInputElement>) => (
        <div id="datepicker-custom-input-container" className={props.className}>
            <input
                {...props}
                ref={ref}
                className={`datepicker-custom-input form-control ${props.className}`}
                id={inputId}
                type="text"
            />
            <CalendarIcon />
        </div>
    );

    return (
        <ReactDatePicker
            onChange={onChange}
            onBlur={onBlur}
            wrapperClassName={`form-control ${isInvalid ? 'is-invalid' : ''}`}
            className={`${isInvalid ? 'is-invalid' : ''}`}
            selected={value}
            locale="fr"
            showTimeSelect
            timeCaption="Heure"
            popperPlacement="left-start"
            placeholderText={placeholder}
            dateFormat={dateFormat}
            filterDate={(d) => new Date() < d}
            customInput={createElement(forwardRef(DatePickerCustomInput))}
        />
    );
};

DatePicker.propTypes = datePickerPropsTypes;

export default DatePicker;
