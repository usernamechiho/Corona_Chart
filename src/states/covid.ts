import { atom } from 'recoil'
import { CovidType, WorldwideType } from 'types/covid'

export const krCovidInfoArray = atom<CovidType[]>({
  key: '#krCovidInfoArrayKey',
  default: [],
})

export const jpCovidInfoArray = atom<CovidType[]>({
  key: '#jpCovidInfoArrayKey',
  default: [],
})

export const worldWideInfoArray = atom<WorldwideType[]>({
  key: '#worldWideInfoArray',
  default: [],
})

export const monthNameArray = atom<string[]>({
  key: '#monthNameArrayKey',
  default: [],
})
