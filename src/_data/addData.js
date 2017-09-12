/* Merges All Individual Account States And Saves Them To AsyncStorage */

export function saveProgress(...states) {
  Object.assign({}, states)
}

function saveProgress(...states) {
  return states
}

saveProgress('one','two','three')