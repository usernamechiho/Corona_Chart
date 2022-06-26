import { atom } from 'recoil'
import { CovidType } from 'types/covid'

export const krCovidInfoArray = atom<CovidType[]>({
  key: '#krCovidInfoArray',
  default: [],
})

export const monthNameArray = atom<string[]>({
  key: '#monthNameArray',
  default: [],
})
