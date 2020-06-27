import React, { Component } from 'react'
import DatePicker from 'react-native-datepicker'
import { Text, Item, Input, View, Header, Left, Icon, Body, Title, Button } from 'native-base'
import { colors } from '../config/colors';
import { StyleSheet, FlatList, TouchableOpacity, Alert, ScrollView } from 'react-native'
import RippleIcon from '../components/RippleIcon';
import axios from 'axios';
import { axiosGet } from '../../axios';
import Constants from 'expo-constants';
import Loader from '../components/Loader';
import MultiSelect from 'react-native-multiple-select';

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
            userLocation: {},
            isLoading: false,
            excludedPois: [],
            pois: this.props.navigation.getParam('pois')
        }
    }

    componentDidMount() {
        this.setState({ isLoading: false })
    }

    onSelectedItemsChange = selectedItems => {
        this.setState({ excludedPois: selectedItems });
    };


    // function which gets the access token first and then gets suggestions.
    // access token api is called every time because it is anyway using cache.
    // so need to store access token locally.
    // query -> text for autocomplete
    // suggestionsKey -> sourceSuggestions or destinationSuggestions
    getSuggestions = (query, suggestionsKey) => {
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
                axios.get('https://atlas.mapmyindia.com/api/places/search/json', {
                    params: {
                        'query': query
                    },
                    headers: {
                        'Authorization': res.data.token_type + res.data.access_token
                    }
                })
                    .then(res => {
                        this.setState({ [suggestionsKey]: res.data.suggestedLocations })
                    })
                    .catch(err => {
                        alert('could not get suggestions. ' + JSON.stringify(err.response.data))
                    })
            })
            .catch(err => {
                alert("could not get access token. " + JSON.stringify(err.response.data))
            })
    }


    timeout = null;

    // function which updates text and also calls getSuggestions if user stops
    // typing for 300ms.
    // textKey -> source or destination
    // text -> what the user is typing
    // suggestionsKey -> sourceSuggestions or destinationSuggestions
    autocompleteChangeHandler = (textKey, text, suggestionsKey) => {
        this.setState({ [textKey]: text })

        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
            this.getSuggestions(this.state[textKey], suggestionsKey)
        }, 300)
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

        const { source, destination, from, to } = this.state;
        if (!source || !destination || !from || !to) {
            Alert.alert("OOPS!!", "All fields are mandatory");
            return;
        }

        this.setState({ isLoading: true })
        const data = {
            source_lat: this.state.selectedSource.latitude,
            source_lon: this.state.selectedSource.longitude,
            destination_lat: this.state.selectedDestination.latitude,
            destination_lon: this.state.selectedDestination.longitude,
            departure_time: this.timeStringToFloat(this.state.from),
            time_budget: this.timeStringToFloat(this.state.to) - this.timeStringToFloat(this.state.from),
            city_id: this.props.navigation.getParam('cityId'),
            pois_exclude: JSON.stringify(this.state.excludedPois)
        }
        axiosGet('/generate/pbdfs', data)
            .then(res => {
                this.setState({ isLoading: false })
                this.props.navigation.navigate("ViewSchedule", {
                    schedule: res.data.data,
                    sourceName: this.state.source,
                    destinationName: this.state.destination
                })
            })
            .catch(err => {
                this.setState({ isLoading: false })
                alert("something went wrong")
            })
    }

    render() {
        return (
            <>
                {
                    this.state.isLoading &&
                    <Loader />
                }
                <Header>
                    <Left>
                        <RippleIcon iconName="ios-arrow-back" onPress={() => this.props.navigation.goBack()} />
                    </Left>
                    <Body>
                        <Title style={{ fontFamily: 'opensans-bold' }}>Generate Schedule - {this.props.navigation.getParam('cityName')}</Title>
                    </Body>
                </Header>

                {/* <Text>{JSON.stringify(this.state.userLocation.coords)}</Text> */}

                <ScrollView>


                    <View style={styles.inputWrapper}>
                        <Text style={styles.label}>Source</Text>
                        <Item style={{ borderColor: colors.GREY }}>
                            <Input
                                placeholder='e.g. Your hotel or airport'
                                value={this.state.source}
                                placeholderTextColor={colors.SILVER}
                                style={styles.input}
                                onChangeText={(text) => this.autocompleteChangeHandler("source", text, "sourceSuggestions")} />
                        </Item>
                        <FlatList
                            keyExtractor={item => item.eLoc}
                            data={this.state.sourceSuggestions}
                            renderItem={({ item, index, separators }) => (
                                <TouchableOpacity onPress={() => this.sourceSelectHandler(item)}>
                                    <View style={{ paddingVertical: 20, paddingHorizontal: 10, }}>
                                        <Text style={{ fontFamily: 'opensans' }}>{item.placeName}</Text>
                                        <Text style={{ fontFamily: 'opensans' }}>{item.placeAddress}</Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                        />
                    </View>

                    <View style={styles.inputWrapper}>
                        <Text style={styles.label}>Destination</Text>
                        <Item style={{ borderColor: colors.GREY }}>
                            <Input
                                placeholder='e.g. Your hotel or airport'
                                value={this.state.destination}
                                placeholderTextColor={colors.SILVER}
                                style={styles.input}
                                onChangeText={(text) => this.autocompleteChangeHandler("destination", text, "destinationSuggestions")} />
                        </Item>
                        <FlatList
                            keyExtractor={item => item.eLoc}
                            data={this.state.destinationSuggestions}
                            renderItem={({ item, index, separators }) => (
                                <TouchableOpacity onPress={() => this.destinationSelectHandler(item)}>
                                    <View style={{ paddingVertical: 20, paddingHorizontal: 10 }}>
                                        <Text style={{ fontFamily: 'opensans' }}>{item.placeName}</Text>
                                        <Text style={{ fontFamily: 'opensans' }}>{item.placeAddress}</Text>
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
                                placeholderText: styles.dateTimePlaceholder,
                            }}
                            onDateChange={(date) => { this.setState({ to: date }) }}
                        />
                    </View>

                    <View style={styles.inputWrapper}>
                        <MultiSelect
                            items={this.state.pois}
                            uniqueKey="id"
                            ref={(component) => { this.multiSelect = component }}
                            onSelectedItemsChange={this.onSelectedItemsChange}
                            selectedItems={this.state.excludedPois}
                            selectText="Pick places to exclude"
                            searchInputPlaceholderText="Search places to exclude"
                            tagRemoveIconColor={colors.GREY}
                            tagBorderColor={colors.GREY}
                            tagTextColor={colors.GREY}
                            selectedItemTextColor="#CCC"
                            selectedItemIconColor="#CCC"
                            itemTextColor={colors.GREY}
                            itemFontSize={18}
                            displayKey="name"
                            searchInputStyle={{ color: '#CCC', fontSize: 18, padding: 3 }}
                            submitButtonColor={colors.GREY}
                            submitButtonText="Exclude selected places"
                            fontFamily="opensans-bold"
                            fontSize={18}
                            flatListProps={{ 'nestedScrollEnabled': true }}
                            styleItemsContainer={{ backgroundColor: 'white', height: 200, borderTopWidth: 1, borderTopColor: colors.GREY }}
                            styleDropdownMenuSubsection={{ borderBottomColor: colors.GREY }}
                        />
                    </View>

                    <View style={styles.inputWrapper}>
                        <Button block style={{ marginVertical: 20, height: 60, backgroundColor: colors.PRIMARY }} onPress={this.generateSchedule}>
                            <Text style={{ fontSize: 18, fontFamily: 'opensans-bold' }}>PLAN MY TRIP</Text>
                        </Button>
                    </View>

                </ScrollView>

            </>
        )
    }
}

const styles = StyleSheet.create({
    inputWrapper: {
        width: '90%',
        alignSelf: 'center',
        marginTop: 30,
    },
    label: {
        fontSize: 18,
        color: colors.GREY,
        fontFamily: 'opensans-bold'
    },
    input: {
        fontSize: 20,
        fontFamily: 'opensans',
        color: colors.GREY,
        height: 40,
        borderBottomWidth: 0,
        borderBottomColor: colors.GREY,
    },
    dateTime: {
        width: '100%',
    },
    dateTimeInput: {
        height: 40,
        borderWidth: 0,
        borderBottomWidth: 1,
        borderColor: colors.GREY
    },
    dateTimeText: {
        fontSize: 18,
        fontFamily: 'opensans',
        color: colors.GREY,
        alignSelf: 'flex-start',
        marginLeft: 8
    },
    dateTimePlaceholder: {
        fontSize: 18,
        color: colors.SILVER,
        fontFamily: 'opensans'
    }
})