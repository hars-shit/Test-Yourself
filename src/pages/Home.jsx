
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import HomeIcon from '@mui/icons-material/Home';
import CreateIcon from '@mui/icons-material/Create';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import CastForEducationIcon from '@mui/icons-material/CastForEducation';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import logo from '../assets/logo.png'
import PersonIcon from '@mui/icons-material/Person';
import BasicChips from '../components/custom/Chips';
import Calender from '../components/custom/Calender';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
// import './home.css'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Home = () => {
   const user=useSelector((state)=>state.loggedSlice.currentUser);
   console.log('User',user)
   const navigate=useNavigate()
 
  return (
   <>
    
<header className="header">
   
   <section className="flex">

      <p className="logo">AutoProp</p>

      <form   className="search-form">
         <input type="text" name="search_box" required placeholder="search courses..." maxLength="100" />
         <button type="submit" className="fas fa-search"><SearchIcon sx={{fontSize:'26px'}}  className="fas fa-search"/></button>
      </form>

      <div className="icons" style={{display:'flex'}}>
         <div id="toggle-btn" className="fas fa-sun" onClick={()=>navigate('/notification')}><NotificationsActiveIcon sx={{fontSize:'24px'}}/></div>
         <div id="user-btn" className="fas fa-user"><PersonIcon sx={{fontSize:'26px'}}/></div>
         <div id="toggle-btn" className="fas fa-sun" ><SettingsIcon sx={{fontSize:'22px'}}/></div>
      </div>

      <div className="profile">
         <img src="" className="image" alt="" />
         <h3 className="name">shaikh anas</h3>
         <p className="role">studen</p>
         <a href="profile.html" className="btn">view profile</a>
         <div className="flex-btn">
            <a href="login.html" className="option-btn">login</a>
            <a href="register.html" className="option-btn">register</a>
         </div>
      </div>

   </section>

</header>   

<div className="side-bar">

   <div id="close-btn">
      <i className="fas fa-times"></i>
   </div>

   <div className="profile">
      <img src={logo} className="image" alt="" style={{width:'100%'}}/>
      <h3 className="name">{user.username}</h3>
      <a href="profile.html" className="btn">view profile</a>
   </div>

   <nav className="navbar">
      <a href="home.html"><HomeIcon  sx={{fontSize:'26px',color:'#8e44ad',marginRight:'1rem',marginBottom:'5px'}}/><span>Home</span></a>
      <a href="about.html"><RadioButtonCheckedIcon  sx={{fontSize:'26px',color:'#8e44ad',marginRight:'1rem'}}/><span>Question Paper-MCQs</span></a>
      <a href="courses.html"><CreateIcon sx={{fontSize:'26px',color:'#8e44ad',marginRight:'1rem'}}/><span>Question Paper-Written</span></a>
      <a href="teachers.html"><CastForEducationIcon sx={{fontSize:'26px',color:'#8e44ad',marginRight:'1rem'}}/><span>Study Buddy</span></a>
      <a href="contact.html"><CardGiftcardIcon  sx={{fontSize:'26px',color:'#8e44ad',marginRight:'1rem',marginBottom:'5px'}}/><span>Subscriptions</span></a>
   </nav>

</div>

<section className="home-grid">

   <h1 className="heading">quick options</h1>

   <div className="box-container">

      <div className="box">
         <h3 className="title">Question Paper-MCQs</h3>
         <p className="likes">total Paper : <span>25</span></p>
         <a href="#" className="inline-btn">view Details</a>
         <p className="likes">total Questions : <span>12</span></p>
         <a href="#" className="inline-btn">view comments</a>
         <p className="likes" style={{marginBottom:'1rem'}}>Favorite Theme : </p>

         {/* for a specific topic  */}
         <div >
               <div className="likes" style={{display:'flex',alignItems:'center',justifyContent:'space-between',flexDirection:"row"}}>
         <BasicChips label="Java"/>
               <p style={{fontSize:'14px'}}>x 30 questions</p>
               </div>
         </div>
          <div >
               <div className="likes" style={{display:'flex',alignItems:'center',justifyContent:'space-between',flexDirection:"row"}}>
         <BasicChips label="Cryptography"/>
               <p style={{fontSize:'14px'}}>x 30 questions</p>
               </div>
         </div>
         {/* <a href="#" className="inline-btn">view playlists</a> */}
      </div>

      <div className="box">
         <h3 className="title">Question Paper-Written</h3>
         <p className="likes">total Paper : <span>25</span></p>
         <a href="#" className="inline-btn">view Details</a>
         <p className="likes">total Questions : <span>12</span></p>
         <a href="#" className="inline-btn">view comments</a>
         <p className="likes" style={{marginBottom:'1rem'}}>Favorite Theme : </p>

         {/* for a specific topic  */}
         <div >
               <div className="likes" style={{display:'flex',alignItems:'center',justifyContent:'space-between',flexDirection:"row"}}>
         <BasicChips label="Java"/>
               <p style={{fontSize:'14px'}}>x 30 questions</p>
               </div>
         </div>
          <div >
               <div className="likes" style={{display:'flex',alignItems:'center',justifyContent:'space-between',flexDirection:"row"}}>
         <BasicChips label="Cryptography"/>
               <p style={{fontSize:'14px'}}>x 30 questions</p>
               </div>
         </div>
         {/* <a href="#" className="inline-btn">view playlists</a> */}
      </div>

      <div className="box">
         <h3 className="title">Recent Themes</h3>
         <div className="flex">
            <a ><span>Java</span></a>
            <a ><span>Cryptography</span></a>
            <a ><span>Arrays</span></a>
            <a ><span>Go Lang</span></a>
            <a ><span>Javascript</span></a>
         </div>
      </div>
      
      <div className="box">
         <h3 className="title">Solve With Friend</h3>
         <p className="tutor">Connect with friends in real-time to tackle practice exams together.</p>
         <a href="teachers.html" className="inline-btn">get started</a>
      </div>

      <div className="box" style={{width:"40rem"}}>
         <h3 className="title">become a tutor</h3>
         <Calender />
      </div>

   </div>

</section>


   </>
  )
}

export default Home
