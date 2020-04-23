import React, { Component } from 'react'
import { StyleSheet, View, ScrollView, FlatList } from 'react-native'
import { Text, Icon, Header, Left, Body, Title, Toast } from 'native-base'
import { colors } from '../config/colors';
import Constants from 'expo-constants';
import axios from 'axios';
import * as Location from 'expo-location';
import Loader from '../components/Loader';


export default class Nearby extends Component {
    constructor(props) {
        super(props);
        this.state = {
            suggestedLocations: [
                // {
                //     "distance": 91,
                //     "eLoc": "K8U77U",
                //     "email": "",
                //     "entryLatitude": 28.631989,
                //     "entryLongitude": 77.217886,
                //     "keywords": [
                //         "FODCOF",
                //         "759"
                //     ],
                //     "landlineNo": "+911141562923",
                //     "latitude": 28.632215,
                //     "longitude": 77.217792,
                //     "mobileNo": "",
                //     "orderIndex": 1,
                //     "placeAddress": "Block A, Hamilton House, Inner Circle, Connaught Place",
                //     "placeName": "Starbucks",
                //     "type": "POI"
                // },
            ],
            nearest: [],
            coords: "",
            isLoading: true,
        }
    }

    getCurrentLocation = async () => {

        Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest })
            .then(res => {
                this.setState({
                    coords: res.coords.latitude + "," + res.coords.longitude
                }, this.getNearBy())
            })
            .catch(err => {
                this.props.navigation.goBack();
                Toast.show({
                    text: err.code === "E_LOCATION_SETTINGS_UNSATISFIED" ? "Please enable location service" : err.code,
                    duration: 4000,
                    type: 'danger',
                    buttonText: 'okay'
                })

            })


    }

    getNearBy = () => {
        const params = new URLSearchParams();
        params.append("grant_type", "client_credentials")
        params.append("client_id", Constants.manifest.extra.mapMyIndia_client_id)
        params.append("client_secret", Constants.manifest.extra.mapMyIndia_client_secret)
        axios.post('https://outpost.mapmyindia.com/api/security/oauth/token', params, {
            "headers": {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
            .then(res => {
                axios.get('https://atlas.mapmyindia.com/api/places/nearby/json', {
                    params: {
                        'keywords': this.props.navigation.getParam('keywords'),
                        'refLocation': this.state.coords
                    },
                    headers: {
                        'Authorization': res.data.token_type + res.data.access_token
                    }
                })
                    .then(res => {
                        let suggestedLocations = res.data.suggestedLocations
                        const nearest = suggestedLocations.shift()

                        this.setState({
                            suggestedLocations,
                            nearest,
                            isLoading: false,
                        })
                    })
                    .catch(err => {
                        alert('could not get suggestions. ' + JSON.stringify(err))
                    })
            })
            .catch(err => {
                alert("could not get access token. " + JSON.stringify(err))
            })

    }

    componentDidMount() {
        this.getCurrentLocation()
    }
    render() {
        return (
            this.state.isLoading ? <Loader /> :
                <>

                    <Header>
                        <Left>
                            <Icon name='ios-arrow-back' onPress={() => this.props.navigation.goBack()} />
                        </Left>
                        <Body>
                            <Title>{this.props.navigation.getParam('title')}</Title>
                        </Body>
                    </Header>


                    <ScrollView>
                        {
                            <>
                                <Text style={styles.sectionTitle}>Nearest</Text>
                                <View style={[styles.cardWrapper, styles.nearestCardWrapper]}>
                                    <View style={styles.cardHeader}>
                                        <Text style={styles.placeName}>{this.state.nearest.placeName}</Text>
                                        <Text style={styles.distance}>{this.state.nearest.distance} m</Text>
                                    </View>
                                    <Text style={styles.placeAddress}>{this.state.nearest.placeAddress}</Text>
                                </View>
                            </>
                        }
                        {
                            <>
                                <Text style={styles.sectionTitle}>Other results</Text>
                                <FlatList
                                    keyExtractor={item => item.eLoc}
                                    data={this.state.suggestedLocations}
                                    renderItem={({ item, index, separators }) => (
                                        <View style={styles.cardWrapper}>
                                            <View style={styles.cardHeader}>
                                                <Text style={styles.placeName}>{item.placeName}</Text>
                                                <Text style={styles.distance}>{item.distance} m</Text>
                                            </View>
                                            <Text style={styles.placeAddress}>{item.placeAddress}</Text>
                                        </View>
                                    )}
                                />
                            </>
                        }
                    </ScrollView>

                </>
        )
    }
}

const styles = StyleSheet.create({
    sectionTitle: {
        fontSize: 16,
        textAlign: 'center',
        color: colors.SILVER,
        marginTop: 40
    },
    cardWrapper: {
        padding: 15,
        borderWidth: 1,
        borderColor: colors.SILVER,
        borderTopWidth: 5,
        borderTopColor: colors.GREEN,
        borderRadius: 4,
        marginVertical: 20,
        width: '90%',
        marginHorizontal: '5%',
        backgroundColor: colors.WHITE,
        elevation: 3,
    },
    nearestCardWrapper: {
        backgroundColor: colors.GREEN,
        elevation: 10,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    placeName: {
        fontSize: 20,
        color: colors.GREY,
        width: '70%',
    },
    distance: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.BLUE
    },
    placeAddress: {
        fontSize: 16,
        color: colors.LIGHT_GREY,
        marginTop: 10
    }
})
