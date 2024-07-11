const fetchProjectsData = async (setProjectsData, setStatus, dispatch) => {
    
    try {
        const response = await fetch('http://localhost:3001/api/projects');
        const data = await response.json();
        console.log(data);
        dispatch(setProjectsData(data));
        dispatch(setStatus('success'));
    } catch (error) {
        console.log(error);
        dispatch(setProjectsData([]));
        dispatch(setStatus('error'));
    }
}

export default fetchProjectsData;