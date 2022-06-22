import React, { useEffect } from 'react'
import { $api } from '@/plugins'

const Layout = () => {
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