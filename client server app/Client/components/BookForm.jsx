import { StyleSheet, View, Text, KeyboardAvoidingView ,TextInput} from 'react-native'
import React from 'react'
import TextField from './TextField'
import CustomButton from './CustomButton'
import { useState } from 'react'
import uuid from 'react-native-uuid';
import { useNavigation } from '@react-navigation/native'
import { useEffect } from 'react'
import * as SQLite from 'expo-sqlite'
import { addNewBook } from '../apiRequests/addNewBook'
import { deleteBookFromDb } from '../apiRequests/deleteBook'
import { updateBook } from '../apiRequests/editBook'
const db = SQLite.openDatabase("db.books");
const BookForm = ({bookDetails,books,setBooks,setBookDetails,edit}) => {
    const navigation=useNavigation()
    const [error,setError] = useState("")
    const addBook = async () => {
        var bookList = books
        const book = {...bookDetails,id:uuid.v4()}
        if(!Number(book.year) || !Number(book.rating)){
            console.log(book.year,book.rating)
        }
        else
        {
            addNewBook(book)
            // bookList.push(book)
            // setBooks(Array.from(bookList))
            setBookDetails({id:'',title:'',author:'',year:'',description:'',rating:''})
            // db.transaction(
            //     (tx) => {
            //         tx.executeSql("insert into books (id,title,author,year,description,rating) values (?,?,?,?,?,?)", [book.id,book.title,book.author,book.year,book.description,book.rating]);
            //         tx.executeSql("select * from books", []);
            //     }
            // );
            setError("")
            navigation.navigate('Home')
        }
    }
    useEffect(()=>{
    }, [bookDetails])

    const editBook = async () => {
        let bookList = []
         if(!Number(bookDetails.year) || !Number(bookDetails.rating)){
            setError('Rating and Year need to be integers')
        }
        else
        {
            updateBook(bookDetails)
            // books.forEach(book => {
            // if(book.id==bookDetails.id)
            //     {
            //     bookList.push(bookDetails)
            //     }
            // else
            //     bookList.push(book)
            // });

            // setBooks(Array.from(bookList))
            // db.transaction(
            //     (tx) => {
            //         tx.executeSql("Update books SET title=?, author=?, year=?, description=?, rating=? WHERE id=?", [bookDetails.title,bookDetails.author,bookDetails.year,bookDetails.description,bookDetails.rating,bookDetails.id]);
            //         tx.executeSql("select * from books", [])
            //     },
            //     (error) => {
            //         console.log(error)
            //     }
            // );
            setError("")
            setBookDetails({id:'',title:'',author:'',year:'',description:'',rating:''})
            navigation.navigate('Home')
        }
    }
    const deleteBook = async () => {
        deleteBookFromDb(bookDetails.id)
        setBookDetails({id:'',title:'',author:'',year:'',description:'',rating:''})
        navigation.navigate('Home')
    }
  return (
    <View style={styles.formContainer}>
        <KeyboardAvoidingView>
        <TextField
            name={'title'}
            label={'Title'} 
            placeholder={'Enter the title here...'}
            onChangeText={(newText) => setBookDetails({...bookDetails, title:newText})}
            value={bookDetails.title}
        />
        <TextField
            name={'author'}
            label={'Author'} 
            placeholder={'Enter the name of the author here...'}
            onChangeText={(newText) => setBookDetails({...bookDetails, author:newText})}
            value={bookDetails.author}
        />
        <TextField
            name={'year'}
            label={'Year'} 
            placeholder={'Enter the year of release here...'}
            onChangeText={(newText) => setBookDetails({...bookDetails, year:newText})}
            keyboardType={'numeric'}
            value={bookDetails.year}
        />
        <Text style={styles.label}>Description</Text>
        <TextInput 
            editable 
            style={styles.descriptionStyle}  
            multiline 
            name='description'
            label="Description" 
            placeholder='Enter description here...'
            onChangeText={(newText) => setBookDetails({...bookDetails, description:newText})}
            value={bookDetails.description}
        />
        <TextField
            name={'rating'}
            label={'Rating'} 
            keyboardType={'numeric'}
            placeholder={'Enter the rating here...'}
            onChangeText={(newText) => setBookDetails({...bookDetails, rating:newText})}
            value={bookDetails.rating}
        />
        <Text style={styles.error}>{error}</Text>
        </KeyboardAvoidingView>
        <View>
            <CustomButton title={'Save'} onPressFunction={edit? editBook : addBook}/>
            <CustomButton title={'Delete'} onPressFunction={deleteBook}/>
        </View>
    </View>
  )
}
export default BookForm

const styles = StyleSheet.create({
    formContainer:{
        padding:10,
        height:785,
        justifyContent:'space-between'
    },
      descriptionStyle:{
        fontFamily:'monospace',
        backgroundColor:'white',
        padding:10,
        height:150,
        marginVertical:5,
        borderRadius:8,
        maxHeight:100
    },
       label:{
        fontFamily:'monospace',
        fontSize:12,
        fontWeight:'800'
    },
    error:{
         fontFamily:'monospace',
         color:'red',
         fontWeight:'800'
    }
})