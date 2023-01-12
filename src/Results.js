import item1 from './item-previews/item-1.webp';
import item2 from './item-previews/item-2.jpg';
import item3 from './item-previews/item-3.webp';
import item4 from './item-previews/item-4.webp';
import item5 from './item-previews/item-5.webp';
import item6 from './item-previews/item-6.webp';
import item7 from './item-previews/item-7.webp';
import item8 from './item-previews/item-8.webp';

export default function Results() {
    return (
        <div className="results">
            <div> 
                <img src={item1} alt="maternity dress emerald green" style={{width: '15rem'}}/>  
            </div> 
            <div> 
                <img src={item2} alt="maternity dress emerald green" style={{width: '15rem'}}/>  
            </div>
            <div>
                <img src={item3} alt="maternity dress emerald green" style={{width: '15rem'}}/>  
            </div> 
            <div>
                <img src={item4} alt="maternity dress emerald green" style={{width: '15rem'}}/>  
            </div>
            <div>
                <img src={item5} alt="maternity dress emerald green" style={{width: '15rem'}}/>  
            </div>
            <div>
                <img src={item6} alt="maternity dress emerald green" style={{width: '15rem'}}/>  
            </div>
            <div> 
                <img src={item7} alt="maternity dress emerald green" style={{width: '15rem'}}/>  
            </div>
            <div>
                <img src={item8} alt="maternity dress emerald green" style={{width: '15rem'}}/>  
            </div>
        </div>
    )

}