import { Button } from './components/ui/Button'
import { PlusIcon } from './components/icons/PlusIcon'
import { ShareIcon } from './components/icons/ShareIcon'
import { Card } from './components/ui/Card'
import { Sidebar } from './components/ui/Sidebar'

function App() {
  
  return (
    <div className = 'bg-black min-h-screen p-4'>
    <div className = 'flex justify-end gap-4'>
      <Button startIcon = {<ShareIcon size = "md" />}variant="secondary" size="md" text="Share Brain" onClick={() => {}} />  
      <Button startIcon = {<PlusIcon size = "md" />} variant="primary" size="md" text="Add Content" onClick={() => {}} /> 
    </div>
    <div className = "flex gap-4">
      <Card type = "youtube" link = "https://www.youtube.com/watch?v=q6tUgdI1l-U" title = "Vinnie"/>
    </div>
    </div>
  )
}

export default App