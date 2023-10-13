import { $host, $authHost } from "./index"


export const createCategory = async (category) =>{
    const {data} = await $authHost.post('api/categories', {name:category})
    return data
}

export const fetchProducts = async() => {
    const {data} = await $host.get("api/products")
    return data
}
export const fetchCategories = async() =>{
    const {data} = await $host.get("api/categories")
    return data
}
export const createProduct = async(product) =>{
    const {data} = await $authHost.post("api/products", product)
    return data
}
export const fetchProductsByCategory = async(catId) => {
    const {data} = await $host.get(`api/products/?categoryId=${catId}`)
    return data
}
export const fetchProductsByName = async(query) => {
    const {data} = await $host.get(`api/products/?query=${query}`)
    return data
}
export const getProductById = async(id) =>{
    const {data} = await $host.get(`api/products/${id}`)
    return data
}
export const updateProduct = async(id, product) =>{
    const data = $authHost.put(`api/products/${id}`, product)
    return data
}
export const deleteProduct = async(id) =>{
    const data = $authHost.delete(`api/products/${id}`)
    return data
}
export const newOrder = async(order) =>{
    const data = $authHost.post("api/order/", order)
    return data
}
export const getMyOrders = async() =>{
    const data = $authHost.get("api/order/user/")
    return data
}
export const getAllOrders = async() =>{
    const data = $authHost.get("api/order/")
    return data
}
export const getOrder = async(id) => {
    const data = $authHost.get(`api/order/${id}`)
    return data
}
export const acceptOrder = async(id)=>{
    const data = $authHost.put(`api/order/${id}`)
    return data
}
export const CancelOrder = async(id) =>{
    const data = $authHost.delete(`api/order/${id}`)
    return data
}
// export const createDevice = async (device) => {
//     const config = {
//         headers:{'Content-Type':  `multipart/form-data`}
//     }
//     console.log([...device]);
//     const {data} = await $authHost.post('/api/device', device, config)
//     return data
// }

// export const fetchDevices = async () =>{
//     const {data} = await $host.get('api/device')
//     return data
// }
// export const fetchOneDevice = async (id) =>{
//     const {data} = await $host.get(`api/device/${id}`)
//     return data
// }