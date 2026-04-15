import apiClient from '../client';

export interface HomeData {
  text: string;
  video: string | null;
  image: string | null;
  clientvideo: string | null;
  clientimage: string | null;
  teamtext: string;
  teamvideo: string | null;
  teamimage: string;
  servicename: string;
  serviceimage: string | null;
  servicevideo: string | null;
  id?: number;
}

export const homeService = {
  getHomeData: async (): Promise<HomeData[]> => {
    const { data } = await apiClient.get<HomeData[]>('/home/');
    return data;
  },
};
