export const frontendhost = 'localhost:3000';
export const backendhost = 'localhost:8000';

const host_routes = {
    'items': 'items', 'wishlist':'wishlist', 
    'cart':'cart', 'users':'users', 
}

export const post_url = (endpoint)=> backendhost + host_routes[Object.keys(host_routes).find(key => key === endpoint)] 
export const get_url = (endpoint)=> backendhost + host_routes[Object.keys(host_routes).find(key => key === endpoint)] 