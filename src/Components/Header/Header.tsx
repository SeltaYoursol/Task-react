import React, { FC } from "react";
import Search from "../Search/Search";

interface Props {
    searchHandler: (
        e: React.MouseEvent<HTMLButtonElement>,
        title: string
    ) => void;
    changeFilter: (currentFilter: string) => void;
}

const Header: FC<Props> = ({changeFilter,searchHandler}) => {
   

    return (
        <div className="header">
            <div className="logo">netflixroulett</div>
            <Search searchHandler={searchHandler} changeFilter={changeFilter} />
        </div>
    );
};
export default Header;
