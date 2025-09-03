// Based on version "Hashtag DnD v0.7.0" by Raeleus
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

/**
 * Builds and returns the command registry.
 * Optionally searches by a synonym and returns just that entry.
 * @param {string} [commandName] Optional command name or synonym to look up.
 * @returns {object[]|object|null} The entire registry if no argument is given,
 *                                 a single command object if found,
 *                                 or null if not found.
 */
function commandRegistry(commandName) {
  const registry = [
      // <><> General
      // TODO: A check command that uses AI Dungeon to determine the difficulty &/or skill (would have to be a state + continue action)
      { handler: doRoll,             helpText: doRollHelp,             synonyms: ["roll"] },
      { handler: doTry,              helpText: doTryHelp,              synonyms: ["try", "tries", "attempt", "attempts"] },
      { handler: doCheck,            helpText: doCheckHelp,            synonyms: ["check"] },
      
      // <><> Time
      // TODO: Idea for hungry, thirst, sleep, that ties in D&D exhaustion
      { handler: doShowDay,          helpText: doShowDayHelp,          synonyms: ["showday", "showdate", "day", "date"] },
      { handler: doSetDay,           helpText: doSetDayHelp,           synonyms: ["setday", "setdate"] },
      { handler: doRest,             helpText: doRestHelp,             synonyms: ["rest", "longrest", "shortrest", "sleep", "nap"] },
      
      // System
      { handler: doReset,            helpText: doResetHelp,            synonyms: ["reset", "cleardata"] },
      { handler: doVersion,          helpText: doVersionHelp,          synonyms: ["version", "ver"] },
      { handler: doHelp,             helpText: doHelpHelp,             synonyms: ["help"] },
      { handler: doTest,             helpText: doTestHelp,             synonyms: ["testcode", "debug"]},
      
      // <><> Character
      // TODO: Add a character creation from JSON format in plot essentials (only on first load)
      // This would allow for authors to ask the character creation questions up front, and not force players use the #create command
      { handler: doCreate,           helpText: doCreateHelp,           synonyms: ["create", "generate", "start", "begin", "setup", "new"] },
      { handler: doRenameCharacter,  helpText: doRenameCharacterHelp,  synonyms: ["renamecharacter"] },
      { handler: doBio,              helpText: doBioHelp,              synonyms: ["bio", "biography", "summary", "character", "profile"] },
      { handler: doSetClass,         helpText: doSetClassHelp,         synonyms: ["setclass"] },
      { handler: doShowCharacters,   helpText: doShowCharactersHelp,   synonyms: ["characters", "party", "team"] },
      { handler: doRemoveCharacter,  helpText: doRemoveCharacterHelp,  synonyms: ["removecharacter", "deletecharacter"] },
      
      // <><> Levels & Experience
      { handler: doSetExperience,    helpText: doSetExperienceHelp,    synonyms: ["setexperience", "setexp", "setxp", "setexperiencepoints"] },
      { handler: doAddExperience,    helpText: doAddExperienceHelp,    synonyms: ["addexperience", "addexp", "addxp"] },
      { handler: doLevelUp,          helpText: doLevelUpHelp,          synonyms: ["levelup", "level"] },
      
      // <><> Abilities/Attributes/Stats
      // TODO: Clear up stat vs attribute terminology to use only one of the above
      { handler: doSetStat,          helpText: doSetStatHelp,          synonyms: ["setstat", "setattribute", "setability"] },
      //TODO: may need to rename this, as addStat adds stat points, rather than adding a new stat, which is what setStat does
      { handler: doAddStat,          helpText: doAddStatHelp,          synonyms: ["addstat", "upgradestat", "updatestat", "spendstat"] },
      { handler: doShowStats,        helpText: doShowStatsHelp,        synonyms: ["showstats", "stats", "viewstats", "showabilities", "abilities", "viewabilities", "showattributes", "attributes", "viewattributes"] },
      { handler: doRemoveStat,       helpText: doRemoveStatHelp,       synonyms: ["removestat", "deletestat", "removeability", "deleteability", "removeattribute", "deleteattribute"] },
      { handler: doClearStats,       helpText: doClearStatsHelp,       synonyms: ["clearstats", "clearabilities", "clearattributes"] },
      
      // <><> Skills
      { handler: doSetSkill,         helpText: doSetSkillHelp,         synonyms: ["setskill"] },
      //TODO: may need to rename this, as addSkill adds skill points, rather than adding a new skill, which is what setSkill does
      { handler: doAddSkill,         helpText: doAddSkillHelp,         synonyms: ["addskill", "upgradeskill", "updateskill", "spendskill"] },
      { handler: doShowSkills,       helpText: doShowSkillsHelp,       synonyms: ["showskills", "skills"] },
      { handler: doRemoveSkill,      helpText: doRemoveSkillHelp,      synonyms: ["removeskill", "deleteskill"] },
      { handler: doClearSkills,      helpText: doClearSkillsHelp,      synonyms: ["clearskills"] },
      
      // <><> Notes
      { handler: doShowNotes,        helpText: doShowNotesHelp,        synonyms: ["notes", "shownotes", "viewnotes"] },
      { handler: doNote,             helpText: doNoteHelp,             synonyms: ["note", "takenote", "setnote", "createnote", "remember"] },
      { handler: doClearNotes,       helpText: doClearNotesHelp,       synonyms: ["clearnotes"] },
      { handler: doEraseNote,        helpText: doEraseNoteHelp,        synonyms: ["erasenote", "removenote", "deletenote", "cancelnote"] },
      
      // <><> Inventory
      //TODO: make currency a seperate feature
      { handler: doTake,             helpText: doTakeHelp,             synonyms: ["take", "steal", "get", "grab", "receive", "pocket", "bag", "stow"] },
      { handler: doLoot,             helpText: doLootHelp,             synonyms: ["loot", "search", "investigate", "harvest"] },
      { handler: doDrop,             helpText: doDropHelp,             synonyms: ["remove", "discard", "drop", "leave", "dispose", "trash", "donate", "eat", "consume", "use", "drink", "pay", "lose"] },
      { handler: doGive,             helpText: doGiveHelp,             synonyms: ["give", "handover", "hand", "gift"] },
      { handler: doBuy,              helpText: doBuyHelp,              synonyms: ["buy", "purchase", "barter", "trade", "swap", "exchange"] },
      { handler: doSell,             helpText: doSellHelp,             synonyms: ["sell"] },

      { handler: doInventory,        helpText: doInventoryHelp,        synonyms: ["inv", "inventory", "backpack", "gear", "showinv", "showinventory", "viewinventory", "viewinv"] },
      { handler: doClearInventory,   helpText: doClearInventoryHelp,   synonyms: ["clearinventory", "clearinv", "emptyinventory", "emptybackpack", "clearbackpack", "emptygear", "cleargear"] },

      // <><> Item Management
      { handler: doRenameItem,       helpText: doRenameItemHelp,       synonyms: ["renameitem", "renameobject", "renamegear", "renameequipment"] },
      { handler: doItemDamage,       helpText: doItemDamageHelp,       synonyms: ["itemdamage", "itemdmg"] },
      { handler: doItemLevel,        helpText: doItemLevelHelp,        synonyms: ["itemlevel", "itemlvl"] },
      
      // <><> Spells
      { handler: doLearnSpell,       helpText: doLearnSpellHelp,       synonyms: ["learnspell", "learnmagic", "learnincantation", "learnritual", "memorizespell", "memorizemagic", "memorizeincantation", "memorizeritual", "learnsspell", "learnsmagic", "learnsincantation", "learnsritual", "memorizesspell", "memorizesmagic", "memorizesincantation", "memorizesritual", "learn"] },
      { handler: doForgetSpell,      helpText: doForgetSpellHelp,      synonyms: ["forgetspell", "forgetmagic", "forgetincantation", "forgetritual", "forgetsspell", "forgetsmagic", "forgetsincantation", "forgetsritual", "deletespell", "deletemagic", "deleteincantation", "deleteritual", "deletesspell", "deletesmagic", "deletesincantation", "deletesritual", "cancelspell", "cancelmagic", "cancelincantation", "cancelritual", "cancelsspell", "cancelsmagic", "cancelsincantation", "cancelsritual", "removespell", "removemagic", "removeincantation", "removeritual", "removesspell", "removesmagic", "removesincantation", "removesritual", "forget"] },
      { handler: doCastSpell,        helpText: doCastSpellHelp,        synonyms: ["cast", "activate", "castspell", "castmagic", "castincantation", "castritual", "castsspell", "castsmagic", "castsincantation", "castsritual"] },
      { handler: doClearSpells,      helpText: doClearSpellsHelp,      synonyms: ["clearspells", "clearmagic", "clearincantations", "clearrituals", "forgetallspells", "forgetallmagic", "forgetallincantation", "forgetallritual"] },
      { handler: doSpellbook,        helpText: doSpellbookHelp,        synonyms: ["spellbook", "spells", "listspells", "showspells", "spelllist", "spellcatalog", "spellinventory"] },
      
      // <><> Narrative
      { handler: doEncounter,        helpText: doEncounterHelp,        synonyms: ["encounter", "travel", "traverse", "explore", "depart", "enter"] },
      
      // <><> Combat System
      { handler: doInjury,           helpText: doInjuryHelp,           synonyms: ["injure", "wound", "damage"] },
      { handler: doHealInjury,       helpText: doHealInjuryHelp,       synonyms: ["heal"] },
      { handler: doMelee,            helpText: doMeleeHelp,            synonyms: ["attack", "strike", "hit", "smash", "slash", "stab", "bash", "jab", "whack"] },
      { handler: doRange,            helpText: doRangeHelp,            synonyms: ["shoot", "fire", "throw", "hurl", "fling"] },
      { handler: doEvade,            helpText: doEvadeHelp,            synonyms: ["evade", "block", "dodge", "parry"] }
  ];

  // Handles searching of the command registry if needed
  if (!commandName) return registry;
  for (let entry of registry) {
    if (entry.synonyms.some(s => s === commandName || s + "s" === commandName)) {
      return entry;
    }
  }
  return null
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////// DND HASH INPUT FUNCTIONS ///////////////////////////////////////////////////

/**
 * Main entry point for processing user input in the DNDHash system.
 * - If a step process is in progress, delegates input to `handleStepProcess`.
 * - If no `#` is present, returns the raw input.
 * - If a command is processed successfully, returns the result with flavor text.
 * - If an error occurs, suppresses output display (`state.show = "none"`)
 * @param {string} text - The raw user input string (may include `#command` and flavor text).
 * @returns {string} The processed text output, possibly modified by commands or steps.
 */
function DNDHash_input(text) {
  try {
    init(text) // Creates templates and inital values in state
    
    // Steps take player input, as answers for a form process (no #)
    // E.g. Do you want to use a character preset? (y/n/q)
    if (state.step != null) { return newText = handleStepProcess(text, inputMode) }
    
    // No # no command to process
    if (!text.includes("#")) { return text }

    // Extracts "flavor text" after a period .
    let [commandText, flavorText] = flavorTextExtract(text)

    // Sanitize and extract just the base command phrase
    let [command, handler] = commandExtract(commandText)
    
    // Command Processing Block
    // TODO: switch from commandSuccess to error throws in all command handlers
    let [commandResult, commandSuccess] = handler(command)
    if (!commandSuccess) state.show = "none"; // If a command fails, do not show output
    text = commandResult // overwrite text for output

    // Return with falavor added back in
    return text + flavorText;
  } catch (err) {
    state.show = "none"
    text = `\n${err.message}\n`;
    throw err
    //return text;
  }
}

/**
 * Splits an input string into a command and optional "flavor text" following the first period.
 * - If no period exists, flavor is returned as an empty string.
 * @param {string} text - The full input string, e.g. "#roll. with flair"
 * @returns {[string, string]} An array: [command, flavor]
 */
function flavorTextExtract(text) {
  const index = text.indexOf(".");
  if (index === -1) return [text, ""];
  const command = text.slice(0, index);
  const flavor = text.slice(index + 1).trimStart();
  return [command, flavor ? " " + flavor : "" ];
}

/**
 * Extracts and validates a command from user input text.
 * @param {string} text - The raw user input containing a command
 * @returns {[string, Function]} An array containing:
 *   - The raw command string (without `#` or trailing flavor text).
 *   - The corresponding handler function for the command.
 * @throws {Error} If the command is invalid, missing, or the character state is not valid.
 */
function commandExtract(text) {
  // Extract the command portion of the input after #
  text = sanitizeText(text)
  let command = text.substring(text.search(/#/) + 1)
  let commandName = getCommandName(command)?.toLowerCase().replaceAll(/[^a-z0-9\s]*/gi, "").trim()
  const handler = commandRegistry(commandName)?.handler
  if (!commandName || !handler) {
    throw new Error("\n[Error: Invalid or missing command.]\n")
  }
  validateCharacterState(commandName)
  return [command, handler]
}


/**
 * Validates whether a command can be executed based on the current character state.
 * Certain commands (character creation) are allowed without a character.
 * @param {string} commandName - The normalized name of the command being validated.
 * @throws {Error} If the command is not allowed due to missing or non-existent character.
 */
function validateCharacterState(commandName) {
  // The idea of this block is to prevent us from running commmands if we have no character created
  const isCreateCommand = createSynonyms.includes(commandName)
  const hasChar = state.characterName != null
  const exists = hasChar && hasCharacter(state.characterName)
  if ((!exists && !isCreateCommand) || (!hasChar && isCreateCommand)) {
    throw new Error(hasChar
      ? `\n[Error: Character ${state.characterName} does not exist. Type #setup to create this character]\n`
      : `\n[Error: Character name not specified. Use the "do" or "say" modes. Alternatively, use "story" mode in the following format without quotes: "charactername #hashtag"]\n`)
  }
}

/**
* Mini-function that initialises all variables on first run.
* @function
*/
function init(text) {
  enforceConfig()
  state.characterName = getCharacterName(text)
  if (state.tempCharacter == null) {
    state.tempCharacter = {
      name: "template",
      className: "adventurer",
      summary: "Template character not meant to be used.",
      inventory: [],
      spells: [],
      stats: [],
      skills: [],
      experience: 0,
      injuries: [],
      statPoints: 0,
      skillPoints: 0
    }
  }
  if (state.characters == null) state.characters = []
  if (state.notes == null) state.notes = []
  if (state.day == null) state.day = 0
  state.show = null
  state.prefix = null
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/////////////////////////////////////////////////////////////// ///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////// CHARACTER CREATION //////////////////////////////////////////////////////

/**
 * Initializes the character creation process and creates temporary character data.
 * @function
 * @param {string} [command] Command string (ignored).
 * @returns {[string, boolean]} Empty response and success flag.
 */
function doCreate(command) {
  // NOTE: state.characterName will be the name in the input, before the command
  // For Do or Say actions this is "You"
  // For story actions a character name is provided by "characterName #create"

  // NOTE: state.tempCharacter persists across multiple AI Dungeon inputs/outputs
  state.tempCharacter = createCharacter(state.characterName)
  defaultCharacterStatsAndSkills(state.tempCharacter)

  // Tells the main input/output functions we're in steps processing state
  state.show = "steps"
  state.step = "prefabChoice" // First step will be called in output mode for the first question

  return [" ", true]
}
const doCreateHelp = `<><> #create command
-- This command launches the character creation process for the activate character.
Usage: character|You #create\n`

/**
 * Resets the character's skills to default values.
 * @function
 * @param {object} [character]
 */
// TODO: Source this list from a story card
function defaultCharacterStatsAndSkills(character) {
  character.skills = [
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
  character.stats = [
    {name: "Strength", value: 10},
    {name: "Dexterity", value: 10},
    {name: "Constitution", value: 10},
    {name: "Wisdom", value: 10},
    {name: "Intelligence", value: 10},
    {name: "Charisma", value: 10}
  ]
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
 * - #roll (advantage|disadvantage) (dice_value)
 * - dice_value may be formatetd 5d20+6 or 5d20 or d20 or 20.
 * @function
 * @param {string} [command] Command string specifying roll type and dice.
 * @returns {[string, boolean]} Roll result text and success flag.
 */
function doRoll(command) {
  state.show = "none"

  // Determine if rolling with advantage, disadvantage, or not
  let rollType = searchArgument(command, arrayToOrPattern(advantageNames)) ?? "normal"

  // Try and determine rolling dice or default to d20
  let dice = searchArgument(command, /^.*\d.*$/gi) // Any string that contains at least one digit anywhere.
  if (dice == null) dice = "d20"
  dice = formatRoll(dice) // Formats a roll notation string into a standardized dice roll format (e.g., "2d6+3").

  // Time to roll
  const { die1, die2, score } = performRoll(dice, rollType)
  
  // Deal with addtion
  const addition = getAddition(dice) // E.g. the +3 from "2d6+3"
  // const roll = score - addition // Remove addition for the raw dice roll

  // Display text
  const isD20 = dice.trim().toLowerCase() === "d20" || dice.trim().toLowerCase() === "1d20";
  const text = `\n${printRoll(dice, rollType, addition, score, die1, die2, null, getCharacter(), null, null, isD20)}\n`

  return [text, true]
}
const doRollHelp = `<><> #roll command
-- Rolls dice with optional advantage or disadvantage.
-- dice_value may be formatetd 5d20+6 or 5d20 or d20 or 20.
Usage: #roll (advantage|disadvantage) (dice_value)\n`

/**
 * Performs a skill or ability check with difficulty and advantage/disadvantage.
 * - Grants autoXP on success. Provides descriptive success/failure messages.
 * - #try (ability|skill) (advantage|disadvantage) (number or automatic|effortless|easy|medium|hard|impossible) to ...task
 * -- Attempts to do the task based on the character's ability/skill against the specified difficulty.
 * @function
 * @param {string} [command] Command string specifying ability/skill, advantage, difficulty, and description.
 * @returns {[string, boolean]} Result text and success flag.
 */
function doTry(command) {
  if (getArguments(command).length <= 1) { // Minimum form of command #try plus one optional argument (not including task)
    return ["\n[Error: Not enough parameters. See #help]\n", false]
  }

  // ARGUMENT SREACHING -- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
  const character = getCharacter()
  const dice = "d20" // Checks always use a d20
  let textIndex = 3 // Used to find the starting position of task text

  // Argument 0: Ability or Skill
  const checkArg = searchArgument(command, statsToOrPattern([...character.stats, ...character.skills]))?.toLowerCase()
  const checkSkill = character.skills.find(x => x.name.toLowerCase() === checkArg) ?? null
  const checkAbility = character.stats.find(x => x.name.toLowerCase() === checkArg) ?? null
  if (checkArg == null) textIndex--;
  
  // Argument 1: Advantage or Disadvantage
  let rollType = searchArgument(command, arrayToOrPattern(advantageNames))
  if (rollType == null) textIndex--;
  rollType = (rollType ?? "normal").toLowerCase()

  // Argument 2: Difficulty number or word
  const difficultyPattern = [...new Set(Object.keys(difficultyScale))].concat(["\\d+"]) // Matches difficulty name or a number
  let difficulty = searchArgument(command, arrayToOrPattern(difficultyPattern))
  if (difficulty == null) textIndex--;

  if (difficulty == null || isNaN(difficulty)) { // Converting between difficulty name & score
    difficulty = difficultyScale[String(difficulty).toLowerCase()] ?? config.defaultDifficulty
  } else {
    difficulty = Number(difficulty)
  }

  // Argument 3: Narrative task text
  let taskText = getArgumentRemainder(command, textIndex)
  const toMatches = taskText.match(/^to\s+/gi)
  if (toMatches != null) taskText = taskText.substring(toMatches[0].length)
  if (!/^.*(\.|!|\?)$/gi.test(taskText)) taskText += "."

  // TIME TO ROLL THE DICE --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
  const { die1, die2, score, modifier } = performRoll(dice, rollType, character, checkSkill, checkAbility)

  // PRINTING LOGIC - --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
  let text = "\n"
  state.show = "prefix" // Will print whatever is saved in state.prefix, along with regular AI Dungeon output
  const failword = character.name == "You" ? "fail" : "fails"
  const theirWord = character.name == "You" ? "your" : "their"
  const checkWord = checkSkill?.name ?? checkAbility?.name ?? "skills"
  const checkType = checkSkill ? " skill" : checkAbility ? "" : ""

  // Essentially the same as doCheck (Prefixes rolling result into the printed output)
  if (config.showRolls)
    state.prefix = `\n${printRoll(dice, rollType, modifier, score, die1, die2, difficulty, character, checkSkill, checkAbility)}\n`

  const critText2 = (score == 20) ? " The action was a Critical Success, and extremely effective." : (score == 1) ? " The action was a Critical Failure, and will have dire consequences." : ""
  text += `${character.name} use ${theirWord} ${checkWord}${checkType}, ${score + modifier >= difficulty ? "and successfully" : `but ${failword} to`} ${taskText}${critText2}`

  // Adding of autoXp to all party members!
  const hitResult =(score + modifier >= difficulty || score == 20)
  text += addAutoExp(character, hitResult, difficulty)

  return [text+"\n", true]
}
const doTryHelp = `<><> #try command
-- Attempts to do the task based on the character's ability/skill against the specified difficulty with advantage/disadvantage.
-- If no ability or skill is defined then it will be a general d20 vs difficulty check.
-- If no difficulty is defined then the config default is used.
-- If advantage/disadvantage is not defined, then check uses normal.
-- Grants autoXP on success.
-- Provides descriptive success/failure messages.
-- Roll result is prefixed to AI Dungeon Output (can be configured not to).
Usage: character|You #try (ability|skill) (advantage|disadvantage) (number or automatic|effortless|easy|medium|hard|impossible) to ...task\n`

/**
 * Performs a skill or ability check with difficulty and advantage/disadvantage.
 * - #check (ability|skill) (advantage|disadvantage) (number or automatic|effortless|easy|medium|hard|impossible)
 * - Rolls a d20 and compares the result (modified by the character's ability/skill) to the specified difficulty.
 * - The parameters can be listed in any order.
 * @function
 * @param {string} [command] Command string specifying ability/skill, advantage, and difficulty.
 * @returns {[string, boolean]} Check result text and success flag.
 */
function doCheck(command) {
  state.show = "none"
  const character = getCharacter()
  const dice = "d20" // Checks always use a d20

  // Look for an ability or skill argument in the command
  const checkArg = searchArgument(command, statsToOrPattern([...character.stats, ...character.skills]))?.toLowerCase()
  const checkSkill = character.skills.find(x => x.name.toLowerCase() === checkArg) ?? null
  const checkAbility = character.stats.find(x => x.name.toLowerCase() === checkArg) ?? null
  
  // Look for rolling wiht advantage, disadvantage, or normal
  const rollType = (searchArgument(command, arrayToOrPattern(advantageNames)) ?? "normal").toLocaleLowerCase()

  // Look for the difficulty of the check, if provided
  let difficulty = searchArgument(command, arrayToOrPattern([...new Set(Object.keys(difficultyScale))]))
  if (difficulty == null || isNaN(difficulty)) { // Converting between difficulty name & score
    difficulty = difficultyScale[String(difficulty).toLowerCase()] ?? config.defaultDifficulty
  } else {
    difficulty = Number(difficulty)
  }

  // Time to roll
  const { die1, die2, score, modifier } = performRoll(dice, rollType, character, checkSkill, checkAbility)

  // Print Display
  const text = `\n${printRoll(dice, rollType, modifier, score, die1, die2, difficulty, character, checkSkill, checkAbility)}\n`

  return [text, true]
}
const doCheckHelp = `<><> #check command
-- Performs a skill or ability check with difficulty and advantage/disadvantage.
-- Unlike #try does not prefix or append AI Dungeon output afterwards.
-- If no ability or skill is defined then it will be a general d20 vs difficulty check.
-- If no difficulty is defined then the config default is used.
-- If advantage/disadvantage is not defined, then check uses normal.
Usage: character|You #check (ability|skill) (advantage|disadvantage) (number or automatic|effortless|easy|medium|hard|impossible)\n`

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
const doShowDayHelp = `<><> #showday command
-- Shows the current day in the game state.
-- The current day is progressed #rest command.
-- Or can be set using the #setday command.
Usage: #showday\n`

/**
 * Sets the current day in the game state.
 * @function
 * @param {string} [command] Command string containing the day number.
 * @returns {[string, boolean]} Confirmation message and success flag or error.
 */
function doSetDay(command) {
  var day = getArgument(command, 0)
  if (day == null || isNaN(day)) {
    return ["\n[Error: Not enough parameters. See #help]\n", false]
  }
  state.day = parseInt(day)
  state.show = "none"
  return [`\n[The day has been set to day ${state.day}]\n`, true]
}
const doSetDayHelp = `<><> #setday command
-- Sets the current day in the game state.
-- The current day is progressed #rest command.
-- Or can be shown using the #showday command.
Usage: #setday day\n`


/**
 * Advances the day by one and heals characters.
 * Supports "shortrest" for 50% healing without advancing the day.
 * @function
 * @param {string} [command] Command string (may specify "shortrest").
 * @returns {[string, boolean]} Message about healing/rest and success flag.
 */
function doRest(command) {
  var commandName = getCommandName(command).toLowerCase()
  const shortRest = (commandName == "shortrest" || commandName == "nap")
  var healingFactor = (shortRest ? .5 : 1)
  var text = `\nEveryone ${singularize(commandName, false)}, and heals slightly.\n`
  if (!shortRest) {
    state.day++
    text += `It's now day ${state.day}!\n`
  }
  state.characters.forEach(character => {
    if (character.injuries.length > 0) {
      const hasWord = character.name == "You" ? "have" : "has"
      const healed = recoverInjuries(character, healingFactor)
      text += `\n ${character.name} ${hasWord} `
      if (healed.length > 0) {
        let healedText = ""
        healed.forEach(i => healedText+=`${i.injury}, `)
        text += `been healed of: ${healedText} and ${hasWord} `
      }
      text += `${character.injuries.length || "no more"} injuries remaining.`
    }
  })
  return [text+"\n", true]
}
const doRestHelp = `<><> #rest command
-- Advances the day by one and allows characters to recover injuries by +con mod.
-- Supports "#shortrest" for 50% healing without advancing the day.
Usage: #rest\n`

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////// COMMAND FUNCTIONS - SYSTEM /////////////////////////////////////////////////

/**
 * Resets game state including notes, characters, and day.
 * @function
 * @param {string} [command] Command string (ignored).
 * @returns {[string, boolean]} Empty response and success flag.
 */
function doReset(command) {
  state.notes = []
  state.characters = []
  state.day = null
  state.step = null
  state.statDice = []
  state.show = "showText"
  state.showText = "[All settings have been reset]\n"
  return [" ", true]
}
const doResetHelp = `<><> #reset command
-- Resets game state including:
-- notes, characters, and day
Usage: #reset\n`


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
const doVersionHelp = `<><> #version command
-- Shows the current version of the game or system.
Usage: #version\n`

/**
 * Displays help information or a specific help for a command.
 * @function
 * @param {string} [command] Command string containing optional help topic.
 * @returns {[string, boolean]} Empty response and success flag.
 */
function doHelp(command) {
  const helpType = getArgumentRemainder(command, 0)
  state.show = "showText"
  let textBuilder = helpText
  if (helpType == "all") {
    textBuilder = "This is a list of all commands, and their synonyms.\nYou can use #help followed by a command name for specific info; e.g. '#help create'.\n\n"
    for (let entry of commandRegistry()) {
      textBuilder += `#${entry.synonyms[0]}\n[${entry.synonyms.join(", ")}]\n\n`
    }
  } else if (helpType != null) {
    const entry = commandRegistry(helpType);
    if (entry) textBuilder = `${entry.helpText}\nSynonyms: [${entry.synonyms.join(", ")}]`
  }
  state.showText = textBuilder
  return [" ", true]
}
const doHelpHelp = `<><> #help command
-- Displays help information or a specific help for a command.
-- I see you're already a master of the help command ;)
Usage: #help (command)\n`
const helpText = `<><> WELCOME to DNDHash - Lite Edition -
TO get started use the #create command as a Do or Say action to create your first character.

** GENERAL COMMANDS:
-- Some general commands to get you playing your adventure!
#try - has the active character try some task using an stat or skill check.
-- usage: character|you #try (stat/skill) (difficulty) (advantage/disadvantage) to ...task
#cast - has the active character cast the spell specified.
-- usage: character|you #cast spell (difficulty) (advantage/disadvantage)
#take - adds an item to the active character's inventory.
-- usage: character|you #take itemName (quantity)
#drop - removes an item from the active character's inventory.
-- usage: character|you #drop itemName (quantity)

** SHOW COMMANS:
-- These require no arguments.
#bio - displays the active character's general info.
#inv - displays the active character's inventory.
#stats - displays the active character's stats.
#skills - displays the active character's skills.
#spells - displays the active character's spells.

** COMMAND GUIDE:
-- To see a list of all command you may enter "#help all".
-- You can use #help followed by a command name for specific info; e.g. "#help create".
-- It's best to use "quotes" to encapsulate text arguments with spaces.
-- If a command argument is portrayed in (brakets) then it's optional.
-- Some commands require an active character portrayed by "Character|You".
-- The active character for Do or Say actions is automatically "You" or your character name in AI Dungeon.
-- The active character or Story actions needs to be specified before the command i.e. "CharacterName #command ...".
-- If you end a command with a . period, then anything after that will be flavor text.
-- Flavor text will be re-appened to your input, after the command process.\n`

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////// COMMAND FUNCTIONS - CHARACTER ///////////////////////////////////////////////

/**
 * Renames the current character to a new name.
 * @function
 * @param {string} [command] Command string containing the new name.
 * @returns {[string, boolean]} Result message and success flag.
 */
function doRenameCharacter(command) {
  var character = getCharacter()
  var newName = getArgumentRemainder(command, 0)
  if (newName == null) {
    return ["\n[Error: Not enough parameters. See #help]\n", false]
  }
  var possessiveName = getPossessiveName(character.name)

  state.show = "none"
  var text = `\n[${possessiveName} name has been changed to ${newName}]\n`

  character.name = newName

  return [text, true]
}
const doRenameCharacterHelp = `<><> #renamecharacter command
-- Renames the active character to a new name.
Usage: character|you #renamecharacter newName\n`

/**
 * Shows the biography screen for the current character.
 * @function
 * @param {string} [command] Command string (ignored).
 * @returns {[string, boolean]} Empty response and success flag.
 */
function doBio(command) {
  state.show = "showText"
  state.showText = showSummary(getCharacter())
  return [" ", true]
}
const doBioHelp = `<><> #bio command
-- Shows the biography screen for the active character.
Usage: character|you #bio\n`

/**
 * Sets the class name for the current character.
 * @function
 * @param {string} [command] Command string containing the class name.
 * @returns {[string, boolean]} Result message and success flag.
 */
function doSetClass(command) {
  var character = getCharacter()
  var newClass = getArgumentRemainder(command, 0)
  if (newClass == null) {
    return ["\n[Error: Not enough parameters. See #help]\n", false]
  }

  var possessiveName = getPossessiveName(character.name)

  character.className = newClass

  state.show = "none"
  return [`\n[${possessiveName} class is set to "${character.className}"]\n`, true]
}
const doSetClassHelp = `<><> #setclass command
-- Sets the class name for the active character.
Usage: character|you #setclass newClass\n`

/**
 * Displays the list of characters.
 * @function
 * @param {string} [command] Command string (ignored).
 * @returns {[string, boolean]} Empty response and success flag.
 */
function doShowCharacters(command) {
  state.show = "showText"
  state.showText = showParty()
  return [" ", true]
}
const doShowCharactersHelp = `<><> #characters command
-- Displays the list of all characters.
Usage: #characters\n`

/**
 * Removes a character by name.
 * @function
 * @param {string} [command] Command string containing the character name to remove.
 * @returns {[string, boolean]} Result message and success flag.
 */
function doRemoveCharacter(command) {
  var characterName = getArgumentRemainder(command, 0)
  if (characterName == null) {
    return ["\n[Error: Not enough parameters. See #help]\n", false]
  }

  for (var i = 0; i < state.characters.length; i++) {
    var character = state.characters[i]
    if (character.name.toLowerCase() == characterName.toLowerCase()) {
      state.characters.splice(i, 1)
      state.show = "none"
      return [`[Character ${character.name} removed]`, true]
    }
  }

  return [`[Character ${characterName} was not found]`, true]
}
const doRemoveCharacterHelp = `<><> #removecharacter command
-- Removes a character by name.
Usage: #removecharacter characterName\n`

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
  var exp = getArgument(command, 0)
  if (exp == null) {
    return ["\n[Error: Not enough parameters. See #help]\n", false]
  }

  if (isNaN(exp)) {
    return ["\n[Error: Not a number. See #help]\n", false]
  }

  var possessiveName = getPossessiveName(character.name)

  character.experience = parseInt(exp)

  state.show = "none"
  return [`\n[${possessiveName} experience is set to ${character.experience}]\n`, true]
}
const doSetExperienceHelp = `<><> #setexp command
-- Sets active character's experience points to a specified value.
-- This will also update the character's level, but does not count as leveling up (no rewards).
Usage: character|you #setexp exp\n`

/**
 * Adds experience points to a character or the entire party.
 * @function
 * @param {string} [command] Command string containing experience amount and optionally "party".
 * @returns {[string, boolean]} Result message and success flag.
 */
function doAddExperience(command) {
  const character = getCharacter()
  let exp = getArgument(command, 0)
  if (exp == null) {
    return ["\n[Error: Not enough parameters. See #help]\n", false]
  }

  exp = searchArgument(command, /\d+/gi)
  if (exp == null) {
    return ["\n[Error: Expected a number. See #help]\n", false]
  }
  exp = parseInt(exp)

  const forParty = searchArgument(command, /party/gi)

  if (forParty == null && character == null) {
    return [`\n[Error: Character name not specified. Use the "do" or "say" modes. Alternatively, use "story" mode in the following format without quotes: "charactername #hashtag"]\n`, false]
  }

  if (state.characters.length == 0) {
    return [`\n[Error: There are no characters. Type #setup to create a character]\n`, false]
  }

  state.showText = "\n"
  characters = forParty == null ? [character] : state.characters
  for (const c of characters) {
    const possessiveName = getPossessiveName(c.name)

    const level = getLevel(c.experience)
    c.experience += exp
    const newLevel = getLevel(c.experience)

    if (newLevel > level) {
      levelupEvent(c, level, newLevel)
      state.showText += `[${possessiveName} experience is increased to ${c.experience}. LEVEL UP! Level: ${newLevel}, Health Max: ${getHealthMax(c)}. Next level at ${getNextLevelXp(c.experience)}]\n`
    }
    else state.showText += `[${possessiveName} experience is increased to ${c.experience}. Next level at ${getNextLevelXp(c.experience)}]\n`
  }

  state.show = "showText"
  return [" ", true]
}
const doAddExperienceHelp = `<><> #addexp command
-- Adds experience points to the active character, optionally "party".
-- This will also update the character's level, and count as leveling.
Usage: character|you #addexp exp (party)\n`

/**
 * Levels up a character by granting enough experience to reach the next level.
 * @function
 * @param {string} [command] Command string (ignored except for context).
 * @returns {[string, boolean]} Result message and success flag.
 */
// TODO: make it so level up takes an argument for number of levels
function doLevelUp(command) {
  const character = getCharacter()
  const level = getLevel(character.experience)
  const experience = getExpForLevel(level) - character.experience
  return doAddExperience(`${command} ${experience}`)
}
const doLevelUpHelp = `<><> #levelup command
-- Advances the active characters level by one.
Usage: character|you #levelup\n`

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////// COMMAND FUNCTIONS - ABILITIES & SKILLS //////////////////////////////////////////

/**
 * Sets or updates a character's stat with a specified value.
 * 
 * @function
 * @param {string} [command] Command text containing stat name and value.
 * @returns {[string, boolean]} Confirmation message and success status.
 */
function doSetStat(command) {
  const character = getCharacter()
  const statName = getArgument(command, 0)
  if (statName == null) {
    return ["\n[Error: Not enough parameters. See #help]\n", false]
  }
  const statValue = Math.abs(parseInt(getArgument(command, 1)))
  const possessiveName = getPossessiveName(character.name)

  const stat = {
    name: statName,
    value: statValue
  }

  const index = character.stats.findIndex((element) => element.name.toLowerCase() == stat.name.toLowerCase())
  if (index == -1) {
    character.stats.push(stat)
  } else {
    character.stats[index].value = statValue
  }

  state.show = "none"
  return [`\n[${possessiveName} ${toTitleCase(statName)} ability is now ${statValue}]\n`, true]
}
const doSetStatHelp = `<><> #setstat command
-- Sets a character's stat with a specified value.
-- If the stat does not exist, it is created for that character.
Usage: character|you #setstat stat value\n`

/**
 * Updates a character's stat with a specified value.
 * Spends stat points.
 * @function
 * @param {string} [command] Command text containing stat name and value.
 * @returns {[string, boolean]} Confirmation message and success status.
 */
function doAddStat(command) {
  const character = getCharacter()
  const statName = getArgument(command, 0)
  if (statName == null) {
    return ["\n[Error: Not enough parameters. See #help]\n", false]
  }
  const statValue = Math.abs(parseInt(getArgument(command, 1) ?? 1))
  const possessiveName = getPossessiveName(character.name)
  if (character.statPoints < statValue) {
    return [`\n[Error: ${character.name} does not have enough stat points for this. See #help]\n`, false]
  }

  const index = character.stats.findIndex((element) => element.name.toLowerCase() == statName.toLowerCase())
  if (index == -1) {
    return [`\n[Error: ${statName} is not in ${possessiveName} stats. See #help]\n`, false]
  } else {
    character.stats[index].value += statValue
    character.statPoints -= statValue
  }

  state.show = "none"
  return [`\n[${possessiveName} ${toTitleCase(statName)} ability is now ${character.stats[index].value}]\n`, true]
}
const doAddStatHelp = `<><> #spendstat command
-- Uses stat points to increase a stat's value.
Usage: character|you #spendstat stat value\n`

/**
 * Shows the character stats UI section.
 * 
 * @function
 * @param {string} [command] Command text (ignored).
 * @returns {[string, boolean]} Placeholder string and success status.
 */
function doShowStats(command) {
  state.show = "showText"
  state.showText = showStats(getCharacter())
  return [" ", true]
}
const doShowStatsHelp = `<><> #stats command
-- Displays the active character's stats.
Usage: character|you #stats\n`

/**
 * Removes a specified stat from the character.
 * 
 * @function
 * @param {string} [command] Command text containing stat name to remove.
 * @returns {[string, boolean]} Confirmation or error message and success status.
 */
function doRemoveStat(command) {
  const character = getCharacter()
  const statName = getArgumentRemainder(command, 0)
  if (statName == "") {
    return ["\n[Error: Not enough parameters. See #help]\n", false]
  }
  const dontWord = character.name == "You" ? "don't" : "doesn't"
  const tryWord = character.name == "You" ? "try" : "tries"

  const found = character.stats.find((element) => element == statName)
  if (found == null) return [`\n[${character.name} ${tryWord} to remove the ability ${statName}, but ${character.name} ${dontWord} even know it]\n`, true]
  
  const index = character.stats.findIndex((element) => element.toLowerCase() == statName.toLowerCase())
  character.stats.splice(index, 1)

  return [`\n[${character.name} removed the ability ${statName}]\n`, true]
}
const doRemoveStatHelp = `<><> #removestat command
-- Removes a specified stat from the character.
Usage: character|you #removestat stat\n`

/**
 * Clears all stats from the character.
 * 
 * @function
 * @param {string} [command] Command text (ignored).
 * @returns {[string, boolean]} Placeholder string and success status.
 */
function doClearStats(command) {
  const character = getCharacter()
  character.stats = []
  state.show = "showText"
  state.showText = `[${character == null ? null : getPossessiveName(character.name)} stats has been cleared]\n`
  return [" ", true]
}
const doClearStatsHelp = `<><> #clearstats command
-- Clears all stats from the character.
Usage: character|you #clearstats\n`

/**
 * Sets or updates a skill for the character with an optional associated stat and modifier.
 * 
 * @function
 * @param {string} [command] Command text containing skill name, optional stat, and modifier.
 * @returns {[string, boolean]} Confirmation message or error and success status.
 */
function doSetSkill(command) {
  const character = getCharacter()
  const skillName = getArgument(command, 0)
  if (skillName == null) {
    return ["\n[Error: Not enough parameters. See #help]\n", false]
  }

  let skillStat = getArgument(command, 1)
  if (skillStat == null) {
    return ["\n[Error: Not enough parameters. See #help]\n", false]
  }

  let skillValue = getArgument(command, 2)
  if (skillValue == null) {
    skillValue = Math.abs(parseInt(skillStat))
    skillStat = null
  } else {
    skillValue = Math.abs(parseInt(skillValue))
  }

  const possessiveName = getPossessiveName(character.name)

  const skill = {
    name: skillName,
    stat: skillStat,
    modifier: skillValue
  }

  const index = character.skills.findIndex((element) => element.name.toLowerCase() == skill.name.toLowerCase())
  if (index == -1) {
    if (skillStat == null) {
      return ["\n[Error: New skills must have an ability specified. See #help]\n", false]
    }
    
    character.skills.push(skill)
  } else {
    const existingSkill = character.skills[index]
    existingSkill.modifier = parseInt(skill.modifier)
    if (skillStat != null) existingSkill.stat = skill.stat
  }

  state.show = "none"
  return [`\n[${possessiveName} ${toTitleCase(skillName)} skill is now ${skillValue >= 0 ? "+" + skillValue : "-" + skillValue} and based on ${toTitleCase(skillStat)}]\n`, true]
}
const doSetSkillHelp = `<><> #setskill command
-- Sets a character's skill with a specified modifier.
-- If the skill does not exist, it is created for that character.
Usage: character|you #setskill skill modifier\n`


/**
 * Sets or updates a character's skill with a specified value (1-100).
 * 
 * @function
 * @param {string} [command] Command text containing skill name and value.
 * @returns {[string, boolean]} Confirmation message and success skillus.
 */
function doAddSkill(command) {
  const character = getCharacter()
  const skillName = getArgument(command, 0)
  if (skillName == null) {
    return ["\n[Error: Not enough parameters. See #help]\n", false]
  }
  const skillValue = Math.abs(parseInt(getArgument(command, 1) ?? 1))
  const possessiveName = getPossessiveName(character.name)
  if (character.skillPoints < skillValue) {
    return [`\n[Error: ${character.name} does not have enough skill points for this. See #help]\n`, false]
  }

  const index = character.skills.findIndex((element) => element.name.toLowerCase() == skillName.toLowerCase())
  if (index == -1) {
    return [`\n[Error: ${skillName} is not in ${possessiveName} skills. See #help]\n`, false]
  } else {
    character.skills[index].modifier += skillValue
    character.skillPoints -= skillValue
  }

  state.show = "none"
  return [`\n[${possessiveName} ${toTitleCase(skillName)} skill bonus is now ${character.skills[index].modifier}]\n`, true]
}
const doAddSkillHelp = `<><> #spendskill command
-- Uses skill points to increase a skill's modifier.
Usage: character|you #spendskill skill modifier\n`

/**
 * Shows the character skills UI section.
 * 
 * @function
 * @param {string} [command] Command text (ignored).
 * @returns {[string, boolean]} Placeholder string and success status.
 */
function doShowSkills(command) {
  state.show = "showText"
  state.showText = showSkills(getCharacter())
  return [" ", true]
}
const doShowSkillsHelp = `<><> #skills command
-- Displays the active character's skills.
Usage: character|you #skills\n`

/**
 * Removes a specified skill from the character.
 * 
 * @function
 * @param {string} [command] Command text containing skill name to remove.
 * @returns {[string, boolean]} Confirmation or error message and success status.
 */
function doRemoveSkill(command) {
  const character = getCharacter()
  const skillName = getArgumentRemainder(command, 0)
  if (skillName == "") {
    return ["\n[Error: Not enough parameters. See #help]\n", false]
  }
  const dontWord = character.name == "You" ? "don't" : "doesn't"
  const tryWord = character.name == "You" ? "try" : "tries"

  const found = character.skills.find((element) => element == skillName)
  if (found == null) return [`\n[${character.name} ${tryWord} to remove the skill ${skillName}, but ${character.name} ${dontWord} even know it]\n`, true]
  
  const index = character.skills.findIndex((element) => element.toLowerCase() == skillName.toLowerCase())
  character.skills.splice(index, 1)

  return [`\n[${character.name} removed the skill ${skillName}]\n`, true]
}
const doRemoveSkillHelp = `<><> #removeskill command
-- Removes a specified skill from the character.
Usage: character|you #removeskill skill\n`

/**
 * Clears all skills from the character.
 * 
 * @function
 * @param {string} [command] Command text (ignored).
 * @returns {[string, boolean]} Placeholder string and success status.
 */
function doClearSkills(command) {
  const character = getCharacter()
  character.skills = []
  state.show = "showText"
  state.showText = `[${character == null ? null : getPossessiveName(character.name)} skills has been cleared]\n`
  return [" ", true]
}
const doClearSkillsHelp = `<><> #clearskills command
-- Clears all skills from the character.
Usage: character|you #clearskills\n`

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
  state.show = "showText"
  state.showText = showNotes()
  return [" ", true]
}
const doShowNotesHelp = `<><> #notes command
-- Displays all your saved notes.
Usage: #notes\n`

/**
 * Adds a note from the command text or, if empty, adds the last action text.
 * @function
 * @param {string} [command] The command text containing the note to add.
 * @returns {[string, boolean]} Tuple containing a success message and true.
 */
function doNote(command) {
  var text = getArgumentRemainder(command, 0)
  
  if (text != null && text.length > 0) {
    state.notes.push(text)
    state.show = "none"
    return ["\n[Note added successfully]\n", true]
  }
  state.notes.push(history[history.length - 1].text)
  state.show = "none"
  return ["\n[The last action was successfully added to the notes]\n", true]
}
const doNoteHelp = `<><> #note command
-- Adds a note; or if empty adds the last action text.
Usage: #note (note text)\n`

/**
 * Clears all notes.
 * @function
 * @param {string} [command] The command text (ignored).
 * @returns {[string, boolean]} Tuple with a placeholder string and true.
 */
function doClearNotes(command) {
  state.notes = []
  state.show = "showText"
  state.showText = `[All Notes have been cleared]\n`
  return [" ", true]
}
const doClearNotesHelp = `<><> #clearnotes command
-- Clears all notes.
Usage: #clearnotes\n`


/**
 * Removes specified notes by their indexes.
 * @function
 * @param {string} [command] The command text containing note numbers to erase (e.g., "1 3 5").
 * @returns {[string, boolean]} Tuple containing removal confirmation messages or error and true/false.
 */
function doEraseNote(command) {
  var index = getArgumentRemainder(command, 0)
  if (index == null) index = 1

  var list = index.split(/\D+/)
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
const doEraseNoteHelp = `<><> #removenote command
-- Removes specified notes by index.
Usage: #removenote index\n`

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////// COMMAND FUNCTIONS - INVENTORY ///////////////////////////////////////////////

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
const doTakeHelp = `<><> #take command
-- Adds an instance of the specified item(s) to the character's inventory.
-- (quantity) is optional, defaults to one.
Usage: character|you #take (quantity) item_name\n`

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
  [ array of items with details ]
  // See <><> Item Story Cards <><> for item details.
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
      let item = JSON.parse(itemCard.description);
      for (const key in defaultItemTemplate) {
        if (item[key] === undefined) {
          item[key] = defaultItemTemplate[key]
        }
      }
      item.quantity = getRandomInteger(1, item.quantity)
      lootTable.push(item);
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
  const possibleLoot = lootTable.filter(loot => roll <= loot.rarity);
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
const doLootHelp = `<><> #loot command
-- Randomly rolls a random item from a thematic loot table.
-- Automatically adds item to character's inventory.
-- (theme) is optional; defualts to all item story cards.
-- (theme) may also be an item category.
-- The word 'the' can be used e.g. "#loot the orchard"
Usage: character|you #loot (theme)\n`

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
const doDropHelp = `<><> #drop command
-- Removesthe specified item(s) from the character's inventory.
-- (quantity) is optional, defaults to one.
-- 'the', 'a', and 'an', can be given as quantity (count as one).
-- 'all' or 'every' can be given as quantity (count as all of that item).
Usage: character|you #drop (quantity|all) item_name\n`

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
const doGiveHelp = `<><> #give command
-- Removes the quantity of item from the character's inventory and adds to the other_character's inventory.
-- (quantity) is optional, defaults to one.
-- 'the', 'a', and 'an', can be given as quantity (count as one).
-- 'all' or 'every' can be given as quantity (count as all of that item).
Usage: character|you #give other_character (quantity|all|the) item_name\n`

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
const doBuyHelp = `<><> #buy command
-- Adds the specified buy_quantity of the buy_item to the character's inventory and removes the sell_quantity of sell_item.
-- "my", "with", "for", "your" will be ignored.
-- If buy_quantity are omitted, it's assumed to be 1.
-- buy_quantity can only "a", "an", "the", or number.
-- sell_quantity cannot be omitted!
-- sell_quantity can be "all", "every", "a", "an", "the", or number.
Usage: character|you #buy (buy_quantity) buy_item (for|with) sell_quantity sell_item\n`

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
const doSellHelp = `<><> #sell command
-- Adds the specified buy_quantity of the buy_item to the character's inventory and removes the sell_quantity of sell_item.
-- "my", "with", "for", "your" will be ignored.
-- If sell_quantity are omitted, it's assumed to be 1.
-- sell_quantity can only "a", "an", "the", or number.
-- buy_quantity cannot be omitted!
-- buy_quantity can be "all", "every", "a", "an", "the", or number.
Usage: character|you #sell (sell_quantity) sell_item (for|with) buy_quantity buy_item\n`

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

  state.show = "none"
  return [text, true]
}
const doRenameItemHelp = `<><> #rename command
-- Renames the item indicated by original_name to the new_name.
Usage: character|you #rename item_name new_name\n`

/**
* Replaces the damage type of the item indicated.
* @function
* @param {string} [command] (you|character) #itemdmg itemname damageType
* @returns {[string, boolean]} Tupple containing [text result of command, and successful execution flag]
**/
function doItemDamage(command) {
  const itemName = getArgument(command, 0)
  const damageType = getArgument(command, 1)

  if (itemName == null || damageType == null) {
    return ["\n[Error: Not enough parameters. See #help]\n", false]
  }

  // Text result to print
  const character = getCharacter()
  const hasWord = character.name == "You" ? "have" : "has"
  const possessiveName = getPossessiveName(character.name)
  let text = `\n[${possessiveName} ${itemName} ${hasWord} been renamed to ${damageType}]\n`

  // Attempt to rename item
  const invItem = searchInventory(character, itemName)
  if (invItem) {
    invItem.damageType = damageType
  } else {
    return [`\n[Error: ${character.name} ${hasWord} no item named "${itemName}". See #inventory]\n`, false]
  }

  state.show = "none"
  return [text, true]
}
const doItemDamageHelp = `<><> #itemdmg command
-- Replaces the damage type of the inventory item.
Usage: (you|character) #itemdmg itemname damageType\n`

/**
* Replaces the level type of the item indicated.
* @function
* @param {string} [command] (you|character) #itemdmg item newLevel
* @returns {[string, boolean]} Tupple containing [text result of command, and successful execution flag]
**/
function doItemLevel(command) {
  const itemName = getArgument(command, 0)
  const newLevel = getArgument(command, 1)

  if (itemName == null || newLevel == null || isNaN(newLevel)) {
    return ["\n[Error: Invalid parameters. See #help]\n", false]
  }

  // Text result to print
  const character = getCharacter()
  const hasWord = character.name == "You" ? "have" : "has"
  const possessiveName = getPossessiveName(character.name)
  let text = `\n[${possessiveName} ${itemName} ${hasWord} been renamed to ${newLevel}]\n`

  // Attempt to rename item
  const invItem = searchInventory(character, itemName)
  if (invItem) {
    invItem.level = parseInt(newLevel)
  } else {
    return [`\n[Error: ${character.name} ${hasWord} no item named "${itemName}". See #inventory]\n`, false]
  }

  state.show = "none"
  return [text, true]
}
const doItemLevelHelp = `<><> #itemlvl command
-- Replaces the level of the inventory item.
Usage: character|you #rename item newLevel\n`

/**
* Sets the state to show the character's inventory in next output
* @function
* @param {string} [command] (you|character) #inventory
* @returns {[string, boolean]} Tupple containing [text result of command, and successful execution flag]
**/
function doInventory(command) {
  state.show = "showText"
  state.showText = showInventory(getCharacter())
  return [" ", true]
}
const doInventoryHelp = `<><> #inv command
-- Displays the active character's inventory.
Usage: character|you #inv\n`

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
  state.show = "showText"
  state.showText = `[${character == null ? null : getPossessiveName(character.name)} inventory has been cleared]\n`
  return [" ", true]
}
const doClearInventoryHelp = `<><> #clearitems command
-- Clears all items from the active character's inventory.
Usage: character|you #clearitems\n`

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
  const spellName = getArgumentRemainder(command, 0)
  if (spellName == "") {
    return ["\n[Error: Not enough parameters. See #help]\n", false]
  }

  let text = "\n"
  const character = getCharacter()
  const tryWord = character.name == "You" ? "try" : "tries"
  const found = character.spells.find((element) => element == spellName)

  if (found != null) {
    state.show = "none" 
    text += `[${character.name} ${tryWord} to learn the spell ${spellName}, but already knows it.]`
  } else {
    character.spells.push(spellName)
    text += `${character.name} learned the spell ${toTitleCase(spellName)}.`
  }

  state.show = "none"
  return [text+="\n", true]
}
const doLearnSpellHelp = `<><> #learnspell command
-- Attempts to teach the active character a new spell.
-- If the spell is already known, returns a message stating so.
Usage: character|you #learnspell spell_name\n`

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
  const spellName = getArgumentRemainder(command, 0)
  if (spellName == "") {
    return ["\n[Error: Not enough parameters. See #help]\n", false]
  }

  const text = "\n"
  const character = getCharacter()
  const dontWord = character.name == "You" ? "don't" : "doesn't"
  const tryWord = character.name == "You" ? "try" : "tries"
  const found = character.spells.find(x => x.toLowerCase() == spellName.toLowerCase())

  if (found == null) {
    text += `[${character.name} ${tryWord} to forget the spell ${spellName}, but ${character.name} ${dontWord} even know it.]`
  } else {
    const index = character.spells.findIndex(x => x.toLowerCase() == spellName.toLowerCase())
    text += `[${character.name} forgot the spell ${spellName}.]`
    character.spells.splice(index, 1)
  }

  state.show = "none"
  return [text+"\n", true]
}
const doForgetSpellHelp = `<><> #forgetspell command
-- Attempts to remove a spell from the active character's known spells.
-- If the spell is not known, returns a message stating so.
Usage: character|you #forgetspell spell_name\n`

/**
 * Attempts to cast a known spell, applying difficulty and advantage rules.
 * Performs a d20 roll (with modifiers) and determines success or failure.
 * #cast (advantage|disadvantage) (number or effortless|easy|medium|hard|impossible) (abiliity) spellName
 * 
 * @function
 * @param {string} [command] The command text containing:
 *   - Required name of spell to cast (must have quotes for names with spaces)
 *   - optional advantage/disadvantage
 *   - optional difficulty rating (name or numeric)
 *   - optional ability name for modifier
 * @returns {[string, boolean]} Tuple where:
 *   - string: Narrative result of the casting attempt.
 *   - boolean: true if the command was processed, false if invalid.
 */
function doCastSpell(command) {
  if (getArguments(command).length <= 1) { // Minimum form of command #cast plus one optional argument (not including spell)
    return ["\n[Error: Not enough parameters. See #help]\n", false]
  }

  // ARGUMENT SREACHING -- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
  const character = getCharacter()
  const dice = "d20" // Checks always use a d20
  let spellIndex = 3
  
  // Argument 0: Advantage or Disadvantage
  const rollType = (searchArgument(command, arrayToOrPattern(advantageNames)) ?? "normal").toLowerCase()
  if (rollType == null) spellIndex--;

  // Argument 1: Difficulty number or word
  const difficultyPattern = [...new Set(Object.keys(difficultyScale))].concat(["\\d+"]) // Matches difficulty name or a number
  let difficulty = searchArgument(command, arrayToOrPattern(difficultyPattern))
  if (difficulty == null) spellIndex--;
  if (difficulty == null || isNaN(difficulty)) { // Converting between difficulty name & score
    difficulty = difficultyScale[String(difficulty).toLowerCase()] ?? config.defaultDifficulty
  } else {
    difficulty = Number(difficulty)
  }

  // Argument 2: Ability text
  // TODO: default to character/spell casting ability if re-introduced later
  const abilityPattern = [... new Set(character.stats)]
  const abilityArg = searchArgument(command, arrayToOrPattern(abilityPattern))
  const castAbility = character.stats.findIndex(x => x.name.toLowerCase() === abilityArg.toLowerCase())
  if (castAbility == null) spellIndex--;

  // Argument 3: Narrative spell text
  const spellsPattern = [... new Set(character.spells)]
  const spellCast = searchArgument(command, arrayToOrPattern(spellsPattern))

  if (spellCast == null) {
    const dontWord = character.name == "You" ? "don't" : "doesn't"
    const tryWord = character.name == "You" ? "try" : "tries"

    state.show = "none" // We don't need AI Dungeon making some awkward comment
    return [`\n[${character.name} ${tryWord} to cast, but ${character.name} ${dontWord} know that spell.]\n`, true]
  }

  // TIME TO ROLL THE DICE --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
  const { die1, die2, score, modifier} = performRoll(dice, rollType, character, null, character.stats[castAbility])

  // PRINTING LOGIC - --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---

  const successText = (score + modifier >= difficulty) ? " The spell is successful!" : " The spell misses or fails!"
  const failText = (score == 1) ? " Critical Failure! The spell misses or fails in a spectacular way." : successText
  const critText = (score == 20) ? " Critical Success!" : failText

  const modText = (modifier >= 0) ? "+ " + modifier : "- "+Math.abs(modifier)
  const modifierText = (modifier != 0) ? ` ${modText} = ${score + modifier}` : ""
  const dieText = rollType == "advantage" || rollType == "disadvantage" ? `${rollType}(${die1},${die2})` : die1

  // Input text
  let text = `${character.name} cast the spell ${spellCast}${rollType != "normal" ? " with " + rollType : ""}.${critText}`

  // Output text prefix
  state.show = "prefix"
  state.prefix = `\n[Difficulty Class: ${difficulty}. Roll: ${dieText}${modifierText}.${critText}]`
  if (difficulty == 0) state.prefix = ""
  
  // Add autoXp to party!
  const hitResult = (difficulty > 0 && (score + modifier >= difficulty || score == 20))
  text += addAutoExp(character, hitResult, difficulty)

  return [`\n${text}\n`, true]
}
const doCastSpellHelp = `<><> #cast command
-- Attempts to cast a known spell, applying difficulty and advantage rules.
-- Performs a d20 roll (with modifiers) and determines success or failure.
-- Optional ability name for modifier.
Usage: character|you #cast (advantage|disadvantage) (difficulty) (abiliity) spellName\n`

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
  state.show = "showText"
  state.showText = `[${character == null ? null : getPossessiveName(character.name)} spells has been cleared]\n`
  return [" ", true]
}
const doClearSpellsHelp = `<><> #clearspells command
-- Clears all known spells from the active character.
Usage: character|you #clearspells\n`

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
  state.show = "showText"
  state.showText = showSpells(getCharacter())
  return [" ", true]
}
const doSpellbookHelp = `<><> #spells command
-- Displays all known spells of the active character.
Usage: character|you #spells\n`

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
    {"encounter": "the city and finds a gold on the ground.", "rarity": 0.5},
    {"encounter": "the city and two suspicous individuals appraoch.", "rarity": 0.5}
  ]
  */
  let encounterTable = [];
  encounterTable = JSON.parse(encounterTableCard[0].description);
  if (encounterTable.length < 1) {
    return [`\n[Error: There is no encounters in the loot table.]\n`, false]
  }

  // Time to roll the ~Encounter!
  const roll = getRandomFloat(0, 1);
  let randomEncounter = {encounter: "without issue.", rarity: 1} // Default encounter if we roll none
  const possibleEncounters = encounterTable.filter(encounter => roll <= encounter.rarity);
  if (possibleEncounters.length > 0) {
    randomEncounter = possibleEncounters[getRandomInteger(0, possibleEncounters.length - 1)];
  }

  // NOTE: Encounter text entry should always logically follow the Textual prefix above
  const commandName = getCommandName(command) // "explore", "travel"
  const displayCommandName = singularize(commandName, character.name == "You")
  text += `${character.name} ${displayCommandName} `+randomEncounter.encounter

  return [text+"\n", true]
}
const doEncounterHelp = `<><> #explore command
-- Rolls a random encounter from a thematic encounter table.
-- 'the' is ignored, allowing for input like "#explore the city".
Usage: character|you #explore theme\n`

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////// COMMAND FUNCTIONS - COMABT /////////////////////////////////////////////////

