import React, { Component } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Alert, AsyncStorage } from 'react-native';
import { Button, Text, Grid, Row, Container, Content, Header, Form, Item, Label, Input, Toast } from 'native-base';
import { colors } from '../config/colors';
import { axiosPost } from '../../axios'


class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: ''
        }
    }
    componentDidMount() { }

    inputChangeHandler = (text, name) => {
        this.setState({
            [name]: text
        })
    }

    submitHandler = () => {
        const { name, email, password } = this.state;
        if (!name || !email || !password) {
            Alert.alert("OOPS!!", "All fields are mandatory");
            return;
        }
        const data = {
            name: name,
            email: email,
            password: password
        }

        axiosPost('/signup', data, false)
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
                    alert("Something went wrong. " + error)
                }
            }, err => {

            })
    }

    render() {
        return (
            <Container>
                <Grid>
                    <Row size={2}>
                        <View style={styles.header}>
                            <Text style={styles.headerText}>Signup</Text>
                        </View>
                    </Row>
                    <Row size={9} style={{ backgroundColor: colors.LIGHT_SILVER }}>
                        <View style={styles.login_wrapper}>
                            {/* <KeyboardAvoidingView style={{ width: '100%' }} behavior="padding" enabled keyboardVerticalOffset={300}> */}
                            <Item regular style={styles.input}>
                                <Input
                                    placeholder='Name'
                                    value={this.state.name}
                                    placeholderTextColor={colors.SILVER}
                                    onChangeText={(text) => this.inputChangeHandler(text, 'name')} />
                            </Item>
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
                            {/* </KeyboardAvoidingView> */}
                            <Button block style={styles.loginButton} onPress={this.submitHandler}>
                                <Text>Create Account</Text>
                            </Button>
                            <Text style={styles.link} onPress={() => this.props.navigation.navigate('Login')}>
                                Already have an account? Login here
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
export default Signup;