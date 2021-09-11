import React, { FC, useState } from "react";
import Search from "../Search/Search";

interface Props {
    searchHandler: (
        e: React.MouseEvent<HTMLButtonElement>,
        title: string
    ) => void;
    changeFilter: (currentFilter: string) => void;
}

const Header: FC<Props> = ({ changeFilter, searchHandler }) => {
    const [showSeacrhField, setShowSearchField] = useState<boolean>(false);

    return (
        <div className={`header ${showSeacrhField ? 'header--wide': ''}`}>
            <div className="logo">netflixroulett</div>
            {!showSeacrhField && (
                <button
                    className="search-btn btn-white"
                    onClick={() => {setShowSearchField(true)}}
                >
                    Search
                </button>
            )}
            {showSeacrhField && (
                <Search
                    searchHandler={searchHandler}
                    changeFilter={changeFilter}
                />
            )}
        </div>
    );
};
export default Header;
