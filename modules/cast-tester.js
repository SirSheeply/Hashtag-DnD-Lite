function doCast(caster, spellName, spellLevel, spellData, targetName) {
  let score = 15 // Mocked, can be edited to be 1 or 20 for crit
  let hitResult = false // Mocked, can be edited to be true or false
  let commandName = "cast" // Mocked, can be "activate" or "cast"
  
  // Spell card smartly selects the highest possible variation based on spellLevel
  // (i.e. spellLevel = 4 but card only has {2, 5}, then 2 is chosen)
  const spellCard = (spellData?.length > 0) ? spellData.reduce((lowest, current) => current.level <= spellLevel && current.level > lowest.level ? current : lowest) : null;
  const minimumLevel = (spellData?.length > 0) ? spellData.reduce((lowest, current) => current.level < lowest.level ? current : lowest).level : 0;
  
  // PRINT LOGIC
  const critText = (score == 1) || (score == 20) ? "critically " : ""
  const failText = (score == 1) ? "backfires" : (spellCard?.attack ? "misses" : "fails")
  const resultText = critText + (hitResult ? `succeeds` : failText)
  
  const levelText =  (spellLevel || minimumLevel > 1) ? ` at level ${spellLevel ?? minimumLevel}` : ""
  const flavorText = (spellCard) ? ` ${spellCard.flavor}` : (spellCard?.attack ? " at" : " targeting")
  const targetText = (targetName) ? ` ${targetName}` : " the target"
  const spellText = spellCard?.type ?? "action"
  
  // EXMAPLE: 'You cast fireball at level 4, blasting twin fireballs at the goblin. The spell misses!'
  text = `${caster.name} ${commandName} ${spellName}${levelText}`
  text += (spellCard || targetName) ? `,${flavorText}${targetText}` : ""
  text += `. The ${spellText} ${resultText}!`
  
  return text
}

const caster = {name:"You"}
const spellName1 = "fireball"
const spellData1 = [{level:2, flavor:"blasting a fireball at", attack:true, type:"spell"},{level:4, flavor:"blasting twin fireballs at", attack:true, type:"spell"}]
const targetName1 = "the goblin"

console.log(doCast(caster, spellName1, 4, spellData1, targetName1))
console.log(doCast(caster, spellName1, null, spellData1, targetName1))
console.log(doCast(caster, spellName1, 4, spellData1, null))
console.log(doCast(caster, spellName1, null, spellData1, null))
console.log(doCast(caster, spellName1, 4, null, targetName1))
console.log(doCast(caster, spellName1, 4, null, null))
console.log(doCast(caster, spellName1, null, null, targetName1))
console.log(doCast(caster, spellName1, null, null, null))
console.log("\n\n\n")

const spellName2 = "locksmith"
const spellData2 = [{level:1, flavor:"aiming to unlock", attack:false, type:"power"}]
const targetName2 = "the door"
console.log(doCast(caster, spellName2, 4, spellData2, targetName2))
console.log(doCast(caster, spellName2, null, spellData2, targetName2))
console.log(doCast(caster, spellName2, 4, spellData2, null))
console.log(doCast(caster, spellName2, null, spellData2, null))
console.log(doCast(caster, spellName2, 4, null, targetName2))
console.log(doCast(caster, spellName2, 4, null, null))
console.log(doCast(caster, spellName2, null, null, targetName2))
console.log(doCast(caster, spellName2, null, null, null))