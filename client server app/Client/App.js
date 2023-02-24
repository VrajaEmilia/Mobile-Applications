import { useState,useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MainScreen from './screens/MainScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddEditBookScreen from './screens/AddEditBookScreen';
import * as SQLite from 'expo-sqlite'
import { getAllBooks } from './apiRequests/getAllBooks';
const db = SQLite.openDatabase('db.books')
const Stack = createNativeStackNavigator();
export default function App() {
  const [books, setBooks] = useState([])
  const [bookDetails, setBookDetails] = useState({id:'',title:'',author:'',year:'',description:'',rating:''})
  const [edit,setEdit] = useState(false);
  const getData = async () => {
    try{
    res = await getAllBooks()
    setBooks(res)
    if (res!=undefined){
        setBooks(res)
        db.transaction((tx) => {
        tx.executeSql(
        `delete from books`,
        [],
      );
    });
    books.forEach((book) => {
       db.transaction(
                (tx) => {
                    tx.executeSql("insert into books (id,title,author,year,description,rating) values (?,?,?,?,?,?)", [book.id,book.title,book.author,book.year,book.description,book.rating]);
                    tx.executeSql("select * from books", []);
                }
            );})
  }
}
    catch(error){
        alert("You are currently offline and you cannot add, update or delete from the list of books")
        db.transaction((tx) => {
        tx.executeSql(
        `select * from books`,
        [],
        (_, { rows: { _array } }) => setBooks(_array)
      );
    });
  }
}
  useEffect(()=>{
    getData()
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS books (id INTEGER, title TEXT, author TEXT,year INTEGER, description TEXT, rating INTEGER)'
      )
    })
  },[bookDetails])
  return (
     <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" children={() => <MainScreen books={books} setBookDetails={setBookDetails} bookDetails={bookDetails} setEdit={setEdit}/>}/>
        <Stack.Screen name="AddEdit" children={() => <AddEditBookScreen books={books} setBooks={setBooks} bookDetails={bookDetails} setBookDetails={setBookDetails} edit={edit}/>} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
    marginTop:20,
    padding:10
  },
});
