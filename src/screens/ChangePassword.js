import React, { Component } from 'react';
import { StyleSheet, View, Alert, AsyncStorage, StatusBar } from 'react-native';
import { Button, Text, Grid, Row, Container, Content, Header, Item, Label, Input } from 'native-base';
import { colors } from '../config/colors';
import { axiosPost } from '../../axios'
import Loader from '../components/Loader';

class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            newpassword: '',
            confirmpassword: '',
            isLoading: false
        }
    }
    componentDidMount() {
    }

    handleChangePassword = () => {
        const { password, newpassword, confirmpassword } = this.state;
        if (!password || !newpassword || !confirmpassword ) {
            Alert.alert("OOPS!!", "All fields are mandatory");
            return;
        }

        this.setState({isLoading: true})
        const data = {
            password: password,
            newpassword: newpassword,
            confirmpassword: confirmpassword
        }

        axiosPost('/change-password', data, true)
            .then(res => {
                alert(res.data.message)
                if (res.data.message == "Passwords did not match. Enter again!" || res.data.message == "Please enter correct password!") {
                    try {
                        this.props.navigation.navigate('ChangePassword');
                    }
                    catch (error) {
                        alert("Something went wrong. " + error)
                    }
                }
                else {
                    try {
                        this.props.navigation.navigate('Profile');
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
                                <Text style={styles.headerText}>Change Password</Text>
                            </View>
                        </Row>
                        <Row size={8} style={{ backgroundColor: colors.LIGHT_SILVER }}>
                            <View style={styles.login_wrapper}>
                                <Item regular style={styles.input}>
                                    <Input
                                        placeholder='Old Password'
                                        style={styles.inputText}
                                        value={this.state.password}
                                        secureTextEntry={true}
                                        placeholderTextColor={colors.SILVER}
                                        onChangeText={(text) => this.inputChangeHandler(text, 'password')} />
                                </Item>
                                <Item regular style={styles.input}>
                                    <Input
                                        placeholder='New Password'
                                        style={styles.inputText}
                                        value={this.state.newpassword}
                                        secureTextEntry={true}
                                        placeholderTextColor={colors.SILVER}
                                        onChangeText={(text) => this.inputChangeHandler(text, 'newpassword')} />
                                </Item>
                                <Item regular style={styles.input}>
                                    <Input
                                        placeholder='Confirm New Password'
                                        style={styles.inputText}
                                        value={this.state.confirmpassword}
                                        secureTextEntry={true}
                                        placeholderTextColor={colors.SILVER}
                                        onChangeText={(text) => this.inputChangeHandler(text, 'confirmpassword')} />
                                </Item>
                                <Button block style={styles.loginButton} onPress={this.handleChangePassword}>
                                    <Text style={{ fontFamily: 'opensans-bold' }}>Change Password</Text>
                                </Button>
                                <Button block style={styles.cancelButton} onPress={() => this.props.navigation.navigate('Profile')}>
                                    <Text style={{ color: 'black', fontFamily: 'opensans-bold' }}>CANCEL</Text>
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
    inputText: {
        color: colors.GREY,
        fontSize: 17,
        fontFamily: 'opensans'
    },
})
export default ChangePassword;