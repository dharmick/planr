import React, { useState, useEffect } from 'react'
import { View, Text, Animated, StyleSheet } from 'react-native'
import { colors } from '../config/colors'
import { metrics } from '../config/metrics';

const Loader = (props) => {
    const [xPosition] = useState(new Animated.Value(-metrics.DEVICE_WIDTH)); // Initial value for left: 0

    useEffect(() => {
        Animated.loop(Animated.timing(xPosition, {
            toValue: metrics.DEVICE_WIDTH,
            duration: 700,
        })).start();
    });

    return (
        <View style={this.styles.Wrapper}>
            <Animated.View style={[styles.loader, { left: xPosition, backgroundColor: props.color || colors.PRIMARY }]} />
        </View>
    )
}

styles = StyleSheet.create({
    loader: {
        width: metrics.DEVICE_WIDTH,
        height: 5,
        borderRadius: 5,
    },
    Wrapper: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        backgroundColor: 'rgba(0,0,0,0)',
    }
})

export default Loader
