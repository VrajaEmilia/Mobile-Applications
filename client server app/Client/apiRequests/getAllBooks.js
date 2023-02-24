import axios from "axios";

const instance = axios.create({
  timeout: 500, // in miliseconds
});

export const getAllBooks = async () => {
        const response = await instance.get('http:/192.168.116.173:8080/Books/getBooks')
        return response.data
}