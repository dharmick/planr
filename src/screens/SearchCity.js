import React, { Component } from 'react'
import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native'
import { Item, Header, Input, Text, Icon } from 'native-base'
import { colors } from '../config/colors';

export default class SearchCity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            cities: [
                {
                    name: 'Mumbai',
                    id: '1'
                },
                {
                    name: 'Bangalore',
                    id: '2'
                },
                {
                    name: 'Hyderabad',
                    id: '3'
                }
            ],
            filteredCities: []
        }
    }

    onCitySelect = (city) => {
        this.props.navigation.navigate('City', { id: city.id })
    }

    handleSearchTextChange = (text) => {
        this.setState({
            searchText: text
        }, () => {
            if (text === "") {
                this.setState({ filteredCities: [] })
            } else {
                var patt = new RegExp(text.toLowerCase());
                filteredCities = this.state.cities.filter(city => patt.test(city.name.toLowerCase()));
                this.setState({ filteredCities })
            }
        })
    }

    render() {
        return (
            <>
                <Header searchBar rounded>
                    <Item>
                        <Icon name='ios-arrow-back' onPress={() => this.props.navigation.goBack()} />
                        <Input
                            autoFocus
                            placeholder="Search, Explore, Wander"
                            onChangeText={this.handleSearchTextChange}
                            value={this.state.searchText}
                        />
                    </Item>
                </Header>

                <FlatList
                    keyExtractor={item => item.id}
                    data={this.state.filteredCities}
                    renderItem={({ item, index, separators }) => (
                        <TouchableOpacity onPress={() => this.onCitySelect(item)}>
                            <View style={{ paddingVertical: 20, paddingHorizontal: 10 }}>
                                <Text>{item.name}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    ListEmptyComponent={() => (
                        <View style={{ paddingVertical: 100, alignItems: 'center' }}>
                            {
                                this.state.searchText ?
                                    <>
                                        <Text style={{ fontSize: 20, color: colors.SILVER }}>OOPS!</Text>
                                        <Text style={{ fontSize: 16, color: colors.SILVER }}>Nothing found.</Text>
                                    </>
                                    :
                                    <>
                                        <Text style={{ fontSize: 20, color: colors.SILVER }}>Try Mumbai :)</Text>
                                        <Text style={{ fontSize: 16, color: colors.SILVER }}>You won't regret. Promise.</Text>
                                    </>
                            }
                        </View>
                    )}
                />

            </>
        )
    }
}

const styles = StyleSheet.create({})
