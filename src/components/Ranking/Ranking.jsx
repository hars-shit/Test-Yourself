import MovingIcon from "@mui/icons-material/Moving";
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ListIcon from '@mui/icons-material/List';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
const Ranking = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="md:flex">
        <div className=" md:w-4/5 pr-4">
          <h1 className="text-2xl font-semibold  mb-4">Leaderboard for today</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg shadow-md p-6 ">
              <div className="flex items-center space-x-4 flex-col mb-6">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqAki4kSEm5ya-kSOHnOgKVCKHTOCFQOEMpOYtY28FZR1XfxrSUse-Tv2LiwqC202sr2g&usqp=CAU"
                  alt="user"
                  className="w-16 h-16 rounded-full"
                />
                <p className="font-semibold">DOlly mamgai</p>
              </div>
              <hr className="bg-black"/>

              <div className="flex items-center  justify-between">
              <MovingIcon style={{ fontSize: '4.5rem', color: 'green', borderRadius: '9999px', padding: '0.5rem' }} />


                <p className="text-xl font-medium">122</p>
              </div>
              <hr className="bg-black"/>

              <div className="mt-4 flex justify-between">
                <p>hello</p>
                <p>Hii</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center space-x-4 flex-col mb-6">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqAki4kSEm5ya-kSOHnOgKVCKHTOCFQOEMpOYtY28FZR1XfxrSUse-Tv2LiwqC202sr2g&usqp=CAU"
                  alt="user"
                  className="w-16 h-16 rounded-full"
                />
                <p className="font-semibold">DOlly mamgai</p>
              </div>
              <hr className="bg-black"/>

              <div className="flex items-center  justify-between">
              <MovingIcon style={{ fontSize: '4.5rem', color: 'green', borderRadius: '9999px', padding: '0.5rem' }} />
              <p className="text-xl font-medium">122</p>
              </div>
              <hr className="bg-black"/>

              <div className="mt-4 flex justify-between">
                <p>hello</p>
                <p>Hii</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center space-x-4 flex-col mb-6">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqAki4kSEm5ya-kSOHnOgKVCKHTOCFQOEMpOYtY28FZR1XfxrSUse-Tv2LiwqC202sr2g&usqp=CAU"
                  alt="user"
                  className="w-16 h-16 rounded-full"
                />
                <p className="font-semibold">DOlly mamgai</p>
              </div>
              <hr className="bg-black"/>

              <div className="flex items-center  justify-between">
              <TrendingDownIcon style={{ fontSize: '4.5rem', color: 'red', borderRadius: '9999px', padding: '0.5rem' }} />
              <p className="text-xl font-medium">122</p>
              </div>
              <hr className="bg-black"/>

              <div className="mt-4 flex justify-between">
                <p>hello</p>
                <p>Hii</p>
              </div>
            </div>
          </div>

          <div className="mt-4 mb-3">
            <p className="font-semibold text-lg">Other employees</p>
            <div className="flex items-center justify-evenly mt-8">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqAki4kSEm5ya-kSOHnOgKVCKHTOCFQOEMpOYtY28FZR1XfxrSUse-Tv2LiwqC202sr2g&usqp=CAU" alt="user" className="w-16 h-16 rounded-full" />
             
                <p className="font-semibold">harshit</p>
                
                  <p>56899999</p>
                  <TrendingDownIcon style={{ fontSize: '4.5rem', color: 'red', borderRadius: '9999px', padding: '0.5rem' }} />
                  <p>92</p>
                  
                  <ListIcon/>
                  <div>
              </div>
            </div>
            <hr className="bg-black"/>
            <div className="flex items-center justify-evenly mt-8">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqAki4kSEm5ya-kSOHnOgKVCKHTOCFQOEMpOYtY28FZR1XfxrSUse-Tv2LiwqC202sr2g&usqp=CAU" alt="user" className="w-16 h-16 rounded-full" />
             
                <p className="font-semibold">harshit</p>
                
                  <p>56899999</p>
                  <MovingIcon style={{ fontSize: '4.5rem', color: 'green', borderRadius: '9999px', padding: '0.5rem' }} />
                  <p>92</p>
                  <ListIcon/>
                  <div>
              </div>
            </div>
            <hr className="bg-black"/>
            <div className="flex items-center justify-evenly mt-8">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqAki4kSEm5ya-kSOHnOgKVCKHTOCFQOEMpOYtY28FZR1XfxrSUse-Tv2LiwqC202sr2g&usqp=CAU" alt="user" className="w-16 h-16 rounded-full" />
             
                <p className="font-semibold">harshit</p>
                
                  <p>56899999</p>
                  <TrendingDownIcon style={{ fontSize: '4.5rem', color: 'red', borderRadius: '9999px', padding: '0.5rem' }} />
                  <p>92</p>
                  <ListIcon/>
                  <div>
              </div>
            </div>
            <hr className="bg-black"/>
            <div className="flex items-center justify-evenly mt-8 ">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqAki4kSEm5ya-kSOHnOgKVCKHTOCFQOEMpOYtY28FZR1XfxrSUse-Tv2LiwqC202sr2g&usqp=CAU" alt="user" className="w-16 h-16 rounded-full" />
             
                <p className="font-semibold">harshit</p>
                
                  <p>56899999</p>
                  <MovingIcon style={{ fontSize: '4.5rem', color: 'green', borderRadius: '9999px', padding: '0.5rem' }} />
                  <p>92</p>
                  <ListIcon/>
                  <div>
              </div>
            </div>
            <hr className="bg-black"/>
          </div>
        </div>
        <div className="w-full md:w-1/4 pl-4 bg-white shadow-lg">
          
            
        <div className=" justify-evenly mt-2 mb-9 hidden sm:flex">
    <SearchIcon/>
    <NotificationsNoneIcon/>
    <ListIcon/>
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqAki4kSEm5ya-kSOHnOgKVCKHTOCFQOEMpOYtY28FZR1XfxrSUse-Tv2LiwqC202sr2g&usqp=CAU" alt="user" className="w-7 h-7 rounded-full" />
</div>

         
          <div className="mb-4">
            <p className="font-semibold mb-5 text-lg uppercase">Overview</p>
            <div className="flex gap-5">
    <div className="bg-red-500 text-white  px-8 py-5 rounded">
        <p>3654</p>
    </div>
    <div className="bg-green-500 text-white px-8 py-5 rounded">
        <p>$12566</p>
    </div>
