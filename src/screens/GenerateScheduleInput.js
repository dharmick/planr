import React, { Component } from 'react'
import DatePicker from 'react-native-datepicker'
import { Text, Item, Input, View, Header, Left, Icon, Body, Title, Button } from 'native-base'
import { colors } from '../config/colors';
import { StyleSheet } from 'react-native'
import RippleIcon from '../components/RippleIcon';



export default class GenerateScheduleInput extends Component {
    constructor(props) {
        super(props)
        this.state = {
            destination: "",
            from: "",
            to: ""
        }
    }

    destinationChangeHandler = (text) => {
        this.setState({ destination: text })
    }

    render() {
        return (
            <>

                <Header>
                    <Left>
                        <RippleIcon iconName="ios-arrow-back" onPress={() => this.props.navigation.goBack()} />
                    </Left>
                    <Body>
                        <Title>Generate Schedule</Title>
                    </Body>
                </Header>

                <View style={styles.inputWrapper}>
                    <Text style={styles.label}>Destination</Text>
                    <Item regular>
                        <Input
                            placeholder='Try Mumbai'
                            value={this.state.destination}
                            placeholderTextColor={colors.SILVER}
                            style={{ textAlign: 'center', fontSize: 22, fontWeight: 'bold', color: '#777', height: 60, borderWidth: 2, borderColor: colors.SILVER }}
                            onChangeText={(text) => this.destinationChangeHandler(text)} />
                    </Item>
                </View>

                <View style={styles.inputWrapper}>
                    <Text style={styles.label}>From</Text>
                    <DatePicker
                        style={styles.dateTime}
                        date={this.state.from}
                        mode="datetime"
                        showIcon={false}
                        placeholder="Select date &amp; time"
                        format="DD-MM-YYYY HH:mm"
                        is24Hour={false}
                        customStyles={{
                            dateInput: styles.dateTimeInput,
                            dateText: styles.dateTimeText,
                            placeholderText: styles.dateTimePlaceholder
                        }}
                        onDateChange={(date) => { this.setState({ from: date }) }}
                    />
                </View>

                <View style={styles.inputWrapper}>
                    <Text style={styles.label}>To</Text>
                    <DatePicker
                        style={styles.dateTime}
                        date={this.state.to}
                        mode="datetime"
                        showIcon={false}
                        placeholder="Select date &amp; time"
                        format="DD-MM-YYYY HH:mm"
                        is24Hour={false}
                        customStyles={{
                            dateInput: styles.dateTimeInput,
                            dateText: styles.dateTimeText,
                            placeholderText: styles.dateTimePlaceholder
                        }}
                        onDateChange={(date) => { this.setState({ to: date }) }}
                    />
                </View>

                <View style={styles.inputWrapper}>
                    <Button block style={{ marginVertical: 20, height: 60 }} onPress={this.handleLogin}>
                        <Text style={{ fontSize: 18 }}>PLAN MY TRIP</Text>
                    </Button>
                </View>
            </>
        )
    }
}

const styles = StyleSheet.create({
    inputWrapper: {
        width: '90%',
        alignSelf: 'center',
        marginTop: 20
    },
    label: {
        fontSize: 18,
        color: '#777'
    },
    dateTime: {
        width: '100%',
        marginVertical: 12,
    },
    dateTimeInput: {
        height: 60,
        borderWidth: 3,
        borderColor: colors.SILVER
    },
    dateTimeText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#777',
    },
    dateTimePlaceholder: {
        fontSize: 22,
        fontWeight: 'bold',
        color: colors.SILVER,
    }
})