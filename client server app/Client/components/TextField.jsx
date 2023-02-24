import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'
import theme from '../utils/theme'
import sizes from '../utils/sizes'
const TextField = ({name,label,placeholder,onChangeText,value,keyboardType}) => {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput  
        style={styles.inputStyle} 
        name={name}
        label={label}
        placeholder={placeholder}
        onChangeText={onChangeText} 
        value={value}
        keyboardType={keyboardType}
        />
    </View>
  )
}
export default TextField

const styles = StyleSheet.create({
    inputStyle:{
        fontFamily:theme.FONT_FAMILY,
        backgroundColor:'white',
        padding:10,
        marginVertical:5,
        borderRadius:8,
        height:sizes.input1Height,
        width:sizes.input1Width
    },
    label:{
        fontFamily:theme.FONT_FAMILY,
        fontSize:12,
        fontWeight:'800'
    }
})