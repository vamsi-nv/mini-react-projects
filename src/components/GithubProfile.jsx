import { useState } from "react";
import useFetch from "./custom_hooks/useFetch/useFetchHook";

function GithubProfile() {
  const [input, setInput] = useState("");
  const [username, setUsername] = useState("");

  const { data, loading, error } = useFetch(
    username ? `https://api.github.com/users/${username}` : null
  );

  const handleSubmit = () => {
    setUsername(input.trim());
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center">
      <h1 className="text-4xl font-semibold mb-15">Github profile finder</h1>
      <div className="flex flex-col items-center w-80">
        <div className="mb-10 border border-gray-300 flex items-center rounded-full ">
          <input
          className="flex-1 outline-none px-3 py-2.5"
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Enter GitHub username"
          />
          <button onClick={handleSubmit} className="bg-blue-500 text-white cursor-pointer px-6 py-2.5 rounded-full">Search</button>
        </div>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {data && (
          <div className="flex flex-col items-center gap-1">
            <img src={data.avatar_url} alt={data.login} className="w-28 h-28 rounded-full"/>
            <p className="text-xl font-semibold">{data.name}</p>
            <a href={data.html_url} className="text-sm underline text-blue-400">@{data.login}</a>
            
            <div className="w-full my-6">
              <div className="w-full flex items-center ">
                <span className="flex-1">Public Repos</span>
                <span>{data.public_repos}</span>
              </div>
              <div className="w-full flex items-center ">
                <span className="flex-1">Followers</span>
                <span>{data.followers}</span>
              </div>
              <div className="w-full flex items-center ">
                <span className="flex-1">Following</span>
                <span>{data.following}</span>
              </div>
            </div>

            
          </div>
        )}
      </div>
    </div>
  );
}

export default GithubProfile;
