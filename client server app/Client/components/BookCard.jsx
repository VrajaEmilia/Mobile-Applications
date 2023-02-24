import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import theme from '../utils/theme'
import sizes from '../utils/sizes'
import { useNavigation } from '@react-navigation/native';
const BookCard = ({book, setBookDetails, setEdit}) => {
  const navigation = useNavigation()
  const openEditBookScreen = () =>{
        setBookDetails({...book,year:String(book.year),rating:String(book.rating)})
        setEdit(true)
        navigation.navigate('AddEdit')
    }
  return (
    <TouchableOpacity style={styles.BookCard} onPress={openEditBookScreen}>
      <Text style={styles.bookCardText}>{book.title}</Text>
      <Text style={styles.bookCardText}>{book.author}</Text>
    </TouchableOpacity>
  )
}

export default BookCard

const styles = StyleSheet.create({
    BookCard:{
        backgroundColor:theme.SECONDARY_COLOR,
        height:sizes.bookCardHeight,
        width:sizes.bookCardWidth,
        borderRadius:8,
        alignItems:'center',
        justifyContent:'center',
        marginVertical:7
    },
    bookCardText:{
        fontFamily:theme.FONT_FAMILY,
        color:'white',
        fontSize:18
    }
})