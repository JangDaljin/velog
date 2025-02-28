import { TSESLint } from '@typescript-eslint/utils';
import TsEsLint from 'typescript-eslint';
import RootEsLInt from '../../eslint.config.mjs';

export default TsEsLint.config({
  extends: [...RootEsLInt],
}) satisfies TSESLint.FlatConfig.ConfigArray;
