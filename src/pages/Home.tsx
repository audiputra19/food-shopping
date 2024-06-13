import axios from "axios";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoveButton from "../components/LoveButton";
import FilterBtn from "../components/FilterBtn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { useTheme } from "../ThemeContext";
import { Product } from "../Interface/Product";
library.add(fas, far);

const Home: FC = () => {
    const [prod, setProd] = useState<Product[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        axios
            .get(`http://localhost:3000/product`)
            .then(res => {
                setProd(res.data);
                const uniqueCategories = [...new Set<string>(res.data.map((item: Product) => item.category))];
                setCategories(uniqueCategories);
            })
            .catch(err => {
                console.log(err);
            })
    },[]);

    const handleNotClick = (event: any) => {
        event.stopPropagation();
    };

    const dtpopular = (post:Product, i:number) => {
        const pricedisc = post.price * (post.disc/100);
        const totaldisc = post.price - pricedisc;
        function Disc(){
            if(post.disc !== 0){
                return (
                    <div>
                        <p className="text-sm font-bold text-gray-950 dark:text-amber-500">Rp. {totaldisc.toLocaleString('id-ID')}</p>
                    </div>  
                )
            } 
            else 
                return (
                    <div>
                        <p className="text-sm font-bold text-gray-950 dark:text-amber-500">Rp. {totaldisc.toLocaleString('id-ID')}</p>
                    </div>
                )
        }

        return (
            <div className="bg-white shadow-md rounded-2xl dark:bg-gray-800" key={i} onClick={() => navigate(`/detail/${post.id}`)}>
                <div>
                    <img className="rounded-t-2xl h-24 w-36" src={post.img} alt="..." />
                </div>
                <div className="p-3 whitespace-normal w-36">
                    <div>
                        <span className="font-bold text-gray-950 text-sm text-ellipsis line-clamp-1 dark:text-white">{post.title}</span>
                    </div>
                    <div>
                        <span className="text-xs font-bold text-gray-400 pr-1">{post.category}</span>
                    </div>
                    <div className="pt-2">
                        <div className="flex justify-between">
                            <Disc/>
                            <div className="" onClick={handleNotClick}>
                                <div className="text-gray-950">
                                    <LoveButton />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const dtproduct = (postprod:Product, i:number) => {
            const pricedisc = postprod.price * (postprod.disc/100);
            const totaldisc = postprod.price - pricedisc;
            function Disc(){
                if(postprod.disc !== 0){
                    return (
                        <div className='flex gap-2'>
                            <p className="text-base font-bold text-gray-950 dark:text-amber-500">Rp. {totaldisc.toLocaleString('id-ID')}</p>
                            <div className="px-1 bg-red-200 rounded-lg">
                                <span className="text-xs text-red-600 font-bold">{postprod.disc}%</span>
                            </div>
                        </div>  
                    )
                } 
                else 
                    return (
                        <div>
                            <p className="text-base font-bold text-gray-950 dark:text-amber-500">Rp. {totaldisc.toLocaleString('id-ID')}</p>
                        </div>
                    )
            }

        return (
            <div>
                <div className="bg-white shadow-md rounded-2xl dark:bg-gray-800" key={i} onClick={() => navigate(`/detail/${postprod.id}`)}>
                    <div>
                        <img className="rounded-t-2xl h-28 object-cover" src={postprod.img} alt="..." />
                    </div>
                    <div className="p-3 whitespace-normal">
                        <div>
                            <span className="font-bold text-gray-950 text-sm line-clamp-2 dark:text-white">{postprod.title}</span>
                        </div>
                        <div>
                            <span className="text-xs font-bold text-gray-400 pr-1">{postprod.category}</span>
                        </div>
                        <div className="pt-2">
                            <Disc/>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="text-yellow-400">
                                <FontAwesomeIcon icon={['fas', 'star']} size="xs"/>
                                <span className="text-gray-950 text-xs pl-1 dark:text-white">{postprod.rate}</span>
                            </div>
                            <div className="" onClick={handleNotClick}>
                                <div className="text-gray-950">
                                    <LoveButton />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const filteredData = selectedCategory
    ? prod.filter(item => item.category === selectedCategory)
    : prod;

    const getPopularItems = () => {
        return [...selectedCategory.length > 0 ? prod.filter(item => item.category === selectedCategory) : prod]
            .sort((a, b) => b.sold - a.sold)
            .slice(0, 10);
    }

    return (
        <div className={`Home ${theme}`}>
            <div className="w-full bg-gray-50 px-5 pt-5 pb-3 sticky top-0 dark:bg-gray-950">
                <div className="flex gap-3 items-center">
                    <div className="bg-gray-100 py-2 px-3 rounded-2xl grow" onClick={() => navigate(`/SearchPage/`)}>
                        <div className="flex gap-3 items-center text-gray-950">
                            <FontAwesomeIcon icon={['fas','search']} size="sm"/>
                            <span className="text-sm font-semibold">Search Product</span>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <div>
                            <button onClick={toggleTheme}>
                                 {theme === 'light' 
                                 ? <FontAwesomeIcon icon={['fas','moon']} size="lg" className="text-gray-950" /> 
                                 : <FontAwesomeIcon icon={['fas','sun']} size="lg" className="dark:text-white" />}
                            </button>
                        </div>
                        <div>
                            <div className="absolute top-0 right-0 mt-4 mr-3 bg-red-500 px-1 text-[10px] text-white rounded-full">
                                <span>10</span>
                            </div>
                            <div className="text-gray-950 dark:text-white">
                                <FontAwesomeIcon icon={['fas','shopping-cart']} size="lg"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-3 dark:bg-gray-950">
                <FilterBtn
                    categories={categories}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                />
            </div>
            <div className="dark:bg-gray-950">
                <div className="">
                    <div className="text-gray-950">
                        <div>
                            <span className="font-bold text-base px-5 text-gray-950 dark:text-white">Popular</span>
                        </div>
                    </div>
                    <div className="mt-3">
                        <div className="flex gap-3 px-5 no-scrollbar overflow-auto pb-2 whitespace-nowrap">
                            {getPopularItems().map(dtpopular)}
                        </div>
                    </div>
                </div>
            </div>
            <div className="pt-3 pb-5 px-5 dark:bg-gray-950">
                <div>
                    <div className="text-gray-950">
                        <div>
                            <span className="font-bold text-base text-gray-950 dark:text-white">Discover</span>
                        </div>
                    </div>
                    <div className="mt-3">
                        <div className="grid grid-cols-2 gap-3">
                            {filteredData.map(dtproduct)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;