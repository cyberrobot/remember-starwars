import { AutocompleteItem } from '@mantine/core';
import { Product } from '../../src/gql/graphql';

export const toAutocompleteItems = (
  products: Product[]
): AutocompleteItem[] => {
  return products.map((product) => {
    return {
      value: product.title,
      label: product.title,
    };
  });
};

export const getPageCount = (total: number, itemsPerPage: string) => {
  return Math.ceil((total || 0) / Number(itemsPerPage));
};

export const getDiscountedPrice = (price: number, discount: number) => {
  return price - price * (discount / 100);
};
