import { defaultFont, grayColor } from 'styles/variables';
import { darken } from '@material-ui/core/styles/colorManipulator';

const styles = theme => ({
  tab: {
    backgroundColor: theme.palette.background.paper
  },
  title: {
    ...defaultFont,
    fontSize: 18,
    color: darken(grayColor, 0.2)
  },
  stats: {
    ...defaultFont,
    fontSize: 22,
    color: darken(grayColor, 0.1)
  },
  listItem: {
    padding: theme.spacing.unit,
    margin: 0
  },
  secondaryColor: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.primary.light
  },
  warningColor: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.warning.light
  },
  errorColor: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.error.light
  }
});

export default styles;
