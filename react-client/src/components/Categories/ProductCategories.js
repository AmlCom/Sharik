import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import LayoutBody from './LayoutBody';
import Typography from './Typography';

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 8,
    marginBottom: theme.spacing.unit * 4,
  },
  images: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexWrap: 'wrap',
  },
  imageWrapper: {
    position: 'relative',
    display: 'block',
    padding: 0,
    borderRadius: 0,
    height: '40vh',
    [theme.breakpoints.down('sm')]: {
      width: '100% !important',
      height: 100,
    },
    '&:hover': {
      zIndex: 1,
    },
    '&:hover $imageBackdrop': {
      opacity: 0.15,
    },
    '&:hover $imageMarked': {
      opacity: 0,
    },
    '&:hover $imageTitle': {
      border: '4px solid currentColor',
    },
  },
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    background: theme.palette.common.black,
    opacity: 0.5,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px ${theme.spacing.unit + 6}px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    background: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
});

function ProductCategories(props) {
  const { classes } = props;

  const images = [
    {
      url:
        'data:image/jpeg;base64,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',
      title: 'Teaching',
      width: '40%',
    },
    {
      url:
        'https://images.unsplash.com/photo-1531299204812-e6d44d9a185c?auto=format&fit=crop&w=400&q=80',
      title: 'Massage',
      width: '20%',
    },
    {
      url:
        'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=400&q=80',
      title: 'Hiking',
      width: '40%',
    },
    {
      url:
        'https://images.unsplash.com/photo-1453747063559-36695c8771bd?auto=format&fit=crop&w=400&q=80',
      title: 'Tour',
      width: '38%',
    },
    {
      url:
        'https://images.unsplash.com/photo-1523309996740-d5315f9cc28b?auto=format&fit=crop&w=400&q=80',
      title: 'Gastronomy',
      width: '38%',
    },
    {
      url:
        'https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?auto=format&fit=crop&w=400&q=80',
      title: 'Shopping',
      width: '24%',
    },
    {
      url:
        'https://images.unsplash.com/photo-1506941433945-99a2aa4bd50a?auto=format&fit=crop&w=400&q=80',
      title: 'Walking',
      width: '40%',
    },
    {
      url:
        'https://images.unsplash.com/photo-1533727937480-da3a97967e95?auto=format&fit=crop&w=400&q=80',
      title: 'Fitness',
      width: '20%',
    },
    {
      url:
        'https://images.unsplash.com/photo-1518136247453-74e7b5265980?auto=format&fit=crop&w=400&q=80',
      title: 'Reading',
      width: '40%',
    },
  ];

  return (
    
    <LayoutBody className={classes.root} component="section" width="large">
      <Typography variant="h4" marked="center" align="center" component="h2">
    
        For all tastes and all desires 

        <br/>
        <br/>
        <a href="./" className="badge badge-info">Create Service</a>

        <br/>
      </Typography>
      <div className={classes.images}>
        {images.map(image => (
          <ButtonBase
            key={image.title}
            className={classes.imageWrapper}
            style={{
              width: image.width,
            }}
          >
            <div
              className={classes.imageSrc}
              style={{
                backgroundImage: `url(${image.url})`,
              }}
            />
            <div className={classes.imageBackdrop} />
            <div className={classes.imageButton}>
              <Typography
                component="h3"
                variant="h6"
                color="inherit"
                className={classes.imageTitle}
              >
                {image.title}
                <div className={classes.imageMarked} />
              </Typography>
            </div>
          </ButtonBase>
        ))}
      </div>
    </LayoutBody>
  );
}

ProductCategories.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductCategories);