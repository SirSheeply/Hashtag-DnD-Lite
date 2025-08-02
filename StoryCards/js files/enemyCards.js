switch (parseInt(value)) {
          case 1:
            state.tempEnemy = createEnemy("Animated Armor", calculateRoll("6d8+6"), 18, 6, "1d6+2", "d20")
            break
          case 2:
            state.tempEnemy = createEnemy("Awakened Shrub", calculateRoll("2d+6"), 9, -3, "1d4-1", "d20-1")
            break
          case 3:
            state.tempEnemy = createEnemy("Brigand", calculateRoll("5d8+10"), 11, 6, "1d6+2", "d20")
            break
          case 4:
            state.tempEnemy = createEnemy("Black Bear", calculateRoll("3d8+6"), 11, 6, "2d4+2", "d20")
            break
          case 5:
            state.tempEnemy = createEnemy("Boar", calculateRoll("2d8+2"), 11, 4, "1d6+1", "d20")
            break
          case 6:
            state.tempEnemy = createEnemy("Cockatrice", calculateRoll("6d6+6"), 11, 1, "1d4+1", "d20+1", "Petrifying Bite1d4+1")
            break
          case 7:
            state.tempEnemy = createEnemy("Snake", calculateRoll("2d10+2"), 12, 6, "1d8+2", "d20+2", "Poison Bite2d4+1")
            break
          case 8:
            state.tempEnemy = createEnemy("Dire Wolf", calculateRoll("5d10+10"), 14, 8, "2d6+3", "d20+2")
            break
          case 9:
            state.tempEnemy = createEnemy("Ghoul", calculateRoll("5d8"), 12, 3, "2d6+2", "d20+2")
            break
          case 10:
            state.tempEnemy = createEnemy("Giant Centipede", calculateRoll("1d6+1"), 13, 1, "1d4+2", "d20+2")
            break
          case 11:
            state.tempEnemy = createEnemy("Giant Rat", calculateRoll("2d6"), 12, 2, "1d4+2", "d20+2")
            break
          case 12:
            state.tempEnemy = createEnemy("Giant Wolf Spider", calculateRoll("2d8+2"), 13, 4, "1d6+1", "d20+3", "Poison Bite1d6+8")
            break
          case 13:
            state.tempEnemy = createEnemy("Gnoll", calculateRoll("5d8"), 15, 6, "1d8+2", "d20+1")
            break
          case 14:
            state.tempEnemy = createEnemy("Goblin", calculateRoll("2d6"), 15, 3, "1d6+2", "d20+2")
            break
          case 15:
            state.tempEnemy = createEnemy("Harpy", calculateRoll("7d8+7"), 11, 4, "2d4+1", "d20+1", "Luring Song")
            break
          case 16:
            state.tempEnemy = createEnemy("Hobgoblin", calculateRoll("2d8+2"), 18, 4, "1d8+1", "d20+1")
            break
          case 17:
            state.tempEnemy = createEnemy("Kobold", calculateRoll("2d6-2"), 12, 2, "1d4+2", "d20+2")
            break
          case 18:
            state.tempEnemy = createEnemy("Orc", calculateRoll("2d8+6"), 13, 8, "1d12+3", "d20+1")
            break
          case 19:
            state.tempEnemy = createEnemy("Satyr", calculateRoll("5d8"), 15, 4, "1d8+2", "d20+3")
            break
          case 20:
            state.tempEnemy = createEnemy("Skeleton", calculateRoll("2d8+4"), 13, 5, "1d6+2", "d20+2")
            break
          case 21:
            state.tempEnemy = createEnemy("Stirge", calculateRoll("1d4"), 14, 2, "1d4+3", "d20+1", "Blood Drain2d4+6")
            break
          case 22:
            state.tempEnemy = createEnemy("Warhorse", calculateRoll("3d10+3"), 11, 10, "2d6+4", "d20+1", "Charge")
            break
          case 23:
            state.tempEnemy = createEnemy("Wolf", calculateRoll("2d+2"), 13, 6, "2d4+2", "d20+2")
            break
          case 24:
            state.tempEnemy = createEnemy("Worg", calculateRoll("4d10+4"), 13, 8, "2d6+3", "d20+1")
            break
          case 25:
            state.tempEnemy = createEnemy("Zombie", calculateRoll("3d8+9"), 8, 4, "1d6+1", "d20-2")
            break
          case 26:
            state.tempEnemy = createEnemy("Air Elemental", calculateRoll("12d10+24"), 15, 8, "2d8+5", "d20+5", "Whirlwind3d8+2")
            break
          case 27:
            state.tempEnemy = createEnemy("Basilisk", calculateRoll("8d8+16"), 15, 5, "2d6+3", "d20-1")
            break
          case 28:
            state.tempEnemy = createEnemy("Berserker", calculateRoll("9d8+27"), 13, 5, "1d12+3", "d20+1")
            break
          case 29:
            state.tempEnemy = createEnemy("Chuul", calculateRoll("11d10+33"), 16, 6, "2d6+4", "d20", "Tentacles")
            break
          case 30:
            state.tempEnemy = createEnemy("Doppelganger", calculateRoll("8d8+16"), 14, 6, "1d6+4", "d20+4", "Shapechange")
            break
          case 31:
            state.tempEnemy = createEnemy("Druid", calculateRoll("5d8+5"), 11, 4, "1d8", "d20+1", "Produce Flame3d6", "Bark Skin", "Entangle")
            break
          case 32:
            state.tempEnemy = createEnemy("Earth Elemental", calculateRoll("12d10+60"), 17, 8, "2d8+5", "d20-1", "Earth Glide")
            break
          case 33:
            state.tempEnemy = createEnemy("Fire Elemental", calculateRoll("12d10+36"), 13, 6, "2d6+3", "d20+3", "Fire Form")
            break
          case 34:
            state.tempEnemy = createEnemy("Gorgon", calculateRoll("12d8+48"), 19, 8, "2d12+5", "d20", "Petrifying Breath")
            break
          case 35:
            state.tempEnemy = createEnemy("Green Hag", calculateRoll("11d8+33"), 17, 6, "2d8+4", "d20+1", "Minor Illusion", "Invisible Passage")
            break
          case 36:
            state.tempEnemy = createEnemy("Griffon", calculateRoll("7d10+21"), 12, 6, "1d8+4", "d20+2")
            break
          case 37:
            state.tempEnemy = createEnemy("Hell Hound", calculateRoll("7d8+14"), 15, 5, "1d8+3", "d20+1", "Fire Breath6d6")
            break
          case 38:
            state.tempEnemy = createEnemy("Hill Giant", calculateRoll("10d12+40"), 13, 8, "3d8+5", "d20-1", "Throw Rock3d10+5")
            break
          case 39:
            state.tempEnemy = createEnemy("Manticore", calculateRoll("8d10+24"), 14, 5, "1d8+3", "d20+3")
            break
          case 40:
            state.tempEnemy = createEnemy("Minotaur", calculateRoll("9d10+27"), 14, 6, "2d12+4", "d20")
            break
          case 41:
            state.tempEnemy = createEnemy("Mimic", calculateRoll("9d8+18"), 12, 5, "1d8+3", "d20+1", "Grapple")
            break
          case 42:
            state.tempEnemy = createEnemy("Ogre", calculateRoll("7d10+21"), 11, 6, "2d8+4", "d20-1")
            break
          case 43:
            state.tempEnemy = createEnemy("Owlbear", calculateRoll("7d10+21"), 13, 7, "1d10+5", "initiative")
            break
          case 44:
            state.tempEnemy = createEnemy("Red Dragon Wyrmling", calculateRoll("10d8+30"), 17, 6, "1d10+4", "d20")
            break
          case 45:
            state.tempEnemy = createEnemy("Spectator", calculateRoll("6d8+12"), 14, 1, "1d6-1", "d20+2", "Confusion Ray", "Paralyzing Ray", "Fear Ray", "Wounding Ray3d10")
            break
          case 46:
            state.tempEnemy = createEnemy("Troll", calculateRoll("8d10+40"), 15, 7, "1d6+4", "d20+1")
            break
          case 47:
            state.tempEnemy = createEnemy("Wererat", calculateRoll("6d8+6"), 12, 4, "1d4+2", "d20+2")
            break
          case 48:
            state.tempEnemy = createEnemy("Werewolf", calculateRoll("9d8+18"), 12, 4, "18+2", "d20+1")
            break
          case 49:
            state.tempEnemy = createEnemy("Vampire Spawn", calculateRoll("11d8+33"), 15, 6, "2d4+3", "d20+3", "Bite3d6+3")
            break
          case 50:
            state.tempEnemy = createEnemy("Wight", calculateRoll("6d8+18"), 14, 4, "1d8+2", "d20+1", "Life Drain4d6+3")
            break
          case 51:
            state.tempEnemy = createEnemy("Aboleth", calculateRoll("18d10"), 17, 9, "6d6+15", "d20-1", "Enslave", "Psychic Drain3d6")
            break
          case 52:
            state.tempEnemy = createEnemy("Assassin", calculateRoll("12d8+24"), 15, 6, "2d6+6", "d20+3")
            break
          case 53:
            state.tempEnemy = createEnemy("Chimera", calculateRoll("12d10+48"), 14, 7, "2d6+4", "d20", "Fire Breath7d8")
            break
          case 54:
            state.tempEnemy = createEnemy("Cloud Giant", calculateRoll("16d12+96"), 14, 12, "6d8+16", "d20", "Throw Rock4d10+8", "Control Weather")
            break
          case 55:
            state.tempEnemy = createEnemy("Cyclops", calculateRoll("12d12+60"), 14, 9, "3d8+6", "d20")
            break
          case 56:
            state.tempEnemy = createEnemy("Deva", calculateRoll("16d8+64"), 17, 8, "2d6+8", "d20+4")
            break
          case 57:
            state.tempEnemy = createEnemy("Drider", calculateRoll("13d10+52"), 19, 6, "3d8", "1d10+3", "Poison Bite2d8")
            break
          case 58:
            state.tempEnemy = createEnemy("Frost Giant", calculateRoll("12d12+60"), 15, 9, "6d12+12", "d20-1")
            break
          case 59:
            state.tempEnemy = createEnemy("Hydra", calculateRoll("15d12+75"), 15, 8, "3d10+15", "d20+1")
            break
          case 60:
            state.tempEnemy = createEnemy("Insane Mage", calculateRoll("9d8"), 12, 5, "1d4+2", "d20+2", "Cone of Cold8d8", "Greater Invisibility", "Fireball8d6", "Shield")
            break
          case 61:
            state.tempEnemy = createEnemy("Medusa", calculateRoll("17d8+51"), 15, 5, "1d6+2", "d20+2", "Petrifying Gaze", "Snake Hair5d6")
            break
          case 62:
            state.tempEnemy = createEnemy("Shield Guardian", calculateRoll("15d10+60"), 17, 7, "4d6+4", "d20-1", "Shield")
            break
          case 63:
            state.tempEnemy = createEnemy("Spirit Naga", calculateRoll("10d10+20"), 15, 7, "8d8+4", "d20+3", "Dominate Person", "Lightning Bolt9d6")
            break
          case 64:
            state.tempEnemy = createEnemy("Stone Golem", calculateRoll("17d10+85"), 17, 10, "6d8+12", "d20-1")
            break
          case 65:
            state.tempEnemy = createEnemy("Treant", calculateRoll("12d12+60"), 16, 10, "6d6+12", "d20-1")
            break
          case 66:
            state.tempEnemy = createEnemy("Young Black Dragon", calculateRoll("15d10+45"), 18, 7, "4d6+8", "d20+2", "Acid Breath11d8")
            break
          case 67:
            state.tempEnemy = createEnemy("Young Blue Dragon", calculateRoll("16d10+64"), 18, 9, "12d6+10", "d20", "Lightning Breath10d10")
            break
          case 68:
            state.tempEnemy = createEnemy("Young Brass Dragon", calculateRoll("13d10+39"), 17, 7, "2d10+4", "d20", "Fire Breath12d6", "Sleep Breath")
            break
          case 69:
            state.tempEnemy = createEnemy("Young Bronze Dragon", calculateRoll("15d10+60"), 18, 8, "4d6+10", "d20+1", "Lightning Breath10d10", "Repulsion Breath")
            break
          case 70:
            state.tempEnemy = createEnemy("Young Copper Dragon", calculateRoll("14d10+42"), 17, 7, "4d6+8", "d20+1", "Acid Breath9d8", "Slowing Breath")
            break
          case 71:
            state.tempEnemy = createEnemy("Young Gold Dragon", calculateRoll("17d10+85"), 18, 10, "4d6+12", "d20+2", "Fire Breath10d10", "Weakening Breath")
            break
          case 72:
            state.tempEnemy = createEnemy("Young Green Dragon", calculateRoll("16d10+48"), 18, 7, "4d6+8", "d20+1", "Poison Breath12d6")
            break
          case 73:
            state.tempEnemy = createEnemy("Young Red Dragon", calculateRoll("17d10+85"), 18, 10, "4d6+12", "d20", "Fire Breath16d6")
            break
          case 74:
            state.tempEnemy = createEnemy("Young Silver Dragon", calculateRoll("16d10+8-"), 18, 10, "4d6+12", "d20", "Cold Breath12d8", "Paralyzing Breath")
            break
          case 75:
            state.tempEnemy = createEnemy("Young White Dragon", calculateRoll("14d10+56"), 17, 7, "2d10+4", "d20", "Cold Breath10d8", "Ice Walk")
            break
          case 76:
            state.tempEnemy = createEnemy("Adult Black Dragon", calculateRoll("17d12+85"), 19, 11, "6d6+18", "d20+2", "Acid Breath12d8", "Frightful Presence", "Wing Attack2d6+6")
            break
          case 77:
            state.tempEnemy = createEnemy("Adult Bronze Dragon", calculateRoll("17d12+102"), 19, 12, "6d6+21", "d20", "Repulsion Breath", "Lightning Breath12d10", "Wing Attack2d6+6")
            break
          case 78:
            state.tempEnemy = createEnemy("Adult Copper Dragon", calculateRoll("16d12+80"), 18, 11, "6d6+18", "d20+1", "Acid Breath12d8", "Slowing Breath", "Wing Attack2d6+6")
            break
          case 79:
            state.tempEnemy = createEnemy("Adult Green Dragon", calculateRoll("18d12+90"), 19, 11, "6d6+18", "d20+1", "Poison Breath16d6")
            break
          case 80:
            state.tempEnemy = createEnemy("Animated Statue", calculateRoll("10d12+20"), 17, 7, "2d10+4", "d20-2")
            break
          case 81:
            state.tempEnemy = createEnemy("Arch Mage", calculateRoll("18d8+18"), 12, 4, "1d4+2", "d20+14", "Time Stop", "Globe of Invulnerability", "Lightning Bolt8d6", "Banishment", "Cone of Cold8d8", "Teleport")
            break
          case 82:
            state.tempEnemy = createEnemy("Behir", calculateRoll("16d12+64"), 17, 10, "5d10+12", "d20+3", "Lightning Breath12d10", "Swallow6d6", "Constrict2d10+6")
            break
          case 83:
            state.tempEnemy = createEnemy("Boneclaw", calculateRoll("17d10+34"), 16, 8, "6d10+8", "d20+3", "Shadow Jump5d12+2", "Deadly Reach")
            break
          case 84:
            state.tempEnemy = createEnemy("Deathwolf", calculateRoll("18d8+72"), 15, 10, "6d8+15", "d20+3", "Phantom Deathwolf6d6")
            break
          case 85:
            state.tempEnemy = createEnemy("Djinni", calculateRoll("14d10+84"), 17, 9, "2d6+8", "d20+2")
            break
          case 86:
            state.tempEnemy = createEnemy("Drow Inquisitor", calculateRoll("23d8+46"), 16, 10, "12d8+24", "d20+2", "Spectral Dagger1d8+5")
            break
          case 87:
            state.tempEnemy = createEnemy("Efreeti", calculateRoll("16d10+112"), 17, 10, "4d6+12", "d20+1", "Hurl Flame5d6")
            break
          case 88:
            state.tempEnemy = createEnemy("Elder Brain", calculateRoll("20d10+100"), 10, 7, "5d8+7", "d20", "Mind Blast5d10+5")
            break
          case 89:
            state.tempEnemy = createEnemy("Erinyes", calculateRoll("18d8+72"), 18, 8, "1d10+4", "d20+3")
            break
          case 90:
            state.tempEnemy = createEnemy("Ice Devil", calculateRoll("19d10+76"), 18, 10, "6d4+15", "d20+2", "Wall of Ice")
            break
          case 91:
            state.tempEnemy = createEnemy("Jabberwock", calculateRoll("10d12+50"), 18, 10, "6d10+10", "d20+1", "Regenderation")
            break
          case 92:
            state.tempEnemy = createEnemy("Megapede", calculateRoll("13d20+39"), 15, 10, "6d10+12", "d20", "LifeDrain3d10", "Psychic Bomb5d8")
            break
          case 93:
            state.tempEnemy = createEnemy("Mummy Lord", calculateRoll("13d8+39"), 17, 9, "3d6+4", "d20", "Hold Person", "Silence", "Harm14d6", "Blinding Dust", "Whirlwind of Sand")
            break
          case 94:
            state.tempEnemy = createEnemy("Purple Worm", calculateRoll("15d20+90"), 18, 14, "6d6+18", "d20-2", "Tail Stinger12d6+19")
            break
          case 95:
            state.tempEnemy = createEnemy("Remorhaz", calculateRoll("17d12+85"), 17, 11, "6d10+7", "d20+1", "Swallow6d6")
            break
          case 96:
            state.tempEnemy = createEnemy("Skull Lord", calculateRoll("15d8+45"), 18, 8, "24d6", "d20+3", "Deathly Ray5d8+5")
            break
          case 97:
            state.tempEnemy = createEnemy("Spider Dragon", calculateRoll("15d10+5"), 23, 9, "3d12+12", "d20+8", "Silk Spit", "Spider Breath7d10")
            break
          case 98:
            state.tempEnemy = createEnemy("Storm Giant", calculateRoll("20d12+100"), 16, 14, "12d6+18", "d20+2", "Control Weather", "Lightning Strike12d8")
            break
          case 99:
            state.tempEnemy = createEnemy("Vampire", calculateRoll("17d8+68"), 16, 9, "3d8+8", "d20+4", "Charm", "Shape Change")
            break
          case 100:
            state.tempEnemy = createEnemy("Zikran", calculateRoll("18d8+18"), 12, 6, "1d4+2", "d20+2", "Time Stop", "Mind Blank", "Cone of Cold 8d8", "Lightning Bolt 8d6")
            break
          case 101:
            state.tempEnemy = createEnemy("Ancient Black Dragon", calculateRoll("21d20+147"), 22, 15, "6d10+24", "d20+2", "Acid Breath15d8", "Wing Attack2d6+8")
            break
          case 102:
            state.tempEnemy = createEnemy("Adult Blue Dragon", calculateRoll("18d12+108"), 19, 12, "6d10+21", "d20", "Lightning Breath12d10", "Wing Attack2d6+7")
            break
          case 103:
            state.tempEnemy = createEnemy("Adult Gold Dragon", calculateRoll("19d12+133"), 19, 12, "6d10+21", "d20+2", "Fire Breath 12d10", "Weakening Breath")
            break
          case 104:
            state.tempEnemy = createEnemy("Adult Silver Dragon", calculateRoll("18d12+126"), 19, 13, "6d10+24", "d20", "Cold Breath13d8", "Paralyzing Breath")
            break
          case 105:
            state.tempEnemy = createEnemy("Ancient Gold Dragon", calculateRoll("28d20+252"), 22, 15, "6d10+24", "d20+2", "Fire Breath13d10", "Weakening Breath")
            break
          case 106:
            state.tempEnemy = createEnemy("Ancient Red Dragon", calculateRoll("21d20+147"), 22, 15, "6d8+30", "d20+2", "Fire Breath26d6", "Wing Attack2d6+10")
            break
          case 107:
            state.tempEnemy = createEnemy("Androsphinx", calculateRoll("19d10+95"), 17, 12, "4d10+12", "d20", "Flame Strike8d6", "Roar", "Teleport")
            break
          case 108:
            state.tempEnemy = createEnemy("Bael", calculateRoll("18d10+90"), 18, 13, "4d8+27", "d20+3", "Awaken Greed", "Teleport", "Regenerate", "Inflict Wounds4d8+27", "Invisibility")
            break
          case 109:
            state.tempEnemy = createEnemy("Balor", calculateRoll("21d12+136"), 19, 14, "6d8+16", "d20+2", "Fire Whip 5d6+8", "Teleport")
            break
          case 110:
            state.tempEnemy = createEnemy("Baphomet", calculateRoll("22d12+176"), 22, 17, "3d10+30", "d20+2", "Curse of Brutality", "Desecration Breath20d8", "Gouging Toss2d8", "Raise Labyrinth")
            break
          case 111:
            state.tempEnemy = createEnemy("Cosmic Horror", calculateRoll("16d20+112"), 15, 14, "6d6+16", "d20", "Poison Jet4d6", "Psychic Whispers6d10")
            break
          case 112:
            state.tempEnemy = createEnemy("Death Knight", calculateRoll("19d8+95"), 20, 11, "3d8+15", "d20+2", "Hellfire Orb10d6", "Parry", "Destructive Wave5d6")
            break
          case 113:
            state.tempEnemy = createEnemy("Demogorgon", calculateRoll("32d12+256"), 22, 17, "6d12+18", "d20+2", "Beguiling Gaze", "Hypnotic Gaze")
            break
          case 114:
            state.tempEnemy = createEnemy("Dragon Turtle", calculateRoll("22d20+110"), 20, 13, "6d8+21", "d20", "Steam Breath15d6")
            break
          case 115:
            state.tempEnemy = createEnemy("Drow Matron Mother", calculateRoll("35d8+105"), 17, 10, "2d6+8", "d20+4", "Levitate", "Plane Shift", "Gate", "Geas5d10", "Guardian of Faith", "Tentacle Rod3d6", "Summon Servant")
            break
          case 116:
            state.tempEnemy = createEnemy("Flesh Colossus", calculateRoll("16d20+112"), 14, 13, "6d6+14", "d20-1", "Elemental Breath9d8")
            break
          case 117:
            state.tempEnemy = createEnemy("Kraken", calculateRoll("27d20+189"), 18, 17, "9d6+30", "d20", "Lightning Storm12d10", "Ink Cloud3d10", "Fling1d6")
            break
          case 118:
            state.tempEnemy = createEnemy("Iron Golem", calculateRoll("20d10+100"), 20, 13, "6d8+14", "d20=1", "Poison Breath10d8", "Slam3d8+7")
            break
          case 119:
            state.tempEnemy = createEnemy("Leviathan", calculateRoll("16d20+160"), 17, 16, "4d10+40", "d20+7", "Tidal Wave6d10")
            break
          case 120:
              state.tempEnemy = createEnemy("Lich", calculateRoll("18d8+54"), 17, 12, "3d6", "Acid Arrow4d4", "Fireball8d6", "Dimension Door", "Animate Dead", "Ray of Frost3d8", "Disrupt Life6d6", "Frightening Gaze", "Paralyzing Touch")
            break
          case 121:
            state.tempEnemy = createEnemy("Planetar", calculateRoll("16d10+112"), 19, 12, "4d6+7", "d20+5", "Insect Plague4d10", "Blade Barrier", )
            break
          case 122:
            state.tempEnemy = createEnemy("Raeleus", calculateRoll("19d12+190"), 22, 17, "6d6+10", "d20+5", "Musket Blast6d10+10", "Auto Pistolero10d6", "Canister Grenada4d10", "Stun Grenada", "Magic Chaff Grenada")
            break
          case 123:
            state.tempEnemy = createEnemy("Solar", calculateRoll("18d10+144"), 21, 15, "8d6+16", "d20+6", "Flying Sword", "Searing Burst8d6", "Blinding Gaze")
            break
          case 124:
            state.tempEnemy = createEnemy("Tarrasque", calculateRoll("33d20+330"), 25, 19, "20d8+50", "d20")
            break
          case 125:
            state.tempEnemy = createEnemy("Zariel", calculateRoll("40d10+360"), 21, 16, "4d8+16", "d20+7", "Horrid Touch8d10", "Immolating Gaze4d10", "Teleport")
            break
          case 126:
            state.tempEnemy = createEnemy("Commoner", calculateRoll("1d8"), 10, 2, "1d4", "d20")
            break
          case 127:
            state.tempEnemy = createEnemy("Bandit", calculateRoll("2d8+2"), 12, 3, "1d6+1", "d20+1")
            break
          case 128:
            state.tempEnemy = createEnemy("Guard", calculateRoll("2d8+2"), 16, 3, "1d6+1", "d20+1")
            break
          case 129:
            state.tempEnemy = createEnemy("Cultist", calculateRoll("2d8"), 12, 3, "1d6+1", "d20+1", "Dark Devotion")
            break
          case 130:
            state.tempEnemy = createEnemy("Acolyte", calculateRoll("2d8"), 10, 2, "1d4", "d20", "Sacred Flame1d8", "Cure Wounds")
            break
          case 131:
            state.tempEnemy = createEnemy("Apprentice", calculateRoll("3d8"), 10, 4, "1d10+2", "d20", "Burning Hands3d6")
            break
          case 132:
            state.tempEnemy = createEnemy("Witch", calculateRoll("3d8+3"), 10, 3, "1d6+2", "d20", "Ray of Sickness2d8", "Tashas Hideous Laughter", "Invisibility", "Ray of Frost2d8")//
            break
          case 133:
            state.tempEnemy = createEnemy("Buccaneer", calculateRoll("8d8+24"), 14, 5, "1d6+3", "d20+2", "Invade")
            break
          case 134:
            state.tempEnemy = createEnemy("Spy", calculateRoll("6d8"), 12, 4, "1d6+2", "d20+2", "Sneak Attack2d6+2")
            break
          case 135:
            state.tempEnemy = createEnemy("Captain", calculateRoll("10d8+20"), 15, 5, "3d6+9", "initiative")
            break
          case 136:
            state.tempEnemy = createEnemy("Bard", calculateRoll("8d8+8"), 15, 4, "1d6+2", "d20+2", "Charm Person", "Shatter3d8", "Thunderwave2d8", "Vicious Mockery1d4")
            break
          case 137:
            state.tempEnemy = createEnemy("Berserker", calculateRoll("9d8+27"), 13, 5, "1d12+3", "d20+1")
            break
          case 138:
            state.tempEnemy = createEnemy("Priest", calculateRoll("5d8+5"), 13, 2, "1d6", "d20", "Spirit Guardians3d8", "Spiritual Weapon1d8", "Guiding Bolt4d6", "Cure Wounds")
            break
          case 139:
            state.tempEnemy = createEnemy("Knight", calculateRoll("8d8+16"), 18, 5, "4d6+6", "d20", "Leadership")
            break
          case 140:
            state.tempEnemy = createEnemy("Archer", calculateRoll("10d8+30"), 16, 6, "2d8+8", "d20+4")
            break
          case 141:
            state.tempEnemy = createEnemy("Warrior", calculateRoll("6d8+12"), 16, 6, "1d8+3", "d20+1")
            break
          case 142:
            state.tempEnemy = createEnemy("Conjurer", calculateRoll("9d8"), 12, 5, "1d4+2", "d20+2", "Conjure Elemental", "Cloud Kill5d8", "Cloud of Daggers5d8", "Poison Spray1d12")
            break
          case 143:
            state.tempEnemy = createEnemy("Mage", calculateRoll("9d8"), 12, 5, "1d4+2", "d20+2", "Greater Invisibility", "Ice Storm4d6", "Fireball8d6", "Magic Missile3d4+3")
            break
          case 144:
            state.tempEnemy = createEnemy("Assassin", calculateRoll("12d8+24"), 15, 6, "2d6+6", "d20+3", "Sneak Attack6d6+6")
            break
          case 145:
            state.tempEnemy = createEnemy("Evoker", calculateRoll("12d8+12"), 12, 3, "1d6-1", "d20+2", "Chain Lightning10d8", "Wall of Ice", "Counter Spell", "Shatter3d8", "Magic Missile6d4+6")
            break
          case 146:
            state.tempEnemy = createEnemy("Necromancer", calculateRoll("12d8+12"), 12, 7, "2d4", "d20+2", "Circle of Death8d6", "Blight8d8", "Cloudkill5d8", "Animate Dead", "Chill Touch1d8")
            break
          case 147:
            state.tempEnemy = createEnemy("Champion", calculateRoll("22d8+44"), 18, 9, "6d6+15", "d20+2", "Second Wind")
            break
          case 148:
            state.tempEnemy = createEnemy("Warlord", calculateRoll("27d8+108"), 18, 9, "4d6+10", "d20+3", "Command Ally", "Frighten Foe")
            break
          case 149:
            state.tempEnemy = createEnemy("Archmage", calculateRoll("18d8+18"), 12, 6, "1d4+2", "d20+2", "Time Stop", "Mind Blank", "Lightning Bolt8d6", "Cone of Cold8d8", "Shocking Grasp1d8")
            break
          case 150:
            state.tempEnemy = createEnemy("Archdruid", calculateRoll("24d8+24"), 16, 6, "1d6+2", "d20+2", "Fire Storm7d10", "Sunbeam6d8", "Wall of Fire", "Beast Sense", "Conjure Animals")
            break
        }