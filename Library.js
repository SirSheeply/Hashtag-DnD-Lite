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
/////////////////////////////////////////////// GENERAL CASE LIBRARY FUNCTIONS ////////////////////////////////////////////////

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomFloat(min, max) {
  return Math.random() * (max - min + 1) + min;
}

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

const argumentPattern = /("[^"\\]*(?:\\[\S\s][^"\\]*)*"|'[^'\\]*(?:\\[\S\s][^'\\]*)*'|\/[^\/\\]*(?:\\[\S\s][^\/\\]*)*\/[gimy]*(?=\s|$)|(?:\\\s|\S)+)/g

/**
 * Returns the command keyword in a command string
 * -- Assumes we have removed the '#' from the command keyword
 * @param {string} [command] A command string with a command keyword
 * @returns {array} Returns the command keyword in the command string
*/
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
*/
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
*/
function getArgument(command, index) {
  var args = getArguments(command)
  index++
  if (index >= args.length) return null
  return args[index]
}

/**
 * Returns argument at the index + all text after
 * -- I have no idea how this function works?
 * -- Does it matter if the command keyword is included?
 * -- I can see quotes treated as one argument.
 * -- Do quotes impact the 'remainder' if another quoted term comes after the index?
 * @function
 * @param {string} [command] A command string
 * @param {number} [index] Index of the argument
 * @returns {string} Argument at index in the command + all text after
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

function searchArgument(command, pattern, limit) {
  var index = searchArgumentIndex(command, pattern)
  if (index == -1 || limit != null && index > limit) return null
  return getArgument(command, index)
}

function searchArgumentIndex(command, pattern) {
  var args = getArguments(command)
  if (args.length <= 1) return -1
  args.splice(0, 1)

  const search = (element) => pattern.test(element)
  var index = args.findIndex(search)
  if (index != -1) return index
  return -1
}

function arrayToOrPattern(array) {
  var pattern = "^"
  array.forEach(element => {
    pattern += `(${element})|`
  })
  pattern += pattern.substring(0, pattern.length - 1)
  pattern += "$"
  return new RegExp(pattern, "gi")
}

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

function getDice(rolltext) {
  var matches = rolltext.match(/\d+(?=d)/)
  if (matches != null) {
    return parseInt(matches[0])
  }
  return 1
}

function getSides(rolltext) {
  var matches = rolltext.match(/(?<=d)\d+/)
  if (matches != null) {
    return parseInt(matches[0])
  }

  return 20
}

function getAddition(rolltext) {
  var matches = rolltext.match(/(\+|-)\s*\d+/)
  if (matches != null) {
    return parseInt(matches[0].replaceAll(/\s*/g, ""))
  }

  return 0
}

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
/////////////////////////////////////////////////////// ENCOUNTER SYSTEM //////////////////////////////////////////////////////

