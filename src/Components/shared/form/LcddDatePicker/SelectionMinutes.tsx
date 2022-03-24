import React, { FC, useRef, useState } from 'react';
import classNames from 'classnames';

import Proptypes from 'prop-types';
import {
  width,
  height,
  clockHandBaseRadius,
  ctrlRadius,
  mainRowFontSize,
  minutesClock,
  clockMinutesExternalMargin,
} from './clockConstants';
import { getCtrlCenter, getAngle } from './clockUtils';

const selectionMinutesProptypes = {
  minutes: Proptypes.number.isRequired,
  setMinutes: Proptypes.func.isRequired,
  dragSelectionMode: Proptypes.bool.isRequired,
  setDragSelectionMode: Proptypes.func.isRequired,
  show: Proptypes.bool.isRequired,
};

const SelectionMinutes: FC<Proptypes.InferProps<typeof selectionMinutesProptypes>> = ({
  minutes,
  setMinutes,
  dragSelectionMode,
  setDragSelectionMode,
  show,
}) => {
  const refPanel = useRef<SVGGElement>(null);
  const [hoveredItem, setHoveredItem] = useState('none');

  const setMinutesFromPousePos = (event) => {
    const localMouseX = event.clientX - (refPanel.current ? refPanel.current.getBoundingClientRect().x : 0);
    const localMouseY = event.clientY - (refPanel.current ? refPanel.current.getBoundingClientRect().y : 0);
    setMinutes(Math.floor((Math.ceil((getAngle(localMouseX, localMouseY) * 60) / Math.PI) % 120) / 2));
  };

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
    setMinutesFromPousePos(event);
  };
  return !show ? null : (
        <svg width={width} height={height}>
            <circle className="clock" cx={width / 2} cy={height / 2} r={width / 2} />
            <circle className="clockHandBase" cx={width / 2} cy={height / 2} r={clockHandBaseRadius} />
            <g className="minutesClock" ref={refPanel}>
                <circle
                    className="minutesHiddenPanel"
                    cx={width / 2}
                    cy={height / 2}
                    r={width / 2}
                    fill="transparent"
                    onClick={(event) => {
                      event.preventDefault();
                      setMinutesFromPousePos(event);
                    }}
                />
                {Object.keys(minutesClock).map((value) => {
                  const { cx, cy } = getCtrlCenter(clockMinutesExternalMargin, minutesClock[value].angle);
                  return (
                        <g
                            key={minutesClock[value].label + minutesClock[value].angle}
                            className={classNames('figure', {
                              hovered: hoveredItem === minutesClock[value].label,
                            })}
                            onClick={() => setMinutes(value)}
                            onMouseEnter={() => setHoveredItem(minutesClock[value].label)}
                            onMouseLeave={() => setHoveredItem('none')}
                            onMouseDown={() => handleMouseDown()}
                            onMouseUp={() => handleMouseUp()}
                        >
                            <circle
                                className={classNames(
                                  'figureCircle',
                                  { selected: minutes === +value },
                                  { hovered: hoveredItem === minutesClock[value].label },
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
                                  { selected: minutes === +value },
                                  { hovered: hoveredItem === minutesClock[value].label },
                                )}
                                x={cx}
                                y={cy}
                                fontSize={mainRowFontSize}
                                textAnchor="middle"
                                dy={mainRowFontSize / 3}
                            >
                                {minutesClock[value].label}
                            </text>
                        </g>
                  );
                })}

                <g transform={`rotate(${minutes * 6}, ${width / 2}, ${height / 2})`}>
                    {minutes in minutesClock ? (
                        <line
                            className="clockHand"
                            x1={width / 2}
                            y1={height / 2}
                            x2={width / 2}
                            y2={clockMinutesExternalMargin + ctrlRadius * 2}
                            strokeWidth={1}
                            strokeLinecap="round"
                        />
                    ) : (
                        <>
                            <circle
                                className="untrackedMinuteSelected"
                                onMouseDown={() => handleMouseDown()}
                                onMouseUp={() => handleMouseUp()}
                                cx={width / 2}
                                cy={clockMinutesExternalMargin + ctrlRadius}
                                r={clockHandBaseRadius}
                            />
                            <line
                                className="clockHand"
                                x1={width / 2}
                                y1={height / 2}
                                x2={width / 2}
                                y2={clockMinutesExternalMargin + ctrlRadius + clockHandBaseRadius}
                                strokeWidth={1}
                                strokeLinecap="round"
                            />
                        </>
                    )}
                </g>
            </g>
        </svg>
  );
};

SelectionMinutes.propTypes = selectionMinutesProptypes;

export default SelectionMinutes;
