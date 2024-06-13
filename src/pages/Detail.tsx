import { library } from '@fortawesome/fontawesome-svg-core';
import { faShoppingCart, fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReadMoreComponent from "../components/ReadMoreComponent";
import StarRating from "../components/StarRating";
import LikeButton from '../components/LikeButton';
import { Product, Review } from '../Interface/Product';
import NameInitials from '../components/NameInitials';

library.add(fas, far);

const Detail = () => {
    const {id} = useParams();
    const [prod, setProd] = useState<Product>();
    const [review, setReview] = useState<Review[]>([]);
    const navigate = useNavigate();
    const [isLoved, setIsLoved] = useState(false);
    const [qty, setQty] = useState(1); 

    useEffect(() => {
        axios
            .get(`http://localhost:3000/product/${id}`)
            .then(res =>{
                //console.log('Axios response:', res.data);
                setProd(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    },[id]);

    useEffect(() => {
        axios   
            .get(`http://localhost:3000/review?id_product=${id}`)
            .then(res => {
                setReview(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    })

    const handleClick = () => {
        setIsLoved(!isLoved);
    }

    const increaseVal = () => {
        setQty(qty + 1);
    }

    const decreaseVal = () => {
        setQty(qty - 1);
    }

    if(qty < 1){
        setQty(1);
    }
    
    const pricedisc = prod?.price ? prod?.price * (prod?.disc / 100) : 0;
    const totaldisc = prod?.price ? prod?.price - pricedisc : 0;
    const totalprice = totaldisc * qty;
    function Disc(){
        if (prod?.disc !== 0 && prod !== undefined) {
            return (
                <div className="">
                    <div className="flex items-center gap-2">
                        <div className="px-1 bg-red-200 rounded-lg">
                            <span className="text-xs text-red-600 font-bold">{prod.disc}%</span>
                        </div>
                        <span className="text-xs line-through text-gray-400 font-semibold flex justify-end">Rp. {prod.price?.toLocaleString('id-ID')}</span>    
                    </div>
                    <p className="font-bold text-gray-950 flex justify-end dark:text-white">Rp. {totaldisc.toLocaleString('id-ID')}</p>
                </div>  
            )
        } 
        else 
            return (
                <div>
                    <p className="font-bold text-gray-950 dark:text-white">Rp. {totaldisc.toLocaleString('id-ID')}</p>
                </div>
            )
    }

    const formatDate = (date: string | Date): string => {
        const dateObject = new Date(date); // Pastikan bahwa date adalah objek Date yang valid
        const options: Intl.DateTimeFormatOptions = {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        };
      
        return dateObject.toLocaleDateString('id-ID', options);
    };
      

    const renderReview = (data:Review, i:number, arr: Review[]) => {
        return (
            <div key={i} className={`py-3 ${i !== arr.length - 1 ? 'border-b border-gray-200' : ''}`}>
                <div className='flex justify-between gap-3'>
                    <div className='flex justify-center items-center w-16 h-12 bg-amber-500 rounded-full'>
                        <span className='font-bold text-lg text-white'><NameInitials name={data.name}/></span>
                    </div>
                    <div className='w-full'>
                        <div className="flex justify-between">
                            <div>
                                <p className='font-bold text-gray-950 dark:text-white'>{data.name}</p>
                            </div>
                            <div>
                                <LikeButton/>
                            </div>
                        </div>
                        <p><FontAwesomeIcon icon={['fas', 'star']} size='xs' className='text-amber-500 ' /><span className='pl-2 text-xs font-bold dark:text-white'>5.0</span></p>
                        <p className='text-sm text-gray-950 pt-3 dark:text-white'>{data.review}</p>
                        <p className='text-xs text-gray-400 pt-3'>Posted on {formatDate(data.date)}</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        prod ? (
            <div>
                <div className="absolute p-3" onClick={() => navigate(-1)}>
                    <div 
                        className="flex items-center bg-gray-100 py-3 px-4 rounded-xl text-gray-950">
                        <FontAwesomeIcon icon={['fas', 'chevron-left']} />
                    </div>
                </div>
                <div className="flex justify-end">
                    <div className="absolute p-3 mt-2">
                        <div className="text-red-500"> 
                        <button
                            className={`transition-colors duration-300 text-red-500`}
                            onClick={handleClick}
                            >
                            {isLoved ? <FontAwesomeIcon icon={['fas', 'heart']} size='2xl' /> : <FontAwesomeIcon icon={['far', 'heart']} size='2xl' /> }
                        </button>
                        </div>
                    </div>
                </div> 
                <div className="bg-gray-50 dark:bg-gray-950">   
                    <div>
                        <img className="h-72 object-cover" src={prod.img} alt="..." />
                    </div>
                    <div className="p-5">
                        <div className="flex justify-between items-start gap-3">
                            <div className="">
                                <span className="text-xl font-bold text-gray-950 dark:text-white">{prod.title}</span>
                            </div>
                            <div className="flex justify-end">
                                <div className="bg-amber-500 text-gray-950 rounded-full shadow-md shadow-amber-300 dark:shadow-none">
                                    <div className='flex justify-center items-center'>
                                        <div className="flex justify-center p-3" onClick={decreaseVal}>
                                            <FontAwesomeIcon icon={['fas','minus']} size="sm"/>
                                        </div>
                                        <div className="flex justify-center px-2 w-8">
                                            <span className="text-lg font-bold">{qty}</span>
                                        </div>
                                        <div className="flex justify-center p-3" onClick={increaseVal}>
                                            <FontAwesomeIcon icon={['fas', 'plus']} size="sm"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between pt-2">
                            <StarRating rating={parseFloat(prod.rate)} maxStars={5} />
                            <Disc/>
                        </div>
                        <div className='pt-3'>
                            <span className="font-bold text-gray-950 dark:text-white">Description</span>
                        </div>
                        <div className="pt-2">
                            <div className="text-sm text-gray-400">
                                <ReadMoreComponent text={prod.desc} maxLength={100} />  
                            </div>
                        </div>
                        <div className='pt-5'>
                            <span className="font-bold text-gray-950 dark:text-white">Review</span>
                        </div>
                        <div className='pt-2'>
                            <div className='px-4 pt-4 rounded-2xl bg-white shadow-md dark:bg-gray-800'>
                                {review.length > 0 ? (
                                    review.map(renderReview)
                                ) : (
                                    <div className="pb-4 flex justify-center items-center w-full">
                                        <p className="text-gray-500 font-bold dark:text-gray-400">No reviews</p>
                                    </div>

                                )}
                            </div>
                        </div>
                    </div>
                    <div className="sticky bottom-0 py-3 px-4 bg-gray-950 rounded-t-2xl dark:bg-gray-800">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-xs font-bold text-amber-400 dark:text-gray-500">Total Price</p>
                                <p className="text-lg font-bold text-white"><span className="text-sm text-white" >Rp. </span>{totalprice.toLocaleString('id-ID')}</p>
                            </div>
                            <div className="">
                                <button className="bg-amber-500 text-white font-bold py-2 px-6 rounded-full">
                                    <FontAwesomeIcon icon={faShoppingCart} className='pr-3'/><span>Go To Cart</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ) : null
    )
}

export default Detail;