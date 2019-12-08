import React from 'react';
import { Ionicons } from '@expo/vector-icons'
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { colors } from './src/config/colors'
import Login from './src/screens/Login';
import Signup from './src/screens/Signup';
import Home from './src/screens/Home';
import Profile from './src/screens/Profile';
import AuthLoadingScreen from './AuthLoadingScreen';


const HomeStack = createStackNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            title: "Home"
        }
    },
});

const UserStack = createStackNavigator({
    Profile: {
        screen: Profile,
        navigationOptions: {
            title: "Profile"
        }
    }
});




const LoggedInStack = createBottomTabNavigator(
    {
        Home: {
            screen: HomeStack,
            navigationOptions: {
                title: "Home"
            }
        },
        User: {
            screen: UserStack,
            navigationOptions: {
                title: "Profile"
            }
        },
    },
    {
        initialRouteName: 'Home',
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                if (routeName === 'Home') {
                    iconName = `ios-home`;
                } else if (routeName === 'User') {
                    iconName = `ios-contact`
                }

                return <Ionicons name={iconName} size={25} color={tintColor} />;
            },
        }),
        tabBarOptions: {
            activeTintColor: colors.PRIMARY,
            inactiveTintColor: 'gray',
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