// DO NOT TOUCH - DEVELOPER TEST ZONE!
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

function doTest(command) {
  const character = getCharacter()

  // --- Testing the Take Command ---
  character.inventory = [] // Reset inventory
  const doTake_TestCases = [
    { command: "#take",         expected: "\n[Error: Not enough parameters. See #help]\n" },
    { command: "#take 1",       expected: "\n[Error: Invalid item_name. See #help]\n" },
    { command: "#take my item", expected: "\n[Error: Invalid quantity. See #help]\n" },

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
    { command: "#drop 1",         expected: "\n[Error: Invalid item_name. See #help]\n" },
    { command: "#drop my item",   expected: "\n[Error: Invalid quantity. See #help]\n" },

    { command: "#drop item",      expected: "\nYou drop the item. You now have 4 items.\n" },
    { command: "#drop 1 item",    expected: "\nYou drop the item. You now have 3 items.\n" },
    { command: "#drop 2 item",    expected: "\nYou drop 2 items. You now have 1 item.\n" },
    { command: "#drop all items", expected: "\nYou drop all of the items.\n" },
    { command: "#drop item",      expected: "\nYou tried to drop the item, but don't have any.\n" }
    
  ]
  const doDrop_testResult = testerFunction(doDrop, doDrop_TestCases)
  if (doDrop_testResult != null) {
    state.show = "none" // Hide output in AI Dungeon GUI
    return doDrop_testResult
  }

  // --- Testing Result PASSED ---
  state.show = "none" // Hide output in AI Dungeon GUI
  return "\nALL Test Cases Passed!\n"
}

function testerFunction (func, testCases) {
  for (const test_case of testCases) {
    try {
      let test_result = func(extractCommand(test_case.command))
      if (test_result !== test_case.expected) {
        return (
          `FAILED Test Case: ${test_case.command}\n` +
          `--> Expected: ${test_case.expected}\n` +
          `--> Received: ${test_result}`
        )
      }
    } catch (err) {
      return `ERROR in Test Case: ${test_case.command}\n--> ${err.message}`
    }
  }
  return null
}

function extractCommand(text) {
  // Extract the command portion of the input after #
  // Sanitize and extract just the base command phrase
  let command = text.substring(text.search(/#/) + 1)
  let commandName = getCommandName(command)?.toLowerCase().replaceAll(/[^a-z0-9\s]*/gi, "").trim()
  if (!commandName) {
    text = "\n[Error: Invalid or missing command.]\n"
    return text
  }
  return command
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */