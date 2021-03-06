import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import './flowerinfo.css'
import { FlowerForm } from './FlowerForm'
import { FlowerMessage } from './FlowerMessage'

// Fetching the comments for the flowers
const url = "https://flowers-mock-data.firebaseio.com/comments/TheresaUlwahn"

export const FlowerInfo = () => {
  const { flowerId } = useParams()
  const [flower, setFlower] = useState([])
  const [flowerMessages, setFlowerMessages] = useState([])
  const [postedMessage, setPostedMessage] = useState("")

  // Fetching the ID of the flowers 
  useEffect(() => {
    fetch(`https://flowers-mock-data.firebaseio.com/flowers/${flowerId}.json`)
      .then((res) => res.json())
      .then((json) => {
        setFlower(json)
      })
  }, [flowerId])

  // Fetching the messages
  useEffect(() => {
    fetch(`https://flowers-mock-data.firebaseio.com/comments/TheresaUlwahn/${flowerId}.json`)
      .then((res) => res.json())
      .then((json) => {
        console.log('All messages for the flower: ', json)
        if (json !== null) {
          setFlowerMessages(json)
        }
      })
  }, [postedMessage])

  const handleFormSubmit = (flowerId, message) => {
    // console.log('POST THIS MESSAGE: ', message, 'FOR THE FLOWER: ', flowerId);

    fetch(url + `/${flowerId}/.json`, {
      method: "POST",
      body: JSON.stringify({ message }),
      headers: { "Content-Type": "application/json" }
    })
      .then(() => {
        console.log('posted  !')
        // window.location.reload();
        setPostedMessage(message)
      })
      .catch(err => console.log("error:", err))
  }

  var result = Object.keys(flowerMessages).map(function (key) {
    return [key, flowerMessages[key]];
  });

  return (
    <section className="infoContainer">
      {/*Background image*/}
      < div className="backDrop" style={{ backgroundImage: `url(${flower.cover_image})` }} alt={flower.latin_name} />
        {/* Link and subtil movement for go back button */}
        <Link className="backLink" to={`/`}>
          <svg className="backLinkImg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
            <path d="M27 14.5C27 7.596441 21.4035594 2 14.5 2S2 7.596441 2 14.5 7.5964406 27 14.5 27 27 21.403559 27 14.5zm-19.3388348-.353553l7.4852814-7.485282c.1952622-.195262.5118446-.195262.7071068 0l2.1213203 2.121321c.1952622.195262.1952622.511844 0 .707106L12.9644661 14.5l5.0104076 5.010408c.1952622.195262.1952622.511844 0 .707106l-2.1213203 2.121321c-.1952622.195262-.5118446.195262-.7071068 0l-7.4852814-7.485282c-.19799-.19799-.197989-.509117 0-.707106z" fill="#fff" fillRule="evenodd"></path></svg>
          <p>All flowers</p>
        </Link>
      {/*Infobox for every flower*/} 
      <div className="infoBox">
         {/*Info about the flower with the form and messages*/}
         <div className="titleInfo">
          <h2 className="flowerTitle">{flower.common_name}</h2>
            <p className="flowerNotes">Info: {flower.notes}</p>
            <p>Blooming season: {flower.blooming_season}</p>
        </div>
        {/* The form and the messages being displayed */}
        <FlowerForm className="flowerForm" onFormSubmit={handleFormSubmit} />
          {result.map(flowerMessage => (
        <FlowerMessage key={flowerMessage[0]} flowerMessage={flowerMessage[1]} />
        ))}
      </div>
    </section>
  )
}