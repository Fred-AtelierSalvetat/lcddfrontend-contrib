import React, { FC } from 'react';
import { Controller } from 'react-hook-form';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import DatePicker from '~/Components/shared/form/DatePicker';
// import LcddDatePicker from '~/Components/shared/form/LcddDatePicker/LcddDatePicker';
import Select from '~/Components/shared/form/Select';

import { FormFeedback } from '~/Components/shared/form/FormFeedBack';
import validator from '~/util/validator';
import Keywords from './Keywords';
import Links from './Links';
import Uploads from './Uploads';

import { useGetAllTopicsQuery } from '~/api/lcddbackend-api.generated';
import './WkspForm.scss';

const propTypes = {
    title: PropTypes.string,
    headerButtonLine: PropTypes.node.isRequired,
    footerButtonLine: PropTypes.node.isRequired,
    register: PropTypes.func.isRequired,
    watch: PropTypes.func.isRequired,
    trigger: PropTypes.func.isRequired,
    setValue: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    control: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
};

// TODO get real data from redux when backend// MDD ready
export const refLegifrance = [
    { value: 'Ref 1', label: 'Ref 1' },
    { value: 'Ref 2', label: 'Ref 2' },
    { value: 'Ref 3', label: 'Ref 3' },
];
export const intervenants = [
    { value: 'Ambroise ARMAND', label: 'Ambroise ARMAND' },
    { value: 'Julien GENOVA', label: 'Julien GENOVA' },
];