</div>
          </div>
         <div className="mb-6">
         <div className="mb-2">
            <div className="flex justify-between">
                <p>total </p>
                <p>400/500</p>
            </div>
            <input className="border-b-8 border-blue-500 focus:border-blue-700"  />
         </div>
         <div className="mb-2">
            <div className="flex justify-between">
                <p>total </p>
                <p>400/500</p>
            </div>
            <input className="border-b-8 border-blue-500 focus:border-blue-700"  />
         </div>
         <div className="mb-2">
            <div className="flex justify-between">
                <p>total </p>
                <p>400/500</p>
            </div>
            <input className="border-b-8 border-blue-500 focus:border-blue-700"  />
         </div>
         
         </div>
          <div>
            <div className="flex justify-between mb-4">
              <p className="font-semibold text-lg">News</p>
              <button className="border border-black px-3 py-1 rounded-3xl hover:bg-[#8e44ad]">Show all</button>
            </div>
            <div className="flex items-center space-x-4 mt-2">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqAki4kSEm5ya-kSOHnOgKVCKHTOCFQOEMpOYtY28FZR1XfxrSUse-Tv2LiwqC202sr2g&usqp=CAU" alt="news" className="w-10 h-10 rounded-full" />
              <div>

              <p className="font-semibold">dolly mamgai</p>
              <p className="text-gray-500">Exceutive coder</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 mt-2">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqAki4kSEm5ya-kSOHnOgKVCKHTOCFQOEMpOYtY28FZR1XfxrSUse-Tv2LiwqC202sr2g&usqp=CAU" alt="news" className="w-10 h-10 rounded-full" />
              <div>

              <p className="font-semibold">dolly mamgai</p>
              <p className="text-gray-500">Exceutive coder</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 mt-2">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqAki4kSEm5ya-kSOHnOgKVCKHTOCFQOEMpOYtY28FZR1XfxrSUse-Tv2LiwqC202sr2g&usqp=CAU" alt="news" className="w-10 h-10 rounded-full" />
              <div>

              <p className="font-semibold">dolly mamgai</p>
              <p className="text-gray-500">Exceutive coder</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ranking;