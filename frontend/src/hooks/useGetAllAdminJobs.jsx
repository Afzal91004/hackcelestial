import { setAllAdminJobs } from "@/redux/jobSlice";
import { JOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllAdminJobs = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAllAdminJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/getadminjobs`, { withCredentials: true });
                
                if (res.data.success) {
                    // If successful, dispatch the jobs
                    dispatch(setAllAdminJobs(res.data.jobs));
                } else {
                    // If the API response is success: false, dispatch an empty array
                    dispatch(setAllAdminJobs([]));
                }
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    console.error('No jobs found (404):', error.response.data.message);
                    dispatch(setAllAdminJobs([])); // Dispatch an empty array on 404
                } else {
                    console.error('Error fetching admin jobs:', error.message);
                }
            }
        };

        fetchAllAdminJobs();
    }, [dispatch]);
};

export default useGetAllAdminJobs;
