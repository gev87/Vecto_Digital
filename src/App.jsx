import { useState } from "react";
import Carusel from "./components/Carousel";
import MyDrawer from "./components/Drawer";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import ReactPlayer from "react-player";
import DB  from "./database";
import styles from "./App.module.css";

export default function HomePage() {
	const [playVideo, setPlayVideo] = useState(false);
	const { Featured: featuredMovie } = DB;
	const [featured, setFeatured] = useState(featuredMovie);
	const durationByMinutes = Math.trunc(featured.Duration / 60);
	const hours = Math.trunc(durationByMinutes / 60);
	const minutes = durationByMinutes - hours * 60;
	const shortInfo = `${featured.ReleaseYear} ${featured.MpaRating} ${hours}h ${minutes}m`;

	const handleMovieSelect = (movie) => {
		setFeatured(movie);
		setPlayVideo(false);
		setTimeout(setPlayVideo, "2000", true);
		sessionStorage.setItem("movieId", movie.Id);
	};

	return (
		<Box component="main" className={styles.mainContainer}>
			<CssBaseline />
			<MyDrawer />
			{playVideo ? (
				<Box className={styles.playVideoBox}>
					<ReactPlayer
						url={featured.VideoUrl}
						playing
						width="100%"
						height="100%"
						onEnded={() => setPlayVideo(false)}
					/>
				</Box>
			) : (
				<Box
					className={styles.backgroundBox}
					style={{ backgroundImage: `url(/assets/images/${featured.CoverImage})` }}
				>
					<Box component="main" className={styles.featuredMain}>
						<Typography variant="button" className={styles.featuredCategory}>
							{featured.Category}
						</Typography>
						<img
							src="/assets/images/FeaturedTitleImage.png"
							alt="Title Image"
							className={styles.titleImage}
						/>
						<Typography mb={3} variant="h6">
							{shortInfo}
						</Typography>
						<Typography>{featured.Description}</Typography>
						<Box className={styles.buttonWrapper}>
							<Button variant="contained" className={styles.playButton}>
								<PlayArrowIcon />
								Play
							</Button>
							<Button variant="contained" className={styles.moreInfoButton}>
								More Info
							</Button>
						</Box>
						<Typography variant="h5" className={styles.trendingNow}>
							Trending Now
						</Typography>
					</Box>
				</Box>
			)}

			<Box className={styles.caruselBox}>
				<Carusel selectMovie={handleMovieSelect} />
			</Box>
		</Box>
	);
}
