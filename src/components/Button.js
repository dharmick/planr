import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colors } from '../config/colors';
class Button extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount() { }
    render() {
        return (
            <TouchableOpacity style={styles.container} onPress={this.props.onPress}>
                <Text style={styles.text}>{this.props.label}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: '94%',
        backgroundColor: colors.PRIMARY,
        paddingVertical: 15,
        borderRadius: 4,
        marginHorizontal: '3%',

    },
    text: {
        color: colors.WHITE,
        textAlign: 'center',
        fontSize: 20,
        // letterSpacing: 1,
        fontWeight: 'bold'
    }
})
export default Button;