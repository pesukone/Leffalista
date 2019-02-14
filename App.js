import React, { Component, useState } from 'react'
import { Text, ScrollView } from 'react-native'
import parser from 'fast-xml-parser'

const App = () => {
  const [movies, setMovies] = useState([])

  if (movies.length === 0) {
    fetch('https://www.leffatykki.com/xml/ilta/tvssa/tv-today.xml')
      .then(res => res.text())
      .then(text => parser.parse(text))
      .then(o => {
        const movies = Object.values(o.today.movie)
          .map(({ name, cover, broadcast }) => ({ name, cover, broadcast }))
        //console.log(Object.keys(o.today.movie[0].broadcast))
        
        setMovies(movies)
      })
  }

  return (
    <ScrollView>
      {movies.map(({ name, broadcast: { channel, date } }) => <Text key={channel + date}>{name}</Text>)}
    </ScrollView>
  )
}

export default App
