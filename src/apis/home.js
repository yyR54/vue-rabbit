import httpInstance from '@/utils/http'

// 获取banner
export function getBannerAPI() {
  return httpInstance({
    url: 'home/banner'
  })
}

/**
 * @description: 获取新鲜好物
 * @param {*}
 * @return {*}
 */
export const getNewAPI = () => {
  return httpInstance({
    url: '/home/new'
  })
}