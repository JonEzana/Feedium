import "./Footer.css";

export const Footer = () => {

    return (
        <div id="footer-body">
            <span id="technologies-left">
                <div className='footer-h3-title-div'>
                    Technologies Used:
                </div>
                <div id="technology-icons">
                    <i className="fab fa-aws fa-xs"></i>
                    <i className="fab fa-js-square fa-xs"></i>
                    <i className="fab fa-react fa-xs"></i>
                    <i className="fab fa-html5 fa-xs"></i>
                    <i className="fab fa-css3 fa-xs"></i>
                    <i className="fab fa-python fa-xs"></i>
                </div>
            </span>
            <span id="creators-right">
                <div className='footer-h3-title-div'>
                     Jon Ezana
                </div>
                <div id='profile-items-container'>
                    <a href="https://github.com/JonEzana" id='creator-item'>
                        <i id="github-icon" className="fab fa-github"></i>
                    </a>
                    <a href="https://www.linkedin.com/in/jon-ezana" id='creator-item'>
                        <i id="linkedin-icon" className="fab fa-linkedin"></i>
                    </a>
                </div>
            </span>
        </div>
    )
}
