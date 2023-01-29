import { createStyles } from '@mantine/core';
export const useStyles = createStyles((theme) => ({
  container: {},
  searchContainer: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing.lg * 1.25,
    backgroundColor: theme.colors.gray[3],
  },
  autocompleteContainer: {
    width: '400px',
  },
  productListContainer: {
    padding: theme.spacing.lg,
  },
  card: {
    marginBottom: theme.spacing.lg,
  },
  thumbnailContainer: {
    position: 'relative',
    height: 250,
  },
  title: {
    fontFamily: `Greycliff CF ${theme.fontFamily}`,
    fontWeight: 600,
    lineHeight: 1.2,
    color: theme.colors.dark[4],
    fontSize: theme.fontSizes.xs,
    marginTop: theme.spacing.xs,
  },
  category: {
    fontFamily: `Greycliff CF ${theme.fontFamily}`,
    fontWeight: 500,
    lineHeight: 1.2,
    color: theme.colors.dark[2],
    fontSize: theme.fontSizes.xs,
    marginTop: theme.spacing.xs / 2,
  },
  footer: {
    display: 'flex',
    justifyContent: 'center',
    gap: theme.spacing.md,
    padding: theme.spacing.md,
  },
  itemsPerPageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  itemsPerPageSelect: {
    height: '32px',
    lineHeight: '32px',
    minHeight: '32px',
  },
}));
