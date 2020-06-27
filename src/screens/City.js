import React, { Component, Fragment } from 'react'
import { StyleSheet, View, Image, ScrollView } from 'react-native'
import { Header, Left, Body, Right, Title, Icon, Text, Grid, Row, Col, H1, Button, Toast } from 'native-base';
import { colors } from '../config/colors';
import Separator from '../components/Separator';
import { axiosGet, axiosPost } from '../../axios';
import Loader from '../components/Loader';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';
import { metrics } from '../config/metrics';

const AnimatedIcon = Animatable.createAnimatableComponent(Icon)

export default class City extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cityId: this.props.navigation.getParam('id'),
            isLoaded: false,
            isWishlisted: false,
            cityDetails: {
                name: "Mumbai",
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis vero veritatis obcaecati vel corrupti, ducimus necessitatibus consequuntur eum reiciendis deleniti maxime architecto dolor? Veritatis in vitae, ratione dolor quidem quia!",
                image: 'https://images.livemint.com/img/2019/10/30/600x338/mumba--621x414_1572414902335.jpg',
                ratings: {
                    average: 4.5,
                    total_count: 15000,
                    individual_ratings: [
                        {
                            rating: 1,
                            count: 1000
                        },
                        {
                            rating: 2,
                            count: 2000
                        },
                        {
                            rating: 3,
                            count: 7500
                        },
                        {
                            rating: 4,
                            count: 1500
                        },
                        {
                            rating: 5,
                            count: 3000
                        }
                    ]
                },
                pois: [
                    {
                        id: 1,
                        name: "Marine Drive",
                        image: 'https://images.livemint.com/img/2019/10/30/600x338/mumba--621x414_1572414902335.jpg',

                    },
                    {
                        id: 2,
                        name: "Ganesh Gaitonde",
                        image: 'https://images.livemint.com/img/2019/10/30/600x338/mumba--621x414_1572414902335.jpg',

                    },
                    {
                        id: 1,
                        name: "Siddhivinayak Temple",
                        image: 'https://images.livemint.com/img/2019/10/30/600x338/mumba--621x414_1572414902335.jpg',

                    },
                    {
                        id: 1,
                        name: "Marine Drive",
                        image: 'https://images.livemint.com/img/2019/10/30/600x338/mumba--621x414_1572414902335.jpg',

                    },
                    {
                        id: 2,
                        name: "Ganesh Gaitonde",
                        image: 'https://images.livemint.com/img/2019/10/30/600x338/mumba--621x414_1572414902335.jpg',

                    },
                    {
                        id: 1,
                        name: "Siddhivinayak Temple",
                        image: 'https://images.livemint.com/img/2019/10/30/600x338/mumba--621x414_1572414902335.jpg',

                    }
                ]
            }
        }
    }

    onPoISelect = (place) => {
        this.props.navigation.navigate('Place', { id: place.id, cityId: this.state.cityId })
        // console.log("hiii")
        // console.log(place.id)
    }


    componentDidMount() {
        const data = {
            city_id: this.state.cityId
        }
        axiosGet('/getCity', data)
            .then(res => {
                if (res.data.success) {
                    this.setState({
                        cityDetails: res.data.data,
                        isWishlisted: res.data.data.isWishlisted,
                        isLoaded: true
                    })
                } else {
                    Toast.show({
                        text: res.data.message,
                        duration: 5000,
                        type: 'danger',
                        buttonText: 'okay'
                    })
                }

            })  
    }

    handleSmallAnimatedIconRef = (ref) => {
        this.smallAnimatedIcon = ref
    }

    handleChangeWishlist = () => {
        axiosPost('/wishlist', {
            city_id: this.state.cityId,
            value: this.state.isWishlisted
        }, true)
            .then(res => {
                if (res.data.success) {
                }
                else {
                    Toast.show({
                        text: res.data.message,
                        duration: 5000,
                        type: 'danger',
                        buttonText: 'okay'
                    })
                    this.setState({ isWishlisted: !this.state.isWishlisted })
                }
            }, err => {
                alert("something went wrong")
            })
    }

    handleOnPressLike = () => {

        this.smallAnimatedIcon.bounceIn()
        this.setState({ isWishlisted: !this.state.isWishlisted }, this.handleChangeWishlist)

    }

    render() {

        const { isWishlisted } = this.state

        return (

            this.state.isLoaded ?
                <>
                    <Header androidStatusBarColor="#ffffff" iosBarStyle="dark-content">
                        <Left>
                            <Icon name='ios-arrow-back' onPress={() => this.props.navigation.goBack()} />
                        </Left>
                        <Body>
                            <Title style={{ fontFamily: 'opensans-bold' }}>{this.state.cityDetails.name}</Title>
                        </Body>
                        <Right>
                            {/* <Icon name="ios-heart-empty" onPress={this.handleSearch} /> */}
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
                        </Right>
                    </Header>

                    <ScrollView>

                        <Image style={{ width: metrics.DEVICE_WIDTH - 40, height: 200, alignSelf: 'center', marginTop: 20, borderRadius: 8 }} source={{ uri: this.state.cityDetails.image }} />

                        {/* ==============
                        ABOUT
                    ============== */}

                        <View style={{ paddingTop: 30 }}>
                            <Text style={{ fontSize: 18, marginHorizontal: 20, marginBottom: 10, fontFamily: 'opensans-bold' }}>About</Text>
                            <Text style={{ color: "#222", fontSize: 14, marginHorizontal: 20, fontFamily: 'opensans', textAlign: 'justify' }}>
                                {this.state.cityDetails.description}
                            </Text>
                            <Button iconLeft block
                                style={{ marginTop: 20, marginHorizontal: 20, marginBottom: 10, backgroundColor: colors.PRIMARY }}
                                onPress={() => this.props.navigation.navigate('GenerateScheduleInput', { cityId: this.state.cityId, cityName: this.state.cityDetails.name })}>
                                <Icon name="map-marker-path" type="MaterialCommunityIcons" />
                                <Text style={{ fontFamily: 'opensans-bold' }}>Generate Schedule</Text>
                            </Button>
                        </View>


                        <Separator />

                        {/* ==============
                        RATINGS
                    ============== */}

                        <Grid >
                            <Text style={{ fontSize: 18, marginHorizontal: 20, fontFamily: 'opensans-bold' }}> Ratings</Text>
                            <Text></Text>
                            <Row>
                                <Col size={1} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <View style={{ width: 80, height: 80, justifyContent: 'center', alignItems: 'center', borderColor: colors.LIGHT_SILVER, borderWidth: 2, borderRadius: 50 }}>
                                        <Text style={{ fontSize: 30, color: colors.GREY, fontFamily: 'opensans' }}>{this.state.cityDetails.ratings.average}</Text>
                                    </View>
                                    <Text style={{ color: colors.GREY, fontSize: 13, fontFamily: 'opensans-bold' }}>Average rating</Text>
                                </Col>
                                <Col size={2} >
                                    {
                                        this.state.cityDetails.ratings.individual_ratings.map((item, index) => (
                                            <Fragment key={index} >
                                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                                    {
                                                        [...Array(item.rating)].map((val, ind) => (
                                                            <Icon name='ios-star' key={ind} style={{ color: 'gold', fontSize: 16 }} />
                                                        ))
                                                    }
                                                    <Text style={{ fontSize: 13, color: colors.LIGHT_GREY, marginLeft: 5, fontFamily: 'opensans' }}>{item.count}</Text>
                                                </View>

                                                <View style={{ width: 200, height: 10, borderColor: colors.PRIMARY, borderWidth: 1, borderRadius: 10, marginBottom: 10 }}>
                                                    <View style={{ width: item.count / this.state.cityDetails.ratings.total_count * 200, height: 8, backgroundColor: colors.PRIMARY, borderRadius: 10 }}></View>
                                                </View>
                                            </Fragment>
                                        ))
                                    }
                                </Col>
                            </Row>
                        </Grid>

                        <Separator />


                        {/* ==============
                        POIS
                    ============== */}

                        <Text style={{ fontSize: 18, marginHorizontal: 20, marginBottom: 5, fontFamily: 'opensans-bold' }}>Places to visit</Text>

                        {/* <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', paddingBottom: 30 }}> */}
                        {
                            this.state.cityDetails.pois.map((item, index) => (
                                <TouchableOpacity key={index} onPress={() => this.onPoISelect(item)}>
                                    <View style={{ width: '100%' }}>
                                        <View style={{ margin: 10, borderColor: colors.LIGHT_SILVER, borderWidth: 1, borderRadius: 10, overflow: "hidden" }}>
                                            <Image source={{ uri: item.image }} style={{ width: '100%', height: 150 }} />
                                            <Text numberOfLines={1} style={{ padding: 10, fontFamily: 'opensans' }}>{item.name}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ))
                        }
                        {/* </View> */}


                    </ScrollView>
                </> :
                <Loader />
        )
    }
}

const styles = StyleSheet.create({})
