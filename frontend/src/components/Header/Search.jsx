// import React from "react";
// import { Search as SearchIcon } from "@mui/icons-material";

// function Search() {
//     return (
//         <div className="header bg-base-300 p-4 flex justify-center">
//             <div className="relative">
//                 <input
//                     type="text"
//                     placeholder="Search"
//                     className="input input-sm w-full max-w-md p-4 pr-10"
//                 />
//                 <SearchIcon
//                     onClick={() => {
//                         console.log("search");
//                     }}
//                     className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-gray-300 cursor-pointer"
//                 />
//             </div>
//         </div>
//     );
// }

// export default Search;













































import React from "react";
import { Search as SearchIcon } from "@mui/icons-material";

function Search() {
    return (
        <div className="header bg-base-300 p-4 flex justify-center">
            <div className="relative w-full max-w-md">
                <input
                    type="text"
                    placeholder="Search"
                    className="input input-sm w-full p-4 pr-10"
                />
                <SearchIcon
                    onClick={() => {
                        console.log("search");
                    }}
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-gray-300 cursor-pointer"
                />
            </div>
        </div>
    );
}

export default Search;
