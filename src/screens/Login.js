import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from '../components/Button';
import { colors } from '../config/colors';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount() { }
    render() {
        return (
            <View style={styles.container}>
                <Text>Welcome to login screen</Text>
                <Button label='LOGIN' onPress={this.handlePress} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.WHITE
    }
})
export default Login;