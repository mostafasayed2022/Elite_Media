import apiClient from '../client';

export interface JoinTeamData {
  name: string;
  jobTitle: string;
  email: string;
  phoneNumber: string;
  linkedinProfile: string;
  portfolio: string;
  resume: File | null;
}

export const joinTeamService = {
  submitApplication: async (data: JoinTeamData): Promise<any> => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== null) {
        formData.append(key, value);
      }
    });

    const { data: response } = await apiClient.post('/jointeam/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  },
};
