import request from '@/utils/request'

export function login(data) {
  return request({
    ///user/login
    //url: '/userMessage?password='+data.password+'&username='+data.username,
    url:'/user/login',
    method: 'post',
    //method:'get',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })  
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
