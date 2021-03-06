import React from 'react';
import { Image, View, StyleSheet, StatusBar } from 'react-native'
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { colors } from './src/config/colors'

import Login from './src/screens/Login';
import Signup from './src/screens/Signup';
import Forgot from './src/screens/Forgot';
import ChangePassword from './src/screens/ChangePassword';
import ResetPassword from './src/screens/ResetPassword';
import VerifyCode from './src/screens/VerifyCode';

import Home from './src/screens/Home';
import SearchCity from './src/screens/SearchCity';
import City from './src/screens/City';
import Place from './src/screens/Place';
import Wishlist from './src/screens/Wishlist';
import BrowsePlaces from './src/screens/BrowsePlaces';
import BrowseCities from './src/screens/BrowseCities';

import Profile from './src/screens/Profile';
import AuthLoadingScreen from './AuthLoadingScreen';
import CurrentTrip from './src/screens/CurrentTrip';
import { Header, Title, Button, Icon, Left, Right, Body, Text, Item, Input } from "native-base";
import GenerateScheduleInput from './src/screens/GenerateScheduleInput';

import Loader from './src/components/Loader';
import ViewSchedule from './src/screens/ViewSchedule';
import Initial from './src/screens/Initial';
import Nearby from './src/screens/Nearby';


// =============
// HOME STACK
// =============

const HomeStack = createStackNavigator({
    HomePage: {
        screen: Home,
    },
    City: {
        screen: City,
    },
    SearchCity: {
        screen: SearchCity,
    },
    Place: {
        screen: Place,
    },
    GenerateScheduleInput: {
        screen: GenerateScheduleInput
    },
    ViewSchedule: {
        screen: ViewSchedule
    },
    Nearby: {
        screen: Nearby
    }, 
    BrowsePlaces: {
        screen: BrowsePlaces
    },
    BrowseCities: {
        screen: BrowseCities
    },
}, {
    headerMode: 'none',
    initialRouteName: 'HomePage'
});

HomeStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    for (let i = 0; i < navigation.state.routes.length; i++) {
        if (navigation.state.routes[i].routeName == "SearchCity") {
            tabBarVisible = false;
        } else if (navigation.state.routes[i].routeName == "Nearby") {
            tabBarVisible = false;
        }
    }
    return {
        tabBarVisible
    };
};



// =============
// USER STACK
// =============

const UserStack = createStackNavigator({
    Profile: {
        screen: Profile,
        navigationOptions: {
            title: "Profile"
        }
    },
    ChangePassword: {
        screen: ChangePassword
    },
    Wishlist: {
        screen: Wishlist
    },
}, {
    headerMode: 'none'
});


// =============
// TRIP STACK
// =============
const TripStack = createStackNavigator({
    CurrentTrip: {
        screen: CurrentTrip,
    }
}, {
    headerMode: 'none',
})

TripStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    for (let i = 0; i < navigation.state.routes.length; i++) {
        if (navigation.state.routes[i].routeName == "CurrentTrip") {
            tabBarVisible = false;
        }
    }
    return {
        tabBarVisible
    };
};



// =====================
// LOGGED IN BOTTOM NAV
// =====================

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
                }
                // } else if (routeName === 'Trip') {
                //     iconName = focused ? 'map-marker' : 'map-marker-outline'
                //     iconType = 'MaterialCommunityIcons'
                // }

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



// =============
// NOT LOGGED IN STACK
// =============
const NotLoggedInStack = createStackNavigator({
    Initial: {
        screen: Initial
    },
    Login: {
        screen: Login,
    },
    Signup: {
        screen: Signup,
    },
    Forgot: {
        screen: Forgot,
    },
    VerifyCode: {
        screen: VerifyCode,
    },
    ResetPassword: {
        screen: ResetPassword,
    },
}, {
    headerMode: 'none'
});




// =============
// ROOT SWITCH
// =============
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