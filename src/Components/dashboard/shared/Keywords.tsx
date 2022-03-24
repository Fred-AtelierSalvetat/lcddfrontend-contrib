import React, { FC, useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import PropTypes from 'prop-types';
import { ReactComponent as DeleteIcon } from '~/assets/icons/delete_24px.svg';

const keywordsPropTypes = {
    value: PropTypes.arrayOf(PropTypes.string).isRequired,
    setValue: PropTypes.func.isRequired,
};

const Keywords: FC<PropTypes.InferProps<typeof keywordsPropTypes>> = ({ value = [], setValue }) => {
    const [inputKeyword, setInputKeyword] = useState('');
    const refKeywordInput = useRef<HTMLInputElement>(null);

    const addKeyword = () => {
        if (!inputKeyword) {
            refKeywordInput && refKeywordInput.current && refKeywordInput.current.focus();
            return;
        }
        setValue([...value, inputKeyword]);
        setInputKeyword('');
        refKeywordInput && refKeywordInput.current && refKeywordInput.current.focus();
    };
    const deleteKeyword = (toDelete) => {
        setValue(value.filter((keyword) => keyword !== toDelete));
    };
    const handleKeyDown = (event) => {
        if (!inputKeyword) return;
        switch (event.key) {
            case 'Enter':
            case 'Tab':
                addKeyword();
                event.preventDefault();
        }
    };

    return (
        <>
            <Form.Control
                type="text"
                placeholder="Ajouter un mot-clé"
                onChange={(event) => setInputKeyword(event.target.value)}
                onKeyDown={(event) => handleKeyDown(event)}
                ref={refKeywordInput}
                value={inputKeyword}
            />
            <Button variant="outline-primary" onClick={() => addKeyword()}>
                Ajouter
            </Button>
            <div className="list">
                {!!value &&
                    value.map((keyword) => (
                        <div key={keyword} className="item flex-shrink-1">
                            <div className="flex-shrink-1 wrap-anywhere">{keyword}</div>
                            <DeleteIcon className="action-icon" onClick={() => deleteKeyword(keyword)} />
                        </div>
                    ))}
            </div>
        </>
    );
};

Keywords.propTypes = keywordsPropTypes;

export default Keywords;
