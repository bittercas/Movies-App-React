import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <h1>Page Not Found</h1>
      <h1>404</h1>
      <Link to={"/"}>
        <button>Go to Home</button>
      </Link>
    </div>
  )
}

export default NotFound