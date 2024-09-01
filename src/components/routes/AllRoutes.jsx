import { Suspense, useContext } from "react"
import { Route, Routes } from "react-router-dom"
import App from "../../App.jsx"
import { RouteComps } from "./AllComponents.jsx"
import { AuthContext } from "../authprovider/AuthProvider.jsx"
import Spinner from "../spinner/Spinner.jsx"

function AllRoutes() {
    let { isLogin } = useContext(AuthContext);

    return (
        <Routes>
            <Route path="/" element={
                <Suspense fallback={<Spinner />}>
                    <App />
                </Suspense >
            }>
                {RouteComps.map(({ element, path, isPrivate, isVisibleAfterLogin, role }, index) => {
                    if (isLogin) {
                        if (isVisibleAfterLogin) {
                            if (role.includes(isLogin.userRole) || !isPrivate) {
                                return <Route key={index} path={path} element={element} />
                            }
                        }
                    } else
                        if (!isPrivate) {
                            return <Route key={index} path={path} element={element} />
                        }
                })}

            </Route>
        </Routes>
    )
}

export default AllRoutes
