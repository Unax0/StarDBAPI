import React, { Component } from 'react';

import ItemList from '../item-list/item-list';
import PersonDetails from '../person-details/person-details';
import SwapiService from "../../services/swapi-service";
import Row from '../Row';
import ErrorBoundary from "../error-boundry";

import './people-page.css';

export default class PeoplePage extends Component {

    swapiService = new SwapiService()

    state = {
        selectedPerson: null,
    }

    onPersonSelected = (selectedPerson) => {
        this.setState({ selectedPerson })
    };

    render() {

        const itemList = (
            <ItemList onItemSelected={this.onPersonSelected} getData={this.swapiService.getAllPeople}>
                { i => `${i.name} (${i.birthYear})` }
            </ItemList>
        )

        const personDetails = (
            <PersonDetails personId={this.state.selectedPerson} />
        )

        return (
            <ErrorBoundary>
                <Row left={ itemList } right={ personDetails } />
            </ErrorBoundary>
        )
    }
}