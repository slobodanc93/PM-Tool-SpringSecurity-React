import React from 'react'

function Footer() {

    const companyName = "My Company";
    const year = 2019;

    return (
        <div className="footer">
            <div className="wrap">
                <span className="copy">&copy; {year} {companyName}</span>
            </div>
        </div>
    )    
}

export default Footer;