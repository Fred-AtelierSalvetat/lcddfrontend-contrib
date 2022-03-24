import React, { Fragment, FC } from 'react';
import { useLocation, useHistory, matchPath, Redirect, Switch, Route } from 'react-router-dom';
import { ReactComponent as WorkShopsIcon } from '~/assets/icons/workshops_24px.svg';
import { ReactComponent as WorkshopCreationIcon } from '~/assets/icons/add_24px.svg';
// import { ReactComponent as QuestionsIcon } from '~/assets/icons/questions_24px.svg';
import { ReactComponent as UsersIcon } from '~/assets/icons/users_24px.svg';
// import { ReactComponent as AnalyticsIcon } from '~/assets/icons/analytics_24px.svg';
// import { ReactComponent as NotificationsIcon } from '~/assets/icons/notifications_24px.svg';
// import { ReactComponent as HelpIcon } from '~/assets/icons/help_24px.svg';
import ErrorBoundary from '~/Components/shared/ErrorBoundary';

import AlertNotificationBox from './AlertNotificationBox';

import './Dashboard.scss';

const UserManagement = React.lazy(() => import('./usermanagement/UserManagement'));
const NewWorkshop = React.lazy(() => import('./newWorkshop/NewWorkshop'));
const Workshops = React.lazy(() => import('./workshops/Workshops'));
const EditWorkshop = React.lazy(() => import('./editWorkshop/EditWorkshop'));
const GoLive = React.lazy(() => import('./goLive/GoLive'));

const Dashboard: FC = () => {
    const location = useLocation();
    const history = useHistory();

    interface PageDesc {
        icon: JSX.Element;
        label: JSX.Element;
        href: string;
        page: JSX.Element;
    }
    const pages: PageDesc[] = [
        {
            icon: <WorkShopsIcon />,
            label: <p>Ateliers</p>,
            href: '/dashboard/workshops',
            page: <Workshops />,
        },
        // {
        //     icon: <QuestionsIcon />,
        //     label: <p>Questions</p>,
        //     href: '#/dashboard/questions',
        //     page: <p>Questions</p>,
        // },
        {
            icon: <WorkshopCreationIcon />,
            label: (
                <p>
                    Créer
                    <br />
                    un atelier
                </p>
            ),
            href: '/dashboard/newWorkshop',
            page: <NewWorkshop />,
        },
        {
            icon: <UsersIcon />,
            label: (
                <p>
                    Gestion
                    <br />
                    utilisateurs
                </p>
            ),
            href: '/dashboard/users',
            page: <UserManagement />,
        },
        {
            href: '/dashboard/editWorkshop/:id',
            page: <EditWorkshop />,
        },
        {
            href: '/dashboard/goLive/:id',
            page: <GoLive />,
        },
        // {
        //     icon: <AnalyticsIcon />,
        //     label: <p>Analytics</p>,
        //     href: '#/dashboard/analytics',
        //     page: <p>Analytics</p>,
        //     disabled: true,
        // },
        // {
        //     icon: <NotificationsIcon />,
        //     label:  <p>Notifications</p>,
        //     href: '#/dashboard/notifications',
        //     page: <p>Notifications</p>,
        //     disabled: true,
        // },
        // {
        //     icon: <HelpIcon />,
        //     label: <p>Aide</p>,
        //     href: '#/dashboard/help',
        //     page: <p>Help</p>,
        //     disabled: true,
        // },
    ];

    return (
        <ErrorBoundary>
            <div id="lcdd-dashboard">
                <div id="lcdd-dashboard-navbar">
                    {pages
                        .filter((page) => !!page.icon)
                        .map((page_desc) => (
                            <Fragment key={page_desc.href}>
                                <input
                                    type="radio"
                                    id={page_desc.href}
                                    value={page_desc.href}
                                    checked={
                                        !!matchPath(location.pathname, {
                                            path: page_desc.href,
                                            exact: true,
                                            strict: true,
                                        })
                                    }
                                    onChange={(changeEvent) => history.push(changeEvent.target.value)}
                                />
                                <label htmlFor={page_desc.href}>
                                    <div>
                                        {page_desc.icon}
                                        {page_desc.label}
                                    </div>
                                </label>
                            </Fragment>
                        ))}
                    <div className="selection-sliding-background" />
                </div>
                <div id="lcdd-dashboard-page">
                    <AlertNotificationBox />
                    <Switch>
                        {pages.map((page_desc) => (
                            <Route exact strict key={page_desc.href} path={page_desc.href}>
                                {page_desc.page}
                            </Route>
                        ))}
                        <Route exact strict path="/dashboard" />
                        <Route path="*">
                            <Redirect to="/no-match" />;
                        </Route>
                    </Switch>
                </div>
            </div>
        </ErrorBoundary>
    );
};

export default Dashboard;
