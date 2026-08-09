#!/usr/bin/env node
// svtui CLI — placeholder build. `svtui init` / `svtui add <component>` arrive in 0.1.0.
const VERSION = '0.0.1';

const args = process.argv.slice(2);
const cmd = args[0];

if (!cmd || cmd === '-h' || cmd === '--help' || cmd === 'help') {
	console.log(`svtui ${VERSION} — terminal-aesthetic Svelte components

  svtui init            scaffold the token preset into your project
  svtui add <component>  add a self-contained component to your project
  svtui list            list available components
  svtui --version
  svtui --help

Note: this is a placeholder release to hold the name. The init/add
commands ship in 0.1.0. See https://github.com/addisonking/svtui`);
	process.exit(0);
}

if (cmd === '-v' || cmd === '--version') {
	console.log(VERSION);
	process.exit(0);
}

console.log(`svtui ${VERSION}: "${cmd}" is not implemented yet.`);
console.log('The init/add commands ship in 0.1.0.');
console.log('See https://github.com/addisonking/svtui');
process.exit(1);
