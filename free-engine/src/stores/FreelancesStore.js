import { runInAction } from 'mobx'
import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL;

export function createFreelancesStore() {
  return {
    loadingMalt: null,
    loadingFiverr: null,
    loadingFreelanceCom: null,
    hasErrors: null,
    freelancesMalt: JSON.parse(localStorage.getItem('freelancesMalt')) || [],
    freelancesFiverr: JSON.parse(localStorage.getItem('freelancesFiverr')) || [],
    freelanceCom: JSON.parse(localStorage.getItem('freelanceCom')) || [],

    async getFreelances(infos) {
      runInAction(() => {
        this.loadingMalt = true
        this.hasErrors = false
      })
      try {
        let response = await axios.get(`${BASE_URL}/scrapeMaltData`,{
          params: {
              argument: infos
          }
        }) 
        if (response.data) {
          runInAction(() => {
            this.loadingMalt = false
            console.log("in progress...")
            console.log(response.data, response.resultNumber)
            this.freelancesMalt = response.data
            localStorage.setItem('freelancesMalt', JSON.stringify(response.data))
          })
        }    
      } catch(error) {
        console.error(error)
      }
    },

    async getFiverrFreelances(infos) {
      runInAction(() => {
        this.loadingFiverr = true
        this.hasErrors = false
      })
      try {
        let response = await axios.get(`${BASE_URL}/scrapeFiverrData`,{
          params: {
              argument: infos
          }
        }) 
        if (response.data) {
          runInAction(() => {
            this.loadingFiverr = false
            console.log("working...")
            console.log(response.data)
            this.freelancesFiverr = response.data
            localStorage.setItem('freelancesFiverr', JSON.stringify(response.data))
          })
        }    
      } catch(error) {
        console.error(error)
      }
    },

    async getFreelanceCom(infos) {
      runInAction(() => {
        this.loadingFreelanceCom = true
        this.hasErrors = false
      })
      try {
        let response = await axios.get(`${BASE_URL}/scrapeFreelanceComData`,{
          params: {
              argument: infos
          }
        }) 
        if (response.data) {
          runInAction(() => {
            this.loadingFreelanceCom = false
            console.log("Calcul...")
            console.log(response.data)
            this.freelanceCom = response.data
            localStorage.setItem('freelanceCom', JSON.stringify(response.data))
          })
        }    
      } catch(error) {
        console.error(error)
      }
    }
  }
}