import React from 'react';
import { Icon } from 'native-base'
import { Image, View, StyleSheet } from 'react-native'
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
            title: 'Home',
            // headerTitle: () => (
            //     <View style={styles.headerTitle}>
            //         <Image
            //             source={require('./assets/planr-logo.png')}
            //             style={{ width: 30, height: 30 }} />
            //         <Text>Home</Text>
            //     </View>
            // ),
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
                let iconType;
                if (routeName === 'Home') {
                    iconName = focused ? `home` : `home-outline`;
                    iconType = `MaterialCommunityIcons`;
                } else if (routeName === 'User') {
                    iconName = focused ? `account` : `account-outline`;
                    iconType = `MaterialCommunityIcons`;
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