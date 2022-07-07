import React, { useState } from 'react';
import { useLocalObservable } from 'mobx-react-lite'
import { Modal, Button } from "antd";
import { omit } from "lodash";

type Props = {
  disabled?: boolean,
  fullModal?: boolean,
  slot?: React.ReactNode,
  slotClass?: string,
  slotStyle?: Object,
  [propName: string]: any
}

const ModalContext = React.createContext<any>(undefined)
const EasyModal = (props: Props) => {
  const [visible, setVisible] = useState(false)
  const state = useLocalObservable(() => {
    return {
      show: () => setVisible(true),
      close: () => setVisible(false),
    }
  })

  const handleModalShow = () => {
    !props.disabled && setVisible(true)
  }

  const handleOk = () => {
    // 可自定义onOk方法
    if (props.onOk instanceof Function) {
      const promise = props.onOk()
      if (promise instanceof Promise) {
        promise.then(() => setVisible(false))
      } else {
        setVisible(!!promise)
      }
      return
    }
    setVisible(false)
  }

  const handleCancel = () => {
    // 支持自定义onCancel方法
    props.onCancel instanceof Function && props.onCancel()
    setVisible(false)
  }

  const { fullModal, slotClass, slotStyle, slot } = props
  const modalProps = omit(props, ['className', 'disabled', 'fullModal', 'slotClass', 'slotStyle', 'slot'])
  return (
    <React.Fragment>
      <div onClick={handleModalShow} className={slotClass} style={slotStyle}>{slot}</div>
      <Modal
        {...modalProps}
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        className={`${props.className} ${fullModal ? 'full-height' : ''}`}
      >
        <ModalContext.Provider value={state}>
          {props.children}
        </ModalContext.Provider>
      </Modal>
    </React.Fragment>
  )
}

EasyModal.defaultProps = {
  destroyOnClose: true,
  title: '基本弹框',
  width: '80%',
  footer: null,
  // 自定义props
  disabled: false,
  fullModal: false,
  slot: <Button>按钮</Button>,
  slotClass: 'form-modal_slot',
  slotStyle: { display: 'inline-block', cursor: 'pointer' },
}

export { ModalContext }
export default EasyModal