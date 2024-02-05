export function dbTimeforHuman(str) {
  return str.replace('T', ' ').substring(0, 16);
}
