import React, { Component, Fragment } from 'react'
import { StyleSheet, View, Image, ScrollView } from 'react-native'
import { Header, Left, Body, Right, Title, Icon, Text, Grid, Row, Col, H1, Button } from 'native-base';
import { colors } from '../config/colors';
import Separator from '../components/Separator';

export default class City extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cityId: this.props.navigation.getParam('id'),
            cityDetails: {
                name: "Mumbai",
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis vero veritatis obcaecati vel corrupti, ducimus necessitatibus consequuntur eum reiciendis deleniti maxime architecto dolor? Veritatis in vitae, ratione dolor quidem quia!",
                image: 'https://images.livemint.com/img/2019/10/30/600x338/mumba--621x414_1572414902335.jpg',
                ratings: {
                    average: 4.5,
                    total_count: 15000,
                    individual_ratings: [
                        {
                            value: 1,
                            count: 1000
                        },
                        {
                            value: 2,
                            count: 2000
                        },
                        {
                            value: 3,
                            count: 7500
                        },
                        {
                            value: 4,
                            count: 1500
                        },
                        {
                            value: 5,
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
    render() {
        return (
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
                        <Button block style={{ marginTop: 20, marginHorizontal: 20, marginBottom: 10 }}>
                            <Text>Generate Schedule</Text>
                        </Button>
                    </View>


                    <Separator />

                    {/* ==============
                        RATINGS
                    ============== */}

                    <Grid >
                        <Text style={{ fontSize: 18, marginHorizontal: 20 }}>Ratings</Text>
                        <Row>
                            <Col size={1} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 40, color: colors.GREY, borderColor: colors.LIGHT_SILVER, borderWidth: 2, borderRadius: 50, padding: 10 }}>{this.state.cityDetails.ratings.average}</Text>
                                <Text style={{ color: colors.GREY, fontSize: 13, fontWeight: 'bold' }}>Average rating</Text>
                            </Col>
                            <Col size={2} >
                                {
                                    this.state.cityDetails.ratings.individual_ratings.map((item, index) => (
                                        <Fragment key={index} >
                                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                                {
                                                    [...Array(item.value)].map((val, ind) => (
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
                                <View key={index} style={{ width: '50%' }}>
                                    <View style={{ margin: 10, borderColor: colors.LIGHT_SILVER, borderWidth: 1, borderRadius: 10, overflow: "hidden" }}>
                                        <Image source={{ uri: item.image }} style={{ width: '100%', height: 150 }} />
                                        <Text numberOfLines={1} style={{ padding: 10 }}>{item.name}</Text>
                                    </View>
                                </View>
                            ))
                        }
                    </View>


                </ScrollView>
            </>
        )
    }
}

const styles = StyleSheet.create({})
