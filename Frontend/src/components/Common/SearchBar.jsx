import { useState } from "react";
import { HiMagnifyingGlass, HiMiniXMark } from "react-icons/hi2";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSearchToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSearch =(e) => {
    e.preventDefault();
    console.log("Search term:", searchTerm);
    setIsOpen(false);
    setSearchTerm("");
  }

  return (
    <div className={`flex item-center justify-center w-full transition-all duration-300 ${isOpen?"absolute top-4 left-0 w-full bg-white h-12 z-50":"w-auto"}`}>
      {isOpen ? (
        <form className="relative flex justify-center h-7 w-full"
        
        onSubmit={handleSearch}>
          <div className="relative h-2.5 w-1/2 ">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gray-100 px-4 pl-2 pr-12 rounded-lg focus:outline-none w-full placeholder:gray-700"
            />
            <button type="submit" className="absolute right-2 top-2 transform -translate-y-1 text-gray-600 hover:text-gray-800">
                <HiMagnifyingGlass className="h-4 w-4" />
            </button>

          </div>
          <button type="button" onClick={handleSearchToggle} className="absolute right-2 top-1">
            <HiMiniXMark className="w-4 h-4 text-gray-700" />
          </button>
        </form>
      ) : (
        <button onClick={handleSearchToggle}>
          <HiMagnifyingGlass className="h-6 w-6" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
