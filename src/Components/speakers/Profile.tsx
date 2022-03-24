import React, { FC, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import classnames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Avatar from '../../assets/shared/avatar.jpg';
import SpeakerCard from './SpeakerCard';
import { fetchWorkshops } from '~/state/workshops/actions';
import { getWorkshops } from '~/state/reducers';
import * as api from '../../api/fetchSperkers';
import { statusOrder } from '~/state/workshops/constants/status';
import './Profile.css';

type Params = {
    id: string;
};

const Profile: FC = () => {
    const params = useParams() as Params;

    // Adding the follow fetchSpeakers to cover the case where user is coming directly from admin dashboard
    // without going through the Speakers components
    // Note: This is a quickfix but a clean solution on redux state must be planned
    const { name, rool, description } = api.findSpeakerById(Number(params.id));

    const dispatch = useDispatch();

    useEffect(() => {
        console.log('Just before dispatch(fetchWorkshops)');
        dispatch(fetchWorkshops);
    }, []);

    const sortFct = {
        title: (a, b) => a.title.localeCompare(b.title),
        status: (a, b) => statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status),
    };

    const orderByOptions = [
        { label: 'titre', value: 'title' },
        { label: 'statuts', value: 'status' },
    ];
    const orderBy = orderByOptions[1]; // TODO Get it from url query params
    const [orderedWorkshop, setOrderedWorkshop] = useState<Workshop[]>([]);

    const visibleWorkshops = useSelector(getWorkshops);
    useEffect(() => {
        console.log('visibleWorkshops =', visibleWorkshops);
        setOrderedWorkshop(visibleWorkshops.sort(sortFct[orderBy.value]));
    }, [visibleWorkshops]);

    return (
        <>
            <div className={classnames('wrapper', { 'flex-direction-column': true })}>
                <div className="photo">
                    <img src={Avatar} className="mb-4 speaker-image" width="263" height="263" />
                </div>
                <div className="head_text">
                    <div className="text_h1">{name}</div>
                    <div className="text_h2">{rool}</div>
                    <div className="text_h3">{description}</div>
                </div>
            </div>
            <div className="bioWrapper">
                <div className="text_h4">Bio</div>
                <div className="text_h6">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                </div>
                <div className="text_h5">Mes ateliers</div>
            </div>
            <br />
            <br />
            <br />
            <br />
            <div className="cardWrapper">
                <Container fluid id="videosPage">
                    <Row>
                        {orderedWorkshop &&
                            orderedWorkshop.map((workshop) => (
                                <Col key={workshop.id} className="speakerCard" xs={12} md={6} lg={3}>
                                    <SpeakerCard workshop={workshop} />
                                </Col>
                            ))}
                    </Row>
                </Container>
            </div>
        </>
    );
};

export default Profile;
