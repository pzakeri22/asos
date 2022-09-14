import React, {useState} from 'react';

export default function Banner() {
    const [viewMore, setViewMore] = useState(false);

    const handleClick = e => {
        e.target.innerHTML = (e.target.innerHTML === "View more" ? "View less" : "View more");
        setViewMore(!viewMore);
    }
        
    return (
        <section className="banner">
            <div className="container">
                <h1>Women's Workwear</h1>
                <p className={`intro full-${viewMore}`}>Boss your work wardrobe with our women's workwear edit. Make ASOS DESIGN your go-to for Monday to Friday. Browse our range for all the latest-season styles and find everything from work dresses and pencil skirts to smart shoes and bags. Whatever your style, we've got what you need to help you stand out when it matters. Shop & Other Stories for women's blazers in oversized or tailored styles, or check out patterned trousers from Pimkie. Looking for women's blouses? We've got plain and patterned styles for you to style your way.</p>
                <div className="wrapper view-more">
                    <p className={`view-more full-${viewMore}`} onClick={handleClick}>View more</p>
                </div>
            </div>
        </section>
    )
}
