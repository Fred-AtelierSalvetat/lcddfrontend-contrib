import React, { FC, useState } from 'react';
import type { CSSProperties } from 'react';
import className from 'classnames';

import Proptypes from 'prop-types';
import { width, height } from './clockConstants';

import { ReactComponent as RightArrowIcon } from '~/assets/icons/arrow_right.svg';
import { ReactComponent as LeftArrowIcon } from '~/assets/icons/arrow_left.svg';

const selectionYearProptypes = {
  year: Proptypes.number.isRequired,
  setYear: Proptypes.func.isRequired,
  show: Proptypes.bool.isRequired,
};

const SelectionYear: FC<Proptypes.InferProps<typeof selectionYearProptypes>> = ({ year, setYear, show }) => {
  const [hoveredItem, setHoveredItem] = useState(-1);

  const getChoices = (decade) => ({
    decade,
    list: Array.from({ length: 12 }, (_, i) => decade - 1 + i),
    decadeList: Array.from({ length: 10 }, (_, i) => decade + i),
  });
  const [choices, setChoices] = useState(getChoices(Math.floor(year / 10) * 10));

  return !show ? null : (
        <div className="selectionTabContainer" style={{ width, height }}>
            <LeftArrowIcon className="navArrow left" onClick={() => setChoices(getChoices(choices.decade - 10))} />
            <div className="tabSelection">
                {choices.list.map((yearChoice) => (
                    <div
                        key={yearChoice}
                        style={{ '--aspect-ratio': 1 } as CSSProperties}
                        className={className({
                          selected: yearChoice === year,
                          hovered: yearChoice === hoveredItem,
                          notInCurrentRange: !choices.decadeList.includes(yearChoice),
                        })}
                        onClick={() => {
                          !choices.decadeList.includes(yearChoice)
                                && setChoices(getChoices(Math.floor(yearChoice / 10) * 10));
                          setYear(yearChoice);
                        }}
                        onMouseEnter={() => setHoveredItem(yearChoice)}
                        onMouseLeave={() => setHoveredItem(-1)}
                    >
                        <p>{yearChoice}</p>
                    </div>
                ))}
            </div>
            <RightArrowIcon className="navArrow right" onClick={() => setChoices(getChoices(choices.decade + 10))} />
        </div>
  );
};

SelectionYear.propTypes = selectionYearProptypes;

export default SelectionYear;
