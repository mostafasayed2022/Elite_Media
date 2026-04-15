import { workService, WorkItem } from '../services/work.service';

export const workRepository = {
  getAllWorks: async (): Promise<WorkItem[]> => {
    return await workService.getWorks();
  },
};
