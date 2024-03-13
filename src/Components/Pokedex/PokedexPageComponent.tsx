import React, { useEffect, useState } from 'react'
import pichuPic from '../assets/pichuEvo.png'
import pikachuPic from '../assets/PokedexPikaChuPh.png'
import raichuPic from '../assets/raichuevo.png'
import pokeballIcon from '../assets/Pokeballicon.png'
import unFavHeart from '../assets/Unfav.png'
import pokeImg from '../assets/PokedexPikaChuPh.png'
import { Evolution, Pokemon } from '../../Interfaces/Interfaces'
import { getAPI, pokeData, pokeDataEvo } from '../../DataServices/Service'
import './PokedexPageComponent.css';

const PokedexPageComponent = () => {
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const [userInput, setUserInput] = useState<string>("1");
    const [location, setLocation] = useState<any>();
    const [evoData, setEvoData] = useState<Evolution>();
    useEffect(() => {

        const getData = async () => {
            const pokemonData = await pokeData(userInput);
            const data: Pokemon = pokemonData;
            console.log(data);

            const locationData = await getAPI(data?.location_area_encounters);
            const locData: Location = locationData;

            const evolutionData = await pokeDataEvo(userInput);
            const evoData: Evolution = evolutionData

            setEvoData(evoData);
            setLocation(locData);
            setPokemon(data);
            console.log(locData)
            console.log(evoData)
        }

        getData();
    }, [userInput]);

    const handleShinyClick = () => {

    }
    const CapitalFirstLetter = (userInput: string) => {
        let words = userInput.split("-");
        let capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
        let formattedInput = capitalizedWords.join(" ");

        return formattedInput;
    }
    return (
        <div className=" grid grid-cols-12">
            <div className=" col-span-12 lg:col-span-7 order-2 lg:order-1 bg-[#616161] drop-shadow-lg max-h-full pt-[3.125rem]">
                <div className="grid xl:flex xl:justify-between mx-[2.5rem] 2xl:mx-[5.125rem] lg:mb-[3.125rem]">

                    <p className="hidden lg:block font-[Orbitron-Bold] text-[3.125rem] md:text-[4rem] lg:text-[6.25rem]">
                        <span className="text-[#FF0000] textStroke">Poke</span><span className="text-white textStroke">Dex</span>
                    </p>

                    <button id="randomPokemon"
                        className="hidden lg:block font-[Orbitron-Bold] text-[1.875rem] md:text-[3rem] bg-[#FF1C1C] rounded-[10px] my-5 p-5 text-white">Random
                    </button>


                </div>
                <div className="mx-[82px]">
                    <p className="font-[Orbitron-Bold] text-[1.875rem] md:text-[2.5rem] mb-[50px]">
                        <span id="abilityColor" className="textStroke text-[#F8D030]">Abilities : </span>
                        <span id="abilitiesText" className="text-white">
                            {pokemon?.abilities.map((ability: any, index: number) => (
                                <span key={index}>
                                    {CapitalFirstLetter(`${ability.ability.name}`)}
                                    {index !== pokemon.abilities.length - 1 && ', '}
                                </span>
                            ))}
                        </span>
                    </p>
                    <p
                        className="font-[Orbitron-Bold] text-[1.875rem] md:text-[2.5rem] overflow-y-scroll max-h-[200px] mb-[50px]">
                        <span id="abilityColor" className="textStroke text-[#F8D030]">Moves : </span>
                        <span id="movesText" className="text-white">
                            {pokemon?.moves.map((move: any, index: number) => (
                                <span key={index}>
                                    {CapitalFirstLetter(`${move.move.name}`)}
                                    {index !== pokemon.moves.length - 1 && ', '}
                                </span>
                            ))}
                        </span>
                    </p>
                    <p className="font-[Orbitron-Bold] text-[1.875rem] md:text-[2.5rem] overflow-y-scroll max-h-[200px] mb-[50px]"><span id="locationColor"
                        className="textStroke text-[#F8D030]">Location : </span>
                        <span className="text-white" id="locationText">
                            {location && location.length > 0 ? location.map((locationItem: any, index: number) => (
                                <span key={index}>
                                    {CapitalFirstLetter(`${locationItem.location_area.name}`)}
                                    {index !== location.length - 1 && ', '}
                                </span>
                            )): "N/A"}
                        </span>
                    </p>
                </div>
                <div className="px-[82px]">
                    <p id="evolutionColors"
                        className="font-[Orbitron-Bold] text-[1.875rem] md:text-[2.5rem] textStroke text-[#F8D030] mb-[32px]">
                        Evolutions :</p>
                    <div className="overflow-y-scroll max-w-[923px] max-h-[874px] lg:max-h-[320px] mx-auto">
                        <div className="grid grid-cols-3 justify-evenly" id="evolutionDiv">
                            <div className="col-span-3 lg:col-span-1 grid justify-center mb-[30px]">
                                <img src={pichuPic} alt="Pichu Picture"
                                    className="rounded-[200px] border-white border-[5px] w-[200px] h-[200px] drop-shadow-lg" />
                                <div className="flex contents-center lg:flex-row">

                                    <p className="font-[Orbitron-Bold] text-[1.875rem] text-center text-white">Pichu</p>
                                    <p className="font-[Orbitron-Bold] text-[1.875rem] text-center text-[#A4ACAF]">#172</p>
                                </div>
                            </div>
                            <div className="col-span-3 lg:col-span-1 grid justify-center mb-[30px]">
                                <img src={pikachuPic} alt="Pikachu Picture"
                                    className="rounded-[200px] border-white border-[5px] w-[200px] h-[200px] drop-shadow-lg" />
                                <div className="flex contents-center lg:flex-row">

                                    <p className="font-[Orbitron-Bold] text-[1.875rem] text-center text-white">Pikachu</p>
                                    <p className="font-[Orbitron-Bold] text-[1.875rem] text-center text-[#A4ACAF]">#25</p>
                                </div>
                            </div>
                            <div className="col-span-3 lg:col-span-1 grid justify-center mb-[30px]">
                                <img src={raichuPic} alt="Raichu Picture"
                                    className="rounded-[200px] border-white border-[5px] w-[200px] h-[200px] drop-shadow-lg" />

                                <div className="flex contents-center lg:flex-row">
                                    <p className="font-[Orbitron-Bold] text-[1.875rem] text-center text-white">Raichu</p>
                                    <p className="font-[Orbitron-Bold] text-[1.875rem] text-center text-[#A4ACAF]">#26</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid justify-center">
                        <button id="randomPokemonTwo"
                            className="block lg:hidden font-[Orbitron-Bold] text-[1.875rem] md:text-[3.125rem] bg-[#FF1C1C] rounded-[10px] my-5 p-5 text-white">Random
                        </button>
                    </div>
                </div>
            </div>

            <div id="pokemonColorBack" className="col-span-12 lg:col-span-5 order-1 lg:order-2 bg-[#F8D030] max-h-full">
                <p
                    className="block lg:hidden font-[Orbitron-Bold] text-[3.125rem] text-center md:text-[6.25rem] lg:text-[6.25rem] pt-[1.875rem]">
                    <span className="text-[#FF0000] textStroke">Poke</span><span className="text-white textStroke">Dex</span>
                </p>
                <div className="flex justify-center mt-[50px]">

                    <input type="text" id="userSearchInput"
                        className="font-[Orbitron-Bold] text-[1.25rem] min-h-[63px]  md:text-[1.875rem] text-black rounded-[10px] w-full mx-[3.5625rem] lg:mx-[6.875rem]"
                        placeholder="Search Name or ID" onChange={(e) => { setUserInput(e.target.value) }} />
                </div>
                <div className="flex justify-center items-center mt-[23px]">
                    <img src={pokeballIcon} className="mx-2 h-[50px] w-[50px] md:h-[70px] md:w-[70px]" alt="Pokeball Icon" />
                    <p id="pokemonId" className="mx-2 font-[Orbitron-Bold] text-[1.875rem] md:text-[3.125rem]">{pokemon && pokemon.id ? `#${pokemon.id}` : "Loading"}</p>
                    <img id="pokemonFavorite" src={unFavHeart} className="mx-2 h-[40px] w-[40px] cursor-pointer" alt="UnFav Heart" />
                </div>
                <div className="flex justify-center">
                    <p id="pokemonName"
                        className="font-[Orbitron-Bold] text-center text-[1.875rem] md:text-[3.125rem] mt-[17px]">{pokemon && pokemon ? CapitalFirstLetter(pokemon.name) : "loading"}</p>
                </div>
                <div className="flex justify-center">
                    <p className="font-[Orbitron-Bold] text-[1.25rem] p-0 m-0" onClick={handleShinyClick}>Click Picture for Shiny</p>
                </div>
                <div className="flex justify-center drop-shadow-lg">
                    <img id="pokemonImg" src={pokemon?.sprites.other?.['official-artwork'].front_default}
                        className="h-[250px] w-[250px] md:h-[500px] md:w-[500px] mx-5 cursorImg bg-white rounded-[500px] mt-[5px]"
                        alt="Pokemon Image" />
                </div>
                <div className="flex justify-center">
                    <p id="elementType" className="font-[Orbitron-Bold] text-[1.875rem] md:text-[3.125rem] mt-[30px]">Type: {' '}
                        {pokemon ? pokemon.types.map((type: any, index: number) => (
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
                            aria-controls="drawer-navigation">
                            Open Favorite
                        </button>
                    </div>

                    <div id="drawer-navigation"
                        className="fixed top-0 bg-[#A4ACAF] left-0 z-40 w-full lg:w-[420px] h-screen p-4 overflow-y-auto transition-transform -translate-x-full dark:bg-gray-800"
                        aria-labelledby="drawer-navigation-label">
                        <p id="drawer-navigation-label" className="text-white font-[Orbitron-Bold] text-[2.8rem] uppercase">
                            Favorite</p>
                        <button type="button" data-drawer-hide="drawer-navigation" aria-controls="drawer-navigation"
                            className="text-white bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-6 end-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
                            <svg aria-hidden="true" className="w-[50px] h-[50px] grid" fill="currentColor" viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clip-rule="evenodd"></path>
                            </svg>
                            <span className="sr-only">Close menu</span>
                        </button>
                        <div className="py-4 overflow-y-auto ">
                            <div id="getFavoritesDiv">
                            </div>
                        </div>

                        <div id="conModal" className="modalBox">
                            <div className="modalText">
                                <p>Are you sure you want to remove this Pokemon from favorites?</p>
                                <div className="modal-buttons">
                                    <button id="confirmBtn" className="greenBtn">Confirm</button>
                                    <button id="cancelBtn" className="redBtn">Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default PokedexPageComponent
