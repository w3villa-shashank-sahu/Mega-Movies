import { Search, HeartIcon } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect} from 'react';
import { MyRoutes } from '../backend/const';


const AppBar = () => {
  const [showInput, setShowInput] = useState(false);
  const [directSearch, setDirectSearch] = useState(true);
  const navigate = useNavigate();
  // useBreakpoint()
  const location = useLocation();
  
  const handleSearch = () => {
    if(directSearch == true){
      let input = document.getElementById('searchInput');
      if(input.value.length == 0){
        alert('Please enter a search query');
        return;
      }
      console.log('current path: ', location.pathname);
      
      if(location.pathname.startsWith(MyRoutes.search)){
        navigate(MyRoutes.search + input.value)
        window.location.reload()
        console.log('refreshing the page');
        return;
      }
      navigate(MyRoutes.search + input.value)
      return;
    }else{
      console.log('kj ff lskj fsa');
      setShowInput(!showInput);
    }
  };

  const handleSearch2 = () => {
    let input = document.getElementById('searchInput2');
    if(input.value.length == 0){
      alert('Please enter a search query');
      return;
    }
    navigate(MyRoutes.search + input.value)
    return;
  }

  useEffect(()=>{
    const handleResize = () => {
      console.log('resized');
      
      if(window.innerWidth <= 640){
        setDirectSearch(false)
      }else{
        setDirectSearch(true)
      }
    }
    console.log('running constructor');
    
    window.addEventListener("resize", handleResize);
    return ()=>{
      window.removeEventListener("resize", handleResize)
    }
  },[])


  return (
    <nav className="bg-gray-900 px-4 pb-4 w-full sticky top-0 z-1 h-fit justify-center flex flex-col sm:flex-row">
      <div className="max-w-7xl w-full flex justify-between items-center h-full pt-3">
        <h1 className="text-white text-[clamp(25px,3.5vw,30px)] md:text-3xl font-bold cursor-default"
        onClick={()=>{navigate(MyRoutes.home)}}>
          Mega Movies
        </h1>
        <div className="flex items-center text-sm md:text-base gap-3">
          {/* wishlist button */}
          <button className="text-yellow-500 flex items-center gap-2 bg-gray-800 p-2 md:py-2 md:px-3 rounded-lg h-8 cursor-pointer hover:bg-gray-700"
          onClick={()=>{navigate(MyRoutes.wishlist)}}>
            <span className="hidden sm:inline">Wishlist</span>
            <HeartIcon size={'20px'} />
          </button>
          {/* search bar */}
          <div className="rounded-lg bg-gray-800 text-white h-8 items-center flex">
              <input
                type="text"
                id="searchInput"
                placeholder="Search movies"
                autoComplete='off'
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleSearch();
                  }
                }}
                className={`w-32 md:w-64 focus:outline-none hidden sm:inline pl-2 focus:bg-transparent`} // Toggle visibility based on showInput
              />
              <button onClick={handleSearch} className='h-full px-2 bg-gray-700 rounded-xl sm:rounded-r-xl cursor-pointer hover:bg-gray-600'>
                <Search size={'20px'} />
              </button>
          </div>
        </div>
        
      </div>
      <div className={`w-full flex sm:hidden my-2 rounded-md text-sm overflow-hidden outline-[#fff7] outline-1 text-white duration-300 ease-in-out transition-all ${showInput ? 'h-auto opacity-100' : 'h-0 opacity-0'}`}>
        <input
          type="text"
          id="searchInput2"
          placeholder="Search movies"
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleSearch();
            }
          }}
          className="focus:outline-none px-2 py-1 flex-1"
        />
        <button className='bg-amber-300 hover:bg-amber-400 cursor-pointer px-2 rounded-sm w-[60px] text-black' onClick={handleSearch2}>Go</button>
      </div>
    </nav>
  );
};

export default AppBar;