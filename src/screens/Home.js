import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, Container, Content, Header, Left, Right, Body, Title, Footer, FooterTab, Icon } from 'native-base';
import { colors } from '../config/colors';
import FooterMenu from '../components/FooterMenu'

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount() { }
    static navigationOptions = {
        title: 'Home',
    };
    render() {
        return (
            <Container>

            </Container>
        )
    }
}

const styles = StyleSheet.create({

})
export default Home;