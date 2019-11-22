import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Login from './src/screens/Login';
import Signup from './src/screens/Signup';
import Home from './src/screens/Home';

const AppNavigator = createStackNavigator({
    Login: Login,
    Signup: Signup,
    Home: Home,
}, {
    initialRouteName: 'Login',
    headerMode: "none"

});

export default createAppContainer(AppNavigator);