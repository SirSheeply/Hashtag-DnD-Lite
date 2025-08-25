// Based on version "Hashtag DnD v0.7.0" by Raeleus
const version = "Hashtag DnD v0.7.0 by Raeleus / Lite v0.0.0 Edition by SirSheeply"

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

// CONSTANTS
const outputMode = "output" // outputMode and inputMode are used across step functions
const inputMode = "input"   // They are defined here as constants for consistency and maintenance
const argumentPattern = /("[^"\\]*(?:\\[\S\s][^"\\]*)*"|'[^'\\]*(?:\\[\S\s][^'\\]*)*'|\/[^\/\\]*(?:\\[\S\s][^\/\\]*)*\/[gimy]*(?=\s|$)|(?:\\\s|\S)+)/g
const advantageNames = ["normal", "advantage", "disadvantage"]

const difficultyScale = {
  "impossible": 30,
  "extreme": 25,
  "hard": 20,
  "medium": 15,
  "easy": 10,
  "effortless": 5,
  "veryeasy": 5,
  "very easy": 5,
  "automatic": 0,
  "auto": 0
}

// Synonyms used too broadly to search the registry every time
const articleSynonyms = ["a", "an", "the"]
const allSynonyms = ["all", "every", "each", "every one", "everyone"]
const createSynonyms = ["create", "generate", "start", "begin", "setup", "new"]

// CONFIGURATION
//TODO: Make stat/skill/spell terminology a config option
const config = {
  autoCreateItemCards: false, // Automaticall creates item cards when put into the inventory
  defaultDifficulty: 10,      // Difficulty of checks when not specified in commands
  autoXp: 100,                // XP a character gains after a successful check
  showRolls: false,           // Enables/Disables the dice result of rolls being displayed for #try, #cast
  critFailProtect: 20,        // Rerolls critical fails X checks after last critical fail
  xpShare: false,             // Enables/disables auto xp sharing among party characters
  skillsPerLevel: 1,          // Skill points awarded per levelup event
  levelsPerASI: 4,            // How many levels award an ASI
  statsPerASI: 2              // Stat points awarded per ASI event
}

/**
 * Loads and applies configuration settings from the "#DND Lite Config" story card.
 * - Validates types before applying.
 * - Always saves the current config back to the story card.
 * @returns {boolean} True if config was successfully processed, false if JSON parsing failed.
 */
function enforceConfig() {
  // Get config story card or create one
  let configCard = getStoryCardListByTitle("#DND Lite Config")
  if (configCard.length > 0) {
    try {
      const newSettings = JSON.parse(configCard[0].entry)
      Object.keys(newSettings).forEach(key => {
        config[key] = validateType(newSettings[key], config[key])
      });
    } catch (error) {
      return false
    }
  }
  // Refresh the config story card, or build one if none exists.
  saveStoryCard("#DND Lite Config", {
    entry: JSON.stringify(config, null, 2),
    type: "CONFIG",
    keys: ""
  });
  return true
}

/**
 * Ensures a value matches the type of an expected value.
 * - Attempts type conversion for booleans and numbers when mismatched.
 * - Falls back to the expected value if conversion fails.
 * @param {*} value - The value to validate or convert.
 * @param {*} expectedValue - A reference value to determine the expected type.
 * @returns {*} The validated or converted value.
 */
function validateType(value, expectedValue) {
  if (typeof value !== typeof expectedValue) {
    if (typeof expectedValue === "boolean") {
      return Boolean(value) || expectedValue;
    }
    if (typeof expectedValue === "number" && !isNaN(value)) {
      return Number(value) || expectedValue;
    }
    return expectedValue
  }
  return value
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////// TEMPLATES & DEFAULTS ////////////////////////////////////////////////////

// Rarirty is used to determine loot rarity, and item worth.
// Loot rarity examples: 0.0 = 0%, 0.5 = 50%, 1.0 = 100%
const defaultItemTemplate = {
    itemName: "item",     // [string] Non-plural name of item
    rarity: 1.0,          // [float] Rarity of the item expressed as a decimal
    quantity: 1           // Inventory value (or added upon taking)
    // TODO: could store category
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
  // Ensure pattern is case-insensitive
  if (!(pattern.flags || "").includes("i")) {
    pattern = new RegExp(pattern.source, pattern.flags + "i");
  }

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
* If only a number is found, formats as "d" for dice followed by the number. Defaults to "d20".
* @function
* @param {string} [text] - The raw text containing a dice roll notation.
* @returns {string} A standardized roll notation string.
*/
function formatRoll(text) {
  /*
             \d*d\d+ --> Matches something like d20, 2d6, 10d8 (optional number before the d).
  (\s*(\+|-)\s*\d+)? --> Optionally matches a modifier like +3 or -2, allowing spaces anywhere.
  (?<=.*) and (?=.*) --> lookbehinds/lookaheads that basically say “match anywhere in the string”
                  gi --> Case-insensitive, global search.
  */
  let matches = text.match(/(?<=.*)\d*d\d+(?=.*)(\s*(\+|-)\s*\d+)?/gi)
  if (matches != null) {
    return matches[0].replaceAll(/\s*\+\s*/g, "+") // remove spaces around +
                     .replaceAll(/\s*-\s*/g, "-") // remove spaces around -
  }

  // If no dice format was found, it looks for fist number in the text.
  matches = text.match(/\d+/)
  if (matches != null) {
    return "d" + matches[0]
  }

  return "d20" //defaults to d20
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
  
  const dice = getDice(rolltext)         // Number of dice to roll        | 2
  const sides = getSides(rolltext)       // Sides of the dice to roll     | d8 = 8
  const addition = getAddition(rolltext) // Any additions or subtrations  | +3

  let score = addition;
  for (i = 0; i < dice; i++) {
    score += getRandomInteger(1, sides)
  }

  return Math.max(0, score)
}

/**
 * Rolls one or two dice based on roll type and calculates modifiers.
 * @param {number} dice Number of sides on the die (e.g., 20 for d20).
 * @param {string} [rollType="normal"] Roll type: "normal", "advantage", or "disadvantage".
 * @param {object|null} [character=null] Character object containing stats and skills.
 * @param {object|null} [checkSkill=null] Skill object with modifier and linked stat.
 * @param {object|null} [checkAbility=null] Ability object with value.
 * @returns {{ die1: number, die2: number, score: number, modifier: number }}
 */
function performRoll(dice, rollType, character=null, checkSkill=null, checkAbility=null) {
  let modifier = 0
  let die1 = calculateRoll(dice)
  let die2 = calculateRoll(dice)

  // Critical Fail Protection
  if (dice == "d20" || dice == "1d20") {
    state.lastFail = state.lastFail ?? 0
    if (state.lastFail <= config.critFailProtect) {
      if (die1 == 1) {
        state.lastFail = 0
        die1 = calculateRoll(dice)
        if (die1 == 1) die1++
      }
      if (die2 == 1 && rollType == "disadvantage") {
        state.lastFail = 0
        die2 = calculateRoll(dice)
        if (die2 == 1) die2++
      }
    } else {
      state.lastFail++
    }
  }

  const score = rollType == "advantage" ? Math.max(die1, die2) : rollType == "disadvantage" ? Math.min(die1, die2) : die1

  if (character) {
    if (checkSkill) {
      modifier += checkSkill.modifier
      const stat = character.stats.find(x => x.name.toLowerCase() == checkSkill.stat.toLowerCase())
      if (stat) modifier += getModifier(stat.value)
    } else if (checkAbility) {
      modifier += getModifier(checkAbility.value)
    }
  }

  return { die1, die2, score, modifier };
}

/**
 * Generates a random stat roll from 4 d6 minus the lowest.
 * @returns {number} random stat value.
 */
function rollStat() {
  let rolls = [];
  for (let r=0; r < 4; r++) {
    rolls.push(getRandomInteger(1, 6));
  }
  const min = Math.min(...rolls);
  return rolls.reduce((sum, n) => sum + n, 0) - min;
}

/**
 * Generates a formatted string describing the result of a dice roll.
 * Can handle raw rolls or skill/ability checks, including modifiers,
 * advantage/disadvantage, and optional success/critical text.
 *
 * @param {string} rollType - Type of roll: "normal", "advantage", or "disadvantage".
 * @param {number} modifier - Total modifier to add to the roll (from skill/ability).
 * @param {number} score - The result of the dice roll before adding the modifier.
 * @param {number} die1 - First die result (used for advantage/disadvantage display).
 * @param {number} die2 - Second die result (used for advantage/disadvantage display).
 * @param {object|null} [character=null] Character object containing a name.
 * @param {number|null} [difficulty=null] - The target DC for skill/ability checks. Optional for raw rolls.
 * @param {object|null} [checkSkill=null] - Skill object used for the check, if any.
 * @param {object|null} [checkAbility=null] - Ability object used for the check, if any.
 * @param {boolean} [showCrit=true] - Whether to include critical/success/failure text.
 *
 * @returns {string} Formatted roll text including dice, modifiers, and check result.
 */

function printRoll(dice, rollType, modifier, score, die1, die2, difficulty=null, character=null, checkSkill=null, checkAbility=null, showCrit=true) {
  const modText = (modifier >= 0) ? "+ " + modifier : "- "+Math.abs(modifier)
  const modifierText = (modifier != 0) ? ` ${modText} = ${score + modifier}` : ""
  const dieText = (rollType == "advantage" || rollType == "disadvantage") ? `${rollType} (${die1}, ${die2})` : die1

  const successText = (score + modifier >= difficulty) ? " Success!" : " Failure!"
  const critText = (score == 20) ? " Critical Success!" : (score == 1) ? " Critical Failure!" : successText

  if (checkSkill == null && checkAbility == null) {
    return `[${character ? character.name+" r" : " R"}olled ${dice} for a score of: ${dieText}${modifierText}.${difficulty != null ? (showCrit ? critText : successText) : ""}]`
  }

  const checkType = checkSkill?.name ?? checkAbility?.name ?? "Ability"

  return `[DC ${difficulty} ${checkType} check: ${character ? character.name+" r" : " R"}olled ${dice} for a score of: ${dieText}${modifierText}.${showCrit ? critText : ""}]`
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/////////////////////////////////////////////////////////////// ///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////// STEP PROCESS HANDLING ///////////////////////////////////////////////////

// ============================
// Step Handlers Registry
// ============================
const stepHandlers = {
  // Character Creation Flow
  prefabChoice: handlePrefabChoice,
  presetChoice: handlePresetChoice,
  classChoice: handleStepClassChoice,
  statsChoice: handleStepStatsChoice,
  skillsChoice: handleStepSkillsChoice,
  spellsChoice: handleStepSpellsChoice,
  itemsChoice: handleStepItemsChoice,
  finishCreate: handleFinishCreate

  // Other Flow
  // <other flows steps here>
};

/**
 *
 * @function
 * @param {string} [text]
 * @returns {string} [newText]
 */
function handleStepProcess(text, mode) {
  state.show = "steps" // Maintain the steps processing state; TODO: is this needed?
  text = sanitizeTextAdvanced(text)

  if (text.toLowerCase() == "q" || !state.step) {
    state.show = "none"
    state.step = null
    return "[Process has been aborted!]\n"
  }

  const handler = stepHandlers[state.step];
  if (!handler) {
    state.show = "none"
    state.step = null
    return `Unknown step: ${state.step}\n`;
  }

  const { nextStep, newText, success } = handler(text, mode);
  if (nextStep) state.step = nextStep;

  if (!success) {
    state.show = "none"
    state.step = null
  }
  return newText
}

/* NOTE:
 * Step functions should have an input mode, and output mode
 * During output mode we ask questions, maybe do some pre-processing
 * During input mode we process player answers, then set the nextStep
 * Step functions return {nextStep:nextStep, newText:newText, success:success}
 * Setting newText in output mode will overwrite AI Dungeon Output and display in the output field
 * Setting newText in input mode will overwrite User Input and display in the input field
 */

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/////////////////////////////////////////////////////////////// ///////////////////////////////////////////////////////////////
/////////////////////////////////////////// CHARACTER CREATION - STEP FUNCTIONS ///////////////////////////////////////////////

// TODO: Sorry for these step functions being quite dense. They aim to do a lot for such a simple form, so I packed them down.

/**
 * Handles the prefab character choice step.
 * @function
 * @param {string} [text] - Player input or AI Dungeon output
 * @param {string} [mode] - Either "input" or "output".
 * @returns {{ nextStep: string, newText: string, success: boolean }}
 */
function handlePrefabChoice(text, mode) {
  let newText = " "
  let nextStep = "prefabChoice"
  if (mode === outputMode) {
    newText = `***CHARACTER CREATION***\n`
    +`Character: ${state.tempCharacter.name}\n`
    +`Would you like to use a preset character? (y/n/q to quit)\n`
  }
  else if (mode === inputMode) {
    if (text.toLowerCase().startsWith("y")) {
      nextStep = "presetChoice"
    }
    else if (text.toLowerCase().startsWith("n")) {
      nextStep = "classChoice"
    }
  }
  return {nextStep:nextStep, newText:newText, success:true}
}

/**
 * Handles the preset character selection step.
 * @function
 * @param {string} [text] - Player input or AI Dungeon output
 * @param {string} [mode] - Either "input" or "output".
 * @returns {{ nextStep: string, newText: string, success: boolean }}
 */
function handlePresetChoice(text, mode) {
  let newText = " "
  let success = true
  let nextStep = "presetChoice"
  // Get a list of all the preset cards with the preset type
  const presetIndexes = getStoryCardListByType("preset")
  if (mode === outputMode) {
    newText = `What character will you choose?\n`
    for (let index = 0; index < presetIndexes.length; index++) {
      newText += `${index}. ${presetIndexes[index].title}\n`
    }
    newText += `Enter the number or q to quit.\n`
  }
  else if (mode === inputMode) {
    const playerChoice = parseInt(text)
    if (isNaN(text) || playerChoice < 0 || playerChoice >= presetIndexes.length) {
      success = false
      newText = "Error: No preset Cards Found!\n"
    } else {
      // FYI: Creates a character from the preset into state.tempCharacter
      createCharacterFromPreset(presetIndexes, playerChoice)
      nextStep = "finishCreate"
    }
  }
  return {nextStep:nextStep, newText:newText, success:success}
}

/**
 * Handles the class character selection step.
 * @function
 * @param {string} [text] - Player input or AI Dungeon output
 * @param {string} [mode] - Either "input" or "output".
 * @returns {{ nextStep: string, newText: string, success: boolean }}
 */
function handleStepClassChoice(text, mode) {
  let newText = " "
  let nextStep = "classChoice"
  if (mode === outputMode) {
    newText = `What class is your character?\n`
  }
  else if (mode === inputMode) {
    state.tempCharacter.className = text
    nextStep = "statsChoice"
  }
  return {nextStep:nextStep, newText:newText, success:true}
}

/**
 * Handles the character stats selection step.
 * @function
 * @param {string} [text] - Player input or AI Dungeon output
 * @param {string} [mode] - Either "input" or "output".
 * @returns {{ nextStep: string, newText: string, success: boolean }}
 */
function handleStepStatsChoice(text, mode) {
  let newText = " "
  let nextStep = "statsChoice"

  // Generate 6 ability scores (if none exist on output, or input equals r to reroll)
  const needsReroll = (mode === outputMode && state.statDice?.length == 0)
  const wantsReroll = (mode === inputMode && text.toLowerCase() == "r")
  if ( needsReroll || wantsReroll ) {
    state.statDice = Array.from({ length: 6 }, rollStat); 
    state.statDice.sort((first, second) => second - first); // Sort descending
    if (mode === inputMode) {
      return {nextStep:nextStep, newText:newText, success:true} // Skip to output mode
    }
  }

  if (mode === outputMode) {
    newText = `You rolled the following stat dice: ${state.statDice}\n`
    + `Choose your abilities in order from highest to lowest.\n`
    for (let i=0; i < state.tempCharacter.stats.length; i++) {
      newText += `${i+1}. ${state.tempCharacter.stats[i].name}\n`
    }
    newText += `\nEnter (1-6) with spaces between, q to quit, or r to reroll.\n`
  }
  else if (mode === inputMode) {
    // Split input into numbers, remove duplicates
    let choices = text.split(/\D+/).map(Number).filter(Boolean);
    choices = [...new Set(choices)];
    if (choices.some(num => num < 1 || num > state.tempCharacter.stats.length || choices.length !== state.statDice.length)) {
      newText = "Invalid input. Please enter numbers 1-6 without duplicates.\n";
      return {nextStep:nextStep, newText:newText, success:true}  // Re-prompt
    }
    // The arrays should align so that:
    // * choices[i]-1 is a reference to the character.stats[]
    // * And statDice[i] is the value we wish to assign to character.stats[choices[i]-1]
    choices.forEach((choice, i) => {
      const stat = state.tempCharacter.stats[choice-1]; 
      if (stat) stat.value = state.statDice[i];
    });
    // Finally progress to the next step
    state.statDice = []
    nextStep = "skillsChoice"
  }
  return {nextStep:nextStep, newText:newText, success:true}
}

/**
 * Handles the character skills selection step.
 * @function
 * @param {string} [text] - Player input or AI Dungeon output
 * @param {string} [mode] - Either "input" or "output".
 * @returns {{ nextStep: string, newText: string, success: boolean }}
 */
// TODO: In D&D this plus would be the proficiency/expertise mod, but DNDHash is not programmed like that
// -- In DNDHash each skill has it's own modifier that can be increased with skill points.
// -- So this skill selection gives ${config.skillsPerLevel} aka one levels worth to each chosen skill.
// TODO: Either rework the skill system to use a proficiency/expertise mod, or add config option
function handleStepSkillsChoice(text, mode) {
  let newText = " "
  let nextStep = "skillsChoice"
  if (mode === outputMode) {
    const skills = state.tempCharacter.skills;
    newText = `What skills is your character proficient in?\n`
    + `Chosen skills will gain a +${config.skillsPerLevel} modifier.\n`;
    // Length of the longest skill word
    let longest = 0
    for (let i=0; i < skills.length; i+=2) {
      if (fontLength(skills[i].name) > longest)
        longest = fontLength(skills[i].name);
    }
    // Print columns with adjusted tabs ( 8 being the space length of a tab in AI Dungeon)
    for (let i = 0; i < skills.length; i += 2) {
      const col1 = `${String(i+1).padStart(2, " ")}. ${skills[i].name}`;
      const col2 = skills[i+1] ? `${String(i+2).padStart(2, " ")}. ${skills[i+1].name}` : "";
      // Adjusts for tabs needed, plus one tab between columns
      const nameLength = fontLength(skills[i].name)
      const tabsNeeded = Math.ceil((longest - nameLength) / 4) + 1 // 4 being the tab-length (+1 for column spacing)
      newText += `${col1}${"\t".repeat(tabsNeeded)}${col2}\n`;
    }
    newText += `\nEnter numbers with spaces between, q to quit.\n`;
  }
  else if (mode === inputMode) {
    // Split input into numbers, remove duplicates
    let choices = text.split(/\D+/).map(Number).filter(Boolean);
    choices = [...new Set(choices)];
    if (choices.some(num => num < 1 || num > state.tempCharacter.skills.length)) {
      newText = "Invalid input. Please enter numbers without duplicates.\n";
      return {nextStep:nextStep, newText:newText, success:true}  // Re-prompt
    }
    choices.forEach(num => {
      const skill = state.tempCharacter.skills[num - 1];
      if (skill) skill.modifier += config.skillsPerLevel;
    });
    nextStep = "spellsChoice"
  }
  return {nextStep:nextStep, newText:newText, success:true}
}

/**
 * Handles the character spell selection step.
 * @function
 * @param {string} [text] - Player input or AI Dungeon output
 * @param {string} [mode] - Either "input" or "output".
 * @returns {{ nextStep: string, newText: string, success: boolean }}
 */
function handleStepSpellsChoice(text, mode) {
  let newText = " "
  let nextStep = "spellsChoice"
  if (mode === outputMode) {
    newText = `What spells does your character possess?\n`
    + `\nEnter spell names with semicolon ; between, q to quit.\n`
  }
  else if (mode === inputMode) {
    // Clean and split by semicolon; removes empty entries
    let spells = text.split(";").map(spell => spell.trim()).filter(Boolean);
    spells = [...new Set(spells)]; // Remove duplicates
    state.tempCharacter.spells = spells;
    nextStep = "itemsChoice"
  }
  return {nextStep:nextStep, newText:newText, success:true}
}

/**
 * Handles the character items selection step.
 * @function
 * @param {string} [text] - Player input or AI Dungeon output
 * @param {string} [mode] - Either "input" or "output".
 * @returns {{ nextStep: string, newText: string, success: boolean }}
 */
function handleStepItemsChoice(text, mode) {
  let newText = " "
  let nextStep = "itemsChoice"
  if (mode === outputMode) {
    newText = `What items does your character possess?\n`
    + `\nEnter items separated by semicolons (;). Add quantities with "x#", e.g., "Potion x3; Torch x2".\n`
    + `Type 'q' to quit.\n`;
  }
  else if (mode === inputMode) {
    // Clean and split by semicolon; removes empty entries
    let items = text.split(";").map(i => i.trim()).filter(Boolean);
    items.forEach(itemEntry => {
      // Extract quantity
      const match = itemEntry.match(/^(.*?)\s*x(\d+)$/i);
      let name = itemEntry;
      let qty = 1;
      if (match) {
        name = match[1].trim();
        qty = parseInt(match[2], 10) || 1;
      }
      // Add item (putItemIntoInventory will merge quantities if needed)
      putItemIntoInventory(state.tempCharacter, name, qty);
    });
    nextStep = "finishCreate"
  }
  return {nextStep:nextStep, newText:newText, success:true}
}

/**
 * Finalizes the temporary character (`state.tempCharacter`) and commits it into the game state as a permanent character.
 * @function
 * @param {string} text - Ignored (no input required at this step).
 * @returns {{ nextStep: string, newText: string, success: boolean }}
 */
function handleFinishCreate(text, mode) {
  let newText = " "
  if (mode === outputMode) {
    // Finally commits the tempCharacter into state.characters
    const addedCharacter = addCharacter(state.tempCharacter)
    if (addedCharacter == null) {
      newText = "Error: Character was not created!\n"
    } else {
      newText = `${addedCharacter.name} the ${addedCharacter.className} has been created.\n***********\n`
      newText += showSummary(addedCharacter)
    }
  }
  else if (mode === inputMode) {
    // NO input required on the final creation step thus should not be possible!
    // UNLESS the state was not cleared as it should have been, or set incorrectly
    // OR if this function was called outside the step process handling for some reason
    newText = "Error: Character creation has finsihed!\n"
    state.show = "none"
    state.step = null
  }
  // In this case false for success actually means stop processing steps
  return {nextStep:null, newText:newText, success:false}
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
 * Loads a temporary character from a preset card.
 *
 * Takes a selected preset (from `presetIndexes`) and applies its defined
 * stats, skills, inventory, and spells to `state.tempCharacter`. This
 * allows quick-start character creation using predefined archetypes.
 *
 * Behavior:
 * - Parses the preset JSON into an entity object.
 * - Sets `className` to the preset title.
 * - Copies abilities into `tempCharacter.stats`.
 * - Updates existing skills if found, or creates new ones if missing.
 * - Loads items into inventory via `putItemIntoInventory`.
 * - Assigns the preset’s spell list.
 *
 * Useful for both new-character presets and later character saving/loading.
 *
 * @function
 * @param {Array} presetIndexes - List of available preset cards.
 * @param {number} presetChoice - Index of the chosen preset.
 * @returns {void}
 */
// TODO: Not a biggy, but createCharacterFromPreset should return a created character, not just modify state.tempCharacter, which is a little confusing
function createCharacterFromPreset (presetIndexes, presetChoice) {
  // Convert description into what we need to create the preset.
  const presetCard = presetIndexes[presetChoice]
  const entity = JSON.parse(presetCard.description)

  // Now to convert the entity description into the preset values
  // NOTE: We can use this to save characters later too!
  state.tempCharacter.className = presetCard.title
  state.tempCharacter.stats = []
  entity.abilities.forEach(ability => {
    state.tempCharacter.stats.push({name: ability.name, value: ability.value})
  });
  entity.skills.forEach(skill => {
    const findSkill = state.tempCharacter.skills.find((element) => element.name.toLowerCase() == skill.name.toLowerCase())
    if (findSkill) {
      // NOTE: If we implement character saving and loading we may want to consider fully deifining skills with stat base
      const charSkill = state.tempCharacter.skills.find((element) => element.name.toLowerCase() == skill.name.toLowerCase())
      charSkill.stat = skill.stat ?? "none";
      charSkill.modifier = skill.modifier ?? 0;

    } else { // We need to create the skill from scratch in this case, with it's stat base
      state.tempCharacter.skills.push({name: skill.name, stat:skill.stat, modifier: skill.modifier})
    }
  });
  entity.inventory.forEach(item => {
    putItemIntoInventory(state.tempCharacter, item.name, item.quantity)
  });
  state.tempCharacter.spells = entity.spells
}

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
  return state.characters.find(element => element.name.toLowerCase() == characterName.toLowerCase()) ?? null
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
 * Creates a blank character.
 * @function
 * @param {string} name - The name of the character to create or reset.
 * @returns {object} The newly created or reset character object.
 */
function createCharacter(name) {
  return {
    name: name || "Blank",
    className: "Blank",
    inventory: [],
    spells: [],
    stats: [],
    skills: [],
    experience: 0,
    health: 10,
    skillPoints: 0,
    statPoints: 0
  };
}

/**
* Copies attributes, stats, and inventory from one character to another.
* Removes duplicate entries in inventory, spells, stats, and skills.
* @function
* @param {object} fromCharacter - The source character to copy from.
* @param {object} toCharacter - The target character to copy into.
* @returns {object|null} The updated target character, or undefined if parameters are invalid.
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
    toCharacter.skillPoints = fromCharacter.skillPoints
    toCharacter.statPoints = fromCharacter.statPoints
    return toCharacter
  }
  return null
}

/**
 * Safely adds or updates a character in the state.
 * @function
 * @param {object} character - Character object to add or update.
 * @returns {object|null} The added/updated character, or false on failure.
 */
function addCharacter(character) {
  if (!character || !character.name) return null;

  // Safely create a full character object
  const newCharacter = copyCharacter(character, createCharacter(character.name));
  if (!newCharacter) return null;

  const index = state.characters.findIndex(c => c.name === character.name);
  if (index === -1) { // Add as new character
    state.characters.push(newCharacter);
  } else { // Replace existing character in the array
    state.characters[index] = newCharacter;
  }

  return newCharacter;
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
* Gets the required experience points for the character's next level.
* @function
* @param {number} level - The total current level of the character.
* @returns {number} The XP threshold for the next level
*/
function getExpForLevel(level) {
  // Gives the level progression of: 1=300, 2=1000, 3=2200, 5=7700, 10=53000, 20=406000
  return Math.floor(Math.round((level ** 3) * 50 + (level*300)) / 100)*100;
}

/**
* Determines the current level of a character based on their experience points.
* @function
* @param {number} experience - The total experience points of the character.
* @returns {number} The current level
*/
function getLevel(experience) {
  if (experience < 0) experience = 0
  let level = 1
  while (getExpForLevel(level) <= experience) { level++ }
  return level
}

/**
* Gets the required experience points for the character's next level.
* @function
* @param {number} experience - The total experience points of the character.
* @returns {number} The XP threshold for the next level
*/
function getNextLevelXp(experience) {
  if (experience < 0) experience = 0
  const level = getLevel(experience)
  return getExpForLevel(level)
}

/**
* Adds experience points to all party members and announces level-ups.
* @function
* @param {number} experience - The amount of experience points to add to each party member.
* @returns {string} A message summarizing XP gain and any level-up events.
*/
function addXpToAll(experience) {
  if (experience == 0) return ""
  let leveledUp = `\n[The party has gained ${experience} experience!]`
  state.characters.forEach(character => {
    const haveWord = character.name == "You" ? "have" : "has"
    const oldLevel = getLevel(character.experience)
    character.experience += experience
    const newLevel = getLevel(character.experience)
    if (newLevel > oldLevel) {
      let [skillPointsGained, statPointsGained] = levelupEvent(character, oldLevel, newLevel)
      const skillPointsText = ` And gained +${skillPointsGained} skill points.`
      const statPointsText = statPointsGained > 0 ? ` And gained +${statPointsGained} skill points.` : ``
      levelupEvent(character, oldLevel, newLevel)
      leveledUp += `\n[${character.name} ${haveWord} leveled up to ${newLevel}!${skillPointsText}${statPointsText}]`
    }
  })
  return leveledUp
}

/**
* Adds experience points to one party members and announces level-ups.
* @function
* @param {number} experience - The amount of experience points to add to the party member.
* @returns {string} A message summarizing XP gain and any level-up events.
*/
function addXpToCharacter(experience) {
  const character = getCharacter()
  const haveWord = character.name == "You" ? "have" : "has"

  const oldLevel = getLevel(character.experience)
  character.experience += experience
  const newLevel = getLevel(character.experience)

  let leveledUp = `\n[${character.name} ${haveWord} gained ${experience} experience!]`
  if (newLevel > oldLevel) {
    let [skillPointsGained, statPointsGained] = levelupEvent(character, oldLevel, newLevel)
    const skillPointsText = `And gained +${skillPointsGained} skill points.`
    const statPointsText = statPointsGained > 0 ? `And gained +${statPointsGained} skill points.` : ``
    leveledUp += `\n[${character.name} ${haveWord} leveled up to ${newLevel}!${skillPointsText}${statPointsText}]`
  }
  return leveledUp
}

/**
* Adds skill/stat points on level-ups.
* @function
* @param {character} character - The character leveling up
* @param {number} oldLevel - The previous level they had
* @param {number} newLevel - The new level they reached
*/
function levelupEvent(character, oldLevel, newLevel) {
  character.skillPoints += config.skillsPerLevel*(newLevel-oldLevel)
  const modLevels = Math.floor(newLevel / config.levelsPerASI)-Math.floor(oldLevel / config.levelsPerASI)
  character.statPoints += config.statsPerASI*modLevels
  return [config.skillsPerLevel*(newLevel-oldLevel), config.statsPerASI*modLevels] //Points gained on this event
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
  
  let modifier = 0
  const stat = character.stats.find((element) => element.name.toLowerCase() == "constitution")
  if (stat != null) modifier = getModifier(stat.value)

  const level = getLevel(character.experience)
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
 * Sanitizes AI Dungeon–style text.
 *
 * This function normalizes text input from the engine during the step process flow.
 * It removes system-style markers (`>`), quotes from dialogue, redundant character names,
 * and trailing punctuation so that the result is a clean input string for processing.
 *
 * Behavior:
 * - Case 1: Dialogue (`> John says "Strength 14"`)  
 *   → Strips speaker and quotes, leaving only the inner text.
 * - Case 2: Narration/action (`> You chose Strength`)  
 *   → Removes the `>` marker, character name prefixes, and trailing punctuation.
 * - Case 3: Anything else  
 *   → Trims leading whitespace only.
 *
 * @function
 * @param {string} text - The raw input text from the engine.
 * @returns {string} - The sanitized, cleaned text ready for parsing.
 */
function sanitizeTextAdvanced(text) {
  // Case 1: Dialogue lines like `> John says "Strength 14"`
  // ^\s*>         → starts with ">" (optionally preceded by whitespace)
  // .*says?       → any name/subject, followed by "say" or "says"
  // ".*           → then a literal quote, and some text after it
  if (/^\s*>.*says? ".*/.test(text)) {  
    text = text.replace(/^\s*>.*says? "/, "") // ^\s*>.*says? " → remove everything from the start up to and including `say "` 
    text = text.replace(/"\s*$/, "") // "\s*$ → remove the trailing quote and any spaces at the end
  } 
  // Case 2: Narration/action lines like `> You chose Strength`
  // ^\s*>         → starts with ">" (optionally preceded by whitespace)
  // \s.*          → followed by a space and then any text (narration/action)
  else if (/^\s*>\s.*/.test(text)) {
    text = text.replace(/\s*> /, "") // \s*>  → remove the "> " marker at the start
    // Remove character name prefixes ("You " or "Bob ")
    for (var i = 0; i < info.characters.length; i++) {
      var matchString = info.characters[i] == "" ? "You " : `${info.characters[i]} `
      if (text.startsWith(matchString)) {
        text = text.replace(matchString, "")
        break
      }
    }
    // \.?        → optional period at the end
    // \s*$       → followed by any trailing spaces
    text = text.replace(/\.?\s*$/, "") 
  } 
  // Case 3: Any other line (just trim leading whitespace)
  else {
    text = text.replace(/^\s+/, "") // ^\s+ → remove leading whitespace at start
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
function singularize(word, makeSingle = true) {
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

/**
 * Approximates the visual width of a string in a proportional font.
 *
 * This function assigns a weight to each character based on its typical
 * visual width, helping simulate text alignment in non-monospace environments
 * (like AI Dungeon). Characters are grouped into three width categories:
 * 
 * - large: ~1.5 units (e.g., "M", "W", uppercase letters, "m")
 * - medium: ~1.0 units (most lowercase letters)
 * - small: ~0.5 units (thin characters like "i", "l", spaces)
 * 
 * Characters not explicitly listed in these groups default to medium width.
 *
 * @param {string} string - The text to measure.
 * @returns {number} Approximate total width of the string.
 */
function fontLength(string) {
  const large = "ABCDEFGHJKLMNOPKRSTUVWXYZm"
  const medium = "abcdeghknopqsuvwxyz"
  const small = "Ifijltr "

  let length = 0;
  for (const char of string) {
    if (large.includes(char)) length += 1.5;
    else if (medium.includes(char)) length += 1.0;
    else if (small.includes(char)) length += 0.5;
    else length += 1.0;
  }
  return length;
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

  // Insert card
  const card = { type, title, keys, entry, description };
  insertionIndex = Math.max(0, Math.min(insertionIndex, storyCards.length)); // Clamp insertion index
  storyCards.splice(insertionIndex, 0, card);

  return card;
}

/**
 * Updates an existing story card in the `storyCards` array.
 * - Finds the card by title (first match) and updates only provided properties.
 * - If the card is not found, no changes are made.
 * @function
 * @param {string} title - The title of the story card to update.
 * @param {object} updates - An object containing the fields to update. 
 *                           Allowed keys: title, entry, type, keys, description.
 * @returns {object|null} The updated story card object, or null if no card was found.
 **/
function saveStoryCard(title, updates) {
  const updateCards = getStoryCardListByTitle(title);
  if (updateCards.length < 1) {
    if (!updates.title) updates.title = title;
    return [buildStoryCard(updates)];
  }

  const allowedFields = ["title", "entry", "type", "keys", "description"];
  allowedFields.forEach(field => {
    if (field in updates && updates[field] !== undefined) {
      updateCards[0][field] = updates[field];
    }
  });

  return updateCards[0];
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
* @param {boolean} [exactTitle] Search for exact title matches, or that include listTitle, true by default.
* @returns {array} An array containing all the story cards that match the title string (given above).
**/
function getStoryCardListByTitle(listTitle, exactTitle = true) {
  const normalizedTitle = listTitle.toLowerCase()
  if (exactTitle) {
    return storyCards.filter((element) => element.title.toLowerCase() === normalizedTitle )
  }
  return storyCards.filter((element) => element.title.toLowerCase().includes(normalizedTitle) )
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
* @param {number} [quantity] The quantity of the item attempting to add (default 1)
* @returns {item} Returns the inventory item just added or increased
**/
function putItemIntoInventory(character, itemName, quantity=1)
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
function checkItemCards(itemName, buildCard=config.autoCreateItemCards) {
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
      buildStoryCard(newItem.itemName, "", "Item - Misc - Uncommon", "", JSON.stringify(newItem, null, 2))
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
function printInventory(character, dotPointChar=" ") {
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
/////////////////////////////////////////////////////////////// ///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////// SHOW OUTPUT FUNCTIONS ///////////////////////////////////////////////////

function showNotes() {
  let text = "*** NOTES ***"
  let counter = 1
  state.notes.forEach(function(x) {
    text += `\n${counter++}. ${x}`
  })
  if (state.notes.length == 0) text += "\nThere are no notes!"
  text += "\n**************\n\n"
  return text
}

function showParty() {
  let text = `*** CHARACTERS ***`
  if (state.characters.length > 0) {
    state.characters.forEach(function(character) {
      text += `\n* ${toTitleCase(character.name)} the ${toTitleCase(character.className)}`
    })
  } else {
    text += `\nThe party is empty!`
  }
  text += "\n******************\n\n"
  return text
}

function showSkills(character) {
  const possessiveName = character == null ? null : getPossessiveName(character.name)
  let text = `*** ${possessiveName.toUpperCase()} SKILLS ***\n`

  if (character.skills.length > 0) {
    character.skills.forEach(function(skill) {
      const stat = character.stats.find(stat => stat.name.toLowerCase() == skill.stat.toLowerCase())
      
      var statModifier = stat != null ? getModifier(stat.value): 0
      var totalModifier = skill.modifier + statModifier
      var modifier = skill.modifier

      if (statModifier >= 0) statModifier = `+${statModifier}`
      if (totalModifier >= 0) totalModifier = `+${totalModifier}`
      if (modifier >= 0) modifier = `+${modifier}`

      text += `* ${toTitleCase(skill.name)} ${totalModifier} = ${toTitleCase(skill.stat)} ${statModifier} Proficiency ${modifier}\n`
    })
  } else {
    text += `${character.name} has no skills!\n`
  }
  text += `Unspent Skill Points = ${character.skillPoints}\n`
  text += "******************\n\n"
  return text
}

function showStats(character) {
  const possessiveName = character == null ? null : getPossessiveName(character.name)
  let text = `*** ${possessiveName.toUpperCase()} ABILITIES ***\n`
  if (character.stats.length > 0) {
    character.stats.forEach(function(stat) {
      text += `* ${toTitleCase(stat.name)} ${stat.value}\n`
    })
  } else {
    text += `${character.name} has no abilities!\n`
  }
  text += `Unspent Stat Points = ${character.statPoints}\n`
  text += "******************\n\n"
  return text
}

function showSpells(character) {
  const possessiveName = character == null ? null : getPossessiveName(character.name)
  let text = `*** ${possessiveName.toUpperCase()} SPELLBOOK ***`
  if (character.spells.length > 0) {
    character.spells.forEach(function(x) {
      text += "\n* " + toTitleCase(x)
    })
  } else {
    text += `\n${possessiveName} spellbook is empty!`
  }
  text += "\n******************\n\n"
  return text
}

function showInventory(character) {
  const possessiveName = character == null ? null : getPossessiveName(character.name)
  let text = `*** ${possessiveName.toUpperCase()} INVENTORY ***\n`
  text += printInventory(character, "*")
  text += "******************\n\n"
  return text
}

function showSummary(character) {
  const possessiveName = character == null ? null : getPossessiveName(character.name)
  let text = `*** ${possessiveName.toUpperCase()} BIO ***\n`
  text += `Class: ${character.className}\n`
  text += `Health: ${character.health}/${getHealthMax()}\n`

  text += `Level: ${getLevel(character.experience)}\n`
  text += `Experience: ${character.experience}\n`
  text += `Next level at: ${getNextLevelXp(character.experience)} xp\n\n`
  
  text += `Unspent Skill Points = ${character.skillPoints}\n`
  text += `Unspent Stat Points = ${character.statPoints}\n`
  // text += showStats(character)
  // text += showSkills(character)
  // text += showSpells(character)
  // text += showInventory(character)
  text += `**************\n\n`
  return text
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */