import React, { Component, useState } from 'react'
import { Text, View, ScrollView } from 'react-native'
import Swiper from 'react-native-swiper'
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

  console.log(separateOnDate(movies))

  return (
    <Swiper loop={false} showsPagination={false}>
      {separateOnDate(movies)
        .map(mlist =>
          <ScrollView key={mlist[0].broadcast.channel + mlist[0].broadcast.date}>
            {mlist.map(({ name, broadcast: { channel, date } }) => {
              const d = new Date(date)
              const dstring = `${d.getDate()}.${d.getMonth()}.${d.getFullYear()}`

              return <Text key={channel + date}>{`${name}, ${channel} ${dstring}`}</Text>
            })}
          </ScrollView>
        )
      }
    </Swiper>
  )
}

const distinctDates = movies => 
  Array.from(
    new Set(
      movies.map(({ broadcast: { date } }) =>
        new Date(date).toDateString())
    )
  )

const separateOnDate = movies =>
  distinctDates(movies)
    .map(dstring =>
      movies.filter(({ broadcast: { date } }) =>
        new Date(date).toDateString() === dstring)
    )

export default App
