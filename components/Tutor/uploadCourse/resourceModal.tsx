import React from 'react'
interface ResourceModalProps {
    isOpen: boolean
    onClose: () => void
}
const ResourceModal:React.FC<ResourceModalProps> = ({isOpen, onClose}) => {
  return (
    <div>resourceModal</div>
  )
}

export default ResourceModal