import React from "react";
import './progress.css';
const ProgressBar = (props) => {
    const { percent = 0 } = props;
    return (
        <div className="container">
            <div style={{ width: `${percent}%`, backgroundColor: 'yellow' }} >
                <span>{`${percent}%`}</span>
            </div>
        </div>
    );

}
export default ProgressBar;