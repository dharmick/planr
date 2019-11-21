import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, Grid, Row, Container, Content, Header, Form, Item, Label, Input } from 'native-base';
import { colors } from '../config/colors';
class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount() { }
    render() {
        return (
            <Container>
                <Grid>
                    <Row size={2}>
                        <View style={styles.header}>
                            <Text style={{ fontSize: 40 }}>Signup</Text>
                        </View>
                    </Row>
                    <Row size={8} style={{ backgroundColor: colors.LIGHT_SILVER }}>
                        <View style={styles.login_wrapper}>
                            <Item floatingLabel>
                                <Label>Name</Label>
                                <Input />
                            </Item>
                            <Item floatingLabel>
                                <Label>Username</Label>
                                <Input />
                            </Item>
                            <Item floatingLabel>
                                <Label>Password</Label>
                                <Input />
                            </Item>
                            <Button block style={styles.loginButton}>
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
    loginButton: {
        width: '100%',
        marginVertical: 30,
    },
    link: {
        textDecorationColor: 'black',
        textDecorationLine: 'underline'
    }
})
export default Signup;