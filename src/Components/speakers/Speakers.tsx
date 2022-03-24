import React, { FC, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Speaker } from './Speaker';
import { AppState } from '../../state/reducers';
import { fetchSpeakers } from '../../api/fetchSperkers';
import { Wrapper } from '../shared/wrapper';

const Speakers: FC = () => {
    const [isHome, _setIsHome] = useState(false); // TODO research intended behavior and implement
    const dispatch = useDispatch();

    const { speakers } = useSelector((state: AppState) => state.speakers);

    useEffect(() => {
        if (speakers.length === 0) {
            dispatch(fetchSpeakers());
        }
    }, [dispatch, speakers]);

    return (
        <div>
            <Wrapper>
                <h1 className="primary">Nos intervenants</h1>
                <h3 className="mb-4" style={{ color: '#333333', opacity: '0.8' }}>
                    Chercher directement la réponse à votre question parmi les 27 thèmes traités par nos intervenants{' '}
                </h3>
            </Wrapper>
            <div className="d-flex justify-content-center flex-wrap mt-4">
                {speakers &&
                    !isHome &&
                    speakers.map((speaker, key: number) => (
                        <Speaker
                            id={speaker.id}
                            name={speaker.name}
                            rool={speaker.rool}
                            description={speaker.description}
                            key={key}
                        />
                    ))}
                {speakers && isHome && <div>Speakers home componenet </div>}
            </div>
        </div>
    );
};

export default Speakers;
Speakers.displayName = 'Speakers';
