import React, {Component} from 'react'
import Spinner from '../spinner'
import SwapiServise from '../../services/swapi-service'
import ErrorIndicator from "../error-indicator";

import './random-planet.css'

export default class RandomPlanet extends Component {
    swapiService = new SwapiServise()

    state = {
        planet: {},
        loading: true,
        error: false
    };

    componentDidMount() {
        this.updatePlanet();
        this.interval = setInterval(this.updatePlanet, 3000)
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    onError = (err) => {
        this.setState({
            loading: false,
            error: true
        })
    }

    onPlanetLoaded = (planet) => {
        this.setState({
            planet,
            loading: false
        });
    }

    updatePlanet() {
        let id = 20;
        while (id === 20 ) {
            id = Math.floor(Math.random()*19) + 3
        }
        this.swapiService
            .getPlanet(id)
            .then(this.onPlanetLoaded)
            .catch((err) => this.onError())
    }

    render() {
        const {planet, loading, error} = this.state

        const hasData = !(loading || error)

        const spinner = loading ? <Spinner />: null
        const content = hasData ? <PlanetView planet={planet} /> : null

        return (
            <div className="random-planet jumbotron rounded">
                {errorMessage}
                {spinner}
                {content}
            </div>
        )
    }
}

const PlanetView = ({planet}) => {
    const {id, name, population, rotationPeriond, diametr} = planet;

    return (
        <React.Fragment>
            <img className="planet-image"
                 src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} />
            <div>
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <span className="term">Population</span>
                        <span>{population}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Rotation Period</span>
                        <span>{rotationPeriod}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Diameter</span>
                        <span>{diameter}</span>
                    </li>
                </ul>
            </div>
        </React.Fragment>
    )
}