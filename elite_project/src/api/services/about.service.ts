import apiClient from '../client';

export interface AboutData {
  text: string;
  image: string | null;
  video: string | null;
  why_choose_ustext: string;
  why_choose_usimage: string;
  aboutimage: string;
  abouttext_about: string;
  text_philo: string;
  image_philo: string;
  id?: number;
}

export const aboutService = {
  getAbout: async (): Promise<AboutData[]> => {
    const { data } = await apiClient.get<AboutData[]>('/about/');
    return data;
  },
};
