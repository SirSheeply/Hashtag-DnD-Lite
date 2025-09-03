// Based on version "Hashtag DnD v0.7.0" by Raeleus
const version = "Hashtag DnD v0.7.0 by Raeleus / Lite v0.1.0 Edition by SirSheeply"

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
const diceRegex = /^(\d+)?d\d+([+-]\d+)?$/i;
const argumentPattern = /("[^"\\]*(?:\\[\S\s][^"\\]*)*"|'[^'\\]*(?:\\[\S\s][^'\\]*)*'|\/[^\/\\]*(?:\\[\S\s][^\/\\]*)*\/[gimy]*(?=\s|$)|(?:\\\s|\S)+)/g
const advantageNames = ["normal", "advantage", "disadvantage"]
const baseHealth = 10

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
//TODO: Shouldn't this be in the state?
const config = {
  autoCreateItemCards: false, // Automaticall creates item cards when put into the inventory
  defaultDifficulty: 10,      // Difficulty of checks when not specified in commands
  autoXp: 100,                // XP a character gains after a successful check
  showRolls: false,           // Enables/Disables the dice result of rolls being displayed for #try, #cast
  critFailProtect: 20,        // Rerolls critical fails X checks after last critical fail
  xpShare: false,             // Enables/disables auto xp sharing among party characters
  skillsPerLevel: 1,          // Skill points awarded per levelup event
  levelsPerASI: 4,            // How many levels award an ASI
  statsPerASI: 2,             // Stat points awarded per ASI event
  healthPerLvl: 6,            // Max Health awarded per levelup event

  strReplacer: "strength",    // Replaces strength for hit and injury calculations.
  dexReplacer: "dexterity",   // Replaces dexterity for hit and injury calculations.
  conReplacer: "constitution",// Replaces constitution for health calculations.
  evasionStat: "dexterity"    // Default stat to be used for evasion, if no skill matches evade command synonyms.
}

/**
 * Loads and applies configuration settings from the "#DND Lite Config" story card.
 * - Validates types before applying.
 * - Always saves the current config back to the story card.
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
      throw new Error("[Bad config file, please delete or fix!]");
    }
  }
  // Refresh the config story card, or build one if none exists.
  saveStoryCard("#DND Lite Config", {
    entry: JSON.stringify(config, null, 2),
    type: "CONFIG",
    keys: ""
  });
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

/*
<><> Item Story Cards <><>
* Every item should be an "Item" type story card, and must include a category.
* Format each item story card as follows:
  -- Type: {{ Item - Category }}
  -- Title: The name of the item.
  -- Entry: A brief description to help the AI understand what this item represents.
  -- Keywords: For unique items only. Avoid common words or phrases!
  -- Description: Use JSON to define item rarity, quantity, and name again.
*/

const defaultItemTemplate = {
    itemName: "item",     // [string] Non-plural name of item
    rarity: 1.0,          // [float] Rarity used to determine loot chance, and item worth.
    quantity: 1,          // [int] How much of the item is present (or Inventory value)
    damageType: "none",   // [string] Type of damage the item inflicts or resists
    level: 0              // [int] Power/Quality/Effectiveness level of the item
    // TODO: could store category
}

const defaultDamageTable = [
  {"injury": "light injury",    "rarity": 1.0,  "damage":"1d4"},
  {"injury": "medium injury",   "rarity": 0.5,  "damage":"1d6+2"},
  {"injury": "deep injury",     "rarity": 0.25, "damage":"1d8+3"},
  {"injury": "heavy injury",    "rarity": 0.12, "damage":"1d10+4"},
  {"injury": "critical injury", "rarity": 0.06, "damage":"1d12+5"},
  {"injury": "mortal injury",   "rarity": 0.01, "damage":"1d20+6"}
]

// TODO: Create a character template up here

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

// Helpers for type checks
const isNumber = (t) => !isNaN(t);
const isDice = (t) => diceRegex.test(t);
const isRoll = (t) => advantageNames.some(k => k.toLowerCase() === t.toLowerCase());
const isDC = (t) => Object.keys(difficultyScale).some(k => k.toLowerCase() === t.toLowerCase());
const isBoolean = (t) => typeof t === "boolean" || (typeof t === "string" && ["true", "false"].includes(t.toLowerCase()));
// A number is easy to identify, but impossible to custom type by value.
// String values could correlate to custom types, but we have to be careful.
// And Custom types must be unique string formats, or keywords; that don't overlap with general nouns.
// A string could be a character, item, damage type, or general text, but could never tell 100% which.
const typeCheckers = [
  { type: "number", fn: isNumber },
  { type: "boolean", fn: isBoolean },
  { type: "dc", fn: isDC },
  { type: "dice", fn: isDice },
  { type: "roll", fn: isRoll }
];

/**
 * Infers the type of a given variable by running it through a list of type-checking functions.
 * @param {string} variable - The variable to evaluate. Always provided as a string.
 * @returns {string} - The inferred type (e.g., "number", "boolean", "dice", "roll", "dc", etc.).
 */
function guessType(variable) {
  for (const { type, fn } of typeCheckers) {
    if (fn(variable)) return type;
  }
  return "string";
}

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
* -- Watch out for passing in commands with a command keyword if you only want the arguments
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
 * Parses and validates arguments for a command, matching them against expected types
 * and optionality, and returns a structured array of arguments.
 *
 * This function takes a raw command string, extracts arguments, validates their count,
 * infers their types, and assigns them to their appropriate positions based on the
 * provided `types` and `optionals` arrays. Missing optional arguments are returned
 * as `null`.
 * 
 * WARNING: Multiple optionals of the same type between required fields cannot be handled.
 * WARNING: This assumes that arguments are be passed in the right order, even after optional omissions.
 *
 * @param {string} command - The santized command string containing arguments (including the command keyword).
 * @param {string[]} types - An array of expected argument types, in positional order.
 * @param {boolean[]} optionals - An array of booleans indicating which arguments are optional (Must be the same length as `types`).
 * @returns {Array<string|null>} - An array of arguments aligned with `types`. Missing optional arguments are `null`.
 */
function argumentParser(command, types, optionals) {
  if (types.length !== optionals.length)
    throw new Error("Critical Error: doFunction types not equal to optionals!");

  // Tokenize the command without command keyword
  const tokens = getArguments(command, false);

  if (tokens.length > types.length)
    throw new Error("Error: Too many arguments for this command!");
  if (tokens.length < optionals.filter(opt => !opt).length)
    throw new Error("Error: Not enough required arguments for this command!");

  // Exact arguments pass, no need to do anything
  if (tokens.length === types.length) return tokens;

  // Loop through the tokens and try to guess what types they are
  // We'll try our best to match what we can, making sure that required arguments get priority
  let guesses = tokens.map(tok => ({ arg: tok, type: guessType(tok), parsed: null }));
  guesses = matchArguments(guesses, types, optionals);

  // If we have any guesses left over, that means invalid types were provided in the command
  if (guesses.some(g => g.parsed == null))
    throw new Error("Error: Invalid arguments provided for this command!");

  // Return the guesses as an array, with null for omitted optionals
  return types.map((_, i) => guesses.find(g => g.parsed === i)?.arg ?? null);
}

/**
 * Match guess tokens to expected argument types in-order, reassigning
 * earlier optional matches when a required slot is missing.
 * @param {Array<{arg:string,type:string,parsed:null|number}>} guesses
 * @param {Array<string>} types
 * @param {Array<boolean>} optionals  // true = optional, false = required
 * @returns {Array} mutated guesses (with .parsed set to index or left null)
 * @throws {Error} if a required argument cannot be satisfied
 */
function matchArguments(guesses, types, optionals) {
  const nTypes = types.length;
  // assignedGuessAtIndex[i] -> guess index assigned to types[i], or null
  const assignedGuessAtIndex = new Array(nTypes).fill(null);
  // Build queues of unused guess indices by guess.type (preserve token order)
  const unusedByType = {};
  guesses.forEach((g, gi) => {
    if (g.parsed == null) {
      (unusedByType[g.type] = unusedByType[g.type] || []).push(gi);
    }
  });
  for (let i = 0; i < nTypes; i++) {
    const wantedType = types[i];
    const queue = unusedByType[wantedType];
    // Fast path: take first unused guess of the required type
    if (queue && queue.length > 0) {
      const guessIndex = queue.shift();
      guesses[guessIndex].parsed = i;
      assignedGuessAtIndex[i] = guessIndex;
      continue;
    }
    // No direct match. If this is required, try to reassign an earlier optional
    if (!optionals[i]) {
      let reassigned = false;
      for (let li = i - 1; li >= 0 && !reassigned; li--) {
        // only consider earlier *optional* slots of the same type
        if (optionals[li] && types[li] === wantedType && assignedGuessAtIndex[li] != null) {
          const guessIndex = assignedGuessAtIndex[li];  // index of the guess assigned to li
          assignedGuessAtIndex[li] = null;              // free the earlier optional
          assignedGuessAtIndex[i] = guessIndex;         // move the guess to current required index
          guesses[guessIndex].parsed = i;               // update parsed
          reassigned = true;
        }
      }
      if (!reassigned) {
        throw new Error("Error: Not enough required arguments provided for this command!");
      }
    }
    // If this slot is optional and unmatched, we just leave it null for now
  }
  return guesses;
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
 * @param {number|null} [modifier=0] Additional/Initial modifier value.
 * @param {boolean} [protect=false] If to protect from crits on this roll.
 * @returns {} die1: number, die2: number, score: number, modifier: number
 */
function performRoll(dice, rollType, character=null, checkSkill=null, checkAbility=null, modifier=0, protect=true) {
  // TODO: Pull any plus or minus values off the dice, and put them in the modifier bucket
  let die1 = calculateRoll(dice)
  let die2 = calculateRoll(dice)

  // Critical Fail Protection
  if (protect && (dice == "d20" || dice == "1d20")) {
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
    state.step = null
    throw new Error("[Process has been aborted!]\n");
  }

  const handler = stepHandlers[state.step];
  if (!handler) {
    state.step = null
    throw new Error(`Unknown step: ${state.step}\n`);
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
// TODO: Make sure this handles stat replacers in config
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
// TODO: Make sure this handles stat replacers in config
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
    injuries: [],
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
    toCharacter.injuries = [...new Set(fromCharacter.injuries)]
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
/////////////////////////////////////////////////////////////// ///////////////////////////////////////////////////////////////
//////////////////////////////////////////////////// INJURY / DAMAGE SYSTEM ///////////////////////////////////////////////////

/**
 * Rolls for an injury based on a given damage type or a default damage table.
 * - Attempts to fetch a story card injury table matching the provided `damageType`.
 * - If no valid table is found or it is empty, it falls back to the `defaultDamageTable`.
 * - It then performs a random roll to select a single injury based on each injury's `rarity` value.
 * - Calculates its damage (numeric or dice expression), applies any `extraDamage`, and returns the resulting injury.
 * @function
 * @param {string} [damageType] - The thematic damage type to search for in story cards (e.g., "fire", "poison").
 * @param {number} [extraDamage=0] - Additional flat damage to add to the selected injury.
 * @param {number} [extraChance=0] - Increases or reduces chance to roll to an rarer injury, should be % value (1 = 1%)
 * @returns {Object|null} Returns an injury object with `injury` and `damage` fields, or `null` if no injury is selected.
 */
function rollInjury(damageType, extraDamage=0, extraChance=0) {
  extraChance = extraChance/100 // Make percentage %
  // Attempt to fill the damage table with injuries from a thematic damage type first
  let damageTable = []
  if (damageType) {
    let damageTableCards = getStoryCardListByType("damage type - " + damageType, true)[0]
    damageTable = damageTableCards ? JSON.parse(damageTableCards.description) : [];
  }
  // Fallback in case the player provides no damage type, or the provided table is empty
  if (damageTable.length < 1) {
    damageTable = defaultDamageTable
  }

  // Time to roll the ~Injury!
  let roll = getRandomFloat(0, 1);
  let bias = 1 - Math.exp(-extraChance / 50); 
  roll = roll * (1 - bias);
  const possibleInjuries = damageTable.filter(injury => roll <= injury.rarity);
  if (possibleInjuries.length > 0) {
    const randomInjury = possibleInjuries.reduce((best, current) => current.rarity < best.rarity ? current : best);
    if (isNaN(randomInjury.damage)) {
      randomInjury.damage = calculateRoll(formatRoll(randomInjury.damage))
    } else {
      randomInjury.damage = parseInt(randomInjury.damage)
    }
    randomInjury.damage += extraDamage
    return randomInjury
  }

  return null
}

/**
 * Adds a new injury to a character. If an injury with the same name already exists,
 * appends a number to make it unique (e.g., "burn", "burn1", "burn2").
 * @function
 * @param {Object} character - The character object.
 * @param {string} injury - The name/description of the injury.
 * @param {number} damage - The initial damage value for the injury (must be > 0).
 * @returns {void}
 */
function addInjury(character, injury, damage) {
  if (!character || !injury || damage <= 0) return;

  // Collect existing injury names for this character
  const existingNames = character.injuries.map(i => i.injury);
  // Determine unique injury name
  let uniqueInjury = injury;
  if (existingNames.includes(uniqueInjury)) {
    let counter = 1;
    while (existingNames.includes(`${injury}${counter}`)) {
      counter++;
    }
    uniqueInjury = `${injury} ${counter}`;
  }

  // Add the injury to the character
  character.injuries.push({ injury: uniqueInjury, damage:damage });
}

/**
 * Removes a specific injury from a character.
 * @function
 * @param {Object} character - The character object.
 * @param {string} injury - The name of the injury to remove.
 * @returns {void}
 */
function removeInjury(character, injury) {
  if (!character) return;
  injuryIndex = character.injuries.findIndex(existing => (existing.injury == injury))
  if (injuryIndex >= 0)
    character.injuries.splice(injuryIndex, 1)
}

/**
 * Updates the damage value of a character's injury.
 * Removes the injury if damage is 0 or less.
 * @function
 * @param {Object} character - The character object.
 * @param {string} injury - The name of the injury to update.
 * @param {number} damage - The updated damage value.
 * @returns {void}
 */
function updateInjury(character, injury, damage) {
  if (!character) return;
  injuryIndex = character.injuries.findIndex(existing => (existing.injury == injury))
  if (injuryIndex >= 0) {
    character.injuries[injuryIndex].injury = injury
    character.injuries[injuryIndex].damage = damage
    if (damage <= 0) {
      removeInjury(character, injury)
    }
  }
}

/**
 * Heals a specified injury by a given amount.
 * Removes the injury if damage reaches 0 or less.
 * @function
 * @param {Object} character - The character object.
 * @param {string} injury - The name of the injury to heal.
 * @param {number} amount - The amount of damage to heal.
 * @returns {number|undefined} Remaining damage of the injury, or 0 if fully healed.
 */
function healInjury(character, injury, amount) {
  if (!character) return;
  injuryIndex = character.injuries.findIndex(existing => (existing.injury == injury))
  if (injuryIndex >= 0) {
    character.injuries[injuryIndex].damage -= amount
    if (character.injuries[injuryIndex].damage <= 0) {
      removeInjury(character, injury)
      return 0 // 0 no damage remaining
    }
  }
  return character.injuries[injuryIndex].damage // remaining damage
}

/**
 * Applies daily injury recovery to all injuries based on Constitution.
 * Removes fully healed injuries.
 * @function
 * @param {Object} character - The character object.
 * @param {number} [healingFactor=1] - Multiplier for recovery rate (default is 1).
 * @returns {Array<Object>} List of healed injuries that were removed.
 */
function recoverInjuries(character, healingFactor=1) {
  let modifier = 1
  const stat = character.stats.find((element) => element.name.toLowerCase() == config.conReplacer)
  if (stat != null) modifier += getModifier(stat.value)
  character.injuries.forEach(injury => injury.damage -= modifier*healingFactor)
  const healed = character.injuries.filter(injury => injury.damage <= 0)
  character.injuries = character.injuries.filter(injury => injury.damage > 0)
  return healed
}

/**
 * Calculates the recovery time in days for a given damage value.
 * @function
 * @param {Object} character - The character object.
 * @param {number} damage - The amount of injury damage.
 * @returns {number} Number of days required for full recovery.
 */
function recoveryTime(character, damage) {
  let modifier = 1
  const stat = character.stats.find((element) => element.name.toLowerCase() == config.conReplacer)
  if (stat != null) modifier += getModifier(stat.value)
  return Math.ceil(damage / modifier)
}

/**
 * Returns a formatted list of a character's injuries and estimated recovery times.
 * @function
 * @param {Object} character - The character object.
 * @returns {string} A formatted string of injuries or a message stating no injuries.
 */
function printInjuries(character) {
  text = ""
  if (character.injuries.length > 0) {
    character.injuries.forEach(function(injury) {
      const recoverTime = recoveryTime(character, injury.damage)
      text += `* ${toTitleCase(injury.injury)} [${injury.damage}p - ${recoverTime} recovery days]\n`
    })
  } else {
    const hasWord = character.name.toLowerCase() == "you" ? "have" : "has"
    text += `${character.name} ${hasWord} no injuries!\n`
  }
  return text
}

/**
 * Calculates a character's current health by subtracting total injury damage from max health.
 * @function
 * @param {Object} character - The character object.
 * @returns {number} The character's current health.
 */
function getHealth(character) {
  const maxHealth = getHealthMax(character)
  let injuries = 0
  character.injuries.forEach(injury => injuries += injury.damage)
  return maxHealth - injuries
}

/**
 * Calculates the maximum health for a character based on Constitution modifier and level.
 * Base health is 10 + level * (6 + Constitution modifier).
 * @function
 * @param {Object} character - The character object.
 * @param {string} character.name - The character's name.
 * @param {number} character.experience - The character's current XP.
 * @param {Array<{name: string, value: number}>} character.stats - The character's stats array.
 * @returns {number} The calculated maximum health for the character.
 */
function getHealthMax(character) {
  let modifier = 0
  const stat = character.stats.find((element) => element.name.toLowerCase() == config.conReplacer)
  if (stat != null) modifier = getModifier(stat.value)

  const level = getLevel(character.experience)
  return baseHealth + level * (config.healthPerLvl + modifier)
}

/**
 * Calculates the hit modifier for an attack roll.
 * The modifier is based on either a matching skill's modifier (if found),
 * or the sum of the attacker's Strength and Dexterity modifiers, plus any weapon modifier.
 *
 * @function
 * @param {Object} attacker - The character making the attack. Expected to have `skills` and stats.
 * @param {number} weaponMod - The modifier from the weapon being used.
 * @param {string} [skillName=""] - Optional skill name (or partial name) to search for in the attacker's skills.
 * @returns {number} The total hit modifier for the attack.
 */
function calculateHitMod(attacker, weaponMod, skillName="") {
  let dex = getStatModifier(attacker, config.dexReplacer)
  let str = getStatModifier(attacker, config.strReplacer)
  let attackSkill = attacker.skills.find(element => element.name.toLowerCase().includes(skillName))
  return (attackSkill ? attackSkill.modifier : dex + str) + weaponMod
}

/**
 * Calculates the hit modifier for an attack roll.
 * The modifier is based on either a matching skill's modifier (if found),
 * or the sum of the attacker's Strength and Dexterity modifiers, plus any weapon modifier.
 *
 * @function
 * @param {Object} attacker - The character making the attack. Expected to have `skills` and stats.
 * @param {number} weaponMod - The modifier from the weapon being used.
 * @param {string} [skillName=""] - Optional skill name (or partial name) to search for in the attacker's skills.
 * @returns {number} The total hit modifier for the attack.
 */
function calculateEvadeMod(defender, skillName="") {
  let evadeSkill = defender.skills.find(element => element.name.toLowerCase().includes(skillName))
  let dex = getStatModifier(defender, config.evasionStat)
  return (evadeSkill ? evadeSkill.modifier : dex)
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
 * Automatically awards experience points (XP) based on a roll result and challenge difficulty.
 * @function
 * @param {Object} character - The character object receiving XP. Must have a `name` property.
 * @param {boolean} rollResult - Indicates whether the action or roll was successful.
 * @param {number} difficulty - The difficulty rating of the action or challenge (1–20).
 * @returns {string|*} Returns the result of XP assignment or an empty string if no XP was awarded.
 */
function addAutoExp(character, rollResult, difficulty) {
  if (rollResult && hasCharacter(character.name)) {
    const exp = Math.floor(config.autoXp * clamp(difficulty, 1, 20) / 20)
    return (config.xpShare ? addXpToAll(exp) : addXpToCharacter(character, exp))
  }
  return ""
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
function addXpToCharacter(character, experience) {
  if (experience == 0) return ""
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
* Calculates the ability modifier for a given stat value.
* Modifier is determined by (statValue - 10) / 2, rounded down.
* @function
* @param {number} statValue - The raw ability score.
* @returns {number} The calculated ability modifier.
*/
function getModifier(statValue) {
  return Math.floor((statValue - 10) / 2)
}

/**
* Calculates the ability modifier for a given stat name and character.
* Modifier is determined by (statValue - 10) / 2, rounded down.
* @function
* @param {object} character - The raw ability score.
* @param {number} statName - The raw ability score.
* @returns {number} The calculated ability modifier.
*/
function getStatModifier(character, statName) {
  const stat = character.stats.find(s => s.name.toLowerCase() == statName.toLowerCase())
  const statValue = stat ? stat.value : 10
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
      const itemQty = item.quantity > 1 ? `${item.quantity}x ` : ""
      const itemLevel = item.level > 0 ? `+${item.level}` : item.level < 0 ? item.level : ""
      const itemDamage = item.damageType != defaultItemTemplate.damageType ? ` (${item.damageType})` : ""
      text += `${dotPointChar} ${itemQty}${toTitleCase(item.itemName)}${itemLevel}${itemDamage}\n`
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

/**
 * Generates a formatted list of player notes.
 * Displays all notes stored in `state.notes` with numbering, or a message if no notes exist.
 * @returns {string} A formatted string of all notes, or a message that there are no notes.
 */
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

/**
 * Displays all characters in the player's party.
 * Lists each character's name and class in a formatted block. If no characters exist, 
 * it shows a message indicating the party is empty.
 * @returns {string} A formatted string of all party members or an empty party message.
 */
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

/**
 * Displays a character's skills with modifiers.
 * Shows each skill, its total modifier, base stat modifier, and proficiency bonus.
 * If the character has no skills, it displays a message instead.
 * @param {Object} character - The character object to display skills for.
 * @returns {string} A formatted string listing all skills and their modifiers.
 */
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

/**
 * Displays a character's ability stats.
 * Lists all stats with their values. If the character has no stats, shows a message.
 * @param {Object} character - The character object to display stats for.
 * @returns {string} A formatted string of all stats and values.
 */
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

/**
 * Displays a character's spells.
 * Lists all spells in the character's spellbook. If there are no spells, shows a message.
 * @param {Object} character - The character object to display spells for.
 * @returns {string} A formatted string of all spells or a message for an empty spellbook.
 */
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

/**
 * Displays a character's inventory.
 * Uses `printInventory` to display all items. Always returns a formatted block.
 * @param {Object} character - The character object to display inventory for.
 * @returns {string} A formatted string of inventory items.
 */
function showInventory(character) {
  const possessiveName = character == null ? null : getPossessiveName(character.name)
  let text = `*** ${possessiveName.toUpperCase()} INVENTORY ***\n`
  text += printInventory(character, "*")
  text += "******************\n\n"
  return text
}

/**
 * Displays a character's injuries.
 * @param {Object} character - The character object to display stats for.
 * @returns {string} A formatted string of all stats and values.
 */
function showInjuries(character) {
  const possessiveName = character == null ? null : getPossessiveName(character.name)
  let text = `*** ${possessiveName.toUpperCase()} INJURIES ***\n`
  text += `Health: ${getHealth(character)}/${getHealthMax(character)}\n`
  text += printInjuries(character)
  text += "******************\n\n"
  return text
}

/**
 * Displays a summary of a character's key information.
 * Shows the character's class, health, level, experience, and unspent points in a formatted "bio" block.
 * @param {Object} character - The character object to summarize.
 * @returns {string} A formatted string summarizing the character's stats and progress.
 */
function showSummary(character) {
  const possessiveName = character == null ? null : getPossessiveName(character.name)
  let text = `*** ${possessiveName.toUpperCase()} BIO ***\n`
  text += `Class: ${character.className}\n\n`

  text += `Health: ${getHealth(character)}/${getHealthMax(character)}\n`
  text += printInjuries(character)+"\n"

  text += `Level: ${getLevel(character.experience)}\n`
  text += `Experience: ${character.experience}\n`
  text += `Next level at: ${getNextLevelXp(character.experience)} xp\n\n`
  
  text += `Unspent Skill Points = ${character.skillPoints}\n`
  text += `Unspent Stat Points = ${character.statPoints}\n`
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