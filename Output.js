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
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////// DND HASH OUTPUT FUNCTION ////////////////////////////////////////////////////

/**
* - This is the main Hashtag DND function!
* - It handles output text, and states.
* - Handles step flows, forms as well.
* @function
* @param {string} [text] Raw output text from AI Dungeon
* @returns {string} Returns new output text of any flows or states, if any.
*/
function DNDHash_output(text) {
  if (state.show == null) return text

  // I believe this prepends a newline if the story action was used?
  const type = history[history.length - 1].type
  const originalText = text
  text = type != "story" ? "" : history[history.length - 1].text.endsWith("\n") ? "" : "\n"
  
  switch (state.show) {
    case "steps": // Special forms that operate over multiple inputs/outputs
      text += handleStepProcess(text, outputMode);
      break
    case "showText": // A basic display of text into the output
      text += state.showText;
      break
    case "prefix": // Special case where text is prefixed to AI Dungeon output
      text = (state.prefix ?? "") + originalText
      break
    case "none": // Displays nothing " " blank space is needed for AI Dungeon to output
      text = " "
      break
    default: // Fall back on AI Dungeon output only
      text = originalText
      break
  }
  // We clear the showing states to avoid getting stuck
  state.show = null
  state.showText = null
  state.prefix = null
  return text
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

// AI DUNGEON -- Don't modify this part
modifier(text)