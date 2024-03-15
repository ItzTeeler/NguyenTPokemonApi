export interface Pokemon {
    abilities:                Ability[];
    base_experience:          number;
    cries:                    Cries;
    forms:                    Species[];
    game_indices:             GameIndex[];
    height:                   number;
    held_items:               HeldItem[];
    id:                       number;
    is_default:               boolean;
    location_area_encounters: string;
    moves:                    Move[];
    name:                     string;
    order:                    number;
    past_abilities:           any[];
    past_types:               any[];
    species:                  Species;
    sprites:                  Sprites;
    stats:                    Stat[];
    types:                    Type[];
    weight:                   number;
   }
   
   export interface Ability {
    ability:   Species;
    is_hidden: boolean;
    slot:      number;
   }
   
   export interface Species {
    name: string;
    url:  string;
   }
   
   export interface Cries {
    latest: string;
    legacy: string;
   }
   
   export interface GameIndex {
    game_index: number;
    version:    Species;
   }
   
   export interface HeldItem {
    item:            Species;
    version_details: VersionDetail[];
   }
   
   export interface VersionDetail {
    rarity:  number;
    version: Species;
   }
   
   export interface Move {
    move:                  Species;
    version_group_details: VersionGroupDetail[];
   }
   
   export interface VersionGroupDetail {
    level_learned_at:  number;
    move_learn_method: Species;
    version_group:     Species;
   }
   
   export interface GenerationV {
    "black-white": Sprites;
   }
   
   export interface GenerationIv {
    "diamond-pearl":        Sprites;
    "heartgold-soulsilver": Sprites;
    platinum:               Sprites;
   }
   
   export interface Versions {
    "generation-i":    GenerationI;
    "generation-ii":   GenerationIi;
    "generation-iii":  GenerationIii;
    "generation-iv":   GenerationIv;
    "generation-v":    GenerationV;
    "generation-vi":   { [key: string]: Home };
    "generation-vii":  GenerationVii;
    "generation-viii": GenerationViii;
   }
   
   export interface Other {
    dream_world:        DreamWorld;
    home:               Home;
    "official-artwork": OfficialArtwork;
    showdown:           Sprites;
   }
   
   export interface Sprites {
    animated?:          Sprites;
    back_default:       string;
    back_female:        string;
    back_shiny:         string;
    back_shiny_female:  null | string;
    front_default:      string;
    front_female:       string;
    front_shiny:        string;
    front_shiny_female: string;
    other?:             Other;
    versions?:          Versions;
   }
   
   export interface GenerationI {
    "red-blue": RedBlue;
    yellow:     RedBlue;
   }
   
   export interface RedBlue {
    back_default:      string;
    back_gray:         string;
    back_transparent:  string;
    front_default:     string;
    front_gray:        string;
    front_transparent: string;
   }
   
   export interface GenerationIi {
    crystal: Crystal;
    gold:    Gold;
    silver:  Gold;
   }
   
   export interface Crystal {
    back_default:            string;
    back_shiny:              string;
    back_shiny_transparent:  string;
    back_transparent:        string;
    front_default:           string;
    front_shiny:             string;
    front_shiny_transparent: string;
    front_transparent:       string;
   }
   
   export interface Gold {
    back_default:       string;
    back_shiny:         string;
    front_default:      string;
    front_shiny:        string;
    front_transparent?: string;
   }
   
   export interface GenerationIii {
    emerald:             OfficialArtwork;
    "firered-leafgreen": Gold;
    "ruby-sapphire":     Gold;
   }
   
   export interface OfficialArtwork {
    front_default: string;
    front_shiny:   string;
   }
   
   export interface Home {
    front_default:      string;
    front_female:       string;
    front_shiny:        string;
    front_shiny_female: string;
   }
   
   export interface GenerationVii {
    icons:                  DreamWorld;
    "ultra-sun-ultra-moon": Home;
   }
   
   export interface DreamWorld {
    front_default: string;
    front_female:  null | string;
   }
   
   export interface GenerationViii {
    icons: DreamWorld;
   }
   
   export interface Stat {
    base_stat: number;
    effort:    number;
    stat:      Species;
   }
   
   export interface Type {
    slot: number;
    type: Species;
   }


   export interface Evolution {
    base_happiness:         number;
    capture_rate:           number;
    color:                  Color;
    egg_groups:             Color[];
    evolution_chain:        EvolutionChain;
    evolves_from_species:   Color;
    flavor_text_entries:    FlavorTextEntry[];
    form_descriptions:      any[];
    forms_switchable:       boolean;
    gender_rate:            number;
    genera:                 Genus[];
    generation:             Color;
    growth_rate:            Color;
    habitat:                Color;
    has_gender_differences: boolean;
    hatch_counter:          number;
    id:                     number;
    is_baby:                boolean;
    is_legendary:           boolean;
    is_mythical:            boolean;
    name:                   string;
    names:                  Name[];
    order:                  number;
    pal_park_encounters:    PalParkEncounter[];
    pokedex_numbers:        PokedexNumber[];
    shape:                  Color;
    varieties:              Variety[];
   }
   
   export interface Color {
    name: string;
    url:  string;
   }
   
   export interface EvolutionChain {
    url: string;
   }
   
   export interface FlavorTextEntry {
    flavor_text: string;
    language:    Color;
    version:     Color;
   }
   
   export interface Genus {
    genus:    string;
    language: Color;
   }
   
   export interface Name {
    language: Color;
    name:     string;
   }
   
   export interface PalParkEncounter {
    area:       Color;
    base_score: number;
    rate:       number;
   }
   
   export interface PokedexNumber {
    entry_number: number;
    pokedex:      Color;
   }
   
   export interface Variety {
    is_default: boolean;
    pokemon:    Color;
   }
   


   export interface Location {
    location_area:   LocationArea;
    version_details: VersionDetail[];
   }
   
   export interface LocationArea {
    name: string;
    url:  string;
   }
   
   export interface VersionDetail {
    encounter_details: EncounterDetail[];
    max_chance:        number;
    version:           LocationArea;
   }
   
   export interface EncounterDetail {
    chance:           number;
    condition_values: LocationArea[];
    max_level:        number;
    method:           LocationArea;
    min_level:        number;
   }
   
   export interface Location2 {
    location_area: {
        name: string;
    }[];
}

// 

export interface RegEvolution {
    baby_trigger_item: null;
    chain:             Chain;
    id:                number;         
   }
   
   export interface Chain {
    evolution_details: EvolutionDetail[];
    evolves_to:        Chain[];
    is_baby:           boolean;
    species:           Species;
   }
   
   export interface EvolutionDetail {
    gender:                  null;
    held_item:               null;
    item:                    Species | null;
    known_move:              null;
    known_move_type:         null;
    location:                null;
    min_affection:           null;
    min_beauty:              null;
    min_happiness:           number | null;
    min_level:               null;
    needs_overworld_rain:    boolean;
    party_species:           null;
    party_type:              null;
    relative_physical_stats: null;
    time_of_day:             string;
    trade_species:           null;
    trigger:                 Species;
    turn_upside_down:        boolean;
   }
   
   export interface Species {
    name: string;
    url:  string;
   }
   