// Your "Output" tab should look like this

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
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

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
        case 3:
          text += `What ability is your spell casting ability?\n1. Intelligence\n2. Wisdom\n3. Charisma\n4. Not a spell caster\nq to quit\n`
          break
        case 4:
          text += `Enter a short summary about your character or q to quit\n`
          break
        case 100:
          text += `What character will you choose?\n`
          const presetIndexes = listCharPresetCards()
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
    case "setupEnemy":
      switch (state.setupEnemyStep) {
        case 0:
          text += `***ENEMY CREATION***\nWould you like to use a preset enemy? (y/n/q to quit)\n`
          break
        case 1:
          text += `What is the enemy's name? This must be a unique name that has no duplicates in the current encounter. Type q to quit.\n`
          break
        case 2:
          text += `What is the enemy's health? This can be any positive integer or a dice roll (ie. 3d6+5). Type q to quit.\n`
          break
        case 3:
          text += `What is the enemy's armor class (AC)? This can be any positive integer with 10 being easy and 20 being incredibly difficult. It can also be a dice roll (ie. 2d4+5). Type q to quit\n`
          break
        case 4:
          text += `What is the enemy's hit modifier? This affects how accurate their attacks are. This can be any integer. 0 is normal accuracy. Type q to quit\n`
          break
        case 5:
          text += `What is the enemy's damage? This can be any positive integer or a dice roll (ie. 2d6+5). The dice roll is calculated at the time of each attack. Type q to quit.\n`
          break
        case 6:
          text += `What is the enemy's initiative? Initiative controls turn order. This can be any positive integer with higher numbers going first in battle. This can also be a dice roll (ie. 1d20+3). Type q to quit.\n`
          break
        case 7:
          text += "Enter the name of a spell that the enemy knows. If it can target this spell at a player character, add a dice roll for the damage calculation after it (ie. Ray of Frost3d6+2). Type s to stop entering spells or type q to quit.\n"
          break
        case 8:
          text += "Enter the name of another spell that the enemy knows. If it can target this spell at a player character, add a dice roll for the damage calculation after it (ie. Ray of Frost3d6+2). Type s to stop entering spells or type q to quit.\n"
          break
        case 100:
          // The rework here is to have all the enemies inside story cards, from which we can pull.
          // This means players can curate the enemies prefabs, and we're not limited to X amount.
          // We pass the enemy subtype as "" to find all enemy cards regardless of subtype
          const enemyIndexes = listEnemyCards("")
          text += `What enemy preset will you choose?\n`
          for (let index = 0; index < enemyIndexes.length; index++) {
            text += `${index}. ${enemyIndexes[index].title}\n`
          }
          text += `\n\nEnter the number or q to quit. If you want to rename the enemy, add a space and type the name\n(ie. 25 Thuggish Zombie B)\n`
          break
        case 500:
          var hashtag = `#addenemy "${state.tempEnemy.name}" ${state.tempEnemy.health} ${state.tempEnemy.ac} ${state.tempEnemy.hitModifier} ${state.tempEnemy.damage} ${state.tempEnemy.initiative}`
          for (var spell of state.tempEnemy.spells) {
            hashtag += ` "${spell}"`
          }

          text += `${state.tempEnemy.name} has been created.\nType #initiative to start the battle.\nCopy and paste the following hashtag to create another identical enemy like this:\n${hashtag}\n***********\n`
          break;
        case null:
          text += `[Enemy creation has been aborted!]\n`
          break
      }
      break
    case "setupAlly":
      switch (state.setupAllyStep) {
        case 0:
          text += `***ALLY CREATION***\nWould you like to use a preset ally? (y/n/q to quit)\n`
          break
        case 1:
          text += `What is the ally's name? This must be a unique name that has no duplicates in the current encounter. Typing the name of an existing ally will modify that ally's properties. Type q to quit.\n`
          break
        case 2:
          text += `${!state.newAlly ? "Ally name already exists. You are now modifying the existing ally " + state.tempAlly.name + ". " : ""}What is the ally's health? This can be any positive integer or a dice roll (ie. 3d6+5). Type q to quit.${!state.newAlly ? " Type default to leave as current value " + state.tempAlly.health : ""}\n`
          break
        case 3:
          text += `What is the ally's armor class (AC)? This can be any positive integer with 10 being easy and 20 being incredibly difficult. It can also be a dice roll (ie. 2d4+5). Type q to quit.${!state.newAlly ? " Type default to leave as current value " + state.tempAlly.ac : ""}\n`
          break
        case 4:
          text += `What is the ally's hit modifier? This affects how accurate their attacks are. This can be any integer. 0 is normal accuracy. Type q to quit.${!state.newAlly ? " Type default to leave as current value " + state.tempAlly.hitModifier : ""}\n`
          break
        case 5:
          text += `What is the ally's damage? This can be any positive integer or a dice roll (ie. 2d6+5). The dice roll is calculated at the time of each attack. Type q to quit.${!state.newAlly ? " Type default to leave as current value " + state.tempAlly.damage : ""}\n`
          break
        case 6:
          text += `What is the ally's initiative? Initiative controls turn order. This can be any positive integer with higher numbers going first in battle. This can also be a dice roll (ie. 1d20+3). Type q to quit.${!state.newAlly ? " Type default to leave as current value " + state.tempAlly.initiative : ""}\n`
          break
        case 7:
          text += `Enter the name of a spell that the ally knows. If it can target this spell at an enemy character, add a dice roll for the damage calculation after it (ie. Ray of Frost3d6+2). Type s to stop entering spells or type q to quit.${!state.newAlly ? " Type e to erase all current spells." : ""}\n`
          break
        case 8:
          text += `Enter the name of another spell that the ally knows. If it can target this spell at an enemy character, add a dice roll for the damage calculation after it (ie. Ray of Frost3d6+2). Type s to stop entering spells or type q to quit.\n`
          break
        case 100:
          // The rework here is to have all the allies inside story cards, from which we can pull.
          // This means players can curate the ally prefabs, and we're not limited to X amount.
          // We pass the ally subtype as "" to find all ally cards regardless of subtype
          const allyIndexes = listAllyCards("")
          text += `What ally preset will you choose?\n`
          for (let index = 0; index < allyIndexes.length; index++) {
            text += `${index}. ${allyIndexes[index].title}\n`
          }
          text += `\n\nEnter the number or q to quit. If you want to rename the ally, add a space and type the name\n(ie. 25 Thuggish Friend B)\n`
          break
        case 500:
          var hashtag = `#addally "${state.tempAlly.name}" ${state.tempAlly.health} ${state.tempAlly.ac} ${state.tempAlly.hitModifier} ${state.tempAlly.damage} ${state.tempAlly.initiative}`
          for (var spell of state.tempAlly.spells) {
            hashtag += ` "${spell}"`
          }

          text += `${state.tempAlly.name} has been created.\nType #showallies to show the list of all allies.\nCopy and paste the following hashtag to create another identical ally like this:\n${hashtag}\n***********\n`
          break;
        case null:
          text += `[Ally creation has been aborted!]\n`
          break
      }
      break
    case "spellShop":
      text += handleSpellShop()
      break
    case "itemShop":
      text += handleItemShop()
      break
    case "bio":
      text += `*** ${possessiveName.toUpperCase()} BIO ***\n`
      text += `Class: ${character.className}\n`
      text += `Health: ${character.health}/${getHealthMax()}\n`
      text += `Armor Class: ${character.ac}\n`
      text += `Damage: ${character.damage}\n`
      text += `Weapon Proficiency: ${character.proficiency}\n`
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

      text += `Melee Ability: ${character.meleeStat == null ? "none" : character.meleeStat}\n\n`
      text += `Ranged Ability: ${character.rangedStat == null ? "none" : character.rangedStat}\n\n`
      text += `Spellcasting Ability: ${character.spellStat == null ? "none" : character.spellStat}\n\n`

      if (character.spellStat != null) {
        text += `-SPELLS-\n`
        
        character.spells.forEach(function(x) {
          text += `* ${toTitleCase(x)}\n`
        })

        text += `----\n\n`
      }

      text += `-INVENTORY-\n`
      
      character.inventory.forEach(function(x) {
        text += `* ${x.quantity} ${toTitleCase(x.name.plural(x.quantity == 1))}\n`
      })

      text += `----\n\n`

      text += `Summary: ${character.summary}\n\n`

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
      text += `*** ${possessiveName.toUpperCase()} INVENTORY ***`
      if (character.inventory.length > 0) {
        character.inventory.forEach(function(x) {
          text += `\n* ${x.quantity} ${toTitleCase(x.name.plural(x.quantity == 1))}`
        })
      } else {
        text += `\n${possessiveName} inventory is empty!`
      }
      text += "\n******************\n\n"
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
    case "showAllies":
      text += "*** ALLIES ***\n"

      if (state.allies.length == 0) {
        text += "There are no allies present here. Type #encounter to generate a scripted set or #addally to add your own\n"
      } else {
        var index = 0
        for (var ally of state.allies) {
          text += `${++index}. ${toTitleCase(ally.name)} (Health: ${ally.health} AC: ${ally.ac} Initiative: ${ally.initiative})\n`
        }
      }

      text += "******************\n\n"
      break
    case "initiative":
      text += "*** INITIATIVE ORDER ***\n"

      if (state.initiativeOrder.length == 0) {
        text += "There is no one in the battle. This makes no sense!"
      } else {
        var index = 0
        for (var character of state.initiativeOrder) {
          text += `${++index}. ${toTitleCase(character.name)} (Initiative: ${character.calculatedInitiative})\n`
        }
      }

      text += "******************\n\n"
      
      if (state.initiativeOrder.length > 0) {
        state.initiativeOrder = []
        text += `[Type #turn]\n`
      }
      break
    case "reset":
      text += "[All settings have been reset]\n"
      break
    case "help":
      text = helpText
      break
    case "help characters":
      text = helpTextCharacters
      break
    case "help checks":
      text = helpTextChecks
      break
    case "help allies":
      text = helpTextAllies
      break
    case "help combat":
      text = helpTextCombat
      break
    case "help abilities":
      text = helpTextAbilities
      break
    case "help skills":
      text = helpTextSkills
      break
    case "help spells":
      text = helpTextSpells
      break
    case "help inventory":
      text = helpTextInventory
      break
    default:
      text = helpText
      break
  }

  state.show = null
  return text
}

