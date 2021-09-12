import React, { FC, useEffect, useState } from "react";
import FilmCard from "../../Components/FilmCard/FilmCard";
import CommonButton from "../../Components/CommonButton/CommonButton";
import Logo from "../../Components/Logo/Logo";

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
    openHomePage: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Detail: FC<Props> = ({ film, filmList, openDetail, openHomePage }) => {
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

    const clickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        openHomePage(this);
    };
    return (
        <div className="detail">
            <div className="header">
                <Logo />
                <CommonButton
                    text="Search"
                    color="white"
                    clickHandler={clickHandler}
                />
            </div>

            <div className="detail-card">
                <div className="detail-card-poster">
                    <img
                        className="detail-card-poster__img"
                        src={film.poster_path}
                        alt={film.tagline}
                    />
                </div>
                <div className="detail-card-description">
                    <h2 className="description__title">{film.title}</h2>
                    <div className="description__categories">
                        {film.genres.join(", ")}
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="description__year">
                                {film.release_date.slice(0, 4)}
                            </div>
                        </div>
                        <div className="col">
                            <div className="description__timing">
                                {film.runtime} min
                            </div>
                        </div>
                    </div>
                    <div className="description__description">
                        {film.overview}
                    </div>
                </div>
            </div>
            <div className="detail-same-films">
                <div className="detail-same-films__header-wrapper">
                    <div className="detail-same-films__header">Films by {currentGenres.join(", ")} genres</div>
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
