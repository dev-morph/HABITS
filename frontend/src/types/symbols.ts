import dayjs from 'dayjs'
import type { InjectionKey } from 'vue'

export const DayjsKey: InjectionKey<dayjs.Dayjs> = Symbol('dayjs')
