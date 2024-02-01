import React, { createContext, useContext, useState } from 'react'

const ModalContext = createContext()

const ModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalInfo, setModalInfo] = useState(null)

  const openModal = (info) => {
    if (info) {
      setModalInfo(info)
    }
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setModalInfo(null)
  }

  return (
    <ModalContext.Provider value={{ isModalOpen, closeModal, openModal, modalInfo }}>{children}</ModalContext.Provider>
  )
}

const useModal = () => {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider')
  }
  return context
}

export { ModalProvider, useModal }
