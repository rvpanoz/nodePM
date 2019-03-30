import { grayColor, flexContainer, defaultFont } from 'styles/variables';

const styles = theme => ({
  flexContainer: {
    ...flexContainer,
    alignItems: 'center'
  },
  flexItem: {
    padding: theme.spacing.unit
  },
  categoryHeader: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit,
    borderBottom: '1px solid #eee'
  },
  categoryHeaderPrimary: {
    color: grayColor
  },
  itemCategory: {
    borderBottom: '1px solid #eee',
    padding: theme.spacing.unit / 2
  },
  homeIcon: {
    width: 35,
    height: 35,
    marginLeft: theme.spacing.unit * 2,
    fill: '#fff'
  },
  title: {
    ...defaultFont,
    color: grayColor,
    fontSize: 32,
    paddingLeft: theme.spacing.unit * 3
  },
  itemActionable: {
    '&:hover': {
      color: theme.palette.common.white,
      backgroundColor: theme.palette.secondary.light
    }
  },
  itemActiveItem: {
    color: theme.palette.primary.light
  },
  itemPrimary: {
    fontSize: theme.typography.fontSize,
    '&$textDense': {
      fontSize: theme.typography.fontSize
    }
  },
  textDense: {
    paddingTop: theme.spacing.unit / 2
  },
  divider: {
    marginTop: theme.spacing.unit * 2
  },
  margin: {
    margin: theme.spacing.unit
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  },
  actionButton: {
    paddingTop: theme.spacing.unit
  },
  button: {
    margin: theme.spacing.unit
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  iconSmall: {
    fontSize: 20
  },
  historyDirectory: {
    wordWrap: 'break-word'
  },
  label: {
    ...defaultFont,
    fontSize: 22,
    fontWeight: 400,
    display: 'inline-block',
    position: 'relative',
    top: theme.spacing.unit / 4
  },
  listWrapper: {
    whiteSpace: 'nowrap',
    padding: theme.spacing.unit,
    [theme.breakpoints.up('md')]: {
      maxHeight: 500,
      overflowY: 'scroll'
    },
    [theme.breakpoints.up('lg')]: {
      maxHeight: 650
    }
  },
  listItem: {
    ...defaultFont,
    paddingTop: theme.spacing.unit,
    paddingLeft: theme.spacing.unit,
    paddingBottom: 0,
    paddingRight: 0
  }
});

export default styles;
