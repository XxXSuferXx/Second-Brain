import { Button } from './components/ui/Button'
import { PlusIcon } from './components/icons/PlusIcon'
import { ShareIcon } from './components/icons/ShareIcon'
import { Card } from './components/ui/Card'

function App() {
  
  return (
    <>
    <div className = 'flex items-center'>
      <Button startIcon = {<ShareIcon size = "md" />}variant="secondary" size="md" text="Share Brain" onClick={() => {}} />  
      <Button startIcon = {<PlusIcon size = "md" />} variant="primary" size="md" text="Add Content" onClick={() => {}} /> 
      <Card />
    </div>
    </>
  )
}

export default App