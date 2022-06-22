import React, { useEffect } from 'react'
import { $api, $consts } from '@/plugins'

const Layout = () => {

  console.log($consts['CONFIG/PROCESS_ENV'])

  const loginTest = (user_name: string, password: string) => {
    $api['user/login']({
      user_name,
      password,
      test: '111'
    }).then((res: any) => {
      console.log(res);
    })
  }

  useEffect(() => {
    loginTest("123", "123")
  }, [])

  return (
    <div>Layout</div>
  )
}

export default Layout