export const getFirstItem = <T>(data: T[] | null): T | null => {
  if (!data || data.length === 0) return null;
  return data[0];
};

export const formatListResponse = <T>(data: T[] | null): T[] => {
  return data || [];
};
