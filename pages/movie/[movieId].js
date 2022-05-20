import axios from "axios";
import Link from "next/link";

const Detail = ({ movie: { title, overview, poster_path, release_date } }) => {
  return (
    <main className="detail">
      <h1>Movie detail</h1>
      <img src={`https://image.tmdb.org/t/p/w400/${poster_path}`} alt={title} />
      <h2>{title}</h2>
      <p>release date: {release_date}</p>
      <p>Overview: {overview}</p>
      <Link href={"/"}>
        <button>homepage</button>
      </Link>
    </main>
  );
};

export const getStaticPaths = async () => {
  const {
    data: { results: movies },
  } = await axios(
    "https://api.themoviedb.org/3/trending/movie/week?api_key=83fb7a5701722d68bbdd02fc13473692"
  );
  return {
    paths: movies.map(({ id }) => ({ params: { movieId: id.toString() } })),
    fallback: "blocking",
  };
};

export const getStaticProps = async (ctx) => {
  const id = ctx.params.movieId;
  const { data: movie } = await axios(
    `https://api.themoviedb.org/3/movie/${id}?api_key=83fb7a5701722d68bbdd02fc13473692&language=en-US`
  );

  return {
    props: {
      movie,
    },
    revalidate: 60 * 60,
  };
};

export default Detail;
