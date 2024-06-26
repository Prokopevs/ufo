import React from "react"
import Header from "./components/Header"
import Sidebar from "./components/sidebarComponents/Sidebar"
import Article from "./pages/Article"
import Home from "./pages/Home"
import useLocalStorage from "use-local-storage"
import { useMediaQuery } from "react-responsive"

import { Routes, Route } from "react-router-dom"
import Error from "./pages/Error"

const App = () => {
    const [dark, setDark] = useLocalStorage("dark", true)
    const [burger, setBurger] = React.useState(true)
    const isMobile = useMediaQuery({ query: `(max-width: 950px)` })

    React.useEffect(() => {
        if (isMobile) {
            setBurger(false)
        }
        if (!isMobile) {
            setBurger(true)
        }
    }, [isMobile])

    const changeTheme = () => {
        setDark(!dark)
    }

    return (
        <div className={"theme " + (dark ? "theme--default" : "theme--light")}>
            <div className="page">
                <Header
                    changeTheme={changeTheme}
                    dark={dark}
                    setBurger={setBurger}
                    burger={burger}
                />
                <Sidebar burger={burger} setBurger={setBurger} isMobile={isMobile} />
                <main className={burger ? "main" : "main center"}>
                    <div className="container">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/article/:id" element={<Article />} />
                            <Route path="/error" element={<Error />} />
                        </Routes>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default App
