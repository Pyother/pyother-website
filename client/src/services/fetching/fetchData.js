const fetchData = async (setProjectsData, setProjectsStatus, setServicesData, setServicesStatus, dispatch) => {
    try {
        const projectsResponse = await fetch('/api/projects');
        if (!projectsResponse.ok) {
            throw new Error('Error while fetching projects data.');
        }
        const projectsData = await projectsResponse.json();
        dispatch(setProjectsData(projectsData));
        dispatch(setProjectsStatus('success'));

        const servicesResponse = await fetch('/api/services');
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
