import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Product } from "../Interface/Product";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { faKeyboard } from "@fortawesome/free-regular-svg-icons";

const SearchSuggest = () => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const debounceRef = useRef<number | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (query.length > 2) {
          if (debounceRef.current) {
            clearTimeout(debounceRef.current);
          }
          debounceRef.current = window.setTimeout(() => {
            fetchSuggestions(query);
          }, 300);
        } else {
          setSuggestions([]);
        }
        return () => {
          if (debounceRef.current) {
            clearTimeout(debounceRef.current);
          }
        };
    }, [query]);
    
    const fetchSuggestions = async (searchTerm: string) => {
        try {
          const response = await axios.get<Product[]>(`http://localhost:3000/product`);
            const filteredSuggestions: string[] = [];
                response.data.forEach(product => {
                const { title, category, desc } = product;
                const combinedText = `${title.toLowerCase()} ${category.toLowerCase()} ${desc.toLowerCase()}`;
                const words = combinedText.split(/\W+/); // Split by non-word characters
                words.forEach(word => {
                if (word.includes(searchTerm.toLowerCase()) && !filteredSuggestions.includes(word)) {
                    filteredSuggestions.push(word);
                }
                });
            });
          setSuggestions(filteredSuggestions);
        } catch (error) {
          console.error('Error fetching suggestions:', error);
        }
    };

    useEffect(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
    }, []);

    const handleSuggestClick = (event: any, value: string) => {
        event.stopPropagation();
        setQuery(value);
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            navigate(`/ResultSearch/${query}`);
        }
    };
    
    return (
        <div className="px-5 pt-5 pb-3 h-screen dark:bg-gray-950">
            <div className="flex items-center gap-3">
                <div onClick={() => navigate(-1)}>
                    <FontAwesomeIcon icon={faArrowLeft} className="text-gray-950 dark:text-white" />
                </div>
                <div className="bg-gray-100 rounded-2xl grow">
                    <div className="flex gap-3 items-center text-gray-950">
                        <FontAwesomeIcon icon={['fas','search']} size="sm" className="py-2 pl-3"/>
                        <input 
                            className="text-sm font-semibold py-2 w-full ring-0 outline-0 bg-gray-100 rounded-2xl" 
                            placeholder="Search Product"
                            value={query} 
                            onChange={(e) => setQuery(e.target.value)} 
                            onKeyDown={handleKeyDown}
                            ref={inputRef}/>
                    </div>
                </div>
            </div>
            {suggestions.length > 0 && (
                <div className="py-3 text-gray-950 dark:text-white">
                {suggestions.map((suggestion, i) => (
                    <div className="flex justify-between pb-3" key={i} onClick={() => navigate(`/ResultSearch/${suggestion}`)}>
                        <div className="flex gap-3">
                            <div>
                                <FontAwesomeIcon icon={faSearch} />
                            </div>
                            <div>
                                <span className="font-bold text-sm">{suggestion}</span>
                            </div>
                        </div>  
                        <div onClick={(event) => handleSuggestClick(event, suggestion)}>
                            <FontAwesomeIcon icon={faKeyboard} />
                        </div>      
                    </div>
                ))}
                </div>
            )}
        </div>
    );
}

export default SearchSuggest;