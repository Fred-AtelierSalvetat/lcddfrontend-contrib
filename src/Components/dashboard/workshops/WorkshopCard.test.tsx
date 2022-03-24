import React from 'react';
import { mount } from 'enzyme';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { MemoryRouter, Route } from 'react-router-dom';
import format from 'date-fns/format';
import { fr } from 'date-fns/locale';

import WorkshopCard from './WorkshopCard';

import * as status from '~/state/workshops/constants/status';

describe('<WorkshopChard /> ', () => {
  const workshop = {
    id: '0',
    status: status.INCOMING,
    thumbnail: '',
    video: '',
    title: 'Le droit et le dev',
    startingdate: new Date('2021-07-20 12:34:56'),
    speakers: '',
    topics: ['TopicA', 'TopicB'],
    refsLegifrance: [],
    description: 'WorkshopDescriptionString',
    keywords: [],
    files: [],
    links: [],
  };

  const store = configureMockStore()({});

  it('renders without crashing', () => {
    render(
            <Provider store={store}>
                <WorkshopCard workshop={workshop} />
            </Provider>,
    );
  });

  it('shall render workshop card', () => {
    const { getByText } = render(
            <Provider store={store}>
                <WorkshopCard workshop={workshop} />
            </Provider>,
    );
    expect(getByText(workshop.title)).toBeInTheDocument();
    expect(getByText(format(workshop.startingdate, 'd MMMM yyyy HH:mm', { locale: fr }))).toBeInTheDocument();
    expect(getByText(workshop.description)).toBeInTheDocument();
    workshop.topics.forEach((topic) => expect(getByText(new RegExp(topic))).toBeInTheDocument());
  });

  it('shall allow CANCEL_WORKSHOP and GO_LIVE_WORKSHOP actions on INCOMING workshops', async () => {
    const { getByTitle } = render(
            <Provider store={store}>
                <WorkshopCard workshop={{ ...workshop, status: status.INCOMING }} />
            </Provider>,
    );
    userEvent.click(getByTitle('Actions'));
    await screen.findByText('Annuler');
    await screen.findByText('GO LIVE');
  });
  it('shall not allow any action on LIVE workshops', () => {
    const { queryByTitle } = render(
            <Provider store={store}>
                <WorkshopCard workshop={{ ...workshop, status: status.LIVE }} />
            </Provider>,
    );
    expect(queryByTitle('Actions')).not.toBeInTheDocument();
  });
  it('shall allow DELETE_WORKSHOP action on UNPUBLISHED workshops', async () => {
    const { getByTitle } = render(
            <Provider store={store}>
                <WorkshopCard workshop={{ ...workshop, status: status.UNPUBLISHED }} />
            </Provider>,
    );
    userEvent.click(getByTitle('Actions'));
    await screen.findByText('Supprimer');
  });

  it('shall allow ARCHIVE_WORKSHOP and DELETE_WORKSHOP actions on PUBLISHED workshops', async () => {
    const { getByTitle } = render(
            <Provider store={store}>
                <WorkshopCard workshop={{ ...workshop, status: status.PUBLISHED }} />
            </Provider>,
    );
    userEvent.click(getByTitle('Actions'));
    await screen.findByText('Archiver');
    await screen.findByText('Supprimer');
  });

  it('shall allow RESTORE_WORKSHOP and DELETE_WORKSHOP actions on ARCHIVED workshops', async () => {
    const { getByTitle } = render(
            <Provider store={store}>
                <WorkshopCard workshop={{ ...workshop, status: status.ARCHIVED }} />
            </Provider>,
    );
    userEvent.click(getByTitle('Actions'));
    await screen.findByText('Restaurer');
    await screen.findByText('Supprimer');
  });
  it('shall allow workshop edition', async () => {
    const { getByTitle } = render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/workshop']}>
                    <Route path="/workshop">
                        <WorkshopCard workshop={workshop} />
                    </Route>
                    <Route path={`/dashboard/editWorkshop/${workshop.id}`}>
                        <div>EditionPage</div>
                    </Route>
                </MemoryRouter>
            </Provider>,
    );
    userEvent.click(getByTitle('Modifier'));
    await screen.findByText('EditionPage');
  });
  it('should match its reference snapshot', () => {
    const wrapper = mount(
            <Provider store={store}>
                <WorkshopCard workshop={workshop} />
            </Provider>,
    );
    expect(wrapper).to.matchSnapshot();
  });
});
