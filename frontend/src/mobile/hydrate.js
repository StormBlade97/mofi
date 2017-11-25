
import localForage from 'localforage';
import { create } from 'mobx-persist'

const hydrate = create({
  storage: localForage,
  jsonify: false
})

export default hydrate;
