import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import theme from '../utils/theme'
import Navbar from '../components/Navbar'
import BookCard from '../components/BookCard'
import uuid from 'react-native-uuid';
import AddBookButton from '../components/AddBookButton'
import { useNavigation } from '@react-navigation/native';
const MainScreen = ({books,setBookDetails,bookDetails,setEdit}) => {
  const navigation = useNavigation()
  useEffect(() => {
  }, [books]);
  return (
    <View styles={styles.MainScreen}>
      <Navbar/>
      <ScrollView contentContainerStyle ={styles.itemsContainer} style={{top:90,width:'100%',height:777}}>
        {books.map((book) => {
             return (<BookCard book={book} key={uuid.v4()} setBookDetails={setBookDetails} setEdit={setEdit}/>)
        })
        }
      </ScrollView>
      <AddBookButton style={styles.plusButton} setEdit={setEdit} setBookDetails={setBookDetails}/>
    </View>
  )
}

export default MainScreen

const styles = StyleSheet.create({
    MainScreen:{
        width:'100%',
        backgroundColor:theme.BACKGROUND_COLOR,
    },
    itemsContainer:{
        flexDirection:'column',
        paddingHorizontal:10
    }
})