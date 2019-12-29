import React, { Component } from 'react'
import { Text, StyleSheet, View, Platform } from 'react-native'
import MapView, { Marker } from 'react-native-maps';



export default class CurrentTrip extends Component {

    render() {
        return (
            <MapView
                initialRegion={{
                    latitude: 19.205693999999998,
                    longitude: 73.0935834,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                style={{ flex: 1 }}
                customMapStyle={
                    [
                        {
                            "featureType": "administrative.land_parcel",
                            "elementType": "labels",
                            "stylers": [
                                {
                                    "visibility": "off"
                                }
                            ]
                        },
                        {
                            "featureType": "poi",
                            "elementType": "labels.text",
                            "stylers": [
                                {
                                    "visibility": "off"
                                }
                            ]
                        },
                        {
                            "featureType": "poi.business",
                            "stylers": [
                                {
                                    "visibility": "off"
                                }
                            ]
                        },
                        {
                            "featureType": "road",
                            "elementType": "labels.icon",
                            "stylers": [
                                {
                                    "visibility": "off"
                                }
                            ]
                        },
                        {
                            "featureType": "transit",
                            "stylers": [
                                {
                                    "visibility": "off"
                                }
                            ]
                        }
                    ]
                }
            >
                <Marker
                    coordinate={{ latitude: 19.20569, longitude: 73.0935 }}
                    title="Source"
                    description="Begin here" />
            </MapView>
        )
    }
}

const styles = StyleSheet.create({})
