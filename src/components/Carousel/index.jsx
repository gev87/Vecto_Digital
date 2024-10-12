import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import DB from "../../database";
import styles from "./Carousel.module.css";
import { Box } from "@mui/material";
import PropTypes from "prop-types";

function Carousel({ selectMovie }) {
	const lastSelectedMovieId = sessionStorage.getItem("movieId");
	const { TendingNow: trending } = DB;
	let trendingMovies = [];
	if (lastSelectedMovieId) {
		let lastSelectedMovie = trending.find((movie) => movie.Id === lastSelectedMovieId);

		if (lastSelectedMovie) {
			const otherMovies = trending.filter(({ Id }) => Id !== lastSelectedMovie.Id);
			trendingMovies = [lastSelectedMovie, ...otherMovies];
		}
	} else {
		trendingMovies = [...trending].sort((a, b) => new Date(b.Date) - new Date(a.Date));
	}

	return (
		<Box className={styles.mySwiper}>
			<Swiper
				grabCursor
				slidesPerView={8}
				spaceBetween={10}
				scrollbar={{
					el: ".swiper-scrollbar",
					draggable: true,
				}}
				coverflowEffect={{
					rotate: 0,
					stretch: 0,
					depth: 200,
					modifier: 1,
				}}
				pagination={{
					clickable: true,
				}}
			>
				{trendingMovies.slice(0, 50).map((movie) => {
					return (
						<SwiperSlide key={movie.Id}>
							<img
								onClick={() => selectMovie(movie)}
								alt="background"
								src={`/assets/images/${movie.CoverImage}`}
							/>
						</SwiperSlide>
					);
				})}
			</Swiper>
		</Box>
	);
}

Carousel.propTypes = {
	selectMovie: PropTypes.func.isRequired,
};

export default Carousel;
