import React, { useState } from 'react';

export default function Carousel(props) {
    const [CurrentImage, setCurrentImage] = useState(0);
    const CountOfImage = React.Children.count(props.children);

    function returenImageByIndex(index) {
        const imageChild = React.Children.toArray(props.children)[index];
        return React.cloneElement(imageChild);
    }

    return (
        <>
            <button
                disabled={CurrentImage === 0}
                onClick={(e) => setCurrentImage(v => v - 1)}
            >&lt; Previous Page
            </button>
            <button
                disabled={CurrentImage >= CountOfImage - 1}
                onClick={(e) => setCurrentImage(v => v + 1)}
            >Next Page &gt;</button>
            <br></br>
            {returenImageByIndex(CurrentImage)}
        </>
    )
}