//name, health, ac, hitModifier, damage, initiative, ...spells
        switch (parseInt(value)) {
          case 1:
            state.tempAlly = createAlly("Fighter", calculateRoll("1d6+12"), 18, 4, "1d8+4", "d20+2", "Javelin Throw1d6+4")
            break
          case 2:
            state.tempAlly = createAlly("Cleric", calculateRoll("1d6+10"), 17, 3, "1d6+2", "d20", "Healing Word", "Sanctuary", "Guiding Bolt4d6")
            break
          case 3:
            state.tempAlly = createAlly("Rogue", calculateRoll("1d6+10"), 15, 5, "2d6+3", "d20+5", "Sneak Attack3d6+3")
            break
          case 4:
            state.tempAlly = createAlly("Ranger", calculateRoll("1d6+10"), 15, 4, "1d8+2", "d20+2", "Cure Wounds", "Hunter's Mark", "Ensaring Strike1d8+2")
            break
          case 5:
            state.tempAlly = createAlly("Barbarian", calculateRoll("1d6+15"), 17, 3, "1d12+4", "d20+1", "Rage1d12+4")
            break
          case 6:
            state.tempAlly = createAlly("Bard", calculateRoll("1d6+10"), 15, 3, "1d6", "d20", "Petrifying Bite1d4+1")
            break
          case 7:
            state.tempAlly = createAlly("Druid", calculateRoll("1d6+10"), 16, 3, "1d6+1", "d20", "Poison Bite2d4+1")
            break
          case 8:
            state.tempAlly = createAlly("Monk", calculateRoll("1d6+10"), 16, 5, "2d6+2", "d20+3", "Flurry of Blows 3d6+2")
            break
          case 9:
            state.tempAlly = createAlly("Paladin", calculateRoll("1d6+10"), 16, 3, "1d8+2", "d20+1", "Searing Smite2d6+4")
            break
          case 10:
            state.tempAlly = createAlly("Wizard", calculateRoll("1d6+8"), 14, 3, "1d6", "d20", "Ray of Frost1d8", "Mage Armor", "Ice Knife1d10+5")
            break
          case 11:
            state.tempAlly = createAlly("Sorcerer", calculateRoll("1d6+8"), 14, 3, "1d6", "d20", "Sorcerous Burst1d8", "Chromatic Orb2d8", "Burning Hands1d10")
            break
          case 12:
            state.tempAlly = createAlly("Warlock", calculateRoll("1d6+8"), 14, 3, "1d6", "d20", "Eldritch Blast1d8+5", "Chill Touch1d12", "Hex")
            break
          case 13:
            state.tempAlly = createAlly("Artificer", calculateRoll("1d6+10"), 15, 3, "2d6", "d20+1", "Archanist's Fire2d6+5", "Acid Vial1d10")
            break
          case 14:
            state.tempAlly = createAlly("Commoner", calculateRoll("1d8"), 10, 2, "1d4", "d20")
            break
          case 15:
            state.tempAlly = createAlly("Bandit", calculateRoll("2d8+2"), 12, 3, "1d6+1", "d20+1")
            break
          case 16:
            state.tempAlly = createAlly("Guard", calculateRoll("2d8+2"), 16, 3, "1d6+1", "d20+1")
            break
          case 17:
            state.tempAlly = createAlly("Cultist", calculateRoll("2d8"), 12, 3, "1d6+1", "d20+1", "Dark Devotion")
            break
          case 18:
            state.tempAlly = createAlly("Acolyte", calculateRoll("2d8"), 10, 2, "1d4", "d20", "Sacred Flame1d8", "Cure Wounds")
            break
          case 19:
            state.tempAlly = createAlly("Apprentice", calculateRoll("3d8"), 10, 4, "1d10+2", "d20", "Burning Hands3d6")
            break
          case 20:
            state.tempAlly = createAlly("Witch", calculateRoll("3d8+3"), 10, 3, "1d6+2", "d20", "Ray of Sickness2d8", "Tashas Hideous Laughter", "Invisibility", "Ray of Frost2d8")
            break
          case 21:
            state.tempAlly = createAlly("Buccaneer", calculateRoll("8d8+24"), 14, 5, "1d6+3", "d20+2", "Invade")
            break
          case 22:
            state.tempAlly = createAlly("Spy", calculateRoll("6d8"), 12, 4, "1d6+2", "d20+2", "Sneak Attack2d6+2")
            break
          case 23:
            state.tempAlly = createAlly("Captain", calculateRoll("10d8+20"), 15, 5, "3d6+9", "initiative")
            break
          case 24:
            state.tempAlly = createAlly("Charlatan", calculateRoll("8d8+8"), 15, 4, "1d6+2", "d20+2", "Charm Person", "Shatter3d8", "Thunderwave2d8", "Vicious Mockery1d4")
            break
          case 25:
            state.tempAlly = createAlly("Berserker", calculateRoll("9d8+27"), 13, 5, "1d12+3", "d20+1")
            break
          case 26:
            state.tempAlly = createAlly("Priest", calculateRoll("5d8+5"), 13, 2, "1d6", "d20", "Spirit Guardians3d8", "Spiritual Weapon1d8", "Guiding Bolt4d6", "Cure Wounds")
            break
          case 27:
            state.tempAlly = createAlly("Knight", calculateRoll("8d8+16"), 18, 5, "4d6+6", "d20", "Leadership")
            break
          case 28:
            state.tempAlly = createAlly("Archer", calculateRoll("10d8+30"), 16, 6, "2d8+8", "d20+4")
            break
          case 29:
            state.tempAlly = createAlly("Warrior", calculateRoll("6d8+12"), 16, 6, "1d8+3", "d20+1")
            break
          case 30:
            state.tempAlly = createAlly("Conjurer", calculateRoll("9d8"), 12, 5, "1d4+2", "d20+2", "Conjure Elemental", "Cloud Kill5d8", "Cloud of Daggers5d8", "Poison Spray1d12")
            break
          case 31:
            state.tempAlly = createAlly("Mage", calculateRoll("9d8"), 12, 5, "1d4+2", "d20+2", "Greater Invisibility", "Ice Storm4d6", "Fireball8d6", "Magic Missile3d4+3")
            break
          case 32:
            state.tempAlly = createAlly("Assassin", calculateRoll("12d8+24"), 15, 6, "2d6+6", "d20+3", "Sneak Attack6d6+6")
            break
          case 33:
            state.tempAlly = createAlly("Evoker", calculateRoll("12d8+12"), 12, 3, "1d6-1", "d20+2", "Chain Lightning10d8", "Wall of Ice", "Counter Spell", "Shatter3d8", "Magic Missile6d4+6")
            break
          case 34:
            state.tempAlly = createAlly("Necromancer", calculateRoll("12d8+12"), 12, 7, "2d4", "d20+2", "Circle of Death8d6", "Blight8d8", "Cloudkill5d8", "Animate Dead", "Chill Touch1d8")
            break
          case 35:
            state.tempAlly = createAlly("Champion", calculateRoll("22d8+44"), 18, 9, "6d6+15", "d20+2", "Second Wind")
            break
          case 36:
            state.tempAlly = createAlly("Warlord", calculateRoll("27d8+108"), 18, 9, "4d6+10", "d20+3", "Command Ally", "Frighten Foe")
            break
          case 37:
            state.tempAlly = createAlly("Archmage", calculateRoll("18d8+18"), 12, 6, "1d4+2", "d20+2", "Time Stop", "Mind Blank", "Lightning Bolt8d6", "Cone of Cold8d8", "Shocking Grasp1d8")
            break
          case 38:
            state.tempAlly = createAlly("Archdruid", calculateRoll("24d8+24"), 16, 6, "1d6+2", "d20+2", "Fire Storm7d10", "Sunbeam6d8", "Wall of Fire", "Beast Sense", "Conjure Animals")
            break
          case 39:
            state.tempAlly = createAlly("Ape", calculateRoll("3d8+6"), 12, 5, "2d4+6", "d20+2", "Throw Rock2d6+3")
            break
          case 40:
            state.tempAlly = createAlly("Badger", calculateRoll("1d4+3"), 11, 2, "1", "d20")
            break
          case 41:
            state.tempAlly = createAlly("Bat", calculateRoll("1d4-1"), 12, 4, "1", "d20+2")
            break
          case 42:
            state.tempAlly = createAlly("Black Bear", calculateRoll("3d8+6"), 11, 4, "2d6+4", "d20+1")
            break
          case 43:
            state.tempAlly = createAlly("Boar", calculateRoll("2d8+4"), 11, 3, "1d6+1", "d20", "Gore2d6+1")
            break
          case 44:
            state.tempAlly = createAlly("Brown Bear", calculateRoll("3d10+6"), 11, 5, "3d4+6", "d20+1", "Fire Storm7d10", "Sunbeam6d8", "Wall of Fire", "Beast Sense", "Conjure Animals")
            break
          case 45:
            state.tempAlly = createAlly("Camel", calculateRoll("2d10+6"), 10, 4, "1d4+2", "d20-1")
            break
          case 46:
            state.tempAlly = createAlly("Cat", calculateRoll("1d4"), 12, 4, "1", "d20+2")
            break
          case 47:
            state.tempAlly = createAlly("Constrictor Snake", calculateRoll("2d10+2"), 13, 4, "1d8+2", "d20+2", "Constrict3d4")
            break
          case 48:
            state.tempAlly = createAlly("Crab", calculateRoll("1d4+1"), 11, 2, "1", "d20")
            break
          case 49:
            state.tempAlly = createAlly("Crocodile", calculateRoll("2d10+2"), 12, 4, "1d8+2", "d20")
            break
          case 50:
            state.tempAlly = createAlly("Dire Wolf", calculateRoll("3d10+6"), 14, 5, "1d10+3", "d20+2")
            break
          case 51:
            state.tempAlly = createAlly("Draft Horse", calculateRoll("2d10+4"), 10, 6, "1d4+4", "d20")
            break
          case 52:
            state.tempAlly = createAlly("Elephant", calculateRoll("8d12+24"), 12, 8, "4d8+12", "d20-1", "Trample2d10+6")
            break
          case 53:
            state.tempAlly = createAlly("Elk", calculateRoll("2d10+5"), 10, 5, "1d6+3", "d20")
            break
          case 54:
            state.tempAlly = createAlly("Frog", calculateRoll("1d4-1"), 11, 3, "1", "d20+1")
            break
          case 55:
            state.tempAlly = createAlly("Giant Badger", calculateRoll("2d8+6"), 13, 3, "2d4+1", "d20")
            break
          case 56:
            state.tempAlly = createAlly("Giant Crab", calculateRoll("3d8"), 15, 3, "1d6+1", "d20+1")
            break
          case 57:
            state.tempAlly = createAlly("Giant Goat", calculateRoll("3d10+3"), 11, 5, "1d6+3", "d20+1")
            break
          case 58:
            state.tempAlly = createAlly("Giant Seahorse", calculateRoll("3d10"), 14, 4, "2d6+2", "d20+1", "Bubble Dash")
            break
          case 59:
            state.tempAlly = createAlly("Giant Spider", calculateRoll("4d10+4"), 14, 5, "1d8+3", "d20+3", "Web")
            break
          case 60:
            state.tempAlly = createAlly("Giant Weasel", calculateRoll("2d8"), 13, 5, "1d4+3", "d20+3")
            break
          case 61:
            state.tempAlly = createAlly("Goat", calculateRoll("1d8"), 10, 2, "1", "d20")
            break
          case 62:
            state.tempAlly = createAlly("Hawk", calculateRoll("1d4-1"), 13, 5, "1", "d20+3")
            break
          case 63:
            state.tempAlly = createAlly("Imp", calculateRoll("6d4+6"), 13, 5, "3d6+3", "d20+3", "Invisibility")
            break
          case 64:
            state.tempAlly = createAlly("Lion", calculateRoll("4d10"), 12, 5, "2d8+6", "d20+2", "Roar")
            break
          case 65:
            state.tempAlly = createAlly("Lizard", calculateRoll("1d4"), 10, 2, "1", "d20")
            break
          case 66:
            state.tempAlly = createAlly("Mastiff", calculateRoll("1d8+1"), 12, 3, "1d6+1", "d20+2")
            break
          case 67:
            state.tempAlly = createAlly("Mule", calculateRoll("2d8+2"), 10, 4, "1d4+2", "d20")
            break
          case 68:
            state.tempAlly = createAlly("Octopus", calculateRoll("1d6"), 12, 4, "1", "d20+2", "Ink Cloud")
            break
          case 69:
            state.tempAlly = createAlly("Owl", calculateRoll("1"), 11, 3, "1", "d20+1")
            break
          case 70:
            state.tempAlly = createAlly("Panther", calculateRoll("3d8"), 12, 4, "1d4+2", "d20+2")
            break
          case 71:
            state.tempAlly = createAlly("Pony", calculateRoll("2d8+2"), 10, 4, "1d4+2", "d20")
            break
          case 72:
            state.tempAlly = createAlly("Pseudodragon", calculateRoll("3d4+3"), 14, 4, "2d4+4", "d20+2", "String2d4+2")
            break
          case 73:
            state.tempAlly = createAlly("Quasit", calculateRoll("10d4"), 13, 5, "1d4+3", "d20+3", "Shape Shift", "Scare", "Invisibility")
            break
          case 74:
            state.tempAlly = createAlly("Rat", calculateRoll("1d4-1"), 10, 2, "1", "d20")
            break
          case 75:
            state.tempAlly = createAlly("Raven", calculateRoll("1d4"), 12, 4, "1", "d20+2")
            break
          case 76:
            state.tempAlly = createAlly("Reef Shark", calculateRoll("4d8+4"), 12, 4, "2d4+2")
            break
          case 77:
            state.tempAlly = createAlly("Riding Horse", calculateRoll("2d10+2"), 11, 5, "1d8+3", "d20+1")
            break
          case 78:
            state.tempAlly = createAlly("Scorpion", calculateRoll("1d4-1"), 13, 2, "1d6+1", "d20")
            break
          case 79:
            state.tempAlly = createAlly("Skeleton", calculateRoll("2d8+4"), 13, 5, "1d6+3", "d20+3", "Shortbow1d6+3", "Sword1d6+3")
            break
          case 80:
            state.tempAlly = createAlly("Slaad Tadpole", calculateRoll("3d4"), 12, 4, "1d6+2", "d20+2")
            break
          case 81:
            state.tempAlly = createAlly("Sphinx of Wonder", calculateRoll("7d4+7"), 13, 5, "1d4+3", "d20+2")
            break
          case 82:
            state.tempAlly = createAlly("Spider", calculateRoll("1d4-1"), 12, 4, "1", "d20+2")
            break
          case 83:
            state.tempAlly = createAlly("Sprite", calculateRoll("4d4"), 15, 6, "1d4+4", "d20+4", "Enchanting Bow1d4", "Invisibility")
            break
          case 84:
            state.tempAlly = createAlly("Tiger", calculateRoll("3d10+6"), 13, 5, "1d6+3", "d20+3")
            break
          case 85:
            state.tempAlly = createAlly("Venomous Snake", calculateRoll("2d4"), 12, 4, "2d4+2", "d20+2")
            break
          case 86:
            state.tempAlly = createAlly("Warhorse", calculateRoll("3d10+3"), 11, 6, "2d4+4", "d20+2")
            break
          case 87:
            state.tempAlly = createAlly("Weasel", calculateRoll("1d4-1"), 13, 5, "1", "d20+3")
            break
          case 88:
            state.tempAlly = createAlly("Wolf", calculateRoll("2d8+2"), 12, 4, "1d6+2", "d20+2")
            break
          case 89:
            state.tempAlly = createAlly("Zombie", calculateRoll("2d8+6"), 8, 3, "1d6+1", "d20-2")
            break
        }