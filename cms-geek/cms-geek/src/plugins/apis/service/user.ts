const user = [
  {
    name: 'register',
    method: 'POST',
    path: '/user/register',
    params: {
      user_name: '',
      password: ''
    },
    desc: '用户注册'
  },
  {
    name: 'login',
    method: 'POST',
    path: '/user/login',
    params: {
      user_name: '',
      password: ''
    },
    axiosOptions: {},
    desc: '用户登陆'
  },
]

export default user