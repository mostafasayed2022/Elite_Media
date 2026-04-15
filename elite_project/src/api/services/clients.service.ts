import apiClient from '../client';

export interface ClientData {
  clientimage: string;
  id?: number;
}

export const clientsService = {
  getClients: async (): Promise<ClientData[]> => {
    const { data } = await apiClient.get<ClientData[]>('/getclient_image/');
    return data;
  },
};