function itemShopPushDeal(items, name) {
  let quantity = 1
  let storyCardName = name
  name = itemShopConvertGenericName(name)

  state.itemShopDeals.push({
    className: state.itemShopCategoryName,
    name: name,
    storyCardName: storyCardName,
    price: 0,
    quantity: quantity,
    bought: false
  })
}

var itemShopSeed

function itemShopSelectItems(items, numberOfItems) {
  if (numberOfItems == null) numberOfItems = 1

  itemShopSeed += 100
  if (state.itemShopAll) {
    for (let i = 0; i < items.length; i++) {
      itemShopPushDeal(items, items[i])
    }
    return
  }

  shuffle(items, itemShopSeed)
  for (let i = 0; i < numberOfItems; i++) {
    itemShopPushDeal(items, items[i])
  }
}

function handleItemShop() {
  var character = getCharacter()
  var goldIndex = character.inventory.findIndex(x => x.name.toLowerCase() == "gold")
  var gold = goldIndex == -1 ? 0 : character.inventory[goldIndex].quantity
  var text = " "
  itemShopSeed = state.day

  if (state.itemShopDeals == null || state.itemShopClearDeals) state.itemShopDeals = []

  if (findItemShopDeals(state.itemShopCategoryName).length == 0) switch(state.itemShopCategoryName) {
    case "weapons":
      itemShopSelectItems(weaponsList, 5)
      break
    case "armor":
      itemShopSelectItems(armorList, 5)
      break
    case "tools":
      itemShopSelectItems(toolsList, 5)
      break
    case "gear":
      itemShopSelectItems(gearList, 10)
      break
    case "common":
      itemShopSelectItems(commonList, 5)
      break
    case "uncommon":
      itemShopSelectItems(uncommonList, 5)
      break
    case "rare":
      itemShopSelectItems(rareList, 5)
      break
    case "phenomenal":
      itemShopSelectItems(phenomenalList, 5)
      break
    case "legendary":
      itemShopSelectItems(legendaryList, 200000)
      break
    case "artifact":
      itemShopSelectItems(artifactList, 5)
      break
    case "default":
      let shuffled = [...weaponsList].sort(() => 0.5 - Math.random());
      let list = shuffled.slice(0, 3)
      shuffled = [...armorList].sort(() => 0.5 - Math.random());
      list = list.concat(shuffled.slice(0, 3))
      shuffled = [...toolsList].sort(() => 0.5 - Math.random());
      list = list.concat(shuffled.slice(0, 3))
      shuffled = [...gearList].sort(() => 0.5 - Math.random());
      list = list.concat(shuffled.slice(0, 5))

      let rand = Math.random()
      if (rand <= .50) {
        shuffled = [...commonList].sort(() => 0.5 - Math.random());
        list = list.concat(shuffled.slice(0, 1))
      } else if (rand <= .70) {
        shuffled = [...uncommonList].sort(() => 0.5 - Math.random());
        list = list.concat(shuffled.slice(0, 1))
      } else if (rand <= .86) {
        shuffled = [...rareList].sort(() => 0.5 - Math.random());
        list = list.concat(shuffled.slice(0, 1))
      } else if (rand <= .94) {
        shuffled = [...phenomenalList].sort(() => 0.5 - Math.random());
        list = list.concat(shuffled.slice(0, 1))
      } else if (rand <= .98) {
        shuffled = [...legendaryList].sort(() => 0.5 - Math.random());
        list = list.concat(shuffled.slice(0, 1))
      } else {
        shuffled = [...artifactList].sort(() => 0.5 - Math.random());
        list = list.concat(shuffled.slice(0, 1))
      }
      
      itemShopSelectItems(list, 15)
      break
  }

  switch (state.itemShopStep) {
    case 0:
      text = `**Welcome to the Item Shop**\n-${toTitleCase(state.itemShopCategoryName)}-\nDeals change every day!`
      break
    case 1:
      text = "Item purchased!"
      break
    case 2:
      text = "You do not have enough gold!"
  }

  switch (state.itemShopStep) {
    case 0:
    case 1:
    case 2:
      text += `\nSelect a number from the list below to purchase an item:\n\n`
      let deals = findItemShopDeals(state.itemShopCategoryName, false)
      deals = deals.filter(item => !item.bought)

      if (deals.length == 0) text += "There are no items left for sale!\n"
      for (var i = 0; i < deals.length; i++) {
        let itemStoryCard = findItemCard(deals[i].name, deals[i].storyCardName)
        let description = itemStoryCard == null ? "\nERROR: Story card is missing. You may import the latest story cards from the Hashtag DnD Github: https://github.com/raeleus/Hashtag-DnD/blob/master/story-cards.json\n\n" : `:\n${itemStoryCard.entry}\n\n`
        deals[i].price = itemStoryCard == null ? 0 : parseInt(itemStoryCard.description.split(",")[0])
        if (itemStoryCard != null && itemStoryCard.type == "weapon") {
          deals[i].damage = itemStoryCard.description.split(",")[1]
          deals[i].toHitBonus = itemStoryCard.description.split(",")[2]
          deals[i].ability = itemStoryCard.description.split(",")[3]
        } else if (itemStoryCard != null && itemStoryCard.type == "armor") {
          deals[i].ac = itemStoryCard.description.split(",")[1]
        }
        text += `${i + 1}. ${deals[i].name}${state.itemShopIsFree ? "" : ` for ${numberWithCommas(deals[i].price)} gold`}`
        text += description
      }

      text += `\n${state.itemShopIsFree ? "These items come at no cost!" : `You have ${numberWithCommas(gold)} gold`}\nEnter the number or q to quit:\n`
      break
    case 500:
      text = "Thank you for shopping at the Item Shop!"
      break
  }

  return text
}

