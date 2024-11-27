import React from 'react'
import { useData } from './DataContext'

export const Cards = () => {
    const {selectedIndex} = useData();
    console.log("in cards ", selectedIndex)
  return (
    <div>Index: {selectedIndex}</div>
  )
}
