import React, { FC, useState } from 'react';
import classNames from 'classnames';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

import PropTypes from 'prop-types';
import SelectionYear from './SelectionYear';
import SelectionMonth from './SelectionMonth';
import SelectionDay from './SelectionDay';
import SelectionHours from './SelectionHours';
import SelectionMinutes from './SelectionMinutes';

import './LcddDatePicker.scss';

const lcddDatePickerModalPropsTypes = {
  value: PropTypes.instanceOf(Date),
  setValue: PropTypes.func.isRequired,
};

const enumValue = (name) => Object.freeze({ toString: () => name });
const selectionTargetEnum = Object.freeze({
  YEAR: enumValue('years'),
  MONTH: enumValue('months'),
  DAY: enumValue('days'),
  HOURS: enumValue('hours'),
  MINUTES: enumValue('minutes'),
});

const LcddDatePickerModal: FC<PropTypes.InferProps<typeof lcddDatePickerModalPropsTypes>> = ({ value, setValue }) => {
  const refDate = new Date();
  refDate.setHours(0);
  refDate.setMinutes(0);
  refDate.setSeconds(0);
  const [date, setDate] = useState(value || refDate);

    type newDateType = {
      year?: number;
      month?: number;
      day?: number;
      hours?: number;
      minutes?: number;
    };

    const setNewDate: (newDateType) => void = ({
      year, month, day, hours, minutes,
    }) => {
      const newDate = new Date(date);
      typeof year !== 'undefined' && newDate.setFullYear(year);
      typeof month !== 'undefined' && newDate.setMonth(month);
      typeof day !== 'undefined' && newDate.setDate(day);
      typeof hours !== 'undefined' && newDate.setHours(hours);
      typeof minutes !== 'undefined' && newDate.setMinutes(minutes);
      setDate(newDate);
      setValue(newDate);
    };

    const [currentSelection, setCurrentSelection] = useState(selectionTargetEnum.HOURS);
    const [dragSelectionMode, setDragSelectionMode] = useState(false);

    return (
        <div className="lcddTimestampPicker">
            <div className="timestampDisplay dateDisplay">
                <div>
                    <span
                        className={classNames(
                          'digitDisplay',
                          { currentSelection: currentSelection === selectionTargetEnum.DAY },
                          { preventMouseEvent: dragSelectionMode },
                        )}
                        onClick={() => setCurrentSelection(selectionTargetEnum.DAY)}
                    >
                        {date.getDate()}
                    </span>
                    <span> </span>
                    <span
                        className={classNames(
                          'digitDisplay',
                          { currentSelection: currentSelection === selectionTargetEnum.MONTH },
                          { preventMouseEvent: dragSelectionMode },
                        )}
                        onClick={() => setCurrentSelection(selectionTargetEnum.MONTH)}
                    >
                        {format(date, 'LLLL', { locale: fr })}
                    </span>
                    <span> </span>
                    <span
                        className={classNames(
                          'digitDisplay',
                          { currentSelection: currentSelection === selectionTargetEnum.YEAR },
                          { preventMouseEvent: dragSelectionMode },
                        )}
                        onClick={() => setCurrentSelection(selectionTargetEnum.YEAR)}
                    >
                        {date.getFullYear()}
                    </span>
                </div>
            </div>
            <div className="timestampDisplay timeDisplay">
                <div>
                    <span
                        className={classNames(
                          'digitDisplay',
                          { currentSelection: currentSelection === selectionTargetEnum.HOURS },
                          { preventMouseEvent: dragSelectionMode },
                        )}
                        onClick={() => setCurrentSelection(selectionTargetEnum.HOURS)}
                    >
                        {String(date.getHours()).padStart(2, '0')}
                    </span>
                    <span>:</span>
                    <span
                        className={classNames(
                          'digitDisplay',
                          { currentSelection: currentSelection === selectionTargetEnum.MINUTES },
                          { preventMouseEvent: dragSelectionMode },
                        )}
                        onClick={() => setCurrentSelection(selectionTargetEnum.MINUTES)}
                    >
                        {String(date.getMinutes()).padStart(2, '0')}
                    </span>
                </div>
            </div>
            <div className="ctrlSelectionPanel">
                <SelectionYear
                    year={date.getFullYear()}
                    setYear={(year) => setNewDate({ year })}
                    show={currentSelection === selectionTargetEnum.YEAR}
                />

                <SelectionMonth
                    month={date.getMonth()}
                    setMonth={(month) => setNewDate({ month })}
                    show={currentSelection === selectionTargetEnum.MONTH}
                />
                <SelectionDay
                    date={{ day: date.getDate(), month: date.getMonth(), year: date.getFullYear() }}
                    setDate={({ day, month, year }) => {
                      setNewDate({ day, month, year });
                    }}
                    show={currentSelection === selectionTargetEnum.DAY}
                />
                <SelectionHours
                    hours={date.getHours()}
                    setHours={(hours) => setNewDate({ hours })}
                    dragSelectionMode={dragSelectionMode}
                    setDragSelectionMode={(value) => setDragSelectionMode(value)}
                    show={currentSelection === selectionTargetEnum.HOURS}
                />
                <SelectionMinutes
                    minutes={date.getMinutes()}
                    setMinutes={(minutes) => setNewDate({ minutes })}
                    dragSelectionMode={dragSelectionMode}
                    setDragSelectionMode={(value) => setDragSelectionMode(value)}
                    show={currentSelection === selectionTargetEnum.MINUTES}
                />
            </div>
        </div>
    );
};

LcddDatePickerModal.propTypes = lcddDatePickerModalPropsTypes;
// TODO Fix PB Hours & minutes : select value != 0 then drag on 0 impossible

export default LcddDatePickerModal;
