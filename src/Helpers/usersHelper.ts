export const generateId =() =>{
    const timestamp = Date.now().toString(16);
    const random = Math.random().toString(16).slice(2);
    return timestamp + random;
}
