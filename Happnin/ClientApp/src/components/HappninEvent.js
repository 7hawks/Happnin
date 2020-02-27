import React, { Component } from 'react';
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import "./UserCreation.css";
import logo from '../images/DefaultEvent.png';
import { Row, Col, Grid } from 'react-bootstrap';

export class HappninEvent extends React.Component {
    render() {
        const e = this.props;
        return (
            <Card class="card" >
                <Container>
                    <Row around="xs">
                    <Col xs={2} >
                        <Card.Img variant="left" src={logo} rounded style={{padding: 20}}/>
                    </Col>
                    <Col xs={10} horizontal='right'>
                        <div class="card-body" className='happninevent'>
                            <img src={e.avatar_url}/>
                            <div className='eventinfo'>
                                <h5 class="card-title">{e.name}</h5>
                                <p class="card-text" >
                                    Description: <b>{e.description}</b> <br/> 
                                    Cost: <b>{e.cost}</b> <br/> 
                                    Host ID: <b>{e.hostId}</b> <br/>
                                    Category: <b>{e.categoryId}</b> <br/>
                                    Age Restriction: <b>{e.ageRestriction}</b> <br/>
                                    Start Time: <b>{e.eventTime}</b><br/>
                                    End Time: <b>{e.endTime}</b> <br/></p>
                            </div>
                        </div> 
                    </Col>
                    </Row>
                </Container>
            </Card>
            )
    }
}