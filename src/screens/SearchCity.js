import React, { Component } from 'react'
import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native'
import { Item, Header, Input, Text, Icon, Toast } from 'native-base'
import { colors } from '../config/colors';
import { axiosGet } from '../../axios';
import Loader from '../components/Loader';
import RippleIcon from '../components/RippleIcon';


export default class SearchCity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            cities: [],
            filteredCities: [],
            isLoadingCities: true,
        }
    }

    componentDidMount() {
        axiosGet('/getAllCitiesPois')
            .then(res => {
                this.setState({
                    cities: res.data.data,
                    isLoadingCities: false
                })
            })
            .catch(err => {

            })
    }

    onCitySelect = (city) => {
        this.props.navigation.navigate('City', { id: city.id })
    }

    onPoISelect = (place) => {
        this.props.navigation.navigate('Place', { id: place.id, cityId: place.city_id})
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

            this.state.isLoadingCities ?
                <Loader />
                :
                <>
                    <Header searchBar rounded>
                        <Item>
                            <RippleIcon iconName="ios-arrow-back" onPress={() => this.props.navigation.goBack()} />
                            <Input
                                autoFocus
                                style={{ fontFamily: 'opensans-bold' }}
                                placeholder="Search, Explore, Wander"
                                onChangeText={this.handleSearchTextChange}
                                value={this.state.searchText}
                            />
                        </Item>
                    </Header>
                    <FlatList
                        keyExtractor={item => item.id.toString()}
                        data={this.state.filteredCities}
                        renderItem={({ item, index, separators }) => (

                            <TouchableOpacity onPress={item.isCity ? () => this.onCitySelect(item) : () => this.onPoISelect(item) }>
                                <View style={{ paddingVertical: 20, paddingHorizontal: 10 }}>
                                    <Text style={{ fontFamily: 'opensans' }}>{item.name}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                        ListEmptyComponent={() => (
                            <View style={{ paddingVertical: 100, alignItems: 'center' }}>
                                {
                                    this.state.searchText ?
                                        <>
                                            <Text style={{ fontSize: 20, color: colors.SILVER, fontFamily: 'opensans' }}>OOPS!</Text>
                                            <Text style={{ fontSize: 16, color: colors.SILVER, fontFamily: 'opensans' }}>Nothing found.</Text>
                                        </>
                                        :
                                        <>
                                            <Text style={{ fontSize: 20, color: colors.SILVER, fontFamily: 'opensans' }}>Try Mumbai :)</Text>
                                            <Text style={{ fontSize: 16, color: colors.SILVER, fontFamily: 'opensans' }}>You won't regret. Promise.</Text>
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
