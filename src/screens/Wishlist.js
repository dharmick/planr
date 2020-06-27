import React, { Component, Fragment } from 'react'
import { StyleSheet, View, Image, ScrollView, TouchableOpacity, Alert, Dimensions } from 'react-native'
import { Header, Left, Body, Right, Title, Text, Tab, Tabs, Grid, Icon, Row, Col, H1, Button, Toast, Item } from 'native-base';
import { colors } from '../config/colors';
import Separator from '../components/Separator';
import { axiosGet, axiosPost } from '../../axios';
import Loader from '../components/Loader';
import * as Animatable from 'react-native-animatable';
import update from 'react-addons-update';

const AnimatedIcon = Animatable.createAnimatableComponent(Icon)

export default class Wishlist extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            isNullPlaces: false,
            isNullCitites: false,
            cities: [
                {
                  "description": "Bengaluru (also called Bangalore) is the capital of India's southern Karnataka state. The center of India's high-tech industry, the city is also known for its parks and nightlife. By Cubbon Park, Vidhana Soudha is a Neo-Dravidian legislative building. Former royal residences include 19th-century Bangalore Palace, modeled after Englandтs Windsor Castle, and Tipu Sultana's Summer Palace, an 18th-century teak structure.",
                  "id": 2,
                  "image": "https://res.cloudinary.com/planr/image/upload/v1578035392/cities/bangalore.png",
                  "name": "Bangalore"
                },
                {
                  "description": "Mumbai (formerly called Bombay) is a densely populated city on India's west coast. A financial center, it's India's largest city. On the Mumbai Harbour waterfront stands the iconic Gateway of India stone arch, built by the British Raj in 1924. Offshore, nearby Elephanta Island holds ancient cave temples dedicated to the Hindu god Shiva. The city's also famous as the heart of the Bollywood film industry.",
                  "id": 1,
                  "image": "https://res.cloudinary.com/planr/image/upload/v1578034935/cities/mumbai.jpg",
                  "name": "Mumbai"
                }
            ],
            pois: [
                {
                    "description": "Located in Prabhadevi, Siddhivinayak is a Lord Ganesha temple, one of the most significant and frequented temples in Mumbai. Visitors visit this temple in large numbers on daily basis. It was built by Laxman Vithu and Deubai Patil in 1801. It is one of the richest temples in Mumbai. The wooden doors to the sanctum are carved with images of the Lord. The inner roof which is plated with gold has the central sculpture of Ganesha.",
                    "id": 92,
                    "image": "https://res.cloudinary.com/planr/image/upload/v1578477188/Mumbai/siddhivinayak-temple_qlvjxy.jpg",
                    "name": "Siddhivinayak Temple",
                    "rating": 4.8
                },
                {
                    "description": "Marine Drive is the most easily identifiable landmark associated with Mumbai and is indicative of the glamour and glitter of the city. It is essentially 3.6 km long, arc-shaped boulevard along the South Mumbai coast that starts at the southern end of Nariman Point and ends at Girgaum Chowpatty, popularly known as Chowpatty Beach. The coast wraps the Arabian sea and is the best place in Mumbai to watch the sunset or even to just take a leisurely stroll by the sea any time of the day or night. ",
                    "id": 90,
                    "image": "https://res.cloudinary.com/planr/image/upload/v1578477182/Mumbai/marine-drive_at298n.jpg",
                    "name": "Marine drive",
                    "rating": 4.5
                }
            ]
        }
    }
    
    componentDidMount() {
        this.ApiCall()
    }

    ApiCall = () => {
        axiosGet('/wishlist')
            .then(res => {
                if (res.data.success) {
                    this.setState({
                        cities: res.data.wishlist.cities,
                        pois: res.data.wishlist.pois,
                        isLoaded: true
                    })

                    if (this.state.pois && this.state.pois.length) {
                        this.setState({ isNullPlaces: false })
                    } 
                    else {
                        this.setState({ isNullPlaces: true })
                    }

                    if (this.state.cities && this.state.cities.length) {
                        this.setState({ isNullCitites: false })
                    } 
                    else {
                        this.setState({ isNullCitites: true })
                    }
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

    onCitySelect = (city) => {
        this.props.navigation.navigate('City', {id:city.id})
    }

    handleSmallAnimatedIconRef = (ref) => {
        this.smallAnimatedIcon = ref
    }

    handleCityAnimatedIconRef = (ref) => {
        this.cityAnimatedIcon = ref
    }

    handleChangeWishlistCity = (index) => {
        axiosPost('/wishlist', {
            city_id: this.state.cities[index].id,
            value: !this.state.cities[index].isWishlisted
        }, true)
            .then(res => {
                if (res.data.success) {
                    this.ApiCall()
                }
                else {
                    Toast.show({
                        text: res.data.message,
                        duration: 5000,
                        type: 'danger',
                        buttonText: 'okay'
                    })
                }
            }, err => {
                alert("something went wrong")
            })
    }

    handleOnPressCity = (item, index) => {

        this.cityAnimatedIcon.bounceIn()
        this.setState({
            cities: update(this.state.cities, {[index]: {isWishlisted: {$set: !this.state.cities[index].isWishlisted}}})
        }, this.handleChangeWishlistCity(index))
    }

    handleChangeWishlist = (index) => {
        axiosPost('/wishlist', {
            poi_id: this.state.pois[index].id,
            value: !this.state.pois[index].isWishlisted
        }, true)
            .then(res => {
                if (res.data.success) {
                    this.ApiCall()
                }
                else {
                    Toast.show({
                        text: res.data.message,
                        duration: 5000,
                        type: 'danger',
                        buttonText: 'okay'
                    })
                }
            }, err => {
                alert("something went wrong")
            })
    }

    handleOnPressPlaces = (item, index) => {
        this.smallAnimatedIcon.bounceIn()
        this.setState({
            pois: update(this.state.pois, {[index]: {isWishlisted: {$set: !this.state.pois[index].isWishlisted}}})
        }, this.handleChangeWishlist(index))
    }

    render() {

        return (

            this.state.isLoaded ?
            <>
                <Header androidStatusBarColor={colors.PRIMARY} style={{backgroundColor: colors.WHITE,}} iosBarStyle="light-content">
                    <Left>
                        <Icon name='ios-arrow-back' style={{color: 'black'}} onPress={() => this.props.navigation.goBack()} />
                    </Left>
                    <Body>
                        <Title style={{color: 'black', fontFamily: 'opensans-bold' }}>My Wishlist</Title>
                    </Body>
                </Header>
                <Tabs>
                    <Tab 
                        tabStyle={styles.tab}
                        activeTabStyle={styles.activeTab}
                        textStyle={styles.tabText}
                        activeTextStyle={styles.activeTabText} 
                        heading={`Places (${this.state.pois.length})`}>
                        <ScrollView style={styles.cardsWrapper}>
                            {
                                this.state.isNullPlaces ? 
                                    <View style={{ paddingVertical: 100, alignItems: 'center', }}>
                                            <Text style={{ fontSize: 20, color: colors.SILVER, fontFamily: 'opensans' }}>OOPS!</Text>
                                            <Text style={{ fontSize: 16, color: colors.SILVER, fontFamily: 'opensans' }}>Nothing found.</Text>
                                    </View> : 
                                    this.state.pois.map((item, index) => (
                                        <TouchableOpacity key={index} onPress={() => this.onPoISelect(item)} activeOpacity={0.9}>
                                            <View style={styles.card}>
                                                <View>
                                                    <Image style={styles.image} source={{ uri: item.image }} />
                                                </View> 
                                                <View style={styles.cardTextWrapper}>
                                                    <Text numberOfLines={1} style={styles.cardHeading}>{item.name}</Text>   
                                                    <Text style={styles.cardTextLight} numberOfLines={2}>{item.description}</Text>
                                                    <View>
                                                        <Text style={styles.starWrapper}> 
                                                            {item.rating}{' '}<Icon name="ios-star" style={styles.star} />
                                                        </Text>
                                                    </View> 
                                                </View>  
                                                <TouchableOpacity
                                                    activeOpacity={1}
                                                    onPress={() => this.handleOnPressPlaces(item, index)}
                                                >
                                                    <AnimatedIcon
                                                        ref={this.handleSmallAnimatedIconRef}
                                                        name={item.isWishlisted ? 'heart' : 'ios-heart-empty'}
                                                        style={styles.icon}
                                                        style={{
                                                            color: (() => {
                                                                if (item.isWishlisted) {
                                                                    return colors.PRIMARY;
                                                                }
                                                                else {
                                                                    return colors.BLACK;
                                                                }
                                                            })()
                                                        }}
                                                    />
                                                </TouchableOpacity>
                                                
                                            </View>
                                        </TouchableOpacity>
                                    ))
                            }
                        </ScrollView>
                        {/* <Text>You Clicked on Places!!</Text> */}

                    </Tab>
                    <Tab 
                        tabStyle={styles.tab}
                        activeTabStyle={styles.activeTab}
                        textStyle={styles.tabText}
                        activeTextStyle={styles.activeTabText} 
                        heading={`Cities (${this.state.cities.length})`}>
                        <ScrollView>
                            {
                                this.state.isNullCitites ? 
                                    <View style={{ paddingVertical: 100, alignItems: 'center', }}>
                                                <Text style={{ fontSize: 20, color: colors.SILVER, fontFamily: 'opensans' }}>OOPS!</Text>
                                                <Text style={{ fontSize: 16, color: colors.SILVER, fontFamily: 'opensans' }}>Nothing found.</Text>
                                    </View> : 
                                    this.state.cities.map((item, index) => (
                                        <TouchableOpacity key={index} onPress={() => this.onCitySelect(item)} activeOpacity={0.9}>
                                            <View style={styles.card}>
                                                <View>
                                                    <Image style={styles.image} source={{ uri: item.image }} />
                                                </View> 
                                                <View style={styles.cardTextWrapper}>
                                                    <Text style={styles.cardHeading}>{item.name}</Text>   
                                                    <Text style={styles.cardTextLight} numberOfLines={2}>{item.description}</Text>
                                                    <View>
                                                        <Text style={styles.starWrapper}> 
                                                            {item.rating}{' '}<Icon name="ios-star" style={styles.star} />
                                                        </Text>
                                                    </View> 
                                                </View>  
                                                <TouchableOpacity
                                                    activeOpacity={1}
                                                    onPress={() => this.handleOnPressCity(item, index)}
                                                >
                                                    <AnimatedIcon
                                                        ref={this.handleCityAnimatedIconRef}
                                                        name={item.isWishlisted ? 'heart' : 'ios-heart-empty'}
                                                        style={styles.icon}
                                                        style={{
                                                            color: (() => {
                                                                if (item.isWishlisted) {
                                                                    return colors.PRIMARY;
                                                                }
                                                                else {
                                                                    return colors.BLACK;
                                                                }
                                                            })()
                                                        }}
                                                    />
                                                </TouchableOpacity>
                                                
                                            </View>
                                        </TouchableOpacity>
                                    ))
                            }
                        </ScrollView>
                    </Tab>
                </Tabs>
            </> :
            <Loader />

        );
    }
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({

    card: {
        marginHorizontal: 5,
        paddingHorizontal: 5,
        paddingVertical: 15,
        display: 'flex',
        flexDirection: 'row',
    },
    cardTextWrapper: {
        width: width - 130,
        paddingHorizontal: 10
    },
    cardHeading: {
        fontSize: 18,
        fontFamily: 'opensans-extrabold',
        color: colors.GREY,
        lineHeight: 21,
    },
    cardTextLight: {
        fontSize: 13,
        fontFamily: 'opensans',
        color: colors.LIGHT_GREY,
        lineHeight: 15
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 4
    },
    star: {
        color: 'gold',
        fontSize: 12,
    },
    starWrapper: {
        fontSize: 12,
        fontFamily: 'opensans',
        color: '#FFFFFF',
        backgroundColor: colors.PRIMARY,
        padding: 3,
        borderRadius: 2,
        alignSelf: 'flex-start',
        marginTop: 5
    },

    // tabs style
    tab: {
        backgroundColor: colors.WHITE,
    },
    activeTab: {
        backgroundColor: colors.PRIMARY,
    },
    tabText: {
        color: 'black',
        fontFamily: 'opensans'
    },
    activeTabText: {
        fontFamily: 'opensans-bold',
        fontWeight: 'normal',
        color: 'white',
    }
})