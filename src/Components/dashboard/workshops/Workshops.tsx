import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useHistory, Redirect } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { getWorkshops, workshopSearchFilterSelector, getOrderBy } from '~/state/reducers';
import { fetchWorkshops, setWorkshopSearchFilter, setOrderBy } from '~/state/workshops/actions';
import Select from '~/Components/shared/form/Select';
import SearchBox from '~/Components/shared/SearchBox/SearchBox';
import WorkshopCard from './WorkshopCard';
import { sortOptions } from '~/state/workshops/constants/orderBy';

import './Workshops.scss';

const Workshops: FC = () => {
    const history = useHistory();

    const location = useLocation();
    const UrlQueryParam = new URLSearchParams(location.search);
    const orderByParam = UrlQueryParam.get('orderBy');

    const orderBy = useSelector(getOrderBy);
    const workshops = useSelector(getWorkshops);
    const searchBoxValue = useSelector(workshopSearchFilterSelector);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchWorkshops);
    }, []);

    const getURLwithQueryParam = (value) => `${location.pathname}?orderBy=${value}`;

    if (!orderByParam || !sortOptions.includes(orderByParam)) {
        return <Redirect to={`${getURLwithQueryParam(orderBy)}`} />;
    }
    if (orderBy !== orderByParam) dispatch(setOrderBy(orderByParam));

    return (
        <Container fluid id="workshopsPage">
            <Row className="headerRow">
                <Col className="searchDiv" xs={12} md={6} lg={9}>
                    <p>Chercher un atelier</p>
                    <SearchBox
                        placeholder="Par titre ou par mot-clé"
                        value={searchBoxValue}
                        setValue={(value) => dispatch(setWorkshopSearchFilter(value))}
                    />
                </Col>
                <Col className="sortDiv" xs={12} md={6} lg={3}>
                    <p>Trier par</p>
                    <Select
                        isSearchable
                        options={sortOptions.map((key) => ({ label: key, value: key }))}
                        value={[{ label: orderBy, value: orderBy }]}
                        onChange={(option) => history.push(`${getURLwithQueryParam(option.value)}`)}
                    />
                </Col>
            </Row>
            <Row className="workshopList">
                {workshops &&
                    workshops.map((workshop) => (
                        <Col key={workshop.id} className="workshopCard" xs={12} md={6} lg={3}>
                            <WorkshopCard workshop={workshop} />
                        </Col>
                    ))}
            </Row>
        </Container>
    );
};

export default Workshops;
