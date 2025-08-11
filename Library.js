// Based on version "Hashtag DnD v0.7.0" by Raeleus
const version = "Hashtag DnD v0.7.0 by Raeleus / Lite Edition by SirSheeply"

// Your "Library" tab should look like this

// Checkout the Guidebook examples to get an idea of other ways you can use scripting
// https://help.aidungeon.com/scripting


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////// CONFIG SETTINGS & CONSTANTS /////////////////////////////////////////////////

// TODO: Make config story card to souce these settings from
const autoCreateItemCards = false;
const defaultDifficulty = 10;

// CONSTANTS
const argumentPattern = /("[^"\\]*(?:\\[\S\s][^"\\]*)*"|'[^'\\]*(?:\\[\S\s][^'\\]*)*'|\/[^\/\\]*(?:\\[\S\s][^\/\\]*)*\/[gimy]*(?=\s|$)|(?:\\\s|\S)+)/g
const levelSplits = [0, 300, 900, 2700, 6500, 14000, 23000, 34000, 48000, 64000, 85000, 100000, 120000, 140000, 165000, 195000, 225000, 265000, 305000, 355000]
const advantageNames = ["normal", "advantage", "disadvantage"]
const difficultyNames = ["impossible", "extreme", "hard", "medium", "easy", "effortless", "veryeasy", "very easy", "automatic", "auto"]
const difficultyScores = [30, 25, 20, 15, 10, 5, 5, 5, 0, 0]

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////// TEMPLATES & DEFAULTS ////////////////////////////////////////////////////

const defaultItemTemplate = {
    itemName: "orange",   // [string] Non-plural name of item
    rarity: 0.0,          // [float] Rarity of the item expressed as a decimal
    // Rarirty can be used to determine loot chance, and item worth.
    // Loot chance examples: 0.0 = 0%, 0.5 = 50%, 1.0 = 100%
    // Item worth example: --::TODO::--

    // NOTE: could store category

    // TODO: Consider remove these properties
    quantity: 1 // Inventory value (or added upon taking)
}

const helpDialog_itemStoryCards = `
<><> Item Story Cards <><>
* Every item should be an "Item" type story card, and must include a category.
* Format each item story card as follows:
  -- Type: {{ Item - Category }}
  -- Title: The name of the item.
  -- Entry: A brief description to help the AI understand what this item represents.
  -- Keywords: For unique items only. Avoid common words or phrases!
  -- Description: Use JSON to define item behavior and reward values.

Example JSON format: \n${defaultItemTemplate}\n`

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////// GENERAL CASE LIBRARY FUNCTIONS ////////////////////////////////////////////////

/**
* Generates a random integer between the specified minimum and maximum values, inclusive.
* @function
* @param {number} min - The lower bound (inclusive).
* @param {number} max - The upper bound (inclusive).
* @returns {number} A random integer between min and max.
*/
function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
* Generates a random floating-point number between the specified minimum and maximum values.
* @function
* @param {number} min - The lower bound (inclusive).
* @param {number} max - The upper bound (exclusive).
* @returns {number} A random float between min (inclusive) and max (exclusive).
*/
function getRandomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

/**
* Generates a pseudo-random number between 0 (inclusive) and 1 (exclusive) based on a numeric seed.
* @function
* @param {number} seed - The seed value to generate a deterministic pseudo-random number.
* @returns {number} A pseudo-random float between 0 and 1.
*/
function getRandom(seed) {
  var x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////// PATTERN MATCHING & ARGUMENT PARSING /////////////////////////////////////////////

/**
* Returns the command keyword in a command string
* -- Assumes we have removed the '#' from the command keyword
* @param {string} [command] A command string with a command keyword
* @returns {array} Returns the command keyword in the command string
**/
function getCommandName(command) {
  var args = getArguments(command)
  if (args.length == 0) return null
  return args[0]
}

/**
* Returns command split into array
* -- Watch out for passing in commands with a command keyword if you onyl want the arguments
* -- Will treat "quotated" sections as one argument.
* @param {string} [command] A command string e.g. "1 item" or "take 1 item"
* @param {boolean} [with_command] returns args with or without first element (command keyword)
* @returns {array} Array containing command string split into arguments e.g. ["1", "item"] or ["take", "1", "item]"
**/
function getArguments(command, with_command=true) {
  var matches = command.match(new RegExp(argumentPattern))
  var returnValue = []
  matches.forEach(match => {
    match = match.replaceAll(/(^")|("$)/g, "").replaceAll(/\\"/g, '"')
    returnValue.push(match)
  })
  if (with_command) return returnValue
  return returnValue.slice(1, returnValue.length)
}

/**
* Returns argument at the index, after the command keyword.
* -- Watch out for passing in commands without command keyword
* -- Will treat "quotated" sections as one argument.
* @function
* @param {string} [command] A command string with command keyword e.g. "take 1 item"
* @param {number} [index] Index of the argument (after the command keyword), e.g. index 0 = "1"
* @returns {string} Argument at the index in the command (after the command keyword)
**/
function getArgument(command, index) {
  var args = getArguments(command)
  index++
  if (index >= args.length) return null
  return args[index]
}

/**
 * Retrieves the remainder of a command string starting from a specified argument index.
 * If the remainder is enclosed in double quotes, they will be removed and escaped quotes will be unescaped.
 * @function
 * @param {string} [command] The full command string to parse.
 * @param {number} [index] The zero-based index of the argument after which to return the remainder.
 * @returns {string} The remaining portion of the command after the specified argument, with quotes processed.
 */
function getArgumentRemainder(command, index) {
  var counter = 0
  const pattern = new RegExp(argumentPattern)
  while ((match = pattern.exec(command)) != null) {
    if (counter++ == index + 1) {
      var result = command.substring(match.index)
      if (/^".*"$/g.test(result)) result = result.replace(/^"/, "").replace(/"$/, "")
      return result.replaceAll(/\\"/g, '"')
    }
  }
}

/**
 * Searches a command string for an argument matching a given regex pattern.
 * Optionally limits the search to arguments within a certain index range.
 * @function
 * @param {string} command - The full command string to search through.
 * @param {RegExp} pattern - The regular expression pattern to match against arguments.
 * @param {number} [limit] - Optional maximum index to search up to.
 * @returns {string|null} - The matching argument if found, otherwise null.
 */
function searchArgument(command, pattern, limit) {
  var index = searchArgumentIndex(command, pattern)
  if (index == -1 || limit != null && index > limit) return null
  return getArgument(command, index)
}

/**
 * Finds the index of the first argument in a command string that matches a given regex pattern.
 * Ignores the first argument (usually the command keyword).
 * @function
 * @param {string} command - The full command string to search through.
 * @param {RegExp} pattern - The regular expression pattern to match against arguments.
 * @returns {number} - The index of the matching argument, or -1 if none found.
 */
function searchArgumentIndex(command, pattern) {
  var args = getArguments(command)
  if (args.length <= 1) return -1
  args.splice(0, 1)

  const search = (element) => pattern.test(element)
  var index = args.findIndex(search)
  if (index != -1) return index
  return -1
}

/**
 * Creates a case-insensitive regex pattern that matches any element from an array.
 * The resulting pattern matches exactly one of the given elements.
 * @function
 * @param {string[]} array - Array of strings to convert into an OR-based regex pattern.
 * @returns {RegExp} - The generated case-insensitive regex pattern.
 */
function arrayToOrPattern(array) {
  var pattern = "^"
  array.forEach(element => {
    pattern += `(${element})|`
  })
  pattern += pattern.substring(0, pattern.length - 1)
  pattern += "$"
  return new RegExp(pattern, "gi")
}

/**
 * Creates a regex pattern that matches any `name` property in a list of stat objects.
 * @function
 * @param {{name: string}[]} stats - Array of stat objects containing `name` properties.
 * @returns {RegExp} - The generated case-insensitive regex pattern.
 */
function statsToOrPattern(stats) {
  var array = []
  stats.forEach(element => {
    array.push(element.name)
  })
  return arrayToOrPattern(array)
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////// DICE CALCULATIONS & ROLLING SYSTEM //////////////////////////////////////////////

/**
* Extracts the number of dice to roll from a roll notation string (e.g., "3d6+2").
* Defaults to 1 if no number is specified before the 'd'.
* @function
* @param {string} [rolltext] - The dice roll notation (e.g., "2d8+3", "d20").
* @returns {number} The number of dice to roll.
*/
function getDice(rolltext) {
  var matches = rolltext.match(/\d+(?=d)/)
  if (matches != null) {
    return parseInt(matches[0])
  }
  return 1
}

/**
* Extracts the number of sides on the dice from a roll notation string (e.g., "3d6+2").
* Defaults to 20 if no sides are specified.
* @function
* @param {string} [rolltext] - The dice roll notation (e.g., "2d8+3", "d20").
* @returns {number} The number of sides on the dice.
*/
function getSides(rolltext) {
  var matches = rolltext.match(/(?<=d)\d+/)
  if (matches != null) {
    return parseInt(matches[0])
  }

  return 20
}

/**
* Extracts the addition or subtraction modifier from a roll notation string (e.g., "+2" in "3d6+2").
* Defaults to 0 if no modifier is specified.
* @function
* @param {string} [rolltext] - The dice roll notation (e.g., "2d8+3", "d20").
* @returns {number} The numeric modifier to be added or subtracted from the roll total.
*/
function getAddition(rolltext) {
  var matches = rolltext.match(/(\+|-)\s*\d+/)
  if (matches != null) {
    return parseInt(matches[0].replaceAll(/\s*/g, ""))
  }

  return 0
}

/**
* Formats a roll notation string into a standardized dice roll format (e.g., "2d6+3").
* If only a number is found, formats it as "d<number>". Defaults to "d20".
* @function
* @param {string} [text] - The raw text containing a dice roll notation.
* @returns {string} A standardized roll notation string.
*/
function formatRoll(text) {
  var matches = text.match(/(?<=.*)\d*d\d+(?=.*)(\s*(\+|-)\s*\d+)?/gi)
  if (matches != null) {
    return matches[0].replaceAll(/\s*\+\s*/g, "+").replaceAll(/\s*-\s*/g, "-")
  }

  matches = text.match(/\d+/)
  if (matches != null) {
    return "d" + matches[0]
  }

  return "d20"
}

/**
* Calculates the total result of a dice roll from a roll notation string (e.g., "2d6+3").
* Rolls the specified number of dice with the given sides and applies any modifiers.
* @function
* @param {string} [rolltext] - The dice roll notation (e.g., "2d8+3", "d20").
* @returns {number} The final calculated roll result, with a minimum of 0.
*/
function calculateRoll(rolltext) {
  rolltext = rolltext.toLowerCase()
  
  var dice = getDice(rolltext)
  var sides = getSides(rolltext)
  var addition = getAddition(rolltext)

  var score = addition;
  for (i = 0; i < dice; i++) {
    score += getRandomInteger(1, sides)
  }

  return Math.max(0, score)
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////// CHARACTER SYSTEM & MANIPULATION ///////////////////////////////////////////////

/**
* Retrieves a character object by name from the game state.
* If no name is provided and allowFallback is true, uses the currently active character.
* @function
* @param {string} [characterName] - The name of the character to retrieve.
* @param {boolean} [allowFallback=true] - Whether to use the currently active character if no name is given.
* @returns {object|null} The character object if found, otherwise null.
*/
function getCharacter(characterName, allowFallback = true) {
  if (characterName == null && allowFallback) characterName = state.characterName
  if (characterName == null) return null
  return state.characters.find(element => element.name.toLowerCase() == characterName.toLowerCase())
}

/**
* Checks whether a character exists in the game state by name.
* @function
* @param {string} [characterName] - The name of the character to check.
* @returns {boolean} True if the character exists, false otherwise.
*/
function hasCharacter(characterName) {
  return getCharacter(characterName) != null
}

/**
* Creates a new character or resets an existing character with default stats and attributes.
* @function
* @param {string} name - The name of the character to create or reset.
* @returns {object} The newly created or reset character object.
*/
function createCharacter(name) {
  var existingCharacter = getCharacter(name)
  if (existingCharacter != null) {
    existingCharacter.name = name
    existingCharacter.className = "adventurer"
    existingCharacter.inventory = []
    existingCharacter.spells = []
    existingCharacter.stats = []
    existingCharacter.skills = []
    existingCharacter.experience = 0
    existingCharacter.health = 10
    return existingCharacter
  }

  var character = {
    name: name,
    className: "adventurer",
    inventory: [],
    spells: [],
    stats: [],
    skills: [],
    experience: 0,
    health: 10
  }
  state.characters.push(character)
  return character
}

/**
* Copies attributes, stats, and inventory from one character to another.
* Removes duplicate entries in inventory, spells, stats, and skills.
* @function
* @param {object} fromCharacter - The source character to copy from.
* @param {object} toCharacter - The target character to copy into.
* @returns {object|undefined} The updated target character, or undefined if parameters are invalid.
*/
function copyCharacter(fromCharacter, toCharacter) {
  if (toCharacter != null && fromCharacter != null) {
    toCharacter.className = fromCharacter.className
    toCharacter.inventory = [...new Set(fromCharacter.inventory)]
    toCharacter.spells = [...new Set(fromCharacter.spells)]
    toCharacter.stats = [...new Set(fromCharacter.stats)]
    toCharacter.skills = [...new Set(fromCharacter.skills)]
    toCharacter.experience = fromCharacter.experience
    toCharacter.health = fromCharacter.health
    return toCharacter
  }
}

/**
* Deletes a character from the game state by name.
* @function
* @param {string} name - The name of the character to delete.
* @returns {void}
*/
function deleteCharacter(name) {
  var index = state.characters.findIndex((element) => element.name == name)
  state.characters.splice(index, 1)
}

/**
* Extracts a character name from raw text input based on specific patterns (e.g., "> Name says" or "Name #...").
* @function
* @param {string} rawText - The raw input text containing the character's name.
* @returns {string|null} The extracted character name, or null if no match is found.
*/
function getCharacterName(rawText) {
  var matches = rawText.match(/(?<=\s+> ).*(?=(\s+#)|( says? "))/)
  if (matches != null && matches[0].trim() != "") {
    return matches[0].trim()
  }

  matches = rawText.match(/.*(?= #)/)
  if (matches != null && matches[0].trim() != "") {
    return matches[0].trim()
  }

  return null
}

/**
* Converts a character's name to its possessive form, defaulting to "Your" for the player character ("You").
* Adds an apostrophe for names ending with 's', otherwise adds "'s".
* @function
* @param {string} name - The name to convert to a possessive form.
* @returns {string} The possessive form of the name.
*/
function getPossessiveName(name) {
  var possesiveName = "Your"
  if (name != "You") {
    possesiveName = name
    if (name.endsWith("s")) possesiveName += "'"
    else possesiveName += "'s"
  }
  return possesiveName
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////// LEVELS, STATS, & SKILLS ///////////////////////////////////////////////////

/**
* Determines the current level of a character based on their experience points.
* Levels are determined by the `levelSplits` array thresholds.
* @function
* @param {number} experience - The total experience points of the character.
* @returns {number} The current level (0-based index into `levelSplits`).
*/
function getLevel(experience) {
  if (experience < 0) experience = 0
  
  var level
  for (level = 0; level < levelSplits.length; level++) {
    if (experience < levelSplits[level]) break
  }
  return level
}

/**
* Gets the required experience points for the character's next level.
* @function
* @param {number} experience - The total experience points of the character.
* @returns {number} The XP threshold for the next level, or -1 if max level is reached.
*/
function getNextLevelXp(experience) {
  if (experience < 0) experience = 0
  
  var level
  for (level = 0; level < levelSplits.length; level++) {
    if (experience < levelSplits[level]) return levelSplits[level]
  }
  return -1
}

/**
* Adds experience points to all party members and announces level-ups.
* @function
* @param {number} experience - The amount of experience points to add to each party member.
* @returns {string} A message summarizing XP gain and any level-up events.
*/
function addXpToAll(experience) {
  if (experience == 0) return ""
  var leveledUp = `\n[The party has gained ${experience} experience!]`
  state.characters.forEach(x => {
    var haveWord = x.name == "You" ? "have" : "has"
    const oldLevel = getLevel(x.experience)
    x.experience += experience
    const newLevel = getLevel(x.experience)
    if (newLevel > oldLevel) leveledUp += `\n[${x.name} ${haveWord} leveled up to ${newLevel}!]`
  })
  return leveledUp
}

/**
* Calculates the maximum health for a character based on Constitution modifier and level.
* Base health is 10 + level * (6 + Constitution modifier).
* @function
* @param {Object} [character] - The character object (defaults to the current player character if null).
* @param {string} character.name - The character's name.
* @param {number} character.experience - The character's current XP.
* @param {Array<{name: string, value: number}>} character.stats - The character's stats array.
* @returns {number} The calculated maximum health for the character.
*/
function getHealthMax(character) {
  if (character == null) character = getCharacter() // Does this work without a name argument?
  
  var modifier = 0
  var stat = character.stats.find((element) => element.name.toLowerCase() == "constitution")
  if (stat != null) modifier = getModifier(stat.value)

  var level = getLevel(character.experience)
  return 10 + level * (6 + modifier)
}

/**
* Calculates the ability modifier for a given stat value.
* Modifier is determined by (statValue - 10) / 2, rounded down.
* @function
* @param {number} statValue - The raw ability score.
* @returns {number} The calculated ability modifier.
*/
function getModifier(statValue) {
  return Math.floor((statValue - 10) / 2)
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////// TEXT CONVERSION & MANIPULATION ////////////////////////////////////////////////

/**
* Cleans and normalizes quoted or prefixed text, typically from chat logs.
* Handles cases where text starts with `> X says "..."` or `> ...` formatting.
* @function
* @param {string} text - The raw text to sanitize.
* @returns {string} The cleaned and standardized text without extra prefixes or trailing punctuation.
*/
function sanitizeText(text) {
  if (/^\s*>.*says? ".*/.test(text)) {
    text = text.replace(/^\s*>\s/, "")
    text = text.replace(/says? "/, "")
    text = text.replace(/"\n$/, "")
    if (text.split('"').length - 1 % 2 == 1)  text += '"'
  } else if (/^\s*>\s.*/.test(text)) {
    text = text.replace(/^\s*>\s/, "")
    text = text.replace(/\.?\n$/, "")
  }
  
  return text
}

/**
* Converts a given word between singular and plural forms based on standard English rules.
* Also accounts for irregular nouns and uncountable nouns.
* @function
* @param {string} word - The word to convert.
* @param {boolean} [makeSingle=true] - If true, convert to singular form; if false, convert to plural form.
* @returns {string} The transformed word.
*/
function singularize(word, makeSingle = true) { //TODO: Changed to default true from false, need to check all usage
  const pluralRules = {
    '(quiz)$': "$1zes",
    '^(ox)$': "$1en",
    '(m|l)ouse$': "$1ice",
    '(matr|vert|ind)(ix|ex)$': "$1ices",
    '(x|ch|ss|sh)$': "$1es",
    '([^aeiouy]|qu)y$': "$1ies",
    '(hive)$': "$1s",
    '(?:([^f])fe|([lr])f)$': "$1$2ves",
    '(shea|lea|loa|thie)f$': "$1ves",
    'sis$': "ses",
    '([ti])um$': "$1a",
    '(tomat|potat|ech|her|vet)o$': "$1oes",
    '(bu)s$': "$1ses",
    '(alias)$': "$1es",
    '(octop)us$': "$1i",
    '(ax|test)is$': "$1es",
    '(us)$': "$1es",
    '([^s]+)$': "$1s" // fallback rule (leave this last)
  };

  const singularRules = {
    '(quiz)zes$': "$1",
    '(matr)ices$': "$1ix",
    '(vert|ind)ices$': "$1ex",
    '^(ox)en$': "$1",
    '(alias)es$': "$1",
    '(octop|vir)i$': "$1us",
    '(cris|ax|test)es$': "$1is",
    '(shoe)s$': "$1",
    '(o)es$': "$1",
    '(bus)es$': "$1",
    '(m|l)ice$': "$1ouse",
    '(x|ch|ss|sh)es$': "$1",
    '(m)ovies$': "$1ovie",
    '(s)eries$': "$1eries",
    '([^aeiouy]|qu)ies$': "$1y",
    '([lr])ves$': "$1f",
    '(tive)s$': "$1",
    '(hive)s$': "$1",
    '(li|wi|kni)ves$': "$1fe",
    '(shea|loa|lea|thie)ves$': "$1f",
    '(^analy)ses$': "$1sis",
    '((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$': "$1$2sis",
    '([ti])a$': "$1um",
    '(n)ews$': "$1ews",
    '(h|bl)ouses$': "$1ouse",
    '(corpse)s$': "$1",
    '(us)es$': "$1",
    's$': "" // fallback rule (leave this last)
  };

  const irregular = {
    move: 'moves',
    foot: 'feet',
    goose: 'geese',
    sex: 'sexes',
    child: 'children',
    man: 'men',
    woman: 'women',
    tooth: 'teeth',
    person: 'people'
  };

  const uncountable = new Set([
    'sheep',
    'fish',
    'deer',
    'moose',
    'series',
    'species',
    'money',
    'rice',
    'information',
    'equipment',
    'gold',
    'bass',
    'milk',
    'food',
    'water',
    'bread',
    'sugar',
    'tea',
    'cheese',
    'coffee',
    'currency',
    'seafood',
    'oil',
    'software'
  ]);

  const lower = word.toLowerCase();
  if (uncountable.has(lower)) return word;

  for (let key in irregular) {
    const pattern = makeSingle
      ? new RegExp(`^${irregular[key]}$`, 'i')
      : new RegExp(`^${key}$`, 'i');

    if (pattern.test(word)) {
      return word.replace(pattern, makeSingle ? key : irregular[key]);
    }
  }

  const rules = makeSingle ? singularRules : pluralRules;
  for (let rule in rules) {
    const pattern = new RegExp(rule, 'i');
    if (pattern.test(word)) {
      return word.replace(pattern, rules[rule]);
    }
  }

  return word;
}

/**
* Compares two strings for equality or partial match while ignoring pluralization.
* @function
* @param {string} searchForThis - The text to search for.
* @param {string} searchInThis - The text in which to search.
* @param {boolean} [exactMatch=true] - If true, require exact match; if false, allow partial match.
* @returns {boolean} True if the comparison matches when ignoring plural forms; otherwise false.
*/
function compareWithoutPlural(searchForThis, searchInThis, exactMatch=true) {
  if (exactMatch) {
    return singularize(searchInThis.toLowerCase()) === singularize(searchForThis.toLowerCase())
  }
  return singularize(searchInThis.toLowerCase()).includes(singularize(searchForThis.toLowerCase()))
}

/**
* Restricts a number to be within a specified range.
* @function
* @param {number} num - The value to clamp.
* @param {number} min - The lower bound of the range.
* @param {number} max - The upper bound of the range.
* @returns {number} The clamped value, guaranteed to be between min and max (inclusive).
**/
function clamp(num, min, max) {
  return num <= min ? min :
         num >= max ? max : num
}

/**
* Converts a string into title case, capitalizing the first letter of each word.
* @function
* @param {string} str - The string to convert.
* @returns {string} The title-cased version of the input string.
**/
function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
  );
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////// STORY CARDS MANAGEMENT ////////////////////////////////////////////////////

/**
 * Creates and inserts a story card into the `storyCards` array.
 * - Accepts either individual parameters or a single object containing the story card properties.
 * - If `keys` is not provided, it defaults to a trimmed version of `title`.
 * @function
 * @param {string|object} title - Card title, or an object containing all card properties: { title, entry, type, keys, description, insertionIndex }.
 * @param {string} [entry=""] - The main text or content of the story card.
 * @param {string} [type=""] - The type/category of the card.
 * @param {string} [keys=""] - Search or trigger keys for the card.
 * @param {string} [description=""] - Additional descriptive text for the card.
 * @param {number} [insertionIndex=storyCards.length] - Position in `storyCards` where the new card is inserted.
 * @returns {object} The newly created story card object.
 **/
function buildStoryCard(title, entry = "", type = "", keys = "", description = "", insertionIndex = storyCards.length) {
  // If passing an object, destructure values
  if (typeof title === "object" && title !== null && "title" in title) {
    ({ title, entry = entry, type = type, keys = keys, description = description } = title);
  }

  // Default key builder — keep only if you need it
  if (!keys) keys = ("" || title || "").trim();

  const card = { type, title, keys, entry, description };

  // Clamp insertion index
  insertionIndex = Math.max(0, Math.min(insertionIndex, storyCards.length));

  // Insert card
  storyCards.splice(insertionIndex, 0, card);

  return card;
}

/**
* - The ultimate story card retrieval for any cards of X title
* @function
* @param {string} [listType] Type string to search story cards for.
* @param {boolean} [exactType] Whether to search for exact type matches, or types that include the string arg.
* @returns {array} An array containing all the story cards that match the type string (given above).
**/
function getStoryCardListByType(listType, exactType=true) {
  const normalizedType = listType.toLowerCase()
  if (exactType) {
    return storyCards.filter((element) => (element.type.toLowerCase() == normalizedType));
  }
  return storyCards.filter((element) => (element.type.toLowerCase().includes(normalizedType)));
}

/***
* The ultimate story card retrieval for any cards of X title
* @function
* @param {string} [listTitle] Title string to search story cards for.
* @param {boolean} [exactTitle] Whether to search for exact title matches, or titles that include the string arg.
* @returns {array} An array containing all the story cards that match the title string (given above).
**/
function getStoryCardListByTitle(listTitle, exactTitle = true) {
  const normalizedTitle = listTitle.toLowerCase()
  if (exactTitle) {
    return storyCards.filter((element) => singularize(element.title, true).toLowerCase() === normalizedTitle )
  }
  return storyCards.filter((element) => singularize(element.title, true).toLowerCase().includes(normalizedTitle) )
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////// ITEM & INVENTORY MANAGEMENT /////////////////////////////////////////////////

/**
* - This function adds, or increases, an item in the character's inventory
* @function
* @param {character} [character] The character whose inventory is being manipulated
* @param {string} [itemName] Name of the item to be added or increased
* @param {number} [quantity] The quantity of the item attempting to add
* @returns {item} Returns the inventory item just added or increased
**/
function putItemIntoInventory(character, itemName, quantity)
{
  // Check story cards (create one if needed), and make sure it's a complete item
  const newItem = checkItemCards(itemName)
  // Has to be done after checkItemCards, so that new cards don't have the override quantity
  newItem.quantity = quantity // Enforce override quantity
  // Update inventory
  const invItem = searchInventory(character, newItem.itemName)
  if (!invItem) {
    character.inventory.push(newItem)
    return character.inventory[character.inventory.length-1]
  }
  invItem.quantity += newItem.quantity
  return invItem
}

/**
* ITEM STORY CARDS!
* 1) Check the item story cards to see if the item exists!
* 2) If the item exists, replace remaining default values with item card values!
* 3) If the item does not exist, create a story card for one.
* @function
* @param {string} [newItem] Name of item to be checked.
* @returns {item} Returns the newItem with updated details.
**/
function checkItemCards(itemName, buildCard=autoCreateItemCards) {
  const newItem = { itemName: singularize(itemName).toLowerCase() }
  const itemCards = getStoryCardListByTitle(newItem.itemName, true)
  const itemCard = itemCards.length > 0 ? itemCards[0] : null;
  if (itemCard) {
    const existingDetails = JSON.parse(itemCard.description)
    for (const key in existingDetails) {
      if (newItem[key] === defaultItemTemplate[key] && existingDetails[key] !== undefined) {
        newItem[key] = existingDetails[key]
      }
    }
  } else {
    // Make sure newItem is a complete item
    for (const key in defaultItemTemplate) {
      if (newItem[key] === undefined) {
        newItem[key] = defaultItemTemplate[key]
      }
    }
    if (buildCard) {
      buildStoryCard(newItem.itemName, "", "Item - Misc - Uncommon", "", JSON.stringify(newItem))
    } else {
      return newItem // Return card as is
    }
  }
  return newItem
}

/**
* - This function removes/reduces items in the character's inventory
* @function
* @param {character} [character] The character whose inventory is being manipulated
* @param {string} [itemName] The name of the item to be removed
* @param {number} [quantity] The quantity of the item attempting to remove
* @returns {[item, number]} [Item removed (or null), quantity removed]
**/
function removeItemFromInventory(character, itemName, quantity) {
  const invIndex = character.inventory.findIndex((element) => compareWithoutPlural(itemName, element.itemName))
  if (invIndex === -1) {
    return [null, quantity] // Cannot find index of itemName in inventory
  }
  const invItem = character.inventory[invIndex]
  const invItemQty = invItem.quantity
  if (quantity >= invItemQty) {
    invItem.quantity = 0 // Remaining will be exactly 0
    character.inventory.splice(invIndex, 1) // Remove item completely
    return [invItem, invItemQty]
  }
  invItem.quantity -= quantity
  return [invItem, quantity]
}

/**
 * - Parses a quantity and item name from an argument.
 * - If not a number, quantity defaults to 1, and the argument at quantityIndex is the item name.
 * - Accepts non-numeric quantity inputs like "all", "a", "an".
 * - Will not return a number as the name, name will be null if not found or numeric.
 * 
 * @function
 * @param {string} argQuantity - The suspected argument containing the quantity
 * @param {string} argName - The suspected argument containing the argName
 * @param {boolean} handleAllCase - Determines if cases like "all" or "every" need to be check for the quntity.
 * @param {boolean} handleArticleCase - Determines if cases like "a" or "the" need to be check for the quntity.
 * @returns {[number,string]} - Tuple containing the quantity (number) and the name (string).
 **/
function parseQuantityAndName(argQuantity, argName, handleAlls=true, handleArticles=true) {
  let quantity = 1
  let name = argName ?? null
  // Handle case where quantity is a number
  if (!isNaN(argQuantity)) {
    quantity = Number(argQuantity)
  
  // Handle cases where quantity might be "all" or "every"
  } else if (allSynonyms.includes(argQuantity) && handleAlls) {
    quantity = Number.MAX_SAFE_INTEGER

  // Handle cases where quantity might be "a", "an", "the"
  } else if (articleSynonyms.includes(argQuantity) && handleArticles) {
    // quantity = 1 // defaults
  }

  // Handle case where quantity was not valid
  else {
    name = argQuantity ?? null // Might be the name
    return [quantity, name] // ignore argName
  }
  
  // Handle case after valid number
  name = isNaN(name) ? name : null // Can't be a number
  return [quantity, name]
}

/**
* Returns a textual representation/list of the character's inventory.
* @function
* @param {character} [character] Character whose inventory to display.
* @param {string} [dotPointChar] Style of dot point for listing items, defaults to double-space.
* @returns {string} A textual representation/list of the character's inventory.
**/
function showInventory(character, dotPointChar=" ") {
  text = ""
  if (character.inventory.length > 0) {
    character.inventory.forEach(item => {
      text += `${dotPointChar} ${item.quantity}x ${toTitleCase(item.itemName)}\n`
    });
  } else {
    text += `* Inventory is empty!\n`
  }
  return text
}

/**
* Searches the characters inventory for an item by name, and returns it.
* @function
* @param {character} [character] Character whose inventory to search.
* @param {string} [itemName] Name of item to sreach for.
* @returns {obejct|null} Item, if any, or null if not.
**/
function searchInventory(character, itemName) {
  return character.inventory.find((element) => compareWithoutPlural(itemName, element.itemName)) ?? null
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */