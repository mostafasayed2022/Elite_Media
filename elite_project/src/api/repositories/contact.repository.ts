import { contactService, ContactInfo } from '../services/contact.service';

export const contactRepository = {
  getContactMainData: async (): Promise<ContactInfo | null> => {
    const data = await contactService.getContactInfo();
    return data.length > 0 ? data[0] : null;
  },
};
