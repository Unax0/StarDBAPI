import React, { Component } from "react";

import './item-details.css'
import SwapiService from "../../services/swapi-service.jsx";
import Spinner from '../spinner'

// Экспортируем Record, чтобы можно было импортировать в других компонентах
export const Record = ({ item, field, label }) => {
    return (
        <li className="list-group-item">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </li>
    )
}

export default class ItemDetails extends Component {
    swapiService = new SwapiService()

    state = {
        item: null,
        image: null,
        loading: true
    }

    componentDidMount() {
        this.updateItem();
    }

    componentDidUpdate(prevProps) {
        if (this.props.itemId !== prevProps.itemId) {
            this.updateItem();
            this.setState({ loading: true });
        }
    }

    updateItem = () => {
        const { itemId, getData, getImageUrl } = this.props;
        if (!itemId) {
            return;
        }

        getData(itemId)
            .then((item) => {
                this.setState({
                    item,
                    image: getImageUrl(item),
                    loading: false
                });
            })
            .catch(() => this.setState({ loading: false }));
    }

    render() {
        const { item, image, loading } = this.state;

        if (!item) {
            return <span>Select a person from a list</span>;
        }

        const spinner = loading ? <Spinner /> : null;
        const content = !loading ? <ItemDetailsView item={item} image={image} context={this.props.children} /> : null;

        return (
            <div className="person-details card">
                {spinner}
                {content}
            </div>
        )
    }
}

const ItemDetailsView = ({ item, image, context }) => {
    const { name } = item;

    return (
        <React.Fragment>
            <img className="person-image" alt="person" src={image} />

            <div className="card-body">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    {React.Children.map(context, (child) => {
                        return React.cloneElement(child, { item });
                    })}
                </ul>
            </div>
        </React.Fragment>
    )
}
