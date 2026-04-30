import axios from "axios";

import api from './api';

const locationService = {

    getAllLocations: async () => {
        const response = await api.get('/location/all');
        console.log(response.data)
        return response.data;
    },
    updateStudentLocation: async (data) => {
        const response = await api.post('/location/update/student', data);
        return response.data;
    },

    updateTeacherLocation: async (data) => {
        const response = await api.post('/location/update/teacher', data);
        return response.data;
    },

    getDistantStudents: async (teacherTz) => {
        const response = await api.get(`/location/distance/${teacherTz}`);
        return response.data;
    }
};

export default locationService;