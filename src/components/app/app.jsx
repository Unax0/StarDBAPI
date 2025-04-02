import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StarshipDetails from "../sw-components/starship-details";
import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorIndicator from "../error-indicator";
import ErrorBoundary from "../error-boundary";
import { SwapiServiceProvider } from '../swapi-service-context';
import SwapiService from "../../services/swapi-service";
import { PeoplePage, PlanetsPage, StarshipsPage, LoginPage, SecretPage } from "../pages";
import './app.css';

export default class App extends Component {
    state = {
        selectedItem: null,
        hasError: false,
        swapiService: new SwapiService(),
        isLoggedIn: false
    };

    onLogin = () => {
        this.setState({ isLoggedIn: true });
    };

    componentDidCatch(error, errorInfo) {
        this.setState({ hasError: true });
    }

    render() {
        if (this.state.hasError) {
            return <ErrorIndicator />;
        }

        const { isLoggedIn, swapiService } = this.state;

        return (
            <ErrorBoundary>
                <SwapiServiceProvider value={swapiService}>
                    <Router>
                        <div className="stardb-app">
                            <Header />
                            <RandomPlanet />
                            <Routes>
                                <Route path="/" element={<h4>Welcome to StarDB</h4>} />
                                <Route path="/people/:id?" element={<PeoplePage />} />
                                <Route path="/planets/:id?" component={PlanetsPage} exact/>
                                <Route path="/starships" element={<StarshipsPage />} />
                                <Route path="/starships/:id" element={<StarshipDetails />} />
                                <Route
                                    path="/login"
                                    element={<LoginPage isLoggedIn={isLoggedIn} onLogin={this.onLogin} />}
                                />
                                <Route path="/secret" element={<SecretPage isLoggedIn={isLoggedIn} />} />
                                <Route path="*" element={<h4>Page not found</h4>} />
                            </Routes>
                        </div>
                    </Router>
                </SwapiServiceProvider>
            </ErrorBoundary>
        );
    }
}
