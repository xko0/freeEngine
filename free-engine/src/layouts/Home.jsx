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
import SideMenu from '../components/sideMenu/SideMenu'
import Button from '@mui/material/Button';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import "./home.css"

export default function Home() {
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);

  useEffect(() => {
    console.log(selectedPlatforms)
  },[selectedPlatforms])

  function displaySideBar() {
    var element = document.getElementById("sidebar")
    var pageElement = document.getElementById("main-content")
    element.classList.toggle("active")

    if (element.classList.contains("active")) {
      element.style.left = "0"
      pageElement.style.transition = "margin-left 0.2s ease-in-out";
      pageElement.style.marginLeft = "15%"
    } else {
      element.style.left = "-100%"
      pageElement.style.marginLeft = ""
      pageElement.style.transition = "margin-left 0.2s ease-in-out";
    }
  }

  return (
    <>
      <Navbar/>
      <Banner />
      <div className="layout">
        <SearchBar />
        <div className="sideBar" id="sidebar">
          <SideMenu 
            selectedPlatforms={selectedPlatforms} 
            setSelectedPlatforms={setSelectedPlatforms}
          />
        </div>
        <div className="main-content" id="main-content">
          <div className="filter-button">
            <Button 
              variant="contained"
              startIcon={<ArrowLeftIcon/>}
              endIcon={<ArrowRightIcon />}
              onClick={displaySideBar}            
              sx={{ml: "1%"}}
            > 
              Filtres 
            </Button>
          </div>
          <div className="search-filters">
            <SearchFilters 
                selectedPlatforms={selectedPlatforms} 
                setSelectedPlatforms={setSelectedPlatforms}
            />
          </div>
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
        </div>
      </div>
    </>
  )
}

