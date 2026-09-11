export const getProductKey = (product) => {
  const cat = product.category || 'Popular';
  return `${cat}::${product.id}`;
};