import React, { Component } from 'react'
import { StyleSheet, View, ImageBackground, Image } from 'react-native'
import { Text, Button, Icon } from 'native-base'
import { colors } from '../config/colors'

export default class Initial extends Component {
    render() {
        return (
            <ImageBackground
                source={require('../assets/images/travel-background.jpg')}
                style={{ width: '100%', flex: 1, }}
            >
                <View style={{ backgroundColor: 'rgba(255,255,255,.9)', flex: 1, justifyContent: 'space-around', alignItems: 'center' }}>

                    <View>
                        <Image source={require('../../assets/planr-logo.png')} style={styles.planrLogo} />

                    </View>


                    <Image source={require('../assets/images/travel-vector-human.png')} style={styles.humanVector} />

                    <Text style={styles.headerSubText}>Tour planning and recommendations</Text>


                    <Button block style={styles.button} onPress={() => this.props.navigation.navigate('Signup')}>
                        <Text>Create Account</Text>
                    </Button>


                    <Button block style={styles.inverseButton} onPress={() => this.props.navigation.navigate('Login')}>
                        <Text style={{ color: 'black' }}>Login</Text>
                    </Button>

                    <Text style={styles.creditText}>Crafted with <Icon style={{ fontSize: 13, color: colors.SILVER }} name="md-heart" type="Ionicons" /> in India</Text>

                </View>



            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    planrLogo: {
        width: 160,
        height: 55,
        marginTop: 30
    },
    headerSubText: {
        fontSize: 20,
        textAlign: 'center',
        color: "#888",
        // fontWeight: 'bold'
    },
    button: {
        width: '90%',
        alignSelf: 'center',
        backgroundColor: colors.PRIMARY
    },
    inverseButton: {
        width: '90%',
        alignSelf: 'center',
        backgroundColor: '#f8f8f8'
    },
    humanVector: {
        width: 300,
        height: 335,
    },
    creditText: {
        color: colors.SILVER,
        fontSize: 16,
        backgroundColor: 'white'
    }
})
