import { StyleSheet, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import theme from '../utils/theme'
import { useNavigation } from '@react-navigation/native'
const AddBookButton = ({setBookDetails,setEdit}) => {
  const navigation = useNavigation()
  return (
    <TouchableOpacity style={styles.AddBookButton} onPress={() => {
        setEdit(false)
        setBookDetails({id:'',title:'',author:'',year:'',description:'',rating:''})
        navigation.navigate('AddEdit')
      }}>
       <Image style={styles.icon} source={require('../assets/plus.png')} />
    </TouchableOpacity>
  )
}

export default AddBookButton

const styles = StyleSheet.create({
    AddBookButton:{
        backgroundColor:theme.PRIMARY_COLOR,
        position:'absolute',
        height:100,
        width:100,
        borderRadius:50,
        alignItems:'center',
        justifyContent:'center',
        top:750,
        left:300
    },
      icon:{
    height:70,
    width:70
  }
})