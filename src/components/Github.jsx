import  { useState } from "react";
import location_icon from '../assets/pin.png'
import github_icon from '../assets/github.png'
import link_icon from '../assets/link.png'

function Github() {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");

  const fetchUser = async () => {
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      
      if (!response.ok) {
        throw new Error("User not found");
      }
      const data = await response.json();
      setUserData(data);
      console.log(data)
      setError("");
    } catch (error)
     {
      console.log(error);
      setUserData(null);
      setError("User not found. Please check the username and try again.");
    }
  };

  const Submit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      fetchUser("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 flex flex-col items-center">
      <div className="flex h-12 mb-12 gap-5">
      <img src={github_icon} alt="" className="w-16 h-16" />
      <h1 className="text-6xl font-bold text-gray-800 mb-6">GitHub Username</h1>
      </div>
      <form onSubmit={Submit}className="flex items-center w-full max-w-md mb-6">
        <input type="text"value={username}onChange={(e) => setUsername(e.target.value)}placeholder="Enter GitHub username"className="flex-grow border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"/>
        <button type="submit"className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          Search
        </button>
      </form>
     
      {error && <p className="text-red-500 mb-4">{error}</p>}
       
      {userData && (
        <div className="w-full max-w-2xl bg-white  rounded-lg p-6">
          <h1 className="text-5xl text-center mb-12" >OverView Of <span className=" text-blue-400 text-center">{username}</span></h1>

          <div className=" flex items-center space-x-4 mb-6 justify-center">
            <img
              src={userData.avatar_url}alt="Profile"className="w-30 h-30 rounded-full"/>
            <div className=" w-110 ">
              <h2 className="text-2xl font-bold text-blue-400">{userData.name || "No Name"}</h2>
              <div className="flex ">
              <img src={location_icon} alt="" className="w-6 h-7 m-1" />
              <p className="text-gray-800 text-2xl">{userData.location || "No Location"}</p></div>
              <div className="flex w-5 h-6">
                <img src={link_icon} alt="" className="w-5 mt-1" />
              <a href={userData.html_url}target="_blank"className="text-blue-500 text-2xl hover:underline">
                {userData.html_url}
              </a>
              </div>
            </div>
          </div>
          <div className="flex justify-between text-center border-t border-gray-200 pt-4">
            <div>
              <p className="text-gray-500">Followers</p>
              <p className="text-xl font-bold text-blue-400">{userData.followers}</p>
            </div>
            <div>
              <p className="text-gray-500">Following</p>
              <p className="text-xl font-bold text-blue-400">{userData.following}</p>
            </div>
            <div>
              <p className="text-gray-500">Public Repos</p>
              <p className="text-xl font-bold text-blue-400">{userData.public_repos}</p>
            </div>

            <div>
              <p className="text-gray-500">Public Gists</p>
              <p className="text-xl font-bold text-blue-400">{userData.public_gists}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Github;
