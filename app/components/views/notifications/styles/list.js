import { defaultFont, flexContainer } from 'styles/variables';

const styles = theme => ({
  flexContainer: {
    ...flexContainer,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  flexContainerCell: {
    ...flexContainer,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  transition: {
    transition: theme.transitions.create('width', {
      duration: theme.transitions.duration.shortest
    })
  },
  paper: {
    width: '100%',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0
  },
  toolbar: {
    width: '100%'
  },
  tableCell: {
    '& p': {
      overflowWrap: 'break-word'
    }
  },
  cellText: {
    ...defaultFont,
    fontSize: 16,
    [theme.breakpoints.up('lg')]: {
      width: 'auto'
    },
    [theme.breakpoints.down('md')]: {
      width: 200
    },
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  tableWrapper: {
    whiteSpace: 'nowrap',
    padding: theme.spacing(1),
    [theme.breakpoints.up('md')]: {
      maxHeight: 450
    },
    [theme.breakpoints.up('lg')]: {
      maxHeight: 650
    }
  },
  table: {
    width: '100%',
    backgroundColor: 'transparent',
    borderSpacing: 0,
    borderCollapse: 'collapse'
  },
  hasFilterBlur: {
    filter: 'blur(15px)'
  },
  tableResponsive: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto'
  }
});

export default styles;
