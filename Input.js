// Based on version "Hashtag DnD v0.7.0" by Raeleus
// const version = "Hashtag DnD v0.7.0 by Raeleus / Lite Edition by SirSheeply"

// Your "Input" tab should look like this

// Checkout the Guidebook examples to get an idea of other ways you can use scripting
// https://help.aidungeon.com/scripting

/* NOTE: This is the Main AI Dungeon Call
 * Keeping this space clean will allow for greater compatibility with other script systems.
 */
const modifier = (text) => {
  // Your other input modifier scripts go here (preferred)
  text = DNDHash_input(text)
  // Your other input modifier scripts go here (alternative)
  return {text}
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////// COMMAND REGISTRY ///////////////////////////////////////////////////////

const commandRegistry = [
    // <><> General
    { handler: doRoll,                  synonyms: ["roll"] },
    { handler: doTry,                   synonyms: ["try", "tryto", "tries", "triesto", "attempt", "attemptto", "attemptsto", "do"] },
    { handler: doCheck,                 synonyms: ["check", "checkstat", "checkstatistic", "checkattribute", "checkability", "checkskill", "skillcheck", "abilitycheck"] },
    
    // <><> Time
    { handler: doShowDay,               synonyms: ["showday", "showdate", "day", "date"] },
    { handler: doSetDay,                synonyms: ["setday", "setdate"] },
    { handler: doRest,                  synonyms: ["rest", "longrest", "shortrest", "sleep", "nap"] },
    
    // System
    { handler: doReset,                 synonyms: ["reset", "cleandata", "cleardata", "resetdata", "resetsettings", "clearsettings", "profile"] },
    { handler: doVersion,               synonyms: ["version", "ver", "showversion"] },
    { handler: doHelp,                  synonyms: ["help"] },
    { handler: doTest,                  synonyms: ["testcode", "debug"]},
    
    // <><> Character
    { handler: doCreate,                synonyms: ["create", "generate", "start", "begin", "setup", "party", "member", "new"] },
    { handler: doRenameCharacter,       synonyms: ["renamecharacter", "renameperson"] },
    { handler: doCloneCharacter,        synonyms: ["clone", "clonecharacter", "cloneperson", "copycharacter", "copyperson", "duplicatecharacter", "duplicateperson", "dupecharacter", "dupeperson"] },
    { handler: doBio,                   synonyms: ["bio", "biography", "summary", "character", "charactersheet", "statsheet"] },
    { handler: doSetClass,              synonyms: ["setclass", "class"] },
    { handler: doShowCharacters,        synonyms: ["showcharacters", "showparty", "showteam", "characters", "party", "team"] },
    { handler: doRemoveCharacter,       synonyms: ["removecharacter", "deletecharacter", "erasecharacter"] },
    
    // <><> Levels & Experience
    { handler: doSetExperience,         synonyms: ["setexperience", "setexp", "setxp", "setexperiencepoints"] },
    { handler: doAddExperience,         synonyms: ["addexperience", "addexp", "addxp", "addexperiencepoints", "experience", "exp", "gainxp", "gainexperience", "xp", "experiencepoints"] },
    { handler: doLevelUp,               synonyms: ["levelup", "level"] },
    { handler: doSetAutoXp,             synonyms: ["setautoxp", "autoxp"] },
    { handler: doShowAutoXp,            synonyms: ["showautoxp"] },
    
    // <><> Abilities & Skills
    { handler: doSetStat,               synonyms: ["setstat", "setstatistic", "setattribute", "setability", "changestat", "changestatistic", "changeattribute", "changeability", "updatestat", "updatestatistic", "updateattribute", "updateability", "stat", "attribute", "ability"] },
    { handler: doShowStats,             synonyms: ["showstats", "stats", "viewstats", "showabilities", "abilities", "viewabilities", "showstatistics", "statistics", "viewstatistics", "showattributes", "attributes", "viewattributes"] },
    { handler: doRemoveStat,            synonyms: ["removestat", "deletestat", "cancelstat", "removeability", "deleteability", "cancelAbility", "removestatistic", "deletestatistic", "cancelstatistic", "removeattribute", "deleteattribute", "cancelattribute"] },
    { handler: doClearStats,            synonyms: ["clearstats", "clearabilities", "clearstatistics", "clearattributes"] },
    { handler: doSetSkill,              synonyms: ["setskill", "changeskill", "updateskill", "skill"] },
    { handler: doShowSkills,            synonyms: ["showskills", "skills"] },
    { handler: doRemoveSkill,           synonyms: ["removeskill", "deleteskill", "cancelskill"] },
    { handler: doClearSkills,           synonyms: ["clearskills"] },
    
    // <><> Notes
    { handler: doShowNotes,             synonyms: ["notes", "shownotes", "viewnotes"] },
    { handler: doNote,                  synonyms: ["note", "takenote", "setnote", "createnote", "remember"] },
    { handler: doClearNotes,            synonyms: ["clearnotes"] },
    { handler: doEraseNote,             synonyms: ["erasenote", "removenote", "deletenote", "cancelnote"] },
    
    // <><> Inventory
    { handler: doTake,                  synonyms: ["take", "steal", "get", "grab", "receive"] },
    { handler: doLoot,                  synonyms: ["loot", "search", "investigate", "harvest"] },
    { handler: doDrop,                  synonyms: ["remove", "discard", "drop", "leave", "dispose", "toss", "throw", "throwaway", "trash", "donate", "eat", "consume", "use", "drink", "pay", "lose"] },
    { handler: doGive,                  synonyms: ["give", "handover", "hand", "gift"] },
    { handler: doBuy,                   synonyms: ["buy", "purchase", "barter", "trade", "swap", "exchange"] },
    { handler: doSell,                  synonyms: ["sell"] },

    { handler: doRenameItem,            synonyms: ["rename", "renameitem", "renameobject", "renamegear", "renameequipment"] },
    { handler: doInventory,             synonyms: ["inv", "inventory", "backpack", "gear", "showinv", "showinventory", "viewinventory", "viewinv"] },
    { handler: doClearInventory,        synonyms: ["clearinventory", "clearinv", "emptyinventory", "emptybackpack", "clearbackpack", "emptygear", "cleargear"] },
    
    // <><> Spells
    { handler: doLearnSpell,            synonyms: ["learnspell", "learnmagic", "learnincantation", "learnritual", "memorizespell", "memorizemagic", "memorizeincantation", "memorizeritual", "learnsspell", "learnsmagic", "learnsincantation", "learnsritual", "memorizesspell", "memorizesmagic", "memorizesincantation", "memorizesritual", "learn"] },
    { handler: doForgetSpell,           synonyms: ["forgetspell", "forgetmagic", "forgetincantation", "forgetritual", "forgetsspell", "forgetsmagic", "forgetsincantation", "forgetsritual", "deletespell", "deletemagic", "deleteincantation", "deleteritual", "deletesspell", "deletesmagic", "deletesincantation", "deletesritual", "cancelspell", "cancelmagic", "cancelincantation", "cancelritual", "cancelsspell", "cancelsmagic", "cancelsincantation", "cancelsritual", "removespell", "removemagic", "removeincantation", "removeritual", "removesspell", "removesmagic", "removesincantation", "removesritual", "forget"] },
    { handler: doCastSpell,             synonyms: ["cast", "castspell", "castmagic", "castincantation", "castritual", "castsspell", "castsmagic", "castsincantation", "castsritual"] },
    { handler: doClearSpells,           synonyms: ["clearspells", "clearmagic", "clearincantations", "clearrituals", "forgetallspells", "forgetallmagic", "forgetallincantation", "forgetallritual"] },
    { handler: doSpellbook,             synonyms: ["spellbook", "spells", "listspells", "showspells", "spelllist", "spellcatalog", "spellinventory"] },
    
    // <><> Narrative
    { handler: doEncounter,             synonyms: ["encounter", "travel", "traverse", "explore"] }
    
    /** PLAN: Replace health/damage/ac system with injury system
     * Wepaons have injury types which source from injury tables, armor has injury resistance
     * This will allow us to introduce damage types (something not present)
     * The injury system will be narrative based, not turn based (A deviation from D&D)
     * This removes the need for players to book-keep encounters, memorize command sequences, and allow free-form combat
     */
];

/**
* - Helper: Look up command handler from registry using synonyms
* @function
* @param {string} [commandName] A command name or synonym to look up, e.g. "take"
* @returns {function} Returns the command handler function, e.g. "doTake"
*/
function findCommandHandler(commandName) {
  for (let entry of commandRegistry) {
    if (entry.synonyms.some(s => s === commandName || s + "s" === commandName)) {
      return entry.handler
    }
  }
  return null
}

// Synonyms used too broadly to search the registry every time
const articleSynonyms = ["a", "an", "the"]
const allSynonyms = ["all", "every", "each", "every one", "everyone"]
const turnSynonyms = ["turn", "doturn", "taketurn"]
const createSynonyms = ["create", "generate", "start", "begin", "setup", "party", "member", "new"]
const checkSynonyms = ["check", "checkstat", "checkstatistic", "checkattribute", "checkability", "checkskill", "skillcheck", "abilitycheck"]
const trySynonyms = ["try", "tryto", "tries", "triesto", "attempt", "attemptto", "attemptsto", "do"]

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////// DND HASH INPUT FUNCTION ////////////////////////////////////////////////////

/**
* - This is the main Hashtag DND function!
* - It handles input text, translates them to commands, and executes commands.
* - Handles step flows, forms, and initialises variables.
* @function
* @param {string} [text] Raw input text from AI Dungeon
* @returns {string} Returns command result, if any, or error messages
*/
function DNDHash_input (text) {
  init() // Creates templates and inital values in state
  const rawText = text

  // These handle steps don't have commands, we're inputing answers to form like questions.
  // E.g. Do you want to use a character preset? (y/n/q)
  if (state.createStep != null) {
    text = handleCreateStep(text)
    if (state.createStep != null) return text
    else text = rawText
  }

  // I assume this prevents us running commands the first time this function is called.
  // If there's no #, it just passes the message through as-is (probably flavor/narrative).
  if (state.initialized == null || !text.includes("#")) {
    state.initialized = true;
    return text
  }

  state.characterName = getCharacterName(rawText)

  // Extracts "flavor text" after a newline.
  // Keeps the #command separated from the rest of the input.
  // This is later appended back after processing the command.
  let lineBreakIndex = text.indexOf(".")
  let flavorText = null
  if (lineBreakIndex > -1) {
    flavorText = text.substring(lineBreakIndex + 1)
    if (!flavorText.startsWith(" ")) flavorText = " " + flavorText
    text = text.substring(0, lineBreakIndex)
  } else {
    flavorText = null
  }

  text = sanitizeText(text)

  // Extract the command portion of the input after #
  // Sanitize and extract just the base command phrase
  let command = text.substring(text.search(/#/) + 1)
  let commandName = getCommandName(command)?.toLowerCase().replaceAll(/[^a-z0-9\s]*/gi, "").trim()
  if (!commandName) {
    text = "\n[Error: Invalid or missing command.]\n"
    return text
  }
  
  // The idea of this block is to prevent us from running commmands if we have no character created
  const youNeedACharacter = `\n[Error: Character name not specified. Use the "do" or "say" modes. Alternatively, use "story" mode in the following format without quotes: "charactername #hashtag"]\n`
  const isCreateCommand = createSynonyms.includes(commandName)
  const hasChar = state.characterName != null
  const exists = hasChar && hasCharacter(state.characterName)
  const handler = findCommandHandler(commandName)

  if (!exists && !isCreateCommand) {
    state.show = "none"
    text = hasChar
      ? `\n[Error: Character ${state.characterName} does not exist. Type #setup to create this character]\n`
      : youNeedACharacter
    return text
  }

  if (!hasChar && isCreateCommand && !handler) {
    state.show = "none"
    text = youNeedACharacter
    return text
  }
  // ------
  
  // Command Processing Block
  let commandResult, commandSuccess = null;
  [commandResult, commandSuccess] = handler(command)
  if (!commandSuccess) state.show = "none"; // If a command fails, do not show output
  text = commandResult

  // Return with falavor added back in
  if (flavorText != null) text += flavorText;
  return text;
}

/**
* Mini-function that initialises all variables on first run.
* @function
*/
function init() {
  if (state.tempCharacter == null) {
    state.tempCharacter = {
      name: "template",
      className: "adventurer",
      summary: "Template character not meant to be used.",
      inventory: [],
      spells: [],
      stats: [],
      experience: 0,
      health: 10
    }
  }
  
  if (state.characters == null) state.characters = []
  if (state.notes == null) state.notes = []
  if (state.day == null) state.day = 0

  state.show = null
  state.prefix = null
  state.critical = null

  state.characters.forEach(x => {
    if (x.ac == null) x.ac = 10
    if (x.damage == null) x.damage = "1d6"
    if (x.proficiency == null) x.proficiency = 2
  })
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////// DND HASH FORM & STEP FUNCTIONS ////////////////////////////////////////////////

/**
* - Handles the create character form input across multiple inputs.
* - Allows loading of preset characters from story cards.
* - Has a partner in the output function.
* - Operates in state.show = "create"
* @function
* @param {string} [text] Text passed from AI dungeon's input
* @returns {string} Returns textual response, if any, or error messages
*/
function handleCreateStep(text) {
  state.show = "create"

  if (/^\s*>.*says? ".*/.test(text)) {
    text = text.replace(/^\s*>.*says? "/, "")
    text = text.replace(/"\s*$/, "")
  } else if (/^\s*>\s.*/.test(text)) {
    text = text.replace(/\s*> /, "")
    for (var i = 0; i < info.characters.length; i++) {
      var matchString = info.characters[i] == "" ? "You " : `${info.characters[i]} `
      if (text.startsWith(matchString)) {
        text = text.replace(matchString, "")
        break
      }
    }
    text = text.replace(/\.?\s*$/, "")
  } else {
    text = text.replace(/^\s+/, "")
  }

  if (text.toLowerCase() == "q") {
    state.createStep = null
    return text
  }

  switch (state.createStep) {
    case 0:
      text = text.toLowerCase();
      if (text.startsWith("y")) state.createStep = 100
      else if (text.startsWith("n")) state.createStep++
      break
    case 1:
      if (text.length > 0) {
        state.tempCharacter.className = text
        state.createStep++

        state.statDice = []
        for (var i = 0; i < 6; i++) {
          var dice = []
          for (var j = 0; j < 4; j++) {
            dice.push(parseInt(calculateRoll("d6")))
          }
          dice.sort(function(a, b) {
            return b - a;
          });
          dice.splice(3, 1)
          state.statDice.push(dice[0] + dice[1] + dice[2])
        }
        state.statDice.sort(function(a, b) {
          return b - a
        })
      }
      return text
      break
    case 2:
      if (text.length > 0) {
        var choices = text.split(/\D+/)
        choices = [...new Set(choices)];
        if (choices.length != 6) break

        for (var i = 0; i < 6; i++) {
          const stat = {
            name: "temp",
            value: state.statDice[i]
          }
          switch (parseInt(choices[i])) {
            case 1:
              stat.name = "Strength"
              break
            case 2:
              stat.name = "Dexterity"
              break
            case 3:
              stat.name = "Constitution"
              break
            case 4:
              stat.name = "Intelligence"
              break
            case 5:
              stat.name = "Wisdom"
              break
            case 6:
              stat.name = "Charisma"
              break
            default:
              return text
          }
          state.tempCharacter.stats.push(stat)
        }

        state.createStep = 100
      }
      return text
    case 100:
      if (!isNaN(text)) {
        state.createStep = 500

        // ~150+ lines of characters! Nice.
        // The rework here is to have all the presets inside story cards, from which we can pull.
        // This means players can curate the presests, and we're not limited to X amount.

        // Get a list of all the preset cards with the preset type
        const presetIndexes = getStoryCardListByType("preset")
        if (presetIndexes.length <= 0) {
          // Error no presets cards for this case!
          return "Error: No preset Cards Found!"
        }
        // Convert description into what we need to create the preset.
        const presetCard = presetIndexes[parseInt(text)]
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
            state.tempCharacter.skills.find((element) => element.name.toLowerCase() == skill.name.toLowerCase()).modifier = skill.modifier;
          } else { // We need to create the skill from scratch in this case, with it's stat base
            state.tempCharacter.skills.push({name: skill.name, stat:skill.stat, modifier: skill.modifier})
          }
        });
        // TODO: Update the presets to be proper items
        entity.inventory.forEach(item => {
          putItemIntoInventory(state.tempCharacter, item.name, item.quantity)
        });
        state.tempCharacter.spells = entity.spells
      }
      return text
    case 500:
      state.show = null
      state.createStep = null

      var character = getCharacter(state.tempCharacter.name)
      character.className = state.tempCharacter.className
      character.experience = 0
      character.stats = [...state.tempCharacter.stats]
      character.inventory = [...state.tempCharacter.inventory]
      character.skills = [...state.tempCharacter.skills]
      character.spells = [...state.tempCharacter.spells]
      character.health = getHealthMax()
      break
  }
  return text
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////// COMMAND FUNCTIONS - GENERAL /////////////////////////////////////////////////

/**
 * Rolls dice with optional advantage or disadvantage.
 * @function
 * @param {string} [command] Command string specifying roll type and dice.
 * @returns {[string, boolean]} Roll result text and success flag.
 */
function doRoll(command) {
  var rollType = searchArgument(command, /^(advantage)|(disadvantage)$/gi)
  if (rollType == null) rollType = "normal"

  var dice = searchArgument(command, /^.*\d.*$/gi)
  if (dice == null) dice = "d20"
  dice = formatRoll(dice)

  var addition = getAddition(dice)
  var roll = calculateRoll(dice) - addition
  if (rollType == "advantage") roll = Math.max(roll, calculateRoll(dice) - addition)
  if (rollType == "disadvantage") roll = Math.min(roll, calculateRoll(dice) - addition)
  
  state.show = "none"

  var text = `\n[You roll a ${dice}`
  if (rollType != "normal") text += ` with ${rollType}`
  text += `. Score: ${roll}`
    
  if (roll == 20) text += " Critical Success!"
  else if (roll == 1) text += " Critical Failure!"
  else if (addition > 0) text += ` + ${addition} = ${roll + addition}`
  else if (addition < 0) text += ` - ${Math.abs(addition)} = ${roll + addition}`

  text += "]\n"
  return [text, true]
}

/**
 * Performs a skill or ability check with difficulty and advantage/disadvantage.
 * Grants XP on success. Provides descriptive success/failure messages.
 * @function
 * @param {string} [command] Command string specifying ability/skill, advantage, difficulty, and description.
 * @returns {[string, boolean]} Result text and success flag.
 */
function doTry(command) {
  if (getArguments(command).length <= 1) {
    return ["\n[Error: Not enough parameters. See #help]\n", false]
  }
  
  var character = getCharacter()
  var textIndex = 3
  var failword = character.name == "You" ? "fail" : "fails"

  var arg0 = null
  if (character.stats.length > 0) arg0 = searchArgument(command, statsToOrPattern(character.stats))
  if (arg0 == null && character.skills.length > 0) arg0 = searchArgument(command, statsToOrPattern(character.skills))
  if (arg0 == null) {
    arg0 = "Ability"
    textIndex--
  }
  arg0 = toTitleCase(arg0)
  
  var arg1 = searchArgument(command, arrayToOrPattern(advantageNames))
  if (arg1 == null) {
    arg1 = "normal"
    textIndex--
  }
  else arg1 = arg1.toLowerCase()

  const difficultyPatternNames = [...new Set(difficultyNames)]
  difficultyPatternNames.push("\\d+")
  var arg2 = searchArgument(command, arrayToOrPattern(difficultyPatternNames))
  if (arg2 == null) {
    arg2 = defaultDifficulty
    textIndex--
  }
  else arg2 = arg2.toLowerCase()

  var arg3 = getArgumentRemainder(command, textIndex)
  var toMatches = arg3.match(/^to\s+/gi)
  if (toMatches != null) arg3 = arg3.substring(toMatches[0].length)
  if (!/^.*(\.|!|\?)$/gi.test(arg3)) arg3 += "."

  var die1 = calculateRoll("1d20")
  var die2 = calculateRoll("1d20")
  var score = arg1 == "advantage" ? Math.max(die1, die2) : arg1 == "disadvantage" ? Math.min(die1, die2) : die1

  var modifier = 0

  var skill = character.skills.find(x => x.name.toLowerCase() == arg0.toLowerCase())
  if (skill != null) {
    var stat = character.stats.find(x => x.name.toLowerCase() == skill.stat.toLowerCase())
    if (stat != null) modifier = skill.modifier + getModifier(stat.value)
  } else {
    var stat = character.stats.find(x => x.name.toLowerCase() == arg0.toLowerCase())
    if (stat != null) modifier = getModifier(stat.value)
  }

  var target = 15
  if (/^\d+$/.test(arg2)) target = arg2
  else {
    var targetIndex = difficultyNames.indexOf(arg2)
    if (targetIndex >= 0 && targetIndex < difficultyNames.length) target = difficultyScores[targetIndex]
  }

  var dieText = arg1 == "advantage" || arg1 == "disadvantage" ? `${arg1}(${die1},${die2})` : die1

  state.show = "prefix"
  if (score == 20) state.prefix = `\n[${arg0} check DC: ${target} roll: ${dieText}]\n`
  else if (score == 1) state.prefix = `\n[${arg0} check DC: ${target} roll: ${dieText}]\n`
  else if (modifier != 0) state.prefix = `\n[${arg0} check DC: ${target} roll: ${dieText}${modifier > 0 ? "+" + modifier : modifier}=${score + modifier}. ${score + modifier >= target ? "Success!" : "Failure!"}]\n`
  else state.prefix = `\n[${arg0} check DC: ${target} roll: ${dieText}. ${score >= target ? "Success!" : "Failure!"}]\n`
  var text = `\n${character.name} ${score + modifier >= target ? "successfully" : failword + " to"} ${arg3}`
  if (score == 20) text += " Critical success! The action was extremely effective."
  else if (score == 1) text += " Critical failure! There are dire consequences for this action."
  
  if (score + modifier >= target || score == 20) text += addXpToAll(Math.floor(autoXp * clamp(target, 1, 20) / 20)) + "\n"
  return [text, true]
}

/**
 * Performs a skill or ability check with difficulty and advantage/disadvantage.
 * Returns check result summary.
 * @function
 * @param {string} [command] Command string specifying ability/skill, advantage, and difficulty.
 * @returns {[string, boolean]} Check result text and success flag.
 */
function doCheck(command) {
  var character = getCharacter()

  var arg0 = null
  if (character.stats.length > 0) arg0 = searchArgument(command, statsToOrPattern(character.stats))
  if (arg0 == null && character.skills.length > 0) arg0 = searchArgument(command, statsToOrPattern(character.skills))
  if (arg0 == null) arg0 = "Ability"
  arg0 = toTitleCase(arg0)
  
  var arg1 = searchArgument(command, arrayToOrPattern(advantageNames))
  if (arg1 == null) arg1 = "normal"
  else arg1 = arg1.toLowerCase()

  const difficultyPatternNames = [...new Set(difficultyNames)]
  difficultyPatternNames.push("\\d+")
  var arg2 = searchArgument(command, arrayToOrPattern(difficultyPatternNames))
  if (arg2 == null) arg2 = defaultDifficulty
  else arg2 = arg2.toLowerCase()

  var die1 = calculateRoll("1d20")
  var die2 = calculateRoll("1d20")
  var score = arg1 == "advantage" ? Math.max(die1, die2) : arg1 == "disadvantage" ? Math.min(die1, die2) : die1

  var modifier = 0

  var skill = character.skills.find(x => x.name.toLowerCase() == arg0.toLowerCase())
  if (skill != null) {
    var stat = character.stats.find((element) => element.name.toLowerCase() == skill.stat.toLowerCase())
    if (stat != null) modifier = skill.modifier + getModifier(stat.value)
  } else {
    var stat = character.stats.find((element) => element.name.toLowerCase() == arg0.toLowerCase())
    if (stat != null) modifier = getModifier(stat.value)
  }

  var target = 15
  if (/^\d+$/.test(arg2)) target = arg2
  else {
    var targetIndex = difficultyNames.indexOf(arg2)
    if (targetIndex >= 0 && targetIndex < difficultyNames.length) target = difficultyScores[targetIndex]
  }
  
  state.show = "none"

  var dieText = arg1 == "advantage" || arg1 == "disadvantage" ? `${arg1}(${die1},${die2})` : die1

  var text
  if (score == 20) text = `\n[${arg0} check DC: ${target} roll: ${dieText}. Critical Success!]\n`
  else if (score == 1) text = `\n[${arg0} check DC: ${target} roll: ${dieText}. Critical Failure!]\n`
  else if (modifier != 0) text = `\n[${arg0} check DC: ${target} roll: ${dieText}${modifier > 0 ? "+" + modifier : modifier}=${score + modifier}. ${score + modifier >= target ? "Success!" : "Failure!"}]\n`
  else text = `\n[${arg0} check DC: ${target} roll: ${dieText}. ${score >= target ? "Success!" : "Failure!"}]\n`
  return [text, true]
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////// COMMAND FUNCTIONS - TIME ///////////////////////////////////////////////////

/**
 * Shows the current day in the game state.
 * @function
 * @param {string} [command] Command string (ignored).
 * @returns {[string, boolean]} Message with the current day and success flag.
 */
function doShowDay(command) {
  state.show = "none"
  return [`\n[It is day ${state.day}]\n`, true]
}

/**
 * Sets the current day in the game state.
 * @function
 * @param {string} [command] Command string containing the day number.
 * @returns {[string, boolean]} Confirmation message and success flag or error.
 */
function doSetDay(command) {
  var arg0 = getArgument(command, 0)
  if (arg0 == null || isNaN(arg0)) {
    return ["\n[Error: Not enough parameters. See #help]\n", false]
  }

  state.day = parseInt(arg0)

  state.show = "none"
  return [`\n[The day has been set to day ${state.day}]\n`, true]
}


/**
 * Advances the day by one and heals characters.
 * Supports "shortrest" for 50% healing without advancing the day.
 * @function
 * @param {string} [command] Command string (may specify "shortrest").
 * @returns {[string, boolean]} Message about healing/rest and success flag.
 */
function doRest(command) {
  var commandName = getCommandName(command)
  state.day++

  var healingFactor = 1
  var text
  if (commandName.toLowerCase() == "shortrest") {
    state.day--
    healingFactor = .5
    text = `\n[All characters have healed 50%]\n`
  } else {
    text = `\n[All characters have rested and feel rejuvinated. It's now day ${state.day}]\n`
  }

  state.characters.forEach(function(character) {
    var max = getHealthMax(character)
    character.health += Math.floor(max * healingFactor)
    if (character.health > max) character.health = max
  })
  state.show = "none"
  return [text, true]
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////// COMMAND FUNCTIONS - SYSTEM /////////////////////////////////////////////////

/**
 * Resets game state including notes, characters, difficulty, auto XP, and day.
 * @function
 * @param {string} [command] Command string (ignored).
 * @returns {[string, boolean]} Empty response and success flag.
 */
function doReset(command) {
  state.notes = []
  state.characters = []
  state.day = null

  state.show = "reset"
  return [" ", true]
}

/**
 * Shows the current version of the game or system.
 * @function
 * @param {string} [command] Command string (ignored).
 * @returns {[string, boolean]} Version string and success flag.
 */
function doVersion(command) {
  state.show = "none"
  return [`[${version}]`, true]
}

/**
 * Displays help information or a specific help section.
 * @function
 * @param {string} [command] Command string containing optional help topic.
 * @returns {[string, boolean]} Empty response and success flag.
 */
function doHelp(command) {
  const helpType = getArgument(command, 0)
  if (helpType) state.show = "help "
  else state.show = "help"
  return [" ", true]
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////// COMMAND FUNCTIONS - CHARACTER ///////////////////////////////////////////////

/**
 * Initializes the character creation process and resets temporary character data.
 * @function
 * @param {string} [command] Command string (ignored).
 * @returns {[string, boolean]} Empty response and success flag.
 */
function doCreate(command) {
  if (!hasCharacter(state.characterName)) createCharacter(state.characterName)
  var character = getCharacter()

  state.createStep = 0
  state.tempCharacter.name = character.name
  resetTempCharacterSkills() // Why for skills and not for stats?
  state.tempCharacter.stats = []
  state.tempCharacter.spells = []
  state.tempCharacter.inventory = [] // Use putIntoInventory() to add items
  state.tempCharacter.spellStat = null
  state.tempCharacter.meleeStat = "Strength"
  state.tempCharacter.rangedStat = "Dexterity"
  state.tempCharacter.ac = 10
  state.tempCharacter.damage = "1d6"
  state.tempCharacter.proficiency = 2
  
  state.show = "create"
  return [" ", true]
}

/**
 * Resets the temporary character's skills to default values.
 * @function
 */
function resetTempCharacterSkills() {
  state.tempCharacter.skills = [
    {name: "Acrobatics", stat: "Dexterity", modifier: 0},
    {name: "Animal Handling", stat: "Wisdom", modifier: 0},
    {name: "Arcana", stat: "Intelligence", modifier: 0},
    {name: "Athletics", stat: "Strength", modifier: 0},
    {name: "Deception", stat: "Charisma", modifier: 0},
    {name: "History", stat: "Intelligence", modifier: 0},
    {name: "Insight", stat: "Wisdom", modifier: 0},
    {name: "Intimidation", stat: "Charisma", modifier: 0},
    {name: "Investigation", stat: "Intelligence", modifier: 0},
    {name: "Medicine", stat: "Wisdom", modifier: 0},
    {name: "Nature", stat: "Intelligence", modifier: 0},
    {name: "Perception", stat: "Wisdom", modifier: 0},
    {name: "Performance", stat: "Charisma", modifier: 0},
    {name: "Persuasion", stat: "Charisma", modifier: 0},
    {name: "Religion", stat: "Intelligence", modifier: 0},
    {name: "Sleight of Hand", stat: "Dexterity", modifier: 0},
    {name: "Stealth", stat: "Dexterity", modifier: 0},
    {name: "Survival", stat: "Wisdom", modifier: 0},
  ]
}

/**
 * Renames the current character to a new name.
 * @function
 * @param {string} [command] Command string containing the new name.
 * @returns {[string, boolean]} Result message and success flag.
 */
function doRenameCharacter(command) {
  var character = getCharacter()
  var arg0 = getArgumentRemainder(command, 0)
  if (arg0 == null) {
    return ["\n[Error: Not enough parameters. See #help]\n", false]
  }
  var possessiveName = getPossessiveName(character.name)

  state.show = "none"
  var text = `\n[${possessiveName} name has been changed to ${arg0}]\n`

  character.name = arg0

  return [text, true]
}

/**
 * Clones the current character to a new character with a specified name.
 * @function
 * @param {string} [command] Command string containing the new character name.
 * @returns {[string, boolean]} Result message and success flag.
 */
function doCloneCharacter(command) {
  var character = getCharacter()

  var arg0 = getArgumentRemainder(command, 0)
  if (arg0 == null) {
    return ["\n[Error: Not enough parameters. See #help]\n", false]
  }

  if (!hasCharacter(arg0)) createCharacter(arg0)
  var newCharacter = getCharacter(arg0)
  copyCharacter(character, newCharacter)

  state.show = "none"
  var text = `\n[${character.name} has been cloned to a new character called ${newCharacter.name}]\n`

  return [text, true]
}

/**
 * Shows the biography screen for the current character.
 * @function
 * @param {string} [command] Command string (ignored).
 * @returns {[string, boolean]} Empty response and success flag.
 */
function doBio(command) {
  state.show = "bio"
  return [" ", true]
}

/**
 * Sets the class name for the current character.
 * @function
 * @param {string} [command] Command string containing the class name.
 * @returns {[string, boolean]} Result message and success flag.
 */
function doSetClass(command) {
  var character = getCharacter()
  var arg0 = getArgumentRemainder(command, 0)
  if (arg0 == null) {
    return ["\n[Error: Not enough parameters. See #help]\n", false]
  }

  var possessiveName = getPossessiveName(character.name)

  character.className = arg0

  state.show = "none"
  return [`\n[${possessiveName} class is set to "${character.className}"]\n`, true]
}


/**
 * Displays the list of characters.
 * @function
 * @param {string} [command] Command string (ignored).
 * @returns {[string, boolean]} Empty response and success flag.
 */
function doShowCharacters(command) {
  state.show = "characters"
  return [" ", true]
}

/**
 * Removes a character by name.
 * @function
 * @param {string} [command] Command string containing the character name to remove.
 * @returns {[string, boolean]} Result message and success flag.
 */
function doRemoveCharacter(command) {
  var arg0 = getArgumentRemainder(command, 0)
  if (arg0 == null) {
    return ["\n[Error: Not enough parameters. See #help]\n", false]
  }

  for (var i = 0; i < state.characters.length; i++) {
    var character = state.characters[i]
    if (character.name.toLowerCase() == arg0.toLowerCase()) {
      state.characters.splice(i, 1)
      state.show = "none"
      return [`[Character ${character.name} removed]`, true]
    }
  }

  return [`[Character ${arg0} was not found]`, true]
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////// COMMAND FUNCTIONS - LEVELS & EXP /////////////////////////////////////////////

/**
 * Sets a character's experience points to a specified value.
 * @function
 * @param {string} [command] Command string containing the experience amount.
 * @returns {[string, boolean]} Result message and success flag.
 */
function doSetExperience(command) {
  var character = getCharacter()
  var arg0 = getArgument(command, 0)
  if (arg0 == null) {
    return ["\n[Error: Not enough parameters. See #help]\n", false]
  }

  if (isNaN(arg0)) {
    return ["\n[Error: Not a number. See #help]\n", false]
  }

  var possessiveName = getPossessiveName(character.name)

  character.experience = parseInt(arg0)

  state.show = "none"
  return [`\n[${possessiveName} experience is set to ${character.experience}]\n`, true]
}

/**
 * Adds experience points to a character or the entire party.
 * @function
 * @param {string} [command] Command string containing experience amount and optionally "party".
 * @returns {[string, boolean]} Result message and success flag.
 */
function doAddExperience(command) {
  var character = getCharacter()
  var arg0 = getArgument(command, 0)
  if (arg0 == null) {
    return ["\n[Error: Not enough parameters. See #help]\n", false]
  }

  arg0 = searchArgument(command, /\d+/gi)
  if (arg0 == null) {
    return ["\n[Error: Expected a number. See #help]\n", false]
  }
  arg0 = parseInt(arg0)

  var arg1 = searchArgument(command, /party/gi)

  if (arg1 == null && character == null) {
    return [`\n[Error: Character name not specified. Use the "do" or "say" modes. Alternatively, use "story" mode in the following format without quotes: "charactername #hashtag"]\n`, false]
  }

  if (state.characters.length == 0) {
    return [`\n[Error: There are no characters. Type #setup to create a character]\n`, false]
  }

  state.prefix = "\n"
  characters = arg1 == null ? [character] : state.characters
  for (var c of characters) {
    var possessiveName = getPossessiveName(c.name)

    var level = getLevel(c.experience)
    c.experience += arg0
    var newLevel = getLevel(c.experience)

    if (newLevel > level) state.prefix += `[${possessiveName} experience is increased to ${c.experience}. LEVEL UP! Level: ${newLevel}, Health Max: ${getHealthMax(c)}. Next level at ${getNextLevelXp(c.experience)}]\n`
    else state.prefix += `[${possessiveName} experience is increased to ${c.experience}. Next level at ${getNextLevelXp(c.experience)}]\n`
  }

  state.show = "prefixOnly"
  return [" ", true]
}

/**
 * Levels up a character by granting enough experience to reach the next level.
 * @function
 * @param {string} [command] Command string (ignored except for context).
 * @returns {[string, boolean]} Result message and success flag.
 */
function doLevelUp(command) {
  var character = getCharacter()
  var level = getLevel(character.experience)
  var experience = level >= levelSplits.length ? 0 : levelSplits[level] - character.experience
  return doAddExperience(`${command} ${experience}`)
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////// COMMAND FUNCTIONS - ABILITIES & SKILLS //////////////////////////////////////////

/**
 * Sets or updates a character's stat with a specified value (1-100).
 * 
 * @function
 * @param {string} [command] Command text containing stat name and value.
 * @returns {[string, boolean]} Confirmation message and success status.
 */
function doSetStat(command) {
  var character = getCharacter()
  var arg0 = getArgument(command, 0)
  if (arg0 == null) {
    return ["\n[Error: Not enough parameters. See #help]\n", false]
  }
  var arg1 = clamp(parseInt(getArgument(command, 1)), 1, 100)
  var possessiveName = getPossessiveName(character.name)

  const stat = {
    name: arg0,
    value: arg1
  }

  var index = character.stats.findIndex((element) => element.name.toLowerCase() == stat.name.toLowerCase())
  if (index == -1) {
    character.stats.push(stat)
  } else {
    var existingStat = character.stats[index]
    existingStat.value = parseInt(stat.value)
  }

  state.show = "none"
  return [`\n[${possessiveName} ${toTitleCase(arg0)} ability is now ${arg1}]\n`, true]
}

/**
 * Shows the character stats UI section.
 * 
 * @function
 * @param {string} [command] Command text (ignored).
 * @returns {[string, boolean]} Placeholder string and success status.
 */
function doShowStats(command) {
  state.show = "stats"
  return [" ", true]
}

/**
 * Removes a specified stat from the character.
 * 
 * @function
 * @param {string} [command] Command text containing stat name to remove.
 * @returns {[string, boolean]} Confirmation or error message and success status.
 */
function doRemoveStat(command) {
  var character = getCharacter()
  var arg0 = getArgumentRemainder(command, 0)
  if (arg0 == "") {
    return ["\n[Error: Not enough parameters. See #help]\n", false]
  }
  var dontWord = character.name == "You" ? "don't" : "doesn't"
  var tryWord = character.name == "You" ? "try" : "tries"

  var found = character.stats.find((element) => element == arg0)
  if (found == null) return [`\n[${character.name} ${tryWord} to remove the ability ${arg0}, but ${character.name} ${dontWord} even know it]\n`, true]
  
  var index = character.stats.findIndex((element) => element.toLowerCase() == arg0.toLowerCase())
  character.stats.splice(index, 1)

  return [`\n[${character.name} removed the ability ${arg0}]\n`, true]
}

/**
 * Clears all stats from the character.
 * 
 * @function
 * @param {string} [command] Command text (ignored).
 * @returns {[string, boolean]} Placeholder string and success status.
 */
function doClearStats(command) {
  var character = getCharacter()
  character.stats = []
  state.show = "clearStats"
  return [" ", true]
}

/**
 * Sets or updates a skill for the character with an optional associated stat and modifier.
 * 
 * @function
 * @param {string} [command] Command text containing skill name, optional stat, and modifier.
 * @returns {[string, boolean]} Confirmation message or error and success status.
 */
function doSetSkill(command) {
  var character = getCharacter()
  var arg0 = getArgument(command, 0)
  if (arg0 == null) {
    return ["\n[Error: Not enough parameters. See #help]\n", false]
  }

  var arg1 = getArgument(command, 1)
  if (arg1 == null) {
    return ["\n[Error: Not enough parameters. See #help]\n", false]
  }

  var arg2 = getArgument(command, 2)
  if (arg2 == null) {
    arg2 = (clamp(parseInt(arg1, 1, 100)))
    arg1 = null
  } else {
    arg2 = clamp(parseInt(arg2), 1, 100)
  }

  var possessiveName = getPossessiveName(character.name)

  const skill = {
    name: arg0,
    stat: arg1,
    modifier: arg2
  }

  var index = character.skills.findIndex((element) => element.name.toLowerCase() == skill.name.toLowerCase())
  if (index == -1) {
    if (arg1 == null) {
      return ["\n[Error: New skills must have an ability specified. See #help]\n", false]
    }
    
    character.skills.push(skill)
  } else {
    var existingSkill = character.skills[index]
    existingSkill.modifier = parseInt(skill.modifier)
    if (arg1 != null) existingSkill.stat = skill.stat
  }

  state.show = "none"
  return [`\n[${possessiveName} ${toTitleCase(arg0)} skill is now ${arg2 >= 0 ? "+" + arg2 : "-" + arg2} and based on ${toTitleCase(arg1)}]\n`, true]
}

/**
 * Shows the character skills UI section.
 * 
 * @function
 * @param {string} [command] Command text (ignored).
 * @returns {[string, boolean]} Placeholder string and success status.
 */
function doShowSkills(command) {
  state.show = "skills"
  return [" ", true]
}

/**
 * Removes a specified skill from the character.
 * 
 * @function
 * @param {string} [command] Command text containing skill name to remove.
 * @returns {[string, boolean]} Confirmation or error message and success status.
 */
function doRemoveSkill(command) {
  var character = getCharacter()
  var arg0 = getArgumentRemainder(command, 0)
  if (arg0 == "") {
    return ["\n[Error: Not enough parameters. See #help]\n", false]
  }
  var dontWord = character.name == "You" ? "don't" : "doesn't"
  var tryWord = character.name == "You" ? "try" : "tries"

  var found = character.skills.find((element) => element == arg0)
  if (found == null) return [`\n[${character.name} ${tryWord} to remove the skill ${arg0}, but ${character.name} ${dontWord} even know it]\n`, true]
  
  var index = character.skills.findIndex((element) => element.toLowerCase() == arg0.toLowerCase())
  character.skills.splice(index, 1)

  return [`\n[${character.name} removed the skill ${arg0}]\n`, true]
}

/**
 * Clears all skills from the character.
 * 
 * @function
 * @param {string} [command] Command text (ignored).
 * @returns {[string, boolean]} Placeholder string and success status.
 */
function doClearSkills(command) {
  var character = getCharacter()
  character.skills = []
  state.show = "clearSkills"
  return [" ", true]
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////// COMMAND FUNCTIONS - NOTES /////////////////////////////////////////////////

/**
 * Shows the notes UI section.
 * @function
 * @param {string} [command] The command text (ignored).
 * @returns {[string, boolean]} Tuple with a placeholder string and true.
 */
function doShowNotes(command) {
  state.show = "showNotes"
  return [" ", true]
}

/**
 * Adds a note from the command text or, if empty, adds the last action text.
 * @function
 * @param {string} [command] The command text containing the note to add.
 * @returns {[string, boolean]} Tuple containing a success message and true.
 */
function doNote(command) {
  var arg0 = getArgumentRemainder(command, 0)
  
  if (arg0 != null && arg0.length > 0) {
    state.notes.push(arg0)
    state.show = "none"
    return ["\n[Note added successfully]\n", true]
  }
  state.notes.push(history[history.length - 1].text)
  state.show = "none"
  return ["\n[The last action was successfully added to the notes]\n", true]
}

/**
 * Clears all notes.
 * @function
 * @param {string} [command] The command text (ignored).
 * @returns {[string, boolean]} Tuple with a placeholder string and true.
 */
function doClearNotes(command) {
  state.notes = []
  
  state.show = "clearNotes"
  return [" ", true]
}


/**
 * Removes specified notes by their indexes.
 * @function
 * @param {string} [command] The command text containing note numbers to erase (e.g., "1 3 5").
 * @returns {[string, boolean]} Tuple containing removal confirmation messages or error and true/false.
 */
function doEraseNote(command) {
  var arg0 = getArgumentRemainder(command, 0)
  if (arg0 == null) arg0 = 1

  var list = arg0.split(/\D+/)
  list.sort(function(a, b) {
    return b - a, true
  });

  var text = "\n"
  list.forEach(x => {
    var num = parseInt(x) - 1
    if (num >= state.notes.length) {
      return [`\n[Error: Note ${x} does not exist. Type #shownotes]\n`, false]
    }

    state.notes.splice(num, 1)
    text += `[Note #${x} removed]\n`
  })
  
  state.show = "none"
  return [text, true]
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////// COMMAND FUNCTIONS - INVENTORY ///////////////////////////////////////////////

const HelpDialog_takeCommand = `
#take item_name
#take (quantity) item_name

-- Adds an instance of the specified item(s) to a character's inventory.
-- item_name must use "quotation" for names with spaces.
-- (quantity) is optional.

To create your own item cards, type: #help "create item"
`
/**
* Adds an instance of the specified item(s) to a character's inventory.
* @function
* @param {string} [command] (you|character) #take (quantity) item_name
* @returns {string} Text containing the result fo the action, or an error with (state.show = "none")
**/
function doTake(command) {
  let text = "\n"
  const character = getCharacter()
  const argQuantity = getArgument(command, 0)
  const argItemName = getArgument(command, 1) // Potential item_name
  if (argQuantity == null) {
    return ["\n[Error: Not enough parameters. See #help]\n", false]
  }

  // Handle non-numeric quantity input
  let [quantity, itemName] = parseQuantityAndName(argQuantity, argItemName, false)
  if (quantity == null || itemName == null || (itemName == argQuantity && argItemName)) {
    return ["\n[Error: Invalid quantity or item_name. See #help]\n", false]
  }

  const invItem = putItemIntoInventory(character, itemName, quantity)
  const displayItemName = singularize(itemName, quantity === 1)
  const displayHowMany = (quantity === 1) ? `the` : `${quantity}`;

  // Take text & Now have text
  const commandName = getCommandName(command) // "take"
  const displayCommandName = singularize(commandName, character.name == "You")
  text += `${character.name} ${displayCommandName} ${displayHowMany} ${displayItemName}. `
  text += `${character.name} now ${character.name == "You" ? "have" : "has"} ${invItem.quantity} ${singularize(itemName, invItem.quantity === 1)}.`

  return [text+`\n`, true]
}

const HelpDialog_rewards = `
Command Format: {{ (you|character) #loot (theme) }}
-- Randomly rolls a random item from a thematic loot table.
-- Automaticallt adds to character's inventory.
-- (theme) is optional; defualts to all story card items.
-- (theme) may also be an item category.
-- If (theme) is not found it defualts to all story card items.
-- If the theme contains spaces, wrap it in quotes (e.g. "ancient ruins").
-- The word 'the' can be used e.g. "#loot the orchard"`
/**
* Use this command to give the character random rewards from a loot table, or a pool of all items.
* @function
* @param {string} [command] Command Format: {{ (you|character) #loot (theme) }}
* @returns {string} Text containing the result fo the action, or an error with (state.show = "none")
**/
function doLoot(command) {
  let text = "\n"
  const character = getCharacter()
  command = command.replaceAll(/\s+((the))\s+/g, " ")
  let lootTheme = getArgumentRemainder(command, 0)

  /* <><> EXAMPLE OF Loot Table Story Card
  // (description JSON format inside loot table story card)
  [
    {"item": "twig", "chance": 1, "quantity": 5},
    {"item": "orange", "chance": 0.5, "quantity": 10},
    {"item": "sturdy stick", "chance": 0.5, "quantity": 1}
  ]
  */

  // Attempt to fill the loot table with items from a thematic loot table first
  let lootTable = []
  if (lootTheme) {
    let lootTableCards = getStoryCardListByType("loot table - " + lootTheme, true)[0]
    lootTable = lootTableCards ? JSON.parse(lootTableCards.description) : [];
  }

  // Fallback in case the player loots something without a loot table, or provides no theme
  if (lootTable.length < 1) {
    let itemCards = getStoryCardListByType("item - " + lootTheme, false); // try theme as item category
    if (itemCards.length < 1) { // Still no items? default to all items cards
      lootTheme = "area"
      itemCards = getStoryCardListByType("item - ", false);
    }
    itemCards.forEach(itemCard => {
      item = JSON.parse(itemCard.description);
      randomQuantity = getRandomInteger(1, 10) // TODO: Base quantity on an item property or rarity
      lootTable.push({
        item: item.itemName, 
        chance: item.rarity, 
        quantity: randomQuantity
      });
    });
  }

  // Sanity check
  if (lootTable.length < 1) {
    return [`\n[Error: There are not items in the loot table or story cards.]\n`, false]
  }

  // NOTE: Loot text entry should always logically follow the Textual prefix
  const commandName = getCommandName(command) // "explore", "travel"
  const displayCommandName = singularize(commandName, character.name == "You")
  text += `${character.name} ${displayCommandName} the ${lootTheme} and found `

  // Time to roll the ~Loot!
  const roll = getRandomFloat(0, 1);
  const possibleLoot = lootTable.filter(loot => roll <= loot.chance);
  if (possibleLoot.length > 0) {
    // TODO: Adjust for returning multiple items
    const randomLoot = possibleLoot[getRandomInteger(0, possibleLoot.length - 1)]; // One item only
    text += `${randomLoot.quantity} ${randomLoot.item}!`
    putItemIntoInventory(character, randomLoot.item, randomLoot.quantity) // Add to inventory automatically
  } else {
    text += "nothing!"
  }

  return [text+"\n", true]
}

const HelpDialog_doDrop = `
#drop (quantity or all|every) item_name
-- Removes the specified quantity of item from the character's inventory.
-- The words the, a, and an are ignored. Quotes are not necessary.
-- If a quantity is omitted, it's assumed to be 1.
-- Equipped items are unequipped.
`
/**
* - Removes the specified quantity of item from the character's inventory.
* @function
* @param {string} [command] (you|character) #drop (quantity|"all"|"every") item_name
* @returns {string} Text containing the result fo the action, or an error with (state.show = "none")
**/
function doDrop(command) {
  let text = "\n"
  const character = getCharacter()
  const argQuantity = getArgument(command, 0)
  const argItemName = getArgument(command, 1)
  if (argQuantity == null) {
    return ["\n[Error: Not enough parameters. See #help]\n", false]
  }

  // Handle non-numeric quantity input
  let [quantity, itemName] = parseQuantityAndName(argQuantity, argItemName)
  if (quantity == null || itemName == null || (itemName == argQuantity && argItemName)) {
    return ["\n[Error: Invalid quantity or item_name. See #help]\n", false]
  }

  // Remov the item and determine printing text
  const [invItem, removedQty] = removeItemFromInventory(character, itemName, quantity)
  const displayItemName = singularize(itemName, quantity === 1)
  const displayHowMany =  (quantity === 1) ? `the` : 
                          (quantity === Number.MAX_SAFE_INTEGER) ? `all of the` : 
                          (invItem?.quantity === 0) ? `all ${removedQty} of the` : `${quantity}`;

  // Invalid drop text
  const commandName = getCommandName(command) // "drop"
  const displayCommandName = singularize(commandName, character.name == "You")
  if (invItem == null) { // Not found, cannot drop
    const dontWord = character.name == "You" ? "don't" : "doesn't"
    return [`\n${character.name} tried to ${commandName} ${displayHowMany} ${displayItemName}, but ${dontWord} have any.\n`, true]
  }

  // Drop text & Remaining text
  text += `${character.name} ${displayCommandName} ${displayHowMany} ${displayItemName}.`
  if (invItem.quantity > 0) { // Only displays if not all X item was dropped
    text += ` ${character.name} now ${character.name == "You" ? "have" : "has"} ${invItem.quantity} ${singularize(itemName, invItem.quantity === 1)}.`
  }

  return [text+'\n', true]
}

const HelpDialog_doGive = `
#give other_character (quantity or all|every) item
-- Removes the quantity of item from the character's inventory and adds it to the other_character's inventory.
-- The words the, a, and an are ignored.
-- If a quantity is omitted, it's assumed to be 1.
-- Equipped items are unequipped.
`
/**
* - Removes the quantity of item from the character's inventory and adds it to the other_character's inventory.
* @function
* @param {string} [command] (you|character) #give other_character (quantity or all|every) item
* @returns {string} Text containing the result fo the action, or an error with (state.show = "none")
**/
function doGive(command) {
  let text = "\n"
  const character = getCharacter()
  const otherCharacter = getCharacter(getArgument(command, 0), false) // no fallback!
  if (otherCharacter == null) {
    return ["\n[Error: Target character does not exist. See #characters]\n", false]
  }

  const argQuantity = getArgument(command, 1)
  const argItemName = getArgument(command, 2)
  if (argQuantity == null) {
    return ["\n[Error: Not enough parameters. See #help]\n", false]
  }

  // Handle non-numeric quantity input
  let [quantity, itemName] = parseQuantityAndName(argQuantity, argItemName)
  if (quantity == null || itemName == null || (itemName == argQuantity && argItemName)) {
    return ["\n[Error: Invalid quantity or item_name. See #help]\n", false]
  }

  // Remove the item from the main character first
  const [removedItem, removedQty] = removeItemFromInventory(character, itemName, quantity)
  const displayItemName = singularize(itemName, quantity === 1)
  const displayHowMany =  (quantity === 1) ? `the` : 
                          (quantity === Number.MAX_SAFE_INTEGER) ? `all of the` : 
                          (removedItem.quantity === 0) ? `all ${removedQty} of the` : `${quantity}`;

  // Invalid drop text
  const commandName = getCommandName(command) // "drop"
  const displayCommandName = singularize(commandName, character.name == "You")
  if (removedItem == null) { // Not found, cannot drop
    const dontWord = character.name == "You" ? "don't" : "doesn't"
    return [`\n${character.name} tried to ${commandName} ${otherCharacter.name} ${displayHowMany} ${displayItemName}, but ${dontWord} have any.\n`, true]
  }

  // Now try to add the item to the other character's inventory, then printout
  const addedItem = putItemIntoInventory(otherCharacter, removedItem.itemName, removedQty)

  // Take text & Now have text
  text += `${character.name} ${displayCommandName} ${otherCharacter.name} ${displayHowMany} ${displayItemName}.`
  if (removedItem.quantity > 0) { // Only displays if not all X item was dropped
    text += ` ${character.name} now ${character.name == "You" ? "have" : "has"} ${removedItem.quantity} ${singularize(itemName, removedItem.quantity === 1)}.`
  }
  return [text+`\n`, true]
}

const HelpDialog_doBuy = `
#buy (buy_quantity) buy_item (for|with) sell_quantity sell_item
-- Adds the specified buy_quantity of the buy_item to the character's inventory and also removes the sell_quantity of sell_item.
-- If buy_quantity are omitted, it's assumed to be 1.
-- sell_quantity cannot be omitted!
-- Quotes are necessary for items with spaces in the name.
-- "my", "with", "for", "your" will be ignored.
-- sell_quantity can be "all", "every", "a", "an", "the", or number.
-- buy_quantity can only "a", "an", "the", or number.
`
/**
* - Adds the specified buy_quantity of the buy_item to the character's inventory and also removes the sell_quantity of sell_item.
* @function
* @param {string} [command] (you|character) #buy (buy_quantity) buy_item sell_quantity sell_item
* @returns {string} Text containing the result fo the action, or an error with (state.show = "none")
**/
function doBuy(command) {
  let text = "\n"
  const character = getCharacter()
  command = command.replaceAll(/\s+((for)|(with)|(my)|(your)|(their)|(his)|(her))\s+/g, " ")
  const args = getArguments(command, false)
  
  // Get the arguments from the command string
  let sellQuantity, sellItemName, buyQuantity, buyItemName
  [buyQuantity, buyItemName] = parseQuantityAndName(args[0], args[1], false)
  //TODO: Does this handle: #buy an item for all gold
  const index = buyItemName == args[0] ? 1 : 2
  sellQuantity = isNaN(args[index]) ? null : Number(args[index])
  sellItemName = isNaN(args[index+1]) ? args[index+1] ?? null : null
  sellItemName = index == 1 ? (args[index+2] == null ? sellItemName : null) : sellItemName
  if ([buyItemName, sellQuantity, sellItemName].includes(null)) {
    return ["\n[Error: Invalid parameters. See #help]\n", false]
  }

  buyItemName = singularize(buyItemName, true)
  sellItemName = singularize(sellItemName, true)

  // Display Names
  const commandName = getCommandName(command) // "drop"
  const displayBuyItemName = singularize(buyItemName, buyQuantity === 1)
  const displaySellItemName = singularize(sellItemName, sellQuantity === 1)
  const displayHowManyBuy =  (buyQuantity === 1) ? `one` : `${buyQuantity}`;

  // You can't buy X if you don't have enough Y
  const invItem = searchInventory(character, sellItemName)
  if (invItem?.quantity < sellQuantity) {
    const dontWord = character.name == "You" ? "don't" : "doesn't"
    return [`\n${character.name} tried to ${commandName} ${displayHowManyBuy} ${displayBuyItemName} for ${sellQuantity} ${displaySellItemName}, but ${dontWord} have enough ${displaySellItemName}.\n`, true]
  }

  // Attemopt to remove the sell item from inventory
  const [removedItem, removedQty] = removeItemFromInventory(character, sellItemName, sellQuantity)
  
  // Display text for selling amount, based on inventory removal
  const theirWord = character.name == "You" ? "your" : "their"
  const displayHowManySell =  (sellQuantity === 1) ? `one` : 
                          (sellQuantity === Number.MAX_SAFE_INTEGER) ? `all of ${theirWord}` : 
                          (removedItem.quantity === 0) ? `all ${removedQty} of ${theirWord}` : `${sellQuantity}`;

  // Invalid drop text
  if (removedItem == null) { // Not found, cannot drop
    const dontWord = character.name == "You" ? "don't" : "doesn't"
    return [`\n${character.name} tried to ${commandName} ${displayHowManyBuy} ${displayBuyItemName} for ${displayHowManySell} ${displaySellItemName}, but ${dontWord} have any ${singularize(sellItemName, false)}.\n`, true]
  }

  // Now try to add the item to the other character's inventory, then printout
  const addedItem = putItemIntoInventory(character, buyItemName, buyQuantity)

  // Take text & Now have text
  const displayCommandName = singularize(commandName, character.name == "You")
  text += `${character.name} ${displayCommandName} ${displayHowManyBuy} ${displayBuyItemName} for ${displayHowManySell} ${displaySellItemName}.`
  text += ` ${character.name} now ${character.name == "You" ? "have" : "has"} ${addedItem.quantity} ${singularize(addedItem.itemName, addedItem.quantity === 1)}, and`
  if (removedItem.quantity > 0) { // Only displays if not all X item was dropped
    text += ` now ${character.name == "You" ? "have" : "has"} ${removedItem.quantity} ${singularize(removedItem.itemName, removedItem.quantity === 1)} remaining.`
  } else {
    text += ` now ${character.name == "You" ? "have" : "has"} no more ${singularize(sellItemName, false)}.`
  }
  return [text+`\n`, true]
}

const HelpDialog_doSell = `
#sell (sell_quantity) sell_item (for|with) buy_quantity buy_item
-- Adds the specified buy_quantity of the buy_item to the character's inventory and also removes the sell_quantity of sell_item.
-- sell_quantity is optional, but buy_quantity cannot be omitted!
-- Quotes are necessary for items with spaces in the name.
-- "my", "with", "for", "your" will be ignored.
-- sell_quantity can be "all", "every", "a", "an", "the", or number.
-- buy_quantity can only "a", "an", "the", or number.
`
/**
* Adds the specified sell_quantity of the sell_item to the character's inventory and also removes the buy_quantity of buy_item.
* @function
* @param {string} [command] (you|character) #sell sell_quantity sell_item buy_quantity buy_item
* @returns {string} Text containing the result fo the action, or an error with (state.show = "none")
**/
function doSell(command) {
  const character = getCharacter()
  command = command.replaceAll(/\s+((for)|(with)|(my)|(your)|(their)|(his)|(her))\s+/g, " ")
  const args = getArguments(command, false)
  
  // Get the arguments from the command string - reverse of buy command
  let sellQuantity, sellItemName, buyQuantity, buyItemName
  [sellQuantity, sellItemName] = parseQuantityAndName(args[0], args[1])
  const index = sellItemName == args[0] ? 1 : 2

  //TODO: Does this handle: #sell all items for a gold
  buyQuantity = isNaN(args[index]) ? null : Number(args[index])
  buyItemName = isNaN(args[index+1]) ? args[index+1] ?? null : null
  buyItemName = index == 1 ? (args[index+2] == null ? buyItemName : null) : buyItemName
  if ([buyItemName, sellQuantity, sellItemName].includes(null)) {
    return ["\n[Error: Invalid parameters. See #help]\n", false]
  }
  // just call buy command to do the trade
  let text, success = null;
  [text, success] = doBuy(`${singularize("aquire", character.name == "You")} ${buyQuantity} ${buyItemName} ${sellQuantity} ${sellItemName}`)
  if (success) {
    text = text.slice(1,text.length) // slice off the newline prepended
    text = text.slice(character.name.length+1, text.length) // slice off the name prepended + space
    text = `\n${character.name} ${singularize(getCommandName(command), character.name == "You")}, and ` + text
  }
  return [text, success]
}

const HelpDialog_doRenameItem = `
#renameitem original_name new_name
-- Renames the item indicated by original_name to the new_name.
-- The quantity remains the same.
-- Quotes are necessary for names.
`
/**
* Renames the item indicated by original_name to the new_name.
* @function
* @param {string} [command] (you|character) #renameitem original_name new_name
* @returns {[string, boolean]} Tupple containing [text result of command, and successful execution flag]
**/
function doRenameItem(command) {
  const original_name = getArgument(command, 0)
  const new_name = getArgument(command, 1)

  if (original_name == null || new_name == null) {
    return ["\n[Error: Not enough parameters. See #help]\n", false]
  }

  // Text result to print
  const character = getCharacter()
  const hasWord = character.name == "You" ? "have" : "has"
  const possessiveName = getPossessiveName(character.name)
  let text = `\n[${possessiveName} ${original_name} ${hasWord} been renamed to ${new_name}]\n`

  // Attempt to rename item
  const invItem = searchInventory(character, original_name)
  if (invItem) {
    invItem.itemName = new_name
  } else {
    return [`\n[Error: ${character.name} ${hasWord} no item named "${original_name}". See #inventory]\n`, false]
  }

  // TODO: Rename items consideration
  // Inventory items are instances of 'items'
  // Should a renamed item create a new story card?

  state.show = "none"
  return [text, true]
}

const HelpDialog_doInventory = `
#inventory
-- Shows the items in the inventory of the character.
`
/**
* Sets the state to show the character's inventory in next output
* @function
* @param {string} [command] (you|character) #inventory
* @returns {[string, boolean]} Tupple containing [text result of command, and successful execution flag]
**/
function doInventory(command) {
  state.show = "inventory"
  return [" ", true]
}

/**
 * Clears all items from the active character's inventory.
 * 
 * @function
 * @param {string} [command] The command text (ignored in this function).
 * @returns {[string, boolean]} Tuple where:
 *   - string: Empty string placeholder (output controlled by UI state).
 *   - boolean: Always true.
 */
function doClearInventory(command) {
  var character = getCharacter()
  character.inventory = []
  state.show = "clearInventory"
  return [" ", true]
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////// COMMAND FUNCTIONS - SPELLS /////////////////////////////////////////////////

/**
 * Attempts to teach the active character a new spell.
 * If the spell is already known, returns a message stating so.
 * 
 * @function
 * @param {string} [command] The command text containing the spell name to learn.
 * @returns {[string, boolean]} Tuple where:
 *   - string: Message about the result of learning the spell.
 *   - boolean: true if the command was processed, false if invalid.
 */
function doLearnSpell(command) {
  var arg0 = getArgumentRemainder(command, 0)
  if (arg0 == "") {
    return ["\n[Error: Not enough parameters. See #help]\n", false]
  }

  var character = getCharacter()
  var tryWord = character.name == "You" ? "try" : "tries"

  var found = character.spells.find((element) => element == arg0)
  if (found != null) return [`\n[${character.name} ${tryWord} to learn the spell ${arg0}, but already knows it]\n`, true]

  character.spells.push(arg0)
  addStoryCard(arg0, "", "spell")

  return [`\n${character.name} learned the spell ${toTitleCase(arg0)}.\n`, true]
}

/**
 * Attempts to remove a spell from the active character's known spells.
 * If the spell is not known, returns a message stating so.
 * 
 * @function
 * @param {string} [command] The command text containing the spell name to forget.
 * @returns {[string, boolean]} Tuple where:
 *   - string: Message about the result of forgetting the spell.
 *   - boolean: true if the command was processed, false if invalid.
 */
function doForgetSpell(command) {
  var character = getCharacter()
  var arg0 = getArgumentRemainder(command, 0)
  if (arg0 == "") {
    return ["\n[Error: Not enough parameters. See #help]\n", false]
  }
  var dontWord = character.name == "You" ? "don't" : "doesn't"
  var tryWord = character.name == "You" ? "try" : "tries"

  var found = character.spells.find(x => x.toLowerCase() == arg0.toLowerCase())
  if (found == null) {
    state.show = "none"
    return [`\n[${character.name} ${tryWord} to forget the spell ${arg0}, but ${character.name} ${dontWord} even know it]\n`, true]
  }
  
  var index = character.spells.findIndex(x => x.toLowerCase() == arg0.toLowerCase())
  character.spells.splice(index, 1)

  state.show = "none"
  return [`\n[${character.name} forgot the spell ${arg0}]\n`, true]
}

/**
 * Attempts to cast a known spell, applying difficulty and advantage rules.
 * Performs a d20 roll (with modifiers) and determines success or failure.
 * Can optionally calculate and apply damage if a target is specified.
 * 
 * @function
 * @param {string} [command] The command text containing:
 *   - spell name
 *   - optional advantage/disadvantage
 *   - optional difficulty rating (name or numeric)
 *   - optional target
 * @returns {[string, boolean]} Tuple where:
 *   - string: Narrative result of the casting attempt.
 *   - boolean: true if the command was processed, false if invalid.
 */
function doCastSpell(command) {
  var character = getCharacter()
  const dontWord = character.name == "You" ? "don't" : "doesn't"
  const tryWord = character.name == "You" ? "try" : "tries"
  var usingDefaultDifficulty = false

  var spellIndex = 2;

  var advantage = searchArgument(command, arrayToOrPattern(advantageNames), spellIndex - 1)
  if (advantage == null) {
    advantage = "normal"
    spellIndex--
  }

  const difficultyPatternNames = [...new Set(difficultyNames)]
  difficultyPatternNames.push("\\d+")
  var difficulty = searchArgument(command, arrayToOrPattern(difficultyPatternNames), spellIndex - 1)
  if (difficulty == null) {
    difficulty = defaultDifficulty
    usingDefaultDifficulty = true
    spellIndex--
  }
  var difficultyIndex = difficultyNames.indexOf(difficulty)
  if (difficultyIndex >= 0 && difficultyIndex < difficultyNames.length) {
    difficulty = difficultyScores[difficultyIndex]
  }

  var spell = getArgument(command, spellIndex)
  if (spell == null) {
    return ["\n[Error: Not enough parameters. See #help]\n", false]
  }
  var targetText = null

  var found = character.spells.find(x => x.toLowerCase() == spell.toLowerCase())
  if (found != null) {
    targetText = getArgumentRemainder(command, spellIndex + 1)
    if (targetText != null) {
      targetText = targetText.trim()
      if (!/^((at)|(on))\s+.*/.test(targetText)) targetText = "at " + targetText
    }
  } else {
    var remainder = getArgumentRemainder(command, spellIndex)
    if (/.*\s((at)|(on))\s.*/i.test(remainder)) {
      spell = remainder.replace(/\s+((at)|(on)).*/i, "").trim()
      targetText = remainder.replace(/^.*\s+(?=(at)|(on))/i, "").trim()
    } else {
      spell = getArgumentRemainder(command, spellIndex).trim()
    }

    found = character.spells.find(x => x.toLowerCase() == spell.toLowerCase())
  }

  if (found == null) {
    state.show = "none"
    return [`\n[${toTitleCase(character.name)} ${tryWord} to cast the spell ${spell}, but ${character.name == "You" ? "you" : toTitleCase(character.name)} ${dontWord} know it]\n`, true]
  }

  var text = `${character.name} cast the spell ${spell}${advantage != "normal" ? " with " + advantage : ""}${targetText == null ? "" : " " + targetText}.`

  var modifier = 0
  if (character.spellStat != null) {
    var stat = character.stats.find((element) => element.name.toLowerCase() == character.spellStat.toLowerCase())
    if (stat != null) modifier = getModifier(stat.value)
  }

  var roll1 = calculateRoll("d20")
  var roll2 = calculateRoll("d20")
  var roll = advantage == "advantage" ? Math.max(roll1, roll2) : advantage == "disadvantage" ? Math.min(roll1, roll2) : roll1

  if (targetText != null) {
    var damage = roll == 20 ? calculateRoll("2d6") + calculateRoll("2d6") : calculateRoll("2d6")

    var damageMatches = targetText.match(/\d*d\d+((\+|-)d+)?/gi)
    if (damageMatches != null) damage = roll == 20 ? calculateRoll(damageMatches[0]) + calculateRoll(damageMatches[0]) : calculateRoll(damageMatches[0])
    else {
      damageMatches = targetText.match(/\d+/g)
      if (damageMatches != null) damage = roll == 20 ? parseInt(damageMatches[damageMatches.length - 1]) * 2 : parseInt(damageMatches[damageMatches.length - 1])
    }
  }

  state.show = "prefix"
  var dieText = advantage == "advantage" || advantage == "disadvantage" ? `${advantage}(${roll1},${roll2})` : roll1
  var difficultyWord = targetText == null ? "Difficulty" : "Armor"
  if (difficulty == 0) state.prefix = ""
  else if (roll == 20) state.prefix = `\n[${difficultyWord} Class: ${difficulty}. Roll: ${dieText}. Critcal Success!]\n`
  else if (roll == 1) state.prefix = `\n[${difficultyWord} Class: ${difficulty}. Roll: ${dieText}. Critcal Failure!]\n`
  else if (modifier != 0) state.prefix = `\n[${difficultyWord} Class: ${difficulty}. Roll: ${dieText}${modifier > 0 ? "+" + modifier : modifier}=${roll + modifier}. ${roll + modifier >= difficulty ? "Success!" : "Failure!"}]\n`
  else state.prefix = `\n[${difficultyWord} Class: ${difficulty}. Roll: ${dieText}. ${roll + modifier >= difficulty ? "Success!" : "Failure!"}]\n`
  
  if (roll == 20) text += ` Critical success!`
  else if (roll == 1) text += ` Critical failure! The spell ${targetText != null ? "misses" : "fails"} in a spectacular way.`
  else if (roll + modifier >= difficulty) text += ` The spell ${targetText != null ? "hits the target" : "is successful"}!`
  else text += ` The spell ${targetText != null ? "misses" : "fails"}!`

  if (difficulty > 0 && (roll + modifier >= difficulty || roll == 20)) text += addXpToAll(Math.floor(autoXp * clamp(difficulty, 1, 20) / 20))
  return [`\n${text}\n`, true]
}

/**
 * Clears all known spells from the active character.
 * 
 * @function
 * @param {string} [command] The command text (ignored in this function).
 * @returns {[string, boolean]} Tuple where:
 *   - string: Empty string placeholder (output controlled by UI state).
 *   - boolean: Always true.
 */
function doClearSpells(command) {
  var character = getCharacter()
  character.spells = []
  state.show = "clearSpells"
  return [" ", true]
}

/**
 * Displays the spellbook view for the active character.
 * 
 * @function
 * @param {string} [command] The command text (ignored in this function).
 * @returns {[string, boolean]} Tuple where:
 *   - string: Empty string placeholder (output controlled by UI state).
 *   - boolean: Always true.
 */
function doSpellbook(command) {
  state.show = "spellbook"
  return [" ", true]
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////// COMMAND FUNCTIONS - COMBAT /////////////////////////////////////////////////

/**
* Rolls a random encounter from a thematic encounter table.
* @function
* @param {string} [command] Command string like "(you|character) #encounter theme"
* @returns {[string,boolean]} Tuple where:
*   - string: Narrative result of the encounter.
*   - boolean: true if the command was processed, false if invalid.
*/
function doEncounter(command) {
  let text = "\n"
  const character = getCharacter()
  command = command.replaceAll(/\s+((the))\s+/g, " ")
  const encounterTheme = getArgumentRemainder(command, 0)
  if (!encounterTheme) {
    return ["\n[Error: Not enough parameters. See #help]\n", false]
  }

  const encounterTableCard = getStoryCardListByType("encounter table - " + encounterTheme, true);
  if (encounterTableCard.length < 1) {
    return [`\n[Error: No encounter tables found with that theme.]\n`, false]
  }

  /* <><> EXAMPLE OF Encounter Table Story Card
  // (description JSON format inside story card)
  [
    {"encounter": "the city and finds a gold on the ground.", "chance": 0.5},
    {"encounter": "the city and two suspicous individuals appraoch.", "chance": 0.5}
  ]
  */
  let encounterTable = [];
  encounterTable = JSON.parse(encounterTableCard[0].description);
  if (encounterTable.length < 1) {
    return [`\n[Error: There is no encounters in the loot table.]\n`, false]
  }

  // Time to roll the ~Encounter!
  const roll = getRandomFloat(0, 1);
  let randomEncounter = {encounter: "without issue.", chance: 1} // Default encounter if we roll none
  const possibleEncounters = encounterTable.filter(encounter => roll <= encounter.chance);
  if (possibleEncounters.length > 0) {
    randomEncounter = possibleEncounters[getRandomInteger(0, possibleEncounters.length - 1)];
  }

  // NOTE: Encounter text entry should always logically follow the Textual prefix above
  const commandName = getCommandName(command) // "explore", "travel"
  const displayCommandName = singularize(commandName, character.name == "You")
  text += `${character.name} ${displayCommandName} `+randomEncounter.encounter

  return [text+"\n", true]
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////// COMMAND FUNCTIONS - COMABT (DISABLED) //////////////////////////////////////////

function doEquip(command) {
  // Recalculate the character's equipment bonuses (based on D&D 5e logic)

  // TODO: Add the category and rairty of an item into it's JSON details
  // -- We can't tell what an item is from the invItem details
  // -- Since only the item story card type contains the category

  // NOW, technically in D&D a character would attack with X wepaon
  // BUT, (damage/hitBonus/etc) character values
  // -- I assume the idea is to make the #attack command easier
  // -- If that's the case, then what about a specific #equip command for weapons
  // ...
  // TODO: Add an argument to #equip to handle equipment slots, like: (#equip itemName as weapon)
  // -- This way, even if we can't tell if an item is a (weapon, armor, etc), we will know how the character intends to use it
  // ...

  // NOW, technically in D&D a character's hit bonus would be calculated as:
  // -- character's base proficiency bonus + character's ability modifier for weapon's ability type + weapon's hit bonus
  // -- however, if a character is not proficient with a weapon type, they don't get thier character's base proficiency bonus
  // BUT, our character code doesn't have a proficiency bonus, nor any proficiency types (at least not yet)
  // SO, we'll just use: character's ability modifier for weapon's ability type + weapon's hit bonus

  // NOW, technically in D&D a character's base AC is typically 10 + their Dexterity modifier
  // -- Wearing armor changes the base AC value (i.e. light armor has a base of 11)
  // -- However! Some armors don't allow the Dexterity bonus, or restrict it (i.e. heavy armor)
  // -- However! Shields and some items have plus bonus's to AC which stack (i.e. shields give +2 AC)
  // BUT, we can't tell if an item is a armor piece from the invItem details
  // -- also our items only have an acBonus value, not a acBase value (tho we could assume)
  // -- only item story card type contains the category, and categories are ambiguous at best
  // ...
  // TODO: Add an argument to #equip to handle equipment slots, like: (#equip itemName as armor)
  // -- This way, even if we can't tell if an item is a (shield, armor, etc), we will know how the character intends to use it
  // -- now, for AC we need two or three slots:
  // -- -- an armor slot for the base AC (only allows one item)
  // -- -- a shield slot for the shield's AC bonus (only allows one)
  // -- -- a misc slot for any other item's AC bonus (allows many)
  // ...

  // NOW, technically in D&D character's don't have equipment slots, but there are restrictions
  // -- like off-hand attacks not having the character's base proficiency bonus on damage (normally)
  // -- only one armor and one shield may confer a bonus (shields also take up a hand)
  // -- two-handing and two-handed weapons (damage and hand occupation)
  // -- And there is more...
  // BUT, for now our character code can't handle any of these restrictions, nor does our #attack command
  // -- Something to look into later down the line when we can handle more complexities
  // SO, for now, we'll just use equipment slots as a makeshift implementation
  // -- (1 weapon, 1 armor, 1 shield, and then misc items)

  // ----
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////// DO NOT TOUCH - DEVELOPER TEST ZONE! //////////////////////////////////////////////

// If you want to develop; Replace with DEVELOPER TEST ZONE from TestZone.js
function doTest(command) {
  state.show = "none" // Hide output in AI Dungeon GUI
  return ["You have no test cases! :P Did you forget to replace this with TestZone.js?", true]
}

// AI DUNGEON -- Don't modify this part
modifier(text)