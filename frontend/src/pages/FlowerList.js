import React, { useEffect, useState } from 'react'
import { Header } from './Header'
import { Link } from 'react-router-dom'
import "./flowerlist.css" 

// Const for url makes code cleaner down below and easier to find
const url = "https://flowers-mock-data.firebaseio.com/flowers.json"

export const FlowerList = () => {
  const [flowers, setFlowers] = useState([])

  // Fetching the list with every picture of a flower
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        let counter = 0

        json.forEach(flower => {
          flower.id = counter
          counter++
        })
        setFlowers(json)
      })
  }, [])

  // Return with Link to info pages of each flower
  return (
    <div>
      <Header />
        <div className="flowerContainer">
          {/* Mapping the flowers */}
          {flowers.map((flower) => (
            // div for picture of each flower and displaying hidden info upon hover
            <div className="flowerNamePost" key={flower.id}>
              <Link to={`/flowers/${flower.id}`}>
                <div className="flowerTitles">
                  <h2>{flower.common_name}</h2>
                  <p>{flower.latin_name}</p>
                </div>
                <div>
                  <img className="flowerImg" src={flower.cover_image} alt={flower.common_name} />
                </div>
              </Link>
            </div>
          ))}
        </div>
    </div>
  )
}
