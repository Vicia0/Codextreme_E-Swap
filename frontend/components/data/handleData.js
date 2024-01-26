import axios from 'axios';
import { backendhost } from '../navigation/routes';

const hostRoutes = {
    'items': 'items', 'wishlists': 'wishlists',
    'carts': 'carts', 'categories':'categories'
};

const handleRequest = async (method, endpoint, data = null) => {
    try {
        const response = await axios({
            method: method,
            url: `${backendhost}/${endpoint}`,
            data: data,
        });
        console.log(`${method} successful:`, response.data);
        return response.data;
    } catch (error) {
        console.error(`Error ${method.toLowerCase()}ing data:`, error);
        throw error;
    }
};

// POST request
export const handlePost = (endpoint, postData) => {
    return handleRequest('POST', endpoint, postData);
};

// PUT request
export const handlePut = (endpoint, putData) => {
    return handleRequest('PUT', `${endpoint}/${putData._id}`, putData);
};

// Fetch data for all endpoints
export const fetchData = async () => {
    const data = {};
    // Use Promise.all to fetch data concurrently
    await Promise.all(Object.entries(hostRoutes).map(async ([name, endpoint]) => {
        try {
            const responseData = await handleRequest('GET', endpoint);
            console.log('endpoint: ', endpoint)
            if(responseData.status === 200){
                data[name] = responseData.data;
            }else{
                console.log(`Status error fetching data for ${name}: `, responseData.status);
            }
        } catch (error) {
            // Handle errors if needed
            console.error(`Error fetching data for ${name}:`, error);
        }
    }));
    return data;
};
