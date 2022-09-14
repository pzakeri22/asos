// import Sort from './Sort';
// import Filter from './Filter';

export default function SortFilter() {
    return (
        <section className="sort-filter">
            <div className="container">
                    <div className="sort">
                        <p className="mobile">SORT</p>
                        <p className="desktop">Sort</p>
                        <img src="./imageBank/down-arrow.png" alt=""/>
                    </div>
                    <div className="filter">
                        <p>FILTER</p>
                    </div>
                    <div className="type">
                        <p>Product Type</p>
                        <img src="./imageBank/down-arrow.png" alt=""/>
                    </div>
                    <div className="brand">
                        <p>Brand</p>
                        <img src="./imageBank/down-arrow.png" alt=""/>
                    </div>
                    <div className="colour">
                        <p>Colour</p>
                        <img src="./imageBank/down-arrow.png" alt=""/>
                    </div>
                    <div className="fit">
                        <p>Body Fit</p>
                        <img src="./imageBank/down-arrow.png" alt=""/>
                    </div>
                    <div className="price">
                        <p>Price Range</p>
                        <img src="./imageBank/down-arrow.png" alt=""/>
                    </div>
            </div>
        </section>
    )
}
