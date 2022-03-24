import React, { FC, useRef, useState } from 'react';
import classNames from 'classnames';

import Proptypes from 'prop-types';
import {
  width,
  height,
  clockHandBaseRadius,
  clockAMExternalMargin,
  ctrlRadius,
  mainRowFontSize,
  secondaryRowFontSize,
  hoursClock,
} from './clockConstants';
import { getCtrlCenter, getAngle } from './clockUtils';

const selectionHoursProptypes = {
  hours: Proptypes.number.isRequired,
  setHours: Proptypes.func.isRequired,
  dragSelectionMode: Proptypes.bool.isRequired,
  setDragSelectionMode: Proptypes.func.isRequired,
  show: Proptypes.bool.isRequired,
};

const SelectionHours: FC<Proptypes.InferProps<typeof selectionHoursProptypes>> = ({
  hours,
  setHours,
  dragSelectionMode,
  setDragSelectionMode,
  show,
}) => {
  const refPanel = useRef<SVGGElement>(null);
  const [hoveredItem, setHoveredItem] = useState('none');

  const handleMouseDown = () => {
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousemove', handleMouseMove);
    setDragSelectionMode(true);
  };
  const handleMouseUp = () => {
    document.removeEventListener('mouseup', handleMouseUp);
    document.removeEventListener('mousemove', handleMouseMove);
    setDragSelectionMode(false);
  };
  const handleMouseMove = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const localMouseX = event.clientX - (refPanel.current ? refPanel.current.getBoundingClientRect().x : 0);
    const localMouseY = event.clientY - (refPanel.current ? refPanel.current.getBoundingClientRect().y : 0);
    const hours = Math.floor((Math.ceil((getAngle(localMouseX, localMouseY) * 12) / Math.PI) % 24) / 2);
    const innerCircleRadius = width / 2 - clockAMExternalMargin + ctrlRadius / 2;

    if ((localMouseX - width / 2) ** 2 + (localMouseY - height / 2) ** 2 < innerCircleRadius ** 2) {
      setHours(hours === 0 ? 12 : hours);
    } else {
      setHours(hours === 0 ? 0 : hours + 12);
    }
  };
  return !show ? null : (
        <svg width={width} height={height}>
            <circle className="clock" cx={width / 2} cy={height / 2} r={width / 2} />
            <circle className="clockHandBase" cx={width / 2} cy={height / 2} r={clockHandBaseRadius} />
            <g className="hoursClock" ref={refPanel}>
                {Object.keys(hoursClock).map((value) => {
                  const { cx, cy } = getCtrlCenter(hoursClock[value].externalMargin, hoursClock[value].angle);
                  return (
                        <g
                            key={hoursClock[value].label + hoursClock[value].angle}
                            className={classNames('figure', {
                              hovered: hoveredItem === hoursClock[value].label,
                            })}
                            onClick={() => {
                              setHours(value);
                            }}
                            onMouseEnter={() => setHoveredItem(hoursClock[value].label)}
                            onMouseLeave={() => setHoveredItem('none')}
                            onMouseDown={() => handleMouseDown()}
                            onMouseUp={() => handleMouseUp()}
                        >
                            <circle
                                className={classNames(
                                  'figureCircle',
                                  { selected: hours === +value },
                                  { hovered: hoveredItem === hoursClock[value].label },
                                  { preventMouseEvent: dragSelectionMode },
                                )}
                                cx={cx}
                                cy={cy}
                                r={ctrlRadius}
                            />
                            ;
                            <text
                                className={classNames(
                                  'figureText',
                                  { selected: hours === +value },
                                  { hovered: hoveredItem === hoursClock[value].label },
                                )}
                                x={cx}
                                y={cy}
                                fontSize={hoursClock[value].circle === 1 ? mainRowFontSize : secondaryRowFontSize}
                                textAnchor="middle"
                                dy={hoursClock[value].circle === 1 ? mainRowFontSize / 3 : secondaryRowFontSize / 3}
                            >
                                {hoursClock[value].label}
                            </text>
                        </g>
                  );
                })}

                <g transform={`rotate(${hoursClock[hours].angle}, ${width / 2}, ${height / 2})`}>
                    <line
                        className="clockHand"
                        x1={width / 2}
                        y1={height / 2}
                        x2={width / 2}
                        y2={hoursClock[hours].externalMargin + ctrlRadius * 2}
                        strokeWidth={1}
                        strokeLinecap="round"
                    />
                </g>
            </g>
        </svg>
  );
};

SelectionHours.propTypes = selectionHoursProptypes;

export default SelectionHours;
