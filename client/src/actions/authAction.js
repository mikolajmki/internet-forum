export const logIn = () => async (dispatch) => {
    dispatch({ type: "AUTH_START" });
    try {
        const { data } = {
            data:  {
                user: {
                    userId: 1,
                    username: 'mikolajmki',
                    firstname: 'Mikolaj', 
                    lastname: 'Marcinkowski',
                    rank: 'Uzytkownik'
                },
                token: 'asdhasd981q79283711239a',
                tokenExpiration: 1
            }
        }
        console.log(data)
        dispatch({ type: "AUTH_SUCCESS", data: data });
    } catch (err) {
        console.log(err);
        dispatch({ type: "AUTH_FAIL" });
    }
}

export const logOut = () => async (dispatch) => {
    dispatch({ type: "LOGOUT_START" });
}

// import * as AuthApi from '../api/authRequest.js';

// export const logIn = (formData) => async (dispatch) => {
//     dispatch({ type: "AUTH_START" });
//     try {
//         const { data } = await AuthApi.logIn(formData);
//         dispatch({ type: "AUTH_SUCCESS", data: data });
//     } catch (err) {
//         console.log(err);
//         dispatch({ type: "AUTH_FAIL" });
//     }
// }

// export const signUp = (formData) => async (dispatch) => {
//     dispatch({ type: "AUTH_START" });
//     try {
//         const { data } = await AuthApi.signUp(formData);
//         dispatch({ type: "AUTH_SUCCESS", data: data });
//     } catch (err) {
//         console.log(err);
//         dispatch({ type: "AUTH_FAIL" });
//     }
// }

// export const logout = () => async (dispatch) => {
//     dispatch({ type: "LOGOUT_START" });
// }