const WkspForm: FC<PropTypes.InferProps<typeof propTypes>> = ({
    title,
    headerButtonLine,
    footerButtonLine,
    register,
    watch,
    trigger,
    setValue,
    errors,
    control,
    handleSubmit,
}) => {
    register('keywords');
    register('files');
    register('links');

    let topicsList = [];
    const { data: topics, isError, isSuccess, ...others } = useGetAllTopicsQuery();
    if (isSuccess) {
        topicsList = topics.map((topic) => ({
            value: topic.id,
            label: topic.topic,
        }));
    } else if (isError) {
        //This parameter is mandatory hence the form is unusable on fetch error
        return <div>{"Domaines d'expertise, erreur de chargement"}</div>;
    }

    // TODOFSA Mng loading

    return (
        <div id="workshop-form">
            <Form role="form" onSubmit={handleSubmit}>
                {title && <h1>{title}</h1>}
                {headerButtonLine}
                <Form.Row>
                    <Col xs={12} md={7} lg={9}>
                        <Form.Group controlId="workshopTitle">
                            <Form.Label>{"Titre d'atelier (obligatoire)"}</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                placeholder="Ajouter un titre"
                                ref={register(validator.workshopTitle)}
                                isInvalid={!!errors.title}
                                aria-invalid={!!errors.title}
                                defaultValue={watch('title')}
                                onChange={async ({ target }) => await trigger(target.name)}
                            />
                            <FormFeedback field={errors.title} />
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={5} lg={3}>
                        <Form.Group controlId="workshopStartingDate">
                            <Form.Label>Date & Heure (obligatoire)</Form.Label>
                            <Controller
                                name="startingdate"
                                control={control}
                                rules={validator.workshopTimestamp}
                                render={({ ref, ...othersField }) => (
                                    <DatePicker
                                        {...othersField}
                                        inputId="workshopStartingDate"
                                        isInvalid={!!errors.startingdate}
                                        placeholder="DD/MM/YYYY HH:mm"
                                        dateFormat="dd/MM/yyyy HH:mm"
                                    />
                                )}
                            />
                            <FormFeedback field={errors.startingdate} />
                        </Form.Group>
                    </Col>
                </Form.Row>
                <Form.Row>
                    <Col>
                        <Form.Group controlId="workshopSpeakers">
                            <Form.Label>Intervenants (obligatoire)</Form.Label>
                            <Controller
                                name="speakers"
                                control={control}
                                rules={validator.workshopSpeakers}
                                render={({ ref, ...othersField }) => (
                                    <Select
                                        inputId="workshopSpeakers"
                                        inputRef={ref}
                                        {...othersField}
                                        isMulti
                                        options={intervenants}
                                        isSearchable
                                        closeMenuOnSelect={false}
                                        placeholder="Sélectionner les intervenants"
                                        isInvalid={!!errors.speakers}
                                    />
                                )}
                            />
                            <FormFeedback field={errors.speakers} />
                        </Form.Group>
                    </Col>
                </Form.Row>
                <Form.Row>
                    <Col className="fullheight-flex-col" xs={12} md={8}>
                        <Form.Row>
                            <Form.Group controlId="workshopTopics">
                                <Form.Label>Thématiques (obligatoire)</Form.Label>
                                <Controller
                                    name="topics"
                                    control={control}
                                    rules={validator.workshopTopics}
                                    render={({ ref, ...othersField }) => (
                                        <Select
                                            inputId="workshopTopics"
                                            inputRef={ref}
                                            {...othersField}
                                            isMulti
                                            options={topicsList}
                                            value={watch('topics')}
                                            isSearchable
                                            closeMenuOnSelect={false}
                                            placeholder="Sélectionner les thématiques"
                                            isInvalid={!!errors.topics}
                                        />
                                    )}
                                />
                                <FormFeedback field={errors.topics} />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group controlId="workshopRefs">
                                <Form.Label>Références Légifrance</Form.Label>
                                <Controller
                                    name="refsLegifrance"
                                    control={control}
                                    rules={validator.workshopRefsLegifrance}
                                    render={({ ref, ...othersField }) => (
                                        <Select
                                            inputId="workshopRefs"
                                            inputRef={ref}
                                            {...othersField}
                                            isMulti
                                            options={refLegifrance}
                                            isSearchable
                                            closeMenuOnSelect={false}
                                            placeholder="Sélectionner les références Légifrance"
                                            isInvalid={!!errors.refsLegifrance}
                                        />
                                    )}
                                />
                                <FormFeedback field={errors.refsLegifrance} />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row className="no-margin">
                            <Form.Group controlId="workshopDescription">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    name="description"
                                    placeholder="Ajouter une description"
                                    ref={register(validator.workshopDescription)}
                                    isInvalid={!!errors.description}
                                    aria-invalid={!!errors.description}
                                    defaultValue={watch('description')}
                                    onChange={async ({ target }) => await trigger(target.name)}
                                />
                                <FormFeedback field={errors.description} />
                            </Form.Group>
                        </Form.Row>
                    </Col>
                    <Col className="fullheight-flex-col" xs={12} md={4}>
                        <Form.Group controlId="workshopKeywords">
                            <Form.Label>Mots-clés</Form.Label>
                            <fieldset>
                                <Keywords
                                    value={watch('keywords')}
                                    setValue={(newValue) =>
                                        setValue('keywords', newValue, {
                                            shouldValidate: true,
                                            //    shouldDirty: true
                                        })
                                    }
                                />
                            </fieldset>
                        </Form.Group>
                    </Col>
                </Form.Row>
                <Form.Row>
                    <Col className="fullheight-flex-col" xs={12} md={8}>
                        <Form.Group controlId="workshopFiles">
                            <Form.Label>Téléchargements</Form.Label>
                            <fieldset className="workshopUploads">
                                <Uploads
                                    value={watch('files')}
                                    setValue={(newValue) =>
                                        setValue('files', newValue, {
                                            shouldValidate: true,
                                            //    shouldDirty: true
                                        })
                                    }
                                />
                            </fieldset>
                        </Form.Group>
                    </Col>
                    <Col className="fullheight-flex-col" xs={12} md={4}>
                        <Form.Group>
                            <Form.Label>Liens</Form.Label>
                            <fieldset>
                                <Links
                                    value={watch('links')}
                                    setValue={(newValue) =>
                                        setValue('links', newValue, {
                                            shouldValidate: true,
                                            //    shouldDirty: true
                                        })
                                    }
                                />
                            </fieldset>
                        </Form.Group>
                    </Col>
                </Form.Row>
                {footerButtonLine}
            </Form>
        </div>
    );
};

WkspForm.propTypes = propTypes;

export default WkspForm;
