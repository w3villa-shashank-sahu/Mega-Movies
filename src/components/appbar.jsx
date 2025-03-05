import { Search, HeartIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { MyConst, MyRoutes } from '../backend/const';

const AppBar = () => {
  const [showInput, setShowInput] = useState(false);
  const navigate = useNavigate();
  
  const handleSearch = () => {
    if(showInput == false){
      let input = document.getElementById('searchInput');
      if(input.value.length == 0){
        alert('Please enter a search query');
        return;
      }
      navigate(MyRoutes.search + input.value)
    }
    setShowInput(!showInput); // Toggle the showInput state
  };

  const onWishlistBtnClicked = () => {
    navigate(MyRoutes.wishlist)
  }

  return (
    <nav className="bg-gray-900 w-full sticky top-0 z-1 h-fit justify-center flex flex-col sm:flex-row">
      <div className="max-w-7xl w-full flex justify-between items-center h-full pt-3 ">
        <h1 className="text-white text-[clamp(18px,3.5vw,30px)] md:text-3xl font-bold ">
          Mega Movies
        </h1>
        <div className="flex items-center text-sm md:text-base gap-3">
          <button className="text-yellow-500 flex items-center gap-2 bg-gray-800 p-2 md:py-2 md:px-3 rounded-lg h-8 cursor-pointer hover:bg-gray-700"
          onClick={onWishlistBtnClicked}>
            <span className="hidden sm:inline">Wishlist</span>
            <HeartIcon size={'clamp(15px, 2.5vw, 20px)'} />
          </button>
          <div className="rounded-lg bg-gray-800 text-white h-8 items-center flex">
            <input
              type="text"
              id="searchInput"
              placeholder="Search movies"
              className={`w-32 md:w-64 focus:outline-none hidden sm:inline pl-2 focus:bg-transparent`} // Toggle visibility based on showInput
            />
            <button onClick={handleSearch} className='h-full px-2 bg-gray-700 rounded-r-xl cursor-pointer hover:bg-gray-600'>
              <Search size={'clamp(15px, 2.5vw, 20px)'} />
            </button>
          </div>
        </div>
        
      </div>
      <div className={`w-full flex   sm:hidden my-2  rounded-md text-sm overflow-hidden outline-[#fff7] outline-1 text-white duration-300 ease-in-out transition-all ${showInput ? 'h-auto opacity-100' : 'h-0 opacity-0'}`}>
        <input
          type="text"
          id="searchInput2"
          placeholder="Search movies"
          className="focus:outline-none px-2 py-1  flex-1 "
        />
        <button className='bg-amber-300 px-2 rounded-sm w-[60px]'>Go</button>
      </div>
    </nav>
  );
};

export default AppBar;