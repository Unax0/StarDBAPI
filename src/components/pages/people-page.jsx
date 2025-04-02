import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import { PersonDetails, PersonList } from "../sw-components";
import Row from "../row";

const PeoplePage = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    return (
        <Row
            left={<PersonList onItemSelected={( id ) => history.push(id)} />}
            right={<PersonDetails itemId={id} />}
        />
    );
};

export default PeoplePage;
