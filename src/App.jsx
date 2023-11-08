import Carlist from './components/Carlist'
import { AppBar, Typography } from "@mui/material";

function App() {

  return (
    <div>
      <AppBar position='sticky'>
        <Typography variant='h6'>
          Car shop
        </Typography>
      </AppBar>
      < Carlist />
    </div>
  )
}

export default App
