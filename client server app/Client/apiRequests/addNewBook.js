import axios from "axios";
const instance = axios.create({
  timeout: 1000, // in miliseconds
});
export const addNewBook = async (book) => {
    try{
        book.id = 0
        book.rating = Number(book.rating)
        book.year = Number(book.year)
        const response = await instance.post('http://192.168.116.173:8080/Books/insertBook',book)
        console.log(response.data)
        return response.data
    }
    catch(error){
        console.log(error)
        return null;
    }
}