import React from 'react'
import { TouchableNativeFeedback } from 'react-native'
import { colors } from '../config/colors'
import { View, Text, Icon } from 'native-base'

const RippleIcon = (props) => {
    return (
        <View style={{ borderRadius: 50, width: 42, height: 42 }}>
            <TouchableNativeFeedback onPress={props.onPress}
                background={TouchableNativeFeedback.Ripple('#777', true)}>
                <View style={{ width: 42, height: 42, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }} >
                    <Icon name={props.iconName} style={props.style} type={props.type} />
                </View>
            </TouchableNativeFeedback>
        </View>
    )
}

export default RippleIcon
