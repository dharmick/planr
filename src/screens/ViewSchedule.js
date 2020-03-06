import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'

export default class ViewSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {

    }


    render() {
        return (
            this.props.navigation.getParam('schedule').map((item, index) => (
                <Text>
                    {JSON.stringify(item)}
                </Text>
            ))
        )
    }
}

const styles = StyleSheet.create({})
