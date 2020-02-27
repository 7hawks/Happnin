import React, { Component } from 'react';
 import { HappninEvent } from './HappninEvent';

export class FetchEventData extends Component {
    static displayName = FetchEventData.name;

    constructor(props) {
        super(props);
        this.state = { events: [], loading: true };
    }

    componentDidMount() {
        this.populateEventData();
    }

    static renderEventsTable(events) {
        return (
            <div>
                 {events.map(eventinfo => <HappninEvent key={eventinfo.id}{...eventinfo}/>)}
            </div>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : FetchEventData.renderEventsTable(this.state.events);
          
        return (
            <div>
                <h1 id="tabelLabel" >Events</h1>
                <p>Got these events from our server DAWG</p>
                
                {contents}
            
            </div>

        );
    }

    async populateEventData() {
        const response = await fetch('event');
        console.log(response);
        const data = await response.json();
        console.log('Got Data', data);
        this.setState({ events: data, loading: false });
    }
}
