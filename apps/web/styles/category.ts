import { createStyles } from '@mantine/core';
export const useStyles = createStyles((theme) => ({
  container: {
    display: 'grid',
    gridTemplateColumns: '250px auto auto',
    gridTemplateAreas:
      '"header header header" "aside content content" "footer footer footer"',
  },
  searchContainer: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing.lg * 1.25,
    backgroundColor: theme.colors.gray[3],
    gridArea: 'header',
  },
  autocompleteContainer: {
    width: '400px',
  },
  productListContainer: {
    padding: theme.spacing.lg,
    gridArea: 'content',
  },
  card: {
    marginBottom: theme.spacing.lg,
  },
  thumbnailContainer: {
    display: 'block',
    width: '100%',
    height: 'auto',
    position: 'relative',
    overflow: 'hidden',
    padding: '80.2% 0 0 0',
  },
  title: {
    fontFamily: `Greycliff CF ${theme.fontFamily}`,
    fontWeight: 600,
    lineHeight: 1.2,
    color: theme.colors.dark[6],
    fontSize: theme.fontSizes.sm,
    marginTop: theme.spacing.xs,
  },
  priceContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'left',
  },
  originalPrice: {
    fontFamily: `Greycliff CF ${theme.fontFamily}`,
    fontWeight: 400,
    lineHeight: 1.2,
    color: theme.colors.gray[6],
    fontSize: theme.fontSizes.sm,
    marginTop: theme.spacing.xs / 2,
    textDecoration: 'line-through',
  },
  discountedPrice: {
    fontFamily: `Greycliff CF ${theme.fontFamily}`,
    fontWeight: 500,
    lineHeight: 1.2,
    color: theme.colors.red[7],
    fontSize: theme.fontSizes.sm,
    marginTop: theme.spacing.xs / 2,
    marginLeft: theme.spacing.xs / 2.5,
  },
  aside: {
    gridArea: 'aside',
  },
  linksInner: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
  },
  footer: {
    display: 'flex',
    justifyContent: 'center',
    gap: theme.spacing.md,
    padding: theme.spacing.md,
    gridArea: 'footer',
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
