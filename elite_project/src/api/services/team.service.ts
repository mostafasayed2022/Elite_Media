import apiClient from '../client';

export interface TeamMember {
  name: string;
  title: string;
  image: string | null;
  id?: number;
}

export const teamService = {
  getTeam: async (): Promise<TeamMember[]> => {
    const { data } = await apiClient.get<TeamMember[]>('/team_member_get/');
    return data;
  },
};
