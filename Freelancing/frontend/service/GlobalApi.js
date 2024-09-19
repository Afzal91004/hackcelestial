import axios from "axios"; // Use import instead of require

const API_KEY = import.meta.env.VITE_STRAPI_API_KEY; // Access environment variable

const axiosClient = axios.create({
  baseURL: "http://localhost:1337/api/", // Adjust the base URL as needed
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`, // Add Authorization header with API key
  },
});

// Function to create a new resume
const CreateNewResume = (data) => axiosClient.post("/user-resumes/", data);

const GetUserResumes = (userEmail) =>
  axiosClient.get("/user-resumes?filters[userEmail][$eq]=" + userEmail);
// Export the function for use in other parts of your application
export default {
  CreateNewResume,
  GetUserResumes,
};
