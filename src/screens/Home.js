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
                [
                    {
                        id: 1,
                        name: "Mumbai",
                        image: "https://images.livemint.com/img/2019/10/30/600x338/mumba--621x414_1572414902335.jpg"
                    },
                    {
                        id: 2,
                        name: "Bengaluru",
                        image: "https://miro.medium.com/max/674/1*ZcpIjbV0m4o8bIrxVK06Tw.jpeg"
                    },
                ],
                [
                    {
                        id: 3,
                        name: "Hyderabad",
                        image: "https://www.globalgovernmentforum.com/wp-content/uploads/2019/08/Kashmir-Pictures_flickr_RESIZED-620x414.jpg"
                    },
                    {
                        id: 1,
                        name: "Mumbai",
                        image: "https://images.livemint.com/img/2019/10/30/600x338/mumba--621x414_1572414902335.jpg"
                    },
                ],
                [
                    {
                        id: 2,
                        name: "Bengaluru",
                        image: "https://miro.medium.com/max/674/1*ZcpIjbV0m4o8bIrxVK06Tw.jpeg"
                    },
                    {
                        id: 3,
                        name: "Hyderabad",
                        image: "https://www.globalgovernmentforum.com/wp-content/uploads/2019/08/Kashmir-Pictures_flickr_RESIZED-620x414.jpg"
                    },
                ]
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

                <Header>
                    <Left>
                        <Image source={require('../../assets/planr-logo.png')} style={{ height: 35, width: 35 }} />
                    </Left>
                    <Body>
                        <Title>Home</Title>
                    </Body>
                    <Right>
                        <RippleIcon iconName="search" onPress={this.handleSearch} />
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

                        <ScrollView horizontal={true}>
                            {
                                this.state.trendingPlaces.map((item, index) => (
                                    <View key={index}>
                                        {
                                            item.map((item1, index1) => (
                                                <TouchableOpacity
                                                    style={styles.trendingListItemWrapper}
                                                    onPress={() => this.props.navigation.navigate('City', { id: item1.id })}
                                                    key={index1}>
                                                    <ImageBackground
                                                        source={{ uri: item1.image }}
                                                        imageStyle={{ borderRadius: 4 }}
                                                        style={{ width: '100%', height: '100%' }}>
                                                        <View style={styles.trendingListItemTextWrapper}>
                                                            <Text style={styles.trendingListItemText}>{item1.name}</Text>
                                                        </View>
                                                    </ImageBackground>
                                                </TouchableOpacity>
                                            ))
                                        }
                                    </View>
                                ))
                            }
                        </ScrollView>
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
    trendingListItemWrapper: {
        width: 150,
        height: 120,
        margin: 10,
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
})
export default Home;