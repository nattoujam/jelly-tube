import { defineStore } from 'pinia'

export type BannerType = 'None' | 'Error' | 'Warn' | 'Info'

export const useBanner = defineStore({
  id: 'banner',
  state: () => ({
    bannerType: 'None' as BannerType,
    title: '' as string,
    message: '' as string
  }),
  actions: {
    setBanner(bannerType: BannerType, title: string, message: string) {
      this.bannerType = bannerType
      this.title = title
      this.message = message
    }
  }
})
