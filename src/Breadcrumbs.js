import React from 'react'

export default function Breadcrumbs() {
  return (
    <section className="breadcrumbs">
        <div className="container">
            <ul>
                <li>Home</li> 
                <li>›</li> 
                <li>Women</li>
                <li className="current-page">›</li> 
                <li className="current-page">Workwear</li>
            </ul>
        </div>
    </section>
  )
}
