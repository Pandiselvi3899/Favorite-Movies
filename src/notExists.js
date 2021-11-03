import React from 'react'
import { useHistory } from 'react-router'
import * as mui from '@mui/material'
import * as Icons from '@mui/icons-material'

function NotExists() {
    let history = useHistory()
    return (
      <div>        
        <div className="splash">
          <div>            
            <mui.Button
            variant="text"
            color="warning"
            onClick={()=>history.push('/')}
            ><Icons.ArrowBackIos />  Go Back To Home</mui.Button>
          </div>        
          <div>
         <h4>Not Found</h4>
          </div>
        </div>
      </div>
    )
}

export default NotExists