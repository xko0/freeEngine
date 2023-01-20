import React from 'react'
import Navbar from '../components/navbar/Navbar'
import Banner from '../components/banner/Banner'
import { SearchBar } from '../components/searchbar/Searchbar'
import { MaltCards } from '../components/cards/MaltCards'
import { FreelanceComCards } from '../components/cards/FreelanceComCards'
import { FiverrCards } from '../components/cards/FiverrCards'

export default function Home() {
  return (
    <>
      <Navbar/>
      <Banner />
      <SearchBar />
      <MaltCards />
      <FreelanceComCards />
      <FiverrCards />
    </>
  )
}
