export interface CovidType {
  Active: number
  City: ''
  CityCode: ''
  Confirmed: number
  Country: string
  CountryCode: ''
  Date: string
  Deaths: number
  Lat: string
  Lon: string
  Province: ''
  Recovered: 0 | number
}

export interface CovidChartType {
  Active: number
  Month: string
}

export interface WorldNationCovidType {
  Country: string
  CountryCode: string
  Date: string
  ID: string
  NewConfirmed: number
  NewDeaths: number
  NewRecovered: 0
  Premium: null
  Slug: string
  TotalConfirmed: number
  TotalDeaths: number
  TotalRecovered: 0
}

export interface TodayWorldCovidType {
  Date: string
  NewConfirmed: number
  NewDeaths: number
  NewRecovered: 0 | number
  TotalConfirmed: number
  TotalRecovered: 0 | number
  TotalDeaths: number
}