function spellShopPushDeal(items, name, price) {
  state.spellShopDeals.push({
    className: state.spellShopClassName,
    level: state.spellShopLevel,
    name: name,
    price: price,
    bought: false
  })
}

var spellShopSeed

function spellShopSelectSpells(spells, price, numberOfSpells) {
  if (numberOfSpells == null) numberOfSpells = 1

  spellShopSeed += 100
  index = Math.floor(getRandom(spellShopSeed) * spells.length)
  if (state.spellShopAll) {
    for (const spell of spells) {
      spellShopPushDeal(spells, spell, price)
    }
    return
  }

  shuffle(spells, spellShopSeed)
  for (let i = 0; i < numberOfSpells; i++) {
    spellShopPushDeal(spells, spells[i], price)
  }
}

function handleSpellShop() {
  var character = getCharacter()
  var goldIndex = character.inventory.findIndex(x => x.name.toLowerCase() == "gold")
  var gold = goldIndex == -1 ? 0 : character.inventory[goldIndex].quantity
  var text = " "
  spellShopSeed = state.day

  if (state.spellShopDeals == null || state.spellShopClearDeals) state.spellShopDeals = []

  // I get the idea. This is meant to simulate the spell restrictions and progression of the base classes.
  // But what if the player is a custom class, or wants to buy spells in general. They are assumed to be a wizard?
  // What if we have custom spells tho?
  // Maybe we can rework this to source spellShop inventory from story cards, that way players can create custom shops, and level lists, and also include custom spells
  // This of course will also require reworking all the spell cards

  if (findSpellShopDeals(state.spellShopClassName, state.spellShopLevel).length == 0) {
    switch(state.spellShopClassName) {
      case "bard":
        switch(state.spellShopLevel) {
          case 9:
            spellShopSelectSpells(["Foresight", "Power Word Heal", "Power Word Kill", "Prismatic Wall", "True Polymorph"], 50000)
            if (state.spellShopAll) break
          case 8:
            spellShopSelectSpells(["Antipathy/Sympathy", "Befuddlement", "Dominate Monster", "Glibness", "Mind Blank", "Power Word Stun"], 25000)
            if (state.spellShopAll) break
          case 7:
            spellShopSelectSpells(["Etherealness", "Forcecage", "Mirage Arcane", "Mordenkainen's Magnificent Mansion", "Mordenkainen's Sword", "Power Word Fortify", "Prismatic Spray", "Project Image", "Regenerate", "Resurrection", "Symbol", "Teleport"], 20000, state.spellShopLevel == 7 ? 2 : 1)
            if (state.spellShopAll) break
          case 6:
            spellShopSelectSpells(["Eyebite", "Find the Path", "Guards and Wards", "Heroes' Feast", "Mass Suggestion", "Otto's Irresistible Dance", "Programmed Illusion", "True Seeing"], 10000, state.spellShopLevel == 6 ? 2 : 1)
            if (state.spellShopAll) break
          case 5:
            spellShopSelectSpells(["Animate Objects", "Awaken", "Dominate Person", "Dream", "Dream", "Geas", "Greater Restoration", "Hold Monster", "Legend Lore", "Mass Cure Wounds", "Mislead", "Modify Memory", "Planar Binding", "Raise Dead", "Rary's Telepathic Bond", "Scrying", "Seeming", "Synaptic Static", "Teleportation Circle", "Yolande's Regal Presence"], 5000, state.spellShopLevel == 5 ? 3 : 1)
            if (state.spellShopAll) break
          case 4:
            spellShopSelectSpells(["Charm Monster", "Compulsion", "Confusion", "Dimension Door", "Fount of Moonlight", "Freedom of Movement", "Greater Invisibility", "Hallucinatory Terrain", "Locate Creature", "Phantasmal Killer", "Polymorph"], 2500, state.spellShopLevel == 4 ? 3 : 1)
            if (state.spellShopAll) break
          case 3:
            spellShopSelectSpells(["Bestow Curse", "Clairvoyance", "Dispel Magic", "Fear", "Feign Death", "Glyph of Warding", "Hypnotic Pattern", "Leomund's Tiny Hut", "Major Image", "Mass Healing Word", "Nondetection", "Plant Growth", "Sending", "Slow", "Speak with Dead", "Speak with Plants", "Stinking Cloud", "Tongues"], 1000, state.spellShopLevel == 3 ? 5 : 1)
            if (state.spellShopAll) break
          case 2:
            spellShopSelectSpells(["Aid", "Animal Messenger", "Blindness/Deafness", "Calm Emotions", "Cloud of Daggers", "Crown of Madness", "Detect Thoughts", "Enhance Ability", "Enlarge/Reduce", "Enthrall", "Heat Metal", "Hold Person", "Invisibility", "Knock", "Lesser Restoration", "Locate Animals or Plants", "Locate Object", "Magic Mouth", "Mirror Image", "Phantasmal Force", "See Invisibility", "Shater", "Silence", "Suggestion", "Zone of Truth"], 500, state.spellShopLevel == 2 ? 5 : 1)
          case 1:
            spellShopSelectSpells(["Animal Friendship", "Bane", "Charm Person", "Color Spray", "Command", "Comprehend Languages", "Cure Wounds", "Detect Magic", "Disguise Self", "Dissonant Whispers", "Faerie Fire", "Feather Fall", "Healing Word", "Heroism", "Identify", "Illusory Script", "Longstrider", "Silent Image", "Sleep", "Speak with Animals", "Tasha's Hideous Laughter", "Thunderwave", "Unseen Servant"], 250, state.spellShopLevel == 1 ? 5 : 1)
          case 0:
            spellShopSelectSpells(["Blade Ward", "Dancing Lights", "Friends", "Light", "Mage Hand", "Mending", "Message", "Minor Illusion", "Prestidigitation", "Starry Wisp", "Thunderclap", "True Strike", "Vicious Mockery"], 50, state.spellShopLevel == 0 ? 3 : 1)
        }
        break
      case "cleric":
        switch(state.spellShopLevel) {
          case 9:
            spellShopSelectSpells(["Astral Projection", "Gate", "Mass Heal", "Power Word Heal", "True Resurrection"], 50000)
            if (state.spellShopAll) break
          case 8:
            spellShopSelectSpells(["Antimagic Field", "Control Weather", "Earthquake", "Holy Aura", "Sunburst"], 25000)
            if (state.spellShopAll) break
          case 7:
            spellShopSelectSpells(["Conjure Celestial", "Divine Word", "Etherealness", "Fire Storm", "Plane Shift", "Power Word Fortify", "Regenerate", "Resurrection", "Symbol"], 20000, state.spellShopLevel == 7 ? 2 : 1)
            if (state.spellShopAll) break
          case 6:
            spellShopSelectSpells(["Blade Barrier", "Create Undead", "Find the Path", "Forbiddance", "Harm", "Heroes' Feast", "Planar Ally", "Sunbeam", "True Seeing", "Word of Recall"], 10000, state.spellShopLevel == 6 ? 2 : 1)
            if (state.spellShopAll) break
          case 5:
            spellShopSelectSpells(["Circle of Power", "Commune", "Contagion", "Dispel Evil and Good", "Flame Strike", "Geas", "Greater Restoration", "Hallow", "Insect Plague", "Legend Lore", "Mass Cure Wounds", "Planar Binding", "Raise Dead", "Scrying", "Summon Celestial"], 5000, state.spellShopLevel == 5 ? 3 : 1)
            if (state.spellShopAll) break
          case 4:
            spellShopSelectSpells(["Aura of Life", "Aura of Purity", "Banishment", "Control Weather", "Death Ward", "Divination", "Freedom of Movement", "Guardian of Faith", "Locate Creature", "Stone Shape"], 2500, state.spellShopLevel == 4 ? 3 : 1)
            if (state.spellShopAll) break
          case 3:
            spellShopSelectSpells(["Animate Dead", "Aura of Vitality", "Beacon of Hope", "Bestow Curse", "Clairvoyance", "Create Food and Water", "Daylight", "Dispel Magic", "Feign Death", "Glyph of Warding", "Magic Circle", "Mass Healing Ward", "Meld into Stone", "Protection from Energy", "Remove Curse", "Revivify", "Sending", "Speak with Dead", "Spirit Guardians", "Tongues", "Water Walk"], 1000, state.spellShopLevel == 3 ? 5 : 1)
            if (state.spellShopAll) break
          case 2:
            spellShopSelectSpells(["Aid", "Augury", "Blindness/Deafness", "Calm Emotions", "Continual Flame", "Enhance Ability", "Find Traps", "Gentle Repose", "Hold Person", "Lesser Restoration", "Locate Object", "Prayer of Healing", "Protection from Poison", "Silence", "Spiritual Weapon", "Warding Bond", "Zone of Truth"], 500, state.spellShopLevel == 2 ? 5 : 1)
            if (state.spellShopAll) break
          case 1:
            spellShopSelectSpells(["Bane", "Bless", "Command", "Create or Destroy Water", "Cure Wounds", "Detect Evil and Good", "Detect Magic", "Detect Poison and Disease", "Guiding Bolt", "Healing Word", "Inflict Wounds", "Protection from Evil and Good", "Purify Food and Drink", "Sanctuary", "Shield of Faith"], 250, state.spellShopLevel == 1 ? 5 : 1)
            if (state.spellShopAll) break
          case 0:
            spellShopSelectSpells(["Guidance", "Light", "Mending", "Resistance", "Sacred Flame", "Spare the Dying", "Thaumaturgy", "Toll the Dead", "Word of Radiance"], 50, state.spellShopLevel == 0 ? 3 : 1)
            break
        }
        break
      case "druid":
        switch(state.spellShopLevel) {
          case 9:
            spellShopSelectSpells(["Foresight", "Shapechange", "Storm of Vengeance", "True Resurrection"], 50000)
            if (state.spellShopAll) break
          case 8:
            spellShopSelectSpells(["Animal Shapes", "Antipathy/Sympathy", "Befuddlement", "Control Weather", "Earthquake", "Incendiary Cloud", "Sunburst", "Tsunami"], 25000)
            if (state.spellShopAll) break
          case 7:
            spellShopSelectSpells(["Fire Storm", "Mirage Arcane", "Plane Shift", "Regenerate", "Reverse Gravity", "Symbol"], 20000, state.spellShopLevel == 7 ? 2 : 1)
            if (state.spellShopAll) break
          case 6:
            spellShopSelectSpells(["Conjure Fey", "Find the Path", "Flesh to Stone", "Heal", "Heroes' Feast", "Move Earth", "Sunbeam", "Transport via Plants", "Wall of Thorns", "Wind Walk"], 10000, state.spellShopLevel == 6 ? 2 : 1)
            if (state.spellShopAll) break
          case 5:
            spellShopSelectSpells(["Antilife Shell", "Awaken", "Commune with Nature", "Cone of Cold", "Conjure Elemental", "Contagion", "Geas", "Greater Restoration", "Insect Plague", "Mass Cure Wounds", "Planar Binding", "Reincarnate", "Scrying", "Tree Stride", "Wall of Stone"], 5000, state.spellShopLevel == 5 ? 3 : 1)
            if (state.spellShopAll) break
          case 4:
            spellShopSelectSpells(["Blight", "Charm Monster", "Confusion", "Conjure Woodland Beings", "Control Water", "Divination", "Dominate Beast", "Fire Shield", "Fount of Moonlight", "Freedom of Movement", "Giant Insect", "Grasping Vine", "Hallucinatory Terrain", "Ice Storm", "Locate Creature", "Polymorph", "Stone Shape", "Stoneskin", "Summon Elemental", "Wall of Fire"], 2500, state.spellShopLevel == 4 ? 3 : 1)
            if (state.spellShopAll) break
          case 3:
            spellShopSelectSpells(["Aura of Vitality", "Call Lightning", "Conjure Animals", "Daylight", "Dispel Magic", "Elemental Weapon", "Feign Death", "Meld into Stone", "Plant Growth", "Protection from Energy", "Revivify", "Sleet Storm", "Speak with Plants", "Summon Fey", "Water Breathing", "Water Walk", "Wind Wall"], 1000, state.spellShopLevel == 3 ? 5 : 1)
            if (state.spellShopAll) break
          case 2:
            spellShopSelectSpells(["Aid", "Animal Messenger", "Augury", "Barkskin", "Beast Sense", "Continual Flame", "Darkvision", "Enhance Ability", "Enlarge/Reduce", "Find Traps", "Flame Blade", "Flaming Sphere", "Gust of Wind", "Heat Metal", "Hold Person", "Lesser Restoration", "Locate Animals or Plants", "Locate Object", "Moonbeam", "Pass without Trace", "Protection from Poison", "Spike Growth", "Summon Beast"], 500, state.spellShopLevel == 2 ? 5 : 1)
            if (state.spellShopAll) break
          case 1:
            spellShopSelectSpells(["Animal Friendship", "Charm Person", "Create or Destroy Water", "Cure Wounds", "Detect Magic", "Detect Poison and Disease", "Entangle", "Faerie Fire", "Fog Cloud", "Goodberry", "Healing Word", "Ice Knife", "Jump", "Longstrider", "Protection from Evil and Good", "Purify Food and Drink", "Speak with Animals", "Thunderwave"], 250, state.spellShopLevel == 1 ? 5 : 1)
            if (state.spellShopAll) break
          case 0:
            spellShopSelectSpells(["Druidcraft", "Elementalism", "Guidance", "Mending", "Message", "Poison Spray", "Produce Flame", "Resistance", "Shillelagh", "Spare the Dying", "Starry Wisp", "Thorn Whip", "Thunderclap"], 50, state.spellShopLevel == 0 ? 3 : 1)
            if (state.spellShopAll) break
            break
        }
        break
      case "paladin":
        switch(state.spellShopLevel) {
          case 5:
            spellShopSelectSpells(["Banishing Smite", "Circle of Power", "Destructive Wave", "Dispel Evil and Good", "Geas", "Greater Restoration", "Raise Dead", "Summon Celestial"], 5000, state.spellShopLevel == 5 ? 3 : 1)
            if (state.spellShopAll) break
          case 4:
            spellShopSelectSpells(["Aura of Life", "Aura of Purity", "Banishment", "Death Ward", "Locate Creature", "Staggering Smite"], 2500, state.spellShopLevel == 4 ? 3 : 1)
            if (state.spellShopAll) break
          case 3:
            spellShopSelectSpells(["Aura of Vitality", "Blinding Smite", "Create Food and Water", "Crusader's Mantle", "Daylight", "Dispel Magic", "Elemental Weapon", "Magic Circle", "Remove Curse", "Revivify"], 1000, state.spellShopLevel == 3 ? 5 : 1)
            if (state.spellShopAll) break
          case 2:
            spellShopSelectSpells(["Aid", "Find Steed", "Gentle Repose", "Lesser Restoration", "Locate Object", "Magic Weapon", "Prayer of Healing", "Protection from Poison", "Shining Smite", "Warding Bond", "Zone of Truth"], 500, state.spellShopLevel == 2 ? 5 : 1)
            if (state.spellShopAll) break
          case 1:
            spellShopSelectSpells(["Bless", "Command", "Compelled Duel", "Cure Wounds", "Detect Evil and Good", "Detect Magic", "Detect Poison and Disease", "Divine Favor", "Divine Smite", "Heroism", "Protection from Evil and Good", "Purify Food and Drink", "Searing Smite", "Shield of Faith", "Thunderous Smite", "Wrathful Smite"], 250, state.spellShopLevel == 1 ? 5 : 1)
            if (state.spellShopAll) break
            break
        }
        break
      case "ranger":
        switch(state.spellShopLevel) {
          case 5:
            spellShopSelectSpells(["Commune with Nature", "Conjure Volley", "Greater Restoration", "Steel Wind Strike", "Swift Quiver", "Tree Stride"], 5000, state.spellShopLevel == 5 ? 3 : 1)
            if (state.spellShopAll) break
          case 4:
            spellShopSelectSpells(["Conjure Woodland Beings", "Dominate Beast", "Freedom of Movement", "Grasping Vine", "Locate Creature", "Stoneskin", "Summon Elemental"], 2500, state.spellShopLevel == 4 ? 3 : 1)
            if (state.spellShopAll) break
          case 3:
            spellShopSelectSpells(["Conjure Animals", "Conjure Barrage", "Daylight", "Dispel Magic", "Elemental Weapon", "Lightning Arrow", "Meld into Stone", "Nondetection", "Plant Growth", "Protection from Energy", "Revivify", "Speak with Plants", "Summon Fey", "Water Breathing", "Water Walk", "Wind Wall"], 1000, state.spellShopLevel == 3 ? 5 : 1)
            if (state.spellShopAll) break
          case 2:
            spellShopSelectSpells(["Aid", "Animal Messenger", "Barkskin", "Beast Sense", "Cordon of Arrows", "Darkvision", "Enhance Ability", "Find Traps", "Gust of Wind", "Lesser Restoration", "Locate Animals or Plants", "Locate Object", "Magic Weapon", "Pass without Trace", "Protection from Poison", "Silence", "Spike Growth", "Summon Beast"], 500, state.spellShopLevel == 2 ? 5 : 1)
            if (state.spellShopAll) break
          case 1:
            spellShopSelectSpells(["Alarm", "Animal Friendship", "Cure Wounds", "Detect Magic", "Detect Poison and Disease", "Ensnaring Strike", "Entangle", "Fog Cloud", "Goodberry", "Hail of Thorns", "Hunter's Mark", "Jump", "Longstrider", "Speak with Animals"], 250, state.spellShopLevel == 1 ? 5 : 1)
            if (state.spellShopAll) break
            break
        }
        break
      case "sorcerer":
        switch(state.spellShopLevel) {
          case 9:
            spellShopSelectSpells(["Gate", "Meteor Swarm", "Power Word Kill", "Time Stop", "Wish"], 50000)
            if (state.spellShopAll) break
          case 8:
            spellShopSelectSpells(["Demiplane", "Dominate Monster", "Earthquake", "Incendiary Cloud", "Power Word Stun", "Sunburst"], 25000)
            if (state.spellShopAll) break
          case 7:
            spellShopSelectSpells(["Delayed Blast Fireball", "Etherealness", "Finger of Death", "Fire Storm", "Plane Shift", "Prismatic Spray", "Reverse Gravity", "Teleport"], 20000, state.spellShopLevel == 7 ? 2 : 1)
            if (state.spellShopAll) break
          case 6:
            spellShopSelectSpells(["Arcane Gate", "Chain Lightning", "Circle of Death", "Disintegrate", "Eyebite", "Flesh to Stone", "Globe of Invulnerability", "Mass Suggestion", "Move Earth", "Otiluke's Freezing Sphere", "Sunbeam", "True Seeing"], 10000, state.spellShopLevel == 6 ? 2 : 1)
            if (state.spellShopAll) break
          case 5:
            spellShopSelectSpells(["Animate Objects", "Bigby's Hand", "Cloudkill", "Cone of Cold", "Creation", "Dominate Person", "Hold Monster", "Insect Plague", "Seeming", "Synaptic Static", "Telekinesis", "Teleportation Circle", "Wall of Stone"], 5000, state.spellShopLevel == 5 ? 3 : 1)
            if (state.spellShopAll) break
          case 4:
            spellShopSelectSpells(["Banishment", "Blight", "Charm Monster", "Confusion", "Dimension Door", "Dominate Beast", "Fire Shield", "Greater Invisibility", "Ice Storm", "Polymorph", "Stoneskin", "Vitriolic Sphere", "Wall of Fire"], 2500, state.spellShopLevel == 4 ? 3 : 1)
            if (state.spellShopAll) break
          case 3:
            spellShopSelectSpells(["Blink", "Clairvoyance", "Counterspell", "Daylight", "Dispel Magic", "Fear", "Fireball", "Fly", "Gaseous Form", "Haste", "Hypnotic Pattern", "Lightning Bolt", "Major Image", "Protection from Energy", "Sleet Storm", "Slow", "Stinking Cloud", "Tongues", "Vampiric Touch", "Water Breathing", "Water Walk"], 1000, state.spellShopLevel == 3 ? 5 : 1)
            if (state.spellShopAll) break
          case 2:
            spellShopSelectSpells(["Alter Self", "Arcane Vigor", "Blindness/Deafness", "Blur", "Cloud of Daggers", "Crown of Madness", "Darkness", "Darkvision", "Detect Thoughts", "Dragon's Breath", "Enhance Ability", "Enlarge/Reduce", "Flame Blade", "Flaming Sphere", "Gust of Wind", "Hold Person", "Invisibility", "Knock", "Levitate", "Magic Weapon", "Mind Spike", "Mirror Image", "Misty Step", "Phantasmal Force", "Scorching Ray", "See Invisibility", "Shatter", "Spider Climb", "Suggestion", "Web"], 500, state.spellShopLevel == 2 ? 5 : 1)
            if (state.spellShopAll) break
          case 1:
            spellShopSelectSpells(["Burning Hands", "Charm Person", "Chromatic Orb", "Color Spray", "Comprehend Languages", "Detect Magic", "Disguise Self", "Expeditious Retreat", "False Life", "Feather Fall", "Fog Cloud", "Grease", "Ice Knife", "Jump", "Mage Armor", "Magic Missile", "Ray of Sickness", "Shield", "Silent Image", "Sleep", "Thunderwave", "Witch Bolt"], 250, state.spellShopLevel == 1 ? 5 : 1)
            if (state.spellShopAll) break
          case 0:
            spellShopSelectSpells(["Acid Splash", "Blade Ward", "Chill Touch", "Dancing Lights", "Elementalism", "Fire Bolt", "Friends", "Light", "Mage Hand", "Mending", "Message", "Minor Illusion", "Poison Spray", "Prestidigitation", "Ray of Frost", "Shocking Grasp", "Sorcerous Burst", "Thunderclap", "True Strike"], 50, state.spellShopLevel == 0 ? 3 : 1)
            if (state.spellShopAll) break
            break
        }
        break
      case "warlock":
        switch(state.spellShopLevel) {
          case 9:
            spellShopSelectSpells(["Astral Projection", "Dominate Person", "Foresight", "Gate", "Geas", "Greater Restoration", "Imprisonment", "Insect Plague", "Modify Memory", "Power Word Kill", "Seeming", "Summon Celestial", "Telekinesis", "True Polymorph", "Weird"], 50000)
          case 8:
            spellShopSelectSpells(["Befuddlement", "Demiplane", "Dominate Monster", "Glibness", "Power Word Stun"], 25000)
            if (state.spellShopAll) break
          case 7:
            spellShopSelectSpells(["Dominate Beast", "Etherealness", "Finger of Death", "Fire Shield", "Forcecage", "Greater Invisibility", "Guardian of Faith", "Plane Shift", "Wall of Fire"], 20000, state.spellShopLevel == 7 ? 2 : 1)
            if (state.spellShopAll) break
          case 6:
            spellShopSelectSpells(["Arcane Gate", "Circle of Death", "Create Undead", "Eyebite", "Summon Fiend", "Tasha's Bubbling Cauldron", "True Seeing"], 10000, state.spellShopLevel == 6 ? 2 : 1)
            if (state.spellShopAll) break
          case 5:
            spellShopSelectSpells(["Blink", "Clairvoyance", "Confusion", "Contact Other Plane", "Daylight", "Dream", "Fireball", "Hold Monster", "Hunger of Hadar", "Jallarzi's Storm of Radiance", "Mislead", "Planar Binding", "Plant Growth", "Revivify", "Scrying", "Stinking Cloud", "Summon Aberration", "Synaptic Static", "Teleportation Circle"], 5000, state.spellShopLevel == 5 ? 3 : 1)
            if (state.spellShopAll) break
          case 4:
            spellShopSelectSpells(["Banishment", "Blight", "Charm Monster", "Dimension Door", "Hallucinatory Terrain", "Summon Aberration"], 2500, state.spellShopLevel == 4 ? 3 : 1)
            if (state.spellShopAll) break
          case 3:
            spellShopSelectSpells(["Counterspell", "Dispel Magic", "Fear", "Fly", "Gaseous Form", "Hunger of Hadar", "Hypnotic Pattern", "Magic Circle", "Major Image", "Remove Curse", "Summon Fey", "Summon Undead", "Tongues", "Vampiric Touch"], 1000, state.spellShopLevel == 3 ? 5 : 1)
            if (state.spellShopAll) break
          case 2:
            spellShopSelectSpells(["Cloud of Daggers", "Crown of Madness", "Darkness", "Enthrall", "Hold Person", "Invisibility", "Mind Spike", "Mirror Image", "Misty Step", "Ray of Enfeeblement", "Spider Climb", "Suggestion"], 500, state.spellShopLevel == 2 ? 5 : 1)
            if (state.spellShopAll) break
          case 1:
            spellShopSelectSpells(["Armor of Agathys", "Arms of Hadar", "Bane", "Charm Person", "Comprehend Languages", "Detect Magic", "Expeditious Retreat", "Hellish Rebuke", "Hex", "Illusory Script", "Protection from Evil and Good", "Speak with Animals", "Tasha's Hideous Laughter", "Unseen Servant", "Witch Bolt"], 250, state.spellShopLevel == 1 ? 5 : 1)
            if (state.spellShopAll) break
          case 0:
            spellShopSelectSpells(["Blade Ward", "Chill Touch", "Eldritch Blast", "Friends", "Mage Hand", "Mind Sliver", "Minor Illusion", "Poison Spray"], 50, state.spellShopLevel == 0 ? 3 : 1)
            if (state.spellShopAll) break
            break
        }
        break
      case "wizard":
        switch(state.spellShopLevel) {
          case 9:
            spellShopSelectSpells(["Astral Projection", "Foresight", "Gate", "Imprisonment", "Meteor Swarm", "Power Word Kill", "Prismatic Wall", "Shapechange", "Time Stop", "True Polymorph", "Weird", "Wish"], 50000)
            if (state.spellShopAll) break
          case 8:
            spellShopSelectSpells(["Antimagic Field", "Antipathy/Sympathy", "Befuddlement", "Clone", "Control Weather", "Demiplane", "Dominate Monster", "Incendiary Cloud", "Maze", "Mind Blank", "Power Word Stun", "Sunburst", "Telepathy"], 25000)
            if (state.spellShopAll) break
          case 7:
            spellShopSelectSpells(["Delayed Blast Fireball", "Etherealness", "Finger of Death", "Forcecage", "Mirage Arcane", "Mordenkainen's Magnificent Mansion", "Mordenkainen's Sword", "Plane Shift", "Prismatic Spray", "Project Image", "Reverse Gravity", "Sequester", "Simulacrum", "Symbol", "Teleport"], 20000, state.spellShopLevel == 7 ? 2 : 1)
            if (state.spellShopAll) break
          case 6:
            spellShopSelectSpells(["Arcane Gate", "Chain Lightning", "Circle of Death", "Contingency", "Create Undead", "Disintegrate", "Drawmij's Instant Summons", "Eyebite", "Flesh to Stone", "Globe of Invulnerability", "Guards and Wards", "Magic Jar", "Mass Suggestion", "Move Earth", "Otiluke's Freezing Sphere", "Otto's Irresistible Dance", "Programmed Illusion", "Summon Fiend", "Sunbeam", "Tasha's Bubbling Cauldron", "True Seeing", "Wall of Ice"], 10000, state.spellShopLevel == 6 ? 2 : 1)
            if (state.spellShopAll) break
          case 5:
            spellShopSelectSpells(["Animate Objects", "Bigby's Hand", "Circle of Power", "Cloudkill", "Cone of Cold", "Conjure Elemental", "Contact Other Plane", "Creation", "Dominate Person", "Dream", "Geas", "Hold Monster", "Jallarzi's Storm of Radiance", "Legend Lore", "Mislead", "Modify Memory", "Passwall", "Planar Binding", "Rary's Telepathic Bond", "Scrying", "Seeming", "Steel Wind Strike", "Summon Dragon", "Synaptic Static", "Telekinesis", "Teleportation Circle", "Wall of Force", "Wall of Stone", "Yolande's Regal Presence"], 5000, state.spellShopLevel == 5 ? 3 : 1)
            if (state.spellShopAll) break
          case 4:
            spellShopSelectSpells(["Arcane Eye", "Banishment", "Blight", "Charm Monster", "Confusion", "Conjure Minor Elementals", "Control Water", "Dimension Door", "Divination", "Evard's Black Tentacles", "Fabricate", "Fire Shield", "Greater Invisibility", "Hallucinatory Terrain", "Ice Storm", "Leomund's Secret Chest", "Locate Creature", "Mordenkainen's Faithful Hound", "Mordenkainen's Private Sanctum", "Otiluke's Resilient Sphere", "Phantasmal Killer", "Polymorph", "Stoneskin", "Summon Aberration", "Summon Construct", "Summon Elemental", "Vitriolic Sphere", "Wall of Fire"], 2500, state.spellShopLevel == 4 ? 3 : 1)
            if (state.spellShopAll) break
          case 3:
            spellShopSelectSpells(["Animate Dead", "Bestow Curse", "Blink", "Clairvoyance", "Counterspell", "Dispel Magic", "Fear", "Feign Death", "Fireball", "Fly", "Gaseous Form", "Glyph of Warding", "Haste", "Hypnotic Pattern", "Leomund's Tiny Hut", "Lightning Bolt", "Magic Circle", "Major Image", "Nondetection", "Phantom Steed", "Protection from Energy", "Remove Curse", "Sending", "Sleet Storm", "Slow", "Speak with Dead", "Stinking Cloud", "Summon Fey", "Summon Undead", "Tongues", "Vampiric Touch", "Water Breathing"], 1000, state.spellShopLevel == 3 ? 5 : 1)
            if (state.spellShopAll) break
          case 2:
            spellShopSelectSpells(["Alter Self", "Arcane Lock", "Arcane Vigor", "Augury", "Blindness/Deafness", "Blur", "Cloud of Daggers", "Continual Flame", "Crown of Madness", "Darkness", "Darkvision", "Detect Thoughts", "Dragon's Breath", "Enhance Ability", "Enlarge/Reduce", "Flaming Sphere", "Gentle Repose", "Gust of Wind", "Hold Person", "Invisibility", "Knock", "Levitate", "Locate Object", "Magic Mouth", "Magic Weapon", "Melf's Acid Arrow", "Mind Spike", "Mirror Image", "Misty Step", "Nystul's Magic Aura", "Phantasmal Force", "Ray of Enfeeblement", "Rope Trick", "Scorching Ray", "See Invisibility", "Shatter", "Spider Climb", "Suggestion", "Web"], 500, state.spellShopLevel == 2 ? 5 : 1)
            if (state.spellShopAll) break
          case 1:
            spellShopSelectSpells(["Alarm", "Burning Hands", "Charm Person", "Chromatic Orb", "Color Spray", "Comprehend Languages", "Detect Magic", "Disguise Self", "Expeditious Retreat", "False Life", "Feather Fall", "Find Familiar", "Fog Cloud", "Grease", "Ice Knife","Identify", "Illusory Script", "Jump", "Longstrider", "Mage Armor", "Magic Missile", "Protection from Evil and Good", "Ray of Sickness", "Shield", "Silent Image", "Sleep", "Tasha's Hideous Laughter", "Tenser's Floating Disk", "Thunderwave", "Unseen Servant", "Witch Bolt"], 250, state.spellShopLevel == 1 ? 5 : 1)
            if (state.spellShopAll) break
          case 0:
            spellShopSelectSpells(["Acid Splash", "Blade Ward", "Chill Touch", "Dancing Lights", "Elementalism", "Fire Bolt", "Friends", "Light", "Mage Hand", "Mending", "Message", "Mind Sliver", "Minor Illusion", "Poison Spray", "Prestidigitation", "Ray of Frost", "Shocking Grasp", "Thunderclap", "Toll the Dead", "True Strike"], 50, state.spellShopLevel == 0 ? 3 : 1)
            if (state.spellShopAll) break
            break
        }
        break
    }
  }

  switch (state.spellShopStep) {
    case 0:
      text = `**Welcome to the Spell Shop**\nDeals change every day!`
      break
    case 1:
      text = "Spell purchased!"
      break
    case 2:
      text = "You do not have enough gold!"
    case 3:
      text = "You already know that spell!"
  }

  switch (state.spellShopStep) {
    case 0:
    case 1:
    case 2:
    case 3:
      text += `\nSelect a number from the list below to purchase a spell:\n\n`
      let deals = findSpellShopDeals(state.spellShopClassName, state.spellShopLevel, false)
      if (deals.length == 0) text += "There are no spells left for sale!\n"
      for (var i = 0; i < deals.length; i++) {
        let spellStoryCard = findSpellCard(deals[i].name)
        let description = spellStoryCard == null ? "\nERROR: Story card is missing. You may import the latest story cards from the Hashtag DnD Github: https://github.com/raeleus/Hashtag-DnD/blob/master/story-cards.json\n\n" : `:\n${spellStoryCard.entry}\n\n`
        let found = character.spells.find((element) => element == deals[i].name) != undefined
        text += `${i + 1}. ${deals[i].name}${state.spellShopIsFree ? "" : ` for ${numberWithCommas(deals[i].price)} gold`}`
        if (found) text += " (Already Known)"
        text += description
      }

      text += `\n${state.spellShopIsFree ? "These spells come at no cost!" : `You have ${numberWithCommas(gold)} gold`}\nEnter the number or q to quit:\n`
      break
    case 500:
      text = "Thank you for shopping at the Spell Shop!"
      break
  }

  return text
}

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

