const user = [
  {
    name: 'register',
    method: 'POST',
    path: '/user/register',
    param: {
      user_name: '',
      password: ''
    },
    desc: '用户注册'
  },
  {
    name: 'login',
    method: 'POST',
    path: '/user/login',
    param: {
      user_name: '',
      password: ''
    },
    desc: '用户登陆'
  },
]

export default user