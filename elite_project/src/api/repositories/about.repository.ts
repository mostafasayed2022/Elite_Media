import { aboutService, AboutData } from '../services/about.service';
import { getFirstItem } from '../utils';

export const aboutRepository = {
  getAboutMainData: async (): Promise<AboutData | null> => {
    const data = await aboutService.getAbout();
    return getFirstItem(data);
  },
};
