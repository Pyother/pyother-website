const fetchData = async (setProjectsData, setProjectsStatus, setServicesData, setServicesStatus, dispatch) => {
    try {
        const projectsResponse = await fetch('http://localhost:3001/api/projects');
        if (!projectsResponse.ok) {
            throw new Error('Error while fetching projects data.');
        }
        const projectsData = await projectsResponse.json();
        dispatch(setProjectsData(projectsData));
        dispatch(setProjectsStatus('success'));

        const servicesResponse = await fetch('http://localhost:3001/api/services');
        if (!servicesResponse.ok) {
            throw new Error('Error while fetching services data.');
        }
        const servicesData = await servicesResponse.json();
        dispatch(setServicesData(servicesData));
        dispatch(setServicesStatus('success'));

    } catch (error) {
        console.log(error);
    }
};

export default fetchData;
