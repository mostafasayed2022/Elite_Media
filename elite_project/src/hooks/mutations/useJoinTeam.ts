import { useMutation } from '@tanstack/react-query';
import { joinTeamService, JoinTeamData } from '../../api/services/joinTeam.service';

export const useJoinTeam = () => {
  return useMutation({
    mutationFn: (data: JoinTeamData) => joinTeamService.submitApplication(data),
    onSuccess: (data) => {
      console.log('Application submitted successfully:', data);
    },
    onError: (error) => {
      console.error('Error submitting application:', error);
    },
  });
};
