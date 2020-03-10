import React, { Component } from 'react';
import { StyleSheet, View, Alert, AsyncStorage, StatusBar } from 'react-native';
import { Button, Text, Grid, Row, Container, Content, Header, Item, Label, Input } from 'native-base';
import { colors } from '../config/colors';
import { axiosPost } from '../../axios'


class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: this.props.navigation.getParam('email'),
            newpassword: '',
            confirmpassword: ''
        }
    }
    
    componentDidMount() {
    }

    handleResetPassword = () => {
        const { email, newpassword, confirmpassword } = this.state;
        if (!newpassword || !confirmpassword ) {
            Alert.alert("OOPS!!", "All fields are mandatory");
            return;
        }
        const data = {
            email: email,
            newpassword: newpassword,
            confirmpassword: confirmpassword
        }

        axiosPost('/reset-password', data, false)
            .then(res => {
                alert(res.data.message)
                if (res.data.message == 'Password did not match. Enter again!') {
                    try {
                        this.props.navigation.navigate('ResetPassword');
                    }
                    catch (error) {
                        alert("Something went wrong. " + error)
                    }
                }
                else {
                    try {
                        this.props.navigation.navigate('Login');
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
            <Container>
                <Grid>
                    <Row size={2}>
                        <View style={styles.header}>
                            <Text style={styles.headerText}>Reset Password</Text>
                        </View>
                    </Row>
                    <Row size={8} style={{ backgroundColor: colors.LIGHT_SILVER }}>
                        <View style={styles.login_wrapper}>
                            <Item regular style={styles.input}>
                                <Input
                                    placeholder='New Password'
                                    value={this.state.newpassword}
                                    secureTextEntry={true}
                                    placeholderTextColor={colors.SILVER}
                                    onChangeText={(text) => this.inputChangeHandler(text, 'newpassword')} />
                            </Item>
                            <Item regular style={styles.input}>
                                <Input
                                    placeholder='Confirm Password'
                                    value={this.state.confirmpassword}
                                    secureTextEntry={true}
                                    placeholderTextColor={colors.SILVER}
                                    onChangeText={(text) => this.inputChangeHandler(text, 'confirmpassword')} />
                            </Item>
                            <Button block style={styles.loginButton} onPress={this.handleResetPassword}>
                                <Text>Reset Password</Text>
                            </Button>
                            <Text style={styles.link} onPress={() => this.props.navigation.navigate('Login')}>
                                Go to Login Page
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
        fontSize: 42,
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
export default ResetPassword;