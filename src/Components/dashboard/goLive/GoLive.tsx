import React, { FC, useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import className from 'classnames';
import { Button, Container, Row, Col, Overlay, Tooltip } from 'react-bootstrap';
import copy from 'copy-to-clipboard';

import { getWorkshopById, isWorkshopStoreInialized } from '~/state/reducers';
import { fetchWorkshops, goLive, endLive } from '~/state/workshops/actions';
import * as status from '~/state/workshops/constants/status';
import { ReactComponent as ArrowBackIcon } from '~/assets/icons/arrow_back_24px.svg';
import { ReactComponent as CopyIcon } from '~/assets/icons/copy_24px.svg';

import { skipToken } from '@reduxjs/toolkit/query/react';
import {
    useHandleCreationProgressQuery,
    useCreateChannelQuery,
    useHandleRunningProgressQuery,
} from '~/api/lcddbackend-api.generated';

import LoadingSpinner from './LoadingSpinner';
import './GoLive.scss';

import VideoJS from '../../shared/VideoJS';
import classNames from 'classnames';

const TOOLTIP_DURATION = 1000;

const GoLive: FC = () => {
    const { id } = useParams() as {
        id: Workshop.id;
    };
    const playerRef = useRef(null);
    const dispatch = useDispatch();
    const workshop = useSelector(getWorkshopById(id));

    //Workaround for bad verb use on backend, this shall be a mutation, but it's a qeury
    // then we must use skipToken to get the right behavior
    const [createChannelTrigger, setCreateChannelTrigger] = useState(skipToken);
    const creationRequestResponse = useCreateChannelQuery(createChannelTrigger);

    // Crappy state monitoring, adapting to available backend...
    // mustCreateChannel = true, NO CHANNELEXISTING -> must create
    // channelData = undefined, CREATING CHANNEL -> wait result
    // channelData initialized, CHANNEL CREATED -> Allow next action (start broadcast)

    const [channelData, setChannelData] = useState();
    const isChannelInitialized = !!channelData;
    const {
        isError: mustCreateChannel,
        isSuccess: statusAvailable,
        data: channelCreationResponse,
    } = useHandleCreationProgressQuery(channelData ? skipToken : undefined, {
        pollingInterval: 1000,
    });

    if (statusAvailable) {
        console.log('channelCreationResponse =', channelCreationResponse);
        if (channelCreationResponse.rtmp1) setChannelData({ ...channelCreationResponse });
    }

    const { isSuccess, data, ...others } = useHandleRunningProgressQuery(undefined, { pollingInterval: 1000 });
    console.log('others =', others);
    //Channel status values
    // {message: 'CREATING'}}
    // {message: 'CREATION FAILED'}
    // {message: 'IDLE'}
    // {message: 'STARTING'} //TOCONFIRM
    // {message: 'RUNNING'} //TOCONFIRM
    // {message: 'STOPPING'} //TOCONFIRM
    // {message: 'DELETING'} //TOCONFIRM
    // {message: 'DELETED'} //TOCONFIRM

    //Workshop status management : INCOMING -> LIVE -> UNPUBLISHED
    // Workshop status -> channel action available -> chanel action result -> Workshop status update
    if (isSuccess) {
        if (data.message === 'RUNNING') {
            dispatch(goLive(workshopId));
        } else if (data.message === 'DELETED') {
            dispatch(endLive(workshopId));
        }
    }

    const needFetching = !useSelector(isWorkshopStoreInialized);
    useEffect(() => {
        // Allow direct call to page
        if (needFetching) dispatch(fetchWorkshops);
    }, []);

    useEffect(() => {
        if (mustCreateChannel) {
            console.log('FSA CreateChannelTrigger !!!!!!!!!!!!!!!!!!!!!!!!!');
            setCreateChannelTrigger(true);
        }
        //TODO Manage creation failure
    }, [mustCreateChannel]);

    const startBroadcast = (workshopId) => {
        //TODO golive only once workshop status will be workshop status is RUNNING
        //Then monitor and transition to UNPUBLISHED once
        //dispatch(goLive(workshopId));
    };
    const endBroadcast = (workshopId) => {
        //TODO golive only once workshop status will be workshop status is RUNNING
        //Then monitor and transition to UNPUBLISHED once
        //dispatch(goLive(workshopId));
    };

    const broadcastBoxAction =
        workshop &&
        {
            [status.INCOMING]: (
                <Button variant="success" onClick={() => startBroadcast(workshop.id)}>
                    Commencer la diffusion
                </Button>
            ),
            [status.LIVE]: (
                <Button variant="danger" onClick={() => endBroadcast(workshop.id)}>
                    Terminer la diffusion
                </Button>
            ),
            [status.UNPUBLISHED]: (
                // TODO Update url once implemented
                <Link to="/dashboard/workshops">
                    Publier atelier
                    <ArrowBackIcon />
                </Link>
            ),
        }[workshop.status];

    const rtmpAddressRef = useRef();
    const streamKeyRef = useRef();
    const [showRtmpTooltip, setShowRtmpTooltip] = useState(false);
    const [showKeyTooltip, setShowKeyTooltip] = useState(false);

    //Split backend rtmp answer in a user friendly format
    let rtmpAddress = '';
    let rtmpKey = '';

    //TODO
    // Poster
    // End live
    // Start Live
    const videoJsOptions = {
        //poster: 'http://example.com/myImage.jpg',
        autoplay: true, //true if status live
        controls: true,
        liveui: true,
        responsive: true,
        fluid: true,
        sources: [],

        // {
        //     src: 'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8',
        //     type: 'application/x-mpegURL',
        // },
        // {
        //     src: 'http://download.tsi.telecom-paristech.fr/gpac/dataset/dash/uhd/dashevc-main-2s/dashevc-main-2s-p60.mpd',
        //     type: 'application/dash+xml',
        // },
    };
    if (isChannelInitialized) {
        const rtmpArray = channelData.rtmp1.split('/');
        rtmpKey = rtmpArray.pop();
        rtmpAddress = rtmpArray.join('/');
        videoJsOptions.sources = [
            {
                //https://caf900c010ea8046.mediapackage.eu-west-3.amazonaws.com/out/v1/68487119165843c09b9adace3fcbe464/index.m3u8"
                src: channelData.hlsEndpoint,
                src: 'https://caf900c010ea8046.mediapackage.eu-west-3.amazonaws.com/out/v1/68487119165843c09b9adace3fcbe464/index.m3u8',
                type: 'application/x-mpegURL',
            },
            {
                src: channelData.dashEndPoint,
                type: 'application/dash+xml',
            },
        ];
    }
    const handlePlayerReady = (player) => {
        playerRef.current = player;

        // you can handle player events here
        player.on('waiting', () => {
            console.log('player is waiting');
        });

        player.on('dispose', () => {
            console.log('player will dispose');
        });
    };

    return needFetching ? null : (
        <div id="goLivePage">
            <h1>{workshop.title}</h1>
            <Container>
                <Row>
                    <Link className="backLink" to="/dashboard/workshops">
                        <ArrowBackIcon />
                        Retourner aux ateliers
                    </Link>
                </Row>
                <Row>
                    <div className={className('broadCastBox')}>
                        <div className={classNames('blurMessage', { hidden: isChannelInitialized })}>
                            <span>Création du canal de diffusion</span>
                            <LoadingSpinner />
                        </div>
                        <div className={className('broadCastData', { blur: !isChannelInitialized })}>
                            <div className="dataLine">
                                <p className="label">Adresse RTMP</p>
                                <p className="value">{` : ${rtmpAddress}`}</p>
                                <CopyIcon
                                    ref={rtmpAddressRef}
                                    onClick={() => {
                                        copy(rtmpAddress);
                                        setShowRtmpTooltip(true);
                                        setTimeout(() => setShowRtmpTooltip(false), TOOLTIP_DURATION);
                                    }}
                                />
                                <Overlay target={rtmpAddressRef.current} show={showRtmpTooltip} placement="top">
                                    {(props) => (
                                        <Tooltip id="rtmpAddressCopied" {...props}>
                                            Copié!
                                        </Tooltip>
                                    )}
                                </Overlay>
                            </div>
                            <div className="dataLine">
                                <p className="label">Clé</p>
                                <p className="value">{` : ${rtmpKey}`} </p>
                                <CopyIcon
                                    ref={streamKeyRef}
                                    onClick={() => {
                                        copy(rtmpKey);
                                        setShowKeyTooltip(true);
                                        setTimeout(() => setShowKeyTooltip(false), TOOLTIP_DURATION);
                                    }}
                                />
                                <Overlay target={streamKeyRef.current} show={showKeyTooltip} placement="top">
                                    {(props) => (
                                        <Tooltip id="streamKeyCopied" {...props}>
                                            Copié!
                                        </Tooltip>
                                    )}
                                </Overlay>
                            </div>
                        </div>
                        <div className={className('broadCastAction', { blur: !isChannelInitialized })}>
                            {broadcastBoxAction}
                        </div>
                    </div>
                </Row>
                <Row>
                    <Col xs={12} lg={8}>
                        <div className="videoFrameContainer">
                            {/* <div className="videoFrame" /> */}
                            <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
                        </div>
                    </Col>
                    <Col xs={12} lg={4}>
                        <div className="chatFrame" />
                    </Col>
                </Row>
                <Row>
                    <Col lg={8} xs={12}>
                        <h3>A propos</h3>
                        <div className="aboutBox">
                            <div className="desc">
                                <p>{workshop.description}</p>
                                <p className="topics">{workshop.topics.join(', ')}</p>
                            </div>
                            <div className="speakers">
                                {workshop.speakers.map((speaker) => (
                                    <p key={speaker}>{speaker}</p>
                                ))}
                            </div>
                        </div>
                    </Col>
                    <Col lg={4} xs={12}>
                        <h3>Téléchargements & liens</h3>
                        <div className="linksBox">
                            <p>Files list + download icon</p>
                            <p>Link list + link</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default GoLive;
