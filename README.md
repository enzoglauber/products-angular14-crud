# JestExamples

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.0.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `npm run test` to execute the unit tests via [Jest](https://jestjs.io/).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

https://codeboost.com.br/projetos/pokeapi/
https://github.com/esterfania/pokemon-angular
https://github.com/HybridShivam/pokedex-angular-app


http://json2ts.com/


api:
  https://pokeapi.co/api/v2/pokemon/302
  https://pokeapi.co/api/v2/type/10/
images:
  https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/302.svg
  https://github.com/PokeAPI/sprites/tree/master/sprites/pokemon/other

declare module namespace {

    export interface Ability2 {
        name: string;
        url: string;
    }

    export interface Ability {
        ability: Ability2;
        is_hidden: boolean;
        slot: number;
    }

    export interface Form {
        name: string;
        url: string;
    }

    export interface Version {
        name: string;
        url: string;
    }

    export interface GameIndice {
        game_index: number;
        version: Version;
    }

    export interface Item {
        name: string;
        url: string;
    }

    export interface Version2 {
        name: string;
        url: string;
    }

    export interface VersionDetail {
        rarity: number;
        version: Version2;
    }

    export interface HeldItem {
        item: Item;
        version_details: VersionDetail[];
    }

    export interface Move2 {
        name: string;
        url: string;
    }

    export interface MoveLearnMethod {
        name: string;
        url: string;
    }

    export interface VersionGroup {
        name: string;
        url: string;
    }

    export interface VersionGroupDetail {
        level_learned_at: number;
        move_learn_method: MoveLearnMethod;
        version_group: VersionGroup;
    }

    export interface Move {
        move: Move2;
        version_group_details: VersionGroupDetail[];
    }

    export interface Species {
        name: string;
        url: string;
    }

    export interface DreamWorld {
        front_default: string;
        front_female?: any;
    }

    export interface Home {
        front_default: string;
        front_female?: any;
        front_shiny: string;
        front_shiny_female?: any;
    }

    export interface OfficialArtwork {
        front_default: string;
    }

    export interface Other {
        dream_world: DreamWorld;
        home: Home;
        official-artwork: OfficialArtwork;
    }

    export interface RedBlue {
        back_default?: any;
        back_gray?: any;
        back_transparent?: any;
        front_default?: any;
        front_gray?: any;
        front_transparent?: any;
    }

    export interface Yellow {
        back_default?: any;
        back_gray?: any;
        back_transparent?: any;
        front_default?: any;
        front_gray?: any;
        front_transparent?: any;
    }

    export interface GenerationI {
        red-blue: RedBlue;
        yellow: Yellow;
    }

    export interface Crystal {
        back_default?: any;
        back_shiny?: any;
        back_shiny_transparent?: any;
        back_transparent?: any;
        front_default?: any;
        front_shiny?: any;
        front_shiny_transparent?: any;
        front_transparent?: any;
    }

    export interface Gold {
        back_default?: any;
        back_shiny?: any;
        front_default?: any;
        front_shiny?: any;
        front_transparent?: any;
    }

    export interface Silver {
        back_default?: any;
        back_shiny?: any;
        front_default?: any;
        front_shiny?: any;
        front_transparent?: any;
    }

    export interface GenerationIi {
        crystal: Crystal;
        gold: Gold;
        silver: Silver;
    }

    export interface Emerald {
        front_default: string;
        front_shiny: string;
    }

    export interface FireredLeafgreen {
        back_default?: any;
        back_shiny?: any;
        front_default?: any;
        front_shiny?: any;
    }

    export interface RubySapphire {
        back_default: string;
        back_shiny: string;
        front_default: string;
        front_shiny: string;
    }

    export interface GenerationIii {
        emerald: Emerald;
        firered-leafgreen: FireredLeafgreen;
        ruby-sapphire: RubySapphire;
    }

    export interface DiamondPearl {
        back_default: string;
        back_female?: any;
        back_shiny: string;
        back_shiny_female?: any;
        front_default: string;
        front_female?: any;
        front_shiny: string;
        front_shiny_female?: any;
    }

    export interface HeartgoldSoulsilver {
        back_default: string;
        back_female?: any;
        back_shiny: string;
        back_shiny_female?: any;
        front_default: string;
        front_female?: any;
        front_shiny: string;
        front_shiny_female?: any;
    }

    export interface Platinum {
        back_default: string;
        back_female?: any;
        back_shiny: string;
        back_shiny_female?: any;
        front_default: string;
        front_female?: any;
        front_shiny: string;
        front_shiny_female?: any;
    }

    export interface GenerationIv {
        diamond-pearl: DiamondPearl;
        heartgold-soulsilver: HeartgoldSoulsilver;
        platinum: Platinum;
    }

    export interface Animated {
        back_default: string;
        back_female?: any;
        back_shiny: string;
        back_shiny_female?: any;
        front_default: string;
        front_female?: any;
        front_shiny: string;
        front_shiny_female?: any;
    }

    export interface BlackWhite {
        animated: Animated;
        back_default: string;
        back_female?: any;
        back_shiny: string;
        back_shiny_female?: any;
        front_default: string;
        front_female?: any;
        front_shiny: string;
        front_shiny_female?: any;
    }

    export interface GenerationV {
        black-white: BlackWhite;
    }

    export interface OmegarubyAlphasapphire {
        front_default: string;
        front_female?: any;
        front_shiny: string;
        front_shiny_female?: any;
    }

    export interface XY {
        front_default: string;
        front_female?: any;
        front_shiny: string;
        front_shiny_female?: any;
    }

    export interface GenerationVi {
        omegaruby-alphasapphire: OmegarubyAlphasapphire;
        x-y: XY;
    }

    export interface Icons {
        front_default: string;
        front_female?: any;
    }

    export interface UltraSunUltraMoon {
        front_default: string;
        front_female?: any;
        front_shiny: string;
        front_shiny_female?: any;
    }

    export interface GenerationVii {
        icons: Icons;
        ultra-sun-ultra-moon: UltraSunUltraMoon;
    }

    export interface Icons2 {
        front_default: string;
        front_female?: any;
    }

    export interface GenerationViii {
        icons: Icons2;
    }

    export interface Versions {
        generation-i: GenerationI;
        generation-ii: GenerationIi;
        generation-iii: GenerationIii;
        generation-iv: GenerationIv;
        generation-v: GenerationV;
        generation-vi: GenerationVi;
        generation-vii: GenerationVii;
        generation-viii: GenerationViii;
    }

    export interface Sprites {
        back_default: string;
        back_female?: any;
        back_shiny: string;
        back_shiny_female?: any;
        front_default: string;
        front_female?: any;
        front_shiny: string;
        front_shiny_female?: any;
        other: Other;
        versions: Versions;
    }

    export interface Stat2 {
        name: string;
        url: string;
    }

    export interface Stat {
        base_stat: number;
        effort: number;
        stat: Stat2;
    }

    export interface Type2 {
        name: string;
        url: string;
    }

    export interface Type {
        slot: number;
        type: Type2;
    }

    export interface RootObject {
        abilities: Ability[];
        base_experience: number;
        forms: Form[];
        game_indices: GameIndice[];
        height: number;
        held_items: HeldItem[];
        id: number;
        is_default: boolean;
        location_area_encounters: string;
        moves: Move[];
        name: string;
        order: number;
        past_types: any[];
        species: Species;
        sprites: Sprites;
        stats: Stat[];
        types: Type[];
        weight: number;
    }

}

