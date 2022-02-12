export function ParseStringVar(varName: string): string | boolean {
  if (varName.match(/^'[^']+?'$/) || varName.match(/^"[^"]+?"$/)) {
    return varName.substring(1, varName.length - 1)
  }
  return false
}
