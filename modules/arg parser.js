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

// EXISTING CODE ABOVE --- --- --- --- --- --- --- --- --- --- --- --- --- NEW CODE BELOW

const diceRegex = /^(\d+)?d\d+([+-]\d+)?$/i;

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
 * @param {string} command - The raw command string containing arguments (including the command keyword).
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

// TESTING BELOW --- --- --- --- --- --- --- --- --- --- --- --- ---

// target, weapon, dc, advantage/disadvantage
const types = ["string", "string", "dc", "roll"];
const optionals = [false, true, true, true];

console.log(argumentParser('attack goblin sword 15 advantage', types, optionals));
// -> ["goblin", "sword", 15, "advantage"]

console.log(argumentParser('attack goblin sword advantage', types, optionals));
// -> ["goblin", "sword", null, "advantage"]

console.log(argumentParser('attack goblin advantage', types, optionals));
// -> ["goblin", null, null, "advantage"]

console.log(argumentParser('attack goblin hard', types, optionals));
// -> ["goblin", null, "hard", null]

// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---

function matchArgumentsOLD(guesses, types, optionals) {
  // We loop through types and try to match each one to a guess in order (order is important)
  for (let index = 0; index < types.length; index++) {
    // Take a type, look for the first guess that matches it, that has not been used already
    let match = guesses.find(g => g.type == types[index] && g.parsed == null)
    if (match) {
      match.parsed = index // Make a note that this guess has been used
    }
    // If not matched it means that (A - we assigned the value to an earlier optional) or (B - this was optional and omitted) or (C - command is invalid)
    if (!match && optionals[index] == false) { // This was a required argument
      // Check if we assigned the last matching optional
      const reassigned = false
      for (let li = index-1; li >= 0 && !reassigned; li--) { // Loops backward through types from the index-1
        // If lastIndex was optional and matches the type we're checking
        if (optionals[li] == true && types[li] == types[index]) {
          // Re-assign
          match = guesses.find(g => g.parsed == li) // Find the guess we assigned lastIndex to
          match.parsed == index // Change lastIndex guess to the index we're checking
          reassigned = true // Stop here
        }
      }
      // Now if reassigned is still false, then we know it's case C - command is invalid
      if (!reassigned) throw new Error("Error: Not enough required arguments provided for this command!")
    }
    // Else this is either Case A or case B
    // But we won't be able to tell yet, so we leave it for now
  }
  return guesses
}