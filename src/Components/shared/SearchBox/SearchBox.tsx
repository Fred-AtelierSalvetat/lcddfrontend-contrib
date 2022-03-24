import React, { FC, useState, useRef } from 'react';

import PropTypes from 'prop-types';
import { ReactComponent as SearchIcon } from '~/assets/icons/search.svg';

import './SearchBox.scss';

const propTypes = {
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    setValue: PropTypes.func.isRequired,
};

const SearchBox: FC<PropTypes.InferProps<typeof propTypes>> = ({ placeholder, value, setValue }) => {
    const [searchbox, setSearchbox] = useState(value);
    const changeSearchBox = (e) => {
        setSearchbox(e.target.value);
        setValue(e.target.value);
    };
    const inputRef = useRef(null);

    return (
        <div className="searchbox">
            <input
                type="text"
                ref={inputRef}
                aria-label={placeholder}
                placeholder={placeholder}
                value={searchbox}
                onChange={changeSearchBox}
            />

            <SearchIcon
                onClick={() => {
                    inputRef && inputRef.current && inputRef.current.focus();
                }}
            />
        </div>
    );
};

SearchBox.propTypes = propTypes;

export default SearchBox;
