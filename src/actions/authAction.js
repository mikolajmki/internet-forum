export const logIn = () => async (dispatch) => {
    dispatch({ type: "AUTH_START" });
    try {
        const { data } = {
            data:  {
                user: {
                    userId: 1,
                    username: 'mikolajmki', 
                    firstname: 'Mikolaj', 
                    lastname: 'Marcinkowski'
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
