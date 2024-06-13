import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Product } from "../Interface/Product";
import axios from "axios";
import LoveButton from "../components/LoveButton";

const ResultSearch: FC = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [prod, setProd] = useState<Product[]>([]);
    useEffect(() => {
        axios
            .get(`http://localhost:3000/product?q=${id}`)
            .then(res => {
                setProd(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    },[id])

    const handleNotClick = (event: any) => {
        event.stopPropagation();
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

    return (
        <div className="h-screen dark:bg-gray-950">
            <div className="px-5 pt-5 pb-3">
                <div className="flex items-center gap-3">
                    <div onClick={() => navigate(`/`)}>
                        <FontAwesomeIcon icon={faArrowLeft} className="text-gray-950 dark:text-white"/>
                    </div>
                    <div className="bg-gray-100 py-2 px-3 rounded-2xl grow" onClick={() => navigate(`/SearchPage/`)}>
                        <div className="flex gap-3 items-center text-gray-950">
                            <FontAwesomeIcon icon={['fas','search']} size="sm"/>
                            <span className="text-sm font-semibold">Search Product</span>
                        </div>
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
            <div className="pt-3 pb-5 px-5 dark:bg-gray-950">
                <div>
                    <div className="mt-3">
                        <div className="grid grid-cols-2 gap-3">
                            {prod.map(dtproduct)}
                        </div>
                    </div>
                </div>
            </div> 
        </div>   
    )
}

export default ResultSearch;