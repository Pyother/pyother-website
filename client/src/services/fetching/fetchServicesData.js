const fetchServicesData = async (setServicesData, setStatus, dispatch) => {
    
    try {
        const response = await fetch('http://localhost:3001/api/services');
        const data = await response.json();
        console.log(data);

        dispatch(setServicesData(data));
        dispatch(setStatus('success'));
        
    } catch (error) {
        console.log(error);
        dispatch(setStatus('error'));
    }
}

export default fetchServicesData;