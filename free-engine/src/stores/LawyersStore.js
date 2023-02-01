import { runInAction } from 'mobx'
import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL;

export function createLawyersStore() {
  return {
    loadingConsultationAvocat: null,
    loadingAvvo: null,
    loadingCallalawyer: null,
    loadingMeetlaw: null,
    loadingJustifit: null,
    hasErrors: null,
    consultationAvocat: JSON.parse(localStorage.getItem('consultationAvocat')) || [],
    avvo: JSON.parse(localStorage.getItem('avvo')) || [],
    callalawyer: JSON.parse(localStorage.getItem('callalawyer')) || [],
    meetlaw: JSON.parse(localStorage.getItem('meetlaw')) || [],
    justifit: JSON.parse(localStorage.getItem('justifit')) || [],

    async getConsultationAvocat(infos) {
      runInAction(() => {
        this.loadingConsultationAvocat = true
        this.hasErrors = false
      })
      try {
        let response = await axios.get(`${BASE_URL}/scrapeConsultationAvocatData`,{
          params: {
              argument: infos
          }
        }) 
        if (response.data) {
          runInAction(() => {
            this.loadingConsultationAvocat = false
            this.consultationAvocat = response.data
            localStorage.setItem('consultationAvocat', JSON.stringify(response.data))
          })
        }    
      } catch(error) {
        console.error(error)
      }
    },

    async getAvvo(infos) {
      runInAction(() => {
        this.loadingAvvo = true
        this.hasErrors = false
      })
      try {
        let response = await axios.get(`${BASE_URL}/scrapeAvvoData`,{
          params: {
              argument: infos
          }
        }) 
        if (response.data) {
          runInAction(() => {
            this.loadingAvvo = false
            this.avvo = response.data
            localStorage.setItem('avvo', JSON.stringify(response.data))
          })
        }    
      } catch(error) {
        console.error(error)
      }
    },

    async getCallalawyer(infos) {
      runInAction(() => {
        this.loadingCallalawyer = true
        this.hasErrors = false
      })
      try {
        let response = await axios.get(`${BASE_URL}/scrapeCallalawyerData`,{
          params: {
              argument: infos
          }
        }) 
        if (response.data) {
          runInAction(() => {
            this.loadingCallalawyer = false
            this.callalawyer = response.data
            localStorage.setItem('callalawyer', JSON.stringify(response.data))
          })
        }    
      } catch(error) {
        console.error(error)
      }
    },

    async getMeetlaw(infos) {
      runInAction(() => {
        this.loadingMeetlaw = true
        this.hasErrors = false
      })
      try {
        let response = await axios.get(`${BASE_URL}/scrapeMeetlawData`,{
          params: {
              argument: infos
          }
        }) 
        if (response.data) {
          runInAction(() => {
            this.loadingMeetlaw = false
            this.meetlaw = response.data
            localStorage.setItem('meetlaw', JSON.stringify(response.data))
          })
        }    
      } catch(error) {
        console.error(error)
      }
    },

    async getJustifit(infos) {
      runInAction(() => {
        this.loadingJustifit = true
        this.hasErrors = false
      })
      try {
        let response = await axios.get(`${BASE_URL}/scrapeJustifitData`,{
          params: {
              argument: infos
          }
        }) 
        if (response.data) {
          runInAction(() => {
            this.loadingJustifit = false
            this.justifit = response.data
            localStorage.setItem('justifit', JSON.stringify(response.data))
          })
        }    
      } catch(error) {
        console.error(error)
      }
    }
  }
}