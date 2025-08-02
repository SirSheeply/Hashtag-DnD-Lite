const weaponsList = ["Club", "Dagger", "Greatclub", "Handaxe", "Javelin", "Light Hammer", "Mace", "Quarterstaff", "Sickle", "Spear", "Dart", "Light Crossbow", "Shortbow", "Sling", "Battleaxe", "Flail", "Glaive", "Greataxe", "Greatsword", "Halberd", "Lance", "Longsword", "Maul", "Morningstar", "Pike", "Rapier", "Scimitar", "Shortsword", "Trident", "Warhammer", "Warhammer", "War Pick", "Whip", "Blowgun", "Hand Crossbow", "Heavy Crossbow", "Longbow", "Musket", "Pistol"]
const armorList = ["Padded Armor", "Leather Armor", "Studded Leather Armor", "Hide Armor", "Chain Shirt", "Scale Mail", "Breastplate", "Half Plate Armor", "Ring Mail", "Chain Mail", "Splint Armor", "Plate Armor", "Shield"]
const toolsList = ["Alchemist's Supplies", "Brewer's Supplies", "Calligrapher's Supplies", "Carpenter's Tools", "Cartographer's Tools", "Cobbler's Tools", "Cook's Utensils", "Glassblower's Tools", "Jeweler's Tools", "Leatherworker's Tools", "Mason's Tools", "Painter's Supplies", "Potter's Tools", "Smith's Tools", "Tinker's Tools", "Weaver's Tools", "Woodcarver's Tools", "Disguise Kit", "Forgery Kit", "Gaming Set", "Herbalism Kit", "Musical Instrument", "Navigator's Tools", "Poisoner's Kit", "Thieves' Tools"]
const gearList = ["Acid", "Alchemist's Fire", "Ammunition", "Antitoxin", "Arcane Focus", "Backpack", "Ball Bearings", "Barrel", "Basket", "Bedroll", "Bell", "Blanket", "Block and Tackle", "Book", "Glass Bottle", "Bucket", "Burglar's Pack", "Caltrops", "Candle", "Crossbow Bolt Case", "Map Case", "Scroll Case", "Chain", "Chest", "Climber's Kit", "Fine Clothes", "Traveler's Clothes", "Component Pouch", "Costume", "Crowbar", "Diplomat's Pack", "Druidic Focus", "Dungeoneer's Pack", "Entertainer's Pack", "Explorer's Pack", "Flask", "Grappling Hook", "Healer's Kit", "Holy Symbol", "Holy Water", "Hunting Trap", "Ink", "Ink Pen", "Jug", "Ladder", "Lamp", "Bullseye Lantern", "Hooded Lantern", "Lock", "Magnifying Glass", "Manacles", "Map", "Mirror", "Net", "Oil", "Paper", "Parchment", "Perfume", "Basic Poison", "Pole", "Iron Pot", "Potion of Healing", "Pouch", "Priest's Pack", "Quiver", "Portable Ram", "Rations", "Robe", "Rope", "Sack", "Scholar's Pack", "Shovel", "Signal Whistle", "Spell Scroll", "Iron Spikes", "Spyglass", "String", "Tent", "Tinderbox", "Torch", "Vial", "Waterskin"]
const commonList = ["Armor of Gleaming", "Bead of Nourishment", "Bead of Refreshment", "Boots of False Tracks", "Candle of the Deep", "Cast-Off Armor", "Charlatan's Die", "Cloak of Billowing", "Cloak of Many Fashions", "Clockwork Amulet", "Clothes of Mending", "Dark Shard Amulet", "Dread Helm", "Ear Horn of Hearing", "Enduring Spellbook", "Ersatz Eye", "Hat of Vermin", "Hat of Wizardry", "Heward's Handy Spice Pouch", "Horn of Silent Alarm", "Instrument of Illusions", "Instrument of Scribing", "Lock of Trickery", "Moon-Touched Sword", "Mystery Key", "Orb of Direction", "Orb of Time", "Perfume of Bewitching", "Pipe of Smoke Monsters", "Pole of Angling", "Pole of Collapsing", "Potion of Climbing", "Potion of Comprehension", "Pot of Awakening", "Prosthetic Limb", "Rival Coin", "Rope of Mending", "Ruby of the War Mage", "Shield of Expression", "Silvered Weapon", "Smoldering Armor", "Staff of Adornment", "Staff of Birdcalls", "Staff of Flowers", "Talking Doll", "Tankard of Sobriety", "Veteran's Cane", "Walloping Ammunition", "Wand of Conducting", "Wand of Pyrotechnics"]
const uncommonList = ["Adamantine Armor", "Adamantine Weapon", "Alchemy Jug", "Ammunition +1", "Amulet of Proof against Detection and Location", "Baba Yaga's Dancing Broom", "Bag of Holding", "Bag of Tricks", "Boots of Elvenkind", "Boots of Striding and Springing", "Boots of the Winterlands", "Bracers of Archery", "Brooch of Shielding", "Broom of Flying", "Cap of Water Breathing", "Circlet of Blasting", "Cloak of Elvenkind", "Cloak of Protection", "Cloak of the Manta Ray", "Decanter of Endless Water", "Deck of Illusions", "Driftglobe", "Dust of Disappearance", "Dust of Dryness", "Dust of Sneezing and Choking", "Elemntal Gem", "Enspelled Armor Uncommon", "Uncommon Enspelled Staff", "Enspelled Weapon Uncommon", "Eversmoking Bottle", "Eyes of Charming", "Eyes of Minute Seeing", "Eyes of the Eagle", "Silver Raven Figurine of Wondrous Power", "Gauntlets of Ogre Power", "Gem of Brightness", "Gloves of Missile Snaring", "Gloves of Swimming and Climbing", "Gloves of Thievery", "Goggles of Night", "Hag Eye", "Hat of Disguise", "Headband of Intellect", "Helm of Comprehending Languages", "Helm of Telepathy", "Immovable Rod", "Doss Lute", "Fochlucan Bandore", "Mac-Fuirmidh Cittern", "Javelin of Lightning", "Keoghtom's Ointment", "Lantern of Revealing", "Mariner's Armor", "Medallion of Thoughts", "Nature's Mantle", "Necklace of Adaptation", "Oil of Slipperiness", "Pearl of Power", "Periapt of Health", "Periapt of Wound Closure", "Philter of Love", "Pipes of Haunting", "Pipes of the Sewers", "Potion of Animal Friendship", "Potion of Fire Breath", "Potion of Hill Giant Strength", "Potion of Growth", "Potion of Poison", "Potion of Puglism", "Potion of Resistance", "Potion of Water Breathing", "Quaal's Feather Token Uncommon", "Quiver of Ehlonna", "Ring of Jumping", "Ring of Mind Shielding", "Ring of Swimming", "Ring of Warmth", "Ring of Water Walking", "Robe of Useful Items", "Rod of the Pact Keeper +1", "Rope of Climbing", "Saddle of the Cavalier", "Sending Stones", "Sentinel Shield", "Shield +1", "Slippers of Spider Climbining", "Staff of the Adder", "Staff of the Python", "Stone of Good Luck", "Sword of Vengeance", "Trident of Fish Command", "Wand of Magic Detection", "Wand of Magic Missiles", "Wand of Secrets", "Wand of the War Mage +1", "Wand of Web", "Weapon +1", "Weapon of Warning", "Wind Fan", "Winged Boots", "Wraps of Unarmed Power +1"]
const rareList = ["Ammunition +2", "Amulet of Health", "Armor +1", "Armor of Resistance", "Armor of Vulnerability", "Arrow-Catching Shield", "Bag of Beans", "Belt of Dwarvenkind", "Belt of Hill Giant Strength", "Berserker Axe", "Boots of Levitation", "Boots of Speed", "Bowl of Commanding Water Elementals", "Bracers of Defense", "Brazier of Commanding Fire Elementals", "Cape of the Mountebank", "Censer of Controlling Air Elementals", "Chime of Opening", "Cloak of Displacement", "Cloak of the Bat", "Cube of Force", "Cube of Summoning", "Daern's Instant Fortress", "Dagger of Venom", "Dimensional Shackles", "Dragon Slayer", "Elixir of Health", "Elven Chain", "Enspelled Armor Rare", "Rare Enspelled Staff", "Enspelled Weapon Rare", "Figurine of Wondrous Power Rare", "Flame Tongue", "Folding Boat", "Gem of Seeing", "Giant Slayer", "Glamoured Studded Leather", "Helm of Teleportation", "Heward's Handy Haversack", "Horn of Blasting", "Silver Horn of Valhalla", "Brass Horn of Valhalla", "Horseshoes of Speed", "Canaith Mandolin", "Cli Lyre", "Ioun Stone Rare", "Iron Bands of Bilarro", "Mace of Disruption", "Mace of Smiting", "Mace of Terror", "Mantle of Spell Resistance", "Necklace of Fireballs", "Necklace of Prayer Beads", "Oil of Etherealness", "Periapt of Proof against Poison", "Portable Hole", "Potion of Clairvoyance", "Potion of Diminution", "Potion of Gaseous Form", "Potion of Frost Giant Strength", "Potion of Stone Giant Strength", "Potion of Fire Giant Strength", "Potion of Heroism", "Potion of Invisibility", "Potion of Invulnerability", "Potion of Mind Reading", "Quaal's Feather Token Rare", "Ring of Animal Influence", "Ring of Evasion", "Ring of Feather Falling", "Ring of Free Action", "Ring of Protection", "Ring of Resistance", "Ring of Spell Storing", "Ring of the Ram", "Ring of X-ray Vision", "Robe of Eyes", "Rod of Rulership", "Rod of the Pact Keeper +2", "Rope of Entanglement", "Scroll of Protection", "Shield +2", "Shield of Missile Attraction", "Staff of Charming", "Staff of Swarming Insects", "Staff of the Woodlands", "Staff of Withering", "Stone of Controlling Earth Elementals", "Sun Blade", "Sword of Life Stealing", "Tentacle Rod", "Vicious Weapon", "Wand of Binding", "Wand of Enemy Detection", "Wand of Fear", "Wand of Fireballs", "Wand of Lightning Bolts", "Wand of Paralysis", "Wand of Wonder", "Weapon +2", "Wings of Flying"]
const phenomenalList = ["Ammunition +3", "Ammunition of Slaying", "Amulet of the Planes", "Animated Shield", "Armor +2", "Bag of Devouring", "Belt of Frost Giant Strength", "Belt of Stone Giant Strength", "Belt of Fire Giant Strength", "Candle of Invocation", "Carpet of Flying", "Cauldron of Rebirth", "Cloak of Arachnida", "Crystal Ball", "Dancing Sword", "Demon Armor", "Dragon Scale Mail", "Dwarven Plate", "Dwarven Thrower", "Efreeti Bottle", "Energy Longbow", "Energy Shortbow", "Enspelled Armor Very Rare", "Enspelled Weapon Very Rare", "Executioner's Axe", "Obsidian Steed Figurine of Wondrous Power", "Frost Brand", "Hat of Many Spells", "Helm of Brilliance", "Bronze Horn of Valhalla", "Horseshoes of a Zephyr", "Ioun Stone Very Rare", "Lute of Thunderous Thumping", "Manual of Bodily Health", "Manual of Gainful Exercise", "Manual of Golems", "Manual of Quickness of Action", "Mirror of Life Trapping", "Nine Lives Stealer", "Nolzur's Marvelous Pigments", "Oathbow", "Oil of Sharpness", "Potion of Flying", "Potion of Cloud Giant Strength", "Potion of Greater Invisibility", "Potion of Longevity", "Potion of Speed", "Potion of Vitality", "Quarterstaff of the Acrobat", "Ring of Regeneration", "Ring of Shooting Stars", "Ring of Telekenisis", "Robe of Scintillating Colors", "Robe of Stars", "Rod of Absorption", "Rod of Alertness", "Rod of Security", "Rod of the Pact Keeper +3", "Scimitar of Speed", "Shield +3", "Shield of the Cavalier", "Spellguard Shield", "Spirit Board", "Staff of Fire", "Staff of Frost", "Staff of Power", "Staff of Striking", "Staff of Thunder and Lightning", "Sword of Sharpness", "Thunderous Greatclub", "Tome of Clear Thought", "Tome of Leadership and Influence", "Tome of Understanding", "Wand of Polymorph", "Weapon +3"]
const legendaryList = ["Apparatus of Kwalish", "Armor +3", "Armor of Invulnerability", "Belt of Cloud Giant Strength", "Belt of Storm Giant Strength", "Cloak of Invisibility", "Crystal Ball of Mind Reading", "Crystal Ball of Telepathy", "Crystal Ball of True Seeing", "Cubic Gate", "Deck of Many Things", "Defender", "Efreeti Chain", "Enspelled Armor Legendary", "Legendary Enspelled Staff", "Enspelled Weapon Legendary", "Hammer of Thunderbolts", "Holy Avenger", "Ioun Stone of Greater Absorption", "Ioun Stone of Mastery", "Ioun Stone of Regeneration", "Iron Flask", "Luck Blade", "Moonblade", "Plate Armor of Etherealness", "Potion of Storm Giant Strength", "Ring of Djinni Summoning", "Ring of Elemental Command", "Ring of Invisibility", "Ring of Spell Turning", "Ring of Three Wishes", "Robe of the Archmagi", "Rod of Lordly Might", "Rod of Resurrection", "Scarab of Protection", "Scroll of Titan Summoning", "Sovereign Glue", "Sphere of Annihilation", "Staff of the Magi", "Sword of Answering", "Talisman of Pure Good", "Talisman of the Sphere", "Talisman of Ultimate Evil", "Tome of the Stilled Tongue", "Universal Solvent", "Well of Many Worlds"]
const artifactList = ["Axe of the Dwarvish Lords", "Blackrazor", "Book of Exalted Deeds", "Book of Vile Darkness", "Demonomicon of Iggwilv", "Efreeti Chain", "Eye of Vecna", "Hand of Vecna", "Orb of Dragonkind", "Sword of Kas", "Wand of Orcus", "Wave", "Whelm"]

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

