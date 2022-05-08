import React from 'react';

const Stars = ({ difficulty }) => {
const showStars = difficulty === 'easy' ? 1 : difficulty === 'medium' ? 2 : 3;

const emptyStarts =  5 - showStars;

    return (
        <div>                         
        {[...new Array(showStars)].map((_,index) => {
          return (
            <span className="fa fa-star checked" key={index}></span>
          )
         })}
         {[...new Array(emptyStarts)].map((_,index) => {
             return(
                <span className="fa fa-star" key={index}></span>  
             )
         })}
        </div>
    )


}

export default Stars;