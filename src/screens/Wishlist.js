import React, { Component, Fragment } from 'react'
import { StyleSheet, View, Image, ScrollView, TouchableOpacity } from 'react-native'
import { Header, Left, Body, Right, Title, Text, Grid, Icon, Row, Col, H1, Button, Toast } from 'native-base';
import { colors } from '../config/colors';
import Separator from '../components/Separator';
import { axiosGet, axiosPost } from '../../axios';
import Loader from '../components/Loader';

export default class Wishlist extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cities: [
                {
                  "description": "Bengaluru (also called Bangalore) is the capital of India's southern Karnataka state. The center of India's high-tech industry, the city is also known for its parks and nightlife. By Cubbon Park, Vidhana Soudha is a Neo-Dravidian legislative building. Former royal residences include 19th-century Bangalore Palace, modeled after Englandтs Windsor Castle, and Tipu Sultana's Summer Palace, an 18th-century teak structure.",
                  "id": 2,
                  "image": "https://res.cloudinary.com/planr/image/upload/v1578035392/cities/bangalore.png",
                  "name": "Bangalore"
                },
                {
                  "description": "Mumbai (formerly called Bombay) is a densely populated city on India's west coast. A financial center, it's India's largest city. On the Mumbai Harbour waterfront stands the iconic Gateway of India stone arch, built by the British Raj in 1924. Offshore, nearby Elephanta Island holds ancient cave temples dedicated to the Hindu god Shiva. The city's also famous as the heart of the Bollywood film industry.",
                  "id": 1,
                  "image": "https://res.cloudinary.com/planr/image/upload/v1578034935/cities/mumbai.jpg",
                  "name": "Mumbai"
                }
            ],
            pois: [
                {
                    "description": "Located in Prabhadevi, Siddhivinayak is a Lord Ganesha temple, one of the most significant and frequented temples in Mumbai. Visitors visit this temple in large numbers on daily basis. It was built by Laxman Vithu and Deubai Patil in 1801. It is one of the richest temples in Mumbai. The wooden doors to the sanctum are carved with images of the Lord. The inner roof which is plated with gold has the central sculpture of Ganesha.",
                    "id": 92,
                    "image": "https://res.cloudinary.com/planr/image/upload/v1578477188/Mumbai/siddhivinayak-temple_qlvjxy.jpg",
                    "name": "Siddhivinayak Temple",
                    "rating": 4.8
                },
                {
                    "description": "Marine Drive is the most easily identifiable landmark associated with Mumbai and is indicative of the glamour and glitter of the city. It is essentially 3.6 km long, arc-shaped boulevard along the South Mumbai coast that starts at the southern end of Nariman Point and ends at Girgaum Chowpatty, popularly known as Chowpatty Beach. The coast wraps the Arabian sea and is the best place in Mumbai to watch the sunset or even to just take a leisurely stroll by the sea any time of the day or night. ",
                    "id": 90,
                    "image": "https://res.cloudinary.com/planr/image/upload/v1578477182/Mumbai/marine-drive_at298n.jpg",
                    "name": "Marine drive",
                    "rating": 4.5
                }
            ]
        }
    }
}