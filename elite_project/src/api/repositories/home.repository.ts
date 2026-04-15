import { homeService, HomeData } from '../services/home.service';
import { getFirstItem } from '../utils';

export const homeRepository = {
  getHomeData: async (): Promise<HomeData | null> => {
    const data = await homeService.getHomeData();
    return getFirstItem(data);
  },
};
