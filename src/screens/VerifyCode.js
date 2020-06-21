import React, { Component } from 'react';
import { StyleSheet, View, Alert, AsyncStorage, StatusBar } from 'react-native';
import { Button, Text, Grid, Row, Container, Content, Header, Item, Label, Input } from 'native-base';
import { colors } from '../config/colors';
import { axiosPost } from '../../axios'
import Loader from '../components/Loader';

class VerifyCode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: this.props.navigation.getParam('email'),
            otp: '',
            isLoading: false
        }
    }
    componentDidMount() {
    }

    handleVerifyCode = () => {
        const { email, otp } = this.state;
        if (!otp) {
            Alert.alert("OOPS!!", "All fields are mandatory");
            return;
        }

        this.setState({ isLoading: true })
        const data = {
            email: email,
            otp: otp
        }

        axiosPost('/verify-otp', data, false)
            .then(res => {
                alert(res.data.message)
                if (res.data.message == "OTP is Incorrect. Enter Again!") {
                    try {
                        this.props.navigation.navigate('VerifyCode');
                    }
                    catch (error) {
                        alert("Something went wrong. " + error)
                    }
                }
                else {
                    try {
                        this.props.navigation.navigate('ResetPassword',{email: email});
                    }
                    catch (error) {
                        alert("Something went wrong. " + error)
                    }
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
                                        placeholder='Enter 6-Digit Code'
                                        style={styles.inputText}
                                        value={this.state.code}
                                        keyboardType="numeric"
                                        placeholderTextColor={colors.SILVER}
                                        onChangeText={(text) => this.inputChangeHandler(text, 'otp')} />
                                </Item>
                                <Button block style={styles.loginButton} onPress={this.handleVerifyCode}>
                                    <Text style={{ fontFamily: 'opensans-bold' }}>Verify Code</Text>
                                </Button>
                                <Text style={styles.link} onPress={() => this.props.navigation.navigate('Login')}>
                                    Go to Login Page
                                </Text>
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
    input: {
        marginVertical: 10,
        borderColor: colors.SILVER
    },
    inputText: {
        color: colors.GREY,
        fontSize: 17,
        fontFamily: 'opensans'
    },
    link: {
        textDecorationColor: 'black',
        textDecorationLine: 'underline',
        fontFamily: 'opensans'
    }
})
export default VerifyCode;