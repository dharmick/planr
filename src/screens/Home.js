import React, { Component } from 'react';
import { StyleSheet, FlatList, StatusBar, View, AsyncStorage, ScrollView, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { Button, Text, Container, Item, Input, Icon, Card, Header, Title, Left, Right, Body, List, ListItem } from 'native-base';
import { colors } from '../config/colors';
import { LinearGradient } from 'expo-linear-gradient';
import { metrics } from '../config/metrics';
import RippleIcon from '../components/RippleIcon';



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
                    <View style={styles.greeting}>
                        <Text style={styles.greetingName}>Hey, {this.state.userName}!</Text>
                        <Text style={styles.greetingText}>Where would you like to go today?</Text>
                    </View>

                    <LinearGradient colors={[colors.PRIMARY, '#fc8b92']}
                        start={[0, 0]} end={[1, 1]} style={styles.nearMe}>
                        <View style={styles.nearMeHeader}>
                            <Text style={styles.nearMeHeaderText} >Near me</Text>
                        </View>

                        <TouchableOpacity
                            style={styles.nearMeItem}
                            onPress={() => this.props.navigation.navigate('Nearby',
                                { title: 'ATMs', keywords: 'FINATM' })}>
                            <Icon style={styles.nearMeItemIcon} name="local-atm" type="MaterialIcons" />
                            <Text style={styles.nearMeItemText}>ATM</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.nearMeItem}
                            onPress={() => this.props.navigation.navigate('Nearby',
                                { title: 'Petrol Pumps', keywords: 'TRNPMP' })}>
                            <Icon style={styles.nearMeItemIcon} name="gas-pump" type="FontAwesome5" />
                            <Text style={styles.nearMeItemText}>Petrol Pump</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.nearMeItem}
                            onPress={() => this.props.navigation.navigate('Nearby',
                                { title: 'Medicals', keywords: 'MDS24H;HLTMDS' })}>
                            <Icon style={styles.nearMeItemIcon} name="clinic-medical" type="FontAwesome5" />
                            <Text style={styles.nearMeItemText}>Medical</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.nearMeItem}
                            onPress={() => this.props.navigation.navigate('Nearby',
                                { title: 'Fast food', keywords: 'FODFFD;FODPLZ' })}>
                            <Icon style={styles.nearMeItemIcon} name="pizza-slice" type="FontAwesome5" />
                            <Text style={styles.nearMeItemText}>Fast food</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.nearMeItem}
                            onPress={() => this.props.navigation.navigate('Nearby',
                                { title: 'Malls and stores', keywords: 'SHPMAL;SHPDST' })}>
                            <Icon style={styles.nearMeItemIcon} name="shopping-cart" type="FontAwesome5" />
                            <Text style={styles.nearMeItemText}>Malls &amp; stores </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.nearMeItem}
                            onPress={() => this.props.navigation.navigate('Nearby',
                                { title: 'Lunch / Dinner', keywords: 'FODIND' })}>
                            <Icon style={styles.nearMeItemIcon} name="rice" type="MaterialCommunityIcons" />
                            <Text style={styles.nearMeItemText}>Lunch / Dinner</Text>
                        </TouchableOpacity>
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
                                                <TouchableOpacity
                                                    style={styles.trendingListItemWrapper}
                                                    onPress={() => this.props.navigation.navigate('City', { id: item1.id })}
                                                    key={index1}>
                                                    <ImageBackground
                                                        source={{ uri: item1.image }}
                                                        imageStyle={{ borderRadius: 4 }}
                                                        style={styles.trendingListItem}>
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
    greeting: {
        paddingTop: 50,
        backgroundColor: '#fff'
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
        elevation: 5,
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
        color: colors.BLUE
    }
})
export default Home;