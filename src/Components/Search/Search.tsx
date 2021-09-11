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
        let filters: NodeListOf<Element> = document.querySelectorAll(
            "input[type='radio']"
        );
        filters.forEach((item) => {
            if (item.getAttribute("value") === "title") {
                item.setAttribute("checked", "true");
            }
        });
    }, []);

    useEffect(() => {
        changeFilter(currentFilter);
    }, [currentFilter]);

    return (
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
            <div className="row">
                <div className="col-6">
                    <div className="search-filters">
                        <span className="search-filters__headerer">
                            search by
                        </span>
                        <div className="search-filters__list">
                            <div className="search-filters__item">
                                <input
                                    type="radio"
                                    name="search-filters"
                                    value="title"
                                    onChange={(e) =>
                                        setCurrentFilter(e.target.value)
                                    }
                                    id="title-filter"
                                />
                                <label htmlFor="title-filter">Title</label>
                            </div>
                            <div className="search-filters__item">
                                <input
                                    type="radio"
                                    name="search-filters"
                                    value="genre"
                                    onChange={(e) =>
                                        setCurrentFilter(e.target.value)
                                    }
                                    id="genre-filter"
                                />
                                <label htmlFor="genre-filter">Genre</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <button
                        onClick={() => searchHandler(this, currentSearchQuery)}
                        className="search-btn btn-red"
                    >
                        search
                    </button>
                </div>
            </div>
        </div>
    );
};
export default Search;
