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
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

const commandRegistry = [
    // <><> General
    { handler: doRoll,                  synonyms: ["roll"] },
    { handler: doTry,                   synonyms: ["try", "tryto", "tries", "triesto", "attempt", "attemptto", "attemptsto", "do"] },
    { handler: doSetDefaultDifficulty,  synonyms: ["setdefaultdifficulty", "defaultdifficulty", "setdefaultdc", "defaultdc", "setdefaultac", "defaultac", "setdifficulty", "difficulty", "dc"] },
    { handler: doShowDefaultDifficulty, synonyms: ["showdefaultdifficulty", "showdefaultdc", "showdefaultac"] },
    
    // <><> Time
    { handler: doShowDay,               synonyms: ["showday", "showdate", "day", "date"] },
    { handler: doSetDay,                synonyms: ["setday", "setdate"] },
    
    // System
    { handler: doReset,                 synonyms: ["reset", "cleandata", "cleardata", "resetdata", "resetsettings", "clearsettings", "profile"] },
    { handler: doVersion,               synonyms: ["version", "ver", "showversion"] },
    { handler: doTest,                  synonyms: ["testcode", "debug"]},
    { handler: doHelp,                  synonyms: ["help"] },
    
    // <><> Character
    { handler: doCreate,                synonyms: ["create", "generate", "start", "begin", "setup", "party", "member", "new"] },
    { handler: doRenameCharacter,       synonyms: ["renamecharacter", "renameperson"] },
    { handler: doCloneCharacter,        synonyms: ["clone", "clonecharacter", "cloneperson", "copycharacter", "copyperson", "duplicatecharacter", "duplicateperson", "dupecharacter", "dupeperson"] },
    { handler: doBio,                   synonyms: ["bio", "biography", "summary", "character", "charactersheet", "statsheet"] },
    { handler: doSetClass,              synonyms: ["setclass", "class"] },
    { handler: doSetSummary,            synonyms: ["setsummary", "summary"] },
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
    { handler: doSetSpellStat,          synonyms: ["setspellstat", "setspellstatistic", "setspellability", "setspellcastingability", "changespellstat", "changespellstatistic", "changespellability", "changespellcastingability"] },
    { handler: doSetSkill,              synonyms: ["setskill", "changeskill", "updateskill", "skill"] },
    { handler: doShowSkills,            synonyms: ["showskills", "skills"] },
    { handler: doRemoveSkill,           synonyms: ["removeskill", "deleteskill", "cancelskill"] },
    { handler: doClearSkills,           synonyms: ["clearskills"] },
    { handler: doCheck,                 synonyms: ["check", "checkstat", "checkstatistic", "checkattribute", "checkability", "checkskill", "skillcheck", "abilitycheck"] },
    
    // <><> Notes
    { handler: doShowNotes,             synonyms: ["notes", "shownotes", "viewnotes"] },
    { handler: doNote,                  synonyms: ["note", "takenote", "setnote", "createnote", "remember"] },
    { handler: doClearNotes,            synonyms: ["clearnotes"] },
    { handler: doEraseNote,             synonyms: ["erasenote", "removenote", "deletenote", "cancelnote"] },
    
    // <><> Inventory
    { handler: doTake,                  synonyms: ["take", "steal", "get", "grab", "receive", "loot"] },
    { handler: doBuy,                   synonyms: ["buy", "purchase", "barter", "trade", "swap", "exchange"] },
    { handler: doSell,                  synonyms: ["sell"] },
    { handler: doDrop,                  synonyms: ["remove", "discard", "drop", "leave", "dispose", "toss", "throw", "throwaway", "trash", "donate", "eat", "consume", "use", "drink", "pay", "lose"] },
    { handler: doGive,                  synonyms: ["give", "handover", "hand", "gift"] },

    { handler: doRenameItem,            synonyms: ["rename", "renameitem", "renameobject", "renamegear", "renameequipment"] },
    { handler: doInventory,             synonyms: ["inv", "inventory", "backpack", "gear", "showinv", "showinventory", "viewinventory", "viewinv"] },
    { handler: doClearInventory,        synonyms: ["clearinventory", "clearinv", "emptyinventory", "emptybackpack", "clearbackpack", "emptygear", "cleargear"] },
    { handler: doReward,                synonyms: ["reward"] },
    
    // <><> Spells
    { handler: doLearnSpell,            synonyms: ["learnspell", "learnmagic", "learnincantation", "learnritual", "memorizespell", "memorizemagic", "memorizeincantation", "memorizeritual", "learnsspell", "learnsmagic", "learnsincantation", "learnsritual", "memorizesspell", "memorizesmagic", "memorizesincantation", "memorizesritual", "learn"] },
    { handler: doForgetSpell,           synonyms: ["forgetspell", "forgetmagic", "forgetincantation", "forgetritual", "forgetsspell", "forgetsmagic", "forgetsincantation", "forgetsritual", "deletespell", "deletemagic", "deleteincantation", "deleteritual", "deletesspell", "deletesmagic", "deletesincantation", "deletesritual", "cancelspell", "cancelmagic", "cancelincantation", "cancelritual", "cancelsspell", "cancelsmagic", "cancelsincantation", "cancelsritual", "removespell", "removemagic", "removeincantation", "removeritual", "removesspell", "removesmagic", "removesincantation", "removesritual", "forget"] },
    { handler: doCastSpell,             synonyms: ["cast", "castspell", "castmagic", "castincantation", "castritual", "castsspell", "castsmagic", "castsincantation", "castsritual"] },
    { handler: doClearSpells,           synonyms: ["clearspells", "clearmagic", "clearincantations", "clearrituals", "forgetallspells", "forgetallmagic", "forgetallincantation", "forgetallritual"] },
    { handler: doSpellbook,             synonyms: ["spellbook", "spells", "listspells", "showspells", "spelllist", "spellcatalog", "spellinventory"] },
    
    // <><> Combat
    // PLAN: Replace health/damage/ac system with injury system
    // Wepaons have injury types which source from injury tables, armor has injury resistance
    // This will allow us to introduce damage types (something not present)
    // The injury system will be narrative based, not turn based (A deviation from D&D)
    // This removes the need for players to book-keep encounters, memorize command sequences, and allow free-form combat

    // As I am in the middle of overhauling equip, items, and inventory; the injury mechanic will have to wait
    // However, to preapre for it, and to avoid needless overhauling, I'll be striping the following commands:
    // doTurn, doInitiative, doRepeatTurn, doFlee
    // 
    // What can be done after the removals?
    // Allies and Enemies may still be created, viewed, edited, and such
    // Health & Damage commands should work just fine (for manual combat)
    // doAttack and doBlock, may be broken in the meantime

    // <><> Character Actions in Combat
    // { handler: doAttack,                synonyms: ["attack", "strike", "ambush", "assault", "fireat", "fireon"] },
    // { handler: doBlock,                 synonyms: ["block", "parry", "nullify", "invalidate"] },

    // <><> TTRPG Mechanics
    { handler: doEncounter,             synonyms: ["encounter", "startencounter"] }, //TODO: Make like thematic loot tables (no need for entity creation anymore)

    // <><> Health & Damage
    // { handler: doHeal,                  synonyms: ["heal", "mend", "restore"] },
    // { handler: doDamage,                synonyms: ["damage", "hurt", "harm", "injure"] },
    // { handler: doHealParty,             synonyms: ["healparty", "healcharacters"] },
    { handler: doRest,                  synonyms: ["rest", "longrest", "shortrest", "sleep", "nap"] },

    // <><> Character Combat Values
    // { handler: doSetHealth,             synonyms: ["sethealth"] },
    // { handler: doSetMeleeStat,          synonyms: ["setmeleestat", "setmeleestatistic", "setmeleeability", "changemeleestat", "changemeleestatistic", "changemeleeability"] },
    // { handler: doSetRangedStat,         synonyms: ["setrangedstat", "setrangedstatistic", "setrangedability", "changerangedstat", "changerangedstatistic", "changerangedability"] },
    // { handler: doSetAc,                 synonyms: ["setac", "setarmorclass", "ac", "armorclass"] },
    // { handler: doSetDamage,             synonyms: ["setdamage"] },
    // { handler: doSetProficiency,        synonyms: ["setproficiency", "setweaponproficiency"] },
    { handler: doEquip,                 synonyms: ["equip", "arm", "wear"] }
];

