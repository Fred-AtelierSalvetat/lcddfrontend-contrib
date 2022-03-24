import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { useDispatch } from 'react-redux';
import ErrorBoundary from '~/Components/shared/ErrorBoundary';
import WkspForm from '../shared/WkspForm';
import defaultValues from '../shared/defaultValues';

import { newWorkshop } from '~/state/workshops/actions';

const NewWorkshop: FC = () => {
    const { handleSubmit, reset, ...othersFormProp } = useForm({
        mode: 'all',
        defaultValues,
    });

    const dispatch = useDispatch();
    const history = useHistory();

    const onSubmit = (data) => {
        dispatch(
            newWorkshop({
                title: data.title,
                startingdate: data.startingdate,
                endingdate: data.startingdate, // TODO implement, how -> backend implementation??
                speakers: data.speakers.map((obj) => obj.value),
                topics: data.topics.map((obj) => obj.value),
                refsLegifrance: data.refsLegifrance.map((obj) => obj.value),
                description: data.description,
                keywords: data.keywords,
                files: data.files,
                links: data.links,
            }),
        );
        history.push('/dashboard/workshops');
    };

    const onSubmitError = () => {};

    return (
        <ErrorBoundary>
            <WkspForm
                headerButtonLine={
                    <Form.Row>
                        <Col>
                            <div className="right-floating-buttonbox">
                                <Button type="submit" variant="primary">
                                    Créer atelier
                                </Button>
                            </div>
                        </Col>
                    </Form.Row>
                }
                {...othersFormProp}
                footerButtonLine={
                    <Form.Row>
                        <Col>
                            <div className="right-floating-buttonbox">
                                <Button
                                    type="reset"
                                    variant="outline-primary"
                                    onClick={() => {
                                        reset(defaultValues);
                                    }}
                                >
                                    Annuler
                                </Button>
                                <Button type="submit" variant="primary">
                                    Créer atelier
                                </Button>
                            </div>
                        </Col>
                    </Form.Row>
                }
                handleSubmit={handleSubmit(onSubmit, onSubmitError)}
            />
        </ErrorBoundary>
    );
};

export default NewWorkshop;
