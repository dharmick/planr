import { StyleSheet } from 'react-native'
import { colors } from '../config/colors'

export const commonStyles = StyleSheet.create({
    section: {
        paddingVertical: 15,
    },
    sectionHeader: {
        color: colors.GREY,
        fontFamily: 'opensans-extrabold',
        fontSize: 16,
        paddingHorizontal: 20,
        paddingBottom: 10
    },
    sectionInlineHeaderWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
})
