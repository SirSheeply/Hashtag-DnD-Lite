// RARITY TABLE
const rarityScale = [
  {name: "Junk",      value: 1.0,     minWorth: 0,      maxWorth: 50      },
  {name: "Common",    value: 0.8,     minWorth: 50,     maxWorth: 100     },
  {name: "Uncommon",  value: 0.5,     minWorth: 100,    maxWorth: 500     },
  {name: "Rare",      value: 0.25,    minWorth: 500,    maxWorth: 5000    },
  {name: "Very Rare", value: 0.125,   minWorth: 5000,   maxWorth: 50000   },
  {name: "Legendary", value: 0.0625,  minWorth: 50000,  maxWorth: 500000  },
  {name: "Unique",    value: 0.0,     minWorth: 500000, maxWorth: 5000000 }
]

/**
 * Converts between rarity names and values.
 * - If given a rarity name (string), returns its numeric value.
 * - If given a numeric value, returns the closest matching rarity name.
 * @param {string|number} givenRarity - The rarity to convert.
 * @param {boolean} toNumber - The conversion type of the rarity.
 * @returns {string|number} The converted rarity value or name, as the type.
 */
function convertRarity(givenRarity, toNumber) {
  // Passing back the givenRarity as it already is the desired type
  if ((toNumber && !isNaN(givenRarity)) || (!toNumber && isNaN(givenRarity))) {
    return givenRarity
  }

  // Convert name to number
  if (!toNumber && !isNaN(givenRarity)) {
    let lowestRarity = {name: "Junk", value: givenRarity}
    rarityScale.forEach(rarityField => {
      if (lowestRarity.value <= rarityField.value) {
        lowestRarity.name = rarityField.name
      }
    });
    return lowestRarity.name
  }

  // Else convert number to name
  const foundRarity = rarityScale.find((element) => element.name.toLowerCase() == givenRarity.toLowerCase())
  return foundRarity ? foundRarity.value : 1.0
}

/**
 * Returns worth based on rarity.
 * - If `random` is false, returns an average worth based on rarity value.
 * - If `random` is true, returns a random worth between min and max for that rarity.
 * @param {string|number} givenRarity - The rarity name or value.
 * @param {boolean} [random] - Whether to randomise within min/max worth. (false by default)
 * @returns {number} The worth of the rarity.
 */
function getRarityWorth(givenRarity, random=false) {
  // Find the rarity and return a scaled worth, or random worth
  // Use convertRarity() on givenRarity to ensure typing (name for search, number for math)
  const foundRarity = rarityScale.findIndex((element) => element.name.toLowerCase() == convertRarity(givenRarity, false).toLowerCase())
  if (!random) {
    return Math.floor(rarityScale[foundRarity].maxWorth*(1.0-convertRarity(givenRarity, true)))
  }
  return getRandomInteger(rarityScale[foundRarity].minWorth, rarityScale[foundRarity].maxWorth)
}