// Helper: Look up command handler from registry
function findCommandHandler(commandName) {
  for (let entry of commandRegistry) {
    if (entry.synonyms.some(s => s === commandName || s + "s" === commandName)) {
      return entry.handler
    }
  }
  return null
}

const articleSynonyms = ["a", "an", "the"]
const allSynonyms = ["all", "every", "each", "every one", "everyone"]
const turnSynonyms = ["turn", "doturn", "taketurn"]
const createSynonyms = ["create", "generate", "start", "begin", "setup", "party", "member", "new"]
const checkSynonyms = ["check", "checkstat", "checkstatistic", "checkattribute", "checkability", "checkskill", "skillcheck", "abilitycheck"]
const trySynonyms = ["try", "tryto", "tries", "triesto", "attempt", "attemptto", "attemptsto", "do"]

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

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
  text = sanitizeText(text)

  // Extracts "flavor text" after a newline.
  // Keeps the #command separated from the rest of the input.
  // This is later appended back after processing the command.
  let lineBreakIndex = text.indexOf("\n")
  let flavorText = null
  if (lineBreakIndex > -1) {
    flavorText = text.substring(lineBreakIndex + 1)
    if (!flavorText.startsWith(" ")) flavorText = " " + flavorText
    text = text.substring(0, lineBreakIndex)
  } else {
    flavorText = null
  }

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
  const hasHandler = findCommandHandler(commandName)

  if (!exists && !isCreateCommand) {
    state.show = "none"
    text = hasChar
      ? `\n[Error: Character ${state.characterName} does not exist. Type #setup to create this character]\n`
      : youNeedACharacter
    return text
  }

  if (!hasChar && isCreateCommand && !hasHandler) {
    state.show = "none"
    text = youNeedACharacter
    return text
  }
  // ------
  
  // Command Processing Block
  let commandResult, commandSuccess = null;
  for (const { synonyms, handler } of commandRegistry) {
    [commandResult, commandSuccess] = processCommandSynonyms(command, commandName, synonyms, handler);
    if (commandResult != null) break;
  }
  if (!commandSuccess) state.show = "none"; // If a command fails, do not show output
  text = commandResult

  // Return with falavor added back in
  if (flavorText != null) text += flavorText;
  return text;
}

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

        state.createStep++
      }
      return text
    case 3:
      if (text.length == 0) state.createStep++
      if (!isNaN(text)) {
        switch (parseInt(text)) {
          case 1:
            state.tempCharacter.spellStat = "Intelligence"
            break
          case 2:
            state.tempCharacter.spellStat = "Wisdom"
            break
          case 3:
            state.tempCharacter.spellStat = "Charisma"
            break
          case 4:
            state.tempCharacter.spellStat = null
        }
        state.createStep++
      }
      return text
    case 4:
      if (text.length > 0) {
        state.tempCharacter.summary = text
        state.createStep = 500
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
          putItemIntoInventory(character, {itemName:item.name}, item.quantity)
        });
        state.tempCharacter.summary = presetCard.entry
        state.tempCharacter.spellStat = entity.spellStat
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
      character.spellStat = state.tempCharacter.spellStat
      character.meleeStat = state.tempCharacter.meleeStat
      character.rangedStat = state.tempCharacter.rangedStat
      character.summary = state.tempCharacter.summary
      break
  }
  return text
}

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

function processCommandSynonyms(command, commandName, synonyms, func) {
  let result, success = null
  synonyms.forEach(x => {
    if (commandName == x || commandName == x + "s") {
      [result, success] = func(command)
    }
  })
  return [result, success]
}