#attack (ranged) (advantage|disadvantage) (ac or effortless|easy|medium|hard|impossible) target
-- Attacks the specified target with a melee (the default) or ranged attack. The roll is compared against the specified AC which will determine if the attack succeeds or misses. If the AC is not specified, the default AC or the AC of the opponent in combat will be used. The parameters can be listed in any order, except the target must be listed last. The target can include the name of the enemy or the word "enemy" and the number of the enemy as listed in #enemies. The target can also include a damage amount. If the damage is not specified, the character's default damage is used. Quotes are not necessary.
-- Example: Astri #attack advantage The Evil Knight for 2d12+2 damage

#cast (advantage|disadvantage) (difficulty_class or effortless|easy|medium|hard|impossible) spell(target)
-- Character will cast the indicated spell if the spell is in their spellbook. It will be a targeted spell if a target is indicated. The roll is modified by the spell casting ability of the character. You may type a phrase without quotes for spell such as "cast fire bolt at the giant chicken". If the difficulty is not specified, the default difficulty or the AC of the opponent in combat will be used. The parameters can be listed in any order, except the target must be listed last. The target can include the name of the enemy or the word "enemy" and the number of the enemy as listed in #enemies. The target can also include a damage amount. If the damage is not specified, the character's default damage is used. Quotes are not necessary.
-- Example: Astri #attack advantage The Evil Knight for 2d12+2 damage

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

