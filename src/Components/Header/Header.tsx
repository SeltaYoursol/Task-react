import React, { FC } from "react";
import Search from "../Search/Search";

const Header: FC = () => {
    const searhHandler = (e: React.MouseEvent, title: string) => {
        console.log(e, title);
     };

    return (
        <div>
            <div className="logo"></div>
            <Search searchHandle={searhHandler} />
        </div>
    );
};
export default Header;
