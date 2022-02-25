import "./Nav.scss";
import { Link } from "react-router-dom";
import { DropdownButton, Dropdown } from "react-bootstrap";
function Nav() {
  return (
    <div className="NavBar">
      <div className="NavBarInisde">
        <div className="NavBarInisdeContainer">
          <Link to="/" className="homeNav">
            Harmony
          </Link>
          <Link to="/dnw" className="nav" id="DepositWithdraw">
            Deposit & Withdraw History
          </Link>
          <DropdownButton className="nav" id="dropdown-basic-button" title="Tokens">
            <Dropdown.Item>
              <Link to="/" className="noneDeco">
                HRC-20 tokens
              </Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link to="/" className="noneDeco">
                HRC-721 tokens
              </Link>
            </Dropdown.Item>

            <Dropdown.Item>
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
