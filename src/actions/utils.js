export const handleError = ({ type, error, dispatch }) => {
    console.log(error);
    let errorData = error;
    if (error.response) {
        errorData = error.response.data;
    }
    dispatch({ type, payload: errorData })
}