#takeweapon damage_dice hit_bonus ability weapon_name
-- Allows a character to manually add a weapon to their inventory that is compatible with the #equip command. It is highly recommended to use #itemstore instead. damage_dice is the dice roll (e.g. 1d12+2) used to calculate the damage of the weapon. hit_bonus is a positive or negative number that modifies how accurate the weapon is. Ability is the base ability that is used in conjunction with the weapon. Typically, melee weapons use strength and ranged weapons use dexterity.

#takearmor ac weapon_name
-- Allows a character to manually add armor to their inventory that is compatible with the #equip command. It is highly recommended to use #itemstore instead. ac is the armor class or how hard the character is to hit. If you have an item that adds to the current armor class, precede the number with a plus sign (e.g. +2).

#equip weapon_or_armor_name
-- Equips a weapon or armor and automatically changes the character's damage/weapon proficiency or armor class respectively. weapon_or_armor_name must be a weapon or type of armor purchased through #itemshop or added to the character inventory through #takeweapon or #takearmor. Shields should be equipped after equipping armor because shield AC is added to the total.

#buy (buy_quantity) buy_item (sell_quantity) sell_item
-- Adds the specified buy_quantity of the buy_item to the character's inventory and also removes the sell_quantity of sell_item. If quantities are omitted, they are assumed to be 1. Quotes are necessary for items with spaces in the name. The words for, with, the, a, and an are ignored.

