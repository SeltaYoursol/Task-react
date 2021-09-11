import React, { FC, useEffect, useState } from "react";
import FilmCard from "../../Components/FilmCard/FilmCard";
import Loader from "../../Components/Loader/Loader";
import Search from "../../Components/Search/Search";

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
    filmList: FilmItem[];
    openDetail: (id: number) => void;
}

const emptyStyle = {
    fontSize: "60px",
    margin: "20% 0",
    fontFamily: "Arial",
    textAlign: "center",
} as const;

const Main: FC<Props> = ({ filmList, openDetail }) => {
    const [isLoading, setLoading] = useState<boolean>(false);
    const [emptyResult, setEmptyResult] = useState<boolean>(false);
    const [currentFilmList, setCurrentFilmList] = useState<FilmItem[]>([]);
    const [currentSearchFilter, setCurrentSearchFilter] =
        useState<string>("title");

    const filmsItems = currentFilmList.map((film) => (
        <FilmCard film={film} key={film.id} openDetail={openDetail} />
    ));
    useEffect(() => {
        setCurrentFilmList(filmList);
    }, []);

    const changeFilter = (currentFilter: string): void => {
        setCurrentSearchFilter(currentFilter);
    };

    const searchHandler = (e: React.MouseEvent, title: string) => {
        setLoading(true);
        setCurrentFilmList(filmSearch(currentSearchFilter, title));
    };

    const filmSearch = (filter: string, query: string): FilmItem[] => {
        let result: any = [];
        if (!filter) {
            filter = "title";
        }
        let re = new RegExp(query, "gi");

        if (filter === "genre") {
            filmList.forEach((item) => {
                if (item.genres.join().match(re)) {
                    result.push(item);
                }
            });
        } else if (filter === "title") {
            filmList.forEach((item) => {
                if (item.title.match(re)) {
                    result.push(item);
                }
            });
        }
        setTimeout(() => {
            if (result.length) {
                setEmptyResult(false);
            } else {
                setEmptyResult(true);
            }
            setLoading(false);
        }, 2000);
        return result;
    };

    return (
        <div className="main">
            <Search searchHandler={searchHandler} changeFilter={changeFilter} />
            {isLoading && <Loader />}
            {!isLoading &&
                (emptyResult ? (
                    <div style={emptyStyle}>No films found</div>
                ) : (
                    <div className="films-list">{filmsItems}</div>
                ))}
        </div>
    );
};
export default Main;
