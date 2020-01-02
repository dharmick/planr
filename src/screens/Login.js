import React, { Component } from 'react';
import { StyleSheet, View, Alert, AsyncStorage, StatusBar } from 'react-native';
import { Button, Text, Grid, Row, Container, Content, Header, Item, Label, Input } from 'native-base';
import { colors } from '../config/colors';
import { axiosPost } from '../../axios'


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }
    componentDidMount() {
    }

    handleLogin = () => {
        const { email, password } = this.state;
        if (!email || !password) {
            Alert.alert("OOPS!!", "All fields are mandatory");
            return;
        }
        const data = {
            email: email,
            password: password
        }

        axiosPost('/login', data, false)
            .then(res => {
                alert(res.data.message)
                try {
                    AsyncStorage.setItem('userToken', res.data.token)
                        .then(() => {
                            this.props.navigation.navigate('Home');
                        })
                } catch (error) {
                    alert("Something went wrong. " + error)
                }
            }, err => {
                alert(err)
            })
    }

    inputChangeHandler = (text, name) => {
        this.setState({
            [name]: text
        })
    }

    render() {
        return (
            <Container>
                <Grid>
                    <Row size={2}>
                        <View style={styles.header}>
                            <Text style={styles.headerText}>Login</Text>
                        </View>
                    </Row>
                    <Row size={8} style={{ backgroundColor: colors.LIGHT_SILVER }}>
                        <View style={styles.login_wrapper}>
                            <Item regular style={styles.input}>
                                <Input
                                    placeholder='Email'
                                    value={this.state.email}
                                    keyboardType="email-address"
                                    autoCorrect={false}
                                    autoCapitalize="none"
                                    placeholderTextColor={colors.SILVER}
                                    onChangeText={(text) => this.inputChangeHandler(text, 'email')} />
                            </Item>
                            <Item regular style={styles.input}>
                                <Input
                                    placeholder='Password'
                                    value={this.state.password}
                                    secureTextEntry={true}
                                    placeholderTextColor={colors.SILVER}
                                    onChangeText={(text) => this.inputChangeHandler(text, 'password')} />
                            </Item>
                            <Button block style={styles.loginButton} onPress={this.handleLogin}>
                                <Text>TAKE ME IN</Text>
                            </Button>
                            <Text style={styles.link} onPress={() => this.props.navigation.navigate('Signup')}>
                                Create an Account now
                            </Text>
                        </View>
                    </Row>
                </Grid>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red'
    },
    login_wrapper: {
        backgroundColor: colors.WHITE,
        borderTopRightRadius: 80,
        borderTopLeftRadius: 80,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,

    },
    header: {
        backgroundColor: colors.LIGHT_SILVER,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        fontSize: 50,
        fontFamily: 'kalam-bold',
        color: colors.SILVER,
        marginTop: 20,
        // opacity: 0.3
    },
    loginButton: {
        width: '100%',
        marginVertical: 30,
    },
    input: {
        marginVertical: 10,
        borderColor: colors.SILVER
    },
    link: {
        textDecorationColor: 'black',
        textDecorationLine: 'underline'
    }
})
export default Login;