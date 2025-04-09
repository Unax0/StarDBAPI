import React from "react";
import { useNavigate } from "react-router-dom";

import { StarshipList } from "../sw-components";
import Row from "../row";
import StarshipIntro from "../starship-intro/index.jsx";

const StarshipsPage = () => {
    const navigate = useNavigate();

    return (
        <Row
            left={<StarshipList onItemSelected={(itemId) => navigate(itemId)} />}
            right={<StarshipIntro />}
        />
    );
};

export default StarshipsPage;
