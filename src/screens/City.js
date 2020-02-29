import React, { Component, Fragment } from 'react'
import { StyleSheet, View, Image, ScrollView } from 'react-native'
import { Header, Left, Body, Right, Title, Icon, Text, Grid, Row, Col, H1, Button, Toast } from 'native-base';
import { colors } from '../config/colors';
import Separator from '../components/Separator';
import { axiosGet } from '../../axios';
import Loader from '../components/Loader';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class City extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cityId: this.props.navigation.getParam('id'),
            isLoaded: false,
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
        this.props.navigation.navigate('Place', { id: place.id })
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

    render() {
        return (

            this.state.isLoaded ?
                <>
                    <Header>
                        <Left>
                            <Icon name='ios-arrow-back' onPress={() => this.props.navigation.goBack()} />
                        </Left>
                        <Body>
                            <Title>{this.state.cityDetails.name}</Title>
                        </Body>
                        <Right>
                            <Icon name="ios-heart-empty" onPress={this.handleSearch} />
                        </Right>
                    </Header>

                    <ScrollView>

                        <Image style={{ width: '100%', height: 200 }} source={{ uri: this.state.cityDetails.image }} />

                        {/* ==============
                        ABOUT
                    ============== */}

                        <View style={{ paddingTop: 30 }}>
                            <Text style={{ fontSize: 18, marginHorizontal: 20, marginBottom: 10 }}>About</Text>
                            <Text style={{ color: "#444", fontSize: 14, marginHorizontal: 20 }}>
                                {this.state.cityDetails.description}
                            </Text>
                            <Button iconLeft block style={{ marginTop: 20, marginHorizontal: 20, marginBottom: 10 }}>
                                <Icon name="map-marker-path" type="MaterialCommunityIcons" />
                                <Text>Generate Schedule</Text>
                            </Button>
                        </View>


                        <Separator />

                        {/* ==============
                        RATINGS
                    ============== */}

                        <Grid >
                            <Text style={{ fontSize: 18, marginHorizontal: 20 }}> Ratings</Text>
                            <Text></Text>
                            <Row>
                                <Col size={1} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <View style={{ width: 80, height: 80, justifyContent: 'center', alignItems: 'center', borderColor: colors.LIGHT_SILVER, borderWidth: 2, borderRadius: 50 }}>
                                        <Text style={{ fontSize: 30, color: colors.GREY }}>{this.state.cityDetails.ratings.average}</Text>
                                    </View>
                                    <Text style={{ color: colors.GREY, fontSize: 13, fontWeight: 'bold' }}>Average rating</Text>
                                </Col>
                                <Col size={2} >
                                    {
                                        this.state.cityDetails.ratings.individual_ratings.map((item, index) => (
                                            <Fragment key={index} >
                                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                                    {
                                                        [...Array(item.rating)].map((val, ind) => (
                                                            <Icon name='ios-star' key={ind} style={{ color: colors.YELLOW, fontSize: 16 }} />
                                                        ))
                                                    }
                                                    <Text style={{ fontSize: 13, color: colors.SILVER, marginLeft: 5 }}>{item.count}</Text>
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

                        <Text style={{ fontSize: 18, marginHorizontal: 20, marginBottom: 5 }}>Places to visit</Text>

                        <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', paddingBottom: 30 }}>
                            {
                                this.state.cityDetails.pois.map((item, index) => (
                                    <TouchableOpacity onPress={() => this.onPoISelect(item)}>
                                        <View key={index} style={{ width: '100%' }}>
                                            <View style={{ margin: 10, borderColor: colors.LIGHT_SILVER, borderWidth: 1, borderRadius: 10, overflow: "hidden" }}>
                                                <Image source={{ uri: item.image }} style={{ width: '100%', height: 150 }} />
                                                <Text numberOfLines={1} style={{ padding: 10 }}>{item.name}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                ))
                            }
                        </View>


                    </ScrollView>
                </> :
                <Loader />
        )
    }
}

const styles = StyleSheet.create({})