function init() {
  if (state.tempCharacter == null) {
    state.tempCharacter = {
      name: "template",
      className: "adventurer",
      summary: "Template character not meant to be used.",
      inventory: [],
      spells: [],
      stats: [],
      spellStat: null,
      meleeStat: null,
      rangedStat: null,
      experience: 0,
      health: 10,
      ac: 10,
      damage: "1d6",
      proficiency: 2
    }
  }
  
  if (state.characters == null) state.characters = []
  if (state.notes == null) state.notes = []
  if (state.autoXp == null) state.autoXp = 0
  if (state.defaultDifficulty == null) state.defaultDifficulty = 10
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

function doCreate(command) {
  if (!hasCharacter(state.characterName)) createCharacter(state.characterName)
  var character = getCharacter()

  state.createStep = 0
  state.tempCharacter.name = character.name
  resetTempCharacterSkills() // Why for skills and not for stats?
  state.tempCharacter.stats = []
  state.tempCharacter.spells = []
  state.tempCharacter.inventory = [] // Anything that goes into the inventory must go through doTake()!
  state.tempCharacter.spellStat = null
  state.tempCharacter.meleeStat = "Strength"
  state.tempCharacter.rangedStat = "Dexterity"
  state.tempCharacter.ac = 10
  state.tempCharacter.damage = "1d6"
  state.tempCharacter.proficiency = 2
  
  state.show = "create"
  return [" ", true]
}

function doBio(command) {
  state.show = "bio"
  return [" ", true]
}

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

function doSetSpellStat(command) {
  var character = getCharacter()
  var arg0 = getArgument(command, 0)
  if (arg0 == null) {
    return ["\n[Error: Not enough parameters. See #help]\n", false]
  }

  character.spellStat = arg0

  state.show = "none"
  return [`\nSpellcasting Ability is set to ${arg0}\n`, true]
}

function doSetMeleeStat(command) {
  var character = getCharacter()
  var arg0 = getArgument(command, 0)
  if (arg0 == null) {
    return ["\n[Error: Not enough parameters. See #help]\n", false]
  }

  character.meleeStat = arg0

  state.show = "none"
  return [`\nMelee Ability is set to ${arg0}\n`, true]
}

function doSetRangedStat(command) {
  var character = getCharacter()
  var arg0 = getArgument(command, 0)
  if (arg0 == null) {
    return ["\n[Error: Not enough parameters. See #help]\n", false]
  }

  character.rangedStat = arg0

  state.show = "none"
  return [`\nRanged Ability is set to ${arg0}\n`, true]
}

function doSetAutoXp(command) {
  var arg0 = getArgument(command, 0)
  if (arg0 == null) {
    return ["\n[Error: Not enough parameters. See #help]\n", false]
  }
  if (isNaN(arg0)) {
    return ["\n[Error: Expected a number. See #help]\n", false]
  }

  state.autoXp = Math.max(0, arg0)

  state.show = "none"
  return [state.autoXp <= 0 ? `\n[Auto XP is disabled]\n` : `\n[Auto XP is set to ${state.autoXp}]\n`, true]
}

function doShowAutoXp(command) {
  state.show = "none"
  return [state.autoXp <= 0 ? `\n[Auto XP is disabled]\n` : `\n[Auto XP is set to ${state.autoXp}]\n`, true]
}

function doSetDefaultDifficulty(command) {
  const difficultyNames = ["impossible", "extreme", "hard", "medium", "easy", "effortless", "veryeasy", "very easy", "automatic", "auto"]
  const difficultyScores = [30, 25, 20, 15, 10, 5, 5, 5, 0, 0]

  const difficultyPatternNames = [...new Set(difficultyNames)]
  difficultyPatternNames.push("\\d+")
  var difficulty = getArgument(command, 0)
  if (difficulty == null) difficulty = "easy"

  var difficultyIndex = difficultyNames.indexOf(difficulty)
  if (difficultyIndex >= 0 && difficultyIndex < difficultyNames.length) {
    difficulty = difficultyScores[difficultyIndex]
  }

  state.defaultDifficulty = Math.max(0, difficulty)

  state.show = "none"
  return [`\n[The default difficulty is set to ${state.defaultDifficulty}]\n`, true]
}

function doShowDefaultDifficulty(command) {
  state.show = "none"
  return [`\n[The default difficulty is set to ${state.defaultDifficulty}]\n`, true]
}

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

function doSetAc(command) {
  var character = getCharacter()
  var arg0 = getArgument(command, 0)
  if (arg0 == null) {
    return ["\n[Error: Not enough parameters. See #help]\n", false]
  }

  if (isNaN(arg0)) {
    return ["\n[Error: Not a number. See #help]\n", false]
  }

  var possessiveName = getPossessiveName(character.name)

  character.ac = parseInt(arg0)

  state.show = "none"
  return [`\n[${possessiveName} armor class is set to ${character.ac}]\n`, true]
}

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

function doLevelUp(command) {
  var character = getCharacter()
  var level = getLevel(character.experience)
  var experience = level >= levelSplits.length ? 0 : levelSplits[level] - character.experience
  return doAddExperience(`${command} ${experience}`)
}

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

function doSetSummary(command) {
  var character = getCharacter()
  var arg0 = getArgumentRemainder(command, 0)
  if (arg0 == null) {
    return ["\n[Error: Not enough parameters. See #help]\n", false]
  }

  var possessiveName = getPossessiveName(character.name)

  character.summary = arg0

  state.show = "none"
  return [`\n[${possessiveName} summary is set]\n`, true]
}

function doSetHealth(command) {
  var character = getCharacter()
  var arg0 = getArgument(command, 0)
  if (arg0 == null) {
    return ["\n[Error: Not enough parameters. See #help]\n", false]
  }

  var possessiveName = getPossessiveName(character.name)

  character.health = arg0
  character.health = clamp(character.health, 0, getHealthMax())

  state.show = "none"
  return [`\n[${possessiveName} health is set to ${character.health} health]\n`, true]
}

function doHeal(command) {
  var character = getCharacter()
  var arg0 = getArgument(command, 0)
  if (arg0 == null) {
    return ["\n[Error: Not enough parameters. See #help]\n", false]
  }

  var arg1 = getArgumentRemainder(command, 1)
  
  if (arg1 == null) {
    if (character == null) {
      return ["\n[Error: Character must be specified. See #help]\n", false]
    }

    var healing

    var healingMatches = arg0.match(/\d*d\d+((\+|-)d+)?/gi)
    if (healingMatches != null) healing = calculateRoll(healingMatches[0])
    else {
      healingMatches = arg0.match(/\d+/g)
      if (healingMatches != null) healing = parseInt(healingMatches[healingMatches.length - 1])
    }

    if (healing == null) {
      return ["\n[Error: Expected a number. See #help]\n", false]
    }

    var haveWord = character.name == "You" ? "have" : "has"

    character.health += healing
    character.health = clamp(character.health, 0, getHealthMax())

    state.show = "none"
    return [`\n[${character.name} ${haveWord} been healed for ${healing} hp to a total of ${character.health}]\n`, true]
  } else {
    var healing

    var healingMatches = arg0.match(/\d*d\d+((\+|-)d+)?/gi)
    if (healingMatches != null) healing = calculateRoll(healingMatches[0])
    else {
      healingMatches = arg0.match(/\d+/g)
      if (healingMatches != null) healing = parseInt(healingMatches[0])
    }

    if (healing == null) {
      return ["\n[Error: Expected a number. See #help]\n", false]
    }

    for (var character of state.characters) {
      if (character.name.toLowerCase() == arg1.toLowerCase()) {
        character.health += healing
        character.health = clamp(character.health, 0, getHealthMax(character))
        state.show = "none"
        return [`\n[${toTitleCase(character.name)} has been healed for ${healing} hp to a total of ${character.health}]\n`, true]
      }
    }

    return [`\n[Error: Could not find an enemy, ally, or character matching the name ${arg1}. Type #enemies, #allies, or #characters to see a list]`, false]
  }
}

function doDamage(command) {
  var character = getCharacter()
  var arg0 = getArgument(command, 0)
  if (arg0 == null) {
    return ["\n[Error: Not enough parameters. See #help]\n", false]
  }

  var arg1 = getArgumentRemainder(command, 1)
  
  if (arg1 == null) {
    if (character == null) {
      return ["\n[Error: Character must be specified. See #help]\n", false]
    }

    var damage

    var damageMatches = arg0.match(/\d*d\d+((\+|-)d+)?/gi)
    if (damageMatches != null) damage = calculateRoll(damageMatches[0])
    else {
      damageMatches = arg0.match(/\d+/g)
      if (damageMatches != null) damage = parseInt(damageMatches[damageMatches.length - 1])
    }

    if (damage == null) {
      return ["\n[Error: Expected a number. See #help]\n", false]
    }

    var haveWord = character.name == "You" ? "have" : "has"

    character.health -= damage
    character.health = clamp(character.health, 0, getHealthMax())

    state.show = "none"
    return [`\n[${character.name} ${haveWord} been damaged for ${damage} hp with ${character.health} remaining] ${character.health == 0 ? " You are unconscious" : ""}\n`, true]
  } else {
    var damage

    var damageMatches = arg0.match(/\d*d\d+((\+|-)d+)?/gi)
    if (damageMatches != null) damage = calculateRoll(damageMatches[0])
    else {
      damageMatches = arg0.match(/\d+/g)
      if (damageMatches != null) damage = parseInt(damageMatches[0])
    }

    if (damage == null) {
      return ["\n[Error: Expected a number. See #help]\n", false]
    }

    for (var character of state.characters) {
      if (character.name.toLowerCase() == arg1.toLowerCase()) {
        character.health = Math.max(0, character.health - damage)
        state.show = "none"
        return [`\n[${toTitleCase(character.name)} has been damaged for ${damage} hp with ${character.health} remaining] ${character.health == 0 ? " " + toTitleCase(character.name) + " is unconcious!" : ""}\n`, true]
      }
    }
    
    return [`\n[Error: Could not find an enemy, ally, or character matching the name ${arg1}. Type #enemies, #allies, or #characters to see a list]`, false]
  }
}

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

function doHealParty(command) {
  var arg0 = getArgument(command, 0)
  if (arg0 == null) {
    return ["\n[Error: Not enough parameters. See #help]\n", false]
  }

  var healing
  var healingMatches = arg0.match(/\d*d\d+((\+|-)d+)?/gi)
  if (healingMatches != null) healing = calculateRoll(healingMatches[0])
  else {
    healingMatches = arg0.match(/\d+/g)
    if (healingMatches != null) healing = parseInt(healingMatches[healingMatches.length - 1])
  }

  if (healing == null) {
    return ["\n[Error: Expected a number. See #help]\n", false]
  }

  var text = `\n[All characters have been healed by ${healing}.]\n`
  state.characters.forEach(function(character) {
    var max = getHealthMax(character)
    character.health += healing
    if (character.health > max) character.health = max
    text += `[${toTitleCase(character.name)}: ${character.health} / ${max} health]\n`
  })
  state.show = "none"
  return [text, true]
}

function doCheck(command) {
  const advantageNames = ["normal", "advantage", "disadvantage"]
  const difficultyNames = ["impossible", "extreme", "hard", "medium", "easy", "effortless", "veryeasy", "very easy", "automatic", "auto"]
  const difficultyScores = [30, 25, 20, 15, 10, 5, 5, 5, 0, 0]
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
  if (arg2 == null) arg2 = state.defaultDifficulty
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

function doTry(command) {
  if (getArguments(command).length <= 1) {
    return ["\n[Error: Not enough parameters. See #help]\n", false]
  }

  const advantageNames = ["normal", "advantage", "disadvantage"]
  const difficultyNames = ["impossible", "extreme", "hard", "medium", "easy", "effortless", "veryeasy", "very easy", "automatic", "auto"]
  const difficultyScores = [30, 25, 20, 15, 10, 5, 5, 5, 0, 0]
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
    arg2 = state.defaultDifficulty
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
  
  if (score + modifier >= target || score == 20) text += addXpToAll(Math.floor(state.autoXp * clamp(target, 1, 20) / 20)) + "\n"
  return [text, true]
}

function doAttack(command) {
  const advantageNames = ["normal", "advantage", "disadvantage"]
  const difficultyNames = ["impossible", "extreme", "hard", "medium", "easy", "effortless", "veryeasy", "very easy", "automatic", "auto"]
  const difficultyScores = [30, 25, 20, 15, 10, 5, 5, 5, 0, 0]
  var character = getCharacter()
  var textIndex = 3
  var missWord = character.name == "You" ? "miss" : "misses"
  var tryWord = character.name == "You" ? "try" : "tries"
  var usingDefaultDifficulty = false

  var statText = null
  statText = searchArgument(command, /ranged/gi, textIndex - 1)
  if (statText == null) {
    statText = character.meleeStat
    textIndex--
  } else if (statText.toLowerCase() == "ranged") statText = character.rangedStat
  statText = toTitleCase(statText)
  
  var advantageText = searchArgument(command, arrayToOrPattern(advantageNames), textIndex - 1)
  if (advantageText == null) {
    advantageText = "normal"
    textIndex--
  }
  else advantageText = advantageText.toLowerCase()

  const difficultyPatternNames = [...new Set(difficultyNames)]
  difficultyPatternNames.push("\\d+")
  var difficultyText = searchArgument(command, arrayToOrPattern(difficultyPatternNames), textIndex - 1)
  if (difficultyText == null) {
    difficultyText = state.defaultDifficulty
    usingDefaultDifficulty = true
    textIndex--
  }
  else difficultyText = difficultyText.toLowerCase()

  var targetText = getArgumentRemainder(command, textIndex)
  if (targetText == null) {
    return ["\n[Error: Not enough parameters. See #help]\n", false]
  }
  var toMatches = targetText.match(/^to\s+/gi)
  if (toMatches != null) targetText = targetText.substring(toMatches[0].length)
  targetText = stripPunctuation(targetText)

  var die1 = calculateRoll("1d20")
  var die2 = calculateRoll("1d20")
  var score = advantageText == "advantage" ? Math.max(die1, die2) : advantageText == "disadvantage" ? Math.min(die1, die2) : die1

  var modifier = 0

  var stat = character.stats.find(x => x.name.toLowerCase() == statText.toLowerCase())
  modifier = character.proficiency
  if (stat != null) modifier += getModifier(stat.value)

  var targetRoll = 15
  if (/^\d+$/.test(difficultyText)) targetRoll = difficultyText
  else {
    var targetIndex = difficultyNames.indexOf(difficultyText)
    if (targetIndex >= 0 && targetIndex < difficultyNames.length) targetRoll = difficultyScores[targetIndex]
  }

  var damage
  if (/^\d*d\d+((\+|-)d+)?$/gi.test(character.damage)) damage = score == 20 ? calculateRoll(character.damage) + calculateRoll(character.damage) : calculateRoll(character.damage)
  else damage = parseInt(character.damage)

  var damageMatches = targetText.match(/\d*d\d+((\+|-)d+)?/gi)
  if (damageMatches != null) damage = score == 20 ? calculateRoll(damageMatches[0]) + calculateRoll(damageMatches[0]) : calculateRoll(damageMatches[0])
  else {
    damageMatches = targetText.match(/\d+/g)
    if (damageMatches != null) damage = score == 20 ? parseInt(damageMatches[damageMatches.length - 1]) * 2 : parseInt(damageMatches[damageMatches.length - 1])
  }

  var dieText = advantageText == "advantage" || advantageText == "disadvantage" ? `${advantageText}(${die1},${die2})` : die1

  state.show = "prefix"
  
  if (targetRoll == 0) state.prefix = ""
  else if (score == 20) state.prefix = `\n[Target AC: ${targetRoll} Attack roll: ${dieText}]\n`
  else if (score == 1) state.prefix = `\n[Target AC: ${targetRoll} Attack roll: ${dieText}]\n`
  else if (modifier != 0) state.prefix = `\n[Target AC: ${targetRoll} Attack roll: ${dieText}${modifier > 0 ? "+" + modifier : modifier}=${score + modifier}. ${score + modifier >= targetRoll ? "Success!" : "Failure!"}]\n`
  else state.prefix = `\n[Target AC: ${targetRoll} Attack roll: ${dieText}. ${score >= targetRoll ? "Success!" : "Failure!"}]\n`

  var text
  if (score + modifier >= targetRoll) text = `\n${toTitleCase(character.name)} successfully hit ${targetText}!`
  else text = `\n${toTitleCase(character.name)} ${tryWord} to hit ${targetText}. ${toTitleCase(character.name)} ${missWord}!`

  if (score == 20) text += " Critical success! The attack is exceptionally damaging!"
  else if (score == 1) text += " Critical failure! The attack missed in a spectacular way!"

  if (targetRoll > 0 && (score + modifier >= targetRoll || score == 20)) text += addXpToAll(Math.floor(state.autoXp * clamp(targetRoll, 1, 20) / 20))
  return [text + "\n", true]
}

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

function doShowNotes(command) {
  state.show = "showNotes"
  return [" ", true]
}

function doShowDay(command) {
  state.show = "none"
  return [`\n[It is day ${state.day}]\n`, true]
}

function doSetDay(command) {
  var arg0 = getArgument(command, 0)
  if (arg0 == null || isNaN(arg0)) {
    return ["\n[Error: Not enough parameters. See #help]\n", false]
  }

  state.day = parseInt(arg0)

  state.show = "none"
  return [`\n[The day has been set to day ${state.day}]\n`, true]
}

function doEncounter(command) {
  var arg0 = getArgument(command, 0)
  if (arg0 == null) {
    arg0 = "easy"
  }

  var encounter = createEncounter(arg0)
  var text = `\n${encounter.text}\n`
  return [text, true]
}

function doBlock(command) {
  if (state.blockCharacter == null) {
    return ["\n[Error: No attack to block. See #help]\n", false]
  }

  var character = state.characters.find(x => x.name.toLowerCase() == state.blockCharacter.name.toLowerCase())
  if (character == null) {
    return ["\n[Error: Character no longer exists. See #help]\n", false]
  }

  character.health = state.blockPreviousHealth

  var properName = toTitleCase(character.name)
  state.show = "prefix"
  state.prefix = `[${properName} has ${character.health} health]`
  return [`\nHowever, the damage to ${properName} was blocked!\n`, true]
}

const helpDialog_itemStoryCards = `
<><> Item Story Cards <><>
* Every item should be an "Item" type story card, and must include a category and rarity.
* Format each item story card as follows:
  -- Type: {{ Item - Category - Rarity }}
  -- Title: The name of the item.
  -- Entry: A brief description to help the AI understand what this item represents.
  -- Keywords: For unique items only. Avoid common words or phrases!
  -- Description: Use JSON to define item behavior and reward values.

Example JSON format:
{
  "itemName": "Orange",
  "minRewardAmount": 1,
  "maxRewardAmount": 10,
  "rewardChance": 1,
  "worth": 100,
  "dmgDice": "1d4",
  "hitBonus": 0,
  "ability":"none",
  "acBonus": 0
}`
// NOTE: Needs to review all places where items are interacted with!
// NOTE: Should not contain plurals
// NOTE: could store category and rarity
const defaultItemDetails = {
    itemName: "Orange",
    minRewardAmount: 1, // For #Reward command
    maxRewardAmount: 1, // -- Restrict to one
    rewardChance: 0,    // -- No chance
    worth: 0,
    dmgDice: "1d4", // Can be a number
    hitBonus: 0,
    ability: "none",
    acBonus: 0,
    quantity: 1 // Inventory value (or added upon taking)
}
const HelpDialog_createItem = `
#createitem item_name
#createitem (quantity) item_name
#createitem (quantity) (ac_bonus) item_name
#createitem (quantity) (damage_dice) (hit_bonus) (ability) item_name
#createitem (quantity) (damage_dice) (hit_bonus) (ability) (ac_bonus) item_name
-- Creates a story card for an item using specified values, or use default ones.
-- If a story card with the same name already exists, then the create fails.

Notes:
- (damage_dice) can be a number (e.g. "4") or a dice string like "1d4".
- Use quotes for item_name and ability if they contain spaces.

To manually create your own item cards, type: #help "item story cards"
`
/**********|
* Creates a story card for an item using specified values, or use default ones.
* @function
* @param {string} [command] #createitem item_name (quantity) (damage_dice) (hit_bonus) (ability) (ac_bonus)
* @returns {string} Text containing the result fo the action, or an error with (state.show = "none")
***********/
//TODO: This function would allow players to more easily create items, without having to manually create story cards
// We could have this function command hold all the values, or we could step the player through a item creation form
function doCreateItem(command) {
  const args = getArguments(command)
  let itemIndex = -1
  state.show = "none" // Never display output after this input
  if (!args.length) {
    return ["\n[Error: No arguments provided. See #help]\n", false]
  }

  // New Item with default values!
  let newItem = { ...defaultItemDetails }

  // 6-arg format: Full description of the item
  // #take (quantity) (damage_dice) (hit_bonus) (ability) (ac_bonus) item_name
  if (args.length == 6) {
    newItem.quantity = parseInt(args[0])
    newItem.dmgDice = args[1]
    newItem.hitBonus = parseInt(args[2])
    newItem.ability = args[3]
    newItem.acBonus = parseInt(args[4])
    itemIndex = 5
  }
  // 5-arg format: Like #takeWeapon
  // #take (quantity) (damage_dice) (hit_bonus) (ability) item_name
  else if (args.length == 5) {
    newItem.quantity = parseInt(args[0])
    newItem.dmgDice = args[1]
    newItem.hitBonus = parseInt(args[2])
    newItem.ability = args[3]
    itemIndex = 4
  }
  // 3-arg format: Like #takeArmor
  // #take (quantity) (ac_bonus) item_name
  else if (args.length === 3) {
    newItem.quantity = parseInt(args[0])
    newItem.acBonus = parseInt(args[1])
    itemIndex = 2
  }
  // 2-arg format: #take X items
  // #take (quantity) item_name
  else if (args.length == 2) {
    newItem.quantity = parseInt(args[0])
    itemIndex = 1
  }
  // 1-arg format: #take item
  // #take item_name
  // itemIndex = 0

  // Set the item name from the itemIndex
  const argRemainder = getArgumentRemainder(command, itemIndex) // +1 is added to the index inside
  const replacedArg = argRemainder.replace(/^((the)|(a)|(an))\s/i, "")
  newItem.itemName = singularize(replacedArg, true) // Name assignment
  if (!newItem.quantity || isNaN(newItem.quantity) || newItem.quantity < 1) {
    newItem.quantity = 1
  }
  
  // Check and build item
  newItem = checkItemCards(newItem) // Returns an updated item (and builds story card if needed)
  // TODO: Some kind of repsonse to the player
  if (newItem) return [`${item.itemName} was succesfully created!`, true]
  else return [`ERROR: ${item.itemName} was not created: A story card with that name already exists!`, false]
}

const HelpDialog_takeCommand = `
#take item_name
#take (quantity) item_name

-- Adds an instance of the specified item(s) to a character's inventory.
-- item_name must use "quotation" for names with spaces.
-- (quantity) is optional.

To create your own item cards, type: #help "create item"
`
/**********|
* Adds an instance of the specified item(s) to a character's inventory.
* @function
* @param {string} [command] (you|character) #take (quantity) item_name
* @returns {string} Text containing the result fo the action, or an error with (state.show = "none")
***********/
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

  const invItem = putItemIntoInventory(character, {itemName:itemName}, quantity)
  const displayItemName = singularize(itemName, quantity === 1)
  const displayHowMany = (quantity === 1) ? `the` : `${quantity}`;

  // Take text & Now have text
  const commandName = getCommandName(command) // "take"
  const displayCommandName = singularize(commandName, character.name == "You")
  text += `${character.name} ${displayCommandName} ${displayHowMany} ${displayItemName}. `
  text += `${character.name} now ${character.name == "You" ? "have" : "has"} ${invItem.quantity} ${singularize(itemName, invItem.quantity === 1)}.`

  return [text+`\n`, true]
}

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

// A helper function for creating items
// TODO: Commented out until I find a use for this.
// function createItem(itemName,
//   minRewardAmount=defaultItemDetails.minRewardAmount,
//   maxRewardAmount=defaultItemDetails.maxRewardAmount,
//   rewardChance=defaultItemDetails.rewardChance,
//   worth=defaultItemDetails.worth,
//   dmgDice=defaultItemDetails.dmgDice,
//   hitBonus=defaultItemDetails.hitBonus,
//   ability=defaultItemDetails.ability,
//   acBonus=defaultItemDetails.acBonus,
//   quantity=defaultItemDetails.quantity,
//   itemCategory = "Misc",
//   itemRarity = "Uncommon",) {
//   const newItem = {
//       itemName: itemName,
//       minRewardAmount: minRewardAmount, // For #Reward command
//       maxRewardAmount: maxRewardAmount, // -- 
//       rewardChance: rewardChance,       // -- 
//       worth: worth,
//       dmgDice: dmgDice, // Can be a number
//       hitBonus: hitBonus,
//       ability: ability,
//       acBonus: acBonus,
//       quantity: quantity // Inventory value (or added upon taking)
//   }
//   return checkItemCards(newItem)
// }

const helpDialog_lootStoryCards = `
<><> Loot Table Story Cards <><>
* Thematic loot tables control the quantity and chance of rewards.
* Format each loot table story card as follows:
  -- Type: {{ LootTable - Theme }}
  -- Title: {{ LootTable - Theme }}
  -- Entry: A short explanation of what this loot table thematically represents.
  -- Keywords: Leave blank!
  -- Description: A JSON array containing item story card JSONs.

Example JSON format: #help "item story cards"
Note: rewardChance is a float from 0 to 1.
1 = 100% chance. 0.1 = 10% chance.`

const HelpDialog_rewards = `
#Reward Command Format: {{ (you|character) #reward (quantity) (theme) }}
-- Use this command to give the character random rewards from a loot table.
-- (quantity) is optional; defaults to 1.
-- (theme) is optional; defualts to all story card items.
-- If the theme contains spaces, wrap it in quotes (e.g. "ancient ruins").
-- Special Case: If (theme = item), all items are used directly, skipping loot tables.
-- Cheat Case: You can filter directly using the follow as themes:
     "item - (category)"
     "item - (category) - (rarity)"

To create your own:
Type #help "item story cards"
Type #help "loot story cards"
`
/**********|
* Use this command to give the character random rewards from a loot table, or a pool of all items.
* @function
* @param {string} [command] #Reward Command Format: {{ (you|character) #reward (quantity) (theme) }}
* @returns {string} Text containing the result fo the action, or an error with (state.show = "none")
***********/
function doReward(command) {
  let text = "\n"
  const character = getCharacter()
  let rewardQuantity = getArgument(command, 0)

  // Check the rewardQuantity argument, and get the rewardTheme
  let rewardTheme = "Item -" // Defaults to all items later
  if (isNaN(rewardQuantity)) { // rewardQuantity arg was the theme
    rewardQuantity = 1
    rewardTheme = getArgumentRemainder(command, 0)
  } else { // else quantity was a number
    rewardQuantity = parseInt(rewardQuantity, 10)
    if (rewardQuantity < 1) {
      rewardQuantity = 1
    }
    const nextArgument = getArgumentRemainder(command, 1)
    rewardTheme =  nextArgument ? nextArgument.toLowerCase() : rewardTheme.toLowerCase()
  }

  let lootTable = [];
  if (rewardTheme.startsWith("item -")) { // use all "item" story cards as the lootTable
    lootTable = getStoryCardListByType(rewardTheme, false).map(card => JSON.parse(card.description));
  } else {
    const lootCard = getStoryCardListByType("loot table - " + rewardTheme, true)[0];
    if (!lootCard) {
      return [`\n[Error: No loot tables found in the story cards with that theme.]\n`, false]
    }
    lootTable = JSON.parse(lootCard.description);
  }

  if (lootTable.length < 1) {
    return [`\n[Error: There is no loot in the loot table.]\n`, false]
  }

  // Time to roll the ~Loot!
  const totalRewards = {};
  for (let i = 0; i < rewardQuantity; i++) {
    const roll = getRandomFloat(0, 1);
    const possibleDrops = lootTable.filter(item => roll <= item.rewardChance);

    if (possibleDrops.length > 0) {
      const drop = possibleDrops[getRandomInteger(0, possibleDrops.length - 1)];
      const randomAmount = getRandomInteger(drop.minRewardAmount, drop.maxRewardAmount);
      const newAmount = (totalRewards[drop.itemName] ? totalRewards[drop.itemName].quantity : 0) + randomAmount
      totalRewards[drop.itemName] = {item: drop, quantity: newAmount};
    }
  }

  // Return text block and inventory add
  text += `${character.name} found while searching ${rewardTheme.includes("item -") ? "for items" : "the " + rewardTheme}:`;

  const rewardEntries = Object.entries(totalRewards)
  if (rewardEntries.length < 1) return text += " nothing!";
  rewardEntries.forEach(([itemKey, reward], index) => {
    putItemIntoInventory(character, reward.item); // INVENTORY <---
    if (reward.quantity > 1) {
      text += ` ${reward.quantity} ${singularize(itemKey, false)}`;
    } else {
      const article = /^[aeiou]/i.test(itemKey) ? "an" : "a";
      text += ` ${article} ${itemKey}`;
    }
    text += `${index < rewardEntries.length-1 ? "," : "."}`
  })
  return [text, true]
}

const HelpDialog_doEquip = `
#equip item_name slot
-- Equips an item in the character's inventory for a given slot.
-- item_name must be an exact match the the inventory item's name.
-- Equiped items change the character's damage/hit/ac values respectively based on slot.
-- Slots are:
-- -- "wepaon" - changes hit bonus, damage dice, ability mod (only one wepaon may be equiped) 
-- -- "armor"  - changes base ac (only one armor may be equiped)

To create your own:
Type #help "item take"
Type #help "item story cards"
`
// NEEDS REVIEW after item card changes
// Since I've removed the itemShop, there may be some broken logic here
function doEquip(command) {
  let character = getCharacter()
  const itemName = getArgument(command, 0)
  const slotType = getArgument(command, 1)
  if (itemName == null || slotType == null) {
    return ["\n[Error: Not enough parameters. See #help]\n", false]
  }
  // At this point we assume that every item in the character's inventory has gone through putItemIntoInventory()
  // Thus, there is no need to check all the various properties or story cards for it
  const invItem = character.inventory.find((element) => element.name.toLowerCase() === itemName.toLowerCase())

  const dontWord = character.name == "You" ? "don't" : "doesn't"
  if (invItem == null) return [`${character.name} tried to equip ${toTitleCase(itemName)}, but ${dontWord} possess it.`, true]

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

  // Equip the item!
  let text = `\n${character.name} equipped the item ${toTitleCase(invItem.itemName)}!\n`

  // Slot types
  // TODO: Add slots for shields, and accessories
  switch (slotType.toLowerCase()) {
    case "weapon":
      let abilityValue = character.stats.find((element) => element.name.toLowerCase() == invItem.ability)
      let ability = abilityValue == null ? 10 : abilityValue.value
      let abilityModifier = Math.ceil((ability - 10) / 2)
      let damageBase = invItem.dmgDice.replaceAll(/\+.*/gi, "")
      let damageModifier = parseInt(invItem.dmgDice.replaceAll(/.*\+/gi, "")) + abilityModifier
      character.damage = `${damageBase}+${damageModifier}`
      character.proficiency = invItem.hitBonus + abilityModifier
      character.meleeStat = invItem.ability
      break;

    case "armor":
      let dexterityStat = character.stats.find((element) => element.name.toLowerCase() == "dexterity")
      let dexterity = dexterityStat == null ? 10 : dexterityStat.value
      let ac = parseInt(invItem.acBonus.replaceAll(/(?<=.)\+.*/gi, ""))
      if (/.*\+dmax2/i.test(invItem.acBonus)) character.ac = ac + Math.max(2, Math.ceil((dexterity - 10) / 2))
      else if (/.*\+d/i.test(invItem.acBonus)) character.ac = ac + Math.ceil((dexterity - 10) / 2)
      else if (/\+.*/i.test(invItem.acBonus)) character.ac += ac
      else character.ac = ac
      break;
  
    default:
      state.show = "none"
      text = `\n${character.name} cannot equip the item ${toTitleCase(invItem.itemName)} as ${slotType}!\n`
      break;
  }
  
  text += "\n"
  return [text, true]
}

const HelpDialog_doDrop = `
#drop (quantity or all|every) item_name
-- Removes the specified quantity of item from the character's inventory.
-- The words the, a, and an are ignored. Quotes are not necessary.
-- If a quantity is omitted, it's assumed to be 1.
-- Equipped items are unequipped.
`
/**********| Removes the specified quantity of item from the character's inventory.
* @function
* @param {string} [command] (you|character) #drop (quantity|"all"|"every") item_name
* @returns {string} Text containing the result fo the action, or an error with (state.show = "none")
***********/
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

const HelpDialog_doGive = `
#give other_character (quantity or all|every) item
-- Removes the quantity of item from the character's inventory and adds it to the other_character's inventory.
-- The words the, a, and an are ignored.
-- If a quantity is omitted, it's assumed to be 1.
-- Equipped items are unequipped.
`
/**********| Removes the quantity of item from the character's inventory and adds it to the other_character's inventory.
* @function
* @param {string} [command] (you|character) #give other_character (quantity or all|every) item
* @returns {string} Text containing the result fo the action, or an error with (state.show = "none")
***********/
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
  const addedItem = putItemIntoInventory(otherCharacter, {... removedItem}, removedQty)

  // Take text & Now have text
  text += `${character.name} ${displayCommandName} ${otherCharacter.name} ${displayHowMany} ${displayItemName}.`
  if (removedItem.quantity > 0) { // Only displays if not all X item was dropped
    text += ` ${character.name} now ${character.name == "You" ? "have" : "has"} ${removedItem.quantity} ${singularize(itemName, removedItem.quantity === 1)}.`
  }
  return [text+`\n`, true]
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
/**********| doBuy - 
* Adds the specified buy_quantity of the buy_item to the character's inventory and also removes the sell_quantity of sell_item.
* @function
* @param {string} [command] (you|character) #buy (buy_quantity) buy_item sell_quantity sell_item
* @returns {string} Text containing the result fo the action, or an error with (state.show = "none")
***********/
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
  const invItem = character.inventory.find((element) => element.itemName.toLowerCase() === sellItemName.toLowerCase())
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
  const addedItem = putItemIntoInventory(character, {itemName: buyItemName}, buyQuantity)

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
/**********| doSell - 
* Adds the specified sell_quantity of the sell_item to the character's inventory and also removes the buy_quantity of buy_item.
* @function
* @param {string} [command] (you|character) #sell sell_quantity sell_item buy_quantity buy_item
* @returns {string} Text containing the result fo the action, or an error with (state.show = "none")
***********/
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
  let text, success = null
  [text, success] = doBuy(`${singularize("aquire", character.name == "You")} ${buyQuantity} ${buyItemName} ${sellQuantity} ${sellItemName}`)
  if (!success) {
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
/**********| doRenameItem - 
* Renames the item indicated by original_name to the new_name.
* @function
* @param {string} [command] (you|character) #renameitem original_name new_name
* @returns {[string, boolean]} Tupple containing [text result of command, and successful execution flag]
***********/
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
  const index = character.inventory.findIndex((element) => element.itemName.toLowerCase() == original_name.toLowerCase())
  if (index >= 0 ) {
    character.inventory[index].itemName = new_name
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
/**********| doInventory - 
* Sets the state to show the character's inventory in next output
* @function
* @param {string} [command] (you|character) #inventory
* @returns {[string, boolean]} Tupple containing [text result of command, and successful execution flag]
***********/
function doInventory(command) {
  state.show = "inventory"
  return [" ", true]
}

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

function doCastSpell(command) {
  const advantageNames = ["normal", "advantage", "disadvantage"]
  const difficultyNames = ["impossible", "extreme", "hard", "medium", "easy", "effortless", "veryeasy", "very easy", "automatic", "auto"]
  const difficultyScores = [30, 25, 20, 15, 10, 5, 5, 5, 0, 0]
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
    difficulty = state.defaultDifficulty
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

  if (difficulty > 0 && (roll + modifier >= difficulty || roll == 20)) text += addXpToAll(Math.floor(state.autoXp * clamp(difficulty, 1, 20) / 20))
  return [`\n${text}\n`, true]
}

function doShowCharacters(command) {
  state.show = "characters"
  return [" ", true]
}

function doSpellbook(command) {
  state.show = "spellbook"
  return [" ", true]
}

function doShowSkills(command) {
  state.show = "skills"
  return [" ", true]
}
function doShowStats(command) {
  state.show = "stats"
  return [" ", true]
}

function doClearNotes(command) {
  state.notes = []
  
  state.show = "clearNotes"
  return [" ", true]
}

function doClearInventory(command) {
  var character = getCharacter()
  character.inventory = []
  state.show = "clearInventory"
  return [" ", true]
}

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

function doClearSpells(command) {
  var character = getCharacter()
  character.spells = []
  state.show = "clearSpells"
  return [" ", true]
}

function doClearStats(command) {
  var character = getCharacter()
  character.stats = []
  state.show = "clearStats"
  return [" ", true]
}

function doClearSkills(command) {
  var character = getCharacter()
  character.skills = []
  state.show = "clearSkills"
  return [" ", true]
}

function doVersion(command) {
  state.show = "none"
  return [`[${version}]`, true]
}

function doSetDamage(command) {
  var character = getCharacter()
  var arg0 = getArgument(command, 0)
  if (arg0 == null) {
    return ["\n[Error: Not enough parameters. See #help]\n", false]
  }

  if (/^\d*d\d+((\+|-)\d+)?$/gi.test(arg0)) {
    character.damage = arg0
  } else if (!isNaN(arg0)) {
    character.damage = parseInt(arg0)
  } else {
    return ["\n[Error: Not a number. See #help]\n", false]
  }

  var possessiveName = getPossessiveName(character.name)

  state.show = "none"
  return [`\n[${possessiveName} attack damage is set to ${character.damage}]\n`, true]
}

function doSetProficiency(command) {
  var character = getCharacter()
  var arg0 = getArgument(command, 0)
  if (arg0 == null) {
    return ["\n[Error: Not enough parameters. See #help]\n", false]
  }

  if (/^\d*d\d+((\+|-)\d+)?$/gi.test(arg0)) {
    character.hitModifier = calculateRoll(arg0)
  } else if (!isNaN(arg0)) {
    character.hitModifier = parseInt(arg0)
  } else {
    return ["\n[Error: Not a number. See #help]\n", false]
  }

  var possessiveName = getPossessiveName(character.name)

  state.show = "none"
  return [`\n[${possessiveName} proficiency is set to ${character.hitModifier}]\n`, true]
}

function doReset(command) {
  state.notes = []
  state.characters = []
  state.defaultDifficulty = null
  state.autoXp = null
  state.day = null

  state.show = "reset"
  return [" ", true]
}

function doHelp(command) {
  const helpType = getArgument(command, 0)
  if (helpType) state.show = "help "
  else state.show = "help"
  return [" ", true]
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

// If you want to develop; Replace with DEVELOPER TEST ZONE from TestZone.js
function doTest(command) {
  state.show = "none" // Hide output in AI Dungeon GUI
  return ["You have no test cases! :P Did you forget to replace this with TestZone.js?", true]
}

// AI DUNGEON -- Don't modify this part
modifier(text)