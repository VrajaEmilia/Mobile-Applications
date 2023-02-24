import axios from "axios";
const instance = axios.create({
  timeout: 1000, // in miliseconds
});

export const deleteBookFromDb = async (bookId) => {
    try{
        const response = await instance.delete('http://192.168.116.173:8080/Books/deleteBook?bookId='+bookId)
        console.log(response.data)
        return response
    }
    catch(error){
        console.log(error)
    }
}