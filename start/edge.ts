/*
|--------------------------------------------------------------------------
| Edge file
|--------------------------------------------------------------------------
|
| The edge file is used for registering global helpers usable inside
| edge templates.
|
*/

import edge from 'edge.js'
import { throwError } from '../app/utils/edgejs_utils.js'

edge.global('throwError', throwError)
