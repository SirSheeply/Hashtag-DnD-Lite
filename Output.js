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

function DNDHash_output(text) {
  if (state.show == null) return text

  var character = getCharacter()
  var possessiveName = character == null ? null : getPossessiveName(character.name)
  var type = history[history.length - 1].type
  const originalText = text
  text = type != "story" ? "" : history[history.length - 1].text.endsWith("\n") ? "" : "\n"
  
  switch (state.show) {
    case "create":
      switch (state.createStep) {
        case 0:
          text += `***CHARACTER CREATION***\nCharacter: ${state.tempCharacter.name}\nWould you like to use a prefab character? (y/n/q to quit)\n`
          break
        case 1:
          text += `What class is your character?\n`
          break
        case 2:
          text += `You rolled the following stat dice: ${state.statDice}\nChoose your abilities in order from highest to lowest\n1. Strength: Physical power and endurance\n2. Dexterity: Agility and coordination\n3. Constitution: Toughness and physique \n4. Intelligence: Reasoning and memory\n5. Wisdom: Judgement and insight\n6. Charisma: Force of personality and persuasiveness\n\nEnter the numbers with spaces between or q to quit.\n`
          break
        case 100:
          text += `What character will you choose?\n`
          const presetIndexes = getStoryCardListByType("preset")
          for (let index = 0; index < presetIndexes.length; index++) {
            text += `${index}. ${presetIndexes[index].title}\n`
          }
          text += `Enter the number or q to quit.\n`
          break
        case 500:
          text += `${state.tempCharacter.name} the ${state.tempCharacter.className} has been created.\nType #bio to see a summary of your character.\n***********\n`
          break;
        case null:
          text += `[Character creation has been aborted!]\n`
          break
      }
      break
    case "bio":
      text += `*** ${possessiveName.toUpperCase()} BIO ***\n`
      text += `Class: ${character.className}\n`
      text += `Health: ${character.health}/${getHealthMax()}\n`
      text += `Experience: ${character.experience}\n`
      text += `Level: ${getLevel(character.experience)}\n`
      var nextLevel = getNextLevelXp(character.experience)
      text += `Next level at: ${nextLevel == - 1 ? "(at maximum)": nextLevel + " xp"}\n\n`
      text += `-ABILITIES-\n`

      character.stats.forEach(function(x) {
        text += `* ${toTitleCase(x.name)} ${x.value}\n`
      })

      text += `----\n\n`
      text += `-SKILLS-\n`

      character.skills.forEach(function(x) {
        const stat = character.stats.find(y => y.name.toLowerCase() == x.stat.toLowerCase())

        var statModifier = stat != null ? getModifier(stat.value): 0
        var totalModifier = x.modifier + statModifier
        var modifier = x.modifier

        if (statModifier >= 0) statModifier = `+${statModifier}`
        if (totalModifier >= 0) totalModifier = `+${totalModifier}`
        if (modifier >= 0) modifier = `+${modifier}`

        text += `* ${toTitleCase(x.name)} ${totalModifier} = ${toTitleCase(x.stat)} ${statModifier} Proficiency ${modifier}\n`
      })

      text += `----\n\n`
      if (character.spellStat != null) {
        text += `-SPELLS-\n`
        
        character.spells.forEach(function(x) {
          text += `* ${toTitleCase(x)}\n`
        })

        text += `----\n\n`
      }

      text += `-INVENTORY-\n`
      text += showInventory(character, "-")
      text += `----\n\n`

      text += `**************\n\n`
      break
    case "showNotes":
      text += "*** NOTES ***"
      var counter = 1
      state.notes.forEach(function(x) {
        text += `\n${counter++}. ${x}`
      })
      if (state.notes.length == 0) text += "\nThere are no notes!"
      text += "\n**************\n\n"
      break
    case "clearNotes":
      text += "[Notes cleared successfully]\n"
      break
    case "inventory":
      text += `*** ${possessiveName.toUpperCase()} INVENTORY ***\n`
      text += showInventory(character, "*")
      text += "******************\n\n"
      break
    case "characters":
      text += `*** CHARACTERS ***`
      if (state.characters.length > 0) {
        state.characters.forEach(function(x) {
          text += `\n* ${toTitleCase(x.name)} the ${toTitleCase(x.className)}: ${x.summary}`
        })
      } else {
        text += `\n${possessiveName} inventory is empty!`
      }
      text += "\n******************\n\n"
      break
    case "spellbook":
      text += `*** ${possessiveName.toUpperCase()} SPELLBOOK ***`
      if (character.spells.length > 0) {
        character.spells.forEach(function(x) {
          text += "\n* " + toTitleCase(x)
        })
      } else {
        text += `\n${possessiveName} spellbook is empty!`
      }
      text += "\n******************\n\n"
      break
    case "stats":
      text += `*** ${possessiveName.toUpperCase()} ABILITIES ***\n`
      if (character.stats.length > 0) {
        character.stats.forEach(function(x) {
          text += `* ${toTitleCase(x.name)} ${x.value}\n`
        })
      } else {
        text += `${character.name} has no abilities!\n`
      }
      text += "******************\n\n"
      break
    case "skills":
      text += `*** ${possessiveName.toUpperCase()} SKILLS ***\n`
      if (character.skills.length > 0) {
        character.skills.forEach(function(x) {
          const stat = character.stats.find(y => y.name.toLowerCase() == x.stat.toLowerCase())
          
          var statModifier = stat != null ? getModifier(stat.value): 0
          var totalModifier = x.modifier + statModifier
          var modifier = x.modifier

          if (statModifier >= 0) statModifier = `+${statModifier}`
          if (totalModifier >= 0) totalModifier = `+${totalModifier}`
          if (modifier >= 0) modifier = `+${modifier}`

          text += `* ${toTitleCase(x.name)} ${totalModifier} = ${toTitleCase(x.stat)} ${statModifier} Proficiency ${modifier}\n`
        })
      } else {
        text += `${character.name} has no skills!\n`
      }
      text += "******************\n\n"
      break
    case "none":
      text += " "
      break
    case "prefix":
      text = state.prefix + originalText
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
    default:
      text = " "
      break
  }

  state.show = null
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
#help combat -- Extra help on combat related commnads.
#help allies -- Extra help on ally related commnads.

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
#setsummary summary -- Sets the summary of the character for player reference. Quotes are not necessary.
#showcharacters -- Lists all current characters and their classes/summaries.
#removecharacter name -- Removes the character that has the indicated name.

<><> Health & Damage <><>
#sethealth value -- Sets the character's health to specified value. It's capped at the character's max health.
#heal value or dice_roll (target) -- Increases the target enemy's or character's health by the specified value or dice_roll. If a target isn't specified, the character calling the command is healed.
#healparty value or dice_roll -- Increases the health of all party characters' by the specified value or dice_roll.
#damage value or dice_roll (target) -- Decreases the target enemy's or character's health by the specified value or dice_roll. If a target isn't specified, the character calling the command is damaged. Reaching 0 causes the target to become "unconscious".
#setac value -- Sets the armor class of the character. The default is 10
#setdamage value or dice_roll -- Sets the default damage that the character causes when attacking. If a dice_roll is specified, a randomized damage will be calculated at the time of the attack. The default is 1d6
#setweaponproficiency value or dice_roll -- Sets the weapon proficiency of the character which affects the chance to hit. If a dice_roll is specified, a randomized value is calculated. The default is 2

<><> Time <><>
#showday -- Shows the number of days since your adventure began.
#setday -- Sets the number of days since your adventure began.
#rest -- Sets all of the characters' health to their maximums. Use #shortrest to only restore half health. This command increases the day counter and displays the number of days since your adventure began.

<><> Levels & Experience <><>
#setxp value -- Sets the character's experience to the specified value.
#addxp (party) value -- Increases the character's experience by the specified value. The player is notified if there is a level up. If the parameter party is specified, xp will be added to the entire party instead. Parameters can be listed in any order.
#setautoxp value -- Automatically increases the experience of all party members when a #try, #attack, or #cast is called. The amount of experience is scaled based on the difficulty class of the check with any check 20 or higher will result in the maximum specified by value. Set to 0 to disable.
#showautoxp -- Shows the value of the auto xp.
#levelup -- Increases the character's experience by the exact amount needed to reach the next level.
`
const helpTextChecks = `
<><> Character Checks <><>
#check (ability|skill) (advantage|disadvantage) (difficulty_class or automatic|effortless|easy|medium|hard|impossible)
-- Rolls a d20 and compares the result (modified by the character's ability/skill) to the specified difficulty. The parameters can be listed in any order.

#try (ability|skill) (advantage|disadvantage) (difficulty_class or automatic|effortless|easy|medium|hard|impossible) task
-- Attempts to do the task based on the character's ability/skill against the specified difficulty. Quotes are not necessary.

<><> Check Difficulty <><>
#setdefaultdifficulty (difficulty_class or automatic|effortless|easy|medium|hard|impossible)
-- Sets the default difficulty for #check, #try, #attack, and #cast when a difficulty is not specified. The normal default is 10 (easy). If you do not pass any parameters, the default will be set to 10 (easy).

#showdefaultdifficulty
-- Shows the default difficulty for #check, #try, #attack, and #cast when a difficulty is not specified. The normal default is 10 (easy).
`
const helpTextAbilities = `
<><> Abilities <><>
#setability ability value -- Adds the ability to the character if necessary and sets it to the specified value. Quotes are required for abilities with spaces.
#showabilities -- Shows the character's list of abilities.
#removeability ability -- Removes the ability from the character's list of abilities. Quotes are not necessary.
#clearabilities -- Removes all abilities from the character.
#setspellability ability -- Sets the ability that affects the modifier for #cast. Quotes are not necessary.
#setmeleeability ability -- Sets the character's ability modifier that affects melee attacks. Quotes are not necessary.
#setrangedability ability -- Sets the character's ability modifier that affects ranged attacks. Quotes are not necessary.
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

#equip weapon_or_armor_name
-- Equips a weapon or armor and automatically changes the character's damage/weapon proficiency or armor class respectively. Shields should be equipped after equipping armor because shield AC is added to the total.

#buy (buy_quantity) buy_item (sell_quantity) sell_item
-- Adds the specified buy_quantity of the buy_item to the character's inventory and also removes the sell_quantity of sell_item. If quantities are omitted, they are assumed to be 1. Quotes are necessary for items with spaces in the name. The words for, with, the, a, and an are ignored.

#sell (sell_quantity) sell_item (buy_quantity) buy_item
-- Just like #buy, but with the parameters reversed. Adds the specified buy_quantity of the buy_item to the character's inventory and also removes the sell_quantity of sell_item. If quantities are omitted, they are assumed to be 1. The words for, with, the, a, and an are ignored. Quotes are necessary for items with spaces in the name.

#drop (quantity or all|every) item
-- Removes the specified quantity of item from the character's inventory. If a quantity is omitted, it's assumed to be 1. The words the, a, and an are ignored. Quotes are not necessary.

#give other_character (quantity or all|every) item
-- Removes the quantity of item from the character's inventory and adds it to the other_character's inventory. If a quantity is omitted, it's assumed to be 1. The words the, a, and an are ignored. Quotes are not necessary for the item.

#reward (count) (default|weapons|armor|tools|gear|common|uncommon|rare|very rare|legendary|artifact)
-- Gives the character a random item selected from the given list. count determines how many rewards are drawn (default is 1). The default list has a weighted chance of drawing from any of the lists with increasing rarity.

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
`
const helpTextCombat = `
<><> Combat <><>
#setupenemy -- Follow prompts to create an enemy from a template or completely from scratch. It will be added to the existing encounter if there is one already specified.
#encounter (funny|easy|medium|hard|boss|god or cr) -- Generate an encounter from the specified list. If a list is not specified, it will default to "easy" You can instead provide a number as a challenge rating which will scale encounters from the appropriate list and scale their difficulty.
#showenemies -- Shows the list of current enemies.
#addenemy name health ac hitModifier damage initiative spells -- Adds the specified enemy to the list of enemies. health, ac, hitModifier, damage, and initiative can be numbers or dice rolls such as 3d6+5. Type the name in quotes if the name contains a space. The rest of the parameters can be a list of spells. Each spell must be typed in quotes if it has a space. If the spell does damage, write the name and damage roll in the following format: "Ray of Frost5d10"
#removeenemy name or index -- Removes the enemy as specified by the name or index. To delete multiple enemies, type the numbers with spaces or commas between them. This is safer than calling #removeenemy multiple times because the numbers shift as enemies are deleted. Quotes are not necessary.
#clearenemies -- Removes all enemies.
#initiative -- Assigns initiative to all characters and enemies. This begins combat.
#turn -- Updates the turn to the next character in combat. If it is an enemy, the enemy will attack. If it's a player character, the system will allow the player to take their turn. If there are no enemies left or all the player characters are dead, combat ends.
#repeatTurn -- Repeats the turn. If it is currently an enemy's turn, it will attack or cast another spell again.
#block -- Reverses the damage that has been inflicted in the last turn. This applies to damage on characters and enemies.
#flee (difficulty_class or automatic|effortless|easy|medium|hard|impossible) -- Attempt to flee from combat. If the difficulty is not specified, the default difficulty will be used instead.
#attack (ranged) (advantage|disadvantage) (ac or effortless|easy|medium|hard|impossible) target
-- Attacks the specified target with a melee (the default) or ranged attack. The roll is compared against the specified AC which will determine if the attack succeeds or misses. If the AC is not specified, the default AC or the AC of the opponent in combat will be used. The parameters can be listed in any order, except the target must be listed last. The target can include the name of the enemy or the word "enemy" and the number of the enemy as listed in #enemies. The target can also include a damage amount. If the damage is not specified, the character's default damage is used. Quotes are not necessary.
-- Example: Astri #attack advantage The Evil Knight for 2d12+2 damage
#cast (advantage|disadvantage) (difficulty_class or effortless|easy|medium|hard|impossible) spell(target)
-- Character will cast the indicated spell if the spell is in their spellbook. It will be a targeted spell if a target is indicated. The roll is modified by the spell casting ability of the character. You may type a phrase without quotes for spell such as "cast fire bolt at the giant chicken". If the difficulty is not specified, the default difficulty or the AC of the opponent in combat will be used. The parameters can be listed in any order, except the target must be listed last. The target can include the name of the enemy or the word "enemy" and the number of the enemy as listed in #enemies. The target can also include a damage amount. If the damage is not specified, the character's default damage is used. Quotes are not necessary.
-- Example: Astri #attack advantage The Evil Knight for 2d12+2 damage
`
const helpTextAllies = `
<><> Allies <><>
#setupally 
-- Follow prompts to create an ally from a template or completely from scratch. It will be added to the existing encounter if there is one already specified.
#showallies -- Shows the list of current allies.
#clearallies -- Removes all allies.
#addally name health ac hitModifier damage initiative spells
-- Adds the specified ally to the list of allies. health, ac, hitModifier, damage, and initiative can be numbers or dice rolls such as 3d6+5. Type the name in quotes if the name contains a space. The rest of the parameters can be a list of spells. Each spell must be typed in quotes if it has a space. If the spell does damage, write the name and damage roll in the following format: "Ray of Frost5d10"
#removeally name or index
-- Removes the ally as specified by the name or index. To delete multiple allies, type the numbers with spaces or commas between them. This is safer than calling #removeally multiple times because the numbers shift as allies are deleted. Quotes are not necessary.
`

// AI DUNGEON -- Don't modify this part
modifier(text)