import React, { useEffect, useState } from "react";
import Detail from "Pages/Detail/Detail";
import Home from "Pages/Home/Home";
import axios from "axios";
import Loader from "../src/Components/Loader/Loader";

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
    const [filmList, setFilmList] = useState<FilmItem[]>([]);
    const [film, setFilmData] = useState<FilmItem>();
    const [detailState, setDetailState] = useState<boolean>(false);

    const getFilm = (id: number) => {
        setLoading(true);
        axios(`https://reactjs-cdp.herokuapp.com/movies/${id}`)
            .then((response) => {
                setFilmData(response.data);
                setTimeout(() => {
                    setLoading(false);
                    setDetailState(true);
                }, 2000);
            })
            .catch((err) => {
                console.error(err.message);
                setTimeout(() => {
                    setLoading(false);
                }, 2000);
            });
    };
    const openDetail = (id: number) => {
        getFilm(id);
    };

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
        <>
            {isLoading && <Loader />}
            {!isLoading &&
                (detailState ? (
                    <Detail
                        film={film}
                        filmList={...filmList}
                        openDetail={openDetail}
                    />
                ) : (
                    <Home filmList={...filmList} openDetail={openDetail} />
                ))}
        </>
    );
}
export default App;
