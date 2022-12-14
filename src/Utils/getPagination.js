export const getPagination = (page, size) => {
  const limit = size || 9;
  const offset = page ? (page - 1) * limit : 0;
  return { limit, offset };
};
