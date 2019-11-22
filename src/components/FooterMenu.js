import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Text, Footer, FooterTab, Icon } from 'native-base';
class FooterMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount() { }
    render() {
        return (
            <Footer>
                <FooterTab>
                    <Button vertical active={this.props.activeName === "home"} >
                        <Icon name="home" />
                        <Text>Home</Text>
                    </Button>
                    <Button vertical active={this.props.activeName === "plan"} >
                        <Icon name="navigate" />
                        <Text>Plan</Text>
                    </Button>
                    <Button vertical active={this.props.activeName === "user"} >
                        <Icon name="contact" />
                        <Text>User</Text>
                    </Button>
                </FooterTab>
            </Footer>
        )
    }
}

const styles = StyleSheet.create({

})
export default FooterMenu;