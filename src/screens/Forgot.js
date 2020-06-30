import React, { Component } from 'react';
import { StyleSheet, View, Alert, AsyncStorage, StatusBar } from 'react-native';
import { Button, Text, Grid, Row, Container, Content, Header, Item, Label, Input } from 'native-base';
import { colors } from '../config/colors';
import { axiosPost } from '../../axios';
import Loader from '../components/Loader';


class Forgot extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            isLoading: false
        }
    }
    componentDidMount() {
    }

    handleForgot = () => {
        const { email } = this.state;
        if (!email) {
            Alert.alert("OOPS!!", "All fields are mandatory");
            return;
        }

        this.setState({ isLoading: true })
        const data = {
            email: email
        }

        axiosPost('/forgot-password', data, false)
            .then(res => {
                alert(res.data.message)
                this.setState({ isLoading: false })
                try {
                    this.props.navigation.navigate('VerifyCode', data);
                }
                catch (error) {
                    alert("Something went wrong. " + error)
                }
            }, err => {
                this.setState({ isLoading: false })
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
            <>
                {
                    this.state.isLoading &&
                    <Loader color="#FFFFFF" />
                }
                <Container>

                    <Header androidStatusBarColor={colors.PRIMARY} style={{ display: 'none' }} />

                    <Grid>
                        <Row size={2}>
                            <View style={styles.header}>
                                <Text style={styles.headerText}>Forgot Password</Text>
                            </View>
                        </Row>
                        <Row size={8} style={{ backgroundColor: colors.PRIMARY }}>
                            <View style={styles.login_wrapper}>
                                <Item regular style={styles.input}>
                                    <Input
                                        placeholder='Email'
                                        style={styles.inputText}
                                        value={this.state.email}
                                        keyboardType="email-address"
                                        autoCorrect={false}
                                        autoCapitalize="none"
                                        placeholderTextColor={colors.SILVER}
                                        onChangeText={(text) => this.inputChangeHandler(text, 'email')} />
                                </Item>
                                <Button block style={styles.loginButton} onPress={this.handleForgot}>
                                    <Text style={{ fontFamily: 'opensans-bold', fontSize: 15 }}>Send Email</Text>
                                </Button>
                                <Button block style={styles.cancelButton} onPress={() => this.props.navigation.navigate('Login')}>
                                    <Text style={{ color: 'black', fontFamily: 'opensans-bold', fontSize: 15 }}>CANCEL</Text>
                                </Button>
                                
                            </View>
                        </Row>
                    </Grid>
                </Container>
            </>
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
        backgroundColor: colors.PRIMARY,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        fontSize: 42,
        fontFamily: 'kalam-bold',
        color: colors.LIGHT_SILVER,
        marginTop: 20,
        // opacity: 0.3
    },
    loginButton: {
        width: '100%',
        marginVertical: 30,
        backgroundColor: colors.PRIMARY
    },
    cancelButton: {
        width: '100%',
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
        textDecorationLine: 'underline'
    }
})
export default Forgot;