import React, { Component } from 'react'
import DatePicker from 'react-native-datepicker'
import { Text, Item, Input, View, Header, Left, Icon, Body, Title, Button } from 'native-base'
import { colors } from '../config/colors';
import { StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import RippleIcon from '../components/RippleIcon';
import axios from 'axios';
import { axiosGet } from '../../axios';
// import * as Location from 'expo-location';
// import * as Permissions from 'expo-permissions';



export default class GenerateScheduleInput extends Component {
    constructor(props) {
        super(props)
        this.state = {
            source: "",
            destination: "",
            from: "",
            to: "",
            sourceSuggestions: [],
            destinationSuggestions: [],
            selectedSource: {},
            selectedDestination: {},
            userLocation: {}
        }
    }

    async componentDidMount() {
        // Location.requestPermissionsAsync().then(async () => {
        //     let userLocation = await Location.getCurrentPositionAsync({});
        //     this.setState({ userLocation });
        // })

    }

    destinationChangeHandler = (text) => {
        this.setState({ destination: text })
        axios.get('https://atlas.mapmyindia.com/api/places/search/json', {
            params: {
                'query': this.state.destination
            },
            headers: {
                'Authorization': 'bearerb6534e1c-455f-4ef6-a834-3577c159b0c5'
            }
        })
            .then(res => {
                this.setState({ destinationSuggestions: res.data.suggestedLocations })
            })
            .catch(err => {
                alert('something went wrong')
            })
    }

    sourceChangeHandler = (text) => {
        this.setState({ source: text })
        axios.get('https://atlas.mapmyindia.com/api/places/search/json', {
            params: {
                'query': this.state.source,
                // 'location': this.state.userLocation.coords.latitude + ',' + this.state.userLocation.coords.longitude
            },
            headers: {
                'Authorization': 'bearerb6534e1c-455f-4ef6-a834-3577c159b0c5'
            }
        })
            .then(res => {
                this.setState({ sourceSuggestions: res.data.suggestedLocations })
            })
            .catch(err => {
                alert('something went wrong')
            })
    }

    sourceSelectHandler = (item) => {
        this.setState({
            selectedSource: item,
            source: item.placeName,
            sourceSuggestions: []
        })
    }

    destinationSelectHandler = (item) => {
        this.setState({
            selectedDestination: item,
            destination: item.placeName,
            destinationSuggestions: []
        })
    }

    timeStringToFloat = (time) => {
        var hoursMinutes = time.split(/[.:]/);
        var hours = parseInt(hoursMinutes[0], 10);
        var minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;
        return hours + minutes / 60;
    }

    generateSchedule = () => {
        const data = {
            source_lat: this.state.selectedSource.latitude,
            source_lon: this.state.selectedSource.longitude,
            destination_lat: this.state.selectedDestination.latitude,
            destination_lon: this.state.selectedDestination.longitude,
            departure_time: this.timeStringToFloat(this.state.from),
            time_budget: this.timeStringToFloat(this.state.to) - this.timeStringToFloat(this.state.from),
            city_id: this.props.navigation.getParam('cityId')
        }
        axiosGet('/generate/pbdfs', data)
            .then(res => {
                this.props.navigation.navigate("ViewSchedule", { schedule: res.data.data })
            })
            .catch(err => {
                alert("something went wrong")
            })
    }

    render() {
        return (
            <>

                <Header>
                    <Left>
                        <RippleIcon iconName="ios-arrow-back" onPress={() => this.props.navigation.goBack()} />
                    </Left>
                    <Body>
                        <Title>Generate Schedule - {this.props.navigation.getParam('cityName')}</Title>
                    </Body>
                </Header>

                <Text>{JSON.stringify(this.state.userLocation.coords)}</Text>

                <View style={styles.inputWrapper}>
                    <Text style={styles.label}>Source</Text>
                    <Item regular>
                        <Input
                            placeholder='e.g. your hotel or airport'
                            value={this.state.source}
                            placeholderTextColor={colors.SILVER}
                            style={{ fontSize: 22, fontWeight: 'bold', color: '#777', height: 60, borderWidth: 2, borderColor: colors.SILVER }}
                            onChangeText={(text) => this.sourceChangeHandler(text)} />
                    </Item>
                    <FlatList
                        keyExtractor={item => item.eLoc}
                        data={this.state.sourceSuggestions}
                        renderItem={({ item, index, separators }) => (
                            <TouchableOpacity onPress={() => this.sourceSelectHandler(item)}>
                                <View style={{ paddingVertical: 20, paddingHorizontal: 10 }}>
                                    <Text>{item.placeName}</Text>
                                    <Text>{item.placeAddress}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </View>

                <View style={styles.inputWrapper}>
                    <Text style={styles.label}>Destination</Text>
                    <Item regular>
                        <Input
                            placeholder='e.g. your hotel or airport'
                            value={this.state.destination}
                            placeholderTextColor={colors.SILVER}
                            style={{ fontSize: 22, fontWeight: 'bold', color: '#777', height: 60, borderWidth: 2, borderColor: colors.SILVER }}
                            onChangeText={(text) => this.destinationChangeHandler(text)} />
                    </Item>
                    <FlatList
                        keyExtractor={item => item.eLoc}
                        data={this.state.destinationSuggestions}
                        renderItem={({ item, index, separators }) => (
                            <TouchableOpacity onPress={() => this.destinationSelectHandler(item)}>
                                <View style={{ paddingVertical: 20, paddingHorizontal: 10 }}>
                                    <Text>{item.placeName}</Text>
                                    <Text>{item.placeAddress}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </View>

                <View style={styles.inputWrapper}>
                    <Text style={styles.label}>From</Text>
                    <DatePicker
                        style={styles.dateTime}
                        date={this.state.from}
                        mode="time"
                        showIcon={false}
                        placeholder="Select time"
                        format="HH:mm"
                        is24Hour={false}
                        customStyles={{
                            dateInput: styles.dateTimeInput,
                            dateText: styles.dateTimeText,
                            placeholderText: styles.dateTimePlaceholder
                        }}
                        onDateChange={(date) => { this.setState({ from: date }) }}
                    />
                </View>

                <View style={styles.inputWrapper}>
                    <Text style={styles.label}>To</Text>
                    <DatePicker
                        style={styles.dateTime}
                        date={this.state.to}
                        mode="time"
                        showIcon={false}
                        placeholder="Select time"
                        format="HH:mm"
                        is24Hour={false}
                        customStyles={{
                            dateInput: styles.dateTimeInput,
                            dateText: styles.dateTimeText,
                            placeholderText: styles.dateTimePlaceholder
                        }}
                        onDateChange={(date) => { this.setState({ to: date }) }}
                    />
                </View>

                <View style={styles.inputWrapper}>
                    <Button block style={{ marginVertical: 20, height: 60 }} onPress={this.generateSchedule}>
                        <Text style={{ fontSize: 18 }}>PLAN MY TRIP</Text>
                    </Button>
                </View>
            </>
        )
    }
}

const styles = StyleSheet.create({
    inputWrapper: {
        width: '90%',
        alignSelf: 'center',
        marginTop: 20
    },
    label: {
        fontSize: 18,
        color: '#777'
    },
    dateTime: {
        width: '100%',
        marginVertical: 12,
    },
    dateTimeInput: {
        height: 60,
        borderWidth: 3,
        borderColor: colors.SILVER
    },
    dateTimeText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#777',
    },
    dateTimePlaceholder: {
        fontSize: 22,
        fontWeight: 'bold',
        color: colors.SILVER,
    }
})