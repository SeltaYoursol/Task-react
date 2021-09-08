import React, { FC, useEffect, useState } from "react";
import FilmCard from "../../Components/FilmCard/FilmCard";
import axios from "axios";
interface FilmItem {
    budjet: number;
    title:string;
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
    id: number;
    filmList: FilmItem[];
}

const Detail: FC<Props> = ({ id, filmList }) => {
    const [filmData, setData] = useState<FilmItem>();
    const [currentGenre, setGenre] = useState<string[]>();
    const [currentFilmList, setFilmList] = useState<FilmItem[]>();
    useEffect(() => {
        const getFilm = async (): Promise<any> => {
            const result = await axios(
                `https://reactjs-cdp.herokuapp.com/movies/${id}`
            );
            setData(result.data.data);
            setGenre(result.data.data.genres);
            setFilmList(
                filmList.filter((film) => film.genres === currentGenre)
            );
        };
        getFilm();
    }, []);
    console.log(currentGenre);
    return (
        <div className="detail">
            <div className="detail-card">
                <div className="detail-card__poster">{filmData}</div>
                <div className="detail-card-description">
                    <div className="description__title"></div>
                    <div className="description__categories"></div>
                    <div className="description__year"></div>
                    <div className="description__timing"></div>
                    <div className="description__description"></div>
                </div>
            </div>
            <div className="detail-same-films">
                <div className="detail-same-films__header"></div>
                <div className="detail-same-films__list">
                    {currentFilmList.map((film) => (
                        <FilmCard film={film} key={film.id} />
                    ))}
                </div>
            </div>
        </div>
    );
};
export default Detail;
