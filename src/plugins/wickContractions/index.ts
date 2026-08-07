import type {LoadContext, Plugin} from '@docusaurus/types';

export default function wickContractionsPlugin(
  _context: LoadContext,
): Plugin {
  return {
    name: 'wick-contractions',
    getClientModules() {
      return ['./client'];
    },
  };
}
