import React, { useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

import './styles.css';

export default function Originals({ title, items }) {
    const [scrollX, setScrollx] = useState(0);

    let arrowLeft = false;

    if(scrollX < 0) {
        arrowLeft = true;
    }

    const handleLeftArrow = () => {
        let x = scrollX + Math.round(window.innerWidth / 2);
        if(x > 0) {
            x = 0;
        }
        setScrollx(x);
    }

    const handleRightArrow = () => {
         let x = scrollX - Math.round(window.innerWidth / 2);
         let listW = items.results.length * 400;

         if((window.innerWidth - listW) > x) {
             x = (window.innerWidth - listW) - 60;
         }
         setScrollx(x);
    }
    
    return (
        <div className='originals'>
            <h2>{title}</h2>

            <div className={arrowLeft ? 'originals--left' : 'no-arrow-left'} onClick={handleLeftArrow}>
                <FiChevronLeft size={70} />
            </div>

            <div className="originals--right"  onClick={handleRightArrow}>
                <FiChevronRight size={70} />
            </div>

            <div className="originals--listarea">
                <div className="mylist--list" style={{
                    marginLeft: scrollX,
                    width: items.results.length * 550
                }}>
                    {items.results.length > 0 && items.results.map((item, key) => (
                        <div key={key} className="originals--item">
                            <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.orinal_title} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}