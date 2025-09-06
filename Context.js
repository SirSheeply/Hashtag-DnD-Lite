// Your "Context" tab should look like this

// Checkout the Guidebook examples to get an idea of other ways you can use scripting
// https://help.aidungeon.com/scripting

/* NOTE: This is the Main AI Dungeon Call
 * Keeping this space clean will allow for greater compatibility with other script systems.
 */
const modifier = (text) => {
  // Your other context modifier scripts go here (preferred)
  // Your other context modifier scripts go here (alternative)
  if (getStoryCardListByTitle("Configure Auto-Cards").length > 0) {
    [text, stop] = AutoCards("context", text, stop);
    return {text, stop};
  }
  return {text}
}

// Don't modify this part
modifier(text)