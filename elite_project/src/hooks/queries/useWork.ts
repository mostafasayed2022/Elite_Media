import { useQuery } from '@tanstack/react-query';
import { workRepository } from '../../api/repositories/work.repository';
import { QUERY_KEYS } from '../../api/keys';

export const useWork = () => {
  return useQuery({
    queryKey: QUERY_KEYS.WORK,
    queryFn: () => workRepository.getAllWorks(),
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};
