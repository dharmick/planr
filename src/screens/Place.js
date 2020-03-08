import React, { Component, Fragment } from 'react'
import { StyleSheet, View, Image, ScrollView } from 'react-native'
import { Header, Left, Body, Right, Title, Icon, Text, Grid, Row, Col, H1, Button, Toast } from 'native-base';
import { colors } from '../config/colors';
import Separator from '../components/Separator';
import { axiosGet } from '../../axios';
import Loader from '../components/Loader';
import StarRating from 'react-native-star-rating';

export default class Place extends Component {
    constructor(props) {
        super(props);
        this.state = {
            poiId: this.props.navigation.getParam('id'),
            cityId: this.props.navigation.getParam('cityId'),
            isLoaded: false,
            starCount: 3.5,
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
        axiosGet('/getPoI', data)
            .then(res => {
                if (res.data.success) {
                    this.setState({
                        poiDetails: res.data.data,
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

    render() {
        return (

            this.state.isLoaded ?
            <>
                <Header>
                    <Left>
                        <Icon name='ios-arrow-back' onPress={() => this.props.navigation.goBack()} />
                    </Left>
                    <Body>
                        <Title>{this.state.poiDetails.name}</Title>
                    </Body>
                    <Right>
                        <Icon name="ios-heart-empty" onPress={this.handleSearch} />
                    </Right>
                </Header>

                <ScrollView>
                    
                    <Image style={{ width: '100%', height: 200, }} source={{ uri: this.state.poiDetails.image }} />

                     {/* ==============
                        ABOUT
                    ============== */}

                        <View style={{ paddingTop: 30 }}>
                            <Text style={{ fontSize: 20, marginHorizontal: 20, marginBottom: 10 }}>About</Text>
                            <Text style={{ color: "#444", fontSize: 14, marginHorizontal: 20 }}>
                                {this.state.poiDetails.description}
                            </Text>
                            <Text></Text>
                            <Text style={{ fontSize: 14, marginHorizontal: 20, marginBottom: 10 }}>Opening Time: {this.state.poiDetails.opening_time}:00 hrs</Text>
                            <Text style={{ fontSize: 14, marginHorizontal: 20, marginBottom: 10, marginTop: -10 }}>Closing Time:  {this.state.poiDetails.closing_time}:00 hrs</Text>
                            <Text style={{ fontSize: 14, marginHorizontal: 20, marginBottom: 10, marginTop: -10 }}>Time to Spend: {this.state.poiDetails.time_to_spend} hrs</Text>
                        </View>

                        <Separator />

                        {/* ==============
                        RATINGS
                    ============== */}

                        <Grid >
                            <Text style={{ fontSize: 18, marginHorizontal: 10 }}> Ratings</Text>
                            <Text></Text>
                            <Row>
                                <Col size={1} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <View style={{ width: 80, height: 80, justifyContent: 'center', alignItems: 'center', borderColor: colors.LIGHT_SILVER, borderWidth: 2, borderRadius: 50 }}>
                                        <Text style={{ fontSize: 30, color: colors.GREY }}>{this.state.poiDetails.ratings.average}</Text>
                                    </View>
                                    <Text style={{ color: colors.GREY, fontSize: 13, fontWeight: 'bold' }}>Average rating</Text>
                                </Col>
                                <Col size={2} >
                                    {
                                        this.state.poiDetails.ratings.individual_ratings.map((item, index) => (
                                            <Fragment key={index} >
                                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                                    {
                                                        [...Array(item.rating)].map((val, ind) => (
                                                            <Icon name='ios-star' key={ind} style={{ color: 'gold', fontSize: 16 }} />
                                                        ))
                                                    }
                                                    <Text style={{ fontSize: 13, color: colors.SILVER, marginLeft: 5 }}>{item.count}</Text>
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
                        <Text style={{ fontSize: 18, marginHorizontal: 10, }}>Your Ratings</Text>
                        <View style={{ marginLeft: 13, marginRight: 20, marginBottom: 10, marginTop: 10 }}>
                            <StarRating
                                disabled={false}
                                starSize = {35}
                                maxStars={5}
                                emptyStar={'ios-star-outline'}
                                fullStar={'ios-star'}
                                halfStar={'ios-star-half'}
                                iconSet={'Ionicons'}
                                fullStarColor = {'gold'}
                                halfStarEnabled	= {false}
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

const styles = StyleSheet.create({})