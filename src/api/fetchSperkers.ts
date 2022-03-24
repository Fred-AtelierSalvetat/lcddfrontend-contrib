import { ThunkAction } from 'redux-thunk';
import { LcddActions } from '../state/actions';
import { AppState } from '../state/reducers';
import { speakersRequested, speakersReceived } from '../state/speaker/speaker.action';
import { Speakers, Speaker } from '../state/speaker/speaker.model';

export const fetchSpeakers = (): ThunkAction<void, AppState, unknown, LcddActions> => async (dispatch) => {
    dispatch(speakersRequested());
    const speakers = fakeData; // HERE DO THE FETCH
    dispatch(speakersReceived(speakers));

    // or dispatch(fetchSpeakersFailed());
    // https://www.digitalocean.com/community/tutorials/redux-redux-thunk
};

export const fakeData: Speakers = [
    {
        id: 0,
        name: 'Julien GENOVA',
        rool: '',
        description: 'Avocat au Barreau de Marseille',
    },
    {
        id: 1,
        name: 'Ambroise ARMAND',
        rool: 'Juriste',
        description: 'Président Fondateur de La Chaine du Droit',
    },
    {
        id: 2,
        name: 'Julien GENOVA',
        rool: '',
        description: 'Avocat au Barreau de Marseille',
    },
    {
        id: 3,
        name: 'Ambroise ARMAND',
        rool: 'Juriste',
        description: 'Président Fondateur de La Chaine du Droit',
    },
];

export function findSpeakerById(id: Speaker.id): Speaker | undefined {
    const speaker = fakeData.find((speaker) => speaker.id === id);
    if (speaker !== undefined) {
        return speaker;
    }
    return undefined;
}
