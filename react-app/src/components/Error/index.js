import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Error.css";

export const Error = () => {
    const history = useHistory();
    const currUser = useSelector(state => state.session.user);

    const home = currUser
        ? "/all"
        : "/"

    const divClassName = currUser
        ? "err-container"
        : "err-container add-margin"

    return (
        <div className={divClassName}>
            <div className="err-left">
                <img src="https://feedium-bucket.s3.amazonaws.com/err.png" alt="404 Image" />
            </div>
            <div className="err-right">
                <span>PAGE NOT FOUND</span>
                <span>404</span>
                <span>Out of nothing, something.</span>
                <span>You can find (just about) anything (cuisine-related) on Feedium — apparently even a page that doesn’t exist. Maybe these stories about finding what you didn’t know you were looking for will take you somewhere new?</span>
                <span onClick={() => history.push(`${home}`)}>Home</span>
            </div>
        </div>
    )
}
