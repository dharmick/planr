import React, { Component, Fragment } from 'react'
import { StyleSheet, View, Image, ScrollView, TouchableOpacity, Alert, Dimensions } from 'react-native'
import { Header, Left, Body, Right, Title, Text, Tab, Tabs, Grid, Icon, Row, Col, H1, Button, Toast, Item } from 'native-base';
import { colors } from '../config/colors';
import Separator from '../components/Separator';
import { axiosGet, axiosPost } from '../../axios';
import Loader from '../components/Loader';
import * as Animatable from 'react-native-animatable';

const AnimatedIcon = Animatable.createAnimatableComponent(Icon)

export default class Wishlist extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            isPlaces: true,
            isWishlisted: true,
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

        axiosGet('/wishlist')
            .then(res => {
                if (res.data.success) {
                    this.setState({
                        cities: res.data.wishlist.cities,
                        pois: res.data.wishlist.pois,
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

    handleSmallAnimatedIconRef = (ref) => {
        this.smallAnimatedIcon = ref
    }

    handleOnPressLike = () => {

        this.smallAnimatedIcon.bounceIn()
        console.log(this.state.isWishlisted)
        this.setState({ isWishlisted: !this.state.isWishlisted })

    }

    render() {

        const {isWishlisted} = this.state

        return (

            this.state.isLoaded ?
            <>
                <Header androidStatusBarColor="#FFFFFF" iosBarStyle="dark-content">
                    <Left>
                        <Icon name='ios-arrow-back' onPress={() => this.props.navigation.goBack()} />
                    </Left>
                    <Body>
                        <Title>My Wishlist</Title>
                    </Body>
                </Header>
                <Tabs>
                    <Tab style={styles.tabs} heading="Places">
                        <ScrollView style={styles.cardsWrapper}>
                            {
                                this.state.pois.map((item, index) => (
                                    <TouchableOpacity key={index} onPress={() => this.onPoISelect(item)}>
                                        <View style={styles.card}>
                                            <View style={{width:400, height:100, flex:1, flexDirection:'row'}}>
                                                <View>
                                                    <Image style={{ width: 84, height: 68, }} source={{ uri: item.image }} />
                                                </View> 
                                                <View>
                                                    <View style={{width:400, height:100, flex:1, flexDirection:'row', }}>
                                                        <View>
                                                            <Text style={styles.cardHeading}>{item.name}</Text>
                                                            <Text style={styles.cardSubHeading}>Monument of India</Text>
                                                        </View>
                                                        <View>
                                                            <Text style={styles.starWrapper}> {item.rating}
                                                                {' '}<Icon name="ios-star" style={styles.star} />
                                                            </Text>
                                                        </View>
                                                    </View>
                                                    <TouchableOpacity
                                                                activeOpacity={1}
                                                                onPress={this.handleOnPressLike}
                                                            >
                                                                <AnimatedIcon
                                                                    ref={this.handleSmallAnimatedIconRef}
                                                                    name={isWishlisted ? 'heart' : 'ios-heart-empty'}
                                                                    style={styles.icon}
                                                                    style={{
                                                                        color: (() => {
                                                                            if (isWishlisted) {
                                                                                return colors.heartColor;
                                                                            }
                                                                            else {
                                                                                return colors.BLACK;
                                                                            }
                                                                        })()
                                                                    }}
                                                                />
                                                    </TouchableOpacity>
                                                </View>                                   
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                ))
                            }
                        </ScrollView>
                        {/* <Text>You Clicked on Places!!</Text> */}

                    </Tab>
                    <Tab heading="Cities">
                        <ScrollView style={styles.cardsWrapper}>
                            {
                                this.state.cities.map((item, index) => (
                                    <TouchableOpacity key={index} onPress={() => this.onCitySelect(item)}>
                                        <View style={styles.card}>
                                            <View style={{width:400, height:100, flex:1, flexDirection:'row'}}>
                                                <View>
                                                    <Image style={{ width: 84, height: 68, }} source={{ uri: item.image }} />
                                                </View> 
                                                <View>
                                                    <View style={{width:400, height:100, flex:1, flexDirection:'row', }}>
                                                        <View>
                                                            <Text style={styles.cardHeading}>{item.name}</Text>
                                                            <Text style={styles.cardSubHeading}>City of India</Text>
                                                        </View>
                                                        {/* <View>
                                                            <Text style={styles.starWrapper}> {item.rating}
                                                                {' '}<Icon name="ios-star" style={styles.star} />
                                                            </Text>
                                                        </View> */}
                                                    </View>
                                                    <TouchableOpacity
                                                                activeOpacity={1}
                                                                onPress={this.handleOnPressLike}
                                                            >
                                                                <AnimatedIcon
                                                                    ref={this.handleSmallAnimatedIconRef}
                                                                    name={isWishlisted ? 'heart' : 'ios-heart-empty'}
                                                                    style={styles.icon}
                                                                    style={{
                                                                        color: (() => {
                                                                            if (isWishlisted) {
                                                                                return colors.heartColor;
                                                                            }
                                                                            else {
                                                                                return colors.BLACK;
                                                                            }
                                                                        })()
                                                                    }}
                                                                />
                                                    </TouchableOpacity>
                                                </View>                                   
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                ))
                            }
                        </ScrollView>
                        <Text>You Clicked on Cities!!</Text>
                    </Tab>
                </Tabs>
            </> :
            <Loader />

        );
    }
}

const { width } = Dimensions.get("window");
const card_height = 90;
const card_width = 340;

const styles = StyleSheet.create({

    card: {
        width: card_width,
        height: card_height,
        backgroundColor: colors.WHITE,
        marginHorizontal: 10,
        borderRadius: 4,
        padding: 15,
        elevation: 5,
        marginTop: 15
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
    cardHeading: {
        fontSize: 20,
        color: colors.GREY,
        fontFamily: 'opensans-extrabold',
        marginLeft: 6
    },
    cardSubHeading: {
        fontSize: 14,
        color: colors.GREY,
        fontFamily: 'opensans',
        marginLeft: 6
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
        bottom: 8,
        right: 2,
        fontSize: 14,
        fontFamily: 'opensans',
        color: '#FFFFFF',
        backgroundColor: colors.WISHLIST,
        padding: 5,
        borderRadius: 4,
    }
})