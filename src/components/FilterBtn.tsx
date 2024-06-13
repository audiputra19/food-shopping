import { faCompass, faCookieBite, faMugSaucer, faPepperHot, faUtensils } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
    categories: string[];
    selectedCategory: string;
    setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
}

const FilterBtn: React.FC<Props> = ({categories, selectedCategory, setSelectedCategory}) => {  
    return (
        <div className="flex gap-3 px-5 pb-2 no-scrollbar overflow-auto">
            <div 
                className={selectedCategory.length === 0 ? 'bg-amber-500 rounded-full w-fit p-1 shadow-md shadow-amber-300 dark:shadow-none' : 'bg-gray-100 rounded-full w-fit p-1'} 
                onClick={() => setSelectedCategory("")}>
                <div className="flex items-center w-24">
                    <div className="bg-white text-red-700 rounded-full p-2 flex items-center">
                        <FontAwesomeIcon icon={faCompass} size="sm" />
                    </div>
                    <div className="pl-2 pr-3">
                        <span className="text-xs font-bold text-gray-950">All Food</span>
                    </div>
                </div>
            </div>

            {
                categories.map((val:string, i:number) => {
                    const icon = () => {
                        if(val === "Food"){
                            return (
                                <FontAwesomeIcon icon={faUtensils} size="sm" />
                            )
                        } else if(val === "Drink"){
                            return (
                                <FontAwesomeIcon icon={faMugSaucer} size="sm" />
                            )
                        } else if(val === "Spicy"){
                            return (
                                <FontAwesomeIcon icon={faPepperHot} size="sm" />
                            )
                        } else if(val === "Snack"){
                            return (
                                <FontAwesomeIcon icon={faCookieBite} size="sm" />
                            )
                        }
                    }
        
                    return (    
                        <div 
                            key={i}
                            className={selectedCategory === val ? 'bg-amber-500 rounded-full w-fit p-1 shadow-md shadow-amber-300 dark:shadow-none' : 'bg-gray-100 rounded-full w-fit p-1'} 
                            onClick={() => setSelectedCategory(val)}>
                            <div className="flex items-center">
                                <div className="bg-white text-red-700 rounded-full p-2 flex items-center">
                                    {icon()}
                                </div>
                                <div className="pl-2 pr-3">
                                    <span className="text-xs font-bold text-gray-950">{val}</span>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default FilterBtn