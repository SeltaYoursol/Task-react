import React, { FC } from "react";
interface Props {
    data: string;
}

const Search: FC<Props> = ({ data }) => {
    return (
        <div className="search">
            <button className="search-btn btn-white">Search</button>
            <div className="search-field">
                <div className="search-form">
                    <label htmlFor="search-field"></label>
                    <input type="text" id="seach-field" />
                </div>
                <div className="search-filters">
                    <span>search by</span>
                    <div className="search-filters__list">
                        <input
                            type="radio"
                            name="search-filters"
                            className="search-filters__item"
                            value="title"
                            checked
                        >
                            title
                        </input>
                        <input
                            type="radio"
                            name="search-filters"
                            value="genre"
                            className="search-filters__item"
                        >
                            genre
                        </input>
                    </div>
                </div>
                <div className="search-btn btn-red">search</div>
            </div>
        </div>
    );
};
export default Search;
