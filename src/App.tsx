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
    const [empryResult, setEmptyResult] = useState<boolean>(false);
    const [filmList, setFilmList] = useState<FilmItem[]>([]);
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
        filmSearch(currentSearchFilter, title);
    };

    const filmSearch = (filter: string, query: string): FilmItem[] => {
        let result: FilmItem[];
        if (!filter) {
            filter = "title";
        }
        switch (filter) {
            case "genre":
                result = filmList.filter((item) => {
                    item.genres.includes(query);
                });
                break;
            case "title":
                let re = new RegExp(query, "gi");
                console.log(re);
                result = filmList.filter((item) => {
                    item.title.search(re);
                });
                break;
        }
        return result;
    };

    useEffect(() => {}, [currentSearchFilter]);

    useEffect(() => {
        const getAllFilms = async (): Promise<any> => {
            try {
                const result = await axios(
                    "https://reactjs-cdp.herokuapp.com/movies"
                );
                if (result) {
                    setFilmList(result.data.data);
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

    return (
        <div>
            <Header searchHandler={searhHandler} changeFilter={changeFilter} />
            {empryResult && <div>No films found</div>}
            {isLoading && <Loader />}
            {!isLoading &&
                (detailState ? (
                    <Detail
                        film={film}
                        filmList={...filmList}
                        openDetail={openDetail}
                    />
                ) : (
                    <Home data={...filmList} openDetail={openDetail} />
                ))}
        </div>
    );
}
export default App;
