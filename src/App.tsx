import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Detail from "Pages/Detail/Detail";
import Main from "Pages/Main/Main";
import axios from "axios";

interface FilmItem {
    budjet: number;
    genres: Array<string>;
    id: number;
    overview: string;
    title:string;
    poster_path: string;
    release_date: string;
    revenue: number;
    runtime: number;
    tagline: string;
    vote_averange: number;
    vote_count: number;
}

function App() {
    let id: number;
    const [appData, setData] = useState<FilmItem[]>([]);
    useEffect(() => {
        const getAllFilms = async (): Promise<any> => {
            const result = await axios(
                "https://reactjs-cdp.herokuapp.com/movies"
            );
            setData(result.data.data);
            id = result.data.data[0].id;
        };

        getAllFilms();
    }, []);

    return (
        <Router>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/detail">About</Link>
                    </li>
                </ul>
            </nav>
            <Switch>
                <Route path="/">
                    <Main data={...appData} />
                </Route>
                <Route path="/detail">
                    <Detail id={id} filmList={...appData} />
                </Route>
            </Switch>
        </Router>
    );
}
export default App;
