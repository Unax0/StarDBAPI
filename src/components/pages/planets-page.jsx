import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import { PlanetList, PlanetDetails } from "../sw-components";
import Row from "../row";

const PlanetsPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    return (
        <Row
            left={<PlanetList onItemSelected={(id) => navigate(`/planets/${id}`)} />}
            right={<PlanetDetails itemId={id} />}
        />
    );
};

export default PlanetsPage;
