import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from '@mui/icons-material/Home';
import CreateIcon from '@mui/icons-material/Create';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import CastForEducationIcon from '@mui/icons-material/CastForEducation';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import InboxIcon from "@mui/icons-material/MoveToInbox";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Button} from "@mui/material";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

import a from '../../assets/logo.png'


const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const StyledIcon = styled(IconButton)(({ theme }) => ({
  display: "none", // Initially hide the icon

  "@media (max-width: 1200px)": {
    display: "block",
  },
}));
const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  justifyContent: "flex-end",
  "@media (max-width: 1200px)": {
    justifyContent: "space-between",
  },
}));
const StyledDrawer = styled(Drawer)(({ theme, open }) => ({
  display: "block",
  overflowY: "auto",
  "@media (max-width: 1200px)": {
    display: `${open ? "flex" : "none"}`,
  },
  "&>div": {
    border: "none",
    boxShadow: "0 0 15px 0 rgba(34,41,47,.05)",
    transition: "0.45s ease-in-out !important",
    // width: `${open ? "16% !important" : "5% !important"}`,
  },
}));
const StyledAppbar = styled(AppBar)(({ theme, open }) => ({
  width: `${open ? "80%" : "92%"}`,
  "@media (max-width: 1200px)": {
    width: "96% !important", // or 'none' based on your requirement
  },
  "@media (max-width: 940px)": {
    width: "94% !important", // or 'none' based on your requirement
  },
  "@media (max-width: 683px)": {
    width: "92% !important", // or 'none' based on your requirement
  },
  "@media (max-width: 477px)": {
    width: "90% !important", // or 'none' based on your requirement
  },
}));

const StyledDrawerHeader = styled(DrawerHeader)(({ theme, open }) => ({
  justifyContent: "space-between",
  transition: open
    ? "100s ease-in-out !important"
    : "0.3s ease-in-out !important",
  // paddingLeft:30,
  // paddingLeft:`${open ? "30px":"8px"} !important`,
  // boxShadow: "0 0 15px 0 rgba(34,41,47,.05)",
  border: "0px !important",
}));

const StyledText = styled(Typography)`
  color: #a6a4b0;
  line-height: 1.5;
  letter-spacing: 0.01rem;
  font-size: 0.8rem;
  margin-left:15px;
`;
export default function Notification() {
  const [open, setOpen] = React.useState(false);
  const [icon, setIcon] = React.useState(false);



  const handleDrawerOpen = () => {
    // setIcon(true)
    if (icon) {
      setOpen(false);
      setIcon(false);
    } else {
      // setIcon(true)
      setOpen(true);
      setIcon(true);
    }
    // setIcon(true)
    // console.log(open);
    // console.log(icon);
  };
  const handleMouseEnter = () => {
    // if(!open){
    //     setOpen(true);
    // }else{
    //     setOpen(false)
    // }
    if (!icon) {
      setOpen(true);
    }
    // console.log(open)
  };
  const handleMouseLeave = () => {
    // if(open){
    //     setOpen(false);
    // }
    if (!icon) {
      setOpen(false);
    }
    // setIcon(false)
    // console.log(open)
  };

//   const handleClick=()=>{
//     alert('sscs')
//   }
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };


  

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <StyledAppbar
        position="fixed"
        open={open}
        sx={{
          // width: `${(open ) ? "80%" : "92%"} !important`,
          margin: "1.4rem",
          borderRadius: ".428rem",
          color: "black",
          backdropFilter: "blur(6px)",
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          boxShadow: "0 4px 24px 0 rgba(34,41,47,.1)",
          padding: "0rem 0rem !important",
          minHeight: "64px !important",
        }}
      >
        <StyledToolbar sx={{ flexDirection: "row" }}>
          <StyledIcon
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon
              sx={{
                "@media (max-width: 640px)": {
                  marginTop: "9px",
                },
              }}
            />
          </StyledIcon>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              flexDirection: "row",
            }}
          >
            <Button
             onClick={handleClickMenu}
             variant="outlined"
             aria-controls="simple-menu"
             aria-haspopup="true"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                textDecoration:"none",
                textTransform:"none",
                border:'none',
                color:"black",
                '&:hover':{
                  border:'none',
                    backgroundColor:"white"
                }
              }}
            >
              {/* notifications section  */}
             
              {/* Badge section  */}
  
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  marginLeft: "20px",
                }}
              >
                <Typography
                  fontSize="14px"
                  sx={{
                    marginRight: "10px",
                    // color: "#6e6b7b",
                    "@media (max-width: 940px)": {
                      display: "none",
                    },
                  }}
                >
                Harshit Upadhyay
                </Typography>
                <Typography
                  fontSize="12px"
                  sx={{
                    marginRight: "10px",
                    // color: "#6e6b7b",
                    "@media (max-width: 940px)": {
                      display: "none",
                    },
                  }}
                  textAlign="end"
                >
                  Captain
                </Typography>
              </Box>
              <Button >
                <AccountCircleIcon sx={{fontSize:'28px'}} />
              </Button>
              {/* image here   */}
             
          
            </Button>
          </Box>
        </StyledToolbar>
      </StyledAppbar>
      <StyledDrawer
        variant="permanent"
        sx={{
          zIndex: 100000,
          // boxShadow: '0 0 15px 0 rgba(34,41,47,.05)',border:'none'
        }}
        open={open}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <StyledDrawerHeader>
          {open ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                marginBottom: "20px",
              }}
            >
              <img
                style={{
                  width: "70px",
                  height: "90px",
                  marginLeft: "30px",
                  paddingTop: "25px",
                }}
                src={a}
                alt=""
              />
              {/* <ChevronRightIcon onClick={handleDrawerOpen}/>  */}
            </Box>
          ) : (
            <Box sx={{ marginBottom: "20px", marginTop: "30px" }}>
              <img
                style={{ width: 35, height: 35, marginLeft: "8px" }}
                src={a}
                alt=""
              />
            </Box>
          )}
          {open && (
            <IconButton onClick={handleDrawerOpen}>
              {icon ? <RemoveCircleOutlineIcon /> : <AddCircleOutlineIcon />}
            </IconButton>
          )}
        </StyledDrawerHeader>
        <Divider />
        <a href="home.html"><HomeIcon  sx={{fontSize:'26px',color:'#8e44ad',marginRight:'1rem',marginBottom:'5px'}}/><span>Home</span></a>
      <a href="about.html"><RadioButtonCheckedIcon  sx={{fontSize:'26px',color:'#8e44ad',marginRight:'1rem'}}/><span>Question Paper-MCQs</span></a>
      <a href="courses.html"><CreateIcon sx={{fontSize:'26px',color:'#8e44ad',marginRight:'1rem'}}/><span>Question Paper-Written</span></a>
      <a href="teachers.html"><CastForEducationIcon sx={{fontSize:'26px',color:'#8e44ad',marginRight:'1rem'}}/><span>Study Buddy</span></a>
      <a href="contact.html"><CardGiftcardIcon  sx={{fontSize:'26px',color:'#8e44ad',marginRight:'1rem',marginBottom:'5px'}}/><span>Subscriptions</span></a>
 
      </StyledDrawer>
      <DrawerHeader />
    </Box>
  );
}
