import React from 'react';
import { mount } from 'enzyme';
import { screen, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { MemoryRouter, Route } from 'react-router-dom';
import selectEvent from 'react-select-event';

// 2 below lines of imports should be part of test once connexion to backend will be done
import { intervenants, refLegifrance } from '~/Components/dashboard/shared/WkspForm';
import topics from '~/Components/shared/thematiques';
import * as actionTypes from '../../../state/workshops/constants/actionTypes';

import NewWorkshop from './NewWorkshop';

import DatePicker from '../../shared/form/DatePicker.tsx';

jest.mock('../../shared/form/DatePicker.tsx');

describe('<NewWorkshop /> ', () => {
  const store = configureMockStore([thunk])({});

  beforeEach(() => DatePicker.mockImplementation(({
    onChange, onBlur, value, inputId,
  }) => <input name="startingdate" id={inputId} value={value || ''} onChange={onChange} onBlur={onBlur} />));

  it('renders without crashing', () => {
    render(
            <Provider store={store}>
                <NewWorkshop />
            </Provider>,
    );
  });
  it('should present a form', () => {
    render(
            <Provider store={store}>
                <NewWorkshop />
            </Provider>,
    );
    expect(screen.getByRole('form')).toBeInTheDocument();
  });

  it("shall contain two buttons 'Créer atelier'", () => {
    render(
            <Provider store={store}>
                <NewWorkshop />
            </Provider>,
    );
    expect(screen.getAllByRole('button', { name: 'Créer atelier' })).to.have.lengthOf(2);
  });

  it("'s button 'Créer atelier', shall dispatch a CREATE_WORKSHOP action", async () => {
    const newWorkshop = {
      title: 'Test*title$',
      startingdate: '20/4/2001 12:34',
      speakers: [intervenants[1].value, intervenants[0].value],
      topics: [topics[3].title, topics[8].title],
      refsLegifrance: [refLegifrance[2].value, refLegifrance[0].value],
      description: 'A workshop desc',
    };

    render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/newWorkshop']}>
                    <Route path="/newWorkshop">
                        <NewWorkshop />
                    </Route>
                    <Route path="/dashboard/workshops">
                        <div>WORKSHOPS-PAGE</div>
                    </Route>
                </MemoryRouter>
            </Provider>,
    );

    const titleInput = screen.getByLabelText("Titre d'atelier (obligatoire)");
    const dateInput = screen.getByLabelText('Date & Heure (obligatoire)');
    const speakersInput = screen.getByLabelText('Intervenants (obligatoire)');
    const topicsInput = screen.getByLabelText('Thématiques (obligatoire)');
    const refsInput = screen.getByLabelText('Références Légifrance');
    const descInput = screen.getByLabelText('Description');

    userEvent.type(titleInput, newWorkshop.title);
    userEvent.type(dateInput, newWorkshop.startingdate);
    await selectEvent.select(speakersInput, newWorkshop.speakers);
    await selectEvent.select(topicsInput, newWorkshop.topics);
    await selectEvent.select(refsInput, newWorkshop.refsLegifrance);
    userEvent.type(descInput, newWorkshop.description);

    userEvent.click(screen.getAllByRole('button', { name: 'Créer atelier' })[0]);

    await screen.findByText('WORKSHOPS-PAGE');
    expect(store.getActions()[0]).containSubset({
      type: actionTypes.CREATE_WORKSHOP,
      workshop: { ...newWorkshop },
    });
  });

  it("shall contain one button 'Annuler'", () => {
    render(
            <Provider store={store}>
                <NewWorkshop />
            </Provider>,
    );
    expect(screen.getByRole('button', { name: 'Annuler' })).toBeInTheDocument();
  });

  it("'s button 'Annuler', shall empty all fields", async () => {
    const newWorkshop = {
      title: 'Test*title$',
      startingdate: '20/4/2001 12:34',
      speakers: [intervenants[1].value, intervenants[0].value],
      topics: [topics[3].title, topics[8].title],
      refsLegifrance: [refLegifrance[2].value, refLegifrance[0].value],
      description: 'A workshop desc',
    };

    render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/newWorkshop']}>
                    <Route path="/newWorkshop">
                        <NewWorkshop />
                    </Route>
                </MemoryRouter>
            </Provider>,
    );

    const titleInput = screen.getByLabelText("Titre d'atelier (obligatoire)");
    const dateInput = screen.getByLabelText('Date & Heure (obligatoire)');
    const speakersInput = screen.getByLabelText('Intervenants (obligatoire)');
    const topicsInput = screen.getByLabelText('Thématiques (obligatoire)');
    const refsInput = screen.getByLabelText('Références Légifrance');
    const descInput = screen.getByLabelText('Description');

    userEvent.type(titleInput, newWorkshop.title);
    userEvent.type(dateInput, newWorkshop.startingdate);
    await selectEvent.select(speakersInput, newWorkshop.speakers);
    await selectEvent.select(topicsInput, newWorkshop.topics);
    await selectEvent.select(refsInput, newWorkshop.refsLegifrance);
    userEvent.type(descInput, newWorkshop.description);

    await waitFor(() => expect(screen.getByRole('form')).toHaveFormValues({
      title: newWorkshop.title,
      startingdate: newWorkshop.startingdate,
      speakers: newWorkshop.speakers,
      topics: newWorkshop.topics,
      refsLegifrance: newWorkshop.refsLegifrance,
      description: newWorkshop.description,
    }));

    await userEvent.click(screen.getByRole('button', { name: 'Annuler' }));
    await waitFor(() => expect(screen.getByRole('form')).toHaveFormValues({
      title: '',
      startingdate: '',
      speakers: '',
      topics: '',
      refsLegifrance: '',
      description: '',
    }));
  });
  it('should match its reference snapshot', () => {
    const wrapper = mount(
            <Provider store={store}>
                <NewWorkshop />
            </Provider>,
    );
    expect(wrapper).to.matchSnapshot();
  });
});
