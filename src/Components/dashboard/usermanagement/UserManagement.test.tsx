import React from 'react';
import { mount } from 'enzyme';
import {
  fireEvent, screen, cleanup, render, within,
} from '@testing-library/react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { MemoryRouter, Route } from 'react-router-dom';

import { rootReducer, reducersList } from '~/state/reducers';

import UserManagement from './UserManagement';

import * as roles from '~/state/users/constants/roles';
import { fakeDatabase } from '~/api/fetchUsers';

describe('<UserManagement /> ', () => {
  let store;
  const globalStateWithUsers = {};
  const mockStore = configureMockStore([thunk]);

  beforeEach(() => {
    const mockStore = configureMockStore([thunk]);
    for (const prop of Object.getOwnPropertyNames(reducersList)) {
      globalStateWithUsers[prop] = undefined;
    }
    globalStateWithUsers.users = {
      users: fakeDatabase,
      uiFilters: {
        role: 'admin',
        search: '',
      },
    };
    store = mockStore(rootReducer(globalStateWithUsers, { type: undefined }));
  });

  it('renders without crashing', () => {
    render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/users']}>
                    <Route path="/users">
                        <UserManagement />
                    </Route>
                </MemoryRouter>
            </Provider>,
    );
  });

  it('proposes 3 tabs : "Admins", "Intervants" and "Utilisateurs"', () => {
    // Call URL with query param to avoid redirection on URL + query param
    // Set role value in store, that's the one used
    render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/users?tab=admin']}>
                    <Route path="/users">
                        <UserManagement />
                    </Route>
                </MemoryRouter>
            </Provider>,
    );
    const tabs = screen.getAllByRole('tab');
    expect(tabs).to.have.length(3);
    expect(within(tabs[0]).queryByText('Admins')).toBeInTheDocument();
    expect(within(tabs[1]).queryByText('Intervenants')).toBeInTheDocument();
    expect(within(tabs[2]).queryByText('Utilisateurs')).toBeInTheDocument();
  });

  it("'s 'Admins' tab selection should display the admin table with the specified columns", () => {
    render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/users?tab=admin']}>
                    <Route path="/users">
                        <UserManagement />
                    </Route>
                </MemoryRouter>
            </Provider>,
    );
    const awaitedHeaders = [
      'Nom',
      'Prénom',
      'Téléphone',
      'E-mail Pro',
      'E-mail Perso',
      'Ville',
      'Status',
      'Actions',
      '',
    ];

    const renderedHeaders = within(screen.getByRole('tabpanel')).getAllByRole('heading');
    expect(renderedHeaders).to.have.lengthOf(awaitedHeaders.length);
    awaitedHeaders.forEach((label, index) => expect(renderedHeaders[index]).toHaveTextContent(label));
  });

  it("'s 'Admins' tab's table should allow 'Revenir intervenant' action", async () => {
    const targetActionLabel = 'Revenir intervenant';
    render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/users?tab=admin']}>
                    <Route path="/users">
                        <UserManagement />
                    </Route>
                </MemoryRouter>
            </Provider>,
    );
    expect(screen.queryByText(targetActionLabel)).to.be.null;
    fireEvent.click(screen.getAllByTitle('openUserActionMenu')[0]);
    await screen.findByText(targetActionLabel);
  });

  it("'s 'Admins' tab's table should allow 'Supprimer' action", async () => {
    const targetActionLabel = 'Supprimer';
    render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/users?tab=admin']}>
                    <Route path="/users">
                        <UserManagement />
                    </Route>
                </MemoryRouter>
            </Provider>,
    );
    expect(screen.queryByText(targetActionLabel)).to.be.null;
    fireEvent.click(screen.getAllByTitle('openUserActionMenu')[0]);
    await screen.findByText(targetActionLabel);
  });

  it("'s 'Intervenants' tab selection should display the speakers table with the specified columns", () => {
    globalStateWithUsers.users.uiFilters.role = roles.SPEAKER_ROLE_KEY;
    store = mockStore(rootReducer(globalStateWithUsers, { type: undefined }));
    render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/users']}>
                    <Route path="/users">
                        <UserManagement />
                    </Route>
                </MemoryRouter>
            </Provider>,
    );
    const awaitedHeaders = [
      'Nom',
      'Prénom',
      'Téléphone',
      'E-mail Pro',
      'E-mail Perso',
      'Ville',
      'Status',
      'Actions',
      '',
    ];
    const renderedHeaders = within(screen.getByRole('tabpanel')).getAllByRole('heading');
    expect(renderedHeaders).to.have.lengthOf(awaitedHeaders.length);
    awaitedHeaders.forEach((label, index) => expect(renderedHeaders[index]).toHaveTextContent(label));
  });

  it("'s 'Intervenants' tab's table should allow 'Promouvoir admin' action on validated speakers", async () => {
    globalStateWithUsers.users.uiFilters.role = roles.SPEAKER_ROLE_KEY;
    store = mockStore(rootReducer(globalStateWithUsers, { type: undefined }));
    const targetActionLabel = 'Promouvoir admin';
    const targetUser = store.getState().users.users.filter((user) => user.role === roles.ROLE_SPEAKER)[0];
    render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/users']}>
                    <Route path="/users">
                        <UserManagement />
                    </Route>
                </MemoryRouter>
            </Provider>,
    );
    expect(screen.queryByText(targetActionLabel)).to.be.null;
    fireEvent.click(
      within(within(screen.getByRole('tabpanel')).getByTestId(targetUser.user_id)).getByTitle(
        'openUserActionMenu',
      ),
    );
    await screen.findByText(targetActionLabel);
  });

  it("'s 'Intervenants' tab's table should allow 'Valider candidat' action on speakers awaiting validation", async () => {
    globalStateWithUsers.users.uiFilters.role = roles.SPEAKER_ROLE_KEY;
    store = mockStore(rootReducer(globalStateWithUsers, { type: undefined }));
    const targetActionLabel = 'Valider candidat';
    const targetUser = store
      .getState()
      .users.users.filter((user) => user.role === roles.ROLE_SPEAKER_AWAITING_VALIDATION)[0];
    render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/users']}>
                    <Route path="/users">
                        <UserManagement />
                    </Route>
                </MemoryRouter>
            </Provider>,
    );
    expect(screen.queryByText(targetActionLabel)).to.be.null;
    fireEvent.click(
      within(within(screen.getByRole('tabpanel')).getByTestId(targetUser.user_id)).getByTitle(
        'openUserActionMenu',
      ),
    );
    await screen.findByText(targetActionLabel);
  });

  it("'s 'Utilisateurs' tab selection should display the users table with the specified columns", () => {
    globalStateWithUsers.users.uiFilters.role = roles.USER_ROLE_KEY;
    store = mockStore(rootReducer(globalStateWithUsers, { type: undefined }));
    render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/users']}>
                    <Route path="/users">
                        <UserManagement />
                    </Route>
                </MemoryRouter>
            </Provider>,
    );
    const awaitedHeaders = ['Nom', 'Prénom', 'E-mail', 'Ville', 'Rôle', 'Status', 'Actions'];
    const renderedHeaders = within(screen.getByRole('tabpanel')).getAllByRole('heading');
    expect(renderedHeaders).to.have.lengthOf(awaitedHeaders.length);
    awaitedHeaders.forEach((label, index) => expect(renderedHeaders[index]).toHaveTextContent(label));
  });
  it("'s 'Utilisateurs' tab's table should allow 'Inviter à intervenir' action on legal professional users", async () => {
    globalStateWithUsers.users.uiFilters.role = roles.USER_ROLE_KEY;
    store = mockStore(rootReducer(globalStateWithUsers, { type: undefined }));
    const targetActionLabel = 'Inviter à intervenir';
    const targetUser = store.getState().users.users.filter((user) => user.role === roles.ROLE_PRO_USER)[0];
    render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/users']}>
                    <Route path="/users">
                        <UserManagement />
                    </Route>
                </MemoryRouter>
            </Provider>,
    );
    expect(screen.queryByText(targetActionLabel)).to.be.null;
    fireEvent.click(
      within(within(screen.getByRole('tabpanel')).getByTestId(targetUser.user_id)).getByTitle(
        'openUserActionMenu',
      ),
    );
    await screen.findByText(targetActionLabel);
  });

  it("'s 'Utilisateurs' tab's table should allow 'Supprimer' action", async () => {
    globalStateWithUsers.users.uiFilters.role = roles.USER_ROLE_KEY;
    store = mockStore(rootReducer(globalStateWithUsers, { type: undefined }));
    const targetActionLabel = 'Supprimer';
    render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/users']}>
                    <Route path="/users">
                        <UserManagement />
                    </Route>
                </MemoryRouter>
            </Provider>,
    );
    expect(screen.queryByText(targetActionLabel)).to.be.null;
    fireEvent.click(screen.getAllByTitle('openUserActionMenu')[0]);
    await screen.findByText(targetActionLabel);
  });

  it('should filter users according to role', () => {
    globalStateWithUsers.users.uiFilters.role = roles.USER_ROLE_KEY;
    store = mockStore(rootReducer(globalStateWithUsers, { type: undefined }));
    const targetUser = store.getState().users.users.filter((user) => user.role === roles.ROLE_CITIZEN)[0];
    render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/users']}>
                    <Route path="/users">
                        <UserManagement />
                    </Route>
                </MemoryRouter>
            </Provider>,
    );
    expect(within(screen.getByRole('tabpanel')).queryByTestId(targetUser.user_id)).toBeInTheDocument();
    cleanup();
    globalStateWithUsers.users.uiFilters.role = roles.ADMIN_ROLE_KEY;
    store = mockStore(rootReducer(globalStateWithUsers, { type: undefined }));
    render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/users']}>
                    <Route path="/users">
                        <UserManagement />
                    </Route>
                </MemoryRouter>
            </Provider>,
    );
    expect(within(screen.getByRole('tabpanel')).queryByTestId(targetUser.user_id)).not.toBeInTheDocument();
  });

  it('should filter users firstname and lastname according to searchbox content', () => {
    globalStateWithUsers.users.uiFilters.role = roles.USER_ROLE_KEY;
    store = mockStore(rootReducer(globalStateWithUsers, { type: undefined }));
    render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/users/admin']}>
                    <Route path={['/users/:roleFilter']}>
                        <UserManagement />
                    </Route>
                </MemoryRouter>
            </Provider>,
    );
    // Note: Add the header row to the count
    expect(within(screen.getByRole('tabpanel')).getAllByRole('row')).to.have.length(21);
    cleanup();
    globalStateWithUsers.users.uiFilters.search = 'Martin'; // Should return 6 users + 1 header row
    store = mockStore(rootReducer(globalStateWithUsers, { type: undefined }));
    render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/users/admin']}>
                    <Route path={['/users/:roleFilter']}>
                        <UserManagement />
                    </Route>
                </MemoryRouter>
            </Provider>,
    );
    expect(within(screen.getByRole('tabpanel')).getAllByRole('row')).to.have.length(7);
  });

  it('should match its reference snapshot', () => {
    const wrapper = mount(
            <Provider store={store}>
                <MemoryRouter keyLength={0} initialEntries={['/users']}>
                    <Route path={['/users']}>
                        <UserManagement />
                    </Route>
                </MemoryRouter>
            </Provider>,
    );
    expect(wrapper).to.matchSnapshot();
  });
});