function getRandomFromList(...choices) {
  return choices[getRandomInteger(0, choices.length - 1)]
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function isAnumber(number) {
  return !isNaN(number)
}

function shuffle(array, seed) {
  if (seed == null) seed = getRandomInteger(Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER)
  let currentIndex = array.length
  while (currentIndex != 0) {
    let randomIndex = Math.floor(getRandom(seed + currentIndex) * currentIndex)
    currentIndex--
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]]
  }
}

function pointDistance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))
}

function pointDirection(x1, y1, x2, y2) {
  Math.atn2
  var a = Math.atan2(y2 - y1, x2 - x1);
  if (a < 0) a += 2 * Math.PI;

  if (a < 0) a += 2 * Math.PI;
  if (a < 0) a += 2 * Math.PI;
  a = Math.abs((Math.PI * 2) - a);
  a *= 180 / Math.PI;

  return a;
}

function rotate(cx, cy, x, y, angle) {
  var radians = (Math.PI / 180) * angle
  var cos = Math.cos(radians)
  var sin = Math.sin(radians)
  var nx = (cos * (x - cx)) + (sin * (y - cy)) + cx
  var ny = (cos * (y - cy)) - (sin * (x - cx)) + cy
  return [nx, ny];
}

function createLocation(x, y, name) {
  x = Math.round(x)
  y = Math.round(y)

  var existingLocationIndex = state.locations.findIndex(element => element.name.toLowerCase() == name.toLowerCase())
  var location
  if (existingLocationIndex == -1) {
    location = {
      x: x,
      y: y,
      name: name
    }
    state.locations.push(location)
  } else {
    location = state.locations[existingLocationIndex]
    location.x = x
    location.y = y
    location.name = name
  }

  addStoryCard(location.name, "", "location")

  return location
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
  const encounterIndexes = listEncounterCards(listName)
  if (encounterIndexes.length <= 0) {
    // Error no encounter cards for this case!
    return encounter // Return default enconuter
  }

  //Pick a random encounter from the cards
  const randomIndex = getRandomInteger(0, encounterIndexes.length-1)
  const randomEncounter = encounterIndexes[randomIndex]
  encounter.text = randomEncounter.entry

  // Convert description into createEnemy()
  // [ {ally: false, name: 'Turkey Prime', health: '5d10+10', ac: 14, hitMod: 0, damage: '2d6+3', initiative: 'd20+2', spells: []} ]
  // Eample: createEnemy("Turkey Prime", calculateRoll("5d10+10"), 14, 0, "2d6+3", "d20+2")
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
  if (character == null) character = getCharacter()
  
  var modifier = 0
  var stat = character.stats.find((element) => element.name.toLowerCase() == "constitution")
  if (stat != null) modifier = getModifier(stat.value)

  var level = getLevel(character.experience)
  return 10 + level * (6 + modifier)
}

