import React from 'react';
import { Fade } from 'react-slideshow-image';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import $ from 'jquery';

const fadeImages = [
	'https://i.ytimg.com/vi/B1rjSaOIm-s/maxresdefault.jpg',
	'https://i.ytimg.com/vi/kCMYfcjqlvI/maxresdefault.jpg',
	'https://i.ytimg.com/vi/exKU5fxQkF8/hqdefault.jpg'


];

const fadeProperties = {
	duration: 1000,
	transitionDuration: 500,
	infinite: true,
	indicators: true,
	height: 20
}


const Slideshow = (props) => {
	const { classes } = props;
	return (
		<Fade {...fadeProperties}>

			<div className="each-fade">

				<Card className={classes.card}>
					<CardActionArea>
						<CardMedia
							className={classes.media}
							image="//i.ytimg.com/vi/B1rjSaOIm-s/maxresdefault.jpg"
							title="Contemplative Reptile"
						/>
						<div className="image-container">
							<a href="http://localhost:3000/about">
								<img src={fadeImages[0]} />
							</a>
						</div>
						<CardContent>
							<Typography gutterBottom variant="h5" component="h2">Math</Typography>
							<Typography component="p">
								Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
								across all continents except Antarctica
          					</Typography>
						</CardContent>
					</CardActionArea>
					<CardActions>
						<Button size="small" color="primary">Share</Button>
						<Button size="small" color="primary">Learn More </Button>
					</CardActions>
				</Card>

			</div>


			<Card className={classes.card}>
				<CardActionArea>
					<CardMedia
						className={classes.media}
						image="//i.ytimg.com/vi/B1rjSaOIm-s/maxresdefault.jpg"
						title="Contemplative Reptile"
					/>
					<div className="each-fade">
						<div className="image-container">
							<a href="http://localhost:3000/signin">
								<img src={fadeImages[1]} />
							</a>
						</div>
					</div>
					<CardContent>
						<Typography gutterBottom variant="h5" component="h2">English</Typography>
						<Typography component="p">
							Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
							across all continents except Antarctica
          				</Typography>
					</CardContent>
				</CardActionArea>
				<CardActions>
					<Button size="small" color="primary">Share</Button>
					<Button size="small" color="primary">Learn More</Button>
				</CardActions>
			</Card>

			<Card className={classes.card}>
				<CardActionArea>
					<CardMedia
						className={classes.media}
						image="//i.ytimg.com/vi/B1rjSaOIm-s/maxresdefault.jpg"
						title="Contemplative Reptile"
					/>
					<div className="each-fade">
						<div className="image-container">
							<a href="http://localhost:3000/signin">
								<img src={fadeImages[2]} />
							</a>
						</div>
					</div>
					<CardContent>
						<Typography gutterBottom variant="h5" component="h2">Biology</Typography>
						<Typography component="p">
							Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
							across all continents except Antarctica
          				</Typography>
					</CardContent>
				</CardActionArea>
				<CardActions>
					<Button size="small" color="primary">Share</Button>
					<Button size="small" color="primary">Learn More</Button>
				</CardActions>
			</Card>
		</Fade>
	)
}

export default withStyles(styles)(Slideshow)

const styles = theme => ({
	card: {
		display: 'flex',
	},
	details: {
		display: 'flex',
		flexDirection: 'column',
	},
	content: {
		flex: '1 0 auto',
	},
	cover: {
		width: 151,
	},
	controls: {
		display: 'flex',
		alignItems: 'center',
		paddingLeft: theme.spacing.unit,
		paddingBottom: theme.spacing.unit,
	},
	playIcon: {
		height: 38,
		width: 38,
	},
	card: {
		maxWidth: 200,
	  },
	  media: {
		height: 140,
	  },
});