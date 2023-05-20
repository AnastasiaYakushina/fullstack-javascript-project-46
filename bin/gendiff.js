#!/usr/bin/env node

import { program } from 'commander';
import genDiff from '../src/compare.js';

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format <type>', 'output format', 'stylish')
  .action((filepath1, filepath2) => {
    console.log(genDiff(filepath1, filepath2, `${program.opts().format}`));
  });

program.parse();
