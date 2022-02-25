import { Link } from "react-router-dom";
import "./frontpage.scss";
import axios from "axios";

function FrontPage() {
  async function test() {
    await axios.get("http://localhost:3001/getblocks").then((result) => {
      console.log(result);
    });
  }

  return (
    <div>
      <div className="searchBar">
        <div className="searchIcon">
          <span className="material-icons search" onClick={test}>
            search
          </span>
        </div>
        <input className="searchBlock" placeholder="Search by Address / Transaction Hash / Block / Token" />
      </div>
      {/* <Link to="posting">
                <button>posting</button>
            </Link>
            <Link to="signup">
                <button>signup</button>
            </Link> */}
    </div>
  );
}

export default FrontPage;
