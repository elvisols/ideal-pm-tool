import React from "react";
import { Link } from "react-router-dom";

/**
 * Created using 'rfc' ENTER
 * This functional component only has access to props. Its stateless!
 */
const CreateProjectButton = () => {
  return (
    <React.Fragment>
      {
        // must return a JSX element => surrounding with a div most likely.
        // React.Fragment allows the content to return a JSX element without the extra 'div' when this is transformed to html
    
      }
    <Link to="/addProject" className="btn btn-lg btn-info">
    Create a Project
    </Link>
    </React.Fragment>
    );
};

export default CreateProjectButton;
