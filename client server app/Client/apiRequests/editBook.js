import axios from "axios";
const instance = axios.create({
  timeout: 1000, // in miliseconds
});
export const updateBook = async (book) => {
    try{
        const response = await instance.put('http://192.168.116.173:8080/Books/editBook',book)
        return response.data
    }
    catch(error){
        console.log(error)
    }
}