import api from './api';

const studentService = {

    addStudent: async (studentData) => {
        const response = await api.post('/students/add', studentData);
        return response.data;
    },

    getStudentByTz: async (tz) => {
        const response = await api.get(`/students/${tz}`);
        return response.data;
    },

    getAllStudents: async () => {
        const response = await api.get('/students/all');
        return response.data;
    },

};
export default studentService;