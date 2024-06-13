import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { Outlet } from "react-router-dom";
import { FC } from 'react';
library.add(fas, far);

const Layout: FC = () => {
    return (
        //--- Mobile UI ---
        <div className="sm:hidden dark:bg-gray-950">
            <div className="bg-gray-50">
                <Outlet/>
            </div>
            <div className="sticky bottom-0 w-full bg-gray-950 rounded-t-2xl dark:bg-gray-800">
                <div className="grid grid-cols-4 gap-3 place-items-center p-4">
                    <div className="text-amber-500">
                        <FontAwesomeIcon icon={['fas', 'home']} size="lg" />
                    </div>
                    <div className="text-gray-400 dark:text-white">
                        <FontAwesomeIcon icon={['fas', 'shopping-bag']} size="lg" />
                    </div>
                    <div className="text-gray-400 dark:text-white">
                        <FontAwesomeIcon icon={['fas', 'box-archive']} size="lg" />
                    </div>
                    <div className="text-gray-400 dark:text-white">
                        <FontAwesomeIcon icon={['fas', 'user']} size="lg" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Layout;