import React from 'react'
import { useLocalObservable, observer } from "mobx-react-lite"

const Main = () => {
  const todo = useLocalObservable(() => ({
    done: true,
    toggle () {
      this.done = !this.done
    }
  }))

  return (
    <div>
      <h1 onClick={todo.toggle}>
        {todo.done ? "[DONE]" : "[TODO]"}
      </h1>
    </div>
  )
}

export default observer(Main)