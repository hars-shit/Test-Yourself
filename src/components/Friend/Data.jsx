import * as React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Fab from '@mui/material/Fab';
import List from '@mui/material/List';
import ClearIcon from '@mui/icons-material/Clear';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom';
import a from '../../assets/logo.png'
import axios from 'axios';


const StyledFab = styled(Fab)({
  position: 'absolute',
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: '0 auto',
});

export default function Data() {
    const [isRotated, setIsRotated] = React.useState(false);
  const [id,setid]=React.useState('ankita@gmail.com')
  const [data,setData]=React.useState([])
  const navigate=useNavigate()

  const handleRefreshClick = () => {
    setIsRotated(!isRotated);
  };
    React.useEffect(() => {
        const getNotification = async () => {
          try {
            let response = await axios.get('http://localhost:2001/user/collab/notification?collaborator=ankita@gmail.com');
            setData(response.data)
            console.log("response", response);
          } catch (error) {
            console.log("Error while getting notifications ", error);
          }
        };
        getNotification()
        const intervalId = setInterval(() => {
          getNotification();
        }, 20000); // 20000 milliseconds = 20 seconds
    
        // Clean up the interval on component unmount
        return () => {
          clearInterval(intervalId);
        };
      }, [id]);

      const handleUpdate=async(e)=>{
        // console.log("asdas",e)
        try{
    
            let response=await axios.put(`http://localhost:2001/user/collab/${e}`,{
                is_accepted:1
            })
            // console.log("reaa",response)
            navigate(`/lobby/${e}`)
            // navigate(`/room/exam/collab/${e}`)
    
        }catch(error){
            console.log("Eror in notification updation",error)
        }
      }
  return (
    <React.Fragment>
      <CssBaseline />
      <Paper square sx={{ pb: '50px' }}>
        <Typography variant="h5" gutterBottom component="div" sx={{ p: 2, pb: 0 }}>
          Inbox
        </Typography>
        <List sx={{ mb: 2 ,padding:2}}>
        {
                data?.map((e,i)=>{
                    return(
                        <>
                
          <div className="flex mb-4 " key={i}>
            <img src={a} alt="Notification Icon" className="w-12 h-12 rounded-full mr-4" />
            <div className="flex-grow">
              <p className="text-base">You have a collaborative practice test request from {e.email} on the topic {e.topic}</p>
              <p className="text-xs text-gray-500 mt-2">
  {new Date(e.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })}{" "}
  {new Date(e.createdAt).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  })}
</p>

              <div className='flex justify-end  mt-2 gap-3'>
                <button className="flex items-center hover:border border-black px-2 py-1 bg-green-100 rounded-full"
                onClick={()=>handleUpdate(e._id)}
                >
                  <HowToRegIcon className='text-green-400 mr-1' />
                  Accept
                </button>
                <button className="flex items-center hover:border border-black px-2 py-1 bg-red-100 rounded-full">
                  <ClearIcon className='text-red-400 mr-1' />
                  Reject
                </button>
              </div>
            </div>
          </div>
        
          <hr className='border-t my-4'/>
          </>
        )
    })
}
        </List>
      </Paper>
      <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
        <Toolbar>
          <IconButton color="inherit" aria-label="open drawer">
            <MenuIcon />
          </IconButton>
          <StyledFab color="secondary" aria-label="add">
            <AddIcon />
          </StyledFab>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton color="inherit">
            <SearchIcon />
          </IconButton>
          <IconButton color="inherit">
            <MoreIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}