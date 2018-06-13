// Quack! This is a duck. https://github.com/erikras/ducks-modular-redux
const LOAD = 'setTheData' // 'redux-form-examples/account/LOAD'
const SET_JWT = 'setJwt'
const SET_HEADERS = 'setHeaders'
const SET_URLS = 'setUrls'
const SET_FORMS = 'setForms'
const SET_JSONS = 'setJsons'
const SET_RAWS = 'setRaws'
const SET_SEQ = 'setSeq'
const SET_DEBUG = 'setDebug'


const reducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD:
      return { data: action.data }
    case SET_JWT:
      return { jwt: action.jwt }
    case SET_HEADERS:
      return Object.assign({}, state, { headers: action.headers });
    case SET_URLS:
      return Object.assign({}, state, { urls: action.urls });
    case SET_FORMS:
      return Object.assign({}, state, { forms: action.forms });
    case SET_JSONS:
      return Object.assign({}, state, { jsons: action.jsons });
    case SET_RAWS:
      return Object.assign({}, state, { raws: action.raws });
    case SET_SEQ:
      return Object.assign({}, state, { seq: action.seq });
    case SET_DEBUG:
      return Object.assign({}, state, { debug: action.debug });
    default:
      return state
  }
}

/**
 * Simulates data loaded into this reducer from somewhere
 */
const setJwt = jwt => ({ type: SET_JWT, jwt })
const setHeaders = headers => ({ type: SET_HEADERS, headers })
const setUrls = urls => ({ type: SET_URLS, urls })
const setForms = forms => ({ type: SET_FORMS, forms })
const setJsons = jsons => ({ type: SET_JSONS, jsons })
const setRaws = raws => ({ type: SET_RAWS, raws })
const setSeq = seq => ({ type: SET_SEQ, seq })
const setDebug = debug => ({ type: SET_DEBUG, debug })

export const load = data => ({ type: LOAD, data })
export { setJwt, setHeaders, setUrls, setForms, setJsons, setRaws, setSeq, setDebug }

export default reducer
