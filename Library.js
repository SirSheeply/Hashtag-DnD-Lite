// Based on version "Hashtag DnD v0.7.0" by Raeleus
// const version = "Hashtag DnD v0.7.0 by Raeleus / Lite Edition by SirSheeply"

// Your "Library" tab should look like this

// Checkout the Guidebook examples to get an idea of other ways you can use scripting
// https://help.aidungeon.com/scripting

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomFloat(min, max) {
  return Math.random() * (max - min + 1) + min;
}

function getRandomBoolean(chance) {
  if (chance == null) chance = .5
  return Math.random() <= chance
}

function getRandom(seed) {
  var x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

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

function getCommandName(command) {
  var args = getArguments(command)
  if (args.length == 0) return null
  return args[0]
}

const argumentPattern = /("[^"\\]*(?:\\[\S\s][^"\\]*)*"|'[^'\\]*(?:\\[\S\s][^'\\]*)*'|\/[^\/\\]*(?:\\[\S\s][^\/\\]*)*\/[gimy]*(?=\s|$)|(?:\\\s|\S)+)/g

function getArguments(command) {
  var matches = command.match(new RegExp(argumentPattern))
  var returnValue = []
  matches.forEach(match => {
    match = match.replaceAll(/(^")|("$)/g, "").replaceAll(/\\"/g, '"')
    returnValue.push(match)
  })
  return returnValue
}

function getArgument(command, index) {
  var args = getArguments(command)
  index++
  if (index >= args.length) return null
  return args[index]
}

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

function getCharacter(characterName) {
  if (characterName == null) characterName = state.characterName
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

function executeTurn(activeCharacter) {
  var activeCharacterName = toTitleCase(activeCharacter.name)
  var possessiveName = getPossessiveName(activeCharacter.name)
  if (possessiveName == "Your") possessiveName = "your"

  if (activeCharacter.className != null) {
    //player
    state.show = "none"
    return `\n[It is ${possessiveName} turn]\n`
  } else if (activeCharacter.ally == false) {
    //enemy
    var characters = state.characters.filter(x => x.health > 0)
    characters.push(...state.allies.filter(x => x.health > 0))
    var target = characters[getRandomInteger(0, characters.length - 1)]
    var areWord = target.name == "You" ? "are" : "is"
    var targetNameAdjustedCase = target.name == "You" ? "you" : toTitleCase(target.name)
    var attack = calculateRoll(`1d20${activeCharacter.hitModifier > 0 ? "+" + activeCharacter.hitModifier : activeCharacter.hitModifier < 0 ? activeCharacter.hitModifier : ""}`)
    var hit = attack >= target.ac

    var text = `\n[It is ${possessiveName} turn]\n`
    if (getRandomBoolean() || activeCharacter.spells.length == 0) {
      if (hit) {
        state.blockCharacter = target
        state.blockPreviousHealth = target.health
        var damage = isNaN(activeCharacter.damage) ? calculateRoll(activeCharacter.damage) : activeCharacter.damage
        target.health = Math.max(target.health - damage, 0)

        text += `\n[Character AC: ${target.ac} Attack roll: ${attack}]\n`

        text += `${activeCharacterName} attacks ${targetNameAdjustedCase} for ${damage} damage!\n`
        if (target.health == 0) text += ` ${toTitleCase(target.name)} ${areWord} unconscious! \n`
        else text += ` ${toTitleCase(target.name)} ${areWord} at ${target.health} health.\n`
      } else text += `${activeCharacterName} attacks ${targetNameAdjustedCase} but misses!\n`
    } else {
      var spell = activeCharacter.spells[getRandomInteger(0, activeCharacter.spells.length - 1)]
      var diceMatches = spell.match(/(?<=^.*)\d*d\d+((\+|-)\d+)?$/gi)
      if (diceMatches == null) text += `${activeCharacterName} casts spell ${spell}!`
      else {
        var spell = spell.substring(0, spell.length - diceMatches[0].length)
        if (hit) {
          var damage = calculateRoll(diceMatches[0])
          target.health = Math.max(target.health - damage, 0)

          text += `\n[Character AC: ${target.ac} Attack roll: ${attack}]\n`

          text += `${activeCharacterName} casts spell ${spell} at ${targetNameAdjustedCase} for ${damage} damage!`
          
          if (target.health == 0) text += ` ${toTitleCase(target.name)} ${areWord} unconscious!\n`
          else text += ` ${toTitleCase(target.name)} ${areWord} at ${target.health} health.\n`
        } else text += `${activeCharacterName} casts spell ${spell} at ${targetNameAdjustedCase} but misses!\n`
      }
    }
    return text
  } else {
    //ally
    var enemies = state.enemies.filter(x => x.health > 0)
    var target = enemies[getRandomInteger(0, enemies.length - 1)]
    var areWord = target.name == "You" ? "are" : "is"
    var targetNameAdjustedCase = target.name == "You" ? "you" : toTitleCase(target.name)
    var attack = calculateRoll(`1d20${activeCharacter.hitModifier > 0 ? "+" + activeCharacter.hitModifier : activeCharacter.hitModifier < 0 ? activeCharacter.hitModifier : ""}`)
    var hit = attack >= target.ac

    var text = `\n[It is ${possessiveName} turn]\n`
    if (getRandomBoolean() || activeCharacter.spells.length == 0) {
      if (hit) {
        state.blockCharacter = target
        state.blockPreviousHealth = target.health
        var damage = isNaN(activeCharacter.damage) ? calculateRoll(activeCharacter.damage) : activeCharacter.damage
        target.health = Math.max(target.health - damage, 0)

        text += `\n[Enemy AC: ${target.ac} Attack roll: ${attack}]\n`

        text += `${activeCharacterName} attacks ${targetNameAdjustedCase} for ${damage} damage!\n`
        if (target.health == 0) text += ` ${toTitleCase(target.name)} ${areWord} unconscious! \n`
        else text += ` ${toTitleCase(target.name)} ${areWord} at ${target.health} health.\n`
      } else text += `${activeCharacterName} attacks ${targetNameAdjustedCase} but misses!\n`
    } else {
      var spell = activeCharacter.spells[getRandomInteger(0, activeCharacter.spells.length - 1)]
      var diceMatches = spell.match(/(?<=^.*)\d*d\d+((\+|-)\d+)?$/gi)
      if (diceMatches == null) text += `${activeCharacterName} casts spell ${spell}!`
      else {
        var spell = spell.substring(0, spell.length - diceMatches[0].length)
        if (hit) {
          var damage = calculateRoll(diceMatches[0])
          target.health = Math.max(target.health - damage, 0)

          text += `\n[Character AC: ${target.ac} Attack roll: ${attack}]\n`

          text += `${activeCharacterName} casts spell ${spell} at ${targetNameAdjustedCase} for ${damage} damage!`
          
          if (target.health == 0) text += ` ${toTitleCase(target.name)} ${areWord} unconscious!\n`
          else text += ` ${toTitleCase(target.name)} ${areWord} at ${target.health} health.\n`
        } else text += `${activeCharacterName} casts spell ${spell} at ${targetNameAdjustedCase} but misses!\n`
      }
    }
    return text
  }
}

function createEncounter(listName) {
  // Defualt Encounter
  var encounter = {
    text: "It's just a plesent day! Nothing happens.",
    cr: 1,
    enemies: []
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

  // Convert description into createEnemy()
  // "description": "[\n    {\n        \"ally\": false,\n        \"name\": \"Turkey Prime\",\n        \"health\": \"5d10+10\",\n        \"ac\": 14,\n        \"hitMod\": 0,\n        \"damage\": \"2d6+3\",\n        \"initiative\": \"d20+2\",\n        \"spells\": []\n    },\n    {\n        \"ally\": false,\n        \"name\": \"Turkey Mage\",\n        \"health\": \"2d10+10\",\n        \"ac\": 14,\n        \"hitMod\": 0,\n        \"damage\": \"2d6+3\",\n        \"initiative\": \"d20+2\",\n        \"spells\": [\"Web\", \"Ray of Frost\"]\n    }\n]",
  // Eample: createEnemy("Turkey Prime", calculateRoll("5d10+10"), 14, 0, "2d6+3", "d20+2", false, [])
  const entities = JSON.parse(randomEncounter.description)
  entities.forEach(element => {
    encounter.enemies.push( createEntity(element.name, calculateRoll(element.health), element.ac, element.hitMod, element.damage, element.initiative, element.ally, element.spells) )
  });

  //-----

  var characterName = toTitleCase(state.characters[getRandomInteger(0, state.characters.length-1)].name)
  var characterNameAdjustedCase = characterName == "You" ? "you" : characterName
  var possessiveName = getPossessiveName(characterName)
  encounter.text = encounter.text.replaceAll("Character", characterName)
  encounter.text = encounter.text.replaceAll("character", characterNameAdjustedCase)
  encounter.text = encounter.text.replaceAll("character's", possessiveName)
  encounter.text = encounter.text.replaceAll("Character's", toTitleCase(possessiveName))

  for (var enemy of encounter.enemies) {
    enemy.health = Math.floor(enemy.health * multiplier)
    enemy.ac = Math.floor(enemy.ac * multiplier)

    damagePrefix = enemy.damage.match(/^\d*d\d*/gi)[0]
    damageSuffix = enemy.damage.match(/(?<=^\d*d\d*)(\+|-).*$/gi)
    damageSuffix = damageSuffix != null ? parseInt(damageSuffix[0]) : 0
    damageSuffix += Math.floor(3 * (multiplier - 1))
    damageSuffix = `${damageSuffix > 0 ? "+" : ""}${damageSuffix}`
    enemy.damage = `${damagePrefix}${damageSuffix == 0 ? "" : damageSuffix}`

    initiativePrefix = enemy.initiative.match(/^\d*d\d*/gi)[0]
    initiativeSuffix = enemy.initiative.match(/(?<=^\d*d\d*)(\+|-).*$/gi)
    initiativeSuffix = initiativeSuffix != null ? parseInt(initiativeSuffix[0]) : 0
    initiativeSuffix += Math.floor(3 * (multiplier - 1))
    initiativeSuffix = `${initiativeSuffix > 0 ? "+" : ""}${initiativeSuffix}`
    enemy.initiative = `${initiativePrefix}${initiativeSuffix == 0 ? "" : initiativeSuffix}`
  }

  return encounter
}

function createEntity(name, health, ac, hitModifier, damage, initiative, ally, ...spells) {
  var entity = {
    name: name,
    health: health,
    ac: ac,
    hitModifier: hitModifier,
    damage: damage,
    initiative: initiative,
    spells: spells,
    ally: ally
  }
  return entity
}

// NOTE: createEnemy and createAlly can depreciated
function createEnemy(name, health, ac, hitModifier, damage, initiative, ...spells) {
  var enemy = {
    name: name,
    health: health,
    ac: ac,
    hitModifier: hitModifier,
    damage: damage,
    initiative: initiative,
    spells: spells,
    ally: false
  }
  return enemy
}

// NOTE: createEnemy and createAlly can depreciated
function createAlly(name, health, ac, hitModifier, damage, initiative, ...spells) {
  var ally = {
    name: name,
    health: health,
    ac: ac,
    hitModifier: hitModifier,
    damage: damage,
    initiative: initiative,
    spells: spells,
    ally: true
  }
  return ally
}

function getUniqueName(name) {
  const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
  var letterIndex = 0

  var newName
  var enemyMatches
  do {
    newName = `${name} ${letters[letterIndex++]}`
    enemyMatches = state.enemies.filter(x => x.name.toLowerCase() == newName.toLowerCase())
  } while (enemyMatches.length > 0 && letterIndex < letters.length)

  return newName
}

function createInitiativeOrder() {
  state.initiativeOrder = []

  for (var character of state.characters) {
    if (character.health <= 0) continue
    state.initiativeOrder.push(character)
  }

  for (var enemy of state.enemies) {
    if (enemy.health <= 0) continue
    state.initiativeOrder.push(enemy)
  }

  for (var ally of state.allies) {
    if (ally.health <= 0) continue
    state.initiativeOrder.push(ally)
  }

  state.initiativeOrder.sort(function(a, b) {
    return b.calculatedInitiative - a.calculatedInitiative;
  });
}

const levelSplits = [0, 300, 900, 2700, 6500, 14000, 23000, 34000, 48000, 64000, 85000, 100000, 120000, 140000, 165000, 195000, 225000, 265000, 305000, 355000]

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

// The ultimate story cards retrieval for any cards of X type
// exactType parameter allows us to choose whether to match the type exactly or just includes type as a substring
function getStoryCardListByType(listType, exactType=true) {
  if (exactType) {
    return storyCards.filter((element) => (element.type.toLowerCase() == listType.toLowerCase()));
  }
  return storyCards.filter((element) => (element.type.toLowerCase().includes(listType.toLowerCase())));
}

// The ultimate story cards retrieval for any cards of X title
// exactType parameter allows us to choose whether to match the title exactly or just includes type as a substring
function getStoryCardListByTitle(listTitle, exactTitle=true) {
  if (exactTitle) {
    return storyCards.filter((element) => (element.type.toLowerCase() == listTitle.toLowerCase()));
  }
  return storyCards.filter((element) => (element.type.toLowerCase().includes(listTitle.toLowerCase())));
}

function pluralize(word, revert = false) {
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
    const pattern = revert
      ? new RegExp(`^${irregular[key]}$`, 'i')
      : new RegExp(`^${key}$`, 'i');

    if (pattern.test(word)) {
      return word.replace(pattern, revert ? key : irregular[key]);
    }
  }

  const rules = revert ? singularRules : pluralRules;
  for (let rule in rules) {
    const pattern = new RegExp(rule, 'i');
    if (pattern.test(word)) {
      return word.replace(pattern, rules[rule]);
    }
  }

  return word;
}

function clamp(num, min, max) {
  return num <= min 
    ? min 
    : num >= max 
      ? max 
      : num
}

function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
  );
}

function stripPunctuation(str) {
  return str.replaceAll(/((\.)|(!))\s*$/g, "")
}