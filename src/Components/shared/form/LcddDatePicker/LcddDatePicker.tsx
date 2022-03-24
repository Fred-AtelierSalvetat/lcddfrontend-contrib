import React, { forwardRef, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import classNames from 'classnames';
import format from 'date-fns/format';
import parse from 'date-fns/parse';

import PropTypes from 'prop-types';
import LcddDatePickerModal from './LcddDatePickerModal';
import { ReactComponent as CalendarIcon } from '~/assets/icons/date_range_24px.svg';

import './LcddDatePicker.scss';

const datePickerPropsTypes = {
  placeholder: PropTypes.string.isRequired,
  dateFormat: PropTypes.string.isRequired,
  isInvalid: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  value: PropTypes.instanceOf(Date),
};

type LcddDatePickerProps = PropTypes.InferProps<typeof datePickerPropsTypes>;

const LcddDatePicker = forwardRef<HTMLInputElement, LcddDatePickerProps>(
  ({
    placeholder, dateFormat, isInvalid, onChange, onBlur, value,
  }, ref) => {
    const [show, setShow] = useState(false);

    const [timestamp, setTimestamp] = useState(value);
    const [inputValue, setInputValue] = useState(timestamp ? format(timestamp, dateFormat) : '');

    const handleClose = () => {
      setInputValue(timestamp ? format(timestamp, dateFormat) : '');
      onChange(timestamp);
      setShow(false);
    };
    const handleShow = () => setShow(true);
    const refdate = new Date();
    refdate.setHours(0, 0, 0);

    const inputValidation = () => {
      let newDate: Date | null | undefined = null;
      if (inputValue.length > 0) {
        newDate = parse(inputValue, dateFormat, timestamp || refdate);
        if (isNaN(newDate.getTime())) {
          // Wrong format or not a date-> ignore input and restore previous value
          setInputValue(timestamp ? format(timestamp, dateFormat) : '');
          newDate = timestamp;
        } else {
          setInputValue(format(newDate, dateFormat));
        }
      }
      onChange(newDate);
      setTimestamp(newDate);
      onBlur();
    };

    return (
            <>
                <div
                    className={classNames('lcdd-datepicker', 'form-control', { 'is-invalid': isInvalid })}
                    onClick={handleShow}
                >
                    <input
                        ref={ref}
                        className={classNames('lcdd-datepicker-input', 'form-control', { 'is-invalid': isInvalid })}
                        placeholder={placeholder}
                        type="text"
                        value={inputValue}
                        onChange={(event) => {
                          setInputValue(event.target.value);
                        }}
                        onBlur={inputValidation}
                        onClick={inputValidation}
                    />
                    <CalendarIcon />
                </div>
                <Modal className="datePickerModal" show={show} onHide={handleClose}>
                    <Modal.Body>
                        <LcddDatePickerModal value={timestamp} setValue={(newDate) => setTimestamp(newDate)} />
                    </Modal.Body>
                </Modal>
            </>
    );
  },
);

LcddDatePicker.propTypes = datePickerPropsTypes;

export default LcddDatePicker;
