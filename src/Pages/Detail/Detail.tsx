import React from "react";
import FilmCard from "../../Components/FilmCard/FilmCard";
interface FilmItem {
    [key: string]: string | number | Array<string>;
}

interface FilmList {
    data: Array<{ [index: number]: FilmItem }>;
}

const Detail = ({ data }: FilmList) => {
    console.log(data);
    return (
        <div className="detail">
            <div className="detail-card">
                {data}
                <div className="detail-card__poster"></div>
                <div className="detail-card-description">
                    <div className="description__title"></div>
                    <div className="description__categories"></div>
                    <div className="description__year"></div>
                    <div className="description__timing"></div>
                    <div className="description__description"></div>
                </div>
            </div>
            <div className="detail-same-films">
                <div className="detail-same-films__header"></div>
                <div className="detail-same-films__list">
                    <FilmCard />
                </div>
            </div>
        </div>
    );
};
export default Detail;
