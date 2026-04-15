import { useQuery } from '@tanstack/react-query';
import { contactRepository } from '../../api/repositories/contact.repository';
import { QUERY_KEYS } from '../../api/keys';

export const useContact = () => {
  return useQuery({
    queryKey: QUERY_KEYS.CONTACT,
    queryFn: () => contactRepository.getContactMainData(),
    staleTime: 1000 * 60 * 60, // 1 hour (rarely changes)
  });
};
