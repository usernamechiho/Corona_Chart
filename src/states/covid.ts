import { atom } from 'recoil'
import { CovidType } from 'types/covid'

export const krCovidInfoArray = atom<CovidType[]>({
  key: '#krCovidInfoArrayKey',
  default: [],
})

export const monthNameArray = atom<string[]>({
  key: '#monthNameArrayKey',
  default: [],
})