function createEncounter(listName) {
  // Defualt Encounter
  var encounter = {
    text: "It's just a plesent day! Nothing happens.",
    cr: 1
  }
  var multiplier = 1

  if (listName == null) {
    listName = "funny"
  } else {
    listName = listName.toLowerCase()
  }

  if (!isNaN(listName)) {
    listName = parseInt(listName)
    encounter.cr = listName
    if (listName <= 0) {
      listName = "funny"
      if (encounter.cr == null) encounter.cr = 1
      multiplier = 1
    } else if (listName <= 4) {
      listName = "easy"
      if (encounter.cr == null) encounter.cr = 1
      multiplier = 1 + (encounter.cr - 1) / 10
    } else if (listName <= 8)  {
      listName = "medium"
      if (encounter.cr == null) encounter.cr = 5
      multiplier = 1 + (encounter.cr - 5) / 10
    } else if (listName <= 12) {
      listName = "hard"
      if (encounter.cr == null) encounter.cr = 9
      multiplier = 1 + (encounter.cr - 9) / 10
    } else if (listName <= 16) {
      listName = "boss"
      if (encounter.cr == null) encounter.cr = 13
      multiplier = 1 + (encounter.cr - 13) / 10
    } else {
      listName = "god"
      if (encounter.cr == null) encounter.cr = 17
      multiplier = 1 + (encounter.cr - 17) / 10
    }
  }

  // ~2300 lines of hard-coded encounters! That's dedication (I put it all in "mega switch.js")
  // The rework here is to have all the encounters inside story cards, from which we can pull.
  // This means players can create custom encounters, and we're not limited to X amount.

  // Get a list of all the encounter cards with the listname type i.e. "encounter - funny"
  const encounterIndexes = getStoryCardListByType("encounter - "+listName, true)
  if (encounterIndexes.length <= 0) {
    // Error no encounter cards for this case!
    return encounter // Return default enconuter
  }

  //Pick a random encounter from the cards
  const randomIndex = getRandomInteger(0, encounterIndexes.length-1)
  const randomEncounter = encounterIndexes[randomIndex]
  encounter.text = randomEncounter.entry

  //-----

  var characterName = toTitleCase(state.characters[getRandomInteger(0, state.characters.length-1)].name)
  var characterNameAdjustedCase = characterName == "You" ? "you" : characterName
  var possessiveName = getPossessiveName(characterName)
  encounter.text = encounter.text.replaceAll("Character", characterName)
  encounter.text = encounter.text.replaceAll("character", characterNameAdjustedCase)
  encounter.text = encounter.text.replaceAll("character's", possessiveName)
  encounter.text = encounter.text.replaceAll("Character's", toTitleCase(possessiveName))

  return encounter
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////// CHARACTER SYSTEM & MANIPULATION ///////////////////////////////////////////////

const levelSplits = [0, 300, 900, 2700, 6500, 14000, 23000, 34000, 48000, 64000, 85000, 100000, 120000, 140000, 165000, 195000, 225000, 265000, 305000, 355000]

function getCharacter(characterName, allowFallback = true) {
  if (characterName == null && allowFallback) characterName = state.characterName
  if (characterName == null) return null
  return state.characters.find(element => element.name.toLowerCase() == characterName.toLowerCase())
}

function hasCharacter(characterName) {
  return getCharacter(characterName) != null
}

function createCharacter(name) {
  var existingCharacter = getCharacter(name)
  if (existingCharacter != null) {
    existingCharacter.name = name
    existingCharacter.className = "adventurer"
    existingCharacter.summary = "An auto generated character. Use #create to create this character"
    existingCharacter.inventory = []
    existingCharacter.spells = []
    existingCharacter.stats = []
    existingCharacter.spellStat = null
    existingCharacter.meleeStat = null
    existingCharacter.rangedStat = null
    existingCharacter.skills = []
    existingCharacter.experience = 0
    existingCharacter.health = 10
    existingCharacter.ac = 10
    return existingCharacter
  }

  var character = {
    name: name,
    className: "adventurer",
    summary: "An auto generated character. Use #create to create this character",
    inventory: [],
    spells: [],
    stats: [],
    spellStat: null,
    meleeStat: null,
    rangedStat: null,
    skills: [],
    experience: 0,
    health: 10,
    ac: 10
  }
  state.characters.push(character)
  return character
}

function copyCharacter(fromCharacter, toCharacter) {
  if (toCharacter != null && fromCharacter != null) {
    toCharacter.className = fromCharacter.className
    toCharacter.summary = fromCharacter.summary
    toCharacter.inventory = [...new Set(fromCharacter.inventory)]
    toCharacter.spells = [...new Set(fromCharacter.spells)]
    toCharacter.stats = [...new Set(fromCharacter.stats)]
    toCharacter.spellStat = fromCharacter.spellStat
    toCharacter.meleeStat = fromCharacter.meleeStat
    toCharacter.rangedStat = fromCharacter.rangedStat
    toCharacter.skills = [...new Set(fromCharacter.skills)]
    toCharacter.experience = fromCharacter.experience
    toCharacter.health = fromCharacter.health
    toCharacter.ac = fromCharacter.ac
    return toCharacter
  }
}

function deleteCharacter(name) {
  var index = state.characters.findIndex((element) => element.name == name)
  state.characters.splice(index, 1)
}

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

function getLevel(experience) {
  if (experience < 0) experience = 0
  
  var level
  for (level = 0; level < levelSplits.length; level++) {
    if (experience < levelSplits[level]) break
  }
  return level
}

function getNextLevelXp(experience) {
  if (experience < 0) experience = 0
  
  var level
  for (level = 0; level < levelSplits.length; level++) {
    if (experience < levelSplits[level]) return levelSplits[level]
  }
  return -1
}

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

function getHealthMax(character) {
  if (character == null) character = getCharacter() // Does this work without a name argument?
  
  var modifier = 0
  var stat = character.stats.find((element) => element.name.toLowerCase() == "constitution")
  if (stat != null) modifier = getModifier(stat.value)

  var level = getLevel(character.experience)
  return 10 + level * (6 + modifier)
}

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

function compareWithoutPlural(searchForThis, searchInThis, exactMatch=true) {
  if (exactMatch) {
    return singularize(searchInThis.toLowerCase()) === singularize(searchForThis.toLowerCase())
  }
  return singularize(searchInThis.toLowerCase()).includes(singularize(searchForThis.toLowerCase()))
}

/**********| clamp - 
* Restricts a number to be within a specified range.
* @function
* @param {number} num - The value to clamp.
* @param {number} min - The lower bound of the range.
* @param {number} max - The upper bound of the range.
* @returns {number} The clamped value, guaranteed to be between min and max (inclusive).
***********/
function clamp(num, min, max) {
  return num <= min ? min :
         num >= max ? max : num
}

/**********| toTitleCase - 
* Converts a string into title case.
* @function
* @param {string} [str] A str to converts.
* @returns {string} str with title case.
***********/
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

/**********| buildStoryCard - 
 * Creates and inserts a story card into the `storyCards` array.
 * - Accepts either individual parameters or a single object containing the
 * story card properties. If `keys` is not provided, it defaults to a trimmed
 * version of `title`.
 * 
 * @function
 * @param {string|object} title - Card title, or an object containing all card properties: { title, entry, type, keys, description, insertionIndex }.
 * @param {string} [entry=""] - The main text or content of the story card.
 * @param {string} [type=""] - The type/category of the card.
 * @param {string} [keys=""] - Search or trigger keys for the card.
 * @param {string} [description=""] - Additional descriptive text for the card.
 * @param {number} [insertionIndex=storyCards.length] - Position in `storyCards` where the new card is inserted.
 * @returns {object} The newly created story card object.
 */
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

/**********| getStoryCardListByType - 
* The ultimate story card retrieval for any cards of X title
* @function
* @param {string} [listType] Type string to search story cards for.
* @param {boolean} [exactType] Whether to search for exact type matches, or types that include the string arg.
* @returns {array} An array containing all the story cards that match the type string (given above).
***********/
function getStoryCardListByType(listType, exactType=true) {
  if (exactType) {
    return storyCards.filter((element) => (element.type.toLowerCase() == listType.toLowerCase()));
  }
  return storyCards.filter((element) => (element.type.toLowerCase().includes(listType.toLowerCase())));
}

/**********| getStoryCardListByTitle -
* The ultimate story card retrieval for any cards of X title
* @function
* @param {string} [listTitle] Title string to search story cards for.
* @param {boolean} [exactTitle] Whether to search for exact title matches, or titles that include the string arg.
* @returns {array} An array containing all the story cards that match the title string (given above).
***********/
function getStoryCardListByTitle(listTitle, exactTitle = true) {
  const normalizedTitle = singularize(listTitle, true).toLowerCase()
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

/**********| This function adds, or increases, an item in the character's inventory
* @function
* @param {character} [character] The character whose inventory is being manipulated
* @param {item} [newItem] The item to be added or increased
* @param {number} [quantity] The quantity of the item attempting to add
* @returns {item} Returns the inventory item just added or increased
***********/
function putItemIntoInventory(character, newItem, quantityOverride=null)
{
  // Check story cards (create one if needed), and make sure it's a complete item
  newItem = checkItemCards(newItem, true)
  // Has to be done after checkItemCards, so that new cards don't have the override quantity
  newItem.quantity = (quantityOverride ?? newItem.quantity) // Enforce override quantity
  // Update inventory
  const index = character.inventory.findIndex((element) => compareWithoutPlural(newItem.itemName, element.itemName))
  if (index == -1) {
    character.inventory.push(newItem)
    return character.inventory[character.inventory.length-1]
  }
  character.inventory[index].quantity += newItem.quantity
  return character.inventory[index]
}

/**********| ITEM STORY CARDS!
* 1) Check the item story cards to see if the item exists!
* 2) If the item exists, replace remaining default values with item card values!
* 3) If the item does not exist, create a story card for one.
* @function
* @param {item} [newItem] The item to be checked.
* @returns {item} Returns the newItem with updated details.
***********/
function checkItemCards(newItem, buildCard=false) {
  const itemName = singularize(newItem.itemName).toLowerCase()
  const itemCards = getStoryCardListByTitle(itemName, true)
  const itemCard = itemCards.length > 0 ? itemCards[0] : null;
  if (itemCard) {
    const existingDetails = JSON.parse(itemCard.description)
    for (const key in existingDetails) {
      if (newItem[key] === defaultItemDetails[key] && existingDetails[key] !== undefined) {
        newItem[key] = existingDetails[key]
      }
    }
  } else {
    // Make sure newItem is a complete item
    for (const key in defaultItemDetails) {
      if (newItem[key] === undefined) {
        newItem[key] = defaultItemDetails[key]
      }
    }
    if (buildCard) {
      buildStoryCard(newItem.itemName, "", "Item - Misc - Uncommon", "", JSON.stringify(newItem))
    } else {
      return null // null for error
    }
  }
  return newItem
}

/**********| This function removes/reduces items in the character's inventory
* @function
* @param {character} [character] The character whose inventory is being manipulated
* @param {string} [itemName] The name of the item to be removed
* @param {number} [quantity] The quantity of the item attempting to remove
* @returns {[item, number]} [Item removed (or null), quantity removed]
***********/
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

/**********| parseQuantityAndName - 
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
 ***********/
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

/**********| showInventory - 
* Returns a textual representation/list of the character's inventory.
* @function
* @param {character} [character] Character whose inventory to display.
* @param {string} [dotPointChar] Style of dot point for listing items, defaults to double-space.
* @returns {string} A textual representation/list of the character's inventory.
***********/
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

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */