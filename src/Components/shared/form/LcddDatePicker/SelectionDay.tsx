import React, { FC, useState } from 'react';
import type { CSSProperties } from 'react';
import className from 'classnames';
import { fr } from 'date-fns/locale';
import Proptypes from 'prop-types';
import { ReactComponent as RightArrowIcon } from '~/assets/icons/arrow_right.svg';
import { ReactComponent as LeftArrowIcon } from '~/assets/icons/arrow_left.svg';
import { width, height } from './clockConstants';

const selectionDayProptypes = {
  date: Proptypes.exact({
    day: Proptypes.number.isRequired,
    month: Proptypes.number.isRequired,
    year: Proptypes.number.isRequired,
  }).isRequired,
  setDate: Proptypes.func.isRequired,
  show: Proptypes.bool.isRequired,
};

const SelectionDay: FC<Proptypes.InferProps<typeof selectionDayProptypes>> = ({
  date: { day, month, year },
  setDate,
  show,
}) => {
  const [hoveredItem, setHoveredItem] = useState('none');

  // const getChoices = (decade) => ({
  //     decade: decade,
  //     list: Array.from({ length: 12 }, (_, i) => decade - 1 + i),
  //     decadeList: Array.from({ length: 10 }, (_, i) => decade + i),
  // });
  // const [choices, setChoices] = useState(getChoices(Math.floor(year / 10) * 10));

  const days: string[] = [];
  if (fr.localize) {
    for (let i = 1; i < 7; i++) {
      days.push(fr.localize.day(i, { width: 'short' }).toUpperCase());
    }
    days.push(fr.localize.day(0, { width: 'short' }).toUpperCase());
  }
  const getCalendar = (month, year) => {
    const dateCursor = new Date();
    dateCursor.setMonth(month);
    dateCursor.setFullYear(year);
    dateCursor.setDate(1);
    // Rewind till first Monday (to match locale calendar day start)
    while (dateCursor.getDay() != 1) {
      dateCursor.setDate(dateCursor.getDate() - 1);
    }
    const calendar: { id: string; day: number; month: number }[] = [];
    while (dateCursor.getMonth() <= month || (dateCursor.getMonth() === month + 1 && dateCursor.getDay() != 1)) {
      const cursorDay = dateCursor.getDate();
      const cursorMonth = dateCursor.getMonth();
      calendar.push({ id: `M${cursorMonth}D${cursorDay}`, day: cursorDay, month: cursorMonth });
      dateCursor.setDate(dateCursor.getDate() + 1);
    }
    return calendar;
  };
  const [choices, setChoices] = useState(getCalendar(month, year));

  const addAmountToMonth = (amount) => {
    const dateCursor = new Date();
    dateCursor.setFullYear(year);
    dateCursor.setMonth(month + amount);
    dateCursor.setDate(day);

    return { year: dateCursor.getFullYear(), month: dateCursor.getMonth(), day: dateCursor.getDate() };
  };

  return !show ? null : (
        <div className="selectionTabContainer" style={{ width, height }}>
            <LeftArrowIcon
                className="navArrow left"
                onClick={() => {
                  console.log({ year, month, day });
                  ({ year, month, day } = addAmountToMonth(-1));
                  console.log({ year, month, day });
                  setChoices(getCalendar(month, year));
                }}
            />
            <div className="tabSelection daySelection">
                {days.map((day) => (
                    <div key={day} style={{ '--aspect-ratio': 1 } as CSSProperties} className="header">
                        <p>{day}</p>
                    </div>
                ))}
                {choices.map((choice) => (
                    <div
                        key={choice.id}
                        style={{ '--aspect-ratio': 1 } as CSSProperties}
                        className={className({
                          selected: choice.month === month && choice.day === day,
                          hovered: choice.id === hoveredItem,
                          notInCurrentRange: choice.month !== month,
                        })}
                        onClick={() => {
                          setDate({ day: choice.day, month: choice.month });
                          choice.month !== month && setChoices(getCalendar(choice.month, year));
                        }}
                        onMouseEnter={() => setHoveredItem(choice.id)}
                        onMouseLeave={() => setHoveredItem('none')}
                    >
                        <p>{choice.day}</p>
                    </div>
                ))}
            </div>
            <RightArrowIcon className="navArrow right" />
        </div>
  );
};

SelectionDay.propTypes = selectionDayProptypes;

export default SelectionDay;
