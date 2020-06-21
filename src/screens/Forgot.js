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
                try {
                    this.props.navigation.navigate('VerifyCode', data);
                }
                catch (error) {
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
            <>
                {
                    this.state.isLoading &&
                    <Loader />
                }
                <Container>
                    <Grid>
                        <Row size={2}>
                            <View style={styles.header}>
                                <Text style={styles.headerText}>Forgot Password</Text>
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
                                <Button block style={styles.loginButton} onPress={this.handleForgot}>
                                    <Text>Send Email</Text>
                                </Button>
                                <Button block style={styles.cancelButton} onPress={() => this.props.navigation.navigate('Login')}>
                                    <Text style={{ color: 'black' }}>CANCEL</Text>
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
        backgroundColor: colors.LIGHT_SILVER,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        fontSize: 42,
        fontFamily: 'kalam-bold',
        color: colors.SILVER,
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
        borderColor: colors.SILVER
    },
    link: {
        textDecorationColor: 'black',
        textDecorationLine: 'underline'
    }
})
export default Forgot;