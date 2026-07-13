import { Button } from './components/ui/Button'
import { PlusIcon } from './components/icons/PlusIcon'
import { ShareIcon } from './components/icons/ShareIcon'
import { Card } from './components/ui/Card'
import { Sidebar } from './components/ui/Sidebar'
import { CreateContentModal } from './components/ui/CreateContentModal'
import { useState } from 'react'

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  
  return (
    <div className = 'bg-black min-h-screen p-4'>
      <CreateContentModal open = {modalOpen} onClose = {() => {
        setModalOpen(false);
      }}/>
    <div className = 'flex justify-end gap-4'>
      <Button  startIcon = {<ShareIcon size = "md" />} variant="secondary" size="md" text="Share Brain" onClick = {() => {}} />  
      <Button startIcon = {<PlusIcon size = "md" />} variant="primary" size="md" text="Add Content" onClick = {()=> {
        setModalOpen(true);
      }}/> 
    </div>
    <div className = "flex gap-4">
      <Card type = "youtube" link = "https://www.youtube.com/watch?v=QNJL6nfu__Q" title = "Michael Jackson"/>
      <Card type = "youtube" link = "https://www.youtube.com/watch?v=QNJL6nfu__Q" title = "Michael Jackson"/>
    </div>
    </div>
  )
}

export default App