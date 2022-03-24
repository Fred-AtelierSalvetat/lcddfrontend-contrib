import React, { FC } from 'react';

import PropTypes from 'prop-types';
/**
 * Used for title in pages: Intervenants (Speakers), Contactez-nous
 */
export const Wrapper: FC = ({ children }) => <div className="wrapper">{children}</div>;
Wrapper.propTypes = { children: PropTypes.node.isRequired };

/**
 * Used for sidebar in pages: profile
 */
export const SideBarWrapper: FC = ({ children }) => <div className="sidebar-wrapper">{children}</div>;
SideBarWrapper.propTypes = { children: PropTypes.node.isRequired };
