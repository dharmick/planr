import React, { Component, Fragment } from 'react'
import { StyleSheet, View, Image, ScrollView, TouchableOpacity } from 'react-native'
import { Header, Left, Body, Right, Title, Text, Grid, Icon, Row, Col, H1, Button, Toast, Input, Item } from 'native-base';
import { colors } from '../config/colors';
import Separator from '../components/Separator';
import { axiosGet, axiosPost } from '../../axios';
import Loader from '../components/Loader';

export default class BrowsePlaces extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            searchText: '',
            filteredPlaces: [],
            isSearched: false,
            poiDetails: [
                {
                    name: "Bandra Worli Sea Link",
                    description: "The Bandra–Worli Sea Link (officially known as Rajiv Gandhi Sea Link) is a cable-stayed bridge with pre-stressed concrete-steel viaducts on either side that links Bandra in the Western Suburbs of Mumbai with Worli in South Mumbai. The bridge is a part of the proposed Western Freeway that will link the Western Suburbs to Nariman Point in Mumbai's main business district.",
                    image: 'https://res.cloudinary.com/planr/image/upload/v1578477176/Mumbai/bandraworli_azvcde.jpg',
                    average_rating: 4.5,
                    city_id: 1
                }
            ]
        }
    }

    componentDidMount() {
        axiosGet('/getAllPois')
            .then(res => {
                if(res.data.success) {
                    this.setState({
                        poiDetails: res.data.data,
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

    onPoISelect = (place) => {
        this.props.navigation.navigate('Place', { id: place.id, cityId: place.city_id })
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
                filteredPlaces = this.state.poiDetails.filter(poi => patt.test(poi.name.toLowerCase()));
                this.setState({ filteredPlaces })
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
                            <Title>Browse Places</Title>
                        </Body>
                        <Right>
                            <Icon name='filter' type="AntDesign" />
                        </Right>
                    </Header>

                    <Item style={{ margin: -5}}>
                        <Icon style={{ color: colors.LIGHT_GREY, marginLeft: 18 }} name="ios-search" />
                        <Input
                            placeholder= "Gateway of India"
                            onChangeText={this.handleSearchTextChange}
                            value={this.state.searchText}
                            style={styles.searchbar}
                        />
                    </Item>
                        
                    <ScrollView>
                        {
                            this.state.isSearched ? this.state.filteredPlaces.map((item, index) => (
                                <TouchableOpacity key={index} onPress={() => this.onPoISelect(item)}>
                                    <View style={{flex:1, flexDirection: 'row', margin: 10}}>
                                        <View>
                                            <Image style={{ width: 77, height: 70, }} source={{ uri: item.image }} />
                                        </View>
                                        <View style={{flex:1, flexDirection:'column', marginLeft: 5,}}>
                                            <Text numberOfLines={1} style={styles.heading}>{item.name}</Text>
                                            <Text styles={styles.subheading}>Monument of India</Text>
                                            <View style={styles.horizontalLine}></View>
                                            <Text style={{fontWeight: '500', color:colors.EXTRAGREY}}> 
                                                <Icon name="ios-star" style={styles.star} /> {item.average_rating}
                                            </Text>
                                        </View> 
                                    </View>
                                </TouchableOpacity>
                            )) : this.state.poiDetails.map((item, index) => (
                                <TouchableOpacity key={index} onPress={() => this.onPoISelect(item)}>
                                    <View style={{flex:1, flexDirection: 'row', margin: 10}}>
                                        <View>
                                            <Image style={{ width: 77, height: 70, }} source={{ uri: item.image }} />
                                        </View>
                                        <View style={{flex:1, flexDirection:'column', marginLeft: 5,}}>
                                            <Text numberOfLines={1} style={styles.heading}>{item.name}</Text>
                                            <Text styles={styles.subheading}>Monument of India</Text>
                                            <View style={styles.horizontalLine}></View>
                                            <Text style={{fontWeight: '500', color:colors.EXTRAGREY}}> 
                                                <Icon name="ios-star" style={styles.star} /> {item.average_rating}
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
        fontSize: 16,
    },
    heading: {
        fontSize: 17,
        color: colors.GREY,
        fontFamily: 'opensans-extrabold',
    },
    subheading: {
        fontSize: 12,
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
        // borderWidth: 0.5,
        borderColor: colors.SILVER,
        shadowColor: "#fff",
        fontFamily: 'opensans',
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.5,
    }
})