# ROUGH PLAN FOR INJURY SYSTEM
### Replace health/damage/ac system with injury system
* weapons have damage types which source imjuries from sptry card tables, armor has injury resistance
* This will allow us to introduce damage types (something not present currently)
* The injury system will be narrative based, not turn based (A deviation from D&D)
* This removes the need for players to book-keep encounters, memorize command sequences, and allow free-form combat
---
### We define weapons as: {damage type, level}
- damage type is the reference for the injury tables
- level is the plus mod for rolling greater injuries, and damage
---
### We define injuries in the damage type tables as: 
> {injury, rarity, damage}
- injury being the flavor name
- rarity being the chance to inflict
- damage is the base damage of the injury
---
### We define damage as:
> injury + dex + strength + weapon level
- This means a character can scale their damage using weapon level or stat growth
- This means a bad weapon might hinder a character's ability to deal damage
- It also means a negative stat mods hinder a character's ability to deal damage
- Damage type dealt correlates to the weapon's damage type
---
### We define chance to hit as:
> "base d20 + dex + strength + weapon level" vs DC
- Same as normal D&D
- The DC is determined by the player of AI Dungeon (no AC values)
- When a character is hit they sustain an injury (if the dmg of that injury is > 0)
- Injuries are pushed into an injury array
- (multiples of the same injury are named by count e.g. injury1, injury2)
---
### We define injuries of a character as:
> {injury, damage}
- rarity is not needed once sustained
- damage is how much this injury reduces the character's health
- damage is defined from the calculation above
- injuries can be seen in the #bio
---
### We define max health as:
> base + (level * constitution mod)
### And current health:
> max health - total damage of injuries

If current health <= 0; then that character has succumbed to their injuries.

---
### We define armor as:
> {damage type, level}
- damage type is the armors resistance type
- level is the minus mod for rolling greater injuries, and damage
We define receiving damage as: "damage - armor level"
- Only minus level for damage that equals the armor's damage resistance type
- If the damage is reduces to <= 0 then no injury is applied
- receiving damage is called at the moment an injury is pushed onto a character
---
### Healing and resting:
- Healing reduces damage, when damage reaches 0 the injury is removed
- Resting heals all injuries by "1+con mod" (short resting heals half as much)
---
### Narrative combat style considerations:
- Only characters have armors and weapons, and all the systems associated
- Non-characters are controlled by AI Dungeon's narrative, so do not use the system
- Characters use #attack to roll hit chances, if a hit lands it rolls injury on the target
- Characters use #evade to roll dodge/block/parry, if the hit lands it rolls an injury
- Non-characters never use #commands, it is up to the player to #attack or #evade
- AI Dungeon might allow narrative hits, in which case the #injure can be used roll injuries
---
### So book keeping wise:
- The player has intuitive commands like #attack, #evade, #rest, #bio. 
- They can manually #injure or #heal if needed for outcome of a narrative event. 
- The player is notified of injuries each day and when they occur. (this also updates AI dungeon context via the narrative history) 
- During combat the player is made away of their remaining HP, which is all they really need to worry about in the heat of the moment. 
- In most cases the default DC takes care of things, but can be expressed in commands for increased or decreased challenge.
- Scripts handle all the checks, rolls, calculations, and management of item/character values.
---
### Here would be an example flow.
> AID: The goblin approaches.

> PLAYER: #attack goblin with sword

> SCRIPT: Calculates hit chance with sword using default DC (calculates injury & dmg on hit)

> OUTPUT: You successfully hit the goblin with your sword, dealing X damage and XYZ injury.
(note that we display X damage to player for feeling, but it's never tracked, nor needed to)

> AID: The goblin reels back in pain then lunges with it's claws.

> PLAYER: #evade 
SCRIPT: Calculate evasion chance using character stat/skill vs default DC 
(calculates injury on hit; for a non-character, attack damage is calculated and scaled based on the DC) 

> OUTPUT: You failed to evade, and sustain XYZ injury for X damage. [You have Y health left] 

> AID: The goblins claws rack across your body, injuring you... 

> PLAYER: I swing at the goblin with my sword. (notice not a command) 

> AID: You hit the goblin squarely with your sword. 

> PLAYER: #injure goblin slashing 

> SCRIPT: Rolls a slashing type injury for the goblin (rolls a mortal injury; uses player stats for dmg) 

> OUTPUT: The goblin sustains a mortal injury. 

> AID: The goblin succumbs to it's injuries and dies... (notice narrative choice by AID because we worded the injury as mortal) 