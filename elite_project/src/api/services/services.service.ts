import apiClient from '../client';

export interface ServiceData {
  servicename: string;
  serviceimage: string;
  servicevideo: string;
  id?: number;
}

export const servicesService = {
  getServices: async (): Promise<ServiceData[]> => {
    const { data } = await apiClient.get<ServiceData[]>('/get_service/');
    return data;
  },
};
