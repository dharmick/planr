import React from 'react';
import { Ionicons } from '@expo/vector-icons'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { colors } from './src/config/colors'
import Login from './src/screens/Login';
import Signup from './src/screens/Signup';
import Home from './src/screens/Home';

// const AppNavigator = createStackNavigator({
//     Login: Login,
//     Signup: Signup,
//     Home: Home,
// }, {
//     initialRouteName: 'Login',
//     headerMode: "none"
// });

const HomeStack = createStackNavigator({
    Home: { screen: Home },

}, {
    defaultNavigationOptions: {
        // headerStyle: {
        //     backgroundColor: colors.,
        // },
        // headerTitleStyle: {
        //     color: '#fff'
        // }
    },
});

const UserStack = createStackNavigator({
    Signup: { screen: Signup },
    Login: { screen: Login },
});


export default createAppContainer(createBottomTabNavigator(
    {
        Home: { screen: HomeStack },
        User: { screen: UserStack },
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

                // You can return any component that you like here! We usually use an
                // icon component from react-native-vector-icons
                return <Ionicons name={iconName} size={25} color={tintColor} />;
            },
        }),
        tabBarOptions: {
            activeTintColor: colors.PRIMARY,
            inactiveTintColor: 'gray',
        },
    }
));

// export default createAppContainer(AppNavigator);