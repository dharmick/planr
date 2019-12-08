import React, { Component } from 'react';
import { StyleSheet, View, AsyncStorage } from 'react-native';
import { Button, Text, Container, Content, Header, Left, Right, Body, Title, Footer, FooterTab, Icon } from 'native-base';
import { colors } from '../config/colors';
import FooterMenu from '../components/FooterMenu'

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            val: ''
        }
    }
    componentDidMount() {
        AsyncStorage.getItem('userToken')
            .then(val => {
                this.setState({ val: val })
            })
    }
    render() {
        return (
            <Container>
                <Text>{this.state.val}</Text>
            </Container>
        )
    }
}

const styles = StyleSheet.create({

})
export default Home;