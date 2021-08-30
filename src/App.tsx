import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Detail from "Pages/Detail/Detail";
import Main from "Pages/Main/Main";
import axios from "axios";

interface FilmItem {
    [key: string]: string | number | Array<string>;
}

interface FilmList {
    data: Array<{ [index: number]: FilmItem }>;
}

function App() {
    const [appData, setData] = useState<FilmList | null>();
    useEffect(() => {
        const fetchData = async (): Promise<any> => {
            const result = await axios(
                "https://reactjs-cdp.herokuapp.com/movies"
            );
            setData(result.data.data);
        };

        fetchData();
    }, []);
    console.log();
    return (
        <Router>
            <div>
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
                    <Route path="/about">
                        <Main />
                    </Route>
                    <Route path="/detail">
                        <Detail data={appData.data} />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}
export default App;
