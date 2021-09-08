import React, { FC } from "react";
import FilmCard from "../../Components/FilmCard/FilmCard";

interface FilmItem {
    budjet: number;
    genres: Array<string>;
    title:string;
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
    data: FilmItem[];
}

const Main: FC<Props> = ({ data }) => {
    const filmsItems = data.map((film) => (
        <FilmCard film={film} key={film.id} />
    ));
    return (
        <div className="main">
            <div className="films-list">{filmsItems}</div>{" "}
        </div>
    );
};
export default Main;
