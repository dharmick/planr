import React from 'react';
import { Image, View, StyleSheet, StatusBar } from 'react-native'
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { colors } from './src/config/colors'
import Login from './src/screens/Login';
import Signup from './src/screens/Signup';
import Home from './src/screens/Home';
import Profile from './src/screens/Profile';
import AuthLoadingScreen from './AuthLoadingScreen';
import CurrentTrip from './src/screens/CurrentTrip';
import { Header, Title, Button, Icon, Left, Right, Body, Text, Item, Input } from "native-base";
import City from './src/screens/City';
import SearchCity from './src/screens/SearchCity';



const HomeStack = createStackNavigator({
    HomePage: {
        screen: Home,
    },
    City: {
        screen: City,
    },
    SearchCity: {
        screen: SearchCity,
    }
}, {
    headerMode: 'none',
    initialRouteName: 'HomePage'
});

const UserStack = createStackNavigator({
    Profile: {
        screen: Profile,
        navigationOptions: {
            title: "Profile"
        }
    }
}, {
    headerMode: 'none'
});

const TripStack = createStackNavigator({
    CurrentTrip: {
        screen: CurrentTrip,
        navigationOptions: {
            title: 'Mumbai'
        }
    }
})



const LoggedInStack = createBottomTabNavigator(
    {
        Home: {
            screen: HomeStack,
        },
        Trip: {
            screen: TripStack,
        },
        User: {
            screen: UserStack,
        },
    },
    {
        initialRouteName: 'Home',
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                let iconType;
                if (routeName === 'Home') {
                    iconName = focused ? 'home' : 'home-outline';
                    iconType = 'MaterialCommunityIcons';
                } else if (routeName === 'User') {
                    iconName = focused ? 'account' : 'account-outline';
                    iconType = 'MaterialCommunityIcons';
                } else if (routeName === 'Trip') {
                    iconName = focused ? 'map-marker' : 'map-marker-outline'
                    iconType = 'MaterialCommunityIcons'
                }

                return <Icon name={iconName} type={iconType} />;
            },
        }),
        tabBarOptions: {
            activeTintColor: colors.PRIMARY,
            inactiveTintColor: colors.SILVER,
            showLabel: false,
            labelStyle: {
                fontSize: 5
            },
            style: {
                // borderRadius: 30,
                // borderTopWidth: 0,
                // marginBottom: 10,
                // marginHorizontal: 10,
                // elevation: 20,
                // height: 60,
                // paddingVertical: 7,
                // backgroundColor: '#fafafa'
            }
        },
    }
);

const NotLoggedInStack = createStackNavigator({
    Login: {
        screen: Login,
    },
    Signup: {
        screen: Signup,
    },
}, {
    headerMode: 'none'
});


export const RootStack = createAppContainer(createSwitchNavigator(
    {
        AuthLoading: AuthLoadingScreen,
        App: LoggedInStack,
        Auth: NotLoggedInStack,
    },
    {
        initialRouteName: 'AuthLoading',
    }
));


const styles = StyleSheet.create({
    headerTitle: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10
    },
    headerTitleText: {

    }
})