import { useQuery } from '@tanstack/react-query';
import { homeRepository } from '../../api/repositories/home.repository';
import { QUERY_KEYS } from '../../api/keys';

export const useHome = () => {
  return useQuery({
    queryKey: QUERY_KEYS.HOME,
    queryFn: () => homeRepository.getHomeData(),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 2,
  });
};
