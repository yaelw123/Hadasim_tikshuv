import api from './api'; 

const teachersService = {
    loadTeachers: async () => {
        const res = await api.get('/teachers/all');
        return res.data;
    },

    getById: async (tz) => {
        const res = await api.get(`/teachers/${tz}`);
        return res.data;
    },

    getStudentForTeacher: async (tz) => {
        const res = await api.get(`/teachers/${tz}/students`);
        return res.data;
    },

 
};


export default teachersService;