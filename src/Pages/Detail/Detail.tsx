import React, { FC, useEffect, useState } from "react";
import FilmCard from "../../Components/FilmCard/FilmCard";

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
    openDetail: (id: number) => void;
}

const Detail: FC<Props> = ({ film, filmList, openDetail }) => {
    const [currentGenres, setGenre] = useState<string[]>(film.genres);
    const [currentFilmList, setFilmList] = useState<FilmItem[]>(filmList);

    let arr: Array<string[]> = [];
    filmList.forEach((item) => {
        arr.push(item.genres);
    });

    useEffect(() => {
        setGenre(film.genres);
    }, []);

    useEffect(() => {
        let result: FilmItem[] = [];

        filmList.forEach((item) => {
            let difference = item.genres.filter((x) =>
                currentGenres.includes(x)
            );
            if (difference.length) {
                result.push(item);
            }
        });

        setFilmList(result);
    }, [currentGenres]);
    return (
        <div className="detail">
            <div className="detail-card">
                <div className="detail-card__poster"></div>
                <div className="detail-card-description">
                    <div className="description__title">{film.title}</div>
                    <div className="description__categories">
                        {film.genres.join(", ")}
                    </div>
                    <div className="description__year">
                        {film.release_date.slice(0, 4)}
                    </div>
                    <div className="description__timing">{film.runtime}</div>
                    <div className="description__description">
                        {film.overview}
                    </div>
                </div>
            </div>
            <div className="detail-same-films">
                <div className="detail-same-films__header">
                    Films by {currentGenres.join(", ")}
                </div>
                <div className="detail-same-films__list">
                    {currentFilmList.map((filmItem) => (
                        <FilmCard
                            film={filmItem}
                            key={filmItem.id}
                            openDetail={openDetail}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
export default Detail;
