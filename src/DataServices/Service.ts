import { Evolution, Pokemon } from "../Interfaces/Interfaces";

export const pokeData = async (input: string) =>{
    const promise = await fetch(`https://pokeapi.co/api/v2/pokemon/${input.toLowerCase()}`);
    const data : Pokemon = await promise.json();
    return data;
}

export const randomPokeData = async () =>{
    const randomId = Math.floor(Math.random() * 898) + 1;
    const promise = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`)
    const data : Pokemon = await promise.json();
    return data;
}

export const pokeDataEvo = async (input: string) =>{
    const promise = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${input.toLowerCase()}`);
    const data : Evolution = await promise.json();
    return data;
}

export const getAPI = async (input: string) =>{
    const promise = await fetch(`${input}`)
    const data : Location = await promise.json()
    console.log(data);
    return data;
}

export const PokemonEvolutionImageName = async (userInput: string) => {
    let PokemonApiUrl = `https://pokeapi.co/api/v2/pokemon/${userInput}`;
    const promise = await fetch(PokemonApiUrl);
    const data: any = await promise.json();
    return data.sprites.other?.['official-artwork'].front_default;
};

export const PokemonEvolutionId = async (userInput: string) => {
    let PokemonApiUrl = `https://pokeapi.co/api/v2/pokemon/${userInput}`;
    const promise = await fetch(PokemonApiUrl);
    const data: Pokemon = await promise.json();
    return data.id;
};