import React, { Component } from 'react';
import * as Font from 'expo-font';
import Login from './src/screens/Login';
import { StyleProvider, Container, Content, Text, } from 'native-base';
import getTheme from './native-base-theme/components';
import common from './native-base-theme/variables/commonColor';
import { RootStack } from './Navigator';
import { StatusBar, View } from 'react-native';
import NavigationService from './NavigationService';


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
            'kalam': require("./src/assets/fonts/Kalam-Regular.ttf"),
            'kalam-bold': require("./src/assets/fonts/Kalam-Bold.ttf"),
        });
        this.setState({ fontLoaded: true });
    }

    render() {
        return (
            this.state.fontLoaded ? (
                <StyleProvider style={getTheme(common)}>
                    <RootStack ref={navigatorRef => {
                        NavigationService.setTopLevelNavigator(navigatorRef);
                    }} />
                </StyleProvider>
            ) : null

        )
    }
}



export default Setup;