function doEquip(command) {
  // Recalculate the character's equipment bonuses (based on D&D 5e logic)

  // TODO: Add the category and rairty of an item into it's JSON details
  // -- We can't tell what an item is from the invItem details
  // -- Since only the item story card type contains the category

  // NOW, technically in D&D a character would attack with X weapon
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

/**
* Randomly rolls a random injury from a thematic damage type table to apply to a character/target.
* @function
* @param {string} [command] Command Format: {{ #injure (you|character|target) damageType }}
* @returns {string} Text containing the result of the action, or an error with (state.show = "none")
**/
function doInjury(command) {
  let text = "\n"
  command = command.replaceAll(/\s+((the))\s+/g, " ")
  
  // If damageType is missing, assume the first argument was damageType
  // Default to current character if target is still null
  let target = getArgument(command, 0);
  let damageType = getArgument(command, 1);
  if (!damageType) {
    damageType = target;
    target = null;
  }
  target = target || getCharacter().name;

  /* <><> EXAMPLE OF: Damage Type - Story Card Table
  // (description JSON format inside story card)
  // See: defaultDamageTable
  The damage of an injury is how much is reduces the target's health.
  Damage may use a fixed numeric value or dice formatted value.
  The Rarity of an injury is how likely it is to occur.
  */

  // Attempt to fill the damage table with injuries from a thematic damage type first
  let damageTable = []
  if (damageType) {
    let damageTableCards = getStoryCardListByType("damage type - " + damageType, true)[0]
    damageTable = damageTableCards ? JSON.parse(damageTableCards.description) : [];
  }
  // Fallback in case the player provides no damage type, or the provided table is empty
  // TODO: instead of using default table, assume name of injury to add, allow damage argument
  if (damageTable.length < 1) {
    damageTable = defaultDamageTable
  }

  // NOTE: injury text entry should always logically follow the Textual prefix
  const isYou = target.toLowerCase() == "you"
  const hasWord = character.name == "You" ? "have" : "has"
  text += `${target} ${isYou?"sustain":"sustains"} a `

  // Time to roll the ~Injury!
  // TODO: let injury = rollInjury(weapon.damageType) // TODO: replace below with this
  
  const roll = getRandomFloat(0, 1);
  const possibleInjuries = damageTable.filter(injury => roll <= injury.rarity);
  if (possibleInjuries.length > 0) {
    const randomInjury = possibleInjuries[getRandomInteger(0, possibleInjuries.length - 1)]; // One injury only
    if (isNaN(randomInjury.damage)) {
      randomInjury.damage = calculateRoll(formatRoll(randomInjury.damage))
    } else {
      randomInjury.damage = parseInt(randomInjury.damage)
    }
    text += `${randomInjury.injury} for ${randomInjury.damage} damage!\n`
    if(hasCharacter(target)) { // If in state.characters (i.e. not a non-character / NPC / narrative entity)
      const character = getCharacter(target)
      addInjury(character, randomInjury.injury, randomInjury.damage)
      text += `${character.name} ${hasWord} ${getHealth(character)}/${getHealthMax(character)} health remaining.\n`
    }
  } else {
    text += "no injury!\n"
  }

  return [text, true]
}
const doInjuryHelp = `<><> #injure command
-- Randomly rolls a random injury from a thematic damage type table.
-- (target) is optional; defualts to activate character.
-- (damageType) is option; defaults a generic injury.
Usage: #injure (you|character|target) (damageType)\n`

/**
 * Heals a characters injury
 * @function
 * @param {string} [command] Command text containing injury name to heal.
 * @returns {[string, boolean]} Confirmation or error message and success status.
 */
// TODO: Add more healing options like all, worst, amount overflow, amount spread
function doHealInjury(command) {
  const character = getCharacter()
  const injuryName = getArgument(command, 0)
  const healingAmount = getArgument(command, 1)
  if (!injuryName || !healingAmount) {
    return ["\n[Error: Not enough parameters. See #help]\n", false]
  }

  const injuryFound = character.injuries.find((element) => element.injury == injuryName.toLowerCase())
  if (!injuryFound) {
    return [`\n[${character.name} has Injury of that nammed ${injuryName}. See #bio]\n`, false]
  }
  
  const possesiveName = getPossessiveName(character.name)
  let text = `${possesiveName} ${injuryFound.injury} was `
  const remaingingDmg = healInjury(character, injuryFound.injury, healingAmount)
  if (remaingingDmg > 0) {
    text += `healed by ${healingAmount} points [${remaingingDmg} points of damage remaining]`
  } else {
    text += `fully healed!`
  }

  return [text+"\n", true]
}
const doHealInjuryHelp = `<><> #heal command
-- Heals a specified injury on the character, for X amount.
Usage: character|you #heal injury amount\n`

/**
* Uses attacker with item to roll hit chance and apply an injury to a target if successful.
* @function
* @param {string} [command] Command Format: {{ you|character|attacker #attack you|character|target (with item|damageType) (DC) (at advantage|disadvantage) }}
* @returns {string} Text containing the result of the action, or an error with (state.show = "none")
**/
// TODO: Designed with single player in mind, multiplayers will have no chance to evade
function doMelee(command) {
  let text = "\n"
  state.show = "prefix"
  let commandName = getCommandName(command);
  command = command.replaceAll(/\s+((the)|(with)|(a)|(an)|(for)|(and)|(at))\s+/g, " ")

  // ARARGUMENT PARSER - --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
  // you|character|target (with item|damageType) (DC) (at advantage|disadvantage)
  const types = ["string", "string", "dc", "roll"];
  const optionals = [false, true, true, true];

  let attackerName = state.characterName; // Assign the active character
  let [targetName, weaponName, difficulty, rollType] = argumentParser(command, types, optionals);

  if (!targetName || !attackerName) {
    return ["\n[Error: Not enough parameters. See #help]\n", false]
  }

  // Convert attacker and target to characters
  let attacker = hasCharacter(attackerName) ? getCharacter(attackerName) : createCharacter(attackerName)
  let target = hasCharacter(targetName) ? getCharacter(targetName) : createCharacter(targetName)

  // Weapon may be an inventory item, general item, or damage type
  let weapon = {... defaultItemTemplate}
  if (weaponName) {
    // Search for the weapon in inventory, or as general item (in story cards)
    let invItem = attacker.inventory.find(element => compareWithoutPlural(weaponName, element.itemName))
    let dmgType = getStoryCardListByType(`damage type - ${weaponName.toLowerCase()}`, false)
    let genItem = getStoryCardListByType("item - ", false).find(element => {
      let elementItem = JSON.parse(element.description)
      return compareWithoutPlural(weaponName, elementItem.itemName)
    })

    if (invItem) { // Character has item matching weapon
      weapon = invItem
    } else if (genItem) { // Item matching weapon exists
      weapon = genItem
    } else { // Unknown item or damage type
      weapon = {... defaultItemTemplate}
      weapon.itemName = weaponName
      if (dmgType) weapon.damageType = weaponName
    }
  }

  if (difficulty) {
    if (!isNaN(difficulty)) {
      difficulty = parseInt(difficulty);
    } else if (Object.keys(difficultyScale).includes(difficulty.toLowerCase())) {
      difficulty = difficultyScale[difficulty.toLowerCase()];
    }
  } else {
    difficulty = config.defaultDifficulty
  }

  // ROLL TO HIT VARIABLES - --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
  let hitMod = calculateHitMod(attacker, weapon.level, commandName)

  let randomInjury = rollInjury(weapon.damageType, weapon.level, hitMod)

  const { die1, die2, score, modifier } = performRoll("1d20", rollType, null, null, null, hitMod)
  let hitResult = (score+modifier >= difficulty || score == 20) && (score != 1)

  // PRINT TEXT  --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
  if (config.showRolls) // (Prefixes rolling result into the printed output)
    state.prefix = `\n${printRoll("1d20", rollType, modifier, score, die1, die2, difficulty, attacker, null, null)}\n`

  // Check if the attack as a fail
  const theirWord = (attacker.name.toLowerCase() == "you") ? "your" : "their"
  const critText = (score == 20 || score == 1) ? "critically " : ""
  const resultText = (hitResult ? (critText || "successfully") : critText + "failed to")

  // You (critically|successfully) hit the goblin ++ with your sword, ++ inflicting XYZ injury for X damage.
  // You critically failed to hit the goblin ++ with your sword.

  text += `${attacker.name} ${resultText} ${commandName} ${target.name}`
  if (weapon.itemName != defaultItemTemplate.itemName) text += `, with ${theirWord} ${weapon.itemName}`
  if (hitResult) text += randomInjury?.damage > 0 ? `, inflicting ${randomInjury.injury} for ${randomInjury.damage} damage` : `, but inflicted no injury!`
  text += "."
  
  // Add injury to target if they are in state.characters (i.e. player, or player's party)
  if (hasCharacter(target.name)) {
    const hasWord = target.name == "You" ? "have" : "has"
    addInjury(target, randomInjury.injury, randomInjury.damage)
    text += `${target.name} ${hasWord} ${getHealth(target)}/${getHealthMax(target)} health remaining.`
  }

  // Adding of autoXp for attacker!
  text += addAutoExp(attacker, hitResult, difficulty)

  return [text+"\n", true]
}
const doMeleeHelp = `<><> #attack command
-- Uses attacker with item to roll hit chance and apply an injury to a target if successful.
-- (DC) is optional; defaults to default difficulty.
-- (item) is optional; defaults to generic damage type for injury.
-- (item) may also be a damage type.
-- (attacker) is optional; defaults to you if none.
-- (advantage|disadvantage) is optional; defaults to normal advantage.
Usage: (you|character|attacker) #attack you|character|target with (item|damageType) (DC) (at advantage|disadvantage)\n`

/**
* Uses attacker with item and ammo to roll hit chance and apply an injury to a target if successful.
* @function
* @param {string} [command] Command Format: {{ you|character|attacker #shoot you|character|target with (item|damageType and) ammo (DC) (at advantage|disadvantage) }}
* @returns {string} Text containing the result of the action, or an error with (state.show = "none")
**/
// TODO: Designed with single player in mind, multiplayers will have no chance to evade
function doRange(command) {
  let text = "\n"
  state.show = "prefix"
  let commandName = getCommandName(command);
  command = command.replaceAll(/\s+((the)|(with)|(a)|(an)|(for)|(and)|(at))\s+/g, " ")

  // ARARGUMENT PARSER - --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
  // you|character|target with (item|damageType and) ammo (DC) (at advantage|disadvantage)
  const types = ["string", "string", "string", "dc", "roll"];
  const optionals = [false, true, false, true, true];

  let attackerName = state.characterName; // Assign the active character
  let [targetName, weaponName, ammoName, difficulty, rollType] = argumentParser(command, types, optionals);

  if (!targetName || !attackerName) {
    return ["\n[Error: Not enough parameters. See #help]\n", false]
  }

  // Convert attacker and target to characters
  let attacker = hasCharacter(attackerName) ? getCharacter(attackerName) : createCharacter(attackerName)
  let target = hasCharacter(targetName) ? getCharacter(targetName) : createCharacter(targetName)

  // Ammo may be an inventory item, or general item
  let ammo = {... defaultItemTemplate}
  if (ammoName) {
    // Search for the weapon in inventory, or as general item (in story cards)
    let invItem = attacker.inventory.find(element => compareWithoutPlural(ammoName, element.itemName))
    let genItem = getStoryCardListByType("item - ", false).find(element => {
      let elementItem = JSON.parse(element.description)
      return compareWithoutPlural(ammoName, elementItem.itemName)
    })

    if (invItem) { // Character has item matching weapon
      ammo = invItem
      removeItemFromInventory(attacker, invItem.itemName, 1) // Reduce ammo qty
    } else if (genItem) { // Item matching weapon exists
      ammo = genItem
    }
  }

  // Weapon may be an inventory item, general item, or damage type
  let weapon = {... defaultItemTemplate}
  if (weaponName) {
    // Search for the weapon in inventory, or as general item (in story cards)
    let invItem = attacker.inventory.find(element => compareWithoutPlural(weaponName, element.itemName))
    let dmgType = getStoryCardListByType(`damage type - ${weaponName.toLowerCase()}`, false)
    let genItem = getStoryCardListByType("item - ", false).find(element => {
      let elementItem = JSON.parse(element.description)
      return compareWithoutPlural(weaponName, elementItem.itemName)
    })

    if (invItem) { // Character has item matching weapon
      weapon = invItem
    } else if (genItem) { // Item matching weapon exists
      weapon = genItem
    } else { // Unknown item or damage type
      weapon = {... defaultItemTemplate}
      weapon.itemName = weaponName
      if (dmgType) ammo.damageType = weaponName // Ranged attacks use ammo type
    }
  }

  if (difficulty) {
    if (!isNaN(difficulty)) {
      difficulty = parseInt(difficulty);
    } else if (Object.keys(difficultyScale).includes(difficulty.toLowerCase())) {
      difficulty = difficultyScale[difficulty.toLowerCase()];
    }
  } else {
    difficulty = config.defaultDifficulty
  }

  // ROLL TO HIT VARIABLES - --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
  let weaponMod = ammo ? Math.ceil(weapon.level + ammo.level / 2) : weapon.level
  let hitMod = calculateHitMod(attacker, weaponMod, commandName)

  let randomInjury = rollInjury(ammo.damageType, weaponMod, hitMod)
  
  const { die1, die2, score, modifier } = performRoll("1d20", rollType, null, null, null, hitMod)
  let hitResult = (score+modifier >= difficulty || score == 20) && (score != 1)

  // PRINT TEXT  --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
  if (config.showRolls) // (Prefixes rolling result into the printed output)
    state.prefix = `\n${printRoll("1d20", rollType, modifier, score, die1, die2, difficulty, attacker, null, null)}\n`

  // Check if the attack as a fail
  const theirWord = (attacker.name.toLowerCase() == "you") ? "your" : "their"
  const critText = (score == 20 || score == 1) ? "critically " : ""
  const resultText = (hitResult ? (critText || "successfully") : critText + "failed to")
  const andWeapon = weaponName ? `${weapon.itemName} and ` : ""

  // You (critically|successfully) hit the goblin ++ with your ammo, ++ inflicting XYZ injury for X damage.
  // You critically failed to hit the goblin ++ with your ammo.

  text += `${attacker.name} ${resultText} ${commandName} ${target.name}`
  if (ammo.itemName != defaultItemTemplate.itemName) text += `, with ${theirWord} ${andWeapon}${ammo.itemName}`
  if (hitResult) text += randomInjury?.damage > 0 ? `, inflicting ${randomInjury.injury} for ${randomInjury.damage} damage` : `, but inflicted no injury!`
  text += "."
  
  // Add injury to target if they are in state.characters (i.e. player, or player's party)
  if (hasCharacter(target.name)) {
    const hasWord = target.name == "You" ? "have" : "has"
    addInjury(target, randomInjury.injury, randomInjury.damage)
    text += `${target.name} ${hasWord} ${getHealth(target)}/${getHealthMax(target)} health remaining.`
  }

  // Adding of autoXp for attacker!
  text += addAutoExp(attacker, hitResult, difficulty)

  return [text+"\n", true]
}
const doRangeHelp = `<><> #shoot command
-- Uses attacker with item to roll hit chance and apply an injury to a target if successful.
-- Ammo item is expended on hit or miss event.
-- Damage Type of attack is based on ammo (unless specified)
-- Hit chance uses the average of the weapon level and ammo level.

-- (DC) is optional; defaults to default difficulty.
-- (item) is optional; defaults to generic damage type for injury.
-- (item) may also be a damage type.
-- (attacker) is optional; defaults to you if none.
-- (advantage|disadvantage) is optional; defaults to normal advantage.

Usage: (you|character|attacker) #shoot you|character|target with (item|damageType and) ammo (DC) (at advantage|disadvantage)\n`

/**
* Defender uses evasion to check if an attacker with item hits, then applies an injury to defender if failing to avoid.
* @function
* @param {string} [command] Command Format: {{ you|character|defender #evade you|character|attacker (with item|damageType) (DC) (at advantage|disadvantage) }}
* @returns {string} Text containing the result of the action, or an error with (state.show = "none")
**/
// TODO: Designed with single player in mind, multiplayers might not work as intended
function doEvade(command) {
  let text = "\n"
  state.show = "prefix"
  let commandName = getCommandName(command);
  command = command.replaceAll(/\s+((the)|(with)|(a)|(an)|(for)|(and)|(at))\s+/g, " ")

  // ARARGUMENT PARSER - --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
  // (you|character|attacker) (with item|damageType) (DC) (at advantage|disadvantage)
  const types = ["string", "string", "dc", "roll"];
  const optionals = [true, true, true, true];

  let defenderName = state.characterName; // Assign the active character
  let [attackerName, weaponName, difficultyArg, rollType] = argumentParser(command, types, optionals);

  if (!defenderName) {
    return ["\n[Error: Not enough parameters. See #help]\n", false]
  }

  // Now we need to determine if only one string was passed (now stored in attackerName)
  // Then that string could be (you|character|attacker) or (item|damageType) since both are optional
  if (attackerName != null && weaponName == null && !hasCharacter(attackerName)) {
    let dmgType = getStoryCardListByType(`damage type - ${attackerName.toLowerCase()}`, false)
    let genItem = getStoryCardListByType("item - ", false).find(element => {
      let elementItem = JSON.parse(element.description)
      return compareWithoutPlural(attackerName, elementItem.itemName)
    })
    // If it's a damage type or item, then we move it to weapon name
    if (dmgType != null || genItem != null) {
      weaponName = attackerName
      attackerName = null
    }
    // Else it's an unknown attacker, or unknown item
    // Either way, the injury for failing to evade will use the default
    // And there will be no additional modifiers
  }

  // Convert defender and attacker to characters
  let defender = hasCharacter(defenderName) ? getCharacter(defenderName) : createCharacter(defenderName)
  let attacker = hasCharacter(attackerName) ? getCharacter(attackerName) : createCharacter(attackerName)

  // Weapon may be an inventory item, general item, or damage type
  let weapon = {... defaultItemTemplate}
  if (weaponName) {
    // Search for the weapon in inventory, or as general item (in story cards)
    let invItem = attacker.inventory.find(element => compareWithoutPlural(weaponName, element.itemName))
    let dmgType = getStoryCardListByType(`damage type - ${weaponName.toLowerCase()}`, false)
    let genItem = getStoryCardListByType("item - ", false).find(element => {
      let elementItem = JSON.parse(element.description)
      return compareWithoutPlural(weaponName, elementItem.itemName)
    })

    if (invItem) { // Character has item matching weapon
      weapon = invItem
    } else if (genItem) { // Item matching weapon exists
      weapon = genItem
    } else { // Unknown item or damage type
      weapon = {... defaultItemTemplate}
      weapon.itemName = weaponName
      if (dmgType) weapon.damageType = weaponName
    }
  }

  const replaceDifficulty = (difficultyArg == null) && (hasCharacter(attacker.name))
  let difficulty = config.defaultDifficulty
  if (difficultyArg) {
    if (!isNaN(difficultyArg)) {
      difficulty = parseInt(difficultyArg);
    } else if (Object.keys(difficultyScale).includes(difficultyArg.toLowerCase())) {
      difficulty = difficultyScale[difficultyArg.toLowerCase()];
    }
  }

  // ROLL TO HIT VARIABLES - --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
  let evadeMod = calculateEvadeMod(defender, commandName)
  let attackerMod = calculateHitMod(attacker, weapon.level)

  let randomInjury = rollInjury(weapon.damageType, weapon.level, attackerMod)

  const attack = performRoll("1d20", null, null, null, null, attackerMod)
  const evasion = performRoll("1d20", rollType, null, null, null, evadeMod)
  if (replaceDifficulty) difficulty = attack.score + attack.modifier

  let evadeResult = (evasion.score+evasion.modifier >= difficulty)
  if (replaceDifficulty) evadeResult = attack.score == 20 ? true : evadeResult // Attack crit trumps normal evasion
  evadeResult = evasion.score == 20 ? true : evasion.score == 1 ? false : evadeResult // Evasion crit trumps attack crit
  if (replaceDifficulty) evadeResult = attack.score == 1 ? false : evadeResult // Crit miss is a miss, even if evasion crit fails

  let evadeCrit = evasion.score == 20 || evasion.score == 1
  if (replaceDifficulty && evasion.score != 20) {
    if (attack.score == 1) evadeCrit = false
    else if (attack.score == 20) evadeCrit = true
  }

  // PRINT TEXT  --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
  if (config.showRolls) { // (Prefixes rolling result into the printed output)
    state.prefix = attackerName ? `\n${printRoll("1d20", null, attack.modifier, attack.score, attack.die1, attack.die2, null, attacker, null, null)}\n` : ""
    state.prefix += `\n${printRoll("1d20", rollType, evasion.modifier, evasion.score, evasion.die1, evasion.die2, difficulty, defender, null, null)}\n`
  }

  // Check if the attack as a fail
  const critText = (evadeCrit) ? "critically " : ""
  const resultText = (evadeResult ? (critText || "successfully") : critText + "failed to")

  // You (critically|successfully) evade ++ the goblin ++ 's sword.
  // You critically failed to evade the goblin ++ 's sword, ++ and sustain XYZ injury for X damage.

  text += `${defender.name} ${resultText} ${commandName}`
  if (attackerName != null) {
    text += ` ${attacker.name}`
    if (weapon.itemName != defaultItemTemplate.itemName) text += `'s ${weapon.itemName}`
  } else {
    if (weapon.itemName != defaultItemTemplate.itemName) text += ` the ${weapon.itemName}`
  }
  if (!evadeResult) text += randomInjury?.damage > 0 ? `, and sustain a ${randomInjury.injury} for ${randomInjury.damage} damage` : `, but sustain no injury!`
  text += "."
  
  // Add injury to attacker if they are in state.characters (i.e. player, or player's party)
  if (!evadeResult && hasCharacter(defender.name)) {
    const hasWord = defender.name == "You" ? "have" : "has"
    addInjury(defender, randomInjury.injury, randomInjury.damage)
    text += `${defender.name} ${hasWord} ${getHealth(defender)}/${getHealthMax(defender)} health remaining.`
  }

  // Adding of autoXp for defender!
  text += addAutoExp(defender, evadeResult, difficulty)

  return [text+"\n", true]
}
const doEvadeHelp = `<><> #evade command
-- The defender attempts to evade the attack made by an attacker.
-- Evasion uses evasion skill or dex stat.
-- If the evasion fails, the defender sustains an injury.

-- (defender) is optional; defaults to you if none.
-- (attacker) is optional.
-- (item) is optional; defaults to generic damage type for injury.
-- (item) may also be a damage type.
-- (DC) is optional; defaults to default difficulty.
-- (advantage|disadvantage) is optional; defaults to normal advantage.

Usage: (you|character|defender) #evade (you|character|attacker) (with item|damageType) (DC) (at advantage|disadvantage)\n`

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
const doTestHelp = `<><> #debug command
-- FAIR WARNING: The debug command alters the game state to test. DATA WILL BE LOST!!!
-- Just be careful if you're a player, author's should remove tests before publishing.
Usage: #debug\n`

// AI DUNGEON -- Don't modify this part
modifier(text)