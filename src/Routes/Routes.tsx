import { FC } from "react";
import { useRoutes } from "react-router-dom";
import Layout from "../Layouts/Layout";
import Home from "../pages/Home";
import Detail from "../pages/Detail";
import SearchPage from "../search/SearchPage";
import ResultSearch from "../search/ResultSearch";

const Routes: FC = () => {
    let routes = [
        {
            path: "/",
            element: <Layout/>,
            children: [
                {
                    path: "/",
                    element: <Home/>
                }
            ]
        },
        {
            path: "/detail/:id",
            element: <Detail/>
        },
        {
            path: "/SearchPage/",
            element: <SearchPage/>
        },
        {
            path: "/ResultSearch/:id",
            element: <ResultSearch/>
        }
    ];

    let element = useRoutes(routes);

    return (
        <div>
            {element}
        </div>
    )
}

export default Routes;