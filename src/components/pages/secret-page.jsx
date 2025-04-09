import React from "react"
import { useNavigate } from "react-router-dom"

const SecretPage = ({ isLoggedIn }) => {
    const navigate = useNavigate()

    if (isLoggedIn) {
        return (
            <div className="jumbotron text-center">
                <h5>This page is full of secrets!!!</h5>
            </div>
        )
    }

    // Redirect to login page if not logged in
    navigate('/login')
    return null
}

export default SecretPage
