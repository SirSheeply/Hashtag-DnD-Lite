/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////// DO NOT TOUCH - DEVELOPER TEST ZONE! //////////////////////////////////////////////

function doTest(command) {
  const character = getCharacter()

  // --- Testing the Take Command ---
  character.inventory = [] // Reset inventory
  const doTake_TestCases = [
    { command: "#take",         expected: "\n[Error: Not enough parameters. See #help]\n" },
    { command: "#take 1",       expected: "\n[Error: Invalid quantity or item_name. See #help]\n" },
    { command: "#take my item", expected: "\n[Error: Invalid quantity or item_name. See #help]\n" },

    { command: "#take item",    expected: "\nYou take the item. You now have 1 item.\n" },
    { command: "#take 1 item",  expected: "\nYou take the item. You now have 2 items.\n" },
    { command: "#take 2 items", expected: "\nYou take 2 items. You now have 4 items.\n" },
    { command: "#take an item", expected: "\nYou take the item. You now have 5 items.\n" }
  ]
  const doTake_testResult = testerFunction(doTake, doTake_TestCases)
  if (doTake_testResult != null) {
    state.show = "none" // Hide output in AI Dungeon GUI
    return doTake_testResult
  }

  // --- Testing the Drop Command ---
  // character.inventory = [] // No reste, use items from last test
  const doDrop_TestCases = [
    { command: "#drop",           expected: "\n[Error: Not enough parameters. See #help]\n" },
    { command: "#drop 1",         expected: "\n[Error: Invalid quantity or item_name. See #help]\n" },
    { command: "#drop my item",   expected: "\n[Error: Invalid quantity or item_name. See #help]\n" },

    { command: "#drop item",      expected: "\nYou drop the item. You now have 4 items.\n" },
    { command: "#drop 1 item",    expected: "\nYou drop the item. You now have 3 items.\n" },
    { command: "#drop 2 item",    expected: "\nYou drop 2 items. You now have 1 item.\n" },
    // { command: "#drop 100 items", expected: "\nYou drop all 1 of the items.\n" },
    { command: "#drop all items", expected: "\nYou drop all of the items.\n" },
    { command: "#drop item",      expected: "\nYou tried to drop the item, but don't have any.\n" } 
  ]
  const doDrop_testResult = testerFunction(doDrop, doDrop_TestCases)
  if (doDrop_testResult != null) {
    state.show = "none" // Hide output in AI Dungeon GUI
    return doDrop_testResult
  }

  // --- Testing the Give Command ---
  // Create another character
  if(getCharacter("Sheep", false) == null)
    createCharacter("Sheep"); // create one
  // Add some items to our character
  character.inventory = [] // Reset inventory
  putItemIntoInventory(character, "item", 5)
  
  const doGive_TestCases = [
    { command: `#give`,                   expected: "\n[Error: Target character does not exist. See #characters]\n" },
    { command: `#give 1`,                 expected: "\n[Error: Target character does not exist. See #characters]\n" },
    { command: `#give "sheep"`,           expected: "\n[Error: Not enough parameters. See #help]\n" },
    { command: `#give "sheep" my item`,   expected: "\n[Error: Invalid quantity or item_name. See #help]\n" }, 

    { command: `#give "sheep" item`,      expected: "\nYou give Sheep the item. You now have 4 items.\n" }, 
    { command: `#give "sheep" 1 item`,    expected: "\nYou give Sheep the item. You now have 3 items.\n" },
    { command: `#give "sheep" 2 items`,   expected: "\nYou give Sheep 2 items. You now have 1 item.\n" }, 
    // { command: `#give "sheep" 100 items`, expected: "\nYou give Sheep all 3 of the items.\n" }, 
    { command: `#give "sheep" all items`, expected: "\nYou give Sheep all of the items.\n" },
    { command: `#give "sheep" item`,      expected: "\nYou tried to give Sheep the item, but don't have any.\n" } 
  ]
  const doGive_testResult = testerFunction(doGive, doGive_TestCases)
  if (doGive_testResult != null) {
    state.show = "none" // Hide output in AI Dungeon GUI
    return doGive_testResult
  }

  // --- Testing the Buy Command ---
  // Add some gold to our character
  character.inventory = [] // Reset inventory
  putItemIntoInventory(character, "gold", 4)
  
  const doBuy_TestCases = [
    //<>> Invlaid <<>
    { command: "#buy",                      expected: "\n[Error: Invalid parameters. See #help]\n" },
    { command: "#buy 5",                    expected: "\n[Error: Invalid parameters. See #help]\n" },
    { command: "#buy item",                 expected: "\n[Error: Invalid parameters. See #help]\n" },
    { command: "#buy 5 item",               expected: "\n[Error: Invalid parameters. See #help]\n" },
    { command: "#buy item 1",               expected: "\n[Error: Invalid parameters. See #help]\n" },
    { command: "#buy 5 2 3",                expected: "\n[Error: Invalid parameters. See #help]\n" },
    { command: "#buy 5 2 item",             expected: "\n[Error: Invalid parameters. See #help]\n" },
    { command: "#buy 5 item 3",             expected: "\n[Error: Invalid parameters. See #help]\n" },
    { command: "#buy item 2 3",             expected: "\n[Error: Invalid parameters. See #help]\n" },
    { command: "#buy item gold 3",          expected: "\n[Error: Invalid parameters. See #help]\n" },
    { command: "#buy item gold fish",       expected: "\n[Error: Invalid parameters. See #help]\n" },
    { command: "#buy 5 2 3 4",              expected: "\n[Error: Invalid parameters. See #help]\n" },
    { command: "#buy 5 2 3 item",           expected: "\n[Error: Invalid parameters. See #help]\n" },
    { command: "#buy 5 2 item 4",           expected: "\n[Error: Invalid parameters. See #help]\n" },
    { command: "#buy 5 2 item gold",        expected: "\n[Error: Invalid parameters. See #help]\n" },
    { command: "#buy 5 item 2 4",           expected: "\n[Error: Invalid parameters. See #help]\n" },
    { command: "#buy 5 item gold 4",        expected: "\n[Error: Invalid parameters. See #help]\n" },
    { command: "#buy 5 item gold fish",     expected: "\n[Error: Invalid parameters. See #help]\n" },
    { command: "#buy item 2 3 4",           expected: "\n[Error: Invalid parameters. See #help]\n" },
    { command: "#buy item 2 3 gold",        expected: "\n[Error: Invalid parameters. See #help]\n" },
    { command: "#buy item 2 gold 4",        expected: "\n[Error: Invalid parameters. See #help]\n" },
    { command: "#buy item 2 gold fish",     expected: "\n[Error: Invalid parameters. See #help]\n" },
    { command: "#buy item gold 3 4",        expected: "\n[Error: Invalid parameters. See #help]\n" },
    { command: "#buy item gold 3 fish",     expected: "\n[Error: Invalid parameters. See #help]\n" },
    { command: "#buy item gold fish 4",     expected: "\n[Error: Invalid parameters. See #help]\n" },
    { command: "#buy item gold fish bowl",  expected: "\n[Error: Invalid parameters. See #help]\n" },
    // <>> No longer valid - no optional sell quantity <<>
    { command: "#buy item gold",            expected: "\n[Error: Invalid parameters. See #help]\n" },
    { command: "#buy 5 item gold",          expected: "\n[Error: Invalid parameters. See #help]\n" },
    // <>> Valid commands <<>
    { command: "#buy item 2 gold",          expected: "\nYou buy one item for 2 gold. You now have 1 item, and now have 2 gold remaining.\n" },
    { command: "#buy item 5 gold",          expected: "\nYou tried to buy one item for 5 gold, but don't have enough gold.\n" },
    { command: "#buy 5 item 2 gold",        expected: "\nYou buy 5 items for all 2 of your gold. You now have 6 items, and now have no more gold.\n" },
    // No Gold
    { command: "#buy an item for 1 gold",   expected: "\nYou tried to buy one item for one gold, but don't have any gold.\n" }
  ]
  const doBuy_testResult = testerFunction(doBuy, doBuy_TestCases)
  if (doBuy_testResult != null) {
    state.show = "none" // Hide output in AI Dungeon GUI
    return doBuy_testResult
  }

  // --- Testing the Sell Command ---
  // Add some gold to our character
  character.inventory = [] // Reset inventory
  putItemIntoInventory(character, "item", 3)
  
  const doSell_TestCases = [
    //<>> Invlaid <<>
    { command: "#sell",                      expected: "\n[Error: Invalid parameters. See #help]\n" },
    { command: "#sell 5",                    expected: "\n[Error: Invalid parameters. See #help]\n" },
    { command: "#sell item",                 expected: "\n[Error: Invalid parameters. See #help]\n" },
    { command: "#sell 5 item",               expected: "\n[Error: Invalid parameters. See #help]\n" },
    { command: "#sell item 1",               expected: "\n[Error: Invalid parameters. See #help]\n" },
    { command: "#sell 5 2 3",                expected: "\n[Error: Invalid parameters. See #help]\n" },
    { command: "#sell 5 2 item",             expected: "\n[Error: Invalid parameters. See #help]\n" },
    { command: "#sell 5 item 3",             expected: "\n[Error: Invalid parameters. See #help]\n" },
    { command: "#sell item 2 3",             expected: "\n[Error: Invalid parameters. See #help]\n" },
    { command: "#sell item gold 3",          expected: "\n[Error: Invalid parameters. See #help]\n" },
    { command: "#sell item gold fish",       expected: "\n[Error: Invalid parameters. See #help]\n" },
    { command: "#sell 5 2 3 4",              expected: "\n[Error: Invalid parameters. See #help]\n" },
    { command: "#sell 5 2 3 item",           expected: "\n[Error: Invalid parameters. See #help]\n" },
    { command: "#sell 5 2 item 4",           expected: "\n[Error: Invalid parameters. See #help]\n" },
    { command: "#sell 5 2 item gold",        expected: "\n[Error: Invalid parameters. See #help]\n" },
    { command: "#sell 5 item 2 4",           expected: "\n[Error: Invalid parameters. See #help]\n" },
    { command: "#sell 5 item gold 4",        expected: "\n[Error: Invalid parameters. See #help]\n" },
    { command: "#sell 5 item gold fish",     expected: "\n[Error: Invalid parameters. See #help]\n" },
    { command: "#sell item 2 3 4",           expected: "\n[Error: Invalid parameters. See #help]\n" },
    { command: "#sell item 2 3 gold",        expected: "\n[Error: Invalid parameters. See #help]\n" },
    { command: "#sell item 2 gold 4",        expected: "\n[Error: Invalid parameters. See #help]\n" },
    { command: "#sell item 2 gold fish",     expected: "\n[Error: Invalid parameters. See #help]\n" },
    { command: "#sell item gold 3 4",        expected: "\n[Error: Invalid parameters. See #help]\n" },
    { command: "#sell item gold 3 fish",     expected: "\n[Error: Invalid parameters. See #help]\n" },
    { command: "#sell item gold fish 4",     expected: "\n[Error: Invalid parameters. See #help]\n" },
    { command: "#sell item gold fish bowl",  expected: "\n[Error: Invalid parameters. See #help]\n" },
    // <>> No longer valid - no optional sell quantity <<>
    { command: "#sell item gold",            expected: "\n[Error: Invalid parameters. See #help]\n" },
    { command: "#sell 5 item gold",          expected: "\n[Error: Invalid parameters. See #help]\n" },
    // <>> Valid commands <<>
    { command: "#sell item 2 gold",          expected: "\nYou sell, and aquire 2 gold for one item. You now have 2 gold, and now have 2 items remaining.\n" },
    { command: "#sell 5 item 2 gold",        expected: "\nYou sell, and tried to aquire 2 gold for 5 items, but don't have enough items.\n" },
    { command: "#sell 2 item 2 gold",        expected: "\nYou sell, and aquire 2 gold for all 2 of your items. You now have 4 gold, and now have no more items.\n" },
    // No Gold
    { command: "#sell an item for 1 gold",   expected: "\nYou sell, and tried to aquire one gold for one item, but don't have any items.\n" }
  ]
  const doSell_testResult = testerFunction(doSell, doSell_TestCases)
  if (doSell_testResult != null) {
    return [doSell_testResult, false]
  }

  // --- Testing Result PASSED ---
  state.show = "none" // Hide output in AI Dungeon GUI
  return ["\nALL Test Cases Passed!\n", true]
}

function testerFunction (func, testCases) {
  for (const test_case of testCases) {
    let test_result, test_flag = null;
    [test_result, test_flag] = func(extractCommand(test_case.command))
    if (test_result !== test_case.expected) {
      return (
        `FAILED Test Case: ${test_case.command}\n` +
        `--> Expected: ${test_case.expected}\n` +
        `--> Received: ${test_result}`
      )
    }
    log(`SUCCESS: ${test_case.command}`)
  }
  return null
}

function extractCommand(text) {
  // Extract the command portion of the input after #
  // Sanitize and extract just the base command phrase
  let command = text.substring(text.search(/#/) + 1)
  let commandName = getCommandName(command)?.toLowerCase().replaceAll(/[^a-z0-9\s]*/gi, "").trim()
  if (!commandName) {
    return "\n[Error: Invalid or missing command.]\n"
  }
  return command
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */