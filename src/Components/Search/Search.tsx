import React, { FC, useEffect, useState } from "react";
interface Props {
    searchHandler: (
        e: React.MouseEvent<HTMLButtonElement>,
        title: string
    ) => void;
    changeFilter: (currentFilter: string) => void;
}

const Search: FC<Props> = ({ searchHandler, changeFilter }) => {
    const [currentSearchQuery, setCurrentSearchQuery] = useState<string>("");
    const [currentFilter, setCurrentFilter] = useState<string>("");

    useEffect(() => {
        changeFilter(currentFilter);
    }, [currentFilter]);

    return (
        <div className="search">
            <button className="search-btn btn-white">Search</button>
            <div className="search-field">
                <div className="search-form">
                    <label htmlFor="search-field">Find your movie</label>
                    <input
                        type="search"
                        id="seach-field"
                        value={currentSearchQuery}
                        onChange={(e) => setCurrentSearchQuery(e.target.value)}
                    />
                </div>
                <div className="search-filters">
                    <span>search by</span>
                    <div className="search-filters__list">
                        <div className="search-filters__item">
                            <label htmlFor="title-filter">Title</label>
                            <input
                                type="radio"
                                name="search-filters"
                                className="search-filters__item"
                                value="title"
                                onChange={(e) =>
                                    setCurrentFilter(e.target.value)
                                }
                                id="title-filter"
                            />
                        </div>
                        <div className="search-filters__item">
                            <label htmlFor="genre-filter">Genre</label>
                            <input
                                type="radio"
                                name="search-filters"
                                value="genre"
                                className="search-filters__item"
                                onChange={(e) =>
                                    setCurrentFilter(e.target.value)
                                }
                                id="genre-filter"
                            />
                        </div>
                    </div>
                </div>
                <button
                    onClick={() => searchHandler(this, currentSearchQuery)}
                    className="search-btn btn-red"
                >
                    search
                </button>
            </div>
        </div>
    );
};
export default Search;
