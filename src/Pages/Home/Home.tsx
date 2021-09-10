import React, { FC } from "react";
import FilmCard from "../../Components/FilmCard/FilmCard";
// import { BrowserRouter as  Link } from "react-router-dom";

interface FilmItem {
    budjet: number;
    genres: Array<string>;
    title: string;
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
    openDetail: (id: number) => void;
}

const Main: FC<Props> = ({ data, openDetail }) => {
    const filmsItems = data.map((film) => (
        <FilmCard film={film} key={film.id} openDetail={openDetail} />
    ));
    return (
        <div className="main">
            <div className="films-list">{filmsItems}</div>{" "}
        </div>
    );
};
export default Main;
