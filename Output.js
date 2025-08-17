// Your "Output" tab should look like this
// const version = "Hashtag DnD v0.7.0 by Raeleus / Lite Edition by SirSheeply"

// Checkout the Guidebook examples to get an idea of other ways you can use scripting
// https://help.aidungeon.com/scripting

/* NOTE: This is the Main AI Dungeon Call
 * Keeping this space clean will allow for greater compatibility with other script systems.
 */
const modifier = (text) => {
  // Your other output modifier scripts go here (preferred)
  text = DNDHash_output(text)
  // Your other output modifier scripts go here (alternative)
  return {text}
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////// DND HASH OUTPUT FUNCTION ////////////////////////////////////////////////////

/**
* - This is the main Hashtag DND function!
* - It handles output text, and states.
* - Handles step flows, forms as well.
* @function
* @param {string} [text] Raw output text from AI Dungeon
* @returns {string} Returns new output text of any flows or states, if any.
*/
function DNDHash_output(text) {
  if (state.show == null) return text

  const character = getCharacter()
  const possessiveName = character == null ? null : getPossessiveName(character.name)
  const type = history[history.length - 1].type
  const originalText = text
  text = type != "story" ? "" : history[history.length - 1].text.endsWith("\n") ? "" : "\n"
  
  switch (state.show) {
    case "create":
      text += state.showText
      break
    case "bio":
      text = showSummary(character)
      break
    case "showNotes":
      text += showNotes()
      break
    case "clearNotes":
      text += "[Notes cleared successfully]\n"
      break
    case "inventory":
      text += showInventory(character)
      break
    case "characters":
      text += showParty()
      break
    case "spellbook":
      text += showSpells(character)
      break
    case "stats":
      text += showStats(character)
      break
    case "skills":
      text += showSkills(character)
      break
    case "prefix":
      text = (state.prefix ?? "") + originalText
      break
    case "prefixOnly":
      text = state.prefix
      break
    case "clearInventory":
      text += `[${possessiveName} inventory has been emptied]\n`
      break
    case "clearSpells":
      text += `[${possessiveName} spells have been cleared]\n`
      break
    case "reset":
      text += "[All settings have been reset]\n"
      break
    case "help":
      text = helpText
      break
    case "none":
      text = " "
      break
    default:
      text = originalText
      break
  }

  state.show = null
  return text
}

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
  text += `Experience: ${character.experience}\n`
  text += `Level: ${getLevel(character.experience)}\n`
  text += `Next level at: ${getNextLevelXp(character.experience)} xp\n\n`
  text += showStats(character)
  text += showSkills(character)
  text += showSpells(character)
  text += showInventory(character)
  text += `**************\n\n`
  return text
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

const helpText = `
<><> Basic Hashtags <><>
#roll (advantage|disadvantage) (dice_value) -- Rolls a dice and shows the result. dice_value may be formatetd 5d20+6 or 5d20 or d20 or 20.

<><> Notes <><>
#shownotes -- Shows all the notes.
#note (message) -- Adds the specified message as a note. If the message is not specified, the last action's text will be saved as a note. Keep in mind that player adventures have a limited amount of state storage (an unspecified amount) so avoid saving too many notes. Quotes are not necessary.
#clearnotes -- Removes all notes.
#removenote value -- Removes the specified note as indicated by the number listed in #shownotes. To delete multiple notes, type the numbers with spaces or commas between them. This is safer than calling #removenote multiple times because the numbers shift as notes are deleted.

<><> Other Help Topics <><>
#help characters -- Extra help on character related commnads.
#help checks -- Extra help on check related commnads.
#help abilities -- Extra help on ability related commnads.
#help skills -- Extra help on skill related commnads.
#help inventory -- Extra help on inventory related commnads.
#help spells -- Extra help on spell related commnads.

<><> Other <><>
#version -- Returns the current version of this scenario.
#help (topic) -- This long help menu by defualt with optional argument for help topics.

<><> Danger Zone <><>
#reset -- Removes all characters, and notes. Changes all settings to their defaults. Use with caution!
`
const helpTextCharacters = `
<><> Characters <><>
#setup -- Launches the create character setup.
#bio -- Shows the character's abilities, skills, spells, inventory, and everything else about this character.
#renamecharacter new_name -- Renames the character to the new name. All abilities, skills, inventory, etc. will remain the same. Quotes are not necessary.
#clonecharacter new_name -- Copies the abilities, skills, inventory, etc. of the current character to a new character with the name new_name. Quotes are not necessary.
#setclass class -- Sets the class of the character for player reference. Quotes are not necessary.
#showcharacters -- Lists all current characters and their classes/summaries.
#removecharacter name -- Removes the character that has the indicated name.

<><> Time <><>
#showday -- Shows the number of days since your adventure began.
#setday -- Sets the number of days since your adventure began.
#rest -- Sets all of the characters' health to their maximums. Use #shortrest to only restore half health. This command increases the day counter and displays the number of days since your adventure began.

<><> Levels & Experience <><>
#setxp value -- Sets the character's experience to the specified value.
#addxp (party) value -- Increases the character's experience by the specified value. The player is notified if there is a level up. If the parameter party is specified, xp will be added to the entire party instead. Parameters can be listed in any order.
#levelup -- Increases the character's experience by the exact amount needed to reach the next level.
`
const helpTextChecks = `
<><> Character Checks <><>
#check (ability|skill) (advantage|disadvantage) (difficulty_class or automatic|effortless|easy|medium|hard|impossible)
-- Rolls a d20 and compares the result (modified by the character's ability/skill) to the specified difficulty. The parameters can be listed in any order.

#try (ability|skill) (advantage|disadvantage) (difficulty_class or automatic|effortless|easy|medium|hard|impossible) task
-- Attempts to do the task based on the character's ability/skill against the specified difficulty. Quotes are not necessary.
`
const helpTextAbilities = `
<><> Abilities <><>
#setability ability value -- Adds the ability to the character if necessary and sets it to the specified value. Quotes are required for abilities with spaces.
#showabilities -- Shows the character's list of abilities.
#removeability ability -- Removes the ability from the character's list of abilities. Quotes are not necessary.
#clearabilities -- Removes all abilities from the character.
`
const helpTextSkills = `
<><> Skills <><>
#setskill skill (ability) value -- Adds the skill to the character if necessary, and associates it with the specified ability and value. The ability is optional only if this is an existing skill. New skills need an ability specified.
#showskills -- Shows the character's list of skills
#removeskill -- Removes the skill from the character's list of skills.
#clearskills -- Removes all skills from the character.
`
const helpTextInventory = `
<><> Inventory <><>
#take (quantity) item
-- Adds the specified quantity of item to the character's inventory. If a quantity is omitted, it's assumed to be 1. The words the, a, and an are ignored. Quotes are not necessary.

#buy (buy_quantity) buy_item (sell_quantity) sell_item
-- Adds the specified buy_quantity of the buy_item to the character's inventory and also removes the sell_quantity of sell_item. If quantities are omitted, they are assumed to be 1. Quotes are necessary for items with spaces in the name. The words for, with, the, a, and an are ignored.

#sell (sell_quantity) sell_item (buy_quantity) buy_item
-- Just like #buy, but with the parameters reversed. Adds the specified buy_quantity of the buy_item to the character's inventory and also removes the sell_quantity of sell_item. If quantities are omitted, they are assumed to be 1. The words for, with, the, a, and an are ignored. Quotes are necessary for items with spaces in the name.

#drop (quantity or all|every) item
-- Removes the specified quantity of item from the character's inventory. If a quantity is omitted, it's assumed to be 1. The words the, a, and an are ignored. Quotes are not necessary.

#give other_character (quantity or all|every) item
-- Removes the quantity of item from the character's inventory and adds it to the other_character's inventory. If a quantity is omitted, it's assumed to be 1. The words the, a, and an are ignored. Quotes are not necessary for the item.

#loot (theme)
-- Gives the character a random item selected from the given list. count determines how many rewards are drawn (default is 1). The default list has a weighted rarity of drawing from any of the lists with increasing rarity.

#renameitem original_name new_name
-- Renames the item indicated by original_name to the new_name. The quantity remains the same. Quotes are necessary for items with spaces in the name.

#inventory
-- Shows the items in the inventory of the character.

#clearinventory
-- Removes all items from the character's inventory.
`
const helpTextSpells = `
<><> Spells <><>
#learnspell spell -- Adds the specified spell to the character's spellbook. Creates a story card if necessary. Quotes are not necessary.

#forgetSpell spell -- Removes the specified spell from the character's spellbook. Quotes are not necessary.

#clearspells -- Removes all spells from the character's spellbook.

#spellbook -- Shows the list of spells that the character has learned.
-- This opens the spell shop where characters can spend gold to purchase new spells. The selection is randomized based on the day and on the character's class and spell level. Full casters, such as bards, clerics, druids, sorcerers, warlocks, and wizards, have spell levels from 0-9. Half casters, such as paladins and rangers, have spell levels from 1-5. Include the argument "free" to not require gold to purchase the spell. Include the argument "all" to list all available spells for that level. Otherwise, the list is randomized and a selection of lower level spells are included.

#cast (advantage|disadvantage) (difficulty_class or effortless|easy|medium|hard|impossible) spell(target)
-- Character will cast the indicated spell if the spell is in their spellbook. It will be a targeted spell if a target is indicated. The roll is modified by the spell casting ability of the character. You may type a phrase without quotes for spell such as "cast fire bolt at the giant chicken". If the difficulty is not specified, the default difficulty or the AC of the opponent in combat will be used. The parameters can be listed in any order, except the target must be listed last. The target can include the name of the enemy or the word "enemy" and the number of the enemy as listed in #enemies. The target can also include a damage amount. If the damage is not specified, the character's default damage is used. Quotes are not necessary.
-- Example: Astri #attack advantage The Evil Knight for 2d12+2 damage
`
const helpTextCombat = `
<><> Combat <><>
#encounter (funny|easy|medium|hard|boss|god or cr) -- Generate an encounter from the specified list. If a list is not specified, it will default to "easy" You can instead provide a number as a challenge rating which will scale encounters from the appropriate list and scale their difficulty.
`

// AI DUNGEON -- Don't modify this part
modifier(text)