#sell (sell_quantity) sell_item (buy_quantity) buy_item
-- Just like #buy, but with the parameters reversed. Adds the specified buy_quantity of the buy_item to the character's inventory and also removes the sell_quantity of sell_item. If quantities are omitted, they are assumed to be 1. The words for, with, the, a, and an are ignored. Quotes are necessary for items with spaces in the name.

#drop (quantity or all|every) item
-- Removes the specified quantity of item from the character's inventory. If a quantity is omitted, it's assumed to be 1. The words the, a, and an are ignored. Quotes are not necessary.

#give other_character (quantity or all|every) item
-- Removes the quantity of item from the character's inventory and adds it to the other_character's inventory. If a quantity is omitted, it's assumed to be 1. The words the, a, and an are ignored. Quotes are not necessary for the item.

#itemshop (default|weapons|armor|tools|gear|common|uncommon|rare|very rare|legendary|artifact) (free) (all)
-- This opens the items shop where characters can spend gold to purchase new equipment. default is a general store with a variety of items and a small chance for magically enhanced loot. The selection is randomized based on the day. Include the argument "free" to not require gold to purchase the item. Include the argument "all" to list all available items. Otherwise, the list is randomized and a small selection of the item list is presented.

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
#spellshop (bard|cleric|druid|paladin|ranger|sorcerer|warlock|wizard) (level) (free) (all)
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

// Don't modify this part
modifier(text)