import apiClient from '../client';

export interface WorkItem {
  id: number;
  title: string;
  logo: string;
  deliverables: string;
  video: string;
}

export const workService = {
  getWorks: async (): Promise<WorkItem[]> => {
    const { data } = await apiClient.get<WorkItem[]>('/work/');
    return data;
  },
};
