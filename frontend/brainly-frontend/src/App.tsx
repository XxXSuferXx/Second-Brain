import { Button } from './components/ui/Button'
import { PlusIcon } from './components/icons/PlusIcon'
import { ShareIcon } from './components/icons/ShareIcon'

function App() {
  
  return (
    <>
    <div className = 'flex items-center'>
      <Button startIcon = {<PlusIcon size = "lg" />} variant="primary" size="md" text="Share" onClick={() => {}} /> 
      <Button variant="secondary" size="md" text="Add Content" onClick={() => {}} />  
    </div>
    </>
  )
}

export default App