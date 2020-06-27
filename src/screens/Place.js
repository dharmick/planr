import React, { Component, Fragment } from 'react'
import { StyleSheet, View, Image, ScrollView, TouchableOpacity } from 'react-native'
import { Header, Left, Body, Right, Title, Text, Grid, Icon, Row, Col, H1, Button, Toast } from 'native-base';
import { colors } from '../config/colors';
import Separator from '../components/Separator';
import { axiosGet, axiosPost } from '../../axios';
import Loader from '../components/Loader';
import StarRating from 'react-native-star-rating';
import * as Animatable from 'react-native-animatable';
// import Icon from 'react-native-vector-icons/AntDesign'

const AnimatedIcon = Animatable.createAnimatableComponent(Icon)

export default class Place extends Component {
    constructor(props) {
        super(props);
        this.state = {
            poiId: this.props.navigation.getParam('id'),
            cityId: this.props.navigation.getParam('cityId'),
            isLoaded: false,
            isWishlisted: false,
            starCount: 4,
            poiDetails: {
                name: "Bandra Worli Sea Link",
                description: "The Bandra–Worli Sea Link (officially known as Rajiv Gandhi Sea Link) is a cable-stayed bridge with pre-stressed concrete-steel viaducts on either side that links Bandra in the Western Suburbs of Mumbai with Worli in South Mumbai. The bridge is a part of the proposed Western Freeway that will link the Western Suburbs to Nariman Point in Mumbai's main business district.",
                image: 'https://res.cloudinary.com/planr/image/upload/v1578477176/Mumbai/bandraworli_azvcde.jpg',
                opening_time: '00.00 hrs',
                closing_time: '24:00 hrs',
                time_to_spend: '2 hrs',
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
            }
        }

    }

    componentDidMount() {
        const data = {
            poi_id: this.state.poiId
        }
        
        this.ApiCall()

        axiosGet('/getRatings', data)
            .then(res => {
                if (res.data.success) {
                    this.setState({
                        starCount: res.data.rating
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

    ApiCall = () => {

        const data = {
            poi_id: this.state.poiId
        }

        axiosGet('/getPoI', data)
            .then(res => {
                if (res.data.success) {
                    this.setState({
                        poiDetails: res.data.data,
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

    onStarRatingPress(rating) {
        this.setState({
            starCount: rating
        });

        const params = {
            city_id: this.state.cityId,
            poi_id: this.state.poiId,
            rating: rating
        }

        axiosGet('/user-ratings', params)
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
            })

    }

    handleSmallAnimatedIconRef = (ref) => {
        this.smallAnimatedIcon = ref
    }

    handleChangeWishlist = () => {
        axiosPost('/wishlist', {
            poi_id: this.state.poiId,
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
                    <Header androidStatusBarColor="#ffffff" iosBarStyle="dark-content" >
                        <Left>
                            <Icon name='ios-arrow-back' onPress={() => this.props.navigation.goBack()} />
                        </Left>
                        <Body>
                            <Title style={{ fontFamily: 'opensans-bold' }}>{this.state.poiDetails.name}</Title>
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

                        <Image style={{ width: '100%', height: 200, }} source={{ uri: this.state.poiDetails.image }} />

                        {/* ==============
                        ABOUT
                    ============== */}

                        <View style={{ paddingTop: 30 }}>
                            <Text style={{ fontSize: 20, marginHorizontal: 20, marginBottom: 10, fontFamily: 'opensans-bold' }}>About</Text>
                            <Text style={{ color: "#444", fontSize: 14, marginHorizontal: 20, fontFamily: 'opensans', textAlign: 'justify' }}>
                                {this.state.poiDetails.description}
                            </Text>
                            <Text></Text>
                            <Text style={{ fontSize: 14, marginHorizontal: 20, marginBottom: 10, fontFamily: 'opensans' }}>Opening Time: {this.state.poiDetails.opening_time}:00 hrs</Text>
                            <Text style={{ fontSize: 14, marginHorizontal: 20, marginBottom: 10, marginTop: -10, fontFamily: 'opensans' }}>Closing Time:  {this.state.poiDetails.closing_time}:00 hrs</Text>
                            <Text style={{ fontSize: 14, marginHorizontal: 20, marginBottom: 10, marginTop: -10, fontFamily: 'opensans' }}>Time to Spend: {this.state.poiDetails.time_to_spend} hrs</Text>
                        </View>

                        <Separator />

                        {/* ==============
                        RATINGS
                    ============== */}

                        <Grid >
                            <Text style={{ fontSize: 18, marginHorizontal: 13, fontFamily: 'opensans-bold' }}> Ratings</Text>
                            <Text></Text>
                            <Row>
                                <Col size={1} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <View style={{ width: 80, height: 80, justifyContent: 'center', alignItems: 'center', borderColor: colors.LIGHT_SILVER, borderWidth: 2, borderRadius: 50 }}>
                                        <Text style={{ fontSize: 30, color: colors.GREY, fontFamily: 'opensans' }}>{this.state.poiDetails.ratings.average}</Text>
                                    </View>
                                    <Text style={{ color: colors.GREY, fontSize: 13, fontFamily: 'opensans-bold' }}>Average rating</Text>
                                </Col>
                                <Col size={2} >
                                    {
                                        this.state.poiDetails.ratings.individual_ratings.map((item, index) => (
                                            <Fragment key={index} >
                                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                                    {
                                                        [...Array(item.rating)].map((val, ind) => (
                                                            <Icon name='ios-star' key={ind} style={{ color: colors.YELLOW, fontSize: 16 }} />
                                                        ))
                                                    }
                                                    <Text style={{ fontSize: 13, color: colors.LIGHT_GREY, marginLeft: 5, fontFamily: 'opensans' }}>{item.count}</Text>
                                                </View>

                                                <View style={{ width: 200, height: 10, borderColor: colors.PRIMARY, borderWidth: 1, borderRadius: 10, marginBottom: 10 }}>
                                                    <View style={{ width: item.count / this.state.poiDetails.ratings.total_count * 200, height: 8, backgroundColor: colors.PRIMARY, borderRadius: 10 }}></View>
                                                </View>
                                            </Fragment>
                                        ))
                                    }
                                </Col>
                            </Row>
                            <Text></Text>
                        </Grid>

                        <Separator />

                        {/* ==============
                            Your RATINGS
                    ============== */}

                        <Text style={{ fontSize: 18, marginHorizontal: 10, fontFamily: 'opensans-bold' }}>Your Ratings</Text>
                        <View style={{ marginLeft: 13, marginRight: 20, marginBottom: 15, marginTop: 15 }}>
                            <StarRating
                                disabled={false}
                                starSize={35}
                                maxStars={5}
                                emptyStar={'ios-star-outline'}
                                fullStar={'ios-star'}
                                halfStar={'ios-star-half'}
                                iconSet={'Ionicons'}
                                fullStarColor={colors.YELLOW}
                                halfStarEnabled={false}
                                rating={this.state.starCount}
                                selectedStar={(rating) => this.onStarRatingPress(rating)}
                            />
                        </View>

                    </ScrollView>
                </> :
                <Loader />
        );
    }
}

const styles = StyleSheet.create({
    icon: {
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center'
    }
})