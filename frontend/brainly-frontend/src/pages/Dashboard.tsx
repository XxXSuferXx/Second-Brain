import { Button } from '../components/ui/Button'
import { PlusIcon } from '../components/icons/PlusIcon'
import { ShareIcon } from '../components/icons/ShareIcon'
import { Card } from '../components/ui/Card'
import { Sidebar } from '../components/ui/Sidebar'
import { CreateContentModal } from '../components/ui/CreateContentModal'
import { useState } from 'react'
import { useContent } from '../hooks/useContent'
import axios from 'axios'
import { BACKEND_URL } from '../config'

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const contents = useContent();

  return (
    <div>
    <div> <Sidebar /> </div>
      <div className = 'min-h-screen p-4 ml-64 bg-black '>
          <CreateContentModal open = {modalOpen} onClose = {() => {
            setModalOpen(false);
          }}/>
        <div className = 'flex justify-end gap-4 '>
          <Button  startIcon = {<ShareIcon size = "md" />} variant="secondary" size="md" text="Share Brain" onClick = {async () => {
            const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`, {
              share: true
            }, {
              headers: {
                "Authorization": localStorage.getItem("token")
              }
            })
            const shareURL = `http://localhost:5173/share/${response.data.hash}`;
          }} />  
          <Button startIcon = {<PlusIcon size = "md" />} variant="primary" size="md" text="Add Content" onClick = {()=> {
            setModalOpen(true);
          }}/> 
        </div>
        <div className = "flex gap-4 flex-wrap">
          {contents.map(({type, link, title}) => <Card 
            type = {type} 
            link = {link} 
            title = {title}
          />)} 
        </div>
      </div>
    </div>
  )
}