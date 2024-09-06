import "./Loader.css"
import loaderPic from "../../images/spinner3.gif";

function Loader() {
  return (
    <div className='loadingMain z-30'>
      <img src={loaderPic} alt='Loading....' />
    </div>
  )
}

export default Loader