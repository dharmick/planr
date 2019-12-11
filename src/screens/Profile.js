import React, { Component } from 'react';
import { StyleSheet, View, AsyncStorage } from 'react-native';
import { Container, Content, ListItem, Left, Text, Button, Icon, Body, Right, Separator } from 'native-base';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount() { }
    render() {
        return (
            <Container>
                <Content>

                    <ListItem icon>
                        <Left>
                            <Button style={{ backgroundColor: "#FF9501" }}>
                                <Icon name="history" type="FontAwesome5" />
                            </Button>
                        </Left>
                        <Body>
                            <Text>History</Text>
                        </Body>
                        <Right>
                            <Text>ON</Text>
                        </Right>
                    </ListItem>
                    <ListItem icon>
                        <Left>
                            <Button style={{ backgroundColor: "#db2c8c" }}>
                                <Icon name="heart" type="FontAwesome5" />
                            </Button>
                        </Left>
                        <Body>
                            <Text>Wishlist</Text>
                        </Body>
                    </ListItem>
                    <ListItem icon>
                        <Left>
                            <Button style={{ backgroundColor: "#45d991" }}>
                                <Icon name="hands-helping" type="FontAwesome5" />
                            </Button>
                        </Left>
                        <Body>
                            <Text>Contact Support</Text>
                        </Body>
                    </ListItem>

                    <Separator>
                        <Text></Text>
                    </Separator>
                    <ListItem icon
                        onPress={() => {
                            AsyncStorage.removeItem('userToken')
                                .then(() => {
                                    this.props.navigation.navigate('Auth')
                                })
                        }}>
                        <Left>
                            <Button style={{ backgroundColor: "#d9454f" }}>
                                <Icon active name="md-log-out" />
                            </Button>
                        </Left>
                        <Body>
                            <Text>Logout</Text>
                        </Body>
                    </ListItem>
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({

})
export default Profile;