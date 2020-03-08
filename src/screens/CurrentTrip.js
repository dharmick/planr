import React, { Component } from 'react'
import { StyleSheet, ScrollView, Dimensions } from 'react-native'
import MapView, { Marker, Polyline } from 'react-native-maps';
import { Header, Body, Title, Text, View } from 'native-base';
import { colors } from '../config/colors';
import { Icon } from 'native-base';


export default class CurrentTrip extends Component {

    constructor(props) {
        super(props);
        this.state = {
            schedule: [
                {
                    "latitude": 19.2094,
                    "longitude": 73.0939,
                    "place_id": "-1",
                    "place_name": "Source",
                    "starting_time": 10.0,
                    "type": "at_poi",
                },
                {
                    "starting_time": 10.0,
                    "time_to_travel": 1.6464166666666669,
                    "travel_mode": "car",
                    "type": "between_poi"
                },
                {
                    "latitude": 19.0361,
                    "longitude": 72.8172,
                    "place_id": "96",
                    "place_name": "Bandra Worli Sea Link",
                    "starting_time": 11.646416666666667,
                    "time_to_spend": 0.5,
                    "type": "at_poi",
                    "average_rating": 4.2
                },
                {
                    "starting_time": 12.146416666666667,
                    "time_to_travel": 0.2135,
                    "travel_mode": "car",
                    "type": "between_poi"
                },
                {
                    "latitude": 18.9901,
                    "longitude": 72.8148,
                    "place_id": "138",
                    "place_name": "Nehru Planetarium",
                    "starting_time": 12.359916666666667,
                    "time_to_spend": 1.5,
                    "type": "at_poi",
                    "average_rating": 4.7
                },
                {
                    "starting_time": 13.859916666666667,
                    "time_to_travel": 0.3436111111111111,
                    "travel_mode": "car",
                    "type": "between_poi"
                },
                {
                    "latitude": 18.949193,
                    "longitude": 72.798893,
                    "place_id": "136",
                    "place_name": "Babu Amichand Panalal Jain Temple",
                    "starting_time": 14.203527777777778,
                    "time_to_spend": 1.0,
                    "type": "at_poi",
                    "average_rating": 4.1
                },
                {
                    "starting_time": 15.203527777777778,
                    "time_to_travel": 0.28700000000000003,
                    "travel_mode": "car",
                    "type": "between_poi"
                },
                {
                    "latitude": 18.9404,
                    "longitude": 72.8339,
                    "place_id": "97",
                    "place_name": "Chhatrapati Shivaji Terminus",
                    "starting_time": 15.490527777777778,
                    "time_to_spend": 1.0,
                    "type": "at_poi",
                    "average_rating": 4.5
                },
                {
                    "starting_time": 16.49052777777778,
                    "time_to_travel": 1.1110277777777777,
                    "travel_mode": "car",
                    "type": "between_poi"
                },
                {
                    "latitude": 19.1726,
                    "longitude": 72.9425,
                    "place_id": "-2",
                    "place_name": "Destination",
                    "starting_time": 17.601555555555557,
                    "type": "at_poi"
                }
            ],

            markers: []
        }
    }

    componentWillMount() {
        this.index = 0;
        this.state.markers = this.state.schedule.filter(item => item.type === "at_poi")
    }


    handleScroll = (event) => {
        let value = event.nativeEvent.contentOffset.x;
        let index = Math.floor(value / (card_width + 20) + 0.3);
        if (index >= this.state.markers.length)
            index = this.state.markers.length - 1
        if (index <= 0)
            index = 0

        if (this.index !== index) {
            this.index = index;
            const { latitude, longitude } = this.state.markers[index];
            this.map.animateToRegion(
                {
                    latitude,
                    longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                }, 350
            )

        }
    }

    render() {
        return (
            <>
                <Header noLeft>
                    <Body>
                        <Title>Heading</Title>
                    </Body>
                </Header>

                <MapView
                    ref={map => this.map = map}
                    initialRegion={{
                        latitude: this.state.markers[0].latitude,
                        longitude: this.state.markers[0].longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    moveOnMarkerPress={false}
                    style={styles.mapview}
                >
                    {
                        this.state.markers.map((item, index) => {
                            return (
                                <Marker
                                    key={index}
                                    coordinate={{ latitude: item.latitude, longitude: item.longitude }}
                                    pinColor={colors.SECONDARY}
                                />
                            )
                        })
                    }

                    <Polyline
                        coordinates={
                            this.state.markers
                        }
                        strokeColor={colors.SECONDARY}
                        strokeWidth={6}
                    />
                </MapView>

                <ScrollView
                    horizontal
                    snapToInterval={card_width + 20}
                    decelerationRate={.9}
                    scrollEventThrottle={1}
                    style={styles.cardsWrapper}
                    contentContainerStyle={styles.endPadding}
                    onScroll={this.handleScroll}
                >
                    {
                        this.state.markers.map((marker, index) => (
                            <View key={index} style={styles.card}>
                                <Text style={styles.cardHeading}>{index + 1}. {marker.place_name}</Text>

                                {
                                    marker.average_rating &&
                                    <Text style={styles.starWrapper}>
                                        {marker.average_rating}
                                        <Icon name="ios-star" style={styles.star} />
                                    </Text>
                                }
                                <Text style={styles.cardTextLight}>
                                    Starting Time: {marker.starting_time}
                                </Text>
                                {
                                    marker.time_to_spend &&
                                    <Text style={styles.cardTextLight}>
                                        Time to spend: {marker.time_to_spend}
                                    </Text>
                                }
                            </View>
                        ))
                    }
                </ScrollView>
            </>
        )
    }
}

const { width, height } = Dimensions.get("window");
const card_height = height / 4;
const card_width = width * 0.7;

const styles = StyleSheet.create({
    mapview: {
        flex: 1
    },
    card: {
        width: card_width,
        height: card_height,
        backgroundColor: colors.WHITE,
        marginHorizontal: 10,
        borderRadius: 4,
        padding: 15,
        borderBottomWidth: 5,
        borderBottomColor: colors.LIGHT_PRIMARY
    },
    cardsWrapper: {
        position: 'absolute',
        bottom: 20,
        left: 0,
        paddingLeft: (width - card_width - 20) / 2
    },
    endPadding: {
        paddingRight: (width - card_width - 20)
    },
    cardHeading: {
        fontSize: 22,
        color: '#444',
        fontFamily: 'kalam-bold',
        lineHeight: 28,
    },
    cardTextLight: {
        fontSize: 16,
        color: '#999'
    },
    star: {
        color: colors.YELLOW,
        fontSize: 20,
    },
    starWrapper: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        fontSize: 18,
        color: colors.SILVER
    }
})
