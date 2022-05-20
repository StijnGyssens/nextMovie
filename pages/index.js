import axios from "axios";
import Link from "next/link";

const index = ({ movies }) => {
  return (
    <main>
      <h1>Weekly popular movies</h1>
      <section className="moviegrid">
        {movies.map(({ title, id, poster_path }) => (
          <Link key={id} href={`/movie/${id}`}>
            <article>
              <a>
                <img
                  src={`https://image.tmdb.org/t/p/w300/${poster_path}`}
                  alt={title}
                />
                <p>{title}</p>
              </a>
            </article>
          </Link>
        ))}
      </section>
    </main>
  );
};

export const getStaticProps = async () => {
  const {
    data: { results: movies },
  } = await axios(
    "https://api.themoviedb.org/3/trending/movie/week?api_key=83fb7a5701722d68bbdd02fc13473692"
  );

  return {
    props: {
      movies,
    },
    revalidate: 60 * 60,
  };
};

export default index;
