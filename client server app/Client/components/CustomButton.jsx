import { StyleSheet, Text, View, Button, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'
import theme from '../utils/theme'
import sizes from '../utils/sizes'
const CustomButton = ({title,onPressFunction}) => {
  return (
    <TouchableOpacity
        onPress={onPressFunction}
        style={styles.CustomButton}
    >
        <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton

const styles = StyleSheet.create({
    CustomButton:{
        backgroundColor: theme.PRIMARY_COLOR,
        fontFamily: theme.FONT_FAMILY,
        height:50,
        width:50,
        height:sizes.button1Height,
        width:sizes.button1Width,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:8,
        marginVertical:5
    },
    buttonText:{
        fontFamily:theme.FONT_FAMILY,
        color:'white',
        fontSize:sizes.button1FontSize,
        fontWeight:'800'
    }
})