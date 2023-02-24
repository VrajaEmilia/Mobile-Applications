import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import theme from '../utils/theme'
const Navbar = () => {
  return (
    <View style={styles.Navbar}>
      <Image style={styles.icon} source={require('../assets/book_logo.png')} />
      <Text style={styles.appTitle}>My personal library</Text>
    </View>
  )
}

export default Navbar

const styles = StyleSheet.create({
    Navbar:{
        position:'absolute',
        flexDirection:'row',
        top:0,
        left:0,
        backgroundColor:theme.PRIMARY_COLOR,
        height:80,
        width:'100%',
        alignItems:'center',
        padding:15,
        paddingTop:40
    },
    appTitle:{
        fontFamily:theme.FONT_FAMILY,
        color:'white',
        fontWeight:'800',
        fontSize:18,
        letterSpacing:2
    },
     icon:
    {
        height:50,
        width:50,
        marginRight:5
    }
})