function getModifier(statValue) {
  return Math.floor((statValue - 10) / 2)
}

// NOTE for later: Improve finding story cards as a general function for all cases
function findSpellCardIndex(name) {
  return storyCards.findIndex((element) => element.type == "spell" && element.title == name)
}

function findSpellCard(name) {
  return storyCards[findSpellCardIndex(name)]
}

function findItemCardIndex(name, storyCardName) {
  return storyCards.findIndex((element) => (element.type == "item" || element.type == "weapon" || element.type == "armor") && (element.title == name || element.title == storyCardName))
}

function findItemCard(name, storyCardName) {
  return storyCards[findItemCardIndex(name, storyCardName)]
}

function listEncounterCards(listName) {
  return storyCards.filter((element) => (element.type == "encounter - "+listName));
}

const simpleMeleeWeapons = ["Club", "Dagger", "Greatclub", "Handaxe", "Javelin", "Light Hammer", "Mace", "Quarterstaff", "Sickle", "Spear", "Dart"]
const simpleRangedWeapons = ["Light Crossbow", "Shortbow", "Sling"]
const martialMeleeWeapons = ["Battleaxe", "Flail", "Glaive", "Greataxe", "Greatsword", "Halberd", "Lance", "Longsword", "Maul", "Morningstar", "Pike", "Rapier", "Scimitar", "Shortsword", "Trident", "Warhammer", "War Pick", "Whip"]
const martialRangedWeapons = ["Blowgun", "Hand Crossbow", "Heavy Crossbow", "Longbow", "Musket", "Pistol"]
const lightArmor = ["Padded Armor", "Leather Armor", "Studded Leather Armor"]
const mediumArmor = ["Hide Armor", "Chain Shirt", "Scale Mail", "Breastplate", "Half Plate Armor"]
const heavyArmor = ["Ring Mail", "Chain Mail", "Splint Armor", "Plate Armor"]
const ammunition = ["Arrow", "Bolt", "Bullet", "Needle"]

