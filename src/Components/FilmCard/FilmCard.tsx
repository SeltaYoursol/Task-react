import React, { FC } from "react";
interface FilmItem {
    budjet: number;
    genres: Array<string>;
    id: number;
    title: string;
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
    openDetail: (id: number) => void;
}

const FilmCard: FC<Props> = ({ film, openDetail }) => {
    return (
        <div className="film-card" onClick={() => openDetail(film.id)}>
            <div className="film-card__img">
                <img src={film.poster_path} alt={film.tagline} />
            </div>
            <div className="film-card-description">
                <div className="film-card-description__title">{film.title}</div>
                <span className="film-card-description__year">
                    {film.release_date.slice(0, 4)}
                </span>
                <div className="film-card-description__genre">
                    {film.genres.join(", ")}
                </div>
            </div>
        </div>
    );
};
export default FilmCard;
