/* eslint-disable react/prop-types */
// To prevent warning on inline React component

import React, { FC, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { Redirect, useLocation, useHistory, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

import { ReactComponent as ToggleOnIcon } from '~/assets/icons/toggle_on_24px.svg';
import { ReactComponent as ToggleOffIcon } from '~/assets/icons/toggle_off_24px.svg';
import { ReactComponent as DeleteForeverIcon } from '~/assets/icons/delete_forever_16px.svg';
import { ReactComponent as SettingsIcon } from '~/assets/icons/settings_backup_restore_24px.svg';
import { ReactComponent as ValidateIcon } from '~/assets/icons/validate_24px.svg';
import { ReactComponent as InviteSpeakerIcon } from '~/assets/icons/group_add_24px.svg';
import { ReactComponent as DotsIcon } from '~/assets/icons/more_horiz_24px.svg';

import * as userStatus from '~/state/users/constants/status';
import * as userRoles from '~/state/users/constants/roles';
import * as actionTypes from '~/state/users/constants/actionTypes';
import * as usersAction from '~/state/users/actions';
import { User as UserType } from '~/state/users/model';
import {
    getVisibleUsers,
    isRequestInProgress,
    roleFilterSelector,
    getRoles,
    searchFilterSelector,
} from '~/state/reducers';
import ErrorBoundary from '~/Components/shared/ErrorBoundary';
import SearchBox from '~/Components/shared/SearchBox/SearchBox';
import ActionMenuPopover from '~/Components/shared/actionMenuPopover/ActionMenuPopover';
import Action from '~/Components/shared/actionMenuPopover/Action';
import ConfirmDialog from '~/Components/shared/modals/ConfirmDialog';

import './UserManagement.scss';

const UserManagement: FC = () => {
    const location = useLocation();
    const UrlQueryParam = new URLSearchParams(location.search);
    const roleParam = UrlQueryParam.get('tab');

    const history = useHistory();
    const dispatch = useDispatch();
    const [users, setUsers] = useState<UserType[]>([]);

    const role = useSelector(roleFilterSelector);
    const visibleUsers = useSelector(getVisibleUsers);
    const isFetching = useSelector(isRequestInProgress(actionTypes.FETCH_USERS_REQUEST));
    const searchBoxValue = useSelector(searchFilterSelector);

    useEffect(() => {
        setUsers(visibleUsers);
    }, [visibleUsers]);

    useEffect(() => {
        const fetchAction = usersAction.fetchUsers({
            failureAlertMsg: (
                <div className="JSXalertMsg">
                    <span>Echec du chargement des données utilisateurs</span>
                    <Button
                        className="retry"
                        onClick={() => {
                            dispatch(fetchAction);
                        }}
                    >
                        Relancer
                    </Button>
                </div>
            ),
        });
        dispatch(fetchAction);
    }, []);

    const getURLwithQueryParam = (value) => `${location.pathname}?tab=${value}`;

    if (!roleParam || !getRoles().includes(roleParam)) {
        return <Redirect to={`${getURLwithQueryParam(role)}`} />;
    }
    if (role !== roleParam) dispatch(usersAction.setUsersRoleFilter(roleParam));

    const tabs_desc: {
        tab_label: string;
        uri_filter: string;
        table_columns: {
            key: string;
            renderHeader: () => JSX.Element;
            renderCell: (any) => ReactNode;
        }[];
    }[] = [
        {
            tab_label: 'Admins',
            uri_filter: userRoles.ADMIN_ROLE_KEY,
            table_columns: [
                {
                    key: 'lastname',
                    renderHeader: () => <div>Nom</div>,
                    renderCell: ({ lastname }) => <p>{lastname}</p>,
                },
                {
                    key: 'firstname',
                    renderHeader: () => <div>Prénom</div>,
                    renderCell: ({ firstname }) => <p>{firstname}</p>,
                },
                { key: 'phone', renderHeader: () => <div>Téléphone</div>, renderCell: ({ phone }) => <p>{phone}</p> },
                {
                    key: 'email_pro',
                    renderHeader: () => <div>E-mail Pro</div>,
                    renderCell: ({ email_pro }) => <p>{email_pro}</p>,
                },
                {
                    key: 'email',
                    renderHeader: () => <div>E-mail Perso</div>,
                    renderCell: ({ email }) => <p>{email}</p>,
                },
                { key: 'town', renderHeader: () => <div>Ville</div>, renderCell: ({ town }) => <p>{town}</p> },
                {
                    key: 'status',
                    renderHeader: () => <div className="CenteredHeader">Status</div>,

                    renderCell: ({ user_id, status }) => (
                        <div className="userStatus">
                            {status === userStatus.ACTIVE && (
                                <ToggleOnIcon onClick={() => dispatch(usersAction.deactivateUser(user_id))} />
                            )}
                            {status === userStatus.INACTIVE && (
                                <ToggleOffIcon onClick={() => dispatch(usersAction.activateUser(user_id))} />
                            )}
                        </div>
                    ),
                },
                {
                    key: 'actions',
                    renderHeader: () => <div className="CenteredHeader">Actions</div>,
                    renderCell: ({ user_id }) => (
                        <ActionMenuPopover icon={<DotsIcon title="openUserActionMenu" />} placement="bottom-end">
                            <Action
                                icon={<SettingsIcon />}
                                label="Revenir intervenant"
                                action={() => dispatch(usersAction.revokeUserAdminRight(user_id))}
                            />
                            <Action
                                icon={<DeleteForeverIcon />}
                                label="Supprimer"
                                modalConfirmation={
                                    <ConfirmDialog
                                        show
                                        title="Supprimer cet utilisateur"
                                        body="Cette action n’est pas réversible."
                                        cancelButton="Annuler"
                                        okButton="Supprimer"
                                        handleClose={() => {}}
                                        handleConfirm={() => dispatch(usersAction.deleteUser(user_id))}
                                    />
                                }
                            />
                        </ActionMenuPopover>
                    ),
                },
                {
                    key: 'profile',
                    renderHeader: () => <div />,
                    renderCell: ({ user_id }) => <Link to={`/profile/${user_id}`}>Voir profil</Link>,
                },
            ],
        },
        {
            tab_label: 'Intervenants',
            uri_filter: userRoles.SPEAKER_ROLE_KEY,
            table_columns: [
                {
                    key: 'lastname',
                    renderHeader: () => <div>Nom</div>,
                    renderCell: ({ lastname }) => <p>{lastname}</p>,
                },
                {
                    key: 'firstname',
                    renderHeader: () => <div>Prénom</div>,
                    renderCell: ({ firstname }) => <p>{firstname}</p>,
                },
                { key: 'phone', renderHeader: () => <div>Téléphone</div>, renderCell: ({ phone }) => <p>{phone}</p> },
                {
                    key: 'email_pro',
                    renderHeader: () => <div>E-mail Pro</div>,
                    renderCell: ({ email_pro }) => <p>{email_pro}</p>,
                },
                {
                    key: 'email',
                    renderHeader: () => <div>E-mail Perso</div>,
                    renderCell: ({ email }) => <p>{email}</p>,
                },
                { key: 'town', renderHeader: () => <div>Ville</div>, renderCell: ({ town }) => <p>{town}</p> },
                {
                    key: 'status',
                    renderHeader: () => <div className="CenteredHeader">Status</div>,
                    renderCell: ({ user_id, role, status }) => (
                        <div className="Centered">
                            {role === userRoles.ROLE_SPEAKER_AWAITING_ANSWER && (
                                <div className="speakerStatus speakerAwaitingAnswer">
                                    <p>En attente</p>
                                </div>
                            )}
                            {role === userRoles.ROLE_SPEAKER_AWAITING_VALIDATION && (
                                <div className="speakerStatus speakerAwaitingValidation">
                                    <p>A valider</p>
                                </div>
                            )}
                            {role !== userRoles.ROLE_SPEAKER_AWAITING_ANSWER &&
                                role !== userRoles.ROLE_SPEAKER_AWAITING_VALIDATION && (
                                    <div className="userStatus">
                                        {status === userStatus.ACTIVE && (
                                            <ToggleOnIcon
                                                onClick={() => dispatch(usersAction.deactivateUser(user_id))}
                                            />
                                        )}
                                        {status === userStatus.INACTIVE && (
                                            <ToggleOffIcon
                                                onClick={() => dispatch(usersAction.activateUser(user_id))}
                                            />
                                        )}
                                    </div>
                                )}
                        </div>
                    ),
                },
                {
                    key: 'actions',
                    renderHeader: () => <div className="CenteredHeader">Actions</div>,
                    renderCell: ({ role, user_id }) => (
                        <ActionMenuPopover icon={<DotsIcon title="openUserActionMenu" />} placement="bottom-end">
                            {role === userRoles.ROLE_SPEAKER && (
                                <Action
                                    icon={<SettingsIcon />}
                                    label="Promouvoir admin"
                                    action={() => dispatch(usersAction.promoteUserToAdmin(user_id))}
                                />
                            )}
                            {role === userRoles.ROLE_SPEAKER_AWAITING_VALIDATION && (
                                <Action
                                    icon={<ValidateIcon />}
                                    label="Valider candidat"
                                    action={() => dispatch(usersAction.validateSpeaker(user_id))}
                                />
                            )}
                            <Action
                                icon={<DeleteForeverIcon />}
                                label="Supprimer"
                                modalConfirmation={
                                    <ConfirmDialog
                                        show
                                        title="Supprimer cet utilisateur"
                                        body="Cette action n’est pas réversible."
                                        cancelButton="Annuler"
                                        okButton="Supprimer"
                                        handleClose={() => {}}
                                        handleConfirm={() => dispatch(usersAction.deleteUser(user_id))}
                                    />
                                }
                            />
                        </ActionMenuPopover>
                    ),
                },
                {
                    key: 'profile',
                    renderHeader: () => <div />,
                    renderCell: ({ user_id }) => <Link to={`/profile/${user_id}`}>Voir profil</Link>,
                },
            ],
        },
        {
            tab_label: 'Utilisateurs',
            uri_filter: userRoles.USER_ROLE_KEY,
            table_columns: [
                {
                    key: 'lastname',
                    renderHeader: () => <div>Nom</div>,
                    renderCell: ({ lastname }) => <p>{lastname}</p>,
                },
                {
                    key: 'firstname',
                    renderHeader: () => <div>Prénom</div>,
                    renderCell: ({ firstname }) => <p>{firstname}</p>,
                },
                { key: 'email', renderHeader: () => <div>E-mail</div>, renderCell: ({ email }) => <p>{email}</p> },
                { key: 'town', renderHeader: () => <div>Ville</div>, renderCell: ({ town }) => <p>{town}</p> },
                {
                    key: 'role',
                    renderHeader: () => <div>Rôle</div>,
                    renderCell: ({ role }) => (
                        <p>
                            {role
                                .replace(userRoles.ROLE_SPEAKER_AWAITING_ANSWER, userRoles.ROLE_PRO_USER)
                                .replace(userRoles.ROLE_SPEAKER_AWAITING_VALIDATION, userRoles.ROLE_PRO_USER)
                                .replace(userRoles.ROLE_SPEAKER, userRoles.ROLE_PRO_USER)}
                        </p>
                    ),
                },

                {
                    key: 'status',
                    renderHeader: () => <div className="CenteredHeader">Status</div>,
                    renderCell: ({ user_id, status }) => (
                        <div className="userStatus">
                            {status === userStatus.ACTIVE && (
                                <ToggleOnIcon onClick={() => dispatch(usersAction.deactivateUser(user_id))} />
                            )}
                            {status === userStatus.INACTIVE && (
                                <ToggleOffIcon onClick={() => dispatch(usersAction.activateUser(user_id))} />
                            )}
                        </div>
                    ),
                },
                {
                    key: 'actions',
                    renderHeader: () => <div className="CenteredHeader">Actions</div>,
                    renderCell: ({ role, user_id }) => (
                        <ActionMenuPopover icon={<DotsIcon title="openUserActionMenu" />} placement="bottom-end">
                            {role === userRoles.ROLE_PRO_USER && (
                                <Action
                                    icon={<InviteSpeakerIcon />}
                                    label="Inviter à intervenir"
                                    action={() => dispatch(usersAction.promoteUserToSpeaker(user_id))}
                                />
                            )}
                            <Action
                                icon={<DeleteForeverIcon />}
                                label="Supprimer"
                                modalConfirmation={
                                    <ConfirmDialog
                                        show
                                        title="Supprimer cet utilisateur"
                                        body="Cette action n’est pas réversible."
                                        cancelButton="Annuler"
                                        okButton="Supprimer"
                                        handleClose={() => {}}
                                        handleConfirm={() => dispatch(usersAction.deleteUser(user_id))}
                                    />
                                }
                            />
                        </ActionMenuPopover>
                    ),
                },
            ],
        },
    ];

    return (
        <ErrorBoundary>
            {!users.length && isFetching ? (
                <p>Chargement...</p>
            ) : (
                <div className="table_and_filters_pane">
                    <Tab.Container>
                        <Nav variant="pills">
                            {tabs_desc.map((tab_desc) => (
                                <Nav.Item key={`tab_${tab_desc.tab_label}`}>
                                    <Nav.Link
                                        active={tab_desc.uri_filter === role}
                                        onClick={() => history.push(`${getURLwithQueryParam(tab_desc.uri_filter)}`)}
                                    >
                                        {tab_desc.tab_label}
                                    </Nav.Link>
                                </Nav.Item>
                            ))}
                            <div className="searchbox-container">
                                <SearchBox
                                    placeholder="Rechercher un utilisateur"
                                    value={searchBoxValue}
                                    setValue={(value) => dispatch(usersAction.setUsersSearchFilter(value))}
                                />
                            </div>
                        </Nav>

                        <Tab.Content>
                            {tabs_desc.map((tab_desc) => (
                                <Tab.Pane key={`pane_${tab_desc.tab_label}`} active={tab_desc.uri_filter === role}>
                                    <Table borderless role="table">
                                        <thead role="rowgroup">
                                            <tr role="row">
                                                {tab_desc.table_columns.map((col) => (
                                                    <th role="heading" key={tab_desc.tab_label + col.key}>
                                                        {col.renderHeader()}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody role="rowgroup">
                                            {users.map((user) => (
                                                <tr
                                                    role="row"
                                                    data-testid={process.env.NODE_ENV === 'test' ? user.user_id : ''}
                                                    key={tab_desc.tab_label + user.user_id}
                                                >
                                                    {tab_desc.table_columns.map((col) => (
                                                        <td
                                                            role="cell"
                                                            key={tab_desc.tab_label + user.user_id + col.key}
                                                        >
                                                            {col.renderCell && col.renderCell(user)}
                                                        </td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </Tab.Pane>
                            ))}
                        </Tab.Content>
                    </Tab.Container>
                </div>
            )}
        </ErrorBoundary>
    );
};

export default UserManagement;