function itemShopConvertGenericName(name) {
  switch (name) {
    case "Armor of Gleaming":
      name = itemShopNameAddPrefix("of Gleaming", ...lightArmor.concat(mediumArmor, heavyArmor))
      break
    case "Cast-Off Armor":
      name = itemShopNameAddSuffix("Cast-Off", ...lightArmor.concat(mediumArmor, heavyArmor))
      break
    case "Moon-Touched Sword":
      name = itemShopNameAddSuffix("Moon-Touched", "Glaive", "Greatsword", "Longsword", "Rapier", "Scimitar", "Shortsword")
      break
    case "Silvered Weapon":
      name = itemShopNameAddSuffix("Silvered", ...simpleMeleeWeapons.concat(simpleRangedWeapons, martialMeleeWeapons, martialRangedWeapons))
      break
    case "Smoldering Armor":
      name = itemShopNameAddSuffix("Smoldering", ...lightArmor.concat(mediumArmor, heavyArmor))
      break
    case "Sylvan Talon":
      name = itemShopNameAddSuffix("Sylvan Talon", "Dagger", "Rapier", "Scimitar", "Shortsword", "Sickle", "Spear")
      break
    case "Walloping Ammunition":
      name = itemShopNameAddSuffix("Walloping", ...ammunition)
      quantity = 10
      break
    case "Adamantine Armor":
      name = itemShopNameAddSuffix("Adamantine", ...mediumArmor.concat(heavyArmor))
      break
    case "Adamantine Weapon":
      name = itemShopNameAddSuffix("Adamantine", ...martialMeleeWeapons.concat(ammunition, simpleMeleeWeapons))
      break
    case "Ammunition +1":
      name = itemShopNameAddPrefix("+1", ...ammunition)
      break
    case "Enspelled Armor Uncommon":
      name = itemShopNameAddSuffix("Uncommon Enspelled", ...lightArmor.concat(mediumArmor, heavyArmor))
      break
    case "Enspelled Weapon Uncommon":
      name = itemShopNameAddSuffix("Uncommon Enspelled", ...simpleMeleeWeapons.concat(martialMeleeWeapons, simpleRangedWeapons, martialRangedWeapons))
      break
    case "Mariner's Armor":
      name = itemShopNameAddSuffix("Mariner's", ...lightArmor.concat(mediumArmor, heavyArmor))
      break
    case "Quaal's Feather Token Uncommon":
      name = itemShopNameAddSuffix("Quaal's Feather Token of", "Anchor", "Fan", "Tree")
      break
    case "Sword of Vengeance":
      name = itemShopNameAddPrefix("of Vengeance", "Glaive", "Greatsword", "Longsword", "Rapier", "Scimitar", "Shortsword")
      break
    case "Weapon +1":
      name = itemShopNameAddPrefix("+1", ...simpleMeleeWeapons.concat(martialMeleeWeapons, simpleRangedWeapons, martialRangedWeapons))
      break
    case "Weapon of Warning":
      name = itemShopNameAddPrefix("of Warning", ...simpleMeleeWeapons.concat(martialMeleeWeapons, simpleRangedWeapons, martialRangedWeapons))
      break
    case "Ammunition +2":
      name = itemShopNameAddPrefix("+2", ...ammunition)
      break
    case "Armor +1":
      name = itemShopNameAddPrefix("+1", ...lightArmor.concat(mediumArmor, heavyArmor))
      break
    case "Armor of Resistance":
      name = itemShopNameAddPrefix("of Resistance", ...lightArmor.concat(mediumArmor, heavyArmor))
      break
    case "Armor of Vulnerability":
      name = itemShopNameAddPrefix("of Vulnerability", ...lightArmor.concat(mediumArmor, heavyArmor))
      break
    case "Enspelled Armor Rare":
      name = itemShopNameAddSuffix("Rare Enspelled", ...lightArmor.concat(mediumArmor, heavyArmor))
      break
    case "Enspelled Weapon Rare":
      name = itemShopNameAddSuffix("Rare Enspelled", ...simpleMeleeWeapons.concat(martialMeleeWeapons, simpleRangedWeapons, martialRangedWeapons))
      break
    case "Figurine of Wondrous Power Rare":
      name = itemShopNameAddPrefix("Figurine of Wondrous Power", "Bronze Griffon", "Ebony Fly", "Golden Lions", "Ivory Goats", "Marble Elephant", "Onyx Dog", "Serpentine Owl")
      break
    case "Flame Tongue":
      name = itemShopNameAddSuffix("Flame Tongue", ...simpleMeleeWeapons.concat(martialMeleeWeapons))
      break
    case "Giant Slayer":
      name = itemShopNameAddSuffix("Giant Slayer", ...simpleMeleeWeapons.concat(martialMeleeWeapons))
      break
    case "Ioun Stone Rare":
      name = itemShopNameAddSuffix("Ioun Stone of", "Awareness", "Protection", "Reserve", "Sustenance")
      break
    case "Quaal's Feather Token Rare":
      name = itemShopNameAddSuffix("Quaal's Feather Token of", "Bird", "Swan Boat", "Whip")
      break
    case "Sword of Life Stealing":
      name = itemShopNameAddPrefix("of Life Stealing", "Glaive", "Greatsword", "Longsword", "Rapier", "Scimitar", "Shortsword")
      break
    case "Sword of Wounding":
      name = itemShopNameAddPrefix("of Wounding", "Glaive", "Greatsword", "Longsword", "Rapier", "Scimitar", "Shortsword")
      break
    case "Vicious Weapon":
      name = itemShopNameAddSuffix("Vicious", ...simpleMeleeWeapons.concat(martialMeleeWeapons, simpleRangedWeapons, martialRangedWeapons))
      break
    case "Weapon +2":
      name = itemShopNameAddPrefix("+2", ...simpleMeleeWeapons.concat(martialMeleeWeapons, simpleRangedWeapons, martialRangedWeapons))
      break
    case "Ammunition +3":
      name = itemShopNameAddPrefix("+3", ...ammunition)
      break
    case "Ammunition of Slaying":
      let type = getRandomFromList("Aberration", "Beast", "Celestial", "Construct", "Dragon", "Elemental", "Humonoid", "Fey", "Fiend", "Giant", "Monstrosity", "Ooze", "Plant", "Undead")
      name = itemShopNameAddPrefix(`of ${type} Slaying`, ...ammunition)
      break
    case "Armor +2":
      name = itemShopNameAddPrefix("+2", ...lightArmor.concat(mediumArmor, heavyArmor))
      break
    case "Dancing Sword":
      name = itemShopNameAddSuffix("Dancing", "Greatsword", "Longsword", "Rapier", "Scimitar", "Shortsword")
      break
    case "Demon Armor":
      name = itemShopNameAddPrefix("Demon", ...lightArmor.concat(mediumArmor, heavyArmor))
      break
    case "Enspelled Armor Very Rare":
      name = itemShopNameAddSuffix("Very Rare Enspelled", ...lightArmor.concat(mediumArmor, heavyArmor))
      break
    case "Enspelled Weapon Very Rare":
      name = itemShopNameAddSuffix("Very Rare Enspelled", ...simpleMeleeWeapons.concat(martialMeleeWeapons, simpleRangedWeapons, martialRangedWeapons))
      break
    case "Frost Brand":
      name = itemShopNameAddSuffix("Frost Brand", "Glaive", "Greatsword", "Longsword", "Rapier", "Scimitar", "Shortsword")
      break
    case "Ioun Stone Very Rare":
      name = itemShopNameAddSuffix("Ioun Stone of", "Absorption", "Fortitude", "Insight", "Intellect", "Leadership", "Strength")
      break
    case "Sword of Sharpness":
      name = itemShopNameAddPrefix("of Sharpness", "Glaive", "Greatsword", "Longsword", "Rapier", "Scimitar")
      break
    case "Weapon +3":
      name = itemShopNameAddPrefix("+3", ...simpleMeleeWeapons.concat(martialMeleeWeapons, simpleRangedWeapons, martialRangedWeapons))
      break
    case "Armor +3":
      name = itemShopNameAddPrefix("+3", ...lightArmor.concat(mediumArmor, heavyArmor))
      break
    case "Enspelled Armor Legendary":
      name = itemShopNameAddSuffix("Very Rare Enspelled", ...lightArmor.concat(mediumArmor, heavyArmor))
      break
    case "Enspelled Weapon Legendary":
      name = itemShopNameAddSuffix("Legendary Enspelled", ...simpleMeleeWeapons.concat(martialMeleeWeapons, simpleRangedWeapons, martialRangedWeapons))
      break
    case "Luck Blade":
      name = itemShopNameAddPrefix("Luck Blade", "Glaive", "Greatsword", "Longsword", "Rapier", "Scimitar", "Sickle", "Shortsword")
      break
    case "Moonblade":
      name = itemShopNameAddPrefix("Moonblade", "Greatsword", "Longsword", "Rapier", "Scimitar", "Shortsword")
      break
  }
  return name
}

