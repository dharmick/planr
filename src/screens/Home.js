import React, { Component } from 'react';
import { StyleSheet, View, AsyncStorage, ScrollView, ImageBackground } from 'react-native';
import { Button, Text, Container, Item, Input, Icon, Card } from 'native-base';
import { colors } from '../config/colors';
import { LinearGradient } from 'expo-linear-gradient';


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trendingPlaces: [
                [
                    {
                        name: "Mumbai",
                        image: "https://images.livemint.com/img/2019/10/30/600x338/mumba--621x414_1572414902335.jpg"
                    },
                    {
                        name: "Bengaluru",
                        image: "https://miro.medium.com/max/674/1*ZcpIjbV0m4o8bIrxVK06Tw.jpeg"
                    },
                ],
                [
                    {
                        name: "Kashmir",
                        image: "https://www.globalgovernmentforum.com/wp-content/uploads/2019/08/Kashmir-Pictures_flickr_RESIZED-620x414.jpg"
                    },
                    {
                        name: "Mumbai",
                        image: "https://images.livemint.com/img/2019/10/30/600x338/mumba--621x414_1572414902335.jpg"
                    },
                ],
                [
                    {
                        name: "Bengaluru",
                        image: "https://miro.medium.com/max/674/1*ZcpIjbV0m4o8bIrxVK06Tw.jpeg"
                    },
                    {
                        name: "Kashmir",
                        image: "https://www.globalgovernmentforum.com/wp-content/uploads/2019/08/Kashmir-Pictures_flickr_RESIZED-620x414.jpg"
                    },
                ]
            ]
        }
    }
    componentDidMount() {

    }
    render() {
        return (
            <ScrollView>
                <View style={styles.greeting}>
                    <Text style={styles.greetingName}>Hey, Dharmik!</Text>
                    <Text style={styles.greetingText}>Where would you like to go today?</Text>
                    <Item style={styles.searchBox} rounded>
                        <Icon active name='search' />
                        <Input placeholder='Search, Explore, Wander' />
                    </Item>
                </View>

                <LinearGradient colors={[colors.PRIMARY, '#2D0F64']}
                    start={[0, 0]} end={[1, 1]} style={styles.nearMe}>
                    <View style={styles.nearMeHeader}>
                        <Text style={styles.nearMeHeaderText} >Near me</Text>
                    </View>
                    <View style={styles.nearMeItem}>
                        <Icon style={styles.nearMeItemIcon} name="local-atm" type="MaterialIcons" />
                        <Text style={styles.nearMeItemText}>ATM</Text>
                    </View>
                    <View style={styles.nearMeItem}>
                        <Icon style={styles.nearMeItemIcon} name="gas-pump" type="FontAwesome5" />
                        <Text style={styles.nearMeItemText}>Petrol Pump</Text>
                    </View>
                    <View style={styles.nearMeItem}>
                        <Icon style={styles.nearMeItemIcon} name="clinic-medical" type="FontAwesome5" />
                        <Text style={styles.nearMeItemText}>Medical</Text>
                    </View>
                    <View style={styles.nearMeItem}>
                        <Icon style={styles.nearMeItemIcon} name="food" type="MaterialCommunityIcons" />
                        <Text style={styles.nearMeItemText}>Food</Text>
                    </View>
                    <View style={styles.nearMeItem}>
                        <Icon style={styles.nearMeItemIcon} name="hotel" type="FontAwesome" />
                        <Text style={styles.nearMeItemText}>Hotels</Text>
                    </View>
                    <View style={styles.nearMeItem}>
                        <Icon style={styles.nearMeItemIcon} name="theater" type="MaterialCommunityIcons" />
                        <Text style={styles.nearMeItemText}>Theatres</Text>
                    </View>
                </LinearGradient>

                <View style={styles.trendingList}>
                    <View style={styles.trendingListHeader}>
                        <Text style={styles.trendingListTitle}>Trending Places</Text>
                        <Text style={styles.trendingListView}>View all</Text>
                    </View>

                    <ScrollView horizontal={true}>
                        {
                            this.state.trendingPlaces.map((item, index) => (
                                <View key={index}>
                                    {
                                        item.map((item1, index1) => (
                                            <View style={styles.trendingListItemWrapper} key={index1}>
                                                <ImageBackground
                                                    source={{ uri: item1.image }}
                                                    imageStyle={{ borderRadius: 4 }}
                                                    style={styles.trendingListItem}>
                                                    <View style={styles.trendingListItemTextWrapper}>
                                                        <Text style={styles.trendingListItemText}>{item1.name}</Text>
                                                    </View>
                                                </ImageBackground>
                                            </View>
                                        ))
                                    }
                                </View>
                            ))
                        }
                    </ScrollView>
                </View>
            </ScrollView >
        )
    }
}

const styles = StyleSheet.create({
    greeting: {
        paddingVertical: 50,
        backgroundColor: '#fafafa'
    },
    greetingName: {
        textAlign: 'center',
        fontSize: 25,
        color: colors.GREY,
        fontFamily: 'kalam'
        // fontWeight: 'bold'
    },
    greetingText: {
        textAlign: 'center',
        fontSize: 12,
        color: colors.SILVER
    },
    searchBox: {
        width: 250,
        alignSelf: 'center',
        marginTop: 30,
        borderColor: colors.GREY,
        textAlign: 'center',
    },
    nearMe: {
        elevation: 10,
        marginVertical: 50,
        marginHorizontal: 20,
        borderRadius: 20,
        overflow: 'hidden',
        backgroundColor: colors.PRIMARY,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    nearMeItem: {
        width: '33.33%',
        height: 100,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    nearMeHeader: {
        width: '100%',
        paddingHorizontal: 25,
        paddingTop: 20,
    },
    nearMeHeaderText: {
        color: '#ddd',
        fontSize: 15,
        fontFamily: 'kalam'
    },
    nearMeItemText: {
        color: '#ddd',
        fontSize: 14
    },
    nearMeItemIcon: {
        color: '#ddd',
        fontSize: 30
    },
    trendingList: {
        // backgroundColor: 'red',
    },
    trendingListItemWrapper: {
        width: 150,
        height: 120,
        margin: 10,
    },
    trendingListItem: {
        width: '100%',
        height: '100%',
    },
    trendingListItemTextWrapper: {
        backgroundColor: 'rgba(0,0,0,.3)',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4
    },
    trendingListItemText: {
        color: 'white',
        fontSize: 22,
        fontFamily: 'kalam-bold',

    },
    trendingListHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    trendingListTitle: {
        fontSize: 18,
        letterSpacing: .4,
        fontFamily: 'kalam',

    },
    trendingListView: {
        fontSize: 16,
        color: colors.SECONDARY
    }
})
export default Home;