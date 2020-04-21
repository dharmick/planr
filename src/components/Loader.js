import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import { colors } from '../config/colors'

const Loader = () => {
    return (
        <View style={this.styles.activity}>
            <ActivityIndicator style={{ flex: 1 }} size={50} color={colors.PRIMARY} />
        </View>
    )
}

styles = StyleSheet.create({
    activity: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        backgroundColor: 'rgba(0,0,0,0.1)',
    }
})

export default Loader