function itemShopNameAddPrefix(name, ...prefixes) {
  return getRandomFromList(...prefixes) + " " + name
}

function itemShopNameAddSuffix(name, ...suffixes) {
  return name + " " + getRandomFromList(...suffixes)
}

function findItemShopDeals(className, bought) {
  return state.itemShopDeals.filter(element => element.className == className && (bought == null || element.bought == bought))
}

function findSpellShopDeals(className, level, bought) {
  return state.spellShopDeals.filter(element => element.className == className && element.level == level && (bought == null || element.bought == bought))
}

String.prototype.replaceAt = function(index, replacement) {
  return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}

String.prototype.plural = function(revert) {

    var plural = {
        '(quiz)$'               : "$1zes",
        '^(ox)$'                : "$1en",
        '([m|l])ouse$'          : "$1ice",
        '(matr|vert|ind)ix|ex$' : "$1ices",
        '(x|ch|ss|sh)$'         : "$1es",
        '([^aeiouy]|qu)y$'      : "$1ies",
        '(hive)$'               : "$1s",
        '(?:([^f])fe|([lr])f)$' : "$1$2ves",
        '(shea|lea|loa|thie)f$' : "$1ves",
        'sis$'                  : "ses",
        '([ti])um$'             : "$1a",
        '(tomat|potat|ech|her|vet)o$': "$1oes",
        '(bu)s$'                : "$1ses",
        '(alias)$'              : "$1es",
        '(octop)us$'            : "$1i",
        '(ax|test)is$'          : "$1es",
        '(us)$'                 : "$1es",
        '([^s]+)$'              : "$1s"
    };

    var singular = {
        '(quiz)zes$'             : "$1",
        '(matr)ices$'            : "$1ix",
        '(vert|ind)ices$'        : "$1ex",
        '^(ox)en$'               : "$1",
        '(alias)es$'             : "$1",
        '(octop|vir)i$'          : "$1us",
        '(cris|ax|test)es$'      : "$1is",
        '(shoe)s$'               : "$1",
        '(o)es$'                 : "$1",
        '(bus)es$'               : "$1",
        '([m|l])ice$'            : "$1ouse",
        '(x|ch|ss|sh)es$'        : "$1",
        '(m)ovies$'              : "$1ovie",
        '(s)eries$'              : "$1eries",
        '([^aeiouy]|qu)ies$'     : "$1y",
        '([lr])ves$'             : "$1f",
        '(tive)s$'               : "$1",
        '(hive)s$'               : "$1",
        '(li|wi|kni)ves$'        : "$1fe",
        '(shea|loa|lea|thie)ves$': "$1f",
        '(^analy)ses$'           : "$1sis",
        '((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$': "$1$2sis",        
        '([ti])a$'               : "$1um",
        '(n)ews$'                : "$1ews",
        '(h|bl)ouses$'           : "$1ouse",
        '(corpse)s$'             : "$1",
        '(us)es$'                : "$1",
        's$'                     : ""
    };

    var irregular = {
        'move'   : 'moves',
        'foot'   : 'feet',
        'goose'  : 'geese',
        'sex'    : 'sexes',
        'child'  : 'children',
        'man'    : 'men',
        'tooth'  : 'teeth',
        'person' : 'people',
        'woman' : 'women',
    };

    var uncountable = [
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
    ];

    // save some time in the case that singular and plural are the same
    if(uncountable.indexOf(this.toLowerCase()) >= 0)
      return this;

    // check for irregular forms
    for(word in irregular){

      if(revert){
              var pattern = new RegExp(irregular[word]+'$', 'i');
              var replace = word;
      } else{ var pattern = new RegExp(word+'$', 'i');
              var replace = irregular[word];
      }
      if(pattern.test(this))
        return this.replace(pattern, replace);
    }

    if(revert) var array = singular;
         else  var array = plural;

    // check for matches using regular expressions
    for(reg in array){

      var pattern = new RegExp(reg, 'i');

      if(pattern.test(this))
        return this.replace(pattern, array[reg]);
    }

    return this;
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

var fantasyFemaleNames = ["Luna", "Kayla", "Serenity", "Eira", "Mirah", "Elowen", "Keira", "Calantha", "Natalia", "Eirlys", "Freya", "Ophelia", "Piper", "Alethea", "Melara", "Seraphina", "Delilah", "Lorna", "Echo", "Bree", "Daniella", "Branwen", "Matilda", "Eve", "Brynhild", "Ithilda", "Belinda", "Catarina", "Jora", "Zelda", "Thalia", "Rowan", "Aurora", "Coral", "Vivian", "Briella", "Elvina", "Lylah", "Mirastral", "Nadira", "Marcella", "Kestrel", "Avis", "Laura", "Vesper", "Lucilla", "Sabine", "Evelyn", "Kalinda", "Celeste", "Lilith", "Wren", "Jasmine", "Ondine", "Gabriella", "Astrid", "Elise", "Helena", "Nova", "Lyndal", "Zara", "Niamh", "Vynessa", "Erin", "Lyriel", "Dracaena", "Lila", "Brynna", "Zephyr", "Kira", "Ava", "Elinor", "Carmilla", "Isabella", "Ariana", "Rhianna", "Sylvie", "Kymberley", "Hazel", "Lirien", "Bridget", "Lyra", "Galatea", "Nadine", "Alethia", "Larissa", "Sariel", "Theodora", "Gwynneth", "Eleanor", "Odessa", "Meryll", "Sophia", "Kaia", "Brynhilda", "Haven", "Eluned", "Selene", "Bryony", "Ciara"]

var fantasyMaleNames = ["Alexander", "Thane", "Gabriel", "Orion", "Grayson", "Cedric", "Sebastian", "Arin", "Liam", "Byerson", "Julian", "Zaneth", "Kel", "Eramon", "Ashfur", "Tristam", "Leonidas", "Ryzlen", "Caspian", "Jarron", "Eudicles", "Tarquin", "Terrence", "Ereth", "Thayon", "Braxton", "Twilight", "Argent", "Whisper", "Daemon", "Victor", "Blackthorn", "Dawnrunner", "Gareth", "Caelum", "Zephyr", "Brennan", "Theo", "Draco", "Cian", "Valoric", "Skye", "Sunfor", "Damon", "Maverick", "Bryson", "Lumo", "Drakken", "Ewen", "Waverley", "Lachlan", "Atlas", "Arden", "Ryker", "Asterion", "Bryon", "Judson", "Griffith", "Logan", "Ethan", "Darius", "Brodeth", "Cassius", "Eamon", "Rowan", "Paxton", "Michael", "Dommon", "Aragorn", "Bastier", "Maximus", "Kenrick", "Jasper", "Lucien", "Bryce", "Ryder", "Damian", "Daxton", "Brantley", "Griffin", "Xander", "Galen", "Brody", "Erek", "Drake", "Thayer", "Kieran", "Heath", "Raeleus", "Alistair", "Bastian", "Asher", "Ronan", "Zane", "Jaxon", "Ambrose", "Malcolm", "Axel", "Ehtan", "Avery", "Kael", "Riley"]

var scifiFemaleNames = ["Jala", "Clea", "Jocosa", "Artemis", "Serafina", "Sevyn", "Tesla", "Lux", "Nine", "Kiara", "Valentina", "Morticia", "Rio", "Xyleena", "Libby", "Valkyrie", "Panika", "Lara", "Fenglina", "Makiko", "Katja", "Paige", "Elie", "Lucie", "Samanta", "Hazel", "Helena", "Leia", "Luminara", "Katan", "Vala", "Inara", "Saffron", "Zoe", "Jayne", "Kaylee", "Maeve", "Kara", "Athena", "Cally", "Anastasia", "Pegi", "Alita", "Alkhema", "Arcena", "Ko", "Bodika", "Candi", "Chi", "Rae", "Cylla", "Daria", "Chalma", "Elita", "Eryx", "Eva", "Nova", "Celeste", "Guri", "Hexen", "Indigo", "Juli", "Katana", "Talia", "Lala", "Mika", "Miranda", "Nebula", "Six", "Sasha", "Silica", "Sky", "Strika", "Terra", "Yori", "Andromeda", "Astra", "Bellatrix", "Callista", "Cosima", "Delphine", "Electra", "Phantasy", "Farrah", "Geneva", "Haven", "Jade", "Juno", "Lillix", "Lynx", "Nya", "Oria", "Parris", "Priya", "Rue", "Clarity", "Bloom", "Decca", "Domonique", "Grazi", "Helvetica", "Cadence"]

var scifiMaleNames = ["Ares", "Astro", "Macro", "Cadmus", "Cyno", "Fade", "Hack", "Hax", "Indigo", "Hinge", "Jarno", "Jax", "Knox", "Link", "Maxx", "Merrick", "Miles", "Mirari", "Niko", "Nano", "Oberon", "Onyx", "Orion", "Osso", "Paradox", "Pip", "Phoenix", "Radius", "Rexx", "Razlin", "Reznor", "Rian", "Roscoe", "Ryker", "Rush", "Riden", "Drake", "Frost", "Cassian", "Neyo", "Maverick", "Azriel", "Auryn", "Daggar", "Evyn", "Jace", "Jaron", "Loki", "Oren", "Ridley", "Sagan", "Silas","Solon", "Stellan", "Sorrel", "Seth", "Theron", "Zen", "Klay", "Blaze", "Xander", "Mace", "Dozer", "Eno", "Tip", "Ray", "Genesis", "Galac", "Eclipse", "Zev", "Zaid", "Wilder", "Sol", "Jupiter", "Mars", "Star", "Cosmo", "Aster", "Lazer", "Zeno", "Sirius", "Azra", "Atom", "Teague", "Rigel", "Cato", "Zhane", "Ace", "Rocket", "Kip", "Meter", "Starbuck", "Roman", "Fiat", "Kyron", "Nyx", "Rune", "Nero", "Quantum", "Nym", "Morphius", "Striker", "Bridger"]

var modernFemaleNames = ["Olivia", "Emma", "Amelia", "Ella", "Isabella", "Mia", "Valerie", "Eliana", "Charlotte", "Mila", "Aria", "Luna", "Harper", "Grace", "Zoey", "Jemma", "Priscilla", "Scarlett", "Hazel", "Ellie", "Naya", "Nila", "Tamia", "Cecilia", "Arianna", "Abigail", "Riley", "Autumn", "Maya", "Madelyn", "Maria", "Melody", "Sophia", "Ava", "Luz", "Eleanor", "Ivy", "Freya", "Alice", "Violet", "Clara", "Daphne", "Evelyn", "Nora", "Lucy", "Poppy", "Rose", "Chloe", "Phoebe", "Elsie", "Cordelia", "Willow", "Daisy", "Thea", "Adeline", "Arabella", "Maisie", "Lola", "Olive", "Sienna", "Sierra", "Elena", "Sadie", "Sophie", "Julia", "Alexandra", "Jane", "Mira", "Talia", "Zara", "Vera", "Amara", "Cynthia", "Hannah", "Aurora", "Anya", "Erin", "Felicity", "Juno", "Yelena", "Naomi", "Caroline", "Miriam", "Veronica", "Molly", "June", "Nina", "Piper", "Helena", "Amari", "Everly", "Bonnie", "Alina", "Emilia", "Harriet", "Isabel", "Sofia", "Kayla", "Lena", "Megan", "Diana"]

var modernMaleNames = ["Jackson", "Aiden", "Charles", "Adam", "Christopher", "Daniel", "Liam", "Oliver", "Mateo", "Henry", "Lucas", "William", "Theodore", "Noah", "John", "Arnold", "Norman", "Ralph", "Virgil", "Will", "Sam", "Luca", "David", "Joseph", "Mason", "Luke", "Matthew", "Dylan", "Jacob", "Isaac", "Anthony", "Carter", "Caleb", "Cooper", "Josiah", "Nolan", "Cameron", "Nathan", "Josh", "Angel", "Andrew", "Aaron", "Ian", "Eli", "Ryan", "Everett", "Enzo", "Parker", "Jeremiah", "Landon", "Jordan", "Austin", "Jameson", "Myles", "Dominic", "Nicholas", "Kayden", "Hunter", "Harrison", "Milo", "Arthur", "Ryder", "Archer", "Luis", "George", "Evan", "Carlos", "Juan", "Jason", "Leon", "Calvin", "Ivan", "Cole", "Chase", "Dean", "Jayce", "Olliver", "Alan", "Jesus", "Charlie", "Tyler", "Elliot", "Kevin", "Ayden", "Felix", "Tate", "Jesse", "Brody", "Tucker", "Peter", "Joel", "Edward", "Oscar", "Victor", "Brandon", "Bruce", "Abel", "Richard", "Riley", "Patrick", "Eric", "Elian", "Louis"]

var nordicFemaleNames = ["Freya", "Dagny", "Ingrid", "Froya", "Elin", "Solveig", "Maja", "Sol", "Linnea", "Vilde", "Var", "Aldis", "Alfrida", "Alfsol", "Alva", "Alvdis", "Alvida", "Andora", "Anveig", "Asa", "Astri", "Astrid", "Bolette", "Brynhild", "Disa", "Eir", "Eira", "Eidis", "Elevine", "Elfi", "Embla", "Erna", "Freja", "Frida", "Fredrikke", "Gerda", "Gry", "Gurina", "Gurine", "Gyda", "Haddy", "Halgerd", "Helga", "Helje", "Helle", "Herdis", "Herfrid", "Hilde", "Hulda", "Inga", "Idun", "Isfrid", "Iverna", "Iverine", "Jorgina", "Kari", "Lagertha", "Liv", "Livunn", "Malfrid", "Malmfrid", "Nanna", "Oda", "Odel", "Odine", "Olava", "Runa", "Ragnfrid", "Randi", "Ragnhild", "Saga", "Sif", "Sigrid", "Siv", "Solvei", "Soma", "Svanild", "Thora", "Tora", "Thurid", "Torveig", "Torfrid", "Trude", "Tyra", "Tyri", "Udna", "Unni", "Una", "Unnlaug", "Unnveig", "Valdine", "Vedis", "Valborg", "Vivil", "Ylva", "Yngva", "Thoril", "Thorine", "Sigfrida", "Sigun", "Sigvor", "Signe", "Reidunn"]

var nordicMaleNames = ["Erik", "Bjorn", "Lars", "Asmund", "Harald", "Arne", "Odin", "Ivar", "Leif", "Aesir", "Axel", "Aren", "Aric", "Balder", "Birger", "Bjarke", "Bjarne", "Nils", "Steig", "Erling", "Espen", "Fenrir", "Frey", "Einar", "Garald", "Anders", "Gunnar", "Hagan", "Halfthor", "Halfdan", "Kjell", "Hanne", "Ingvar", "Helge", "Herleif", "Jarl", "Joran", "Magnus", "Norrell", "Njord", "Olaf", "Osman", "Ragnar", "Sigurd", "Steffen", "Sten", "Sven", "Tor", "Torben", "Troels", "Tyr", "Tyrell", "Ulf", "Viggo", "Vali", "Vidar", "Volund", "Wayde", "Waddell", "Alviss", "Anneli", "Stig", "Eino", "Haakon", "Haldor", "Iver", "Sindri", "Trym", "Varg", "Alf", "Amund", "Arn", "Arnstein", "Arvid", "Bjarni", "Bjoern", "Bragi", "Brede", "Dag", "Dagfinn", "Egil", "Endre", "Erlend", "Even", "Finn", "Flosi", "Fredrik", "Frode", "Freyr", "Geir", "Gisli", "Grim", "Gudbrand", "Gustav", "Hakan", "Hakon", "Hans", "Helgi", "Ingolf", "Jomar", "Knut", "Orm"]

function generateName(genre, male) {
  if (genre.toLowerCase() == "fantasy") {
    if (male) {
      if (state.fantasyMaleIndex == null || state.fantasyMaleIndex >= fantasyMaleNames.length) {
        state.fantasyMaleIndex = 0
        state.fantasyMaleSeed = getRandomInteger(1, 1000)
      }
      shuffle(fantasyMaleNames, state.fantasyMaleSeed)
      return fantasyMaleNames[state.fantasyMaleIndex++]
    } else  {
      if (state.fantasyFemaleIndex == null || state.fantasyFemaleIndex >= fantasyFemaleNames.length) {
        state.fantasyFemaleIndex = 0
        state.fantasyFemaleSeed = getRandomInteger(1, 1000)
      }
      shuffle(fantasyFemaleNames, state.fantasyFemaleSeed)
      return fantasyFemaleNames[state.fantasyFemaleIndex++]
    }
  } else if (genre.toLowerCase() == "modern") {
    if (male)  {
      if (state.modernMaleIndex == null || state.modernMaleIndex >= modernMaleNames.length) {
        state.modernMaleIndex = 0
        state.modernMaleSeed = getRandomInteger(1, 1000)
      }
      shuffle(modernMaleNames, state.modernMaleSeed)
      return modernMaleNames[state.modernMaleIndex++]
    } else {
      if (state.modernFemaleIndex == null || state.modernFemaleIndex >= modernFemaleNames.length) {
        state.modernFemaleIndex = 0
        state.modernFemaleSeed = getRandomInteger(1, 1000)
      }
      shuffle(modernFemaleNames, state.modernFemaleSeed)
      return modernFemaleNames[state.modernFemaleIndex++]
    }
  } else if (genre.toLowerCase() == "scifi") {
    if (male) {
      if (state.scifiMaleIndex == null || state.scifiMaleIndex >= scifiMaleNames.length) {
        state.scifiMaleIndex = 0
        state.scifiMaleSeed = getRandomInteger(1, 1000)
      }
      shuffle(scifiMaleNames, state.scifiMaleSeed)
      return scifiMaleNames[state.scifiMaleIndex++]
    }
    else {
      if (state.scifiFemaleIndex == null || state.scifiFemaleIndex >= scifiFemaleNames.length) {
        state.scifiFemaleIndex = 0
        state.scifiFemaleSeed = getRandomInteger(1, 1000)
      }
      shuffle(scifiFemaleNames, state.scifiFemaleSeed)
      return scifiFemaleNames[state.scifiFemaleIndex++]
    }
  } else if (genre.toLowerCase() == "nordic") {
    if (male) {
      if (state.nordicMaleIndex == null || state.nordicMaleIndex >= nordicMaleNames.length) {
        state.nordicMaleIndex = 0
        state.nordicMaleSeed = getRandomInteger(1, 1000)
      }
      shuffle(nordicMaleNames, state.nordicMaleSeed)
      return nordicMaleNames[state.nordicMaleIndex++]
    }
    else {
      if (state.nordicFemaleIndex == null || state.nordicFemaleIndex >= nordicFemaleNames.length) {
        state.nordicFemaleIndex = 0
        state.nordicFemaleSeed = getRandomInteger(1, 1000)
      }
      shuffle(nordicFemaleNames, state.nordicFemaleSeed)
      return nordicFemaleNames[state.nordicFemaleIndex++]
    }
  }
}