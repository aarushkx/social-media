import React, { useState } from "react";
import { Search as SearchIcon } from "@mui/icons-material";
import VerifiedIcon from "@mui/icons-material/Verified";
import { USER_API_ENDPOINT } from "../../endpoints.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Search() {
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();

        if (searchTerm.trim() === "") {
            return;
        }

        setIsLoading(true);
        try {
            const response = await axios.get(
                `${USER_API_ENDPOINT}/search?query=${searchTerm}`,
                {
                    withCredentials: true,
                }
            );
            setSearchResults(response.data);
            document.getElementById("searchResultsModal").showModal();
        } catch (error) {
            console.error("Error searching users: ", error.response?.data);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="header bg-base-300 p-4 flex justify-center">
            <div className="relative w-full max-w-md">
                <form onSubmit={handleSearch}>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search"
                        className="input input-sm w-full p-4 pr-10"
                    />
                    <SearchIcon
                        onClick={handleSearch}
                        className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-gray-300 cursor-pointer"
                    />
                </form>
            </div>

            {/* Modal for search results */}
            <dialog id="searchResultsModal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Search Results</h3>
                    <div className="py-4">
                        {!isLoading && searchResults.length > 0 ? (
                            <ul>
                                {searchResults.map((user) => (
                                    <li
                                        key={user._id}
                                        onClick={() =>
                                            navigate(
                                                `/profile/${user.username}`
                                            )
                                        }
                                        className="p-2 border-b border-gray-700 rounded-xl last:border-none cursor-pointer hover:bg-base-300"
                                    >
                                        <div className="flex items-center">
                                            {/* User Avatar */}
                                            <img
                                                src={user.avatar}
                                                alt={user.username}
                                                className="w-12 h-12 object-cover rounded-full mr-3"
                                            />
                                            <div>
                                                {/* Username and Verified Badge */}
                                                <div className="flex items-center space-x-1">
                                                    <span className="font-bold">
                                                        @{user.username}
                                                    </span>
                                                    {user.isVerified && (
                                                        <VerifiedIcon
                                                            color="primary"
                                                            fontSize="small"
                                                        />
                                                    )}
                                                </div>
                                                {/* User Name */}
                                                <span className="text-gray-500">
                                                    {user.name}
                                                </span>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No users found.</p>
                        )}
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>Close</button>
                </form>
            </dialog>
        </div>
    );
}

export default Search;
