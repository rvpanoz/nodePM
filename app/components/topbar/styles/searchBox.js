import { fade } from '@material-ui/core/styles/colorManipulator';

const styles = (theme) => {
  return {
    root: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      color: '#fff',
      backgroundColor: fade(theme.palette.common.white, 0.15),
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
      border: '1px solid',
    },
    searchIcon: {
      cursor: 'pointer',
      width: theme.spacing(1) * 6,
      height: '100%',
      position: 'absolute',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingLeft: theme.spacing(2),
      color: fade(theme.palette.common.white, 0.75),
      zIndex: 9999,
    },
    inputRoot: {
      width: '100%',
      fontFamily: 'inherit',
      fontSize: 20,
      lineHeight: '0.75em',
    },
    inputInput: {
      color: theme.palette.common.white,
      paddingLeft: theme.spacing(10),
      paddingRight: theme.spacing(10),
      transition: theme.transitions.create('width'),
      width: 175,
      '&:focus': {
        width: 320,
      },
    },
  };
};

export default styles;
