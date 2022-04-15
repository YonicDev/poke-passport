# Licensing notice

By making any contributions to PokéPassport, you are agreeing that any code you have contributed to will be licensed under the [Affero GNU GPL version 3](https://github.com/YonicDev/poke-passport/blob/main/LICENSE.md) (or any later version), as well as complying with its conditions.

# Criteria for tagging Pokémon

The criteria for tagging Pokémon depends on the specific ruleset provided for each game, but the overall system uses a pessimistic bias: 

> We can't say for sure if a Pokémon will be transferable or not unless we see it in the wild.

With a small number of granted exceptions: The basis for evolution and breeding are expected to appear, although specific mechanics may be altered or not appear.

This Law of Murphy-esque bias allows flexibility for many instances in which the availability of a Pokémon is left to ambiguity, as well as reduce speculation up to a minimum.

## Categories

The following tags are common to all Pokémon games while under development:

* **Confirmed**: The Pokémon has been seen in-game and represents 100% likelihood of availability.
* **Guaranteed**: According to specific factors (mainly evolutionary line), Pokémon tagged in this category have a 99% likelihood of availability.
* **Possible**: According to direct or indirect factors, Pokémon tagged in this category have a significant likelihood of availability.
* **Untransferable**: Internally tagged as `"no"`, Pokémon tagged in this category are not available for transfer.
* **Unknown**: The default category for all Pokémon. More data is necessary for determining the category of these Pokémon.

After launch, new game-specific categories may be created.

# Coding style and formatting

* **JavaScript** is used for React and UI code.
* **TypeScript** is used for everything else.

> ⚠️ ***NOTICE:*** Porting to TypeScript is currently under consideration, as well as depending on the resulting ruling of the [ECMAScript proposal for type annotations](https://github.com/tc39/proposal-type-annotations).

> ⚠️ **To be written in detail.**

# Committing

Branches of the repository are identified into **kinds** of branches.

* **Main**: The main development branch. GitHub Actions will make automated builds from this branch, so this branch should be only used for merging other branches or when making changes to key core components, like licensing or the aforementioned Actions.
* **Feature**: Branches that add or modify functionality of the webpage.
* **Content**: Branches that add or modify contents of the webpage, be it the status of a Pokémon in one of the tables or pages containing information about a game.
* **Bugfix**: Branches that solve issues and bugs with the functionality of a webpage. 