import { servicesService } from '../services/services.service';
import { clientsService } from '../services/clients.service';
import { teamService } from '../services/team.service';


export const featuresRepository = {
  getServices: async () => {
    const data = await servicesService.getServices();
    return data;
  },
  getClients: async () => {
    const data = await clientsService.getClients();
    return data;
  },
  getTeam: async () => {
    const data = await teamService.getTeam();
    return data;
  },
};
