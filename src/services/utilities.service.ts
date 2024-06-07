class utilitiesService {
  async sleep(sec: number) {
    return await new Promise((resolve) => setTimeout(resolve, sec * 1000))
  }
}

export const UtilitiesService = new utilitiesService()
