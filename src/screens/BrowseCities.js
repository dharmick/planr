import React, { Component, Fragment } from 'react'
import { StyleSheet, View, Image, ScrollView, TouchableOpacity } from 'react-native'
import { Header, Left, Body, Right, Title, Text, Grid, Icon, Row, Col, H1, Button, Toast, Item, Input } from 'native-base';
import { colors } from '../config/colors';
import Separator from '../components/Separator';
import { axiosGet, axiosPost } from '../../axios';
import Loader from '../components/Loader';

export default class BrowseCities extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            searchText: '',
            filteredPlaces: [],
            isSearched: false,
            isNull: false,
            cityDetails: [
                {
                    id: 1,
                    name: "Mumbai",
                    description: "The Bandra–Worli Sea Link (officially known as Rajiv Gandhi Sea Link) is a cable-stayed bridge with pre-stressed concrete-steel viaducts on either side that links Bandra in the Western Suburbs of Mumbai with Worli in South Mumbai. The bridge is a part of the proposed Western Freeway that will link the Western Suburbs to Nariman Point in Mumbai's main business district.",
                    image: 'https://res.cloudinary.com/planr/image/upload/v1578477176/Mumbai/bandraworli_azvcde.jpg',
                    rating: 4.5
                }
            ]
        }
    }

    componentDidMount() {
        axiosGet('/getAllCities')
            .then(res => {
                if(res.data.success) {
                    this.setState({
                        cityDetails: res.data.data,
                        isLoaded: true
                    })
                }
                else {
                    Toast.show({
                        text: res.data.message,
                        duration: 5000,
                        type: 'danger',
                        buttonText: 'okay'
                    })
                }
            })
    }

    onCitySelect = (city) => {
        this.props.navigation.navigate('City', { id: city.id })
    }

    handleSearchTextChange = (text) => {
        this.setState({
            searchText: text
        }, () => {
            if (text === "") {
                this.setState({ isSearched: false})
                this.setState({ filteredPlaces: [] })
            } else {
                this.setState({ isSearched: true})
                var patt = new RegExp(text.toLowerCase());
                filteredPlaces = this.state.cityDetails.filter(city => patt.test(city.name.toLowerCase()));
                this.setState({ filteredPlaces })
                if (filteredPlaces && filteredPlaces.length) {
                    this.setState({ isNull: false})
                } else {
                    this.setState({ isNull: true})
                }
            }
        })
    }

    render() {
        return (

            this.state.isLoaded?
                <>
                    <Header>
                        <Left>
                            <Icon name='ios-arrow-back' onPress={() => this.props.navigation.goBack()} />
                        </Left>
                        <Body>
                            <Title style={{ fontFamily: 'opensans-bold' }}>Browse Cities</Title>
                        </Body>
                        <Right>
                            <Icon name='filter' type="AntDesign" />
                        </Right>
                    </Header>
                    
                    <View style={{margin: 10, marginTop: 15}}>
                        <Item style={styles.searchBox}>
                            <Icon style={styles.searchIcon} name="ios-search" />
                            <Input
                                placeholderTextColor= {colors.SILVER}
                                placeholder= "Mumbai"
                                onChangeText={this.handleSearchTextChange}
                                value={this.state.searchText}
                                style={styles.searchbar}
                            />
                        </Item>
                    </View>

                    <ScrollView>
                        {
                            this.state.isSearched ?    
                                (this.state.isNull ? 
                                    <View style={{ paddingVertical: 100, alignItems: 'center', }}>
                                        <Text style={{ fontSize: 20, color: colors.SILVER, fontFamily: 'opensans' }}>OOPS!</Text>
                                        <Text style={{ fontSize: 16, color: colors.SILVER, fontFamily: 'opensans' }}>Nothing found.</Text>
                                    </View> :
                                    this.state.filteredPlaces.map((item, index) => (
                                    <TouchableOpacity key={index} onPress={() => this.onCitySelect(item)}>
                                        <View style={styles.container}>
                                            <View>
                                                <Image style={styles.image} source={{ uri: item.image }} />
                                            </View>
                                            <View style={styles.content}>
                                                <Text numberOfLines={1} style={styles.heading}>{item.name}</Text>
                                                <Text style={styles.subheading}>city of India</Text>
                                                <View style={styles.horizontalLine}></View>
                                                <Text style={{fontWeight: '500', color:colors.EXTRAGREY}}> 
                                                    <Icon name="ios-star" style={styles.star} /> {item.rating}
                                                </Text>
                                            </View> 
                                        </View>
                                    </TouchableOpacity>
                                ))) : 
                                this.state.cityDetails.map((item, index) => (
                                <TouchableOpacity key={index} onPress={() => this.onCitySelect(item)}>
                                    <View style={styles.container}>
                                        <View>
                                            <Image style={styles.image} source={{ uri: item.image }} />
                                        </View>
                                        <View style={styles.content}>
                                            <Text numberOfLines={1} style={styles.heading}>{item.name}</Text>
                                            <Text style={styles.subheading}>City of India</Text>
                                            <View style={styles.horizontalLine}></View>
                                            <Text style={{fontWeight: '500', color:colors.EXTRAGREY}}> 
                                                <Icon name="ios-star" style={styles.star} /> {item.rating}
                                            </Text>
                                        </View> 
                                    </View>
                                </TouchableOpacity>
                            ))
                        }
                    </ScrollView>
                </>:
                <Loader />
        );
    }
}

const styles = StyleSheet.create({
    star: {
        color: colors.GOLD,
        fontSize: 17,
    },
    container: {
        flex:1, 
        flexDirection: 'row', 
        marginLeft: 12,
        marginTop: 11,
        marginBottom: 11,
        marginRight: 15,
    },
    image: { 
        width: 90, 
        height: 74, 
    },
    content: {
        flex:1, 
        flexDirection:'column', 
        marginLeft: 6,
    },
    heading: {
        fontSize: 17,
        color: colors.GREY,
        fontFamily: 'opensans-extrabold',
    },
    subheading: {
        fontSize: 15,
        color: colors.EXTRAGREY,
        fontFamily: 'opensans',
    },
    horizontalLine: {
        borderBottomWidth: 1.4,
        borderBottomColor: colors.SILVER,
        width: '100%'
    },
    searchbar: {
        margin: 15,
        marginLeft: -4,
        marginRight: 18,
        borderColor: colors.SILVER,
        fontFamily: 'opensans',
    },
    searchIcon: {
        color: colors.SILVER, 
        marginLeft: 18,
    },
    searchBox: { 
        margin: 0, 
        borderBottomWidth: 2, 
        borderTopWidth: 2, 
        borderRightWidth: 2, 
        borderLeftWidth: 2,
        height: 52,
        elevation: 3,
    },
})