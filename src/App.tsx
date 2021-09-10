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
    const [currentFilmId, setCurrentFilmId] = useState<number>();
    const [empryResult, setEmptyResult] = useState<boolean>(false);
    const [filmList, setFilmList] = useState<FilmItem[]>([]);
    const [film, setFilmData] = useState<FilmItem>();
    const [detailState, setDetailState] = useState<boolean>(false);
    const [currentSearchFilter, setCurrentSearchFilter] =
        useState<string>("title");
    const getFilm = async (): Promise<any> => {
        setLoading(true);
        try {
            const response = await axios(
                `https://reactjs-cdp.herokuapp.com/movies/${currentFilmId}`
            );
            setFilmData(response.data.data);
            setTimeout(() => {
                setLoading(false);
                setDetailState(true);
                setEmptyResult(false);
            }, 2000);
        } catch (e) {
            console.error(e.message);
            setTimeout(() => {
                setLoading(false);
                setEmptyResult(true);
            }, 2000);
        }
    };
    const openDetail: React.MouseEventHandler<HTMLDivElement> = async (e) => {
        setCurrentFilmId(337167);
        await getFilm();
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
        console.log(filter);
        switch (filter) {
            case "genre":
                result = filmList.filter((item) => {
                    item.genres.includes(query);
                });
                break;
            case "title":
                let re = new RegExp(query);
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
                    setCurrentFilmId(result.data.data[0].id);
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
                    <Detail film={film} filmList={...filmList} />
                ) : (
                    <Home data={...filmList} openDetail={openDetail} />
                ))}
        </div>
    );
}
export default App;
