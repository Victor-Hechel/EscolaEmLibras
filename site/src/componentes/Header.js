import React from "react"

const Header = () => {
    return (
        <header>
            <img id="logo" src="/logo_site.png" alt="logo do site" />
            <h1>Escola em Libras</h1>
    
            <div className="right-content">
                <i id="logout-icon" className="bi bi-box-arrow-right"></i>
            </div>
        </header>
    )
}

export default Header