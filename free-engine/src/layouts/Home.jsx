import React from 'react'
import Navbar from '../components/navbar/Navbar'
import Banner from '../components/banner/Banner'
import { SearchBar } from '../components/searchbar/Searchbar'
import { MaltCards } from '../components/cards/MaltCards'
import { FreelanceComCards } from '../components/cards/FreelanceComCards'
import { FiverrCards } from '../components/cards/FiverrCards'
import { ComeupCards } from '../components/cards/ComeupCards'
import SearchFilters from '../components/filters/searchFilters'
import { useState, useEffect } from 'react'

export default function Home() {
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);

  useEffect(() => {
    console.log(selectedPlatforms)
  },[selectedPlatforms])

  return (
    <>
      <Navbar/>
      <Banner />
      <SearchBar />
      <SearchFilters selectedPlatforms={selectedPlatforms} 
        setSelectedPlatforms={setSelectedPlatforms} />
      {selectedPlatforms.includes("Malt.fr") ? <MaltCards /> : ""}
      {selectedPlatforms.includes("Freelance.com") ? <FreelanceComCards /> : ""}
      {selectedPlatforms.includes("Fiverr.com") ? <FiverrCards /> : ""}
      {selectedPlatforms.includes("Comeup.com") ? <ComeupCards /> : ""}
      {selectedPlatforms.length === 0 ? (
        <> 
          <MaltCards /> 
          <FreelanceComCards />
          <FiverrCards />
          <ComeupCards /> 
        </>
      ) : ""}
    </>
  )
}

