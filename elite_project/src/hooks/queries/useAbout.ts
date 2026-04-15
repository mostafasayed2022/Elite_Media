import { useQuery } from '@tanstack/react-query';
import { aboutRepository } from '../../api/repositories/about.repository';
import { QUERY_KEYS } from '../../api/keys';

export const useAbout = () => {
  return useQuery({
    queryKey: QUERY_KEYS.ABOUT,
    queryFn: () => aboutRepository.getAboutMainData(),
    staleTime: 1000 * 60 * 5,
  });
};
