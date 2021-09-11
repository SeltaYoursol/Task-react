import React, { useEffect, useState } from "react";
import Detail from "Pages/Detail/Detail";
import Home from "Pages/Home/Home";
import axios from "axios";
import Loader from "../src/Components/Loader/Loader";
import Header from "./Components/Header/Header";

interface FilmItem {
    budjet: number;
    genres: Array<string>;
    id: number;
    overview: string;
    title: string;
    poster_path: string;
    release_date: string;
    revenue: number;
    runtime: number;
    tagline: string;
    vote_averange: number;
    vote_count: number;
}

function App() {
    const [isLoading, setLoading] = useState<boolean>(true);
    const [emptyResult, setEmptyResult] = useState<boolean>(false);
    const [filmList, setFilmList] = useState<FilmItem[]>([]);
    const [currentFilmList, setCurrentFilmList] = useState<FilmItem[]>([]);
    const [film, setFilmData] = useState<FilmItem>();
    const [detailState, setDetailState] = useState<boolean>(false);
    const [currentSearchFilter, setCurrentSearchFilter] =
        useState<string>("title");
    const getFilm = (id: number) => {
        setLoading(true);
        axios(`https://reactjs-cdp.herokuapp.com/movies/${id}`)
            .then((response) => {
                setFilmData(response.data);
                setTimeout(() => {
                    setLoading(false);
                    setDetailState(true);
                    setEmptyResult(false);
                }, 2000);
            })
            .catch((err) => {
                console.error(err.message);
                setTimeout(() => {
                    setLoading(false);
                    setEmptyResult(true);
                }, 2000);
            });
    };
    const openDetail = (id: number) => {
        getFilm(id);
    };

    const changeFilter = (currentFilter: string): void => {
        setCurrentSearchFilter(currentFilter);
    };

    const searhHandler = (e: React.MouseEvent, title: string) => {
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

    useEffect(() => {
        const getAllFilms = async (): Promise<any> => {
            try {
                const result = await axios(
                    "https://reactjs-cdp.herokuapp.com/movies"
                );
                if (result) {
                    setFilmList(result.data.data);
                    setCurrentFilmList(result.data.data);
                    setTimeout(() => {
                        setLoading(false);
                    }, 2000);
                }
            } catch (e) {
                setLoading(false);
                console.error(e);
            }
        };
        getAllFilms();
    }, []);

    const emptyStyle = {
        fontSize: "60px",
        margin: "20% 0",
        fontFamily: "Arial",
        textAlign: "center",
    } as const;

    return (
        <div>
            <Header searchHandler={searhHandler} changeFilter={changeFilter} />
            {emptyResult && <div style={emptyStyle}>No films found</div>}
            {isLoading && <Loader />}
            {!isLoading &&
                (detailState ? (
                    <Detail
                        film={film}
                        filmList={...filmList}
                        openDetail={openDetail}
                    />
                ) : (
                    <Home data={...currentFilmList} openDetail={openDetail} />
                ))}
        </div>
    );
}
export default App;
