import Accordian from "./components/accordian/Accordian"
import GithubProfile from "./components/GithubProfile"


function App() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center">
      <Accordian/>
      <GithubProfile/>
    </div>
  )
}

export default App