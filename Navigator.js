import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Login from './src/screens/Login';
import Signup from './src/screens/Signup';

const AppNavigator = createStackNavigator({
    Login: Login,
    Signup: Signup
}, {
    initialRouteName: 'Login',
    headerMode: "none"

});

export default createAppContainer(AppNavigator);