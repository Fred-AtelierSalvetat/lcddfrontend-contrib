import React, { FC, useState } from 'react';
import type { CSSProperties } from 'react';

import { fr } from 'date-fns/locale';
import className from 'classnames';

import Proptypes from 'prop-types';
import { width, height } from './clockConstants';

const selectionMonthProptypes = {
  month: Proptypes.number.isRequired,
  setMonth: Proptypes.func.isRequired,
  show: Proptypes.bool.isRequired,
};

const SelectionMonth: FC<Proptypes.InferProps<typeof selectionMonthProptypes>> = ({ month, setMonth, show }) => {
  const [hoveredItem, setHoveredItem] = useState(-1);
  const months: { value: number; label: string }[] = [];
  if (fr.localize) {
    for (let i = 0; i < 12; i++) {
      months.push({ value: i, label: fr.localize.month(i, { width: 'abbreviated' }) });
    }
  }

  return !show ? null : (
        <div className="tabSelection" style={{ width, height }}>
            {months.map(({ value, label }) => (
                <div
                    key={value}
                    style={{ '--aspect-ratio': 1 } as CSSProperties}
                    className={className({ selected: value === month, hovered: value === hoveredItem })}
                    onClick={() => setMonth(value)}
                    onMouseEnter={() => setHoveredItem(value)}
                    onMouseLeave={() => setHoveredItem(-1)}
                >
                    <p>{label}</p>
                </div>
            ))}
        </div>
  );
};

SelectionMonth.propTypes = selectionMonthProptypes;

export default SelectionMonth;
