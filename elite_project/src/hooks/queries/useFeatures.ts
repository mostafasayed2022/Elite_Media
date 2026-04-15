import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../../api/keys';
import { featuresRepository } from '../../api/repositories/features.repository';

export const useServices = () => {
  return useQuery({
    queryKey: QUERY_KEYS.SERVICES,
    queryFn: () => featuresRepository.getServices(),
  });
};

export const useClients = () => {
  return useQuery({
    queryKey: QUERY_KEYS.CLIENTS,
    queryFn: () => featuresRepository.getClients(),
  });
};

export const useTeam = () => {
  return useQuery({
    queryKey: QUERY_KEYS.TEAM,
    queryFn: () => featuresRepository.getTeam(),
  });
};
