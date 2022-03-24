import React, { FC, useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import PropTypes from 'prop-types';
import { ReactComponent as DeleteIcon } from '~/assets/icons/delete_24px.svg';

const linksPropTypes = {
    value: PropTypes.arrayOf(
        PropTypes.exact({
            title: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
        }),
    ).isRequired,
    setValue: PropTypes.func.isRequired,
};

const Links: FC<PropTypes.InferProps<typeof linksPropTypes>> = ({ value = [], setValue }) => {
    const [inputLinkURL, setInputLinkURL] = useState('');
    const [inputLinkTitle, setInputLinkTitle] = useState('');
    const refUrlInput = useRef<HTMLInputElement>(null);
    const refTitleInput = useRef<HTMLInputElement>(null);

    const addLink = () => {
        if (!inputLinkURL) {
            refUrlInput && refUrlInput.current && refUrlInput.current.focus();
            return;
        }
        if (!inputLinkTitle) {
            refTitleInput && refTitleInput.current && refTitleInput.current.focus();
            return;
        }
        setValue([...value, { title: inputLinkTitle, url: inputLinkURL }]);
        setInputLinkURL('');
        setInputLinkTitle('');
        refUrlInput && refUrlInput.current && refUrlInput.current.focus();
    };

    const deleteLink = (toDelete) => {
        setValue(value.filter((link) => link !== toDelete));
    };

    const handleKeyDownTitle = (event) => {
        if (!inputLinkTitle) return;
        switch (event.key) {
            case 'Enter':
            case 'Tab':
                addLink();
                event.preventDefault();
        }
    };
    const handleKeyDownURL = (event) => {
        if (!inputLinkURL) return;
        switch (event.key) {
            case 'Enter':
            case 'Tab':
                addLink();
                event.preventDefault();
        }
    };

    return (
        <>
            <Form.Group controlId="workshopLinksURL">
                <Form.Label>Lien URL</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Ajouter un URL"
                    onChange={(event) => setInputLinkURL(event.target.value)}
                    onKeyDown={(event) => handleKeyDownURL(event)}
                    value={inputLinkURL}
                    ref={refUrlInput}
                />
            </Form.Group>
            <Form.Group controlId="workshopLinksTitle">
                <Form.Label>Lien titre</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Ajouter un titre"
                    onChange={(event) => setInputLinkTitle(event.target.value)}
                    onKeyDown={(event) => handleKeyDownTitle(event)}
                    value={inputLinkTitle}
                    ref={refTitleInput}
                />
            </Form.Group>
            <Button variant="outline-primary" onClick={() => addLink()}>
                Ajouter
            </Button>

            <div className="list">
                {!!value &&
                    value.map(
                        (link) =>
                            link && (
                                <div key={link.title + link.url} className="item flex-shrink-1">
                                    <div className="no-margin flex-shrink-1">
                                        <div className="flex-shrink-1 wrap-anywhere">{link.title}</div>
                                        <a
                                            className="flex-shrink-1 wrap-anywhere"
                                            href={link.url}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            {link.url}
                                        </a>
                                    </div>
                                    <DeleteIcon className="action-icon" onClick={() => deleteLink(link)} />
                                </div>
                            ),
                    )}
            </div>
        </>
    );
};

Links.propTypes = linksPropTypes;

export default Links;
