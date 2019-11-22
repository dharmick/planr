import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, Grid, Row, Container, Content, Header, Left, Right, Body, Title, Form, Item, Label, Input } from 'native-base';
import { colors } from '../config/colors';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount() { }

    handleLogin = () => {
        this.props.navigation.navigate('Home');
    }

    render() {
        return (
            <Container>
                <Header>
                    <Body>
                        <Title>PLANR</Title>
                    </Body>
                </Header>
                <Grid>
                    <Row size={2}>
                        <View style={styles.header}>
                            <Text style={styles.headerText}>Login</Text>
                        </View>
                    </Row>
                    <Row size={8} style={{ backgroundColor: colors.LIGHT_SILVER }}>
                        <View style={styles.login_wrapper}>
                            <Item floatingLabel>
                                <Label>Username</Label>
                                <Input />
                            </Item>
                            <Item floatingLabel>
                                <Label>Password</Label>
                                <Input />
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
    link: {
        textDecorationColor: 'black',
        textDecorationLine: 'underline'
    }
})
export default Login;