import request from '@/utils/request'

export function login(data) {
  // 这是我的接口需要的密码/用户类型和用户名,之后你把这个注释掉即可
  data = {
    'password': '123321',
    'type': 'customer',
    'username': 'customer1'
  }
  return request({
    // url: '/userMessage?password='+data.password+'&username='+data.username,
    // url:'/user/login',
    url: 'http://47.93.255.92:6677/user/login',
    method: 'post',
    data: data
  })
}

export function getInfo(token) {
  return request({
    url: 'http://47.93.255.92:6677/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: 'http://47.93.255.92:6677/user/logout',
    method: 'post'
  })
}
