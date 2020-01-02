import React from 'react'
import { View, Text } from 'react-native'
import { colors } from '../config/colors'

const Separator = () => {
    return (
        <View style={{ height: 5, backgroundColor: colors.LIGHT_SILVER, marginVertical: 30 }} />
    )
}

export default Separator
