import axios from "axios"

const testApi = {
    todo:async() => {
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos')
        return response.data;
    }
}

export default testApi