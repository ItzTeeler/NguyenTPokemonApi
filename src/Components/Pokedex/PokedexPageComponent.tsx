import React, { useCallback, useEffect, useState } from 'react'
import pokeballIcon from '../assets/Pokeballicon.png'
import unFavHeart from '../assets/Unfav.png'
import FavHeart from '../assets/Fav.png'
import { Evolution, Pokemon, RegEvolution } from '../../Interfaces/Interfaces'
import { PokemonEvolutionId, PokemonEvolutionImageName, getAPI, pokeData, pokeDataEvo } from '../../DataServices/Service'
import './PokedexPageComponent.css';

const PokedexPageComponent = () => {
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const [userInput, setUserInput] = useState<string>("pikachu");
    const [location, setLocation] = useState<Location>();
    const [evoData, setEvoData] = useState<Evolution>();
    const [imgSrc, setImgSrc] = useState<string>("");
    const [abilityColor, setAbilityColor] = useState<string>("#F8D030");
    const [locationColor, setLocationColor] = useState<string>("#F8D030");
    const [movesColor, setMoveColor] = useState<string>("#F8D030");
    const [evolutionColor, setEvolutionColor] = useState<string>("#F8D030");
    const [pokemonColorBack, setPokemonColorBack] = useState<string>("#F8D030");
    const [pokemonEvolution, setPokemonEvolution] = useState<RegEvolution | null>(null);
    const [pokemonEvoData, setPokeEvoData] = useState<string[]>([]);
    const [evolutionDatas, setEvolutionData] = useState<{ evolutionImage: string, evolutionId: string }[]>([])
    const [favorite, setFavorite] = useState<string>(unFavHeart);
    const [favorites, setFavorites] = useState<Pokemon[] | string[]>([]);
    const [favClassName, setFavClassName] = useState<string>("-translate-x-full");
    const [modalBlock, setModalBlock] = useState<string>("hidden");
    const [toggleBool, setBool] = useState<boolean>(false)

    useEffect(() => {
        setImgSrc("");
        const getData = async () => {
            const favorites: (Pokemon | string)[] = getLocalStorage();
            const pokemonData = await pokeData(userInput);
            const data: Pokemon = pokemonData;

            const locationData = await getAPI(data.location_area_encounters);
            const locData: Location = locationData;

            const evolutionData = await pokeDataEvo(userInput);
            const evoData: Evolution = evolutionData;
            console.log(evoData.evolution_chain.url);
            const evoTypeData = await getAPI(evoData.evolution_chain.url);
            const evoType: { evolution_chain: { chain: { species: { name: string }; evolves_to: { species: { name: string }[] }[] } } } | any | RegEvolution = evoTypeData;
            console.log(evoType);
            setPokemonEvolution(evoType);
            setEvoData(evoData);
            setLocation(locData);
            setPokemon(data);
            BackgroundColor(evoData.color.name);

            const isFavorite = favorites.some((favPokemon: Pokemon | string) => {
                if (typeof favPokemon === 'string') {
                    return favPokemon === userInput;
                } else {
                    return favPokemon.name === userInput;
                }
            });
            if (isFavorite) {
                setFavorite(FavHeart);
            } else {
                setFavorite(unFavHeart);
            }

            const pokemonEvolutionChain: string[] = [];
            if (evoType && evoType.chain) {
                pokemonEvolutionChain.push(evoType.chain.species.name);
                evoType.chain.evolves_to.forEach((e: { species: { name: string; }; evolves_to: string[]; }) => {
                    e.species && pokemonEvolutionChain.push(e.species.name);
                    e.evolves_to.forEach((e: any) => {
                        e.species && pokemonEvolutionChain.push(e.species.name);
                    });
                });
            }
            setPokeEvoData(pokemonEvolutionChain);
            console.log(pokemonEvolutionChain);
        };
        const favoritesData = getLocalStorage();
        setFavorites(favoritesData);
        console.log(favorites)
        getData();

    }, [userInput, favorite, toggleBool]);

    const fetchEvolutionData = useCallback(async () => {
        const promise = pokemonEvoData.map(async (evolutionName: string) => {
            const evolutionImage = await PokemonEvolutionImageName(evolutionName);
            const evolutionId = await PokemonEvolutionId(evolutionName);
            return { evolutionImage, evolutionId: String(evolutionId) };
        });
        const dataEvo = await Promise.all(promise);
        setEvolutionData(dataEvo);
    }, [pokemonEvoData,]);


    useEffect(() => {
        fetchEvolutionData();
    }, [fetchEvolutionData]);

    useEffect(() => {
        const favoritesData = getLocalStorage();
        setFavorites(favoritesData);
    }, [])

    const handleShinyClick = () => {
        const shinyPic = pokemon?.sprites.other?.['official-artwork'].front_shiny;
        const defaultPic = pokemon?.sprites.other?.['official-artwork'].front_default;

        if (shinyPic && imgSrc !== shinyPic) {
            setImgSrc(shinyPic);
        } else if (defaultPic && imgSrc !== defaultPic) {
            setImgSrc(defaultPic);
        }
    };


    const genRandomNumber = async () => {
        const randomId: string = String(Math.floor(Math.random() * 898) + 1);
        const getName: Pokemon = await pokeData(randomId);
        setUserInput(getName.name);
        setImgSrc("");
    }


    const handleFavDrawerClick = () => {
        if (favClassName !== "-translate-x-full") {
            setFavClassName("-translate-x-full");
        } else {
            setFavClassName("");
        }
    }

    const showHideModal = () => {
        if (modalBlock !== "hidden") {
            setModalBlock("hidden")
        } else {
            setModalBlock("block")
        }
    }
    const CapitalFirstLetter = (userInput: string) => {
        if (!userInput) return "";

        let words = userInput.split("-");
        let capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
        let formattedInput = capitalizedWords.join(" ");

        return formattedInput;
    }


    const BackgroundColor = (color: string) => {
        switch (color) {
            case "yellow":
                setPokemonColorBack("#F8D030");
                setAbilityColor("#F8D030");
                setLocationColor("#F8D030");
                setMoveColor("#F8D030");
                setEvolutionColor("#F8D030");
                break;
            case "black":
                setPokemonColorBack("#705848");
                setAbilityColor("#705848");
                setLocationColor("#705848");
                setMoveColor("#705848");
                setEvolutionColor("#705848");
                break;
            case "brown":
                setPokemonColorBack("#A7A879");
                setAbilityColor("#A7A879");
                setLocationColor("#A7A879");
                setMoveColor("#A7A879");
                setEvolutionColor("#A7A879");
                break;
            case "gray":
                setPokemonColorBack("#B8B8D0");
                setAbilityColor("#B8B8D0");
                setLocationColor("#B8B8D0");
                setMoveColor("#B8B8D0");
                setEvolutionColor("#B8B8D0");
                break;
            case "green":
                setPokemonColorBack("#78C850");
                setAbilityColor("#78C850");
                setLocationColor("#78C850");
                setMoveColor("#78C850");
                setEvolutionColor("#78C850");
                break;
            case "pink":
                setPokemonColorBack("#F85889");
                setAbilityColor("#F85889");
                setLocationColor("#F85889");
                setMoveColor("#F85889");
                setEvolutionColor("#F85889");
                break;
            case "purple":
                setPokemonColorBack("#A890F0");
                setAbilityColor("#A890F0");
                setLocationColor("#A890F0");
                setMoveColor("#A890F0");
                setEvolutionColor("#A890F0");
                break;
            case "red":
                setPokemonColorBack("#F08030");
                setAbilityColor("#F08030");
                setLocationColor("#F08030");
                setMoveColor("#F08030");
                setEvolutionColor("#F08030");

                break;
            case "white":
                setPokemonColorBack("#705998");
                setAbilityColor("#705998");
                setLocationColor("#705998");
                setMoveColor("#705998");
                setEvolutionColor("#705998");
                break;
            case "blue":
                setPokemonColorBack("#6890F0");
                setAbilityColor("#6890F0");
                setLocationColor("#6890F0");
                setMoveColor("#6890F0");
                setEvolutionColor("#6890F0");
                break;
            default:
                setPokemonColorBack("#F8D030");
                setAbilityColor("#F8D030");
                setLocationColor("#F8D030");
                setMoveColor("#F8D030");
                setEvolutionColor("#F8D030");
        }
    }

    const getLocalStorage = () => {

        let localStorageData = localStorage.getItem("Favorites");

        if (localStorageData == null) {
            return [];
        }

        return JSON.parse(localStorageData);
    }

    const handleFavoriteClick = () => {
        const pokemonName = pokemon?.name;
        const pokemonId = String(pokemon?.id)
        if (pokemonName && pokemonId) {
            const favorites = getLocalStorage();
            const isAlreadyFavorite = favorites.some((fav: { name: string, id: string }) => fav.name === pokemonName && fav.id === pokemonId);
            if (isAlreadyFavorite) {
                setModalBlock("hidden");
                setFavorite(unFavHeart);
                removeLocalStorage(pokemonName);
            } else {
                setFavorite(FavHeart);
                saveToLocalStorage(pokemonName, pokemonId);
            }
        }
    };

    const saveToLocalStorage = (pokemonName: string, pokemonId: string) => {
        let favorites = getLocalStorage();
        if (!favorites.some((fav: { name: string, id: string }) => fav.name === pokemonName && fav.id === pokemonId)) {
            favorites.push({ name: pokemonName, id: pokemonId });
            localStorage.setItem("Favorites", JSON.stringify(favorites));
        }
    };



    const removeLocalStorage = (pokemon: Pokemon | string) => {
        let favorites = getLocalStorage();

        favorites = favorites.filter((fav: { name: string, id: number }) => {
            if (typeof pokemon === 'string') {
                return fav.name !== pokemon;
            } else {
                return fav.name !== pokemon.name || fav.id !== pokemon.id;
            }
        });

        localStorage.setItem("Favorites", JSON.stringify(favorites));
    }



    const handleRemoveFromFavorites = async (fav: Pokemon | string) => {
        if (toggleBool) {
            removeLocalStorage(fav);
            setBool(false);
        } else {
            removeLocalStorage(fav);
            setBool(true);
        }
    }




    return (
        <div className=" grid grid-cols-12">
            <div className=" col-span-12 lg:col-span-7 order-2 lg:order-1 bg-[#616161] drop-shadow-lg max-h-full pt-[3.125rem]">
                <div className="grid xl:flex xl:justify-between mx-[2.5rem] 2xl:mx-[5.125rem] lg:mb-[3.125rem]">

                    <p className="hidden lg:block font-[Orbitron-Bold] text-[3.125rem] md:text-[4rem] lg:text-[6.25rem]">
                        <span className="text-[#FF0000] textStroke">Poke</span><span className="text-white textStroke">Dex</span>
                    </p>

                    <button id="randomPokemon"
                        className="hidden lg:block font-[Orbitron-Bold] text-[1.875rem] md:text-[3rem] bg-[#FF1C1C] rounded-[10px] my-5 p-5 text-white" onClick={genRandomNumber}>Random
                    </button>


                </div>
                <div className="mx-[82px]">
                    <p className="font-[Orbitron-Bold] text-[1.875rem] md:text-[2.5rem] mb-[50px]">
                        <span id="abilityColor" className="textStroke" style={{ color: abilityColor }}>Abilities : </span>
                        <span id="abilitiesText" className="text-white">
                            {pokemon?.abilities.map((ability: { ability: { name: string } }, index: number) => (
                                <span key={index}>
                                    {CapitalFirstLetter(`${ability.ability.name}`)}
                                    {index !== pokemon.abilities.length - 1 && ', '}
                                </span>
                            ))}
                        </span>
                    </p>
                    <p
                        className="font-[Orbitron-Bold] text-[1.875rem] md:text-[2.5rem] overflow-y-scroll max-h-[200px] mb-[50px]">
                        <span id="abilityColor" className="textStroke" style={{ color: movesColor }}>Moves : </span>
                        <span id="movesText" className="text-white">
                            {pokemon?.moves.map((move: { move: { name: string } }, index: number) => (
                                <span key={index}>
                                    {CapitalFirstLetter(`${move.move.name}`)}
                                    {index !== pokemon.moves.length - 1 && ', '}
                                </span>
                            ))}
                        </span>
                    </p>
                    <p className="font-[Orbitron-Bold] text-[1.875rem] md:text-[2.5rem] overflow-y-scroll max-h-[130px] mb-[50px]"><span id="locationColor"
                        className="textStroke" style={{ color: locationColor }}>Location : </span>
                        <span className="text-white" id="locationText">
                            {location && Array.isArray(location) && location.length > 0 ?
                                location.map((locationItem: { location_area: { name: string } }, index: number) => (
                                    <span key={index}>
                                        {CapitalFirstLetter(`${locationItem.location_area.name}`)}
                                        {index !== location.length - 1 && ', '}
                                    </span>
                                ))
                                : "N/A"
                            }
                        </span>
                    </p>
                </div>
                <div className="px-[82px]">
                    <p id="evolutionColors"
                        className="font-[Orbitron-Bold] text-[1.875rem] md:text-[2.5rem] textStroke mb-[32px]" style={{ color: evolutionColor }}>
                        Evolutions :</p>
                    <div className="overflow-y-scroll max-w-[923px] max-h-[874px] lg:max-h-[320px] mx-auto">

                        <div className="grid grid-cols-3 justify-evenly" id="evolutionDiv">
                            {evolutionDatas.map(({ evolutionImage, evolutionId }, index) => (
                                <div key={index} className="col-span-3 lg:col-span-1 grid justify-center mb-[30px]">
                                    <img
                                        src={`${evolutionImage}`}
                                        className="rounded-[200px] border-white border-[5px] w-[200px] h-[200px] drop-shadow-lg cursorImg"
                                        onClick={() => {
                                            setUserInput(pokemonEvoData[index]);
                                            setImgSrc("");
                                        }}
                                        alt={pokemonEvoData[index]}
                                    />
                                    <p className="font-[Orbitron-Bold] text-[1.875rem] text-center text-white">
                                        {CapitalFirstLetter(pokemonEvoData[index])}
                                    </p>
                                    <p className="font-[Orbitron-Bold] text-[1.875rem] text-center text-[#A4ACAF]">#{evolutionId}</p>
                                </div>
                            ))}
                        </div>

                    </div>
                    <div className="grid justify-center">
                        <button id="randomPokemonTwo"
                            className="block lg:hidden font-[Orbitron-Bold] text-[1.875rem] md:text-[3.125rem] bg-[#FF1C1C] rounded-[10px] my-5 p-5 text-white">Random
                        </button>
                    </div>
                </div>
            </div>

            <div id="pokemonColorBack" className="col-span-12 lg:col-span-5 order-1 lg:order-2 max-h-full" style={{ background: pokemonColorBack }}>
                <p
                    className="block lg:hidden font-[Orbitron-Bold] text-[3.125rem] text-center md:text-[6.25rem] lg:text-[6.25rem] pt-[1.875rem]">
                    <span className="text-[#FF0000] textStroke">Poke</span><span className="text-white textStroke">Dex</span>
                </p>
                <div className="flex justify-center mt-[50px]">

                    <input type="text" id="userSearchInput"
                        className="font-[Orbitron-Bold] text-[1.25rem] min-h-[63px]  md:text-[1.875rem] text-black rounded-[10px] w-full mx-[3.5625rem] lg:mx-[6.875rem]"
                        placeholder="Search Name or ID" onKeyDown={(e: React.KeyboardEvent<HTMLInputElement> | React.ChangeEvent<HTMLInputElement>) => {
                            if ((e as React.KeyboardEvent<HTMLInputElement>).key === "Enter") {
                                setUserInput((e as React.ChangeEvent<HTMLInputElement>).target.value);
                            }
                        }} />
                </div>
                <div className="flex justify-center items-center mt-[23px]">
                    <img src={pokeballIcon} className="mx-2 h-[50px] w-[50px] md:h-[70px] md:w-[70px]" alt="Pokeball Icon" />
                    <p id="pokemonId" className="mx-2 font-[Orbitron-Bold] text-[1.875rem] md:text-[3.125rem]">{pokemon && pokemon.id ? `#${pokemon.id}` : "Loading"}</p>
                    <img id="pokemonFavorite" src={favorite} className="mx-2 h-[40px] w-[40px] cursor-pointer" alt="UnFav Heart"
                        onClick={handleFavoriteClick} />
                </div>
                <div className="flex justify-center">
                    <p id="pokemonName"
                        className="font-[Orbitron-Bold] text-center text-[1.875rem] md:text-[3.125rem] mt-[17px]">{pokemon && pokemon ? CapitalFirstLetter(pokemon.name) : "loading"}</p>
                </div>
                <div className="flex justify-center">
                    <p className="font-[Orbitron-Bold] text-[1.25rem] p-0 m-0">Click Picture for Shiny</p>
                </div>
                <div className="flex justify-center drop-shadow-lg">
                    <img id="pokemonImg" src={imgSrc || pokemon?.sprites.other?.['official-artwork'].front_default} onClick={handleShinyClick}
                        className="h-[250px] w-[250px] md:h-[500px] md:w-[500px] mx-5 cursorImg bg-white rounded-[500px] mt-[5px]"
                        alt="Pokemon Image" />
                </div>
                <div className="flex justify-center">
                    <p id="elementType" className="font-[Orbitron-Bold] text-[1.875rem] md:text-[3.125rem] mt-[30px] text-center">Type: {' '}
                        {pokemon ? pokemon.types.map((type: { type: { name: string } }, index: number) => (
                            <span key={index}>
                                {CapitalFirstLetter(`${type.type.name}`)}
                                {index !== pokemon.types.length - 1 && ', '}
                            </span>
                        ))
                            : "N/A"}
                    </p>
                </div>
                <div className="flex justify-center mt-[30px]">

                    <div className="text-center mb-[40px]">

                        <button id="getFavoriteBtn"
                            className="text-white text-[Orbitron-Bold] bg-[#FF1C1C] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-[10px] text-[1.875rem] lg:text-[3.125rem] px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                            type="button" data-drawer-target="drawer-navigation" data-drawer-show="drawer-navigation"
                            aria-controls="drawer-navigation" onClick={handleFavDrawerClick}>
                            Open Favorite
                        </button>
                    </div>

                    <div
                        id="drawer-navigation"
                        className={`fixed top-0 bg-[#A4ACAF] left-0 z-40 w-full lg:w-[420px] h-screen p-4 overflow-y-auto transition-transform dark:bg-gray-800 ${favClassName}`}
                        aria-labelledby="drawer-navigation-label"
                    >
                        <p id="drawer-navigation-label" className="text-white font-[Orbitron-Bold] text-[2.8rem] uppercase">
                            Favorite
                        </p>
                        <button onClick={handleFavDrawerClick}
                            type="button"
                            data-drawer-hide="drawer-navigation"
                            aria-controls="drawer-navigation"
                            className="text-white bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-6 end-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                            <svg
                                aria-hidden="true"
                                className="w-[50px] h-[50px] grid"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                            <span className="sr-only">Close menu</span>
                        </button>
                        <div className="py-4 overflow-y-auto ">
                            <div id="getFavoritesDiv">
                                {favorites.map((pokemonName: string | Pokemon, index: number) => (
                                    <div key={index} className="flex justify-between flex-row">
                                        <p className="font-[Orbitron-Bold] text-black dark:text-white bg-white w-full rounded-l-lg px-2 favoriteSpacing cursor-pointer" onClick={() => {
                                            if (typeof pokemonName === 'string') {
                                                setUserInput(pokemonName);
                                                setImgSrc("");
                                            } else {
                                                setUserInput(pokemonName.name);
                                                setImgSrc("");
                                            }
                                        }}>
                                            <span>{typeof pokemonName === 'string' ? pokemonName : `#${pokemonName.id} ${CapitalFirstLetter(pokemonName.name)}`}</span>
                                        </p>
                                        <button className="text-white bg-[#FF1C1C] hover:bg-gray-200 hover:text-gray-900 rounded-r-lg px-5 favoriteSpacing dark:hover:bg-gray-600 dark:hover:text-white h-full" onClick={() => { handleRemoveFromFavorites(pokemonName) }}>
                                            {"X"}
                                        </button>
                                    </div>
                                ))}

                                {/* <div id="conModal" className={`modalBox ${modalBlock}`}>
                                    <div className="modalText">
                                        <p>Are you sure you want to remove this Pokemon from favorites?</p>
                                        <div className="modal-buttons">
                                            <button id="confirmBtn" className="greenBtn" onClick={() => { handleRemoveFromFavorites(pokemon?.name) }}>

                                                Confirm
                                            </button>
                                            <button id="cancelBtn" className="redBtn" onClick={showHideModal}>
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </div> */}

                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default PokedexPageComponent