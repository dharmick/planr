import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import { colors } from '../config/colors'

const Loader = () => {
    return (
        <View style={{ flex: 1 }}>
            <ActivityIndicator style={{ flex: 1 }} size="large" color={colors.PRIMARY} />
        </View>
    )
}

styles = StyleSheet.create({

})

export default Loader
