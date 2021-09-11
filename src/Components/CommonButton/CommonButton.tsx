import React, { FC } from "react";
interface Props {
    color: string;
    text: string;
    clickHandler: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
const CommonButton: FC<Props> = ({ color, text, clickHandler }) => {
    return (
        <>
            <button
                onClick={() => clickHandler(this)}
                className={`btn btn-${color}`}
            >
                {text}
            </button>
        </>
    );
};
export default CommonButton;
