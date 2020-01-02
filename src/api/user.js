import request from '@/utils/request'

export function login(data) {
  // 这是我的接口需要的密码/用户类型和用户名,之后你把这个注释掉即可
  // data = {
  //   // 'password': '123321',
  //   // 'type': 'customer',
  //   // 'username': 'customer1'
  //   'password': 'guoyanjun',
  //   'userId': 'g16158'
  // }
  return request({
    // url:'/user/login',
    // url:'http://47.93.255.92:6677/user/login',
    url: 'http://127.0.0.1:8888/user/login?userId='+data.username+'&password='+data.password,
    method: 'post',
    data: data
  })
}

export function getInfo(token) {
  return request({
    // url: 'http://47.93.255.92:6677/user/info',
    url: 'http://127.0.0.1:8888/user/info',
    // method: 'get',
    method: 'post',
    params: { token }
  })
}

export function logout() {
  return request({
    //url: 'http://47.93.255.92:6677/user/logout',
    url: 'http://127.0.0.1:8888/user/logout',
    method: 'post'
  })
}
