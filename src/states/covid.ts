import { atom } from 'recoil'
import { CovidType, TodayWorldCovidType, WorldNationCovidType } from 'types/covid'

export const krCovidInfoArray = atom<CovidType[]>({
  key: '#krCovidInfoArrayKey',
  default: [],
})

export const jpCovidInfoArray = atom<CovidType[]>({
  key: '#jpCovidInfoArrayKey',
  default: [],
})

export const worldWideInfoArray = atom<WorldNationCovidType[]>({
  key: '#worldWideInfoArray',
  default: [],
})

export const worldTodayInfoObj = atom<TodayWorldCovidType>({
  key: '#worldTodayInfoObj',
  default: undefined,
})

export const monthNameArray = atom<string[]>({
  key: '#monthNameArrayKey',
  default: [],
})
