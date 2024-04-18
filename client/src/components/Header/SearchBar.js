import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';

// import axiosInstance from '@/utils/axios';
// import { usePlaces } from '../../../hooks';

export default function SearchBar(){
//   const Places = usePlaces();
//   const { setPlaces, setLoading } = Places;

  const [searchText, setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);

//   const handleSearch = async (e) => {
//     clearTimeout(searchTimeout);
//     setSearchText(e.target.value);

//     if (searchText.trimStart() !== '') {
//       setLoading(true);
//       setSearchTimeout(
//         setTimeout(async () => {
//           const { data } = await axiosInstance.get(
//             `/places/search/${searchText.trimStart()}`,
//           );
//           setPlaces(data);
//           setLoading(false);
//         }, 500),
//       );
//     }
//   };

  return (
    <>
      <div className="flex w-4/6 overflow-hidden rounded-full border border-gray-400 bg-gray-300 shadow-sm hover:shadow-lg md:w-1/2">
        <div className="grow">
          <input
            type="search"
            placeholder="Where you want to go?"
            className="h-full w-full border-none py-2 px-4 text-sm  focus:outline-none md:text-lg"
            // onChange={(e) => handleSearch(e)}
            value={searchText}
          />
        </div>
        <div className="bg-blue flex cursor-pointer  items-center bg-primary text-white">
          <button
            className="flex rounded-r-full bg-primary py-2 px-4 md:p-2"
            // onClick={handleSearch}
          >
            <SearchIcon/>
            <span className="ml-1 hidden md:block">Search</span>
          </button>
        </div>
      </div>
    </>
  );
};


