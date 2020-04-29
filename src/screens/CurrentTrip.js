import React, { Component } from 'react'
import { StyleSheet, ScrollView, Dimensions } from 'react-native'
import MapView, { Marker, Polyline } from 'react-native-maps';
import { Header, Body, Title, Text, View, Left, Right, Icon, Button, Toast } from 'native-base';
import { colors } from '../config/colors';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';



export default class ViewSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // schedule: this.props.navigation.getParam('schedule'),
            schedule: [
                {
                    "latitude": 19.2121320000001,
                    "longitude": 73.0983140000001,
                    "place_id": "-1",
                    "place_name": "Source",
                    "starting_time": 11,
                    "type": "at_poi"
                },
                {
                    "starting_time": 11,
                    "time_to_travel": 1.7553888888888889,
                    "travel_mode": "car",
                    "type": "between_poi"
                },
                {
                    "latitude": 18.949193,
                    "longitude": 72.798893,
                    "place_id": "136",
                    "place_name": "Babu Amichand Panalal Jain Temple",
                    "starting_time": '12.75',
                    "ending_time": '13.23',
                    "type": "at_poi",
                    "average_rating": 4.5,
                    "percent_match": 90,
                },
                {
                    "starting_time": 13.75538888888889,
                    "time_to_travel": 0.5239722222222222,
                    "travel_mode": "car",
                    "type": "between_poi"
                },
                {
                    "latitude": 19.0361,
                    "longitude": 72.8172,
                    "place_id": "96",
                    "place_name": "Bandra Worli Sea Link",
                    "starting_time": 14.279361111111111,
                    "ending_time": '13.23',
                    "type": "at_poi",
                    "average_rating": 4.5,
                    "percent_match": 90,
                },
                {
                    "starting_time": 14.779361111111111,
                    "time_to_travel": 0.23708333333333334,
                    "travel_mode": "car",
                    "type": "between_poi"
                },
                {
                    "latitude": 19.0168,
                    "longitude": 72.8302,
                    "place_id": "92",
                    "place_name": "Siddhivinayak Temple",
                    "starting_time": 15.016444444444444,
                    "ending_time": '13.23',
                    "type": "at_poi",
                    "average_rating": 4.5,
                    "percent_match": 90,
                },
                {
                    "starting_time": 17.016444444444446,
                    "time_to_travel": 0.9651111111111111,
                    "travel_mode": "car",
                    "type": "between_poi"
                },
                {
                    "latitude": 19.176059,
                    "longitude": 72.9444,
                    "place_id": "-2",
                    "place_name": "Destination",
                    "starting_time": 17.981555555555556,
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

    generatePdf = async () => {
        let htmlContent = `
        <h1>Schedule</h1>
        <table>
            <tr>
                <th>Sr.no</th>
                <th>Place name</th>
                <th>Reaching time</th>
                <th>Leaving time</th>
            </tr>

        ${this.state.markers.map((item, index) => {
            return `<tr>
                <td>${index + 1}</td>
                <td>${item.place_name}</td>
                <td>${item.starting_time}</td>
                <td>${item.starting_time + item.time_to_spend}</td>
            </tr>`
        }).join("")}

        </table>`

        // using expo-print to generate pdf from html. This file will be in cacheDirectory
        const { uri } = await Print.printToFileAsync({
            html: htmlContent,
        })

        // renaming the file using expo-file-system
        let currentdate = new Date();
        let newFileName = "Planr schedule: " + currentdate.getDate() + "-"
            + (currentdate.getMonth() + 1) + "-"
            + currentdate.getFullYear() + " @ "
            + currentdate.getHours() + ":"
            + currentdate.getMinutes() + ":"
            + currentdate.getSeconds()
            + ".pdf"
        let uriArray = uri.split("/");
        let nameToChange = uriArray[uriArray.length - 1];
        let renamedURI = uri.replace(
            nameToChange, newFileName
        );
        await FileSystem.moveAsync({
            from: uri,
            to: renamedURI
        })

        return renamedURI
    }



    downloadSchedule = async () => {

        const URI = await this.generatePdf()

        // moving file to internal storage using expo-media-library because cacheDirectory cannot be seen in file explorer
        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status === "granted") {
            const asset = await MediaLibrary.createAssetAsync(URI);
            await MediaLibrary.createAlbumAsync("Planr/Schedules", asset, false);  // false parameter will make sure the file is moved and not copied
            Toast.show({
                text: "File saved successfully",
                duration: 4000,
                type: 'success',
                buttonText: 'okay'
            })
        } else {
            Toast.show({
                text: "Could not download file. Permission denied.",
                duration: 4000,
                type: 'danger',
                buttonText: 'okay'
            })
        }

    }


    shareSchedule = async () => {
        const URI = await this.generatePdf();
        Sharing.shareAsync(URI, {
            mimeType: 'application/pdf',
            dialogTitle: 'Share with your group'
        })
    }


    render() {
        return (
            <>
                <Header androidStatusBarColor="#FFFFFF" iosBarStyle="dark-content">
                    <Left>
                        <Icon name='ios-arrow-back' onPress={() => this.props.navigation.goBack()} />
                    </Left>
                    <Body>
                        <Title>Schedule</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={this.downloadSchedule}>
                            <Icon name='download' type="AntDesign" />
                        </Button>
                        <Button transparent onPress={this.shareSchedule}>
                            <Icon name='share' type="MaterialCommunityIcons" />
                        </Button>

                        {/* below button is added as a hack for alignment issue in header. It will not be seen in the UI */}
                        <Button transparent>
                            <Icon name='search' />
                        </Button>

                    </Right>
                </Header>


                {/*
                =================
                Background map with markers and lines
                =================
                */}


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
                                    pinColor={colors.BLUE}
                                />
                            )
                        })
                    }

                    <Polyline
                        coordinates={
                            this.state.markers
                        }
                        strokeColor={colors.BLUE}
                        strokeWidth={6}
                    />
                </MapView>

                {/*
                =================
                Bottom scrolling section
                =================
                */}

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
                                <Text style={styles.cardHeading}>{marker.place_name}</Text>
                                {
                                    marker.percent_match &&
                                    <Text style={styles.percentMatch}>{marker.percent_match}% match</Text>
                                }

                                {
                                    marker.average_rating &&
                                    <Text style={styles.starWrapper}>
                                        {marker.average_rating}{' '}
                                        <Icon name="ios-star" style={styles.star} />
                                    </Text>
                                }
                                <Text style={styles.timeText}>
                                    {marker.starting_time}{marker.ending_time && ' - ' + marker.ending_time}
                                </Text>
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
        elevation: 5,
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
        fontSize: 20,
        color: colors.GREY,
        fontFamily: 'opensans-extrabold',
    },
    cardTextLight: {
        fontSize: 16,
        color: '#999'
    },
    star: {
        color: colors.YELLOW,
        fontSize: 16,
    },
    starWrapper: {
        position: 'absolute',
        bottom: 13,
        right: 15,
        fontSize: 14,
        fontFamily: 'opensans',
        color: '#FFFFFF',
        backgroundColor: colors.PRIMARY,
        padding: 5,
        borderRadius: 4,
    },
    percentMatch: {
        color: '#77DD00',
        fontFamily: 'opensans-bold',
        fontSize: 14,
    },
    timeText: {
        color: colors.LIGHT_GREY,
        fontFamily: 'opensans',
        fontSize: 16,
        bottom: 15,
        left: 15,
        position: 'absolute'
    }
})
