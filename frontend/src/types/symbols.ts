import dayjs from 'dayjs';
import { InjectionKey } from 'vue';

export const DayjsKey: InjectionKey<dayjs.Dayjs> = Symbol('dayjs');
