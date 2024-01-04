import * as AuthApi from '../api/authRequest.js';

export const logIn = (formData) => async (dispatch) => {
    dispatch({ type: "AUTH_START" });
    try {
        const { data: authData } = await AuthApi.logIn(formData);
        const data = { authData, message: "Logged in successfully" };
        dispatch({ type: "AUTH_SUCCESS", data: data });
        return false;
    } catch (err) {
        const { data } = err.response;
        console.log(data);
        dispatch({ type: "AUTH_FAIL", data: data.message } );
        return true;
    }
}

export const signUp = (formData) => async (dispatch) => {
    dispatch({ type: "AUTH_START" });
    try {
        const { data: authData } = await AuthApi.signUp(formData);
        const data = { authData, message: "Signed up succesfully" };
        dispatch({ type: "AUTH_SUCCESS", data: data });
    } catch (err) {
        const { data } = err.response;
        console.log(data);
        dispatch({ type: "AUTH_FAIL", data: data.message });
    }
}

export const logOut = () => async (dispatch) => {
    dispatch({ type: "LOGOUT", data: { message: "Logged out succesfully" } });
}



// export const logIn = () => async (dispatch) => {
//     dispatch({ type: "AUTH_START" });
//     try {
//         const { data } = {
//             data:  {
//                 user: {
//                     id: "6531b00064798c0e0fa67881",
//                     username: 'mikolajmki',
//                     firstname: 'Mikolaj', 
//                     lastname: 'Marcinkowski',
//                     rank: 'Uzytkownik'
//                 },
//                 token: 'asdhasd981q79283711239a',
//                 tokenExpiration: 1
//             }
//         }
//         console.log(data)
//         dispatch({ type: "AUTH_SUCCESS", data: data });
//     } catch (err) {
//         console.log(err);
//         dispatch({ type: "AUTH_FAIL" });
//     }
// }

// export const logOut = () => async (dispatch) => {
//     dispatch({ type: "LOGOUT_START" });
// }