import React, { Component } from 'react';
import { StyleSheet, FlatList, StatusBar, View, AsyncStorage, ScrollView, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { Button, Text, Container, Item, Input, Icon, Card, Header, Title, Left, Right, Body, List, ListItem } from 'native-base';
import { colors } from '../config/colors';
import { LinearGradient } from 'expo-linear-gradient';
import { metrics } from '../config/metrics';
import RippleIcon from '../components/RippleIcon';
import { commonStyles } from '../assets/CommonStyles';



class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            searchText: '',
            trendingPlaces: [

                {
                    id: 1,
                    name: "Bangalore",
                    image: "https://res.cloudinary.com/planr/image/upload/v1588143110/font_images/bangalore-font-image_zmhsmb.png"
                },
                {
                    id: 2,
                    name: "Goa",
                    image: "https://res.cloudinary.com/planr/image/upload/v1588147729/font_images/goa-font-image_xshlvn.png"
                },
                {
                    id: 3,
                    name: "Mumbai",
                    image: "https://res.cloudinary.com/planr/image/upload/v1588147729/font_images/mumbai-font-image_xwlhtf"
                },
                {
                    id: 4,
                    name: "Bangalore",
                    image: "https://res.cloudinary.com/planr/image/upload/v1588143110/font_images/bangalore-font-image_zmhsmb.png"
                },
                {
                    id: 5,
                    name: "Goa",
                    image: "https://res.cloudinary.com/planr/image/upload/v1588147729/font_images/goa-font-image_xshlvn.png"
                },
                {
                    id: 6,
                    name: "Mumbai",
                    image: "https://res.cloudinary.com/planr/image/upload/v1588147729/font_images/mumbai-font-image_xwlhtf"
                },
            ],
            nearBy: [
                {
                    title: 'ATM',
                    image: 'https://res.cloudinary.com/planr/image/upload/v1587735527/icons/atm_wiuw1s.png',
                    keywords: 'FINATM'
                },
                {
                    title: 'Gas station',
                    image: 'https://res.cloudinary.com/planr/image/upload/v1587735527/icons/gas-station_biycmb.png',
                    keywords: 'TRNPMP'
                },
                {
                    title: 'Medicals',
                    image: 'https://res.cloudinary.com/planr/image/upload/v1587735502/icons/medicine_wsaueh.png',
                    keywords: 'MDS24H;HLTMDS'
                },
                {
                    title: 'Shopping',
                    image: 'https://res.cloudinary.com/planr/image/upload/v1587735527/icons/shopping-basket_hteyro.png',
                    keywords: 'SHPMAL;SHPDST'
                },
                {
                    title: 'Fast food',
                    image: 'https://res.cloudinary.com/planr/image/upload/v1587735527/icons/pizza_afgltu.png',
                    keywords: 'FODFFD;FODPLZ'
                },
                {
                    title: 'Meals',
                    image: 'https://res.cloudinary.com/planr/image/upload/v1587735527/icons/serving-dish_ovbylf.png',
                    keywords: 'FODIND'
                }
            ]
        }
    }




    handleSearch = () => {
        this.props.navigation.navigate('SearchCity');
    }

    trendingSelectHandle = (city) => {
        alert(`${city.name} selected`)
    }



    componentDidMount() {
        AsyncStorage.getItem('name')
            .then(name => {
                this.setState({ userName: name })
            })
    }
    render() {
        const { DEVICE_WIDTH } = metrics;
        return (
            <>

                <Header androidStatusBarColor="#FFFFFF" iosBarStyle="dark-content">
                    <Body>
                        <Image source={require('../../assets/planr-logo.png')} style={{ height: 28, width: 80, marginLeft: 20 }} />
                    </Body>
                    <Right>
                        <RippleIcon iconName="ios-search" onPress={this.handleSearch} style={{ color: colors.LIGHT_GREY }} />
                    </Right>
                </Header>

                <ScrollView>

                    {/*
                    =================
                    near me section
                    =================
                    */}


                    <View style={commonStyles.section}>
                        <Text style={commonStyles.sectionHeader}>Find near you</Text>
                        <View style={styles.nearMe}>
                            {
                                this.state.nearBy.map((item, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        activeOpacity={0.9}
                                        style={styles.nearMeItem}
                                        onPress={() => this.props.navigation.navigate('Nearby',
                                            { title: item.title, keywords: item.keywords })}>
                                        <Image source={{ uri: item.image }} style={{ width: 50, height: 50 }} />
                                        <Text style={styles.nearMeItemText}>{item.title}</Text>
                                    </TouchableOpacity>
                                ))
                            }
                        </View>
                    </View>


                    {/*
                    =================
                    trending section
                    =================
                    */}

                    <View style={commonStyles.section}>

                        <View style={commonStyles.sectionInlineHeaderWrapper}>
                            <Text style={commonStyles.sectionHeader}>Trending Cities</Text>
                            <Text style={[commonStyles.sectionHeader, { color: colors.BLUE }]}>View all</Text>
                        </View>

                        <ScrollView
                            horizontal={true}
                        >
                            {
                                this.state.trendingPlaces.map((item, index) => (
                                    <TouchableOpacity
                                        activeOpacity={0.9}
                                        key={index}
                                        style={styles.trendingItemWrapper}
                                        onPress={() => this.trendingSelectHandle(item)}>
                                        <Image source={{ uri: item.image }} style={{ width: 120, height: 120 }} />
                                    </TouchableOpacity>
                                ))
                            }
                        </ScrollView>
                    </View>

                    {/*
                    =================
                    Browse more section
                    =================
                    */}

                    <View style={commonStyles.section}>
                        <Text style={commonStyles.sectionHeader}>Browse more</Text>
                        <ScrollView
                            horizontal={true}
                            snapToInterval={280}
                            decelerationRate={.9}>

                            <TouchableOpacity activeOpacity={0.9} style={styles.browseMoreItemWrapper}>
                                <Text style={styles.browseMoreItemTextTitle}>All Places</Text>
                                <Text style={styles.browseMoreItemText}>View all the places available with us</Text>
                                <Text style={styles.browseMoreItemLink}>View now</Text>
                                <Image source={require('../assets/images/map-illustration.png')} style={styles.browseMoreItemImage} />
                            </TouchableOpacity>

                            <TouchableOpacity activeOpacity={0.9} style={[styles.browseMoreItemWrapper, { backgroundColor: colors.GREEN }]}>
                                <Text style={styles.browseMoreItemTextTitle}>All Cities</Text>
                                <Text style={styles.browseMoreItemText}>View all the cities available with us</Text>
                                <Text style={styles.browseMoreItemLink}>View now</Text>
                                <Image source={require('../assets/images/camera-illustration.png')} style={[styles.browseMoreItemImage, { width: 70, height: 60, top: 20 }]} />
                            </TouchableOpacity>

                        </ScrollView>
                    </View>


                    {/*
                    =================
                    give ratings section
                    =================
                    */}

                    <View style={commonStyles.section}>
                        <TouchableOpacity activeOpacity={0.9} style={styles.giveRatingsWrapper}>
                            <ImageBackground source={require('../assets/images/star-background.jpg')} style={{ width: '100%' }}>
                                <LinearGradient colors={[colors.YELLOW, 'rgba(255, 238, 147, 0.6)']} start={[0, 0]} end={[1, 0]} style={{ padding: 15 }}>
                                    <Text style={styles.giveRatingsTextTitle}>Give Ratings</Text>
                                    <Text style={styles.giveRatingsText}>Rate places to get better recommendations</Text>
                                    <Text style={styles.giveRatingsLink}>Rate now</Text>
                                </LinearGradient>
                            </ImageBackground>
                        </TouchableOpacity>
                    </View>

                    {/*
                    =================
                    footer section
                    =================
                    */}

                    <View style={styles.footer}>
                        <Image source={require('../assets/images/passport-illustration.png')} style={styles.footerImage} />
                        <Text style={styles.footerText}>
                            TRAVEL{'\n'}
                            EXPLORE{'\n'}
                            LIVE
                        </Text>
                    </View>


                </ScrollView>

            </>
        )
    }
}

