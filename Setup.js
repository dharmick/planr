import React, { Component } from 'react';
import * as Font from 'expo-font';
import Login from './src/screens/Login';
import { StyleProvider, Container, Content, Text, } from 'native-base';
// import getTheme from './native-base-theme/components';
// import material from './native-base-theme/variables/material';
import AppNavigator from './Navigator'

class Setup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fontLoaded: false,
        }
    }
    async componentDidMount() {
        await Font.loadAsync({
            'Roboto_medium': require("./src/assets/fonts/Roboto-Medium.ttf"),
        });
        this.setState({ fontLoaded: true });
    }

    render() {
        return (
            this.state.fontLoaded ? (
                // <StyleProvider style={getTheme(material)}>
                <AppNavigator />
                // </StyleProvider>
            ) : null

        )
    }
}



export default Setup;