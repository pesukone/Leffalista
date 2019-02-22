import React, { Component, useState } from 'react'
import { Text, ScrollView } from 'react-native'
import parser from 'fast-xml-parser'

const App = () => {
  const [movies, setMovies] = useState([])

  if (movies.length === 0) {
    fetch('https://www.leffatykki.com/xml/ilta/tvssa/tv-today.xml')
      .then(res => res.text())
      .then(text => parser.parse(text))
      .then(parsed => {
        const movies = Object.values(parsed.today.movie)
          .map(({ name, cover, broadcast }) => ({ name, cover, broadcast }))
        //console.log(Object.keys(parsed.today.movie[0].broadcast))
        
        setMovies(movies)
      })
  }

  return (
    <ScrollView>
      {movies.map(({ name, broadcast: { channel, date } }) => {
        const d = new Date(date)
        const dstring = `${d.getDate()}.${d.getMonth()}.${d.getFullYear()}`

        return <Text key={channel + date}>{`${name}, ${channel} ${dstring}`}</Text>
      })}
    </ScrollView>
  )
}

export default App