const styles = StyleSheet.create({

    // near me
    nearMe: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    nearMeItem: {
        width: '33.33%',
        paddingVertical: 20,
        alignItems: 'center',
    },
    nearMeItemText: {
        color: colors.GREY,
        fontFamily: 'opensans-bold',
        fontSize: 14,
        marginTop: 10
    },


    // trending
    trendingItemWrapper: {
        height: 150,
        width: 150,
        justifyContent: 'center',
        alignItems: 'center',
    },

    // browse more
    browseMoreItemWrapper: {
        width: 300,
        backgroundColor: colors.ORANGE,
        margin: 10,
        borderRadius: 4,
        borderWidth: 3,
        borderColor: colors.NAVY_BLUE,
    },
    browseMoreItemTextTitle: {
        fontSize: 20,
        color: colors.NAVY_BLUE,
        fontFamily: 'opensans-bold',
        marginLeft: 15,
        marginTop: 15,
    },
    browseMoreItemText: {
        fontSize: 14,
        color: colors.LIGHT_GREY,
        fontFamily: 'opensans',
        marginLeft: 15,
        width: '60%'
    },
    browseMoreItemLink: {
        backgroundColor: colors.NAVY_BLUE,
        color: 'white',
        fontFamily: 'opensans',
        fontSize: 12,
        paddingVertical: 5,
        paddingHorizontal: 15,
        marginTop: 25,
    },
    browseMoreItemImage: {
        width: 80,
        height: 75,
        position: 'absolute',
        right: 15,
        top: 15
    },

    // give ratings
    giveRatingsWrapper: {
        width: metrics.DEVICE_WIDTH - 20,
        marginHorizontal: 10,
        borderWidth: 3,
        borderColor: '#FFEC45',
        borderRadius: 4,
        marginVertical: 15
    },
    giveRatingsTextTitle: {
        color: colors.GREY,
        fontSize: 20,
        fontFamily: 'opensans-bold',
    },
    giveRatingsText: {
        color: colors.LIGHT_GREY,
        fontSize: 14,
        width: '60%',
        fontFamily: 'opensans',
    },
    giveRatingsLink: {
        color: colors.GREY,
        fontSize: 14,
        fontFamily: 'opensans-extrabold',
        marginTop: 15
    },

    // footer
    footer: {
        backgroundColor: colors.LIGHT_SILVER,
        padding: 30,
        marginTop: 25
    },
    footerText: {
        fontFamily: 'opensans-extrabold',
        fontSize: 45,
        textAlign: 'right',
        lineHeight: 45,
        color: '#E6E6E6',
    },
    footerImage: {
        width: 100,
        height: 100,
        position: 'absolute',
        top: 40,
        left: 20,
        opacity: 0.5
    }
})
export default Home;