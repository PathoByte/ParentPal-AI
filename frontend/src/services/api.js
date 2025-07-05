import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000'; // Match your backend port

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const askQuestion = async (question, image = null) => {
  const formData = new FormData();
  formData.append('question', question);
  if (image) {
    formData.append('image', image);
  }
  
  try {
    const response = await api.post('/ask', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const checkBackendStatus = async () => {
  try {
    await api.get('/');
    return true;
  } catch {
    return false;
  }
};