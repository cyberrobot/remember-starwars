import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import {
  Group,
  Box,
  Collapse,
  Text,
  UnstyledButton,
  createStyles,
  Checkbox,
} from '@mantine/core';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({
  control: {
    fontWeight: 600,
    display: 'block',
    width: '100%',
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    fontSize: theme.fontSizes.md,
  },
  link: {
    fontWeight: 400,
    display: 'block',
    textDecoration: 'none',
    padding: `${theme.spacing.xs / 2}px ${theme.spacing.md}px`,
    fontSize: theme.fontSizes.sm,
  },
  checkbox: {
    label: {
      color: theme.colors.gray[7],
      '&:hover': {
        color: theme.fn.lighten(
          theme.fn.variant({ variant: 'filled', color: theme.primaryColor })
            .background!,
          0.1
        ),
        cursor: 'pointer',
      },
    },
  },
  linksContainer: {
    paddingLeft: 0,
    margin: 0,
  },
  chevron: {
    transition: 'transform 200ms ease',
  },
}));

interface LinksGroupProps {
  label: string;
  links?: { label: string; value: string }[];
  onClick?: (selectedItems: string[]) => void;
}

export function LinksGroup({ label, links, onClick }: LinksGroupProps) {
  const { classes, theme } = useStyles();
  const hasLinks = Array.isArray(links);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const isChecked = useCallback(
    (value: string) => selectedItems.includes(value),
    [selectedItems]
  );
  const items = (hasLinks ? links : []).map((link) => (
    <Text<'li'> component="li" className={classes.link} key={link.label}>
      <Checkbox
        className={classes.checkbox}
        checked={isChecked(link.value)}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          if (onClick) {
            onClick(selectedItems);
          }
          if (e.target.checked) {
            setSelectedItems((prev) => [...prev, link.value]);
          } else {
            setSelectedItems((prev) =>
              prev.filter((item) => item !== link.value)
            );
          }
        }}
        label={link.label}
      />
    </Text>
  ));

  return (
    <>
      <UnstyledButton className={classes.control}>
        <Group position="apart" spacing={0}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box>{label}</Box>
          </Box>
        </Group>
      </UnstyledButton>
      {hasLinks ? <ul className={classes.linksContainer}>{items}</ul> : null}
    </>
  );
}
