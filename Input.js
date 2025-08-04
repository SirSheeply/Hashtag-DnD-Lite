// Based on version "Hashtag DnD v0.7.0" by Raeleus
const version = "Hashtag DnD v0.7.0 by Raeleus / Lite Edition by SirSheeply"

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
    { handler: doRest,                  synonyms: ["rest", "longrest", "shortrest", "sleep", "nap"] },
    
    // System
    { handler: doReset,                 synonyms: ["reset", "cleandata", "cleardata", "resetdata", "resetsettings", "clearsettings", "profile"] },
    { handler: doVersion,               synonyms: ["version", "ver", "showversion"] },
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
    { handler: doSetProficiency,        synonyms: ["setproficiency", "setweaponproficiency"] },
    
    // <><> Health & Damage
    { handler: doSetHealth,             synonyms: ["sethealth"] },
    { handler: doHeal,                  synonyms: ["heal", "mend", "restore"] },
    { handler: doDamage,                synonyms: ["damage", "hurt", "harm", "injure"] },
    { handler: doHealParty,             synonyms: ["healparty", "healcharacters"] },
    
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
    { handler: doTakeWeapon,            synonyms: ["takeweapon", "stealweapon", "getweapon", "grabweapon", "receiveweapon", "lootweapon"] },
    { handler: doTakeArmor,             synonyms: ["takearmor", "stealarmor", "getarmor", "grabarmor", "receivearmor", "lootarmor"] },
    { handler: doBuy,                   synonyms: ["buy", "purchase", "barter", "trade", "swap", "exchange"] },
    { handler: doSell,                  synonyms: ["sell"] },
    { handler: doDrop,                  synonyms: ["remove", "discard", "drop", "leave", "dispose", "toss", "throw", "throwaway", "trash", "donate", "eat", "consume", "use", "drink", "pay", "lose"] },
    { handler: doGive,                  synonyms: ["give", "handover", "hand", "gift"] },
    { handler: doRenameItem,            synonyms: ["renameitem", "renameobject", "renamegear", "renameequipment"] },
    { handler: doInventory,             synonyms: ["inv", "inventory", "backpack", "gear", "showinv", "showinventory", "viewinventory", "viewinv"] },
    { handler: doClearInventory,        synonyms: ["clearinventory", "clearinv", "emptyinventory", "emptybackpack", "clearbackpack", "emptygear", "cleargear"] },
    { handler: doEquip,                 synonyms: ["equip", "arm", "wear"] },
    { handler: doReward,                synonyms: ["reward"] },
    
    // <><> Spells
    { handler: doLearnSpell,            synonyms: ["learnspell", "learnmagic", "learnincantation", "learnritual", "memorizespell", "memorizemagic", "memorizeincantation", "memorizeritual", "learnsspell", "learnsmagic", "learnsincantation", "learnsritual", "memorizesspell", "memorizesmagic", "memorizesincantation", "memorizesritual", "learn"] },
    { handler: doForgetSpell,           synonyms: ["forgetspell", "forgetmagic", "forgetincantation", "forgetritual", "forgetsspell", "forgetsmagic", "forgetsincantation", "forgetsritual", "deletespell", "deletemagic", "deleteincantation", "deleteritual", "deletesspell", "deletesmagic", "deletesincantation", "deletesritual", "cancelspell", "cancelmagic", "cancelincantation", "cancelritual", "cancelsspell", "cancelsmagic", "cancelsincantation", "cancelsritual", "removespell", "removemagic", "removeincantation", "removeritual", "removesspell", "removesmagic", "removesincantation", "removesritual", "forget"] },
    { handler: doCastSpell,             synonyms: ["cast", "castspell", "castmagic", "castincantation", "castritual", "castsspell", "castsmagic", "castsincantation", "castsritual"] },
    { handler: doClearSpells,           synonyms: ["clearspells", "clearmagic", "clearincantations", "clearrituals", "forgetallspells", "forgetallmagic", "forgetallincantation", "forgetallritual"] },
    { handler: doSpellbook,             synonyms: ["spellbook", "spells", "listspells", "showspells", "spelllist", "spellcatalog", "spellinventory"] },
    
    // <><> Combat
    { handler: doAttack,                synonyms: ["attack", "strike", "ambush", "assault", "fireat", "fireon"] },
    { handler: doSetMeleeStat,          synonyms: ["setmeleestat", "setmeleestatistic", "setmeleeability", "changemeleestat", "changemeleestatistic", "changemeleeability"] },
    { handler: doSetRangedStat,         synonyms: ["setrangedstat", "setrangedstatistic", "setrangedability", "changerangedstat", "changerangedstatistic", "changerangedability"] },
    { handler: doEncounter,             synonyms: ["encounter", "startencounter"] },
    { handler: doShowEnemies,           synonyms: ["showenemies", "enemies"] },
    { handler: doShowAllies,            synonyms: ["showallies", "allies"] },
    { handler: doAddEnemy,              synonyms: ["addenemy"] },
    { handler: doAddAlly,               synonyms: ["addally"] },
    { handler: doRemoveEnemy,           synonyms: ["removeenemy"] },
    { handler: doRemoveAlly,            synonyms: ["removeally"] },
    { handler: doClearEnemies,          synonyms: ["clearenemies", "resetenemies", "removeenemies"] },
    { handler: doClearAllies,           synonyms: ["clearallies", "resetallies", "removeallies"] },
    { handler: doInitiative,            synonyms: ["initiative"] },
    { handler: doSetAc,                 synonyms: ["setac", "setarmorclass", "ac", "armorclass"] },
    { handler: doFlee,                  synonyms: ["flee", "retreat", "runaway", "endcombat"] },
    { handler: doSetupEnemy,            synonyms: ["setupenemy", "createenemy"] },
    { handler: doSetupAlly,             synonyms: ["setupally", "createally"] },
    { handler: doSetDamage,             synonyms: ["setdamage"] },
    { handler: doBlock,                 synonyms: ["block", "parry", "nullify", "invalidate"] },
    { handler: doRepeatTurn,            synonyms: ["repeatturn", "repeat"] }
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

  if (state.setupEnemyStep != null) {
    text = handleSetupEnemyStep(text)
    if (state.setupEnemyStep != null) return text
    else text = rawText
  }

  if (state.setupAllyStep != null) {
    text = handleSetupAllyStep(text)
    if (state.setupAllyStep != null) return text
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
  var lineBreakIndex = text.indexOf("\n")
  if (lineBreakIndex > -1) {
    state.flavorText = text.substring(lineBreakIndex + 1)
    if (!state.flavorText.startsWith(" ")) state.flavorText = " " + state.flavorText
    text = text.substring(0, lineBreakIndex)
  } else {
    state.flavorText = null
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
  let commandResult = null
  for (const { synonyms, handler } of commandRegistry) {
    commandResult = processCommandSynonyms(command, commandName, synonyms, handler);
    if (commandResult != null) break;
  }
  text = commandResult;
  log(text);

  // If text is still null, we try one last fallback:
  // If the command isn't a standard one, but it matches a known stat or skill, treat it like a flipped check/try command.
  if (text == null) {
    var character = getCharacter()
    var statNames = []
    character.stats.forEach(x => {
      statNames.push(x.name.toLowerCase())
    })
    character.skills.forEach(x => {
      statNames.push(x.name.toLowerCase())
    })
    text = processCommandSynonyms(command, commandName, statNames, doFlipCommandAbility)
  }

  if (state.flavorText != null) text += state.flavorText

  return text
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
        const presetIndexes = getStoryCardListByType("type")
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
        entity.skills.forEach(skill => { //HERE
          const findSkill = state.tempCharacter.skills.find((element) => element.name.toLowerCase() == skill.name.toLowerCase())
          if (findSkill) {
            // NOTE: If we implement character saving and loading we may want to consider fully deifining skills with stat base
            state.tempCharacter.skills.find((element) => element.name.toLowerCase() == skill.name.toLowerCase()).modifier = skill.modifier;
          } else { // We need to create the skill from scratch in this case, with it's stat base
            state.tempCharacter.skills.push({name: skill.name, stat:skill.stat, modifier: skill.modifier})
          }
        });
        entity.inventory.forEach(item => {
          state.tempCharacter.inventory.push({name: item.name, quantity: item.quantity})
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

function handleSetupEnemyStep(text) {
  state.show = "setupEnemy"

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
    state.setupEnemyStep = null
    return text
  }

  switch (state.setupEnemyStep) {
    case 0:
      text = text.toLowerCase();
      if (text.startsWith("y")) state.setupEnemyStep = 100
      else if (text.startsWith("n")) state.setupEnemyStep++
      break
    case 1:
      if (text.length > 0) {
        state.tempEnemy.name = text
        state.setupEnemyStep++
      }
      return text
    case 2:
      if (text.length > 0) {
        if (/^\d*d\d+((\+|-)\d+)?$/gi.test(text)) {
          state.tempEnemy.health = calculateRoll(text)
          state.setupEnemyStep++
        } else if (!isNaN(text)) {
          state.tempEnemy.health = Math.max(0, parseInt(text))
          state.setupEnemyStep++
        }
      }
      return text
    case 3:
      if (/^\d*d\d+((\+|-)\d+)?$/gi.test(text)) {
        state.tempEnemy.ac = calculateRoll(text)
        state.setupEnemyStep++
      } else if (!isNaN(text)) {
        state.tempEnemy.ac = Math.max(0, parseInt(text))
        state.setupEnemyStep++
      }
      return text
    case 4:
      if (!isNaN(text)) {
        state.tempEnemy.hitModifier = Math.max(0, parseInt(text))
        state.setupEnemyStep++
      }
      return text
    case 5:
      if (/^\d*d\d+((\+|-)\d+)?$/gi.test(text)) {
        state.tempEnemy.damage = text
        state.setupEnemyStep++
      } else if (!isNaN(text)) {
        state.tempEnemy.damage = Math.max(0, parseInt(text))
        state.setupEnemyStep++
      }
      return text
    case 6:
      if (/^\d*d\d+((\+|-)\d+)?$/gi.test(text)) {
        state.tempEnemy.initiative = calculateRoll(text)
        state.setupEnemyStep++
      } else if (!isNaN(text)) {
        state.tempEnemy.initiative = Math.max(0, parseInt(text))
        state.setupEnemyStep++
      }
      return text
    case 7:
      if (text.toLowerCase() == "s") {
        state.setupEnemyStep = 500
      }
      else if (text.length > 0) {
        state.tempEnemy.spells.push(text)
        state.setupEnemyStep++
      }
      return text
    case 8:
      if (text.toLowerCase() == "s") {
        state.setupEnemyStep = 500
      }
      else if (text.length > 0) {
        state.tempEnemy.spells.push(text)
      }
      return text
    case 100:
      if (/^\d+(\s.*)?$/gi.test(text)) {
        state.setupEnemyStep = 500

        var value = text.match(/^\d+/gi)[0]
        var nameMatches = text.match(/(?<=\s).*/gi)

        // ~400 lines of prefab enemies! Nice.
        // The rework here is to have all the enemies inside story cards, from which we can pull.
        // This means players can curate the enemies prefabs, and we're not limited to X amount.

        // Get a list of all the enemy cards with the enemy subtype
        // We pass the enemy subtype as "enemy - " to find all enemy cards regardless of subtype
        const enemyIndexes = getStoryCardListByType("enemy - ")
        if (enemyIndexes.length <= 0) {
          // Error no enemy cards for this case!
          return "Error: No Enemy Cards Found!"
        }
        const enemyCard = enemyIndexes[parseInt(value)]

        // Convert description into createEntity()
        // "description": "{\n        \"ally\": false,\n        \"name\": \"Turkey Prime\",\n        \"health\": \"5d10+10\",\n        \"ac\": 14,\n        \"hitMod\": 0,\n        \"damage\": \"2d6+3\",\n        \"initiative\": \"d20+2\",\n        \"spells\": []\n    },\n    {\n        \"ally\": false,\n        \"name\": \"Turkey Mage\",\n        \"health\": \"2d10+10\",\n        \"ac\": 14,\n        \"hitMod\": 0,\n        \"damage\": \"2d6+3\",\n        \"initiative\": \"d20+2\",\n        \"spells\": [\"Web\", \"Ray of Frost\"]\n}",
        // Eample: createEnemy("Turkey Prime", calculateRoll("5d10+10"), 14, 0, "2d6+3", "d20+2", false, [])
        const entity = JSON.parse(enemyCard.description)
        state.tempEnemy = createEntity(entity.name, calculateRoll(entity.health), entity.ac, entity.hitMod, entity.damage, entity.initiative, entity.ally, entity.spells)

        // ----

        if (nameMatches != null) state.tempEnemy.name = nameMatches[0]
      }
      return text
    case 500:
      state.show = null
      state.setupEnemyStep = null

      var enemy = createEnemy(state.tempEnemy.name, state.tempEnemy.health, state.tempEnemy.ac, state.tempEnemy.hitModifier, state.tempEnemy.damage, state.tempEnemy.initiative)
      enemy.spells = [...state.tempEnemy.spells]
      
      var enemyMatches = state.enemies.filter(x => x.name.toLowerCase() == enemy.name.toLowerCase() || x.name.toLowerCase() == `${enemy.name.toLowerCase()} a`)
      if (enemyMatches.length > 0) {
        enemy.name = getUniqueName(enemy.name)
        if (enemy.name.endsWith("A")) {
          enemyMatches[0].name = enemy.name
          enemy.name = enemy.name.substring(0, enemy.name.length - 1) + "B"
        }
      }

      state.enemies.push(enemy)
      break
  }
  return text
}

function handleSetupAllyStep(text) {
  state.show = "setupAlly"

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
    state.setupAllyStep = null
    return text
  }

  switch (state.setupAllyStep) {
    case 0:
      text = text.toLowerCase();
      if (text.startsWith("y")) state.setupAllyStep = 100
      else if (text.startsWith("n")) state.setupAllyStep++
      break
    case 1:
      if (text.length > 0) {
        state.tempAlly.name = text
        state.setupAllyStep++

        var allyMatches = state.allies.filter(x => x.name.toLowerCase() == state.tempAlly.name.toLowerCase() || x.name.toLowerCase() == `${state.tempAlly.name.toLowerCase()} a`)
        if (allyMatches.length > 0) {
          state.newAlly = false
          state.tempAlly.health = allyMatches[0].health
          state.tempAlly.ac = allyMatches[0].ac
          state.tempAlly.hitModifier = allyMatches[0].hitModifier
          state.tempAlly.damage = allyMatches[0].damage
          state.tempAlly.initiative = allyMatches[0].initiative
          state.tempAlly.spells = [...allyMatches[0].spells]
        } else {
          state.newAlly = true
        }
      }
      return text
    case 2:
      if (text.length > 0) {
        if (text.toLowerCase() == "default") {
          state.setupAllyStep++
        } else if (/^\d*d\d+((\+|-)\d+)?$/gi.test(text)) {
          state.tempAlly.health = calculateRoll(text)
          state.setupAllyStep++
        } else if (!isNaN(text)) {
          state.tempAlly.health = Math.max(0, parseInt(text))
          state.setupAllyStep++
        }
      }
      return text
    case 3:
      if (text.toLowerCase() == "default") {
          state.setupAllyStep++
      } else if (/^\d*d\d+((\+|-)\d+)?$/gi.test(text)) {
        state.tempAlly.ac = calculateRoll(text)
        state.setupAllyStep++
      } else if (!isNaN(text)) {
        state.tempAlly.ac = Math.max(0, parseInt(text))
        state.setupAllyStep++
      }
      return text
    case 4:
      if (text.toLowerCase() == "default") {
          state.setupAllyStep++
      } else if (!isNaN(text)) {
        state.tempAlly.hitModifier = Math.max(0, parseInt(text))
        state.setupAllyStep++
      }
      return text
    case 5:
      if (text.toLowerCase() == "default") {
          state.setupAllyStep++
      } else if (/^\d*d\d+((\+|-)\d+)?$/gi.test(text)) {
        state.tempAlly.damage = text
        state.setupAllyStep++
      } else if (!isNaN(text)) {
        state.tempAlly.damage = Math.max(0, parseInt(text))
        state.setupAllyStep++
      }
      return text
    case 6:
      if (text.toLowerCase() == "default") {
          state.setupAllyStep++
      } else if (/^\d*d\d+((\+|-)\d+)?$/gi.test(text)) {
        state.tempAlly.initiative = calculateRoll(text)
        state.setupAllyStep++
      } else if (!isNaN(text)) {
        state.tempAlly.initiative = Math.max(0, parseInt(text))
        state.setupAllyStep++
      }
      return text
    case 7:
      if (text.toLowerCase() == "s") {
        state.setupAllyStep = 500
      } else if (text.toLowerCase() == "e") {
        state.tempAlly.spells = []
      } else if (text.length > 0) {
        state.tempAlly.spells.push(text)
        state.setupAllyStep++
      }
      return text
    case 8:
      if (text.toLowerCase() == "s") {
        state.setupAllyStep = 500
      }
      else if (text.length > 0) {
        state.tempAlly.spells.push(text)
      }
      return text
    case 100:
      if (/^\d+(\s.*)?$/gi.test(text)) {
        state.setupAllyStep = 500
        state.newAlly = true

        var value = text.match(/^\d+/gi)[0]
        var nameMatches = text.match(/(?<=\s).*/gi)

        // ~200+ lines of prefab allies! Nice.
        // The rework here is to have all the allies inside story cards, from which we can pull.
        // This means players can curate the ally prefabs, and we're not limited to X amount.

        // Get a list of all the enemy cards with the enemy subtype
        // We pass the enemy subtype as "" to find all enemy cards regardless of subtype
        const allyIndexes = listAllyCards("")
        if (allyIndexes.length <= 0) {
          // Error no enemy cards for this case!
          return "Error: No Ally Cards Found!"
        }
        const allyCard = allyIndexes[parseInt(value)]

        // Convert description into createEntity()
        // "description": "{\n        \"ally\": true,\n        \"name\": \"Turkey Friend\",\n        \"health\": \"5d10+10\",\n        \"ac\": 14,\n        \"hitMod\": 0,\n        \"damage\": \"2d6+3\",\n        \"initiative\": \"d20+2\",\n        \"spells\": []\n    },\n    {\n        \"ally\": false,\n        \"name\": \"Turkey Mage\",\n        \"health\": \"2d10+10\",\n        \"ac\": 14,\n        \"hitMod\": 0,\n        \"damage\": \"2d6+3\",\n        \"initiative\": \"d20+2\",\n        \"spells\": [\"Web\", \"Ray of Frost\"]\n}",
        // Eample: createEnemy("Turkey Friend", calculateRoll("5d10+10"), 14, 0, "2d6+3", "d20+2", true, [])
        const entity = JSON.parse(allyCard.description)
        state.tempEnemy = createEntity(entity.name, calculateRoll(entity.health), entity.ac, entity.hitMod, entity.damage, entity.initiative, entity.ally, entity.spells)

        //----

        if (nameMatches != null) state.tempAlly.name = nameMatches[0]
      }
      return text
    case 500:
      state.show = null
      state.setupAllyStep = null

      var ally = createAlly(state.tempAlly.name, state.tempAlly.health, state.tempAlly.ac, state.tempAlly.hitModifier, state.tempAlly.damage, state.tempAlly.initiative)
      ally.spells = [...state.tempAlly.spells]
      
      var allyMatches = state.allies.filter(x => x.name.toLowerCase() == ally.name.toLowerCase() || x.name.toLowerCase() == `${ally.name.toLowerCase()} a`)
      if (state.newAlly && allyMatches.length > 0) {
        ally.name = getUniqueName(ally.name)
        if (ally.name.endsWith("A")) {
          allyMatches[0].name = ally.name
          ally.name = ally.name.substring(0, ally.name.length - 1) + "B"
        }
      } else if (!state.newAlly) {
        let removeIndex = state.allies.indexOf(allyMatches[0])
        state.allies.splice(removeIndex, 1)
      }

      state.allies.push(ally)
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
  text = null
  synonyms.forEach(x => {
    if (commandName == x || commandName == x + "s") {
      text = func(command)
    }
  })
  return text
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

  if (state.tempEnemy == null) state.tempEnemy = createEnemy("enemy", 10, 10, "2d6", 10)
  if (state.tempAlly == null) state.tempAlly = createAlly("ally", 10, 10, "2d6", 10)
  if (state.characters == null) state.characters = []
  if (state.notes == null) state.notes = []
  if (state.autoXp == null) state.autoXp = 0
  if (state.defaultDifficulty == null) state.defaultDifficulty = 10
  if (state.day == null) state.day = 0
  if (state.enemies == null) state.enemies = []
  if (state.allies == null) state.allies = []
  if (state.initiativeOrder == null) state.initiativeOrder = []
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
  return text
}

function doCreate(command) {
  if (!hasCharacter(state.characterName)) createCharacter(state.characterName)
  var character = getCharacter()

  state.createStep = 0
  state.tempCharacter.name = character.name
  resetTempCharacterSkills()
  state.tempCharacter.stats = []
  state.tempCharacter.spells = []
  state.tempCharacter.inventory = [{name: "Gold", quantity: 50}, {name: "Rope", quantity: 1}, {name: "Ration", quantity: 10}, {name: "Torch", quantity: 1}]
  state.tempCharacter.spellStat = null
  state.tempCharacter.meleeStat = "Strength"
  state.tempCharacter.rangedStat = "Dexterity"
  state.tempCharacter.ac = 10
  state.tempCharacter.damage = "1d6"
  state.tempCharacter.proficiency = 2
  
  state.show = "create"
  return " "
}

function doSetupEnemy(command) {
  state.setupEnemyStep = 0
  state.tempEnemy = createEnemy("enemy", 20, 10, 0, "2d6", 10)
  state.show = "setupEnemy"
  return " "
}

function doSetupAlly(command) {
  state.setupAllyStep = 0
  state.tempAlly = createAlly("ally", 20, 10, 0, "2d6", 10)
  state.show = "setupAlly"
  return " "
}

function doBio(command) {
  state.show = "bio"
  return " "
}

function doRenameCharacter(command) {
  var character = getCharacter()
  var arg0 = getArgumentRemainder(command, 0)
  if (arg0 == null) {
    state.show = "none"
    return "\n[Error: Not enough parameters. See #help]\n"
  }
  var possessiveName = getPossessiveName(character.name)

  state.show = "none"
  var text = `\n[${possessiveName} name has been changed to ${arg0}]\n`

  character.name = arg0

  return text
}

function doCloneCharacter(command) {
  var character = getCharacter()
  var possessiveName = getPossessiveName(character.name)

  var arg0 = getArgumentRemainder(command, 0)
  if (arg0 == null) {
    state.show = "none"
    return "\n[Error: Not enough parameters. See #help]\n"
  }

  if (!hasCharacter(arg0)) createCharacter(arg0)
  var newCharacter = getCharacter(arg0)
  copyCharacter(character, newCharacter)

  state.show = "none"
  var text = `\n[${character.name} has been cloned to a new character called ${newCharacter.name}]\n`

  return text
}

function doSetStat(command) {
  var character = getCharacter()
  var arg0 = getArgument(command, 0)
  if (arg0 == null) {
    state.show = "none"
    return "\n[Error: Not enough parameters. See #help]\n"
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
  return `\n[${possessiveName} ${toTitleCase(arg0)} ability is now ${arg1}]\n`
}

function doSetSpellStat(command) {
  var character = getCharacter()
  var arg0 = getArgument(command, 0)
  if (arg0 == null) {
    state.show = "none"
    return "\n[Error: Not enough parameters. See #help]\n"
  }

  character.spellStat = arg0

  state.show = "none"
  return `\nSpellcasting Ability is set to ${arg0}\n`
}

function doSetMeleeStat(command) {
  var character = getCharacter()
  var arg0 = getArgument(command, 0)
  if (arg0 == null) {
    state.show = "none"
    return "\n[Error: Not enough parameters. See #help]\n"
  }

  character.meleeStat = arg0

  state.show = "none"
  return `\nMelee Ability is set to ${arg0}\n`
}

function doSetRangedStat(command) {
  var character = getCharacter()
  var arg0 = getArgument(command, 0)
  if (arg0 == null) {
    state.show = "none"
    return "\n[Error: Not enough parameters. See #help]\n"
  }

  character.rangedStat = arg0

  state.show = "none"
  return `\nRanged Ability is set to ${arg0}\n`
}

function doSetAutoXp(command) {
  var arg0 = getArgument(command, 0)
  if (arg0 == null) {
    state.show = "none"
    return "\n[Error: Not enough parameters. See #help]\n"
  }
  if (isNaN(arg0)) {
    state.show = "none"
    return "\n[Error: Expected a number. See #help]\n"
  }

  state.autoXp = Math.max(0, arg0)

  state.show = "none"
  return state.autoXp <= 0 ? `\n[Auto XP is disabled]\n` : `\n[Auto XP is set to ${state.autoXp}]\n`
}

function doShowAutoXp(command) {
  state.show = "none"
  return state.autoXp <= 0 ? `\n[Auto XP is disabled]\n` : `\n[Auto XP is set to ${state.autoXp}]\n`
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
  return `\n[The default difficulty is set to ${state.defaultDifficulty}]\n`
}

function doShowDefaultDifficulty(command) {
  state.show = "none"
  return `\n[The default difficulty is set to ${state.defaultDifficulty}]\n`
}

function doSetSkill(command) {
  var character = getCharacter()
  var arg0 = getArgument(command, 0)
  if (arg0 == null) {
    state.show = "none"
    return "\n[Error: Not enough parameters. See #help]\n"
  }

  var arg1 = getArgument(command, 1)
  if (arg1 == null) {
    state.show = "none"
    return "\n[Error: Not enough parameters. See #help]\n"
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
      state.show = "none"
      return "\n[Error: New skills must have an ability specified. See #help]\n"
    }
    
    character.skills.push(skill)
  } else {
    var existingSkill = character.skills[index]
    existingSkill.modifier = parseInt(skill.modifier)
    if (arg1 != null) existingSkill.stat = skill.stat
  }

  state.show = "none"
  return `\n[${possessiveName} ${toTitleCase(arg0)} skill is now ${arg2 >= 0 ? "+" + arg2 : "-" + arg2} and based on ${toTitleCase(arg1)}]\n`
}

function doSetAc(command) {
  var character = getCharacter()
  var arg0 = getArgument(command, 0)
  if (arg0 == null) {
    state.show = "none"
    return "\n[Error: Not enough parameters. See #help]\n"
  }

  if (isNaN(arg0)) {
    state.show = "none"
    return "\n[Error: Not a number. See #help]\n"
  }

  var possessiveName = getPossessiveName(character.name)

  character.ac = parseInt(arg0)

  state.show = "none"
  return `\n[${possessiveName} armor class is set to ${character.ac}]\n`
}

function doSetExperience(command) {
  var character = getCharacter()
  var arg0 = getArgument(command, 0)
  if (arg0 == null) {
    state.show = "none"
    return "\n[Error: Not enough parameters. See #help]\n"
  }

  if (isNaN(arg0)) {
    state.show = "none"
    return "\n[Error: Not a number. See #help]\n"
  }

  var possessiveName = getPossessiveName(character.name)

  character.experience = parseInt(arg0)

  state.show = "none"
  return `\n[${possessiveName} experience is set to ${character.experience}]\n`
}

function doAddExperience(command) {
  var character = getCharacter()
  var arg0 = getArgument(command, 0)
  if (arg0 == null) {
    state.show = "none"
    return "\n[Error: Not enough parameters. See #help]\n"
  }

  arg0 = searchArgument(command, /\d+/gi)
  if (arg0 == null) {
    state.show = "none"
    return "\n[Error: Expected a number. See #help]\n"
  }
  arg0 = parseInt(arg0)

  var arg1 = searchArgument(command, /party/gi)

  if (arg1 == null && character == null) {
    state.show = "none"
    return `\n[Error: Character name not specified. Use the "do" or "say" modes. Alternatively, use "story" mode in the following format without quotes: "charactername #hashtag"]\n`
  }

  if (state.characters.length == 0) {
    state.show = "none"
    return `\n[Error: There are no characters. Type #setup to create a character]\n`
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
  return " "
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
    state.show = "none"
    return "\n[Error: Not enough parameters. See #help]\n"
  }

  var possessiveName = getPossessiveName(character.name)

  character.className = arg0

  state.show = "none"
  return `\n[${possessiveName} class is set to "${character.className}"]\n`
}

function doSetSummary(command) {
  var character = getCharacter()
  var arg0 = getArgumentRemainder(command, 0)
  if (arg0 == null) {
    state.show = "none"
    return "\n[Error: Not enough parameters. See #help]\n"
  }

  var possessiveName = getPossessiveName(character.name)

  character.summary = arg0

  state.show = "none"
  return `\n[${possessiveName} summary is set]\n`
}

function doSetHealth(command) {
  var character = getCharacter()
  var arg0 = getArgument(command, 0)
  if (arg0 == null) {
    state.show = "none"
    return "\n[Error: Not enough parameters. See #help]\n"
  }

  var possessiveName = getPossessiveName(character.name)

  character.health = arg0
  character.health = clamp(character.health, 0, getHealthMax())

  state.show = "none"
  return `\n[${possessiveName} health is set to ${character.health} health]\n`
}

function doHeal(command) {
  var character = getCharacter()
  var arg0 = getArgument(command, 0)
  if (arg0 == null) {
    state.show = "none"
    return "\n[Error: Not enough parameters. See #help]\n"
  }

  var arg1 = getArgumentRemainder(command, 1)
  
  if (arg1 == null) {
    if (character == null) {
      state.show = "none"
      return "\n[Error: Character must be specified. See #help]\n"
    }

    var healing

    var healingMatches = arg0.match(/\d*d\d+((\+|-)d+)?/gi)
    if (healingMatches != null) healing = calculateRoll(healingMatches[0])
    else {
      healingMatches = arg0.match(/\d+/g)
      if (healingMatches != null) healing = parseInt(healingMatches[healingMatches.length - 1])
    }

    if (healing == null) {
      state.show = "none"
      return "\n[Error: Expected a number. See #help]\n"
    }

    var haveWord = character.name == "You" ? "have" : "has"

    character.health += healing
    character.health = clamp(character.health, 0, getHealthMax())

    state.show = "none"
    return `\n[${character.name} ${haveWord} been healed for ${healing} hp to a total of ${character.health}]\n`
  } else {
    var healing

    var healingMatches = arg0.match(/\d*d\d+((\+|-)d+)?/gi)
    if (healingMatches != null) healing = calculateRoll(healingMatches[0])
    else {
      healingMatches = arg0.match(/\d+/g)
      if (healingMatches != null) healing = parseInt(healingMatches[0])
    }

    if (healing == null) {
      state.show = "none"
      return "\n[Error: Expected a number. See #help]\n"
    }

    for (var enemy of state.enemies) {
      if (enemy.name.toLowerCase() == arg1.toLowerCase()) {
        enemy.health = Math.max(0, enemy.health + healing)
        state.show = "none"
        return `\n[${toTitleCase(enemy.name)} has been healed for ${healing} hp to a total of ${enemy.health}]\n`
      }
    }

    for (var ally of state.allies) {
      if (ally.name.toLowerCase() == arg1.toLowerCase()) {
        ally.health = Math.max(0, ally.health + healing)
        state.show = "none"
        return `\n[${toTitleCase(ally.name)} has been healed for ${healing} hp to a total of ${ally.health}]\n`
      }
    }

    for (var character of state.characters) {
      if (character.name.toLowerCase() == arg1.toLowerCase()) {
        character.health += healing
        character.health = clamp(character.health, 0, getHealthMax(character))
        state.show = "none"
        return `\n[${toTitleCase(character.name)} has been healed for ${healing} hp to a total of ${character.health}]\n`
      }
    }

    state.show = "none"
    return `\n[Error: Could not find an enemy, ally, or character matching the name ${arg1}. Type #enemies, #allies, or #characters to see a list]`
  }
}

function doDamage(command) {
  var character = getCharacter()
  var arg0 = getArgument(command, 0)
  if (arg0 == null) {
    state.show = "none"
    return "\n[Error: Not enough parameters. See #help]\n"
  }

  var arg1 = getArgumentRemainder(command, 1)
  
  if (arg1 == null) {
    if (character == null) {
      state.show = "none"
      return "\n[Error: Character must be specified. See #help]\n"
    }

    var damage

    var damageMatches = arg0.match(/\d*d\d+((\+|-)d+)?/gi)
    if (damageMatches != null) damage = calculateRoll(damageMatches[0])
    else {
      damageMatches = arg0.match(/\d+/g)
      if (damageMatches != null) damage = parseInt(damageMatches[damageMatches.length - 1])
    }

    if (damage == null) {
      state.show = "none"
      return "\n[Error: Expected a number. See #help]\n"
    }

    var haveWord = character.name == "You" ? "have" : "has"

    character.health -= damage
    character.health = clamp(character.health, 0, getHealthMax())

    state.show = "none"
    return `\n[${character.name} ${haveWord} been damaged for ${damage} hp with ${character.health} remaining] ${character.health == 0 ? " You are unconscious" : ""}\n`
  } else {
    var damage

    var damageMatches = arg0.match(/\d*d\d+((\+|-)d+)?/gi)
    if (damageMatches != null) damage = calculateRoll(damageMatches[0])
    else {
      damageMatches = arg0.match(/\d+/g)
      if (damageMatches != null) damage = parseInt(damageMatches[0])
    }

    if (damage == null) {
      state.show = "none"
      return "\n[Error: Expected a number. See #help]\n"
    }

    for (var enemy of state.enemies) {
      if (enemy.name.toLowerCase() == arg1.toLowerCase()) {
        enemy.health = Math.max(0, enemy.health - damage)
        state.show = "none"
        return `\n[${toTitleCase(enemy.name)} has been damaged for ${damage} hp with ${enemy.health} remaining] ${enemy.health == 0 ? " " + toTitleCase(enemy.name) + " has been defeated!" : ""}\n`
      }
    }

    for (var ally of state.allies) {
      if (ally.name.toLowerCase() == arg1.toLowerCase()) {
        ally.health = Math.max(0, ally.health - damage)
        state.show = "none"
        return `\n[${toTitleCase(ally.name)} has been damaged for ${damage} hp with ${ally.health} remaining] ${ally.health == 0 ? " " + toTitleCase(ally.name) + " has been defeated!" : ""}\n`
      }
    }

    for (var character of state.characters) {
      if (character.name.toLowerCase() == arg1.toLowerCase()) {
        character.health = Math.max(0, character.health - damage)
        state.show = "none"
        return `\n[${toTitleCase(character.name)} has been damaged for ${damage} hp with ${character.health} remaining] ${character.health == 0 ? " " + toTitleCase(character.name) + " is unconcious!" : ""}\n`
      }
    }

    state.show = "none"
    return `\n[Error: Could not find an enemy, ally, or character matching the name ${arg1}. Type #enemies, #allies, or #characters to see a list]`
  }
}

function doRest(command) {
  var commandName = getCommandName(command)
  state.day++
  state.enemies = []

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
  return text
}

function doHealParty(command) {
  var arg0 = getArgument(command, 0)
  if (arg0 == null) {
    state.show = "none"
    return "\n[Error: Not enough parameters. See #help]\n"
  }

  var healing
  var healingMatches = arg0.match(/\d*d\d+((\+|-)d+)?/gi)
  if (healingMatches != null) healing = calculateRoll(healingMatches[0])
  else {
    healingMatches = arg0.match(/\d+/g)
    if (healingMatches != null) healing = parseInt(healingMatches[healingMatches.length - 1])
  }

  if (healing == null) {
    state.show = "none"
    return "\n[Error: Expected a number. See #help]\n"
  }

  var text = `\n[All characters have been healed by ${healing}.]\n`
  state.characters.forEach(function(character) {
    var max = getHealthMax(character)
    character.health += healing
    if (character.health > max) character.health = max
    text += `[${toTitleCase(character.name)}: ${character.health} / ${max} health]\n`
  })
  state.show = "none"
  return text
}

function doFlipCommandAbility(command) {
  var ability = getCommandName(command)
  var arg0 = getArgument(command, 0)
  if (arg0 == null) return;
  var remainder = getArgumentRemainder(command, 1)

  command = `${arg0} "${ability}"${remainder == null ? "" : " " + remainder}`
  text = processCommandSynonyms(command, arg0, checkSynonyms, doCheck)
  if (text == null) text = processCommandSynonyms(command, arg0, trySynonyms, doTry)
  return text
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
  return text
}

function doTry(command) {
  if (getArguments(command).length <= 1) {
    state.show = "none"
    return "\n[Error: Not enough parameters. See #help]\n"
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
  return text
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
    state.show = "none"
    return "\n[Error: Not enough parameters. See #help]\n"
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

  var enemyString = ""
  var allyString = ""
  if (state.initiativeOrder.length > 0) {
    var foundEnemy

    for (var enemy of state.enemies) {
      if (targetText.toLowerCase().includes(enemy.name.toLowerCase())) {
        foundEnemy = enemy
        break
      }
    }

    if (foundEnemy == null) {
      var indexMatches = targetText.match(/(?<=enemy\s*)\d+/gi)
      if (indexMatches != null) {
        foundEnemy = state.enemies[parseInt(indexMatches[0]) - 1]
        targetText = targetText.replace(/enemy\s*d+/gi, foundEnemy.name)
      }
    }

    var foundAlly

    if (foundEnemy == null) for (var ally of state.allies) {
      if (targetText.toLowerCase().includes(ally.name.toLowerCase())) {
        foundAlly = ally
        break
      }
    }

    if (foundAlly == null) {
      var indexMatches = targetText.match(/(?<=ally\s*)\d+/gi)
      if (indexMatches != null) {
        foundAlly = state.allies[parseInt(indexMatches[0]) - 1]
        targetText = targetText.replace(/ally\s*d+/gi, foundAlly.name)
      }
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

    if (foundEnemy != null) {
      if (usingDefaultDifficulty) targetRoll = foundEnemy.ac
      if (score == 20 || score + modifier >= targetRoll) {
        if (score == 20) enemyString += `\nCritical Damage: ${damage}\n`
        else enemyString += `\nDamage: ${damage}\n`

        state.blockCharacter = foundEnemy
        state.blockPreviousHealth = foundEnemy.health
        foundEnemy.health = Math.max(0, foundEnemy.health - damage)
        if (foundEnemy.health == 0) {
          enemyString += ` ${toTitleCase(foundEnemy.name)} has been defeated!`
          
        } else enemyString += ` ${toTitleCase(foundEnemy.name)} has ${foundEnemy.health} health remaining!`
      }
    }

    if (foundAlly != null) {
      if (usingDefaultDifficulty) targetRoll = foundAlly.ac
      if (score == 20 || score + modifier >= targetRoll) {
        if (score == 20) allyString += `\nCritical Damage: ${damage}\n`
        else allyString += `\nDamage: ${damage}\n`

        state.blockCharacter = foundAlly
        state.blockPreviousHealth = foundAlly.health
        foundAlly.health = Math.max(0, foundAlly.health - damage)
        if (foundAlly.health == 0) {
          allyString += ` ${toTitleCase(foundAlly.name)} has been defeated!`
          
        } else allyString += ` ${toTitleCase(foundAlly.name)} has ${foundAlly.health} health remaining!`
      }
    }
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

  if (enemyString != null) text += enemyString
  if (allyString != null) text += allyString

  if (targetRoll > 0 && (score + modifier >= targetRoll || score == 20)) text += addXpToAll(Math.floor(state.autoXp * clamp(targetRoll, 1, 20) / 20))
  return text + "\n"
}

function doNote(command) {
  var arg0 = getArgumentRemainder(command, 0)
  
  if (arg0 != null && arg0.length > 0) {
    state.notes.push(arg0)
    state.show = "none"
    return "\n[Note added successfully]\n"
  } else {
    state.notes.push(history[history.length - 1].text)
    state.show = "none"
    return "\n[The last action was successfully added to the notes]\n"
  }
}

function doShowDay(command) {
  state.show = "none"
  return `\n[It is day ${state.day}]\n`
}

function doSetDay(command) {
  var arg0 = getArgument(command, 0)
  if (arg0 == null || isNaN(arg0)) {
    state.show = "none"
    return "\n[Error: Not enough parameters. See #help]\n"
  }

  state.day = parseInt(arg0)

  state.show = "none"
  return `\n[The day has been set to day ${state.day}]\n`
}

function doShowNotes(command) {
  state.show = "showNotes"
  return " "
}

function doEncounter(command) {
  var arg0 = getArgument(command, 0)
  if (arg0 == null) {
    arg0 = "easy"
  }

  var encounter = createEncounter(arg0)
  state.enemies = encounter.enemies
  var text = `\n${encounter.text}\n`

  state.prefix = "\n"
  if (encounter.enemies.length > 0) {
    state.prefix += "You encounter the following enemies:\n"
    for (var enemy of encounter.enemies) {
      state.prefix += `${toTitleCase(enemy.name)} (Health: ${enemy.health} AC: ${enemy.ac} Initiative: ${enemy.initiative})\n`
    }
  }

  state.prefix += encounter.enemies.length > 0 ? "[Type #initiative to begin the battle]\n" : ""

  state.show = "prefix"
  return text
}

function doShowEnemies(command) {
  state.show = "showEnemies"
  return " "
}

function doShowAllies(command) {
  state.show = "showAllies"
  return " "
}

function doRemoveEnemy(command) {
  var arg0 = getArgumentRemainder(command, 0)
  if (arg0 == null) {
    state.show = "none"
    return "\n[Error: Not enough parameters. See #help]\n"
  }

  if (/\d+\D+(\d+\D*)+/gi.test(arg0)) {

    var list = arg0.split(/\D+/)
    list.sort(function(a, b) {
      return b - a;
    });

    var text = "\n"
    list.forEach(x => {
      var num = parseInt(x) - 1
      if (num >= state.enemies.length) {
        state.show = "none"
        return `\n[Error: Enemy ${x} does not exist. See #showenemies]\n`
      }

      var enemy = state.enemies[num]
      state.enemies.splice(num, 1)
      var index = state.initiativeOrder.indexOf(enemy)
      if (index >= 0) state.initiativeOrder.splice(index, 1)
      text += `[The enemy ${toTitleCase(enemy.name)} has been removed]\n`
    })

    state.show = "none"
    return text
  }

  var enemy
  if (isNaN(arg0)) arg0 = state.enemies.findIndex(x => x.name.toLowerCase() == arg0.toLowerCase())
  else arg0--

  if (arg0 == -1) {
    state.show = "none"
    return "\n[Error: Enemy not found. See #showenemies]\n"
  } else if (arg0 >= state.enemies.length || arg0 < 0) {
    state.show = "none"
    return "\n[Error: Index number out of bounds. See #showenemies]\n"
  } else {
    enemy = state.enemies[arg0]
    state.enemies.splice(arg0, 1)
  }

  state.show = "none"
  return `\n[The enemy ${toTitleCase(enemy.name)} has been removed]\n`
}

function doRemoveAlly(command) {
  var arg0 = getArgumentRemainder(command, 0)
  if (arg0 == null) {
    state.show = "none"
    return "\n[Error: Not enough parameters. See #help]\n"
  }

  if (/\d+\D+(\d+\D*)+/gi.test(arg0)) {

    var list = arg0.split(/\D+/)
    list.sort(function(a, b) {
      return b - a;
    });

    var text = "\n"
    list.forEach(x => {
      var num = parseInt(x) - 1
      if (num >= state.allies.length) {
        state.show = "none"
        return `\n[Error: Ally ${x} does not exist. See #showallies]\n`
      }

      var ally = state.allies[num]
      state.allies.splice(num, 1)
      var index = state.initiativeOrder.indexOf(ally)
      if (index >= 0) state.initiativeOrder.splice(index, 1)
      text += `[The ally ${toTitleCase(ally.name)} has been removed]\n`
    })

    state.show = "none"
    return text
  }

  var ally
  if (isNaN(arg0)) arg0 = state.allies.findIndex(x => x.name.toLowerCase() == arg0.toLowerCase())
  else arg0--

  if (arg0 == -1) {
    state.show = "none"
    return "\n[Error: Ally not found. See #showallies]\n"
  } else if (arg0 >= state.allies.length || arg0 < 0) {
    state.show = "none"
    return "\n[Error: Index number out of bounds. See #showallies]\n"
  } else {
    ally = state.allies[arg0]
    state.allies.splice(arg0, 1)
  }

  state.show = "none"
  return `\n[The ally ${toTitleCase(ally.name)} has been removed]\n`
}

function doClearEnemies(command) {
  var arg0 = getArgument(command, 0)
  if (arg0 != null) {
    return doRemoveEnemy(command)
  }

  state.enemies = []
  state.initiativeOrder = []

  state.show = "none"
  return "\n[The enemies have been cleared]\n"
}

function doClearAllies(command) {
  var arg0 = getArgument(command, 0)
  if (arg0 != null) {
    return doRemoveAlly(command)
  }

  state.allies = []
  state.initiativeOrder = []

  state.show = "none"
  return "\n[The allies have been cleared]\n"
}

function doAddEnemy(command) {
  var name = getArgument(command, 0)
  if (name == null) {
    state.show = "none"
    return "\n[Error: Not enough parameters. See #help]\n"
  }

  var health = getArgument(command, 1)
  if (health == null) {
    state.show = "none"
    return "\n[Error: Not enough parameters. See #help]\n"
  } else if (/^\d*d\d+((\+|-)\d+)?$/gi.test(health)) {
    health = calculateRoll(health)
  } else if (isNaN(health)) {
    state.show = "none"
    return "\n[Error: Expected a number. See #help]\n"
  }
  health = parseInt(health)

  var ac = getArgument(command, 2)
  if (ac == null) {
    state.show = "none"
    return "\n[Error: Not enough parameters. See #help]\n"
  } else if (/^\d*d\d+((\+|-)\d+)?$/gi.test(ac)) {
    ac = calculateRoll(ac)
  } else if (isNaN(ac)) {
    state.show = "none"
    return "\n[Error: Expected a number. See #help]\n"
  }
  ac = parseInt(ac)

  var hitModifier = getArgument(command, 3)
  if (hitModifier == null) {
    state.show = "none"
    return "\n[Error: Not enough parameters. See #help]\n"
  } else if (/^\d*d\d+((\+|-)\d+)?$/gi.test(hitModifier)) {
    hitModifier = calculateRoll(hitModifier)
  }  else if (isNaN(hitModifier)) {
    state.show = "none"
    return "\n[Error: Expected a number. See #help]\n"
  }

  var damage = getArgument(command, 4)
  if (damage == null) {
    state.show = "none"
    return "\n[Error: Not enough parameters. See #help]\n"
  } else if (isNaN(damage) && !/^\d*d\d+((\+|-)\d+)?$/gi.test(damage)) {
    state.show = "none"
    return "\n[Error: Expected a number. See #help]\n"
  }

  var initiative = getArgument(command, 5)
  if (initiative == null) {
    state.show = "none"
    return "\n[Error: Not enough parameters. See #help]\n"
  } else if (/^\d*d\d+((\+|-)\d+)?$/gi.test(initiative)) {
    initiative = calculateRoll(initiative)
  } else if (isNaN(initiative)) {
    state.show = "none"
    return "\n[Error: Expected a number. See #help]\n"
  }
  initiative = parseInt(initiative)

  var spells = []
  var spell = null
  var index = 6
  do {
    spell = getArgument(command, index++)
    if (spell != null) spells.push(spell)
  } while (spell != null)
  
  var enemy = createEnemy(name, health, ac, hitModifier, damage, initiative)
  enemy.spells = spells

  var enemyMatches = state.enemies.filter(x => x.name.toLowerCase() == enemy.name.toLowerCase() || x.name.toLowerCase() == `${enemy.name.toLowerCase()} a`)
  if (enemyMatches.length > 0) {
    enemy.name = getUniqueName(enemy.name)
    if (enemy.name.endsWith("A")) {
      enemyMatches[0].name = enemy.name
      enemy.name = enemy.name.substring(0, enemy.name.length - 1) + "B"
    }
  }

  state.enemies.push(enemy)

  state.show = "none"
  return `[Enemy ${toTitleCase(enemy.name)} has been created]`
}

function doAddAlly(command) {
  var name = getArgument(command, 0)
  if (name == null) {
    state.show = "none"
    return "\n[Error: Not enough parameters. See #help]\n"
  }

  var health = getArgument(command, 1)
  if (health == null) {
    state.show = "none"
    return "\n[Error: Not enough parameters. See #help]\n"
  } else if (/^\d*d\d+((\+|-)\d+)?$/gi.test(health)) {
    health = calculateRoll(health)
  } else if (isNaN(health)) {
    state.show = "none"
    return "\n[Error: Expected a number. See #help]\n"
  }
  health = parseInt(health)

  var ac = getArgument(command, 2)
  if (ac == null) {
    state.show = "none"
    return "\n[Error: Not enough parameters. See #help]\n"
  } else if (/^\d*d\d+((\+|-)\d+)?$/gi.test(ac)) {
    ac = calculateRoll(ac)
  } else if (isNaN(ac)) {
    state.show = "none"
    return "\n[Error: Expected a number. See #help]\n"
  }
  ac = parseInt(ac)

  var hitModifier = getArgument(command, 3)
  if (hitModifier == null) {
    state.show = "none"
    return "\n[Error: Not enough parameters. See #help]\n"
  } else if (/^\d*d\d+((\+|-)\d+)?$/gi.test(hitModifier)) {
    hitModifier = calculateRoll(hitModifier)
  }  else if (isNaN(hitModifier)) {
    state.show = "none"
    return "\n[Error: Expected a number. See #help]\n"
  }

  var damage = getArgument(command, 4)
  if (damage == null) {
    state.show = "none"
    return "\n[Error: Not enough parameters. See #help]\n"
  } else if (isNaN(damage) && !/^\d*d\d+((\+|-)\d+)?$/gi.test(damage)) {
    state.show = "none"
    return "\n[Error: Expected a number. See #help]\n"
  }

  var initiative = getArgument(command, 5)
  if (initiative == null) {
    state.show = "none"
    return "\n[Error: Not enough parameters. See #help]\n"
  } else if (/^\d*d\d+((\+|-)\d+)?$/gi.test(initiative)) {
    initiative = calculateRoll(initiative)
  } else if (isNaN(initiative)) {
    state.show = "none"
    return "\n[Error: Expected a number. See #help]\n"
  }
  initiative = parseInt(initiative)

  var spells = []
  var spell = null
  var index = 6
  do {
    spell = getArgument(command, index++)
    if (spell != null) spells.push(spell)
  } while (spell != null)
  
  var ally = createAlly(name, health, ac, hitModifier, damage, initiative)
  ally.spells = spells

  var allyMatches = state.allies.filter(x => x.name.toLowerCase() == ally.name.toLowerCase() || x.name.toLowerCase() == `${ally.name.toLowerCase()} a`)
  if (allyMatches.length > 0) {
    ally.name = getUniqueName(ally.name)
    if (ally.name.endsWith("A")) {
      allyMatches[0].name = ally.name
      ally.name = ally.name.substring(0, ally.name.length - 1) + "B"
    }
  }

  state.allies.push(ally)

  state.show = "none"
  return `[Ally ${toTitleCase(ally.name)} has been created]`
}

function doInitiative(command) {
  for (character of state.characters) {
    var stat = character.stats.find(element => element.name.toLowerCase() == "dexterity")
    if (stat == null) character.calculatedInitiative = calculateRoll("d20")
    else character.calculatedInitiative = calculateRoll("d20") + getModifier(stat.value)
  }

  for (enemy of state.enemies) {
    if (isNaN(enemy.initiative)) enemy.calculatedInitiative = calculateRoll(enemy.initiative)
    else enemy.calculatedInitiative = enemy.initiative
  }

  for (ally of state.allies) {
    if (isNaN(ally.initiative)) ally.calculatedInitiative = calculateRoll(ally.initiative)
    else ally.calculatedInitiative = ally.initiative
  }

  if (state.enemies.length == 0) {
    state.show = "none"
    return "\n[Error: No enemies! Type #addenemy or #encounter]\n"
  }

  createInitiativeOrder()

  if (state.initiativeOrder.length == 0) {
    state.show = "none"
    return "\n[Error: No combatants! Ensure that your characters have health and you have added enemies. See #help]\n"
  }

  state.show = "initiative"
  return "\nBattle has commenced!\n"
}

function doFlee(command) {
  if (state.initiativeOrder.length == 0) {
    state.show = "none"
    return "\n[Error: Not in combat. Type #initiative first]\n"
  }

  var difficulty = getArgument(command, 0)
  if (difficulty != null) {
    const difficultyNames = ["impossible", "extreme", "hard", "medium", "easy", "effortless", "veryeasy", "very easy", "automatic", "auto"]
    const difficultyScores = [30, 25, 20, 15, 10, 5, 5, 5, 0, 0]

    const difficultyPatternNames = [...new Set(difficultyNames)]
    difficultyPatternNames.push("\\d+")
    var difficultyIndex = difficultyNames.indexOf(difficulty)
    if (difficultyIndex >= 0 && difficultyIndex < difficultyNames.length) {
      difficulty = difficultyScores[difficultyIndex]
    }
  } else {
    difficulty = state.defaultDifficulty
  }

  var roll = calculateRoll("d20")

  var text = ""
  if (difficulty != 0) text += `\n[DC: ${difficulty} Roll: ${roll}]\n`
  if (roll >= difficulty) {
    state.initiativeOrder = []
    text += `\nThe party successfuly flees from battle!\n`
  } else text += `\nThe party tries to flee from battle, but fails!\n`

  return text
}

function doTurn(command) {
  if (state.initiativeOrder.length > 0) state.initiativeOrder.splice(0, 1)

  var defeatedEnemies = 0
  for (var enemy of state.enemies) {
    if (enemy.health > 0) continue

    defeatedEnemies++
    var index = state.initiativeOrder.findIndex(x => x.name.toLowerCase() == enemy.name.toLowerCase())
    if (index >= 0) state.initiativeOrder.splice(index, 1)
  }

  var defeatedAllies = 0
  for (var ally of state.allies) {
    if (ally.health > 0) continue

    defeatedAllies++
    var index = state.initiativeOrder.findIndex(x => x.name.toLowerCase() == ally.name.toLowerCase())
    if (index >= 0) state.initiativeOrder.splice(index, 1)
  }

  var defeatedCharacters = 0
  for (var character of state.characters) {
    if (character.health > 0) continue

    defeatedCharacters++
    var index = state.initiativeOrder.findIndex(x => x.name.toLowerCase() == character.name.toLowerCase())
    if (index >= 0) state.initiativeOrder.splice(index, 1)
  }

  if (state.initiativeOrder.length == 0) createInitiativeOrder()
  
  if (state.initiativeOrder.length == 0) {
    return "\nDraw! All combatants have been incapacitated.\n"
  }

  if (defeatedEnemies == state.enemies.length) {
    state.initiativeOrder = []
    return "\nVictory! The party has defeated all opponents.\n"
  }

  if (defeatedCharacters == state.characters.length) {
    state.initiativeOrder = []
    return "\nDefeat! The entire party has been incapacitated.\n"
  }

  return executeTurn(state.initiativeOrder[0])
}

function doRepeatTurn(command) {
  return executeTurn(state.initiativeOrder[0])
}

function doBlock(command) {
  if (state.blockCharacter == null) {
    state.show = "none"
    return "\n[Error: No attack to block. See #help]\n"
  }

  var character = state.characters.find(x => x.name.toLowerCase() == state.blockCharacter.name.toLowerCase())
  if (character == null) character = state.enemies.find(x => x.name.toLowerCase() == state.blockCharacter.name.toLowerCase())
  if (character == null) character = state.allies.find(x => x.name.toLowerCase() == state.blockCharacter.name.toLowerCase())
  if (character == null) {
    state.show = "none"
    return "\n[Error: Character no longer exists. See #help]\n"
  }

  character.health = state.blockPreviousHealth

  var properName = toTitleCase(character.name)
  state.show = "prefix"
  state.prefix = `[${properName} has ${character.health} health]`
  return `\nHowever, the damage to ${properName} was blocked!\n`
}

function doTake(command) {
  var itemIndex = 0
  var arg0 = getArgument(command, 0)
  if (arg0 == null) {
    state.show = "none"
    return "\n[Error: Not enough parameters. See #help]\n"
  }

  if (arg0 == "the") {
    var tempArg = getArgument(command, 1)
    if (tempArg != null && !isNaN(tempArg)) {
      arg0 = tempArg
      itemIndex++
    }
  }

  if (!isNaN(arg0)) itemIndex++

  const item = {
    quantity: isNaN(arg0) ? 1 : arg0,
    name: pluralize(getArgumentRemainder(command, itemIndex).replace(/^((the)|(a)|(an))\s/, ""), true)
  }

  var character = getCharacter()
  var commandName = getCommandName(command)
  var commandNamePlural = pluralize(commandName, character.name == "You") 
  var haveWord = character.name == "You" ? "have" : "has"
  var displayItemName = pluralize(item.name, item.quantity == 1)

  if (item.quantity < 0) item.quantity = 1

  var text = "\n"
  if (item.quantity == 1) text += `${character.name} ${commandNamePlural} ${displayItemName.toLowerCase().startsWith("the ") ? "" : "the "}${displayItemName}.\n`
  else text += `${character.name} ${commandNamePlural} ${item.quantity} ${displayItemName}.\n`

  var index = character.inventory.findIndex((element) => element.name.toLowerCase() == item.name.toLowerCase())
  if (index == -1) {
    character.inventory.push(item)
  } else {
    var existingItem = character.inventory[index]
    existingItem.quantity = parseInt(existingItem.quantity) + parseInt(item.quantity)

    displayItemName = pluralize(existingItem.name, existingItem.quantity == 1)
    text += `${character.name} now ${haveWord} ${existingItem.quantity} ${displayItemName}.\n`
  }

  return text
}

function doTakeWeapon(command) {
  var itemIndex = 3
  var arg0 = getArgument(command, 0)
  if (arg0 == null) {
    state.show = "none"
    return "\n[Error: Not enough parameters. See #help]\n"
  }

  var arg1 = getArgument(command, 1)
  if (arg1 == null) {
    state.show = "none"
    return "\n[Error: Not enough parameters. See #help]\n"
  }
  if (isNaN(arg1)) {
    state.show = "none"
    return "\n[Error: Expected a number. See #help]\n"
  }
  arg1 = parseInt(arg1)

  var arg2 = getArgument(command, 2)
  if (arg2 == null) {
    state.show = "none"
    return "\n[Error: Not enough parameters. See #help]\n"
  }

  var arg3 = getArgument(command, 3)
  if (arg3 == null) {
    state.show = "none"
    return "\n[Error: Not enough parameters. See #help]\n"
  }

  if (arg3 == "the") {
    var tempArg = getArgument(command, 1)
    if (tempArg != null && !isNaN(tempArg)) {
      arg3 = tempArg
      itemIndex++
    }
  }

  const item = {
    quantity: 1,
    name: pluralize(getArgumentRemainder(command, itemIndex).replace(/^((the)|(a)|(an))\s/, ""), true),
    damageDice: arg0,
    toHitBonus: arg1,
    ability: arg2
  }

  var character = getCharacter()
  var commandName = "take"
  var commandNamePlural =  pluralize(commandName, character.name == "You")
  var haveWord = character.name == "You" ? "have" : "has"

  var text = "\n"
  text += `${character.name} ${commandNamePlural} ${item.name.toLowerCase().startsWith("the ") ? "" : "the "}${item.name}.\n`

  var index = character.inventory.findIndex((element) => element.name.toLowerCase() == item.name.toLowerCase())
  if (index == -1) {
    character.inventory.push(item)
  } else {
    var existingItem = character.inventory[index]
    existingItem.quantity = parseInt(existingItem.quantity) + parseInt(item.quantity)

    let displayItemName = pluralize(existingItem.name, existingItem.quantity == 1)
    text += `${character.name} now ${haveWord} ${existingItem.quantity} ${displayItemName}.\n`
  }

  return text
}

function doTakeArmor(command) {
  var itemIndex = 1
  var arg0 = getArgument(command, 0)
  if (arg0 == null) {
    state.show = "none"
    return "\n[Error: Not enough parameters. See #help]\n"
  }

  var arg1 = getArgument(command, 1)
  if (arg1 == null) {
    state.show = "none"
    return "\n[Error: Not enough parameters. See #help]\n"
  }

  const item = {
    quantity: 1,
    name: pluralize(getArgumentRemainder(command, itemIndex).replace(/^((the)|(a)|(an))\s/, ""), true),
    ac: arg0,
  }

  var character = getCharacter()
  var commandName = "take"
  var commandNamePlural =  pluralize(commandName, character.name == "You") 
  var haveWord = character.name == "You" ? "have" : "has"

  var text = "\n"
  text += `${character.name} ${commandNamePlural} ${item.name.toLowerCase().startsWith("the ") ? "" : "the "}${item.name}.\n`

  var index = character.inventory.findIndex((element) => element.name.toLowerCase() == item.name.toLowerCase())
  if (index == -1) {
    character.inventory.push(item)
  } else {
    var existingItem = character.inventory[index]
    existingItem.quantity = parseInt(existingItem.quantity) + parseInt(item.quantity)

    let displayItemName = pluralize(existingItem.name, existingItem.quantity == 1)
    text += `${character.name} now ${haveWord} ${existingItem.quantity} ${displayItemName}.\n`
  }

  return text
}

const helpDialog_itemStoryCards = `<><> Item Story Cards <><>
* Every item should be an "Item" type story card, and must include a category and rarity.
* Format each item story card as follows:
  -- Type: {{ Item - Category - Rarity }}
  -- Title: The name of the item.
  -- Entry: A brief description to help the AI understand what this item represents.
  -- Keywords: For unique items only. Avoid common words or phrases!
  -- Description: Use JSON to define item behavior and reward values.

Example JSON format:
{"item": "Orange", "minRewardAmount": 1, "maxRewardAmount": 10, "rewardChance": 1}`

const helpDialog_lootStoryCards = `<><> Loot Table Story Cards <><>
* Thematic loot tables control the quantity and chance of rewards.
* Format each loot table story card as follows:
  -- Type: {{ LootTable - Theme }}
  -- Title: {{ LootTable - Theme }}
  -- Entry: A short explanation of what this loot table thematically represents.
  -- Keywords: Leave blank!
  -- Description: A JSON array defining the loot and its drop chances.

Example JSON format:
[
  {"item": "Orange", "minRewardAmount": 1, "maxRewardAmount": 10, "rewardChance": 1},
  {"item": "Apple Sword", "minRewardAmount": 1, "maxRewardAmount": 1, "rewardChance": 0.1}
]

Note: rewardChance is a float from 0 to 1.
1 = 100% chance. 0.1 = 10% chance.`

const HelpDialog_rewards = `#Reward Command Format: {{ (you|character) #reward (theme) (quantity) }}
-- Use this command to give the character random rewards from a loot table.
-- (quantity) is optional; defaults to 1.
-- If the theme contains spaces, wrap it in quotes (e.g. "ancient ruins").
-- If the theme does not exist, all items will be used as the loot pool.
-- Special Case: If (theme = item), all items are used directly, skipping loot tables.
-- Cheat Case: You can filter directly using the follow as themes:
     "item - (category)"
     "item - (category) - (rarity)"

To create your own:
Type #help "item story cards"
Type #help "loot story cards"`


function doReward(command) {
  const character = getCharacter();
  const rewardTheme = getArgument(command, 0);

  if (!rewardTheme) {
    state.show = "none";
    return `\n[Error: No story cards found with that theme.]\n`;
  }

  let rewardQuantity = parseInt(getArgument(command, 1)) || 1;
  rewardQuantity = Math.max(rewardQuantity, 1);

  let lootTable = [];

  if (rewardTheme.toLowerCase().startsWith("item")) {
    lootTable = getStoryCardListByType(rewardTheme, false).map(card => JSON.parse(card.description));
  } else {
    const lootCard = getStoryCardListByType("loot table - " + rewardTheme, true)[0];
    if (!lootCard) {
      state.show = "none";
      return `\n[Error: No loot tables found in the story cards with that theme.]\n`;
    }
    lootTable = JSON.parse(lootCard.description);
  }

  if (lootTable.length < 1) {
    state.show = "none";
    return `\n[Error: There is no loot in the loot table.]\n`;
  }

  const totalRewards = {};
  for (let i = 0; i < rewardQuantity; i++) {
    const roll = getRandomFloat(0, 1);
    const possibleDrops = lootTable.filter(item => roll <= item.rewardChance);

    if (possibleDrops.length > 0) {
      const drop = possibleDrops[getRandomInteger(0, possibleDrops.length - 1)];
      const amount = getRandomInteger(drop.minRewardAmount, drop.maxRewardAmount);
      totalRewards[drop.item] = (totalRewards[drop.item] || 0) + amount;
    }
  }

  let text = `${character.name} found while searching${rewardTheme.includes("item")?" for items":" the "+rewardTheme}:`;
  if (Object.keys(totalRewards).length > 0) {
    for (const [item, qty] of Object.entries(totalRewards)) {
      doTake(`take ${qty} ${item}`);
      if (qty > 1) {
        text += ` ${qty} ${pluralize(item)}!`;
      } else {
        const article = /^[aeiou]/i.test(item) ? "an" : "a";
        text += ` ${article} ${item}!`;
      }
    }
  } else {
    text += " nothing!";
  }

  return text;
}

// Since I've removed the itemShop, there may be some broken logic here
function doEquip(command) {
  let character = getCharacter()
  let arg0 = getArgument(command, 0)
  if (arg0 == null) {
    state.show = "none"
    return "\n[Error: Not enough parameters. See #help]\n"
  }

  var dontWord = character.name == "You" ? "don't" : "doesn't"

  let itemName = getArgumentRemainder(command, 0)

  let item = character.inventory.find((element) => element.name.toLowerCase() == itemName.toLowerCase())

  if (item == null) return `${character.name} tried to equip ${toTitleCase(itemName)}, but ${dontWord} possess it`

  let text = `\n${character.name} equipped the item ${toTitleCase(itemName)}!\n`
  if ("damageDice" in item && "toHitBonus" in item) {
    let abilityValue = character.stats.find((element) => element.name.toLowerCase() == item.ability)
    let ability = abilityValue == null ? 10 : abilityValue.value
    let abilityModifier = Math.ceil((ability - 10) / 2)

    let damageBase = item.damageDice.replaceAll(/\+.*/gi, "")
    let damageModifier = parseInt(item.damageDice.replaceAll(/.*\+/gi, "")) + abilityModifier
    character.damage = `${damageBase}+${damageModifier}`
    character.proficiency = abilityModifier
    character.meleeStat = item.ability
  } else if ("ac" in item) {
    let dexterityStat = character.stats.find((element) => element.name.toLowerCase() == "dexterity")
    let dexterity = dexterityStat == null ? 10 : dexterityStat.value
    let ac = parseInt(item.ac.replaceAll(/(?<=.)\+.*/gi, ""))
    if (/.*\+dmax2/i.test(item.ac)) character.ac = ac + Math.max(2, Math.ceil((dexterity - 10) / 2))
    else if (/.*\+d/i.test(item.ac)) character.ac = ac + Math.ceil((dexterity - 10) / 2)
    else if (/\+.*/i.test(item.ac)) character.ac += ac
    else character.ac = ac
  }
  
  text += "\n"
  return text
}

function doDrop(command) {
  var character = getCharacter()
  var commandName = getCommandName(command)
  var arg0 = getArgument(command, 0)
  if (arg0 == null) {
    state.show = "none"
    return "\n[Error: Not enough parameters. See #help]\n"
  }

  var characterNameAdjustedCase = character.name == "You" ? "you" : character.name
  var dontWord = character.name == "You" ? "don't" : "doesn't"
  var haveWord = character.name == "You" ? "have" : "has"
  var tryWord = character.name == "You" ? "try" : "tries"

  var itemArgIndex = 0
  if (isNaN(arg0)) {
    if (allSynonyms.indexOf(arg0.toLowerCase()) > -1) {
      arg0 = Number.MAX_SAFE_INTEGER
      itemArgIndex++
    } else {
      arg0 = 1
    }
  } else {
    itemArgIndex++
  }

  const item = {
    quantity: arg0,
    name: pluralize(getArgumentRemainder(command, itemArgIndex).replace(/^((the)|(a)|(an))\s/, ""), true)
  }

  var displayItemName = pluralize(item.name, item.quantity == 1)
  
  if (item.quantity < 0) item.quantity = 1

  var text = "\n"
  var index = character.inventory.findIndex((element) => element.name.toLowerCase() == item.name.toLowerCase())
  if (index == -1) {
    if (item.quantity == 1) text += `${character.name} ${tryWord} to ${commandName} the ${displayItemName}, but ${character.name} ${dontWord} have any.`
    else text += `${character.name} ${tryWord} to ${commandName} ${item.quantity == Number.MAX_SAFE_INTEGER ? arg0 : item.quantity} ${displayItemName}, but ${characterNameAdjustedCase} ${dontWord} have any.`
  } else {
    var existingItem = character.inventory[index]
  
    if (existingItem.quantity == 1) text = `\n${character.name} ${pluralize(commandName, character.name == "You")} the ${pluralize(displayItemName, true)}.\n`
    else if (parseInt(item.quantity) >= parseInt(existingItem.quantity)) text = `${character.name} ${pluralize(commandName, character.name == "You")} all ${existingItem.quantity} of the ${displayItemName}.`
    else text =  `\n${character.name} ${pluralize(commandName, character.name == "You")} ${item.quantity} ${displayItemName}. \n`

    existingItem.quantity -= item.quantity
    if (existingItem.quantity <= 0) {
      existingItem.quantity = 0
      character.inventory.splice(index, 1)
    }
    if (existingItem.quantity > 0) {
      displayItemName = pluralize(existingItem.name, existingItem.quantity == 1)
      text += `${character.name} now ${haveWord} ${existingItem.quantity} ${displayItemName}.\n`
    }
  }

  return text
}

function doGive(command) {
  var character = getCharacter()
  var commandName = getCommandName(command)

  var arg0 = getArgument(command, 0)
  if (arg0 == null) {
    state.show = "none"
    return "\n[Error: Not enough parameters. See #help]\n"
  }
  var arg1 = getArgument(command, 1)
  if (arg1 == null) {
    state.show = "none"
    return "\n[Error: Not enough parameters. See #help]\n"
  }

  var foundAll = allSynonyms.indexOf(arg1) > -1

  const item = {
    quantity: !isNaN(arg1) ? arg1 : foundAll ? Number.MAX_SAFE_INTEGER : 1,
    name: pluralize(getArgumentRemainder(command, isNaN(arg1) && !foundAll ? 1 : 2).replace(/^((the)|(a)|(an)|(of the))\s/, ""), true)
  }

  var otherCharacter = getCharacter(arg0)
  if (otherCharacter == null || otherCharacter.name == "You" && arg0.toLowerCase() != "you") {
    state.show = "none"
    return "\n[Error: Target character does not exist. See #characters]\n"
  }

  var characterNameAdjustedCase = character.name == "You" ? "you" : character.name
  var dontWord = character.name == "You" ? "don't" : "doesn't"
  var haveWord = character.name == "You" ? "have" : "has"
  var tryWord = character.name == "You" ? "try" : "tries"
  var otherHaveWord = otherCharacter.name == "You" ? "have" : "has"
  var otherNameAdjustedCase = otherCharacter.name == "You" ? "you" : otherCharacter.name
  var displayItemName = pluralize(item.name, item.quantity == 1)
  var characterQuantityText = ""

  if (item.quantity < 0) item.quantity = 1

  var text = "\n\n"

  var index = character.inventory.findIndex((element) => element.name.toLowerCase() == item.name.toLowerCase())
  if (index == -1) {
    if (item.quantity == 1) text += `${character.name} ${tryWord} to ${pluralize(commandName, true)} the ${displayItemName}, but ${characterNameAdjustedCase} ${dontWord} have any.`
    else text += `${character.name} ${tryWord} to ${pluralize(commandName, true)} ${item.quantity == Number.MAX_SAFE_INTEGER ? arg0 : item.quantity} ${displayItemName}, but ${characterNameAdjustedCase} ${dontWord} have any.`
    return text + "\n\n"
  } else {
    var existingItem = character.inventory[index]

    if (item.quantity >= existingItem.quantity) {
      item.quantity = existingItem.quantity
      existingItem.quantity = 0
      character.inventory.splice(index, 1)
    } else {
      existingItem.quantity -= item.quantity
    }

    if (existingItem.quantity > 0) {
      characterQuantityText = ` ${character.name} now ${haveWord} ${existingItem.quantity} ${pluralize(existingItem.name, existingItem.quantity == 1)}.`
    } else if (item.quantity > 1) {
      characterQuantityText = ` ${character.name} ${dontWord} have any more.`
    }
  }

  if (item.quantity == 1) text += `${character.name} ${pluralize(commandName, character.name == "You")} ${otherNameAdjustedCase} the ${displayItemName}.`
  else text += `${character.name} ${pluralize(commandName, character.name == "You")} ${otherNameAdjustedCase} ${item.quantity} ${displayItemName}.`

  var otherIndex = otherCharacter.inventory.findIndex((element) => element.name.toLowerCase() == item.name.toLowerCase())
  if (otherIndex == -1) {
    otherCharacter.inventory.push(item)
  } else {
    var existingItem = otherCharacter.inventory[otherIndex]
    existingItem.quantity = parseInt(existingItem.quantity) + parseInt(item.quantity)

    displayItemName = pluralize(existingItem.name, existingItem.quantity == 1)
    text += ` ${otherCharacter.name} now ${otherHaveWord} ${existingItem.quantity} ${displayItemName}.`
  }

  return text + characterQuantityText + "\n\n"
}

function doBuy(command) {
  var character = getCharacter()

  command = command.replaceAll(/\s+((for)|(with)|(the)|(a)|(an))\s+/g, " ")

  var args = []
  args.push(getArgument(command, 0))
  if (args[0] == null) {
    state.show = "none"
    return "\n[Error: Not enough parameters. See #help]\n"
  }
  args.push(getArgument(command, 1))
  if (args[1] == null) {
    state.show = "none"
    return "\n[Error: Not enough parameters. See #help]\n"
  }
  args.push(getArgument(command, 2))
  args.push(getArgument(command, 3))

  var buyQuantity
  if (isNaN(args[0])) {
    buyQuantity = 1
  } else {
    buyQuantity = args[0]
    args.splice(0, 1)
  }

  var buyName
  buyName = pluralize(args[0], true)

  var sellQuantity
  if (isNaN(args[1])) {
    sellQuantity = 1
  } else {
    sellQuantity = args[1]
    args.splice(1, 1)
  }

  var sellName = pluralize(args[1], true)

  var characterNameAdjustedCase = character.name == "You" ? "you" : character.name
  var dontWord = character.name == "You" ? "don't" : "doesn't"
  var haveWord = character.name == "You" ? "have" : "has"
  var tryWord = character.name == "You" ? "try" : "tries"
  var tradeWord = character.name == "You" ? "trade" : "trades"
  var buyWord = character.name == "You" ? "buy" : "buys"
  var displayItemName = pluralize(sellName, sellQuantity == 1)
  var buyItemTotal = 0;
  var sellItemTotal = 0;

  if (sellQuantity < 0) sellQuantity = 1

  var text = "\n\n"

  var index = character.inventory.findIndex((element) => element.name.toLowerCase() == sellName.toLowerCase())
  if (index == -1) {
    if (sellQuantity == 1) text += `${character.name} ${tryWord} to trade the ${displayItemName}, but ${characterNameAdjustedCase} ${dontWord} have any.`
    else text += `${character.name} ${tryWord} to trade ${sellQuantity} ${displayItemName}, but ${characterNameAdjustedCase} ${dontWord} have any.`
    return text + "\n\n"
  } else {
    var existingItem = character.inventory[index]

    if (sellQuantity >= existingItem.quantity) {
      sellQuantity = existingItem.quantity
      existingItem.quantity = 0
      character.inventory.splice(index, 1)
    } else {
      existingItem.quantity -= sellQuantity
    }

    sellItemTotal = existingItem.quantity
  }

  var suffix = `${buyQuantity} ${pluralize(buyName)}`
  if (buyQuantity == 1) suffix = `the ${pluralize(buyName, true)}`

  if (sellQuantity == 1) text += `${character.name} ${tradeWord} the ${displayItemName} for ${suffix}.`
  else text += `${character.name} ${tradeWord} ${sellQuantity} ${displayItemName} for ${suffix}.`

  index = character.inventory.findIndex((element) => element.name.toLowerCase() == buyName.toLowerCase())
  if (index == -1) {
    character.inventory.push({name: buyName, quantity: buyQuantity})
    buyItemTotal = buyQuantity
  } else {
    var existingItem = character.inventory[index]
    existingItem.quantity = parseInt(existingItem.quantity) + parseInt(buyQuantity)

    buyItemTotal = existingItem.quantity
  }

  text += ` ${character.name} now ${haveWord} ${sellItemTotal} ${pluralize(sellName, sellItemTotal == 1)} and ${buyItemTotal} ${pluralize(buyName, buyItemTotal == 1)}.`
  return text + "\n\n"
}

function doSell(command) {
  command = command.replace(/\s+((for)|(with))\s+/, " ")

  var args = []
  args.push(getArgument(command, 0))
  if (args[0] == null) {
    state.show = "none"
    return "\n[Error: Not enough parameters. See #help]\n"
  }
  args.push(getArgument(command, 1))
  if (args[1] == null) {
    state.show = "none"
    return "\n[Error: Not enough parameters. See #help]\n"
  }
  args.push(getArgument(command, 2))
  args.push(getArgument(command, 3))

  var sellQuantity
  if (isNaN(args[0])) {
    sellQuantity = 1
  } else {
    sellQuantity = args[0]
    args.splice(0, 1)
  }

  var sellName
  sellName = args[0]

  var buyQuantity
  if (isNaN(args[1])) {
    buyQuantity = 1
  } else {
    buyQuantity = args[1]
    args.splice(1, 1)
  }

  var buyName = args[1]

  return doBuy(`buy ${buyQuantity} ${buyName} ${sellQuantity} ${sellName}`)
}

function doRenameItem(command) {
  var arg0 = getArgument(command, 0)
  if (arg0 == null) {
    state.show = "none"
    return "\n[Error: Not enough parameters. See #help]\n"
  }

  var arg1 = getArgument(command, 1)
  if (arg1 == null) {
    state.show = "none"
    return "\n[Error: Not enough parameters. See #help]\n"
  }

  var commandName = getCommandName(command)
  var character = getCharacter()
  var haveWord = character.name == "You" ? "have" : "has"
  var possessiveName = getPossessiveName(character.name)

  state.show = "none"
  var text = `\n[${possessiveName} ${arg0} has been renamed to ${arg1}]\n`

  var index = character.inventory.findIndex((element) => element.name.toLowerCase() == arg0.toLowerCase())
  if (index >= 0 ) {
    var existingItem = character.inventory[index]
    existingItem.name = arg1
  }

  return text
}

function doInventory(command) {
  state.show = "inventory"
  return " "
}

function doLearnSpell(command) {
  var arg0 = getArgumentRemainder(command, 0)
  if (arg0 == "") {
    state.show = "none"
    return "\n[Error: Not enough parameters. See #help]\n"
  }

  var character = getCharacter()
  var tryWord = character.name == "You" ? "try" : "tries"

  var found = character.spells.find((element) => element == arg0)
  if (found != null) return `\n[${character.name} ${tryWord} to learn the spell ${arg0}, but already knows it]\n`

  character.spells.push(arg0)
  addStoryCard(arg0, "", "spell")

  return `\n${character.name} learned the spell ${toTitleCase(arg0)}.\n`
}

function doForgetSpell(command) {
  var character = getCharacter()
  var arg0 = getArgumentRemainder(command, 0)
  if (arg0 == "") {
    state.show = "none"
    return "\n[Error: Not enough parameters. See #help]\n"
  }
  var dontWord = character.name == "You" ? "don't" : "doesn't"
  var tryWord = character.name == "You" ? "try" : "tries"

  var found = character.spells.find(x => x.toLowerCase() == arg0.toLowerCase())
  if (found == null) {
    state.show = "none"
    return `\n[${character.name} ${tryWord} to forget the spell ${arg0}, but ${character.name} ${dontWord} even know it]\n`
  }
  
  var index = character.spells.findIndex(x => x.toLowerCase() == arg0.toLowerCase())
  character.spells.splice(index, 1)

  state.show = "none"
  return `\n[${character.name} forgot the spell ${arg0}]\n`
}

function doRemoveStat(command) {
  var character = getCharacter()
  var arg0 = getArgumentRemainder(command, 0)
  if (arg0 == "") {
    state.show = "none"
    return "\n[Error: Not enough parameters. See #help]\n"
  }
  var dontWord = character.name == "You" ? "don't" : "doesn't"
  var tryWord = character.name == "You" ? "try" : "tries"

  var found = character.stats.find((element) => element == arg0)
  if (found == null) return `\n[${character.name} ${tryWord} to remove the ability ${arg0}, but ${character.name} ${dontWord} even know it]\n`
  
  var index = character.stats.findIndex((element) => element.toLowerCase() == arg0.toLowerCase())
  character.stats.splice(index, 1)

  return `\n[${character.name} removed the ability ${arg0}]\n`
}

function doRemoveSkill(command) {
  var character = getCharacter()
  var arg0 = getArgumentRemainder(command, 0)
  if (arg0 == "") {
    state.show = "none"
    return "\n[Error: Not enough parameters. See #help]\n"
  }
  var dontWord = character.name == "You" ? "don't" : "doesn't"
  var tryWord = character.name == "You" ? "try" : "tries"

  var found = character.skills.find((element) => element == arg0)
  if (found == null) return `\n[${character.name} ${tryWord} to remove the skill ${arg0}, but ${character.name} ${dontWord} even know it]\n`
  
  var index = character.skills.findIndex((element) => element.toLowerCase() == arg0.toLowerCase())
  character.skills.splice(index, 1)

  return `\n[${character.name} removed the skill ${arg0}]\n`
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
    state.show = "none"
    return "\n[Error: Not enough parameters. See #help]\n"
  }
  var targetText = null
  var atWord = null

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
    return `\n[${toTitleCase(character.name)} ${tryWord} to cast the spell ${spell}, but ${character.name == "You" ? "you" : toTitleCase(character.name)} ${dontWord} know it]\n`
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

  var enemyString = ""
  var allyString = ""
  if (targetText != null && state.initiativeOrder.length > 0) {
    var foundEnemy

    for (var enemy of state.enemies) {
      if (targetText.toLowerCase().includes(enemy.name.toLowerCase())) {
        foundEnemy = enemy
        break
      }
    }

    if (foundEnemy == null) {
      var indexMatches = targetText.match(/(?<=enemy\s*)\d+/gi)
      if (indexMatches != null) {
        foundEnemy = state.enemies[parseInt(indexMatches[0]) - 1]
        targetText = targetText.replace(/enemy\s*d+/gi, foundEnemy.name)
      }
    }

    var foundAlly

    if (foundEnemy == null) for (var ally of state.allies) {
      if (targetText.toLowerCase().includes(ally.name.toLowerCase())) {
        foundAlly = ally
        break
      }
    }

    if (foundAlly == null) {
      var indexMatches = targetText.match(/(?<=ally\s*)\d+/gi)
      if (indexMatches != null) {
        foundAlly = state.allies[parseInt(indexMatches[0]) - 1]
        targetText = targetText.replace(/ally\s*d+/gi, foundAlly.name)
      }
    }

    var damage = roll == 20 ? calculateRoll("2d6") + calculateRoll("2d6") : calculateRoll("2d6")

    var damageMatches = targetText.match(/\d*d\d+((\+|-)d+)?/gi)
    if (damageMatches != null) damage = roll == 20 ? calculateRoll(damageMatches[0]) + calculateRoll(damageMatches[0]) : calculateRoll(damageMatches[0])
    else {
      damageMatches = targetText.match(/\d+/g)
      if (damageMatches != null) damage = roll == 20 ? parseInt(damageMatches[damageMatches.length - 1]) * 2 : parseInt(damageMatches[damageMatches.length - 1])
    }

    if (foundEnemy != null) {
      if (usingDefaultDifficulty) difficulty = foundEnemy.ac
      if (roll == 20 || roll + modifier >= difficulty) {
        if (roll == 20) enemyString += `\nCritical Damage: ${damage}\n`
        else enemyString += `\nDamage: ${damage}\n`

        state.blockCharacter = foundEnemy
        state.blockPreviousHealth = foundEnemy.health
        foundEnemy.health = Math.max(0, foundEnemy.health - damage)
        if (foundEnemy.health == 0) enemyString += ` ${toTitleCase(foundEnemy.name)} has been defeated!\n`
        else enemyString += ` ${toTitleCase(foundEnemy.name)} has ${foundEnemy.health} health remaining!\n`
      }
    }

    if (foundAlly != null) {
      if (usingDefaultDifficulty) difficulty = foundAlly.ac
      if (roll == 20 || roll + modifier >= difficulty) {
        if (roll == 20) allyString += `\nCritical Damage: ${damage}\n`
        else allyString += `\nDamage: ${damage}\n`

        state.blockCharacter = foundAlly
        state.blockPreviousHealth = foundAlly.health
        foundAlly.health = Math.max(0, foundAlly.health - damage)
        if (foundAlly.health == 0) allyString += ` ${toTitleCase(foundAlly.name)} has been defeated!\n`
        else allyString += ` ${toTitleCase(foundAlly.name)} has ${foundAlly.health} health remaining!\n`
      }
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

  if (enemyString != null) text += enemyString
  if (allyString != null) text += allyString

  if (difficulty > 0 && (roll + modifier >= difficulty || roll == 20)) text += addXpToAll(Math.floor(state.autoXp * clamp(difficulty, 1, 20) / 20))
  return `\n${text}\n`
}

function doShowCharacters(command) {
  state.show = "characters"
  return " "
}

function doSpellbook(command) {
  state.show = "spellbook"
  return " "
}

function doShowSkills(command) {
  state.show = "skills"
  return " "
}
function doShowStats(command) {
  state.show = "stats"
  return " "
}

function doClearNotes(command) {
  state.notes = []
  
  state.show = "clearNotes"
  return " "
}

function doClearInventory(command) {
  var character = getCharacter()
  character.inventory = []
  state.show = "clearInventory"
  return " "
}

function doEraseNote(command) {
  var arg0 = getArgumentRemainder(command, 0)
  if (arg0 == null) arg0 = 1

  var list = arg0.split(/\D+/)
  list.sort(function(a, b) {
    return b - a;
  });

  var text = "\n"
  list.forEach(x => {
    var num = parseInt(x) - 1
    if (num >= state.notes.length) {
      state.show = "none"
      return `\n[Error: Note ${x} does not exist. Type #shownotes]\n`
    }

    state.notes.splice(num, 1)
    text += `[Note #${x} removed]\n`
  })
  
  state.show = "none"
  return text
}

function doRemoveCharacter(command) {
  var arg0 = getArgumentRemainder(command, 0)
  if (arg0 == null) {
    state.show = "none"
    return "\n[Error: Not enough parameters. See #help]\n"
  }

  for (var i = 0; i < state.characters.length; i++) {
    var character = state.characters[i]
    if (character.name.toLowerCase() == arg0.toLowerCase()) {
      state.characters.splice(i, 1)
      state.show = "none"
      return `[Character ${character.name} removed]`
    }
  }

  return `[Character ${arg0} was not found]`
}

function doClearSpells(command) {
  var character = getCharacter()
  character.spells = []
  state.show = "clearSpells"
  return " "
}

function doClearStats(command) {
  var character = getCharacter()
  character.stats = []
  state.show = "clearStats"
  return " "
}

function doClearSkills(command) {
  var character = getCharacter()
  character.skills = []
  state.show = "clearSkills"
  return " "
}

function doVersion(command) {
  state.show = "none"
  return `[${version}]`
}

function doSetDamage(command) {
  var character = getCharacter()
  var arg0 = getArgument(command, 0)
  if (arg0 == null) {
    state.show = "none"
    return "\n[Error: Not enough parameters. See #help]\n"
  }

  if (/^\d*d\d+((\+|-)\d+)?$/gi.test(arg0)) {
    character.damage = arg0
  } else if (!isNaN(arg0)) {
    character.damage = parseInt(arg0)
  } else {
    state.show = "none"
    return "\n[Error: Not a number. See #help]\n"
  }

  var possessiveName = getPossessiveName(character.name)

  state.show = "none"
  return `\n[${possessiveName} attack damage is set to ${character.damage}]\n`
}

function doSetProficiency(command) {
  var character = getCharacter()
  var arg0 = getArgument(command, 0)
  if (arg0 == null) {
    state.show = "none"
    return "\n[Error: Not enough parameters. See #help]\n"
  }

  if (/^\d*d\d+((\+|-)\d+)?$/gi.test(arg0)) {
    character.hitModifier = calculateRoll(arg0)
  } else if (!isNaN(arg0)) {
    character.hitModifier = parseInt(arg0)
  } else {
    state.show = "none"
    return "\n[Error: Not a number. See #help]\n"
  }

  var possessiveName = getPossessiveName(character.name)

  state.show = "none"
  return `\n[${possessiveName} proficiency is set to ${character.hitModifier}]\n`
}

function doReset(command) {
  state.notes = []
  state.characters = []
  state.enemies = null
  state.allies = null
  state.initiativeOrder = []
  state.defaultDifficulty = null
  state.autoXp = null
  state.day = null

  state.show = "reset"
  return " "
}

function doHelp(command) {
  const helpType = getArgument(command, 0)
  if (helpType) state.show = "help "+helpType
  else state.show = "help"
  return " "
}

// Don't modify this part
modifier(text)