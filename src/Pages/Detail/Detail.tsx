// import React, { FC, useEffect, useState } from "react";
// import FilmCard from "../../Components/FilmCard/FilmCard";
// import axios from "axios";
// interface FilmItem {
//     budjet: number;
//     title: string;
//     genres: Array<string>;
//     id: number;
//     overview: string;
//     poster_path: string;
//     release_date: string;
//     revenue: number;
//     runtime: number;
//     tagline: string;
//     vote_averange: number;
//     vote_count: number;
// }
// interface Props {
//     id: number;
//     filmList: FilmItem[];
//     openDetail: React.MouseEventHandler<HTMLDivElement>;
// }

// const Detail: FC<Props> = ({ id, filmList, openDetail }) => {
//     const [film, setData] = useState<FilmItem | null>(null);
//     const [currentGenres, setGenre] = useState<string[]>();
//     const [currentFilmList, setFilmList] = useState<FilmItem[]>(filmList);

//     useEffect(() => {
//         const getFilm = async (): Promise<any> => {
//             try {
//                 const response = await axios(
//                     `https://reactjs-cdp.herokuapp.com/movies/${id}`
//                 );
//                 setData(response.data.data);
//             } catch (e) {
//                 console.error(e.message);
//             }
//         };
//         getFilm();
//     }, []);

//     useEffect(() => {
//         setGenre(film.genres);
//     }, [film]);

//     useEffect(() => {
//         let result = filmList.filter((film) => {
//             return film.genres.join() === currentGenres.join();
//         });
//         setFilmList(result);
//     }, [currentGenres]);

//     return (
//         <div className="detail">
//             <div className="detail-card">
//                 <div
//                     className="detail-card__poster"

//                 ></div>
//                 <div className="detail-card-description">
//                     <div className="description__title">{film.title}</div>
//                     <div className="description__categories">
//                         {film.genres.join(", ")}
//                     </div>
//                     <div className="description__year">
//                         {film.release_date.slice(0, 4)}
//                     </div>
//                     <div className="description__timing">{film.runtime}</div>
//                     <div className="description__description">
//                         {film.overview}
//                     </div>
//                 </div>
//             </div>
//             <div className="detail-same-films">
//                 <div className="detail-same-films__header">
//                     {" "}
//                     Films by {currentGenres.join(", ")}
//                 </div>
//                 <div className="detail-same-films__list">
//                     {currentFilmList.map((filmItem) => (
//                         <FilmCard
//                             film={filmItem}
//                             key={filmItem.id}
//                             openDetail={openDetail}
//                         />
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };
// export default Detail;

import React, { FC} from "react";
interface FilmItem {
    budjet: number;
    title: string;
    genres: Array<string>;
    id: number;
    overview: string;
    poster_path: string;
    release_date: string;
    revenue: number;
    runtime: number;
    tagline: string;
    vote_averange: number;
    vote_count: number;
}
interface Props {
    film: FilmItem;
    filmList: FilmItem[];
}

const Detail: FC<Props> = ({ film, filmList }) => {
    // const [data, setData] = useState<FilmItem | null>(film);
    // const [currentGenres, setGenre] = useState<string[]>();
    // const [currentFilmList, setFilmList] = useState<FilmItem[]>(filmList);


    // useEffect(() => {
    //     setGenre(film.genres);
    // }, [film]);

    // useEffect(() => {
    //     let result = filmList.filter((film) => {
    //         return film.genres.join() === currentGenres.join();
    //     });
    //     setFilmList(result);
    // }, [currentGenres]);
    console.log(filmList, film)

    return (
        <div className="detail">
            
        </div>
    );
};
export default Detail;
