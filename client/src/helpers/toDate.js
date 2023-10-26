const monthDictionary = { 0 : "Stycznia", 1: "Lutego", 2 : "Marca", 3 : "Kwietnia", 4 : "Maja", 5 : "Czerwca", 6 : "Lipca", 7: "Sierpnia", 8 : "Września", 9 : "Października", 10 : "Listopada", 11 : "Grudnia" };

export const toDate = (createdAt) => {
    const date = new Date(createdAt);
    
    return date.getDay() + " " + monthDictionary[date.getMonth()] + " " + date.getFullYear();
}

export const toDateAndTime = (createdAt) => {
    const date = new Date(createdAt);
    
    return date.getDay() + " " + monthDictionary[date.getMonth()] + " " + date.getFullYear() + " o godz. " + date.getHours() + ":" + date.getMinutes();
}