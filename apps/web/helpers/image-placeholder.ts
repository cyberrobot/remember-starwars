export const getImagePlaceholder = () => {
  // Random number between 1 and 6
  const random = Math.floor(Math.random() * 6) + 1;
  return `/catalog-placeholder-${random}.jpg`;
};
