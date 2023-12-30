import React from 'react'
import { Link} from 'react-router-dom';

function Header() {
  return (
    <>
    <h1>Bookkeeper</h1>
    <nav
      style={{
        borderBottom: "solid 1px",
        paddingBottom: "1rem",
      }}
    >
      <Link to="/home">homr</Link> |{" "}
      <Link to="/users">user</Link> |{" "}
      <Link to="/admin">admin</Link>
    </nav>
    
    </>
  )
}

export default Header