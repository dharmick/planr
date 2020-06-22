import React, { Component } from 'react';
import { StyleSheet, View, Alert, AsyncStorage, StatusBar } from 'react-native';
import { Button, Text, Grid, Row, Container, Content, Header, Item, Label, Input, Toast } from 'native-base';
import { colors } from '../config/colors';
import { axiosPost } from '../../axios'
import Loader from '../components/Loader';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isLoading: false,
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

        this.setState({ isLoading: true })
        const data = {
            email: email,
            password: password
        }

        axiosPost('/login', data, false)
            .then(res => {
                Toast.show({
                    text: "Signed in as " + res.data.email,
                    duration: 5000,
                    type: 'success',
                })
                try {
                    AsyncStorage.multiSet([['userToken', res.data.token], ['name', res.data.name], ['email', res.data.email]])
                        .then(() => {
                            this.props.navigation.navigate('Home');
                        })
                } catch (error) {
                    this.setState({ isLoading: false })
                    alert("Something went wrong. " + error)
                }
            }, err => {
                this.setState({ isLoading: false })
            })
    }

    inputChangeHandler = (text, name) => {
        this.setState({
            [name]: text
        })
    }

    render() {
        return (
            <>
                {
                    this.state.isLoading &&
                    <Loader color="#FFFFFF" />
                }
                <Container>

                    <Header androidStatusBarColor={colors.PRIMARY} style={{ display: 'none' }} />



                    <View style={styles.header}>
                        <Text style={styles.headerText}>Login</Text>
                    </View>


                    <View style={{ backgroundColor: colors.PRIMARY, flex: 1 }}>
                        <View style={styles.login_wrapper}>


                            <Item regular style={styles.input}>
                                <Input
                                    placeholder='Email'
                                    value={this.state.email}
                                    keyboardType="email-address"
                                    autoCorrect={false}
                                    autoCapitalize="none"
                                    style={styles.inputText}
                                    placeholderTextColor={colors.SILVER}
                                    onChangeText={(text) => this.inputChangeHandler(text, 'email')} />
                            </Item>


                            <Item regular style={styles.input}>
                                <Input
                                    placeholder='Password'
                                    value={this.state.password}
                                    secureTextEntry={true}
                                    placeholderTextColor={colors.SILVER}
                                    style={styles.inputText}
                                    onChangeText={(text) => this.inputChangeHandler(text, 'password')} />
                            </Item>


                            <Text style={styles.link} onPress={() => this.props.navigation.navigate('Forgot')}>
                                Forgot Password?
                            </Text>


                            <Button block style={styles.loginButton} onPress={this.handleLogin}>
                                <Text style={{ fontFamily: 'opensans-bold', fontSize: 15 }}>LOGIN</Text>
                            </Button>


                            <View style={styles.horizontalLineWrapper}>
                                <View style={styles.horizontalLine} />
                                <Text style={{ textAlign: 'center', color: colors.SILVER, fontSize: 20, fontFamily: 'opensans' }}>or</Text>
                                <View style={styles.horizontalLine} />
                            </View>


                            <Button block style={styles.signupButton} onPress={() => this.props.navigation.navigate('Signup')}>
                                <Text style={{ color: 'black', fontFamily: 'opensans-bold', fontSize: 15 }}>SIGN UP</Text>
                            </Button>


                        </View>
                    </View>

                    {/* </Row> */}
                    {/* </Grid> */}
                </Container>
            </>
        )
    }
}

const styles = StyleSheet.create({
    login_wrapper: {
        backgroundColor: colors.WHITE,
        borderTopRightRadius: 60,
        borderTopLeftRadius: 60,
        flex: 1,
        // elevation: 20,
        alignItems: 'center',
        // justifyContent: 'center',
        paddingHorizontal: 20,
        paddingTop: 40

    },
    header: {
        backgroundColor: colors.PRIMARY,
        // flex: 1,
        height: 130,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        fontSize: 50,
        fontFamily: 'kalam-bold',
        color: colors.LIGHT_SILVER,
        marginTop: 30,
        // opacity: 0.3
    },
    loginButton: {
        width: '100%',
        marginVertical: 30,
        backgroundColor: colors.PRIMARY
    },
    signupButton: {
        width: '100%',
        marginVertical: 30,
        backgroundColor: colors.WHITE,
    },
    input: {
        marginVertical: 10,
        borderColor: '#f1f1f1',
        backgroundColor: '#f8f8f8',
    },
    inputText: {
        color: colors.GREY,
        fontSize: 17,
        fontFamily: 'opensans'
    },
    link: {
        textDecorationColor: 'black',
        textDecorationLine: 'underline',
        width: '100%',
        textAlign: 'right',
        fontFamily: 'opensans'
    },
    horizontalLineWrapper: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    horizontalLine: {
        borderBottomWidth: 1,
        borderBottomColor: colors.SILVER,
        width: '40%'
    }
})
export default Login;