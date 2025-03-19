import React, { Component } from 'react'

import Header from '../header'
import RandomPlanet from '../random-planet'
import ErrorIndicator from "../error-indicator"
import PeoplePage from "../people-page"
import SwapiService from "../../services/swapi-service"
import ErrorBoundary from "../error-boundary"
import { PersonList, PlanetList, StarshipList } from "../sw-components"

import './app.css'

export default class App extends Component {

    swapiService = new SwapiService()

    state = {
        selectedPerson: null,
        hasError: false
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ hasError: true })
    }

    render() {

        if (this.state.hasError) {
            return <ErrorIndicator />
        }

        return (
            <ErrorBoundary>
                <div className="stardb-app">
                    <Header />
                    <RandomPlanet />

                    <PersonList>
                        { i => `${i.name} (${i.birthYear})` }
                    </PersonList>

                    <StarshipList>
                        { i => `${i.name} (${i.cargoCapacity})` }
                    </StarshipList>

                    <PlanetList>
                        { i => `${i.name} (${i.population})` }
                    </PlanetList>
                </div>
            </ErrorBoundary>
        )
    }
}
