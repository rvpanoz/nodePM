import { flexContainer } from 'styles/variables';

const styles = theme => ({
  flexContainer: {
    ...flexContainer,
    justifyContent: 'flex-end',
    padding: theme.spacing.unit * 2
  }
});

export default styles;
