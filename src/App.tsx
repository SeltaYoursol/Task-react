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
    const [appData, setData] = useState<FilmItem[]>([]);
    const [film, setFilmData] = useState<FilmItem>();
    const [detailState, setDetailState] = useState<boolean>(false);
    const getFilm = async (): Promise<any> => {
        setLoading(true);
        try {
            const response = await axios(
                `https://reactjs-cdp.herokuapp.com/movies/${currentFilmId}`
            );
            setFilmData(response.data.data);
            console.log(response);
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        } catch (e) {
            console.error(e.message);
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        }
    };
    const openDetail: React.MouseEventHandler<HTMLDivElement> = (e) => {
        setCurrentFilmId(337167);
        setDetailState(true);
        getFilm();
    };
    useEffect(() => {
        const getAllFilms = async (): Promise<any> => {
            try {
                const result = await axios(
                    "https://reactjs-cdp.herokuapp.com/movies"
                );
                if (result) {
                    setData(result.data.data);
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
            <Header />
            {isLoading && <Loader />}
            {!isLoading &&
                (detailState ? (
                    <Detail film={film} filmList={...appData} />
                ) : (
                    <Home data={...appData} openDetail={openDetail} />
                ))}
        </div>
    );
}
export default App;
