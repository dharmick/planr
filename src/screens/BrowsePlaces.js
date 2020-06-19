import React, { Component, Fragment } from 'react'
import { StyleSheet, View, Image, ScrollView, TouchableOpacity } from 'react-native'
import { Header, Left, Body, Right, Title, Text, Grid, Icon, Row, Col, H1, Button, Toast } from 'native-base';
import { colors } from '../config/colors';
import Separator from '../components/Separator';
import { axiosGet, axiosPost } from '../../axios';
import Loader from '../components/Loader';

export default class BrowsePlaces extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            poiDetails: {
                name: "Bandra Worli Sea Link",
                description: "The Bandra–Worli Sea Link (officially known as Rajiv Gandhi Sea Link) is a cable-stayed bridge with pre-stressed concrete-steel viaducts on either side that links Bandra in the Western Suburbs of Mumbai with Worli in South Mumbai. The bridge is a part of the proposed Western Freeway that will link the Western Suburbs to Nariman Point in Mumbai's main business district.",
                image: 'https://res.cloudinary.com/planr/image/upload/v1578477176/Mumbai/bandraworli_azvcde.jpg',
                average_rating: 4.5
            }
        }
    }

    componentDidMount() {
        axiosGet('/getAllPois')
            .then(res => {
                if(res.data.success) {
                    this.setState({
                        poiDetails: res.data.data,
                        isLoaded: true
                    })
                }
                else {
                    Toast.show({
                        text: res.data.message,
                        duration: 5000,
                        type: 'danger',
                        buttonText: 'okay'
                    })
                }
            })
    }

    render() {
        return (

            this.state.isLoaded?
                <>
                    <Header>
                        <Left>
                            <Icon name='ios-arrow-back' onPress={() => this.props.navigation.goBack()} />
                        </Left>
                        <Body>
                            <Title>Browse Places</Title>
                        </Body>
                        <Right>
                            <Icon name='filter' type="AntDesign" />
                        </Right>
                    </Header>
                </>:
                <Loader />
        );
    }
}