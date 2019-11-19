import { Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

export const metrics = {
    DEVICE_HEIGHT: height,
    DEVICE_WIDTH: width
}