import React, { FC } from "react";
interface Props {
    searchHandle: (e:  React.MouseEvent<HTMLButtonElement>, title: string) => void;
}

const Search: FC<Props> = ({ searchHandle }) => {
    const changeFilters = (event: any) => {
        console.log(event.target.checked);
    };

    return (
        <div className="search">
            <button className="search-btn btn-white">Search</button>
            <div className="search-field">
                <div className="search-form">
                    <label htmlFor="search-field">Find your movie</label>
                    <input type="search" id="seach-field" />
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
                                checked
                                onChange={changeFilters}
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
                                onChange={changeFilters}
                                id="genres-filter"
                            />
                        </div>
                    </div>
                </div>
                <button onClick={()=>searchHandle(this,'title')} className="search-btn btn-red">
                    search
                </button>
            </div>
        </div>
    );
};
export default Search;
