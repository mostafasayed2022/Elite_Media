import apiClient from '../client';

export interface ContactInfo {
  address: string;
  phone: string;
  email: string;
  facebook_profile: string;
  instagram_profile: string;
  linkedin_profile: string;
  id?: number;
}

export const contactService = {
  getContactInfo: async (): Promise<ContactInfo[]> => {
    const { data } = await apiClient.get<ContactInfo[]>('/contact/');
    return data;
  },
};
