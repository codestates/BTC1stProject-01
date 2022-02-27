import "./Nav.scss";
import { Link } from "react-router-dom";
import { DropdownButton, Dropdown } from "react-bootstrap";
function Nav() {
  function callAlert() {
    //구현 대기중인 알람
    alert("Not Ready..");
  }

  return (
    <div className="NavBar">
      <div className="NavBarInisde">
        <div className="NavBarInisdeContainer">
          <Link to="/" className="homeNav">
            <img className="NMM_logo" src={`https://cdn.discordapp.com/attachments/945264538171871275/946778661581914212/n128.png`} />
            NMM-Harmony
          </Link>
          <DropdownButton className="nav" id="dropdown-basic-button" title="Tokens">
            <Dropdown.Item onClick={callAlert}>
              <Link to="/" className="noneDeco">
                HRC-20 tokens
              </Link>
            </Dropdown.Item>
            <Dropdown.Item onClick={callAlert}>
              <Link to="/" className="noneDeco">
                HRC-721 tokens
              </Link>
            </Dropdown.Item>

            <Dropdown.Item onClick={callAlert}>
              <Link to="/" className="noneDeco">
                HRC-1155 tokens
              </Link>
            </Dropdown.Item>
          </DropdownButton>
        </div>
      </div>
    </div>
  );
}
export default Nav;
