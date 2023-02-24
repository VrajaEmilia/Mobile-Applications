import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import theme from '../utils/theme'
import Navbar from '../components/Navbar'
import TextField from '../components/TextField'
import BookForm from '../components/BookForm'
const AddEditBookScreen = ({books,setBooks,bookDetails,setBookDetails,edit}) => {
  return (
    <View style={styles.MainScreen}>
        <Navbar/>
        <View style={styles.bookFormContainer}>
        <BookForm style={styles.BookForm} bookDetails={bookDetails} setBooks={setBooks} books={books} setBookDetails={setBookDetails} edit={edit}/>
        </View>
    </View>
  )
}

export default AddEditBookScreen
const styles = StyleSheet.create({
     MainScreen:{
        width:'100%',
        backgroundColor:theme.BACKGROUND_COLOR,
    },
    bookFormContainer:{
        marginTop:80
    }
})