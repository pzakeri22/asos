import React from 'react'
import english from './imagesBank/english.png';

export default function TopInfo() {
  return (
    <section className="top-info">
        <div className="container">
            <div className="info">
                <div>Marketplace</div>
                <div>Help & FAQs</div>
                <div><img src={english} alt="change language"/></div>
            </div>
        </div>
    </section>
  )
}
