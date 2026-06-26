import axios, { AxiosProgressEvent } from 'axios';
import { Meeting, UploadResponse } from '../types';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const uploadMeeting = async (
  file: File,
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void
): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await api.post<UploadResponse>('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress,
  });

  return response.data;
};

export const getMeetings = async (): Promise<Meeting[]> => {
  const response = await api.get<Meeting[]>('/meetings');
  return response.data;
};

export const getMeeting = async (id: number): Promise<Meeting> => {
  const response = await api.get<Meeting>(`/meetings/${id}`);
  return response.data;
};

export const checkApiStatus = async (): Promise<boolean> => {
  try {
    // Attempting to hit the base API or meetings endpoint to check status
    await api.get('/meetings');
    return true;
  } catch (error) {
    return false;
  }
};

export const API_URL = API_BASE_URL;

export const deleteMeeting = async (id: number) => {
  const response = await api.delete(`/meetings/${id}`);
  return response.data;
};
