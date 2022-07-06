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
  Recovered: number
}

export interface WorldwideType {
  id: string
  value: number
}

export interface CovidChartType {
  Active: number
  Month: string
}
