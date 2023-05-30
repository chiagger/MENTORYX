/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@supabase/functions-js/dist/module/FunctionsClient.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@supabase/functions-js/dist/module/FunctionsClient.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FunctionsClient: () => (/* binding */ FunctionsClient)
/* harmony export */ });
/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helper */ "./node_modules/@supabase/functions-js/dist/module/helper.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./types */ "./node_modules/@supabase/functions-js/dist/module/types.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


class FunctionsClient {
    constructor(url, { headers = {}, customFetch, } = {}) {
        this.url = url;
        this.headers = headers;
        this.fetch = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.resolveFetch)(customFetch);
    }
    /**
     * Updates the authorization header
     * @param token - the new jwt token sent in the authorisation header
     */
    setAuth(token) {
        this.headers.Authorization = `Bearer ${token}`;
    }
    /**
     * Invokes a function
     * @param functionName - The name of the Function to invoke.
     * @param options - Options for invoking the Function.
     */
    invoke(functionName, options = {}) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { headers, method, body: functionArgs } = options;
                let _headers = {};
                let body;
                if (functionArgs &&
                    ((headers && !Object.prototype.hasOwnProperty.call(headers, 'Content-Type')) || !headers)) {
                    if ((typeof Blob !== 'undefined' && functionArgs instanceof Blob) ||
                        functionArgs instanceof ArrayBuffer) {
                        // will work for File as File inherits Blob
                        // also works for ArrayBuffer as it is the same underlying structure as a Blob
                        _headers['Content-Type'] = 'application/octet-stream';
                        body = functionArgs;
                    }
                    else if (typeof functionArgs === 'string') {
                        // plain string
                        _headers['Content-Type'] = 'text/plain';
                        body = functionArgs;
                    }
                    else if (typeof FormData !== 'undefined' && functionArgs instanceof FormData) {
                        // don't set content-type headers
                        // Request will automatically add the right boundary value
                        body = functionArgs;
                    }
                    else {
                        // default, assume this is JSON
                        _headers['Content-Type'] = 'application/json';
                        body = JSON.stringify(functionArgs);
                    }
                }
                const response = yield this.fetch(`${this.url}/${functionName}`, {
                    method: method || 'POST',
                    // headers priority is (high to low):
                    // 1. invoke-level headers
                    // 2. client-level headers
                    // 3. default Content-Type header
                    headers: Object.assign(Object.assign(Object.assign({}, _headers), this.headers), headers),
                    body,
                }).catch((fetchError) => {
                    throw new _types__WEBPACK_IMPORTED_MODULE_1__.FunctionsFetchError(fetchError);
                });
                const isRelayError = response.headers.get('x-relay-error');
                if (isRelayError && isRelayError === 'true') {
                    throw new _types__WEBPACK_IMPORTED_MODULE_1__.FunctionsRelayError(response);
                }
                if (!response.ok) {
                    throw new _types__WEBPACK_IMPORTED_MODULE_1__.FunctionsHttpError(response);
                }
                let responseType = ((_a = response.headers.get('Content-Type')) !== null && _a !== void 0 ? _a : 'text/plain').split(';')[0].trim();
                let data;
                if (responseType === 'application/json') {
                    data = yield response.json();
                }
                else if (responseType === 'application/octet-stream') {
                    data = yield response.blob();
                }
                else if (responseType === 'multipart/form-data') {
                    data = yield response.formData();
                }
                else {
                    // default to text
                    data = yield response.text();
                }
                return { data, error: null };
            }
            catch (error) {
                return { data: null, error };
            }
        });
    }
}
//# sourceMappingURL=FunctionsClient.js.map

/***/ }),

/***/ "./node_modules/@supabase/functions-js/dist/module/helper.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@supabase/functions-js/dist/module/helper.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   resolveFetch: () => (/* binding */ resolveFetch)
/* harmony export */ });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const resolveFetch = (customFetch) => {
    let _fetch;
    if (customFetch) {
        _fetch = customFetch;
    }
    else if (typeof fetch === 'undefined') {
        _fetch = (...args) => __awaiter(void 0, void 0, void 0, function* () { return yield (yield Promise.resolve(/*! import() */).then(__webpack_require__.t.bind(__webpack_require__, /*! cross-fetch */ "./node_modules/cross-fetch/dist/browser-ponyfill.js", 23))).fetch(...args); });
    }
    else {
        _fetch = fetch;
    }
    return (...args) => _fetch(...args);
};
//# sourceMappingURL=helper.js.map

/***/ }),

/***/ "./node_modules/@supabase/functions-js/dist/module/types.js":
/*!******************************************************************!*\
  !*** ./node_modules/@supabase/functions-js/dist/module/types.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FunctionsError: () => (/* binding */ FunctionsError),
/* harmony export */   FunctionsFetchError: () => (/* binding */ FunctionsFetchError),
/* harmony export */   FunctionsHttpError: () => (/* binding */ FunctionsHttpError),
/* harmony export */   FunctionsRelayError: () => (/* binding */ FunctionsRelayError)
/* harmony export */ });
class FunctionsError extends Error {
    constructor(message, name = 'FunctionsError', context) {
        super(message);
        super.name = name;
        this.context = context;
    }
}
class FunctionsFetchError extends FunctionsError {
    constructor(context) {
        super('Failed to send a request to the Edge Function', 'FunctionsFetchError', context);
    }
}
class FunctionsRelayError extends FunctionsError {
    constructor(context) {
        super('Relay Error invoking the Edge Function', 'FunctionsRelayError', context);
    }
}
class FunctionsHttpError extends FunctionsError {
    constructor(context) {
        super('Edge Function returned a non-2xx status code', 'FunctionsHttpError', context);
    }
}
//# sourceMappingURL=types.js.map

/***/ }),

/***/ "./node_modules/@supabase/gotrue-js/dist/module/GoTrueAdminApi.js":
/*!************************************************************************!*\
  !*** ./node_modules/@supabase/gotrue-js/dist/module/GoTrueAdminApi.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GoTrueAdminApi)
/* harmony export */ });
/* harmony import */ var _lib_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/fetch */ "./node_modules/@supabase/gotrue-js/dist/module/lib/fetch.js");
/* harmony import */ var _lib_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/helpers */ "./node_modules/@supabase/gotrue-js/dist/module/lib/helpers.js");
/* harmony import */ var _lib_errors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/errors */ "./node_modules/@supabase/gotrue-js/dist/module/lib/errors.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (undefined && undefined.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};



class GoTrueAdminApi {
    constructor({ url = '', headers = {}, fetch, }) {
        this.url = url;
        this.headers = headers;
        this.fetch = (0,_lib_helpers__WEBPACK_IMPORTED_MODULE_1__.resolveFetch)(fetch);
        this.mfa = {
            listFactors: this._listFactors.bind(this),
            deleteFactor: this._deleteFactor.bind(this),
        };
    }
    /**
     * Removes a logged-in session.
     * @param jwt A valid, logged-in JWT.
     */
    signOut(jwt) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0,_lib_fetch__WEBPACK_IMPORTED_MODULE_0__._request)(this.fetch, 'POST', `${this.url}/logout`, {
                    headers: this.headers,
                    jwt,
                    noResolveJson: true,
                });
                return { data: null, error: null };
            }
            catch (error) {
                if ((0,_lib_errors__WEBPACK_IMPORTED_MODULE_2__.isAuthError)(error)) {
                    return { data: null, error };
                }
                throw error;
            }
        });
    }
    /**
     * Sends an invite link to an email address.
     * @param email The email address of the user.
     * @param options Additional options to be included when inviting.
     */
    inviteUserByEmail(email, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0,_lib_fetch__WEBPACK_IMPORTED_MODULE_0__._request)(this.fetch, 'POST', `${this.url}/invite`, {
                    body: { email, data: options.data },
                    headers: this.headers,
                    redirectTo: options.redirectTo,
                    xform: _lib_fetch__WEBPACK_IMPORTED_MODULE_0__._userResponse,
                });
            }
            catch (error) {
                if ((0,_lib_errors__WEBPACK_IMPORTED_MODULE_2__.isAuthError)(error)) {
                    return { data: { user: null }, error };
                }
                throw error;
            }
        });
    }
    /**
     * Generates email links and OTPs to be sent via a custom email provider.
     * @param email The user's email.
     * @param options.password User password. For signup only.
     * @param options.data Optional user metadata. For signup only.
     * @param options.redirectTo The redirect url which should be appended to the generated link
     */
    generateLink(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { options } = params, rest = __rest(params, ["options"]);
                const body = Object.assign(Object.assign({}, rest), options);
                if ('newEmail' in rest) {
                    // replace newEmail with new_email in request body
                    body.new_email = rest === null || rest === void 0 ? void 0 : rest.newEmail;
                    delete body['newEmail'];
                }
                return yield (0,_lib_fetch__WEBPACK_IMPORTED_MODULE_0__._request)(this.fetch, 'POST', `${this.url}/admin/generate_link`, {
                    body: body,
                    headers: this.headers,
                    xform: _lib_fetch__WEBPACK_IMPORTED_MODULE_0__._generateLinkResponse,
                    redirectTo: options === null || options === void 0 ? void 0 : options.redirectTo,
                });
            }
            catch (error) {
                if ((0,_lib_errors__WEBPACK_IMPORTED_MODULE_2__.isAuthError)(error)) {
                    return {
                        data: {
                            properties: null,
                            user: null,
                        },
                        error,
                    };
                }
                throw error;
            }
        });
    }
    // User Admin API
    /**
     * Creates a new user.
     * This function should only be called on a server. Never expose your `service_role` key in the browser.
     */
    createUser(attributes) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0,_lib_fetch__WEBPACK_IMPORTED_MODULE_0__._request)(this.fetch, 'POST', `${this.url}/admin/users`, {
                    body: attributes,
                    headers: this.headers,
                    xform: _lib_fetch__WEBPACK_IMPORTED_MODULE_0__._userResponse,
                });
            }
            catch (error) {
                if ((0,_lib_errors__WEBPACK_IMPORTED_MODULE_2__.isAuthError)(error)) {
                    return { data: { user: null }, error };
                }
                throw error;
            }
        });
    }
    /**
     * Get a list of users.
     *
     * This function should only be called on a server. Never expose your `service_role` key in the browser.
     * @param params An object which supports `page` and `perPage` as numbers, to alter the paginated results.
     */
    listUsers(params) {
        var _a, _b, _c, _d, _e, _f, _g;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pagination = { nextPage: null, lastPage: 0, total: 0 };
                const response = yield (0,_lib_fetch__WEBPACK_IMPORTED_MODULE_0__._request)(this.fetch, 'GET', `${this.url}/admin/users`, {
                    headers: this.headers,
                    noResolveJson: true,
                    query: {
                        page: (_b = (_a = params === null || params === void 0 ? void 0 : params.page) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : '',
                        per_page: (_d = (_c = params === null || params === void 0 ? void 0 : params.perPage) === null || _c === void 0 ? void 0 : _c.toString()) !== null && _d !== void 0 ? _d : '',
                    },
                    xform: _lib_fetch__WEBPACK_IMPORTED_MODULE_0__._noResolveJsonResponse,
                });
                if (response.error)
                    throw response.error;
                const users = yield response.json();
                const total = (_e = response.headers.get('x-total-count')) !== null && _e !== void 0 ? _e : 0;
                const links = (_g = (_f = response.headers.get('link')) === null || _f === void 0 ? void 0 : _f.split(',')) !== null && _g !== void 0 ? _g : [];
                if (links.length > 0) {
                    links.forEach((link) => {
                        const page = parseInt(link.split(';')[0].split('=')[1].substring(0, 1));
                        const rel = JSON.parse(link.split(';')[1].split('=')[1]);
                        pagination[`${rel}Page`] = page;
                    });
                    pagination.total = parseInt(total);
                }
                return { data: Object.assign(Object.assign({}, users), pagination), error: null };
            }
            catch (error) {
                if ((0,_lib_errors__WEBPACK_IMPORTED_MODULE_2__.isAuthError)(error)) {
                    return { data: { users: [] }, error };
                }
                throw error;
            }
        });
    }
    /**
     * Get user by id.
     *
     * @param uid The user's unique identifier
     *
     * This function should only be called on a server. Never expose your `service_role` key in the browser.
     */
    getUserById(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0,_lib_fetch__WEBPACK_IMPORTED_MODULE_0__._request)(this.fetch, 'GET', `${this.url}/admin/users/${uid}`, {
                    headers: this.headers,
                    xform: _lib_fetch__WEBPACK_IMPORTED_MODULE_0__._userResponse,
                });
            }
            catch (error) {
                if ((0,_lib_errors__WEBPACK_IMPORTED_MODULE_2__.isAuthError)(error)) {
                    return { data: { user: null }, error };
                }
                throw error;
            }
        });
    }
    /**
     * Updates the user data.
     *
     * @param attributes The data you want to update.
     *
     * This function should only be called on a server. Never expose your `service_role` key in the browser.
     */
    updateUserById(uid, attributes) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0,_lib_fetch__WEBPACK_IMPORTED_MODULE_0__._request)(this.fetch, 'PUT', `${this.url}/admin/users/${uid}`, {
                    body: attributes,
                    headers: this.headers,
                    xform: _lib_fetch__WEBPACK_IMPORTED_MODULE_0__._userResponse,
                });
            }
            catch (error) {
                if ((0,_lib_errors__WEBPACK_IMPORTED_MODULE_2__.isAuthError)(error)) {
                    return { data: { user: null }, error };
                }
                throw error;
            }
        });
    }
    /**
     * Delete a user. Requires a `service_role` key.
     *
     * @param id The user id you want to remove.
     * @param shouldSoftDelete If true, then the user will be soft-deleted from the auth schema.
     * Defaults to false for backward compatibility.
     *
     * This function should only be called on a server. Never expose your `service_role` key in the browser.
     */
    deleteUser(id, shouldSoftDelete = false) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0,_lib_fetch__WEBPACK_IMPORTED_MODULE_0__._request)(this.fetch, 'DELETE', `${this.url}/admin/users/${id}`, {
                    headers: this.headers,
                    body: {
                        should_soft_delete: shouldSoftDelete,
                    },
                    xform: _lib_fetch__WEBPACK_IMPORTED_MODULE_0__._userResponse,
                });
            }
            catch (error) {
                if ((0,_lib_errors__WEBPACK_IMPORTED_MODULE_2__.isAuthError)(error)) {
                    return { data: { user: null }, error };
                }
                throw error;
            }
        });
    }
    _listFactors(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data, error } = yield (0,_lib_fetch__WEBPACK_IMPORTED_MODULE_0__._request)(this.fetch, 'GET', `${this.url}/admin/users/${params.userId}/factors`, {
                    headers: this.headers,
                    xform: (factors) => {
                        return { data: { factors }, error: null };
                    },
                });
                return { data, error };
            }
            catch (error) {
                if ((0,_lib_errors__WEBPACK_IMPORTED_MODULE_2__.isAuthError)(error)) {
                    return { data: null, error };
                }
                throw error;
            }
        });
    }
    _deleteFactor(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield (0,_lib_fetch__WEBPACK_IMPORTED_MODULE_0__._request)(this.fetch, 'DELETE', `${this.url}/admin/users/${params.userId}/factors/${params.id}`, {
                    headers: this.headers,
                });
                return { data, error: null };
            }
            catch (error) {
                if ((0,_lib_errors__WEBPACK_IMPORTED_MODULE_2__.isAuthError)(error)) {
                    return { data: null, error };
                }
                throw error;
            }
        });
    }
}
//# sourceMappingURL=GoTrueAdminApi.js.map

/***/ }),

/***/ "./node_modules/@supabase/gotrue-js/dist/module/GoTrueClient.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@supabase/gotrue-js/dist/module/GoTrueClient.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GoTrueClient)
/* harmony export */ });
/* harmony import */ var _GoTrueAdminApi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GoTrueAdminApi */ "./node_modules/@supabase/gotrue-js/dist/module/GoTrueAdminApi.js");
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/constants */ "./node_modules/@supabase/gotrue-js/dist/module/lib/constants.js");
/* harmony import */ var _lib_errors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/errors */ "./node_modules/@supabase/gotrue-js/dist/module/lib/errors.js");
/* harmony import */ var _lib_fetch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lib/fetch */ "./node_modules/@supabase/gotrue-js/dist/module/lib/fetch.js");
/* harmony import */ var _lib_helpers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lib/helpers */ "./node_modules/@supabase/gotrue-js/dist/module/lib/helpers.js");
/* harmony import */ var _lib_local_storage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./lib/local-storage */ "./node_modules/@supabase/gotrue-js/dist/module/lib/local-storage.js");
/* harmony import */ var _lib_polyfills__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./lib/polyfills */ "./node_modules/@supabase/gotrue-js/dist/module/lib/polyfills.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};







(0,_lib_polyfills__WEBPACK_IMPORTED_MODULE_6__.polyfillGlobalThis)(); // Make "globalThis" available
const DEFAULT_OPTIONS = {
    url: _lib_constants__WEBPACK_IMPORTED_MODULE_1__.GOTRUE_URL,
    storageKey: _lib_constants__WEBPACK_IMPORTED_MODULE_1__.STORAGE_KEY,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    headers: _lib_constants__WEBPACK_IMPORTED_MODULE_1__.DEFAULT_HEADERS,
    flowType: 'implicit',
};
/** Current session will be checked for refresh at this interval. */
const AUTO_REFRESH_TICK_DURATION = 30 * 1000;
/**
 * A token refresh will be attempted this many ticks before the current session expires. */
const AUTO_REFRESH_TICK_THRESHOLD = 3;
class GoTrueClient {
    /**
     * Create a new client for use in the browser.
     */
    constructor(options) {
        var _a;
        this.stateChangeEmitters = new Map();
        this.autoRefreshTicker = null;
        this.visibilityChangedCallback = null;
        this.refreshingDeferred = null;
        /**
         * Keeps track of the async client initialization.
         * When null or not yet resolved the auth state is `unknown`
         * Once resolved the the auth state is known and it's save to call any further client methods.
         * Keep extra care to never reject or throw uncaught errors
         */
        this.initializePromise = null;
        this.detectSessionInUrl = true;
        /**
         * Used to broadcast state change events to other tabs listening.
         */
        this.broadcastChannel = null;
        const settings = Object.assign(Object.assign({}, DEFAULT_OPTIONS), options);
        this.inMemorySession = null;
        this.storageKey = settings.storageKey;
        this.autoRefreshToken = settings.autoRefreshToken;
        this.persistSession = settings.persistSession;
        this.storage = settings.storage || _lib_local_storage__WEBPACK_IMPORTED_MODULE_5__["default"];
        this.admin = new _GoTrueAdminApi__WEBPACK_IMPORTED_MODULE_0__["default"]({
            url: settings.url,
            headers: settings.headers,
            fetch: settings.fetch,
        });
        this.url = settings.url;
        this.headers = settings.headers;
        this.fetch = (0,_lib_helpers__WEBPACK_IMPORTED_MODULE_4__.resolveFetch)(settings.fetch);
        this.detectSessionInUrl = settings.detectSessionInUrl;
        this.flowType = settings.flowType;
        this.mfa = {
            verify: this._verify.bind(this),
            enroll: this._enroll.bind(this),
            unenroll: this._unenroll.bind(this),
            challenge: this._challenge.bind(this),
            listFactors: this._listFactors.bind(this),
            challengeAndVerify: this._challengeAndVerify.bind(this),
            getAuthenticatorAssuranceLevel: this._getAuthenticatorAssuranceLevel.bind(this),
        };
        if ((0,_lib_helpers__WEBPACK_IMPORTED_MODULE_4__.isBrowser)() && globalThis.BroadcastChannel && this.persistSession && this.storageKey) {
            try {
                this.broadcastChannel = new globalThis.BroadcastChannel(this.storageKey);
            }
            catch (e) {
                console.error('Failed to create a new BroadcastChannel, multi-tab state changes will not be available', e);
            }
            (_a = this.broadcastChannel) === null || _a === void 0 ? void 0 : _a.addEventListener('message', (event) => {
                this._notifyAllSubscribers(event.data.event, event.data.session, false); // broadcast = false so we don't get an endless loop of messages
            });
        }
        this.initialize();
    }
    /**
     * Initializes the client session either from the url or from storage.
     * This method is automatically called when instantiating the client, but should also be called
     * manually when checking for an error from an auth redirect (oauth, magiclink, password recovery, etc).
     */
    initialize() {
        if (!this.initializePromise) {
            this.initializePromise = this._initialize();
        }
        return this.initializePromise;
    }
    /**
     * IMPORTANT:
     * 1. Never throw in this method, as it is called from the constructor
     * 2. Never return a session from this method as it would be cached over
     *    the whole lifetime of the client
     */
    _initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.initializePromise) {
                return this.initializePromise;
            }
            try {
                const isPKCEFlow = yield this._isPKCEFlow();
                if ((this.detectSessionInUrl && this._isImplicitGrantFlow()) || isPKCEFlow) {
                    const { data, error } = yield this._getSessionFromUrl(isPKCEFlow);
                    if (error) {
                        // failed login attempt via url,
                        // remove old session as in verifyOtp, signUp and signInWith*
                        yield this._removeSession();
                        return { error };
                    }
                    const { session, redirectType } = data;
                    yield this._saveSession(session);
                    setTimeout(() => {
                        if (redirectType === 'recovery') {
                            this._notifyAllSubscribers('PASSWORD_RECOVERY', session);
                        }
                        else {
                            this._notifyAllSubscribers('SIGNED_IN', session);
                        }
                    }, 0);
                    return { error: null };
                }
                // no login attempt via callback url try to recover session from storage
                yield this._recoverAndRefresh();
                return { error: null };
            }
            catch (error) {
                if ((0,_lib_errors__WEBPACK_IMPORTED_MODULE_2__.isAuthError)(error)) {
                    return { error };
                }
                return {
                    error: new _lib_errors__WEBPACK_IMPORTED_MODULE_2__.AuthUnknownError('Unexpected error during initialization', error),
                };
            }
            finally {
                yield this._handleVisibilityChange();
            }
        });
    }
    /**
     * Creates a new user.
     *
     * Be aware that if a user account exists in the system you may get back an
     * error message that attempts to hide this information from the user.
     * This method has support for PKCE via email signups. The PKCE flow cannot be used when autoconfirm is enabled.
     *
     * @returns A logged-in session if the server has "autoconfirm" ON
     * @returns A user if the server has "autoconfirm" OFF
     */
    signUp(credentials) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this._removeSession();
                let res;
                if ('email' in credentials) {
                    const { email, password, options } = credentials;
                    let codeChallenge = null;
                    let codeChallengeMethod = null;
                    if (this.flowType === 'pkce') {
                        const codeVerifier = (0,_lib_helpers__WEBPACK_IMPORTED_MODULE_4__.generatePKCEVerifier)();
                        yield (0,_lib_helpers__WEBPACK_IMPORTED_MODULE_4__.setItemAsync)(this.storage, `${this.storageKey}-code-verifier`, codeVerifier);
                        codeChallenge = yield (0,_lib_helpers__WEBPACK_IMPORTED_MODULE_4__.generatePKCEChallenge)(codeVerifier);
                        codeChallengeMethod = codeVerifier === codeChallenge ? 'plain' : 's256';
                    }
                    res = yield (0,_lib_fetch__WEBPACK_IMPORTED_MODULE_3__._request)(this.fetch, 'POST', `${this.url}/signup`, {
                        headers: this.headers,
                        redirectTo: options === null || options === void 0 ? void 0 : options.emailRedirectTo,
                        body: {
                            email,
                            password,
                            data: (_a = options === null || options === void 0 ? void 0 : options.data) !== null && _a !== void 0 ? _a : {},
                            gotrue_meta_security: { captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken },
                            code_challenge: codeChallenge,
                            code_challenge_method: codeChallengeMethod,
                        },
                        xform: _lib_fetch__WEBPACK_IMPORTED_MODULE_3__._sessionResponse,
                    });
                }
                else if ('phone' in credentials) {
                    const { phone, password, options } = credentials;
                    res = yield (0,_lib_fetch__WEBPACK_IMPORTED_MODULE_3__._request)(this.fetch, 'POST', `${this.url}/signup`, {
                        headers: this.headers,
                        body: {
                            phone,
                            password,
                            data: (_b = options === null || options === void 0 ? void 0 : options.data) !== null && _b !== void 0 ? _b : {},
                            channel: (_c = options === null || options === void 0 ? void 0 : options.channel) !== null && _c !== void 0 ? _c : 'sms',
                            gotrue_meta_security: { captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken },
                        },
                        xform: _lib_fetch__WEBPACK_IMPORTED_MODULE_3__._sessionResponse,
                    });
                }
                else {
                    throw new _lib_errors__WEBPACK_IMPORTED_MODULE_2__.AuthInvalidCredentialsError('You must provide either an email or phone number and a password');
                }
                const { data, error } = res;
                if (error || !data) {
                    return { data: { user: null, session: null }, error: error };
                }
                const session = data.session;
                const user = data.user;
                if (data.session) {
                    yield this._saveSession(data.session);
                    this._notifyAllSubscribers('SIGNED_IN', session);
                }
                return { data: { user, session }, error: null };
            }
            catch (error) {
                if ((0,_lib_errors__WEBPACK_IMPORTED_MODULE_2__.isAuthError)(error)) {
                    return { data: { user: null, session: null }, error };
                }
                throw error;
            }
        });
    }
    /**
     * Log in an existing user with an email and password or phone and password.
     *
     * Be aware that you may get back an error message that will not distinguish
     * between the cases where the account does not exist or that the
     * email/phone and password combination is wrong or that the account can only
     * be accessed via social login.
     */
    signInWithPassword(credentials) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this._removeSession();
                let res;
                if ('email' in credentials) {
                    const { email, password, options } = credentials;
                    res = yield (0,_lib_fetch__WEBPACK_IMPORTED_MODULE_3__._request)(this.fetch, 'POST', `${this.url}/token?grant_type=password`, {
                        headers: this.headers,
                        body: {
                            email,
                            password,
                            gotrue_meta_security: { captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken },
                        },
                        xform: _lib_fetch__WEBPACK_IMPORTED_MODULE_3__._sessionResponse,
                    });
                }
                else if ('phone' in credentials) {
                    const { phone, password, options } = credentials;
                    res = yield (0,_lib_fetch__WEBPACK_IMPORTED_MODULE_3__._request)(this.fetch, 'POST', `${this.url}/token?grant_type=password`, {
                        headers: this.headers,
                        body: {
                            phone,
                            password,
                            gotrue_meta_security: { captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken },
                        },
                        xform: _lib_fetch__WEBPACK_IMPORTED_MODULE_3__._sessionResponse,
                    });
                }
                else {
                    throw new _lib_errors__WEBPACK_IMPORTED_MODULE_2__.AuthInvalidCredentialsError('You must provide either an email or phone number and a password');
                }
                const { data, error } = res;
                if (error || !data)
                    return { data: { user: null, session: null }, error };
                if (data.session) {
                    yield this._saveSession(data.session);
                    this._notifyAllSubscribers('SIGNED_IN', data.session);
                }
                return { data, error };
            }
            catch (error) {
                if ((0,_lib_errors__WEBPACK_IMPORTED_MODULE_2__.isAuthError)(error)) {
                    return { data: { user: null, session: null }, error };
                }
                throw error;
            }
        });
    }
    /**
     * Log in an existing user via a third-party provider.
     * This method supports the PKCE flow.
     */
    signInWithOAuth(credentials) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            yield this._removeSession();
            return yield this._handleProviderSignIn(credentials.provider, {
                redirectTo: (_a = credentials.options) === null || _a === void 0 ? void 0 : _a.redirectTo,
                scopes: (_b = credentials.options) === null || _b === void 0 ? void 0 : _b.scopes,
                queryParams: (_c = credentials.options) === null || _c === void 0 ? void 0 : _c.queryParams,
                skipBrowserRedirect: (_d = credentials.options) === null || _d === void 0 ? void 0 : _d.skipBrowserRedirect,
            });
        });
    }
    /**
     * Log in an existing user by exchanging an Auth Code issued during the PKCE flow.
     */
    exchangeCodeForSession(authCode) {
        return __awaiter(this, void 0, void 0, function* () {
            const codeVerifier = yield (0,_lib_helpers__WEBPACK_IMPORTED_MODULE_4__.getItemAsync)(this.storage, `${this.storageKey}-code-verifier`);
            const { data, error } = yield (0,_lib_fetch__WEBPACK_IMPORTED_MODULE_3__._request)(this.fetch, 'POST', `${this.url}/token?grant_type=pkce`, {
                headers: this.headers,
                body: {
                    auth_code: authCode,
                    code_verifier: codeVerifier,
                },
                xform: _lib_fetch__WEBPACK_IMPORTED_MODULE_3__._sessionResponse,
            });
            yield (0,_lib_helpers__WEBPACK_IMPORTED_MODULE_4__.removeItemAsync)(this.storage, `${this.storageKey}-code-verifier`);
            if (error || !data)
                return { data: { user: null, session: null }, error };
            if (data.session) {
                yield this._saveSession(data.session);
                this._notifyAllSubscribers('SIGNED_IN', data.session);
            }
            return { data, error };
        });
    }
    /**
     * Allows signing in with an ID token issued by certain supported providers.
     * The ID token is verified for validity and a new session is established.
     *
     * @experimental
     */
    signInWithIdToken(credentials) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._removeSession();
            try {
                const { options, provider, token, nonce } = credentials;
                const res = yield (0,_lib_fetch__WEBPACK_IMPORTED_MODULE_3__._request)(this.fetch, 'POST', `${this.url}/token?grant_type=id_token`, {
                    headers: this.headers,
                    body: {
                        provider,
                        id_token: token,
                        nonce,
                        gotrue_meta_security: { captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken },
                    },
                    xform: _lib_fetch__WEBPACK_IMPORTED_MODULE_3__._sessionResponse,
                });
                const { data, error } = res;
                if (error || !data)
                    return { data: { user: null, session: null }, error };
                if (data.session) {
                    yield this._saveSession(data.session);
                    this._notifyAllSubscribers('SIGNED_IN', data.session);
                }
                return { data, error };
            }
            catch (error) {
                if ((0,_lib_errors__WEBPACK_IMPORTED_MODULE_2__.isAuthError)(error)) {
                    return { data: { user: null, session: null }, error };
                }
                throw error;
            }
        });
    }
    /**
     * Log in a user using magiclink or a one-time password (OTP).
     *
     * If the `{{ .ConfirmationURL }}` variable is specified in the email template, a magiclink will be sent.
     * If the `{{ .Token }}` variable is specified in the email template, an OTP will be sent.
     * If you're using phone sign-ins, only an OTP will be sent. You won't be able to send a magiclink for phone sign-ins.
     *
     * Be aware that you may get back an error message that will not distinguish
     * between the cases where the account does not exist or, that the account
     * can only be accessed via social login.
     *
     * Do note that you will need to configure a Whatsapp sender on Twilio
     * if you are using phone sign in with the 'whatsapp' channel. The whatsapp
     * channel is not supported on other providers
     * at this time.
     * This method supports PKCE when an email is passed.
     */
    signInWithOtp(credentials) {
        var _a, _b, _c, _d, _e;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this._removeSession();
                if ('email' in credentials) {
                    const { email, options } = credentials;
                    let codeChallenge = null;
                    let codeChallengeMethod = null;
                    if (this.flowType === 'pkce') {
                        const codeVerifier = (0,_lib_helpers__WEBPACK_IMPORTED_MODULE_4__.generatePKCEVerifier)();
                        yield (0,_lib_helpers__WEBPACK_IMPORTED_MODULE_4__.setItemAsync)(this.storage, `${this.storageKey}-code-verifier`, codeVerifier);
                        codeChallenge = yield (0,_lib_helpers__WEBPACK_IMPORTED_MODULE_4__.generatePKCEChallenge)(codeVerifier);
                        codeChallengeMethod = codeVerifier === codeChallenge ? 'plain' : 's256';
                    }
                    const { error } = yield (0,_lib_fetch__WEBPACK_IMPORTED_MODULE_3__._request)(this.fetch, 'POST', `${this.url}/otp`, {
                        headers: this.headers,
                        body: {
                            email,
                            data: (_a = options === null || options === void 0 ? void 0 : options.data) !== null && _a !== void 0 ? _a : {},
                            create_user: (_b = options === null || options === void 0 ? void 0 : options.shouldCreateUser) !== null && _b !== void 0 ? _b : true,
                            gotrue_meta_security: { captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken },
                            code_challenge: codeChallenge,
                            code_challenge_method: codeChallengeMethod,
                        },
                        redirectTo: options === null || options === void 0 ? void 0 : options.emailRedirectTo,
                    });
                    return { data: { user: null, session: null }, error };
                }
                if ('phone' in credentials) {
                    const { phone, options } = credentials;
                    const { error } = yield (0,_lib_fetch__WEBPACK_IMPORTED_MODULE_3__._request)(this.fetch, 'POST', `${this.url}/otp`, {
                        headers: this.headers,
                        body: {
                            phone,
                            data: (_c = options === null || options === void 0 ? void 0 : options.data) !== null && _c !== void 0 ? _c : {},
                            create_user: (_d = options === null || options === void 0 ? void 0 : options.shouldCreateUser) !== null && _d !== void 0 ? _d : true,
                            gotrue_meta_security: { captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken },
                            channel: (_e = options === null || options === void 0 ? void 0 : options.channel) !== null && _e !== void 0 ? _e : 'sms',
                        },
                    });
                    return { data: { user: null, session: null }, error };
                }
                throw new _lib_errors__WEBPACK_IMPORTED_MODULE_2__.AuthInvalidCredentialsError('You must provide either an email or phone number.');
            }
            catch (error) {
                if ((0,_lib_errors__WEBPACK_IMPORTED_MODULE_2__.isAuthError)(error)) {
                    return { data: { user: null, session: null }, error };
                }
                throw error;
            }
        });
    }
    /**
     * Log in a user given a User supplied OTP received via mobile.
     */
    verifyOtp(params) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this._removeSession();
                const { data, error } = yield (0,_lib_fetch__WEBPACK_IMPORTED_MODULE_3__._request)(this.fetch, 'POST', `${this.url}/verify`, {
                    headers: this.headers,
                    body: Object.assign(Object.assign({}, params), { gotrue_meta_security: { captcha_token: (_a = params.options) === null || _a === void 0 ? void 0 : _a.captchaToken } }),
                    redirectTo: (_b = params.options) === null || _b === void 0 ? void 0 : _b.redirectTo,
                    xform: _lib_fetch__WEBPACK_IMPORTED_MODULE_3__._sessionResponse,
                });
                if (error) {
                    throw error;
                }
                if (!data) {
                    throw new Error('An error occurred on token verification.');
                }
                const session = data.session;
                const user = data.user;
                if (session === null || session === void 0 ? void 0 : session.access_token) {
                    yield this._saveSession(session);
                    this._notifyAllSubscribers('SIGNED_IN', session);
                }
                return { data: { user, session }, error: null };
            }
            catch (error) {
                if ((0,_lib_errors__WEBPACK_IMPORTED_MODULE_2__.isAuthError)(error)) {
                    return { data: { user: null, session: null }, error };
                }
                throw error;
            }
        });
    }
    /**
     * Attempts a single-sign on using an enterprise Identity Provider. A
     * successful SSO attempt will redirect the current page to the identity
     * provider authorization page. The redirect URL is implementation and SSO
     * protocol specific.
     *
     * You can use it by providing a SSO domain. Typically you can extract this
     * domain by asking users for their email address. If this domain is
     * registered on the Auth instance the redirect will use that organization's
     * currently active SSO Identity Provider for the login.
     *
     * If you have built an organization-specific login page, you can use the
     * organization's SSO Identity Provider UUID directly instead.
     */
    signInWithSSO(params) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this._removeSession();
                return yield (0,_lib_fetch__WEBPACK_IMPORTED_MODULE_3__._request)(this.fetch, 'POST', `${this.url}/sso`, {
                    body: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, ('providerId' in params ? { provider_id: params.providerId } : null)), ('domain' in params ? { domain: params.domain } : null)), { redirect_to: (_b = (_a = params.options) === null || _a === void 0 ? void 0 : _a.redirectTo) !== null && _b !== void 0 ? _b : undefined }), (((_c = params === null || params === void 0 ? void 0 : params.options) === null || _c === void 0 ? void 0 : _c.captchaToken)
                        ? { gotrue_meta_security: { captcha_token: params.options.captchaToken } }
                        : null)), { skip_http_redirect: true }),
                    headers: this.headers,
                    xform: _lib_fetch__WEBPACK_IMPORTED_MODULE_3__._ssoResponse,
                });
            }
            catch (error) {
                if ((0,_lib_errors__WEBPACK_IMPORTED_MODULE_2__.isAuthError)(error)) {
                    return { data: null, error };
                }
                throw error;
            }
        });
    }
    /**
     * Sends a reauthentication OTP to the user's email or phone number.
     * Requires the user to be signed-in.
     */
    reauthenticate() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data: { session }, error: sessionError, } = yield this.getSession();
                if (sessionError)
                    throw sessionError;
                if (!session)
                    throw new _lib_errors__WEBPACK_IMPORTED_MODULE_2__.AuthSessionMissingError();
                const { error } = yield (0,_lib_fetch__WEBPACK_IMPORTED_MODULE_3__._request)(this.fetch, 'GET', `${this.url}/reauthenticate`, {
                    headers: this.headers,
                    jwt: session.access_token,
                });
                return { data: { user: null, session: null }, error };
            }
            catch (error) {
                if ((0,_lib_errors__WEBPACK_IMPORTED_MODULE_2__.isAuthError)(error)) {
                    return { data: { user: null, session: null }, error };
                }
                throw error;
            }
        });
    }
    /**
     * Resends an existing signup confirmation email, email change email, SMS OTP or phone change OTP.
     */
    resend(credentials) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this._removeSession();
                const endpoint = `${this.url}/resend`;
                if ('email' in credentials) {
                    const { email, type, options } = credentials;
                    const { error } = yield (0,_lib_fetch__WEBPACK_IMPORTED_MODULE_3__._request)(this.fetch, 'POST', endpoint, {
                        headers: this.headers,
                        body: {
                            email,
                            type,
                            gotrue_meta_security: { captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken },
                        },
                    });
                    return { data: { user: null, session: null }, error };
                }
                else if ('phone' in credentials) {
                    const { phone, type, options } = credentials;
                    const { error } = yield (0,_lib_fetch__WEBPACK_IMPORTED_MODULE_3__._request)(this.fetch, 'POST', endpoint, {
                        headers: this.headers,
                        body: {
                            phone,
                            type,
                            gotrue_meta_security: { captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken },
                        },
                    });
                    return { data: { user: null, session: null }, error };
                }
                throw new _lib_errors__WEBPACK_IMPORTED_MODULE_2__.AuthInvalidCredentialsError('You must provide either an email or phone number and a type');
            }
            catch (error) {
                if ((0,_lib_errors__WEBPACK_IMPORTED_MODULE_2__.isAuthError)(error)) {
                    return { data: { user: null, session: null }, error };
                }
                throw error;
            }
        });
    }
    /**
     * Returns the session, refreshing it if necessary.
     * The session returned can be null if the session is not detected which can happen in the event a user is not signed-in or has logged out.
     */
    getSession() {
        return __awaiter(this, void 0, void 0, function* () {
            // make sure we've read the session from the url if there is one
            // save to just await, as long we make sure _initialize() never throws
            yield this.initializePromise;
            let currentSession = null;
            if (this.persistSession) {
                const maybeSession = yield (0,_lib_helpers__WEBPACK_IMPORTED_MODULE_4__.getItemAsync)(this.storage, this.storageKey);
                if (maybeSession !== null) {
                    if (this._isValidSession(maybeSession)) {
                        currentSession = maybeSession;
                    }
                    else {
                        yield this._removeSession();
                    }
                }
            }
            else {
                currentSession = this.inMemorySession;
            }
            if (!currentSession) {
                return { data: { session: null }, error: null };
            }
            const hasExpired = currentSession.expires_at
                ? currentSession.expires_at <= Date.now() / 1000
                : false;
            if (!hasExpired) {
                return { data: { session: currentSession }, error: null };
            }
            const { session, error } = yield this._callRefreshToken(currentSession.refresh_token);
            if (error) {
                return { data: { session: null }, error };
            }
            return { data: { session }, error: null };
        });
    }
    /**
     * Gets the current user details if there is an existing session.
     * @param jwt Takes in an optional access token jwt. If no jwt is provided, getUser() will attempt to get the jwt from the current session.
     */
    getUser(jwt) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!jwt) {
                    const { data, error } = yield this.getSession();
                    if (error) {
                        throw error;
                    }
                    // Default to Authorization header if there is no existing session
                    jwt = (_b = (_a = data.session) === null || _a === void 0 ? void 0 : _a.access_token) !== null && _b !== void 0 ? _b : undefined;
                }
                return yield (0,_lib_fetch__WEBPACK_IMPORTED_MODULE_3__._request)(this.fetch, 'GET', `${this.url}/user`, {
                    headers: this.headers,
                    jwt: jwt,
                    xform: _lib_fetch__WEBPACK_IMPORTED_MODULE_3__._userResponse,
                });
            }
            catch (error) {
                if ((0,_lib_errors__WEBPACK_IMPORTED_MODULE_2__.isAuthError)(error)) {
                    return { data: { user: null }, error };
                }
                throw error;
            }
        });
    }
    /**
     * Updates user data for a logged in user.
     */
    updateUser(attributes, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data: sessionData, error: sessionError } = yield this.getSession();
                if (sessionError) {
                    throw sessionError;
                }
                if (!sessionData.session) {
                    throw new _lib_errors__WEBPACK_IMPORTED_MODULE_2__.AuthSessionMissingError();
                }
                const session = sessionData.session;
                const { data, error: userError } = yield (0,_lib_fetch__WEBPACK_IMPORTED_MODULE_3__._request)(this.fetch, 'PUT', `${this.url}/user`, {
                    headers: this.headers,
                    redirectTo: options === null || options === void 0 ? void 0 : options.emailRedirectTo,
                    body: attributes,
                    jwt: session.access_token,
                    xform: _lib_fetch__WEBPACK_IMPORTED_MODULE_3__._userResponse,
                });
                if (userError)
                    throw userError;
                session.user = data.user;
                yield this._saveSession(session);
                this._notifyAllSubscribers('USER_UPDATED', session);
                return { data: { user: session.user }, error: null };
            }
            catch (error) {
                if ((0,_lib_errors__WEBPACK_IMPORTED_MODULE_2__.isAuthError)(error)) {
                    return { data: { user: null }, error };
                }
                throw error;
            }
        });
    }
    /**
     * Decodes a JWT (without performing any validation).
     */
    _decodeJWT(jwt) {
        return (0,_lib_helpers__WEBPACK_IMPORTED_MODULE_4__.decodeJWTPayload)(jwt);
    }
    /**
     * Sets the session data from the current session. If the current session is expired, setSession will take care of refreshing it to obtain a new session.
     * If the refresh token or access token in the current session is invalid, an error will be thrown.
     * @param currentSession The current session that minimally contains an access token and refresh token.
     */
    setSession(currentSession) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!currentSession.access_token || !currentSession.refresh_token) {
                    throw new _lib_errors__WEBPACK_IMPORTED_MODULE_2__.AuthSessionMissingError();
                }
                const timeNow = Date.now() / 1000;
                let expiresAt = timeNow;
                let hasExpired = true;
                let session = null;
                const payload = (0,_lib_helpers__WEBPACK_IMPORTED_MODULE_4__.decodeJWTPayload)(currentSession.access_token);
                if (payload.exp) {
                    expiresAt = payload.exp;
                    hasExpired = expiresAt <= timeNow;
                }
                if (hasExpired) {
                    const { session: refreshedSession, error } = yield this._callRefreshToken(currentSession.refresh_token);
                    if (error) {
                        return { data: { user: null, session: null }, error: error };
                    }
                    if (!refreshedSession) {
                        return { data: { user: null, session: null }, error: null };
                    }
                    session = refreshedSession;
                }
                else {
                    const { data, error } = yield this.getUser(currentSession.access_token);
                    if (error) {
                        throw error;
                    }
                    session = {
                        access_token: currentSession.access_token,
                        refresh_token: currentSession.refresh_token,
                        user: data.user,
                        token_type: 'bearer',
                        expires_in: expiresAt - timeNow,
                        expires_at: expiresAt,
                    };
                    yield this._saveSession(session);
                    this._notifyAllSubscribers('SIGNED_IN', session);
                }
                return { data: { user: session.user, session }, error: null };
            }
            catch (error) {
                if ((0,_lib_errors__WEBPACK_IMPORTED_MODULE_2__.isAuthError)(error)) {
                    return { data: { session: null, user: null }, error };
                }
                throw error;
            }
        });
    }
    /**
     * Returns a new session, regardless of expiry status.
     * Takes in an optional current session. If not passed in, then refreshSession() will attempt to retrieve it from getSession().
     * If the current session's refresh token is invalid, an error will be thrown.
     * @param currentSession The current session. If passed in, it must contain a refresh token.
     */
    refreshSession(currentSession) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!currentSession) {
                    const { data, error } = yield this.getSession();
                    if (error) {
                        throw error;
                    }
                    currentSession = (_a = data.session) !== null && _a !== void 0 ? _a : undefined;
                }
                if (!(currentSession === null || currentSession === void 0 ? void 0 : currentSession.refresh_token)) {
                    throw new _lib_errors__WEBPACK_IMPORTED_MODULE_2__.AuthSessionMissingError();
                }
                const { session, error } = yield this._callRefreshToken(currentSession.refresh_token);
                if (error) {
                    return { data: { user: null, session: null }, error: error };
                }
                if (!session) {
                    return { data: { user: null, session: null }, error: null };
                }
                return { data: { user: session.user, session }, error: null };
            }
            catch (error) {
                if ((0,_lib_errors__WEBPACK_IMPORTED_MODULE_2__.isAuthError)(error)) {
                    return { data: { user: null, session: null }, error };
                }
                throw error;
            }
        });
    }
    /**
     * Gets the session data from a URL string
     */
    _getSessionFromUrl(isPKCEFlow) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!(0,_lib_helpers__WEBPACK_IMPORTED_MODULE_4__.isBrowser)())
                    throw new _lib_errors__WEBPACK_IMPORTED_MODULE_2__.AuthImplicitGrantRedirectError('No browser detected.');
                if (this.flowType === 'implicit' && !this._isImplicitGrantFlow()) {
                    throw new _lib_errors__WEBPACK_IMPORTED_MODULE_2__.AuthImplicitGrantRedirectError('Not a valid implicit grant flow url.');
                }
                else if (this.flowType == 'pkce' && !isPKCEFlow) {
                    throw new _lib_errors__WEBPACK_IMPORTED_MODULE_2__.AuthPKCEGrantCodeExchangeError('Not a valid PKCE flow url.');
                }
                if (isPKCEFlow) {
                    const authCode = (0,_lib_helpers__WEBPACK_IMPORTED_MODULE_4__.getParameterByName)('code');
                    if (!authCode)
                        throw new _lib_errors__WEBPACK_IMPORTED_MODULE_2__.AuthPKCEGrantCodeExchangeError('No code detected.');
                    const { data, error } = yield this.exchangeCodeForSession(authCode);
                    if (error)
                        throw error;
                    if (!data.session)
                        throw new _lib_errors__WEBPACK_IMPORTED_MODULE_2__.AuthPKCEGrantCodeExchangeError('No session detected.');
                    let url = new URL(window.location.href);
                    url.searchParams.delete('code');
                    window.history.replaceState(window.history.state, '', url.toString());
                    return { data: { session: data.session, redirectType: null }, error: null };
                }
                const error_description = (0,_lib_helpers__WEBPACK_IMPORTED_MODULE_4__.getParameterByName)('error_description');
                if (error_description) {
                    const error_code = (0,_lib_helpers__WEBPACK_IMPORTED_MODULE_4__.getParameterByName)('error_code');
                    if (!error_code)
                        throw new _lib_errors__WEBPACK_IMPORTED_MODULE_2__.AuthImplicitGrantRedirectError('No error_code detected.');
                    const error = (0,_lib_helpers__WEBPACK_IMPORTED_MODULE_4__.getParameterByName)('error');
                    if (!error)
                        throw new _lib_errors__WEBPACK_IMPORTED_MODULE_2__.AuthImplicitGrantRedirectError('No error detected.');
                    throw new _lib_errors__WEBPACK_IMPORTED_MODULE_2__.AuthImplicitGrantRedirectError(error_description, { error, code: error_code });
                }
                const provider_token = (0,_lib_helpers__WEBPACK_IMPORTED_MODULE_4__.getParameterByName)('provider_token');
                const provider_refresh_token = (0,_lib_helpers__WEBPACK_IMPORTED_MODULE_4__.getParameterByName)('provider_refresh_token');
                const access_token = (0,_lib_helpers__WEBPACK_IMPORTED_MODULE_4__.getParameterByName)('access_token');
                if (!access_token)
                    throw new _lib_errors__WEBPACK_IMPORTED_MODULE_2__.AuthImplicitGrantRedirectError('No access_token detected.');
                const expires_in = (0,_lib_helpers__WEBPACK_IMPORTED_MODULE_4__.getParameterByName)('expires_in');
                if (!expires_in)
                    throw new _lib_errors__WEBPACK_IMPORTED_MODULE_2__.AuthImplicitGrantRedirectError('No expires_in detected.');
                const refresh_token = (0,_lib_helpers__WEBPACK_IMPORTED_MODULE_4__.getParameterByName)('refresh_token');
                if (!refresh_token)
                    throw new _lib_errors__WEBPACK_IMPORTED_MODULE_2__.AuthImplicitGrantRedirectError('No refresh_token detected.');
                const token_type = (0,_lib_helpers__WEBPACK_IMPORTED_MODULE_4__.getParameterByName)('token_type');
                if (!token_type)
                    throw new _lib_errors__WEBPACK_IMPORTED_MODULE_2__.AuthImplicitGrantRedirectError('No token_type detected.');
                const timeNow = Math.round(Date.now() / 1000);
                const expires_at = timeNow + parseInt(expires_in);
                const { data, error } = yield this.getUser(access_token);
                if (error)
                    throw error;
                const user = data.user;
                const session = {
                    provider_token,
                    provider_refresh_token,
                    access_token,
                    expires_in: parseInt(expires_in),
                    expires_at,
                    refresh_token,
                    token_type,
                    user,
                };
                const redirectType = (0,_lib_helpers__WEBPACK_IMPORTED_MODULE_4__.getParameterByName)('type');
                // Remove tokens from URL
                window.location.hash = '';
                return { data: { session, redirectType }, error: null };
            }
            catch (error) {
                if ((0,_lib_errors__WEBPACK_IMPORTED_MODULE_2__.isAuthError)(error)) {
                    return { data: { session: null, redirectType: null }, error };
                }
                throw error;
            }
        });
    }
    /**
     * Checks if the current URL contains parameters given by an implicit oauth grant flow (https://www.rfc-editor.org/rfc/rfc6749.html#section-4.2)
     */
    _isImplicitGrantFlow() {
        return ((0,_lib_helpers__WEBPACK_IMPORTED_MODULE_4__.isBrowser)() &&
            (Boolean((0,_lib_helpers__WEBPACK_IMPORTED_MODULE_4__.getParameterByName)('access_token')) ||
                Boolean((0,_lib_helpers__WEBPACK_IMPORTED_MODULE_4__.getParameterByName)('error_description'))));
    }
    /**
     * Checks if the current URL and backing storage contain parameters given by a PKCE flow
     */
    _isPKCEFlow() {
        return __awaiter(this, void 0, void 0, function* () {
            const currentStorageContent = yield (0,_lib_helpers__WEBPACK_IMPORTED_MODULE_4__.getItemAsync)(this.storage, `${this.storageKey}-code-verifier`);
            return (0,_lib_helpers__WEBPACK_IMPORTED_MODULE_4__.isBrowser)() && Boolean((0,_lib_helpers__WEBPACK_IMPORTED_MODULE_4__.getParameterByName)('code')) && Boolean(currentStorageContent);
        });
    }
    /**
     * Inside a browser context, `signOut()` will remove the logged in user from the browser session
     * and log them out - removing all items from localstorage and then trigger a `"SIGNED_OUT"` event.
     *
     * For server-side management, you can revoke all refresh tokens for a user by passing a user's JWT through to `auth.api.signOut(JWT: string)`.
     * There is no way to revoke a user's access token jwt until it expires. It is recommended to set a shorter expiry on the jwt for this reason.
     */
    signOut() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error: sessionError } = yield this.getSession();
            if (sessionError) {
                return { error: sessionError };
            }
            const accessToken = (_a = data.session) === null || _a === void 0 ? void 0 : _a.access_token;
            if (accessToken) {
                const { error } = yield this.admin.signOut(accessToken);
                if (error) {
                    // ignore 404s since user might not exist anymore
                    // ignore 401s since an invalid or expired JWT should sign out the current session
                    if (!((0,_lib_errors__WEBPACK_IMPORTED_MODULE_2__.isAuthApiError)(error) && (error.status === 404 || error.status === 401))) {
                        return { error };
                    }
                }
            }
            yield this._removeSession();
            yield (0,_lib_helpers__WEBPACK_IMPORTED_MODULE_4__.removeItemAsync)(this.storage, `${this.storageKey}-code-verifier`);
            this._notifyAllSubscribers('SIGNED_OUT', null);
            return { error: null };
        });
    }
    /**
     * Receive a notification every time an auth event happens.
     * @param callback A callback function to be invoked when an auth event happens.
     */
    onAuthStateChange(callback) {
        const id = (0,_lib_helpers__WEBPACK_IMPORTED_MODULE_4__.uuid)();
        const subscription = {
            id,
            callback,
            unsubscribe: () => {
                this.stateChangeEmitters.delete(id);
            },
        };
        this.stateChangeEmitters.set(id, subscription);
        this.emitInitialSession(id);
        return { data: { subscription } };
    }
    emitInitialSession(id) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data: { session }, error, } = yield this.getSession();
                if (error)
                    throw error;
                (_a = this.stateChangeEmitters.get(id)) === null || _a === void 0 ? void 0 : _a.callback('INITIAL_SESSION', session);
            }
            catch (err) {
                (_b = this.stateChangeEmitters.get(id)) === null || _b === void 0 ? void 0 : _b.callback('INITIAL_SESSION', null);
                console.error(err);
            }
        });
    }
    /**
     * Sends a password reset request to an email address.
     * This method supports the PKCE flow.
     * @param email The email address of the user.
     * @param options.redirectTo The URL to send the user to after they click the password reset link.
     * @param options.captchaToken Verification token received when the user completes the captcha on the site.
     */
    resetPasswordForEmail(email, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            let codeChallenge = null;
            let codeChallengeMethod = null;
            if (this.flowType === 'pkce') {
                const codeVerifier = (0,_lib_helpers__WEBPACK_IMPORTED_MODULE_4__.generatePKCEVerifier)();
                yield (0,_lib_helpers__WEBPACK_IMPORTED_MODULE_4__.setItemAsync)(this.storage, `${this.storageKey}-code-verifier`, codeVerifier);
                codeChallenge = yield (0,_lib_helpers__WEBPACK_IMPORTED_MODULE_4__.generatePKCEChallenge)(codeVerifier);
                codeChallengeMethod = codeVerifier === codeChallenge ? 'plain' : 's256';
            }
            try {
                return yield (0,_lib_fetch__WEBPACK_IMPORTED_MODULE_3__._request)(this.fetch, 'POST', `${this.url}/recover`, {
                    body: {
                        email,
                        code_challenge: codeChallenge,
                        code_challenge_method: codeChallengeMethod,
                        gotrue_meta_security: { captcha_token: options.captchaToken },
                    },
                    headers: this.headers,
                    redirectTo: options.redirectTo,
                });
            }
            catch (error) {
                if ((0,_lib_errors__WEBPACK_IMPORTED_MODULE_2__.isAuthError)(error)) {
                    return { data: null, error };
                }
                throw error;
            }
        });
    }
    /**
     * Generates a new JWT.
     * @param refreshToken A valid refresh token that was returned on login.
     */
    _refreshAccessToken(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const startedAt = Date.now();
                // will attempt to refresh the token with exponential backoff
                return yield (0,_lib_helpers__WEBPACK_IMPORTED_MODULE_4__.retryable)((attempt) => __awaiter(this, void 0, void 0, function* () {
                    yield (0,_lib_helpers__WEBPACK_IMPORTED_MODULE_4__.sleep)(attempt * 200); // 0, 200, 400, 800, ...
                    return yield (0,_lib_fetch__WEBPACK_IMPORTED_MODULE_3__._request)(this.fetch, 'POST', `${this.url}/token?grant_type=refresh_token`, {
                        body: { refresh_token: refreshToken },
                        headers: this.headers,
                        xform: _lib_fetch__WEBPACK_IMPORTED_MODULE_3__._sessionResponse,
                    });
                }), (attempt, _, result) => result &&
                    result.error &&
                    result.error instanceof _lib_errors__WEBPACK_IMPORTED_MODULE_2__.AuthRetryableFetchError &&
                    // retryable only if the request can be sent before the backoff overflows the tick duration
                    Date.now() + (attempt + 1) * 200 - startedAt < AUTO_REFRESH_TICK_DURATION);
            }
            catch (error) {
                if ((0,_lib_errors__WEBPACK_IMPORTED_MODULE_2__.isAuthError)(error)) {
                    return { data: { session: null, user: null }, error };
                }
                throw error;
            }
        });
    }
    _isValidSession(maybeSession) {
        const isValidSession = typeof maybeSession === 'object' &&
            maybeSession !== null &&
            'access_token' in maybeSession &&
            'refresh_token' in maybeSession &&
            'expires_at' in maybeSession;
        return isValidSession;
    }
    _handleProviderSignIn(provider, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = yield this._getUrlForProvider(provider, {
                redirectTo: options.redirectTo,
                scopes: options.scopes,
                queryParams: options.queryParams,
            });
            // try to open on the browser
            if ((0,_lib_helpers__WEBPACK_IMPORTED_MODULE_4__.isBrowser)() && !options.skipBrowserRedirect) {
                window.location.assign(url);
            }
            return { data: { provider, url }, error: null };
        });
    }
    /**
     * Recovers the session from LocalStorage and refreshes
     * Note: this method is async to accommodate for AsyncStorage e.g. in React native.
     */
    _recoverAndRefresh() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const currentSession = yield (0,_lib_helpers__WEBPACK_IMPORTED_MODULE_4__.getItemAsync)(this.storage, this.storageKey);
                if (!this._isValidSession(currentSession)) {
                    if (currentSession !== null) {
                        yield this._removeSession();
                    }
                    return;
                }
                const timeNow = Math.round(Date.now() / 1000);
                if (((_a = currentSession.expires_at) !== null && _a !== void 0 ? _a : Infinity) < timeNow + _lib_constants__WEBPACK_IMPORTED_MODULE_1__.EXPIRY_MARGIN) {
                    if (this.autoRefreshToken && currentSession.refresh_token) {
                        const { error } = yield this._callRefreshToken(currentSession.refresh_token);
                        if (error) {
                            console.log(error.message);
                            yield this._removeSession();
                        }
                    }
                }
                else {
                    if (this.persistSession) {
                        yield this._saveSession(currentSession);
                    }
                    this._notifyAllSubscribers('SIGNED_IN', currentSession);
                }
            }
            catch (err) {
                console.error(err);
                return;
            }
        });
    }
    _callRefreshToken(refreshToken) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            // refreshing is already in progress
            if (this.refreshingDeferred) {
                return this.refreshingDeferred.promise;
            }
            try {
                this.refreshingDeferred = new _lib_helpers__WEBPACK_IMPORTED_MODULE_4__.Deferred();
                if (!refreshToken) {
                    throw new _lib_errors__WEBPACK_IMPORTED_MODULE_2__.AuthSessionMissingError();
                }
                const { data, error } = yield this._refreshAccessToken(refreshToken);
                if (error)
                    throw error;
                if (!data.session)
                    throw new _lib_errors__WEBPACK_IMPORTED_MODULE_2__.AuthSessionMissingError();
                yield this._saveSession(data.session);
                this._notifyAllSubscribers('TOKEN_REFRESHED', data.session);
                const result = { session: data.session, error: null };
                this.refreshingDeferred.resolve(result);
                return result;
            }
            catch (error) {
                if ((0,_lib_errors__WEBPACK_IMPORTED_MODULE_2__.isAuthError)(error)) {
                    const result = { session: null, error };
                    (_a = this.refreshingDeferred) === null || _a === void 0 ? void 0 : _a.resolve(result);
                    return result;
                }
                (_b = this.refreshingDeferred) === null || _b === void 0 ? void 0 : _b.reject(error);
                throw error;
            }
            finally {
                this.refreshingDeferred = null;
            }
        });
    }
    _notifyAllSubscribers(event, session, broadcast = true) {
        if (this.broadcastChannel && broadcast) {
            this.broadcastChannel.postMessage({ event, session });
        }
        this.stateChangeEmitters.forEach((x) => x.callback(event, session));
    }
    /**
     * set currentSession and currentUser
     * process to _startAutoRefreshToken if possible
     */
    _saveSession(session) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.persistSession) {
                this.inMemorySession = session;
            }
            if (this.persistSession && session.expires_at) {
                yield this._persistSession(session);
            }
        });
    }
    _persistSession(currentSession) {
        return (0,_lib_helpers__WEBPACK_IMPORTED_MODULE_4__.setItemAsync)(this.storage, this.storageKey, currentSession);
    }
    _removeSession() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.persistSession) {
                yield (0,_lib_helpers__WEBPACK_IMPORTED_MODULE_4__.removeItemAsync)(this.storage, this.storageKey);
            }
            else {
                this.inMemorySession = null;
            }
        });
    }
    /**
     * Removes any registered visibilitychange callback.
     *
     * {@see #startAutoRefresh}
     * {@see #stopAutoRefresh}
     */
    _removeVisibilityChangedCallback() {
        const callback = this.visibilityChangedCallback;
        this.visibilityChangedCallback = null;
        try {
            if (callback && (0,_lib_helpers__WEBPACK_IMPORTED_MODULE_4__.isBrowser)() && (window === null || window === void 0 ? void 0 : window.removeEventListener)) {
                window.removeEventListener('visibilitychange', callback);
            }
        }
        catch (e) {
            console.error('removing visibilitychange callback failed', e);
        }
    }
    /**
     * This is the private implementation of {@link #startAutoRefresh}. Use this
     * within the library.
     */
    _startAutoRefresh() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._stopAutoRefresh();
            const ticker = setInterval(() => this._autoRefreshTokenTick(), AUTO_REFRESH_TICK_DURATION);
            this.autoRefreshTicker = ticker;
            if (ticker && typeof ticker === 'object' && typeof ticker.unref === 'function') {
                // ticker is a NodeJS Timeout object that has an `unref` method
                // https://nodejs.org/api/timers.html#timeoutunref
                // When auto refresh is used in NodeJS (like for testing) the
                // `setInterval` is preventing the process from being marked as
                // finished and tests run endlessly. This can be prevented by calling
                // `unref()` on the returned object.
                ticker.unref();
                // @ts-ignore
            }
            else if (typeof Deno !== 'undefined' && typeof Deno.unrefTimer === 'function') {
                // similar like for NodeJS, but with the Deno API
                // https://deno.land/api@latest?unstable&s=Deno.unrefTimer
                // @ts-ignore
                Deno.unrefTimer(ticker);
            }
            // run the tick immediately
            yield this._autoRefreshTokenTick();
        });
    }
    /**
     * This is the private implementation of {@link #stopAutoRefresh}. Use this
     * within the library.
     */
    _stopAutoRefresh() {
        return __awaiter(this, void 0, void 0, function* () {
            const ticker = this.autoRefreshTicker;
            this.autoRefreshTicker = null;
            if (ticker) {
                clearInterval(ticker);
            }
        });
    }
    /**
     * Starts an auto-refresh process in the background. The session is checked
     * every few seconds. Close to the time of expiration a process is started to
     * refresh the session. If refreshing fails it will be retried for as long as
     * necessary.
     *
     * If you set the {@link GoTrueClientOptions#autoRefreshToken} you don't need
     * to call this function, it will be called for you.
     *
     * On browsers the refresh process works only when the tab/window is in the
     * foreground to conserve resources as well as prevent race conditions and
     * flooding auth with requests. If you call this method any managed
     * visibility change callback will be removed and you must manage visibility
     * changes on your own.
     *
     * On non-browser platforms the refresh process works *continuously* in the
     * background, which may not be desirable. You should hook into your
     * platform's foreground indication mechanism and call these methods
     * appropriately to conserve resources.
     *
     * {@see #stopAutoRefresh}
     */
    startAutoRefresh() {
        return __awaiter(this, void 0, void 0, function* () {
            this._removeVisibilityChangedCallback();
            yield this._startAutoRefresh();
        });
    }
    /**
     * Stops an active auto refresh process running in the background (if any).
     *
     * If you call this method any managed visibility change callback will be
     * removed and you must manage visibility changes on your own.
     *
     * See {@link #startAutoRefresh} for more details.
     */
    stopAutoRefresh() {
        return __awaiter(this, void 0, void 0, function* () {
            this._removeVisibilityChangedCallback();
            yield this._stopAutoRefresh();
        });
    }
    /**
     * Runs the auto refresh token tick.
     */
    _autoRefreshTokenTick() {
        return __awaiter(this, void 0, void 0, function* () {
            const now = Date.now();
            try {
                const { data: { session }, } = yield this.getSession();
                if (!session || !session.refresh_token || !session.expires_at) {
                    return;
                }
                // session will expire in this many ticks (or has already expired if <= 0)
                const expiresInTicks = Math.floor((session.expires_at * 1000 - now) / AUTO_REFRESH_TICK_DURATION);
                if (expiresInTicks < AUTO_REFRESH_TICK_THRESHOLD) {
                    yield this._callRefreshToken(session.refresh_token);
                }
            }
            catch (e) {
                console.error('Auto refresh tick failed with error. This is likely a transient error.', e);
            }
        });
    }
    /**
     * Registers callbacks on the browser / platform, which in-turn run
     * algorithms when the browser window/tab are in foreground. On non-browser
     * platforms it assumes always foreground.
     */
    _handleVisibilityChange() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(0,_lib_helpers__WEBPACK_IMPORTED_MODULE_4__.isBrowser)() || !(window === null || window === void 0 ? void 0 : window.addEventListener)) {
                if (this.autoRefreshToken) {
                    // in non-browser environments the refresh token ticker runs always
                    this.startAutoRefresh();
                }
                return false;
            }
            try {
                this.visibilityChangedCallback = () => __awaiter(this, void 0, void 0, function* () { return yield this._onVisibilityChanged(false); });
                window === null || window === void 0 ? void 0 : window.addEventListener('visibilitychange', this.visibilityChangedCallback);
                // now immediately call the visbility changed callback to setup with the
                // current visbility state
                yield this._onVisibilityChanged(true); // initial call
            }
            catch (error) {
                console.error('_handleVisibilityChange', error);
            }
        });
    }
    /**
     * Callback registered with `window.addEventListener('visibilitychange')`.
     */
    _onVisibilityChanged(isInitial) {
        return __awaiter(this, void 0, void 0, function* () {
            if (document.visibilityState === 'visible') {
                if (!isInitial) {
                    // initial visibility change setup is handled in another flow under #initialize()
                    yield this.initializePromise;
                    yield this._recoverAndRefresh();
                }
                if (this.autoRefreshToken) {
                    // in browser environments the refresh token ticker runs only on focused tabs
                    // which prevents race conditions
                    this._startAutoRefresh();
                }
            }
            else if (document.visibilityState === 'hidden') {
                if (this.autoRefreshToken) {
                    this._stopAutoRefresh();
                }
            }
        });
    }
    /**
     * Generates the relevant login URL for a third-party provider.
     * @param options.redirectTo A URL or mobile address to send the user to after they are confirmed.
     * @param options.scopes A space-separated list of scopes granted to the OAuth application.
     * @param options.queryParams An object of key-value pairs containing query parameters granted to the OAuth application.
     */
    _getUrlForProvider(provider, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const urlParams = [`provider=${encodeURIComponent(provider)}`];
            if (options === null || options === void 0 ? void 0 : options.redirectTo) {
                urlParams.push(`redirect_to=${encodeURIComponent(options.redirectTo)}`);
            }
            if (options === null || options === void 0 ? void 0 : options.scopes) {
                urlParams.push(`scopes=${encodeURIComponent(options.scopes)}`);
            }
            if (this.flowType === 'pkce') {
                const codeVerifier = (0,_lib_helpers__WEBPACK_IMPORTED_MODULE_4__.generatePKCEVerifier)();
                yield (0,_lib_helpers__WEBPACK_IMPORTED_MODULE_4__.setItemAsync)(this.storage, `${this.storageKey}-code-verifier`, codeVerifier);
                const codeChallenge = yield (0,_lib_helpers__WEBPACK_IMPORTED_MODULE_4__.generatePKCEChallenge)(codeVerifier);
                const codeChallengeMethod = codeVerifier === codeChallenge ? 'plain' : 's256';
                const flowParams = new URLSearchParams({
                    code_challenge: `${encodeURIComponent(codeChallenge)}`,
                    code_challenge_method: `${encodeURIComponent(codeChallengeMethod)}`,
                });
                urlParams.push(flowParams.toString());
            }
            if (options === null || options === void 0 ? void 0 : options.queryParams) {
                const query = new URLSearchParams(options.queryParams);
                urlParams.push(query.toString());
            }
            return `${this.url}/authorize?${urlParams.join('&')}`;
        });
    }
    _unenroll(params) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data: sessionData, error: sessionError } = yield this.getSession();
                if (sessionError) {
                    return { data: null, error: sessionError };
                }
                return yield (0,_lib_fetch__WEBPACK_IMPORTED_MODULE_3__._request)(this.fetch, 'DELETE', `${this.url}/factors/${params.factorId}`, {
                    headers: this.headers,
                    jwt: (_a = sessionData === null || sessionData === void 0 ? void 0 : sessionData.session) === null || _a === void 0 ? void 0 : _a.access_token,
                });
            }
            catch (error) {
                if ((0,_lib_errors__WEBPACK_IMPORTED_MODULE_2__.isAuthError)(error)) {
                    return { data: null, error };
                }
                throw error;
            }
        });
    }
    /**
     * {@see GoTrueMFAApi#enroll}
     */
    _enroll(params) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data: sessionData, error: sessionError } = yield this.getSession();
                if (sessionError) {
                    return { data: null, error: sessionError };
                }
                const { data, error } = yield (0,_lib_fetch__WEBPACK_IMPORTED_MODULE_3__._request)(this.fetch, 'POST', `${this.url}/factors`, {
                    body: {
                        friendly_name: params.friendlyName,
                        factor_type: params.factorType,
                        issuer: params.issuer,
                    },
                    headers: this.headers,
                    jwt: (_a = sessionData === null || sessionData === void 0 ? void 0 : sessionData.session) === null || _a === void 0 ? void 0 : _a.access_token,
                });
                if (error) {
                    return { data: null, error };
                }
                if ((_b = data === null || data === void 0 ? void 0 : data.totp) === null || _b === void 0 ? void 0 : _b.qr_code) {
                    data.totp.qr_code = `data:image/svg+xml;utf-8,${data.totp.qr_code}`;
                }
                return { data, error: null };
            }
            catch (error) {
                if ((0,_lib_errors__WEBPACK_IMPORTED_MODULE_2__.isAuthError)(error)) {
                    return { data: null, error };
                }
                throw error;
            }
        });
    }
    /**
     * {@see GoTrueMFAApi#verify}
     */
    _verify(params) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data: sessionData, error: sessionError } = yield this.getSession();
                if (sessionError) {
                    return { data: null, error: sessionError };
                }
                const { data, error } = yield (0,_lib_fetch__WEBPACK_IMPORTED_MODULE_3__._request)(this.fetch, 'POST', `${this.url}/factors/${params.factorId}/verify`, {
                    body: { code: params.code, challenge_id: params.challengeId },
                    headers: this.headers,
                    jwt: (_a = sessionData === null || sessionData === void 0 ? void 0 : sessionData.session) === null || _a === void 0 ? void 0 : _a.access_token,
                });
                if (error) {
                    return { data: null, error };
                }
                yield this._saveSession(Object.assign({ expires_at: Math.round(Date.now() / 1000) + data.expires_in }, data));
                this._notifyAllSubscribers('MFA_CHALLENGE_VERIFIED', data);
                return { data, error };
            }
            catch (error) {
                if ((0,_lib_errors__WEBPACK_IMPORTED_MODULE_2__.isAuthError)(error)) {
                    return { data: null, error };
                }
                throw error;
            }
        });
    }
    /**
     * {@see GoTrueMFAApi#challenge}
     */
    _challenge(params) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data: sessionData, error: sessionError } = yield this.getSession();
                if (sessionError) {
                    return { data: null, error: sessionError };
                }
                return yield (0,_lib_fetch__WEBPACK_IMPORTED_MODULE_3__._request)(this.fetch, 'POST', `${this.url}/factors/${params.factorId}/challenge`, {
                    headers: this.headers,
                    jwt: (_a = sessionData === null || sessionData === void 0 ? void 0 : sessionData.session) === null || _a === void 0 ? void 0 : _a.access_token,
                });
            }
            catch (error) {
                if ((0,_lib_errors__WEBPACK_IMPORTED_MODULE_2__.isAuthError)(error)) {
                    return { data: null, error };
                }
                throw error;
            }
        });
    }
    /**
     * {@see GoTrueMFAApi#challengeAndVerify}
     */
    _challengeAndVerify(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data: challengeData, error: challengeError } = yield this._challenge({
                factorId: params.factorId,
            });
            if (challengeError) {
                return { data: null, error: challengeError };
            }
            return yield this._verify({
                factorId: params.factorId,
                challengeId: challengeData.id,
                code: params.code,
            });
        });
    }
    /**
     * {@see GoTrueMFAApi#listFactors}
     */
    _listFactors() {
        return __awaiter(this, void 0, void 0, function* () {
            const { data: { user }, error: userError, } = yield this.getUser();
            if (userError) {
                return { data: null, error: userError };
            }
            const factors = (user === null || user === void 0 ? void 0 : user.factors) || [];
            const totp = factors.filter((factor) => factor.factor_type === 'totp' && factor.status === 'verified');
            return {
                data: {
                    all: factors,
                    totp,
                },
                error: null,
            };
        });
    }
    /**
     * {@see GoTrueMFAApi#getAuthenticatorAssuranceLevel}
     */
    _getAuthenticatorAssuranceLevel() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const { data: { session }, error: sessionError, } = yield this.getSession();
            if (sessionError) {
                return { data: null, error: sessionError };
            }
            if (!session) {
                return {
                    data: { currentLevel: null, nextLevel: null, currentAuthenticationMethods: [] },
                    error: null,
                };
            }
            const payload = this._decodeJWT(session.access_token);
            let currentLevel = null;
            if (payload.aal) {
                currentLevel = payload.aal;
            }
            let nextLevel = currentLevel;
            const verifiedFactors = (_b = (_a = session.user.factors) === null || _a === void 0 ? void 0 : _a.filter((factor) => factor.status === 'verified')) !== null && _b !== void 0 ? _b : [];
            if (verifiedFactors.length > 0) {
                nextLevel = 'aal2';
            }
            const currentAuthenticationMethods = payload.amr || [];
            return { data: { currentLevel, nextLevel, currentAuthenticationMethods }, error: null };
        });
    }
}
//# sourceMappingURL=GoTrueClient.js.map

/***/ }),

/***/ "./node_modules/@supabase/gotrue-js/dist/module/index.js":
/*!***************************************************************!*\
  !*** ./node_modules/@supabase/gotrue-js/dist/module/index.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AuthApiError: () => (/* reexport safe */ _lib_errors__WEBPACK_IMPORTED_MODULE_3__.AuthApiError),
/* harmony export */   AuthError: () => (/* reexport safe */ _lib_errors__WEBPACK_IMPORTED_MODULE_3__.AuthError),
/* harmony export */   AuthImplicitGrantRedirectError: () => (/* reexport safe */ _lib_errors__WEBPACK_IMPORTED_MODULE_3__.AuthImplicitGrantRedirectError),
/* harmony export */   AuthInvalidCredentialsError: () => (/* reexport safe */ _lib_errors__WEBPACK_IMPORTED_MODULE_3__.AuthInvalidCredentialsError),
/* harmony export */   AuthPKCEGrantCodeExchangeError: () => (/* reexport safe */ _lib_errors__WEBPACK_IMPORTED_MODULE_3__.AuthPKCEGrantCodeExchangeError),
/* harmony export */   AuthRetryableFetchError: () => (/* reexport safe */ _lib_errors__WEBPACK_IMPORTED_MODULE_3__.AuthRetryableFetchError),
/* harmony export */   AuthSessionMissingError: () => (/* reexport safe */ _lib_errors__WEBPACK_IMPORTED_MODULE_3__.AuthSessionMissingError),
/* harmony export */   AuthUnknownError: () => (/* reexport safe */ _lib_errors__WEBPACK_IMPORTED_MODULE_3__.AuthUnknownError),
/* harmony export */   CustomAuthError: () => (/* reexport safe */ _lib_errors__WEBPACK_IMPORTED_MODULE_3__.CustomAuthError),
/* harmony export */   GoTrueAdminApi: () => (/* reexport safe */ _GoTrueAdminApi__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   GoTrueClient: () => (/* reexport safe */ _GoTrueClient__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   isAuthApiError: () => (/* reexport safe */ _lib_errors__WEBPACK_IMPORTED_MODULE_3__.isAuthApiError),
/* harmony export */   isAuthError: () => (/* reexport safe */ _lib_errors__WEBPACK_IMPORTED_MODULE_3__.isAuthError)
/* harmony export */ });
/* harmony import */ var _GoTrueAdminApi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GoTrueAdminApi */ "./node_modules/@supabase/gotrue-js/dist/module/GoTrueAdminApi.js");
/* harmony import */ var _GoTrueClient__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GoTrueClient */ "./node_modules/@supabase/gotrue-js/dist/module/GoTrueClient.js");
/* harmony import */ var _lib_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/types */ "./node_modules/@supabase/gotrue-js/dist/module/lib/types.js");
/* harmony import */ var _lib_errors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lib/errors */ "./node_modules/@supabase/gotrue-js/dist/module/lib/errors.js");





//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@supabase/gotrue-js/dist/module/lib/constants.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@supabase/gotrue-js/dist/module/lib/constants.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AUDIENCE: () => (/* binding */ AUDIENCE),
/* harmony export */   DEFAULT_HEADERS: () => (/* binding */ DEFAULT_HEADERS),
/* harmony export */   EXPIRY_MARGIN: () => (/* binding */ EXPIRY_MARGIN),
/* harmony export */   GOTRUE_URL: () => (/* binding */ GOTRUE_URL),
/* harmony export */   NETWORK_FAILURE: () => (/* binding */ NETWORK_FAILURE),
/* harmony export */   STORAGE_KEY: () => (/* binding */ STORAGE_KEY)
/* harmony export */ });
/* harmony import */ var _version__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./version */ "./node_modules/@supabase/gotrue-js/dist/module/lib/version.js");

const GOTRUE_URL = 'http://localhost:9999';
const STORAGE_KEY = 'supabase.auth.token';
const AUDIENCE = '';
const DEFAULT_HEADERS = { 'X-Client-Info': `gotrue-js/${_version__WEBPACK_IMPORTED_MODULE_0__.version}` };
const EXPIRY_MARGIN = 10; // in seconds
const NETWORK_FAILURE = {
    MAX_RETRIES: 10,
    RETRY_INTERVAL: 2, // in deciseconds
};
//# sourceMappingURL=constants.js.map

/***/ }),

/***/ "./node_modules/@supabase/gotrue-js/dist/module/lib/errors.js":
/*!********************************************************************!*\
  !*** ./node_modules/@supabase/gotrue-js/dist/module/lib/errors.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AuthApiError: () => (/* binding */ AuthApiError),
/* harmony export */   AuthError: () => (/* binding */ AuthError),
/* harmony export */   AuthImplicitGrantRedirectError: () => (/* binding */ AuthImplicitGrantRedirectError),
/* harmony export */   AuthInvalidCredentialsError: () => (/* binding */ AuthInvalidCredentialsError),
/* harmony export */   AuthPKCEGrantCodeExchangeError: () => (/* binding */ AuthPKCEGrantCodeExchangeError),
/* harmony export */   AuthRetryableFetchError: () => (/* binding */ AuthRetryableFetchError),
/* harmony export */   AuthSessionMissingError: () => (/* binding */ AuthSessionMissingError),
/* harmony export */   AuthUnknownError: () => (/* binding */ AuthUnknownError),
/* harmony export */   CustomAuthError: () => (/* binding */ CustomAuthError),
/* harmony export */   isAuthApiError: () => (/* binding */ isAuthApiError),
/* harmony export */   isAuthError: () => (/* binding */ isAuthError)
/* harmony export */ });
class AuthError extends Error {
    constructor(message, status) {
        super(message);
        this.__isAuthError = true;
        this.name = 'AuthError';
        this.status = status;
    }
}
function isAuthError(error) {
    return typeof error === 'object' && error !== null && '__isAuthError' in error;
}
class AuthApiError extends AuthError {
    constructor(message, status) {
        super(message, status);
        this.name = 'AuthApiError';
        this.status = status;
    }
    toJSON() {
        return {
            name: this.name,
            message: this.message,
            status: this.status,
        };
    }
}
function isAuthApiError(error) {
    return isAuthError(error) && error.name === 'AuthApiError';
}
class AuthUnknownError extends AuthError {
    constructor(message, originalError) {
        super(message);
        this.name = 'AuthUnknownError';
        this.originalError = originalError;
    }
}
class CustomAuthError extends AuthError {
    constructor(message, name, status) {
        super(message);
        this.name = name;
        this.status = status;
    }
    toJSON() {
        return {
            name: this.name,
            message: this.message,
            status: this.status,
        };
    }
}
class AuthSessionMissingError extends CustomAuthError {
    constructor() {
        super('Auth session missing!', 'AuthSessionMissingError', 400);
    }
}
class AuthInvalidCredentialsError extends CustomAuthError {
    constructor(message) {
        super(message, 'AuthInvalidCredentialsError', 400);
    }
}
class AuthImplicitGrantRedirectError extends CustomAuthError {
    constructor(message, details = null) {
        super(message, 'AuthImplicitGrantRedirectError', 500);
        this.details = null;
        this.details = details;
    }
    toJSON() {
        return {
            name: this.name,
            message: this.message,
            status: this.status,
            details: this.details,
        };
    }
}
class AuthPKCEGrantCodeExchangeError extends CustomAuthError {
    constructor(message, details = null) {
        super(message, 'AuthPKCEGrantCodeExchangeError', 500);
        this.details = null;
        this.details = details;
    }
    toJSON() {
        return {
            name: this.name,
            message: this.message,
            status: this.status,
            details: this.details,
        };
    }
}
class AuthRetryableFetchError extends CustomAuthError {
    constructor(message, status) {
        super(message, 'AuthRetryableFetchError', status);
    }
}
//# sourceMappingURL=errors.js.map

/***/ }),

/***/ "./node_modules/@supabase/gotrue-js/dist/module/lib/fetch.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@supabase/gotrue-js/dist/module/lib/fetch.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   _generateLinkResponse: () => (/* binding */ _generateLinkResponse),
/* harmony export */   _noResolveJsonResponse: () => (/* binding */ _noResolveJsonResponse),
/* harmony export */   _request: () => (/* binding */ _request),
/* harmony export */   _sessionResponse: () => (/* binding */ _sessionResponse),
/* harmony export */   _ssoResponse: () => (/* binding */ _ssoResponse),
/* harmony export */   _userResponse: () => (/* binding */ _userResponse)
/* harmony export */ });
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers */ "./node_modules/@supabase/gotrue-js/dist/module/lib/helpers.js");
/* harmony import */ var _errors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./errors */ "./node_modules/@supabase/gotrue-js/dist/module/lib/errors.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (undefined && undefined.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};


const _getErrorMessage = (err) => err.msg || err.message || err.error_description || err.error || JSON.stringify(err);
const handleError = (error, reject) => __awaiter(void 0, void 0, void 0, function* () {
    const NETWORK_ERROR_CODES = [502, 503, 504];
    if (!(0,_helpers__WEBPACK_IMPORTED_MODULE_0__.looksLikeFetchResponse)(error)) {
        reject(new _errors__WEBPACK_IMPORTED_MODULE_1__.AuthRetryableFetchError(_getErrorMessage(error), 0));
    }
    else if (NETWORK_ERROR_CODES.includes(error.status)) {
        // status in 500...599 range - server had an error, request might be retryed.
        reject(new _errors__WEBPACK_IMPORTED_MODULE_1__.AuthRetryableFetchError(_getErrorMessage(error), error.status));
    }
    else {
        // got a response from server that is not in the 500...599 range - should not retry
        error
            .json()
            .then((err) => {
            reject(new _errors__WEBPACK_IMPORTED_MODULE_1__.AuthApiError(_getErrorMessage(err), error.status || 500));
        })
            .catch((e) => {
            // not a valid json response
            reject(new _errors__WEBPACK_IMPORTED_MODULE_1__.AuthUnknownError(_getErrorMessage(e), e));
        });
    }
});
const _getRequestParams = (method, options, parameters, body) => {
    const params = { method, headers: (options === null || options === void 0 ? void 0 : options.headers) || {} };
    if (method === 'GET') {
        return params;
    }
    params.headers = Object.assign({ 'Content-Type': 'application/json;charset=UTF-8' }, options === null || options === void 0 ? void 0 : options.headers);
    params.body = JSON.stringify(body);
    return Object.assign(Object.assign({}, params), parameters);
};
function _request(fetcher, method, url, options) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const headers = Object.assign({}, options === null || options === void 0 ? void 0 : options.headers);
        if (options === null || options === void 0 ? void 0 : options.jwt) {
            headers['Authorization'] = `Bearer ${options.jwt}`;
        }
        const qs = (_a = options === null || options === void 0 ? void 0 : options.query) !== null && _a !== void 0 ? _a : {};
        if (options === null || options === void 0 ? void 0 : options.redirectTo) {
            qs['redirect_to'] = options.redirectTo;
        }
        const queryString = Object.keys(qs).length ? '?' + new URLSearchParams(qs).toString() : '';
        const data = yield _handleRequest(fetcher, method, url + queryString, { headers, noResolveJson: options === null || options === void 0 ? void 0 : options.noResolveJson }, {}, options === null || options === void 0 ? void 0 : options.body);
        return (options === null || options === void 0 ? void 0 : options.xform) ? options === null || options === void 0 ? void 0 : options.xform(data) : { data: Object.assign({}, data), error: null };
    });
}
function _handleRequest(fetcher, method, url, options, parameters, body) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            fetcher(url, _getRequestParams(method, options, parameters, body))
                .then((result) => {
                if (!result.ok)
                    throw result;
                if (options === null || options === void 0 ? void 0 : options.noResolveJson)
                    return result;
                return result.json();
            })
                .then((data) => resolve(data))
                .catch((error) => handleError(error, reject));
        });
    });
}
function _sessionResponse(data) {
    var _a;
    let session = null;
    if (hasSession(data)) {
        session = Object.assign({}, data);
        session.expires_at = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.expiresAt)(data.expires_in);
    }
    const user = (_a = data.user) !== null && _a !== void 0 ? _a : data;
    return { data: { session, user }, error: null };
}
function _userResponse(data) {
    var _a;
    const user = (_a = data.user) !== null && _a !== void 0 ? _a : data;
    return { data: { user }, error: null };
}
function _ssoResponse(data) {
    return { data, error: null };
}
function _generateLinkResponse(data) {
    const { action_link, email_otp, hashed_token, redirect_to, verification_type } = data, rest = __rest(data, ["action_link", "email_otp", "hashed_token", "redirect_to", "verification_type"]);
    const properties = {
        action_link,
        email_otp,
        hashed_token,
        redirect_to,
        verification_type,
    };
    const user = Object.assign({}, rest);
    return {
        data: {
            properties,
            user,
        },
        error: null,
    };
}
function _noResolveJsonResponse(data) {
    return data;
}
/**
 * hasSession checks if the response object contains a valid session
 * @param data A response object
 * @returns true if a session is in the response
 */
function hasSession(data) {
    return data.access_token && data.refresh_token && data.expires_in;
}
//# sourceMappingURL=fetch.js.map

/***/ }),

/***/ "./node_modules/@supabase/gotrue-js/dist/module/lib/helpers.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@supabase/gotrue-js/dist/module/lib/helpers.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Deferred: () => (/* binding */ Deferred),
/* harmony export */   decodeBase64URL: () => (/* binding */ decodeBase64URL),
/* harmony export */   decodeJWTPayload: () => (/* binding */ decodeJWTPayload),
/* harmony export */   expiresAt: () => (/* binding */ expiresAt),
/* harmony export */   generatePKCEChallenge: () => (/* binding */ generatePKCEChallenge),
/* harmony export */   generatePKCEVerifier: () => (/* binding */ generatePKCEVerifier),
/* harmony export */   getItemAsync: () => (/* binding */ getItemAsync),
/* harmony export */   getParameterByName: () => (/* binding */ getParameterByName),
/* harmony export */   isBrowser: () => (/* binding */ isBrowser),
/* harmony export */   looksLikeFetchResponse: () => (/* binding */ looksLikeFetchResponse),
/* harmony export */   removeItemAsync: () => (/* binding */ removeItemAsync),
/* harmony export */   resolveFetch: () => (/* binding */ resolveFetch),
/* harmony export */   retryable: () => (/* binding */ retryable),
/* harmony export */   setItemAsync: () => (/* binding */ setItemAsync),
/* harmony export */   sleep: () => (/* binding */ sleep),
/* harmony export */   supportsLocalStorage: () => (/* binding */ supportsLocalStorage),
/* harmony export */   uuid: () => (/* binding */ uuid)
/* harmony export */ });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function expiresAt(expiresIn) {
    const timeNow = Math.round(Date.now() / 1000);
    return timeNow + expiresIn;
}
function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0, v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}
const isBrowser = () => typeof document !== 'undefined';
const localStorageWriteTests = {
    tested: false,
    writable: false,
};
/**
 * Checks whether localStorage is supported on this browser.
 */
const supportsLocalStorage = () => {
    if (!isBrowser()) {
        return false;
    }
    try {
        if (typeof globalThis.localStorage !== 'object') {
            return false;
        }
    }
    catch (e) {
        // DOM exception when accessing `localStorage`
        return false;
    }
    if (localStorageWriteTests.tested) {
        return localStorageWriteTests.writable;
    }
    const randomKey = `lswt-${Math.random()}${Math.random()}`;
    try {
        globalThis.localStorage.setItem(randomKey, randomKey);
        globalThis.localStorage.removeItem(randomKey);
        localStorageWriteTests.tested = true;
        localStorageWriteTests.writable = true;
    }
    catch (e) {
        // localStorage can't be written to
        // https://www.chromium.org/for-testers/bug-reporting-guidelines/uncaught-securityerror-failed-to-read-the-localstorage-property-from-window-access-is-denied-for-this-document
        localStorageWriteTests.tested = true;
        localStorageWriteTests.writable = false;
    }
    return localStorageWriteTests.writable;
};
function getParameterByName(name, url) {
    var _a;
    if (!url)
        url = ((_a = window === null || window === void 0 ? void 0 : window.location) === null || _a === void 0 ? void 0 : _a.href) || '';
    // eslint-disable-next-line no-useless-escape
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp('[?&#]' + name + '(=([^&#]*)|&|#|$)'), results = regex.exec(url);
    if (!results)
        return null;
    if (!results[2])
        return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
const resolveFetch = (customFetch) => {
    let _fetch;
    if (customFetch) {
        _fetch = customFetch;
    }
    else if (typeof fetch === 'undefined') {
        _fetch = (...args) => __awaiter(void 0, void 0, void 0, function* () { return yield (yield Promise.resolve(/*! import() */).then(__webpack_require__.t.bind(__webpack_require__, /*! cross-fetch */ "./node_modules/cross-fetch/dist/browser-ponyfill.js", 23))).fetch(...args); });
    }
    else {
        _fetch = fetch;
    }
    return (...args) => _fetch(...args);
};
const looksLikeFetchResponse = (maybeResponse) => {
    return (typeof maybeResponse === 'object' &&
        maybeResponse !== null &&
        'status' in maybeResponse &&
        'ok' in maybeResponse &&
        'json' in maybeResponse &&
        typeof maybeResponse.json === 'function');
};
// Storage helpers
const setItemAsync = (storage, key, data) => __awaiter(void 0, void 0, void 0, function* () {
    yield storage.setItem(key, JSON.stringify(data));
});
const getItemAsync = (storage, key) => __awaiter(void 0, void 0, void 0, function* () {
    const value = yield storage.getItem(key);
    if (!value) {
        return null;
    }
    try {
        return JSON.parse(value);
    }
    catch (_a) {
        return value;
    }
});
const removeItemAsync = (storage, key) => __awaiter(void 0, void 0, void 0, function* () {
    yield storage.removeItem(key);
});
function decodeBase64URL(value) {
    const key = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    let base64 = '';
    let chr1, chr2, chr3;
    let enc1, enc2, enc3, enc4;
    let i = 0;
    value = value.replace('-', '+').replace('_', '/');
    while (i < value.length) {
        enc1 = key.indexOf(value.charAt(i++));
        enc2 = key.indexOf(value.charAt(i++));
        enc3 = key.indexOf(value.charAt(i++));
        enc4 = key.indexOf(value.charAt(i++));
        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;
        base64 = base64 + String.fromCharCode(chr1);
        if (enc3 != 64 && chr2 != 0) {
            base64 = base64 + String.fromCharCode(chr2);
        }
        if (enc4 != 64 && chr3 != 0) {
            base64 = base64 + String.fromCharCode(chr3);
        }
    }
    return base64;
}
/**
 * A deferred represents some asynchronous work that is not yet finished, which
 * may or may not culminate in a value.
 * Taken from: https://github.com/mike-north/types/blob/master/src/async.ts
 */
class Deferred {
    constructor() {
        // eslint-disable-next-line @typescript-eslint/no-extra-semi
        ;
        this.promise = new Deferred.promiseConstructor((res, rej) => {
            // eslint-disable-next-line @typescript-eslint/no-extra-semi
            ;
            this.resolve = res;
            this.reject = rej;
        });
    }
}
Deferred.promiseConstructor = Promise;
// Taken from: https://stackoverflow.com/questions/38552003/how-to-decode-jwt-token-in-javascript-without-using-a-library
function decodeJWTPayload(token) {
    // Regex checks for base64url format
    const base64UrlRegex = /^([a-z0-9_-]{4})*($|[a-z0-9_-]{3}=?$|[a-z0-9_-]{2}(==)?$)$/i;
    const parts = token.split('.');
    if (parts.length !== 3) {
        throw new Error('JWT is not valid: not a JWT structure');
    }
    if (!base64UrlRegex.test(parts[1])) {
        throw new Error('JWT is not valid: payload is not in base64url format');
    }
    const base64Url = parts[1];
    return JSON.parse(decodeBase64URL(base64Url));
}
/**
 * Creates a promise that resolves to null after some time.
 */
function sleep(time) {
    return new Promise((accept) => {
        setTimeout(() => accept(null), time);
    });
}
/**
 * Converts the provided async function into a retryable function. Each result
 * or thrown error is sent to the isRetryable function which should return true
 * if the function should run again.
 */
function retryable(fn, isRetryable) {
    const promise = new Promise((accept, reject) => {
        // eslint-disable-next-line @typescript-eslint/no-extra-semi
        ;
        (() => __awaiter(this, void 0, void 0, function* () {
            for (let attempt = 0; attempt < Infinity; attempt++) {
                try {
                    const result = yield fn(attempt);
                    if (!isRetryable(attempt, null, result)) {
                        accept(result);
                        return;
                    }
                }
                catch (e) {
                    if (!isRetryable(attempt, e)) {
                        reject(e);
                        return;
                    }
                }
            }
        }))();
    });
    return promise;
}
function dec2hex(dec) {
    return ('0' + dec.toString(16)).substr(-2);
}
// Functions below taken from: https://stackoverflow.com/questions/63309409/creating-a-code-verifier-and-challenge-for-pkce-auth-on-spotify-api-in-reactjs
function generatePKCEVerifier() {
    const verifierLength = 56;
    const array = new Uint32Array(verifierLength);
    if (typeof crypto === 'undefined') {
        const charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
        const charSetLen = charSet.length;
        let verifier = '';
        for (let i = 0; i < verifierLength; i++) {
            verifier += charSet.charAt(Math.floor(Math.random() * charSetLen));
        }
        return verifier;
    }
    crypto.getRandomValues(array);
    return Array.from(array, dec2hex).join('');
}
function sha256(randomString) {
    return __awaiter(this, void 0, void 0, function* () {
        const encoder = new TextEncoder();
        const encodedData = encoder.encode(randomString);
        const hash = yield crypto.subtle.digest('SHA-256', encodedData);
        const bytes = new Uint8Array(hash);
        return Array.from(bytes)
            .map((c) => String.fromCharCode(c))
            .join('');
    });
}
function base64urlencode(str) {
    return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
function generatePKCEChallenge(verifier) {
    return __awaiter(this, void 0, void 0, function* () {
        if (typeof crypto === 'undefined') {
            console.warn('WebCrypto API is not supported. Code challenge method will default to use plain instead of sha256.');
            return verifier;
        }
        const hashed = yield sha256(verifier);
        return base64urlencode(hashed);
    });
}
//# sourceMappingURL=helpers.js.map

/***/ }),

/***/ "./node_modules/@supabase/gotrue-js/dist/module/lib/local-storage.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@supabase/gotrue-js/dist/module/lib/local-storage.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers */ "./node_modules/@supabase/gotrue-js/dist/module/lib/helpers.js");

const localStorageAdapter = {
    getItem: (key) => {
        if (!(0,_helpers__WEBPACK_IMPORTED_MODULE_0__.supportsLocalStorage)()) {
            return null;
        }
        return globalThis.localStorage.getItem(key);
    },
    setItem: (key, value) => {
        if (!(0,_helpers__WEBPACK_IMPORTED_MODULE_0__.supportsLocalStorage)()) {
            return;
        }
        globalThis.localStorage.setItem(key, value);
    },
    removeItem: (key) => {
        if (!(0,_helpers__WEBPACK_IMPORTED_MODULE_0__.supportsLocalStorage)()) {
            return;
        }
        globalThis.localStorage.removeItem(key);
    },
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (localStorageAdapter);
//# sourceMappingURL=local-storage.js.map

/***/ }),

/***/ "./node_modules/@supabase/gotrue-js/dist/module/lib/polyfills.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@supabase/gotrue-js/dist/module/lib/polyfills.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   polyfillGlobalThis: () => (/* binding */ polyfillGlobalThis)
/* harmony export */ });
/**
 * https://mathiasbynens.be/notes/globalthis
 */
function polyfillGlobalThis() {
    if (typeof globalThis === 'object')
        return;
    try {
        Object.defineProperty(Object.prototype, '__magic__', {
            get: function () {
                return this;
            },
            configurable: true,
        });
        // @ts-expect-error 'Allow access to magic'
        __magic__.globalThis = __magic__;
        // @ts-expect-error 'Allow access to magic'
        delete Object.prototype.__magic__;
    }
    catch (e) {
        if (typeof self !== 'undefined') {
            // @ts-expect-error 'Allow access to globals'
            self.globalThis = self;
        }
    }
}
//# sourceMappingURL=polyfills.js.map

/***/ }),

/***/ "./node_modules/@supabase/gotrue-js/dist/module/lib/types.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@supabase/gotrue-js/dist/module/lib/types.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);

//# sourceMappingURL=types.js.map

/***/ }),

/***/ "./node_modules/@supabase/gotrue-js/dist/module/lib/version.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@supabase/gotrue-js/dist/module/lib/version.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   version: () => (/* binding */ version)
/* harmony export */ });
// Generated by genversion.
const version = '2.28.0';
//# sourceMappingURL=version.js.map

/***/ }),

/***/ "./node_modules/@supabase/postgrest-js/dist/module/PostgrestBuilder.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@supabase/postgrest-js/dist/module/PostgrestBuilder.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PostgrestBuilder)
/* harmony export */ });
/* harmony import */ var cross_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cross-fetch */ "./node_modules/cross-fetch/dist/browser-ponyfill.js");
/* harmony import */ var cross_fetch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(cross_fetch__WEBPACK_IMPORTED_MODULE_0__);

class PostgrestBuilder {
    constructor(builder) {
        this.shouldThrowOnError = false;
        this.method = builder.method;
        this.url = builder.url;
        this.headers = builder.headers;
        this.schema = builder.schema;
        this.body = builder.body;
        this.shouldThrowOnError = builder.shouldThrowOnError;
        this.signal = builder.signal;
        this.isMaybeSingle = builder.isMaybeSingle;
        if (builder.fetch) {
            this.fetch = builder.fetch;
        }
        else if (typeof fetch === 'undefined') {
            this.fetch = (cross_fetch__WEBPACK_IMPORTED_MODULE_0___default());
        }
        else {
            this.fetch = fetch;
        }
    }
    /**
     * If there's an error with the query, throwOnError will reject the promise by
     * throwing the error instead of returning it as part of a successful response.
     *
     * {@link https://github.com/supabase/supabase-js/issues/92}
     */
    throwOnError() {
        this.shouldThrowOnError = true;
        return this;
    }
    then(onfulfilled, onrejected) {
        // https://postgrest.org/en/stable/api.html#switching-schemas
        if (this.schema === undefined) {
            // skip
        }
        else if (['GET', 'HEAD'].includes(this.method)) {
            this.headers['Accept-Profile'] = this.schema;
        }
        else {
            this.headers['Content-Profile'] = this.schema;
        }
        if (this.method !== 'GET' && this.method !== 'HEAD') {
            this.headers['Content-Type'] = 'application/json';
        }
        // NOTE: Invoke w/o `this` to avoid illegal invocation error.
        // https://github.com/supabase/postgrest-js/pull/247
        const _fetch = this.fetch;
        let res = _fetch(this.url.toString(), {
            method: this.method,
            headers: this.headers,
            body: JSON.stringify(this.body),
            signal: this.signal,
        }).then(async (res) => {
            var _a, _b, _c;
            let error = null;
            let data = null;
            let count = null;
            let status = res.status;
            let statusText = res.statusText;
            if (res.ok) {
                if (this.method !== 'HEAD') {
                    const body = await res.text();
                    if (body === '') {
                        // Prefer: return=minimal
                    }
                    else if (this.headers['Accept'] === 'text/csv') {
                        data = body;
                    }
                    else if (this.headers['Accept'] &&
                        this.headers['Accept'].includes('application/vnd.pgrst.plan+text')) {
                        data = body;
                    }
                    else {
                        data = JSON.parse(body);
                    }
                }
                const countHeader = (_a = this.headers['Prefer']) === null || _a === void 0 ? void 0 : _a.match(/count=(exact|planned|estimated)/);
                const contentRange = (_b = res.headers.get('content-range')) === null || _b === void 0 ? void 0 : _b.split('/');
                if (countHeader && contentRange && contentRange.length > 1) {
                    count = parseInt(contentRange[1]);
                }
                // Temporary partial fix for https://github.com/supabase/postgrest-js/issues/361
                // Issue persists e.g. for `.insert([...]).select().maybeSingle()`
                if (this.isMaybeSingle && this.method === 'GET' && Array.isArray(data)) {
                    if (data.length > 1) {
                        error = {
                            // https://github.com/PostgREST/postgrest/blob/a867d79c42419af16c18c3fb019eba8df992626f/src/PostgREST/Error.hs#L553
                            code: 'PGRST116',
                            details: `Results contain ${data.length} rows, application/vnd.pgrst.object+json requires 1 row`,
                            hint: null,
                            message: 'JSON object requested, multiple (or no) rows returned',
                        };
                        data = null;
                        count = null;
                        status = 406;
                        statusText = 'Not Acceptable';
                    }
                    else if (data.length === 1) {
                        data = data[0];
                    }
                    else {
                        data = null;
                    }
                }
            }
            else {
                const body = await res.text();
                try {
                    error = JSON.parse(body);
                    // Workaround for https://github.com/supabase/postgrest-js/issues/295
                    if (Array.isArray(error) && res.status === 404) {
                        data = [];
                        error = null;
                        status = 200;
                        statusText = 'OK';
                    }
                }
                catch (_d) {
                    // Workaround for https://github.com/supabase/postgrest-js/issues/295
                    if (res.status === 404 && body === '') {
                        status = 204;
                        statusText = 'No Content';
                    }
                    else {
                        error = {
                            message: body,
                        };
                    }
                }
                if (error && this.isMaybeSingle && ((_c = error === null || error === void 0 ? void 0 : error.details) === null || _c === void 0 ? void 0 : _c.includes('Results contain 0 rows'))) {
                    error = null;
                    status = 200;
                    statusText = 'OK';
                }
                if (error && this.shouldThrowOnError) {
                    throw error;
                }
            }
            const postgrestResponse = {
                error,
                data,
                count,
                status,
                statusText,
            };
            return postgrestResponse;
        });
        if (!this.shouldThrowOnError) {
            res = res.catch((fetchError) => {
                var _a, _b, _c;
                return ({
                    error: {
                        message: `${(_a = fetchError === null || fetchError === void 0 ? void 0 : fetchError.name) !== null && _a !== void 0 ? _a : 'FetchError'}: ${fetchError === null || fetchError === void 0 ? void 0 : fetchError.message}`,
                        details: `${(_b = fetchError === null || fetchError === void 0 ? void 0 : fetchError.stack) !== null && _b !== void 0 ? _b : ''}`,
                        hint: '',
                        code: `${(_c = fetchError === null || fetchError === void 0 ? void 0 : fetchError.code) !== null && _c !== void 0 ? _c : ''}`,
                    },
                    data: null,
                    count: null,
                    status: 0,
                    statusText: '',
                });
            });
        }
        return res.then(onfulfilled, onrejected);
    }
}
//# sourceMappingURL=PostgrestBuilder.js.map

/***/ }),

/***/ "./node_modules/@supabase/postgrest-js/dist/module/PostgrestClient.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@supabase/postgrest-js/dist/module/PostgrestClient.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PostgrestClient)
/* harmony export */ });
/* harmony import */ var _PostgrestQueryBuilder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PostgrestQueryBuilder */ "./node_modules/@supabase/postgrest-js/dist/module/PostgrestQueryBuilder.js");
/* harmony import */ var _PostgrestFilterBuilder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PostgrestFilterBuilder */ "./node_modules/@supabase/postgrest-js/dist/module/PostgrestFilterBuilder.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants */ "./node_modules/@supabase/postgrest-js/dist/module/constants.js");



/**
 * PostgREST client.
 *
 * @typeParam Database - Types for the schema from the [type
 * generator](https://supabase.com/docs/reference/javascript/next/typescript-support)
 *
 * @typeParam SchemaName - Postgres schema to switch to. Must be a string
 * literal, the same one passed to the constructor. If the schema is not
 * `"public"`, this must be supplied manually.
 */
class PostgrestClient {
    // TODO: Add back shouldThrowOnError once we figure out the typings
    /**
     * Creates a PostgREST client.
     *
     * @param url - URL of the PostgREST endpoint
     * @param options - Named parameters
     * @param options.headers - Custom headers
     * @param options.schema - Postgres schema to switch to
     * @param options.fetch - Custom fetch
     */
    constructor(url, { headers = {}, schema, fetch, } = {}) {
        this.url = url;
        this.headers = Object.assign(Object.assign({}, _constants__WEBPACK_IMPORTED_MODULE_2__.DEFAULT_HEADERS), headers);
        this.schema = schema;
        this.fetch = fetch;
    }
    /**
     * Perform a query on a table or a view.
     *
     * @param relation - The table or view name to query
     */
    from(relation) {
        const url = new URL(`${this.url}/${relation}`);
        return new _PostgrestQueryBuilder__WEBPACK_IMPORTED_MODULE_0__["default"](url, {
            headers: Object.assign({}, this.headers),
            schema: this.schema,
            fetch: this.fetch,
        });
    }
    /**
     * Perform a function call.
     *
     * @param fn - The function name to call
     * @param args - The arguments to pass to the function call
     * @param options - Named parameters
     * @param options.head - When set to `true`, `data` will not be returned.
     * Useful if you only need the count.
     * @param options.count - Count algorithm to use to count rows returned by the
     * function. Only applicable for [set-returning
     * functions](https://www.postgresql.org/docs/current/functions-srf.html).
     *
     * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
     * hood.
     *
     * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
     * statistics under the hood.
     *
     * `"estimated"`: Uses exact count for low numbers and planned count for high
     * numbers.
     */
    rpc(fn, args = {}, { head = false, count, } = {}) {
        let method;
        const url = new URL(`${this.url}/rpc/${fn}`);
        let body;
        if (head) {
            method = 'HEAD';
            Object.entries(args).forEach(([name, value]) => {
                url.searchParams.append(name, `${value}`);
            });
        }
        else {
            method = 'POST';
            body = args;
        }
        const headers = Object.assign({}, this.headers);
        if (count) {
            headers['Prefer'] = `count=${count}`;
        }
        return new _PostgrestFilterBuilder__WEBPACK_IMPORTED_MODULE_1__["default"]({
            method,
            url,
            headers,
            schema: this.schema,
            body,
            fetch: this.fetch,
            allowEmpty: false,
        });
    }
}
//# sourceMappingURL=PostgrestClient.js.map

/***/ }),

/***/ "./node_modules/@supabase/postgrest-js/dist/module/PostgrestFilterBuilder.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/@supabase/postgrest-js/dist/module/PostgrestFilterBuilder.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PostgrestFilterBuilder)
/* harmony export */ });
/* harmony import */ var _PostgrestTransformBuilder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PostgrestTransformBuilder */ "./node_modules/@supabase/postgrest-js/dist/module/PostgrestTransformBuilder.js");

class PostgrestFilterBuilder extends _PostgrestTransformBuilder__WEBPACK_IMPORTED_MODULE_0__["default"] {
    /**
     * Match only rows where `column` is equal to `value`.
     *
     * To check if the value of `column` is NULL, you should use `.is()` instead.
     *
     * @param column - The column to filter on
     * @param value - The value to filter with
     */
    eq(column, value) {
        this.url.searchParams.append(column, `eq.${value}`);
        return this;
    }
    /**
     * Match only rows where `column` is not equal to `value`.
     *
     * @param column - The column to filter on
     * @param value - The value to filter with
     */
    neq(column, value) {
        this.url.searchParams.append(column, `neq.${value}`);
        return this;
    }
    /**
     * Match only rows where `column` is greater than `value`.
     *
     * @param column - The column to filter on
     * @param value - The value to filter with
     */
    gt(column, value) {
        this.url.searchParams.append(column, `gt.${value}`);
        return this;
    }
    /**
     * Match only rows where `column` is greater than or equal to `value`.
     *
     * @param column - The column to filter on
     * @param value - The value to filter with
     */
    gte(column, value) {
        this.url.searchParams.append(column, `gte.${value}`);
        return this;
    }
    /**
     * Match only rows where `column` is less than `value`.
     *
     * @param column - The column to filter on
     * @param value - The value to filter with
     */
    lt(column, value) {
        this.url.searchParams.append(column, `lt.${value}`);
        return this;
    }
    /**
     * Match only rows where `column` is less than or equal to `value`.
     *
     * @param column - The column to filter on
     * @param value - The value to filter with
     */
    lte(column, value) {
        this.url.searchParams.append(column, `lte.${value}`);
        return this;
    }
    /**
     * Match only rows where `column` matches `pattern` case-sensitively.
     *
     * @param column - The column to filter on
     * @param pattern - The pattern to match with
     */
    like(column, pattern) {
        this.url.searchParams.append(column, `like.${pattern}`);
        return this;
    }
    /**
     * Match only rows where `column` matches all of `patterns` case-sensitively.
     *
     * @param column - The column to filter on
     * @param patterns - The patterns to match with
     */
    likeAllOf(column, patterns) {
        this.url.searchParams.append(column, `like(all).{${patterns.join(',')}}`);
        return this;
    }
    /**
     * Match only rows where `column` matches any of `patterns` case-sensitively.
     *
     * @param column - The column to filter on
     * @param patterns - The patterns to match with
     */
    likeAnyOf(column, patterns) {
        this.url.searchParams.append(column, `like(any).{${patterns.join(',')}}`);
        return this;
    }
    /**
     * Match only rows where `column` matches `pattern` case-insensitively.
     *
     * @param column - The column to filter on
     * @param pattern - The pattern to match with
     */
    ilike(column, pattern) {
        this.url.searchParams.append(column, `ilike.${pattern}`);
        return this;
    }
    /**
     * Match only rows where `column` matches all of `patterns` case-insensitively.
     *
     * @param column - The column to filter on
     * @param patterns - The patterns to match with
     */
    ilikeAllOf(column, patterns) {
        this.url.searchParams.append(column, `ilike(all).{${patterns.join(',')}}`);
        return this;
    }
    /**
     * Match only rows where `column` matches any of `patterns` case-insensitively.
     *
     * @param column - The column to filter on
     * @param patterns - The patterns to match with
     */
    ilikeAnyOf(column, patterns) {
        this.url.searchParams.append(column, `ilike(any).{${patterns.join(',')}}`);
        return this;
    }
    /**
     * Match only rows where `column` IS `value`.
     *
     * For non-boolean columns, this is only relevant for checking if the value of
     * `column` is NULL by setting `value` to `null`.
     *
     * For boolean columns, you can also set `value` to `true` or `false` and it
     * will behave the same way as `.eq()`.
     *
     * @param column - The column to filter on
     * @param value - The value to filter with
     */
    is(column, value) {
        this.url.searchParams.append(column, `is.${value}`);
        return this;
    }
    /**
     * Match only rows where `column` is included in the `values` array.
     *
     * @param column - The column to filter on
     * @param values - The values array to filter with
     */
    in(column, values) {
        const cleanedValues = values
            .map((s) => {
            // handle postgrest reserved characters
            // https://postgrest.org/en/v7.0.0/api.html#reserved-characters
            if (typeof s === 'string' && new RegExp('[,()]').test(s))
                return `"${s}"`;
            else
                return `${s}`;
        })
            .join(',');
        this.url.searchParams.append(column, `in.(${cleanedValues})`);
        return this;
    }
    /**
     * Only relevant for jsonb, array, and range columns. Match only rows where
     * `column` contains every element appearing in `value`.
     *
     * @param column - The jsonb, array, or range column to filter on
     * @param value - The jsonb, array, or range value to filter with
     */
    contains(column, value) {
        if (typeof value === 'string') {
            // range types can be inclusive '[', ']' or exclusive '(', ')' so just
            // keep it simple and accept a string
            this.url.searchParams.append(column, `cs.${value}`);
        }
        else if (Array.isArray(value)) {
            // array
            this.url.searchParams.append(column, `cs.{${value.join(',')}}`);
        }
        else {
            // json
            this.url.searchParams.append(column, `cs.${JSON.stringify(value)}`);
        }
        return this;
    }
    /**
     * Only relevant for jsonb, array, and range columns. Match only rows where
     * every element appearing in `column` is contained by `value`.
     *
     * @param column - The jsonb, array, or range column to filter on
     * @param value - The jsonb, array, or range value to filter with
     */
    containedBy(column, value) {
        if (typeof value === 'string') {
            // range
            this.url.searchParams.append(column, `cd.${value}`);
        }
        else if (Array.isArray(value)) {
            // array
            this.url.searchParams.append(column, `cd.{${value.join(',')}}`);
        }
        else {
            // json
            this.url.searchParams.append(column, `cd.${JSON.stringify(value)}`);
        }
        return this;
    }
    /**
     * Only relevant for range columns. Match only rows where every element in
     * `column` is greater than any element in `range`.
     *
     * @param column - The range column to filter on
     * @param range - The range to filter with
     */
    rangeGt(column, range) {
        this.url.searchParams.append(column, `sr.${range}`);
        return this;
    }
    /**
     * Only relevant for range columns. Match only rows where every element in
     * `column` is either contained in `range` or greater than any element in
     * `range`.
     *
     * @param column - The range column to filter on
     * @param range - The range to filter with
     */
    rangeGte(column, range) {
        this.url.searchParams.append(column, `nxl.${range}`);
        return this;
    }
    /**
     * Only relevant for range columns. Match only rows where every element in
     * `column` is less than any element in `range`.
     *
     * @param column - The range column to filter on
     * @param range - The range to filter with
     */
    rangeLt(column, range) {
        this.url.searchParams.append(column, `sl.${range}`);
        return this;
    }
    /**
     * Only relevant for range columns. Match only rows where every element in
     * `column` is either contained in `range` or less than any element in
     * `range`.
     *
     * @param column - The range column to filter on
     * @param range - The range to filter with
     */
    rangeLte(column, range) {
        this.url.searchParams.append(column, `nxr.${range}`);
        return this;
    }
    /**
     * Only relevant for range columns. Match only rows where `column` is
     * mutually exclusive to `range` and there can be no element between the two
     * ranges.
     *
     * @param column - The range column to filter on
     * @param range - The range to filter with
     */
    rangeAdjacent(column, range) {
        this.url.searchParams.append(column, `adj.${range}`);
        return this;
    }
    /**
     * Only relevant for array and range columns. Match only rows where
     * `column` and `value` have an element in common.
     *
     * @param column - The array or range column to filter on
     * @param value - The array or range value to filter with
     */
    overlaps(column, value) {
        if (typeof value === 'string') {
            // range
            this.url.searchParams.append(column, `ov.${value}`);
        }
        else {
            // array
            this.url.searchParams.append(column, `ov.{${value.join(',')}}`);
        }
        return this;
    }
    /**
     * Only relevant for text and tsvector columns. Match only rows where
     * `column` matches the query string in `query`.
     *
     * @param column - The text or tsvector column to filter on
     * @param query - The query text to match with
     * @param options - Named parameters
     * @param options.config - The text search configuration to use
     * @param options.type - Change how the `query` text is interpreted
     */
    textSearch(column, query, { config, type } = {}) {
        let typePart = '';
        if (type === 'plain') {
            typePart = 'pl';
        }
        else if (type === 'phrase') {
            typePart = 'ph';
        }
        else if (type === 'websearch') {
            typePart = 'w';
        }
        const configPart = config === undefined ? '' : `(${config})`;
        this.url.searchParams.append(column, `${typePart}fts${configPart}.${query}`);
        return this;
    }
    /**
     * Match only rows where each column in `query` keys is equal to its
     * associated value. Shorthand for multiple `.eq()`s.
     *
     * @param query - The object to filter with, with column names as keys mapped
     * to their filter values
     */
    match(query) {
        Object.entries(query).forEach(([column, value]) => {
            this.url.searchParams.append(column, `eq.${value}`);
        });
        return this;
    }
    /**
     * Match only rows which doesn't satisfy the filter.
     *
     * Unlike most filters, `opearator` and `value` are used as-is and need to
     * follow [PostgREST
     * syntax](https://postgrest.org/en/stable/api.html#operators). You also need
     * to make sure they are properly sanitized.
     *
     * @param column - The column to filter on
     * @param operator - The operator to be negated to filter with, following
     * PostgREST syntax
     * @param value - The value to filter with, following PostgREST syntax
     */
    not(column, operator, value) {
        this.url.searchParams.append(column, `not.${operator}.${value}`);
        return this;
    }
    /**
     * Match only rows which satisfy at least one of the filters.
     *
     * Unlike most filters, `filters` is used as-is and needs to follow [PostgREST
     * syntax](https://postgrest.org/en/stable/api.html#operators). You also need
     * to make sure it's properly sanitized.
     *
     * It's currently not possible to do an `.or()` filter across multiple tables.
     *
     * @param filters - The filters to use, following PostgREST syntax
     * @param foreignTable - Set this to filter on foreign tables instead of the
     * current table
     */
    or(filters, { foreignTable } = {}) {
        const key = foreignTable ? `${foreignTable}.or` : 'or';
        this.url.searchParams.append(key, `(${filters})`);
        return this;
    }
    /**
     * Match only rows which satisfy the filter. This is an escape hatch - you
     * should use the specific filter methods wherever possible.
     *
     * Unlike most filters, `opearator` and `value` are used as-is and need to
     * follow [PostgREST
     * syntax](https://postgrest.org/en/stable/api.html#operators). You also need
     * to make sure they are properly sanitized.
     *
     * @param column - The column to filter on
     * @param operator - The operator to filter with, following PostgREST syntax
     * @param value - The value to filter with, following PostgREST syntax
     */
    filter(column, operator, value) {
        this.url.searchParams.append(column, `${operator}.${value}`);
        return this;
    }
}
//# sourceMappingURL=PostgrestFilterBuilder.js.map

/***/ }),

/***/ "./node_modules/@supabase/postgrest-js/dist/module/PostgrestQueryBuilder.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/@supabase/postgrest-js/dist/module/PostgrestQueryBuilder.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PostgrestQueryBuilder)
/* harmony export */ });
/* harmony import */ var _PostgrestFilterBuilder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PostgrestFilterBuilder */ "./node_modules/@supabase/postgrest-js/dist/module/PostgrestFilterBuilder.js");

class PostgrestQueryBuilder {
    constructor(url, { headers = {}, schema, fetch, }) {
        this.url = url;
        this.headers = headers;
        this.schema = schema;
        this.fetch = fetch;
    }
    /**
     * Perform a SELECT query on the table or view.
     *
     * @param columns - The columns to retrieve, separated by commas. Columns can be renamed when returned with `customName:columnName`
     *
     * @param options - Named parameters
     *
     * @param options.head - When set to `true`, `data` will not be returned.
     * Useful if you only need the count.
     *
     * @param options.count - Count algorithm to use to count rows in the table or view.
     *
     * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
     * hood.
     *
     * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
     * statistics under the hood.
     *
     * `"estimated"`: Uses exact count for low numbers and planned count for high
     * numbers.
     */
    select(columns, { head = false, count, } = {}) {
        const method = head ? 'HEAD' : 'GET';
        // Remove whitespaces except when quoted
        let quoted = false;
        const cleanedColumns = (columns !== null && columns !== void 0 ? columns : '*')
            .split('')
            .map((c) => {
            if (/\s/.test(c) && !quoted) {
                return '';
            }
            if (c === '"') {
                quoted = !quoted;
            }
            return c;
        })
            .join('');
        this.url.searchParams.set('select', cleanedColumns);
        if (count) {
            this.headers['Prefer'] = `count=${count}`;
        }
        return new _PostgrestFilterBuilder__WEBPACK_IMPORTED_MODULE_0__["default"]({
            method,
            url: this.url,
            headers: this.headers,
            schema: this.schema,
            fetch: this.fetch,
            allowEmpty: false,
        });
    }
    /**
     * Perform an INSERT into the table or view.
     *
     * By default, inserted rows are not returned. To return it, chain the call
     * with `.select()`.
     *
     * @param values - The values to insert. Pass an object to insert a single row
     * or an array to insert multiple rows.
     *
     * @param options - Named parameters
     *
     * @param options.count - Count algorithm to use to count inserted rows.
     *
     * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
     * hood.
     *
     * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
     * statistics under the hood.
     *
     * `"estimated"`: Uses exact count for low numbers and planned count for high
     * numbers.
     *
     * @param options.defaultToNull - Make missing fields default to `null`.
     * Otherwise, use the default value for the column.
     */
    insert(values, { count, defaultToNull = true, } = {}) {
        const method = 'POST';
        const prefersHeaders = [];
        if (this.headers['Prefer']) {
            prefersHeaders.push(this.headers['Prefer']);
        }
        if (count) {
            prefersHeaders.push(`count=${count}`);
        }
        if (!defaultToNull) {
            prefersHeaders.push('missing=default');
        }
        this.headers['Prefer'] = prefersHeaders.join(',');
        if (Array.isArray(values)) {
            const columns = values.reduce((acc, x) => acc.concat(Object.keys(x)), []);
            if (columns.length > 0) {
                const uniqueColumns = [...new Set(columns)].map((column) => `"${column}"`);
                this.url.searchParams.set('columns', uniqueColumns.join(','));
            }
        }
        return new _PostgrestFilterBuilder__WEBPACK_IMPORTED_MODULE_0__["default"]({
            method,
            url: this.url,
            headers: this.headers,
            schema: this.schema,
            body: values,
            fetch: this.fetch,
            allowEmpty: false,
        });
    }
    /**
     * Perform an UPSERT on the table or view. Depending on the column(s) passed
     * to `onConflict`, `.upsert()` allows you to perform the equivalent of
     * `.insert()` if a row with the corresponding `onConflict` columns doesn't
     * exist, or if it does exist, perform an alternative action depending on
     * `ignoreDuplicates`.
     *
     * By default, upserted rows are not returned. To return it, chain the call
     * with `.select()`.
     *
     * @param values - The values to upsert with. Pass an object to upsert a
     * single row or an array to upsert multiple rows.
     *
     * @param options - Named parameters
     *
     * @param options.onConflict - Comma-separated UNIQUE column(s) to specify how
     * duplicate rows are determined. Two rows are duplicates if all the
     * `onConflict` columns are equal.
     *
     * @param options.ignoreDuplicates - If `true`, duplicate rows are ignored. If
     * `false`, duplicate rows are merged with existing rows.
     *
     * @param options.count - Count algorithm to use to count upserted rows.
     *
     * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
     * hood.
     *
     * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
     * statistics under the hood.
     *
     * `"estimated"`: Uses exact count for low numbers and planned count for high
     * numbers.
     *
     * @param options.defaultToNull - Make missing fields default to `null`.
     * Otherwise, use the default value for the column. This only applies when
     * inserting new rows, not when merging with existing rows under
     * `ignoreDuplicates: false`.
     */
    upsert(values, { onConflict, ignoreDuplicates = false, count, defaultToNull = true, } = {}) {
        const method = 'POST';
        const prefersHeaders = [`resolution=${ignoreDuplicates ? 'ignore' : 'merge'}-duplicates`];
        if (onConflict !== undefined)
            this.url.searchParams.set('on_conflict', onConflict);
        if (this.headers['Prefer']) {
            prefersHeaders.push(this.headers['Prefer']);
        }
        if (count) {
            prefersHeaders.push(`count=${count}`);
        }
        if (!defaultToNull) {
            prefersHeaders.push('missing=default');
        }
        this.headers['Prefer'] = prefersHeaders.join(',');
        if (Array.isArray(values)) {
            const columns = values.reduce((acc, x) => acc.concat(Object.keys(x)), []);
            if (columns.length > 0) {
                const uniqueColumns = [...new Set(columns)].map((column) => `"${column}"`);
                this.url.searchParams.set('columns', uniqueColumns.join(','));
            }
        }
        return new _PostgrestFilterBuilder__WEBPACK_IMPORTED_MODULE_0__["default"]({
            method,
            url: this.url,
            headers: this.headers,
            schema: this.schema,
            body: values,
            fetch: this.fetch,
            allowEmpty: false,
        });
    }
    /**
     * Perform an UPDATE on the table or view.
     *
     * By default, updated rows are not returned. To return it, chain the call
     * with `.select()` after filters.
     *
     * @param values - The values to update with
     *
     * @param options - Named parameters
     *
     * @param options.count - Count algorithm to use to count updated rows.
     *
     * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
     * hood.
     *
     * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
     * statistics under the hood.
     *
     * `"estimated"`: Uses exact count for low numbers and planned count for high
     * numbers.
     */
    update(values, { count, } = {}) {
        const method = 'PATCH';
        const prefersHeaders = [];
        if (this.headers['Prefer']) {
            prefersHeaders.push(this.headers['Prefer']);
        }
        if (count) {
            prefersHeaders.push(`count=${count}`);
        }
        this.headers['Prefer'] = prefersHeaders.join(',');
        return new _PostgrestFilterBuilder__WEBPACK_IMPORTED_MODULE_0__["default"]({
            method,
            url: this.url,
            headers: this.headers,
            schema: this.schema,
            body: values,
            fetch: this.fetch,
            allowEmpty: false,
        });
    }
    /**
     * Perform a DELETE on the table or view.
     *
     * By default, deleted rows are not returned. To return it, chain the call
     * with `.select()` after filters.
     *
     * @param options - Named parameters
     *
     * @param options.count - Count algorithm to use to count deleted rows.
     *
     * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
     * hood.
     *
     * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
     * statistics under the hood.
     *
     * `"estimated"`: Uses exact count for low numbers and planned count for high
     * numbers.
     */
    delete({ count, } = {}) {
        const method = 'DELETE';
        const prefersHeaders = [];
        if (count) {
            prefersHeaders.push(`count=${count}`);
        }
        if (this.headers['Prefer']) {
            prefersHeaders.unshift(this.headers['Prefer']);
        }
        this.headers['Prefer'] = prefersHeaders.join(',');
        return new _PostgrestFilterBuilder__WEBPACK_IMPORTED_MODULE_0__["default"]({
            method,
            url: this.url,
            headers: this.headers,
            schema: this.schema,
            fetch: this.fetch,
            allowEmpty: false,
        });
    }
}
//# sourceMappingURL=PostgrestQueryBuilder.js.map

/***/ }),

/***/ "./node_modules/@supabase/postgrest-js/dist/module/PostgrestTransformBuilder.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/@supabase/postgrest-js/dist/module/PostgrestTransformBuilder.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PostgrestTransformBuilder)
/* harmony export */ });
/* harmony import */ var _PostgrestBuilder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PostgrestBuilder */ "./node_modules/@supabase/postgrest-js/dist/module/PostgrestBuilder.js");

class PostgrestTransformBuilder extends _PostgrestBuilder__WEBPACK_IMPORTED_MODULE_0__["default"] {
    /**
     * Perform a SELECT on the query result.
     *
     * By default, `.insert()`, `.update()`, `.upsert()`, and `.delete()` do not
     * return modified rows. By calling this method, modified rows are returned in
     * `data`.
     *
     * @param columns - The columns to retrieve, separated by commas
     */
    select(columns) {
        // Remove whitespaces except when quoted
        let quoted = false;
        const cleanedColumns = (columns !== null && columns !== void 0 ? columns : '*')
            .split('')
            .map((c) => {
            if (/\s/.test(c) && !quoted) {
                return '';
            }
            if (c === '"') {
                quoted = !quoted;
            }
            return c;
        })
            .join('');
        this.url.searchParams.set('select', cleanedColumns);
        if (this.headers['Prefer']) {
            this.headers['Prefer'] += ',';
        }
        this.headers['Prefer'] += 'return=representation';
        return this;
    }
    /**
     * Order the query result by `column`.
     *
     * You can call this method multiple times to order by multiple columns.
     *
     * You can order foreign tables, but it doesn't affect the ordering of the
     * current table.
     *
     * @param column - The column to order by
     * @param options - Named parameters
     * @param options.ascending - If `true`, the result will be in ascending order
     * @param options.nullsFirst - If `true`, `null`s appear first. If `false`,
     * `null`s appear last.
     * @param options.foreignTable - Set this to order a foreign table by foreign
     * columns
     */
    order(column, { ascending = true, nullsFirst, foreignTable, } = {}) {
        const key = foreignTable ? `${foreignTable}.order` : 'order';
        const existingOrder = this.url.searchParams.get(key);
        this.url.searchParams.set(key, `${existingOrder ? `${existingOrder},` : ''}${column}.${ascending ? 'asc' : 'desc'}${nullsFirst === undefined ? '' : nullsFirst ? '.nullsfirst' : '.nullslast'}`);
        return this;
    }
    /**
     * Limit the query result by `count`.
     *
     * @param count - The maximum number of rows to return
     * @param options - Named parameters
     * @param options.foreignTable - Set this to limit rows of foreign tables
     * instead of the current table
     */
    limit(count, { foreignTable } = {}) {
        const key = typeof foreignTable === 'undefined' ? 'limit' : `${foreignTable}.limit`;
        this.url.searchParams.set(key, `${count}`);
        return this;
    }
    /**
     * Limit the query result by `from` and `to` inclusively.
     *
     * @param from - The starting index from which to limit the result
     * @param to - The last index to which to limit the result
     * @param options - Named parameters
     * @param options.foreignTable - Set this to limit rows of foreign tables
     * instead of the current table
     */
    range(from, to, { foreignTable } = {}) {
        const keyOffset = typeof foreignTable === 'undefined' ? 'offset' : `${foreignTable}.offset`;
        const keyLimit = typeof foreignTable === 'undefined' ? 'limit' : `${foreignTable}.limit`;
        this.url.searchParams.set(keyOffset, `${from}`);
        // Range is inclusive, so add 1
        this.url.searchParams.set(keyLimit, `${to - from + 1}`);
        return this;
    }
    /**
     * Set the AbortSignal for the fetch request.
     *
     * @param signal - The AbortSignal to use for the fetch request
     */
    abortSignal(signal) {
        this.signal = signal;
        return this;
    }
    /**
     * Return `data` as a single object instead of an array of objects.
     *
     * Query result must be one row (e.g. using `.limit(1)`), otherwise this
     * returns an error.
     */
    single() {
        this.headers['Accept'] = 'application/vnd.pgrst.object+json';
        return this;
    }
    /**
     * Return `data` as a single object instead of an array of objects.
     *
     * Query result must be zero or one row (e.g. using `.limit(1)`), otherwise
     * this returns an error.
     */
    maybeSingle() {
        // Temporary partial fix for https://github.com/supabase/postgrest-js/issues/361
        // Issue persists e.g. for `.insert([...]).select().maybeSingle()`
        if (this.method === 'GET') {
            this.headers['Accept'] = 'application/json';
        }
        else {
            this.headers['Accept'] = 'application/vnd.pgrst.object+json';
        }
        this.isMaybeSingle = true;
        return this;
    }
    /**
     * Return `data` as a string in CSV format.
     */
    csv() {
        this.headers['Accept'] = 'text/csv';
        return this;
    }
    /**
     * Return `data` as an object in [GeoJSON](https://geojson.org) format.
     */
    geojson() {
        this.headers['Accept'] = 'application/geo+json';
        return this;
    }
    /**
     * Return `data` as the EXPLAIN plan for the query.
     *
     * @param options - Named parameters
     *
     * @param options.analyze - If `true`, the query will be executed and the
     * actual run time will be returned
     *
     * @param options.verbose - If `true`, the query identifier will be returned
     * and `data` will include the output columns of the query
     *
     * @param options.settings - If `true`, include information on configuration
     * parameters that affect query planning
     *
     * @param options.buffers - If `true`, include information on buffer usage
     *
     * @param options.wal - If `true`, include information on WAL record generation
     *
     * @param options.format - The format of the output, can be `"text"` (default)
     * or `"json"`
     */
    explain({ analyze = false, verbose = false, settings = false, buffers = false, wal = false, format = 'text', } = {}) {
        const options = [
            analyze ? 'analyze' : null,
            verbose ? 'verbose' : null,
            settings ? 'settings' : null,
            buffers ? 'buffers' : null,
            wal ? 'wal' : null,
        ]
            .filter(Boolean)
            .join('|');
        // An Accept header can carry multiple media types but postgrest-js always sends one
        const forMediatype = this.headers['Accept'];
        this.headers['Accept'] = `application/vnd.pgrst.plan+${format}; for="${forMediatype}"; options=${options};`;
        if (format === 'json')
            return this;
        else
            return this;
    }
    /**
     * Rollback the query.
     *
     * `data` will still be returned, but the query is not committed.
     */
    rollback() {
        var _a;
        if (((_a = this.headers['Prefer']) !== null && _a !== void 0 ? _a : '').trim().length > 0) {
            this.headers['Prefer'] += ',tx=rollback';
        }
        else {
            this.headers['Prefer'] = 'tx=rollback';
        }
        return this;
    }
    /**
     * Override the type of the returned `data`.
     *
     * @typeParam NewResult - The new result type to override with
     */
    returns() {
        return this;
    }
}
//# sourceMappingURL=PostgrestTransformBuilder.js.map

/***/ }),

/***/ "./node_modules/@supabase/postgrest-js/dist/module/constants.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@supabase/postgrest-js/dist/module/constants.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DEFAULT_HEADERS: () => (/* binding */ DEFAULT_HEADERS)
/* harmony export */ });
/* harmony import */ var _version__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./version */ "./node_modules/@supabase/postgrest-js/dist/module/version.js");

const DEFAULT_HEADERS = { 'X-Client-Info': `postgrest-js/${_version__WEBPACK_IMPORTED_MODULE_0__.version}` };
//# sourceMappingURL=constants.js.map

/***/ }),

/***/ "./node_modules/@supabase/postgrest-js/dist/module/index.js":
/*!******************************************************************!*\
  !*** ./node_modules/@supabase/postgrest-js/dist/module/index.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PostgrestBuilder: () => (/* reexport safe */ _PostgrestBuilder__WEBPACK_IMPORTED_MODULE_4__["default"]),
/* harmony export */   PostgrestClient: () => (/* reexport safe */ _PostgrestClient__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   PostgrestFilterBuilder: () => (/* reexport safe */ _PostgrestFilterBuilder__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   PostgrestQueryBuilder: () => (/* reexport safe */ _PostgrestQueryBuilder__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   PostgrestTransformBuilder: () => (/* reexport safe */ _PostgrestTransformBuilder__WEBPACK_IMPORTED_MODULE_3__["default"])
/* harmony export */ });
/* harmony import */ var _PostgrestClient__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PostgrestClient */ "./node_modules/@supabase/postgrest-js/dist/module/PostgrestClient.js");
/* harmony import */ var _PostgrestQueryBuilder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PostgrestQueryBuilder */ "./node_modules/@supabase/postgrest-js/dist/module/PostgrestQueryBuilder.js");
/* harmony import */ var _PostgrestFilterBuilder__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PostgrestFilterBuilder */ "./node_modules/@supabase/postgrest-js/dist/module/PostgrestFilterBuilder.js");
/* harmony import */ var _PostgrestTransformBuilder__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./PostgrestTransformBuilder */ "./node_modules/@supabase/postgrest-js/dist/module/PostgrestTransformBuilder.js");
/* harmony import */ var _PostgrestBuilder__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./PostgrestBuilder */ "./node_modules/@supabase/postgrest-js/dist/module/PostgrestBuilder.js");





//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@supabase/postgrest-js/dist/module/version.js":
/*!********************************************************************!*\
  !*** ./node_modules/@supabase/postgrest-js/dist/module/version.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   version: () => (/* binding */ version)
/* harmony export */ });
const version = '1.7.0';
//# sourceMappingURL=version.js.map

/***/ }),

/***/ "./node_modules/@supabase/realtime-js/dist/module/RealtimeChannel.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@supabase/realtime-js/dist/module/RealtimeChannel.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   REALTIME_LISTEN_TYPES: () => (/* binding */ REALTIME_LISTEN_TYPES),
/* harmony export */   REALTIME_POSTGRES_CHANGES_LISTEN_EVENT: () => (/* binding */ REALTIME_POSTGRES_CHANGES_LISTEN_EVENT),
/* harmony export */   REALTIME_SUBSCRIBE_STATES: () => (/* binding */ REALTIME_SUBSCRIBE_STATES),
/* harmony export */   "default": () => (/* binding */ RealtimeChannel)
/* harmony export */ });
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/constants */ "./node_modules/@supabase/realtime-js/dist/module/lib/constants.js");
/* harmony import */ var _lib_push__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/push */ "./node_modules/@supabase/realtime-js/dist/module/lib/push.js");
/* harmony import */ var _lib_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/timer */ "./node_modules/@supabase/realtime-js/dist/module/lib/timer.js");
/* harmony import */ var _RealtimePresence__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./RealtimePresence */ "./node_modules/@supabase/realtime-js/dist/module/RealtimePresence.js");
/* harmony import */ var _lib_transformers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lib/transformers */ "./node_modules/@supabase/realtime-js/dist/module/lib/transformers.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};





var REALTIME_POSTGRES_CHANGES_LISTEN_EVENT;
(function (REALTIME_POSTGRES_CHANGES_LISTEN_EVENT) {
    REALTIME_POSTGRES_CHANGES_LISTEN_EVENT["ALL"] = "*";
    REALTIME_POSTGRES_CHANGES_LISTEN_EVENT["INSERT"] = "INSERT";
    REALTIME_POSTGRES_CHANGES_LISTEN_EVENT["UPDATE"] = "UPDATE";
    REALTIME_POSTGRES_CHANGES_LISTEN_EVENT["DELETE"] = "DELETE";
})(REALTIME_POSTGRES_CHANGES_LISTEN_EVENT || (REALTIME_POSTGRES_CHANGES_LISTEN_EVENT = {}));
var REALTIME_LISTEN_TYPES;
(function (REALTIME_LISTEN_TYPES) {
    REALTIME_LISTEN_TYPES["BROADCAST"] = "broadcast";
    REALTIME_LISTEN_TYPES["PRESENCE"] = "presence";
    /**
     * listen to Postgres changes.
     */
    REALTIME_LISTEN_TYPES["POSTGRES_CHANGES"] = "postgres_changes";
})(REALTIME_LISTEN_TYPES || (REALTIME_LISTEN_TYPES = {}));
var REALTIME_SUBSCRIBE_STATES;
(function (REALTIME_SUBSCRIBE_STATES) {
    REALTIME_SUBSCRIBE_STATES["SUBSCRIBED"] = "SUBSCRIBED";
    REALTIME_SUBSCRIBE_STATES["TIMED_OUT"] = "TIMED_OUT";
    REALTIME_SUBSCRIBE_STATES["CLOSED"] = "CLOSED";
    REALTIME_SUBSCRIBE_STATES["CHANNEL_ERROR"] = "CHANNEL_ERROR";
})(REALTIME_SUBSCRIBE_STATES || (REALTIME_SUBSCRIBE_STATES = {}));
/** A channel is the basic building block of Realtime
 * and narrows the scope of data flow to subscribed clients.
 * You can think of a channel as a chatroom where participants are able to see who's online
 * and send and receive messages.
 **/
class RealtimeChannel {
    constructor(
    /** Topic name can be any string. */
    topic, params = { config: {} }, socket) {
        this.topic = topic;
        this.params = params;
        this.socket = socket;
        this.bindings = {};
        this.state = _lib_constants__WEBPACK_IMPORTED_MODULE_0__.CHANNEL_STATES.closed;
        this.joinedOnce = false;
        this.pushBuffer = [];
        this.params.config = Object.assign({
            broadcast: { ack: false, self: false },
            presence: { key: '' },
        }, params.config);
        this.timeout = this.socket.timeout;
        this.joinPush = new _lib_push__WEBPACK_IMPORTED_MODULE_1__["default"](this, _lib_constants__WEBPACK_IMPORTED_MODULE_0__.CHANNEL_EVENTS.join, this.params, this.timeout);
        this.rejoinTimer = new _lib_timer__WEBPACK_IMPORTED_MODULE_2__["default"](() => this._rejoinUntilConnected(), this.socket.reconnectAfterMs);
        this.joinPush.receive('ok', () => {
            this.state = _lib_constants__WEBPACK_IMPORTED_MODULE_0__.CHANNEL_STATES.joined;
            this.rejoinTimer.reset();
            this.pushBuffer.forEach((pushEvent) => pushEvent.send());
            this.pushBuffer = [];
        });
        this._onClose(() => {
            this.rejoinTimer.reset();
            this.socket.log('channel', `close ${this.topic} ${this._joinRef()}`);
            this.state = _lib_constants__WEBPACK_IMPORTED_MODULE_0__.CHANNEL_STATES.closed;
            this.socket._remove(this);
        });
        this._onError((reason) => {
            if (this._isLeaving() || this._isClosed()) {
                return;
            }
            this.socket.log('channel', `error ${this.topic}`, reason);
            this.state = _lib_constants__WEBPACK_IMPORTED_MODULE_0__.CHANNEL_STATES.errored;
            this.rejoinTimer.scheduleTimeout();
        });
        this.joinPush.receive('timeout', () => {
            if (!this._isJoining()) {
                return;
            }
            this.socket.log('channel', `timeout ${this.topic}`, this.joinPush.timeout);
            this.state = _lib_constants__WEBPACK_IMPORTED_MODULE_0__.CHANNEL_STATES.errored;
            this.rejoinTimer.scheduleTimeout();
        });
        this._on(_lib_constants__WEBPACK_IMPORTED_MODULE_0__.CHANNEL_EVENTS.reply, {}, (payload, ref) => {
            this._trigger(this._replyEventName(ref), payload);
        });
        this.presence = new _RealtimePresence__WEBPACK_IMPORTED_MODULE_3__["default"](this);
    }
    /** Subscribe registers your client with the server */
    subscribe(callback, timeout = this.timeout) {
        var _a, _b;
        if (this.joinedOnce) {
            throw `tried to subscribe multiple times. 'subscribe' can only be called a single time per channel instance`;
        }
        else {
            const { config: { broadcast, presence }, } = this.params;
            this._onError((e) => callback && callback('CHANNEL_ERROR', e));
            this._onClose(() => callback && callback('CLOSED'));
            const accessTokenPayload = {};
            const config = {
                broadcast,
                presence,
                postgres_changes: (_b = (_a = this.bindings.postgres_changes) === null || _a === void 0 ? void 0 : _a.map((r) => r.filter)) !== null && _b !== void 0 ? _b : [],
            };
            if (this.socket.accessToken) {
                accessTokenPayload.access_token = this.socket.accessToken;
            }
            this.updateJoinPayload(Object.assign({ config }, accessTokenPayload));
            this.joinedOnce = true;
            this._rejoin(timeout);
            this.joinPush
                .receive('ok', ({ postgres_changes: serverPostgresFilters, }) => {
                var _a;
                this.socket.accessToken &&
                    this.socket.setAuth(this.socket.accessToken);
                if (serverPostgresFilters === undefined) {
                    callback && callback('SUBSCRIBED');
                    return;
                }
                else {
                    const clientPostgresBindings = this.bindings.postgres_changes;
                    const bindingsLen = (_a = clientPostgresBindings === null || clientPostgresBindings === void 0 ? void 0 : clientPostgresBindings.length) !== null && _a !== void 0 ? _a : 0;
                    const newPostgresBindings = [];
                    for (let i = 0; i < bindingsLen; i++) {
                        const clientPostgresBinding = clientPostgresBindings[i];
                        const { filter: { event, schema, table, filter }, } = clientPostgresBinding;
                        const serverPostgresFilter = serverPostgresFilters && serverPostgresFilters[i];
                        if (serverPostgresFilter &&
                            serverPostgresFilter.event === event &&
                            serverPostgresFilter.schema === schema &&
                            serverPostgresFilter.table === table &&
                            serverPostgresFilter.filter === filter) {
                            newPostgresBindings.push(Object.assign(Object.assign({}, clientPostgresBinding), { id: serverPostgresFilter.id }));
                        }
                        else {
                            this.unsubscribe();
                            callback &&
                                callback('CHANNEL_ERROR', new Error('mismatch between server and client bindings for postgres changes'));
                            return;
                        }
                    }
                    this.bindings.postgres_changes = newPostgresBindings;
                    callback && callback('SUBSCRIBED');
                    return;
                }
            })
                .receive('error', (error) => {
                callback &&
                    callback('CHANNEL_ERROR', new Error(JSON.stringify(Object.values(error).join(', ') || 'error')));
                return;
            })
                .receive('timeout', () => {
                callback && callback('TIMED_OUT');
                return;
            });
        }
        return this;
    }
    presenceState() {
        return this.presence.state;
    }
    track(payload, opts = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.send({
                type: 'presence',
                event: 'track',
                payload,
            }, opts.timeout || this.timeout);
        });
    }
    untrack(opts = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.send({
                type: 'presence',
                event: 'untrack',
            }, opts);
        });
    }
    on(type, filter, callback) {
        return this._on(type, filter, callback);
    }
    send(payload, opts = {}) {
        return new Promise((resolve) => {
            var _a, _b, _c;
            const push = this._push(payload.type, payload, opts.timeout || this.timeout);
            if (push.rateLimited) {
                resolve('rate limited');
            }
            if (payload.type === 'broadcast' &&
                !((_c = (_b = (_a = this.params) === null || _a === void 0 ? void 0 : _a.config) === null || _b === void 0 ? void 0 : _b.broadcast) === null || _c === void 0 ? void 0 : _c.ack)) {
                resolve('ok');
            }
            push.receive('ok', () => resolve('ok'));
            push.receive('timeout', () => resolve('timed out'));
        });
    }
    updateJoinPayload(payload) {
        this.joinPush.updatePayload(payload);
    }
    /**
     * Leaves the channel.
     *
     * Unsubscribes from server events, and instructs channel to terminate on server.
     * Triggers onClose() hooks.
     *
     * To receive leave acknowledgements, use the a `receive` hook to bind to the server ack, ie:
     * channel.unsubscribe().receive("ok", () => alert("left!") )
     */
    unsubscribe(timeout = this.timeout) {
        this.state = _lib_constants__WEBPACK_IMPORTED_MODULE_0__.CHANNEL_STATES.leaving;
        const onClose = () => {
            this.socket.log('channel', `leave ${this.topic}`);
            this._trigger(_lib_constants__WEBPACK_IMPORTED_MODULE_0__.CHANNEL_EVENTS.close, 'leave', this._joinRef());
        };
        this.rejoinTimer.reset();
        // Destroy joinPush to avoid connection timeouts during unscription phase
        this.joinPush.destroy();
        return new Promise((resolve) => {
            const leavePush = new _lib_push__WEBPACK_IMPORTED_MODULE_1__["default"](this, _lib_constants__WEBPACK_IMPORTED_MODULE_0__.CHANNEL_EVENTS.leave, {}, timeout);
            leavePush
                .receive('ok', () => {
                onClose();
                resolve('ok');
            })
                .receive('timeout', () => {
                onClose();
                resolve('timed out');
            })
                .receive('error', () => {
                resolve('error');
            });
            leavePush.send();
            if (!this._canPush()) {
                leavePush.trigger('ok', {});
            }
        });
    }
    /** @internal */
    _push(event, payload, timeout = this.timeout) {
        if (!this.joinedOnce) {
            throw `tried to push '${event}' to '${this.topic}' before joining. Use channel.subscribe() before pushing events`;
        }
        let pushEvent = new _lib_push__WEBPACK_IMPORTED_MODULE_1__["default"](this, event, payload, timeout);
        if (this._canPush()) {
            pushEvent.send();
        }
        else {
            pushEvent.startTimeout();
            this.pushBuffer.push(pushEvent);
        }
        return pushEvent;
    }
    /**
     * Overridable message hook
     *
     * Receives all events for specialized message handling before dispatching to the channel callbacks.
     * Must return the payload, modified or unmodified.
     *
     * @internal
     */
    _onMessage(_event, payload, _ref) {
        return payload;
    }
    /** @internal */
    _isMember(topic) {
        return this.topic === topic;
    }
    /** @internal */
    _joinRef() {
        return this.joinPush.ref;
    }
    /** @internal */
    _trigger(type, payload, ref) {
        var _a, _b;
        const typeLower = type.toLocaleLowerCase();
        const { close, error, leave, join } = _lib_constants__WEBPACK_IMPORTED_MODULE_0__.CHANNEL_EVENTS;
        const events = [close, error, leave, join];
        if (ref && events.indexOf(typeLower) >= 0 && ref !== this._joinRef()) {
            return;
        }
        let handledPayload = this._onMessage(typeLower, payload, ref);
        if (payload && !handledPayload) {
            throw 'channel onMessage callbacks must return the payload, modified or unmodified';
        }
        if (['insert', 'update', 'delete'].includes(typeLower)) {
            (_a = this.bindings.postgres_changes) === null || _a === void 0 ? void 0 : _a.filter((bind) => {
                var _a, _b, _c;
                return (((_a = bind.filter) === null || _a === void 0 ? void 0 : _a.event) === '*' ||
                    ((_c = (_b = bind.filter) === null || _b === void 0 ? void 0 : _b.event) === null || _c === void 0 ? void 0 : _c.toLocaleLowerCase()) === typeLower);
            }).map((bind) => bind.callback(handledPayload, ref));
        }
        else {
            (_b = this.bindings[typeLower]) === null || _b === void 0 ? void 0 : _b.filter((bind) => {
                var _a, _b, _c, _d, _e, _f;
                if (['broadcast', 'presence', 'postgres_changes'].includes(typeLower)) {
                    if ('id' in bind) {
                        const bindId = bind.id;
                        const bindEvent = (_a = bind.filter) === null || _a === void 0 ? void 0 : _a.event;
                        return (bindId &&
                            ((_b = payload.ids) === null || _b === void 0 ? void 0 : _b.includes(bindId)) &&
                            (bindEvent === '*' ||
                                (bindEvent === null || bindEvent === void 0 ? void 0 : bindEvent.toLocaleLowerCase()) ===
                                    ((_c = payload.data) === null || _c === void 0 ? void 0 : _c.type.toLocaleLowerCase())));
                    }
                    else {
                        const bindEvent = (_e = (_d = bind === null || bind === void 0 ? void 0 : bind.filter) === null || _d === void 0 ? void 0 : _d.event) === null || _e === void 0 ? void 0 : _e.toLocaleLowerCase();
                        return (bindEvent === '*' ||
                            bindEvent === ((_f = payload === null || payload === void 0 ? void 0 : payload.event) === null || _f === void 0 ? void 0 : _f.toLocaleLowerCase()));
                    }
                }
                else {
                    return bind.type.toLocaleLowerCase() === typeLower;
                }
            }).map((bind) => {
                if (typeof handledPayload === 'object' && 'ids' in handledPayload) {
                    const postgresChanges = handledPayload.data;
                    const { schema, table, commit_timestamp, type, errors } = postgresChanges;
                    const enrichedPayload = {
                        schema: schema,
                        table: table,
                        commit_timestamp: commit_timestamp,
                        eventType: type,
                        new: {},
                        old: {},
                        errors: errors,
                    };
                    handledPayload = Object.assign(Object.assign({}, enrichedPayload), this._getPayloadRecords(postgresChanges));
                }
                bind.callback(handledPayload, ref);
            });
        }
    }
    /** @internal */
    _isClosed() {
        return this.state === _lib_constants__WEBPACK_IMPORTED_MODULE_0__.CHANNEL_STATES.closed;
    }
    /** @internal */
    _isJoined() {
        return this.state === _lib_constants__WEBPACK_IMPORTED_MODULE_0__.CHANNEL_STATES.joined;
    }
    /** @internal */
    _isJoining() {
        return this.state === _lib_constants__WEBPACK_IMPORTED_MODULE_0__.CHANNEL_STATES.joining;
    }
    /** @internal */
    _isLeaving() {
        return this.state === _lib_constants__WEBPACK_IMPORTED_MODULE_0__.CHANNEL_STATES.leaving;
    }
    /** @internal */
    _replyEventName(ref) {
        return `chan_reply_${ref}`;
    }
    /** @internal */
    _on(type, filter, callback) {
        const typeLower = type.toLocaleLowerCase();
        const binding = {
            type: typeLower,
            filter: filter,
            callback: callback,
        };
        if (this.bindings[typeLower]) {
            this.bindings[typeLower].push(binding);
        }
        else {
            this.bindings[typeLower] = [binding];
        }
        return this;
    }
    /** @internal */
    _off(type, filter) {
        const typeLower = type.toLocaleLowerCase();
        this.bindings[typeLower] = this.bindings[typeLower].filter((bind) => {
            var _a;
            return !(((_a = bind.type) === null || _a === void 0 ? void 0 : _a.toLocaleLowerCase()) === typeLower &&
                RealtimeChannel.isEqual(bind.filter, filter));
        });
        return this;
    }
    /** @internal */
    static isEqual(obj1, obj2) {
        if (Object.keys(obj1).length !== Object.keys(obj2).length) {
            return false;
        }
        for (const k in obj1) {
            if (obj1[k] !== obj2[k]) {
                return false;
            }
        }
        return true;
    }
    /** @internal */
    _rejoinUntilConnected() {
        this.rejoinTimer.scheduleTimeout();
        if (this.socket.isConnected()) {
            this._rejoin();
        }
    }
    /**
     * Registers a callback that will be executed when the channel closes.
     *
     * @internal
     */
    _onClose(callback) {
        this._on(_lib_constants__WEBPACK_IMPORTED_MODULE_0__.CHANNEL_EVENTS.close, {}, callback);
    }
    /**
     * Registers a callback that will be executed when the channel encounteres an error.
     *
     * @internal
     */
    _onError(callback) {
        this._on(_lib_constants__WEBPACK_IMPORTED_MODULE_0__.CHANNEL_EVENTS.error, {}, (reason) => callback(reason));
    }
    /**
     * Returns `true` if the socket is connected and the channel has been joined.
     *
     * @internal
     */
    _canPush() {
        return this.socket.isConnected() && this._isJoined();
    }
    /** @internal */
    _rejoin(timeout = this.timeout) {
        if (this._isLeaving()) {
            return;
        }
        this.socket._leaveOpenTopic(this.topic);
        this.state = _lib_constants__WEBPACK_IMPORTED_MODULE_0__.CHANNEL_STATES.joining;
        this.joinPush.resend(timeout);
    }
    /** @internal */
    _getPayloadRecords(payload) {
        const records = {
            new: {},
            old: {},
        };
        if (payload.type === 'INSERT' || payload.type === 'UPDATE') {
            records.new = _lib_transformers__WEBPACK_IMPORTED_MODULE_4__.convertChangeData(payload.columns, payload.record);
        }
        if (payload.type === 'UPDATE' || payload.type === 'DELETE') {
            records.old = _lib_transformers__WEBPACK_IMPORTED_MODULE_4__.convertChangeData(payload.columns, payload.old_record);
        }
        return records;
    }
}
//# sourceMappingURL=RealtimeChannel.js.map

/***/ }),

/***/ "./node_modules/@supabase/realtime-js/dist/module/RealtimeClient.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@supabase/realtime-js/dist/module/RealtimeClient.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ RealtimeClient)
/* harmony export */ });
/* harmony import */ var websocket__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! websocket */ "./node_modules/websocket/lib/browser.js");
/* harmony import */ var websocket__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(websocket__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/constants */ "./node_modules/@supabase/realtime-js/dist/module/lib/constants.js");
/* harmony import */ var _lib_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/timer */ "./node_modules/@supabase/realtime-js/dist/module/lib/timer.js");
/* harmony import */ var _lib_serializer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lib/serializer */ "./node_modules/@supabase/realtime-js/dist/module/lib/serializer.js");
/* harmony import */ var _RealtimeChannel__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./RealtimeChannel */ "./node_modules/@supabase/realtime-js/dist/module/RealtimeChannel.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};





const noop = () => { };
class RealtimeClient {
    /**
     * Initializes the Socket.
     *
     * @param endPoint The string WebSocket endpoint, ie, "ws://example.com/socket", "wss://example.com", "/socket" (inherited host & protocol)
     * @param options.transport The Websocket Transport, for example WebSocket.
     * @param options.timeout The default timeout in milliseconds to trigger push timeouts.
     * @param options.params The optional params to pass when connecting.
     * @param options.headers The optional headers to pass when connecting.
     * @param options.heartbeatIntervalMs The millisec interval to send a heartbeat message.
     * @param options.logger The optional function for specialized logging, ie: logger: (kind, msg, data) => { console.log(`${kind}: ${msg}`, data) }
     * @param options.encode The function to encode outgoing messages. Defaults to JSON: (payload, callback) => callback(JSON.stringify(payload))
     * @param options.decode The function to decode incoming messages. Defaults to Serializer's decode.
     * @param options.reconnectAfterMs he optional function that returns the millsec reconnect interval. Defaults to stepped backoff off.
     */
    constructor(endPoint, options) {
        var _a;
        this.accessToken = null;
        this.channels = [];
        this.endPoint = '';
        this.headers = _lib_constants__WEBPACK_IMPORTED_MODULE_1__.DEFAULT_HEADERS;
        this.params = {};
        this.timeout = _lib_constants__WEBPACK_IMPORTED_MODULE_1__.DEFAULT_TIMEOUT;
        this.transport = websocket__WEBPACK_IMPORTED_MODULE_0__.w3cwebsocket;
        this.heartbeatIntervalMs = 30000;
        this.heartbeatTimer = undefined;
        this.pendingHeartbeatRef = null;
        this.ref = 0;
        this.logger = noop;
        this.conn = null;
        this.sendBuffer = [];
        this.serializer = new _lib_serializer__WEBPACK_IMPORTED_MODULE_3__["default"]();
        this.stateChangeCallbacks = {
            open: [],
            close: [],
            error: [],
            message: [],
        };
        this.eventsPerSecondLimitMs = 100;
        this.inThrottle = false;
        this.endPoint = `${endPoint}/${_lib_constants__WEBPACK_IMPORTED_MODULE_1__.TRANSPORTS.websocket}`;
        if (options === null || options === void 0 ? void 0 : options.params)
            this.params = options.params;
        if (options === null || options === void 0 ? void 0 : options.headers)
            this.headers = Object.assign(Object.assign({}, this.headers), options.headers);
        if (options === null || options === void 0 ? void 0 : options.timeout)
            this.timeout = options.timeout;
        if (options === null || options === void 0 ? void 0 : options.logger)
            this.logger = options.logger;
        if (options === null || options === void 0 ? void 0 : options.transport)
            this.transport = options.transport;
        if (options === null || options === void 0 ? void 0 : options.heartbeatIntervalMs)
            this.heartbeatIntervalMs = options.heartbeatIntervalMs;
        const eventsPerSecond = (_a = options === null || options === void 0 ? void 0 : options.params) === null || _a === void 0 ? void 0 : _a.eventsPerSecond;
        if (eventsPerSecond)
            this.eventsPerSecondLimitMs = Math.floor(1000 / eventsPerSecond);
        this.reconnectAfterMs = (options === null || options === void 0 ? void 0 : options.reconnectAfterMs)
            ? options.reconnectAfterMs
            : (tries) => {
                return [1000, 2000, 5000, 10000][tries - 1] || 10000;
            };
        this.encode = (options === null || options === void 0 ? void 0 : options.encode)
            ? options.encode
            : (payload, callback) => {
                return callback(JSON.stringify(payload));
            };
        this.decode = (options === null || options === void 0 ? void 0 : options.decode)
            ? options.decode
            : this.serializer.decode.bind(this.serializer);
        this.reconnectTimer = new _lib_timer__WEBPACK_IMPORTED_MODULE_2__["default"](() => __awaiter(this, void 0, void 0, function* () {
            this.disconnect();
            this.connect();
        }), this.reconnectAfterMs);
    }
    /**
     * Connects the socket, unless already connected.
     */
    connect() {
        if (this.conn) {
            return;
        }
        this.conn = new this.transport(this._endPointURL(), [], null, this.headers);
        if (this.conn) {
            this.conn.binaryType = 'arraybuffer';
            this.conn.onopen = () => this._onConnOpen();
            this.conn.onerror = (error) => this._onConnError(error);
            this.conn.onmessage = (event) => this._onConnMessage(event);
            this.conn.onclose = (event) => this._onConnClose(event);
        }
    }
    /**
     * Disconnects the socket.
     *
     * @param code A numeric status code to send on disconnect.
     * @param reason A custom reason for the disconnect.
     */
    disconnect(code, reason) {
        if (this.conn) {
            this.conn.onclose = function () { }; // noop
            if (code) {
                this.conn.close(code, reason !== null && reason !== void 0 ? reason : '');
            }
            else {
                this.conn.close();
            }
            this.conn = null;
            // remove open handles
            this.heartbeatTimer && clearInterval(this.heartbeatTimer);
            this.reconnectTimer.reset();
        }
    }
    /**
     * Returns all created channels
     */
    getChannels() {
        return this.channels;
    }
    /**
     * Unsubscribes and removes a single channel
     * @param channel A RealtimeChannel instance
     */
    removeChannel(channel) {
        return __awaiter(this, void 0, void 0, function* () {
            const status = yield channel.unsubscribe();
            if (this.channels.length === 0) {
                this.disconnect();
            }
            return status;
        });
    }
    /**
     * Unsubscribes and removes all channels
     */
    removeAllChannels() {
        return __awaiter(this, void 0, void 0, function* () {
            const values_1 = yield Promise.all(this.channels.map((channel) => channel.unsubscribe()));
            this.disconnect();
            return values_1;
        });
    }
    /**
     * Logs the message.
     *
     * For customized logging, `this.logger` can be overridden.
     */
    log(kind, msg, data) {
        this.logger(kind, msg, data);
    }
    /**
     * Returns the current state of the socket.
     */
    connectionState() {
        switch (this.conn && this.conn.readyState) {
            case _lib_constants__WEBPACK_IMPORTED_MODULE_1__.SOCKET_STATES.connecting:
                return _lib_constants__WEBPACK_IMPORTED_MODULE_1__.CONNECTION_STATE.Connecting;
            case _lib_constants__WEBPACK_IMPORTED_MODULE_1__.SOCKET_STATES.open:
                return _lib_constants__WEBPACK_IMPORTED_MODULE_1__.CONNECTION_STATE.Open;
            case _lib_constants__WEBPACK_IMPORTED_MODULE_1__.SOCKET_STATES.closing:
                return _lib_constants__WEBPACK_IMPORTED_MODULE_1__.CONNECTION_STATE.Closing;
            default:
                return _lib_constants__WEBPACK_IMPORTED_MODULE_1__.CONNECTION_STATE.Closed;
        }
    }
    /**
     * Returns `true` is the connection is open.
     */
    isConnected() {
        return this.connectionState() === _lib_constants__WEBPACK_IMPORTED_MODULE_1__.CONNECTION_STATE.Open;
    }
    channel(topic, params = { config: {} }) {
        if (!this.isConnected()) {
            this.connect();
        }
        const chan = new _RealtimeChannel__WEBPACK_IMPORTED_MODULE_4__["default"](`realtime:${topic}`, params, this);
        this.channels.push(chan);
        return chan;
    }
    /**
     * Push out a message if the socket is connected.
     *
     * If the socket is not connected, the message gets enqueued within a local buffer, and sent out when a connection is next established.
     */
    push(data) {
        const { topic, event, payload, ref } = data;
        let callback = () => {
            this.encode(data, (result) => {
                var _a;
                (_a = this.conn) === null || _a === void 0 ? void 0 : _a.send(result);
            });
        };
        this.log('push', `${topic} ${event} (${ref})`, payload);
        if (this.isConnected()) {
            if (['broadcast', 'presence', 'postgres_changes'].includes(event)) {
                const isThrottled = this._throttle(callback)();
                if (isThrottled) {
                    return 'rate limited';
                }
            }
            else {
                callback();
            }
        }
        else {
            this.sendBuffer.push(callback);
        }
    }
    /**
     * Sets the JWT access token used for channel subscription authorization and Realtime RLS.
     *
     * @param token A JWT string.
     */
    setAuth(token) {
        this.accessToken = token;
        this.channels.forEach((channel) => {
            token && channel.updateJoinPayload({ access_token: token });
            if (channel.joinedOnce && channel._isJoined()) {
                channel._push(_lib_constants__WEBPACK_IMPORTED_MODULE_1__.CHANNEL_EVENTS.access_token, { access_token: token });
            }
        });
    }
    /**
     * Return the next message ref, accounting for overflows
     *
     * @internal
     */
    _makeRef() {
        let newRef = this.ref + 1;
        if (newRef === this.ref) {
            this.ref = 0;
        }
        else {
            this.ref = newRef;
        }
        return this.ref.toString();
    }
    /**
     * Unsubscribe from channels with the specified topic.
     *
     * @internal
     */
    _leaveOpenTopic(topic) {
        let dupChannel = this.channels.find((c) => c.topic === topic && (c._isJoined() || c._isJoining()));
        if (dupChannel) {
            this.log('transport', `leaving duplicate topic "${topic}"`);
            dupChannel.unsubscribe();
        }
    }
    /**
     * Removes a subscription from the socket.
     *
     * @param channel An open subscription.
     *
     * @internal
     */
    _remove(channel) {
        this.channels = this.channels.filter((c) => c._joinRef() !== channel._joinRef());
    }
    /**
     * Returns the URL of the websocket.
     *
     * @internal
     */
    _endPointURL() {
        return this._appendParams(this.endPoint, Object.assign({}, this.params, { vsn: _lib_constants__WEBPACK_IMPORTED_MODULE_1__.VSN }));
    }
    /** @internal */
    _onConnMessage(rawMessage) {
        this.decode(rawMessage.data, (msg) => {
            let { topic, event, payload, ref } = msg;
            if ((ref && ref === this.pendingHeartbeatRef) ||
                event === (payload === null || payload === void 0 ? void 0 : payload.type)) {
                this.pendingHeartbeatRef = null;
            }
            this.log('receive', `${payload.status || ''} ${topic} ${event} ${(ref && '(' + ref + ')') || ''}`, payload);
            this.channels
                .filter((channel) => channel._isMember(topic))
                .forEach((channel) => channel._trigger(event, payload, ref));
            this.stateChangeCallbacks.message.forEach((callback) => callback(msg));
        });
    }
    /** @internal */
    _onConnOpen() {
        this.log('transport', `connected to ${this._endPointURL()}`);
        this._flushSendBuffer();
        this.reconnectTimer.reset();
        this.heartbeatTimer && clearInterval(this.heartbeatTimer);
        this.heartbeatTimer = setInterval(() => this._sendHeartbeat(), this.heartbeatIntervalMs);
        this.stateChangeCallbacks.open.forEach((callback) => callback());
    }
    /** @internal */
    _onConnClose(event) {
        this.log('transport', 'close', event);
        this._triggerChanError();
        this.heartbeatTimer && clearInterval(this.heartbeatTimer);
        this.reconnectTimer.scheduleTimeout();
        this.stateChangeCallbacks.close.forEach((callback) => callback(event));
    }
    /** @internal */
    _onConnError(error) {
        this.log('transport', error.message);
        this._triggerChanError();
        this.stateChangeCallbacks.error.forEach((callback) => callback(error));
    }
    /** @internal */
    _triggerChanError() {
        this.channels.forEach((channel) => channel._trigger(_lib_constants__WEBPACK_IMPORTED_MODULE_1__.CHANNEL_EVENTS.error));
    }
    /** @internal */
    _appendParams(url, params) {
        if (Object.keys(params).length === 0) {
            return url;
        }
        const prefix = url.match(/\?/) ? '&' : '?';
        const query = new URLSearchParams(params);
        return `${url}${prefix}${query}`;
    }
    /** @internal */
    _flushSendBuffer() {
        if (this.isConnected() && this.sendBuffer.length > 0) {
            this.sendBuffer.forEach((callback) => callback());
            this.sendBuffer = [];
        }
    }
    /** @internal */
    _sendHeartbeat() {
        var _a;
        if (!this.isConnected()) {
            return;
        }
        if (this.pendingHeartbeatRef) {
            this.pendingHeartbeatRef = null;
            this.log('transport', 'heartbeat timeout. Attempting to re-establish connection');
            (_a = this.conn) === null || _a === void 0 ? void 0 : _a.close(_lib_constants__WEBPACK_IMPORTED_MODULE_1__.WS_CLOSE_NORMAL, 'hearbeat timeout');
            return;
        }
        this.pendingHeartbeatRef = this._makeRef();
        this.push({
            topic: 'phoenix',
            event: 'heartbeat',
            payload: {},
            ref: this.pendingHeartbeatRef,
        });
        this.setAuth(this.accessToken);
    }
    /** @internal */
    _throttle(callback, eventsPerSecondLimitMs = this.eventsPerSecondLimitMs) {
        return () => {
            if (this.inThrottle)
                return true;
            callback();
            if (eventsPerSecondLimitMs > 0) {
                this.inThrottle = true;
                setTimeout(() => {
                    this.inThrottle = false;
                }, eventsPerSecondLimitMs);
            }
            return false;
        };
    }
}
//# sourceMappingURL=RealtimeClient.js.map

/***/ }),

/***/ "./node_modules/@supabase/realtime-js/dist/module/RealtimePresence.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@supabase/realtime-js/dist/module/RealtimePresence.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   REALTIME_PRESENCE_LISTEN_EVENTS: () => (/* binding */ REALTIME_PRESENCE_LISTEN_EVENTS),
/* harmony export */   "default": () => (/* binding */ RealtimePresence)
/* harmony export */ });
/*
  This file draws heavily from https://github.com/phoenixframework/phoenix/blob/d344ec0a732ab4ee204215b31de69cf4be72e3bf/assets/js/phoenix/presence.js
  License: https://github.com/phoenixframework/phoenix/blob/d344ec0a732ab4ee204215b31de69cf4be72e3bf/LICENSE.md
*/
var REALTIME_PRESENCE_LISTEN_EVENTS;
(function (REALTIME_PRESENCE_LISTEN_EVENTS) {
    REALTIME_PRESENCE_LISTEN_EVENTS["SYNC"] = "sync";
    REALTIME_PRESENCE_LISTEN_EVENTS["JOIN"] = "join";
    REALTIME_PRESENCE_LISTEN_EVENTS["LEAVE"] = "leave";
})(REALTIME_PRESENCE_LISTEN_EVENTS || (REALTIME_PRESENCE_LISTEN_EVENTS = {}));
class RealtimePresence {
    /**
     * Initializes the Presence.
     *
     * @param channel - The RealtimeChannel
     * @param opts - The options,
     *        for example `{events: {state: 'state', diff: 'diff'}}`
     */
    constructor(channel, opts) {
        this.channel = channel;
        this.state = {};
        this.pendingDiffs = [];
        this.joinRef = null;
        this.caller = {
            onJoin: () => { },
            onLeave: () => { },
            onSync: () => { },
        };
        const events = (opts === null || opts === void 0 ? void 0 : opts.events) || {
            state: 'presence_state',
            diff: 'presence_diff',
        };
        this.channel._on(events.state, {}, (newState) => {
            const { onJoin, onLeave, onSync } = this.caller;
            this.joinRef = this.channel._joinRef();
            this.state = RealtimePresence.syncState(this.state, newState, onJoin, onLeave);
            this.pendingDiffs.forEach((diff) => {
                this.state = RealtimePresence.syncDiff(this.state, diff, onJoin, onLeave);
            });
            this.pendingDiffs = [];
            onSync();
        });
        this.channel._on(events.diff, {}, (diff) => {
            const { onJoin, onLeave, onSync } = this.caller;
            if (this.inPendingSyncState()) {
                this.pendingDiffs.push(diff);
            }
            else {
                this.state = RealtimePresence.syncDiff(this.state, diff, onJoin, onLeave);
                onSync();
            }
        });
        this.onJoin((key, currentPresences, newPresences) => {
            this.channel._trigger('presence', {
                event: 'join',
                key,
                currentPresences,
                newPresences,
            });
        });
        this.onLeave((key, currentPresences, leftPresences) => {
            this.channel._trigger('presence', {
                event: 'leave',
                key,
                currentPresences,
                leftPresences,
            });
        });
        this.onSync(() => {
            this.channel._trigger('presence', { event: 'sync' });
        });
    }
    /**
     * Used to sync the list of presences on the server with the
     * client's state.
     *
     * An optional `onJoin` and `onLeave` callback can be provided to
     * react to changes in the client's local presences across
     * disconnects and reconnects with the server.
     *
     * @internal
     */
    static syncState(currentState, newState, onJoin, onLeave) {
        const state = this.cloneDeep(currentState);
        const transformedState = this.transformState(newState);
        const joins = {};
        const leaves = {};
        this.map(state, (key, presences) => {
            if (!transformedState[key]) {
                leaves[key] = presences;
            }
        });
        this.map(transformedState, (key, newPresences) => {
            const currentPresences = state[key];
            if (currentPresences) {
                const newPresenceRefs = newPresences.map((m) => m.presence_ref);
                const curPresenceRefs = currentPresences.map((m) => m.presence_ref);
                const joinedPresences = newPresences.filter((m) => curPresenceRefs.indexOf(m.presence_ref) < 0);
                const leftPresences = currentPresences.filter((m) => newPresenceRefs.indexOf(m.presence_ref) < 0);
                if (joinedPresences.length > 0) {
                    joins[key] = joinedPresences;
                }
                if (leftPresences.length > 0) {
                    leaves[key] = leftPresences;
                }
            }
            else {
                joins[key] = newPresences;
            }
        });
        return this.syncDiff(state, { joins, leaves }, onJoin, onLeave);
    }
    /**
     * Used to sync a diff of presence join and leave events from the
     * server, as they happen.
     *
     * Like `syncState`, `syncDiff` accepts optional `onJoin` and
     * `onLeave` callbacks to react to a user joining or leaving from a
     * device.
     *
     * @internal
     */
    static syncDiff(state, diff, onJoin, onLeave) {
        const { joins, leaves } = {
            joins: this.transformState(diff.joins),
            leaves: this.transformState(diff.leaves),
        };
        if (!onJoin) {
            onJoin = () => { };
        }
        if (!onLeave) {
            onLeave = () => { };
        }
        this.map(joins, (key, newPresences) => {
            var _a;
            const currentPresences = (_a = state[key]) !== null && _a !== void 0 ? _a : [];
            state[key] = this.cloneDeep(newPresences);
            if (currentPresences.length > 0) {
                const joinedPresenceRefs = state[key].map((m) => m.presence_ref);
                const curPresences = currentPresences.filter((m) => joinedPresenceRefs.indexOf(m.presence_ref) < 0);
                state[key].unshift(...curPresences);
            }
            onJoin(key, currentPresences, newPresences);
        });
        this.map(leaves, (key, leftPresences) => {
            let currentPresences = state[key];
            if (!currentPresences)
                return;
            const presenceRefsToRemove = leftPresences.map((m) => m.presence_ref);
            currentPresences = currentPresences.filter((m) => presenceRefsToRemove.indexOf(m.presence_ref) < 0);
            state[key] = currentPresences;
            onLeave(key, currentPresences, leftPresences);
            if (currentPresences.length === 0)
                delete state[key];
        });
        return state;
    }
    /** @internal */
    static map(obj, func) {
        return Object.getOwnPropertyNames(obj).map((key) => func(key, obj[key]));
    }
    /**
     * Remove 'metas' key
     * Change 'phx_ref' to 'presence_ref'
     * Remove 'phx_ref' and 'phx_ref_prev'
     *
     * @example
     * // returns {
     *  abc123: [
     *    { presence_ref: '2', user_id: 1 },
     *    { presence_ref: '3', user_id: 2 }
     *  ]
     * }
     * RealtimePresence.transformState({
     *  abc123: {
     *    metas: [
     *      { phx_ref: '2', phx_ref_prev: '1' user_id: 1 },
     *      { phx_ref: '3', user_id: 2 }
     *    ]
     *  }
     * })
     *
     * @internal
     */
    static transformState(state) {
        state = this.cloneDeep(state);
        return Object.getOwnPropertyNames(state).reduce((newState, key) => {
            const presences = state[key];
            if ('metas' in presences) {
                newState[key] = presences.metas.map((presence) => {
                    presence['presence_ref'] = presence['phx_ref'];
                    delete presence['phx_ref'];
                    delete presence['phx_ref_prev'];
                    return presence;
                });
            }
            else {
                newState[key] = presences;
            }
            return newState;
        }, {});
    }
    /** @internal */
    static cloneDeep(obj) {
        return JSON.parse(JSON.stringify(obj));
    }
    /** @internal */
    onJoin(callback) {
        this.caller.onJoin = callback;
    }
    /** @internal */
    onLeave(callback) {
        this.caller.onLeave = callback;
    }
    /** @internal */
    onSync(callback) {
        this.caller.onSync = callback;
    }
    /** @internal */
    inPendingSyncState() {
        return !this.joinRef || this.joinRef !== this.channel._joinRef();
    }
}
//# sourceMappingURL=RealtimePresence.js.map

/***/ }),

/***/ "./node_modules/@supabase/realtime-js/dist/module/index.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@supabase/realtime-js/dist/module/index.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   REALTIME_LISTEN_TYPES: () => (/* reexport safe */ _RealtimeChannel__WEBPACK_IMPORTED_MODULE_1__.REALTIME_LISTEN_TYPES),
/* harmony export */   REALTIME_POSTGRES_CHANGES_LISTEN_EVENT: () => (/* reexport safe */ _RealtimeChannel__WEBPACK_IMPORTED_MODULE_1__.REALTIME_POSTGRES_CHANGES_LISTEN_EVENT),
/* harmony export */   REALTIME_PRESENCE_LISTEN_EVENTS: () => (/* reexport safe */ _RealtimePresence__WEBPACK_IMPORTED_MODULE_2__.REALTIME_PRESENCE_LISTEN_EVENTS),
/* harmony export */   REALTIME_SUBSCRIBE_STATES: () => (/* reexport safe */ _RealtimeChannel__WEBPACK_IMPORTED_MODULE_1__.REALTIME_SUBSCRIBE_STATES),
/* harmony export */   RealtimeChannel: () => (/* reexport safe */ _RealtimeChannel__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   RealtimeClient: () => (/* reexport safe */ _RealtimeClient__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   RealtimePresence: () => (/* reexport safe */ _RealtimePresence__WEBPACK_IMPORTED_MODULE_2__["default"])
/* harmony export */ });
/* harmony import */ var _RealtimeClient__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RealtimeClient */ "./node_modules/@supabase/realtime-js/dist/module/RealtimeClient.js");
/* harmony import */ var _RealtimeChannel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RealtimeChannel */ "./node_modules/@supabase/realtime-js/dist/module/RealtimeChannel.js");
/* harmony import */ var _RealtimePresence__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./RealtimePresence */ "./node_modules/@supabase/realtime-js/dist/module/RealtimePresence.js");




//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@supabase/realtime-js/dist/module/lib/constants.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@supabase/realtime-js/dist/module/lib/constants.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CHANNEL_EVENTS: () => (/* binding */ CHANNEL_EVENTS),
/* harmony export */   CHANNEL_STATES: () => (/* binding */ CHANNEL_STATES),
/* harmony export */   CONNECTION_STATE: () => (/* binding */ CONNECTION_STATE),
/* harmony export */   DEFAULT_HEADERS: () => (/* binding */ DEFAULT_HEADERS),
/* harmony export */   DEFAULT_TIMEOUT: () => (/* binding */ DEFAULT_TIMEOUT),
/* harmony export */   SOCKET_STATES: () => (/* binding */ SOCKET_STATES),
/* harmony export */   TRANSPORTS: () => (/* binding */ TRANSPORTS),
/* harmony export */   VSN: () => (/* binding */ VSN),
/* harmony export */   WS_CLOSE_NORMAL: () => (/* binding */ WS_CLOSE_NORMAL)
/* harmony export */ });
/* harmony import */ var _version__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./version */ "./node_modules/@supabase/realtime-js/dist/module/lib/version.js");

const DEFAULT_HEADERS = { 'X-Client-Info': `realtime-js/${_version__WEBPACK_IMPORTED_MODULE_0__.version}` };
const VSN = '1.0.0';
const DEFAULT_TIMEOUT = 10000;
const WS_CLOSE_NORMAL = 1000;
var SOCKET_STATES;
(function (SOCKET_STATES) {
    SOCKET_STATES[SOCKET_STATES["connecting"] = 0] = "connecting";
    SOCKET_STATES[SOCKET_STATES["open"] = 1] = "open";
    SOCKET_STATES[SOCKET_STATES["closing"] = 2] = "closing";
    SOCKET_STATES[SOCKET_STATES["closed"] = 3] = "closed";
})(SOCKET_STATES || (SOCKET_STATES = {}));
var CHANNEL_STATES;
(function (CHANNEL_STATES) {
    CHANNEL_STATES["closed"] = "closed";
    CHANNEL_STATES["errored"] = "errored";
    CHANNEL_STATES["joined"] = "joined";
    CHANNEL_STATES["joining"] = "joining";
    CHANNEL_STATES["leaving"] = "leaving";
})(CHANNEL_STATES || (CHANNEL_STATES = {}));
var CHANNEL_EVENTS;
(function (CHANNEL_EVENTS) {
    CHANNEL_EVENTS["close"] = "phx_close";
    CHANNEL_EVENTS["error"] = "phx_error";
    CHANNEL_EVENTS["join"] = "phx_join";
    CHANNEL_EVENTS["reply"] = "phx_reply";
    CHANNEL_EVENTS["leave"] = "phx_leave";
    CHANNEL_EVENTS["access_token"] = "access_token";
})(CHANNEL_EVENTS || (CHANNEL_EVENTS = {}));
var TRANSPORTS;
(function (TRANSPORTS) {
    TRANSPORTS["websocket"] = "websocket";
})(TRANSPORTS || (TRANSPORTS = {}));
var CONNECTION_STATE;
(function (CONNECTION_STATE) {
    CONNECTION_STATE["Connecting"] = "connecting";
    CONNECTION_STATE["Open"] = "open";
    CONNECTION_STATE["Closing"] = "closing";
    CONNECTION_STATE["Closed"] = "closed";
})(CONNECTION_STATE || (CONNECTION_STATE = {}));
//# sourceMappingURL=constants.js.map

/***/ }),

/***/ "./node_modules/@supabase/realtime-js/dist/module/lib/push.js":
/*!********************************************************************!*\
  !*** ./node_modules/@supabase/realtime-js/dist/module/lib/push.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Push)
/* harmony export */ });
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/constants */ "./node_modules/@supabase/realtime-js/dist/module/lib/constants.js");

class Push {
    /**
     * Initializes the Push
     *
     * @param channel The Channel
     * @param event The event, for example `"phx_join"`
     * @param payload The payload, for example `{user_id: 123}`
     * @param timeout The push timeout in milliseconds
     */
    constructor(channel, event, payload = {}, timeout = _lib_constants__WEBPACK_IMPORTED_MODULE_0__.DEFAULT_TIMEOUT) {
        this.channel = channel;
        this.event = event;
        this.payload = payload;
        this.timeout = timeout;
        this.sent = false;
        this.timeoutTimer = undefined;
        this.ref = '';
        this.receivedResp = null;
        this.recHooks = [];
        this.refEvent = null;
        this.rateLimited = false;
    }
    resend(timeout) {
        this.timeout = timeout;
        this._cancelRefEvent();
        this.ref = '';
        this.refEvent = null;
        this.receivedResp = null;
        this.sent = false;
        this.send();
    }
    send() {
        if (this._hasReceived('timeout')) {
            return;
        }
        this.startTimeout();
        this.sent = true;
        const status = this.channel.socket.push({
            topic: this.channel.topic,
            event: this.event,
            payload: this.payload,
            ref: this.ref,
            join_ref: this.channel._joinRef(),
        });
        if (status === 'rate limited') {
            this.rateLimited = true;
        }
    }
    updatePayload(payload) {
        this.payload = Object.assign(Object.assign({}, this.payload), payload);
    }
    receive(status, callback) {
        var _a;
        if (this._hasReceived(status)) {
            callback((_a = this.receivedResp) === null || _a === void 0 ? void 0 : _a.response);
        }
        this.recHooks.push({ status, callback });
        return this;
    }
    startTimeout() {
        if (this.timeoutTimer) {
            return;
        }
        this.ref = this.channel.socket._makeRef();
        this.refEvent = this.channel._replyEventName(this.ref);
        const callback = (payload) => {
            this._cancelRefEvent();
            this._cancelTimeout();
            this.receivedResp = payload;
            this._matchReceive(payload);
        };
        this.channel._on(this.refEvent, {}, callback);
        this.timeoutTimer = setTimeout(() => {
            this.trigger('timeout', {});
        }, this.timeout);
    }
    trigger(status, response) {
        if (this.refEvent)
            this.channel._trigger(this.refEvent, { status, response });
    }
    destroy() {
        this._cancelRefEvent();
        this._cancelTimeout();
    }
    _cancelRefEvent() {
        if (!this.refEvent) {
            return;
        }
        this.channel._off(this.refEvent, {});
    }
    _cancelTimeout() {
        clearTimeout(this.timeoutTimer);
        this.timeoutTimer = undefined;
    }
    _matchReceive({ status, response, }) {
        this.recHooks
            .filter((h) => h.status === status)
            .forEach((h) => h.callback(response));
    }
    _hasReceived(status) {
        return this.receivedResp && this.receivedResp.status === status;
    }
}
//# sourceMappingURL=push.js.map

/***/ }),

/***/ "./node_modules/@supabase/realtime-js/dist/module/lib/serializer.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@supabase/realtime-js/dist/module/lib/serializer.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Serializer)
/* harmony export */ });
// This file draws heavily from https://github.com/phoenixframework/phoenix/commit/cf098e9cf7a44ee6479d31d911a97d3c7430c6fe
// License: https://github.com/phoenixframework/phoenix/blob/master/LICENSE.md
class Serializer {
    constructor() {
        this.HEADER_LENGTH = 1;
    }
    decode(rawPayload, callback) {
        if (rawPayload.constructor === ArrayBuffer) {
            return callback(this._binaryDecode(rawPayload));
        }
        if (typeof rawPayload === 'string') {
            return callback(JSON.parse(rawPayload));
        }
        return callback({});
    }
    _binaryDecode(buffer) {
        const view = new DataView(buffer);
        const decoder = new TextDecoder();
        return this._decodeBroadcast(buffer, view, decoder);
    }
    _decodeBroadcast(buffer, view, decoder) {
        const topicSize = view.getUint8(1);
        const eventSize = view.getUint8(2);
        let offset = this.HEADER_LENGTH + 2;
        const topic = decoder.decode(buffer.slice(offset, offset + topicSize));
        offset = offset + topicSize;
        const event = decoder.decode(buffer.slice(offset, offset + eventSize));
        offset = offset + eventSize;
        const data = JSON.parse(decoder.decode(buffer.slice(offset, buffer.byteLength)));
        return { ref: null, topic: topic, event: event, payload: data };
    }
}
//# sourceMappingURL=serializer.js.map

/***/ }),

/***/ "./node_modules/@supabase/realtime-js/dist/module/lib/timer.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@supabase/realtime-js/dist/module/lib/timer.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Timer)
/* harmony export */ });
/**
 * Creates a timer that accepts a `timerCalc` function to perform calculated timeout retries, such as exponential backoff.
 *
 * @example
 *    let reconnectTimer = new Timer(() => this.connect(), function(tries){
 *      return [1000, 5000, 10000][tries - 1] || 10000
 *    })
 *    reconnectTimer.scheduleTimeout() // fires after 1000
 *    reconnectTimer.scheduleTimeout() // fires after 5000
 *    reconnectTimer.reset()
 *    reconnectTimer.scheduleTimeout() // fires after 1000
 */
class Timer {
    constructor(callback, timerCalc) {
        this.callback = callback;
        this.timerCalc = timerCalc;
        this.timer = undefined;
        this.tries = 0;
        this.callback = callback;
        this.timerCalc = timerCalc;
    }
    reset() {
        this.tries = 0;
        clearTimeout(this.timer);
    }
    // Cancels any previous scheduleTimeout and schedules callback
    scheduleTimeout() {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.tries = this.tries + 1;
            this.callback();
        }, this.timerCalc(this.tries + 1));
    }
}
//# sourceMappingURL=timer.js.map

/***/ }),

/***/ "./node_modules/@supabase/realtime-js/dist/module/lib/transformers.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@supabase/realtime-js/dist/module/lib/transformers.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PostgresTypes: () => (/* binding */ PostgresTypes),
/* harmony export */   convertCell: () => (/* binding */ convertCell),
/* harmony export */   convertChangeData: () => (/* binding */ convertChangeData),
/* harmony export */   convertColumn: () => (/* binding */ convertColumn),
/* harmony export */   toArray: () => (/* binding */ toArray),
/* harmony export */   toBoolean: () => (/* binding */ toBoolean),
/* harmony export */   toJson: () => (/* binding */ toJson),
/* harmony export */   toNumber: () => (/* binding */ toNumber),
/* harmony export */   toTimestampString: () => (/* binding */ toTimestampString)
/* harmony export */ });
/**
 * Helpers to convert the change Payload into native JS types.
 */
// Adapted from epgsql (src/epgsql_binary.erl), this module licensed under
// 3-clause BSD found here: https://raw.githubusercontent.com/epgsql/epgsql/devel/LICENSE
var PostgresTypes;
(function (PostgresTypes) {
    PostgresTypes["abstime"] = "abstime";
    PostgresTypes["bool"] = "bool";
    PostgresTypes["date"] = "date";
    PostgresTypes["daterange"] = "daterange";
    PostgresTypes["float4"] = "float4";
    PostgresTypes["float8"] = "float8";
    PostgresTypes["int2"] = "int2";
    PostgresTypes["int4"] = "int4";
    PostgresTypes["int4range"] = "int4range";
    PostgresTypes["int8"] = "int8";
    PostgresTypes["int8range"] = "int8range";
    PostgresTypes["json"] = "json";
    PostgresTypes["jsonb"] = "jsonb";
    PostgresTypes["money"] = "money";
    PostgresTypes["numeric"] = "numeric";
    PostgresTypes["oid"] = "oid";
    PostgresTypes["reltime"] = "reltime";
    PostgresTypes["text"] = "text";
    PostgresTypes["time"] = "time";
    PostgresTypes["timestamp"] = "timestamp";
    PostgresTypes["timestamptz"] = "timestamptz";
    PostgresTypes["timetz"] = "timetz";
    PostgresTypes["tsrange"] = "tsrange";
    PostgresTypes["tstzrange"] = "tstzrange";
})(PostgresTypes || (PostgresTypes = {}));
/**
 * Takes an array of columns and an object of string values then converts each string value
 * to its mapped type.
 *
 * @param {{name: String, type: String}[]} columns
 * @param {Object} record
 * @param {Object} options The map of various options that can be applied to the mapper
 * @param {Array} options.skipTypes The array of types that should not be converted
 *
 * @example convertChangeData([{name: 'first_name', type: 'text'}, {name: 'age', type: 'int4'}], {first_name: 'Paul', age:'33'}, {})
 * //=>{ first_name: 'Paul', age: 33 }
 */
const convertChangeData = (columns, record, options = {}) => {
    var _a;
    const skipTypes = (_a = options.skipTypes) !== null && _a !== void 0 ? _a : [];
    return Object.keys(record).reduce((acc, rec_key) => {
        acc[rec_key] = convertColumn(rec_key, columns, record, skipTypes);
        return acc;
    }, {});
};
/**
 * Converts the value of an individual column.
 *
 * @param {String} columnName The column that you want to convert
 * @param {{name: String, type: String}[]} columns All of the columns
 * @param {Object} record The map of string values
 * @param {Array} skipTypes An array of types that should not be converted
 * @return {object} Useless information
 *
 * @example convertColumn('age', [{name: 'first_name', type: 'text'}, {name: 'age', type: 'int4'}], {first_name: 'Paul', age: '33'}, [])
 * //=> 33
 * @example convertColumn('age', [{name: 'first_name', type: 'text'}, {name: 'age', type: 'int4'}], {first_name: 'Paul', age: '33'}, ['int4'])
 * //=> "33"
 */
const convertColumn = (columnName, columns, record, skipTypes) => {
    const column = columns.find((x) => x.name === columnName);
    const colType = column === null || column === void 0 ? void 0 : column.type;
    const value = record[columnName];
    if (colType && !skipTypes.includes(colType)) {
        return convertCell(colType, value);
    }
    return noop(value);
};
/**
 * If the value of the cell is `null`, returns null.
 * Otherwise converts the string value to the correct type.
 * @param {String} type A postgres column type
 * @param {String} value The cell value
 *
 * @example convertCell('bool', 't')
 * //=> true
 * @example convertCell('int8', '10')
 * //=> 10
 * @example convertCell('_int4', '{1,2,3,4}')
 * //=> [1,2,3,4]
 */
const convertCell = (type, value) => {
    // if data type is an array
    if (type.charAt(0) === '_') {
        const dataType = type.slice(1, type.length);
        return toArray(value, dataType);
    }
    // If not null, convert to correct type.
    switch (type) {
        case PostgresTypes.bool:
            return toBoolean(value);
        case PostgresTypes.float4:
        case PostgresTypes.float8:
        case PostgresTypes.int2:
        case PostgresTypes.int4:
        case PostgresTypes.int8:
        case PostgresTypes.numeric:
        case PostgresTypes.oid:
            return toNumber(value);
        case PostgresTypes.json:
        case PostgresTypes.jsonb:
            return toJson(value);
        case PostgresTypes.timestamp:
            return toTimestampString(value); // Format to be consistent with PostgREST
        case PostgresTypes.abstime: // To allow users to cast it based on Timezone
        case PostgresTypes.date: // To allow users to cast it based on Timezone
        case PostgresTypes.daterange:
        case PostgresTypes.int4range:
        case PostgresTypes.int8range:
        case PostgresTypes.money:
        case PostgresTypes.reltime: // To allow users to cast it based on Timezone
        case PostgresTypes.text:
        case PostgresTypes.time: // To allow users to cast it based on Timezone
        case PostgresTypes.timestamptz: // To allow users to cast it based on Timezone
        case PostgresTypes.timetz: // To allow users to cast it based on Timezone
        case PostgresTypes.tsrange:
        case PostgresTypes.tstzrange:
            return noop(value);
        default:
            // Return the value for remaining types
            return noop(value);
    }
};
const noop = (value) => {
    return value;
};
const toBoolean = (value) => {
    switch (value) {
        case 't':
            return true;
        case 'f':
            return false;
        default:
            return value;
    }
};
const toNumber = (value) => {
    if (typeof value === 'string') {
        const parsedValue = parseFloat(value);
        if (!Number.isNaN(parsedValue)) {
            return parsedValue;
        }
    }
    return value;
};
const toJson = (value) => {
    if (typeof value === 'string') {
        try {
            return JSON.parse(value);
        }
        catch (error) {
            console.log(`JSON parse error: ${error}`);
            return value;
        }
    }
    return value;
};
/**
 * Converts a Postgres Array into a native JS array
 *
 * @example toArray('{}', 'int4')
 * //=> []
 * @example toArray('{"[2021-01-01,2021-12-31)","(2021-01-01,2021-12-32]"}', 'daterange')
 * //=> ['[2021-01-01,2021-12-31)', '(2021-01-01,2021-12-32]']
 * @example toArray([1,2,3,4], 'int4')
 * //=> [1,2,3,4]
 */
const toArray = (value, type) => {
    if (typeof value !== 'string') {
        return value;
    }
    const lastIdx = value.length - 1;
    const closeBrace = value[lastIdx];
    const openBrace = value[0];
    // Confirm value is a Postgres array by checking curly brackets
    if (openBrace === '{' && closeBrace === '}') {
        let arr;
        const valTrim = value.slice(1, lastIdx);
        // TODO: find a better solution to separate Postgres array data
        try {
            arr = JSON.parse('[' + valTrim + ']');
        }
        catch (_) {
            // WARNING: splitting on comma does not cover all edge cases
            arr = valTrim ? valTrim.split(',') : [];
        }
        return arr.map((val) => convertCell(type, val));
    }
    return value;
};
/**
 * Fixes timestamp to be ISO-8601. Swaps the space between the date and time for a 'T'
 * See https://github.com/supabase/supabase/issues/18
 *
 * @example toTimestampString('2019-09-10 00:00:00')
 * //=> '2019-09-10T00:00:00'
 */
const toTimestampString = (value) => {
    if (typeof value === 'string') {
        return value.replace(' ', 'T');
    }
    return value;
};
//# sourceMappingURL=transformers.js.map

/***/ }),

/***/ "./node_modules/@supabase/realtime-js/dist/module/lib/version.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@supabase/realtime-js/dist/module/lib/version.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   version: () => (/* binding */ version)
/* harmony export */ });
const version = '2.7.2';
//# sourceMappingURL=version.js.map

/***/ }),

/***/ "./node_modules/@supabase/storage-js/dist/module/StorageClient.js":
/*!************************************************************************!*\
  !*** ./node_modules/@supabase/storage-js/dist/module/StorageClient.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StorageClient: () => (/* binding */ StorageClient)
/* harmony export */ });
/* harmony import */ var _packages_StorageFileApi__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./packages/StorageFileApi */ "./node_modules/@supabase/storage-js/dist/module/packages/StorageFileApi.js");
/* harmony import */ var _packages_StorageBucketApi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./packages/StorageBucketApi */ "./node_modules/@supabase/storage-js/dist/module/packages/StorageBucketApi.js");


class StorageClient extends _packages_StorageBucketApi__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(url, headers = {}, fetch) {
        super(url, headers, fetch);
    }
    /**
     * Perform file operation in a bucket.
     *
     * @param id The bucket id to operate on.
     */
    from(id) {
        return new _packages_StorageFileApi__WEBPACK_IMPORTED_MODULE_1__["default"](this.url, this.headers, id, this.fetch);
    }
}
//# sourceMappingURL=StorageClient.js.map

/***/ }),

/***/ "./node_modules/@supabase/storage-js/dist/module/lib/constants.js":
/*!************************************************************************!*\
  !*** ./node_modules/@supabase/storage-js/dist/module/lib/constants.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DEFAULT_HEADERS: () => (/* binding */ DEFAULT_HEADERS)
/* harmony export */ });
/* harmony import */ var _version__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./version */ "./node_modules/@supabase/storage-js/dist/module/lib/version.js");

const DEFAULT_HEADERS = { 'X-Client-Info': `storage-js/${_version__WEBPACK_IMPORTED_MODULE_0__.version}` };
//# sourceMappingURL=constants.js.map

/***/ }),

/***/ "./node_modules/@supabase/storage-js/dist/module/lib/errors.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@supabase/storage-js/dist/module/lib/errors.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StorageApiError: () => (/* binding */ StorageApiError),
/* harmony export */   StorageError: () => (/* binding */ StorageError),
/* harmony export */   StorageUnknownError: () => (/* binding */ StorageUnknownError),
/* harmony export */   isStorageError: () => (/* binding */ isStorageError)
/* harmony export */ });
class StorageError extends Error {
    constructor(message) {
        super(message);
        this.__isStorageError = true;
        this.name = 'StorageError';
    }
}
function isStorageError(error) {
    return typeof error === 'object' && error !== null && '__isStorageError' in error;
}
class StorageApiError extends StorageError {
    constructor(message, status) {
        super(message);
        this.name = 'StorageApiError';
        this.status = status;
    }
    toJSON() {
        return {
            name: this.name,
            message: this.message,
            status: this.status,
        };
    }
}
class StorageUnknownError extends StorageError {
    constructor(message, originalError) {
        super(message);
        this.name = 'StorageUnknownError';
        this.originalError = originalError;
    }
}
//# sourceMappingURL=errors.js.map

/***/ }),

/***/ "./node_modules/@supabase/storage-js/dist/module/lib/fetch.js":
/*!********************************************************************!*\
  !*** ./node_modules/@supabase/storage-js/dist/module/lib/fetch.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   get: () => (/* binding */ get),
/* harmony export */   post: () => (/* binding */ post),
/* harmony export */   put: () => (/* binding */ put),
/* harmony export */   remove: () => (/* binding */ remove)
/* harmony export */ });
/* harmony import */ var _errors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./errors */ "./node_modules/@supabase/storage-js/dist/module/lib/errors.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers */ "./node_modules/@supabase/storage-js/dist/module/lib/helpers.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


const _getErrorMessage = (err) => err.msg || err.message || err.error_description || err.error || JSON.stringify(err);
const handleError = (error, reject) => __awaiter(void 0, void 0, void 0, function* () {
    const Res = yield (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.resolveResponse)();
    if (error instanceof Res) {
        error
            .json()
            .then((err) => {
            reject(new _errors__WEBPACK_IMPORTED_MODULE_1__.StorageApiError(_getErrorMessage(err), error.status || 500));
        })
            .catch((err) => {
            reject(new _errors__WEBPACK_IMPORTED_MODULE_1__.StorageUnknownError(_getErrorMessage(err), err));
        });
    }
    else {
        reject(new _errors__WEBPACK_IMPORTED_MODULE_1__.StorageUnknownError(_getErrorMessage(error), error));
    }
});
const _getRequestParams = (method, options, parameters, body) => {
    const params = { method, headers: (options === null || options === void 0 ? void 0 : options.headers) || {} };
    if (method === 'GET') {
        return params;
    }
    params.headers = Object.assign({ 'Content-Type': 'application/json' }, options === null || options === void 0 ? void 0 : options.headers);
    params.body = JSON.stringify(body);
    return Object.assign(Object.assign({}, params), parameters);
};
function _handleRequest(fetcher, method, url, options, parameters, body) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            fetcher(url, _getRequestParams(method, options, parameters, body))
                .then((result) => {
                if (!result.ok)
                    throw result;
                if (options === null || options === void 0 ? void 0 : options.noResolveJson)
                    return result;
                return result.json();
            })
                .then((data) => resolve(data))
                .catch((error) => handleError(error, reject));
        });
    });
}
function get(fetcher, url, options, parameters) {
    return __awaiter(this, void 0, void 0, function* () {
        return _handleRequest(fetcher, 'GET', url, options, parameters);
    });
}
function post(fetcher, url, body, options, parameters) {
    return __awaiter(this, void 0, void 0, function* () {
        return _handleRequest(fetcher, 'POST', url, options, parameters, body);
    });
}
function put(fetcher, url, body, options, parameters) {
    return __awaiter(this, void 0, void 0, function* () {
        return _handleRequest(fetcher, 'PUT', url, options, parameters, body);
    });
}
function remove(fetcher, url, body, options, parameters) {
    return __awaiter(this, void 0, void 0, function* () {
        return _handleRequest(fetcher, 'DELETE', url, options, parameters, body);
    });
}
//# sourceMappingURL=fetch.js.map

/***/ }),

/***/ "./node_modules/@supabase/storage-js/dist/module/lib/helpers.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@supabase/storage-js/dist/module/lib/helpers.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   resolveFetch: () => (/* binding */ resolveFetch),
/* harmony export */   resolveResponse: () => (/* binding */ resolveResponse)
/* harmony export */ });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const resolveFetch = (customFetch) => {
    let _fetch;
    if (customFetch) {
        _fetch = customFetch;
    }
    else if (typeof fetch === 'undefined') {
        _fetch = (...args) => __awaiter(void 0, void 0, void 0, function* () { return yield (yield Promise.resolve(/*! import() */).then(__webpack_require__.t.bind(__webpack_require__, /*! cross-fetch */ "./node_modules/cross-fetch/dist/browser-ponyfill.js", 23))).fetch(...args); });
    }
    else {
        _fetch = fetch;
    }
    return (...args) => _fetch(...args);
};
const resolveResponse = () => __awaiter(void 0, void 0, void 0, function* () {
    if (typeof Response === 'undefined') {
        return (yield Promise.resolve(/*! import() */).then(__webpack_require__.t.bind(__webpack_require__, /*! cross-fetch */ "./node_modules/cross-fetch/dist/browser-ponyfill.js", 23))).Response;
    }
    return Response;
});
//# sourceMappingURL=helpers.js.map

/***/ }),

/***/ "./node_modules/@supabase/storage-js/dist/module/lib/version.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@supabase/storage-js/dist/module/lib/version.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   version: () => (/* binding */ version)
/* harmony export */ });
// generated by genversion
const version = '2.5.1';
//# sourceMappingURL=version.js.map

/***/ }),

/***/ "./node_modules/@supabase/storage-js/dist/module/packages/StorageBucketApi.js":
/*!************************************************************************************!*\
  !*** ./node_modules/@supabase/storage-js/dist/module/packages/StorageBucketApi.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ StorageBucketApi)
/* harmony export */ });
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/constants */ "./node_modules/@supabase/storage-js/dist/module/lib/constants.js");
/* harmony import */ var _lib_errors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../lib/errors */ "./node_modules/@supabase/storage-js/dist/module/lib/errors.js");
/* harmony import */ var _lib_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/fetch */ "./node_modules/@supabase/storage-js/dist/module/lib/fetch.js");
/* harmony import */ var _lib_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/helpers */ "./node_modules/@supabase/storage-js/dist/module/lib/helpers.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};




class StorageBucketApi {
    constructor(url, headers = {}, fetch) {
        this.url = url;
        this.headers = Object.assign(Object.assign({}, _lib_constants__WEBPACK_IMPORTED_MODULE_0__.DEFAULT_HEADERS), headers);
        this.fetch = (0,_lib_helpers__WEBPACK_IMPORTED_MODULE_1__.resolveFetch)(fetch);
    }
    /**
     * Retrieves the details of all Storage buckets within an existing project.
     */
    listBuckets() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield (0,_lib_fetch__WEBPACK_IMPORTED_MODULE_2__.get)(this.fetch, `${this.url}/bucket`, { headers: this.headers });
                return { data, error: null };
            }
            catch (error) {
                if ((0,_lib_errors__WEBPACK_IMPORTED_MODULE_3__.isStorageError)(error)) {
                    return { data: null, error };
                }
                throw error;
            }
        });
    }
    /**
     * Retrieves the details of an existing Storage bucket.
     *
     * @param id The unique identifier of the bucket you would like to retrieve.
     */
    getBucket(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield (0,_lib_fetch__WEBPACK_IMPORTED_MODULE_2__.get)(this.fetch, `${this.url}/bucket/${id}`, { headers: this.headers });
                return { data, error: null };
            }
            catch (error) {
                if ((0,_lib_errors__WEBPACK_IMPORTED_MODULE_3__.isStorageError)(error)) {
                    return { data: null, error };
                }
                throw error;
            }
        });
    }
    /**
     * Creates a new Storage bucket
     *
     * @param id A unique identifier for the bucket you are creating.
     * @param options.public The visibility of the bucket. Public buckets don't require an authorization token to download objects, but still require a valid token for all other operations. By default, buckets are private.
     * @param options.fileSizeLimit specifies the max file size in bytes that can be uploaded to this bucket.
     * The global file size limit takes precedence over this value.
     * The default value is null, which doesn't set a per bucket file size limit.
     * @param options.allowedMimeTypes specifies the allowed mime types that this bucket can accept during upload.
     * The default value is null, which allows files with all mime types to be uploaded.
     * Each mime type specified can be a wildcard, e.g. image/*, or a specific mime type, e.g. image/png.
     * @returns newly created bucket id
     */
    createBucket(id, options = {
        public: false,
    }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield (0,_lib_fetch__WEBPACK_IMPORTED_MODULE_2__.post)(this.fetch, `${this.url}/bucket`, {
                    id,
                    name: id,
                    public: options.public,
                    file_size_limit: options.fileSizeLimit,
                    allowed_mime_types: options.allowedMimeTypes,
                }, { headers: this.headers });
                return { data, error: null };
            }
            catch (error) {
                if ((0,_lib_errors__WEBPACK_IMPORTED_MODULE_3__.isStorageError)(error)) {
                    return { data: null, error };
                }
                throw error;
            }
        });
    }
    /**
     * Updates a Storage bucket
     *
     * @param id A unique identifier for the bucket you are updating.
     * @param options.public The visibility of the bucket. Public buckets don't require an authorization token to download objects, but still require a valid token for all other operations.
     * @param options.fileSizeLimit specifies the max file size in bytes that can be uploaded to this bucket.
     * The global file size limit takes precedence over this value.
     * The default value is null, which doesn't set a per bucket file size limit.
     * @param options.allowedMimeTypes specifies the allowed mime types that this bucket can accept during upload.
     * The default value is null, which allows files with all mime types to be uploaded.
     * Each mime type specified can be a wildcard, e.g. image/*, or a specific mime type, e.g. image/png.
     */
    updateBucket(id, options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield (0,_lib_fetch__WEBPACK_IMPORTED_MODULE_2__.put)(this.fetch, `${this.url}/bucket/${id}`, {
                    id,
                    name: id,
                    public: options.public,
                    file_size_limit: options.fileSizeLimit,
                    allowed_mime_types: options.allowedMimeTypes,
                }, { headers: this.headers });
                return { data, error: null };
            }
            catch (error) {
                if ((0,_lib_errors__WEBPACK_IMPORTED_MODULE_3__.isStorageError)(error)) {
                    return { data: null, error };
                }
                throw error;
            }
        });
    }
    /**
     * Removes all objects inside a single bucket.
     *
     * @param id The unique identifier of the bucket you would like to empty.
     */
    emptyBucket(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield (0,_lib_fetch__WEBPACK_IMPORTED_MODULE_2__.post)(this.fetch, `${this.url}/bucket/${id}/empty`, {}, { headers: this.headers });
                return { data, error: null };
            }
            catch (error) {
                if ((0,_lib_errors__WEBPACK_IMPORTED_MODULE_3__.isStorageError)(error)) {
                    return { data: null, error };
                }
                throw error;
            }
        });
    }
    /**
     * Deletes an existing bucket. A bucket can't be deleted with existing objects inside it.
     * You must first `empty()` the bucket.
     *
     * @param id The unique identifier of the bucket you would like to delete.
     */
    deleteBucket(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield (0,_lib_fetch__WEBPACK_IMPORTED_MODULE_2__.remove)(this.fetch, `${this.url}/bucket/${id}`, {}, { headers: this.headers });
                return { data, error: null };
            }
            catch (error) {
                if ((0,_lib_errors__WEBPACK_IMPORTED_MODULE_3__.isStorageError)(error)) {
                    return { data: null, error };
                }
                throw error;
            }
        });
    }
}
//# sourceMappingURL=StorageBucketApi.js.map

/***/ }),

/***/ "./node_modules/@supabase/storage-js/dist/module/packages/StorageFileApi.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/@supabase/storage-js/dist/module/packages/StorageFileApi.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ StorageFileApi)
/* harmony export */ });
/* harmony import */ var _lib_errors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/errors */ "./node_modules/@supabase/storage-js/dist/module/lib/errors.js");
/* harmony import */ var _lib_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/fetch */ "./node_modules/@supabase/storage-js/dist/module/lib/fetch.js");
/* harmony import */ var _lib_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/helpers */ "./node_modules/@supabase/storage-js/dist/module/lib/helpers.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



const DEFAULT_SEARCH_OPTIONS = {
    limit: 100,
    offset: 0,
    sortBy: {
        column: 'name',
        order: 'asc',
    },
};
const DEFAULT_FILE_OPTIONS = {
    cacheControl: '3600',
    contentType: 'text/plain;charset=UTF-8',
    upsert: false,
};
class StorageFileApi {
    constructor(url, headers = {}, bucketId, fetch) {
        this.url = url;
        this.headers = headers;
        this.bucketId = bucketId;
        this.fetch = (0,_lib_helpers__WEBPACK_IMPORTED_MODULE_0__.resolveFetch)(fetch);
    }
    /**
     * Uploads a file to an existing bucket or replaces an existing file at the specified path with a new one.
     *
     * @param method HTTP method.
     * @param path The relative file path. Should be of the format `folder/subfolder/filename.png`. The bucket must already exist before attempting to upload.
     * @param fileBody The body of the file to be stored in the bucket.
     */
    uploadOrUpdate(method, path, fileBody, fileOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let body;
                const options = Object.assign(Object.assign({}, DEFAULT_FILE_OPTIONS), fileOptions);
                const headers = Object.assign(Object.assign({}, this.headers), (method === 'POST' && { 'x-upsert': String(options.upsert) }));
                if (typeof Blob !== 'undefined' && fileBody instanceof Blob) {
                    body = new FormData();
                    body.append('cacheControl', options.cacheControl);
                    body.append('', fileBody);
                }
                else if (typeof FormData !== 'undefined' && fileBody instanceof FormData) {
                    body = fileBody;
                    body.append('cacheControl', options.cacheControl);
                }
                else {
                    body = fileBody;
                    headers['cache-control'] = `max-age=${options.cacheControl}`;
                    headers['content-type'] = options.contentType;
                }
                const cleanPath = this._removeEmptyFolders(path);
                const _path = this._getFinalPath(cleanPath);
                const res = yield this.fetch(`${this.url}/object/${_path}`, Object.assign({ method, body: body, headers }, ((options === null || options === void 0 ? void 0 : options.duplex) ? { duplex: options.duplex } : {})));
                if (res.ok) {
                    return {
                        data: { path: cleanPath },
                        error: null,
                    };
                }
                else {
                    const error = yield res.json();
                    return { data: null, error };
                }
            }
            catch (error) {
                if ((0,_lib_errors__WEBPACK_IMPORTED_MODULE_1__.isStorageError)(error)) {
                    return { data: null, error };
                }
                throw error;
            }
        });
    }
    /**
     * Uploads a file to an existing bucket.
     *
     * @param path The file path, including the file name. Should be of the format `folder/subfolder/filename.png`. The bucket must already exist before attempting to upload.
     * @param fileBody The body of the file to be stored in the bucket.
     */
    upload(path, fileBody, fileOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.uploadOrUpdate('POST', path, fileBody, fileOptions);
        });
    }
    /**
     * Upload a file with a token generated from `createSignedUploadUrl`.
     * @param path The file path, including the file name. Should be of the format `folder/subfolder/filename.png`. The bucket must already exist before attempting to upload.
     * @param token The token generated from `createSignedUploadUrl`
     * @param fileBody The body of the file to be stored in the bucket.
     */
    uploadToSignedUrl(path, token, fileBody, fileOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            const cleanPath = this._removeEmptyFolders(path);
            const _path = this._getFinalPath(cleanPath);
            const url = new URL(this.url + `/object/upload/sign/${_path}`);
            url.searchParams.set('token', token);
            try {
                let body;
                const options = Object.assign({ upsert: DEFAULT_FILE_OPTIONS.upsert }, fileOptions);
                const headers = Object.assign(Object.assign({}, this.headers), { 'x-upsert': String(options.upsert) });
                if (typeof Blob !== 'undefined' && fileBody instanceof Blob) {
                    body = new FormData();
                    body.append('cacheControl', options.cacheControl);
                    body.append('', fileBody);
                }
                else if (typeof FormData !== 'undefined' && fileBody instanceof FormData) {
                    body = fileBody;
                    body.append('cacheControl', options.cacheControl);
                }
                else {
                    body = fileBody;
                    headers['cache-control'] = `max-age=${options.cacheControl}`;
                    headers['content-type'] = options.contentType;
                }
                const res = yield this.fetch(url.toString(), {
                    method: 'PUT',
                    body: body,
                    headers,
                });
                if (res.ok) {
                    return {
                        data: { path: cleanPath },
                        error: null,
                    };
                }
                else {
                    const error = yield res.json();
                    return { data: null, error };
                }
            }
            catch (error) {
                if ((0,_lib_errors__WEBPACK_IMPORTED_MODULE_1__.isStorageError)(error)) {
                    return { data: null, error };
                }
                throw error;
            }
        });
    }
    /**
     * Creates a signed upload URL.
     * Signed upload URLs can be used to upload files to the bucket without further authentication.
     * They are valid for one minute.
     * @param path The file path, including the current file name. For example `folder/image.png`.
     */
    createSignedUploadUrl(path) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let _path = this._getFinalPath(path);
                const data = yield (0,_lib_fetch__WEBPACK_IMPORTED_MODULE_2__.post)(this.fetch, `${this.url}/object/upload/sign/${_path}`, {}, { headers: this.headers });
                const url = new URL(this.url + data.url);
                const token = url.searchParams.get('token');
                if (!token) {
                    throw new _lib_errors__WEBPACK_IMPORTED_MODULE_1__.StorageError('No token returned by API');
                }
                return { data: { signedUrl: url.toString(), path, token }, error: null };
            }
            catch (error) {
                if ((0,_lib_errors__WEBPACK_IMPORTED_MODULE_1__.isStorageError)(error)) {
                    return { data: null, error };
                }
                throw error;
            }
        });
    }
    /**
     * Replaces an existing file at the specified path with a new one.
     *
     * @param path The relative file path. Should be of the format `folder/subfolder/filename.png`. The bucket must already exist before attempting to update.
     * @param fileBody The body of the file to be stored in the bucket.
     */
    update(path, fileBody, fileOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.uploadOrUpdate('PUT', path, fileBody, fileOptions);
        });
    }
    /**
     * Moves an existing file to a new path in the same bucket.
     *
     * @param fromPath The original file path, including the current file name. For example `folder/image.png`.
     * @param toPath The new file path, including the new file name. For example `folder/image-new.png`.
     */
    move(fromPath, toPath) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield (0,_lib_fetch__WEBPACK_IMPORTED_MODULE_2__.post)(this.fetch, `${this.url}/object/move`, { bucketId: this.bucketId, sourceKey: fromPath, destinationKey: toPath }, { headers: this.headers });
                return { data, error: null };
            }
            catch (error) {
                if ((0,_lib_errors__WEBPACK_IMPORTED_MODULE_1__.isStorageError)(error)) {
                    return { data: null, error };
                }
                throw error;
            }
        });
    }
    /**
     * Copies an existing file to a new path in the same bucket.
     *
     * @param fromPath The original file path, including the current file name. For example `folder/image.png`.
     * @param toPath The new file path, including the new file name. For example `folder/image-copy.png`.
     */
    copy(fromPath, toPath) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield (0,_lib_fetch__WEBPACK_IMPORTED_MODULE_2__.post)(this.fetch, `${this.url}/object/copy`, { bucketId: this.bucketId, sourceKey: fromPath, destinationKey: toPath }, { headers: this.headers });
                return { data: { path: data.Key }, error: null };
            }
            catch (error) {
                if ((0,_lib_errors__WEBPACK_IMPORTED_MODULE_1__.isStorageError)(error)) {
                    return { data: null, error };
                }
                throw error;
            }
        });
    }
    /**
     * Creates a signed URL. Use a signed URL to share a file for a fixed amount of time.
     *
     * @param path The file path, including the current file name. For example `folder/image.png`.
     * @param expiresIn The number of seconds until the signed URL expires. For example, `60` for a URL which is valid for one minute.
     * @param options.download triggers the file as a download if set to true. Set this parameter as the name of the file if you want to trigger the download with a different filename.
     * @param options.transform Transform the asset before serving it to the client.
     */
    createSignedUrl(path, expiresIn, options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let _path = this._getFinalPath(path);
                let data = yield (0,_lib_fetch__WEBPACK_IMPORTED_MODULE_2__.post)(this.fetch, `${this.url}/object/sign/${_path}`, Object.assign({ expiresIn }, ((options === null || options === void 0 ? void 0 : options.transform) ? { transform: options.transform } : {})), { headers: this.headers });
                const downloadQueryParam = (options === null || options === void 0 ? void 0 : options.download)
                    ? `&download=${options.download === true ? '' : options.download}`
                    : '';
                const signedUrl = encodeURI(`${this.url}${data.signedURL}${downloadQueryParam}`);
                data = { signedUrl };
                return { data, error: null };
            }
            catch (error) {
                if ((0,_lib_errors__WEBPACK_IMPORTED_MODULE_1__.isStorageError)(error)) {
                    return { data: null, error };
                }
                throw error;
            }
        });
    }
    /**
     * Creates multiple signed URLs. Use a signed URL to share a file for a fixed amount of time.
     *
     * @param paths The file paths to be downloaded, including the current file names. For example `['folder/image.png', 'folder2/image2.png']`.
     * @param expiresIn The number of seconds until the signed URLs expire. For example, `60` for URLs which are valid for one minute.
     * @param options.download triggers the file as a download if set to true. Set this parameter as the name of the file if you want to trigger the download with a different filename.
     */
    createSignedUrls(paths, expiresIn, options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield (0,_lib_fetch__WEBPACK_IMPORTED_MODULE_2__.post)(this.fetch, `${this.url}/object/sign/${this.bucketId}`, { expiresIn, paths }, { headers: this.headers });
                const downloadQueryParam = (options === null || options === void 0 ? void 0 : options.download)
                    ? `&download=${options.download === true ? '' : options.download}`
                    : '';
                return {
                    data: data.map((datum) => (Object.assign(Object.assign({}, datum), { signedUrl: datum.signedURL
                            ? encodeURI(`${this.url}${datum.signedURL}${downloadQueryParam}`)
                            : null }))),
                    error: null,
                };
            }
            catch (error) {
                if ((0,_lib_errors__WEBPACK_IMPORTED_MODULE_1__.isStorageError)(error)) {
                    return { data: null, error };
                }
                throw error;
            }
        });
    }
    /**
     * Downloads a file from a private bucket. For public buckets, make a request to the URL returned from `getPublicUrl` instead.
     *
     * @param path The full path and file name of the file to be downloaded. For example `folder/image.png`.
     * @param options.transform Transform the asset before serving it to the client.
     */
    download(path, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const wantsTransformation = typeof (options === null || options === void 0 ? void 0 : options.transform) !== 'undefined';
            const renderPath = wantsTransformation ? 'render/image/authenticated' : 'object';
            const transformationQuery = this.transformOptsToQueryString((options === null || options === void 0 ? void 0 : options.transform) || {});
            const queryString = transformationQuery ? `?${transformationQuery}` : '';
            try {
                const _path = this._getFinalPath(path);
                const res = yield (0,_lib_fetch__WEBPACK_IMPORTED_MODULE_2__.get)(this.fetch, `${this.url}/${renderPath}/${_path}${queryString}`, {
                    headers: this.headers,
                    noResolveJson: true,
                });
                const data = yield res.blob();
                return { data, error: null };
            }
            catch (error) {
                if ((0,_lib_errors__WEBPACK_IMPORTED_MODULE_1__.isStorageError)(error)) {
                    return { data: null, error };
                }
                throw error;
            }
        });
    }
    /**
     * A simple convenience function to get the URL for an asset in a public bucket. If you do not want to use this function, you can construct the public URL by concatenating the bucket URL with the path to the asset.
     * This function does not verify if the bucket is public. If a public URL is created for a bucket which is not public, you will not be able to download the asset.
     *
     * @param path The path and name of the file to generate the public URL for. For example `folder/image.png`.
     * @param options.download Triggers the file as a download if set to true. Set this parameter as the name of the file if you want to trigger the download with a different filename.
     * @param options.transform Transform the asset before serving it to the client.
     */
    getPublicUrl(path, options) {
        const _path = this._getFinalPath(path);
        const _queryString = [];
        const downloadQueryParam = (options === null || options === void 0 ? void 0 : options.download)
            ? `download=${options.download === true ? '' : options.download}`
            : '';
        if (downloadQueryParam !== '') {
            _queryString.push(downloadQueryParam);
        }
        const wantsTransformation = typeof (options === null || options === void 0 ? void 0 : options.transform) !== 'undefined';
        const renderPath = wantsTransformation ? 'render/image' : 'object';
        const transformationQuery = this.transformOptsToQueryString((options === null || options === void 0 ? void 0 : options.transform) || {});
        if (transformationQuery !== '') {
            _queryString.push(transformationQuery);
        }
        let queryString = _queryString.join('&');
        if (queryString !== '') {
            queryString = `?${queryString}`;
        }
        return {
            data: { publicUrl: encodeURI(`${this.url}/${renderPath}/public/${_path}${queryString}`) },
        };
    }
    /**
     * Deletes files within the same bucket
     *
     * @param paths An array of files to delete, including the path and file name. For example [`'folder/image.png'`].
     */
    remove(paths) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield (0,_lib_fetch__WEBPACK_IMPORTED_MODULE_2__.remove)(this.fetch, `${this.url}/object/${this.bucketId}`, { prefixes: paths }, { headers: this.headers });
                return { data, error: null };
            }
            catch (error) {
                if ((0,_lib_errors__WEBPACK_IMPORTED_MODULE_1__.isStorageError)(error)) {
                    return { data: null, error };
                }
                throw error;
            }
        });
    }
    /**
     * Get file metadata
     * @param id the file id to retrieve metadata
     */
    // async getMetadata(
    //   id: string
    // ): Promise<
    //   | {
    //       data: Metadata
    //       error: null
    //     }
    //   | {
    //       data: null
    //       error: StorageError
    //     }
    // > {
    //   try {
    //     const data = await get(this.fetch, `${this.url}/metadata/${id}`, { headers: this.headers })
    //     return { data, error: null }
    //   } catch (error) {
    //     if (isStorageError(error)) {
    //       return { data: null, error }
    //     }
    //     throw error
    //   }
    // }
    /**
     * Update file metadata
     * @param id the file id to update metadata
     * @param meta the new file metadata
     */
    // async updateMetadata(
    //   id: string,
    //   meta: Metadata
    // ): Promise<
    //   | {
    //       data: Metadata
    //       error: null
    //     }
    //   | {
    //       data: null
    //       error: StorageError
    //     }
    // > {
    //   try {
    //     const data = await post(
    //       this.fetch,
    //       `${this.url}/metadata/${id}`,
    //       { ...meta },
    //       { headers: this.headers }
    //     )
    //     return { data, error: null }
    //   } catch (error) {
    //     if (isStorageError(error)) {
    //       return { data: null, error }
    //     }
    //     throw error
    //   }
    // }
    /**
     * Lists all the files within a bucket.
     * @param path The folder path.
     */
    list(path, options, parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = Object.assign(Object.assign(Object.assign({}, DEFAULT_SEARCH_OPTIONS), options), { prefix: path || '' });
                const data = yield (0,_lib_fetch__WEBPACK_IMPORTED_MODULE_2__.post)(this.fetch, `${this.url}/object/list/${this.bucketId}`, body, { headers: this.headers }, parameters);
                return { data, error: null };
            }
            catch (error) {
                if ((0,_lib_errors__WEBPACK_IMPORTED_MODULE_1__.isStorageError)(error)) {
                    return { data: null, error };
                }
                throw error;
            }
        });
    }
    _getFinalPath(path) {
        return `${this.bucketId}/${path}`;
    }
    _removeEmptyFolders(path) {
        return path.replace(/^\/|\/$/g, '').replace(/\/+/g, '/');
    }
    transformOptsToQueryString(transform) {
        const params = [];
        if (transform.width) {
            params.push(`width=${transform.width}`);
        }
        if (transform.height) {
            params.push(`height=${transform.height}`);
        }
        if (transform.resize) {
            params.push(`resize=${transform.resize}`);
        }
        if (transform.format) {
            params.push(`format=${transform.format}`);
        }
        if (transform.quality) {
            params.push(`quality=${transform.quality}`);
        }
        return params.join('&');
    }
}
//# sourceMappingURL=StorageFileApi.js.map

/***/ }),

/***/ "./node_modules/@supabase/supabase-js/dist/module/SupabaseClient.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@supabase/supabase-js/dist/module/SupabaseClient.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SupabaseClient)
/* harmony export */ });
/* harmony import */ var _supabase_functions_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @supabase/functions-js */ "./node_modules/@supabase/functions-js/dist/module/FunctionsClient.js");
/* harmony import */ var _supabase_postgrest_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @supabase/postgrest-js */ "./node_modules/@supabase/postgrest-js/dist/module/index.js");
/* harmony import */ var _supabase_realtime_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @supabase/realtime-js */ "./node_modules/@supabase/realtime-js/dist/module/index.js");
/* harmony import */ var _supabase_storage_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @supabase/storage-js */ "./node_modules/@supabase/storage-js/dist/module/StorageClient.js");
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/constants */ "./node_modules/@supabase/supabase-js/dist/module/lib/constants.js");
/* harmony import */ var _lib_fetch__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lib/fetch */ "./node_modules/@supabase/supabase-js/dist/module/lib/fetch.js");
/* harmony import */ var _lib_helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lib/helpers */ "./node_modules/@supabase/supabase-js/dist/module/lib/helpers.js");
/* harmony import */ var _lib_SupabaseAuthClient__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./lib/SupabaseAuthClient */ "./node_modules/@supabase/supabase-js/dist/module/lib/SupabaseAuthClient.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};








const DEFAULT_GLOBAL_OPTIONS = {
    headers: _lib_constants__WEBPACK_IMPORTED_MODULE_2__.DEFAULT_HEADERS,
};
const DEFAULT_DB_OPTIONS = {
    schema: 'public',
};
const DEFAULT_AUTH_OPTIONS = {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'implicit',
};
const DEFAULT_REALTIME_OPTIONS = {};
/**
 * Supabase Client.
 *
 * An isomorphic Javascript client for interacting with Postgres.
 */
class SupabaseClient {
    /**
     * Create a new client for use in the browser.
     * @param supabaseUrl The unique Supabase URL which is supplied when you create a new project in your project dashboard.
     * @param supabaseKey The unique Supabase Key which is supplied when you create a new project in your project dashboard.
     * @param options.db.schema You can switch in between schemas. The schema needs to be on the list of exposed schemas inside Supabase.
     * @param options.auth.autoRefreshToken Set to "true" if you want to automatically refresh the token before expiring.
     * @param options.auth.persistSession Set to "true" if you want to automatically save the user session into local storage.
     * @param options.auth.detectSessionInUrl Set to "true" if you want to automatically detects OAuth grants in the URL and signs in the user.
     * @param options.realtime Options passed along to realtime-js constructor.
     * @param options.global.fetch A custom fetch implementation.
     * @param options.global.headers Any additional headers to send with each network request.
     */
    constructor(supabaseUrl, supabaseKey, options) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        this.supabaseUrl = supabaseUrl;
        this.supabaseKey = supabaseKey;
        if (!supabaseUrl)
            throw new Error('supabaseUrl is required.');
        if (!supabaseKey)
            throw new Error('supabaseKey is required.');
        const _supabaseUrl = (0,_lib_helpers__WEBPACK_IMPORTED_MODULE_3__.stripTrailingSlash)(supabaseUrl);
        this.realtimeUrl = `${_supabaseUrl}/realtime/v1`.replace(/^http/i, 'ws');
        this.authUrl = `${_supabaseUrl}/auth/v1`;
        this.storageUrl = `${_supabaseUrl}/storage/v1`;
        this.functionsUrl = `${_supabaseUrl}/functions/v1`;
        // default storage key uses the supabase project ref as a namespace
        const defaultStorageKey = `sb-${new URL(this.authUrl).hostname.split('.')[0]}-auth-token`;
        const DEFAULTS = {
            db: DEFAULT_DB_OPTIONS,
            realtime: DEFAULT_REALTIME_OPTIONS,
            auth: Object.assign(Object.assign({}, DEFAULT_AUTH_OPTIONS), { storageKey: defaultStorageKey }),
            global: DEFAULT_GLOBAL_OPTIONS,
        };
        const settings = (0,_lib_helpers__WEBPACK_IMPORTED_MODULE_3__.applySettingDefaults)(options !== null && options !== void 0 ? options : {}, DEFAULTS);
        this.storageKey = (_b = (_a = settings.auth) === null || _a === void 0 ? void 0 : _a.storageKey) !== null && _b !== void 0 ? _b : '';
        this.headers = (_d = (_c = settings.global) === null || _c === void 0 ? void 0 : _c.headers) !== null && _d !== void 0 ? _d : {};
        this.auth = this._initSupabaseAuthClient((_e = settings.auth) !== null && _e !== void 0 ? _e : {}, this.headers, (_f = settings.global) === null || _f === void 0 ? void 0 : _f.fetch);
        this.fetch = (0,_lib_fetch__WEBPACK_IMPORTED_MODULE_4__.fetchWithAuth)(supabaseKey, this._getAccessToken.bind(this), (_g = settings.global) === null || _g === void 0 ? void 0 : _g.fetch);
        this.realtime = this._initRealtimeClient(Object.assign({ headers: this.headers }, settings.realtime));
        this.rest = new _supabase_postgrest_js__WEBPACK_IMPORTED_MODULE_0__.PostgrestClient(`${_supabaseUrl}/rest/v1`, {
            headers: this.headers,
            schema: (_h = settings.db) === null || _h === void 0 ? void 0 : _h.schema,
            fetch: this.fetch,
        });
        this._listenForAuthEvents();
    }
    /**
     * Supabase Functions allows you to deploy and invoke edge functions.
     */
    get functions() {
        return new _supabase_functions_js__WEBPACK_IMPORTED_MODULE_5__.FunctionsClient(this.functionsUrl, {
            headers: this.headers,
            customFetch: this.fetch,
        });
    }
    /**
     * Supabase Storage allows you to manage user-generated content, such as photos or videos.
     */
    get storage() {
        return new _supabase_storage_js__WEBPACK_IMPORTED_MODULE_6__.StorageClient(this.storageUrl, this.headers, this.fetch);
    }
    /**
     * Perform a query on a table or a view.
     *
     * @param relation - The table or view name to query
     */
    from(relation) {
        return this.rest.from(relation);
    }
    /**
     * Perform a function call.
     *
     * @param fn - The function name to call
     * @param args - The arguments to pass to the function call
     * @param options - Named parameters
     * @param options.head - When set to `true`, `data` will not be returned.
     * Useful if you only need the count.
     * @param options.count - Count algorithm to use to count rows returned by the
     * function. Only applicable for [set-returning
     * functions](https://www.postgresql.org/docs/current/functions-srf.html).
     *
     * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
     * hood.
     *
     * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
     * statistics under the hood.
     *
     * `"estimated"`: Uses exact count for low numbers and planned count for high
     * numbers.
     */
    rpc(fn, args = {}, options) {
        return this.rest.rpc(fn, args, options);
    }
    /**
     * Creates a Realtime channel with Broadcast, Presence, and Postgres Changes.
     *
     * @param {string} name - The name of the Realtime channel.
     * @param {Object} opts - The options to pass to the Realtime channel.
     *
     */
    channel(name, opts = { config: {} }) {
        return this.realtime.channel(name, opts);
    }
    /**
     * Returns all Realtime channels.
     */
    getChannels() {
        return this.realtime.getChannels();
    }
    /**
     * Unsubscribes and removes Realtime channel from Realtime client.
     *
     * @param {RealtimeChannel} channel - The name of the Realtime channel.
     *
     */
    removeChannel(channel) {
        return this.realtime.removeChannel(channel);
    }
    /**
     * Unsubscribes and removes all Realtime channels from Realtime client.
     */
    removeAllChannels() {
        return this.realtime.removeAllChannels();
    }
    _getAccessToken() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this.auth.getSession();
            return (_b = (_a = data.session) === null || _a === void 0 ? void 0 : _a.access_token) !== null && _b !== void 0 ? _b : null;
        });
    }
    _initSupabaseAuthClient({ autoRefreshToken, persistSession, detectSessionInUrl, storage, storageKey, flowType, }, headers, fetch) {
        const authHeaders = {
            Authorization: `Bearer ${this.supabaseKey}`,
            apikey: `${this.supabaseKey}`,
        };
        return new _lib_SupabaseAuthClient__WEBPACK_IMPORTED_MODULE_7__.SupabaseAuthClient({
            url: this.authUrl,
            headers: Object.assign(Object.assign({}, authHeaders), headers),
            storageKey: storageKey,
            autoRefreshToken,
            persistSession,
            detectSessionInUrl,
            storage,
            flowType,
            fetch,
        });
    }
    _initRealtimeClient(options) {
        return new _supabase_realtime_js__WEBPACK_IMPORTED_MODULE_1__.RealtimeClient(this.realtimeUrl, Object.assign(Object.assign({}, options), { params: Object.assign({ apikey: this.supabaseKey }, options === null || options === void 0 ? void 0 : options.params) }));
    }
    _listenForAuthEvents() {
        let data = this.auth.onAuthStateChange((event, session) => {
            this._handleTokenChanged(event, session === null || session === void 0 ? void 0 : session.access_token, 'CLIENT');
        });
        return data;
    }
    _handleTokenChanged(event, token, source) {
        if ((event === 'TOKEN_REFRESHED' || event === 'SIGNED_IN') &&
            this.changedAccessToken !== token) {
            // Token has changed
            this.realtime.setAuth(token !== null && token !== void 0 ? token : null);
            this.changedAccessToken = token;
        }
        else if (event === 'SIGNED_OUT') {
            // Token is removed
            this.realtime.setAuth(this.supabaseKey);
            if (source == 'STORAGE')
                this.auth.signOut();
            this.changedAccessToken = undefined;
        }
    }
}
//# sourceMappingURL=SupabaseClient.js.map

/***/ }),

/***/ "./node_modules/@supabase/supabase-js/dist/module/index.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@supabase/supabase-js/dist/module/index.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AuthApiError: () => (/* reexport safe */ _supabase_gotrue_js__WEBPACK_IMPORTED_MODULE_0__.AuthApiError),
/* harmony export */   AuthError: () => (/* reexport safe */ _supabase_gotrue_js__WEBPACK_IMPORTED_MODULE_0__.AuthError),
/* harmony export */   AuthImplicitGrantRedirectError: () => (/* reexport safe */ _supabase_gotrue_js__WEBPACK_IMPORTED_MODULE_0__.AuthImplicitGrantRedirectError),
/* harmony export */   AuthInvalidCredentialsError: () => (/* reexport safe */ _supabase_gotrue_js__WEBPACK_IMPORTED_MODULE_0__.AuthInvalidCredentialsError),
/* harmony export */   AuthPKCEGrantCodeExchangeError: () => (/* reexport safe */ _supabase_gotrue_js__WEBPACK_IMPORTED_MODULE_0__.AuthPKCEGrantCodeExchangeError),
/* harmony export */   AuthRetryableFetchError: () => (/* reexport safe */ _supabase_gotrue_js__WEBPACK_IMPORTED_MODULE_0__.AuthRetryableFetchError),
/* harmony export */   AuthSessionMissingError: () => (/* reexport safe */ _supabase_gotrue_js__WEBPACK_IMPORTED_MODULE_0__.AuthSessionMissingError),
/* harmony export */   AuthUnknownError: () => (/* reexport safe */ _supabase_gotrue_js__WEBPACK_IMPORTED_MODULE_0__.AuthUnknownError),
/* harmony export */   CustomAuthError: () => (/* reexport safe */ _supabase_gotrue_js__WEBPACK_IMPORTED_MODULE_0__.CustomAuthError),
/* harmony export */   FunctionsError: () => (/* reexport safe */ _supabase_functions_js__WEBPACK_IMPORTED_MODULE_1__.FunctionsError),
/* harmony export */   FunctionsFetchError: () => (/* reexport safe */ _supabase_functions_js__WEBPACK_IMPORTED_MODULE_1__.FunctionsFetchError),
/* harmony export */   FunctionsHttpError: () => (/* reexport safe */ _supabase_functions_js__WEBPACK_IMPORTED_MODULE_1__.FunctionsHttpError),
/* harmony export */   FunctionsRelayError: () => (/* reexport safe */ _supabase_functions_js__WEBPACK_IMPORTED_MODULE_1__.FunctionsRelayError),
/* harmony export */   GoTrueAdminApi: () => (/* reexport safe */ _supabase_gotrue_js__WEBPACK_IMPORTED_MODULE_0__.GoTrueAdminApi),
/* harmony export */   GoTrueClient: () => (/* reexport safe */ _supabase_gotrue_js__WEBPACK_IMPORTED_MODULE_0__.GoTrueClient),
/* harmony export */   REALTIME_LISTEN_TYPES: () => (/* reexport safe */ _supabase_realtime_js__WEBPACK_IMPORTED_MODULE_2__.REALTIME_LISTEN_TYPES),
/* harmony export */   REALTIME_POSTGRES_CHANGES_LISTEN_EVENT: () => (/* reexport safe */ _supabase_realtime_js__WEBPACK_IMPORTED_MODULE_2__.REALTIME_POSTGRES_CHANGES_LISTEN_EVENT),
/* harmony export */   REALTIME_PRESENCE_LISTEN_EVENTS: () => (/* reexport safe */ _supabase_realtime_js__WEBPACK_IMPORTED_MODULE_2__.REALTIME_PRESENCE_LISTEN_EVENTS),
/* harmony export */   REALTIME_SUBSCRIBE_STATES: () => (/* reexport safe */ _supabase_realtime_js__WEBPACK_IMPORTED_MODULE_2__.REALTIME_SUBSCRIBE_STATES),
/* harmony export */   RealtimeChannel: () => (/* reexport safe */ _supabase_realtime_js__WEBPACK_IMPORTED_MODULE_2__.RealtimeChannel),
/* harmony export */   RealtimeClient: () => (/* reexport safe */ _supabase_realtime_js__WEBPACK_IMPORTED_MODULE_2__.RealtimeClient),
/* harmony export */   RealtimePresence: () => (/* reexport safe */ _supabase_realtime_js__WEBPACK_IMPORTED_MODULE_2__.RealtimePresence),
/* harmony export */   SupabaseClient: () => (/* reexport safe */ _SupabaseClient__WEBPACK_IMPORTED_MODULE_3__["default"]),
/* harmony export */   createClient: () => (/* binding */ createClient),
/* harmony export */   isAuthApiError: () => (/* reexport safe */ _supabase_gotrue_js__WEBPACK_IMPORTED_MODULE_0__.isAuthApiError),
/* harmony export */   isAuthError: () => (/* reexport safe */ _supabase_gotrue_js__WEBPACK_IMPORTED_MODULE_0__.isAuthError)
/* harmony export */ });
/* harmony import */ var _SupabaseClient__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SupabaseClient */ "./node_modules/@supabase/supabase-js/dist/module/SupabaseClient.js");
/* harmony import */ var _supabase_gotrue_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @supabase/gotrue-js */ "./node_modules/@supabase/gotrue-js/dist/module/index.js");
/* harmony import */ var _supabase_functions_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @supabase/functions-js */ "./node_modules/@supabase/functions-js/dist/module/types.js");
/* harmony import */ var _supabase_realtime_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @supabase/realtime-js */ "./node_modules/@supabase/realtime-js/dist/module/index.js");





/**
 * Creates a new Supabase Client.
 */
const createClient = (supabaseUrl, supabaseKey, options) => {
    return new _SupabaseClient__WEBPACK_IMPORTED_MODULE_3__["default"](supabaseUrl, supabaseKey, options);
};
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@supabase/supabase-js/dist/module/lib/SupabaseAuthClient.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/@supabase/supabase-js/dist/module/lib/SupabaseAuthClient.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SupabaseAuthClient: () => (/* binding */ SupabaseAuthClient)
/* harmony export */ });
/* harmony import */ var _supabase_gotrue_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @supabase/gotrue-js */ "./node_modules/@supabase/gotrue-js/dist/module/index.js");

class SupabaseAuthClient extends _supabase_gotrue_js__WEBPACK_IMPORTED_MODULE_0__.GoTrueClient {
    constructor(options) {
        super(options);
    }
}
//# sourceMappingURL=SupabaseAuthClient.js.map

/***/ }),

/***/ "./node_modules/@supabase/supabase-js/dist/module/lib/constants.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@supabase/supabase-js/dist/module/lib/constants.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DEFAULT_HEADERS: () => (/* binding */ DEFAULT_HEADERS)
/* harmony export */ });
/* harmony import */ var _version__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./version */ "./node_modules/@supabase/supabase-js/dist/module/lib/version.js");
// constants.ts

const DEFAULT_HEADERS = { 'X-Client-Info': `supabase-js/${_version__WEBPACK_IMPORTED_MODULE_0__.version}` };
//# sourceMappingURL=constants.js.map

/***/ }),

/***/ "./node_modules/@supabase/supabase-js/dist/module/lib/fetch.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@supabase/supabase-js/dist/module/lib/fetch.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fetchWithAuth: () => (/* binding */ fetchWithAuth),
/* harmony export */   resolveFetch: () => (/* binding */ resolveFetch),
/* harmony export */   resolveHeadersConstructor: () => (/* binding */ resolveHeadersConstructor)
/* harmony export */ });
/* harmony import */ var cross_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cross-fetch */ "./node_modules/cross-fetch/dist/browser-ponyfill.js");
/* harmony import */ var cross_fetch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(cross_fetch__WEBPACK_IMPORTED_MODULE_0__);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

const resolveFetch = (customFetch) => {
    let _fetch;
    if (customFetch) {
        _fetch = customFetch;
    }
    else if (typeof fetch === 'undefined') {
        _fetch = (cross_fetch__WEBPACK_IMPORTED_MODULE_0___default());
    }
    else {
        _fetch = fetch;
    }
    return (...args) => _fetch(...args);
};
const resolveHeadersConstructor = () => {
    if (typeof Headers === 'undefined') {
        return cross_fetch__WEBPACK_IMPORTED_MODULE_0__.Headers;
    }
    return Headers;
};
const fetchWithAuth = (supabaseKey, getAccessToken, customFetch) => {
    const fetch = resolveFetch(customFetch);
    const HeadersConstructor = resolveHeadersConstructor();
    return (input, init) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const accessToken = (_a = (yield getAccessToken())) !== null && _a !== void 0 ? _a : supabaseKey;
        let headers = new HeadersConstructor(init === null || init === void 0 ? void 0 : init.headers);
        if (!headers.has('apikey')) {
            headers.set('apikey', supabaseKey);
        }
        if (!headers.has('Authorization')) {
            headers.set('Authorization', `Bearer ${accessToken}`);
        }
        return fetch(input, Object.assign(Object.assign({}, init), { headers }));
    });
};
//# sourceMappingURL=fetch.js.map

/***/ }),

/***/ "./node_modules/@supabase/supabase-js/dist/module/lib/helpers.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@supabase/supabase-js/dist/module/lib/helpers.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   applySettingDefaults: () => (/* binding */ applySettingDefaults),
/* harmony export */   isBrowser: () => (/* binding */ isBrowser),
/* harmony export */   stripTrailingSlash: () => (/* binding */ stripTrailingSlash),
/* harmony export */   uuid: () => (/* binding */ uuid)
/* harmony export */ });
function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0, v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}
function stripTrailingSlash(url) {
    return url.replace(/\/$/, '');
}
const isBrowser = () => typeof window !== 'undefined';
function applySettingDefaults(options, defaults) {
    const { db: dbOptions, auth: authOptions, realtime: realtimeOptions, global: globalOptions, } = options;
    const { db: DEFAULT_DB_OPTIONS, auth: DEFAULT_AUTH_OPTIONS, realtime: DEFAULT_REALTIME_OPTIONS, global: DEFAULT_GLOBAL_OPTIONS, } = defaults;
    return {
        db: Object.assign(Object.assign({}, DEFAULT_DB_OPTIONS), dbOptions),
        auth: Object.assign(Object.assign({}, DEFAULT_AUTH_OPTIONS), authOptions),
        realtime: Object.assign(Object.assign({}, DEFAULT_REALTIME_OPTIONS), realtimeOptions),
        global: Object.assign(Object.assign({}, DEFAULT_GLOBAL_OPTIONS), globalOptions),
    };
}
//# sourceMappingURL=helpers.js.map

/***/ }),

/***/ "./node_modules/@supabase/supabase-js/dist/module/lib/version.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@supabase/supabase-js/dist/module/lib/version.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   version: () => (/* binding */ version)
/* harmony export */ });
const version = '2.24.0';
//# sourceMappingURL=version.js.map

/***/ }),

/***/ "./node_modules/cross-fetch/dist/browser-ponyfill.js":
/*!***********************************************************!*\
  !*** ./node_modules/cross-fetch/dist/browser-ponyfill.js ***!
  \***********************************************************/
/***/ (function(module, exports) {

var global = typeof self !== 'undefined' ? self : this;
var __self__ = (function () {
function F() {
this.fetch = false;
this.DOMException = global.DOMException
}
F.prototype = global;
return new F();
})();
(function(self) {

var irrelevant = (function (exports) {

  var support = {
    searchParams: 'URLSearchParams' in self,
    iterable: 'Symbol' in self && 'iterator' in Symbol,
    blob:
      'FileReader' in self &&
      'Blob' in self &&
      (function() {
        try {
          new Blob();
          return true
        } catch (e) {
          return false
        }
      })(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  };

  function isDataView(obj) {
    return obj && DataView.prototype.isPrototypeOf(obj)
  }

  if (support.arrayBuffer) {
    var viewClasses = [
      '[object Int8Array]',
      '[object Uint8Array]',
      '[object Uint8ClampedArray]',
      '[object Int16Array]',
      '[object Uint16Array]',
      '[object Int32Array]',
      '[object Uint32Array]',
      '[object Float32Array]',
      '[object Float64Array]'
    ];

    var isArrayBufferView =
      ArrayBuffer.isView ||
      function(obj) {
        return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
      };
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name);
    }
    if (/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name')
    }
    return name.toLowerCase()
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value);
    }
    return value
  }

  // Build a destructive iterator for the value list
  function iteratorFor(items) {
    var iterator = {
      next: function() {
        var value = items.shift();
        return {done: value === undefined, value: value}
      }
    };

    if (support.iterable) {
      iterator[Symbol.iterator] = function() {
        return iterator
      };
    }

    return iterator
  }

  function Headers(headers) {
    this.map = {};

    if (headers instanceof Headers) {
      headers.forEach(function(value, name) {
        this.append(name, value);
      }, this);
    } else if (Array.isArray(headers)) {
      headers.forEach(function(header) {
        this.append(header[0], header[1]);
      }, this);
    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function(name) {
        this.append(name, headers[name]);
      }, this);
    }
  }

  Headers.prototype.append = function(name, value) {
    name = normalizeName(name);
    value = normalizeValue(value);
    var oldValue = this.map[name];
    this.map[name] = oldValue ? oldValue + ', ' + value : value;
  };

  Headers.prototype['delete'] = function(name) {
    delete this.map[normalizeName(name)];
  };

  Headers.prototype.get = function(name) {
    name = normalizeName(name);
    return this.has(name) ? this.map[name] : null
  };

  Headers.prototype.has = function(name) {
    return this.map.hasOwnProperty(normalizeName(name))
  };

  Headers.prototype.set = function(name, value) {
    this.map[normalizeName(name)] = normalizeValue(value);
  };

  Headers.prototype.forEach = function(callback, thisArg) {
    for (var name in this.map) {
      if (this.map.hasOwnProperty(name)) {
        callback.call(thisArg, this.map[name], name, this);
      }
    }
  };

  Headers.prototype.keys = function() {
    var items = [];
    this.forEach(function(value, name) {
      items.push(name);
    });
    return iteratorFor(items)
  };

  Headers.prototype.values = function() {
    var items = [];
    this.forEach(function(value) {
      items.push(value);
    });
    return iteratorFor(items)
  };

  Headers.prototype.entries = function() {
    var items = [];
    this.forEach(function(value, name) {
      items.push([name, value]);
    });
    return iteratorFor(items)
  };

  if (support.iterable) {
    Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
  }

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'))
    }
    body.bodyUsed = true;
  }

  function fileReaderReady(reader) {
    return new Promise(function(resolve, reject) {
      reader.onload = function() {
        resolve(reader.result);
      };
      reader.onerror = function() {
        reject(reader.error);
      };
    })
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader();
    var promise = fileReaderReady(reader);
    reader.readAsArrayBuffer(blob);
    return promise
  }

  function readBlobAsText(blob) {
    var reader = new FileReader();
    var promise = fileReaderReady(reader);
    reader.readAsText(blob);
    return promise
  }

  function readArrayBufferAsText(buf) {
    var view = new Uint8Array(buf);
    var chars = new Array(view.length);

    for (var i = 0; i < view.length; i++) {
      chars[i] = String.fromCharCode(view[i]);
    }
    return chars.join('')
  }

  function bufferClone(buf) {
    if (buf.slice) {
      return buf.slice(0)
    } else {
      var view = new Uint8Array(buf.byteLength);
      view.set(new Uint8Array(buf));
      return view.buffer
    }
  }

  function Body() {
    this.bodyUsed = false;

    this._initBody = function(body) {
      this._bodyInit = body;
      if (!body) {
        this._bodyText = '';
      } else if (typeof body === 'string') {
        this._bodyText = body;
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body;
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body;
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString();
      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
        this._bodyArrayBuffer = bufferClone(body.buffer);
        // IE 10-11 can't handle a DataView body.
        this._bodyInit = new Blob([this._bodyArrayBuffer]);
      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
        this._bodyArrayBuffer = bufferClone(body);
      } else {
        this._bodyText = body = Object.prototype.toString.call(body);
      }

      if (!this.headers.get('content-type')) {
        if (typeof body === 'string') {
          this.headers.set('content-type', 'text/plain;charset=UTF-8');
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set('content-type', this._bodyBlob.type);
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
        }
      }
    };

    if (support.blob) {
      this.blob = function() {
        var rejected = consumed(this);
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob)
        } else if (this._bodyArrayBuffer) {
          return Promise.resolve(new Blob([this._bodyArrayBuffer]))
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob')
        } else {
          return Promise.resolve(new Blob([this._bodyText]))
        }
      };

      this.arrayBuffer = function() {
        if (this._bodyArrayBuffer) {
          return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
        } else {
          return this.blob().then(readBlobAsArrayBuffer)
        }
      };
    }

    this.text = function() {
      var rejected = consumed(this);
      if (rejected) {
        return rejected
      }

      if (this._bodyBlob) {
        return readBlobAsText(this._bodyBlob)
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as text')
      } else {
        return Promise.resolve(this._bodyText)
      }
    };

    if (support.formData) {
      this.formData = function() {
        return this.text().then(decode)
      };
    }

    this.json = function() {
      return this.text().then(JSON.parse)
    };

    return this
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];

  function normalizeMethod(method) {
    var upcased = method.toUpperCase();
    return methods.indexOf(upcased) > -1 ? upcased : method
  }

  function Request(input, options) {
    options = options || {};
    var body = options.body;

    if (input instanceof Request) {
      if (input.bodyUsed) {
        throw new TypeError('Already read')
      }
      this.url = input.url;
      this.credentials = input.credentials;
      if (!options.headers) {
        this.headers = new Headers(input.headers);
      }
      this.method = input.method;
      this.mode = input.mode;
      this.signal = input.signal;
      if (!body && input._bodyInit != null) {
        body = input._bodyInit;
        input.bodyUsed = true;
      }
    } else {
      this.url = String(input);
    }

    this.credentials = options.credentials || this.credentials || 'same-origin';
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers);
    }
    this.method = normalizeMethod(options.method || this.method || 'GET');
    this.mode = options.mode || this.mode || null;
    this.signal = options.signal || this.signal;
    this.referrer = null;

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests')
    }
    this._initBody(body);
  }

  Request.prototype.clone = function() {
    return new Request(this, {body: this._bodyInit})
  };

  function decode(body) {
    var form = new FormData();
    body
      .trim()
      .split('&')
      .forEach(function(bytes) {
        if (bytes) {
          var split = bytes.split('=');
          var name = split.shift().replace(/\+/g, ' ');
          var value = split.join('=').replace(/\+/g, ' ');
          form.append(decodeURIComponent(name), decodeURIComponent(value));
        }
      });
    return form
  }

  function parseHeaders(rawHeaders) {
    var headers = new Headers();
    // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
    // https://tools.ietf.org/html/rfc7230#section-3.2
    var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, ' ');
    preProcessedHeaders.split(/\r?\n/).forEach(function(line) {
      var parts = line.split(':');
      var key = parts.shift().trim();
      if (key) {
        var value = parts.join(':').trim();
        headers.append(key, value);
      }
    });
    return headers
  }

  Body.call(Request.prototype);

  function Response(bodyInit, options) {
    if (!options) {
      options = {};
    }

    this.type = 'default';
    this.status = options.status === undefined ? 200 : options.status;
    this.ok = this.status >= 200 && this.status < 300;
    this.statusText = 'statusText' in options ? options.statusText : 'OK';
    this.headers = new Headers(options.headers);
    this.url = options.url || '';
    this._initBody(bodyInit);
  }

  Body.call(Response.prototype);

  Response.prototype.clone = function() {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    })
  };

  Response.error = function() {
    var response = new Response(null, {status: 0, statusText: ''});
    response.type = 'error';
    return response
  };

  var redirectStatuses = [301, 302, 303, 307, 308];

  Response.redirect = function(url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code')
    }

    return new Response(null, {status: status, headers: {location: url}})
  };

  exports.DOMException = self.DOMException;
  try {
    new exports.DOMException();
  } catch (err) {
    exports.DOMException = function(message, name) {
      this.message = message;
      this.name = name;
      var error = Error(message);
      this.stack = error.stack;
    };
    exports.DOMException.prototype = Object.create(Error.prototype);
    exports.DOMException.prototype.constructor = exports.DOMException;
  }

  function fetch(input, init) {
    return new Promise(function(resolve, reject) {
      var request = new Request(input, init);

      if (request.signal && request.signal.aborted) {
        return reject(new exports.DOMException('Aborted', 'AbortError'))
      }

      var xhr = new XMLHttpRequest();

      function abortXhr() {
        xhr.abort();
      }

      xhr.onload = function() {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
        };
        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL');
        var body = 'response' in xhr ? xhr.response : xhr.responseText;
        resolve(new Response(body, options));
      };

      xhr.onerror = function() {
        reject(new TypeError('Network request failed'));
      };

      xhr.ontimeout = function() {
        reject(new TypeError('Network request failed'));
      };

      xhr.onabort = function() {
        reject(new exports.DOMException('Aborted', 'AbortError'));
      };

      xhr.open(request.method, request.url, true);

      if (request.credentials === 'include') {
        xhr.withCredentials = true;
      } else if (request.credentials === 'omit') {
        xhr.withCredentials = false;
      }

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob';
      }

      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value);
      });

      if (request.signal) {
        request.signal.addEventListener('abort', abortXhr);

        xhr.onreadystatechange = function() {
          // DONE (success or failure)
          if (xhr.readyState === 4) {
            request.signal.removeEventListener('abort', abortXhr);
          }
        };
      }

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
    })
  }

  fetch.polyfill = true;

  if (!self.fetch) {
    self.fetch = fetch;
    self.Headers = Headers;
    self.Request = Request;
    self.Response = Response;
  }

  exports.Headers = Headers;
  exports.Request = Request;
  exports.Response = Response;
  exports.fetch = fetch;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({});
})(__self__);
__self__.fetch.ponyfill = true;
// Remove "polyfill" property added by whatwg-fetch
delete __self__.fetch.polyfill;
// Choose between native implementation (global) or custom implementation (__self__)
// var ctx = global.fetch ? global : __self__;
var ctx = __self__; // this line disable service worker support temporarily
exports = ctx.fetch // To enable: import fetch from 'cross-fetch'
exports["default"] = ctx.fetch // For TypeScript consumers without esModuleInterop.
exports.fetch = ctx.fetch // To enable: import {fetch} from 'cross-fetch'
exports.Headers = ctx.Headers
exports.Request = ctx.Request
exports.Response = ctx.Response
module.exports = exports


/***/ }),

/***/ "./node_modules/es5-ext/global.js":
/*!****************************************!*\
  !*** ./node_modules/es5-ext/global.js ***!
  \****************************************/
/***/ ((module) => {

var naiveFallback = function () {
	if (typeof self === "object" && self) return self;
	if (typeof window === "object" && window) return window;
	throw new Error("Unable to resolve global `this`");
};

module.exports = (function () {
	if (this) return this;

	// Unexpected strict mode (may happen if e.g. bundled into ESM module)

	// Fallback to standard globalThis if available
	if (typeof globalThis === "object" && globalThis) return globalThis;

	// Thanks @mathiasbynens -> https://mathiasbynens.be/notes/globalthis
	// In all ES5+ engines global object inherits from Object.prototype
	// (if you approached one that doesn't please report)
	try {
		Object.defineProperty(Object.prototype, "__global__", {
			get: function () { return this; },
			configurable: true
		});
	} catch (error) {
		// Unfortunate case of updates to Object.prototype being restricted
		// via preventExtensions, seal or freeze
		return naiveFallback();
	}
	try {
		// Safari case (window.__global__ works, but __global__ does not)
		if (!__global__) return naiveFallback();
		return __global__;
	} finally {
		delete Object.prototype.__global__;
	}
})();


/***/ }),

/***/ "./node_modules/websocket/lib/browser.js":
/*!***********************************************!*\
  !*** ./node_modules/websocket/lib/browser.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _globalThis;
if (typeof globalThis === 'object') {
	_globalThis = globalThis;
} else {
	try {
		_globalThis = __webpack_require__(/*! es5-ext/global */ "./node_modules/es5-ext/global.js");
	} catch (error) {
	} finally {
		if (!_globalThis && typeof window !== 'undefined') { _globalThis = window; }
		if (!_globalThis) { throw new Error('Could not determine global this'); }
	}
}

var NativeWebSocket = _globalThis.WebSocket || _globalThis.MozWebSocket;
var websocket_version = __webpack_require__(/*! ./version */ "./node_modules/websocket/lib/version.js");


/**
 * Expose a W3C WebSocket class with just one or two arguments.
 */
function W3CWebSocket(uri, protocols) {
	var native_instance;

	if (protocols) {
		native_instance = new NativeWebSocket(uri, protocols);
	}
	else {
		native_instance = new NativeWebSocket(uri);
	}

	/**
	 * 'native_instance' is an instance of nativeWebSocket (the browser's WebSocket
	 * class). Since it is an Object it will be returned as it is when creating an
	 * instance of W3CWebSocket via 'new W3CWebSocket()'.
	 *
	 * ECMAScript 5: http://bclary.com/2004/11/07/#a-13.2.2
	 */
	return native_instance;
}
if (NativeWebSocket) {
	['CONNECTING', 'OPEN', 'CLOSING', 'CLOSED'].forEach(function(prop) {
		Object.defineProperty(W3CWebSocket, prop, {
			get: function() { return NativeWebSocket[prop]; }
		});
	});
}

/**
 * Module exports.
 */
module.exports = {
    'w3cwebsocket' : NativeWebSocket ? W3CWebSocket : null,
    'version'      : websocket_version
};


/***/ }),

/***/ "./node_modules/websocket/lib/version.js":
/*!***********************************************!*\
  !*** ./node_modules/websocket/lib/version.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(/*! ../package.json */ "./node_modules/websocket/package.json").version;


/***/ }),

/***/ "./node_modules/websocket/package.json":
/*!*********************************************!*\
  !*** ./node_modules/websocket/package.json ***!
  \*********************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"websocket","description":"Websocket Client & Server Library implementing the WebSocket protocol as specified in RFC 6455.","keywords":["websocket","websockets","socket","networking","comet","push","RFC-6455","realtime","server","client"],"author":"Brian McKelvey <theturtle32@gmail.com> (https://github.com/theturtle32)","contributors":["Iñaki Baz Castillo <ibc@aliax.net> (http://dev.sipdoc.net)"],"version":"1.0.34","repository":{"type":"git","url":"https://github.com/theturtle32/WebSocket-Node.git"},"homepage":"https://github.com/theturtle32/WebSocket-Node","engines":{"node":">=4.0.0"},"dependencies":{"bufferutil":"^4.0.1","debug":"^2.2.0","es5-ext":"^0.10.50","typedarray-to-buffer":"^3.1.5","utf-8-validate":"^5.0.2","yaeti":"^0.0.6"},"devDependencies":{"buffer-equal":"^1.0.0","gulp":"^4.0.2","gulp-jshint":"^2.0.4","jshint-stylish":"^2.2.1","jshint":"^2.0.0","tape":"^4.9.1"},"config":{"verbose":false},"scripts":{"test":"tape test/unit/*.js","gulp":"gulp"},"main":"index","directories":{"lib":"./lib"},"browser":"lib/browser.js","license":"Apache-2.0"}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/create fake namespace object */
/******/ 	(() => {
/******/ 		var getProto = Object.getPrototypeOf ? (obj) => (Object.getPrototypeOf(obj)) : (obj) => (obj.__proto__);
/******/ 		var leafPrototypes;
/******/ 		// create a fake namespace object
/******/ 		// mode & 1: value is a module id, require it
/******/ 		// mode & 2: merge all properties of value into the ns
/******/ 		// mode & 4: return value when already ns object
/******/ 		// mode & 16: return value when it's Promise-like
/******/ 		// mode & 8|1: behave like require
/******/ 		__webpack_require__.t = function(value, mode) {
/******/ 			if(mode & 1) value = this(value);
/******/ 			if(mode & 8) return value;
/******/ 			if(typeof value === 'object' && value) {
/******/ 				if((mode & 4) && value.__esModule) return value;
/******/ 				if((mode & 16) && typeof value.then === 'function') return value;
/******/ 			}
/******/ 			var ns = Object.create(null);
/******/ 			__webpack_require__.r(ns);
/******/ 			var def = {};
/******/ 			leafPrototypes = leafPrototypes || [null, getProto({}), getProto([]), getProto(getProto)];
/******/ 			for(var current = mode & 2 && value; typeof current == 'object' && !~leafPrototypes.indexOf(current); current = getProto(current)) {
/******/ 				Object.getOwnPropertyNames(current).forEach((key) => (def[key] = () => (value[key])));
/******/ 			}
/******/ 			def['default'] = () => (value);
/******/ 			__webpack_require__.d(ns, def);
/******/ 			return ns;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!****************************************************************************!*\
  !*** ./src/Presenter/AuthenticationPresenter/UserRegistrationPresenter.js ***!
  \****************************************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @supabase/supabase-js */ "./node_modules/@supabase/supabase-js/dist/module/index.js");
//connect to Database


const supabaseUrl = 'https://ewwkqzzfvrbtdxxokiwq.supabase.co'
const supabaseKey = process.env.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3d2txenpmdnJidGR4eG9raXdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODU0MDUxODIsImV4cCI6MjAwMDk4MTE4Mn0.asTnokwBRRWWPCtOOgA-r5AOwQCHKdcH7NbR6Kv5dPs;
const supabase = (0,_supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__.createClient)(supabaseUrl, supabaseKey);


//redirect from Login to Signup page
const loginLink = document.getElementById("loginLink");
loginLink.addEventListener("click", handleLogin);
function handleLogin() {
  window.location.href = 'auth.html';
}

//user data input validation
const form = document.querySelector("form");
form.addEventListener('submit', function(e) {
    e.preventDefault();
  
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirmPassword').value;
  
    // Verifica la lunghezza della password
    if (password.length < 8) {
      alert('La password deve essere di almeno otto caratteri.');
      return;
    }
  
    // Verifica la presenza di una lettera maiuscola
    if (!/[A-Z]/.test(password)) {
      alert('La password deve contenere almeno una lettera maiuscola.');
      return;
    }
  
    // Verifica la presenza di almeno un carattere speciale
    if (!/[!@#$%^&*]/.test(password)) {
      alert('La password deve contenere almeno un carattere speciale (!, @, #, $, %, ^, &, *).');
      return;
    }
  
    // Verifica la presenza di almeno una cifra
    if (!/\d/.test(password)) {
      alert('La password deve contenere almeno un a cifra.');
      return;
    }
  
    // Verifica che le password corrispondano
    if (password === confirmPassword) {
        signUp();
      // Puoi aggiungere qui il codice per inviare i dati del modulo al server
    } else {
      alert('Le password non corrispondono. Riprova.');
    }
  });
  

//supabase signup
const signUp = async () => {
    var password = document.getElementById('password').value;
    var email = document.getElementById('email').value;
    var name =document.getElementById('firstName').value;;
    var surname =document.getElementById('lastName').value;;
    var username =document.getElementById('username').value;;
    


    try {
        const { error } = await supabase.auth.signUp(
            {
                email: email,
                password: password,
            },
            {
                data: {
                    first_name : name,
                    last_name : surname,
                    username: username,
                }
            }
        );

        if (error) throw error;
    } catch (e) {
        console.log(e.message);
    }
};

  
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0cmF0aW9uUHJlc2VudGVyLmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaUJBQWlCLFNBQUksSUFBSSxTQUFJO0FBQzdCLDRCQUE0QiwrREFBK0QsaUJBQWlCO0FBQzVHO0FBQ0Esb0NBQW9DLE1BQU0sK0JBQStCLFlBQVk7QUFDckYsbUNBQW1DLE1BQU0sbUNBQW1DLFlBQVk7QUFDeEYsZ0NBQWdDO0FBQ2hDO0FBQ0EsS0FBSztBQUNMO0FBQ3dDO0FBQ2dEO0FBQ2pGO0FBQ1AsdUJBQXVCLFlBQVksaUJBQWlCLElBQUk7QUFDeEQ7QUFDQTtBQUNBLHFCQUFxQixxREFBWTtBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQ0FBK0MsTUFBTTtBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUM7QUFDckM7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHNDQUFzQztBQUM5RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxREFBcUQsU0FBUyxHQUFHLGFBQWE7QUFDOUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlFQUF5RTtBQUN6RTtBQUNBLGlCQUFpQjtBQUNqQiw4QkFBOEIsdURBQW1CO0FBQ2pELGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsOEJBQThCLHVEQUFtQjtBQUNqRDtBQUNBO0FBQ0EsOEJBQThCLHNEQUFrQjtBQUNoRDtBQUNBLHVJQUF1STtBQUN2STtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUN0R0EsaUJBQWlCLFNBQUksSUFBSSxTQUFJO0FBQzdCLDRCQUE0QiwrREFBK0QsaUJBQWlCO0FBQzVHO0FBQ0Esb0NBQW9DLE1BQU0sK0JBQStCLFlBQVk7QUFDckYsbUNBQW1DLE1BQU0sbUNBQW1DLFlBQVk7QUFDeEYsZ0NBQWdDO0FBQ2hDO0FBQ0EsS0FBSztBQUNMO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0VBQStFLG9CQUFvQixvS0FBcUIsbUJBQW1CO0FBQzNJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0Qk87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdEJBLGlCQUFpQixTQUFJLElBQUksU0FBSTtBQUM3Qiw0QkFBNEIsK0RBQStELGlCQUFpQjtBQUM1RztBQUNBLG9DQUFvQyxNQUFNLCtCQUErQixZQUFZO0FBQ3JGLG1DQUFtQyxNQUFNLG1DQUFtQyxZQUFZO0FBQ3hGLGdDQUFnQztBQUNoQztBQUNBLEtBQUs7QUFDTDtBQUNBLGNBQWMsU0FBSSxJQUFJLFNBQUk7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2REFBNkQsY0FBYztBQUMzRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ3NHO0FBQ3pEO0FBQ0Y7QUFDNUI7QUFDZixrQkFBa0Isc0JBQXNCLFVBQVU7QUFDbEQ7QUFDQTtBQUNBLHFCQUFxQiwwREFBWTtBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0Isb0RBQVEsd0JBQXdCLFNBQVM7QUFDL0Q7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0Esb0JBQW9CLHdEQUFXO0FBQy9CLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXlDO0FBQ3pDO0FBQ0E7QUFDQSw2QkFBNkIsb0RBQVEsd0JBQXdCLFNBQVM7QUFDdEUsNEJBQTRCLDJCQUEyQjtBQUN2RDtBQUNBO0FBQ0EsMkJBQTJCLHFEQUFhO0FBQ3hDLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0Esb0JBQW9CLHdEQUFXO0FBQy9CLDZCQUE2QixRQUFRLFlBQVk7QUFDakQ7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsVUFBVTtBQUNsQywyREFBMkQ7QUFDM0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QixvREFBUSx3QkFBd0IsU0FBUztBQUN0RTtBQUNBO0FBQ0EsMkJBQTJCLDZEQUFxQjtBQUNoRDtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0Esb0JBQW9CLHdEQUFXO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLG9EQUFRLHdCQUF3QixTQUFTO0FBQ3RFO0FBQ0E7QUFDQSwyQkFBMkIscURBQWE7QUFDeEMsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxvQkFBb0Isd0RBQVc7QUFDL0IsNkJBQTZCLFFBQVEsWUFBWTtBQUNqRDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQztBQUNyQyx1Q0FBdUMsb0RBQVEsdUJBQXVCLFNBQVM7QUFDL0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQiwyQkFBMkIsOERBQXNCO0FBQ2pELGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJEQUEyRDtBQUMzRCw0REFBNEQ7QUFDNUQsc0NBQXNDLElBQUk7QUFDMUMscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSx5QkFBeUIsb0NBQW9DO0FBQzdEO0FBQ0E7QUFDQSxvQkFBb0Isd0RBQVc7QUFDL0IsNkJBQTZCLFFBQVEsV0FBVztBQUNoRDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QixvREFBUSx1QkFBdUIsU0FBUyxlQUFlLElBQUk7QUFDeEY7QUFDQSwyQkFBMkIscURBQWE7QUFDeEMsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxvQkFBb0Isd0RBQVc7QUFDL0IsNkJBQTZCLFFBQVEsWUFBWTtBQUNqRDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QixvREFBUSx1QkFBdUIsU0FBUyxlQUFlLElBQUk7QUFDeEY7QUFDQTtBQUNBLDJCQUEyQixxREFBYTtBQUN4QyxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLG9CQUFvQix3REFBVztBQUMvQiw2QkFBNkIsUUFBUSxZQUFZO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QixvREFBUSwwQkFBMEIsU0FBUyxlQUFlLEdBQUc7QUFDMUY7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCLDJCQUEyQixxREFBYTtBQUN4QyxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLG9CQUFvQix3REFBVztBQUMvQiw2QkFBNkIsUUFBUSxZQUFZO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixjQUFjLFFBQVEsb0RBQVEsdUJBQXVCLFNBQVMsZUFBZSxjQUFjO0FBQ25IO0FBQ0E7QUFDQSxpQ0FBaUMsUUFBUSxTQUFTO0FBQ2xELHFCQUFxQjtBQUNyQixpQkFBaUI7QUFDakIseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQSxvQkFBb0Isd0RBQVc7QUFDL0IsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyxvREFBUSwwQkFBMEIsU0FBUyxlQUFlLGNBQWMsV0FBVyxVQUFVO0FBQ2hJO0FBQ0EsaUJBQWlCO0FBQ2pCLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0Esb0JBQW9CLHdEQUFXO0FBQy9CLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcFNBLGlCQUFpQixTQUFJLElBQUksU0FBSTtBQUM3Qiw0QkFBNEIsK0RBQStELGlCQUFpQjtBQUM1RztBQUNBLG9DQUFvQyxNQUFNLCtCQUErQixZQUFZO0FBQ3JGLG1DQUFtQyxNQUFNLG1DQUFtQyxZQUFZO0FBQ3hGLGdDQUFnQztBQUNoQztBQUNBLEtBQUs7QUFDTDtBQUM4QztBQUM0QztBQUNtSTtBQUN2STtBQUNxSTtBQUNySztBQUNEO0FBQ3JELGtFQUFrQixJQUFJO0FBQ3RCO0FBQ0EsU0FBUyxzREFBVTtBQUNuQixnQkFBZ0IsdURBQVc7QUFDM0I7QUFDQTtBQUNBO0FBQ0EsYUFBYSwyREFBZTtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdURBQXVEO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDLDBEQUFtQjtBQUM5RCx5QkFBeUIsdURBQWM7QUFDdkM7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxxQkFBcUIsMERBQVk7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksdURBQVM7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5RkFBeUY7QUFDekYsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLGNBQWM7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUM7QUFDakM7QUFDQSw0QkFBNEIsd0JBQXdCO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckIsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0Esb0JBQW9CLHdEQUFXO0FBQy9CLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0EsK0JBQStCLHlEQUFnQjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QiwyQkFBMkI7QUFDdkQ7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDLGtFQUFvQjtBQUNqRSw4QkFBOEIsMERBQVksa0JBQWtCLGdCQUFnQjtBQUM1RSw4Q0FBOEMsbUVBQXFCO0FBQ25FO0FBQ0E7QUFDQSxnQ0FBZ0Msb0RBQVEsd0JBQXdCLFNBQVM7QUFDekU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJJQUEySTtBQUMzSSxvREFBb0QsdUZBQXVGO0FBQzNJO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekIsK0JBQStCLHdEQUFnQjtBQUMvQyxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLDRCQUE0QiwyQkFBMkI7QUFDdkQsZ0NBQWdDLG9EQUFRLHdCQUF3QixTQUFTO0FBQ3pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMklBQTJJO0FBQzNJO0FBQ0Esb0RBQW9ELHVGQUF1RjtBQUMzSSx5QkFBeUI7QUFDekIsK0JBQStCLHdEQUFnQjtBQUMvQyxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLDhCQUE4QixvRUFBMkI7QUFDekQ7QUFDQSx3QkFBd0IsY0FBYztBQUN0QztBQUNBLDZCQUE2QixRQUFRLDJCQUEyQjtBQUNoRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QixRQUFRLGVBQWU7QUFDaEQ7QUFDQTtBQUNBLG9CQUFvQix3REFBVztBQUMvQiw2QkFBNkIsUUFBUSwyQkFBMkI7QUFDaEU7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QiwyQkFBMkI7QUFDdkQsZ0NBQWdDLG9EQUFRLHdCQUF3QixTQUFTO0FBQ3pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0RBQW9ELHVGQUF1RjtBQUMzSSx5QkFBeUI7QUFDekIsK0JBQStCLHdEQUFnQjtBQUMvQyxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLDRCQUE0QiwyQkFBMkI7QUFDdkQsZ0NBQWdDLG9EQUFRLHdCQUF3QixTQUFTO0FBQ3pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0RBQW9ELHVGQUF1RjtBQUMzSSx5QkFBeUI7QUFDekIsK0JBQStCLHdEQUFnQjtBQUMvQyxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLDhCQUE4QixvRUFBMkI7QUFDekQ7QUFDQSx3QkFBd0IsY0FBYztBQUN0QztBQUNBLDZCQUE2QixRQUFRLDJCQUEyQjtBQUNoRTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0Esb0JBQW9CLHdEQUFXO0FBQy9CLDZCQUE2QixRQUFRLDJCQUEyQjtBQUNoRTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDLDBEQUFZLGtCQUFrQixnQkFBZ0I7QUFDckYsb0JBQW9CLGNBQWMsUUFBUSxvREFBUSx3QkFBd0IsU0FBUztBQUNuRjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQix1QkFBdUIsd0RBQWdCO0FBQ3ZDLGFBQWE7QUFDYixrQkFBa0IsNkRBQWUsa0JBQWtCLGdCQUFnQjtBQUNuRTtBQUNBLHlCQUF5QixRQUFRLDJCQUEyQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixrQ0FBa0M7QUFDMUQsa0NBQWtDLG9EQUFRLHdCQUF3QixTQUFTO0FBQzNFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnREFBZ0QsdUZBQXVGO0FBQ3ZJLHFCQUFxQjtBQUNyQiwyQkFBMkIsd0RBQWdCO0FBQzNDLGlCQUFpQjtBQUNqQix3QkFBd0IsY0FBYztBQUN0QztBQUNBLDZCQUE2QixRQUFRLDJCQUEyQjtBQUNoRTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0Esb0JBQW9CLHdEQUFXO0FBQy9CLDZCQUE2QixRQUFRLDJCQUEyQjtBQUNoRTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsbUJBQW1CO0FBQ3JDLGtCQUFrQixTQUFTO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixpQkFBaUI7QUFDN0M7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDLGtFQUFvQjtBQUNqRSw4QkFBOEIsMERBQVksa0JBQWtCLGdCQUFnQjtBQUM1RSw4Q0FBOEMsbUVBQXFCO0FBQ25FO0FBQ0E7QUFDQSw0QkFBNEIsUUFBUSxRQUFRLG9EQUFRLHdCQUF3QixTQUFTO0FBQ3JGO0FBQ0E7QUFDQTtBQUNBLDJJQUEySTtBQUMzSTtBQUNBLG9EQUFvRCx1RkFBdUY7QUFDM0k7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBLHFCQUFxQjtBQUNyQiw2QkFBNkIsUUFBUSwyQkFBMkI7QUFDaEU7QUFDQTtBQUNBLDRCQUE0QixpQkFBaUI7QUFDN0MsNEJBQTRCLFFBQVEsUUFBUSxvREFBUSx3QkFBd0IsU0FBUztBQUNyRjtBQUNBO0FBQ0E7QUFDQSwySUFBMkk7QUFDM0k7QUFDQSxvREFBb0QsdUZBQXVGO0FBQzNJO0FBQ0EseUJBQXlCO0FBQ3pCLHFCQUFxQjtBQUNyQiw2QkFBNkIsUUFBUSwyQkFBMkI7QUFDaEU7QUFDQSwwQkFBMEIsb0VBQTJCO0FBQ3JEO0FBQ0E7QUFDQSxvQkFBb0Isd0RBQVc7QUFDL0IsNkJBQTZCLFFBQVEsMkJBQTJCO0FBQ2hFO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsY0FBYyxRQUFRLG9EQUFRLHdCQUF3QixTQUFTO0FBQ3ZGO0FBQ0Esd0RBQXdELGFBQWEsd0JBQXdCLDZGQUE2RjtBQUMxTDtBQUNBLDJCQUEyQix3REFBZ0I7QUFDM0MsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QixRQUFRLGVBQWU7QUFDaEQ7QUFDQTtBQUNBLG9CQUFvQix3REFBVztBQUMvQiw2QkFBNkIsUUFBUSwyQkFBMkI7QUFDaEU7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsb0RBQVEsd0JBQXdCLFNBQVM7QUFDdEUsa0dBQWtHLDhCQUE4QixpQ0FBaUMsa0NBQWtDLHdCQUF3QixZQUFZLHlJQUF5STtBQUNoWCw0QkFBNEIsd0JBQXdCO0FBQ3BELG9DQUFvQywwQkFBMEI7QUFDOUQ7QUFDQSwyQkFBMkIsb0RBQVk7QUFDdkMsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxvQkFBb0Isd0RBQVc7QUFDL0IsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLFFBQVEsU0FBUyx5QkFBeUI7QUFDbEU7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLGdFQUF1QjtBQUNyRCx3QkFBd0IsUUFBUSxRQUFRLG9EQUFRLHVCQUF1QixTQUFTO0FBQ2hGO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIseUJBQXlCLFFBQVEsMkJBQTJCO0FBQzVEO0FBQ0E7QUFDQSxvQkFBb0Isd0RBQVc7QUFDL0IsNkJBQTZCLFFBQVEsMkJBQTJCO0FBQ2hFO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DLFNBQVM7QUFDN0M7QUFDQSw0QkFBNEIsdUJBQXVCO0FBQ25ELDRCQUE0QixRQUFRLFFBQVEsb0RBQVE7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvREFBb0QsdUZBQXVGO0FBQzNJLHlCQUF5QjtBQUN6QixxQkFBcUI7QUFDckIsNkJBQTZCLFFBQVEsMkJBQTJCO0FBQ2hFO0FBQ0E7QUFDQSw0QkFBNEIsdUJBQXVCO0FBQ25ELDRCQUE0QixRQUFRLFFBQVEsb0RBQVE7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvREFBb0QsdUZBQXVGO0FBQzNJLHlCQUF5QjtBQUN6QixxQkFBcUI7QUFDckIsNkJBQTZCLFFBQVEsMkJBQTJCO0FBQ2hFO0FBQ0EsMEJBQTBCLG9FQUEyQjtBQUNyRDtBQUNBO0FBQ0Esb0JBQW9CLHdEQUFXO0FBQy9CLDZCQUE2QixRQUFRLDJCQUEyQjtBQUNoRTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDLDBEQUFZO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLFFBQVEsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLFFBQVEseUJBQXlCO0FBQzFEO0FBQ0Esb0JBQW9CLGlCQUFpQjtBQUNyQztBQUNBLHlCQUF5QixRQUFRLGVBQWU7QUFDaEQ7QUFDQSxxQkFBcUIsUUFBUSxTQUFTO0FBQ3RDLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixjQUFjO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QixvREFBUSx1QkFBdUIsU0FBUztBQUNyRTtBQUNBO0FBQ0EsMkJBQTJCLHFEQUFhO0FBQ3hDLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0Esb0JBQW9CLHdEQUFXO0FBQy9CLDZCQUE2QixRQUFRLFlBQVk7QUFDakQ7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDO0FBQ3ZDO0FBQ0E7QUFDQSx3QkFBd0IseUNBQXlDO0FBQ2pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLGdFQUF1QjtBQUNyRDtBQUNBO0FBQ0Esd0JBQXdCLHlCQUF5QixRQUFRLG9EQUFRLHVCQUF1QixTQUFTO0FBQ2pHO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLHFEQUFhO0FBQ3hDLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLFFBQVEsb0JBQW9CO0FBQ3JEO0FBQ0E7QUFDQSxvQkFBb0Isd0RBQVc7QUFDL0IsNkJBQTZCLFFBQVEsWUFBWTtBQUNqRDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsOERBQWdCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLGdFQUF1QjtBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLDhEQUFnQjtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLG1DQUFtQztBQUMvRDtBQUNBLGlDQUFpQyxRQUFRLDJCQUEyQjtBQUNwRTtBQUNBO0FBQ0EsaUNBQWlDLFFBQVEsMkJBQTJCO0FBQ3BFO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLGNBQWM7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QixRQUFRLDZCQUE2QjtBQUM5RDtBQUNBO0FBQ0Esb0JBQW9CLHdEQUFXO0FBQy9CLDZCQUE2QixRQUFRLDJCQUEyQjtBQUNoRTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLGNBQWM7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLGdFQUF1QjtBQUNyRDtBQUNBLHdCQUF3QixpQkFBaUI7QUFDekM7QUFDQSw2QkFBNkIsUUFBUSwyQkFBMkI7QUFDaEU7QUFDQTtBQUNBLDZCQUE2QixRQUFRLDJCQUEyQjtBQUNoRTtBQUNBLHlCQUF5QixRQUFRLDZCQUE2QjtBQUM5RDtBQUNBO0FBQ0Esb0JBQW9CLHdEQUFXO0FBQy9CLDZCQUE2QixRQUFRLDJCQUEyQjtBQUNoRTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsdURBQVM7QUFDOUIsOEJBQThCLHVFQUE4QjtBQUM1RDtBQUNBLDhCQUE4Qix1RUFBOEI7QUFDNUQ7QUFDQTtBQUNBLDhCQUE4Qix1RUFBOEI7QUFDNUQ7QUFDQTtBQUNBLHFDQUFxQyxnRUFBa0I7QUFDdkQ7QUFDQSxrQ0FBa0MsdUVBQThCO0FBQ2hFLDRCQUE0QixjQUFjO0FBQzFDO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyx1RUFBOEI7QUFDaEU7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLFFBQVEsMkNBQTJDO0FBQ2hGO0FBQ0EsMENBQTBDLGdFQUFrQjtBQUM1RDtBQUNBLHVDQUF1QyxnRUFBa0I7QUFDekQ7QUFDQSxrQ0FBa0MsdUVBQThCO0FBQ2hFLGtDQUFrQyxnRUFBa0I7QUFDcEQ7QUFDQSxrQ0FBa0MsdUVBQThCO0FBQ2hFLDhCQUE4Qix1RUFBOEIsc0JBQXNCLHlCQUF5QjtBQUMzRztBQUNBLHVDQUF1QyxnRUFBa0I7QUFDekQsK0NBQStDLGdFQUFrQjtBQUNqRSxxQ0FBcUMsZ0VBQWtCO0FBQ3ZEO0FBQ0EsOEJBQThCLHVFQUE4QjtBQUM1RCxtQ0FBbUMsZ0VBQWtCO0FBQ3JEO0FBQ0EsOEJBQThCLHVFQUE4QjtBQUM1RCxzQ0FBc0MsZ0VBQWtCO0FBQ3hEO0FBQ0EsOEJBQThCLHVFQUE4QjtBQUM1RCxtQ0FBbUMsZ0VBQWtCO0FBQ3JEO0FBQ0EsOEJBQThCLHVFQUE4QjtBQUM1RDtBQUNBO0FBQ0Esd0JBQXdCLGNBQWM7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsZ0VBQWtCO0FBQ3ZEO0FBQ0E7QUFDQSx5QkFBeUIsUUFBUSx1QkFBdUI7QUFDeEQ7QUFDQTtBQUNBLG9CQUFvQix3REFBVztBQUMvQiw2QkFBNkIsUUFBUSxtQ0FBbUM7QUFDeEU7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsdURBQVM7QUFDekIscUJBQXFCLGdFQUFrQjtBQUN2Qyx3QkFBd0IsZ0VBQWtCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdEQUFnRCwwREFBWSxrQkFBa0IsZ0JBQWdCO0FBQzlGLG1CQUFtQix1REFBUyxjQUFjLGdFQUFrQjtBQUM1RCxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQiw0QkFBNEI7QUFDaEQ7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLFFBQVE7QUFDaEM7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLDJEQUFjO0FBQ3hDLGlDQUFpQztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQiw2REFBZSxrQkFBa0IsZ0JBQWdCO0FBQ25FO0FBQ0EscUJBQXFCO0FBQ3JCLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsa0RBQUk7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsUUFBUTtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLFFBQVEsU0FBUyxXQUFXO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZDQUE2QztBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyxrRUFBb0I7QUFDekQsc0JBQXNCLDBEQUFZLGtCQUFrQixnQkFBZ0I7QUFDcEUsc0NBQXNDLG1FQUFxQjtBQUMzRDtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsb0RBQVEsd0JBQXdCLFNBQVM7QUFDdEU7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnREFBZ0QscUNBQXFDO0FBQ3JGLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxvQkFBb0Isd0RBQVc7QUFDL0IsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2Qix1REFBUztBQUN0QywwQkFBMEIsbURBQUssaUJBQWlCO0FBQ2hELGlDQUFpQyxvREFBUSx3QkFBd0IsU0FBUztBQUMxRSxnQ0FBZ0MsNkJBQTZCO0FBQzdEO0FBQ0EsK0JBQStCLHdEQUFnQjtBQUMvQyxxQkFBcUI7QUFDckIsaUJBQWlCO0FBQ2pCO0FBQ0EsNENBQTRDLGdFQUF1QjtBQUNuRTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQix3REFBVztBQUMvQiw2QkFBNkIsUUFBUSwyQkFBMkI7QUFDaEU7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLGdCQUFnQix1REFBUztBQUN6QjtBQUNBO0FBQ0EscUJBQXFCLFFBQVEsZUFBZTtBQUM1QyxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDLDBEQUFZO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkdBQTZHLHlEQUFhO0FBQzFIO0FBQ0EsZ0NBQWdDLFFBQVE7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMsa0RBQVE7QUFDdEQ7QUFDQSw4QkFBOEIsZ0VBQXVCO0FBQ3JEO0FBQ0Esd0JBQXdCLGNBQWM7QUFDdEM7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLGdFQUF1QjtBQUNyRDtBQUNBO0FBQ0EsaUNBQWlDO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLHdEQUFXO0FBQy9CLHFDQUFxQztBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdELGdCQUFnQjtBQUNoRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLGVBQWUsMERBQVk7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsNkRBQWU7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1IsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsdURBQVM7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE4Qyx3QkFBd0I7QUFDdEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLDhDQUE4Qyx1QkFBdUI7QUFDckU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLDRDQUE0QztBQUNuRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSx5QkFBeUI7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLFFBQVEsU0FBUyxJQUFJO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLHVEQUFTO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0dBQXNHLGdEQUFnRDtBQUN0SjtBQUNBO0FBQ0E7QUFDQSx1REFBdUQ7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkMsNkJBQTZCO0FBQ3hFO0FBQ0EsOENBQThDLHVDQUF1QztBQUNyRjtBQUNBO0FBQ0EseUNBQXlDLG1DQUFtQztBQUM1RTtBQUNBO0FBQ0EscUNBQXFDLGtFQUFvQjtBQUN6RCxzQkFBc0IsMERBQVksa0JBQWtCLGdCQUFnQjtBQUNwRSw0Q0FBNEMsbUVBQXFCO0FBQ2pFO0FBQ0E7QUFDQSx1Q0FBdUMsa0NBQWtDO0FBQ3pFLDhDQUE4Qyx3Q0FBd0M7QUFDdEYsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixTQUFTLGFBQWEsb0JBQW9CO0FBQ2hFLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHlDQUF5QztBQUNqRTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBLDZCQUE2QixvREFBUSwwQkFBMEIsU0FBUyxXQUFXLGdCQUFnQjtBQUNuRztBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxvQkFBb0Isd0RBQVc7QUFDL0IsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUNBQXlDO0FBQ2pFO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0Esd0JBQXdCLGNBQWMsUUFBUSxvREFBUSx3QkFBd0IsU0FBUztBQUN2RjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQSw0REFBNEQsUUFBUSxrQkFBa0I7QUFDdEY7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBLG9CQUFvQix3REFBVztBQUMvQiw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix5Q0FBeUM7QUFDakU7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQSx3QkFBd0IsY0FBYyxRQUFRLG9EQUFRLHdCQUF3QixTQUFTLFdBQVcsZ0JBQWdCO0FBQ2xILDRCQUE0QixxREFBcUQ7QUFDakY7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBLHdEQUF3RCw2REFBNkQ7QUFDckg7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBLG9CQUFvQix3REFBVztBQUMvQiw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix5Q0FBeUM7QUFDakU7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQSw2QkFBNkIsb0RBQVEsd0JBQXdCLFNBQVMsV0FBVyxnQkFBZ0I7QUFDakc7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0Esb0JBQW9CLHdEQUFXO0FBQy9CLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsNkNBQTZDO0FBQ2pFO0FBQ0EsYUFBYTtBQUNiO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFFBQVEsTUFBTSxzQkFBc0I7QUFDeEQ7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFFBQVEsU0FBUyx5QkFBeUI7QUFDOUQ7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLHVFQUF1RTtBQUNuRztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLFFBQVEsdURBQXVEO0FBQ3BGLFNBQVM7QUFDVDtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwL0M4QztBQUNKO0FBQ0Y7QUFDWjtBQUNDO0FBQzdCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNMb0M7QUFDN0I7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLDhCQUE4Qiw2Q0FBTyxDQUFDO0FBQ2hFLDBCQUEwQjtBQUMxQjtBQUNQO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDVk87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzlGQSxpQkFBaUIsU0FBSSxJQUFJLFNBQUk7QUFDN0IsNEJBQTRCLCtEQUErRCxpQkFBaUI7QUFDNUc7QUFDQSxvQ0FBb0MsTUFBTSwrQkFBK0IsWUFBWTtBQUNyRixtQ0FBbUMsTUFBTSxtQ0FBbUMsWUFBWTtBQUN4RixnQ0FBZ0M7QUFDaEM7QUFDQSxLQUFLO0FBQ0w7QUFDQSxjQUFjLFNBQUksSUFBSSxTQUFJO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkRBQTZELGNBQWM7QUFDM0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUM4RDtBQUNxQjtBQUNuRjtBQUNBO0FBQ0E7QUFDQSxTQUFTLGdFQUFzQjtBQUMvQixtQkFBbUIsNERBQXVCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQiw0REFBdUI7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLGlEQUFZO0FBQ25DLFNBQVM7QUFDVDtBQUNBO0FBQ0EsdUJBQXVCLHFEQUFnQjtBQUN2QyxTQUFTO0FBQ1Q7QUFDQSxDQUFDO0FBQ0Q7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLGtDQUFrQyxnQkFBZ0I7QUFDdkY7QUFDQSx5Q0FBeUM7QUFDekM7QUFDTztBQUNQO0FBQ0E7QUFDQSx3Q0FBd0M7QUFDeEM7QUFDQSxpREFBaUQsWUFBWTtBQUM3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnRkFBZ0YsaUdBQWlHLElBQUk7QUFDckwsNkpBQTZKLHNCQUFzQjtBQUNuTCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDO0FBQ2xDLDZCQUE2QixtREFBUztBQUN0QztBQUNBO0FBQ0EsYUFBYSxRQUFRLGVBQWU7QUFDcEM7QUFDTztBQUNQO0FBQ0E7QUFDQSxhQUFhLFFBQVEsTUFBTTtBQUMzQjtBQUNPO0FBQ1AsYUFBYTtBQUNiO0FBQ087QUFDUCxZQUFZLHVFQUF1RTtBQUNuRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNySUEsaUJBQWlCLFNBQUksSUFBSSxTQUFJO0FBQzdCLDRCQUE0QiwrREFBK0QsaUJBQWlCO0FBQzVHO0FBQ0Esb0NBQW9DLE1BQU0sK0JBQStCLFlBQVk7QUFDckYsbUNBQW1DLE1BQU0sbUNBQW1DLFlBQVk7QUFDeEYsZ0NBQWdDO0FBQ2hDO0FBQ0EsS0FBSztBQUNMO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QixjQUFjLEVBQUUsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrRUFBK0Usb0JBQW9CLG9LQUFxQixtQkFBbUI7QUFDM0k7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBLENBQUM7QUFDTTtBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNNO0FBQ1A7QUFDQSxDQUFDO0FBQ007QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBLHlDQUF5QyxFQUFFLGdCQUFnQixFQUFFLGVBQWUsRUFBRTtBQUM5RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLG9CQUFvQjtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixvQkFBb0I7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4UGlEO0FBQ2pEO0FBQ0E7QUFDQSxhQUFhLDhEQUFvQjtBQUNqQztBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxhQUFhLDhEQUFvQjtBQUNqQztBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxhQUFhLDhEQUFvQjtBQUNqQztBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxpRUFBZSxtQkFBbUIsRUFBQztBQUNuQzs7Ozs7Ozs7Ozs7Ozs7O0FDdEJBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUN6QlU7QUFDVjs7Ozs7Ozs7Ozs7Ozs7O0FDREE7QUFDTztBQUNQOzs7Ozs7Ozs7Ozs7Ozs7OztBQ0ZxQztBQUN0QjtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsb0RBQVU7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0RBQXdELGFBQWE7QUFDckU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0MsNkhBQTZILElBQUksMkVBQTJFO0FBQ2hQLG9DQUFvQyxvSEFBb0g7QUFDeEo7QUFDQSxpQ0FBaUMsbUhBQW1IO0FBQ3BKLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDeks0RDtBQUNFO0FBQ2hCO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ2U7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixZQUFZLG1CQUFtQixJQUFJO0FBQzFEO0FBQ0EscURBQXFELEVBQUUsdURBQWU7QUFDdEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLFNBQVMsR0FBRyxTQUFTO0FBQ3BELG1CQUFtQiw4REFBcUI7QUFDeEMscUNBQXFDO0FBQ3JDO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsSUFBSSx1QkFBdUIsSUFBSTtBQUNwRDtBQUNBLCtCQUErQixTQUFTLE9BQU8sR0FBRztBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUFpRCxNQUFNO0FBQ3ZELGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDO0FBQ3hDO0FBQ0EseUNBQXlDLE1BQU07QUFDL0M7QUFDQSxtQkFBbUIsK0RBQXNCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQzdGb0U7QUFDckQscUNBQXFDLGtFQUF5QjtBQUM3RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtREFBbUQsTUFBTTtBQUN6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvREFBb0QsTUFBTTtBQUMxRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtREFBbUQsTUFBTTtBQUN6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvREFBb0QsTUFBTTtBQUMxRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtREFBbUQsTUFBTTtBQUN6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvREFBb0QsTUFBTTtBQUMxRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxREFBcUQsUUFBUTtBQUM3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5REFBeUQsRUFBRSxvQkFBb0I7QUFDL0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseURBQXlELEVBQUUsb0JBQW9CO0FBQy9FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNEQUFzRCxRQUFRO0FBQzlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBEQUEwRCxFQUFFLG9CQUFvQjtBQUNoRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwREFBMEQsRUFBRSxvQkFBb0I7QUFDaEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbURBQW1ELE1BQU07QUFDekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixFQUFFO0FBQzdCO0FBQ0EsMEJBQTBCLEVBQUU7QUFDNUIsU0FBUztBQUNUO0FBQ0Esb0RBQW9ELGNBQWM7QUFDbEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1REFBdUQsTUFBTTtBQUM3RDtBQUNBO0FBQ0E7QUFDQSxzREFBc0QsRUFBRSxpQkFBaUI7QUFDekU7QUFDQTtBQUNBO0FBQ0EsdURBQXVELHNCQUFzQjtBQUM3RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVEQUF1RCxNQUFNO0FBQzdEO0FBQ0E7QUFDQTtBQUNBLHNEQUFzRCxFQUFFLGlCQUFpQjtBQUN6RTtBQUNBO0FBQ0E7QUFDQSx1REFBdUQsc0JBQXNCO0FBQzdFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtREFBbUQsTUFBTTtBQUN6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0RBQW9ELE1BQU07QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtREFBbUQsTUFBTTtBQUN6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0RBQW9ELE1BQU07QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9EQUFvRCxNQUFNO0FBQzFEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVEQUF1RCxNQUFNO0FBQzdEO0FBQ0E7QUFDQTtBQUNBLHNEQUFzRCxFQUFFLGlCQUFpQjtBQUN6RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyxlQUFlLElBQUk7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyREFBMkQsT0FBTztBQUNsRSxnREFBZ0QsU0FBUyxLQUFLLFdBQVcsR0FBRyxNQUFNO0FBQ2xGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1REFBdUQsTUFBTTtBQUM3RCxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvREFBb0QsU0FBUyxHQUFHLE1BQU07QUFDdEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLGVBQWUsSUFBSTtBQUNyQyxzQ0FBc0MsYUFBYTtBQUNuRCw4Q0FBOEMsUUFBUTtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdEQUFnRCxTQUFTLEdBQUcsTUFBTTtBQUNsRTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ3BYOEQ7QUFDL0M7QUFDZix1QkFBdUIsWUFBWSxrQkFBa0I7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQix1QkFBdUIsSUFBSTtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMsTUFBTTtBQUNwRDtBQUNBLG1CQUFtQiwrREFBc0I7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsK0JBQStCLElBQUk7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXlDLE1BQU07QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdGQUFnRixPQUFPO0FBQ3ZGO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQiwrREFBc0I7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHFFQUFxRSxJQUFJO0FBQzlGO0FBQ0EsOENBQThDLHNDQUFzQztBQUNwRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUMsTUFBTTtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0ZBQWdGLE9BQU87QUFDdkY7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLCtEQUFzQjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixTQUFTLElBQUk7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXlDLE1BQU07QUFDL0M7QUFDQTtBQUNBLG1CQUFtQiwrREFBc0I7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsU0FBUyxJQUFJO0FBQzFCO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QyxNQUFNO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsK0RBQXNCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2UWtEO0FBQ25DLHdDQUF3Qyx5REFBZ0I7QUFDdkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLDhDQUE4QyxJQUFJO0FBQ3RFLHNDQUFzQyxhQUFhO0FBQ25EO0FBQ0EsMENBQTBDLG1CQUFtQixjQUFjLFFBQVEsRUFBRSxPQUFPLEdBQUcsMkJBQTJCLEVBQUUsMEVBQTBFO0FBQ3RNO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLGVBQWUsSUFBSTtBQUN0Qyx1RUFBdUUsYUFBYTtBQUNwRiwwQ0FBMEMsTUFBTTtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLGVBQWUsSUFBSTtBQUN6Qyw4RUFBOEUsYUFBYTtBQUMzRiw0RUFBNEUsYUFBYTtBQUN6RixnREFBZ0QsS0FBSztBQUNyRDtBQUNBLCtDQUErQyxjQUFjO0FBQzdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLHFHQUFxRyxJQUFJO0FBQ3ZIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrREFBK0QsU0FBUyxPQUFPLGFBQWEsR0FBRyxVQUFVLFNBQVM7QUFDbEg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDdk1vQztBQUM3QiwwQkFBMEIsaUNBQWlDLDZDQUFPLENBQUM7QUFDMUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0YrRDtBQUNZO0FBQ0U7QUFDTTtBQUNsQjtBQUNqRTs7Ozs7Ozs7Ozs7Ozs7O0FDTE87QUFDUDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNEQSxpQkFBaUIsU0FBSSxJQUFJLFNBQUk7QUFDN0IsNEJBQTRCLCtEQUErRCxpQkFBaUI7QUFDNUc7QUFDQSxvQ0FBb0MsTUFBTSwrQkFBK0IsWUFBWTtBQUNyRixtQ0FBbUMsTUFBTSxtQ0FBbUMsWUFBWTtBQUN4RixnQ0FBZ0M7QUFDaEM7QUFDQSxLQUFLO0FBQ0w7QUFDaUU7QUFDbkM7QUFDRTtBQUNrQjtBQUNDO0FBQzVDO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsd0ZBQXdGO0FBQ2xGO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLHNEQUFzRDtBQUNoRDtBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLDhEQUE4RDtBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ2U7QUFDZjtBQUNBO0FBQ0Esc0JBQXNCLFlBQVk7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsaUVBQXFCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBLHlCQUF5Qix5QkFBeUI7QUFDbEQsd0JBQXdCLFNBQVM7QUFDakMsU0FBUztBQUNUO0FBQ0EsNEJBQTRCLGlEQUFJLE9BQU8sK0RBQW1CO0FBQzFELCtCQUErQixrREFBSztBQUNwQztBQUNBLHlCQUF5QixpRUFBcUI7QUFDOUM7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxnREFBZ0QsWUFBWSxFQUFFLGdCQUFnQjtBQUM5RSx5QkFBeUIsaUVBQXFCO0FBQzlDO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdELFdBQVc7QUFDM0QseUJBQXlCLGtFQUFzQjtBQUMvQztBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtEQUFrRCxXQUFXO0FBQzdELHlCQUF5QixrRUFBc0I7QUFDL0M7QUFDQSxTQUFTO0FBQ1QsaUJBQWlCLGdFQUFvQixJQUFJO0FBQ3pDO0FBQ0EsU0FBUztBQUNULDRCQUE0Qix5REFBZ0I7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixVQUFVLHFCQUFxQixJQUFJO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtREFBbUQsUUFBUTtBQUMzRDtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0MsMENBQTBDO0FBQzVFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0MsaUJBQWlCO0FBQ3JEO0FBQ0EsZ0NBQWdDLFVBQVUsOEJBQThCLElBQUk7QUFDNUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUZBQW1GLDRCQUE0Qiw2QkFBNkI7QUFDNUk7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEI7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLGtFQUFzQjtBQUMzQztBQUNBLGdEQUFnRCxXQUFXO0FBQzNELDBCQUEwQixnRUFBb0I7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyxpREFBSSxPQUFPLGdFQUFvQixJQUFJO0FBQ3JFO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSwwQ0FBMEM7QUFDMUM7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0MsTUFBTSxRQUFRLFdBQVc7QUFDN0Q7QUFDQSw0QkFBNEIsaURBQUk7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQiw0QkFBNEIsRUFBRSwwREFBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSw0QkFBNEIsZ0RBQWdEO0FBQzVFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0I7QUFDL0IsK0JBQStCO0FBQy9CO0FBQ0E7QUFDQSxtRUFBbUU7QUFDbkU7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QixpRUFBcUI7QUFDbkQ7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLGlFQUFxQjtBQUNuRDtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsa0VBQXNCO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QixrRUFBc0I7QUFDcEQ7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLElBQUk7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixnRUFBb0IsSUFBSTtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixnRUFBb0IsSUFBSTtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsa0VBQXNCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkIsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQSwwQkFBMEIsZ0VBQThCO0FBQ3hEO0FBQ0E7QUFDQSwwQkFBMEIsZ0VBQThCO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xjQSxpQkFBaUIsU0FBSSxJQUFJLFNBQUk7QUFDN0IsNEJBQTRCLCtEQUErRCxpQkFBaUI7QUFDNUc7QUFDQSxvQ0FBb0MsTUFBTSwrQkFBK0IsWUFBWTtBQUNyRixtQ0FBbUMsTUFBTSxtQ0FBbUMsWUFBWTtBQUN4RixnQ0FBZ0M7QUFDaEM7QUFDQSxLQUFLO0FBQ0w7QUFDeUM7QUFDOEc7QUFDdkg7QUFDVTtBQUNNO0FBQ2hEO0FBQ2U7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrR0FBK0csZUFBZSxLQUFLLElBQUksSUFBSTtBQUMzSTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsMkRBQWU7QUFDdEM7QUFDQSx1QkFBdUIsMkRBQWU7QUFDdEMseUJBQXlCLG1EQUFZO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLHVEQUFVO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsU0FBUyxHQUFHLGdFQUFvQixDQUFDO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLHlEQUF5RDtBQUN6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0Msa0RBQUs7QUFDdkM7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUFpRDtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLG9FQUF3QjtBQUN6Qyx1QkFBdUIsdUVBQTJCO0FBQ2xELGlCQUFpQiw4REFBa0I7QUFDbkMsdUJBQXVCLGlFQUFxQjtBQUM1QyxpQkFBaUIsaUVBQXFCO0FBQ3RDLHVCQUF1QixvRUFBd0I7QUFDL0M7QUFDQSx1QkFBdUIsbUVBQXVCO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQyxpRUFBcUI7QUFDL0Q7QUFDQSw4QkFBOEIsWUFBWTtBQUMxQztBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsd0RBQWUsYUFBYSxNQUFNO0FBQzNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQiw2QkFBNkI7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSw0QkFBNEIsT0FBTyxFQUFFLE9BQU8sR0FBRyxJQUFJO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBaUQscUJBQXFCO0FBQ3RFO0FBQ0EsOEJBQThCLHVFQUEyQixJQUFJLHFCQUFxQjtBQUNsRjtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4REFBOEQsTUFBTTtBQUNwRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlFQUFpRSxpQkFBaUIsS0FBSywrQ0FBRyxFQUFFO0FBQzVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLDZCQUE2QjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyxzQkFBc0IsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLCtCQUErQjtBQUM1RztBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMsb0JBQW9CO0FBQ2xFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNERBQTRELGdFQUFvQjtBQUNoRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTTtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkVBQTJFLDJEQUFlO0FBQzFGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QjtBQUN2QjtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDdlhBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsMEVBQTBFO0FBQzVEO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixTQUFTLDhCQUE4QjtBQUNuRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3Qiw4QkFBOEI7QUFDOUIsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUM7QUFDekMsb0JBQW9CLDBCQUEwQjtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsU0FBUztBQUNULHdDQUF3QztBQUN4QyxvQkFBb0IsMEJBQTBCO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBLGdEQUFnRCxlQUFlO0FBQy9ELFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Qsc0NBQXNDLGVBQWU7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLGdCQUFnQjtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSwrQkFBK0I7QUFDM0MsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLDRDQUE0QztBQUMxRCxjQUFjO0FBQ2Q7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyxJQUFJO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDL044QztBQUNpRztBQUN2RDtBQUNpRztBQUN6TDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDSm9DO0FBQzdCLDBCQUEwQixnQ0FBZ0MsNkNBQU8sQ0FBQztBQUNsRTtBQUNBO0FBQ0E7QUFDQTtBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLHNDQUFzQztBQUNoQztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsd0NBQXdDO0FBQ2xDO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLHdDQUF3QztBQUNsQztBQUNQO0FBQ0E7QUFDQSxDQUFDLGdDQUFnQztBQUMxQjtBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLDRDQUE0QztBQUM3Qzs7Ozs7Ozs7Ozs7Ozs7OztBQ3hDbUQ7QUFDcEM7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQWlELGFBQWE7QUFDOUQ7QUFDQTtBQUNBLDRDQUE0QyxZQUFZLDJEQUFlO0FBQ3ZFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscURBQXFEO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QixrQkFBa0I7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQztBQUMxQztBQUNBLHNDQUFzQztBQUN0QyxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsbURBQW1ELGtCQUFrQjtBQUNyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkM7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixtQkFBbUI7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUN4R0E7QUFDQTtBQUNlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ2U7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsc0NBQXNDO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSwyQkFBMkIsSUFBSTtBQUMzQyxXQUFXLFFBQVE7QUFDbkIsV0FBVyxRQUFRO0FBQ25CLFdBQVcsT0FBTztBQUNsQjtBQUNBLGdDQUFnQyxpQ0FBaUMsR0FBRywwQkFBMEIsSUFBSSw2QkFBNkIsSUFBSTtBQUNuSSxTQUFTO0FBQ1Q7QUFDTyx3REFBd0Q7QUFDL0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUssSUFBSTtBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFlBQVksMkJBQTJCLElBQUk7QUFDM0MsV0FBVyxRQUFRO0FBQ25CLFdBQVcsT0FBTztBQUNsQixZQUFZLFFBQVE7QUFDcEI7QUFDQSxtQ0FBbUMsaUNBQWlDLEdBQUcsMEJBQTBCLElBQUksOEJBQThCO0FBQ25JO0FBQ0EsbUNBQW1DLGlDQUFpQyxHQUFHLDBCQUEwQixJQUFJLDhCQUE4QjtBQUNuSTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFdBQVcsUUFBUTtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLFFBQVE7QUFDM0M7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkMsTUFBTTtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCO0FBQ3ZCO0FBQ0Esc0JBQXNCLG9EQUFvRDtBQUMxRTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0Isc0JBQXNCO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNsTk87QUFDUDs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNEdUQ7QUFDSTtBQUNwRCw0QkFBNEIsa0VBQWdCO0FBQ25ELGlDQUFpQztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLGdFQUFjO0FBQ2pDO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ2ZvQztBQUM3QiwwQkFBMEIsK0JBQStCLDZDQUFPLENBQUM7QUFDeEU7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0ZPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDL0JBLGlCQUFpQixTQUFJLElBQUksU0FBSTtBQUM3Qiw0QkFBNEIsK0RBQStELGlCQUFpQjtBQUM1RztBQUNBLG9DQUFvQyxNQUFNLCtCQUErQixZQUFZO0FBQ3JGLG1DQUFtQyxNQUFNLG1DQUFtQyxZQUFZO0FBQ3hGLGdDQUFnQztBQUNoQztBQUNBLEtBQUs7QUFDTDtBQUNnRTtBQUNwQjtBQUM1QztBQUNBO0FBQ0Esc0JBQXNCLHlEQUFlO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLG9EQUFlO0FBQ3RDLFNBQVM7QUFDVDtBQUNBLHVCQUF1Qix3REFBbUI7QUFDMUMsU0FBUztBQUNUO0FBQ0E7QUFDQSxtQkFBbUIsd0RBQW1CO0FBQ3RDO0FBQ0EsQ0FBQztBQUNEO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyxvQ0FBb0M7QUFDekU7QUFDQSx5Q0FBeUM7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNPO0FBQ1A7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNPO0FBQ1A7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNPO0FBQ1A7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNPO0FBQ1A7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDekVBLGlCQUFpQixTQUFJLElBQUksU0FBSTtBQUM3Qiw0QkFBNEIsK0RBQStELGlCQUFpQjtBQUM1RztBQUNBLG9DQUFvQyxNQUFNLCtCQUErQixZQUFZO0FBQ3JGLG1DQUFtQyxNQUFNLG1DQUFtQyxZQUFZO0FBQ3hGLGdDQUFnQztBQUNoQztBQUNBLEtBQUs7QUFDTDtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtFQUErRSxvQkFBb0Isb0tBQXFCLG1CQUFtQjtBQUMzSTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0Esc0JBQXNCLG9LQUFxQjtBQUMzQztBQUNBO0FBQ0EsQ0FBQztBQUNEOzs7Ozs7Ozs7Ozs7Ozs7QUM1QkE7QUFDTztBQUNQOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDRkEsaUJBQWlCLFNBQUksSUFBSSxTQUFJO0FBQzdCLDRCQUE0QiwrREFBK0QsaUJBQWlCO0FBQzVHO0FBQ0Esb0NBQW9DLE1BQU0sK0JBQStCLFlBQVk7QUFDckYsbUNBQW1DLE1BQU0sbUNBQW1DLFlBQVk7QUFDeEYsZ0NBQWdDO0FBQ2hDO0FBQ0EsS0FBSztBQUNMO0FBQ21EO0FBQ0o7QUFDTztBQUNSO0FBQy9CO0FBQ2YsaUNBQWlDO0FBQ2pDO0FBQ0EscURBQXFELEVBQUUsMkRBQWU7QUFDdEUscUJBQXFCLDBEQUFZO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLCtDQUFHLGdCQUFnQixTQUFTLFlBQVksdUJBQXVCO0FBQ2xHLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0Esb0JBQW9CLDJEQUFjO0FBQ2xDLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLCtDQUFHLGdCQUFnQixTQUFTLFVBQVUsR0FBRyxLQUFLLHVCQUF1QjtBQUN4Ryx5QkFBeUI7QUFDekI7QUFDQTtBQUNBLG9CQUFvQiwyREFBYztBQUNsQyw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxtQ0FBbUMsZ0RBQUksZ0JBQWdCLFNBQVM7QUFDaEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixJQUFJLHVCQUF1QjtBQUM1Qyx5QkFBeUI7QUFDekI7QUFDQTtBQUNBLG9CQUFvQiwyREFBYztBQUNsQyw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLCtDQUFHLGdCQUFnQixTQUFTLFVBQVUsR0FBRztBQUM1RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLElBQUksdUJBQXVCO0FBQzVDLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0Esb0JBQW9CLDJEQUFjO0FBQ2xDLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLGdEQUFJLGdCQUFnQixTQUFTLFVBQVUsR0FBRyxXQUFXLElBQUksdUJBQXVCO0FBQ25ILHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0Esb0JBQW9CLDJEQUFjO0FBQ2xDLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsa0RBQU0sZ0JBQWdCLFNBQVMsVUFBVSxHQUFHLEtBQUssSUFBSSx1QkFBdUI7QUFDL0cseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQSxvQkFBb0IsMkRBQWM7QUFDbEMsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xLQSxpQkFBaUIsU0FBSSxJQUFJLFNBQUk7QUFDN0IsNEJBQTRCLCtEQUErRCxpQkFBaUI7QUFDNUc7QUFDQSxvQ0FBb0MsTUFBTSwrQkFBK0IsWUFBWTtBQUNyRixtQ0FBbUMsTUFBTSxtQ0FBbUMsWUFBWTtBQUN4RixnQ0FBZ0M7QUFDaEM7QUFDQSxLQUFLO0FBQ0w7QUFDNkQ7QUFDWjtBQUNIO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNlO0FBQ2YsaUNBQWlDO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQiwwREFBWTtBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4REFBOEQ7QUFDOUQsOERBQThELHlDQUF5QyxvQ0FBb0M7QUFDM0k7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBEQUEwRCxxQkFBcUI7QUFDL0U7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnREFBZ0QsU0FBUyxVQUFVLE1BQU0sbUJBQW1CLDZCQUE2QiwwRUFBMEUseUJBQXlCLElBQUk7QUFDaE87QUFDQTtBQUNBLGdDQUFnQyxpQkFBaUI7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsMkRBQWM7QUFDbEMsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0VBQWtFLE1BQU07QUFDeEU7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdELHFDQUFxQztBQUNyRiw4REFBOEQsbUJBQW1CLG9DQUFvQztBQUNySDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMERBQTBELHFCQUFxQjtBQUMvRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLGdDQUFnQyxpQkFBaUI7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsMkRBQWM7QUFDbEMsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLGdEQUFJLGdCQUFnQixTQUFTLHNCQUFzQixNQUFNLEtBQUssSUFBSSx1QkFBdUI7QUFDNUg7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLHFEQUFZO0FBQzFDO0FBQ0EseUJBQXlCLFFBQVEsd0NBQXdDO0FBQ3pFO0FBQ0E7QUFDQSxvQkFBb0IsMkRBQWM7QUFDbEMsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyxnREFBSSxnQkFBZ0IsU0FBUyxpQkFBaUIsc0VBQXNFLElBQUksdUJBQXVCO0FBQ2xMLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0Esb0JBQW9CLDJEQUFjO0FBQ2xDLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsZ0RBQUksZ0JBQWdCLFNBQVMsaUJBQWlCLHNFQUFzRSxJQUFJLHVCQUF1QjtBQUNsTCx5QkFBeUIsUUFBUSxnQkFBZ0I7QUFDakQ7QUFDQTtBQUNBLG9CQUFvQiwyREFBYztBQUNsQyw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLGdEQUFJLGdCQUFnQixTQUFTLGVBQWUsTUFBTSxtQkFBbUIsV0FBVyw2RUFBNkUsK0JBQStCLElBQUksTUFBTSx1QkFBdUI7QUFDOVA7QUFDQSxtQ0FBbUMsa0RBQWtEO0FBQ3JGO0FBQ0EsK0NBQStDLFNBQVMsRUFBRSxlQUFlLEVBQUUsbUJBQW1CO0FBQzlGLHlCQUF5QjtBQUN6Qix5QkFBeUI7QUFDekI7QUFDQTtBQUNBLG9CQUFvQiwyREFBYztBQUNsQyw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsZ0RBQUksZ0JBQWdCLFNBQVMsZUFBZSxjQUFjLEtBQUssa0JBQWtCLElBQUksdUJBQXVCO0FBQy9JO0FBQ0EsbUNBQW1DLGtEQUFrRDtBQUNyRjtBQUNBO0FBQ0EsNkVBQTZFLFlBQVk7QUFDekYsMkNBQTJDLFNBQVMsRUFBRSxnQkFBZ0IsRUFBRSxtQkFBbUI7QUFDM0Ysb0NBQW9DO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLDJEQUFjO0FBQ2xDLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1KQUFtSjtBQUNuSiwwREFBMEQsb0JBQW9CO0FBQzlFO0FBQ0E7QUFDQSxrQ0FBa0MsK0NBQUcsZ0JBQWdCLFNBQVMsR0FBRyxXQUFXLEdBQUcsTUFBTSxFQUFFLFlBQVk7QUFDbkc7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0Esb0JBQW9CLDJEQUFjO0FBQ2xDLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsa0RBQWtEO0FBQzVFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtJQUErSTtBQUMvSTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLFlBQVk7QUFDMUM7QUFDQTtBQUNBLG9CQUFvQix3QkFBd0IsU0FBUyxHQUFHLFdBQVcsVUFBVSxNQUFNLEVBQUUsWUFBWSxJQUFJO0FBQ3JHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLGtEQUFNLGdCQUFnQixTQUFTLFVBQVUsY0FBYyxLQUFLLGlCQUFpQixJQUFJLHVCQUF1QjtBQUMzSSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBLG9CQUFvQiwyREFBYztBQUNsQyw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUFpRCxTQUFTLFlBQVksR0FBRyxLQUFLLHVCQUF1QjtBQUNyRyxvQkFBb0I7QUFDcEIsV0FBVztBQUNYO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLFNBQVMsWUFBWSxHQUFHO0FBQ3hDLGVBQWUsU0FBUztBQUN4QixlQUFlO0FBQ2Y7QUFDQSxvQkFBb0I7QUFDcEIsV0FBVztBQUNYO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5RUFBeUUsdUNBQXVDLG9CQUFvQjtBQUNwSSxtQ0FBbUMsZ0RBQUksZ0JBQWdCLFNBQVMsZUFBZSxjQUFjLFdBQVcsdUJBQXVCO0FBQy9ILHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0Esb0JBQW9CLDJEQUFjO0FBQ2xDLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLGtCQUFrQixjQUFjLEdBQUcsS0FBSztBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQyxnQkFBZ0I7QUFDakQ7QUFDQTtBQUNBLGtDQUFrQyxpQkFBaUI7QUFDbkQ7QUFDQTtBQUNBLGtDQUFrQyxpQkFBaUI7QUFDbkQ7QUFDQTtBQUNBLGtDQUFrQyxpQkFBaUI7QUFDbkQ7QUFDQTtBQUNBLG1DQUFtQyxrQkFBa0I7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvY0EsaUJBQWlCLFNBQUksSUFBSSxTQUFJO0FBQzdCLDRCQUE0QiwrREFBK0QsaUJBQWlCO0FBQzVHO0FBQ0Esb0NBQW9DLE1BQU0sK0JBQStCLFlBQVk7QUFDckYsbUNBQW1DLE1BQU0sbUNBQW1DLFlBQVk7QUFDeEYsZ0NBQWdDO0FBQ2hDO0FBQ0EsS0FBSztBQUNMO0FBQ3lEO0FBQ0M7QUFDRjtBQUNzQjtBQUM1QjtBQUNOO0FBQzZCO0FBQ1g7QUFDOUQ7QUFDQSxhQUFhLDJEQUFlO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ2U7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLGdFQUFrQjtBQUMvQyw4QkFBOEIsYUFBYTtBQUMzQywwQkFBMEIsYUFBYTtBQUN2Qyw2QkFBNkIsYUFBYTtBQUMxQywrQkFBK0IsYUFBYTtBQUM1QztBQUNBLHdDQUF3Qyw2Q0FBNkM7QUFDckY7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdELDJCQUEyQiwrQkFBK0I7QUFDMUc7QUFDQTtBQUNBLHlCQUF5QixrRUFBb0Isc0RBQXNEO0FBQ25HO0FBQ0E7QUFDQSx5R0FBeUc7QUFDekcscUJBQXFCLHlEQUFhO0FBQ2xDLGlFQUFpRSx1QkFBdUI7QUFDeEYsd0JBQXdCLG1FQUFlLElBQUksYUFBYTtBQUN4RDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLG1FQUFlO0FBQ2xDO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQiwrREFBcUI7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLFFBQVE7QUFDdkIsZUFBZSxRQUFRO0FBQ3ZCO0FBQ0E7QUFDQSwyQkFBMkIsWUFBWTtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxpQkFBaUI7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0EsU0FBUztBQUNUO0FBQ0EsOEJBQThCLHNGQUFzRjtBQUNwSDtBQUNBLHFDQUFxQyxpQkFBaUI7QUFDdEQsdUJBQXVCLGlCQUFpQjtBQUN4QztBQUNBLG1CQUFtQix1RUFBa0I7QUFDckM7QUFDQSxtREFBbUQ7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLG1CQUFtQixpRUFBYyxpREFBaUQsY0FBYyx3QkFBd0IsMEJBQTBCLHFFQUFxRTtBQUN2TjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqTjhDO0FBQ1Y7QUFDbUY7QUFDakY7QUFDdUI7QUFDN0Q7QUFDQTtBQUNBO0FBQ087QUFDUCxlQUFlLHVEQUFjO0FBQzdCO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNYbUQ7QUFDNUMsaUNBQWlDLDZEQUFZO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOQTtBQUNvQztBQUM3QiwwQkFBMEIsZ0NBQWdDLDZDQUFPLENBQUM7QUFDekU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNIQSxpQkFBaUIsU0FBSSxJQUFJLFNBQUk7QUFDN0IsNEJBQTRCLCtEQUErRCxpQkFBaUI7QUFDNUc7QUFDQSxvQ0FBb0MsTUFBTSwrQkFBK0IsWUFBWTtBQUNyRixtQ0FBbUMsTUFBTSxtQ0FBbUMsWUFBWTtBQUN4RixnQ0FBZ0M7QUFDaEM7QUFDQSxLQUFLO0FBQ0w7QUFDdUU7QUFDaEU7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLG9EQUFVO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQSxlQUFlLGdEQUFpQjtBQUNoQztBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbURBQW1ELFlBQVk7QUFDL0Q7QUFDQSwwREFBMEQsV0FBVyxTQUFTO0FBQzlFLEtBQUs7QUFDTDtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3Q087QUFDUDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDTztBQUNQO0FBQ0E7QUFDTztBQUNBO0FBQ1AsWUFBWSxzRkFBc0Y7QUFDbEcsWUFBWSwwSEFBMEg7QUFDdEk7QUFDQSwwQ0FBMEM7QUFDMUMsNENBQTRDO0FBQzVDLGdEQUFnRDtBQUNoRCw4Q0FBOEM7QUFDOUM7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNwQk87QUFDUDs7Ozs7Ozs7OztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLE1BQU07QUFDTjtBQUNBO0FBQ0EsT0FBTztBQUNQLE1BQU07QUFDTjtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxvQkFBb0IsaUJBQWlCO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQSxRQUFRO0FBQ1I7QUFDQSxRQUFRO0FBQ1I7QUFDQSxRQUFRO0FBQ1I7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVEQUF1RDtBQUN2RCxVQUFVO0FBQ1Y7QUFDQSxVQUFVO0FBQ1YsOEVBQThFO0FBQzlFO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBLFVBQVU7QUFDVjtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBLFFBQVE7QUFDUjtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhCQUE4QixxQkFBcUI7QUFDbkQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Es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V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7OztXQ3pCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ05BO0FBQ29EOztBQUVwRDtBQUNBO0FBQ0EsaUJBQWlCLG1FQUFZOzs7QUFHN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0EsZ0JBQWdCLFFBQVE7QUFDeEI7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tZW50b3J5eC8uL25vZGVfbW9kdWxlcy9Ac3VwYWJhc2UvZnVuY3Rpb25zLWpzL2Rpc3QvbW9kdWxlL0Z1bmN0aW9uc0NsaWVudC5qcyIsIndlYnBhY2s6Ly9tZW50b3J5eC8uL25vZGVfbW9kdWxlcy9Ac3VwYWJhc2UvZnVuY3Rpb25zLWpzL2Rpc3QvbW9kdWxlL2hlbHBlci5qcyIsIndlYnBhY2s6Ly9tZW50b3J5eC8uL25vZGVfbW9kdWxlcy9Ac3VwYWJhc2UvZnVuY3Rpb25zLWpzL2Rpc3QvbW9kdWxlL3R5cGVzLmpzIiwid2VicGFjazovL21lbnRvcnl4Ly4vbm9kZV9tb2R1bGVzL0BzdXBhYmFzZS9nb3RydWUtanMvZGlzdC9tb2R1bGUvR29UcnVlQWRtaW5BcGkuanMiLCJ3ZWJwYWNrOi8vbWVudG9yeXgvLi9ub2RlX21vZHVsZXMvQHN1cGFiYXNlL2dvdHJ1ZS1qcy9kaXN0L21vZHVsZS9Hb1RydWVDbGllbnQuanMiLCJ3ZWJwYWNrOi8vbWVudG9yeXgvLi9ub2RlX21vZHVsZXMvQHN1cGFiYXNlL2dvdHJ1ZS1qcy9kaXN0L21vZHVsZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9tZW50b3J5eC8uL25vZGVfbW9kdWxlcy9Ac3VwYWJhc2UvZ290cnVlLWpzL2Rpc3QvbW9kdWxlL2xpYi9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vbWVudG9yeXgvLi9ub2RlX21vZHVsZXMvQHN1cGFiYXNlL2dvdHJ1ZS1qcy9kaXN0L21vZHVsZS9saWIvZXJyb3JzLmpzIiwid2VicGFjazovL21lbnRvcnl4Ly4vbm9kZV9tb2R1bGVzL0BzdXBhYmFzZS9nb3RydWUtanMvZGlzdC9tb2R1bGUvbGliL2ZldGNoLmpzIiwid2VicGFjazovL21lbnRvcnl4Ly4vbm9kZV9tb2R1bGVzL0BzdXBhYmFzZS9nb3RydWUtanMvZGlzdC9tb2R1bGUvbGliL2hlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vbWVudG9yeXgvLi9ub2RlX21vZHVsZXMvQHN1cGFiYXNlL2dvdHJ1ZS1qcy9kaXN0L21vZHVsZS9saWIvbG9jYWwtc3RvcmFnZS5qcyIsIndlYnBhY2s6Ly9tZW50b3J5eC8uL25vZGVfbW9kdWxlcy9Ac3VwYWJhc2UvZ290cnVlLWpzL2Rpc3QvbW9kdWxlL2xpYi9wb2x5ZmlsbHMuanMiLCJ3ZWJwYWNrOi8vbWVudG9yeXgvLi9ub2RlX21vZHVsZXMvQHN1cGFiYXNlL2dvdHJ1ZS1qcy9kaXN0L21vZHVsZS9saWIvdHlwZXMuanMiLCJ3ZWJwYWNrOi8vbWVudG9yeXgvLi9ub2RlX21vZHVsZXMvQHN1cGFiYXNlL2dvdHJ1ZS1qcy9kaXN0L21vZHVsZS9saWIvdmVyc2lvbi5qcyIsIndlYnBhY2s6Ly9tZW50b3J5eC8uL25vZGVfbW9kdWxlcy9Ac3VwYWJhc2UvcG9zdGdyZXN0LWpzL2Rpc3QvbW9kdWxlL1Bvc3RncmVzdEJ1aWxkZXIuanMiLCJ3ZWJwYWNrOi8vbWVudG9yeXgvLi9ub2RlX21vZHVsZXMvQHN1cGFiYXNlL3Bvc3RncmVzdC1qcy9kaXN0L21vZHVsZS9Qb3N0Z3Jlc3RDbGllbnQuanMiLCJ3ZWJwYWNrOi8vbWVudG9yeXgvLi9ub2RlX21vZHVsZXMvQHN1cGFiYXNlL3Bvc3RncmVzdC1qcy9kaXN0L21vZHVsZS9Qb3N0Z3Jlc3RGaWx0ZXJCdWlsZGVyLmpzIiwid2VicGFjazovL21lbnRvcnl4Ly4vbm9kZV9tb2R1bGVzL0BzdXBhYmFzZS9wb3N0Z3Jlc3QtanMvZGlzdC9tb2R1bGUvUG9zdGdyZXN0UXVlcnlCdWlsZGVyLmpzIiwid2VicGFjazovL21lbnRvcnl4Ly4vbm9kZV9tb2R1bGVzL0BzdXBhYmFzZS9wb3N0Z3Jlc3QtanMvZGlzdC9tb2R1bGUvUG9zdGdyZXN0VHJhbnNmb3JtQnVpbGRlci5qcyIsIndlYnBhY2s6Ly9tZW50b3J5eC8uL25vZGVfbW9kdWxlcy9Ac3VwYWJhc2UvcG9zdGdyZXN0LWpzL2Rpc3QvbW9kdWxlL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly9tZW50b3J5eC8uL25vZGVfbW9kdWxlcy9Ac3VwYWJhc2UvcG9zdGdyZXN0LWpzL2Rpc3QvbW9kdWxlL2luZGV4LmpzIiwid2VicGFjazovL21lbnRvcnl4Ly4vbm9kZV9tb2R1bGVzL0BzdXBhYmFzZS9wb3N0Z3Jlc3QtanMvZGlzdC9tb2R1bGUvdmVyc2lvbi5qcyIsIndlYnBhY2s6Ly9tZW50b3J5eC8uL25vZGVfbW9kdWxlcy9Ac3VwYWJhc2UvcmVhbHRpbWUtanMvZGlzdC9tb2R1bGUvUmVhbHRpbWVDaGFubmVsLmpzIiwid2VicGFjazovL21lbnRvcnl4Ly4vbm9kZV9tb2R1bGVzL0BzdXBhYmFzZS9yZWFsdGltZS1qcy9kaXN0L21vZHVsZS9SZWFsdGltZUNsaWVudC5qcyIsIndlYnBhY2s6Ly9tZW50b3J5eC8uL25vZGVfbW9kdWxlcy9Ac3VwYWJhc2UvcmVhbHRpbWUtanMvZGlzdC9tb2R1bGUvUmVhbHRpbWVQcmVzZW5jZS5qcyIsIndlYnBhY2s6Ly9tZW50b3J5eC8uL25vZGVfbW9kdWxlcy9Ac3VwYWJhc2UvcmVhbHRpbWUtanMvZGlzdC9tb2R1bGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vbWVudG9yeXgvLi9ub2RlX21vZHVsZXMvQHN1cGFiYXNlL3JlYWx0aW1lLWpzL2Rpc3QvbW9kdWxlL2xpYi9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vbWVudG9yeXgvLi9ub2RlX21vZHVsZXMvQHN1cGFiYXNlL3JlYWx0aW1lLWpzL2Rpc3QvbW9kdWxlL2xpYi9wdXNoLmpzIiwid2VicGFjazovL21lbnRvcnl4Ly4vbm9kZV9tb2R1bGVzL0BzdXBhYmFzZS9yZWFsdGltZS1qcy9kaXN0L21vZHVsZS9saWIvc2VyaWFsaXplci5qcyIsIndlYnBhY2s6Ly9tZW50b3J5eC8uL25vZGVfbW9kdWxlcy9Ac3VwYWJhc2UvcmVhbHRpbWUtanMvZGlzdC9tb2R1bGUvbGliL3RpbWVyLmpzIiwid2VicGFjazovL21lbnRvcnl4Ly4vbm9kZV9tb2R1bGVzL0BzdXBhYmFzZS9yZWFsdGltZS1qcy9kaXN0L21vZHVsZS9saWIvdHJhbnNmb3JtZXJzLmpzIiwid2VicGFjazovL21lbnRvcnl4Ly4vbm9kZV9tb2R1bGVzL0BzdXBhYmFzZS9yZWFsdGltZS1qcy9kaXN0L21vZHVsZS9saWIvdmVyc2lvbi5qcyIsIndlYnBhY2s6Ly9tZW50b3J5eC8uL25vZGVfbW9kdWxlcy9Ac3VwYWJhc2Uvc3RvcmFnZS1qcy9kaXN0L21vZHVsZS9TdG9yYWdlQ2xpZW50LmpzIiwid2VicGFjazovL21lbnRvcnl4Ly4vbm9kZV9tb2R1bGVzL0BzdXBhYmFzZS9zdG9yYWdlLWpzL2Rpc3QvbW9kdWxlL2xpYi9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vbWVudG9yeXgvLi9ub2RlX21vZHVsZXMvQHN1cGFiYXNlL3N0b3JhZ2UtanMvZGlzdC9tb2R1bGUvbGliL2Vycm9ycy5qcyIsIndlYnBhY2s6Ly9tZW50b3J5eC8uL25vZGVfbW9kdWxlcy9Ac3VwYWJhc2Uvc3RvcmFnZS1qcy9kaXN0L21vZHVsZS9saWIvZmV0Y2guanMiLCJ3ZWJwYWNrOi8vbWVudG9yeXgvLi9ub2RlX21vZHVsZXMvQHN1cGFiYXNlL3N0b3JhZ2UtanMvZGlzdC9tb2R1bGUvbGliL2hlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vbWVudG9yeXgvLi9ub2RlX21vZHVsZXMvQHN1cGFiYXNlL3N0b3JhZ2UtanMvZGlzdC9tb2R1bGUvbGliL3ZlcnNpb24uanMiLCJ3ZWJwYWNrOi8vbWVudG9yeXgvLi9ub2RlX21vZHVsZXMvQHN1cGFiYXNlL3N0b3JhZ2UtanMvZGlzdC9tb2R1bGUvcGFja2FnZXMvU3RvcmFnZUJ1Y2tldEFwaS5qcyIsIndlYnBhY2s6Ly9tZW50b3J5eC8uL25vZGVfbW9kdWxlcy9Ac3VwYWJhc2Uvc3RvcmFnZS1qcy9kaXN0L21vZHVsZS9wYWNrYWdlcy9TdG9yYWdlRmlsZUFwaS5qcyIsIndlYnBhY2s6Ly9tZW50b3J5eC8uL25vZGVfbW9kdWxlcy9Ac3VwYWJhc2Uvc3VwYWJhc2UtanMvZGlzdC9tb2R1bGUvU3VwYWJhc2VDbGllbnQuanMiLCJ3ZWJwYWNrOi8vbWVudG9yeXgvLi9ub2RlX21vZHVsZXMvQHN1cGFiYXNlL3N1cGFiYXNlLWpzL2Rpc3QvbW9kdWxlL2luZGV4LmpzIiwid2VicGFjazovL21lbnRvcnl4Ly4vbm9kZV9tb2R1bGVzL0BzdXBhYmFzZS9zdXBhYmFzZS1qcy9kaXN0L21vZHVsZS9saWIvU3VwYWJhc2VBdXRoQ2xpZW50LmpzIiwid2VicGFjazovL21lbnRvcnl4Ly4vbm9kZV9tb2R1bGVzL0BzdXBhYmFzZS9zdXBhYmFzZS1qcy9kaXN0L21vZHVsZS9saWIvY29uc3RhbnRzLmpzIiwid2VicGFjazovL21lbnRvcnl4Ly4vbm9kZV9tb2R1bGVzL0BzdXBhYmFzZS9zdXBhYmFzZS1qcy9kaXN0L21vZHVsZS9saWIvZmV0Y2guanMiLCJ3ZWJwYWNrOi8vbWVudG9yeXgvLi9ub2RlX21vZHVsZXMvQHN1cGFiYXNlL3N1cGFiYXNlLWpzL2Rpc3QvbW9kdWxlL2xpYi9oZWxwZXJzLmpzIiwid2VicGFjazovL21lbnRvcnl4Ly4vbm9kZV9tb2R1bGVzL0BzdXBhYmFzZS9zdXBhYmFzZS1qcy9kaXN0L21vZHVsZS9saWIvdmVyc2lvbi5qcyIsIndlYnBhY2s6Ly9tZW50b3J5eC8uL25vZGVfbW9kdWxlcy9jcm9zcy1mZXRjaC9kaXN0L2Jyb3dzZXItcG9ueWZpbGwuanMiLCJ3ZWJwYWNrOi8vbWVudG9yeXgvLi9ub2RlX21vZHVsZXMvZXM1LWV4dC9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vbWVudG9yeXgvLi9ub2RlX21vZHVsZXMvd2Vic29ja2V0L2xpYi9icm93c2VyLmpzIiwid2VicGFjazovL21lbnRvcnl4Ly4vbm9kZV9tb2R1bGVzL3dlYnNvY2tldC9saWIvdmVyc2lvbi5qcyIsIndlYnBhY2s6Ly9tZW50b3J5eC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9tZW50b3J5eC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9tZW50b3J5eC93ZWJwYWNrL3J1bnRpbWUvY3JlYXRlIGZha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9tZW50b3J5eC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbWVudG9yeXgvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9tZW50b3J5eC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL21lbnRvcnl4Ly4vc3JjL1ByZXNlbnRlci9BdXRoZW50aWNhdGlvblByZXNlbnRlci9Vc2VyUmVnaXN0cmF0aW9uUHJlc2VudGVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuaW1wb3J0IHsgcmVzb2x2ZUZldGNoIH0gZnJvbSAnLi9oZWxwZXInO1xuaW1wb3J0IHsgRnVuY3Rpb25zRmV0Y2hFcnJvciwgRnVuY3Rpb25zSHR0cEVycm9yLCBGdW5jdGlvbnNSZWxheUVycm9yLCB9IGZyb20gJy4vdHlwZXMnO1xuZXhwb3J0IGNsYXNzIEZ1bmN0aW9uc0NsaWVudCB7XG4gICAgY29uc3RydWN0b3IodXJsLCB7IGhlYWRlcnMgPSB7fSwgY3VzdG9tRmV0Y2gsIH0gPSB7fSkge1xuICAgICAgICB0aGlzLnVybCA9IHVybDtcbiAgICAgICAgdGhpcy5oZWFkZXJzID0gaGVhZGVycztcbiAgICAgICAgdGhpcy5mZXRjaCA9IHJlc29sdmVGZXRjaChjdXN0b21GZXRjaCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFVwZGF0ZXMgdGhlIGF1dGhvcml6YXRpb24gaGVhZGVyXG4gICAgICogQHBhcmFtIHRva2VuIC0gdGhlIG5ldyBqd3QgdG9rZW4gc2VudCBpbiB0aGUgYXV0aG9yaXNhdGlvbiBoZWFkZXJcbiAgICAgKi9cbiAgICBzZXRBdXRoKHRva2VuKSB7XG4gICAgICAgIHRoaXMuaGVhZGVycy5BdXRob3JpemF0aW9uID0gYEJlYXJlciAke3Rva2VufWA7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEludm9rZXMgYSBmdW5jdGlvblxuICAgICAqIEBwYXJhbSBmdW5jdGlvbk5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgRnVuY3Rpb24gdG8gaW52b2tlLlxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gT3B0aW9ucyBmb3IgaW52b2tpbmcgdGhlIEZ1bmN0aW9uLlxuICAgICAqL1xuICAgIGludm9rZShmdW5jdGlvbk5hbWUsIG9wdGlvbnMgPSB7fSkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgaGVhZGVycywgbWV0aG9kLCBib2R5OiBmdW5jdGlvbkFyZ3MgfSA9IG9wdGlvbnM7XG4gICAgICAgICAgICAgICAgbGV0IF9oZWFkZXJzID0ge307XG4gICAgICAgICAgICAgICAgbGV0IGJvZHk7XG4gICAgICAgICAgICAgICAgaWYgKGZ1bmN0aW9uQXJncyAmJlxuICAgICAgICAgICAgICAgICAgICAoKGhlYWRlcnMgJiYgIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChoZWFkZXJzLCAnQ29udGVudC1UeXBlJykpIHx8ICFoZWFkZXJzKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoKHR5cGVvZiBCbG9iICE9PSAndW5kZWZpbmVkJyAmJiBmdW5jdGlvbkFyZ3MgaW5zdGFuY2VvZiBCbG9iKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb25BcmdzIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHdpbGwgd29yayBmb3IgRmlsZSBhcyBGaWxlIGluaGVyaXRzIEJsb2JcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFsc28gd29ya3MgZm9yIEFycmF5QnVmZmVyIGFzIGl0IGlzIHRoZSBzYW1lIHVuZGVybHlpbmcgc3RydWN0dXJlIGFzIGEgQmxvYlxuICAgICAgICAgICAgICAgICAgICAgICAgX2hlYWRlcnNbJ0NvbnRlbnQtVHlwZSddID0gJ2FwcGxpY2F0aW9uL29jdGV0LXN0cmVhbSc7XG4gICAgICAgICAgICAgICAgICAgICAgICBib2R5ID0gZnVuY3Rpb25BcmdzO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiBmdW5jdGlvbkFyZ3MgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBwbGFpbiBzdHJpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgIF9oZWFkZXJzWydDb250ZW50LVR5cGUnXSA9ICd0ZXh0L3BsYWluJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvZHkgPSBmdW5jdGlvbkFyZ3M7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIEZvcm1EYXRhICE9PSAndW5kZWZpbmVkJyAmJiBmdW5jdGlvbkFyZ3MgaW5zdGFuY2VvZiBGb3JtRGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZG9uJ3Qgc2V0IGNvbnRlbnQtdHlwZSBoZWFkZXJzXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBSZXF1ZXN0IHdpbGwgYXV0b21hdGljYWxseSBhZGQgdGhlIHJpZ2h0IGJvdW5kYXJ5IHZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICBib2R5ID0gZnVuY3Rpb25BcmdzO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZGVmYXVsdCwgYXNzdW1lIHRoaXMgaXMgSlNPTlxuICAgICAgICAgICAgICAgICAgICAgICAgX2hlYWRlcnNbJ0NvbnRlbnQtVHlwZSddID0gJ2FwcGxpY2F0aW9uL2pzb24nO1xuICAgICAgICAgICAgICAgICAgICAgICAgYm9keSA9IEpTT04uc3RyaW5naWZ5KGZ1bmN0aW9uQXJncyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSB5aWVsZCB0aGlzLmZldGNoKGAke3RoaXMudXJsfS8ke2Z1bmN0aW9uTmFtZX1gLCB7XG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDogbWV0aG9kIHx8ICdQT1NUJyxcbiAgICAgICAgICAgICAgICAgICAgLy8gaGVhZGVycyBwcmlvcml0eSBpcyAoaGlnaCB0byBsb3cpOlxuICAgICAgICAgICAgICAgICAgICAvLyAxLiBpbnZva2UtbGV2ZWwgaGVhZGVyc1xuICAgICAgICAgICAgICAgICAgICAvLyAyLiBjbGllbnQtbGV2ZWwgaGVhZGVyc1xuICAgICAgICAgICAgICAgICAgICAvLyAzLiBkZWZhdWx0IENvbnRlbnQtVHlwZSBoZWFkZXJcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyczogT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIF9oZWFkZXJzKSwgdGhpcy5oZWFkZXJzKSwgaGVhZGVycyksXG4gICAgICAgICAgICAgICAgICAgIGJvZHksXG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goKGZldGNoRXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEZ1bmN0aW9uc0ZldGNoRXJyb3IoZmV0Y2hFcnJvcik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgY29uc3QgaXNSZWxheUVycm9yID0gcmVzcG9uc2UuaGVhZGVycy5nZXQoJ3gtcmVsYXktZXJyb3InKTtcbiAgICAgICAgICAgICAgICBpZiAoaXNSZWxheUVycm9yICYmIGlzUmVsYXlFcnJvciA9PT0gJ3RydWUnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBGdW5jdGlvbnNSZWxheUVycm9yKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRnVuY3Rpb25zSHR0cEVycm9yKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGV0IHJlc3BvbnNlVHlwZSA9ICgoX2EgPSByZXNwb25zZS5oZWFkZXJzLmdldCgnQ29udGVudC1UeXBlJykpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6ICd0ZXh0L3BsYWluJykuc3BsaXQoJzsnKVswXS50cmltKCk7XG4gICAgICAgICAgICAgICAgbGV0IGRhdGE7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlVHlwZSA9PT0gJ2FwcGxpY2F0aW9uL2pzb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGEgPSB5aWVsZCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHJlc3BvbnNlVHlwZSA9PT0gJ2FwcGxpY2F0aW9uL29jdGV0LXN0cmVhbScpIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YSA9IHlpZWxkIHJlc3BvbnNlLmJsb2IoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAocmVzcG9uc2VUeXBlID09PSAnbXVsdGlwYXJ0L2Zvcm0tZGF0YScpIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YSA9IHlpZWxkIHJlc3BvbnNlLmZvcm1EYXRhKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBkZWZhdWx0IHRvIHRleHRcbiAgICAgICAgICAgICAgICAgICAgZGF0YSA9IHlpZWxkIHJlc3BvbnNlLnRleHQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YSwgZXJyb3I6IG51bGwgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IG51bGwsIGVycm9yIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUZ1bmN0aW9uc0NsaWVudC5qcy5tYXAiLCJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbmV4cG9ydCBjb25zdCByZXNvbHZlRmV0Y2ggPSAoY3VzdG9tRmV0Y2gpID0+IHtcbiAgICBsZXQgX2ZldGNoO1xuICAgIGlmIChjdXN0b21GZXRjaCkge1xuICAgICAgICBfZmV0Y2ggPSBjdXN0b21GZXRjaDtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGZldGNoID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICBfZmV0Y2ggPSAoLi4uYXJncykgPT4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7IHJldHVybiB5aWVsZCAoeWllbGQgaW1wb3J0KCdjcm9zcy1mZXRjaCcpKS5mZXRjaCguLi5hcmdzKTsgfSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBfZmV0Y2ggPSBmZXRjaDtcbiAgICB9XG4gICAgcmV0dXJuICguLi5hcmdzKSA9PiBfZmV0Y2goLi4uYXJncyk7XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aGVscGVyLmpzLm1hcCIsImV4cG9ydCBjbGFzcyBGdW5jdGlvbnNFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcihtZXNzYWdlLCBuYW1lID0gJ0Z1bmN0aW9uc0Vycm9yJywgY29udGV4dCkge1xuICAgICAgICBzdXBlcihtZXNzYWdlKTtcbiAgICAgICAgc3VwZXIubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gICAgfVxufVxuZXhwb3J0IGNsYXNzIEZ1bmN0aW9uc0ZldGNoRXJyb3IgZXh0ZW5kcyBGdW5jdGlvbnNFcnJvciB7XG4gICAgY29uc3RydWN0b3IoY29udGV4dCkge1xuICAgICAgICBzdXBlcignRmFpbGVkIHRvIHNlbmQgYSByZXF1ZXN0IHRvIHRoZSBFZGdlIEZ1bmN0aW9uJywgJ0Z1bmN0aW9uc0ZldGNoRXJyb3InLCBjb250ZXh0KTtcbiAgICB9XG59XG5leHBvcnQgY2xhc3MgRnVuY3Rpb25zUmVsYXlFcnJvciBleHRlbmRzIEZ1bmN0aW9uc0Vycm9yIHtcbiAgICBjb25zdHJ1Y3Rvcihjb250ZXh0KSB7XG4gICAgICAgIHN1cGVyKCdSZWxheSBFcnJvciBpbnZva2luZyB0aGUgRWRnZSBGdW5jdGlvbicsICdGdW5jdGlvbnNSZWxheUVycm9yJywgY29udGV4dCk7XG4gICAgfVxufVxuZXhwb3J0IGNsYXNzIEZ1bmN0aW9uc0h0dHBFcnJvciBleHRlbmRzIEZ1bmN0aW9uc0Vycm9yIHtcbiAgICBjb25zdHJ1Y3Rvcihjb250ZXh0KSB7XG4gICAgICAgIHN1cGVyKCdFZGdlIEZ1bmN0aW9uIHJldHVybmVkIGEgbm9uLTJ4eCBzdGF0dXMgY29kZScsICdGdW5jdGlvbnNIdHRwRXJyb3InLCBjb250ZXh0KTtcbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD10eXBlcy5qcy5tYXAiLCJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbnZhciBfX3Jlc3QgPSAodGhpcyAmJiB0aGlzLl9fcmVzdCkgfHwgZnVuY3Rpb24gKHMsIGUpIHtcbiAgICB2YXIgdCA9IHt9O1xuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxuICAgICAgICB0W3BdID0gc1twXTtcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcbiAgICAgICAgfVxuICAgIHJldHVybiB0O1xufTtcbmltcG9ydCB7IF9nZW5lcmF0ZUxpbmtSZXNwb25zZSwgX25vUmVzb2x2ZUpzb25SZXNwb25zZSwgX3JlcXVlc3QsIF91c2VyUmVzcG9uc2UsIH0gZnJvbSAnLi9saWIvZmV0Y2gnO1xuaW1wb3J0IHsgcmVzb2x2ZUZldGNoIH0gZnJvbSAnLi9saWIvaGVscGVycyc7XG5pbXBvcnQgeyBpc0F1dGhFcnJvciB9IGZyb20gJy4vbGliL2Vycm9ycyc7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHb1RydWVBZG1pbkFwaSB7XG4gICAgY29uc3RydWN0b3IoeyB1cmwgPSAnJywgaGVhZGVycyA9IHt9LCBmZXRjaCwgfSkge1xuICAgICAgICB0aGlzLnVybCA9IHVybDtcbiAgICAgICAgdGhpcy5oZWFkZXJzID0gaGVhZGVycztcbiAgICAgICAgdGhpcy5mZXRjaCA9IHJlc29sdmVGZXRjaChmZXRjaCk7XG4gICAgICAgIHRoaXMubWZhID0ge1xuICAgICAgICAgICAgbGlzdEZhY3RvcnM6IHRoaXMuX2xpc3RGYWN0b3JzLmJpbmQodGhpcyksXG4gICAgICAgICAgICBkZWxldGVGYWN0b3I6IHRoaXMuX2RlbGV0ZUZhY3Rvci5iaW5kKHRoaXMpLFxuICAgICAgICB9O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGEgbG9nZ2VkLWluIHNlc3Npb24uXG4gICAgICogQHBhcmFtIGp3dCBBIHZhbGlkLCBsb2dnZWQtaW4gSldULlxuICAgICAqL1xuICAgIHNpZ25PdXQoand0KSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHlpZWxkIF9yZXF1ZXN0KHRoaXMuZmV0Y2gsICdQT1NUJywgYCR7dGhpcy51cmx9L2xvZ291dGAsIHtcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxuICAgICAgICAgICAgICAgICAgICBqd3QsXG4gICAgICAgICAgICAgICAgICAgIG5vUmVzb2x2ZUpzb246IHRydWUsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogbnVsbCwgZXJyb3I6IG51bGwgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGlmIChpc0F1dGhFcnJvcihlcnJvcikpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogbnVsbCwgZXJyb3IgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZW5kcyBhbiBpbnZpdGUgbGluayB0byBhbiBlbWFpbCBhZGRyZXNzLlxuICAgICAqIEBwYXJhbSBlbWFpbCBUaGUgZW1haWwgYWRkcmVzcyBvZiB0aGUgdXNlci5cbiAgICAgKiBAcGFyYW0gb3B0aW9ucyBBZGRpdGlvbmFsIG9wdGlvbnMgdG8gYmUgaW5jbHVkZWQgd2hlbiBpbnZpdGluZy5cbiAgICAgKi9cbiAgICBpbnZpdGVVc2VyQnlFbWFpbChlbWFpbCwgb3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZCBfcmVxdWVzdCh0aGlzLmZldGNoLCAnUE9TVCcsIGAke3RoaXMudXJsfS9pbnZpdGVgLCB7XG4gICAgICAgICAgICAgICAgICAgIGJvZHk6IHsgZW1haWwsIGRhdGE6IG9wdGlvbnMuZGF0YSB9LFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgICAgICAgICAgICAgICAgIHJlZGlyZWN0VG86IG9wdGlvbnMucmVkaXJlY3RUbyxcbiAgICAgICAgICAgICAgICAgICAgeGZvcm06IF91c2VyUmVzcG9uc2UsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNBdXRoRXJyb3IoZXJyb3IpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IHsgdXNlcjogbnVsbCB9LCBlcnJvciB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdlbmVyYXRlcyBlbWFpbCBsaW5rcyBhbmQgT1RQcyB0byBiZSBzZW50IHZpYSBhIGN1c3RvbSBlbWFpbCBwcm92aWRlci5cbiAgICAgKiBAcGFyYW0gZW1haWwgVGhlIHVzZXIncyBlbWFpbC5cbiAgICAgKiBAcGFyYW0gb3B0aW9ucy5wYXNzd29yZCBVc2VyIHBhc3N3b3JkLiBGb3Igc2lnbnVwIG9ubHkuXG4gICAgICogQHBhcmFtIG9wdGlvbnMuZGF0YSBPcHRpb25hbCB1c2VyIG1ldGFkYXRhLiBGb3Igc2lnbnVwIG9ubHkuXG4gICAgICogQHBhcmFtIG9wdGlvbnMucmVkaXJlY3RUbyBUaGUgcmVkaXJlY3QgdXJsIHdoaWNoIHNob3VsZCBiZSBhcHBlbmRlZCB0byB0aGUgZ2VuZXJhdGVkIGxpbmtcbiAgICAgKi9cbiAgICBnZW5lcmF0ZUxpbmsocGFyYW1zKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgb3B0aW9ucyB9ID0gcGFyYW1zLCByZXN0ID0gX19yZXN0KHBhcmFtcywgW1wib3B0aW9uc1wiXSk7XG4gICAgICAgICAgICAgICAgY29uc3QgYm9keSA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgcmVzdCksIG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgIGlmICgnbmV3RW1haWwnIGluIHJlc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gcmVwbGFjZSBuZXdFbWFpbCB3aXRoIG5ld19lbWFpbCBpbiByZXF1ZXN0IGJvZHlcbiAgICAgICAgICAgICAgICAgICAgYm9keS5uZXdfZW1haWwgPSByZXN0ID09PSBudWxsIHx8IHJlc3QgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHJlc3QubmV3RW1haWw7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBib2R5WyduZXdFbWFpbCddO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4geWllbGQgX3JlcXVlc3QodGhpcy5mZXRjaCwgJ1BPU1QnLCBgJHt0aGlzLnVybH0vYWRtaW4vZ2VuZXJhdGVfbGlua2AsIHtcbiAgICAgICAgICAgICAgICAgICAgYm9keTogYm9keSxcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxuICAgICAgICAgICAgICAgICAgICB4Zm9ybTogX2dlbmVyYXRlTGlua1Jlc3BvbnNlLFxuICAgICAgICAgICAgICAgICAgICByZWRpcmVjdFRvOiBvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMucmVkaXJlY3RUbyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGlmIChpc0F1dGhFcnJvcihlcnJvcikpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXI6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3IsXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgLy8gVXNlciBBZG1pbiBBUElcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IHVzZXIuXG4gICAgICogVGhpcyBmdW5jdGlvbiBzaG91bGQgb25seSBiZSBjYWxsZWQgb24gYSBzZXJ2ZXIuIE5ldmVyIGV4cG9zZSB5b3VyIGBzZXJ2aWNlX3JvbGVgIGtleSBpbiB0aGUgYnJvd3Nlci5cbiAgICAgKi9cbiAgICBjcmVhdGVVc2VyKGF0dHJpYnV0ZXMpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkIF9yZXF1ZXN0KHRoaXMuZmV0Y2gsICdQT1NUJywgYCR7dGhpcy51cmx9L2FkbWluL3VzZXJzYCwge1xuICAgICAgICAgICAgICAgICAgICBib2R5OiBhdHRyaWJ1dGVzLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgICAgICAgICAgICAgICAgIHhmb3JtOiBfdXNlclJlc3BvbnNlLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzQXV0aEVycm9yKGVycm9yKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiB7IHVzZXI6IG51bGwgfSwgZXJyb3IgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgYSBsaXN0IG9mIHVzZXJzLlxuICAgICAqXG4gICAgICogVGhpcyBmdW5jdGlvbiBzaG91bGQgb25seSBiZSBjYWxsZWQgb24gYSBzZXJ2ZXIuIE5ldmVyIGV4cG9zZSB5b3VyIGBzZXJ2aWNlX3JvbGVgIGtleSBpbiB0aGUgYnJvd3Nlci5cbiAgICAgKiBAcGFyYW0gcGFyYW1zIEFuIG9iamVjdCB3aGljaCBzdXBwb3J0cyBgcGFnZWAgYW5kIGBwZXJQYWdlYCBhcyBudW1iZXJzLCB0byBhbHRlciB0aGUgcGFnaW5hdGVkIHJlc3VsdHMuXG4gICAgICovXG4gICAgbGlzdFVzZXJzKHBhcmFtcykge1xuICAgICAgICB2YXIgX2EsIF9iLCBfYywgX2QsIF9lLCBfZiwgX2c7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHBhZ2luYXRpb24gPSB7IG5leHRQYWdlOiBudWxsLCBsYXN0UGFnZTogMCwgdG90YWw6IDAgfTtcbiAgICAgICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IHlpZWxkIF9yZXF1ZXN0KHRoaXMuZmV0Y2gsICdHRVQnLCBgJHt0aGlzLnVybH0vYWRtaW4vdXNlcnNgLCB7XG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICAgICAgICAgICAgICAgICAgbm9SZXNvbHZlSnNvbjogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgcXVlcnk6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhZ2U6IChfYiA9IChfYSA9IHBhcmFtcyA9PT0gbnVsbCB8fCBwYXJhbXMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHBhcmFtcy5wYWdlKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EudG9TdHJpbmcoKSkgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDogJycsXG4gICAgICAgICAgICAgICAgICAgICAgICBwZXJfcGFnZTogKF9kID0gKF9jID0gcGFyYW1zID09PSBudWxsIHx8IHBhcmFtcyA9PT0gdm9pZCAwID8gdm9pZCAwIDogcGFyYW1zLnBlclBhZ2UpID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy50b1N0cmluZygpKSAhPT0gbnVsbCAmJiBfZCAhPT0gdm9pZCAwID8gX2QgOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgeGZvcm06IF9ub1Jlc29sdmVKc29uUmVzcG9uc2UsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmVycm9yKVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyByZXNwb25zZS5lcnJvcjtcbiAgICAgICAgICAgICAgICBjb25zdCB1c2VycyA9IHlpZWxkIHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgICAgICAgICBjb25zdCB0b3RhbCA9IChfZSA9IHJlc3BvbnNlLmhlYWRlcnMuZ2V0KCd4LXRvdGFsLWNvdW50JykpICE9PSBudWxsICYmIF9lICE9PSB2b2lkIDAgPyBfZSA6IDA7XG4gICAgICAgICAgICAgICAgY29uc3QgbGlua3MgPSAoX2cgPSAoX2YgPSByZXNwb25zZS5oZWFkZXJzLmdldCgnbGluaycpKSA9PT0gbnVsbCB8fCBfZiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Yuc3BsaXQoJywnKSkgIT09IG51bGwgJiYgX2cgIT09IHZvaWQgMCA/IF9nIDogW107XG4gICAgICAgICAgICAgICAgaWYgKGxpbmtzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgbGlua3MuZm9yRWFjaCgobGluaykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcGFnZSA9IHBhcnNlSW50KGxpbmsuc3BsaXQoJzsnKVswXS5zcGxpdCgnPScpWzFdLnN1YnN0cmluZygwLCAxKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZWwgPSBKU09OLnBhcnNlKGxpbmsuc3BsaXQoJzsnKVsxXS5zcGxpdCgnPScpWzFdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhZ2luYXRpb25bYCR7cmVsfVBhZ2VgXSA9IHBhZ2U7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBwYWdpbmF0aW9uLnRvdGFsID0gcGFyc2VJbnQodG90YWwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHVzZXJzKSwgcGFnaW5hdGlvbiksIGVycm9yOiBudWxsIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNBdXRoRXJyb3IoZXJyb3IpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IHsgdXNlcnM6IFtdIH0sIGVycm9yIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0IHVzZXIgYnkgaWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gdWlkIFRoZSB1c2VyJ3MgdW5pcXVlIGlkZW50aWZpZXJcbiAgICAgKlxuICAgICAqIFRoaXMgZnVuY3Rpb24gc2hvdWxkIG9ubHkgYmUgY2FsbGVkIG9uIGEgc2VydmVyLiBOZXZlciBleHBvc2UgeW91ciBgc2VydmljZV9yb2xlYCBrZXkgaW4gdGhlIGJyb3dzZXIuXG4gICAgICovXG4gICAgZ2V0VXNlckJ5SWQodWlkKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZCBfcmVxdWVzdCh0aGlzLmZldGNoLCAnR0VUJywgYCR7dGhpcy51cmx9L2FkbWluL3VzZXJzLyR7dWlkfWAsIHtcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxuICAgICAgICAgICAgICAgICAgICB4Zm9ybTogX3VzZXJSZXNwb25zZSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGlmIChpc0F1dGhFcnJvcihlcnJvcikpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogeyB1c2VyOiBudWxsIH0sIGVycm9yIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVXBkYXRlcyB0aGUgdXNlciBkYXRhLlxuICAgICAqXG4gICAgICogQHBhcmFtIGF0dHJpYnV0ZXMgVGhlIGRhdGEgeW91IHdhbnQgdG8gdXBkYXRlLlxuICAgICAqXG4gICAgICogVGhpcyBmdW5jdGlvbiBzaG91bGQgb25seSBiZSBjYWxsZWQgb24gYSBzZXJ2ZXIuIE5ldmVyIGV4cG9zZSB5b3VyIGBzZXJ2aWNlX3JvbGVgIGtleSBpbiB0aGUgYnJvd3Nlci5cbiAgICAgKi9cbiAgICB1cGRhdGVVc2VyQnlJZCh1aWQsIGF0dHJpYnV0ZXMpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkIF9yZXF1ZXN0KHRoaXMuZmV0Y2gsICdQVVQnLCBgJHt0aGlzLnVybH0vYWRtaW4vdXNlcnMvJHt1aWR9YCwge1xuICAgICAgICAgICAgICAgICAgICBib2R5OiBhdHRyaWJ1dGVzLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgICAgICAgICAgICAgICAgIHhmb3JtOiBfdXNlclJlc3BvbnNlLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzQXV0aEVycm9yKGVycm9yKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiB7IHVzZXI6IG51bGwgfSwgZXJyb3IgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBEZWxldGUgYSB1c2VyLiBSZXF1aXJlcyBhIGBzZXJ2aWNlX3JvbGVgIGtleS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBpZCBUaGUgdXNlciBpZCB5b3Ugd2FudCB0byByZW1vdmUuXG4gICAgICogQHBhcmFtIHNob3VsZFNvZnREZWxldGUgSWYgdHJ1ZSwgdGhlbiB0aGUgdXNlciB3aWxsIGJlIHNvZnQtZGVsZXRlZCBmcm9tIHRoZSBhdXRoIHNjaGVtYS5cbiAgICAgKiBEZWZhdWx0cyB0byBmYWxzZSBmb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eS5cbiAgICAgKlxuICAgICAqIFRoaXMgZnVuY3Rpb24gc2hvdWxkIG9ubHkgYmUgY2FsbGVkIG9uIGEgc2VydmVyLiBOZXZlciBleHBvc2UgeW91ciBgc2VydmljZV9yb2xlYCBrZXkgaW4gdGhlIGJyb3dzZXIuXG4gICAgICovXG4gICAgZGVsZXRlVXNlcihpZCwgc2hvdWxkU29mdERlbGV0ZSA9IGZhbHNlKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZCBfcmVxdWVzdCh0aGlzLmZldGNoLCAnREVMRVRFJywgYCR7dGhpcy51cmx9L2FkbWluL3VzZXJzLyR7aWR9YCwge1xuICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgICAgICAgICAgICAgICAgIGJvZHk6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNob3VsZF9zb2Z0X2RlbGV0ZTogc2hvdWxkU29mdERlbGV0ZSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgeGZvcm06IF91c2VyUmVzcG9uc2UsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNBdXRoRXJyb3IoZXJyb3IpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IHsgdXNlcjogbnVsbCB9LCBlcnJvciB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIF9saXN0RmFjdG9ycyhwYXJhbXMpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBkYXRhLCBlcnJvciB9ID0geWllbGQgX3JlcXVlc3QodGhpcy5mZXRjaCwgJ0dFVCcsIGAke3RoaXMudXJsfS9hZG1pbi91c2Vycy8ke3BhcmFtcy51c2VySWR9L2ZhY3RvcnNgLCB7XG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICAgICAgICAgICAgICAgICAgeGZvcm06IChmYWN0b3JzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiB7IGZhY3RvcnMgfSwgZXJyb3I6IG51bGwgfTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhLCBlcnJvciB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzQXV0aEVycm9yKGVycm9yKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiBudWxsLCBlcnJvciB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIF9kZWxldGVGYWN0b3IocGFyYW1zKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSB5aWVsZCBfcmVxdWVzdCh0aGlzLmZldGNoLCAnREVMRVRFJywgYCR7dGhpcy51cmx9L2FkbWluL3VzZXJzLyR7cGFyYW1zLnVzZXJJZH0vZmFjdG9ycy8ke3BhcmFtcy5pZH1gLCB7XG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhLCBlcnJvcjogbnVsbCB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzQXV0aEVycm9yKGVycm9yKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiBudWxsLCBlcnJvciB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9R29UcnVlQWRtaW5BcGkuanMubWFwIiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5pbXBvcnQgR29UcnVlQWRtaW5BcGkgZnJvbSAnLi9Hb1RydWVBZG1pbkFwaSc7XG5pbXBvcnQgeyBERUZBVUxUX0hFQURFUlMsIEVYUElSWV9NQVJHSU4sIEdPVFJVRV9VUkwsIFNUT1JBR0VfS0VZIH0gZnJvbSAnLi9saWIvY29uc3RhbnRzJztcbmltcG9ydCB7IEF1dGhJbXBsaWNpdEdyYW50UmVkaXJlY3RFcnJvciwgQXV0aFBLQ0VHcmFudENvZGVFeGNoYW5nZUVycm9yLCBBdXRoSW52YWxpZENyZWRlbnRpYWxzRXJyb3IsIEF1dGhSZXRyeWFibGVGZXRjaEVycm9yLCBBdXRoU2Vzc2lvbk1pc3NpbmdFcnJvciwgQXV0aFVua25vd25FcnJvciwgaXNBdXRoQXBpRXJyb3IsIGlzQXV0aEVycm9yLCB9IGZyb20gJy4vbGliL2Vycm9ycyc7XG5pbXBvcnQgeyBfcmVxdWVzdCwgX3Nlc3Npb25SZXNwb25zZSwgX3VzZXJSZXNwb25zZSwgX3Nzb1Jlc3BvbnNlIH0gZnJvbSAnLi9saWIvZmV0Y2gnO1xuaW1wb3J0IHsgZGVjb2RlSldUUGF5bG9hZCwgRGVmZXJyZWQsIGdldEl0ZW1Bc3luYywgZ2V0UGFyYW1ldGVyQnlOYW1lLCBpc0Jyb3dzZXIsIHJlbW92ZUl0ZW1Bc3luYywgcmVzb2x2ZUZldGNoLCBzZXRJdGVtQXN5bmMsIHV1aWQsIHJldHJ5YWJsZSwgc2xlZXAsIGdlbmVyYXRlUEtDRVZlcmlmaWVyLCBnZW5lcmF0ZVBLQ0VDaGFsbGVuZ2UsIH0gZnJvbSAnLi9saWIvaGVscGVycyc7XG5pbXBvcnQgbG9jYWxTdG9yYWdlQWRhcHRlciBmcm9tICcuL2xpYi9sb2NhbC1zdG9yYWdlJztcbmltcG9ydCB7IHBvbHlmaWxsR2xvYmFsVGhpcyB9IGZyb20gJy4vbGliL3BvbHlmaWxscyc7XG5wb2x5ZmlsbEdsb2JhbFRoaXMoKTsgLy8gTWFrZSBcImdsb2JhbFRoaXNcIiBhdmFpbGFibGVcbmNvbnN0IERFRkFVTFRfT1BUSU9OUyA9IHtcbiAgICB1cmw6IEdPVFJVRV9VUkwsXG4gICAgc3RvcmFnZUtleTogU1RPUkFHRV9LRVksXG4gICAgYXV0b1JlZnJlc2hUb2tlbjogdHJ1ZSxcbiAgICBwZXJzaXN0U2Vzc2lvbjogdHJ1ZSxcbiAgICBkZXRlY3RTZXNzaW9uSW5Vcmw6IHRydWUsXG4gICAgaGVhZGVyczogREVGQVVMVF9IRUFERVJTLFxuICAgIGZsb3dUeXBlOiAnaW1wbGljaXQnLFxufTtcbi8qKiBDdXJyZW50IHNlc3Npb24gd2lsbCBiZSBjaGVja2VkIGZvciByZWZyZXNoIGF0IHRoaXMgaW50ZXJ2YWwuICovXG5jb25zdCBBVVRPX1JFRlJFU0hfVElDS19EVVJBVElPTiA9IDMwICogMTAwMDtcbi8qKlxuICogQSB0b2tlbiByZWZyZXNoIHdpbGwgYmUgYXR0ZW1wdGVkIHRoaXMgbWFueSB0aWNrcyBiZWZvcmUgdGhlIGN1cnJlbnQgc2Vzc2lvbiBleHBpcmVzLiAqL1xuY29uc3QgQVVUT19SRUZSRVNIX1RJQ0tfVEhSRVNIT0xEID0gMztcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdvVHJ1ZUNsaWVudCB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgbmV3IGNsaWVudCBmb3IgdXNlIGluIHRoZSBicm93c2VyLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlRW1pdHRlcnMgPSBuZXcgTWFwKCk7XG4gICAgICAgIHRoaXMuYXV0b1JlZnJlc2hUaWNrZXIgPSBudWxsO1xuICAgICAgICB0aGlzLnZpc2liaWxpdHlDaGFuZ2VkQ2FsbGJhY2sgPSBudWxsO1xuICAgICAgICB0aGlzLnJlZnJlc2hpbmdEZWZlcnJlZCA9IG51bGw7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBLZWVwcyB0cmFjayBvZiB0aGUgYXN5bmMgY2xpZW50IGluaXRpYWxpemF0aW9uLlxuICAgICAgICAgKiBXaGVuIG51bGwgb3Igbm90IHlldCByZXNvbHZlZCB0aGUgYXV0aCBzdGF0ZSBpcyBgdW5rbm93bmBcbiAgICAgICAgICogT25jZSByZXNvbHZlZCB0aGUgdGhlIGF1dGggc3RhdGUgaXMga25vd24gYW5kIGl0J3Mgc2F2ZSB0byBjYWxsIGFueSBmdXJ0aGVyIGNsaWVudCBtZXRob2RzLlxuICAgICAgICAgKiBLZWVwIGV4dHJhIGNhcmUgdG8gbmV2ZXIgcmVqZWN0IG9yIHRocm93IHVuY2F1Z2h0IGVycm9yc1xuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5pbml0aWFsaXplUHJvbWlzZSA9IG51bGw7XG4gICAgICAgIHRoaXMuZGV0ZWN0U2Vzc2lvbkluVXJsID0gdHJ1ZTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFVzZWQgdG8gYnJvYWRjYXN0IHN0YXRlIGNoYW5nZSBldmVudHMgdG8gb3RoZXIgdGFicyBsaXN0ZW5pbmcuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmJyb2FkY2FzdENoYW5uZWwgPSBudWxsO1xuICAgICAgICBjb25zdCBzZXR0aW5ncyA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgREVGQVVMVF9PUFRJT05TKSwgb3B0aW9ucyk7XG4gICAgICAgIHRoaXMuaW5NZW1vcnlTZXNzaW9uID0gbnVsbDtcbiAgICAgICAgdGhpcy5zdG9yYWdlS2V5ID0gc2V0dGluZ3Muc3RvcmFnZUtleTtcbiAgICAgICAgdGhpcy5hdXRvUmVmcmVzaFRva2VuID0gc2V0dGluZ3MuYXV0b1JlZnJlc2hUb2tlbjtcbiAgICAgICAgdGhpcy5wZXJzaXN0U2Vzc2lvbiA9IHNldHRpbmdzLnBlcnNpc3RTZXNzaW9uO1xuICAgICAgICB0aGlzLnN0b3JhZ2UgPSBzZXR0aW5ncy5zdG9yYWdlIHx8IGxvY2FsU3RvcmFnZUFkYXB0ZXI7XG4gICAgICAgIHRoaXMuYWRtaW4gPSBuZXcgR29UcnVlQWRtaW5BcGkoe1xuICAgICAgICAgICAgdXJsOiBzZXR0aW5ncy51cmwsXG4gICAgICAgICAgICBoZWFkZXJzOiBzZXR0aW5ncy5oZWFkZXJzLFxuICAgICAgICAgICAgZmV0Y2g6IHNldHRpbmdzLmZldGNoLFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy51cmwgPSBzZXR0aW5ncy51cmw7XG4gICAgICAgIHRoaXMuaGVhZGVycyA9IHNldHRpbmdzLmhlYWRlcnM7XG4gICAgICAgIHRoaXMuZmV0Y2ggPSByZXNvbHZlRmV0Y2goc2V0dGluZ3MuZmV0Y2gpO1xuICAgICAgICB0aGlzLmRldGVjdFNlc3Npb25JblVybCA9IHNldHRpbmdzLmRldGVjdFNlc3Npb25JblVybDtcbiAgICAgICAgdGhpcy5mbG93VHlwZSA9IHNldHRpbmdzLmZsb3dUeXBlO1xuICAgICAgICB0aGlzLm1mYSA9IHtcbiAgICAgICAgICAgIHZlcmlmeTogdGhpcy5fdmVyaWZ5LmJpbmQodGhpcyksXG4gICAgICAgICAgICBlbnJvbGw6IHRoaXMuX2Vucm9sbC5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgdW5lbnJvbGw6IHRoaXMuX3VuZW5yb2xsLmJpbmQodGhpcyksXG4gICAgICAgICAgICBjaGFsbGVuZ2U6IHRoaXMuX2NoYWxsZW5nZS5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgbGlzdEZhY3RvcnM6IHRoaXMuX2xpc3RGYWN0b3JzLmJpbmQodGhpcyksXG4gICAgICAgICAgICBjaGFsbGVuZ2VBbmRWZXJpZnk6IHRoaXMuX2NoYWxsZW5nZUFuZFZlcmlmeS5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgZ2V0QXV0aGVudGljYXRvckFzc3VyYW5jZUxldmVsOiB0aGlzLl9nZXRBdXRoZW50aWNhdG9yQXNzdXJhbmNlTGV2ZWwuYmluZCh0aGlzKSxcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKGlzQnJvd3NlcigpICYmIGdsb2JhbFRoaXMuQnJvYWRjYXN0Q2hhbm5lbCAmJiB0aGlzLnBlcnNpc3RTZXNzaW9uICYmIHRoaXMuc3RvcmFnZUtleSkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICB0aGlzLmJyb2FkY2FzdENoYW5uZWwgPSBuZXcgZ2xvYmFsVGhpcy5Ccm9hZGNhc3RDaGFubmVsKHRoaXMuc3RvcmFnZUtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0ZhaWxlZCB0byBjcmVhdGUgYSBuZXcgQnJvYWRjYXN0Q2hhbm5lbCwgbXVsdGktdGFiIHN0YXRlIGNoYW5nZXMgd2lsbCBub3QgYmUgYXZhaWxhYmxlJywgZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAoX2EgPSB0aGlzLmJyb2FkY2FzdENoYW5uZWwpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbm90aWZ5QWxsU3Vic2NyaWJlcnMoZXZlbnQuZGF0YS5ldmVudCwgZXZlbnQuZGF0YS5zZXNzaW9uLCBmYWxzZSk7IC8vIGJyb2FkY2FzdCA9IGZhbHNlIHNvIHdlIGRvbid0IGdldCBhbiBlbmRsZXNzIGxvb3Agb2YgbWVzc2FnZXNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZSgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplcyB0aGUgY2xpZW50IHNlc3Npb24gZWl0aGVyIGZyb20gdGhlIHVybCBvciBmcm9tIHN0b3JhZ2UuXG4gICAgICogVGhpcyBtZXRob2QgaXMgYXV0b21hdGljYWxseSBjYWxsZWQgd2hlbiBpbnN0YW50aWF0aW5nIHRoZSBjbGllbnQsIGJ1dCBzaG91bGQgYWxzbyBiZSBjYWxsZWRcbiAgICAgKiBtYW51YWxseSB3aGVuIGNoZWNraW5nIGZvciBhbiBlcnJvciBmcm9tIGFuIGF1dGggcmVkaXJlY3QgKG9hdXRoLCBtYWdpY2xpbmssIHBhc3N3b3JkIHJlY292ZXJ5LCBldGMpLlxuICAgICAqL1xuICAgIGluaXRpYWxpemUoKSB7XG4gICAgICAgIGlmICghdGhpcy5pbml0aWFsaXplUHJvbWlzZSkge1xuICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplUHJvbWlzZSA9IHRoaXMuX2luaXRpYWxpemUoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5pbml0aWFsaXplUHJvbWlzZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSU1QT1JUQU5UOlxuICAgICAqIDEuIE5ldmVyIHRocm93IGluIHRoaXMgbWV0aG9kLCBhcyBpdCBpcyBjYWxsZWQgZnJvbSB0aGUgY29uc3RydWN0b3JcbiAgICAgKiAyLiBOZXZlciByZXR1cm4gYSBzZXNzaW9uIGZyb20gdGhpcyBtZXRob2QgYXMgaXQgd291bGQgYmUgY2FjaGVkIG92ZXJcbiAgICAgKiAgICB0aGUgd2hvbGUgbGlmZXRpbWUgb2YgdGhlIGNsaWVudFxuICAgICAqL1xuICAgIF9pbml0aWFsaXplKCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuaW5pdGlhbGl6ZVByb21pc2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pbml0aWFsaXplUHJvbWlzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaXNQS0NFRmxvdyA9IHlpZWxkIHRoaXMuX2lzUEtDRUZsb3coKTtcbiAgICAgICAgICAgICAgICBpZiAoKHRoaXMuZGV0ZWN0U2Vzc2lvbkluVXJsICYmIHRoaXMuX2lzSW1wbGljaXRHcmFudEZsb3coKSkgfHwgaXNQS0NFRmxvdykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB7IGRhdGEsIGVycm9yIH0gPSB5aWVsZCB0aGlzLl9nZXRTZXNzaW9uRnJvbVVybChpc1BLQ0VGbG93KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBmYWlsZWQgbG9naW4gYXR0ZW1wdCB2aWEgdXJsLFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcmVtb3ZlIG9sZCBzZXNzaW9uIGFzIGluIHZlcmlmeU90cCwgc2lnblVwIGFuZCBzaWduSW5XaXRoKlxuICAgICAgICAgICAgICAgICAgICAgICAgeWllbGQgdGhpcy5fcmVtb3ZlU2Vzc2lvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgZXJyb3IgfTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjb25zdCB7IHNlc3Npb24sIHJlZGlyZWN0VHlwZSB9ID0gZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgeWllbGQgdGhpcy5fc2F2ZVNlc3Npb24oc2Vzc2lvbik7XG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlZGlyZWN0VHlwZSA9PT0gJ3JlY292ZXJ5Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX25vdGlmeUFsbFN1YnNjcmliZXJzKCdQQVNTV09SRF9SRUNPVkVSWScsIHNlc3Npb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbm90aWZ5QWxsU3Vic2NyaWJlcnMoJ1NJR05FRF9JTicsIHNlc3Npb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgZXJyb3I6IG51bGwgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gbm8gbG9naW4gYXR0ZW1wdCB2aWEgY2FsbGJhY2sgdXJsIHRyeSB0byByZWNvdmVyIHNlc3Npb24gZnJvbSBzdG9yYWdlXG4gICAgICAgICAgICAgICAgeWllbGQgdGhpcy5fcmVjb3ZlckFuZFJlZnJlc2goKTtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBlcnJvcjogbnVsbCB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzQXV0aEVycm9yKGVycm9yKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBlcnJvciB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBlcnJvcjogbmV3IEF1dGhVbmtub3duRXJyb3IoJ1VuZXhwZWN0ZWQgZXJyb3IgZHVyaW5nIGluaXRpYWxpemF0aW9uJywgZXJyb3IpLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICB5aWVsZCB0aGlzLl9oYW5kbGVWaXNpYmlsaXR5Q2hhbmdlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IHVzZXIuXG4gICAgICpcbiAgICAgKiBCZSBhd2FyZSB0aGF0IGlmIGEgdXNlciBhY2NvdW50IGV4aXN0cyBpbiB0aGUgc3lzdGVtIHlvdSBtYXkgZ2V0IGJhY2sgYW5cbiAgICAgKiBlcnJvciBtZXNzYWdlIHRoYXQgYXR0ZW1wdHMgdG8gaGlkZSB0aGlzIGluZm9ybWF0aW9uIGZyb20gdGhlIHVzZXIuXG4gICAgICogVGhpcyBtZXRob2QgaGFzIHN1cHBvcnQgZm9yIFBLQ0UgdmlhIGVtYWlsIHNpZ251cHMuIFRoZSBQS0NFIGZsb3cgY2Fubm90IGJlIHVzZWQgd2hlbiBhdXRvY29uZmlybSBpcyBlbmFibGVkLlxuICAgICAqXG4gICAgICogQHJldHVybnMgQSBsb2dnZWQtaW4gc2Vzc2lvbiBpZiB0aGUgc2VydmVyIGhhcyBcImF1dG9jb25maXJtXCIgT05cbiAgICAgKiBAcmV0dXJucyBBIHVzZXIgaWYgdGhlIHNlcnZlciBoYXMgXCJhdXRvY29uZmlybVwiIE9GRlxuICAgICAqL1xuICAgIHNpZ25VcChjcmVkZW50aWFscykge1xuICAgICAgICB2YXIgX2EsIF9iLCBfYztcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgeWllbGQgdGhpcy5fcmVtb3ZlU2Vzc2lvbigpO1xuICAgICAgICAgICAgICAgIGxldCByZXM7XG4gICAgICAgICAgICAgICAgaWYgKCdlbWFpbCcgaW4gY3JlZGVudGlhbHMpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgeyBlbWFpbCwgcGFzc3dvcmQsIG9wdGlvbnMgfSA9IGNyZWRlbnRpYWxzO1xuICAgICAgICAgICAgICAgICAgICBsZXQgY29kZUNoYWxsZW5nZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjb2RlQ2hhbGxlbmdlTWV0aG9kID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZmxvd1R5cGUgPT09ICdwa2NlJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY29kZVZlcmlmaWVyID0gZ2VuZXJhdGVQS0NFVmVyaWZpZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHlpZWxkIHNldEl0ZW1Bc3luYyh0aGlzLnN0b3JhZ2UsIGAke3RoaXMuc3RvcmFnZUtleX0tY29kZS12ZXJpZmllcmAsIGNvZGVWZXJpZmllcik7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2RlQ2hhbGxlbmdlID0geWllbGQgZ2VuZXJhdGVQS0NFQ2hhbGxlbmdlKGNvZGVWZXJpZmllcik7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2RlQ2hhbGxlbmdlTWV0aG9kID0gY29kZVZlcmlmaWVyID09PSBjb2RlQ2hhbGxlbmdlID8gJ3BsYWluJyA6ICdzMjU2JztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXMgPSB5aWVsZCBfcmVxdWVzdCh0aGlzLmZldGNoLCAnUE9TVCcsIGAke3RoaXMudXJsfS9zaWdudXBgLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgICAgICAgICAgICAgICAgICAgICByZWRpcmVjdFRvOiBvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMuZW1haWxSZWRpcmVjdFRvLFxuICAgICAgICAgICAgICAgICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVtYWlsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhc3N3b3JkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IChfYSA9IG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5kYXRhKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnb3RydWVfbWV0YV9zZWN1cml0eTogeyBjYXB0Y2hhX3Rva2VuOiBvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMuY2FwdGNoYVRva2VuIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29kZV9jaGFsbGVuZ2U6IGNvZGVDaGFsbGVuZ2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29kZV9jaGFsbGVuZ2VfbWV0aG9kOiBjb2RlQ2hhbGxlbmdlTWV0aG9kLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHhmb3JtOiBfc2Vzc2lvblJlc3BvbnNlLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoJ3Bob25lJyBpbiBjcmVkZW50aWFscykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB7IHBob25lLCBwYXNzd29yZCwgb3B0aW9ucyB9ID0gY3JlZGVudGlhbHM7XG4gICAgICAgICAgICAgICAgICAgIHJlcyA9IHlpZWxkIF9yZXF1ZXN0KHRoaXMuZmV0Y2gsICdQT1NUJywgYCR7dGhpcy51cmx9L3NpZ251cGAsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvZHk6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwaG9uZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXNzd29yZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiAoX2IgPSBvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMuZGF0YSkgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDoge30sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbm5lbDogKF9jID0gb3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLmNoYW5uZWwpICE9PSBudWxsICYmIF9jICE9PSB2b2lkIDAgPyBfYyA6ICdzbXMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdvdHJ1ZV9tZXRhX3NlY3VyaXR5OiB7IGNhcHRjaGFfdG9rZW46IG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5jYXB0Y2hhVG9rZW4gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB4Zm9ybTogX3Nlc3Npb25SZXNwb25zZSxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQXV0aEludmFsaWRDcmVkZW50aWFsc0Vycm9yKCdZb3UgbXVzdCBwcm92aWRlIGVpdGhlciBhbiBlbWFpbCBvciBwaG9uZSBudW1iZXIgYW5kIGEgcGFzc3dvcmQnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgeyBkYXRhLCBlcnJvciB9ID0gcmVzO1xuICAgICAgICAgICAgICAgIGlmIChlcnJvciB8fCAhZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiB7IHVzZXI6IG51bGwsIHNlc3Npb246IG51bGwgfSwgZXJyb3I6IGVycm9yIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IHNlc3Npb24gPSBkYXRhLnNlc3Npb247XG4gICAgICAgICAgICAgICAgY29uc3QgdXNlciA9IGRhdGEudXNlcjtcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5zZXNzaW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIHlpZWxkIHRoaXMuX3NhdmVTZXNzaW9uKGRhdGEuc2Vzc2lvbik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX25vdGlmeUFsbFN1YnNjcmliZXJzKCdTSUdORURfSU4nLCBzZXNzaW9uKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogeyB1c2VyLCBzZXNzaW9uIH0sIGVycm9yOiBudWxsIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNBdXRoRXJyb3IoZXJyb3IpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IHsgdXNlcjogbnVsbCwgc2Vzc2lvbjogbnVsbCB9LCBlcnJvciB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIExvZyBpbiBhbiBleGlzdGluZyB1c2VyIHdpdGggYW4gZW1haWwgYW5kIHBhc3N3b3JkIG9yIHBob25lIGFuZCBwYXNzd29yZC5cbiAgICAgKlxuICAgICAqIEJlIGF3YXJlIHRoYXQgeW91IG1heSBnZXQgYmFjayBhbiBlcnJvciBtZXNzYWdlIHRoYXQgd2lsbCBub3QgZGlzdGluZ3Vpc2hcbiAgICAgKiBiZXR3ZWVuIHRoZSBjYXNlcyB3aGVyZSB0aGUgYWNjb3VudCBkb2VzIG5vdCBleGlzdCBvciB0aGF0IHRoZVxuICAgICAqIGVtYWlsL3Bob25lIGFuZCBwYXNzd29yZCBjb21iaW5hdGlvbiBpcyB3cm9uZyBvciB0aGF0IHRoZSBhY2NvdW50IGNhbiBvbmx5XG4gICAgICogYmUgYWNjZXNzZWQgdmlhIHNvY2lhbCBsb2dpbi5cbiAgICAgKi9cbiAgICBzaWduSW5XaXRoUGFzc3dvcmQoY3JlZGVudGlhbHMpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgeWllbGQgdGhpcy5fcmVtb3ZlU2Vzc2lvbigpO1xuICAgICAgICAgICAgICAgIGxldCByZXM7XG4gICAgICAgICAgICAgICAgaWYgKCdlbWFpbCcgaW4gY3JlZGVudGlhbHMpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgeyBlbWFpbCwgcGFzc3dvcmQsIG9wdGlvbnMgfSA9IGNyZWRlbnRpYWxzO1xuICAgICAgICAgICAgICAgICAgICByZXMgPSB5aWVsZCBfcmVxdWVzdCh0aGlzLmZldGNoLCAnUE9TVCcsIGAke3RoaXMudXJsfS90b2tlbj9ncmFudF90eXBlPXBhc3N3b3JkYCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxuICAgICAgICAgICAgICAgICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVtYWlsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhc3N3b3JkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdvdHJ1ZV9tZXRhX3NlY3VyaXR5OiB7IGNhcHRjaGFfdG9rZW46IG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5jYXB0Y2hhVG9rZW4gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB4Zm9ybTogX3Nlc3Npb25SZXNwb25zZSxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKCdwaG9uZScgaW4gY3JlZGVudGlhbHMpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgeyBwaG9uZSwgcGFzc3dvcmQsIG9wdGlvbnMgfSA9IGNyZWRlbnRpYWxzO1xuICAgICAgICAgICAgICAgICAgICByZXMgPSB5aWVsZCBfcmVxdWVzdCh0aGlzLmZldGNoLCAnUE9TVCcsIGAke3RoaXMudXJsfS90b2tlbj9ncmFudF90eXBlPXBhc3N3b3JkYCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxuICAgICAgICAgICAgICAgICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBob25lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhc3N3b3JkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdvdHJ1ZV9tZXRhX3NlY3VyaXR5OiB7IGNhcHRjaGFfdG9rZW46IG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5jYXB0Y2hhVG9rZW4gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB4Zm9ybTogX3Nlc3Npb25SZXNwb25zZSxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQXV0aEludmFsaWRDcmVkZW50aWFsc0Vycm9yKCdZb3UgbXVzdCBwcm92aWRlIGVpdGhlciBhbiBlbWFpbCBvciBwaG9uZSBudW1iZXIgYW5kIGEgcGFzc3dvcmQnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgeyBkYXRhLCBlcnJvciB9ID0gcmVzO1xuICAgICAgICAgICAgICAgIGlmIChlcnJvciB8fCAhZGF0YSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogeyB1c2VyOiBudWxsLCBzZXNzaW9uOiBudWxsIH0sIGVycm9yIH07XG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuc2Vzc2lvbikge1xuICAgICAgICAgICAgICAgICAgICB5aWVsZCB0aGlzLl9zYXZlU2Vzc2lvbihkYXRhLnNlc3Npb24pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9ub3RpZnlBbGxTdWJzY3JpYmVycygnU0lHTkVEX0lOJywgZGF0YS5zZXNzaW9uKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YSwgZXJyb3IgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGlmIChpc0F1dGhFcnJvcihlcnJvcikpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogeyB1c2VyOiBudWxsLCBzZXNzaW9uOiBudWxsIH0sIGVycm9yIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogTG9nIGluIGFuIGV4aXN0aW5nIHVzZXIgdmlhIGEgdGhpcmQtcGFydHkgcHJvdmlkZXIuXG4gICAgICogVGhpcyBtZXRob2Qgc3VwcG9ydHMgdGhlIFBLQ0UgZmxvdy5cbiAgICAgKi9cbiAgICBzaWduSW5XaXRoT0F1dGgoY3JlZGVudGlhbHMpIHtcbiAgICAgICAgdmFyIF9hLCBfYiwgX2MsIF9kO1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgeWllbGQgdGhpcy5fcmVtb3ZlU2Vzc2lvbigpO1xuICAgICAgICAgICAgcmV0dXJuIHlpZWxkIHRoaXMuX2hhbmRsZVByb3ZpZGVyU2lnbkluKGNyZWRlbnRpYWxzLnByb3ZpZGVyLCB7XG4gICAgICAgICAgICAgICAgcmVkaXJlY3RUbzogKF9hID0gY3JlZGVudGlhbHMub3B0aW9ucykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnJlZGlyZWN0VG8sXG4gICAgICAgICAgICAgICAgc2NvcGVzOiAoX2IgPSBjcmVkZW50aWFscy5vcHRpb25zKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Iuc2NvcGVzLFxuICAgICAgICAgICAgICAgIHF1ZXJ5UGFyYW1zOiAoX2MgPSBjcmVkZW50aWFscy5vcHRpb25zKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MucXVlcnlQYXJhbXMsXG4gICAgICAgICAgICAgICAgc2tpcEJyb3dzZXJSZWRpcmVjdDogKF9kID0gY3JlZGVudGlhbHMub3B0aW9ucykgPT09IG51bGwgfHwgX2QgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9kLnNraXBCcm93c2VyUmVkaXJlY3QsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIExvZyBpbiBhbiBleGlzdGluZyB1c2VyIGJ5IGV4Y2hhbmdpbmcgYW4gQXV0aCBDb2RlIGlzc3VlZCBkdXJpbmcgdGhlIFBLQ0UgZmxvdy5cbiAgICAgKi9cbiAgICBleGNoYW5nZUNvZGVGb3JTZXNzaW9uKGF1dGhDb2RlKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICBjb25zdCBjb2RlVmVyaWZpZXIgPSB5aWVsZCBnZXRJdGVtQXN5bmModGhpcy5zdG9yYWdlLCBgJHt0aGlzLnN0b3JhZ2VLZXl9LWNvZGUtdmVyaWZpZXJgKTtcbiAgICAgICAgICAgIGNvbnN0IHsgZGF0YSwgZXJyb3IgfSA9IHlpZWxkIF9yZXF1ZXN0KHRoaXMuZmV0Y2gsICdQT1NUJywgYCR7dGhpcy51cmx9L3Rva2VuP2dyYW50X3R5cGU9cGtjZWAsIHtcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgICAgICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgICAgICAgICBhdXRoX2NvZGU6IGF1dGhDb2RlLFxuICAgICAgICAgICAgICAgICAgICBjb2RlX3ZlcmlmaWVyOiBjb2RlVmVyaWZpZXIsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB4Zm9ybTogX3Nlc3Npb25SZXNwb25zZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgeWllbGQgcmVtb3ZlSXRlbUFzeW5jKHRoaXMuc3RvcmFnZSwgYCR7dGhpcy5zdG9yYWdlS2V5fS1jb2RlLXZlcmlmaWVyYCk7XG4gICAgICAgICAgICBpZiAoZXJyb3IgfHwgIWRhdGEpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogeyB1c2VyOiBudWxsLCBzZXNzaW9uOiBudWxsIH0sIGVycm9yIH07XG4gICAgICAgICAgICBpZiAoZGF0YS5zZXNzaW9uKSB7XG4gICAgICAgICAgICAgICAgeWllbGQgdGhpcy5fc2F2ZVNlc3Npb24oZGF0YS5zZXNzaW9uKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9ub3RpZnlBbGxTdWJzY3JpYmVycygnU0lHTkVEX0lOJywgZGF0YS5zZXNzaW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7IGRhdGEsIGVycm9yIH07XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBbGxvd3Mgc2lnbmluZyBpbiB3aXRoIGFuIElEIHRva2VuIGlzc3VlZCBieSBjZXJ0YWluIHN1cHBvcnRlZCBwcm92aWRlcnMuXG4gICAgICogVGhlIElEIHRva2VuIGlzIHZlcmlmaWVkIGZvciB2YWxpZGl0eSBhbmQgYSBuZXcgc2Vzc2lvbiBpcyBlc3RhYmxpc2hlZC5cbiAgICAgKlxuICAgICAqIEBleHBlcmltZW50YWxcbiAgICAgKi9cbiAgICBzaWduSW5XaXRoSWRUb2tlbihjcmVkZW50aWFscykge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgeWllbGQgdGhpcy5fcmVtb3ZlU2Vzc2lvbigpO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBjb25zdCB7IG9wdGlvbnMsIHByb3ZpZGVyLCB0b2tlbiwgbm9uY2UgfSA9IGNyZWRlbnRpYWxzO1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlcyA9IHlpZWxkIF9yZXF1ZXN0KHRoaXMuZmV0Y2gsICdQT1NUJywgYCR7dGhpcy51cmx9L3Rva2VuP2dyYW50X3R5cGU9aWRfdG9rZW5gLCB7XG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICAgICAgICAgICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvdmlkZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBpZF90b2tlbjogdG9rZW4sXG4gICAgICAgICAgICAgICAgICAgICAgICBub25jZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGdvdHJ1ZV9tZXRhX3NlY3VyaXR5OiB7IGNhcHRjaGFfdG9rZW46IG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5jYXB0Y2hhVG9rZW4gfSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgeGZvcm06IF9zZXNzaW9uUmVzcG9uc2UsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBkYXRhLCBlcnJvciB9ID0gcmVzO1xuICAgICAgICAgICAgICAgIGlmIChlcnJvciB8fCAhZGF0YSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogeyB1c2VyOiBudWxsLCBzZXNzaW9uOiBudWxsIH0sIGVycm9yIH07XG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuc2Vzc2lvbikge1xuICAgICAgICAgICAgICAgICAgICB5aWVsZCB0aGlzLl9zYXZlU2Vzc2lvbihkYXRhLnNlc3Npb24pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9ub3RpZnlBbGxTdWJzY3JpYmVycygnU0lHTkVEX0lOJywgZGF0YS5zZXNzaW9uKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YSwgZXJyb3IgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGlmIChpc0F1dGhFcnJvcihlcnJvcikpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogeyB1c2VyOiBudWxsLCBzZXNzaW9uOiBudWxsIH0sIGVycm9yIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogTG9nIGluIGEgdXNlciB1c2luZyBtYWdpY2xpbmsgb3IgYSBvbmUtdGltZSBwYXNzd29yZCAoT1RQKS5cbiAgICAgKlxuICAgICAqIElmIHRoZSBge3sgLkNvbmZpcm1hdGlvblVSTCB9fWAgdmFyaWFibGUgaXMgc3BlY2lmaWVkIGluIHRoZSBlbWFpbCB0ZW1wbGF0ZSwgYSBtYWdpY2xpbmsgd2lsbCBiZSBzZW50LlxuICAgICAqIElmIHRoZSBge3sgLlRva2VuIH19YCB2YXJpYWJsZSBpcyBzcGVjaWZpZWQgaW4gdGhlIGVtYWlsIHRlbXBsYXRlLCBhbiBPVFAgd2lsbCBiZSBzZW50LlxuICAgICAqIElmIHlvdSdyZSB1c2luZyBwaG9uZSBzaWduLWlucywgb25seSBhbiBPVFAgd2lsbCBiZSBzZW50LiBZb3Ugd29uJ3QgYmUgYWJsZSB0byBzZW5kIGEgbWFnaWNsaW5rIGZvciBwaG9uZSBzaWduLWlucy5cbiAgICAgKlxuICAgICAqIEJlIGF3YXJlIHRoYXQgeW91IG1heSBnZXQgYmFjayBhbiBlcnJvciBtZXNzYWdlIHRoYXQgd2lsbCBub3QgZGlzdGluZ3Vpc2hcbiAgICAgKiBiZXR3ZWVuIHRoZSBjYXNlcyB3aGVyZSB0aGUgYWNjb3VudCBkb2VzIG5vdCBleGlzdCBvciwgdGhhdCB0aGUgYWNjb3VudFxuICAgICAqIGNhbiBvbmx5IGJlIGFjY2Vzc2VkIHZpYSBzb2NpYWwgbG9naW4uXG4gICAgICpcbiAgICAgKiBEbyBub3RlIHRoYXQgeW91IHdpbGwgbmVlZCB0byBjb25maWd1cmUgYSBXaGF0c2FwcCBzZW5kZXIgb24gVHdpbGlvXG4gICAgICogaWYgeW91IGFyZSB1c2luZyBwaG9uZSBzaWduIGluIHdpdGggdGhlICd3aGF0c2FwcCcgY2hhbm5lbC4gVGhlIHdoYXRzYXBwXG4gICAgICogY2hhbm5lbCBpcyBub3Qgc3VwcG9ydGVkIG9uIG90aGVyIHByb3ZpZGVyc1xuICAgICAqIGF0IHRoaXMgdGltZS5cbiAgICAgKiBUaGlzIG1ldGhvZCBzdXBwb3J0cyBQS0NFIHdoZW4gYW4gZW1haWwgaXMgcGFzc2VkLlxuICAgICAqL1xuICAgIHNpZ25JbldpdGhPdHAoY3JlZGVudGlhbHMpIHtcbiAgICAgICAgdmFyIF9hLCBfYiwgX2MsIF9kLCBfZTtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgeWllbGQgdGhpcy5fcmVtb3ZlU2Vzc2lvbigpO1xuICAgICAgICAgICAgICAgIGlmICgnZW1haWwnIGluIGNyZWRlbnRpYWxzKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgZW1haWwsIG9wdGlvbnMgfSA9IGNyZWRlbnRpYWxzO1xuICAgICAgICAgICAgICAgICAgICBsZXQgY29kZUNoYWxsZW5nZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjb2RlQ2hhbGxlbmdlTWV0aG9kID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZmxvd1R5cGUgPT09ICdwa2NlJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY29kZVZlcmlmaWVyID0gZ2VuZXJhdGVQS0NFVmVyaWZpZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHlpZWxkIHNldEl0ZW1Bc3luYyh0aGlzLnN0b3JhZ2UsIGAke3RoaXMuc3RvcmFnZUtleX0tY29kZS12ZXJpZmllcmAsIGNvZGVWZXJpZmllcik7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2RlQ2hhbGxlbmdlID0geWllbGQgZ2VuZXJhdGVQS0NFQ2hhbGxlbmdlKGNvZGVWZXJpZmllcik7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2RlQ2hhbGxlbmdlTWV0aG9kID0gY29kZVZlcmlmaWVyID09PSBjb2RlQ2hhbGxlbmdlID8gJ3BsYWluJyA6ICdzMjU2JztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjb25zdCB7IGVycm9yIH0gPSB5aWVsZCBfcmVxdWVzdCh0aGlzLmZldGNoLCAnUE9TVCcsIGAke3RoaXMudXJsfS9vdHBgLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgICAgICAgICAgICAgICAgICAgICBib2R5OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW1haWwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogKF9hID0gb3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLmRhdGEpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZV91c2VyOiAoX2IgPSBvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMuc2hvdWxkQ3JlYXRlVXNlcikgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnb3RydWVfbWV0YV9zZWN1cml0eTogeyBjYXB0Y2hhX3Rva2VuOiBvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMuY2FwdGNoYVRva2VuIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29kZV9jaGFsbGVuZ2U6IGNvZGVDaGFsbGVuZ2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29kZV9jaGFsbGVuZ2VfbWV0aG9kOiBjb2RlQ2hhbGxlbmdlTWV0aG9kLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZGlyZWN0VG86IG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5lbWFpbFJlZGlyZWN0VG8sXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiB7IHVzZXI6IG51bGwsIHNlc3Npb246IG51bGwgfSwgZXJyb3IgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCdwaG9uZScgaW4gY3JlZGVudGlhbHMpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgeyBwaG9uZSwgb3B0aW9ucyB9ID0gY3JlZGVudGlhbHM7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgZXJyb3IgfSA9IHlpZWxkIF9yZXF1ZXN0KHRoaXMuZmV0Y2gsICdQT1NUJywgYCR7dGhpcy51cmx9L290cGAsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvZHk6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwaG9uZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiAoX2MgPSBvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMuZGF0YSkgIT09IG51bGwgJiYgX2MgIT09IHZvaWQgMCA/IF9jIDoge30sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRlX3VzZXI6IChfZCA9IG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5zaG91bGRDcmVhdGVVc2VyKSAhPT0gbnVsbCAmJiBfZCAhPT0gdm9pZCAwID8gX2QgOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdvdHJ1ZV9tZXRhX3NlY3VyaXR5OiB7IGNhcHRjaGFfdG9rZW46IG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5jYXB0Y2hhVG9rZW4gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFubmVsOiAoX2UgPSBvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMuY2hhbm5lbCkgIT09IG51bGwgJiYgX2UgIT09IHZvaWQgMCA/IF9lIDogJ3NtcycsXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogeyB1c2VyOiBudWxsLCBzZXNzaW9uOiBudWxsIH0sIGVycm9yIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBBdXRoSW52YWxpZENyZWRlbnRpYWxzRXJyb3IoJ1lvdSBtdXN0IHByb3ZpZGUgZWl0aGVyIGFuIGVtYWlsIG9yIHBob25lIG51bWJlci4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGlmIChpc0F1dGhFcnJvcihlcnJvcikpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogeyB1c2VyOiBudWxsLCBzZXNzaW9uOiBudWxsIH0sIGVycm9yIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogTG9nIGluIGEgdXNlciBnaXZlbiBhIFVzZXIgc3VwcGxpZWQgT1RQIHJlY2VpdmVkIHZpYSBtb2JpbGUuXG4gICAgICovXG4gICAgdmVyaWZ5T3RwKHBhcmFtcykge1xuICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICB5aWVsZCB0aGlzLl9yZW1vdmVTZXNzaW9uKCk7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBkYXRhLCBlcnJvciB9ID0geWllbGQgX3JlcXVlc3QodGhpcy5mZXRjaCwgJ1BPU1QnLCBgJHt0aGlzLnVybH0vdmVyaWZ5YCwge1xuICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgICAgICAgICAgICAgICAgIGJvZHk6IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgcGFyYW1zKSwgeyBnb3RydWVfbWV0YV9zZWN1cml0eTogeyBjYXB0Y2hhX3Rva2VuOiAoX2EgPSBwYXJhbXMub3B0aW9ucykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmNhcHRjaGFUb2tlbiB9IH0pLFxuICAgICAgICAgICAgICAgICAgICByZWRpcmVjdFRvOiAoX2IgPSBwYXJhbXMub3B0aW9ucykgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLnJlZGlyZWN0VG8sXG4gICAgICAgICAgICAgICAgICAgIHhmb3JtOiBfc2Vzc2lvblJlc3BvbnNlLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCFkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQW4gZXJyb3Igb2NjdXJyZWQgb24gdG9rZW4gdmVyaWZpY2F0aW9uLicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBzZXNzaW9uID0gZGF0YS5zZXNzaW9uO1xuICAgICAgICAgICAgICAgIGNvbnN0IHVzZXIgPSBkYXRhLnVzZXI7XG4gICAgICAgICAgICAgICAgaWYgKHNlc3Npb24gPT09IG51bGwgfHwgc2Vzc2lvbiA9PT0gdm9pZCAwID8gdm9pZCAwIDogc2Vzc2lvbi5hY2Nlc3NfdG9rZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgeWllbGQgdGhpcy5fc2F2ZVNlc3Npb24oc2Vzc2lvbik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX25vdGlmeUFsbFN1YnNjcmliZXJzKCdTSUdORURfSU4nLCBzZXNzaW9uKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogeyB1c2VyLCBzZXNzaW9uIH0sIGVycm9yOiBudWxsIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNBdXRoRXJyb3IoZXJyb3IpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IHsgdXNlcjogbnVsbCwgc2Vzc2lvbjogbnVsbCB9LCBlcnJvciB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEF0dGVtcHRzIGEgc2luZ2xlLXNpZ24gb24gdXNpbmcgYW4gZW50ZXJwcmlzZSBJZGVudGl0eSBQcm92aWRlci4gQVxuICAgICAqIHN1Y2Nlc3NmdWwgU1NPIGF0dGVtcHQgd2lsbCByZWRpcmVjdCB0aGUgY3VycmVudCBwYWdlIHRvIHRoZSBpZGVudGl0eVxuICAgICAqIHByb3ZpZGVyIGF1dGhvcml6YXRpb24gcGFnZS4gVGhlIHJlZGlyZWN0IFVSTCBpcyBpbXBsZW1lbnRhdGlvbiBhbmQgU1NPXG4gICAgICogcHJvdG9jb2wgc3BlY2lmaWMuXG4gICAgICpcbiAgICAgKiBZb3UgY2FuIHVzZSBpdCBieSBwcm92aWRpbmcgYSBTU08gZG9tYWluLiBUeXBpY2FsbHkgeW91IGNhbiBleHRyYWN0IHRoaXNcbiAgICAgKiBkb21haW4gYnkgYXNraW5nIHVzZXJzIGZvciB0aGVpciBlbWFpbCBhZGRyZXNzLiBJZiB0aGlzIGRvbWFpbiBpc1xuICAgICAqIHJlZ2lzdGVyZWQgb24gdGhlIEF1dGggaW5zdGFuY2UgdGhlIHJlZGlyZWN0IHdpbGwgdXNlIHRoYXQgb3JnYW5pemF0aW9uJ3NcbiAgICAgKiBjdXJyZW50bHkgYWN0aXZlIFNTTyBJZGVudGl0eSBQcm92aWRlciBmb3IgdGhlIGxvZ2luLlxuICAgICAqXG4gICAgICogSWYgeW91IGhhdmUgYnVpbHQgYW4gb3JnYW5pemF0aW9uLXNwZWNpZmljIGxvZ2luIHBhZ2UsIHlvdSBjYW4gdXNlIHRoZVxuICAgICAqIG9yZ2FuaXphdGlvbidzIFNTTyBJZGVudGl0eSBQcm92aWRlciBVVUlEIGRpcmVjdGx5IGluc3RlYWQuXG4gICAgICovXG4gICAgc2lnbkluV2l0aFNTTyhwYXJhbXMpIHtcbiAgICAgICAgdmFyIF9hLCBfYiwgX2M7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHlpZWxkIHRoaXMuX3JlbW92ZVNlc3Npb24oKTtcbiAgICAgICAgICAgICAgICByZXR1cm4geWllbGQgX3JlcXVlc3QodGhpcy5mZXRjaCwgJ1BPU1QnLCBgJHt0aGlzLnVybH0vc3NvYCwge1xuICAgICAgICAgICAgICAgICAgICBib2R5OiBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sICgncHJvdmlkZXJJZCcgaW4gcGFyYW1zID8geyBwcm92aWRlcl9pZDogcGFyYW1zLnByb3ZpZGVySWQgfSA6IG51bGwpKSwgKCdkb21haW4nIGluIHBhcmFtcyA/IHsgZG9tYWluOiBwYXJhbXMuZG9tYWluIH0gOiBudWxsKSksIHsgcmVkaXJlY3RfdG86IChfYiA9IChfYSA9IHBhcmFtcy5vcHRpb25zKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucmVkaXJlY3RUbykgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDogdW5kZWZpbmVkIH0pLCAoKChfYyA9IHBhcmFtcyA9PT0gbnVsbCB8fCBwYXJhbXMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHBhcmFtcy5vcHRpb25zKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MuY2FwdGNoYVRva2VuKVxuICAgICAgICAgICAgICAgICAgICAgICAgPyB7IGdvdHJ1ZV9tZXRhX3NlY3VyaXR5OiB7IGNhcHRjaGFfdG9rZW46IHBhcmFtcy5vcHRpb25zLmNhcHRjaGFUb2tlbiB9IH1cbiAgICAgICAgICAgICAgICAgICAgICAgIDogbnVsbCkpLCB7IHNraXBfaHR0cF9yZWRpcmVjdDogdHJ1ZSB9KSxcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxuICAgICAgICAgICAgICAgICAgICB4Zm9ybTogX3Nzb1Jlc3BvbnNlLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzQXV0aEVycm9yKGVycm9yKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiBudWxsLCBlcnJvciB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNlbmRzIGEgcmVhdXRoZW50aWNhdGlvbiBPVFAgdG8gdGhlIHVzZXIncyBlbWFpbCBvciBwaG9uZSBudW1iZXIuXG4gICAgICogUmVxdWlyZXMgdGhlIHVzZXIgdG8gYmUgc2lnbmVkLWluLlxuICAgICAqL1xuICAgIHJlYXV0aGVudGljYXRlKCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBjb25zdCB7IGRhdGE6IHsgc2Vzc2lvbiB9LCBlcnJvcjogc2Vzc2lvbkVycm9yLCB9ID0geWllbGQgdGhpcy5nZXRTZXNzaW9uKCk7XG4gICAgICAgICAgICAgICAgaWYgKHNlc3Npb25FcnJvcilcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgc2Vzc2lvbkVycm9yO1xuICAgICAgICAgICAgICAgIGlmICghc2Vzc2lvbilcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEF1dGhTZXNzaW9uTWlzc2luZ0Vycm9yKCk7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBlcnJvciB9ID0geWllbGQgX3JlcXVlc3QodGhpcy5mZXRjaCwgJ0dFVCcsIGAke3RoaXMudXJsfS9yZWF1dGhlbnRpY2F0ZWAsIHtcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxuICAgICAgICAgICAgICAgICAgICBqd3Q6IHNlc3Npb24uYWNjZXNzX3Rva2VuLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IHsgdXNlcjogbnVsbCwgc2Vzc2lvbjogbnVsbCB9LCBlcnJvciB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzQXV0aEVycm9yKGVycm9yKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiB7IHVzZXI6IG51bGwsIHNlc3Npb246IG51bGwgfSwgZXJyb3IgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXNlbmRzIGFuIGV4aXN0aW5nIHNpZ251cCBjb25maXJtYXRpb24gZW1haWwsIGVtYWlsIGNoYW5nZSBlbWFpbCwgU01TIE9UUCBvciBwaG9uZSBjaGFuZ2UgT1RQLlxuICAgICAqL1xuICAgIHJlc2VuZChjcmVkZW50aWFscykge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICB5aWVsZCB0aGlzLl9yZW1vdmVTZXNzaW9uKCk7XG4gICAgICAgICAgICAgICAgY29uc3QgZW5kcG9pbnQgPSBgJHt0aGlzLnVybH0vcmVzZW5kYDtcbiAgICAgICAgICAgICAgICBpZiAoJ2VtYWlsJyBpbiBjcmVkZW50aWFscykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB7IGVtYWlsLCB0eXBlLCBvcHRpb25zIH0gPSBjcmVkZW50aWFscztcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgeyBlcnJvciB9ID0geWllbGQgX3JlcXVlc3QodGhpcy5mZXRjaCwgJ1BPU1QnLCBlbmRwb2ludCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxuICAgICAgICAgICAgICAgICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVtYWlsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ290cnVlX21ldGFfc2VjdXJpdHk6IHsgY2FwdGNoYV90b2tlbjogb3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLmNhcHRjaGFUb2tlbiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IHsgdXNlcjogbnVsbCwgc2Vzc2lvbjogbnVsbCB9LCBlcnJvciB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICgncGhvbmUnIGluIGNyZWRlbnRpYWxzKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgcGhvbmUsIHR5cGUsIG9wdGlvbnMgfSA9IGNyZWRlbnRpYWxzO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB7IGVycm9yIH0gPSB5aWVsZCBfcmVxdWVzdCh0aGlzLmZldGNoLCAnUE9TVCcsIGVuZHBvaW50LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgICAgICAgICAgICAgICAgICAgICBib2R5OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGhvbmUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnb3RydWVfbWV0YV9zZWN1cml0eTogeyBjYXB0Y2hhX3Rva2VuOiBvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMuY2FwdGNoYVRva2VuIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogeyB1c2VyOiBudWxsLCBzZXNzaW9uOiBudWxsIH0sIGVycm9yIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBBdXRoSW52YWxpZENyZWRlbnRpYWxzRXJyb3IoJ1lvdSBtdXN0IHByb3ZpZGUgZWl0aGVyIGFuIGVtYWlsIG9yIHBob25lIG51bWJlciBhbmQgYSB0eXBlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNBdXRoRXJyb3IoZXJyb3IpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IHsgdXNlcjogbnVsbCwgc2Vzc2lvbjogbnVsbCB9LCBlcnJvciB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIHNlc3Npb24sIHJlZnJlc2hpbmcgaXQgaWYgbmVjZXNzYXJ5LlxuICAgICAqIFRoZSBzZXNzaW9uIHJldHVybmVkIGNhbiBiZSBudWxsIGlmIHRoZSBzZXNzaW9uIGlzIG5vdCBkZXRlY3RlZCB3aGljaCBjYW4gaGFwcGVuIGluIHRoZSBldmVudCBhIHVzZXIgaXMgbm90IHNpZ25lZC1pbiBvciBoYXMgbG9nZ2VkIG91dC5cbiAgICAgKi9cbiAgICBnZXRTZXNzaW9uKCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgLy8gbWFrZSBzdXJlIHdlJ3ZlIHJlYWQgdGhlIHNlc3Npb24gZnJvbSB0aGUgdXJsIGlmIHRoZXJlIGlzIG9uZVxuICAgICAgICAgICAgLy8gc2F2ZSB0byBqdXN0IGF3YWl0LCBhcyBsb25nIHdlIG1ha2Ugc3VyZSBfaW5pdGlhbGl6ZSgpIG5ldmVyIHRocm93c1xuICAgICAgICAgICAgeWllbGQgdGhpcy5pbml0aWFsaXplUHJvbWlzZTtcbiAgICAgICAgICAgIGxldCBjdXJyZW50U2Vzc2lvbiA9IG51bGw7XG4gICAgICAgICAgICBpZiAodGhpcy5wZXJzaXN0U2Vzc2lvbikge1xuICAgICAgICAgICAgICAgIGNvbnN0IG1heWJlU2Vzc2lvbiA9IHlpZWxkIGdldEl0ZW1Bc3luYyh0aGlzLnN0b3JhZ2UsIHRoaXMuc3RvcmFnZUtleSk7XG4gICAgICAgICAgICAgICAgaWYgKG1heWJlU2Vzc2lvbiAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5faXNWYWxpZFNlc3Npb24obWF5YmVTZXNzaW9uKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFNlc3Npb24gPSBtYXliZVNlc3Npb247XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB5aWVsZCB0aGlzLl9yZW1vdmVTZXNzaW9uKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50U2Vzc2lvbiA9IHRoaXMuaW5NZW1vcnlTZXNzaW9uO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFjdXJyZW50U2Vzc2lvbikge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IHsgc2Vzc2lvbjogbnVsbCB9LCBlcnJvcjogbnVsbCB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgaGFzRXhwaXJlZCA9IGN1cnJlbnRTZXNzaW9uLmV4cGlyZXNfYXRcbiAgICAgICAgICAgICAgICA/IGN1cnJlbnRTZXNzaW9uLmV4cGlyZXNfYXQgPD0gRGF0ZS5ub3coKSAvIDEwMDBcbiAgICAgICAgICAgICAgICA6IGZhbHNlO1xuICAgICAgICAgICAgaWYgKCFoYXNFeHBpcmVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogeyBzZXNzaW9uOiBjdXJyZW50U2Vzc2lvbiB9LCBlcnJvcjogbnVsbCB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgeyBzZXNzaW9uLCBlcnJvciB9ID0geWllbGQgdGhpcy5fY2FsbFJlZnJlc2hUb2tlbihjdXJyZW50U2Vzc2lvbi5yZWZyZXNoX3Rva2VuKTtcbiAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IHsgc2Vzc2lvbjogbnVsbCB9LCBlcnJvciB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogeyBzZXNzaW9uIH0sIGVycm9yOiBudWxsIH07XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBjdXJyZW50IHVzZXIgZGV0YWlscyBpZiB0aGVyZSBpcyBhbiBleGlzdGluZyBzZXNzaW9uLlxuICAgICAqIEBwYXJhbSBqd3QgVGFrZXMgaW4gYW4gb3B0aW9uYWwgYWNjZXNzIHRva2VuIGp3dC4gSWYgbm8gand0IGlzIHByb3ZpZGVkLCBnZXRVc2VyKCkgd2lsbCBhdHRlbXB0IHRvIGdldCB0aGUgand0IGZyb20gdGhlIGN1cnJlbnQgc2Vzc2lvbi5cbiAgICAgKi9cbiAgICBnZXRVc2VyKGp3dCkge1xuICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBpZiAoIWp3dCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB7IGRhdGEsIGVycm9yIH0gPSB5aWVsZCB0aGlzLmdldFNlc3Npb24oKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvLyBEZWZhdWx0IHRvIEF1dGhvcml6YXRpb24gaGVhZGVyIGlmIHRoZXJlIGlzIG5vIGV4aXN0aW5nIHNlc3Npb25cbiAgICAgICAgICAgICAgICAgICAgand0ID0gKF9iID0gKF9hID0gZGF0YS5zZXNzaW9uKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuYWNjZXNzX3Rva2VuKSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZCBfcmVxdWVzdCh0aGlzLmZldGNoLCAnR0VUJywgYCR7dGhpcy51cmx9L3VzZXJgLCB7XG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICAgICAgICAgICAgICAgICAgand0OiBqd3QsXG4gICAgICAgICAgICAgICAgICAgIHhmb3JtOiBfdXNlclJlc3BvbnNlLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzQXV0aEVycm9yKGVycm9yKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiB7IHVzZXI6IG51bGwgfSwgZXJyb3IgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBVcGRhdGVzIHVzZXIgZGF0YSBmb3IgYSBsb2dnZWQgaW4gdXNlci5cbiAgICAgKi9cbiAgICB1cGRhdGVVc2VyKGF0dHJpYnV0ZXMsIG9wdGlvbnMgPSB7fSkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBjb25zdCB7IGRhdGE6IHNlc3Npb25EYXRhLCBlcnJvcjogc2Vzc2lvbkVycm9yIH0gPSB5aWVsZCB0aGlzLmdldFNlc3Npb24oKTtcbiAgICAgICAgICAgICAgICBpZiAoc2Vzc2lvbkVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IHNlc3Npb25FcnJvcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCFzZXNzaW9uRGF0YS5zZXNzaW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBBdXRoU2Vzc2lvbk1pc3NpbmdFcnJvcigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBzZXNzaW9uID0gc2Vzc2lvbkRhdGEuc2Vzc2lvbjtcbiAgICAgICAgICAgICAgICBjb25zdCB7IGRhdGEsIGVycm9yOiB1c2VyRXJyb3IgfSA9IHlpZWxkIF9yZXF1ZXN0KHRoaXMuZmV0Y2gsICdQVVQnLCBgJHt0aGlzLnVybH0vdXNlcmAsIHtcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxuICAgICAgICAgICAgICAgICAgICByZWRpcmVjdFRvOiBvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMuZW1haWxSZWRpcmVjdFRvLFxuICAgICAgICAgICAgICAgICAgICBib2R5OiBhdHRyaWJ1dGVzLFxuICAgICAgICAgICAgICAgICAgICBqd3Q6IHNlc3Npb24uYWNjZXNzX3Rva2VuLFxuICAgICAgICAgICAgICAgICAgICB4Zm9ybTogX3VzZXJSZXNwb25zZSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpZiAodXNlckVycm9yKVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyB1c2VyRXJyb3I7XG4gICAgICAgICAgICAgICAgc2Vzc2lvbi51c2VyID0gZGF0YS51c2VyO1xuICAgICAgICAgICAgICAgIHlpZWxkIHRoaXMuX3NhdmVTZXNzaW9uKHNlc3Npb24pO1xuICAgICAgICAgICAgICAgIHRoaXMuX25vdGlmeUFsbFN1YnNjcmliZXJzKCdVU0VSX1VQREFURUQnLCBzZXNzaW9uKTtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiB7IHVzZXI6IHNlc3Npb24udXNlciB9LCBlcnJvcjogbnVsbCB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzQXV0aEVycm9yKGVycm9yKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiB7IHVzZXI6IG51bGwgfSwgZXJyb3IgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBEZWNvZGVzIGEgSldUICh3aXRob3V0IHBlcmZvcm1pbmcgYW55IHZhbGlkYXRpb24pLlxuICAgICAqL1xuICAgIF9kZWNvZGVKV1Qoand0KSB7XG4gICAgICAgIHJldHVybiBkZWNvZGVKV1RQYXlsb2FkKGp3dCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIHNlc3Npb24gZGF0YSBmcm9tIHRoZSBjdXJyZW50IHNlc3Npb24uIElmIHRoZSBjdXJyZW50IHNlc3Npb24gaXMgZXhwaXJlZCwgc2V0U2Vzc2lvbiB3aWxsIHRha2UgY2FyZSBvZiByZWZyZXNoaW5nIGl0IHRvIG9idGFpbiBhIG5ldyBzZXNzaW9uLlxuICAgICAqIElmIHRoZSByZWZyZXNoIHRva2VuIG9yIGFjY2VzcyB0b2tlbiBpbiB0aGUgY3VycmVudCBzZXNzaW9uIGlzIGludmFsaWQsIGFuIGVycm9yIHdpbGwgYmUgdGhyb3duLlxuICAgICAqIEBwYXJhbSBjdXJyZW50U2Vzc2lvbiBUaGUgY3VycmVudCBzZXNzaW9uIHRoYXQgbWluaW1hbGx5IGNvbnRhaW5zIGFuIGFjY2VzcyB0b2tlbiBhbmQgcmVmcmVzaCB0b2tlbi5cbiAgICAgKi9cbiAgICBzZXRTZXNzaW9uKGN1cnJlbnRTZXNzaW9uKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGlmICghY3VycmVudFNlc3Npb24uYWNjZXNzX3Rva2VuIHx8ICFjdXJyZW50U2Vzc2lvbi5yZWZyZXNoX3Rva2VuKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBBdXRoU2Vzc2lvbk1pc3NpbmdFcnJvcigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCB0aW1lTm93ID0gRGF0ZS5ub3coKSAvIDEwMDA7XG4gICAgICAgICAgICAgICAgbGV0IGV4cGlyZXNBdCA9IHRpbWVOb3c7XG4gICAgICAgICAgICAgICAgbGV0IGhhc0V4cGlyZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGxldCBzZXNzaW9uID0gbnVsbDtcbiAgICAgICAgICAgICAgICBjb25zdCBwYXlsb2FkID0gZGVjb2RlSldUUGF5bG9hZChjdXJyZW50U2Vzc2lvbi5hY2Nlc3NfdG9rZW4pO1xuICAgICAgICAgICAgICAgIGlmIChwYXlsb2FkLmV4cCkge1xuICAgICAgICAgICAgICAgICAgICBleHBpcmVzQXQgPSBwYXlsb2FkLmV4cDtcbiAgICAgICAgICAgICAgICAgICAgaGFzRXhwaXJlZCA9IGV4cGlyZXNBdCA8PSB0aW1lTm93O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoaGFzRXhwaXJlZCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB7IHNlc3Npb246IHJlZnJlc2hlZFNlc3Npb24sIGVycm9yIH0gPSB5aWVsZCB0aGlzLl9jYWxsUmVmcmVzaFRva2VuKGN1cnJlbnRTZXNzaW9uLnJlZnJlc2hfdG9rZW4pO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IHsgdXNlcjogbnVsbCwgc2Vzc2lvbjogbnVsbCB9LCBlcnJvcjogZXJyb3IgfTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoIXJlZnJlc2hlZFNlc3Npb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IHsgdXNlcjogbnVsbCwgc2Vzc2lvbjogbnVsbCB9LCBlcnJvcjogbnVsbCB9O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHNlc3Npb24gPSByZWZyZXNoZWRTZXNzaW9uO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgeyBkYXRhLCBlcnJvciB9ID0geWllbGQgdGhpcy5nZXRVc2VyKGN1cnJlbnRTZXNzaW9uLmFjY2Vzc190b2tlbik7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgc2Vzc2lvbiA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjY2Vzc190b2tlbjogY3VycmVudFNlc3Npb24uYWNjZXNzX3Rva2VuLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVmcmVzaF90b2tlbjogY3VycmVudFNlc3Npb24ucmVmcmVzaF90b2tlbixcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXI6IGRhdGEudXNlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuX3R5cGU6ICdiZWFyZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgZXhwaXJlc19pbjogZXhwaXJlc0F0IC0gdGltZU5vdyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4cGlyZXNfYXQ6IGV4cGlyZXNBdCxcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgeWllbGQgdGhpcy5fc2F2ZVNlc3Npb24oc2Vzc2lvbik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX25vdGlmeUFsbFN1YnNjcmliZXJzKCdTSUdORURfSU4nLCBzZXNzaW9uKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogeyB1c2VyOiBzZXNzaW9uLnVzZXIsIHNlc3Npb24gfSwgZXJyb3I6IG51bGwgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGlmIChpc0F1dGhFcnJvcihlcnJvcikpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogeyBzZXNzaW9uOiBudWxsLCB1c2VyOiBudWxsIH0sIGVycm9yIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIG5ldyBzZXNzaW9uLCByZWdhcmRsZXNzIG9mIGV4cGlyeSBzdGF0dXMuXG4gICAgICogVGFrZXMgaW4gYW4gb3B0aW9uYWwgY3VycmVudCBzZXNzaW9uLiBJZiBub3QgcGFzc2VkIGluLCB0aGVuIHJlZnJlc2hTZXNzaW9uKCkgd2lsbCBhdHRlbXB0IHRvIHJldHJpZXZlIGl0IGZyb20gZ2V0U2Vzc2lvbigpLlxuICAgICAqIElmIHRoZSBjdXJyZW50IHNlc3Npb24ncyByZWZyZXNoIHRva2VuIGlzIGludmFsaWQsIGFuIGVycm9yIHdpbGwgYmUgdGhyb3duLlxuICAgICAqIEBwYXJhbSBjdXJyZW50U2Vzc2lvbiBUaGUgY3VycmVudCBzZXNzaW9uLiBJZiBwYXNzZWQgaW4sIGl0IG11c3QgY29udGFpbiBhIHJlZnJlc2ggdG9rZW4uXG4gICAgICovXG4gICAgcmVmcmVzaFNlc3Npb24oY3VycmVudFNlc3Npb24pIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBpZiAoIWN1cnJlbnRTZXNzaW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgZGF0YSwgZXJyb3IgfSA9IHlpZWxkIHRoaXMuZ2V0U2Vzc2lvbigpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTZXNzaW9uID0gKF9hID0gZGF0YS5zZXNzaW9uKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghKGN1cnJlbnRTZXNzaW9uID09PSBudWxsIHx8IGN1cnJlbnRTZXNzaW9uID09PSB2b2lkIDAgPyB2b2lkIDAgOiBjdXJyZW50U2Vzc2lvbi5yZWZyZXNoX3Rva2VuKSkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQXV0aFNlc3Npb25NaXNzaW5nRXJyb3IoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgeyBzZXNzaW9uLCBlcnJvciB9ID0geWllbGQgdGhpcy5fY2FsbFJlZnJlc2hUb2tlbihjdXJyZW50U2Vzc2lvbi5yZWZyZXNoX3Rva2VuKTtcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogeyB1c2VyOiBudWxsLCBzZXNzaW9uOiBudWxsIH0sIGVycm9yOiBlcnJvciB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIXNlc3Npb24pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogeyB1c2VyOiBudWxsLCBzZXNzaW9uOiBudWxsIH0sIGVycm9yOiBudWxsIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IHsgdXNlcjogc2Vzc2lvbi51c2VyLCBzZXNzaW9uIH0sIGVycm9yOiBudWxsIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNBdXRoRXJyb3IoZXJyb3IpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IHsgdXNlcjogbnVsbCwgc2Vzc2lvbjogbnVsbCB9LCBlcnJvciB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHNlc3Npb24gZGF0YSBmcm9tIGEgVVJMIHN0cmluZ1xuICAgICAqL1xuICAgIF9nZXRTZXNzaW9uRnJvbVVybChpc1BLQ0VGbG93KSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGlmICghaXNCcm93c2VyKCkpXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBBdXRoSW1wbGljaXRHcmFudFJlZGlyZWN0RXJyb3IoJ05vIGJyb3dzZXIgZGV0ZWN0ZWQuJyk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZmxvd1R5cGUgPT09ICdpbXBsaWNpdCcgJiYgIXRoaXMuX2lzSW1wbGljaXRHcmFudEZsb3coKSkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQXV0aEltcGxpY2l0R3JhbnRSZWRpcmVjdEVycm9yKCdOb3QgYSB2YWxpZCBpbXBsaWNpdCBncmFudCBmbG93IHVybC4nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5mbG93VHlwZSA9PSAncGtjZScgJiYgIWlzUEtDRUZsb3cpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEF1dGhQS0NFR3JhbnRDb2RlRXhjaGFuZ2VFcnJvcignTm90IGEgdmFsaWQgUEtDRSBmbG93IHVybC4nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGlzUEtDRUZsb3cpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYXV0aENvZGUgPSBnZXRQYXJhbWV0ZXJCeU5hbWUoJ2NvZGUnKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFhdXRoQ29kZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBBdXRoUEtDRUdyYW50Q29kZUV4Y2hhbmdlRXJyb3IoJ05vIGNvZGUgZGV0ZWN0ZWQuJyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgZGF0YSwgZXJyb3IgfSA9IHlpZWxkIHRoaXMuZXhjaGFuZ2VDb2RlRm9yU2Vzc2lvbihhdXRoQ29kZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJvcilcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWRhdGEuc2Vzc2lvbilcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBBdXRoUEtDRUdyYW50Q29kZUV4Y2hhbmdlRXJyb3IoJ05vIHNlc3Npb24gZGV0ZWN0ZWQuJyk7XG4gICAgICAgICAgICAgICAgICAgIGxldCB1cmwgPSBuZXcgVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcbiAgICAgICAgICAgICAgICAgICAgdXJsLnNlYXJjaFBhcmFtcy5kZWxldGUoJ2NvZGUnKTtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKHdpbmRvdy5oaXN0b3J5LnN0YXRlLCAnJywgdXJsLnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiB7IHNlc3Npb246IGRhdGEuc2Vzc2lvbiwgcmVkaXJlY3RUeXBlOiBudWxsIH0sIGVycm9yOiBudWxsIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IGVycm9yX2Rlc2NyaXB0aW9uID0gZ2V0UGFyYW1ldGVyQnlOYW1lKCdlcnJvcl9kZXNjcmlwdGlvbicpO1xuICAgICAgICAgICAgICAgIGlmIChlcnJvcl9kZXNjcmlwdGlvbikge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBlcnJvcl9jb2RlID0gZ2V0UGFyYW1ldGVyQnlOYW1lKCdlcnJvcl9jb2RlJyk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghZXJyb3JfY29kZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBBdXRoSW1wbGljaXRHcmFudFJlZGlyZWN0RXJyb3IoJ05vIGVycm9yX2NvZGUgZGV0ZWN0ZWQuJyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVycm9yID0gZ2V0UGFyYW1ldGVyQnlOYW1lKCdlcnJvcicpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWVycm9yKVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEF1dGhJbXBsaWNpdEdyYW50UmVkaXJlY3RFcnJvcignTm8gZXJyb3IgZGV0ZWN0ZWQuJyk7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBBdXRoSW1wbGljaXRHcmFudFJlZGlyZWN0RXJyb3IoZXJyb3JfZGVzY3JpcHRpb24sIHsgZXJyb3IsIGNvZGU6IGVycm9yX2NvZGUgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IHByb3ZpZGVyX3Rva2VuID0gZ2V0UGFyYW1ldGVyQnlOYW1lKCdwcm92aWRlcl90b2tlbicpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHByb3ZpZGVyX3JlZnJlc2hfdG9rZW4gPSBnZXRQYXJhbWV0ZXJCeU5hbWUoJ3Byb3ZpZGVyX3JlZnJlc2hfdG9rZW4nKTtcbiAgICAgICAgICAgICAgICBjb25zdCBhY2Nlc3NfdG9rZW4gPSBnZXRQYXJhbWV0ZXJCeU5hbWUoJ2FjY2Vzc190b2tlbicpO1xuICAgICAgICAgICAgICAgIGlmICghYWNjZXNzX3Rva2VuKVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQXV0aEltcGxpY2l0R3JhbnRSZWRpcmVjdEVycm9yKCdObyBhY2Nlc3NfdG9rZW4gZGV0ZWN0ZWQuJyk7XG4gICAgICAgICAgICAgICAgY29uc3QgZXhwaXJlc19pbiA9IGdldFBhcmFtZXRlckJ5TmFtZSgnZXhwaXJlc19pbicpO1xuICAgICAgICAgICAgICAgIGlmICghZXhwaXJlc19pbilcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEF1dGhJbXBsaWNpdEdyYW50UmVkaXJlY3RFcnJvcignTm8gZXhwaXJlc19pbiBkZXRlY3RlZC4nKTtcbiAgICAgICAgICAgICAgICBjb25zdCByZWZyZXNoX3Rva2VuID0gZ2V0UGFyYW1ldGVyQnlOYW1lKCdyZWZyZXNoX3Rva2VuJyk7XG4gICAgICAgICAgICAgICAgaWYgKCFyZWZyZXNoX3Rva2VuKVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQXV0aEltcGxpY2l0R3JhbnRSZWRpcmVjdEVycm9yKCdObyByZWZyZXNoX3Rva2VuIGRldGVjdGVkLicpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHRva2VuX3R5cGUgPSBnZXRQYXJhbWV0ZXJCeU5hbWUoJ3Rva2VuX3R5cGUnKTtcbiAgICAgICAgICAgICAgICBpZiAoIXRva2VuX3R5cGUpXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBBdXRoSW1wbGljaXRHcmFudFJlZGlyZWN0RXJyb3IoJ05vIHRva2VuX3R5cGUgZGV0ZWN0ZWQuJyk7XG4gICAgICAgICAgICAgICAgY29uc3QgdGltZU5vdyA9IE1hdGgucm91bmQoRGF0ZS5ub3coKSAvIDEwMDApO1xuICAgICAgICAgICAgICAgIGNvbnN0IGV4cGlyZXNfYXQgPSB0aW1lTm93ICsgcGFyc2VJbnQoZXhwaXJlc19pbik7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBkYXRhLCBlcnJvciB9ID0geWllbGQgdGhpcy5nZXRVc2VyKGFjY2Vzc190b2tlbik7XG4gICAgICAgICAgICAgICAgaWYgKGVycm9yKVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICAgICAgICBjb25zdCB1c2VyID0gZGF0YS51c2VyO1xuICAgICAgICAgICAgICAgIGNvbnN0IHNlc3Npb24gPSB7XG4gICAgICAgICAgICAgICAgICAgIHByb3ZpZGVyX3Rva2VuLFxuICAgICAgICAgICAgICAgICAgICBwcm92aWRlcl9yZWZyZXNoX3Rva2VuLFxuICAgICAgICAgICAgICAgICAgICBhY2Nlc3NfdG9rZW4sXG4gICAgICAgICAgICAgICAgICAgIGV4cGlyZXNfaW46IHBhcnNlSW50KGV4cGlyZXNfaW4pLFxuICAgICAgICAgICAgICAgICAgICBleHBpcmVzX2F0LFxuICAgICAgICAgICAgICAgICAgICByZWZyZXNoX3Rva2VuLFxuICAgICAgICAgICAgICAgICAgICB0b2tlbl90eXBlLFxuICAgICAgICAgICAgICAgICAgICB1c2VyLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgY29uc3QgcmVkaXJlY3RUeXBlID0gZ2V0UGFyYW1ldGVyQnlOYW1lKCd0eXBlJyk7XG4gICAgICAgICAgICAgICAgLy8gUmVtb3ZlIHRva2VucyBmcm9tIFVSTFxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gJyc7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogeyBzZXNzaW9uLCByZWRpcmVjdFR5cGUgfSwgZXJyb3I6IG51bGwgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGlmIChpc0F1dGhFcnJvcihlcnJvcikpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogeyBzZXNzaW9uOiBudWxsLCByZWRpcmVjdFR5cGU6IG51bGwgfSwgZXJyb3IgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgdGhlIGN1cnJlbnQgVVJMIGNvbnRhaW5zIHBhcmFtZXRlcnMgZ2l2ZW4gYnkgYW4gaW1wbGljaXQgb2F1dGggZ3JhbnQgZmxvdyAoaHR0cHM6Ly93d3cucmZjLWVkaXRvci5vcmcvcmZjL3JmYzY3NDkuaHRtbCNzZWN0aW9uLTQuMilcbiAgICAgKi9cbiAgICBfaXNJbXBsaWNpdEdyYW50RmxvdygpIHtcbiAgICAgICAgcmV0dXJuIChpc0Jyb3dzZXIoKSAmJlxuICAgICAgICAgICAgKEJvb2xlYW4oZ2V0UGFyYW1ldGVyQnlOYW1lKCdhY2Nlc3NfdG9rZW4nKSkgfHxcbiAgICAgICAgICAgICAgICBCb29sZWFuKGdldFBhcmFtZXRlckJ5TmFtZSgnZXJyb3JfZGVzY3JpcHRpb24nKSkpKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIHRoZSBjdXJyZW50IFVSTCBhbmQgYmFja2luZyBzdG9yYWdlIGNvbnRhaW4gcGFyYW1ldGVycyBnaXZlbiBieSBhIFBLQ0UgZmxvd1xuICAgICAqL1xuICAgIF9pc1BLQ0VGbG93KCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgY29uc3QgY3VycmVudFN0b3JhZ2VDb250ZW50ID0geWllbGQgZ2V0SXRlbUFzeW5jKHRoaXMuc3RvcmFnZSwgYCR7dGhpcy5zdG9yYWdlS2V5fS1jb2RlLXZlcmlmaWVyYCk7XG4gICAgICAgICAgICByZXR1cm4gaXNCcm93c2VyKCkgJiYgQm9vbGVhbihnZXRQYXJhbWV0ZXJCeU5hbWUoJ2NvZGUnKSkgJiYgQm9vbGVhbihjdXJyZW50U3RvcmFnZUNvbnRlbnQpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSW5zaWRlIGEgYnJvd3NlciBjb250ZXh0LCBgc2lnbk91dCgpYCB3aWxsIHJlbW92ZSB0aGUgbG9nZ2VkIGluIHVzZXIgZnJvbSB0aGUgYnJvd3NlciBzZXNzaW9uXG4gICAgICogYW5kIGxvZyB0aGVtIG91dCAtIHJlbW92aW5nIGFsbCBpdGVtcyBmcm9tIGxvY2Fsc3RvcmFnZSBhbmQgdGhlbiB0cmlnZ2VyIGEgYFwiU0lHTkVEX09VVFwiYCBldmVudC5cbiAgICAgKlxuICAgICAqIEZvciBzZXJ2ZXItc2lkZSBtYW5hZ2VtZW50LCB5b3UgY2FuIHJldm9rZSBhbGwgcmVmcmVzaCB0b2tlbnMgZm9yIGEgdXNlciBieSBwYXNzaW5nIGEgdXNlcidzIEpXVCB0aHJvdWdoIHRvIGBhdXRoLmFwaS5zaWduT3V0KEpXVDogc3RyaW5nKWAuXG4gICAgICogVGhlcmUgaXMgbm8gd2F5IHRvIHJldm9rZSBhIHVzZXIncyBhY2Nlc3MgdG9rZW4gand0IHVudGlsIGl0IGV4cGlyZXMuIEl0IGlzIHJlY29tbWVuZGVkIHRvIHNldCBhIHNob3J0ZXIgZXhwaXJ5IG9uIHRoZSBqd3QgZm9yIHRoaXMgcmVhc29uLlxuICAgICAqL1xuICAgIHNpZ25PdXQoKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIGNvbnN0IHsgZGF0YSwgZXJyb3I6IHNlc3Npb25FcnJvciB9ID0geWllbGQgdGhpcy5nZXRTZXNzaW9uKCk7XG4gICAgICAgICAgICBpZiAoc2Vzc2lvbkVycm9yKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZXJyb3I6IHNlc3Npb25FcnJvciB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgYWNjZXNzVG9rZW4gPSAoX2EgPSBkYXRhLnNlc3Npb24pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5hY2Nlc3NfdG9rZW47XG4gICAgICAgICAgICBpZiAoYWNjZXNzVG9rZW4pIHtcbiAgICAgICAgICAgICAgICBjb25zdCB7IGVycm9yIH0gPSB5aWVsZCB0aGlzLmFkbWluLnNpZ25PdXQoYWNjZXNzVG9rZW4pO1xuICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAvLyBpZ25vcmUgNDA0cyBzaW5jZSB1c2VyIG1pZ2h0IG5vdCBleGlzdCBhbnltb3JlXG4gICAgICAgICAgICAgICAgICAgIC8vIGlnbm9yZSA0MDFzIHNpbmNlIGFuIGludmFsaWQgb3IgZXhwaXJlZCBKV1Qgc2hvdWxkIHNpZ24gb3V0IHRoZSBjdXJyZW50IHNlc3Npb25cbiAgICAgICAgICAgICAgICAgICAgaWYgKCEoaXNBdXRoQXBpRXJyb3IoZXJyb3IpICYmIChlcnJvci5zdGF0dXMgPT09IDQwNCB8fCBlcnJvci5zdGF0dXMgPT09IDQwMSkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBlcnJvciB9O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgeWllbGQgdGhpcy5fcmVtb3ZlU2Vzc2lvbigpO1xuICAgICAgICAgICAgeWllbGQgcmVtb3ZlSXRlbUFzeW5jKHRoaXMuc3RvcmFnZSwgYCR7dGhpcy5zdG9yYWdlS2V5fS1jb2RlLXZlcmlmaWVyYCk7XG4gICAgICAgICAgICB0aGlzLl9ub3RpZnlBbGxTdWJzY3JpYmVycygnU0lHTkVEX09VVCcsIG51bGwpO1xuICAgICAgICAgICAgcmV0dXJuIHsgZXJyb3I6IG51bGwgfTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlY2VpdmUgYSBub3RpZmljYXRpb24gZXZlcnkgdGltZSBhbiBhdXRoIGV2ZW50IGhhcHBlbnMuXG4gICAgICogQHBhcmFtIGNhbGxiYWNrIEEgY2FsbGJhY2sgZnVuY3Rpb24gdG8gYmUgaW52b2tlZCB3aGVuIGFuIGF1dGggZXZlbnQgaGFwcGVucy5cbiAgICAgKi9cbiAgICBvbkF1dGhTdGF0ZUNoYW5nZShjYWxsYmFjaykge1xuICAgICAgICBjb25zdCBpZCA9IHV1aWQoKTtcbiAgICAgICAgY29uc3Qgc3Vic2NyaXB0aW9uID0ge1xuICAgICAgICAgICAgaWQsXG4gICAgICAgICAgICBjYWxsYmFjayxcbiAgICAgICAgICAgIHVuc3Vic2NyaWJlOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZUVtaXR0ZXJzLmRlbGV0ZShpZCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlRW1pdHRlcnMuc2V0KGlkLCBzdWJzY3JpcHRpb24pO1xuICAgICAgICB0aGlzLmVtaXRJbml0aWFsU2Vzc2lvbihpZCk7XG4gICAgICAgIHJldHVybiB7IGRhdGE6IHsgc3Vic2NyaXB0aW9uIH0gfTtcbiAgICB9XG4gICAgZW1pdEluaXRpYWxTZXNzaW9uKGlkKSB7XG4gICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgZGF0YTogeyBzZXNzaW9uIH0sIGVycm9yLCB9ID0geWllbGQgdGhpcy5nZXRTZXNzaW9uKCk7XG4gICAgICAgICAgICAgICAgaWYgKGVycm9yKVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICAgICAgICAoX2EgPSB0aGlzLnN0YXRlQ2hhbmdlRW1pdHRlcnMuZ2V0KGlkKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmNhbGxiYWNrKCdJTklUSUFMX1NFU1NJT04nLCBzZXNzaW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICAoX2IgPSB0aGlzLnN0YXRlQ2hhbmdlRW1pdHRlcnMuZ2V0KGlkKSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmNhbGxiYWNrKCdJTklUSUFMX1NFU1NJT04nLCBudWxsKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZW5kcyBhIHBhc3N3b3JkIHJlc2V0IHJlcXVlc3QgdG8gYW4gZW1haWwgYWRkcmVzcy5cbiAgICAgKiBUaGlzIG1ldGhvZCBzdXBwb3J0cyB0aGUgUEtDRSBmbG93LlxuICAgICAqIEBwYXJhbSBlbWFpbCBUaGUgZW1haWwgYWRkcmVzcyBvZiB0aGUgdXNlci5cbiAgICAgKiBAcGFyYW0gb3B0aW9ucy5yZWRpcmVjdFRvIFRoZSBVUkwgdG8gc2VuZCB0aGUgdXNlciB0byBhZnRlciB0aGV5IGNsaWNrIHRoZSBwYXNzd29yZCByZXNldCBsaW5rLlxuICAgICAqIEBwYXJhbSBvcHRpb25zLmNhcHRjaGFUb2tlbiBWZXJpZmljYXRpb24gdG9rZW4gcmVjZWl2ZWQgd2hlbiB0aGUgdXNlciBjb21wbGV0ZXMgdGhlIGNhcHRjaGEgb24gdGhlIHNpdGUuXG4gICAgICovXG4gICAgcmVzZXRQYXNzd29yZEZvckVtYWlsKGVtYWlsLCBvcHRpb25zID0ge30pIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIGxldCBjb2RlQ2hhbGxlbmdlID0gbnVsbDtcbiAgICAgICAgICAgIGxldCBjb2RlQ2hhbGxlbmdlTWV0aG9kID0gbnVsbDtcbiAgICAgICAgICAgIGlmICh0aGlzLmZsb3dUeXBlID09PSAncGtjZScpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjb2RlVmVyaWZpZXIgPSBnZW5lcmF0ZVBLQ0VWZXJpZmllcigpO1xuICAgICAgICAgICAgICAgIHlpZWxkIHNldEl0ZW1Bc3luYyh0aGlzLnN0b3JhZ2UsIGAke3RoaXMuc3RvcmFnZUtleX0tY29kZS12ZXJpZmllcmAsIGNvZGVWZXJpZmllcik7XG4gICAgICAgICAgICAgICAgY29kZUNoYWxsZW5nZSA9IHlpZWxkIGdlbmVyYXRlUEtDRUNoYWxsZW5nZShjb2RlVmVyaWZpZXIpO1xuICAgICAgICAgICAgICAgIGNvZGVDaGFsbGVuZ2VNZXRob2QgPSBjb2RlVmVyaWZpZXIgPT09IGNvZGVDaGFsbGVuZ2UgPyAncGxhaW4nIDogJ3MyNTYnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICByZXR1cm4geWllbGQgX3JlcXVlc3QodGhpcy5mZXRjaCwgJ1BPU1QnLCBgJHt0aGlzLnVybH0vcmVjb3ZlcmAsIHtcbiAgICAgICAgICAgICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgICAgICAgICAgICAgZW1haWwsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2RlX2NoYWxsZW5nZTogY29kZUNoYWxsZW5nZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvZGVfY2hhbGxlbmdlX21ldGhvZDogY29kZUNoYWxsZW5nZU1ldGhvZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGdvdHJ1ZV9tZXRhX3NlY3VyaXR5OiB7IGNhcHRjaGFfdG9rZW46IG9wdGlvbnMuY2FwdGNoYVRva2VuIH0sXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICAgICAgICAgICAgICAgICAgcmVkaXJlY3RUbzogb3B0aW9ucy5yZWRpcmVjdFRvLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzQXV0aEVycm9yKGVycm9yKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiBudWxsLCBlcnJvciB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdlbmVyYXRlcyBhIG5ldyBKV1QuXG4gICAgICogQHBhcmFtIHJlZnJlc2hUb2tlbiBBIHZhbGlkIHJlZnJlc2ggdG9rZW4gdGhhdCB3YXMgcmV0dXJuZWQgb24gbG9naW4uXG4gICAgICovXG4gICAgX3JlZnJlc2hBY2Nlc3NUb2tlbihyZWZyZXNoVG9rZW4pIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3RhcnRlZEF0ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgICAgICAvLyB3aWxsIGF0dGVtcHQgdG8gcmVmcmVzaCB0aGUgdG9rZW4gd2l0aCBleHBvbmVudGlhbCBiYWNrb2ZmXG4gICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkIHJldHJ5YWJsZSgoYXR0ZW1wdCkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgICAgICAgICB5aWVsZCBzbGVlcChhdHRlbXB0ICogMjAwKTsgLy8gMCwgMjAwLCA0MDAsIDgwMCwgLi4uXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZCBfcmVxdWVzdCh0aGlzLmZldGNoLCAnUE9TVCcsIGAke3RoaXMudXJsfS90b2tlbj9ncmFudF90eXBlPXJlZnJlc2hfdG9rZW5gLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBib2R5OiB7IHJlZnJlc2hfdG9rZW46IHJlZnJlc2hUb2tlbiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxuICAgICAgICAgICAgICAgICAgICAgICAgeGZvcm06IF9zZXNzaW9uUmVzcG9uc2UsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pLCAoYXR0ZW1wdCwgXywgcmVzdWx0KSA9PiByZXN1bHQgJiZcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmVycm9yICYmXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5lcnJvciBpbnN0YW5jZW9mIEF1dGhSZXRyeWFibGVGZXRjaEVycm9yICYmXG4gICAgICAgICAgICAgICAgICAgIC8vIHJldHJ5YWJsZSBvbmx5IGlmIHRoZSByZXF1ZXN0IGNhbiBiZSBzZW50IGJlZm9yZSB0aGUgYmFja29mZiBvdmVyZmxvd3MgdGhlIHRpY2sgZHVyYXRpb25cbiAgICAgICAgICAgICAgICAgICAgRGF0ZS5ub3coKSArIChhdHRlbXB0ICsgMSkgKiAyMDAgLSBzdGFydGVkQXQgPCBBVVRPX1JFRlJFU0hfVElDS19EVVJBVElPTik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNBdXRoRXJyb3IoZXJyb3IpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IHsgc2Vzc2lvbjogbnVsbCwgdXNlcjogbnVsbCB9LCBlcnJvciB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIF9pc1ZhbGlkU2Vzc2lvbihtYXliZVNlc3Npb24pIHtcbiAgICAgICAgY29uc3QgaXNWYWxpZFNlc3Npb24gPSB0eXBlb2YgbWF5YmVTZXNzaW9uID09PSAnb2JqZWN0JyAmJlxuICAgICAgICAgICAgbWF5YmVTZXNzaW9uICE9PSBudWxsICYmXG4gICAgICAgICAgICAnYWNjZXNzX3Rva2VuJyBpbiBtYXliZVNlc3Npb24gJiZcbiAgICAgICAgICAgICdyZWZyZXNoX3Rva2VuJyBpbiBtYXliZVNlc3Npb24gJiZcbiAgICAgICAgICAgICdleHBpcmVzX2F0JyBpbiBtYXliZVNlc3Npb247XG4gICAgICAgIHJldHVybiBpc1ZhbGlkU2Vzc2lvbjtcbiAgICB9XG4gICAgX2hhbmRsZVByb3ZpZGVyU2lnbkluKHByb3ZpZGVyLCBvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICBjb25zdCB1cmwgPSB5aWVsZCB0aGlzLl9nZXRVcmxGb3JQcm92aWRlcihwcm92aWRlciwge1xuICAgICAgICAgICAgICAgIHJlZGlyZWN0VG86IG9wdGlvbnMucmVkaXJlY3RUbyxcbiAgICAgICAgICAgICAgICBzY29wZXM6IG9wdGlvbnMuc2NvcGVzLFxuICAgICAgICAgICAgICAgIHF1ZXJ5UGFyYW1zOiBvcHRpb25zLnF1ZXJ5UGFyYW1zLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAvLyB0cnkgdG8gb3BlbiBvbiB0aGUgYnJvd3NlclxuICAgICAgICAgICAgaWYgKGlzQnJvd3NlcigpICYmICFvcHRpb25zLnNraXBCcm93c2VyUmVkaXJlY3QpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uYXNzaWduKHVybCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4geyBkYXRhOiB7IHByb3ZpZGVyLCB1cmwgfSwgZXJyb3I6IG51bGwgfTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlY292ZXJzIHRoZSBzZXNzaW9uIGZyb20gTG9jYWxTdG9yYWdlIGFuZCByZWZyZXNoZXNcbiAgICAgKiBOb3RlOiB0aGlzIG1ldGhvZCBpcyBhc3luYyB0byBhY2NvbW1vZGF0ZSBmb3IgQXN5bmNTdG9yYWdlIGUuZy4gaW4gUmVhY3QgbmF0aXZlLlxuICAgICAqL1xuICAgIF9yZWNvdmVyQW5kUmVmcmVzaCgpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjdXJyZW50U2Vzc2lvbiA9IHlpZWxkIGdldEl0ZW1Bc3luYyh0aGlzLnN0b3JhZ2UsIHRoaXMuc3RvcmFnZUtleSk7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9pc1ZhbGlkU2Vzc2lvbihjdXJyZW50U2Vzc2lvbikpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRTZXNzaW9uICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB5aWVsZCB0aGlzLl9yZW1vdmVTZXNzaW9uKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCB0aW1lTm93ID0gTWF0aC5yb3VuZChEYXRlLm5vdygpIC8gMTAwMCk7XG4gICAgICAgICAgICAgICAgaWYgKCgoX2EgPSBjdXJyZW50U2Vzc2lvbi5leHBpcmVzX2F0KSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBJbmZpbml0eSkgPCB0aW1lTm93ICsgRVhQSVJZX01BUkdJTikge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5hdXRvUmVmcmVzaFRva2VuICYmIGN1cnJlbnRTZXNzaW9uLnJlZnJlc2hfdG9rZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgZXJyb3IgfSA9IHlpZWxkIHRoaXMuX2NhbGxSZWZyZXNoVG9rZW4oY3VycmVudFNlc3Npb24ucmVmcmVzaF90b2tlbik7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvci5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB5aWVsZCB0aGlzLl9yZW1vdmVTZXNzaW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnBlcnNpc3RTZXNzaW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB5aWVsZCB0aGlzLl9zYXZlU2Vzc2lvbihjdXJyZW50U2Vzc2lvbik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbm90aWZ5QWxsU3Vic2NyaWJlcnMoJ1NJR05FRF9JTicsIGN1cnJlbnRTZXNzaW9uKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIF9jYWxsUmVmcmVzaFRva2VuKHJlZnJlc2hUb2tlbikge1xuICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgLy8gcmVmcmVzaGluZyBpcyBhbHJlYWR5IGluIHByb2dyZXNzXG4gICAgICAgICAgICBpZiAodGhpcy5yZWZyZXNoaW5nRGVmZXJyZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5yZWZyZXNoaW5nRGVmZXJyZWQucHJvbWlzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoaW5nRGVmZXJyZWQgPSBuZXcgRGVmZXJyZWQoKTtcbiAgICAgICAgICAgICAgICBpZiAoIXJlZnJlc2hUb2tlbikge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQXV0aFNlc3Npb25NaXNzaW5nRXJyb3IoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgeyBkYXRhLCBlcnJvciB9ID0geWllbGQgdGhpcy5fcmVmcmVzaEFjY2Vzc1Rva2VuKHJlZnJlc2hUb2tlbik7XG4gICAgICAgICAgICAgICAgaWYgKGVycm9yKVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICAgICAgICBpZiAoIWRhdGEuc2Vzc2lvbilcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEF1dGhTZXNzaW9uTWlzc2luZ0Vycm9yKCk7XG4gICAgICAgICAgICAgICAgeWllbGQgdGhpcy5fc2F2ZVNlc3Npb24oZGF0YS5zZXNzaW9uKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9ub3RpZnlBbGxTdWJzY3JpYmVycygnVE9LRU5fUkVGUkVTSEVEJywgZGF0YS5zZXNzaW9uKTtcbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSB7IHNlc3Npb246IGRhdGEuc2Vzc2lvbiwgZXJyb3I6IG51bGwgfTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hpbmdEZWZlcnJlZC5yZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGlmIChpc0F1dGhFcnJvcihlcnJvcikpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0geyBzZXNzaW9uOiBudWxsLCBlcnJvciB9O1xuICAgICAgICAgICAgICAgICAgICAoX2EgPSB0aGlzLnJlZnJlc2hpbmdEZWZlcnJlZCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKF9iID0gdGhpcy5yZWZyZXNoaW5nRGVmZXJyZWQpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5yZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoaW5nRGVmZXJyZWQgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgX25vdGlmeUFsbFN1YnNjcmliZXJzKGV2ZW50LCBzZXNzaW9uLCBicm9hZGNhc3QgPSB0cnVlKSB7XG4gICAgICAgIGlmICh0aGlzLmJyb2FkY2FzdENoYW5uZWwgJiYgYnJvYWRjYXN0KSB7XG4gICAgICAgICAgICB0aGlzLmJyb2FkY2FzdENoYW5uZWwucG9zdE1lc3NhZ2UoeyBldmVudCwgc2Vzc2lvbiB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlRW1pdHRlcnMuZm9yRWFjaCgoeCkgPT4geC5jYWxsYmFjayhldmVudCwgc2Vzc2lvbikpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBzZXQgY3VycmVudFNlc3Npb24gYW5kIGN1cnJlbnRVc2VyXG4gICAgICogcHJvY2VzcyB0byBfc3RhcnRBdXRvUmVmcmVzaFRva2VuIGlmIHBvc3NpYmxlXG4gICAgICovXG4gICAgX3NhdmVTZXNzaW9uKHNlc3Npb24pIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5wZXJzaXN0U2Vzc2lvbikge1xuICAgICAgICAgICAgICAgIHRoaXMuaW5NZW1vcnlTZXNzaW9uID0gc2Vzc2lvbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnBlcnNpc3RTZXNzaW9uICYmIHNlc3Npb24uZXhwaXJlc19hdCkge1xuICAgICAgICAgICAgICAgIHlpZWxkIHRoaXMuX3BlcnNpc3RTZXNzaW9uKHNlc3Npb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgX3BlcnNpc3RTZXNzaW9uKGN1cnJlbnRTZXNzaW9uKSB7XG4gICAgICAgIHJldHVybiBzZXRJdGVtQXN5bmModGhpcy5zdG9yYWdlLCB0aGlzLnN0b3JhZ2VLZXksIGN1cnJlbnRTZXNzaW9uKTtcbiAgICB9XG4gICAgX3JlbW92ZVNlc3Npb24oKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wZXJzaXN0U2Vzc2lvbikge1xuICAgICAgICAgICAgICAgIHlpZWxkIHJlbW92ZUl0ZW1Bc3luYyh0aGlzLnN0b3JhZ2UsIHRoaXMuc3RvcmFnZUtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmluTWVtb3J5U2Vzc2lvbiA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGFueSByZWdpc3RlcmVkIHZpc2liaWxpdHljaGFuZ2UgY2FsbGJhY2suXG4gICAgICpcbiAgICAgKiB7QHNlZSAjc3RhcnRBdXRvUmVmcmVzaH1cbiAgICAgKiB7QHNlZSAjc3RvcEF1dG9SZWZyZXNofVxuICAgICAqL1xuICAgIF9yZW1vdmVWaXNpYmlsaXR5Q2hhbmdlZENhbGxiYWNrKCkge1xuICAgICAgICBjb25zdCBjYWxsYmFjayA9IHRoaXMudmlzaWJpbGl0eUNoYW5nZWRDYWxsYmFjaztcbiAgICAgICAgdGhpcy52aXNpYmlsaXR5Q2hhbmdlZENhbGxiYWNrID0gbnVsbDtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChjYWxsYmFjayAmJiBpc0Jyb3dzZXIoKSAmJiAod2luZG93ID09PSBudWxsIHx8IHdpbmRvdyA9PT0gdm9pZCAwID8gdm9pZCAwIDogd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIpKSB7XG4gICAgICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Zpc2liaWxpdHljaGFuZ2UnLCBjYWxsYmFjayk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ3JlbW92aW5nIHZpc2liaWxpdHljaGFuZ2UgY2FsbGJhY2sgZmFpbGVkJywgZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhpcyBpcyB0aGUgcHJpdmF0ZSBpbXBsZW1lbnRhdGlvbiBvZiB7QGxpbmsgI3N0YXJ0QXV0b1JlZnJlc2h9LiBVc2UgdGhpc1xuICAgICAqIHdpdGhpbiB0aGUgbGlicmFyeS5cbiAgICAgKi9cbiAgICBfc3RhcnRBdXRvUmVmcmVzaCgpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIHlpZWxkIHRoaXMuX3N0b3BBdXRvUmVmcmVzaCgpO1xuICAgICAgICAgICAgY29uc3QgdGlja2VyID0gc2V0SW50ZXJ2YWwoKCkgPT4gdGhpcy5fYXV0b1JlZnJlc2hUb2tlblRpY2soKSwgQVVUT19SRUZSRVNIX1RJQ0tfRFVSQVRJT04pO1xuICAgICAgICAgICAgdGhpcy5hdXRvUmVmcmVzaFRpY2tlciA9IHRpY2tlcjtcbiAgICAgICAgICAgIGlmICh0aWNrZXIgJiYgdHlwZW9mIHRpY2tlciA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIHRpY2tlci51bnJlZiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIC8vIHRpY2tlciBpcyBhIE5vZGVKUyBUaW1lb3V0IG9iamVjdCB0aGF0IGhhcyBhbiBgdW5yZWZgIG1ldGhvZFxuICAgICAgICAgICAgICAgIC8vIGh0dHBzOi8vbm9kZWpzLm9yZy9hcGkvdGltZXJzLmh0bWwjdGltZW91dHVucmVmXG4gICAgICAgICAgICAgICAgLy8gV2hlbiBhdXRvIHJlZnJlc2ggaXMgdXNlZCBpbiBOb2RlSlMgKGxpa2UgZm9yIHRlc3RpbmcpIHRoZVxuICAgICAgICAgICAgICAgIC8vIGBzZXRJbnRlcnZhbGAgaXMgcHJldmVudGluZyB0aGUgcHJvY2VzcyBmcm9tIGJlaW5nIG1hcmtlZCBhc1xuICAgICAgICAgICAgICAgIC8vIGZpbmlzaGVkIGFuZCB0ZXN0cyBydW4gZW5kbGVzc2x5LiBUaGlzIGNhbiBiZSBwcmV2ZW50ZWQgYnkgY2FsbGluZ1xuICAgICAgICAgICAgICAgIC8vIGB1bnJlZigpYCBvbiB0aGUgcmV0dXJuZWQgb2JqZWN0LlxuICAgICAgICAgICAgICAgIHRpY2tlci51bnJlZigpO1xuICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiBEZW5vICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgRGVuby51bnJlZlRpbWVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgLy8gc2ltaWxhciBsaWtlIGZvciBOb2RlSlMsIGJ1dCB3aXRoIHRoZSBEZW5vIEFQSVxuICAgICAgICAgICAgICAgIC8vIGh0dHBzOi8vZGVuby5sYW5kL2FwaUBsYXRlc3Q/dW5zdGFibGUmcz1EZW5vLnVucmVmVGltZXJcbiAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgRGVuby51bnJlZlRpbWVyKHRpY2tlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBydW4gdGhlIHRpY2sgaW1tZWRpYXRlbHlcbiAgICAgICAgICAgIHlpZWxkIHRoaXMuX2F1dG9SZWZyZXNoVG9rZW5UaWNrKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGlzIGlzIHRoZSBwcml2YXRlIGltcGxlbWVudGF0aW9uIG9mIHtAbGluayAjc3RvcEF1dG9SZWZyZXNofS4gVXNlIHRoaXNcbiAgICAgKiB3aXRoaW4gdGhlIGxpYnJhcnkuXG4gICAgICovXG4gICAgX3N0b3BBdXRvUmVmcmVzaCgpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIGNvbnN0IHRpY2tlciA9IHRoaXMuYXV0b1JlZnJlc2hUaWNrZXI7XG4gICAgICAgICAgICB0aGlzLmF1dG9SZWZyZXNoVGlja2VyID0gbnVsbDtcbiAgICAgICAgICAgIGlmICh0aWNrZXIpIHtcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHRpY2tlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTdGFydHMgYW4gYXV0by1yZWZyZXNoIHByb2Nlc3MgaW4gdGhlIGJhY2tncm91bmQuIFRoZSBzZXNzaW9uIGlzIGNoZWNrZWRcbiAgICAgKiBldmVyeSBmZXcgc2Vjb25kcy4gQ2xvc2UgdG8gdGhlIHRpbWUgb2YgZXhwaXJhdGlvbiBhIHByb2Nlc3MgaXMgc3RhcnRlZCB0b1xuICAgICAqIHJlZnJlc2ggdGhlIHNlc3Npb24uIElmIHJlZnJlc2hpbmcgZmFpbHMgaXQgd2lsbCBiZSByZXRyaWVkIGZvciBhcyBsb25nIGFzXG4gICAgICogbmVjZXNzYXJ5LlxuICAgICAqXG4gICAgICogSWYgeW91IHNldCB0aGUge0BsaW5rIEdvVHJ1ZUNsaWVudE9wdGlvbnMjYXV0b1JlZnJlc2hUb2tlbn0geW91IGRvbid0IG5lZWRcbiAgICAgKiB0byBjYWxsIHRoaXMgZnVuY3Rpb24sIGl0IHdpbGwgYmUgY2FsbGVkIGZvciB5b3UuXG4gICAgICpcbiAgICAgKiBPbiBicm93c2VycyB0aGUgcmVmcmVzaCBwcm9jZXNzIHdvcmtzIG9ubHkgd2hlbiB0aGUgdGFiL3dpbmRvdyBpcyBpbiB0aGVcbiAgICAgKiBmb3JlZ3JvdW5kIHRvIGNvbnNlcnZlIHJlc291cmNlcyBhcyB3ZWxsIGFzIHByZXZlbnQgcmFjZSBjb25kaXRpb25zIGFuZFxuICAgICAqIGZsb29kaW5nIGF1dGggd2l0aCByZXF1ZXN0cy4gSWYgeW91IGNhbGwgdGhpcyBtZXRob2QgYW55IG1hbmFnZWRcbiAgICAgKiB2aXNpYmlsaXR5IGNoYW5nZSBjYWxsYmFjayB3aWxsIGJlIHJlbW92ZWQgYW5kIHlvdSBtdXN0IG1hbmFnZSB2aXNpYmlsaXR5XG4gICAgICogY2hhbmdlcyBvbiB5b3VyIG93bi5cbiAgICAgKlxuICAgICAqIE9uIG5vbi1icm93c2VyIHBsYXRmb3JtcyB0aGUgcmVmcmVzaCBwcm9jZXNzIHdvcmtzICpjb250aW51b3VzbHkqIGluIHRoZVxuICAgICAqIGJhY2tncm91bmQsIHdoaWNoIG1heSBub3QgYmUgZGVzaXJhYmxlLiBZb3Ugc2hvdWxkIGhvb2sgaW50byB5b3VyXG4gICAgICogcGxhdGZvcm0ncyBmb3JlZ3JvdW5kIGluZGljYXRpb24gbWVjaGFuaXNtIGFuZCBjYWxsIHRoZXNlIG1ldGhvZHNcbiAgICAgKiBhcHByb3ByaWF0ZWx5IHRvIGNvbnNlcnZlIHJlc291cmNlcy5cbiAgICAgKlxuICAgICAqIHtAc2VlICNzdG9wQXV0b1JlZnJlc2h9XG4gICAgICovXG4gICAgc3RhcnRBdXRvUmVmcmVzaCgpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIHRoaXMuX3JlbW92ZVZpc2liaWxpdHlDaGFuZ2VkQ2FsbGJhY2soKTtcbiAgICAgICAgICAgIHlpZWxkIHRoaXMuX3N0YXJ0QXV0b1JlZnJlc2goKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFN0b3BzIGFuIGFjdGl2ZSBhdXRvIHJlZnJlc2ggcHJvY2VzcyBydW5uaW5nIGluIHRoZSBiYWNrZ3JvdW5kIChpZiBhbnkpLlxuICAgICAqXG4gICAgICogSWYgeW91IGNhbGwgdGhpcyBtZXRob2QgYW55IG1hbmFnZWQgdmlzaWJpbGl0eSBjaGFuZ2UgY2FsbGJhY2sgd2lsbCBiZVxuICAgICAqIHJlbW92ZWQgYW5kIHlvdSBtdXN0IG1hbmFnZSB2aXNpYmlsaXR5IGNoYW5nZXMgb24geW91ciBvd24uXG4gICAgICpcbiAgICAgKiBTZWUge0BsaW5rICNzdGFydEF1dG9SZWZyZXNofSBmb3IgbW9yZSBkZXRhaWxzLlxuICAgICAqL1xuICAgIHN0b3BBdXRvUmVmcmVzaCgpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIHRoaXMuX3JlbW92ZVZpc2liaWxpdHlDaGFuZ2VkQ2FsbGJhY2soKTtcbiAgICAgICAgICAgIHlpZWxkIHRoaXMuX3N0b3BBdXRvUmVmcmVzaCgpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUnVucyB0aGUgYXV0byByZWZyZXNoIHRva2VuIHRpY2suXG4gICAgICovXG4gICAgX2F1dG9SZWZyZXNoVG9rZW5UaWNrKCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBkYXRhOiB7IHNlc3Npb24gfSwgfSA9IHlpZWxkIHRoaXMuZ2V0U2Vzc2lvbigpO1xuICAgICAgICAgICAgICAgIGlmICghc2Vzc2lvbiB8fCAhc2Vzc2lvbi5yZWZyZXNoX3Rva2VuIHx8ICFzZXNzaW9uLmV4cGlyZXNfYXQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBzZXNzaW9uIHdpbGwgZXhwaXJlIGluIHRoaXMgbWFueSB0aWNrcyAob3IgaGFzIGFscmVhZHkgZXhwaXJlZCBpZiA8PSAwKVxuICAgICAgICAgICAgICAgIGNvbnN0IGV4cGlyZXNJblRpY2tzID0gTWF0aC5mbG9vcigoc2Vzc2lvbi5leHBpcmVzX2F0ICogMTAwMCAtIG5vdykgLyBBVVRPX1JFRlJFU0hfVElDS19EVVJBVElPTik7XG4gICAgICAgICAgICAgICAgaWYgKGV4cGlyZXNJblRpY2tzIDwgQVVUT19SRUZSRVNIX1RJQ0tfVEhSRVNIT0xEKSB7XG4gICAgICAgICAgICAgICAgICAgIHlpZWxkIHRoaXMuX2NhbGxSZWZyZXNoVG9rZW4oc2Vzc2lvbi5yZWZyZXNoX3Rva2VuKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0F1dG8gcmVmcmVzaCB0aWNrIGZhaWxlZCB3aXRoIGVycm9yLiBUaGlzIGlzIGxpa2VseSBhIHRyYW5zaWVudCBlcnJvci4nLCBlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlZ2lzdGVycyBjYWxsYmFja3Mgb24gdGhlIGJyb3dzZXIgLyBwbGF0Zm9ybSwgd2hpY2ggaW4tdHVybiBydW5cbiAgICAgKiBhbGdvcml0aG1zIHdoZW4gdGhlIGJyb3dzZXIgd2luZG93L3RhYiBhcmUgaW4gZm9yZWdyb3VuZC4gT24gbm9uLWJyb3dzZXJcbiAgICAgKiBwbGF0Zm9ybXMgaXQgYXNzdW1lcyBhbHdheXMgZm9yZWdyb3VuZC5cbiAgICAgKi9cbiAgICBfaGFuZGxlVmlzaWJpbGl0eUNoYW5nZSgpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIGlmICghaXNCcm93c2VyKCkgfHwgISh3aW5kb3cgPT09IG51bGwgfHwgd2luZG93ID09PSB2b2lkIDAgPyB2b2lkIDAgOiB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcikpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hdXRvUmVmcmVzaFRva2VuKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGluIG5vbi1icm93c2VyIGVudmlyb25tZW50cyB0aGUgcmVmcmVzaCB0b2tlbiB0aWNrZXIgcnVucyBhbHdheXNcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFydEF1dG9SZWZyZXNoKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgdGhpcy52aXNpYmlsaXR5Q2hhbmdlZENhbGxiYWNrID0gKCkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkgeyByZXR1cm4geWllbGQgdGhpcy5fb25WaXNpYmlsaXR5Q2hhbmdlZChmYWxzZSk7IH0pO1xuICAgICAgICAgICAgICAgIHdpbmRvdyA9PT0gbnVsbCB8fCB3aW5kb3cgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd2aXNpYmlsaXR5Y2hhbmdlJywgdGhpcy52aXNpYmlsaXR5Q2hhbmdlZENhbGxiYWNrKTtcbiAgICAgICAgICAgICAgICAvLyBub3cgaW1tZWRpYXRlbHkgY2FsbCB0aGUgdmlzYmlsaXR5IGNoYW5nZWQgY2FsbGJhY2sgdG8gc2V0dXAgd2l0aCB0aGVcbiAgICAgICAgICAgICAgICAvLyBjdXJyZW50IHZpc2JpbGl0eSBzdGF0ZVxuICAgICAgICAgICAgICAgIHlpZWxkIHRoaXMuX29uVmlzaWJpbGl0eUNoYW5nZWQodHJ1ZSk7IC8vIGluaXRpYWwgY2FsbFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignX2hhbmRsZVZpc2liaWxpdHlDaGFuZ2UnLCBlcnJvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayByZWdpc3RlcmVkIHdpdGggYHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd2aXNpYmlsaXR5Y2hhbmdlJylgLlxuICAgICAqL1xuICAgIF9vblZpc2liaWxpdHlDaGFuZ2VkKGlzSW5pdGlhbCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgaWYgKGRvY3VtZW50LnZpc2liaWxpdHlTdGF0ZSA9PT0gJ3Zpc2libGUnKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFpc0luaXRpYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gaW5pdGlhbCB2aXNpYmlsaXR5IGNoYW5nZSBzZXR1cCBpcyBoYW5kbGVkIGluIGFub3RoZXIgZmxvdyB1bmRlciAjaW5pdGlhbGl6ZSgpXG4gICAgICAgICAgICAgICAgICAgIHlpZWxkIHRoaXMuaW5pdGlhbGl6ZVByb21pc2U7XG4gICAgICAgICAgICAgICAgICAgIHlpZWxkIHRoaXMuX3JlY292ZXJBbmRSZWZyZXNoKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmF1dG9SZWZyZXNoVG9rZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gaW4gYnJvd3NlciBlbnZpcm9ubWVudHMgdGhlIHJlZnJlc2ggdG9rZW4gdGlja2VyIHJ1bnMgb25seSBvbiBmb2N1c2VkIHRhYnNcbiAgICAgICAgICAgICAgICAgICAgLy8gd2hpY2ggcHJldmVudHMgcmFjZSBjb25kaXRpb25zXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3N0YXJ0QXV0b1JlZnJlc2goKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChkb2N1bWVudC52aXNpYmlsaXR5U3RhdGUgPT09ICdoaWRkZW4nKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYXV0b1JlZnJlc2hUb2tlbikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zdG9wQXV0b1JlZnJlc2goKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZW5lcmF0ZXMgdGhlIHJlbGV2YW50IGxvZ2luIFVSTCBmb3IgYSB0aGlyZC1wYXJ0eSBwcm92aWRlci5cbiAgICAgKiBAcGFyYW0gb3B0aW9ucy5yZWRpcmVjdFRvIEEgVVJMIG9yIG1vYmlsZSBhZGRyZXNzIHRvIHNlbmQgdGhlIHVzZXIgdG8gYWZ0ZXIgdGhleSBhcmUgY29uZmlybWVkLlxuICAgICAqIEBwYXJhbSBvcHRpb25zLnNjb3BlcyBBIHNwYWNlLXNlcGFyYXRlZCBsaXN0IG9mIHNjb3BlcyBncmFudGVkIHRvIHRoZSBPQXV0aCBhcHBsaWNhdGlvbi5cbiAgICAgKiBAcGFyYW0gb3B0aW9ucy5xdWVyeVBhcmFtcyBBbiBvYmplY3Qgb2Yga2V5LXZhbHVlIHBhaXJzIGNvbnRhaW5pbmcgcXVlcnkgcGFyYW1ldGVycyBncmFudGVkIHRvIHRoZSBPQXV0aCBhcHBsaWNhdGlvbi5cbiAgICAgKi9cbiAgICBfZ2V0VXJsRm9yUHJvdmlkZXIocHJvdmlkZXIsIG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIGNvbnN0IHVybFBhcmFtcyA9IFtgcHJvdmlkZXI9JHtlbmNvZGVVUklDb21wb25lbnQocHJvdmlkZXIpfWBdO1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5yZWRpcmVjdFRvKSB7XG4gICAgICAgICAgICAgICAgdXJsUGFyYW1zLnB1c2goYHJlZGlyZWN0X3RvPSR7ZW5jb2RlVVJJQ29tcG9uZW50KG9wdGlvbnMucmVkaXJlY3RUbyl9YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAob3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLnNjb3Blcykge1xuICAgICAgICAgICAgICAgIHVybFBhcmFtcy5wdXNoKGBzY29wZXM9JHtlbmNvZGVVUklDb21wb25lbnQob3B0aW9ucy5zY29wZXMpfWApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuZmxvd1R5cGUgPT09ICdwa2NlJykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvZGVWZXJpZmllciA9IGdlbmVyYXRlUEtDRVZlcmlmaWVyKCk7XG4gICAgICAgICAgICAgICAgeWllbGQgc2V0SXRlbUFzeW5jKHRoaXMuc3RvcmFnZSwgYCR7dGhpcy5zdG9yYWdlS2V5fS1jb2RlLXZlcmlmaWVyYCwgY29kZVZlcmlmaWVyKTtcbiAgICAgICAgICAgICAgICBjb25zdCBjb2RlQ2hhbGxlbmdlID0geWllbGQgZ2VuZXJhdGVQS0NFQ2hhbGxlbmdlKGNvZGVWZXJpZmllcik7XG4gICAgICAgICAgICAgICAgY29uc3QgY29kZUNoYWxsZW5nZU1ldGhvZCA9IGNvZGVWZXJpZmllciA9PT0gY29kZUNoYWxsZW5nZSA/ICdwbGFpbicgOiAnczI1Nic7XG4gICAgICAgICAgICAgICAgY29uc3QgZmxvd1BhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoe1xuICAgICAgICAgICAgICAgICAgICBjb2RlX2NoYWxsZW5nZTogYCR7ZW5jb2RlVVJJQ29tcG9uZW50KGNvZGVDaGFsbGVuZ2UpfWAsXG4gICAgICAgICAgICAgICAgICAgIGNvZGVfY2hhbGxlbmdlX21ldGhvZDogYCR7ZW5jb2RlVVJJQ29tcG9uZW50KGNvZGVDaGFsbGVuZ2VNZXRob2QpfWAsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdXJsUGFyYW1zLnB1c2goZmxvd1BhcmFtcy50b1N0cmluZygpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMucXVlcnlQYXJhbXMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBxdWVyeSA9IG5ldyBVUkxTZWFyY2hQYXJhbXMob3B0aW9ucy5xdWVyeVBhcmFtcyk7XG4gICAgICAgICAgICAgICAgdXJsUGFyYW1zLnB1c2gocXVlcnkudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gYCR7dGhpcy51cmx9L2F1dGhvcml6ZT8ke3VybFBhcmFtcy5qb2luKCcmJyl9YDtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIF91bmVucm9sbChwYXJhbXMpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBjb25zdCB7IGRhdGE6IHNlc3Npb25EYXRhLCBlcnJvcjogc2Vzc2lvbkVycm9yIH0gPSB5aWVsZCB0aGlzLmdldFNlc3Npb24oKTtcbiAgICAgICAgICAgICAgICBpZiAoc2Vzc2lvbkVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IG51bGwsIGVycm9yOiBzZXNzaW9uRXJyb3IgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkIF9yZXF1ZXN0KHRoaXMuZmV0Y2gsICdERUxFVEUnLCBgJHt0aGlzLnVybH0vZmFjdG9ycy8ke3BhcmFtcy5mYWN0b3JJZH1gLCB7XG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICAgICAgICAgICAgICAgICAgand0OiAoX2EgPSBzZXNzaW9uRGF0YSA9PT0gbnVsbCB8fCBzZXNzaW9uRGF0YSA9PT0gdm9pZCAwID8gdm9pZCAwIDogc2Vzc2lvbkRhdGEuc2Vzc2lvbikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmFjY2Vzc190b2tlbixcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGlmIChpc0F1dGhFcnJvcihlcnJvcikpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogbnVsbCwgZXJyb3IgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiB7QHNlZSBHb1RydWVNRkFBcGkjZW5yb2xsfVxuICAgICAqL1xuICAgIF9lbnJvbGwocGFyYW1zKSB7XG4gICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgZGF0YTogc2Vzc2lvbkRhdGEsIGVycm9yOiBzZXNzaW9uRXJyb3IgfSA9IHlpZWxkIHRoaXMuZ2V0U2Vzc2lvbigpO1xuICAgICAgICAgICAgICAgIGlmIChzZXNzaW9uRXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogbnVsbCwgZXJyb3I6IHNlc3Npb25FcnJvciB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCB7IGRhdGEsIGVycm9yIH0gPSB5aWVsZCBfcmVxdWVzdCh0aGlzLmZldGNoLCAnUE9TVCcsIGAke3RoaXMudXJsfS9mYWN0b3JzYCwge1xuICAgICAgICAgICAgICAgICAgICBib2R5OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmcmllbmRseV9uYW1lOiBwYXJhbXMuZnJpZW5kbHlOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgZmFjdG9yX3R5cGU6IHBhcmFtcy5mYWN0b3JUeXBlLFxuICAgICAgICAgICAgICAgICAgICAgICAgaXNzdWVyOiBwYXJhbXMuaXNzdWVyLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgICAgICAgICAgICAgICAgIGp3dDogKF9hID0gc2Vzc2lvbkRhdGEgPT09IG51bGwgfHwgc2Vzc2lvbkRhdGEgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHNlc3Npb25EYXRhLnNlc3Npb24pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5hY2Nlc3NfdG9rZW4sXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IG51bGwsIGVycm9yIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICgoX2IgPSBkYXRhID09PSBudWxsIHx8IGRhdGEgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGRhdGEudG90cCkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLnFyX2NvZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YS50b3RwLnFyX2NvZGUgPSBgZGF0YTppbWFnZS9zdmcreG1sO3V0Zi04LCR7ZGF0YS50b3RwLnFyX2NvZGV9YDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YSwgZXJyb3I6IG51bGwgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGlmIChpc0F1dGhFcnJvcihlcnJvcikpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogbnVsbCwgZXJyb3IgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiB7QHNlZSBHb1RydWVNRkFBcGkjdmVyaWZ5fVxuICAgICAqL1xuICAgIF92ZXJpZnkocGFyYW1zKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBkYXRhOiBzZXNzaW9uRGF0YSwgZXJyb3I6IHNlc3Npb25FcnJvciB9ID0geWllbGQgdGhpcy5nZXRTZXNzaW9uKCk7XG4gICAgICAgICAgICAgICAgaWYgKHNlc3Npb25FcnJvcikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiBudWxsLCBlcnJvcjogc2Vzc2lvbkVycm9yIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IHsgZGF0YSwgZXJyb3IgfSA9IHlpZWxkIF9yZXF1ZXN0KHRoaXMuZmV0Y2gsICdQT1NUJywgYCR7dGhpcy51cmx9L2ZhY3RvcnMvJHtwYXJhbXMuZmFjdG9ySWR9L3ZlcmlmeWAsIHtcbiAgICAgICAgICAgICAgICAgICAgYm9keTogeyBjb2RlOiBwYXJhbXMuY29kZSwgY2hhbGxlbmdlX2lkOiBwYXJhbXMuY2hhbGxlbmdlSWQgfSxcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxuICAgICAgICAgICAgICAgICAgICBqd3Q6IChfYSA9IHNlc3Npb25EYXRhID09PSBudWxsIHx8IHNlc3Npb25EYXRhID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzZXNzaW9uRGF0YS5zZXNzaW9uKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuYWNjZXNzX3Rva2VuLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiBudWxsLCBlcnJvciB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB5aWVsZCB0aGlzLl9zYXZlU2Vzc2lvbihPYmplY3QuYXNzaWduKHsgZXhwaXJlc19hdDogTWF0aC5yb3VuZChEYXRlLm5vdygpIC8gMTAwMCkgKyBkYXRhLmV4cGlyZXNfaW4gfSwgZGF0YSkpO1xuICAgICAgICAgICAgICAgIHRoaXMuX25vdGlmeUFsbFN1YnNjcmliZXJzKCdNRkFfQ0hBTExFTkdFX1ZFUklGSUVEJywgZGF0YSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YSwgZXJyb3IgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGlmIChpc0F1dGhFcnJvcihlcnJvcikpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogbnVsbCwgZXJyb3IgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiB7QHNlZSBHb1RydWVNRkFBcGkjY2hhbGxlbmdlfVxuICAgICAqL1xuICAgIF9jaGFsbGVuZ2UocGFyYW1zKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBkYXRhOiBzZXNzaW9uRGF0YSwgZXJyb3I6IHNlc3Npb25FcnJvciB9ID0geWllbGQgdGhpcy5nZXRTZXNzaW9uKCk7XG4gICAgICAgICAgICAgICAgaWYgKHNlc3Npb25FcnJvcikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiBudWxsLCBlcnJvcjogc2Vzc2lvbkVycm9yIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZCBfcmVxdWVzdCh0aGlzLmZldGNoLCAnUE9TVCcsIGAke3RoaXMudXJsfS9mYWN0b3JzLyR7cGFyYW1zLmZhY3RvcklkfS9jaGFsbGVuZ2VgLCB7XG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICAgICAgICAgICAgICAgICAgand0OiAoX2EgPSBzZXNzaW9uRGF0YSA9PT0gbnVsbCB8fCBzZXNzaW9uRGF0YSA9PT0gdm9pZCAwID8gdm9pZCAwIDogc2Vzc2lvbkRhdGEuc2Vzc2lvbikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmFjY2Vzc190b2tlbixcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGlmIChpc0F1dGhFcnJvcihlcnJvcikpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogbnVsbCwgZXJyb3IgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiB7QHNlZSBHb1RydWVNRkFBcGkjY2hhbGxlbmdlQW5kVmVyaWZ5fVxuICAgICAqL1xuICAgIF9jaGFsbGVuZ2VBbmRWZXJpZnkocGFyYW1zKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICBjb25zdCB7IGRhdGE6IGNoYWxsZW5nZURhdGEsIGVycm9yOiBjaGFsbGVuZ2VFcnJvciB9ID0geWllbGQgdGhpcy5fY2hhbGxlbmdlKHtcbiAgICAgICAgICAgICAgICBmYWN0b3JJZDogcGFyYW1zLmZhY3RvcklkLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoY2hhbGxlbmdlRXJyb3IpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiBudWxsLCBlcnJvcjogY2hhbGxlbmdlRXJyb3IgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB5aWVsZCB0aGlzLl92ZXJpZnkoe1xuICAgICAgICAgICAgICAgIGZhY3RvcklkOiBwYXJhbXMuZmFjdG9ySWQsXG4gICAgICAgICAgICAgICAgY2hhbGxlbmdlSWQ6IGNoYWxsZW5nZURhdGEuaWQsXG4gICAgICAgICAgICAgICAgY29kZTogcGFyYW1zLmNvZGUsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIHtAc2VlIEdvVHJ1ZU1GQUFwaSNsaXN0RmFjdG9yc31cbiAgICAgKi9cbiAgICBfbGlzdEZhY3RvcnMoKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICBjb25zdCB7IGRhdGE6IHsgdXNlciB9LCBlcnJvcjogdXNlckVycm9yLCB9ID0geWllbGQgdGhpcy5nZXRVc2VyKCk7XG4gICAgICAgICAgICBpZiAodXNlckVycm9yKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogbnVsbCwgZXJyb3I6IHVzZXJFcnJvciB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgZmFjdG9ycyA9ICh1c2VyID09PSBudWxsIHx8IHVzZXIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHVzZXIuZmFjdG9ycykgfHwgW107XG4gICAgICAgICAgICBjb25zdCB0b3RwID0gZmFjdG9ycy5maWx0ZXIoKGZhY3RvcikgPT4gZmFjdG9yLmZhY3Rvcl90eXBlID09PSAndG90cCcgJiYgZmFjdG9yLnN0YXR1cyA9PT0gJ3ZlcmlmaWVkJyk7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgYWxsOiBmYWN0b3JzLFxuICAgICAgICAgICAgICAgICAgICB0b3RwLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3I6IG51bGwsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICoge0BzZWUgR29UcnVlTUZBQXBpI2dldEF1dGhlbnRpY2F0b3JBc3N1cmFuY2VMZXZlbH1cbiAgICAgKi9cbiAgICBfZ2V0QXV0aGVudGljYXRvckFzc3VyYW5jZUxldmVsKCkge1xuICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgY29uc3QgeyBkYXRhOiB7IHNlc3Npb24gfSwgZXJyb3I6IHNlc3Npb25FcnJvciwgfSA9IHlpZWxkIHRoaXMuZ2V0U2Vzc2lvbigpO1xuICAgICAgICAgICAgaWYgKHNlc3Npb25FcnJvcikge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IG51bGwsIGVycm9yOiBzZXNzaW9uRXJyb3IgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghc2Vzc2lvbikge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHsgY3VycmVudExldmVsOiBudWxsLCBuZXh0TGV2ZWw6IG51bGwsIGN1cnJlbnRBdXRoZW50aWNhdGlvbk1ldGhvZHM6IFtdIH0sXG4gICAgICAgICAgICAgICAgICAgIGVycm9yOiBudWxsLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBwYXlsb2FkID0gdGhpcy5fZGVjb2RlSldUKHNlc3Npb24uYWNjZXNzX3Rva2VuKTtcbiAgICAgICAgICAgIGxldCBjdXJyZW50TGV2ZWwgPSBudWxsO1xuICAgICAgICAgICAgaWYgKHBheWxvYWQuYWFsKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudExldmVsID0gcGF5bG9hZC5hYWw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgbmV4dExldmVsID0gY3VycmVudExldmVsO1xuICAgICAgICAgICAgY29uc3QgdmVyaWZpZWRGYWN0b3JzID0gKF9iID0gKF9hID0gc2Vzc2lvbi51c2VyLmZhY3RvcnMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5maWx0ZXIoKGZhY3RvcikgPT4gZmFjdG9yLnN0YXR1cyA9PT0gJ3ZlcmlmaWVkJykpICE9PSBudWxsICYmIF9iICE9PSB2b2lkIDAgPyBfYiA6IFtdO1xuICAgICAgICAgICAgaWYgKHZlcmlmaWVkRmFjdG9ycy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgbmV4dExldmVsID0gJ2FhbDInO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgY3VycmVudEF1dGhlbnRpY2F0aW9uTWV0aG9kcyA9IHBheWxvYWQuYW1yIHx8IFtdO1xuICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogeyBjdXJyZW50TGV2ZWwsIG5leHRMZXZlbCwgY3VycmVudEF1dGhlbnRpY2F0aW9uTWV0aG9kcyB9LCBlcnJvcjogbnVsbCB9O1xuICAgICAgICB9KTtcbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1Hb1RydWVDbGllbnQuanMubWFwIiwiaW1wb3J0IEdvVHJ1ZUFkbWluQXBpIGZyb20gJy4vR29UcnVlQWRtaW5BcGknO1xuaW1wb3J0IEdvVHJ1ZUNsaWVudCBmcm9tICcuL0dvVHJ1ZUNsaWVudCc7XG5leHBvcnQgeyBHb1RydWVBZG1pbkFwaSwgR29UcnVlQ2xpZW50IH07XG5leHBvcnQgKiBmcm9tICcuL2xpYi90eXBlcyc7XG5leHBvcnQgKiBmcm9tICcuL2xpYi9lcnJvcnMnO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiaW1wb3J0IHsgdmVyc2lvbiB9IGZyb20gJy4vdmVyc2lvbic7XG5leHBvcnQgY29uc3QgR09UUlVFX1VSTCA9ICdodHRwOi8vbG9jYWxob3N0Ojk5OTknO1xuZXhwb3J0IGNvbnN0IFNUT1JBR0VfS0VZID0gJ3N1cGFiYXNlLmF1dGgudG9rZW4nO1xuZXhwb3J0IGNvbnN0IEFVRElFTkNFID0gJyc7XG5leHBvcnQgY29uc3QgREVGQVVMVF9IRUFERVJTID0geyAnWC1DbGllbnQtSW5mbyc6IGBnb3RydWUtanMvJHt2ZXJzaW9ufWAgfTtcbmV4cG9ydCBjb25zdCBFWFBJUllfTUFSR0lOID0gMTA7IC8vIGluIHNlY29uZHNcbmV4cG9ydCBjb25zdCBORVRXT1JLX0ZBSUxVUkUgPSB7XG4gICAgTUFYX1JFVFJJRVM6IDEwLFxuICAgIFJFVFJZX0lOVEVSVkFMOiAyLCAvLyBpbiBkZWNpc2Vjb25kc1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvbnN0YW50cy5qcy5tYXAiLCJleHBvcnQgY2xhc3MgQXV0aEVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2UsIHN0YXR1cykge1xuICAgICAgICBzdXBlcihtZXNzYWdlKTtcbiAgICAgICAgdGhpcy5fX2lzQXV0aEVycm9yID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5uYW1lID0gJ0F1dGhFcnJvcic7XG4gICAgICAgIHRoaXMuc3RhdHVzID0gc3RhdHVzO1xuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBpc0F1dGhFcnJvcihlcnJvcikge1xuICAgIHJldHVybiB0eXBlb2YgZXJyb3IgPT09ICdvYmplY3QnICYmIGVycm9yICE9PSBudWxsICYmICdfX2lzQXV0aEVycm9yJyBpbiBlcnJvcjtcbn1cbmV4cG9ydCBjbGFzcyBBdXRoQXBpRXJyb3IgZXh0ZW5kcyBBdXRoRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2UsIHN0YXR1cykge1xuICAgICAgICBzdXBlcihtZXNzYWdlLCBzdGF0dXMpO1xuICAgICAgICB0aGlzLm5hbWUgPSAnQXV0aEFwaUVycm9yJztcbiAgICAgICAgdGhpcy5zdGF0dXMgPSBzdGF0dXM7XG4gICAgfVxuICAgIHRvSlNPTigpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5hbWU6IHRoaXMubmFtZSxcbiAgICAgICAgICAgIG1lc3NhZ2U6IHRoaXMubWVzc2FnZSxcbiAgICAgICAgICAgIHN0YXR1czogdGhpcy5zdGF0dXMsXG4gICAgICAgIH07XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIGlzQXV0aEFwaUVycm9yKGVycm9yKSB7XG4gICAgcmV0dXJuIGlzQXV0aEVycm9yKGVycm9yKSAmJiBlcnJvci5uYW1lID09PSAnQXV0aEFwaUVycm9yJztcbn1cbmV4cG9ydCBjbGFzcyBBdXRoVW5rbm93bkVycm9yIGV4dGVuZHMgQXV0aEVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcihtZXNzYWdlLCBvcmlnaW5hbEVycm9yKSB7XG4gICAgICAgIHN1cGVyKG1lc3NhZ2UpO1xuICAgICAgICB0aGlzLm5hbWUgPSAnQXV0aFVua25vd25FcnJvcic7XG4gICAgICAgIHRoaXMub3JpZ2luYWxFcnJvciA9IG9yaWdpbmFsRXJyb3I7XG4gICAgfVxufVxuZXhwb3J0IGNsYXNzIEN1c3RvbUF1dGhFcnJvciBleHRlbmRzIEF1dGhFcnJvciB7XG4gICAgY29uc3RydWN0b3IobWVzc2FnZSwgbmFtZSwgc3RhdHVzKSB7XG4gICAgICAgIHN1cGVyKG1lc3NhZ2UpO1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLnN0YXR1cyA9IHN0YXR1cztcbiAgICB9XG4gICAgdG9KU09OKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbmFtZTogdGhpcy5uYW1lLFxuICAgICAgICAgICAgbWVzc2FnZTogdGhpcy5tZXNzYWdlLFxuICAgICAgICAgICAgc3RhdHVzOiB0aGlzLnN0YXR1cyxcbiAgICAgICAgfTtcbiAgICB9XG59XG5leHBvcnQgY2xhc3MgQXV0aFNlc3Npb25NaXNzaW5nRXJyb3IgZXh0ZW5kcyBDdXN0b21BdXRoRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcignQXV0aCBzZXNzaW9uIG1pc3NpbmchJywgJ0F1dGhTZXNzaW9uTWlzc2luZ0Vycm9yJywgNDAwKTtcbiAgICB9XG59XG5leHBvcnQgY2xhc3MgQXV0aEludmFsaWRDcmVkZW50aWFsc0Vycm9yIGV4dGVuZHMgQ3VzdG9tQXV0aEVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcihtZXNzYWdlKSB7XG4gICAgICAgIHN1cGVyKG1lc3NhZ2UsICdBdXRoSW52YWxpZENyZWRlbnRpYWxzRXJyb3InLCA0MDApO1xuICAgIH1cbn1cbmV4cG9ydCBjbGFzcyBBdXRoSW1wbGljaXRHcmFudFJlZGlyZWN0RXJyb3IgZXh0ZW5kcyBDdXN0b21BdXRoRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2UsIGRldGFpbHMgPSBudWxsKSB7XG4gICAgICAgIHN1cGVyKG1lc3NhZ2UsICdBdXRoSW1wbGljaXRHcmFudFJlZGlyZWN0RXJyb3InLCA1MDApO1xuICAgICAgICB0aGlzLmRldGFpbHMgPSBudWxsO1xuICAgICAgICB0aGlzLmRldGFpbHMgPSBkZXRhaWxzO1xuICAgIH1cbiAgICB0b0pTT04oKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgICAgICAgICBtZXNzYWdlOiB0aGlzLm1lc3NhZ2UsXG4gICAgICAgICAgICBzdGF0dXM6IHRoaXMuc3RhdHVzLFxuICAgICAgICAgICAgZGV0YWlsczogdGhpcy5kZXRhaWxzLFxuICAgICAgICB9O1xuICAgIH1cbn1cbmV4cG9ydCBjbGFzcyBBdXRoUEtDRUdyYW50Q29kZUV4Y2hhbmdlRXJyb3IgZXh0ZW5kcyBDdXN0b21BdXRoRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2UsIGRldGFpbHMgPSBudWxsKSB7XG4gICAgICAgIHN1cGVyKG1lc3NhZ2UsICdBdXRoUEtDRUdyYW50Q29kZUV4Y2hhbmdlRXJyb3InLCA1MDApO1xuICAgICAgICB0aGlzLmRldGFpbHMgPSBudWxsO1xuICAgICAgICB0aGlzLmRldGFpbHMgPSBkZXRhaWxzO1xuICAgIH1cbiAgICB0b0pTT04oKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgICAgICAgICBtZXNzYWdlOiB0aGlzLm1lc3NhZ2UsXG4gICAgICAgICAgICBzdGF0dXM6IHRoaXMuc3RhdHVzLFxuICAgICAgICAgICAgZGV0YWlsczogdGhpcy5kZXRhaWxzLFxuICAgICAgICB9O1xuICAgIH1cbn1cbmV4cG9ydCBjbGFzcyBBdXRoUmV0cnlhYmxlRmV0Y2hFcnJvciBleHRlbmRzIEN1c3RvbUF1dGhFcnJvciB7XG4gICAgY29uc3RydWN0b3IobWVzc2FnZSwgc3RhdHVzKSB7XG4gICAgICAgIHN1cGVyKG1lc3NhZ2UsICdBdXRoUmV0cnlhYmxlRmV0Y2hFcnJvcicsIHN0YXR1cyk7XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZXJyb3JzLmpzLm1hcCIsInZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9fcmVzdCA9ICh0aGlzICYmIHRoaXMuX19yZXN0KSB8fCBmdW5jdGlvbiAocywgZSkge1xuICAgIHZhciB0ID0ge307XG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXG4gICAgICAgIHRbcF0gPSBzW3BdO1xuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxuICAgICAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xuICAgICAgICB9XG4gICAgcmV0dXJuIHQ7XG59O1xuaW1wb3J0IHsgZXhwaXJlc0F0LCBsb29rc0xpa2VGZXRjaFJlc3BvbnNlIH0gZnJvbSAnLi9oZWxwZXJzJztcbmltcG9ydCB7IEF1dGhBcGlFcnJvciwgQXV0aFJldHJ5YWJsZUZldGNoRXJyb3IsIEF1dGhVbmtub3duRXJyb3IgfSBmcm9tICcuL2Vycm9ycyc7XG5jb25zdCBfZ2V0RXJyb3JNZXNzYWdlID0gKGVycikgPT4gZXJyLm1zZyB8fCBlcnIubWVzc2FnZSB8fCBlcnIuZXJyb3JfZGVzY3JpcHRpb24gfHwgZXJyLmVycm9yIHx8IEpTT04uc3RyaW5naWZ5KGVycik7XG5jb25zdCBoYW5kbGVFcnJvciA9IChlcnJvciwgcmVqZWN0KSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICBjb25zdCBORVRXT1JLX0VSUk9SX0NPREVTID0gWzUwMiwgNTAzLCA1MDRdO1xuICAgIGlmICghbG9va3NMaWtlRmV0Y2hSZXNwb25zZShlcnJvcikpIHtcbiAgICAgICAgcmVqZWN0KG5ldyBBdXRoUmV0cnlhYmxlRmV0Y2hFcnJvcihfZ2V0RXJyb3JNZXNzYWdlKGVycm9yKSwgMCkpO1xuICAgIH1cbiAgICBlbHNlIGlmIChORVRXT1JLX0VSUk9SX0NPREVTLmluY2x1ZGVzKGVycm9yLnN0YXR1cykpIHtcbiAgICAgICAgLy8gc3RhdHVzIGluIDUwMC4uLjU5OSByYW5nZSAtIHNlcnZlciBoYWQgYW4gZXJyb3IsIHJlcXVlc3QgbWlnaHQgYmUgcmV0cnllZC5cbiAgICAgICAgcmVqZWN0KG5ldyBBdXRoUmV0cnlhYmxlRmV0Y2hFcnJvcihfZ2V0RXJyb3JNZXNzYWdlKGVycm9yKSwgZXJyb3Iuc3RhdHVzKSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICAvLyBnb3QgYSByZXNwb25zZSBmcm9tIHNlcnZlciB0aGF0IGlzIG5vdCBpbiB0aGUgNTAwLi4uNTk5IHJhbmdlIC0gc2hvdWxkIG5vdCByZXRyeVxuICAgICAgICBlcnJvclxuICAgICAgICAgICAgLmpzb24oKVxuICAgICAgICAgICAgLnRoZW4oKGVycikgPT4ge1xuICAgICAgICAgICAgcmVqZWN0KG5ldyBBdXRoQXBpRXJyb3IoX2dldEVycm9yTWVzc2FnZShlcnIpLCBlcnJvci5zdGF0dXMgfHwgNTAwKSk7XG4gICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goKGUpID0+IHtcbiAgICAgICAgICAgIC8vIG5vdCBhIHZhbGlkIGpzb24gcmVzcG9uc2VcbiAgICAgICAgICAgIHJlamVjdChuZXcgQXV0aFVua25vd25FcnJvcihfZ2V0RXJyb3JNZXNzYWdlKGUpLCBlKSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn0pO1xuY29uc3QgX2dldFJlcXVlc3RQYXJhbXMgPSAobWV0aG9kLCBvcHRpb25zLCBwYXJhbWV0ZXJzLCBib2R5KSA9PiB7XG4gICAgY29uc3QgcGFyYW1zID0geyBtZXRob2QsIGhlYWRlcnM6IChvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMuaGVhZGVycykgfHwge30gfTtcbiAgICBpZiAobWV0aG9kID09PSAnR0VUJykge1xuICAgICAgICByZXR1cm4gcGFyYW1zO1xuICAgIH1cbiAgICBwYXJhbXMuaGVhZGVycyA9IE9iamVjdC5hc3NpZ24oeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb247Y2hhcnNldD1VVEYtOCcgfSwgb3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLmhlYWRlcnMpO1xuICAgIHBhcmFtcy5ib2R5ID0gSlNPTi5zdHJpbmdpZnkoYm9keSk7XG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgcGFyYW1zKSwgcGFyYW1ldGVycyk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIF9yZXF1ZXN0KGZldGNoZXIsIG1ldGhvZCwgdXJsLCBvcHRpb25zKSB7XG4gICAgdmFyIF9hO1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGNvbnN0IGhlYWRlcnMgPSBPYmplY3QuYXNzaWduKHt9LCBvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMuaGVhZGVycyk7XG4gICAgICAgIGlmIChvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMuand0KSB7XG4gICAgICAgICAgICBoZWFkZXJzWydBdXRob3JpemF0aW9uJ10gPSBgQmVhcmVyICR7b3B0aW9ucy5qd3R9YDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBxcyA9IChfYSA9IG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5xdWVyeSkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDoge307XG4gICAgICAgIGlmIChvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMucmVkaXJlY3RUbykge1xuICAgICAgICAgICAgcXNbJ3JlZGlyZWN0X3RvJ10gPSBvcHRpb25zLnJlZGlyZWN0VG87XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcXVlcnlTdHJpbmcgPSBPYmplY3Qua2V5cyhxcykubGVuZ3RoID8gJz8nICsgbmV3IFVSTFNlYXJjaFBhcmFtcyhxcykudG9TdHJpbmcoKSA6ICcnO1xuICAgICAgICBjb25zdCBkYXRhID0geWllbGQgX2hhbmRsZVJlcXVlc3QoZmV0Y2hlciwgbWV0aG9kLCB1cmwgKyBxdWVyeVN0cmluZywgeyBoZWFkZXJzLCBub1Jlc29sdmVKc29uOiBvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMubm9SZXNvbHZlSnNvbiB9LCB7fSwgb3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLmJvZHkpO1xuICAgICAgICByZXR1cm4gKG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy54Zm9ybSkgPyBvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMueGZvcm0oZGF0YSkgOiB7IGRhdGE6IE9iamVjdC5hc3NpZ24oe30sIGRhdGEpLCBlcnJvcjogbnVsbCB9O1xuICAgIH0pO1xufVxuZnVuY3Rpb24gX2hhbmRsZVJlcXVlc3QoZmV0Y2hlciwgbWV0aG9kLCB1cmwsIG9wdGlvbnMsIHBhcmFtZXRlcnMsIGJvZHkpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgZmV0Y2hlcih1cmwsIF9nZXRSZXF1ZXN0UGFyYW1zKG1ldGhvZCwgb3B0aW9ucywgcGFyYW1ldGVycywgYm9keSkpXG4gICAgICAgICAgICAgICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghcmVzdWx0Lm9rKVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyByZXN1bHQ7XG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5ub1Jlc29sdmVKc29uKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuanNvbigpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAudGhlbigoZGF0YSkgPT4gcmVzb2x2ZShkYXRhKSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiBoYW5kbGVFcnJvcihlcnJvciwgcmVqZWN0KSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuZXhwb3J0IGZ1bmN0aW9uIF9zZXNzaW9uUmVzcG9uc2UoZGF0YSkge1xuICAgIHZhciBfYTtcbiAgICBsZXQgc2Vzc2lvbiA9IG51bGw7XG4gICAgaWYgKGhhc1Nlc3Npb24oZGF0YSkpIHtcbiAgICAgICAgc2Vzc2lvbiA9IE9iamVjdC5hc3NpZ24oe30sIGRhdGEpO1xuICAgICAgICBzZXNzaW9uLmV4cGlyZXNfYXQgPSBleHBpcmVzQXQoZGF0YS5leHBpcmVzX2luKTtcbiAgICB9XG4gICAgY29uc3QgdXNlciA9IChfYSA9IGRhdGEudXNlcikgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogZGF0YTtcbiAgICByZXR1cm4geyBkYXRhOiB7IHNlc3Npb24sIHVzZXIgfSwgZXJyb3I6IG51bGwgfTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBfdXNlclJlc3BvbnNlKGRhdGEpIHtcbiAgICB2YXIgX2E7XG4gICAgY29uc3QgdXNlciA9IChfYSA9IGRhdGEudXNlcikgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogZGF0YTtcbiAgICByZXR1cm4geyBkYXRhOiB7IHVzZXIgfSwgZXJyb3I6IG51bGwgfTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBfc3NvUmVzcG9uc2UoZGF0YSkge1xuICAgIHJldHVybiB7IGRhdGEsIGVycm9yOiBudWxsIH07XG59XG5leHBvcnQgZnVuY3Rpb24gX2dlbmVyYXRlTGlua1Jlc3BvbnNlKGRhdGEpIHtcbiAgICBjb25zdCB7IGFjdGlvbl9saW5rLCBlbWFpbF9vdHAsIGhhc2hlZF90b2tlbiwgcmVkaXJlY3RfdG8sIHZlcmlmaWNhdGlvbl90eXBlIH0gPSBkYXRhLCByZXN0ID0gX19yZXN0KGRhdGEsIFtcImFjdGlvbl9saW5rXCIsIFwiZW1haWxfb3RwXCIsIFwiaGFzaGVkX3Rva2VuXCIsIFwicmVkaXJlY3RfdG9cIiwgXCJ2ZXJpZmljYXRpb25fdHlwZVwiXSk7XG4gICAgY29uc3QgcHJvcGVydGllcyA9IHtcbiAgICAgICAgYWN0aW9uX2xpbmssXG4gICAgICAgIGVtYWlsX290cCxcbiAgICAgICAgaGFzaGVkX3Rva2VuLFxuICAgICAgICByZWRpcmVjdF90byxcbiAgICAgICAgdmVyaWZpY2F0aW9uX3R5cGUsXG4gICAgfTtcbiAgICBjb25zdCB1c2VyID0gT2JqZWN0LmFzc2lnbih7fSwgcmVzdCk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgcHJvcGVydGllcyxcbiAgICAgICAgICAgIHVzZXIsXG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiBudWxsLFxuICAgIH07XG59XG5leHBvcnQgZnVuY3Rpb24gX25vUmVzb2x2ZUpzb25SZXNwb25zZShkYXRhKSB7XG4gICAgcmV0dXJuIGRhdGE7XG59XG4vKipcbiAqIGhhc1Nlc3Npb24gY2hlY2tzIGlmIHRoZSByZXNwb25zZSBvYmplY3QgY29udGFpbnMgYSB2YWxpZCBzZXNzaW9uXG4gKiBAcGFyYW0gZGF0YSBBIHJlc3BvbnNlIG9iamVjdFxuICogQHJldHVybnMgdHJ1ZSBpZiBhIHNlc3Npb24gaXMgaW4gdGhlIHJlc3BvbnNlXG4gKi9cbmZ1bmN0aW9uIGhhc1Nlc3Npb24oZGF0YSkge1xuICAgIHJldHVybiBkYXRhLmFjY2Vzc190b2tlbiAmJiBkYXRhLnJlZnJlc2hfdG9rZW4gJiYgZGF0YS5leHBpcmVzX2luO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZmV0Y2guanMubWFwIiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5leHBvcnQgZnVuY3Rpb24gZXhwaXJlc0F0KGV4cGlyZXNJbikge1xuICAgIGNvbnN0IHRpbWVOb3cgPSBNYXRoLnJvdW5kKERhdGUubm93KCkgLyAxMDAwKTtcbiAgICByZXR1cm4gdGltZU5vdyArIGV4cGlyZXNJbjtcbn1cbmV4cG9ydCBmdW5jdGlvbiB1dWlkKCkge1xuICAgIHJldHVybiAneHh4eHh4eHgteHh4eC00eHh4LXl4eHgteHh4eHh4eHh4eHh4Jy5yZXBsYWNlKC9beHldL2csIGZ1bmN0aW9uIChjKSB7XG4gICAgICAgIGNvbnN0IHIgPSAoTWF0aC5yYW5kb20oKSAqIDE2KSB8IDAsIHYgPSBjID09ICd4JyA/IHIgOiAociAmIDB4MykgfCAweDg7XG4gICAgICAgIHJldHVybiB2LnRvU3RyaW5nKDE2KTtcbiAgICB9KTtcbn1cbmV4cG9ydCBjb25zdCBpc0Jyb3dzZXIgPSAoKSA9PiB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnO1xuY29uc3QgbG9jYWxTdG9yYWdlV3JpdGVUZXN0cyA9IHtcbiAgICB0ZXN0ZWQ6IGZhbHNlLFxuICAgIHdyaXRhYmxlOiBmYWxzZSxcbn07XG4vKipcbiAqIENoZWNrcyB3aGV0aGVyIGxvY2FsU3RvcmFnZSBpcyBzdXBwb3J0ZWQgb24gdGhpcyBicm93c2VyLlxuICovXG5leHBvcnQgY29uc3Qgc3VwcG9ydHNMb2NhbFN0b3JhZ2UgPSAoKSA9PiB7XG4gICAgaWYgKCFpc0Jyb3dzZXIoKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2YgZ2xvYmFsVGhpcy5sb2NhbFN0b3JhZ2UgIT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gRE9NIGV4Y2VwdGlvbiB3aGVuIGFjY2Vzc2luZyBgbG9jYWxTdG9yYWdlYFxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChsb2NhbFN0b3JhZ2VXcml0ZVRlc3RzLnRlc3RlZCkge1xuICAgICAgICByZXR1cm4gbG9jYWxTdG9yYWdlV3JpdGVUZXN0cy53cml0YWJsZTtcbiAgICB9XG4gICAgY29uc3QgcmFuZG9tS2V5ID0gYGxzd3QtJHtNYXRoLnJhbmRvbSgpfSR7TWF0aC5yYW5kb20oKX1gO1xuICAgIHRyeSB7XG4gICAgICAgIGdsb2JhbFRoaXMubG9jYWxTdG9yYWdlLnNldEl0ZW0ocmFuZG9tS2V5LCByYW5kb21LZXkpO1xuICAgICAgICBnbG9iYWxUaGlzLmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKHJhbmRvbUtleSk7XG4gICAgICAgIGxvY2FsU3RvcmFnZVdyaXRlVGVzdHMudGVzdGVkID0gdHJ1ZTtcbiAgICAgICAgbG9jYWxTdG9yYWdlV3JpdGVUZXN0cy53cml0YWJsZSA9IHRydWU7XG4gICAgfVxuICAgIGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGxvY2FsU3RvcmFnZSBjYW4ndCBiZSB3cml0dGVuIHRvXG4gICAgICAgIC8vIGh0dHBzOi8vd3d3LmNocm9taXVtLm9yZy9mb3ItdGVzdGVycy9idWctcmVwb3J0aW5nLWd1aWRlbGluZXMvdW5jYXVnaHQtc2VjdXJpdHllcnJvci1mYWlsZWQtdG8tcmVhZC10aGUtbG9jYWxzdG9yYWdlLXByb3BlcnR5LWZyb20td2luZG93LWFjY2Vzcy1pcy1kZW5pZWQtZm9yLXRoaXMtZG9jdW1lbnRcbiAgICAgICAgbG9jYWxTdG9yYWdlV3JpdGVUZXN0cy50ZXN0ZWQgPSB0cnVlO1xuICAgICAgICBsb2NhbFN0b3JhZ2VXcml0ZVRlc3RzLndyaXRhYmxlID0gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBsb2NhbFN0b3JhZ2VXcml0ZVRlc3RzLndyaXRhYmxlO1xufTtcbmV4cG9ydCBmdW5jdGlvbiBnZXRQYXJhbWV0ZXJCeU5hbWUobmFtZSwgdXJsKSB7XG4gICAgdmFyIF9hO1xuICAgIGlmICghdXJsKVxuICAgICAgICB1cmwgPSAoKF9hID0gd2luZG93ID09PSBudWxsIHx8IHdpbmRvdyA9PT0gdm9pZCAwID8gdm9pZCAwIDogd2luZG93LmxvY2F0aW9uKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuaHJlZikgfHwgJyc7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVzZWxlc3MtZXNjYXBlXG4gICAgbmFtZSA9IG5hbWUucmVwbGFjZSgvW1xcW1xcXV0vZywgJ1xcXFwkJicpO1xuICAgIGNvbnN0IHJlZ2V4ID0gbmV3IFJlZ0V4cCgnWz8mI10nICsgbmFtZSArICcoPShbXiYjXSopfCZ8I3wkKScpLCByZXN1bHRzID0gcmVnZXguZXhlYyh1cmwpO1xuICAgIGlmICghcmVzdWx0cylcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgaWYgKCFyZXN1bHRzWzJdKVxuICAgICAgICByZXR1cm4gJyc7XG4gICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChyZXN1bHRzWzJdLnJlcGxhY2UoL1xcKy9nLCAnICcpKTtcbn1cbmV4cG9ydCBjb25zdCByZXNvbHZlRmV0Y2ggPSAoY3VzdG9tRmV0Y2gpID0+IHtcbiAgICBsZXQgX2ZldGNoO1xuICAgIGlmIChjdXN0b21GZXRjaCkge1xuICAgICAgICBfZmV0Y2ggPSBjdXN0b21GZXRjaDtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGZldGNoID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICBfZmV0Y2ggPSAoLi4uYXJncykgPT4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7IHJldHVybiB5aWVsZCAoeWllbGQgaW1wb3J0KCdjcm9zcy1mZXRjaCcpKS5mZXRjaCguLi5hcmdzKTsgfSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBfZmV0Y2ggPSBmZXRjaDtcbiAgICB9XG4gICAgcmV0dXJuICguLi5hcmdzKSA9PiBfZmV0Y2goLi4uYXJncyk7XG59O1xuZXhwb3J0IGNvbnN0IGxvb2tzTGlrZUZldGNoUmVzcG9uc2UgPSAobWF5YmVSZXNwb25zZSkgPT4ge1xuICAgIHJldHVybiAodHlwZW9mIG1heWJlUmVzcG9uc2UgPT09ICdvYmplY3QnICYmXG4gICAgICAgIG1heWJlUmVzcG9uc2UgIT09IG51bGwgJiZcbiAgICAgICAgJ3N0YXR1cycgaW4gbWF5YmVSZXNwb25zZSAmJlxuICAgICAgICAnb2snIGluIG1heWJlUmVzcG9uc2UgJiZcbiAgICAgICAgJ2pzb24nIGluIG1heWJlUmVzcG9uc2UgJiZcbiAgICAgICAgdHlwZW9mIG1heWJlUmVzcG9uc2UuanNvbiA9PT0gJ2Z1bmN0aW9uJyk7XG59O1xuLy8gU3RvcmFnZSBoZWxwZXJzXG5leHBvcnQgY29uc3Qgc2V0SXRlbUFzeW5jID0gKHN0b3JhZ2UsIGtleSwgZGF0YSkgPT4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgeWllbGQgc3RvcmFnZS5zZXRJdGVtKGtleSwgSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xufSk7XG5leHBvcnQgY29uc3QgZ2V0SXRlbUFzeW5jID0gKHN0b3JhZ2UsIGtleSkgPT4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgY29uc3QgdmFsdWUgPSB5aWVsZCBzdG9yYWdlLmdldEl0ZW0oa2V5KTtcbiAgICBpZiAoIXZhbHVlKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZSh2YWx1ZSk7XG4gICAgfVxuICAgIGNhdGNoIChfYSkge1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxufSk7XG5leHBvcnQgY29uc3QgcmVtb3ZlSXRlbUFzeW5jID0gKHN0b3JhZ2UsIGtleSkgPT4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgeWllbGQgc3RvcmFnZS5yZW1vdmVJdGVtKGtleSk7XG59KTtcbmV4cG9ydCBmdW5jdGlvbiBkZWNvZGVCYXNlNjRVUkwodmFsdWUpIHtcbiAgICBjb25zdCBrZXkgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLz0nO1xuICAgIGxldCBiYXNlNjQgPSAnJztcbiAgICBsZXQgY2hyMSwgY2hyMiwgY2hyMztcbiAgICBsZXQgZW5jMSwgZW5jMiwgZW5jMywgZW5jNDtcbiAgICBsZXQgaSA9IDA7XG4gICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKCctJywgJysnKS5yZXBsYWNlKCdfJywgJy8nKTtcbiAgICB3aGlsZSAoaSA8IHZhbHVlLmxlbmd0aCkge1xuICAgICAgICBlbmMxID0ga2V5LmluZGV4T2YodmFsdWUuY2hhckF0KGkrKykpO1xuICAgICAgICBlbmMyID0ga2V5LmluZGV4T2YodmFsdWUuY2hhckF0KGkrKykpO1xuICAgICAgICBlbmMzID0ga2V5LmluZGV4T2YodmFsdWUuY2hhckF0KGkrKykpO1xuICAgICAgICBlbmM0ID0ga2V5LmluZGV4T2YodmFsdWUuY2hhckF0KGkrKykpO1xuICAgICAgICBjaHIxID0gKGVuYzEgPDwgMikgfCAoZW5jMiA+PiA0KTtcbiAgICAgICAgY2hyMiA9ICgoZW5jMiAmIDE1KSA8PCA0KSB8IChlbmMzID4+IDIpO1xuICAgICAgICBjaHIzID0gKChlbmMzICYgMykgPDwgNikgfCBlbmM0O1xuICAgICAgICBiYXNlNjQgPSBiYXNlNjQgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKGNocjEpO1xuICAgICAgICBpZiAoZW5jMyAhPSA2NCAmJiBjaHIyICE9IDApIHtcbiAgICAgICAgICAgIGJhc2U2NCA9IGJhc2U2NCArIFN0cmluZy5mcm9tQ2hhckNvZGUoY2hyMik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVuYzQgIT0gNjQgJiYgY2hyMyAhPSAwKSB7XG4gICAgICAgICAgICBiYXNlNjQgPSBiYXNlNjQgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKGNocjMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBiYXNlNjQ7XG59XG4vKipcbiAqIEEgZGVmZXJyZWQgcmVwcmVzZW50cyBzb21lIGFzeW5jaHJvbm91cyB3b3JrIHRoYXQgaXMgbm90IHlldCBmaW5pc2hlZCwgd2hpY2hcbiAqIG1heSBvciBtYXkgbm90IGN1bG1pbmF0ZSBpbiBhIHZhbHVlLlxuICogVGFrZW4gZnJvbTogaHR0cHM6Ly9naXRodWIuY29tL21pa2Utbm9ydGgvdHlwZXMvYmxvYi9tYXN0ZXIvc3JjL2FzeW5jLnRzXG4gKi9cbmV4cG9ydCBjbGFzcyBEZWZlcnJlZCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXh0cmEtc2VtaVxuICAgICAgICA7XG4gICAgICAgIHRoaXMucHJvbWlzZSA9IG5ldyBEZWZlcnJlZC5wcm9taXNlQ29uc3RydWN0b3IoKHJlcywgcmVqKSA9PiB7XG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4dHJhLXNlbWlcbiAgICAgICAgICAgIDtcbiAgICAgICAgICAgIHRoaXMucmVzb2x2ZSA9IHJlcztcbiAgICAgICAgICAgIHRoaXMucmVqZWN0ID0gcmVqO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5EZWZlcnJlZC5wcm9taXNlQ29uc3RydWN0b3IgPSBQcm9taXNlO1xuLy8gVGFrZW4gZnJvbTogaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMzg1NTIwMDMvaG93LXRvLWRlY29kZS1qd3QtdG9rZW4taW4tamF2YXNjcmlwdC13aXRob3V0LXVzaW5nLWEtbGlicmFyeVxuZXhwb3J0IGZ1bmN0aW9uIGRlY29kZUpXVFBheWxvYWQodG9rZW4pIHtcbiAgICAvLyBSZWdleCBjaGVja3MgZm9yIGJhc2U2NHVybCBmb3JtYXRcbiAgICBjb25zdCBiYXNlNjRVcmxSZWdleCA9IC9eKFthLXowLTlfLV17NH0pKigkfFthLXowLTlfLV17M309PyR8W2EtejAtOV8tXXsyfSg9PSk/JCkkL2k7XG4gICAgY29uc3QgcGFydHMgPSB0b2tlbi5zcGxpdCgnLicpO1xuICAgIGlmIChwYXJ0cy5sZW5ndGggIT09IDMpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdKV1QgaXMgbm90IHZhbGlkOiBub3QgYSBKV1Qgc3RydWN0dXJlJyk7XG4gICAgfVxuICAgIGlmICghYmFzZTY0VXJsUmVnZXgudGVzdChwYXJ0c1sxXSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdKV1QgaXMgbm90IHZhbGlkOiBwYXlsb2FkIGlzIG5vdCBpbiBiYXNlNjR1cmwgZm9ybWF0Jyk7XG4gICAgfVxuICAgIGNvbnN0IGJhc2U2NFVybCA9IHBhcnRzWzFdO1xuICAgIHJldHVybiBKU09OLnBhcnNlKGRlY29kZUJhc2U2NFVSTChiYXNlNjRVcmwpKTtcbn1cbi8qKlxuICogQ3JlYXRlcyBhIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byBudWxsIGFmdGVyIHNvbWUgdGltZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNsZWVwKHRpbWUpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKGFjY2VwdCkgPT4ge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IGFjY2VwdChudWxsKSwgdGltZSk7XG4gICAgfSk7XG59XG4vKipcbiAqIENvbnZlcnRzIHRoZSBwcm92aWRlZCBhc3luYyBmdW5jdGlvbiBpbnRvIGEgcmV0cnlhYmxlIGZ1bmN0aW9uLiBFYWNoIHJlc3VsdFxuICogb3IgdGhyb3duIGVycm9yIGlzIHNlbnQgdG8gdGhlIGlzUmV0cnlhYmxlIGZ1bmN0aW9uIHdoaWNoIHNob3VsZCByZXR1cm4gdHJ1ZVxuICogaWYgdGhlIGZ1bmN0aW9uIHNob3VsZCBydW4gYWdhaW4uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZXRyeWFibGUoZm4sIGlzUmV0cnlhYmxlKSB7XG4gICAgY29uc3QgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChhY2NlcHQsIHJlamVjdCkgPT4ge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4dHJhLXNlbWlcbiAgICAgICAgO1xuICAgICAgICAoKCkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgZm9yIChsZXQgYXR0ZW1wdCA9IDA7IGF0dGVtcHQgPCBJbmZpbml0eTsgYXR0ZW1wdCsrKSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0geWllbGQgZm4oYXR0ZW1wdCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghaXNSZXRyeWFibGUoYXR0ZW1wdCwgbnVsbCwgcmVzdWx0KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYWNjZXB0KHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpc1JldHJ5YWJsZShhdHRlbXB0LCBlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KSkoKTtcbiAgICB9KTtcbiAgICByZXR1cm4gcHJvbWlzZTtcbn1cbmZ1bmN0aW9uIGRlYzJoZXgoZGVjKSB7XG4gICAgcmV0dXJuICgnMCcgKyBkZWMudG9TdHJpbmcoMTYpKS5zdWJzdHIoLTIpO1xufVxuLy8gRnVuY3Rpb25zIGJlbG93IHRha2VuIGZyb206IGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzYzMzA5NDA5L2NyZWF0aW5nLWEtY29kZS12ZXJpZmllci1hbmQtY2hhbGxlbmdlLWZvci1wa2NlLWF1dGgtb24tc3BvdGlmeS1hcGktaW4tcmVhY3Rqc1xuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlUEtDRVZlcmlmaWVyKCkge1xuICAgIGNvbnN0IHZlcmlmaWVyTGVuZ3RoID0gNTY7XG4gICAgY29uc3QgYXJyYXkgPSBuZXcgVWludDMyQXJyYXkodmVyaWZpZXJMZW5ndGgpO1xuICAgIGlmICh0eXBlb2YgY3J5cHRvID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICBjb25zdCBjaGFyU2V0ID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5LS5ffic7XG4gICAgICAgIGNvbnN0IGNoYXJTZXRMZW4gPSBjaGFyU2V0Lmxlbmd0aDtcbiAgICAgICAgbGV0IHZlcmlmaWVyID0gJyc7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdmVyaWZpZXJMZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmVyaWZpZXIgKz0gY2hhclNldC5jaGFyQXQoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogY2hhclNldExlbikpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2ZXJpZmllcjtcbiAgICB9XG4gICAgY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhhcnJheSk7XG4gICAgcmV0dXJuIEFycmF5LmZyb20oYXJyYXksIGRlYzJoZXgpLmpvaW4oJycpO1xufVxuZnVuY3Rpb24gc2hhMjU2KHJhbmRvbVN0cmluZykge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGNvbnN0IGVuY29kZXIgPSBuZXcgVGV4dEVuY29kZXIoKTtcbiAgICAgICAgY29uc3QgZW5jb2RlZERhdGEgPSBlbmNvZGVyLmVuY29kZShyYW5kb21TdHJpbmcpO1xuICAgICAgICBjb25zdCBoYXNoID0geWllbGQgY3J5cHRvLnN1YnRsZS5kaWdlc3QoJ1NIQS0yNTYnLCBlbmNvZGVkRGF0YSk7XG4gICAgICAgIGNvbnN0IGJ5dGVzID0gbmV3IFVpbnQ4QXJyYXkoaGFzaCk7XG4gICAgICAgIHJldHVybiBBcnJheS5mcm9tKGJ5dGVzKVxuICAgICAgICAgICAgLm1hcCgoYykgPT4gU3RyaW5nLmZyb21DaGFyQ29kZShjKSlcbiAgICAgICAgICAgIC5qb2luKCcnKTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGJhc2U2NHVybGVuY29kZShzdHIpIHtcbiAgICByZXR1cm4gYnRvYShzdHIpLnJlcGxhY2UoL1xcKy9nLCAnLScpLnJlcGxhY2UoL1xcLy9nLCAnXycpLnJlcGxhY2UoLz0rJC8sICcnKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZVBLQ0VDaGFsbGVuZ2UodmVyaWZpZXIpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBpZiAodHlwZW9mIGNyeXB0byA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignV2ViQ3J5cHRvIEFQSSBpcyBub3Qgc3VwcG9ydGVkLiBDb2RlIGNoYWxsZW5nZSBtZXRob2Qgd2lsbCBkZWZhdWx0IHRvIHVzZSBwbGFpbiBpbnN0ZWFkIG9mIHNoYTI1Ni4nKTtcbiAgICAgICAgICAgIHJldHVybiB2ZXJpZmllcjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBoYXNoZWQgPSB5aWVsZCBzaGEyNTYodmVyaWZpZXIpO1xuICAgICAgICByZXR1cm4gYmFzZTY0dXJsZW5jb2RlKGhhc2hlZCk7XG4gICAgfSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1oZWxwZXJzLmpzLm1hcCIsImltcG9ydCB7IHN1cHBvcnRzTG9jYWxTdG9yYWdlIH0gZnJvbSAnLi9oZWxwZXJzJztcbmNvbnN0IGxvY2FsU3RvcmFnZUFkYXB0ZXIgPSB7XG4gICAgZ2V0SXRlbTogKGtleSkgPT4ge1xuICAgICAgICBpZiAoIXN1cHBvcnRzTG9jYWxTdG9yYWdlKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBnbG9iYWxUaGlzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSk7XG4gICAgfSxcbiAgICBzZXRJdGVtOiAoa2V5LCB2YWx1ZSkgPT4ge1xuICAgICAgICBpZiAoIXN1cHBvcnRzTG9jYWxTdG9yYWdlKCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBnbG9iYWxUaGlzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKGtleSwgdmFsdWUpO1xuICAgIH0sXG4gICAgcmVtb3ZlSXRlbTogKGtleSkgPT4ge1xuICAgICAgICBpZiAoIXN1cHBvcnRzTG9jYWxTdG9yYWdlKCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBnbG9iYWxUaGlzLmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGtleSk7XG4gICAgfSxcbn07XG5leHBvcnQgZGVmYXVsdCBsb2NhbFN0b3JhZ2VBZGFwdGVyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bG9jYWwtc3RvcmFnZS5qcy5tYXAiLCIvKipcbiAqIGh0dHBzOi8vbWF0aGlhc2J5bmVucy5iZS9ub3Rlcy9nbG9iYWx0aGlzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwb2x5ZmlsbEdsb2JhbFRoaXMoKSB7XG4gICAgaWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JylcbiAgICAgICAgcmV0dXJuO1xuICAgIHRyeSB7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShPYmplY3QucHJvdG90eXBlLCAnX19tYWdpY19fJywge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICB9KTtcbiAgICAgICAgLy8gQHRzLWV4cGVjdC1lcnJvciAnQWxsb3cgYWNjZXNzIHRvIG1hZ2ljJ1xuICAgICAgICBfX21hZ2ljX18uZ2xvYmFsVGhpcyA9IF9fbWFnaWNfXztcbiAgICAgICAgLy8gQHRzLWV4cGVjdC1lcnJvciAnQWxsb3cgYWNjZXNzIHRvIG1hZ2ljJ1xuICAgICAgICBkZWxldGUgT2JqZWN0LnByb3RvdHlwZS5fX21hZ2ljX187XG4gICAgfVxuICAgIGNhdGNoIChlKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIC8vIEB0cy1leHBlY3QtZXJyb3IgJ0FsbG93IGFjY2VzcyB0byBnbG9iYWxzJ1xuICAgICAgICAgICAgc2VsZi5nbG9iYWxUaGlzID0gc2VsZjtcbiAgICAgICAgfVxuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXBvbHlmaWxscy5qcy5tYXAiLCJleHBvcnQge307XG4vLyMgc291cmNlTWFwcGluZ1VSTD10eXBlcy5qcy5tYXAiLCIvLyBHZW5lcmF0ZWQgYnkgZ2VudmVyc2lvbi5cbmV4cG9ydCBjb25zdCB2ZXJzaW9uID0gJzIuMjguMCc7XG4vLyMgc291cmNlTWFwcGluZ1VSTD12ZXJzaW9uLmpzLm1hcCIsImltcG9ydCBjcm9zc0ZldGNoIGZyb20gJ2Nyb3NzLWZldGNoJztcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvc3RncmVzdEJ1aWxkZXIge1xuICAgIGNvbnN0cnVjdG9yKGJ1aWxkZXIpIHtcbiAgICAgICAgdGhpcy5zaG91bGRUaHJvd09uRXJyb3IgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5tZXRob2QgPSBidWlsZGVyLm1ldGhvZDtcbiAgICAgICAgdGhpcy51cmwgPSBidWlsZGVyLnVybDtcbiAgICAgICAgdGhpcy5oZWFkZXJzID0gYnVpbGRlci5oZWFkZXJzO1xuICAgICAgICB0aGlzLnNjaGVtYSA9IGJ1aWxkZXIuc2NoZW1hO1xuICAgICAgICB0aGlzLmJvZHkgPSBidWlsZGVyLmJvZHk7XG4gICAgICAgIHRoaXMuc2hvdWxkVGhyb3dPbkVycm9yID0gYnVpbGRlci5zaG91bGRUaHJvd09uRXJyb3I7XG4gICAgICAgIHRoaXMuc2lnbmFsID0gYnVpbGRlci5zaWduYWw7XG4gICAgICAgIHRoaXMuaXNNYXliZVNpbmdsZSA9IGJ1aWxkZXIuaXNNYXliZVNpbmdsZTtcbiAgICAgICAgaWYgKGJ1aWxkZXIuZmV0Y2gpIHtcbiAgICAgICAgICAgIHRoaXMuZmV0Y2ggPSBidWlsZGVyLmZldGNoO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiBmZXRjaCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHRoaXMuZmV0Y2ggPSBjcm9zc0ZldGNoO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5mZXRjaCA9IGZldGNoO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIElmIHRoZXJlJ3MgYW4gZXJyb3Igd2l0aCB0aGUgcXVlcnksIHRocm93T25FcnJvciB3aWxsIHJlamVjdCB0aGUgcHJvbWlzZSBieVxuICAgICAqIHRocm93aW5nIHRoZSBlcnJvciBpbnN0ZWFkIG9mIHJldHVybmluZyBpdCBhcyBwYXJ0IG9mIGEgc3VjY2Vzc2Z1bCByZXNwb25zZS5cbiAgICAgKlxuICAgICAqIHtAbGluayBodHRwczovL2dpdGh1Yi5jb20vc3VwYWJhc2Uvc3VwYWJhc2UtanMvaXNzdWVzLzkyfVxuICAgICAqL1xuICAgIHRocm93T25FcnJvcigpIHtcbiAgICAgICAgdGhpcy5zaG91bGRUaHJvd09uRXJyb3IgPSB0cnVlO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgdGhlbihvbmZ1bGZpbGxlZCwgb25yZWplY3RlZCkge1xuICAgICAgICAvLyBodHRwczovL3Bvc3RncmVzdC5vcmcvZW4vc3RhYmxlL2FwaS5odG1sI3N3aXRjaGluZy1zY2hlbWFzXG4gICAgICAgIGlmICh0aGlzLnNjaGVtYSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyBza2lwXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoWydHRVQnLCAnSEVBRCddLmluY2x1ZGVzKHRoaXMubWV0aG9kKSkge1xuICAgICAgICAgICAgdGhpcy5oZWFkZXJzWydBY2NlcHQtUHJvZmlsZSddID0gdGhpcy5zY2hlbWE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmhlYWRlcnNbJ0NvbnRlbnQtUHJvZmlsZSddID0gdGhpcy5zY2hlbWE7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMubWV0aG9kICE9PSAnR0VUJyAmJiB0aGlzLm1ldGhvZCAhPT0gJ0hFQUQnKSB7XG4gICAgICAgICAgICB0aGlzLmhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddID0gJ2FwcGxpY2F0aW9uL2pzb24nO1xuICAgICAgICB9XG4gICAgICAgIC8vIE5PVEU6IEludm9rZSB3L28gYHRoaXNgIHRvIGF2b2lkIGlsbGVnYWwgaW52b2NhdGlvbiBlcnJvci5cbiAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3N1cGFiYXNlL3Bvc3RncmVzdC1qcy9wdWxsLzI0N1xuICAgICAgICBjb25zdCBfZmV0Y2ggPSB0aGlzLmZldGNoO1xuICAgICAgICBsZXQgcmVzID0gX2ZldGNoKHRoaXMudXJsLnRvU3RyaW5nKCksIHtcbiAgICAgICAgICAgIG1ldGhvZDogdGhpcy5tZXRob2QsXG4gICAgICAgICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh0aGlzLmJvZHkpLFxuICAgICAgICAgICAgc2lnbmFsOiB0aGlzLnNpZ25hbCxcbiAgICAgICAgfSkudGhlbihhc3luYyAocmVzKSA9PiB7XG4gICAgICAgICAgICB2YXIgX2EsIF9iLCBfYztcbiAgICAgICAgICAgIGxldCBlcnJvciA9IG51bGw7XG4gICAgICAgICAgICBsZXQgZGF0YSA9IG51bGw7XG4gICAgICAgICAgICBsZXQgY291bnQgPSBudWxsO1xuICAgICAgICAgICAgbGV0IHN0YXR1cyA9IHJlcy5zdGF0dXM7XG4gICAgICAgICAgICBsZXQgc3RhdHVzVGV4dCA9IHJlcy5zdGF0dXNUZXh0O1xuICAgICAgICAgICAgaWYgKHJlcy5vaykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm1ldGhvZCAhPT0gJ0hFQUQnKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGJvZHkgPSBhd2FpdCByZXMudGV4dCgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoYm9keSA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFByZWZlcjogcmV0dXJuPW1pbmltYWxcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmhlYWRlcnNbJ0FjY2VwdCddID09PSAndGV4dC9jc3YnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhID0gYm9keTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmhlYWRlcnNbJ0FjY2VwdCddICYmXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhlYWRlcnNbJ0FjY2VwdCddLmluY2x1ZGVzKCdhcHBsaWNhdGlvbi92bmQucGdyc3QucGxhbit0ZXh0JykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEgPSBib2R5O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YSA9IEpTT04ucGFyc2UoYm9keSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgY291bnRIZWFkZXIgPSAoX2EgPSB0aGlzLmhlYWRlcnNbJ1ByZWZlciddKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EubWF0Y2goL2NvdW50PShleGFjdHxwbGFubmVkfGVzdGltYXRlZCkvKTtcbiAgICAgICAgICAgICAgICBjb25zdCBjb250ZW50UmFuZ2UgPSAoX2IgPSByZXMuaGVhZGVycy5nZXQoJ2NvbnRlbnQtcmFuZ2UnKSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLnNwbGl0KCcvJyk7XG4gICAgICAgICAgICAgICAgaWYgKGNvdW50SGVhZGVyICYmIGNvbnRlbnRSYW5nZSAmJiBjb250ZW50UmFuZ2UubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgICAgICBjb3VudCA9IHBhcnNlSW50KGNvbnRlbnRSYW5nZVsxXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIFRlbXBvcmFyeSBwYXJ0aWFsIGZpeCBmb3IgaHR0cHM6Ly9naXRodWIuY29tL3N1cGFiYXNlL3Bvc3RncmVzdC1qcy9pc3N1ZXMvMzYxXG4gICAgICAgICAgICAgICAgLy8gSXNzdWUgcGVyc2lzdHMgZS5nLiBmb3IgYC5pbnNlcnQoWy4uLl0pLnNlbGVjdCgpLm1heWJlU2luZ2xlKClgXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNNYXliZVNpbmdsZSAmJiB0aGlzLm1ldGhvZCA9PT0gJ0dFVCcgJiYgQXJyYXkuaXNBcnJheShkYXRhKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvciA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vUG9zdGdSRVNUL3Bvc3RncmVzdC9ibG9iL2E4NjdkNzljNDI0MTlhZjE2YzE4YzNmYjAxOWViYThkZjk5MjYyNmYvc3JjL1Bvc3RnUkVTVC9FcnJvci5ocyNMNTUzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29kZTogJ1BHUlNUMTE2JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXRhaWxzOiBgUmVzdWx0cyBjb250YWluICR7ZGF0YS5sZW5ndGh9IHJvd3MsIGFwcGxpY2F0aW9uL3ZuZC5wZ3JzdC5vYmplY3QranNvbiByZXF1aXJlcyAxIHJvd2AsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGludDogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiAnSlNPTiBvYmplY3QgcmVxdWVzdGVkLCBtdWx0aXBsZSAob3Igbm8pIHJvd3MgcmV0dXJuZWQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgY291bnQgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzID0gNDA2O1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzVGV4dCA9ICdOb3QgQWNjZXB0YWJsZSc7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoZGF0YS5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEgPSBkYXRhWzBdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBib2R5ID0gYXdhaXQgcmVzLnRleHQoKTtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBlcnJvciA9IEpTT04ucGFyc2UoYm9keSk7XG4gICAgICAgICAgICAgICAgICAgIC8vIFdvcmthcm91bmQgZm9yIGh0dHBzOi8vZ2l0aHViLmNvbS9zdXBhYmFzZS9wb3N0Z3Jlc3QtanMvaXNzdWVzLzI5NVxuICAgICAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShlcnJvcikgJiYgcmVzLnN0YXR1cyA9PT0gNDA0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvciA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXMgPSAyMDA7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXNUZXh0ID0gJ09LJztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoX2QpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gV29ya2Fyb3VuZCBmb3IgaHR0cHM6Ly9naXRodWIuY29tL3N1cGFiYXNlL3Bvc3RncmVzdC1qcy9pc3N1ZXMvMjk1XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMuc3RhdHVzID09PSA0MDQgJiYgYm9keSA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1cyA9IDIwNDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1c1RleHQgPSAnTm8gQ29udGVudCc7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvciA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBib2R5LFxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoZXJyb3IgJiYgdGhpcy5pc01heWJlU2luZ2xlICYmICgoX2MgPSBlcnJvciA9PT0gbnVsbCB8fCBlcnJvciA9PT0gdm9pZCAwID8gdm9pZCAwIDogZXJyb3IuZGV0YWlscykgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLmluY2x1ZGVzKCdSZXN1bHRzIGNvbnRhaW4gMCByb3dzJykpKSB7XG4gICAgICAgICAgICAgICAgICAgIGVycm9yID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzID0gMjAwO1xuICAgICAgICAgICAgICAgICAgICBzdGF0dXNUZXh0ID0gJ09LJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGVycm9yICYmIHRoaXMuc2hvdWxkVGhyb3dPbkVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHBvc3RncmVzdFJlc3BvbnNlID0ge1xuICAgICAgICAgICAgICAgIGVycm9yLFxuICAgICAgICAgICAgICAgIGRhdGEsXG4gICAgICAgICAgICAgICAgY291bnQsXG4gICAgICAgICAgICAgICAgc3RhdHVzLFxuICAgICAgICAgICAgICAgIHN0YXR1c1RleHQsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcmV0dXJuIHBvc3RncmVzdFJlc3BvbnNlO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKCF0aGlzLnNob3VsZFRocm93T25FcnJvcikge1xuICAgICAgICAgICAgcmVzID0gcmVzLmNhdGNoKChmZXRjaEVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgdmFyIF9hLCBfYiwgX2M7XG4gICAgICAgICAgICAgICAgcmV0dXJuICh7XG4gICAgICAgICAgICAgICAgICAgIGVycm9yOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBgJHsoX2EgPSBmZXRjaEVycm9yID09PSBudWxsIHx8IGZldGNoRXJyb3IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGZldGNoRXJyb3IubmFtZSkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogJ0ZldGNoRXJyb3InfTogJHtmZXRjaEVycm9yID09PSBudWxsIHx8IGZldGNoRXJyb3IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGZldGNoRXJyb3IubWVzc2FnZX1gLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGV0YWlsczogYCR7KF9iID0gZmV0Y2hFcnJvciA9PT0gbnVsbCB8fCBmZXRjaEVycm9yID09PSB2b2lkIDAgPyB2b2lkIDAgOiBmZXRjaEVycm9yLnN0YWNrKSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiAnJ31gLFxuICAgICAgICAgICAgICAgICAgICAgICAgaGludDogJycsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2RlOiBgJHsoX2MgPSBmZXRjaEVycm9yID09PSBudWxsIHx8IGZldGNoRXJyb3IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGZldGNoRXJyb3IuY29kZSkgIT09IG51bGwgJiYgX2MgIT09IHZvaWQgMCA/IF9jIDogJyd9YCxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgY291bnQ6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogMCxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzVGV4dDogJycsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzLnRoZW4ob25mdWxmaWxsZWQsIG9ucmVqZWN0ZWQpO1xuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVBvc3RncmVzdEJ1aWxkZXIuanMubWFwIiwiaW1wb3J0IFBvc3RncmVzdFF1ZXJ5QnVpbGRlciBmcm9tICcuL1Bvc3RncmVzdFF1ZXJ5QnVpbGRlcic7XG5pbXBvcnQgUG9zdGdyZXN0RmlsdGVyQnVpbGRlciBmcm9tICcuL1Bvc3RncmVzdEZpbHRlckJ1aWxkZXInO1xuaW1wb3J0IHsgREVGQVVMVF9IRUFERVJTIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuLyoqXG4gKiBQb3N0Z1JFU1QgY2xpZW50LlxuICpcbiAqIEB0eXBlUGFyYW0gRGF0YWJhc2UgLSBUeXBlcyBmb3IgdGhlIHNjaGVtYSBmcm9tIHRoZSBbdHlwZVxuICogZ2VuZXJhdG9yXShodHRwczovL3N1cGFiYXNlLmNvbS9kb2NzL3JlZmVyZW5jZS9qYXZhc2NyaXB0L25leHQvdHlwZXNjcmlwdC1zdXBwb3J0KVxuICpcbiAqIEB0eXBlUGFyYW0gU2NoZW1hTmFtZSAtIFBvc3RncmVzIHNjaGVtYSB0byBzd2l0Y2ggdG8uIE11c3QgYmUgYSBzdHJpbmdcbiAqIGxpdGVyYWwsIHRoZSBzYW1lIG9uZSBwYXNzZWQgdG8gdGhlIGNvbnN0cnVjdG9yLiBJZiB0aGUgc2NoZW1hIGlzIG5vdFxuICogYFwicHVibGljXCJgLCB0aGlzIG11c3QgYmUgc3VwcGxpZWQgbWFudWFsbHkuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvc3RncmVzdENsaWVudCB7XG4gICAgLy8gVE9ETzogQWRkIGJhY2sgc2hvdWxkVGhyb3dPbkVycm9yIG9uY2Ugd2UgZmlndXJlIG91dCB0aGUgdHlwaW5nc1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBQb3N0Z1JFU1QgY2xpZW50LlxuICAgICAqXG4gICAgICogQHBhcmFtIHVybCAtIFVSTCBvZiB0aGUgUG9zdGdSRVNUIGVuZHBvaW50XG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBOYW1lZCBwYXJhbWV0ZXJzXG4gICAgICogQHBhcmFtIG9wdGlvbnMuaGVhZGVycyAtIEN1c3RvbSBoZWFkZXJzXG4gICAgICogQHBhcmFtIG9wdGlvbnMuc2NoZW1hIC0gUG9zdGdyZXMgc2NoZW1hIHRvIHN3aXRjaCB0b1xuICAgICAqIEBwYXJhbSBvcHRpb25zLmZldGNoIC0gQ3VzdG9tIGZldGNoXG4gICAgICovXG4gICAgY29uc3RydWN0b3IodXJsLCB7IGhlYWRlcnMgPSB7fSwgc2NoZW1hLCBmZXRjaCwgfSA9IHt9KSB7XG4gICAgICAgIHRoaXMudXJsID0gdXJsO1xuICAgICAgICB0aGlzLmhlYWRlcnMgPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIERFRkFVTFRfSEVBREVSUyksIGhlYWRlcnMpO1xuICAgICAgICB0aGlzLnNjaGVtYSA9IHNjaGVtYTtcbiAgICAgICAgdGhpcy5mZXRjaCA9IGZldGNoO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtIGEgcXVlcnkgb24gYSB0YWJsZSBvciBhIHZpZXcuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcmVsYXRpb24gLSBUaGUgdGFibGUgb3IgdmlldyBuYW1lIHRvIHF1ZXJ5XG4gICAgICovXG4gICAgZnJvbShyZWxhdGlvbikge1xuICAgICAgICBjb25zdCB1cmwgPSBuZXcgVVJMKGAke3RoaXMudXJsfS8ke3JlbGF0aW9ufWApO1xuICAgICAgICByZXR1cm4gbmV3IFBvc3RncmVzdFF1ZXJ5QnVpbGRlcih1cmwsIHtcbiAgICAgICAgICAgIGhlYWRlcnM6IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuaGVhZGVycyksXG4gICAgICAgICAgICBzY2hlbWE6IHRoaXMuc2NoZW1hLFxuICAgICAgICAgICAgZmV0Y2g6IHRoaXMuZmV0Y2gsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtIGEgZnVuY3Rpb24gY2FsbC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBmbiAtIFRoZSBmdW5jdGlvbiBuYW1lIHRvIGNhbGxcbiAgICAgKiBAcGFyYW0gYXJncyAtIFRoZSBhcmd1bWVudHMgdG8gcGFzcyB0byB0aGUgZnVuY3Rpb24gY2FsbFxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gTmFtZWQgcGFyYW1ldGVyc1xuICAgICAqIEBwYXJhbSBvcHRpb25zLmhlYWQgLSBXaGVuIHNldCB0byBgdHJ1ZWAsIGBkYXRhYCB3aWxsIG5vdCBiZSByZXR1cm5lZC5cbiAgICAgKiBVc2VmdWwgaWYgeW91IG9ubHkgbmVlZCB0aGUgY291bnQuXG4gICAgICogQHBhcmFtIG9wdGlvbnMuY291bnQgLSBDb3VudCBhbGdvcml0aG0gdG8gdXNlIHRvIGNvdW50IHJvd3MgcmV0dXJuZWQgYnkgdGhlXG4gICAgICogZnVuY3Rpb24uIE9ubHkgYXBwbGljYWJsZSBmb3IgW3NldC1yZXR1cm5pbmdcbiAgICAgKiBmdW5jdGlvbnNdKGh0dHBzOi8vd3d3LnBvc3RncmVzcWwub3JnL2RvY3MvY3VycmVudC9mdW5jdGlvbnMtc3JmLmh0bWwpLlxuICAgICAqXG4gICAgICogYFwiZXhhY3RcImA6IEV4YWN0IGJ1dCBzbG93IGNvdW50IGFsZ29yaXRobS4gUGVyZm9ybXMgYSBgQ09VTlQoKilgIHVuZGVyIHRoZVxuICAgICAqIGhvb2QuXG4gICAgICpcbiAgICAgKiBgXCJwbGFubmVkXCJgOiBBcHByb3hpbWF0ZWQgYnV0IGZhc3QgY291bnQgYWxnb3JpdGhtLiBVc2VzIHRoZSBQb3N0Z3Jlc1xuICAgICAqIHN0YXRpc3RpY3MgdW5kZXIgdGhlIGhvb2QuXG4gICAgICpcbiAgICAgKiBgXCJlc3RpbWF0ZWRcImA6IFVzZXMgZXhhY3QgY291bnQgZm9yIGxvdyBudW1iZXJzIGFuZCBwbGFubmVkIGNvdW50IGZvciBoaWdoXG4gICAgICogbnVtYmVycy5cbiAgICAgKi9cbiAgICBycGMoZm4sIGFyZ3MgPSB7fSwgeyBoZWFkID0gZmFsc2UsIGNvdW50LCB9ID0ge30pIHtcbiAgICAgICAgbGV0IG1ldGhvZDtcbiAgICAgICAgY29uc3QgdXJsID0gbmV3IFVSTChgJHt0aGlzLnVybH0vcnBjLyR7Zm59YCk7XG4gICAgICAgIGxldCBib2R5O1xuICAgICAgICBpZiAoaGVhZCkge1xuICAgICAgICAgICAgbWV0aG9kID0gJ0hFQUQnO1xuICAgICAgICAgICAgT2JqZWN0LmVudHJpZXMoYXJncykuZm9yRWFjaCgoW25hbWUsIHZhbHVlXSkgPT4ge1xuICAgICAgICAgICAgICAgIHVybC5zZWFyY2hQYXJhbXMuYXBwZW5kKG5hbWUsIGAke3ZhbHVlfWApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBtZXRob2QgPSAnUE9TVCc7XG4gICAgICAgICAgICBib2R5ID0gYXJncztcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBoZWFkZXJzID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5oZWFkZXJzKTtcbiAgICAgICAgaWYgKGNvdW50KSB7XG4gICAgICAgICAgICBoZWFkZXJzWydQcmVmZXInXSA9IGBjb3VudD0ke2NvdW50fWA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBQb3N0Z3Jlc3RGaWx0ZXJCdWlsZGVyKHtcbiAgICAgICAgICAgIG1ldGhvZCxcbiAgICAgICAgICAgIHVybCxcbiAgICAgICAgICAgIGhlYWRlcnMsXG4gICAgICAgICAgICBzY2hlbWE6IHRoaXMuc2NoZW1hLFxuICAgICAgICAgICAgYm9keSxcbiAgICAgICAgICAgIGZldGNoOiB0aGlzLmZldGNoLFxuICAgICAgICAgICAgYWxsb3dFbXB0eTogZmFsc2UsXG4gICAgICAgIH0pO1xuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVBvc3RncmVzdENsaWVudC5qcy5tYXAiLCJpbXBvcnQgUG9zdGdyZXN0VHJhbnNmb3JtQnVpbGRlciBmcm9tICcuL1Bvc3RncmVzdFRyYW5zZm9ybUJ1aWxkZXInO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9zdGdyZXN0RmlsdGVyQnVpbGRlciBleHRlbmRzIFBvc3RncmVzdFRyYW5zZm9ybUJ1aWxkZXIge1xuICAgIC8qKlxuICAgICAqIE1hdGNoIG9ubHkgcm93cyB3aGVyZSBgY29sdW1uYCBpcyBlcXVhbCB0byBgdmFsdWVgLlxuICAgICAqXG4gICAgICogVG8gY2hlY2sgaWYgdGhlIHZhbHVlIG9mIGBjb2x1bW5gIGlzIE5VTEwsIHlvdSBzaG91bGQgdXNlIGAuaXMoKWAgaW5zdGVhZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjb2x1bW4gLSBUaGUgY29sdW1uIHRvIGZpbHRlciBvblxuICAgICAqIEBwYXJhbSB2YWx1ZSAtIFRoZSB2YWx1ZSB0byBmaWx0ZXIgd2l0aFxuICAgICAqL1xuICAgIGVxKGNvbHVtbiwgdmFsdWUpIHtcbiAgICAgICAgdGhpcy51cmwuc2VhcmNoUGFyYW1zLmFwcGVuZChjb2x1bW4sIGBlcS4ke3ZhbHVlfWApO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogTWF0Y2ggb25seSByb3dzIHdoZXJlIGBjb2x1bW5gIGlzIG5vdCBlcXVhbCB0byBgdmFsdWVgLlxuICAgICAqXG4gICAgICogQHBhcmFtIGNvbHVtbiAtIFRoZSBjb2x1bW4gdG8gZmlsdGVyIG9uXG4gICAgICogQHBhcmFtIHZhbHVlIC0gVGhlIHZhbHVlIHRvIGZpbHRlciB3aXRoXG4gICAgICovXG4gICAgbmVxKGNvbHVtbiwgdmFsdWUpIHtcbiAgICAgICAgdGhpcy51cmwuc2VhcmNoUGFyYW1zLmFwcGVuZChjb2x1bW4sIGBuZXEuJHt2YWx1ZX1gKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE1hdGNoIG9ubHkgcm93cyB3aGVyZSBgY29sdW1uYCBpcyBncmVhdGVyIHRoYW4gYHZhbHVlYC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjb2x1bW4gLSBUaGUgY29sdW1uIHRvIGZpbHRlciBvblxuICAgICAqIEBwYXJhbSB2YWx1ZSAtIFRoZSB2YWx1ZSB0byBmaWx0ZXIgd2l0aFxuICAgICAqL1xuICAgIGd0KGNvbHVtbiwgdmFsdWUpIHtcbiAgICAgICAgdGhpcy51cmwuc2VhcmNoUGFyYW1zLmFwcGVuZChjb2x1bW4sIGBndC4ke3ZhbHVlfWApO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogTWF0Y2ggb25seSByb3dzIHdoZXJlIGBjb2x1bW5gIGlzIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byBgdmFsdWVgLlxuICAgICAqXG4gICAgICogQHBhcmFtIGNvbHVtbiAtIFRoZSBjb2x1bW4gdG8gZmlsdGVyIG9uXG4gICAgICogQHBhcmFtIHZhbHVlIC0gVGhlIHZhbHVlIHRvIGZpbHRlciB3aXRoXG4gICAgICovXG4gICAgZ3RlKGNvbHVtbiwgdmFsdWUpIHtcbiAgICAgICAgdGhpcy51cmwuc2VhcmNoUGFyYW1zLmFwcGVuZChjb2x1bW4sIGBndGUuJHt2YWx1ZX1gKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE1hdGNoIG9ubHkgcm93cyB3aGVyZSBgY29sdW1uYCBpcyBsZXNzIHRoYW4gYHZhbHVlYC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjb2x1bW4gLSBUaGUgY29sdW1uIHRvIGZpbHRlciBvblxuICAgICAqIEBwYXJhbSB2YWx1ZSAtIFRoZSB2YWx1ZSB0byBmaWx0ZXIgd2l0aFxuICAgICAqL1xuICAgIGx0KGNvbHVtbiwgdmFsdWUpIHtcbiAgICAgICAgdGhpcy51cmwuc2VhcmNoUGFyYW1zLmFwcGVuZChjb2x1bW4sIGBsdC4ke3ZhbHVlfWApO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogTWF0Y2ggb25seSByb3dzIHdoZXJlIGBjb2x1bW5gIGlzIGxlc3MgdGhhbiBvciBlcXVhbCB0byBgdmFsdWVgLlxuICAgICAqXG4gICAgICogQHBhcmFtIGNvbHVtbiAtIFRoZSBjb2x1bW4gdG8gZmlsdGVyIG9uXG4gICAgICogQHBhcmFtIHZhbHVlIC0gVGhlIHZhbHVlIHRvIGZpbHRlciB3aXRoXG4gICAgICovXG4gICAgbHRlKGNvbHVtbiwgdmFsdWUpIHtcbiAgICAgICAgdGhpcy51cmwuc2VhcmNoUGFyYW1zLmFwcGVuZChjb2x1bW4sIGBsdGUuJHt2YWx1ZX1gKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE1hdGNoIG9ubHkgcm93cyB3aGVyZSBgY29sdW1uYCBtYXRjaGVzIGBwYXR0ZXJuYCBjYXNlLXNlbnNpdGl2ZWx5LlxuICAgICAqXG4gICAgICogQHBhcmFtIGNvbHVtbiAtIFRoZSBjb2x1bW4gdG8gZmlsdGVyIG9uXG4gICAgICogQHBhcmFtIHBhdHRlcm4gLSBUaGUgcGF0dGVybiB0byBtYXRjaCB3aXRoXG4gICAgICovXG4gICAgbGlrZShjb2x1bW4sIHBhdHRlcm4pIHtcbiAgICAgICAgdGhpcy51cmwuc2VhcmNoUGFyYW1zLmFwcGVuZChjb2x1bW4sIGBsaWtlLiR7cGF0dGVybn1gKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE1hdGNoIG9ubHkgcm93cyB3aGVyZSBgY29sdW1uYCBtYXRjaGVzIGFsbCBvZiBgcGF0dGVybnNgIGNhc2Utc2Vuc2l0aXZlbHkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY29sdW1uIC0gVGhlIGNvbHVtbiB0byBmaWx0ZXIgb25cbiAgICAgKiBAcGFyYW0gcGF0dGVybnMgLSBUaGUgcGF0dGVybnMgdG8gbWF0Y2ggd2l0aFxuICAgICAqL1xuICAgIGxpa2VBbGxPZihjb2x1bW4sIHBhdHRlcm5zKSB7XG4gICAgICAgIHRoaXMudXJsLnNlYXJjaFBhcmFtcy5hcHBlbmQoY29sdW1uLCBgbGlrZShhbGwpLnske3BhdHRlcm5zLmpvaW4oJywnKX19YCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBNYXRjaCBvbmx5IHJvd3Mgd2hlcmUgYGNvbHVtbmAgbWF0Y2hlcyBhbnkgb2YgYHBhdHRlcm5zYCBjYXNlLXNlbnNpdGl2ZWx5LlxuICAgICAqXG4gICAgICogQHBhcmFtIGNvbHVtbiAtIFRoZSBjb2x1bW4gdG8gZmlsdGVyIG9uXG4gICAgICogQHBhcmFtIHBhdHRlcm5zIC0gVGhlIHBhdHRlcm5zIHRvIG1hdGNoIHdpdGhcbiAgICAgKi9cbiAgICBsaWtlQW55T2YoY29sdW1uLCBwYXR0ZXJucykge1xuICAgICAgICB0aGlzLnVybC5zZWFyY2hQYXJhbXMuYXBwZW5kKGNvbHVtbiwgYGxpa2UoYW55KS57JHtwYXR0ZXJucy5qb2luKCcsJyl9fWApO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogTWF0Y2ggb25seSByb3dzIHdoZXJlIGBjb2x1bW5gIG1hdGNoZXMgYHBhdHRlcm5gIGNhc2UtaW5zZW5zaXRpdmVseS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjb2x1bW4gLSBUaGUgY29sdW1uIHRvIGZpbHRlciBvblxuICAgICAqIEBwYXJhbSBwYXR0ZXJuIC0gVGhlIHBhdHRlcm4gdG8gbWF0Y2ggd2l0aFxuICAgICAqL1xuICAgIGlsaWtlKGNvbHVtbiwgcGF0dGVybikge1xuICAgICAgICB0aGlzLnVybC5zZWFyY2hQYXJhbXMuYXBwZW5kKGNvbHVtbiwgYGlsaWtlLiR7cGF0dGVybn1gKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE1hdGNoIG9ubHkgcm93cyB3aGVyZSBgY29sdW1uYCBtYXRjaGVzIGFsbCBvZiBgcGF0dGVybnNgIGNhc2UtaW5zZW5zaXRpdmVseS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjb2x1bW4gLSBUaGUgY29sdW1uIHRvIGZpbHRlciBvblxuICAgICAqIEBwYXJhbSBwYXR0ZXJucyAtIFRoZSBwYXR0ZXJucyB0byBtYXRjaCB3aXRoXG4gICAgICovXG4gICAgaWxpa2VBbGxPZihjb2x1bW4sIHBhdHRlcm5zKSB7XG4gICAgICAgIHRoaXMudXJsLnNlYXJjaFBhcmFtcy5hcHBlbmQoY29sdW1uLCBgaWxpa2UoYWxsKS57JHtwYXR0ZXJucy5qb2luKCcsJyl9fWApO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogTWF0Y2ggb25seSByb3dzIHdoZXJlIGBjb2x1bW5gIG1hdGNoZXMgYW55IG9mIGBwYXR0ZXJuc2AgY2FzZS1pbnNlbnNpdGl2ZWx5LlxuICAgICAqXG4gICAgICogQHBhcmFtIGNvbHVtbiAtIFRoZSBjb2x1bW4gdG8gZmlsdGVyIG9uXG4gICAgICogQHBhcmFtIHBhdHRlcm5zIC0gVGhlIHBhdHRlcm5zIHRvIG1hdGNoIHdpdGhcbiAgICAgKi9cbiAgICBpbGlrZUFueU9mKGNvbHVtbiwgcGF0dGVybnMpIHtcbiAgICAgICAgdGhpcy51cmwuc2VhcmNoUGFyYW1zLmFwcGVuZChjb2x1bW4sIGBpbGlrZShhbnkpLnske3BhdHRlcm5zLmpvaW4oJywnKX19YCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBNYXRjaCBvbmx5IHJvd3Mgd2hlcmUgYGNvbHVtbmAgSVMgYHZhbHVlYC5cbiAgICAgKlxuICAgICAqIEZvciBub24tYm9vbGVhbiBjb2x1bW5zLCB0aGlzIGlzIG9ubHkgcmVsZXZhbnQgZm9yIGNoZWNraW5nIGlmIHRoZSB2YWx1ZSBvZlxuICAgICAqIGBjb2x1bW5gIGlzIE5VTEwgYnkgc2V0dGluZyBgdmFsdWVgIHRvIGBudWxsYC5cbiAgICAgKlxuICAgICAqIEZvciBib29sZWFuIGNvbHVtbnMsIHlvdSBjYW4gYWxzbyBzZXQgYHZhbHVlYCB0byBgdHJ1ZWAgb3IgYGZhbHNlYCBhbmQgaXRcbiAgICAgKiB3aWxsIGJlaGF2ZSB0aGUgc2FtZSB3YXkgYXMgYC5lcSgpYC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjb2x1bW4gLSBUaGUgY29sdW1uIHRvIGZpbHRlciBvblxuICAgICAqIEBwYXJhbSB2YWx1ZSAtIFRoZSB2YWx1ZSB0byBmaWx0ZXIgd2l0aFxuICAgICAqL1xuICAgIGlzKGNvbHVtbiwgdmFsdWUpIHtcbiAgICAgICAgdGhpcy51cmwuc2VhcmNoUGFyYW1zLmFwcGVuZChjb2x1bW4sIGBpcy4ke3ZhbHVlfWApO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogTWF0Y2ggb25seSByb3dzIHdoZXJlIGBjb2x1bW5gIGlzIGluY2x1ZGVkIGluIHRoZSBgdmFsdWVzYCBhcnJheS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjb2x1bW4gLSBUaGUgY29sdW1uIHRvIGZpbHRlciBvblxuICAgICAqIEBwYXJhbSB2YWx1ZXMgLSBUaGUgdmFsdWVzIGFycmF5IHRvIGZpbHRlciB3aXRoXG4gICAgICovXG4gICAgaW4oY29sdW1uLCB2YWx1ZXMpIHtcbiAgICAgICAgY29uc3QgY2xlYW5lZFZhbHVlcyA9IHZhbHVlc1xuICAgICAgICAgICAgLm1hcCgocykgPT4ge1xuICAgICAgICAgICAgLy8gaGFuZGxlIHBvc3RncmVzdCByZXNlcnZlZCBjaGFyYWN0ZXJzXG4gICAgICAgICAgICAvLyBodHRwczovL3Bvc3RncmVzdC5vcmcvZW4vdjcuMC4wL2FwaS5odG1sI3Jlc2VydmVkLWNoYXJhY3RlcnNcbiAgICAgICAgICAgIGlmICh0eXBlb2YgcyA9PT0gJ3N0cmluZycgJiYgbmV3IFJlZ0V4cCgnWywoKV0nKS50ZXN0KHMpKVxuICAgICAgICAgICAgICAgIHJldHVybiBgXCIke3N9XCJgO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHJldHVybiBgJHtzfWA7XG4gICAgICAgIH0pXG4gICAgICAgICAgICAuam9pbignLCcpO1xuICAgICAgICB0aGlzLnVybC5zZWFyY2hQYXJhbXMuYXBwZW5kKGNvbHVtbiwgYGluLigke2NsZWFuZWRWYWx1ZXN9KWApO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogT25seSByZWxldmFudCBmb3IganNvbmIsIGFycmF5LCBhbmQgcmFuZ2UgY29sdW1ucy4gTWF0Y2ggb25seSByb3dzIHdoZXJlXG4gICAgICogYGNvbHVtbmAgY29udGFpbnMgZXZlcnkgZWxlbWVudCBhcHBlYXJpbmcgaW4gYHZhbHVlYC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjb2x1bW4gLSBUaGUganNvbmIsIGFycmF5LCBvciByYW5nZSBjb2x1bW4gdG8gZmlsdGVyIG9uXG4gICAgICogQHBhcmFtIHZhbHVlIC0gVGhlIGpzb25iLCBhcnJheSwgb3IgcmFuZ2UgdmFsdWUgdG8gZmlsdGVyIHdpdGhcbiAgICAgKi9cbiAgICBjb250YWlucyhjb2x1bW4sIHZhbHVlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAvLyByYW5nZSB0eXBlcyBjYW4gYmUgaW5jbHVzaXZlICdbJywgJ10nIG9yIGV4Y2x1c2l2ZSAnKCcsICcpJyBzbyBqdXN0XG4gICAgICAgICAgICAvLyBrZWVwIGl0IHNpbXBsZSBhbmQgYWNjZXB0IGEgc3RyaW5nXG4gICAgICAgICAgICB0aGlzLnVybC5zZWFyY2hQYXJhbXMuYXBwZW5kKGNvbHVtbiwgYGNzLiR7dmFsdWV9YCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICAgIC8vIGFycmF5XG4gICAgICAgICAgICB0aGlzLnVybC5zZWFyY2hQYXJhbXMuYXBwZW5kKGNvbHVtbiwgYGNzLnske3ZhbHVlLmpvaW4oJywnKX19YCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBqc29uXG4gICAgICAgICAgICB0aGlzLnVybC5zZWFyY2hQYXJhbXMuYXBwZW5kKGNvbHVtbiwgYGNzLiR7SlNPTi5zdHJpbmdpZnkodmFsdWUpfWApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBPbmx5IHJlbGV2YW50IGZvciBqc29uYiwgYXJyYXksIGFuZCByYW5nZSBjb2x1bW5zLiBNYXRjaCBvbmx5IHJvd3Mgd2hlcmVcbiAgICAgKiBldmVyeSBlbGVtZW50IGFwcGVhcmluZyBpbiBgY29sdW1uYCBpcyBjb250YWluZWQgYnkgYHZhbHVlYC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjb2x1bW4gLSBUaGUganNvbmIsIGFycmF5LCBvciByYW5nZSBjb2x1bW4gdG8gZmlsdGVyIG9uXG4gICAgICogQHBhcmFtIHZhbHVlIC0gVGhlIGpzb25iLCBhcnJheSwgb3IgcmFuZ2UgdmFsdWUgdG8gZmlsdGVyIHdpdGhcbiAgICAgKi9cbiAgICBjb250YWluZWRCeShjb2x1bW4sIHZhbHVlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAvLyByYW5nZVxuICAgICAgICAgICAgdGhpcy51cmwuc2VhcmNoUGFyYW1zLmFwcGVuZChjb2x1bW4sIGBjZC4ke3ZhbHVlfWApO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgICAvLyBhcnJheVxuICAgICAgICAgICAgdGhpcy51cmwuc2VhcmNoUGFyYW1zLmFwcGVuZChjb2x1bW4sIGBjZC57JHt2YWx1ZS5qb2luKCcsJyl9fWApO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8ganNvblxuICAgICAgICAgICAgdGhpcy51cmwuc2VhcmNoUGFyYW1zLmFwcGVuZChjb2x1bW4sIGBjZC4ke0pTT04uc3RyaW5naWZ5KHZhbHVlKX1gKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogT25seSByZWxldmFudCBmb3IgcmFuZ2UgY29sdW1ucy4gTWF0Y2ggb25seSByb3dzIHdoZXJlIGV2ZXJ5IGVsZW1lbnQgaW5cbiAgICAgKiBgY29sdW1uYCBpcyBncmVhdGVyIHRoYW4gYW55IGVsZW1lbnQgaW4gYHJhbmdlYC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjb2x1bW4gLSBUaGUgcmFuZ2UgY29sdW1uIHRvIGZpbHRlciBvblxuICAgICAqIEBwYXJhbSByYW5nZSAtIFRoZSByYW5nZSB0byBmaWx0ZXIgd2l0aFxuICAgICAqL1xuICAgIHJhbmdlR3QoY29sdW1uLCByYW5nZSkge1xuICAgICAgICB0aGlzLnVybC5zZWFyY2hQYXJhbXMuYXBwZW5kKGNvbHVtbiwgYHNyLiR7cmFuZ2V9YCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBPbmx5IHJlbGV2YW50IGZvciByYW5nZSBjb2x1bW5zLiBNYXRjaCBvbmx5IHJvd3Mgd2hlcmUgZXZlcnkgZWxlbWVudCBpblxuICAgICAqIGBjb2x1bW5gIGlzIGVpdGhlciBjb250YWluZWQgaW4gYHJhbmdlYCBvciBncmVhdGVyIHRoYW4gYW55IGVsZW1lbnQgaW5cbiAgICAgKiBgcmFuZ2VgLlxuICAgICAqXG4gICAgICogQHBhcmFtIGNvbHVtbiAtIFRoZSByYW5nZSBjb2x1bW4gdG8gZmlsdGVyIG9uXG4gICAgICogQHBhcmFtIHJhbmdlIC0gVGhlIHJhbmdlIHRvIGZpbHRlciB3aXRoXG4gICAgICovXG4gICAgcmFuZ2VHdGUoY29sdW1uLCByYW5nZSkge1xuICAgICAgICB0aGlzLnVybC5zZWFyY2hQYXJhbXMuYXBwZW5kKGNvbHVtbiwgYG54bC4ke3JhbmdlfWApO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogT25seSByZWxldmFudCBmb3IgcmFuZ2UgY29sdW1ucy4gTWF0Y2ggb25seSByb3dzIHdoZXJlIGV2ZXJ5IGVsZW1lbnQgaW5cbiAgICAgKiBgY29sdW1uYCBpcyBsZXNzIHRoYW4gYW55IGVsZW1lbnQgaW4gYHJhbmdlYC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjb2x1bW4gLSBUaGUgcmFuZ2UgY29sdW1uIHRvIGZpbHRlciBvblxuICAgICAqIEBwYXJhbSByYW5nZSAtIFRoZSByYW5nZSB0byBmaWx0ZXIgd2l0aFxuICAgICAqL1xuICAgIHJhbmdlTHQoY29sdW1uLCByYW5nZSkge1xuICAgICAgICB0aGlzLnVybC5zZWFyY2hQYXJhbXMuYXBwZW5kKGNvbHVtbiwgYHNsLiR7cmFuZ2V9YCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBPbmx5IHJlbGV2YW50IGZvciByYW5nZSBjb2x1bW5zLiBNYXRjaCBvbmx5IHJvd3Mgd2hlcmUgZXZlcnkgZWxlbWVudCBpblxuICAgICAqIGBjb2x1bW5gIGlzIGVpdGhlciBjb250YWluZWQgaW4gYHJhbmdlYCBvciBsZXNzIHRoYW4gYW55IGVsZW1lbnQgaW5cbiAgICAgKiBgcmFuZ2VgLlxuICAgICAqXG4gICAgICogQHBhcmFtIGNvbHVtbiAtIFRoZSByYW5nZSBjb2x1bW4gdG8gZmlsdGVyIG9uXG4gICAgICogQHBhcmFtIHJhbmdlIC0gVGhlIHJhbmdlIHRvIGZpbHRlciB3aXRoXG4gICAgICovXG4gICAgcmFuZ2VMdGUoY29sdW1uLCByYW5nZSkge1xuICAgICAgICB0aGlzLnVybC5zZWFyY2hQYXJhbXMuYXBwZW5kKGNvbHVtbiwgYG54ci4ke3JhbmdlfWApO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogT25seSByZWxldmFudCBmb3IgcmFuZ2UgY29sdW1ucy4gTWF0Y2ggb25seSByb3dzIHdoZXJlIGBjb2x1bW5gIGlzXG4gICAgICogbXV0dWFsbHkgZXhjbHVzaXZlIHRvIGByYW5nZWAgYW5kIHRoZXJlIGNhbiBiZSBubyBlbGVtZW50IGJldHdlZW4gdGhlIHR3b1xuICAgICAqIHJhbmdlcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjb2x1bW4gLSBUaGUgcmFuZ2UgY29sdW1uIHRvIGZpbHRlciBvblxuICAgICAqIEBwYXJhbSByYW5nZSAtIFRoZSByYW5nZSB0byBmaWx0ZXIgd2l0aFxuICAgICAqL1xuICAgIHJhbmdlQWRqYWNlbnQoY29sdW1uLCByYW5nZSkge1xuICAgICAgICB0aGlzLnVybC5zZWFyY2hQYXJhbXMuYXBwZW5kKGNvbHVtbiwgYGFkai4ke3JhbmdlfWApO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogT25seSByZWxldmFudCBmb3IgYXJyYXkgYW5kIHJhbmdlIGNvbHVtbnMuIE1hdGNoIG9ubHkgcm93cyB3aGVyZVxuICAgICAqIGBjb2x1bW5gIGFuZCBgdmFsdWVgIGhhdmUgYW4gZWxlbWVudCBpbiBjb21tb24uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY29sdW1uIC0gVGhlIGFycmF5IG9yIHJhbmdlIGNvbHVtbiB0byBmaWx0ZXIgb25cbiAgICAgKiBAcGFyYW0gdmFsdWUgLSBUaGUgYXJyYXkgb3IgcmFuZ2UgdmFsdWUgdG8gZmlsdGVyIHdpdGhcbiAgICAgKi9cbiAgICBvdmVybGFwcyhjb2x1bW4sIHZhbHVlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAvLyByYW5nZVxuICAgICAgICAgICAgdGhpcy51cmwuc2VhcmNoUGFyYW1zLmFwcGVuZChjb2x1bW4sIGBvdi4ke3ZhbHVlfWApO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gYXJyYXlcbiAgICAgICAgICAgIHRoaXMudXJsLnNlYXJjaFBhcmFtcy5hcHBlbmQoY29sdW1uLCBgb3YueyR7dmFsdWUuam9pbignLCcpfX1gKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogT25seSByZWxldmFudCBmb3IgdGV4dCBhbmQgdHN2ZWN0b3IgY29sdW1ucy4gTWF0Y2ggb25seSByb3dzIHdoZXJlXG4gICAgICogYGNvbHVtbmAgbWF0Y2hlcyB0aGUgcXVlcnkgc3RyaW5nIGluIGBxdWVyeWAuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY29sdW1uIC0gVGhlIHRleHQgb3IgdHN2ZWN0b3IgY29sdW1uIHRvIGZpbHRlciBvblxuICAgICAqIEBwYXJhbSBxdWVyeSAtIFRoZSBxdWVyeSB0ZXh0IHRvIG1hdGNoIHdpdGhcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIE5hbWVkIHBhcmFtZXRlcnNcbiAgICAgKiBAcGFyYW0gb3B0aW9ucy5jb25maWcgLSBUaGUgdGV4dCBzZWFyY2ggY29uZmlndXJhdGlvbiB0byB1c2VcbiAgICAgKiBAcGFyYW0gb3B0aW9ucy50eXBlIC0gQ2hhbmdlIGhvdyB0aGUgYHF1ZXJ5YCB0ZXh0IGlzIGludGVycHJldGVkXG4gICAgICovXG4gICAgdGV4dFNlYXJjaChjb2x1bW4sIHF1ZXJ5LCB7IGNvbmZpZywgdHlwZSB9ID0ge30pIHtcbiAgICAgICAgbGV0IHR5cGVQYXJ0ID0gJyc7XG4gICAgICAgIGlmICh0eXBlID09PSAncGxhaW4nKSB7XG4gICAgICAgICAgICB0eXBlUGFydCA9ICdwbCc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZSA9PT0gJ3BocmFzZScpIHtcbiAgICAgICAgICAgIHR5cGVQYXJ0ID0gJ3BoJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlID09PSAnd2Vic2VhcmNoJykge1xuICAgICAgICAgICAgdHlwZVBhcnQgPSAndyc7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY29uZmlnUGFydCA9IGNvbmZpZyA9PT0gdW5kZWZpbmVkID8gJycgOiBgKCR7Y29uZmlnfSlgO1xuICAgICAgICB0aGlzLnVybC5zZWFyY2hQYXJhbXMuYXBwZW5kKGNvbHVtbiwgYCR7dHlwZVBhcnR9ZnRzJHtjb25maWdQYXJ0fS4ke3F1ZXJ5fWApO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogTWF0Y2ggb25seSByb3dzIHdoZXJlIGVhY2ggY29sdW1uIGluIGBxdWVyeWAga2V5cyBpcyBlcXVhbCB0byBpdHNcbiAgICAgKiBhc3NvY2lhdGVkIHZhbHVlLiBTaG9ydGhhbmQgZm9yIG11bHRpcGxlIGAuZXEoKWBzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHF1ZXJ5IC0gVGhlIG9iamVjdCB0byBmaWx0ZXIgd2l0aCwgd2l0aCBjb2x1bW4gbmFtZXMgYXMga2V5cyBtYXBwZWRcbiAgICAgKiB0byB0aGVpciBmaWx0ZXIgdmFsdWVzXG4gICAgICovXG4gICAgbWF0Y2gocXVlcnkpIHtcbiAgICAgICAgT2JqZWN0LmVudHJpZXMocXVlcnkpLmZvckVhY2goKFtjb2x1bW4sIHZhbHVlXSkgPT4ge1xuICAgICAgICAgICAgdGhpcy51cmwuc2VhcmNoUGFyYW1zLmFwcGVuZChjb2x1bW4sIGBlcS4ke3ZhbHVlfWApO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE1hdGNoIG9ubHkgcm93cyB3aGljaCBkb2Vzbid0IHNhdGlzZnkgdGhlIGZpbHRlci5cbiAgICAgKlxuICAgICAqIFVubGlrZSBtb3N0IGZpbHRlcnMsIGBvcGVhcmF0b3JgIGFuZCBgdmFsdWVgIGFyZSB1c2VkIGFzLWlzIGFuZCBuZWVkIHRvXG4gICAgICogZm9sbG93IFtQb3N0Z1JFU1RcbiAgICAgKiBzeW50YXhdKGh0dHBzOi8vcG9zdGdyZXN0Lm9yZy9lbi9zdGFibGUvYXBpLmh0bWwjb3BlcmF0b3JzKS4gWW91IGFsc28gbmVlZFxuICAgICAqIHRvIG1ha2Ugc3VyZSB0aGV5IGFyZSBwcm9wZXJseSBzYW5pdGl6ZWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY29sdW1uIC0gVGhlIGNvbHVtbiB0byBmaWx0ZXIgb25cbiAgICAgKiBAcGFyYW0gb3BlcmF0b3IgLSBUaGUgb3BlcmF0b3IgdG8gYmUgbmVnYXRlZCB0byBmaWx0ZXIgd2l0aCwgZm9sbG93aW5nXG4gICAgICogUG9zdGdSRVNUIHN5bnRheFxuICAgICAqIEBwYXJhbSB2YWx1ZSAtIFRoZSB2YWx1ZSB0byBmaWx0ZXIgd2l0aCwgZm9sbG93aW5nIFBvc3RnUkVTVCBzeW50YXhcbiAgICAgKi9cbiAgICBub3QoY29sdW1uLCBvcGVyYXRvciwgdmFsdWUpIHtcbiAgICAgICAgdGhpcy51cmwuc2VhcmNoUGFyYW1zLmFwcGVuZChjb2x1bW4sIGBub3QuJHtvcGVyYXRvcn0uJHt2YWx1ZX1gKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE1hdGNoIG9ubHkgcm93cyB3aGljaCBzYXRpc2Z5IGF0IGxlYXN0IG9uZSBvZiB0aGUgZmlsdGVycy5cbiAgICAgKlxuICAgICAqIFVubGlrZSBtb3N0IGZpbHRlcnMsIGBmaWx0ZXJzYCBpcyB1c2VkIGFzLWlzIGFuZCBuZWVkcyB0byBmb2xsb3cgW1Bvc3RnUkVTVFxuICAgICAqIHN5bnRheF0oaHR0cHM6Ly9wb3N0Z3Jlc3Qub3JnL2VuL3N0YWJsZS9hcGkuaHRtbCNvcGVyYXRvcnMpLiBZb3UgYWxzbyBuZWVkXG4gICAgICogdG8gbWFrZSBzdXJlIGl0J3MgcHJvcGVybHkgc2FuaXRpemVkLlxuICAgICAqXG4gICAgICogSXQncyBjdXJyZW50bHkgbm90IHBvc3NpYmxlIHRvIGRvIGFuIGAub3IoKWAgZmlsdGVyIGFjcm9zcyBtdWx0aXBsZSB0YWJsZXMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZmlsdGVycyAtIFRoZSBmaWx0ZXJzIHRvIHVzZSwgZm9sbG93aW5nIFBvc3RnUkVTVCBzeW50YXhcbiAgICAgKiBAcGFyYW0gZm9yZWlnblRhYmxlIC0gU2V0IHRoaXMgdG8gZmlsdGVyIG9uIGZvcmVpZ24gdGFibGVzIGluc3RlYWQgb2YgdGhlXG4gICAgICogY3VycmVudCB0YWJsZVxuICAgICAqL1xuICAgIG9yKGZpbHRlcnMsIHsgZm9yZWlnblRhYmxlIH0gPSB7fSkge1xuICAgICAgICBjb25zdCBrZXkgPSBmb3JlaWduVGFibGUgPyBgJHtmb3JlaWduVGFibGV9Lm9yYCA6ICdvcic7XG4gICAgICAgIHRoaXMudXJsLnNlYXJjaFBhcmFtcy5hcHBlbmQoa2V5LCBgKCR7ZmlsdGVyc30pYCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBNYXRjaCBvbmx5IHJvd3Mgd2hpY2ggc2F0aXNmeSB0aGUgZmlsdGVyLiBUaGlzIGlzIGFuIGVzY2FwZSBoYXRjaCAtIHlvdVxuICAgICAqIHNob3VsZCB1c2UgdGhlIHNwZWNpZmljIGZpbHRlciBtZXRob2RzIHdoZXJldmVyIHBvc3NpYmxlLlxuICAgICAqXG4gICAgICogVW5saWtlIG1vc3QgZmlsdGVycywgYG9wZWFyYXRvcmAgYW5kIGB2YWx1ZWAgYXJlIHVzZWQgYXMtaXMgYW5kIG5lZWQgdG9cbiAgICAgKiBmb2xsb3cgW1Bvc3RnUkVTVFxuICAgICAqIHN5bnRheF0oaHR0cHM6Ly9wb3N0Z3Jlc3Qub3JnL2VuL3N0YWJsZS9hcGkuaHRtbCNvcGVyYXRvcnMpLiBZb3UgYWxzbyBuZWVkXG4gICAgICogdG8gbWFrZSBzdXJlIHRoZXkgYXJlIHByb3Blcmx5IHNhbml0aXplZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjb2x1bW4gLSBUaGUgY29sdW1uIHRvIGZpbHRlciBvblxuICAgICAqIEBwYXJhbSBvcGVyYXRvciAtIFRoZSBvcGVyYXRvciB0byBmaWx0ZXIgd2l0aCwgZm9sbG93aW5nIFBvc3RnUkVTVCBzeW50YXhcbiAgICAgKiBAcGFyYW0gdmFsdWUgLSBUaGUgdmFsdWUgdG8gZmlsdGVyIHdpdGgsIGZvbGxvd2luZyBQb3N0Z1JFU1Qgc3ludGF4XG4gICAgICovXG4gICAgZmlsdGVyKGNvbHVtbiwgb3BlcmF0b3IsIHZhbHVlKSB7XG4gICAgICAgIHRoaXMudXJsLnNlYXJjaFBhcmFtcy5hcHBlbmQoY29sdW1uLCBgJHtvcGVyYXRvcn0uJHt2YWx1ZX1gKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9UG9zdGdyZXN0RmlsdGVyQnVpbGRlci5qcy5tYXAiLCJpbXBvcnQgUG9zdGdyZXN0RmlsdGVyQnVpbGRlciBmcm9tICcuL1Bvc3RncmVzdEZpbHRlckJ1aWxkZXInO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9zdGdyZXN0UXVlcnlCdWlsZGVyIHtcbiAgICBjb25zdHJ1Y3Rvcih1cmwsIHsgaGVhZGVycyA9IHt9LCBzY2hlbWEsIGZldGNoLCB9KSB7XG4gICAgICAgIHRoaXMudXJsID0gdXJsO1xuICAgICAgICB0aGlzLmhlYWRlcnMgPSBoZWFkZXJzO1xuICAgICAgICB0aGlzLnNjaGVtYSA9IHNjaGVtYTtcbiAgICAgICAgdGhpcy5mZXRjaCA9IGZldGNoO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtIGEgU0VMRUNUIHF1ZXJ5IG9uIHRoZSB0YWJsZSBvciB2aWV3LlxuICAgICAqXG4gICAgICogQHBhcmFtIGNvbHVtbnMgLSBUaGUgY29sdW1ucyB0byByZXRyaWV2ZSwgc2VwYXJhdGVkIGJ5IGNvbW1hcy4gQ29sdW1ucyBjYW4gYmUgcmVuYW1lZCB3aGVuIHJldHVybmVkIHdpdGggYGN1c3RvbU5hbWU6Y29sdW1uTmFtZWBcbiAgICAgKlxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gTmFtZWQgcGFyYW1ldGVyc1xuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbnMuaGVhZCAtIFdoZW4gc2V0IHRvIGB0cnVlYCwgYGRhdGFgIHdpbGwgbm90IGJlIHJldHVybmVkLlxuICAgICAqIFVzZWZ1bCBpZiB5b3Ugb25seSBuZWVkIHRoZSBjb3VudC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBvcHRpb25zLmNvdW50IC0gQ291bnQgYWxnb3JpdGhtIHRvIHVzZSB0byBjb3VudCByb3dzIGluIHRoZSB0YWJsZSBvciB2aWV3LlxuICAgICAqXG4gICAgICogYFwiZXhhY3RcImA6IEV4YWN0IGJ1dCBzbG93IGNvdW50IGFsZ29yaXRobS4gUGVyZm9ybXMgYSBgQ09VTlQoKilgIHVuZGVyIHRoZVxuICAgICAqIGhvb2QuXG4gICAgICpcbiAgICAgKiBgXCJwbGFubmVkXCJgOiBBcHByb3hpbWF0ZWQgYnV0IGZhc3QgY291bnQgYWxnb3JpdGhtLiBVc2VzIHRoZSBQb3N0Z3Jlc1xuICAgICAqIHN0YXRpc3RpY3MgdW5kZXIgdGhlIGhvb2QuXG4gICAgICpcbiAgICAgKiBgXCJlc3RpbWF0ZWRcImA6IFVzZXMgZXhhY3QgY291bnQgZm9yIGxvdyBudW1iZXJzIGFuZCBwbGFubmVkIGNvdW50IGZvciBoaWdoXG4gICAgICogbnVtYmVycy5cbiAgICAgKi9cbiAgICBzZWxlY3QoY29sdW1ucywgeyBoZWFkID0gZmFsc2UsIGNvdW50LCB9ID0ge30pIHtcbiAgICAgICAgY29uc3QgbWV0aG9kID0gaGVhZCA/ICdIRUFEJyA6ICdHRVQnO1xuICAgICAgICAvLyBSZW1vdmUgd2hpdGVzcGFjZXMgZXhjZXB0IHdoZW4gcXVvdGVkXG4gICAgICAgIGxldCBxdW90ZWQgPSBmYWxzZTtcbiAgICAgICAgY29uc3QgY2xlYW5lZENvbHVtbnMgPSAoY29sdW1ucyAhPT0gbnVsbCAmJiBjb2x1bW5zICE9PSB2b2lkIDAgPyBjb2x1bW5zIDogJyonKVxuICAgICAgICAgICAgLnNwbGl0KCcnKVxuICAgICAgICAgICAgLm1hcCgoYykgPT4ge1xuICAgICAgICAgICAgaWYgKC9cXHMvLnRlc3QoYykgJiYgIXF1b3RlZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjID09PSAnXCInKSB7XG4gICAgICAgICAgICAgICAgcXVvdGVkID0gIXF1b3RlZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjO1xuICAgICAgICB9KVxuICAgICAgICAgICAgLmpvaW4oJycpO1xuICAgICAgICB0aGlzLnVybC5zZWFyY2hQYXJhbXMuc2V0KCdzZWxlY3QnLCBjbGVhbmVkQ29sdW1ucyk7XG4gICAgICAgIGlmIChjb3VudCkge1xuICAgICAgICAgICAgdGhpcy5oZWFkZXJzWydQcmVmZXInXSA9IGBjb3VudD0ke2NvdW50fWA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBQb3N0Z3Jlc3RGaWx0ZXJCdWlsZGVyKHtcbiAgICAgICAgICAgIG1ldGhvZCxcbiAgICAgICAgICAgIHVybDogdGhpcy51cmwsXG4gICAgICAgICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgICAgICAgICBzY2hlbWE6IHRoaXMuc2NoZW1hLFxuICAgICAgICAgICAgZmV0Y2g6IHRoaXMuZmV0Y2gsXG4gICAgICAgICAgICBhbGxvd0VtcHR5OiBmYWxzZSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFBlcmZvcm0gYW4gSU5TRVJUIGludG8gdGhlIHRhYmxlIG9yIHZpZXcuXG4gICAgICpcbiAgICAgKiBCeSBkZWZhdWx0LCBpbnNlcnRlZCByb3dzIGFyZSBub3QgcmV0dXJuZWQuIFRvIHJldHVybiBpdCwgY2hhaW4gdGhlIGNhbGxcbiAgICAgKiB3aXRoIGAuc2VsZWN0KClgLlxuICAgICAqXG4gICAgICogQHBhcmFtIHZhbHVlcyAtIFRoZSB2YWx1ZXMgdG8gaW5zZXJ0LiBQYXNzIGFuIG9iamVjdCB0byBpbnNlcnQgYSBzaW5nbGUgcm93XG4gICAgICogb3IgYW4gYXJyYXkgdG8gaW5zZXJ0IG11bHRpcGxlIHJvd3MuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIE5hbWVkIHBhcmFtZXRlcnNcbiAgICAgKlxuICAgICAqIEBwYXJhbSBvcHRpb25zLmNvdW50IC0gQ291bnQgYWxnb3JpdGhtIHRvIHVzZSB0byBjb3VudCBpbnNlcnRlZCByb3dzLlxuICAgICAqXG4gICAgICogYFwiZXhhY3RcImA6IEV4YWN0IGJ1dCBzbG93IGNvdW50IGFsZ29yaXRobS4gUGVyZm9ybXMgYSBgQ09VTlQoKilgIHVuZGVyIHRoZVxuICAgICAqIGhvb2QuXG4gICAgICpcbiAgICAgKiBgXCJwbGFubmVkXCJgOiBBcHByb3hpbWF0ZWQgYnV0IGZhc3QgY291bnQgYWxnb3JpdGhtLiBVc2VzIHRoZSBQb3N0Z3Jlc1xuICAgICAqIHN0YXRpc3RpY3MgdW5kZXIgdGhlIGhvb2QuXG4gICAgICpcbiAgICAgKiBgXCJlc3RpbWF0ZWRcImA6IFVzZXMgZXhhY3QgY291bnQgZm9yIGxvdyBudW1iZXJzIGFuZCBwbGFubmVkIGNvdW50IGZvciBoaWdoXG4gICAgICogbnVtYmVycy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBvcHRpb25zLmRlZmF1bHRUb051bGwgLSBNYWtlIG1pc3NpbmcgZmllbGRzIGRlZmF1bHQgdG8gYG51bGxgLlxuICAgICAqIE90aGVyd2lzZSwgdXNlIHRoZSBkZWZhdWx0IHZhbHVlIGZvciB0aGUgY29sdW1uLlxuICAgICAqL1xuICAgIGluc2VydCh2YWx1ZXMsIHsgY291bnQsIGRlZmF1bHRUb051bGwgPSB0cnVlLCB9ID0ge30pIHtcbiAgICAgICAgY29uc3QgbWV0aG9kID0gJ1BPU1QnO1xuICAgICAgICBjb25zdCBwcmVmZXJzSGVhZGVycyA9IFtdO1xuICAgICAgICBpZiAodGhpcy5oZWFkZXJzWydQcmVmZXInXSkge1xuICAgICAgICAgICAgcHJlZmVyc0hlYWRlcnMucHVzaCh0aGlzLmhlYWRlcnNbJ1ByZWZlciddKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY291bnQpIHtcbiAgICAgICAgICAgIHByZWZlcnNIZWFkZXJzLnB1c2goYGNvdW50PSR7Y291bnR9YCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFkZWZhdWx0VG9OdWxsKSB7XG4gICAgICAgICAgICBwcmVmZXJzSGVhZGVycy5wdXNoKCdtaXNzaW5nPWRlZmF1bHQnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmhlYWRlcnNbJ1ByZWZlciddID0gcHJlZmVyc0hlYWRlcnMuam9pbignLCcpO1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZXMpKSB7XG4gICAgICAgICAgICBjb25zdCBjb2x1bW5zID0gdmFsdWVzLnJlZHVjZSgoYWNjLCB4KSA9PiBhY2MuY29uY2F0KE9iamVjdC5rZXlzKHgpKSwgW10pO1xuICAgICAgICAgICAgaWYgKGNvbHVtbnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHVuaXF1ZUNvbHVtbnMgPSBbLi4ubmV3IFNldChjb2x1bW5zKV0ubWFwKChjb2x1bW4pID0+IGBcIiR7Y29sdW1ufVwiYCk7XG4gICAgICAgICAgICAgICAgdGhpcy51cmwuc2VhcmNoUGFyYW1zLnNldCgnY29sdW1ucycsIHVuaXF1ZUNvbHVtbnMuam9pbignLCcpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IFBvc3RncmVzdEZpbHRlckJ1aWxkZXIoe1xuICAgICAgICAgICAgbWV0aG9kLFxuICAgICAgICAgICAgdXJsOiB0aGlzLnVybCxcbiAgICAgICAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICAgICAgICAgIHNjaGVtYTogdGhpcy5zY2hlbWEsXG4gICAgICAgICAgICBib2R5OiB2YWx1ZXMsXG4gICAgICAgICAgICBmZXRjaDogdGhpcy5mZXRjaCxcbiAgICAgICAgICAgIGFsbG93RW1wdHk6IGZhbHNlLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUGVyZm9ybSBhbiBVUFNFUlQgb24gdGhlIHRhYmxlIG9yIHZpZXcuIERlcGVuZGluZyBvbiB0aGUgY29sdW1uKHMpIHBhc3NlZFxuICAgICAqIHRvIGBvbkNvbmZsaWN0YCwgYC51cHNlcnQoKWAgYWxsb3dzIHlvdSB0byBwZXJmb3JtIHRoZSBlcXVpdmFsZW50IG9mXG4gICAgICogYC5pbnNlcnQoKWAgaWYgYSByb3cgd2l0aCB0aGUgY29ycmVzcG9uZGluZyBgb25Db25mbGljdGAgY29sdW1ucyBkb2Vzbid0XG4gICAgICogZXhpc3QsIG9yIGlmIGl0IGRvZXMgZXhpc3QsIHBlcmZvcm0gYW4gYWx0ZXJuYXRpdmUgYWN0aW9uIGRlcGVuZGluZyBvblxuICAgICAqIGBpZ25vcmVEdXBsaWNhdGVzYC5cbiAgICAgKlxuICAgICAqIEJ5IGRlZmF1bHQsIHVwc2VydGVkIHJvd3MgYXJlIG5vdCByZXR1cm5lZC4gVG8gcmV0dXJuIGl0LCBjaGFpbiB0aGUgY2FsbFxuICAgICAqIHdpdGggYC5zZWxlY3QoKWAuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gdmFsdWVzIC0gVGhlIHZhbHVlcyB0byB1cHNlcnQgd2l0aC4gUGFzcyBhbiBvYmplY3QgdG8gdXBzZXJ0IGFcbiAgICAgKiBzaW5nbGUgcm93IG9yIGFuIGFycmF5IHRvIHVwc2VydCBtdWx0aXBsZSByb3dzLlxuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBOYW1lZCBwYXJhbWV0ZXJzXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3B0aW9ucy5vbkNvbmZsaWN0IC0gQ29tbWEtc2VwYXJhdGVkIFVOSVFVRSBjb2x1bW4ocykgdG8gc3BlY2lmeSBob3dcbiAgICAgKiBkdXBsaWNhdGUgcm93cyBhcmUgZGV0ZXJtaW5lZC4gVHdvIHJvd3MgYXJlIGR1cGxpY2F0ZXMgaWYgYWxsIHRoZVxuICAgICAqIGBvbkNvbmZsaWN0YCBjb2x1bW5zIGFyZSBlcXVhbC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBvcHRpb25zLmlnbm9yZUR1cGxpY2F0ZXMgLSBJZiBgdHJ1ZWAsIGR1cGxpY2F0ZSByb3dzIGFyZSBpZ25vcmVkLiBJZlxuICAgICAqIGBmYWxzZWAsIGR1cGxpY2F0ZSByb3dzIGFyZSBtZXJnZWQgd2l0aCBleGlzdGluZyByb3dzLlxuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbnMuY291bnQgLSBDb3VudCBhbGdvcml0aG0gdG8gdXNlIHRvIGNvdW50IHVwc2VydGVkIHJvd3MuXG4gICAgICpcbiAgICAgKiBgXCJleGFjdFwiYDogRXhhY3QgYnV0IHNsb3cgY291bnQgYWxnb3JpdGhtLiBQZXJmb3JtcyBhIGBDT1VOVCgqKWAgdW5kZXIgdGhlXG4gICAgICogaG9vZC5cbiAgICAgKlxuICAgICAqIGBcInBsYW5uZWRcImA6IEFwcHJveGltYXRlZCBidXQgZmFzdCBjb3VudCBhbGdvcml0aG0uIFVzZXMgdGhlIFBvc3RncmVzXG4gICAgICogc3RhdGlzdGljcyB1bmRlciB0aGUgaG9vZC5cbiAgICAgKlxuICAgICAqIGBcImVzdGltYXRlZFwiYDogVXNlcyBleGFjdCBjb3VudCBmb3IgbG93IG51bWJlcnMgYW5kIHBsYW5uZWQgY291bnQgZm9yIGhpZ2hcbiAgICAgKiBudW1iZXJzLlxuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbnMuZGVmYXVsdFRvTnVsbCAtIE1ha2UgbWlzc2luZyBmaWVsZHMgZGVmYXVsdCB0byBgbnVsbGAuXG4gICAgICogT3RoZXJ3aXNlLCB1c2UgdGhlIGRlZmF1bHQgdmFsdWUgZm9yIHRoZSBjb2x1bW4uIFRoaXMgb25seSBhcHBsaWVzIHdoZW5cbiAgICAgKiBpbnNlcnRpbmcgbmV3IHJvd3MsIG5vdCB3aGVuIG1lcmdpbmcgd2l0aCBleGlzdGluZyByb3dzIHVuZGVyXG4gICAgICogYGlnbm9yZUR1cGxpY2F0ZXM6IGZhbHNlYC5cbiAgICAgKi9cbiAgICB1cHNlcnQodmFsdWVzLCB7IG9uQ29uZmxpY3QsIGlnbm9yZUR1cGxpY2F0ZXMgPSBmYWxzZSwgY291bnQsIGRlZmF1bHRUb051bGwgPSB0cnVlLCB9ID0ge30pIHtcbiAgICAgICAgY29uc3QgbWV0aG9kID0gJ1BPU1QnO1xuICAgICAgICBjb25zdCBwcmVmZXJzSGVhZGVycyA9IFtgcmVzb2x1dGlvbj0ke2lnbm9yZUR1cGxpY2F0ZXMgPyAnaWdub3JlJyA6ICdtZXJnZSd9LWR1cGxpY2F0ZXNgXTtcbiAgICAgICAgaWYgKG9uQ29uZmxpY3QgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHRoaXMudXJsLnNlYXJjaFBhcmFtcy5zZXQoJ29uX2NvbmZsaWN0Jywgb25Db25mbGljdCk7XG4gICAgICAgIGlmICh0aGlzLmhlYWRlcnNbJ1ByZWZlciddKSB7XG4gICAgICAgICAgICBwcmVmZXJzSGVhZGVycy5wdXNoKHRoaXMuaGVhZGVyc1snUHJlZmVyJ10pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb3VudCkge1xuICAgICAgICAgICAgcHJlZmVyc0hlYWRlcnMucHVzaChgY291bnQ9JHtjb3VudH1gKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWRlZmF1bHRUb051bGwpIHtcbiAgICAgICAgICAgIHByZWZlcnNIZWFkZXJzLnB1c2goJ21pc3Npbmc9ZGVmYXVsdCcpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaGVhZGVyc1snUHJlZmVyJ10gPSBwcmVmZXJzSGVhZGVycy5qb2luKCcsJyk7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlcykpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbHVtbnMgPSB2YWx1ZXMucmVkdWNlKChhY2MsIHgpID0+IGFjYy5jb25jYXQoT2JqZWN0LmtleXMoeCkpLCBbXSk7XG4gICAgICAgICAgICBpZiAoY29sdW1ucy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdW5pcXVlQ29sdW1ucyA9IFsuLi5uZXcgU2V0KGNvbHVtbnMpXS5tYXAoKGNvbHVtbikgPT4gYFwiJHtjb2x1bW59XCJgKTtcbiAgICAgICAgICAgICAgICB0aGlzLnVybC5zZWFyY2hQYXJhbXMuc2V0KCdjb2x1bW5zJywgdW5pcXVlQ29sdW1ucy5qb2luKCcsJykpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgUG9zdGdyZXN0RmlsdGVyQnVpbGRlcih7XG4gICAgICAgICAgICBtZXRob2QsXG4gICAgICAgICAgICB1cmw6IHRoaXMudXJsLFxuICAgICAgICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxuICAgICAgICAgICAgc2NoZW1hOiB0aGlzLnNjaGVtYSxcbiAgICAgICAgICAgIGJvZHk6IHZhbHVlcyxcbiAgICAgICAgICAgIGZldGNoOiB0aGlzLmZldGNoLFxuICAgICAgICAgICAgYWxsb3dFbXB0eTogZmFsc2UsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtIGFuIFVQREFURSBvbiB0aGUgdGFibGUgb3Igdmlldy5cbiAgICAgKlxuICAgICAqIEJ5IGRlZmF1bHQsIHVwZGF0ZWQgcm93cyBhcmUgbm90IHJldHVybmVkLiBUbyByZXR1cm4gaXQsIGNoYWluIHRoZSBjYWxsXG4gICAgICogd2l0aCBgLnNlbGVjdCgpYCBhZnRlciBmaWx0ZXJzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHZhbHVlcyAtIFRoZSB2YWx1ZXMgdG8gdXBkYXRlIHdpdGhcbiAgICAgKlxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gTmFtZWQgcGFyYW1ldGVyc1xuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbnMuY291bnQgLSBDb3VudCBhbGdvcml0aG0gdG8gdXNlIHRvIGNvdW50IHVwZGF0ZWQgcm93cy5cbiAgICAgKlxuICAgICAqIGBcImV4YWN0XCJgOiBFeGFjdCBidXQgc2xvdyBjb3VudCBhbGdvcml0aG0uIFBlcmZvcm1zIGEgYENPVU5UKCopYCB1bmRlciB0aGVcbiAgICAgKiBob29kLlxuICAgICAqXG4gICAgICogYFwicGxhbm5lZFwiYDogQXBwcm94aW1hdGVkIGJ1dCBmYXN0IGNvdW50IGFsZ29yaXRobS4gVXNlcyB0aGUgUG9zdGdyZXNcbiAgICAgKiBzdGF0aXN0aWNzIHVuZGVyIHRoZSBob29kLlxuICAgICAqXG4gICAgICogYFwiZXN0aW1hdGVkXCJgOiBVc2VzIGV4YWN0IGNvdW50IGZvciBsb3cgbnVtYmVycyBhbmQgcGxhbm5lZCBjb3VudCBmb3IgaGlnaFxuICAgICAqIG51bWJlcnMuXG4gICAgICovXG4gICAgdXBkYXRlKHZhbHVlcywgeyBjb3VudCwgfSA9IHt9KSB7XG4gICAgICAgIGNvbnN0IG1ldGhvZCA9ICdQQVRDSCc7XG4gICAgICAgIGNvbnN0IHByZWZlcnNIZWFkZXJzID0gW107XG4gICAgICAgIGlmICh0aGlzLmhlYWRlcnNbJ1ByZWZlciddKSB7XG4gICAgICAgICAgICBwcmVmZXJzSGVhZGVycy5wdXNoKHRoaXMuaGVhZGVyc1snUHJlZmVyJ10pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb3VudCkge1xuICAgICAgICAgICAgcHJlZmVyc0hlYWRlcnMucHVzaChgY291bnQ9JHtjb3VudH1gKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmhlYWRlcnNbJ1ByZWZlciddID0gcHJlZmVyc0hlYWRlcnMuam9pbignLCcpO1xuICAgICAgICByZXR1cm4gbmV3IFBvc3RncmVzdEZpbHRlckJ1aWxkZXIoe1xuICAgICAgICAgICAgbWV0aG9kLFxuICAgICAgICAgICAgdXJsOiB0aGlzLnVybCxcbiAgICAgICAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICAgICAgICAgIHNjaGVtYTogdGhpcy5zY2hlbWEsXG4gICAgICAgICAgICBib2R5OiB2YWx1ZXMsXG4gICAgICAgICAgICBmZXRjaDogdGhpcy5mZXRjaCxcbiAgICAgICAgICAgIGFsbG93RW1wdHk6IGZhbHNlLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUGVyZm9ybSBhIERFTEVURSBvbiB0aGUgdGFibGUgb3Igdmlldy5cbiAgICAgKlxuICAgICAqIEJ5IGRlZmF1bHQsIGRlbGV0ZWQgcm93cyBhcmUgbm90IHJldHVybmVkLiBUbyByZXR1cm4gaXQsIGNoYWluIHRoZSBjYWxsXG4gICAgICogd2l0aCBgLnNlbGVjdCgpYCBhZnRlciBmaWx0ZXJzLlxuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBOYW1lZCBwYXJhbWV0ZXJzXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3B0aW9ucy5jb3VudCAtIENvdW50IGFsZ29yaXRobSB0byB1c2UgdG8gY291bnQgZGVsZXRlZCByb3dzLlxuICAgICAqXG4gICAgICogYFwiZXhhY3RcImA6IEV4YWN0IGJ1dCBzbG93IGNvdW50IGFsZ29yaXRobS4gUGVyZm9ybXMgYSBgQ09VTlQoKilgIHVuZGVyIHRoZVxuICAgICAqIGhvb2QuXG4gICAgICpcbiAgICAgKiBgXCJwbGFubmVkXCJgOiBBcHByb3hpbWF0ZWQgYnV0IGZhc3QgY291bnQgYWxnb3JpdGhtLiBVc2VzIHRoZSBQb3N0Z3Jlc1xuICAgICAqIHN0YXRpc3RpY3MgdW5kZXIgdGhlIGhvb2QuXG4gICAgICpcbiAgICAgKiBgXCJlc3RpbWF0ZWRcImA6IFVzZXMgZXhhY3QgY291bnQgZm9yIGxvdyBudW1iZXJzIGFuZCBwbGFubmVkIGNvdW50IGZvciBoaWdoXG4gICAgICogbnVtYmVycy5cbiAgICAgKi9cbiAgICBkZWxldGUoeyBjb3VudCwgfSA9IHt9KSB7XG4gICAgICAgIGNvbnN0IG1ldGhvZCA9ICdERUxFVEUnO1xuICAgICAgICBjb25zdCBwcmVmZXJzSGVhZGVycyA9IFtdO1xuICAgICAgICBpZiAoY291bnQpIHtcbiAgICAgICAgICAgIHByZWZlcnNIZWFkZXJzLnB1c2goYGNvdW50PSR7Y291bnR9YCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuaGVhZGVyc1snUHJlZmVyJ10pIHtcbiAgICAgICAgICAgIHByZWZlcnNIZWFkZXJzLnVuc2hpZnQodGhpcy5oZWFkZXJzWydQcmVmZXInXSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5oZWFkZXJzWydQcmVmZXInXSA9IHByZWZlcnNIZWFkZXJzLmpvaW4oJywnKTtcbiAgICAgICAgcmV0dXJuIG5ldyBQb3N0Z3Jlc3RGaWx0ZXJCdWlsZGVyKHtcbiAgICAgICAgICAgIG1ldGhvZCxcbiAgICAgICAgICAgIHVybDogdGhpcy51cmwsXG4gICAgICAgICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgICAgICAgICBzY2hlbWE6IHRoaXMuc2NoZW1hLFxuICAgICAgICAgICAgZmV0Y2g6IHRoaXMuZmV0Y2gsXG4gICAgICAgICAgICBhbGxvd0VtcHR5OiBmYWxzZSxcbiAgICAgICAgfSk7XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9UG9zdGdyZXN0UXVlcnlCdWlsZGVyLmpzLm1hcCIsImltcG9ydCBQb3N0Z3Jlc3RCdWlsZGVyIGZyb20gJy4vUG9zdGdyZXN0QnVpbGRlcic7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb3N0Z3Jlc3RUcmFuc2Zvcm1CdWlsZGVyIGV4dGVuZHMgUG9zdGdyZXN0QnVpbGRlciB7XG4gICAgLyoqXG4gICAgICogUGVyZm9ybSBhIFNFTEVDVCBvbiB0aGUgcXVlcnkgcmVzdWx0LlxuICAgICAqXG4gICAgICogQnkgZGVmYXVsdCwgYC5pbnNlcnQoKWAsIGAudXBkYXRlKClgLCBgLnVwc2VydCgpYCwgYW5kIGAuZGVsZXRlKClgIGRvIG5vdFxuICAgICAqIHJldHVybiBtb2RpZmllZCByb3dzLiBCeSBjYWxsaW5nIHRoaXMgbWV0aG9kLCBtb2RpZmllZCByb3dzIGFyZSByZXR1cm5lZCBpblxuICAgICAqIGBkYXRhYC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjb2x1bW5zIC0gVGhlIGNvbHVtbnMgdG8gcmV0cmlldmUsIHNlcGFyYXRlZCBieSBjb21tYXNcbiAgICAgKi9cbiAgICBzZWxlY3QoY29sdW1ucykge1xuICAgICAgICAvLyBSZW1vdmUgd2hpdGVzcGFjZXMgZXhjZXB0IHdoZW4gcXVvdGVkXG4gICAgICAgIGxldCBxdW90ZWQgPSBmYWxzZTtcbiAgICAgICAgY29uc3QgY2xlYW5lZENvbHVtbnMgPSAoY29sdW1ucyAhPT0gbnVsbCAmJiBjb2x1bW5zICE9PSB2b2lkIDAgPyBjb2x1bW5zIDogJyonKVxuICAgICAgICAgICAgLnNwbGl0KCcnKVxuICAgICAgICAgICAgLm1hcCgoYykgPT4ge1xuICAgICAgICAgICAgaWYgKC9cXHMvLnRlc3QoYykgJiYgIXF1b3RlZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjID09PSAnXCInKSB7XG4gICAgICAgICAgICAgICAgcXVvdGVkID0gIXF1b3RlZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjO1xuICAgICAgICB9KVxuICAgICAgICAgICAgLmpvaW4oJycpO1xuICAgICAgICB0aGlzLnVybC5zZWFyY2hQYXJhbXMuc2V0KCdzZWxlY3QnLCBjbGVhbmVkQ29sdW1ucyk7XG4gICAgICAgIGlmICh0aGlzLmhlYWRlcnNbJ1ByZWZlciddKSB7XG4gICAgICAgICAgICB0aGlzLmhlYWRlcnNbJ1ByZWZlciddICs9ICcsJztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmhlYWRlcnNbJ1ByZWZlciddICs9ICdyZXR1cm49cmVwcmVzZW50YXRpb24nO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogT3JkZXIgdGhlIHF1ZXJ5IHJlc3VsdCBieSBgY29sdW1uYC5cbiAgICAgKlxuICAgICAqIFlvdSBjYW4gY2FsbCB0aGlzIG1ldGhvZCBtdWx0aXBsZSB0aW1lcyB0byBvcmRlciBieSBtdWx0aXBsZSBjb2x1bW5zLlxuICAgICAqXG4gICAgICogWW91IGNhbiBvcmRlciBmb3JlaWduIHRhYmxlcywgYnV0IGl0IGRvZXNuJ3QgYWZmZWN0IHRoZSBvcmRlcmluZyBvZiB0aGVcbiAgICAgKiBjdXJyZW50IHRhYmxlLlxuICAgICAqXG4gICAgICogQHBhcmFtIGNvbHVtbiAtIFRoZSBjb2x1bW4gdG8gb3JkZXIgYnlcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIE5hbWVkIHBhcmFtZXRlcnNcbiAgICAgKiBAcGFyYW0gb3B0aW9ucy5hc2NlbmRpbmcgLSBJZiBgdHJ1ZWAsIHRoZSByZXN1bHQgd2lsbCBiZSBpbiBhc2NlbmRpbmcgb3JkZXJcbiAgICAgKiBAcGFyYW0gb3B0aW9ucy5udWxsc0ZpcnN0IC0gSWYgYHRydWVgLCBgbnVsbGBzIGFwcGVhciBmaXJzdC4gSWYgYGZhbHNlYCxcbiAgICAgKiBgbnVsbGBzIGFwcGVhciBsYXN0LlxuICAgICAqIEBwYXJhbSBvcHRpb25zLmZvcmVpZ25UYWJsZSAtIFNldCB0aGlzIHRvIG9yZGVyIGEgZm9yZWlnbiB0YWJsZSBieSBmb3JlaWduXG4gICAgICogY29sdW1uc1xuICAgICAqL1xuICAgIG9yZGVyKGNvbHVtbiwgeyBhc2NlbmRpbmcgPSB0cnVlLCBudWxsc0ZpcnN0LCBmb3JlaWduVGFibGUsIH0gPSB7fSkge1xuICAgICAgICBjb25zdCBrZXkgPSBmb3JlaWduVGFibGUgPyBgJHtmb3JlaWduVGFibGV9Lm9yZGVyYCA6ICdvcmRlcic7XG4gICAgICAgIGNvbnN0IGV4aXN0aW5nT3JkZXIgPSB0aGlzLnVybC5zZWFyY2hQYXJhbXMuZ2V0KGtleSk7XG4gICAgICAgIHRoaXMudXJsLnNlYXJjaFBhcmFtcy5zZXQoa2V5LCBgJHtleGlzdGluZ09yZGVyID8gYCR7ZXhpc3RpbmdPcmRlcn0sYCA6ICcnfSR7Y29sdW1ufS4ke2FzY2VuZGluZyA/ICdhc2MnIDogJ2Rlc2MnfSR7bnVsbHNGaXJzdCA9PT0gdW5kZWZpbmVkID8gJycgOiBudWxsc0ZpcnN0ID8gJy5udWxsc2ZpcnN0JyA6ICcubnVsbHNsYXN0J31gKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIExpbWl0IHRoZSBxdWVyeSByZXN1bHQgYnkgYGNvdW50YC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjb3VudCAtIFRoZSBtYXhpbXVtIG51bWJlciBvZiByb3dzIHRvIHJldHVyblxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gTmFtZWQgcGFyYW1ldGVyc1xuICAgICAqIEBwYXJhbSBvcHRpb25zLmZvcmVpZ25UYWJsZSAtIFNldCB0aGlzIHRvIGxpbWl0IHJvd3Mgb2YgZm9yZWlnbiB0YWJsZXNcbiAgICAgKiBpbnN0ZWFkIG9mIHRoZSBjdXJyZW50IHRhYmxlXG4gICAgICovXG4gICAgbGltaXQoY291bnQsIHsgZm9yZWlnblRhYmxlIH0gPSB7fSkge1xuICAgICAgICBjb25zdCBrZXkgPSB0eXBlb2YgZm9yZWlnblRhYmxlID09PSAndW5kZWZpbmVkJyA/ICdsaW1pdCcgOiBgJHtmb3JlaWduVGFibGV9LmxpbWl0YDtcbiAgICAgICAgdGhpcy51cmwuc2VhcmNoUGFyYW1zLnNldChrZXksIGAke2NvdW50fWApO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogTGltaXQgdGhlIHF1ZXJ5IHJlc3VsdCBieSBgZnJvbWAgYW5kIGB0b2AgaW5jbHVzaXZlbHkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZnJvbSAtIFRoZSBzdGFydGluZyBpbmRleCBmcm9tIHdoaWNoIHRvIGxpbWl0IHRoZSByZXN1bHRcbiAgICAgKiBAcGFyYW0gdG8gLSBUaGUgbGFzdCBpbmRleCB0byB3aGljaCB0byBsaW1pdCB0aGUgcmVzdWx0XG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBOYW1lZCBwYXJhbWV0ZXJzXG4gICAgICogQHBhcmFtIG9wdGlvbnMuZm9yZWlnblRhYmxlIC0gU2V0IHRoaXMgdG8gbGltaXQgcm93cyBvZiBmb3JlaWduIHRhYmxlc1xuICAgICAqIGluc3RlYWQgb2YgdGhlIGN1cnJlbnQgdGFibGVcbiAgICAgKi9cbiAgICByYW5nZShmcm9tLCB0bywgeyBmb3JlaWduVGFibGUgfSA9IHt9KSB7XG4gICAgICAgIGNvbnN0IGtleU9mZnNldCA9IHR5cGVvZiBmb3JlaWduVGFibGUgPT09ICd1bmRlZmluZWQnID8gJ29mZnNldCcgOiBgJHtmb3JlaWduVGFibGV9Lm9mZnNldGA7XG4gICAgICAgIGNvbnN0IGtleUxpbWl0ID0gdHlwZW9mIGZvcmVpZ25UYWJsZSA9PT0gJ3VuZGVmaW5lZCcgPyAnbGltaXQnIDogYCR7Zm9yZWlnblRhYmxlfS5saW1pdGA7XG4gICAgICAgIHRoaXMudXJsLnNlYXJjaFBhcmFtcy5zZXQoa2V5T2Zmc2V0LCBgJHtmcm9tfWApO1xuICAgICAgICAvLyBSYW5nZSBpcyBpbmNsdXNpdmUsIHNvIGFkZCAxXG4gICAgICAgIHRoaXMudXJsLnNlYXJjaFBhcmFtcy5zZXQoa2V5TGltaXQsIGAke3RvIC0gZnJvbSArIDF9YCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIEFib3J0U2lnbmFsIGZvciB0aGUgZmV0Y2ggcmVxdWVzdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBzaWduYWwgLSBUaGUgQWJvcnRTaWduYWwgdG8gdXNlIGZvciB0aGUgZmV0Y2ggcmVxdWVzdFxuICAgICAqL1xuICAgIGFib3J0U2lnbmFsKHNpZ25hbCkge1xuICAgICAgICB0aGlzLnNpZ25hbCA9IHNpZ25hbDtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybiBgZGF0YWAgYXMgYSBzaW5nbGUgb2JqZWN0IGluc3RlYWQgb2YgYW4gYXJyYXkgb2Ygb2JqZWN0cy5cbiAgICAgKlxuICAgICAqIFF1ZXJ5IHJlc3VsdCBtdXN0IGJlIG9uZSByb3cgKGUuZy4gdXNpbmcgYC5saW1pdCgxKWApLCBvdGhlcndpc2UgdGhpc1xuICAgICAqIHJldHVybnMgYW4gZXJyb3IuXG4gICAgICovXG4gICAgc2luZ2xlKCkge1xuICAgICAgICB0aGlzLmhlYWRlcnNbJ0FjY2VwdCddID0gJ2FwcGxpY2F0aW9uL3ZuZC5wZ3JzdC5vYmplY3QranNvbic7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gYGRhdGFgIGFzIGEgc2luZ2xlIG9iamVjdCBpbnN0ZWFkIG9mIGFuIGFycmF5IG9mIG9iamVjdHMuXG4gICAgICpcbiAgICAgKiBRdWVyeSByZXN1bHQgbXVzdCBiZSB6ZXJvIG9yIG9uZSByb3cgKGUuZy4gdXNpbmcgYC5saW1pdCgxKWApLCBvdGhlcndpc2VcbiAgICAgKiB0aGlzIHJldHVybnMgYW4gZXJyb3IuXG4gICAgICovXG4gICAgbWF5YmVTaW5nbGUoKSB7XG4gICAgICAgIC8vIFRlbXBvcmFyeSBwYXJ0aWFsIGZpeCBmb3IgaHR0cHM6Ly9naXRodWIuY29tL3N1cGFiYXNlL3Bvc3RncmVzdC1qcy9pc3N1ZXMvMzYxXG4gICAgICAgIC8vIElzc3VlIHBlcnNpc3RzIGUuZy4gZm9yIGAuaW5zZXJ0KFsuLi5dKS5zZWxlY3QoKS5tYXliZVNpbmdsZSgpYFxuICAgICAgICBpZiAodGhpcy5tZXRob2QgPT09ICdHRVQnKSB7XG4gICAgICAgICAgICB0aGlzLmhlYWRlcnNbJ0FjY2VwdCddID0gJ2FwcGxpY2F0aW9uL2pzb24nO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5oZWFkZXJzWydBY2NlcHQnXSA9ICdhcHBsaWNhdGlvbi92bmQucGdyc3Qub2JqZWN0K2pzb24nO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaXNNYXliZVNpbmdsZSA9IHRydWU7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gYGRhdGFgIGFzIGEgc3RyaW5nIGluIENTViBmb3JtYXQuXG4gICAgICovXG4gICAgY3N2KCkge1xuICAgICAgICB0aGlzLmhlYWRlcnNbJ0FjY2VwdCddID0gJ3RleHQvY3N2JztcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybiBgZGF0YWAgYXMgYW4gb2JqZWN0IGluIFtHZW9KU09OXShodHRwczovL2dlb2pzb24ub3JnKSBmb3JtYXQuXG4gICAgICovXG4gICAgZ2VvanNvbigpIHtcbiAgICAgICAgdGhpcy5oZWFkZXJzWydBY2NlcHQnXSA9ICdhcHBsaWNhdGlvbi9nZW8ranNvbic7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gYGRhdGFgIGFzIHRoZSBFWFBMQUlOIHBsYW4gZm9yIHRoZSBxdWVyeS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gTmFtZWQgcGFyYW1ldGVyc1xuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbnMuYW5hbHl6ZSAtIElmIGB0cnVlYCwgdGhlIHF1ZXJ5IHdpbGwgYmUgZXhlY3V0ZWQgYW5kIHRoZVxuICAgICAqIGFjdHVhbCBydW4gdGltZSB3aWxsIGJlIHJldHVybmVkXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3B0aW9ucy52ZXJib3NlIC0gSWYgYHRydWVgLCB0aGUgcXVlcnkgaWRlbnRpZmllciB3aWxsIGJlIHJldHVybmVkXG4gICAgICogYW5kIGBkYXRhYCB3aWxsIGluY2x1ZGUgdGhlIG91dHB1dCBjb2x1bW5zIG9mIHRoZSBxdWVyeVxuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbnMuc2V0dGluZ3MgLSBJZiBgdHJ1ZWAsIGluY2x1ZGUgaW5mb3JtYXRpb24gb24gY29uZmlndXJhdGlvblxuICAgICAqIHBhcmFtZXRlcnMgdGhhdCBhZmZlY3QgcXVlcnkgcGxhbm5pbmdcbiAgICAgKlxuICAgICAqIEBwYXJhbSBvcHRpb25zLmJ1ZmZlcnMgLSBJZiBgdHJ1ZWAsIGluY2x1ZGUgaW5mb3JtYXRpb24gb24gYnVmZmVyIHVzYWdlXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3B0aW9ucy53YWwgLSBJZiBgdHJ1ZWAsIGluY2x1ZGUgaW5mb3JtYXRpb24gb24gV0FMIHJlY29yZCBnZW5lcmF0aW9uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3B0aW9ucy5mb3JtYXQgLSBUaGUgZm9ybWF0IG9mIHRoZSBvdXRwdXQsIGNhbiBiZSBgXCJ0ZXh0XCJgIChkZWZhdWx0KVxuICAgICAqIG9yIGBcImpzb25cImBcbiAgICAgKi9cbiAgICBleHBsYWluKHsgYW5hbHl6ZSA9IGZhbHNlLCB2ZXJib3NlID0gZmFsc2UsIHNldHRpbmdzID0gZmFsc2UsIGJ1ZmZlcnMgPSBmYWxzZSwgd2FsID0gZmFsc2UsIGZvcm1hdCA9ICd0ZXh0JywgfSA9IHt9KSB7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSBbXG4gICAgICAgICAgICBhbmFseXplID8gJ2FuYWx5emUnIDogbnVsbCxcbiAgICAgICAgICAgIHZlcmJvc2UgPyAndmVyYm9zZScgOiBudWxsLFxuICAgICAgICAgICAgc2V0dGluZ3MgPyAnc2V0dGluZ3MnIDogbnVsbCxcbiAgICAgICAgICAgIGJ1ZmZlcnMgPyAnYnVmZmVycycgOiBudWxsLFxuICAgICAgICAgICAgd2FsID8gJ3dhbCcgOiBudWxsLFxuICAgICAgICBdXG4gICAgICAgICAgICAuZmlsdGVyKEJvb2xlYW4pXG4gICAgICAgICAgICAuam9pbignfCcpO1xuICAgICAgICAvLyBBbiBBY2NlcHQgaGVhZGVyIGNhbiBjYXJyeSBtdWx0aXBsZSBtZWRpYSB0eXBlcyBidXQgcG9zdGdyZXN0LWpzIGFsd2F5cyBzZW5kcyBvbmVcbiAgICAgICAgY29uc3QgZm9yTWVkaWF0eXBlID0gdGhpcy5oZWFkZXJzWydBY2NlcHQnXTtcbiAgICAgICAgdGhpcy5oZWFkZXJzWydBY2NlcHQnXSA9IGBhcHBsaWNhdGlvbi92bmQucGdyc3QucGxhbiske2Zvcm1hdH07IGZvcj1cIiR7Zm9yTWVkaWF0eXBlfVwiOyBvcHRpb25zPSR7b3B0aW9uc307YDtcbiAgICAgICAgaWYgKGZvcm1hdCA9PT0gJ2pzb24nKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSb2xsYmFjayB0aGUgcXVlcnkuXG4gICAgICpcbiAgICAgKiBgZGF0YWAgd2lsbCBzdGlsbCBiZSByZXR1cm5lZCwgYnV0IHRoZSBxdWVyeSBpcyBub3QgY29tbWl0dGVkLlxuICAgICAqL1xuICAgIHJvbGxiYWNrKCkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGlmICgoKF9hID0gdGhpcy5oZWFkZXJzWydQcmVmZXInXSkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogJycpLnRyaW0oKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLmhlYWRlcnNbJ1ByZWZlciddICs9ICcsdHg9cm9sbGJhY2snO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5oZWFkZXJzWydQcmVmZXInXSA9ICd0eD1yb2xsYmFjayc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE92ZXJyaWRlIHRoZSB0eXBlIG9mIHRoZSByZXR1cm5lZCBgZGF0YWAuXG4gICAgICpcbiAgICAgKiBAdHlwZVBhcmFtIE5ld1Jlc3VsdCAtIFRoZSBuZXcgcmVzdWx0IHR5cGUgdG8gb3ZlcnJpZGUgd2l0aFxuICAgICAqL1xuICAgIHJldHVybnMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVBvc3RncmVzdFRyYW5zZm9ybUJ1aWxkZXIuanMubWFwIiwiaW1wb3J0IHsgdmVyc2lvbiB9IGZyb20gJy4vdmVyc2lvbic7XG5leHBvcnQgY29uc3QgREVGQVVMVF9IRUFERVJTID0geyAnWC1DbGllbnQtSW5mbyc6IGBwb3N0Z3Jlc3QtanMvJHt2ZXJzaW9ufWAgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvbnN0YW50cy5qcy5tYXAiLCJleHBvcnQgeyBkZWZhdWx0IGFzIFBvc3RncmVzdENsaWVudCB9IGZyb20gJy4vUG9zdGdyZXN0Q2xpZW50JztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgUG9zdGdyZXN0UXVlcnlCdWlsZGVyIH0gZnJvbSAnLi9Qb3N0Z3Jlc3RRdWVyeUJ1aWxkZXInO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBQb3N0Z3Jlc3RGaWx0ZXJCdWlsZGVyIH0gZnJvbSAnLi9Qb3N0Z3Jlc3RGaWx0ZXJCdWlsZGVyJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgUG9zdGdyZXN0VHJhbnNmb3JtQnVpbGRlciB9IGZyb20gJy4vUG9zdGdyZXN0VHJhbnNmb3JtQnVpbGRlcic7XG5leHBvcnQgeyBkZWZhdWx0IGFzIFBvc3RncmVzdEJ1aWxkZXIgfSBmcm9tICcuL1Bvc3RncmVzdEJ1aWxkZXInO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiZXhwb3J0IGNvbnN0IHZlcnNpb24gPSAnMS43LjAnO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dmVyc2lvbi5qcy5tYXAiLCJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbmltcG9ydCB7IENIQU5ORUxfRVZFTlRTLCBDSEFOTkVMX1NUQVRFUyB9IGZyb20gJy4vbGliL2NvbnN0YW50cyc7XG5pbXBvcnQgUHVzaCBmcm9tICcuL2xpYi9wdXNoJztcbmltcG9ydCBUaW1lciBmcm9tICcuL2xpYi90aW1lcic7XG5pbXBvcnQgUmVhbHRpbWVQcmVzZW5jZSBmcm9tICcuL1JlYWx0aW1lUHJlc2VuY2UnO1xuaW1wb3J0ICogYXMgVHJhbnNmb3JtZXJzIGZyb20gJy4vbGliL3RyYW5zZm9ybWVycyc7XG5leHBvcnQgdmFyIFJFQUxUSU1FX1BPU1RHUkVTX0NIQU5HRVNfTElTVEVOX0VWRU5UO1xuKGZ1bmN0aW9uIChSRUFMVElNRV9QT1NUR1JFU19DSEFOR0VTX0xJU1RFTl9FVkVOVCkge1xuICAgIFJFQUxUSU1FX1BPU1RHUkVTX0NIQU5HRVNfTElTVEVOX0VWRU5UW1wiQUxMXCJdID0gXCIqXCI7XG4gICAgUkVBTFRJTUVfUE9TVEdSRVNfQ0hBTkdFU19MSVNURU5fRVZFTlRbXCJJTlNFUlRcIl0gPSBcIklOU0VSVFwiO1xuICAgIFJFQUxUSU1FX1BPU1RHUkVTX0NIQU5HRVNfTElTVEVOX0VWRU5UW1wiVVBEQVRFXCJdID0gXCJVUERBVEVcIjtcbiAgICBSRUFMVElNRV9QT1NUR1JFU19DSEFOR0VTX0xJU1RFTl9FVkVOVFtcIkRFTEVURVwiXSA9IFwiREVMRVRFXCI7XG59KShSRUFMVElNRV9QT1NUR1JFU19DSEFOR0VTX0xJU1RFTl9FVkVOVCB8fCAoUkVBTFRJTUVfUE9TVEdSRVNfQ0hBTkdFU19MSVNURU5fRVZFTlQgPSB7fSkpO1xuZXhwb3J0IHZhciBSRUFMVElNRV9MSVNURU5fVFlQRVM7XG4oZnVuY3Rpb24gKFJFQUxUSU1FX0xJU1RFTl9UWVBFUykge1xuICAgIFJFQUxUSU1FX0xJU1RFTl9UWVBFU1tcIkJST0FEQ0FTVFwiXSA9IFwiYnJvYWRjYXN0XCI7XG4gICAgUkVBTFRJTUVfTElTVEVOX1RZUEVTW1wiUFJFU0VOQ0VcIl0gPSBcInByZXNlbmNlXCI7XG4gICAgLyoqXG4gICAgICogbGlzdGVuIHRvIFBvc3RncmVzIGNoYW5nZXMuXG4gICAgICovXG4gICAgUkVBTFRJTUVfTElTVEVOX1RZUEVTW1wiUE9TVEdSRVNfQ0hBTkdFU1wiXSA9IFwicG9zdGdyZXNfY2hhbmdlc1wiO1xufSkoUkVBTFRJTUVfTElTVEVOX1RZUEVTIHx8IChSRUFMVElNRV9MSVNURU5fVFlQRVMgPSB7fSkpO1xuZXhwb3J0IHZhciBSRUFMVElNRV9TVUJTQ1JJQkVfU1RBVEVTO1xuKGZ1bmN0aW9uIChSRUFMVElNRV9TVUJTQ1JJQkVfU1RBVEVTKSB7XG4gICAgUkVBTFRJTUVfU1VCU0NSSUJFX1NUQVRFU1tcIlNVQlNDUklCRURcIl0gPSBcIlNVQlNDUklCRURcIjtcbiAgICBSRUFMVElNRV9TVUJTQ1JJQkVfU1RBVEVTW1wiVElNRURfT1VUXCJdID0gXCJUSU1FRF9PVVRcIjtcbiAgICBSRUFMVElNRV9TVUJTQ1JJQkVfU1RBVEVTW1wiQ0xPU0VEXCJdID0gXCJDTE9TRURcIjtcbiAgICBSRUFMVElNRV9TVUJTQ1JJQkVfU1RBVEVTW1wiQ0hBTk5FTF9FUlJPUlwiXSA9IFwiQ0hBTk5FTF9FUlJPUlwiO1xufSkoUkVBTFRJTUVfU1VCU0NSSUJFX1NUQVRFUyB8fCAoUkVBTFRJTUVfU1VCU0NSSUJFX1NUQVRFUyA9IHt9KSk7XG4vKiogQSBjaGFubmVsIGlzIHRoZSBiYXNpYyBidWlsZGluZyBibG9jayBvZiBSZWFsdGltZVxuICogYW5kIG5hcnJvd3MgdGhlIHNjb3BlIG9mIGRhdGEgZmxvdyB0byBzdWJzY3JpYmVkIGNsaWVudHMuXG4gKiBZb3UgY2FuIHRoaW5rIG9mIGEgY2hhbm5lbCBhcyBhIGNoYXRyb29tIHdoZXJlIHBhcnRpY2lwYW50cyBhcmUgYWJsZSB0byBzZWUgd2hvJ3Mgb25saW5lXG4gKiBhbmQgc2VuZCBhbmQgcmVjZWl2ZSBtZXNzYWdlcy5cbiAqKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlYWx0aW1lQ2hhbm5lbCB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgLyoqIFRvcGljIG5hbWUgY2FuIGJlIGFueSBzdHJpbmcuICovXG4gICAgdG9waWMsIHBhcmFtcyA9IHsgY29uZmlnOiB7fSB9LCBzb2NrZXQpIHtcbiAgICAgICAgdGhpcy50b3BpYyA9IHRvcGljO1xuICAgICAgICB0aGlzLnBhcmFtcyA9IHBhcmFtcztcbiAgICAgICAgdGhpcy5zb2NrZXQgPSBzb2NrZXQ7XG4gICAgICAgIHRoaXMuYmluZGluZ3MgPSB7fTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IENIQU5ORUxfU1RBVEVTLmNsb3NlZDtcbiAgICAgICAgdGhpcy5qb2luZWRPbmNlID0gZmFsc2U7XG4gICAgICAgIHRoaXMucHVzaEJ1ZmZlciA9IFtdO1xuICAgICAgICB0aGlzLnBhcmFtcy5jb25maWcgPSBPYmplY3QuYXNzaWduKHtcbiAgICAgICAgICAgIGJyb2FkY2FzdDogeyBhY2s6IGZhbHNlLCBzZWxmOiBmYWxzZSB9LFxuICAgICAgICAgICAgcHJlc2VuY2U6IHsga2V5OiAnJyB9LFxuICAgICAgICB9LCBwYXJhbXMuY29uZmlnKTtcbiAgICAgICAgdGhpcy50aW1lb3V0ID0gdGhpcy5zb2NrZXQudGltZW91dDtcbiAgICAgICAgdGhpcy5qb2luUHVzaCA9IG5ldyBQdXNoKHRoaXMsIENIQU5ORUxfRVZFTlRTLmpvaW4sIHRoaXMucGFyYW1zLCB0aGlzLnRpbWVvdXQpO1xuICAgICAgICB0aGlzLnJlam9pblRpbWVyID0gbmV3IFRpbWVyKCgpID0+IHRoaXMuX3Jlam9pblVudGlsQ29ubmVjdGVkKCksIHRoaXMuc29ja2V0LnJlY29ubmVjdEFmdGVyTXMpO1xuICAgICAgICB0aGlzLmpvaW5QdXNoLnJlY2VpdmUoJ29rJywgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IENIQU5ORUxfU1RBVEVTLmpvaW5lZDtcbiAgICAgICAgICAgIHRoaXMucmVqb2luVGltZXIucmVzZXQoKTtcbiAgICAgICAgICAgIHRoaXMucHVzaEJ1ZmZlci5mb3JFYWNoKChwdXNoRXZlbnQpID0+IHB1c2hFdmVudC5zZW5kKCkpO1xuICAgICAgICAgICAgdGhpcy5wdXNoQnVmZmVyID0gW107XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9vbkNsb3NlKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVqb2luVGltZXIucmVzZXQoKTtcbiAgICAgICAgICAgIHRoaXMuc29ja2V0LmxvZygnY2hhbm5lbCcsIGBjbG9zZSAke3RoaXMudG9waWN9ICR7dGhpcy5fam9pblJlZigpfWApO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IENIQU5ORUxfU1RBVEVTLmNsb3NlZDtcbiAgICAgICAgICAgIHRoaXMuc29ja2V0Ll9yZW1vdmUodGhpcyk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9vbkVycm9yKChyZWFzb24pID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9pc0xlYXZpbmcoKSB8fCB0aGlzLl9pc0Nsb3NlZCgpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zb2NrZXQubG9nKCdjaGFubmVsJywgYGVycm9yICR7dGhpcy50b3BpY31gLCByZWFzb24pO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IENIQU5ORUxfU1RBVEVTLmVycm9yZWQ7XG4gICAgICAgICAgICB0aGlzLnJlam9pblRpbWVyLnNjaGVkdWxlVGltZW91dCgpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5qb2luUHVzaC5yZWNlaXZlKCd0aW1lb3V0JywgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKCF0aGlzLl9pc0pvaW5pbmcoKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc29ja2V0LmxvZygnY2hhbm5lbCcsIGB0aW1lb3V0ICR7dGhpcy50b3BpY31gLCB0aGlzLmpvaW5QdXNoLnRpbWVvdXQpO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IENIQU5ORUxfU1RBVEVTLmVycm9yZWQ7XG4gICAgICAgICAgICB0aGlzLnJlam9pblRpbWVyLnNjaGVkdWxlVGltZW91dCgpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fb24oQ0hBTk5FTF9FVkVOVFMucmVwbHksIHt9LCAocGF5bG9hZCwgcmVmKSA9PiB7XG4gICAgICAgICAgICB0aGlzLl90cmlnZ2VyKHRoaXMuX3JlcGx5RXZlbnROYW1lKHJlZiksIHBheWxvYWQpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5wcmVzZW5jZSA9IG5ldyBSZWFsdGltZVByZXNlbmNlKHRoaXMpO1xuICAgIH1cbiAgICAvKiogU3Vic2NyaWJlIHJlZ2lzdGVycyB5b3VyIGNsaWVudCB3aXRoIHRoZSBzZXJ2ZXIgKi9cbiAgICBzdWJzY3JpYmUoY2FsbGJhY2ssIHRpbWVvdXQgPSB0aGlzLnRpbWVvdXQpIHtcbiAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgaWYgKHRoaXMuam9pbmVkT25jZSkge1xuICAgICAgICAgICAgdGhyb3cgYHRyaWVkIHRvIHN1YnNjcmliZSBtdWx0aXBsZSB0aW1lcy4gJ3N1YnNjcmliZScgY2FuIG9ubHkgYmUgY2FsbGVkIGEgc2luZ2xlIHRpbWUgcGVyIGNoYW5uZWwgaW5zdGFuY2VgO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgeyBjb25maWc6IHsgYnJvYWRjYXN0LCBwcmVzZW5jZSB9LCB9ID0gdGhpcy5wYXJhbXM7XG4gICAgICAgICAgICB0aGlzLl9vbkVycm9yKChlKSA9PiBjYWxsYmFjayAmJiBjYWxsYmFjaygnQ0hBTk5FTF9FUlJPUicsIGUpKTtcbiAgICAgICAgICAgIHRoaXMuX29uQ2xvc2UoKCkgPT4gY2FsbGJhY2sgJiYgY2FsbGJhY2soJ0NMT1NFRCcpKTtcbiAgICAgICAgICAgIGNvbnN0IGFjY2Vzc1Rva2VuUGF5bG9hZCA9IHt9O1xuICAgICAgICAgICAgY29uc3QgY29uZmlnID0ge1xuICAgICAgICAgICAgICAgIGJyb2FkY2FzdCxcbiAgICAgICAgICAgICAgICBwcmVzZW5jZSxcbiAgICAgICAgICAgICAgICBwb3N0Z3Jlc19jaGFuZ2VzOiAoX2IgPSAoX2EgPSB0aGlzLmJpbmRpbmdzLnBvc3RncmVzX2NoYW5nZXMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5tYXAoKHIpID0+IHIuZmlsdGVyKSkgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDogW10sXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYgKHRoaXMuc29ja2V0LmFjY2Vzc1Rva2VuKSB7XG4gICAgICAgICAgICAgICAgYWNjZXNzVG9rZW5QYXlsb2FkLmFjY2Vzc190b2tlbiA9IHRoaXMuc29ja2V0LmFjY2Vzc1Rva2VuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy51cGRhdGVKb2luUGF5bG9hZChPYmplY3QuYXNzaWduKHsgY29uZmlnIH0sIGFjY2Vzc1Rva2VuUGF5bG9hZCkpO1xuICAgICAgICAgICAgdGhpcy5qb2luZWRPbmNlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuX3Jlam9pbih0aW1lb3V0KTtcbiAgICAgICAgICAgIHRoaXMuam9pblB1c2hcbiAgICAgICAgICAgICAgICAucmVjZWl2ZSgnb2snLCAoeyBwb3N0Z3Jlc19jaGFuZ2VzOiBzZXJ2ZXJQb3N0Z3Jlc0ZpbHRlcnMsIH0pID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICAgICAgdGhpcy5zb2NrZXQuYWNjZXNzVG9rZW4gJiZcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zb2NrZXQuc2V0QXV0aCh0aGlzLnNvY2tldC5hY2Nlc3NUb2tlbik7XG4gICAgICAgICAgICAgICAgaWYgKHNlcnZlclBvc3RncmVzRmlsdGVycyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKCdTVUJTQ1JJQkVEJyk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNsaWVudFBvc3RncmVzQmluZGluZ3MgPSB0aGlzLmJpbmRpbmdzLnBvc3RncmVzX2NoYW5nZXM7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGJpbmRpbmdzTGVuID0gKF9hID0gY2xpZW50UG9zdGdyZXNCaW5kaW5ncyA9PT0gbnVsbCB8fCBjbGllbnRQb3N0Z3Jlc0JpbmRpbmdzID09PSB2b2lkIDAgPyB2b2lkIDAgOiBjbGllbnRQb3N0Z3Jlc0JpbmRpbmdzLmxlbmd0aCkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogMDtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3UG9zdGdyZXNCaW5kaW5ncyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJpbmRpbmdzTGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNsaWVudFBvc3RncmVzQmluZGluZyA9IGNsaWVudFBvc3RncmVzQmluZGluZ3NbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB7IGZpbHRlcjogeyBldmVudCwgc2NoZW1hLCB0YWJsZSwgZmlsdGVyIH0sIH0gPSBjbGllbnRQb3N0Z3Jlc0JpbmRpbmc7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzZXJ2ZXJQb3N0Z3Jlc0ZpbHRlciA9IHNlcnZlclBvc3RncmVzRmlsdGVycyAmJiBzZXJ2ZXJQb3N0Z3Jlc0ZpbHRlcnNbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VydmVyUG9zdGdyZXNGaWx0ZXIgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJQb3N0Z3Jlc0ZpbHRlci5ldmVudCA9PT0gZXZlbnQgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJQb3N0Z3Jlc0ZpbHRlci5zY2hlbWEgPT09IHNjaGVtYSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlclBvc3RncmVzRmlsdGVyLnRhYmxlID09PSB0YWJsZSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlclBvc3RncmVzRmlsdGVyLmZpbHRlciA9PT0gZmlsdGVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3UG9zdGdyZXNCaW5kaW5ncy5wdXNoKE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgY2xpZW50UG9zdGdyZXNCaW5kaW5nKSwgeyBpZDogc2VydmVyUG9zdGdyZXNGaWx0ZXIuaWQgfSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKCdDSEFOTkVMX0VSUk9SJywgbmV3IEVycm9yKCdtaXNtYXRjaCBiZXR3ZWVuIHNlcnZlciBhbmQgY2xpZW50IGJpbmRpbmdzIGZvciBwb3N0Z3JlcyBjaGFuZ2VzJykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJpbmRpbmdzLnBvc3RncmVzX2NoYW5nZXMgPSBuZXdQb3N0Z3Jlc0JpbmRpbmdzO1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayAmJiBjYWxsYmFjaygnU1VCU0NSSUJFRCcpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAucmVjZWl2ZSgnZXJyb3InLCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayAmJlxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjaygnQ0hBTk5FTF9FUlJPUicsIG5ldyBFcnJvcihKU09OLnN0cmluZ2lmeShPYmplY3QudmFsdWVzKGVycm9yKS5qb2luKCcsICcpIHx8ICdlcnJvcicpKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAucmVjZWl2ZSgndGltZW91dCcsICgpID0+IHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayAmJiBjYWxsYmFjaygnVElNRURfT1VUJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHByZXNlbmNlU3RhdGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByZXNlbmNlLnN0YXRlO1xuICAgIH1cbiAgICB0cmFjayhwYXlsb2FkLCBvcHRzID0ge30pIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIHJldHVybiB5aWVsZCB0aGlzLnNlbmQoe1xuICAgICAgICAgICAgICAgIHR5cGU6ICdwcmVzZW5jZScsXG4gICAgICAgICAgICAgICAgZXZlbnQ6ICd0cmFjaycsXG4gICAgICAgICAgICAgICAgcGF5bG9hZCxcbiAgICAgICAgICAgIH0sIG9wdHMudGltZW91dCB8fCB0aGlzLnRpbWVvdXQpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgdW50cmFjayhvcHRzID0ge30pIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIHJldHVybiB5aWVsZCB0aGlzLnNlbmQoe1xuICAgICAgICAgICAgICAgIHR5cGU6ICdwcmVzZW5jZScsXG4gICAgICAgICAgICAgICAgZXZlbnQ6ICd1bnRyYWNrJyxcbiAgICAgICAgICAgIH0sIG9wdHMpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgb24odHlwZSwgZmlsdGVyLCBjYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gdGhpcy5fb24odHlwZSwgZmlsdGVyLCBjYWxsYmFjayk7XG4gICAgfVxuICAgIHNlbmQocGF5bG9hZCwgb3B0cyA9IHt9KSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgICAgdmFyIF9hLCBfYiwgX2M7XG4gICAgICAgICAgICBjb25zdCBwdXNoID0gdGhpcy5fcHVzaChwYXlsb2FkLnR5cGUsIHBheWxvYWQsIG9wdHMudGltZW91dCB8fCB0aGlzLnRpbWVvdXQpO1xuICAgICAgICAgICAgaWYgKHB1c2gucmF0ZUxpbWl0ZWQpIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKCdyYXRlIGxpbWl0ZWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwYXlsb2FkLnR5cGUgPT09ICdicm9hZGNhc3QnICYmXG4gICAgICAgICAgICAgICAgISgoX2MgPSAoX2IgPSAoX2EgPSB0aGlzLnBhcmFtcykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmNvbmZpZykgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmJyb2FkY2FzdCkgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLmFjaykpIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKCdvaycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcHVzaC5yZWNlaXZlKCdvaycsICgpID0+IHJlc29sdmUoJ29rJykpO1xuICAgICAgICAgICAgcHVzaC5yZWNlaXZlKCd0aW1lb3V0JywgKCkgPT4gcmVzb2x2ZSgndGltZWQgb3V0JykpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgdXBkYXRlSm9pblBheWxvYWQocGF5bG9hZCkge1xuICAgICAgICB0aGlzLmpvaW5QdXNoLnVwZGF0ZVBheWxvYWQocGF5bG9hZCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIExlYXZlcyB0aGUgY2hhbm5lbC5cbiAgICAgKlxuICAgICAqIFVuc3Vic2NyaWJlcyBmcm9tIHNlcnZlciBldmVudHMsIGFuZCBpbnN0cnVjdHMgY2hhbm5lbCB0byB0ZXJtaW5hdGUgb24gc2VydmVyLlxuICAgICAqIFRyaWdnZXJzIG9uQ2xvc2UoKSBob29rcy5cbiAgICAgKlxuICAgICAqIFRvIHJlY2VpdmUgbGVhdmUgYWNrbm93bGVkZ2VtZW50cywgdXNlIHRoZSBhIGByZWNlaXZlYCBob29rIHRvIGJpbmQgdG8gdGhlIHNlcnZlciBhY2ssIGllOlxuICAgICAqIGNoYW5uZWwudW5zdWJzY3JpYmUoKS5yZWNlaXZlKFwib2tcIiwgKCkgPT4gYWxlcnQoXCJsZWZ0IVwiKSApXG4gICAgICovXG4gICAgdW5zdWJzY3JpYmUodGltZW91dCA9IHRoaXMudGltZW91dCkge1xuICAgICAgICB0aGlzLnN0YXRlID0gQ0hBTk5FTF9TVEFURVMubGVhdmluZztcbiAgICAgICAgY29uc3Qgb25DbG9zZSA9ICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc29ja2V0LmxvZygnY2hhbm5lbCcsIGBsZWF2ZSAke3RoaXMudG9waWN9YCk7XG4gICAgICAgICAgICB0aGlzLl90cmlnZ2VyKENIQU5ORUxfRVZFTlRTLmNsb3NlLCAnbGVhdmUnLCB0aGlzLl9qb2luUmVmKCkpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnJlam9pblRpbWVyLnJlc2V0KCk7XG4gICAgICAgIC8vIERlc3Ryb3kgam9pblB1c2ggdG8gYXZvaWQgY29ubmVjdGlvbiB0aW1lb3V0cyBkdXJpbmcgdW5zY3JpcHRpb24gcGhhc2VcbiAgICAgICAgdGhpcy5qb2luUHVzaC5kZXN0cm95KCk7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbGVhdmVQdXNoID0gbmV3IFB1c2godGhpcywgQ0hBTk5FTF9FVkVOVFMubGVhdmUsIHt9LCB0aW1lb3V0KTtcbiAgICAgICAgICAgIGxlYXZlUHVzaFxuICAgICAgICAgICAgICAgIC5yZWNlaXZlKCdvaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICBvbkNsb3NlKCk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgnb2snKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnJlY2VpdmUoJ3RpbWVvdXQnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgb25DbG9zZSgpO1xuICAgICAgICAgICAgICAgIHJlc29sdmUoJ3RpbWVkIG91dCcpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAucmVjZWl2ZSgnZXJyb3InLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgnZXJyb3InKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbGVhdmVQdXNoLnNlbmQoKTtcbiAgICAgICAgICAgIGlmICghdGhpcy5fY2FuUHVzaCgpKSB7XG4gICAgICAgICAgICAgICAgbGVhdmVQdXNoLnRyaWdnZXIoJ29rJywge30pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqIEBpbnRlcm5hbCAqL1xuICAgIF9wdXNoKGV2ZW50LCBwYXlsb2FkLCB0aW1lb3V0ID0gdGhpcy50aW1lb3V0KSB7XG4gICAgICAgIGlmICghdGhpcy5qb2luZWRPbmNlKSB7XG4gICAgICAgICAgICB0aHJvdyBgdHJpZWQgdG8gcHVzaCAnJHtldmVudH0nIHRvICcke3RoaXMudG9waWN9JyBiZWZvcmUgam9pbmluZy4gVXNlIGNoYW5uZWwuc3Vic2NyaWJlKCkgYmVmb3JlIHB1c2hpbmcgZXZlbnRzYDtcbiAgICAgICAgfVxuICAgICAgICBsZXQgcHVzaEV2ZW50ID0gbmV3IFB1c2godGhpcywgZXZlbnQsIHBheWxvYWQsIHRpbWVvdXQpO1xuICAgICAgICBpZiAodGhpcy5fY2FuUHVzaCgpKSB7XG4gICAgICAgICAgICBwdXNoRXZlbnQuc2VuZCgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcHVzaEV2ZW50LnN0YXJ0VGltZW91dCgpO1xuICAgICAgICAgICAgdGhpcy5wdXNoQnVmZmVyLnB1c2gocHVzaEV2ZW50KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcHVzaEV2ZW50O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBPdmVycmlkYWJsZSBtZXNzYWdlIGhvb2tcbiAgICAgKlxuICAgICAqIFJlY2VpdmVzIGFsbCBldmVudHMgZm9yIHNwZWNpYWxpemVkIG1lc3NhZ2UgaGFuZGxpbmcgYmVmb3JlIGRpc3BhdGNoaW5nIHRvIHRoZSBjaGFubmVsIGNhbGxiYWNrcy5cbiAgICAgKiBNdXN0IHJldHVybiB0aGUgcGF5bG9hZCwgbW9kaWZpZWQgb3IgdW5tb2RpZmllZC5cbiAgICAgKlxuICAgICAqIEBpbnRlcm5hbFxuICAgICAqL1xuICAgIF9vbk1lc3NhZ2UoX2V2ZW50LCBwYXlsb2FkLCBfcmVmKSB7XG4gICAgICAgIHJldHVybiBwYXlsb2FkO1xuICAgIH1cbiAgICAvKiogQGludGVybmFsICovXG4gICAgX2lzTWVtYmVyKHRvcGljKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRvcGljID09PSB0b3BpYztcbiAgICB9XG4gICAgLyoqIEBpbnRlcm5hbCAqL1xuICAgIF9qb2luUmVmKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5qb2luUHVzaC5yZWY7XG4gICAgfVxuICAgIC8qKiBAaW50ZXJuYWwgKi9cbiAgICBfdHJpZ2dlcih0eXBlLCBwYXlsb2FkLCByZWYpIHtcbiAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgY29uc3QgdHlwZUxvd2VyID0gdHlwZS50b0xvY2FsZUxvd2VyQ2FzZSgpO1xuICAgICAgICBjb25zdCB7IGNsb3NlLCBlcnJvciwgbGVhdmUsIGpvaW4gfSA9IENIQU5ORUxfRVZFTlRTO1xuICAgICAgICBjb25zdCBldmVudHMgPSBbY2xvc2UsIGVycm9yLCBsZWF2ZSwgam9pbl07XG4gICAgICAgIGlmIChyZWYgJiYgZXZlbnRzLmluZGV4T2YodHlwZUxvd2VyKSA+PSAwICYmIHJlZiAhPT0gdGhpcy5fam9pblJlZigpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGhhbmRsZWRQYXlsb2FkID0gdGhpcy5fb25NZXNzYWdlKHR5cGVMb3dlciwgcGF5bG9hZCwgcmVmKTtcbiAgICAgICAgaWYgKHBheWxvYWQgJiYgIWhhbmRsZWRQYXlsb2FkKSB7XG4gICAgICAgICAgICB0aHJvdyAnY2hhbm5lbCBvbk1lc3NhZ2UgY2FsbGJhY2tzIG11c3QgcmV0dXJuIHRoZSBwYXlsb2FkLCBtb2RpZmllZCBvciB1bm1vZGlmaWVkJztcbiAgICAgICAgfVxuICAgICAgICBpZiAoWydpbnNlcnQnLCAndXBkYXRlJywgJ2RlbGV0ZSddLmluY2x1ZGVzKHR5cGVMb3dlcikpIHtcbiAgICAgICAgICAgIChfYSA9IHRoaXMuYmluZGluZ3MucG9zdGdyZXNfY2hhbmdlcykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmZpbHRlcigoYmluZCkgPT4ge1xuICAgICAgICAgICAgICAgIHZhciBfYSwgX2IsIF9jO1xuICAgICAgICAgICAgICAgIHJldHVybiAoKChfYSA9IGJpbmQuZmlsdGVyKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuZXZlbnQpID09PSAnKicgfHxcbiAgICAgICAgICAgICAgICAgICAgKChfYyA9IChfYiA9IGJpbmQuZmlsdGVyKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IuZXZlbnQpID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy50b0xvY2FsZUxvd2VyQ2FzZSgpKSA9PT0gdHlwZUxvd2VyKTtcbiAgICAgICAgICAgIH0pLm1hcCgoYmluZCkgPT4gYmluZC5jYWxsYmFjayhoYW5kbGVkUGF5bG9hZCwgcmVmKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAoX2IgPSB0aGlzLmJpbmRpbmdzW3R5cGVMb3dlcl0pID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5maWx0ZXIoKGJpbmQpID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgX2EsIF9iLCBfYywgX2QsIF9lLCBfZjtcbiAgICAgICAgICAgICAgICBpZiAoWydicm9hZGNhc3QnLCAncHJlc2VuY2UnLCAncG9zdGdyZXNfY2hhbmdlcyddLmluY2x1ZGVzKHR5cGVMb3dlcikpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCdpZCcgaW4gYmluZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYmluZElkID0gYmluZC5pZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGJpbmRFdmVudCA9IChfYSA9IGJpbmQuZmlsdGVyKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuZXZlbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKGJpbmRJZCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICgoX2IgPSBwYXlsb2FkLmlkcykgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmluY2x1ZGVzKGJpbmRJZCkpICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGJpbmRFdmVudCA9PT0gJyonIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChiaW5kRXZlbnQgPT09IG51bGwgfHwgYmluZEV2ZW50ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBiaW5kRXZlbnQudG9Mb2NhbGVMb3dlckNhc2UoKSkgPT09XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoKF9jID0gcGF5bG9hZC5kYXRhKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MudHlwZS50b0xvY2FsZUxvd2VyQ2FzZSgpKSkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYmluZEV2ZW50ID0gKF9lID0gKF9kID0gYmluZCA9PT0gbnVsbCB8fCBiaW5kID09PSB2b2lkIDAgPyB2b2lkIDAgOiBiaW5kLmZpbHRlcikgPT09IG51bGwgfHwgX2QgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9kLmV2ZW50KSA9PT0gbnVsbCB8fCBfZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2UudG9Mb2NhbGVMb3dlckNhc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoYmluZEV2ZW50ID09PSAnKicgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiaW5kRXZlbnQgPT09ICgoX2YgPSBwYXlsb2FkID09PSBudWxsIHx8IHBheWxvYWQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHBheWxvYWQuZXZlbnQpID09PSBudWxsIHx8IF9mID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZi50b0xvY2FsZUxvd2VyQ2FzZSgpKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBiaW5kLnR5cGUudG9Mb2NhbGVMb3dlckNhc2UoKSA9PT0gdHlwZUxvd2VyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLm1hcCgoYmluZCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgaGFuZGxlZFBheWxvYWQgPT09ICdvYmplY3QnICYmICdpZHMnIGluIGhhbmRsZWRQYXlsb2FkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBvc3RncmVzQ2hhbmdlcyA9IGhhbmRsZWRQYXlsb2FkLmRhdGE7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgc2NoZW1hLCB0YWJsZSwgY29tbWl0X3RpbWVzdGFtcCwgdHlwZSwgZXJyb3JzIH0gPSBwb3N0Z3Jlc0NoYW5nZXM7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVucmljaGVkUGF5bG9hZCA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjaGVtYTogc2NoZW1hLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGFibGU6IHRhYmxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29tbWl0X3RpbWVzdGFtcDogY29tbWl0X3RpbWVzdGFtcCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50VHlwZTogdHlwZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldzoge30sXG4gICAgICAgICAgICAgICAgICAgICAgICBvbGQ6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JzOiBlcnJvcnMsXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZWRQYXlsb2FkID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBlbnJpY2hlZFBheWxvYWQpLCB0aGlzLl9nZXRQYXlsb2FkUmVjb3Jkcyhwb3N0Z3Jlc0NoYW5nZXMpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYmluZC5jYWxsYmFjayhoYW5kbGVkUGF5bG9hZCwgcmVmKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKiBAaW50ZXJuYWwgKi9cbiAgICBfaXNDbG9zZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlID09PSBDSEFOTkVMX1NUQVRFUy5jbG9zZWQ7XG4gICAgfVxuICAgIC8qKiBAaW50ZXJuYWwgKi9cbiAgICBfaXNKb2luZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlID09PSBDSEFOTkVMX1NUQVRFUy5qb2luZWQ7XG4gICAgfVxuICAgIC8qKiBAaW50ZXJuYWwgKi9cbiAgICBfaXNKb2luaW5nKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZSA9PT0gQ0hBTk5FTF9TVEFURVMuam9pbmluZztcbiAgICB9XG4gICAgLyoqIEBpbnRlcm5hbCAqL1xuICAgIF9pc0xlYXZpbmcoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlID09PSBDSEFOTkVMX1NUQVRFUy5sZWF2aW5nO1xuICAgIH1cbiAgICAvKiogQGludGVybmFsICovXG4gICAgX3JlcGx5RXZlbnROYW1lKHJlZikge1xuICAgICAgICByZXR1cm4gYGNoYW5fcmVwbHlfJHtyZWZ9YDtcbiAgICB9XG4gICAgLyoqIEBpbnRlcm5hbCAqL1xuICAgIF9vbih0eXBlLCBmaWx0ZXIsIGNhbGxiYWNrKSB7XG4gICAgICAgIGNvbnN0IHR5cGVMb3dlciA9IHR5cGUudG9Mb2NhbGVMb3dlckNhc2UoKTtcbiAgICAgICAgY29uc3QgYmluZGluZyA9IHtcbiAgICAgICAgICAgIHR5cGU6IHR5cGVMb3dlcixcbiAgICAgICAgICAgIGZpbHRlcjogZmlsdGVyLFxuICAgICAgICAgICAgY2FsbGJhY2s6IGNhbGxiYWNrLFxuICAgICAgICB9O1xuICAgICAgICBpZiAodGhpcy5iaW5kaW5nc1t0eXBlTG93ZXJdKSB7XG4gICAgICAgICAgICB0aGlzLmJpbmRpbmdzW3R5cGVMb3dlcl0ucHVzaChiaW5kaW5nKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYmluZGluZ3NbdHlwZUxvd2VyXSA9IFtiaW5kaW5nXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqIEBpbnRlcm5hbCAqL1xuICAgIF9vZmYodHlwZSwgZmlsdGVyKSB7XG4gICAgICAgIGNvbnN0IHR5cGVMb3dlciA9IHR5cGUudG9Mb2NhbGVMb3dlckNhc2UoKTtcbiAgICAgICAgdGhpcy5iaW5kaW5nc1t0eXBlTG93ZXJdID0gdGhpcy5iaW5kaW5nc1t0eXBlTG93ZXJdLmZpbHRlcigoYmluZCkgPT4ge1xuICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgcmV0dXJuICEoKChfYSA9IGJpbmQudHlwZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnRvTG9jYWxlTG93ZXJDYXNlKCkpID09PSB0eXBlTG93ZXIgJiZcbiAgICAgICAgICAgICAgICBSZWFsdGltZUNoYW5uZWwuaXNFcXVhbChiaW5kLmZpbHRlciwgZmlsdGVyKSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqIEBpbnRlcm5hbCAqL1xuICAgIHN0YXRpYyBpc0VxdWFsKG9iajEsIG9iajIpIHtcbiAgICAgICAgaWYgKE9iamVjdC5rZXlzKG9iajEpLmxlbmd0aCAhPT0gT2JqZWN0LmtleXMob2JqMikubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBrIGluIG9iajEpIHtcbiAgICAgICAgICAgIGlmIChvYmoxW2tdICE9PSBvYmoyW2tdKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICAvKiogQGludGVybmFsICovXG4gICAgX3Jlam9pblVudGlsQ29ubmVjdGVkKCkge1xuICAgICAgICB0aGlzLnJlam9pblRpbWVyLnNjaGVkdWxlVGltZW91dCgpO1xuICAgICAgICBpZiAodGhpcy5zb2NrZXQuaXNDb25uZWN0ZWQoKSkge1xuICAgICAgICAgICAgdGhpcy5fcmVqb2luKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVnaXN0ZXJzIGEgY2FsbGJhY2sgdGhhdCB3aWxsIGJlIGV4ZWN1dGVkIHdoZW4gdGhlIGNoYW5uZWwgY2xvc2VzLlxuICAgICAqXG4gICAgICogQGludGVybmFsXG4gICAgICovXG4gICAgX29uQ2xvc2UoY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5fb24oQ0hBTk5FTF9FVkVOVFMuY2xvc2UsIHt9LCBjYWxsYmFjayk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlZ2lzdGVycyBhIGNhbGxiYWNrIHRoYXQgd2lsbCBiZSBleGVjdXRlZCB3aGVuIHRoZSBjaGFubmVsIGVuY291bnRlcmVzIGFuIGVycm9yLlxuICAgICAqXG4gICAgICogQGludGVybmFsXG4gICAgICovXG4gICAgX29uRXJyb3IoY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5fb24oQ0hBTk5FTF9FVkVOVFMuZXJyb3IsIHt9LCAocmVhc29uKSA9PiBjYWxsYmFjayhyZWFzb24pKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIHNvY2tldCBpcyBjb25uZWN0ZWQgYW5kIHRoZSBjaGFubmVsIGhhcyBiZWVuIGpvaW5lZC5cbiAgICAgKlxuICAgICAqIEBpbnRlcm5hbFxuICAgICAqL1xuICAgIF9jYW5QdXNoKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zb2NrZXQuaXNDb25uZWN0ZWQoKSAmJiB0aGlzLl9pc0pvaW5lZCgpO1xuICAgIH1cbiAgICAvKiogQGludGVybmFsICovXG4gICAgX3Jlam9pbih0aW1lb3V0ID0gdGhpcy50aW1lb3V0KSB7XG4gICAgICAgIGlmICh0aGlzLl9pc0xlYXZpbmcoKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc29ja2V0Ll9sZWF2ZU9wZW5Ub3BpYyh0aGlzLnRvcGljKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IENIQU5ORUxfU1RBVEVTLmpvaW5pbmc7XG4gICAgICAgIHRoaXMuam9pblB1c2gucmVzZW5kKHRpbWVvdXQpO1xuICAgIH1cbiAgICAvKiogQGludGVybmFsICovXG4gICAgX2dldFBheWxvYWRSZWNvcmRzKHBheWxvYWQpIHtcbiAgICAgICAgY29uc3QgcmVjb3JkcyA9IHtcbiAgICAgICAgICAgIG5ldzoge30sXG4gICAgICAgICAgICBvbGQ6IHt9LFxuICAgICAgICB9O1xuICAgICAgICBpZiAocGF5bG9hZC50eXBlID09PSAnSU5TRVJUJyB8fCBwYXlsb2FkLnR5cGUgPT09ICdVUERBVEUnKSB7XG4gICAgICAgICAgICByZWNvcmRzLm5ldyA9IFRyYW5zZm9ybWVycy5jb252ZXJ0Q2hhbmdlRGF0YShwYXlsb2FkLmNvbHVtbnMsIHBheWxvYWQucmVjb3JkKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocGF5bG9hZC50eXBlID09PSAnVVBEQVRFJyB8fCBwYXlsb2FkLnR5cGUgPT09ICdERUxFVEUnKSB7XG4gICAgICAgICAgICByZWNvcmRzLm9sZCA9IFRyYW5zZm9ybWVycy5jb252ZXJ0Q2hhbmdlRGF0YShwYXlsb2FkLmNvbHVtbnMsIHBheWxvYWQub2xkX3JlY29yZCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlY29yZHM7XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9UmVhbHRpbWVDaGFubmVsLmpzLm1hcCIsInZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuaW1wb3J0IHsgdzNjd2Vic29ja2V0IH0gZnJvbSAnd2Vic29ja2V0JztcbmltcG9ydCB7IFZTTiwgQ0hBTk5FTF9FVkVOVFMsIFRSQU5TUE9SVFMsIFNPQ0tFVF9TVEFURVMsIERFRkFVTFRfVElNRU9VVCwgV1NfQ0xPU0VfTk9STUFMLCBERUZBVUxUX0hFQURFUlMsIENPTk5FQ1RJT05fU1RBVEUsIH0gZnJvbSAnLi9saWIvY29uc3RhbnRzJztcbmltcG9ydCBUaW1lciBmcm9tICcuL2xpYi90aW1lcic7XG5pbXBvcnQgU2VyaWFsaXplciBmcm9tICcuL2xpYi9zZXJpYWxpemVyJztcbmltcG9ydCBSZWFsdGltZUNoYW5uZWwgZnJvbSAnLi9SZWFsdGltZUNoYW5uZWwnO1xuY29uc3Qgbm9vcCA9ICgpID0+IHsgfTtcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlYWx0aW1lQ2xpZW50IHtcbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplcyB0aGUgU29ja2V0LlxuICAgICAqXG4gICAgICogQHBhcmFtIGVuZFBvaW50IFRoZSBzdHJpbmcgV2ViU29ja2V0IGVuZHBvaW50LCBpZSwgXCJ3czovL2V4YW1wbGUuY29tL3NvY2tldFwiLCBcIndzczovL2V4YW1wbGUuY29tXCIsIFwiL3NvY2tldFwiIChpbmhlcml0ZWQgaG9zdCAmIHByb3RvY29sKVxuICAgICAqIEBwYXJhbSBvcHRpb25zLnRyYW5zcG9ydCBUaGUgV2Vic29ja2V0IFRyYW5zcG9ydCwgZm9yIGV4YW1wbGUgV2ViU29ja2V0LlxuICAgICAqIEBwYXJhbSBvcHRpb25zLnRpbWVvdXQgVGhlIGRlZmF1bHQgdGltZW91dCBpbiBtaWxsaXNlY29uZHMgdG8gdHJpZ2dlciBwdXNoIHRpbWVvdXRzLlxuICAgICAqIEBwYXJhbSBvcHRpb25zLnBhcmFtcyBUaGUgb3B0aW9uYWwgcGFyYW1zIHRvIHBhc3Mgd2hlbiBjb25uZWN0aW5nLlxuICAgICAqIEBwYXJhbSBvcHRpb25zLmhlYWRlcnMgVGhlIG9wdGlvbmFsIGhlYWRlcnMgdG8gcGFzcyB3aGVuIGNvbm5lY3RpbmcuXG4gICAgICogQHBhcmFtIG9wdGlvbnMuaGVhcnRiZWF0SW50ZXJ2YWxNcyBUaGUgbWlsbGlzZWMgaW50ZXJ2YWwgdG8gc2VuZCBhIGhlYXJ0YmVhdCBtZXNzYWdlLlxuICAgICAqIEBwYXJhbSBvcHRpb25zLmxvZ2dlciBUaGUgb3B0aW9uYWwgZnVuY3Rpb24gZm9yIHNwZWNpYWxpemVkIGxvZ2dpbmcsIGllOiBsb2dnZXI6IChraW5kLCBtc2csIGRhdGEpID0+IHsgY29uc29sZS5sb2coYCR7a2luZH06ICR7bXNnfWAsIGRhdGEpIH1cbiAgICAgKiBAcGFyYW0gb3B0aW9ucy5lbmNvZGUgVGhlIGZ1bmN0aW9uIHRvIGVuY29kZSBvdXRnb2luZyBtZXNzYWdlcy4gRGVmYXVsdHMgdG8gSlNPTjogKHBheWxvYWQsIGNhbGxiYWNrKSA9PiBjYWxsYmFjayhKU09OLnN0cmluZ2lmeShwYXlsb2FkKSlcbiAgICAgKiBAcGFyYW0gb3B0aW9ucy5kZWNvZGUgVGhlIGZ1bmN0aW9uIHRvIGRlY29kZSBpbmNvbWluZyBtZXNzYWdlcy4gRGVmYXVsdHMgdG8gU2VyaWFsaXplcidzIGRlY29kZS5cbiAgICAgKiBAcGFyYW0gb3B0aW9ucy5yZWNvbm5lY3RBZnRlck1zIGhlIG9wdGlvbmFsIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgbWlsbHNlYyByZWNvbm5lY3QgaW50ZXJ2YWwuIERlZmF1bHRzIHRvIHN0ZXBwZWQgYmFja29mZiBvZmYuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoZW5kUG9pbnQsIG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICB0aGlzLmFjY2Vzc1Rva2VuID0gbnVsbDtcbiAgICAgICAgdGhpcy5jaGFubmVscyA9IFtdO1xuICAgICAgICB0aGlzLmVuZFBvaW50ID0gJyc7XG4gICAgICAgIHRoaXMuaGVhZGVycyA9IERFRkFVTFRfSEVBREVSUztcbiAgICAgICAgdGhpcy5wYXJhbXMgPSB7fTtcbiAgICAgICAgdGhpcy50aW1lb3V0ID0gREVGQVVMVF9USU1FT1VUO1xuICAgICAgICB0aGlzLnRyYW5zcG9ydCA9IHczY3dlYnNvY2tldDtcbiAgICAgICAgdGhpcy5oZWFydGJlYXRJbnRlcnZhbE1zID0gMzAwMDA7XG4gICAgICAgIHRoaXMuaGVhcnRiZWF0VGltZXIgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMucGVuZGluZ0hlYXJ0YmVhdFJlZiA9IG51bGw7XG4gICAgICAgIHRoaXMucmVmID0gMDtcbiAgICAgICAgdGhpcy5sb2dnZXIgPSBub29wO1xuICAgICAgICB0aGlzLmNvbm4gPSBudWxsO1xuICAgICAgICB0aGlzLnNlbmRCdWZmZXIgPSBbXTtcbiAgICAgICAgdGhpcy5zZXJpYWxpemVyID0gbmV3IFNlcmlhbGl6ZXIoKTtcbiAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZUNhbGxiYWNrcyA9IHtcbiAgICAgICAgICAgIG9wZW46IFtdLFxuICAgICAgICAgICAgY2xvc2U6IFtdLFxuICAgICAgICAgICAgZXJyb3I6IFtdLFxuICAgICAgICAgICAgbWVzc2FnZTogW10sXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZXZlbnRzUGVyU2Vjb25kTGltaXRNcyA9IDEwMDtcbiAgICAgICAgdGhpcy5pblRocm90dGxlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZW5kUG9pbnQgPSBgJHtlbmRQb2ludH0vJHtUUkFOU1BPUlRTLndlYnNvY2tldH1gO1xuICAgICAgICBpZiAob3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLnBhcmFtcylcbiAgICAgICAgICAgIHRoaXMucGFyYW1zID0gb3B0aW9ucy5wYXJhbXM7XG4gICAgICAgIGlmIChvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMuaGVhZGVycylcbiAgICAgICAgICAgIHRoaXMuaGVhZGVycyA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5oZWFkZXJzKSwgb3B0aW9ucy5oZWFkZXJzKTtcbiAgICAgICAgaWYgKG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy50aW1lb3V0KVxuICAgICAgICAgICAgdGhpcy50aW1lb3V0ID0gb3B0aW9ucy50aW1lb3V0O1xuICAgICAgICBpZiAob3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLmxvZ2dlcilcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyID0gb3B0aW9ucy5sb2dnZXI7XG4gICAgICAgIGlmIChvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMudHJhbnNwb3J0KVxuICAgICAgICAgICAgdGhpcy50cmFuc3BvcnQgPSBvcHRpb25zLnRyYW5zcG9ydDtcbiAgICAgICAgaWYgKG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5oZWFydGJlYXRJbnRlcnZhbE1zKVxuICAgICAgICAgICAgdGhpcy5oZWFydGJlYXRJbnRlcnZhbE1zID0gb3B0aW9ucy5oZWFydGJlYXRJbnRlcnZhbE1zO1xuICAgICAgICBjb25zdCBldmVudHNQZXJTZWNvbmQgPSAoX2EgPSBvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMucGFyYW1zKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuZXZlbnRzUGVyU2Vjb25kO1xuICAgICAgICBpZiAoZXZlbnRzUGVyU2Vjb25kKVxuICAgICAgICAgICAgdGhpcy5ldmVudHNQZXJTZWNvbmRMaW1pdE1zID0gTWF0aC5mbG9vcigxMDAwIC8gZXZlbnRzUGVyU2Vjb25kKTtcbiAgICAgICAgdGhpcy5yZWNvbm5lY3RBZnRlck1zID0gKG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5yZWNvbm5lY3RBZnRlck1zKVxuICAgICAgICAgICAgPyBvcHRpb25zLnJlY29ubmVjdEFmdGVyTXNcbiAgICAgICAgICAgIDogKHRyaWVzKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFsxMDAwLCAyMDAwLCA1MDAwLCAxMDAwMF1bdHJpZXMgLSAxXSB8fCAxMDAwMDtcbiAgICAgICAgICAgIH07XG4gICAgICAgIHRoaXMuZW5jb2RlID0gKG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5lbmNvZGUpXG4gICAgICAgICAgICA/IG9wdGlvbnMuZW5jb2RlXG4gICAgICAgICAgICA6IChwYXlsb2FkLCBjYWxsYmFjaykgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayhKU09OLnN0cmluZ2lmeShwYXlsb2FkKSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB0aGlzLmRlY29kZSA9IChvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMuZGVjb2RlKVxuICAgICAgICAgICAgPyBvcHRpb25zLmRlY29kZVxuICAgICAgICAgICAgOiB0aGlzLnNlcmlhbGl6ZXIuZGVjb2RlLmJpbmQodGhpcy5zZXJpYWxpemVyKTtcbiAgICAgICAgdGhpcy5yZWNvbm5lY3RUaW1lciA9IG5ldyBUaW1lcigoKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICB0aGlzLmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdCgpO1xuICAgICAgICB9KSwgdGhpcy5yZWNvbm5lY3RBZnRlck1zKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ29ubmVjdHMgdGhlIHNvY2tldCwgdW5sZXNzIGFscmVhZHkgY29ubmVjdGVkLlxuICAgICAqL1xuICAgIGNvbm5lY3QoKSB7XG4gICAgICAgIGlmICh0aGlzLmNvbm4pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNvbm4gPSBuZXcgdGhpcy50cmFuc3BvcnQodGhpcy5fZW5kUG9pbnRVUkwoKSwgW10sIG51bGwsIHRoaXMuaGVhZGVycyk7XG4gICAgICAgIGlmICh0aGlzLmNvbm4pIHtcbiAgICAgICAgICAgIHRoaXMuY29ubi5iaW5hcnlUeXBlID0gJ2FycmF5YnVmZmVyJztcbiAgICAgICAgICAgIHRoaXMuY29ubi5vbm9wZW4gPSAoKSA9PiB0aGlzLl9vbkNvbm5PcGVuKCk7XG4gICAgICAgICAgICB0aGlzLmNvbm4ub25lcnJvciA9IChlcnJvcikgPT4gdGhpcy5fb25Db25uRXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgdGhpcy5jb25uLm9ubWVzc2FnZSA9IChldmVudCkgPT4gdGhpcy5fb25Db25uTWVzc2FnZShldmVudCk7XG4gICAgICAgICAgICB0aGlzLmNvbm4ub25jbG9zZSA9IChldmVudCkgPT4gdGhpcy5fb25Db25uQ2xvc2UoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERpc2Nvbm5lY3RzIHRoZSBzb2NrZXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY29kZSBBIG51bWVyaWMgc3RhdHVzIGNvZGUgdG8gc2VuZCBvbiBkaXNjb25uZWN0LlxuICAgICAqIEBwYXJhbSByZWFzb24gQSBjdXN0b20gcmVhc29uIGZvciB0aGUgZGlzY29ubmVjdC5cbiAgICAgKi9cbiAgICBkaXNjb25uZWN0KGNvZGUsIHJlYXNvbikge1xuICAgICAgICBpZiAodGhpcy5jb25uKSB7XG4gICAgICAgICAgICB0aGlzLmNvbm4ub25jbG9zZSA9IGZ1bmN0aW9uICgpIHsgfTsgLy8gbm9vcFxuICAgICAgICAgICAgaWYgKGNvZGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbm4uY2xvc2UoY29kZSwgcmVhc29uICE9PSBudWxsICYmIHJlYXNvbiAhPT0gdm9pZCAwID8gcmVhc29uIDogJycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb25uLmNsb3NlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmNvbm4gPSBudWxsO1xuICAgICAgICAgICAgLy8gcmVtb3ZlIG9wZW4gaGFuZGxlc1xuICAgICAgICAgICAgdGhpcy5oZWFydGJlYXRUaW1lciAmJiBjbGVhckludGVydmFsKHRoaXMuaGVhcnRiZWF0VGltZXIpO1xuICAgICAgICAgICAgdGhpcy5yZWNvbm5lY3RUaW1lci5yZXNldCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYWxsIGNyZWF0ZWQgY2hhbm5lbHNcbiAgICAgKi9cbiAgICBnZXRDaGFubmVscygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2hhbm5lbHM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFVuc3Vic2NyaWJlcyBhbmQgcmVtb3ZlcyBhIHNpbmdsZSBjaGFubmVsXG4gICAgICogQHBhcmFtIGNoYW5uZWwgQSBSZWFsdGltZUNoYW5uZWwgaW5zdGFuY2VcbiAgICAgKi9cbiAgICByZW1vdmVDaGFubmVsKGNoYW5uZWwpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIGNvbnN0IHN0YXR1cyA9IHlpZWxkIGNoYW5uZWwudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIGlmICh0aGlzLmNoYW5uZWxzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGlzY29ubmVjdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHN0YXR1cztcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFVuc3Vic2NyaWJlcyBhbmQgcmVtb3ZlcyBhbGwgY2hhbm5lbHNcbiAgICAgKi9cbiAgICByZW1vdmVBbGxDaGFubmVscygpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlc18xID0geWllbGQgUHJvbWlzZS5hbGwodGhpcy5jaGFubmVscy5tYXAoKGNoYW5uZWwpID0+IGNoYW5uZWwudW5zdWJzY3JpYmUoKSkpO1xuICAgICAgICAgICAgdGhpcy5kaXNjb25uZWN0KCk7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWVzXzE7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBMb2dzIHRoZSBtZXNzYWdlLlxuICAgICAqXG4gICAgICogRm9yIGN1c3RvbWl6ZWQgbG9nZ2luZywgYHRoaXMubG9nZ2VyYCBjYW4gYmUgb3ZlcnJpZGRlbi5cbiAgICAgKi9cbiAgICBsb2coa2luZCwgbXNnLCBkYXRhKSB7XG4gICAgICAgIHRoaXMubG9nZ2VyKGtpbmQsIG1zZywgZGF0YSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGN1cnJlbnQgc3RhdGUgb2YgdGhlIHNvY2tldC5cbiAgICAgKi9cbiAgICBjb25uZWN0aW9uU3RhdGUoKSB7XG4gICAgICAgIHN3aXRjaCAodGhpcy5jb25uICYmIHRoaXMuY29ubi5yZWFkeVN0YXRlKSB7XG4gICAgICAgICAgICBjYXNlIFNPQ0tFVF9TVEFURVMuY29ubmVjdGluZzpcbiAgICAgICAgICAgICAgICByZXR1cm4gQ09OTkVDVElPTl9TVEFURS5Db25uZWN0aW5nO1xuICAgICAgICAgICAgY2FzZSBTT0NLRVRfU1RBVEVTLm9wZW46XG4gICAgICAgICAgICAgICAgcmV0dXJuIENPTk5FQ1RJT05fU1RBVEUuT3BlbjtcbiAgICAgICAgICAgIGNhc2UgU09DS0VUX1NUQVRFUy5jbG9zaW5nOlxuICAgICAgICAgICAgICAgIHJldHVybiBDT05ORUNUSU9OX1NUQVRFLkNsb3Npbmc7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiBDT05ORUNUSU9OX1NUQVRFLkNsb3NlZDtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGB0cnVlYCBpcyB0aGUgY29ubmVjdGlvbiBpcyBvcGVuLlxuICAgICAqL1xuICAgIGlzQ29ubmVjdGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25uZWN0aW9uU3RhdGUoKSA9PT0gQ09OTkVDVElPTl9TVEFURS5PcGVuO1xuICAgIH1cbiAgICBjaGFubmVsKHRvcGljLCBwYXJhbXMgPSB7IGNvbmZpZzoge30gfSkge1xuICAgICAgICBpZiAoIXRoaXMuaXNDb25uZWN0ZWQoKSkge1xuICAgICAgICAgICAgdGhpcy5jb25uZWN0KCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY2hhbiA9IG5ldyBSZWFsdGltZUNoYW5uZWwoYHJlYWx0aW1lOiR7dG9waWN9YCwgcGFyYW1zLCB0aGlzKTtcbiAgICAgICAgdGhpcy5jaGFubmVscy5wdXNoKGNoYW4pO1xuICAgICAgICByZXR1cm4gY2hhbjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUHVzaCBvdXQgYSBtZXNzYWdlIGlmIHRoZSBzb2NrZXQgaXMgY29ubmVjdGVkLlxuICAgICAqXG4gICAgICogSWYgdGhlIHNvY2tldCBpcyBub3QgY29ubmVjdGVkLCB0aGUgbWVzc2FnZSBnZXRzIGVucXVldWVkIHdpdGhpbiBhIGxvY2FsIGJ1ZmZlciwgYW5kIHNlbnQgb3V0IHdoZW4gYSBjb25uZWN0aW9uIGlzIG5leHQgZXN0YWJsaXNoZWQuXG4gICAgICovXG4gICAgcHVzaChkYXRhKSB7XG4gICAgICAgIGNvbnN0IHsgdG9waWMsIGV2ZW50LCBwYXlsb2FkLCByZWYgfSA9IGRhdGE7XG4gICAgICAgIGxldCBjYWxsYmFjayA9ICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZW5jb2RlKGRhdGEsIChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICAgICAgKF9hID0gdGhpcy5jb25uKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Euc2VuZChyZXN1bHQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMubG9nKCdwdXNoJywgYCR7dG9waWN9ICR7ZXZlbnR9ICgke3JlZn0pYCwgcGF5bG9hZCk7XG4gICAgICAgIGlmICh0aGlzLmlzQ29ubmVjdGVkKCkpIHtcbiAgICAgICAgICAgIGlmIChbJ2Jyb2FkY2FzdCcsICdwcmVzZW5jZScsICdwb3N0Z3Jlc19jaGFuZ2VzJ10uaW5jbHVkZXMoZXZlbnQpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaXNUaHJvdHRsZWQgPSB0aGlzLl90aHJvdHRsZShjYWxsYmFjaykoKTtcbiAgICAgICAgICAgICAgICBpZiAoaXNUaHJvdHRsZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdyYXRlIGxpbWl0ZWQnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNlbmRCdWZmZXIucHVzaChjYWxsYmFjayk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgSldUIGFjY2VzcyB0b2tlbiB1c2VkIGZvciBjaGFubmVsIHN1YnNjcmlwdGlvbiBhdXRob3JpemF0aW9uIGFuZCBSZWFsdGltZSBSTFMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gdG9rZW4gQSBKV1Qgc3RyaW5nLlxuICAgICAqL1xuICAgIHNldEF1dGgodG9rZW4pIHtcbiAgICAgICAgdGhpcy5hY2Nlc3NUb2tlbiA9IHRva2VuO1xuICAgICAgICB0aGlzLmNoYW5uZWxzLmZvckVhY2goKGNoYW5uZWwpID0+IHtcbiAgICAgICAgICAgIHRva2VuICYmIGNoYW5uZWwudXBkYXRlSm9pblBheWxvYWQoeyBhY2Nlc3NfdG9rZW46IHRva2VuIH0pO1xuICAgICAgICAgICAgaWYgKGNoYW5uZWwuam9pbmVkT25jZSAmJiBjaGFubmVsLl9pc0pvaW5lZCgpKSB7XG4gICAgICAgICAgICAgICAgY2hhbm5lbC5fcHVzaChDSEFOTkVMX0VWRU5UUy5hY2Nlc3NfdG9rZW4sIHsgYWNjZXNzX3Rva2VuOiB0b2tlbiB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybiB0aGUgbmV4dCBtZXNzYWdlIHJlZiwgYWNjb3VudGluZyBmb3Igb3ZlcmZsb3dzXG4gICAgICpcbiAgICAgKiBAaW50ZXJuYWxcbiAgICAgKi9cbiAgICBfbWFrZVJlZigpIHtcbiAgICAgICAgbGV0IG5ld1JlZiA9IHRoaXMucmVmICsgMTtcbiAgICAgICAgaWYgKG5ld1JlZiA9PT0gdGhpcy5yZWYpIHtcbiAgICAgICAgICAgIHRoaXMucmVmID0gMDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVmID0gbmV3UmVmO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnJlZi50b1N0cmluZygpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBVbnN1YnNjcmliZSBmcm9tIGNoYW5uZWxzIHdpdGggdGhlIHNwZWNpZmllZCB0b3BpYy5cbiAgICAgKlxuICAgICAqIEBpbnRlcm5hbFxuICAgICAqL1xuICAgIF9sZWF2ZU9wZW5Ub3BpYyh0b3BpYykge1xuICAgICAgICBsZXQgZHVwQ2hhbm5lbCA9IHRoaXMuY2hhbm5lbHMuZmluZCgoYykgPT4gYy50b3BpYyA9PT0gdG9waWMgJiYgKGMuX2lzSm9pbmVkKCkgfHwgYy5faXNKb2luaW5nKCkpKTtcbiAgICAgICAgaWYgKGR1cENoYW5uZWwpIHtcbiAgICAgICAgICAgIHRoaXMubG9nKCd0cmFuc3BvcnQnLCBgbGVhdmluZyBkdXBsaWNhdGUgdG9waWMgXCIke3RvcGljfVwiYCk7XG4gICAgICAgICAgICBkdXBDaGFubmVsLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBhIHN1YnNjcmlwdGlvbiBmcm9tIHRoZSBzb2NrZXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY2hhbm5lbCBBbiBvcGVuIHN1YnNjcmlwdGlvbi5cbiAgICAgKlxuICAgICAqIEBpbnRlcm5hbFxuICAgICAqL1xuICAgIF9yZW1vdmUoY2hhbm5lbCkge1xuICAgICAgICB0aGlzLmNoYW5uZWxzID0gdGhpcy5jaGFubmVscy5maWx0ZXIoKGMpID0+IGMuX2pvaW5SZWYoKSAhPT0gY2hhbm5lbC5fam9pblJlZigpKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgVVJMIG9mIHRoZSB3ZWJzb2NrZXQuXG4gICAgICpcbiAgICAgKiBAaW50ZXJuYWxcbiAgICAgKi9cbiAgICBfZW5kUG9pbnRVUkwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hcHBlbmRQYXJhbXModGhpcy5lbmRQb2ludCwgT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5wYXJhbXMsIHsgdnNuOiBWU04gfSkpO1xuICAgIH1cbiAgICAvKiogQGludGVybmFsICovXG4gICAgX29uQ29ubk1lc3NhZ2UocmF3TWVzc2FnZSkge1xuICAgICAgICB0aGlzLmRlY29kZShyYXdNZXNzYWdlLmRhdGEsIChtc2cpID0+IHtcbiAgICAgICAgICAgIGxldCB7IHRvcGljLCBldmVudCwgcGF5bG9hZCwgcmVmIH0gPSBtc2c7XG4gICAgICAgICAgICBpZiAoKHJlZiAmJiByZWYgPT09IHRoaXMucGVuZGluZ0hlYXJ0YmVhdFJlZikgfHxcbiAgICAgICAgICAgICAgICBldmVudCA9PT0gKHBheWxvYWQgPT09IG51bGwgfHwgcGF5bG9hZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogcGF5bG9hZC50eXBlKSkge1xuICAgICAgICAgICAgICAgIHRoaXMucGVuZGluZ0hlYXJ0YmVhdFJlZiA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmxvZygncmVjZWl2ZScsIGAke3BheWxvYWQuc3RhdHVzIHx8ICcnfSAke3RvcGljfSAke2V2ZW50fSAkeyhyZWYgJiYgJygnICsgcmVmICsgJyknKSB8fCAnJ31gLCBwYXlsb2FkKTtcbiAgICAgICAgICAgIHRoaXMuY2hhbm5lbHNcbiAgICAgICAgICAgICAgICAuZmlsdGVyKChjaGFubmVsKSA9PiBjaGFubmVsLl9pc01lbWJlcih0b3BpYykpXG4gICAgICAgICAgICAgICAgLmZvckVhY2goKGNoYW5uZWwpID0+IGNoYW5uZWwuX3RyaWdnZXIoZXZlbnQsIHBheWxvYWQsIHJlZikpO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZUNhbGxiYWNrcy5tZXNzYWdlLmZvckVhY2goKGNhbGxiYWNrKSA9PiBjYWxsYmFjayhtc2cpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKiBAaW50ZXJuYWwgKi9cbiAgICBfb25Db25uT3BlbigpIHtcbiAgICAgICAgdGhpcy5sb2coJ3RyYW5zcG9ydCcsIGBjb25uZWN0ZWQgdG8gJHt0aGlzLl9lbmRQb2ludFVSTCgpfWApO1xuICAgICAgICB0aGlzLl9mbHVzaFNlbmRCdWZmZXIoKTtcbiAgICAgICAgdGhpcy5yZWNvbm5lY3RUaW1lci5yZXNldCgpO1xuICAgICAgICB0aGlzLmhlYXJ0YmVhdFRpbWVyICYmIGNsZWFySW50ZXJ2YWwodGhpcy5oZWFydGJlYXRUaW1lcik7XG4gICAgICAgIHRoaXMuaGVhcnRiZWF0VGltZXIgPSBzZXRJbnRlcnZhbCgoKSA9PiB0aGlzLl9zZW5kSGVhcnRiZWF0KCksIHRoaXMuaGVhcnRiZWF0SW50ZXJ2YWxNcyk7XG4gICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VDYWxsYmFja3Mub3Blbi5mb3JFYWNoKChjYWxsYmFjaykgPT4gY2FsbGJhY2soKSk7XG4gICAgfVxuICAgIC8qKiBAaW50ZXJuYWwgKi9cbiAgICBfb25Db25uQ2xvc2UoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5sb2coJ3RyYW5zcG9ydCcsICdjbG9zZScsIGV2ZW50KTtcbiAgICAgICAgdGhpcy5fdHJpZ2dlckNoYW5FcnJvcigpO1xuICAgICAgICB0aGlzLmhlYXJ0YmVhdFRpbWVyICYmIGNsZWFySW50ZXJ2YWwodGhpcy5oZWFydGJlYXRUaW1lcik7XG4gICAgICAgIHRoaXMucmVjb25uZWN0VGltZXIuc2NoZWR1bGVUaW1lb3V0KCk7XG4gICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VDYWxsYmFja3MuY2xvc2UuZm9yRWFjaCgoY2FsbGJhY2spID0+IGNhbGxiYWNrKGV2ZW50KSk7XG4gICAgfVxuICAgIC8qKiBAaW50ZXJuYWwgKi9cbiAgICBfb25Db25uRXJyb3IoZXJyb3IpIHtcbiAgICAgICAgdGhpcy5sb2coJ3RyYW5zcG9ydCcsIGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICB0aGlzLl90cmlnZ2VyQ2hhbkVycm9yKCk7XG4gICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VDYWxsYmFja3MuZXJyb3IuZm9yRWFjaCgoY2FsbGJhY2spID0+IGNhbGxiYWNrKGVycm9yKSk7XG4gICAgfVxuICAgIC8qKiBAaW50ZXJuYWwgKi9cbiAgICBfdHJpZ2dlckNoYW5FcnJvcigpIHtcbiAgICAgICAgdGhpcy5jaGFubmVscy5mb3JFYWNoKChjaGFubmVsKSA9PiBjaGFubmVsLl90cmlnZ2VyKENIQU5ORUxfRVZFTlRTLmVycm9yKSk7XG4gICAgfVxuICAgIC8qKiBAaW50ZXJuYWwgKi9cbiAgICBfYXBwZW5kUGFyYW1zKHVybCwgcGFyYW1zKSB7XG4gICAgICAgIGlmIChPYmplY3Qua2V5cyhwYXJhbXMpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHVybDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBwcmVmaXggPSB1cmwubWF0Y2goL1xcPy8pID8gJyYnIDogJz8nO1xuICAgICAgICBjb25zdCBxdWVyeSA9IG5ldyBVUkxTZWFyY2hQYXJhbXMocGFyYW1zKTtcbiAgICAgICAgcmV0dXJuIGAke3VybH0ke3ByZWZpeH0ke3F1ZXJ5fWA7XG4gICAgfVxuICAgIC8qKiBAaW50ZXJuYWwgKi9cbiAgICBfZmx1c2hTZW5kQnVmZmVyKCkge1xuICAgICAgICBpZiAodGhpcy5pc0Nvbm5lY3RlZCgpICYmIHRoaXMuc2VuZEJ1ZmZlci5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLnNlbmRCdWZmZXIuZm9yRWFjaCgoY2FsbGJhY2spID0+IGNhbGxiYWNrKCkpO1xuICAgICAgICAgICAgdGhpcy5zZW5kQnVmZmVyID0gW107XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqIEBpbnRlcm5hbCAqL1xuICAgIF9zZW5kSGVhcnRiZWF0KCkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGlmICghdGhpcy5pc0Nvbm5lY3RlZCgpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMucGVuZGluZ0hlYXJ0YmVhdFJlZikge1xuICAgICAgICAgICAgdGhpcy5wZW5kaW5nSGVhcnRiZWF0UmVmID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMubG9nKCd0cmFuc3BvcnQnLCAnaGVhcnRiZWF0IHRpbWVvdXQuIEF0dGVtcHRpbmcgdG8gcmUtZXN0YWJsaXNoIGNvbm5lY3Rpb24nKTtcbiAgICAgICAgICAgIChfYSA9IHRoaXMuY29ubikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmNsb3NlKFdTX0NMT1NFX05PUk1BTCwgJ2hlYXJiZWF0IHRpbWVvdXQnKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnBlbmRpbmdIZWFydGJlYXRSZWYgPSB0aGlzLl9tYWtlUmVmKCk7XG4gICAgICAgIHRoaXMucHVzaCh7XG4gICAgICAgICAgICB0b3BpYzogJ3Bob2VuaXgnLFxuICAgICAgICAgICAgZXZlbnQ6ICdoZWFydGJlYXQnLFxuICAgICAgICAgICAgcGF5bG9hZDoge30sXG4gICAgICAgICAgICByZWY6IHRoaXMucGVuZGluZ0hlYXJ0YmVhdFJlZixcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc2V0QXV0aCh0aGlzLmFjY2Vzc1Rva2VuKTtcbiAgICB9XG4gICAgLyoqIEBpbnRlcm5hbCAqL1xuICAgIF90aHJvdHRsZShjYWxsYmFjaywgZXZlbnRzUGVyU2Vjb25kTGltaXRNcyA9IHRoaXMuZXZlbnRzUGVyU2Vjb25kTGltaXRNcykge1xuICAgICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuaW5UaHJvdHRsZSlcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICBpZiAoZXZlbnRzUGVyU2Vjb25kTGltaXRNcyA+IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmluVGhyb3R0bGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluVGhyb3R0bGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9LCBldmVudHNQZXJTZWNvbmRMaW1pdE1zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfTtcbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1SZWFsdGltZUNsaWVudC5qcy5tYXAiLCIvKlxuICBUaGlzIGZpbGUgZHJhd3MgaGVhdmlseSBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9waG9lbml4ZnJhbWV3b3JrL3Bob2VuaXgvYmxvYi9kMzQ0ZWMwYTczMmFiNGVlMjA0MjE1YjMxZGU2OWNmNGJlNzJlM2JmL2Fzc2V0cy9qcy9waG9lbml4L3ByZXNlbmNlLmpzXG4gIExpY2Vuc2U6IGh0dHBzOi8vZ2l0aHViLmNvbS9waG9lbml4ZnJhbWV3b3JrL3Bob2VuaXgvYmxvYi9kMzQ0ZWMwYTczMmFiNGVlMjA0MjE1YjMxZGU2OWNmNGJlNzJlM2JmL0xJQ0VOU0UubWRcbiovXG5leHBvcnQgdmFyIFJFQUxUSU1FX1BSRVNFTkNFX0xJU1RFTl9FVkVOVFM7XG4oZnVuY3Rpb24gKFJFQUxUSU1FX1BSRVNFTkNFX0xJU1RFTl9FVkVOVFMpIHtcbiAgICBSRUFMVElNRV9QUkVTRU5DRV9MSVNURU5fRVZFTlRTW1wiU1lOQ1wiXSA9IFwic3luY1wiO1xuICAgIFJFQUxUSU1FX1BSRVNFTkNFX0xJU1RFTl9FVkVOVFNbXCJKT0lOXCJdID0gXCJqb2luXCI7XG4gICAgUkVBTFRJTUVfUFJFU0VOQ0VfTElTVEVOX0VWRU5UU1tcIkxFQVZFXCJdID0gXCJsZWF2ZVwiO1xufSkoUkVBTFRJTUVfUFJFU0VOQ0VfTElTVEVOX0VWRU5UUyB8fCAoUkVBTFRJTUVfUFJFU0VOQ0VfTElTVEVOX0VWRU5UUyA9IHt9KSk7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZWFsdGltZVByZXNlbmNlIHtcbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplcyB0aGUgUHJlc2VuY2UuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY2hhbm5lbCAtIFRoZSBSZWFsdGltZUNoYW5uZWxcbiAgICAgKiBAcGFyYW0gb3B0cyAtIFRoZSBvcHRpb25zLFxuICAgICAqICAgICAgICBmb3IgZXhhbXBsZSBge2V2ZW50czoge3N0YXRlOiAnc3RhdGUnLCBkaWZmOiAnZGlmZid9fWBcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihjaGFubmVsLCBvcHRzKSB7XG4gICAgICAgIHRoaXMuY2hhbm5lbCA9IGNoYW5uZWw7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB7fTtcbiAgICAgICAgdGhpcy5wZW5kaW5nRGlmZnMgPSBbXTtcbiAgICAgICAgdGhpcy5qb2luUmVmID0gbnVsbDtcbiAgICAgICAgdGhpcy5jYWxsZXIgPSB7XG4gICAgICAgICAgICBvbkpvaW46ICgpID0+IHsgfSxcbiAgICAgICAgICAgIG9uTGVhdmU6ICgpID0+IHsgfSxcbiAgICAgICAgICAgIG9uU3luYzogKCkgPT4geyB9LFxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBldmVudHMgPSAob3B0cyA9PT0gbnVsbCB8fCBvcHRzID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRzLmV2ZW50cykgfHwge1xuICAgICAgICAgICAgc3RhdGU6ICdwcmVzZW5jZV9zdGF0ZScsXG4gICAgICAgICAgICBkaWZmOiAncHJlc2VuY2VfZGlmZicsXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuY2hhbm5lbC5fb24oZXZlbnRzLnN0YXRlLCB7fSwgKG5ld1N0YXRlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB7IG9uSm9pbiwgb25MZWF2ZSwgb25TeW5jIH0gPSB0aGlzLmNhbGxlcjtcbiAgICAgICAgICAgIHRoaXMuam9pblJlZiA9IHRoaXMuY2hhbm5lbC5fam9pblJlZigpO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IFJlYWx0aW1lUHJlc2VuY2Uuc3luY1N0YXRlKHRoaXMuc3RhdGUsIG5ld1N0YXRlLCBvbkpvaW4sIG9uTGVhdmUpO1xuICAgICAgICAgICAgdGhpcy5wZW5kaW5nRGlmZnMuZm9yRWFjaCgoZGlmZikgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBSZWFsdGltZVByZXNlbmNlLnN5bmNEaWZmKHRoaXMuc3RhdGUsIGRpZmYsIG9uSm9pbiwgb25MZWF2ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMucGVuZGluZ0RpZmZzID0gW107XG4gICAgICAgICAgICBvblN5bmMoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuY2hhbm5lbC5fb24oZXZlbnRzLmRpZmYsIHt9LCAoZGlmZikgPT4ge1xuICAgICAgICAgICAgY29uc3QgeyBvbkpvaW4sIG9uTGVhdmUsIG9uU3luYyB9ID0gdGhpcy5jYWxsZXI7XG4gICAgICAgICAgICBpZiAodGhpcy5pblBlbmRpbmdTeW5jU3RhdGUoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMucGVuZGluZ0RpZmZzLnB1c2goZGlmZik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gUmVhbHRpbWVQcmVzZW5jZS5zeW5jRGlmZih0aGlzLnN0YXRlLCBkaWZmLCBvbkpvaW4sIG9uTGVhdmUpO1xuICAgICAgICAgICAgICAgIG9uU3luYygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5vbkpvaW4oKGtleSwgY3VycmVudFByZXNlbmNlcywgbmV3UHJlc2VuY2VzKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNoYW5uZWwuX3RyaWdnZXIoJ3ByZXNlbmNlJywge1xuICAgICAgICAgICAgICAgIGV2ZW50OiAnam9pbicsXG4gICAgICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgICAgIGN1cnJlbnRQcmVzZW5jZXMsXG4gICAgICAgICAgICAgICAgbmV3UHJlc2VuY2VzLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLm9uTGVhdmUoKGtleSwgY3VycmVudFByZXNlbmNlcywgbGVmdFByZXNlbmNlcykgPT4ge1xuICAgICAgICAgICAgdGhpcy5jaGFubmVsLl90cmlnZ2VyKCdwcmVzZW5jZScsIHtcbiAgICAgICAgICAgICAgICBldmVudDogJ2xlYXZlJyxcbiAgICAgICAgICAgICAgICBrZXksXG4gICAgICAgICAgICAgICAgY3VycmVudFByZXNlbmNlcyxcbiAgICAgICAgICAgICAgICBsZWZ0UHJlc2VuY2VzLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLm9uU3luYygoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNoYW5uZWwuX3RyaWdnZXIoJ3ByZXNlbmNlJywgeyBldmVudDogJ3N5bmMnIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVXNlZCB0byBzeW5jIHRoZSBsaXN0IG9mIHByZXNlbmNlcyBvbiB0aGUgc2VydmVyIHdpdGggdGhlXG4gICAgICogY2xpZW50J3Mgc3RhdGUuXG4gICAgICpcbiAgICAgKiBBbiBvcHRpb25hbCBgb25Kb2luYCBhbmQgYG9uTGVhdmVgIGNhbGxiYWNrIGNhbiBiZSBwcm92aWRlZCB0b1xuICAgICAqIHJlYWN0IHRvIGNoYW5nZXMgaW4gdGhlIGNsaWVudCdzIGxvY2FsIHByZXNlbmNlcyBhY3Jvc3NcbiAgICAgKiBkaXNjb25uZWN0cyBhbmQgcmVjb25uZWN0cyB3aXRoIHRoZSBzZXJ2ZXIuXG4gICAgICpcbiAgICAgKiBAaW50ZXJuYWxcbiAgICAgKi9cbiAgICBzdGF0aWMgc3luY1N0YXRlKGN1cnJlbnRTdGF0ZSwgbmV3U3RhdGUsIG9uSm9pbiwgb25MZWF2ZSkge1xuICAgICAgICBjb25zdCBzdGF0ZSA9IHRoaXMuY2xvbmVEZWVwKGN1cnJlbnRTdGF0ZSk7XG4gICAgICAgIGNvbnN0IHRyYW5zZm9ybWVkU3RhdGUgPSB0aGlzLnRyYW5zZm9ybVN0YXRlKG5ld1N0YXRlKTtcbiAgICAgICAgY29uc3Qgam9pbnMgPSB7fTtcbiAgICAgICAgY29uc3QgbGVhdmVzID0ge307XG4gICAgICAgIHRoaXMubWFwKHN0YXRlLCAoa2V5LCBwcmVzZW5jZXMpID0+IHtcbiAgICAgICAgICAgIGlmICghdHJhbnNmb3JtZWRTdGF0ZVtrZXldKSB7XG4gICAgICAgICAgICAgICAgbGVhdmVzW2tleV0gPSBwcmVzZW5jZXM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLm1hcCh0cmFuc2Zvcm1lZFN0YXRlLCAoa2V5LCBuZXdQcmVzZW5jZXMpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRQcmVzZW5jZXMgPSBzdGF0ZVtrZXldO1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRQcmVzZW5jZXMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdQcmVzZW5jZVJlZnMgPSBuZXdQcmVzZW5jZXMubWFwKChtKSA9PiBtLnByZXNlbmNlX3JlZik7XG4gICAgICAgICAgICAgICAgY29uc3QgY3VyUHJlc2VuY2VSZWZzID0gY3VycmVudFByZXNlbmNlcy5tYXAoKG0pID0+IG0ucHJlc2VuY2VfcmVmKTtcbiAgICAgICAgICAgICAgICBjb25zdCBqb2luZWRQcmVzZW5jZXMgPSBuZXdQcmVzZW5jZXMuZmlsdGVyKChtKSA9PiBjdXJQcmVzZW5jZVJlZnMuaW5kZXhPZihtLnByZXNlbmNlX3JlZikgPCAwKTtcbiAgICAgICAgICAgICAgICBjb25zdCBsZWZ0UHJlc2VuY2VzID0gY3VycmVudFByZXNlbmNlcy5maWx0ZXIoKG0pID0+IG5ld1ByZXNlbmNlUmVmcy5pbmRleE9mKG0ucHJlc2VuY2VfcmVmKSA8IDApO1xuICAgICAgICAgICAgICAgIGlmIChqb2luZWRQcmVzZW5jZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBqb2luc1trZXldID0gam9pbmVkUHJlc2VuY2VzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAobGVmdFByZXNlbmNlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGxlYXZlc1trZXldID0gbGVmdFByZXNlbmNlcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBqb2luc1trZXldID0gbmV3UHJlc2VuY2VzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3luY0RpZmYoc3RhdGUsIHsgam9pbnMsIGxlYXZlcyB9LCBvbkpvaW4sIG9uTGVhdmUpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBVc2VkIHRvIHN5bmMgYSBkaWZmIG9mIHByZXNlbmNlIGpvaW4gYW5kIGxlYXZlIGV2ZW50cyBmcm9tIHRoZVxuICAgICAqIHNlcnZlciwgYXMgdGhleSBoYXBwZW4uXG4gICAgICpcbiAgICAgKiBMaWtlIGBzeW5jU3RhdGVgLCBgc3luY0RpZmZgIGFjY2VwdHMgb3B0aW9uYWwgYG9uSm9pbmAgYW5kXG4gICAgICogYG9uTGVhdmVgIGNhbGxiYWNrcyB0byByZWFjdCB0byBhIHVzZXIgam9pbmluZyBvciBsZWF2aW5nIGZyb20gYVxuICAgICAqIGRldmljZS5cbiAgICAgKlxuICAgICAqIEBpbnRlcm5hbFxuICAgICAqL1xuICAgIHN0YXRpYyBzeW5jRGlmZihzdGF0ZSwgZGlmZiwgb25Kb2luLCBvbkxlYXZlKSB7XG4gICAgICAgIGNvbnN0IHsgam9pbnMsIGxlYXZlcyB9ID0ge1xuICAgICAgICAgICAgam9pbnM6IHRoaXMudHJhbnNmb3JtU3RhdGUoZGlmZi5qb2lucyksXG4gICAgICAgICAgICBsZWF2ZXM6IHRoaXMudHJhbnNmb3JtU3RhdGUoZGlmZi5sZWF2ZXMpLFxuICAgICAgICB9O1xuICAgICAgICBpZiAoIW9uSm9pbikge1xuICAgICAgICAgICAgb25Kb2luID0gKCkgPT4geyB9O1xuICAgICAgICB9XG4gICAgICAgIGlmICghb25MZWF2ZSkge1xuICAgICAgICAgICAgb25MZWF2ZSA9ICgpID0+IHsgfTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1hcChqb2lucywgKGtleSwgbmV3UHJlc2VuY2VzKSA9PiB7XG4gICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50UHJlc2VuY2VzID0gKF9hID0gc3RhdGVba2V5XSkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogW107XG4gICAgICAgICAgICBzdGF0ZVtrZXldID0gdGhpcy5jbG9uZURlZXAobmV3UHJlc2VuY2VzKTtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UHJlc2VuY2VzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBjb25zdCBqb2luZWRQcmVzZW5jZVJlZnMgPSBzdGF0ZVtrZXldLm1hcCgobSkgPT4gbS5wcmVzZW5jZV9yZWYpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGN1clByZXNlbmNlcyA9IGN1cnJlbnRQcmVzZW5jZXMuZmlsdGVyKChtKSA9PiBqb2luZWRQcmVzZW5jZVJlZnMuaW5kZXhPZihtLnByZXNlbmNlX3JlZikgPCAwKTtcbiAgICAgICAgICAgICAgICBzdGF0ZVtrZXldLnVuc2hpZnQoLi4uY3VyUHJlc2VuY2VzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9uSm9pbihrZXksIGN1cnJlbnRQcmVzZW5jZXMsIG5ld1ByZXNlbmNlcyk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLm1hcChsZWF2ZXMsIChrZXksIGxlZnRQcmVzZW5jZXMpID0+IHtcbiAgICAgICAgICAgIGxldCBjdXJyZW50UHJlc2VuY2VzID0gc3RhdGVba2V5XTtcbiAgICAgICAgICAgIGlmICghY3VycmVudFByZXNlbmNlcylcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBjb25zdCBwcmVzZW5jZVJlZnNUb1JlbW92ZSA9IGxlZnRQcmVzZW5jZXMubWFwKChtKSA9PiBtLnByZXNlbmNlX3JlZik7XG4gICAgICAgICAgICBjdXJyZW50UHJlc2VuY2VzID0gY3VycmVudFByZXNlbmNlcy5maWx0ZXIoKG0pID0+IHByZXNlbmNlUmVmc1RvUmVtb3ZlLmluZGV4T2YobS5wcmVzZW5jZV9yZWYpIDwgMCk7XG4gICAgICAgICAgICBzdGF0ZVtrZXldID0gY3VycmVudFByZXNlbmNlcztcbiAgICAgICAgICAgIG9uTGVhdmUoa2V5LCBjdXJyZW50UHJlc2VuY2VzLCBsZWZ0UHJlc2VuY2VzKTtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UHJlc2VuY2VzLmxlbmd0aCA9PT0gMClcbiAgICAgICAgICAgICAgICBkZWxldGUgc3RhdGVba2V5XTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG4gICAgLyoqIEBpbnRlcm5hbCAqL1xuICAgIHN0YXRpYyBtYXAob2JqLCBmdW5jKSB7XG4gICAgICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvYmopLm1hcCgoa2V5KSA9PiBmdW5jKGtleSwgb2JqW2tleV0pKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVtb3ZlICdtZXRhcycga2V5XG4gICAgICogQ2hhbmdlICdwaHhfcmVmJyB0byAncHJlc2VuY2VfcmVmJ1xuICAgICAqIFJlbW92ZSAncGh4X3JlZicgYW5kICdwaHhfcmVmX3ByZXYnXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIC8vIHJldHVybnMge1xuICAgICAqICBhYmMxMjM6IFtcbiAgICAgKiAgICB7IHByZXNlbmNlX3JlZjogJzInLCB1c2VyX2lkOiAxIH0sXG4gICAgICogICAgeyBwcmVzZW5jZV9yZWY6ICczJywgdXNlcl9pZDogMiB9XG4gICAgICogIF1cbiAgICAgKiB9XG4gICAgICogUmVhbHRpbWVQcmVzZW5jZS50cmFuc2Zvcm1TdGF0ZSh7XG4gICAgICogIGFiYzEyMzoge1xuICAgICAqICAgIG1ldGFzOiBbXG4gICAgICogICAgICB7IHBoeF9yZWY6ICcyJywgcGh4X3JlZl9wcmV2OiAnMScgdXNlcl9pZDogMSB9LFxuICAgICAqICAgICAgeyBwaHhfcmVmOiAnMycsIHVzZXJfaWQ6IDIgfVxuICAgICAqICAgIF1cbiAgICAgKiAgfVxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBAaW50ZXJuYWxcbiAgICAgKi9cbiAgICBzdGF0aWMgdHJhbnNmb3JtU3RhdGUoc3RhdGUpIHtcbiAgICAgICAgc3RhdGUgPSB0aGlzLmNsb25lRGVlcChzdGF0ZSk7XG4gICAgICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhzdGF0ZSkucmVkdWNlKChuZXdTdGF0ZSwga2V5KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBwcmVzZW5jZXMgPSBzdGF0ZVtrZXldO1xuICAgICAgICAgICAgaWYgKCdtZXRhcycgaW4gcHJlc2VuY2VzKSB7XG4gICAgICAgICAgICAgICAgbmV3U3RhdGVba2V5XSA9IHByZXNlbmNlcy5tZXRhcy5tYXAoKHByZXNlbmNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHByZXNlbmNlWydwcmVzZW5jZV9yZWYnXSA9IHByZXNlbmNlWydwaHhfcmVmJ107XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBwcmVzZW5jZVsncGh4X3JlZiddO1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgcHJlc2VuY2VbJ3BoeF9yZWZfcHJldiddO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJlc2VuY2U7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBuZXdTdGF0ZVtrZXldID0gcHJlc2VuY2VzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG5ld1N0YXRlO1xuICAgICAgICB9LCB7fSk7XG4gICAgfVxuICAgIC8qKiBAaW50ZXJuYWwgKi9cbiAgICBzdGF0aWMgY2xvbmVEZWVwKG9iaikge1xuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShvYmopKTtcbiAgICB9XG4gICAgLyoqIEBpbnRlcm5hbCAqL1xuICAgIG9uSm9pbihjYWxsYmFjaykge1xuICAgICAgICB0aGlzLmNhbGxlci5vbkpvaW4gPSBjYWxsYmFjaztcbiAgICB9XG4gICAgLyoqIEBpbnRlcm5hbCAqL1xuICAgIG9uTGVhdmUoY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5jYWxsZXIub25MZWF2ZSA9IGNhbGxiYWNrO1xuICAgIH1cbiAgICAvKiogQGludGVybmFsICovXG4gICAgb25TeW5jKGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMuY2FsbGVyLm9uU3luYyA9IGNhbGxiYWNrO1xuICAgIH1cbiAgICAvKiogQGludGVybmFsICovXG4gICAgaW5QZW5kaW5nU3luY1N0YXRlKCkge1xuICAgICAgICByZXR1cm4gIXRoaXMuam9pblJlZiB8fCB0aGlzLmpvaW5SZWYgIT09IHRoaXMuY2hhbm5lbC5fam9pblJlZigpO1xuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVJlYWx0aW1lUHJlc2VuY2UuanMubWFwIiwiaW1wb3J0IFJlYWx0aW1lQ2xpZW50IGZyb20gJy4vUmVhbHRpbWVDbGllbnQnO1xuaW1wb3J0IFJlYWx0aW1lQ2hhbm5lbCwgeyBSRUFMVElNRV9MSVNURU5fVFlQRVMsIFJFQUxUSU1FX1BPU1RHUkVTX0NIQU5HRVNfTElTVEVOX0VWRU5ULCBSRUFMVElNRV9TVUJTQ1JJQkVfU1RBVEVTLCB9IGZyb20gJy4vUmVhbHRpbWVDaGFubmVsJztcbmltcG9ydCBSZWFsdGltZVByZXNlbmNlLCB7IFJFQUxUSU1FX1BSRVNFTkNFX0xJU1RFTl9FVkVOVFMsIH0gZnJvbSAnLi9SZWFsdGltZVByZXNlbmNlJztcbmV4cG9ydCB7IFJlYWx0aW1lUHJlc2VuY2UsIFJlYWx0aW1lQ2hhbm5lbCwgUmVhbHRpbWVDbGllbnQsIFJFQUxUSU1FX0xJU1RFTl9UWVBFUywgUkVBTFRJTUVfUE9TVEdSRVNfQ0hBTkdFU19MSVNURU5fRVZFTlQsIFJFQUxUSU1FX1BSRVNFTkNFX0xJU1RFTl9FVkVOVFMsIFJFQUxUSU1FX1NVQlNDUklCRV9TVEFURVMsIH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJpbXBvcnQgeyB2ZXJzaW9uIH0gZnJvbSAnLi92ZXJzaW9uJztcbmV4cG9ydCBjb25zdCBERUZBVUxUX0hFQURFUlMgPSB7ICdYLUNsaWVudC1JbmZvJzogYHJlYWx0aW1lLWpzLyR7dmVyc2lvbn1gIH07XG5leHBvcnQgY29uc3QgVlNOID0gJzEuMC4wJztcbmV4cG9ydCBjb25zdCBERUZBVUxUX1RJTUVPVVQgPSAxMDAwMDtcbmV4cG9ydCBjb25zdCBXU19DTE9TRV9OT1JNQUwgPSAxMDAwO1xuZXhwb3J0IHZhciBTT0NLRVRfU1RBVEVTO1xuKGZ1bmN0aW9uIChTT0NLRVRfU1RBVEVTKSB7XG4gICAgU09DS0VUX1NUQVRFU1tTT0NLRVRfU1RBVEVTW1wiY29ubmVjdGluZ1wiXSA9IDBdID0gXCJjb25uZWN0aW5nXCI7XG4gICAgU09DS0VUX1NUQVRFU1tTT0NLRVRfU1RBVEVTW1wib3BlblwiXSA9IDFdID0gXCJvcGVuXCI7XG4gICAgU09DS0VUX1NUQVRFU1tTT0NLRVRfU1RBVEVTW1wiY2xvc2luZ1wiXSA9IDJdID0gXCJjbG9zaW5nXCI7XG4gICAgU09DS0VUX1NUQVRFU1tTT0NLRVRfU1RBVEVTW1wiY2xvc2VkXCJdID0gM10gPSBcImNsb3NlZFwiO1xufSkoU09DS0VUX1NUQVRFUyB8fCAoU09DS0VUX1NUQVRFUyA9IHt9KSk7XG5leHBvcnQgdmFyIENIQU5ORUxfU1RBVEVTO1xuKGZ1bmN0aW9uIChDSEFOTkVMX1NUQVRFUykge1xuICAgIENIQU5ORUxfU1RBVEVTW1wiY2xvc2VkXCJdID0gXCJjbG9zZWRcIjtcbiAgICBDSEFOTkVMX1NUQVRFU1tcImVycm9yZWRcIl0gPSBcImVycm9yZWRcIjtcbiAgICBDSEFOTkVMX1NUQVRFU1tcImpvaW5lZFwiXSA9IFwiam9pbmVkXCI7XG4gICAgQ0hBTk5FTF9TVEFURVNbXCJqb2luaW5nXCJdID0gXCJqb2luaW5nXCI7XG4gICAgQ0hBTk5FTF9TVEFURVNbXCJsZWF2aW5nXCJdID0gXCJsZWF2aW5nXCI7XG59KShDSEFOTkVMX1NUQVRFUyB8fCAoQ0hBTk5FTF9TVEFURVMgPSB7fSkpO1xuZXhwb3J0IHZhciBDSEFOTkVMX0VWRU5UUztcbihmdW5jdGlvbiAoQ0hBTk5FTF9FVkVOVFMpIHtcbiAgICBDSEFOTkVMX0VWRU5UU1tcImNsb3NlXCJdID0gXCJwaHhfY2xvc2VcIjtcbiAgICBDSEFOTkVMX0VWRU5UU1tcImVycm9yXCJdID0gXCJwaHhfZXJyb3JcIjtcbiAgICBDSEFOTkVMX0VWRU5UU1tcImpvaW5cIl0gPSBcInBoeF9qb2luXCI7XG4gICAgQ0hBTk5FTF9FVkVOVFNbXCJyZXBseVwiXSA9IFwicGh4X3JlcGx5XCI7XG4gICAgQ0hBTk5FTF9FVkVOVFNbXCJsZWF2ZVwiXSA9IFwicGh4X2xlYXZlXCI7XG4gICAgQ0hBTk5FTF9FVkVOVFNbXCJhY2Nlc3NfdG9rZW5cIl0gPSBcImFjY2Vzc190b2tlblwiO1xufSkoQ0hBTk5FTF9FVkVOVFMgfHwgKENIQU5ORUxfRVZFTlRTID0ge30pKTtcbmV4cG9ydCB2YXIgVFJBTlNQT1JUUztcbihmdW5jdGlvbiAoVFJBTlNQT1JUUykge1xuICAgIFRSQU5TUE9SVFNbXCJ3ZWJzb2NrZXRcIl0gPSBcIndlYnNvY2tldFwiO1xufSkoVFJBTlNQT1JUUyB8fCAoVFJBTlNQT1JUUyA9IHt9KSk7XG5leHBvcnQgdmFyIENPTk5FQ1RJT05fU1RBVEU7XG4oZnVuY3Rpb24gKENPTk5FQ1RJT05fU1RBVEUpIHtcbiAgICBDT05ORUNUSU9OX1NUQVRFW1wiQ29ubmVjdGluZ1wiXSA9IFwiY29ubmVjdGluZ1wiO1xuICAgIENPTk5FQ1RJT05fU1RBVEVbXCJPcGVuXCJdID0gXCJvcGVuXCI7XG4gICAgQ09OTkVDVElPTl9TVEFURVtcIkNsb3NpbmdcIl0gPSBcImNsb3NpbmdcIjtcbiAgICBDT05ORUNUSU9OX1NUQVRFW1wiQ2xvc2VkXCJdID0gXCJjbG9zZWRcIjtcbn0pKENPTk5FQ1RJT05fU1RBVEUgfHwgKENPTk5FQ1RJT05fU1RBVEUgPSB7fSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29uc3RhbnRzLmpzLm1hcCIsImltcG9ydCB7IERFRkFVTFRfVElNRU9VVCB9IGZyb20gJy4uL2xpYi9jb25zdGFudHMnO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHVzaCB7XG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZXMgdGhlIFB1c2hcbiAgICAgKlxuICAgICAqIEBwYXJhbSBjaGFubmVsIFRoZSBDaGFubmVsXG4gICAgICogQHBhcmFtIGV2ZW50IFRoZSBldmVudCwgZm9yIGV4YW1wbGUgYFwicGh4X2pvaW5cImBcbiAgICAgKiBAcGFyYW0gcGF5bG9hZCBUaGUgcGF5bG9hZCwgZm9yIGV4YW1wbGUgYHt1c2VyX2lkOiAxMjN9YFxuICAgICAqIEBwYXJhbSB0aW1lb3V0IFRoZSBwdXNoIHRpbWVvdXQgaW4gbWlsbGlzZWNvbmRzXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoY2hhbm5lbCwgZXZlbnQsIHBheWxvYWQgPSB7fSwgdGltZW91dCA9IERFRkFVTFRfVElNRU9VVCkge1xuICAgICAgICB0aGlzLmNoYW5uZWwgPSBjaGFubmVsO1xuICAgICAgICB0aGlzLmV2ZW50ID0gZXZlbnQ7XG4gICAgICAgIHRoaXMucGF5bG9hZCA9IHBheWxvYWQ7XG4gICAgICAgIHRoaXMudGltZW91dCA9IHRpbWVvdXQ7XG4gICAgICAgIHRoaXMuc2VudCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnRpbWVvdXRUaW1lciA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5yZWYgPSAnJztcbiAgICAgICAgdGhpcy5yZWNlaXZlZFJlc3AgPSBudWxsO1xuICAgICAgICB0aGlzLnJlY0hvb2tzID0gW107XG4gICAgICAgIHRoaXMucmVmRXZlbnQgPSBudWxsO1xuICAgICAgICB0aGlzLnJhdGVMaW1pdGVkID0gZmFsc2U7XG4gICAgfVxuICAgIHJlc2VuZCh0aW1lb3V0KSB7XG4gICAgICAgIHRoaXMudGltZW91dCA9IHRpbWVvdXQ7XG4gICAgICAgIHRoaXMuX2NhbmNlbFJlZkV2ZW50KCk7XG4gICAgICAgIHRoaXMucmVmID0gJyc7XG4gICAgICAgIHRoaXMucmVmRXZlbnQgPSBudWxsO1xuICAgICAgICB0aGlzLnJlY2VpdmVkUmVzcCA9IG51bGw7XG4gICAgICAgIHRoaXMuc2VudCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNlbmQoKTtcbiAgICB9XG4gICAgc2VuZCgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2hhc1JlY2VpdmVkKCd0aW1lb3V0JykpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnN0YXJ0VGltZW91dCgpO1xuICAgICAgICB0aGlzLnNlbnQgPSB0cnVlO1xuICAgICAgICBjb25zdCBzdGF0dXMgPSB0aGlzLmNoYW5uZWwuc29ja2V0LnB1c2goe1xuICAgICAgICAgICAgdG9waWM6IHRoaXMuY2hhbm5lbC50b3BpYyxcbiAgICAgICAgICAgIGV2ZW50OiB0aGlzLmV2ZW50LFxuICAgICAgICAgICAgcGF5bG9hZDogdGhpcy5wYXlsb2FkLFxuICAgICAgICAgICAgcmVmOiB0aGlzLnJlZixcbiAgICAgICAgICAgIGpvaW5fcmVmOiB0aGlzLmNoYW5uZWwuX2pvaW5SZWYoKSxcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChzdGF0dXMgPT09ICdyYXRlIGxpbWl0ZWQnKSB7XG4gICAgICAgICAgICB0aGlzLnJhdGVMaW1pdGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB1cGRhdGVQYXlsb2FkKHBheWxvYWQpIHtcbiAgICAgICAgdGhpcy5wYXlsb2FkID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCB0aGlzLnBheWxvYWQpLCBwYXlsb2FkKTtcbiAgICB9XG4gICAgcmVjZWl2ZShzdGF0dXMsIGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgaWYgKHRoaXMuX2hhc1JlY2VpdmVkKHN0YXR1cykpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKChfYSA9IHRoaXMucmVjZWl2ZWRSZXNwKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucmVzcG9uc2UpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVjSG9va3MucHVzaCh7IHN0YXR1cywgY2FsbGJhY2sgfSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBzdGFydFRpbWVvdXQoKSB7XG4gICAgICAgIGlmICh0aGlzLnRpbWVvdXRUaW1lcikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVmID0gdGhpcy5jaGFubmVsLnNvY2tldC5fbWFrZVJlZigpO1xuICAgICAgICB0aGlzLnJlZkV2ZW50ID0gdGhpcy5jaGFubmVsLl9yZXBseUV2ZW50TmFtZSh0aGlzLnJlZik7XG4gICAgICAgIGNvbnN0IGNhbGxiYWNrID0gKHBheWxvYWQpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX2NhbmNlbFJlZkV2ZW50KCk7XG4gICAgICAgICAgICB0aGlzLl9jYW5jZWxUaW1lb3V0KCk7XG4gICAgICAgICAgICB0aGlzLnJlY2VpdmVkUmVzcCA9IHBheWxvYWQ7XG4gICAgICAgICAgICB0aGlzLl9tYXRjaFJlY2VpdmUocGF5bG9hZCk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuY2hhbm5lbC5fb24odGhpcy5yZWZFdmVudCwge30sIGNhbGxiYWNrKTtcbiAgICAgICAgdGhpcy50aW1lb3V0VGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMudHJpZ2dlcigndGltZW91dCcsIHt9KTtcbiAgICAgICAgfSwgdGhpcy50aW1lb3V0KTtcbiAgICB9XG4gICAgdHJpZ2dlcihzdGF0dXMsIHJlc3BvbnNlKSB7XG4gICAgICAgIGlmICh0aGlzLnJlZkV2ZW50KVxuICAgICAgICAgICAgdGhpcy5jaGFubmVsLl90cmlnZ2VyKHRoaXMucmVmRXZlbnQsIHsgc3RhdHVzLCByZXNwb25zZSB9KTtcbiAgICB9XG4gICAgZGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5fY2FuY2VsUmVmRXZlbnQoKTtcbiAgICAgICAgdGhpcy5fY2FuY2VsVGltZW91dCgpO1xuICAgIH1cbiAgICBfY2FuY2VsUmVmRXZlbnQoKSB7XG4gICAgICAgIGlmICghdGhpcy5yZWZFdmVudCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2hhbm5lbC5fb2ZmKHRoaXMucmVmRXZlbnQsIHt9KTtcbiAgICB9XG4gICAgX2NhbmNlbFRpbWVvdXQoKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXRUaW1lcik7XG4gICAgICAgIHRoaXMudGltZW91dFRpbWVyID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBfbWF0Y2hSZWNlaXZlKHsgc3RhdHVzLCByZXNwb25zZSwgfSkge1xuICAgICAgICB0aGlzLnJlY0hvb2tzXG4gICAgICAgICAgICAuZmlsdGVyKChoKSA9PiBoLnN0YXR1cyA9PT0gc3RhdHVzKVxuICAgICAgICAgICAgLmZvckVhY2goKGgpID0+IGguY2FsbGJhY2socmVzcG9uc2UpKTtcbiAgICB9XG4gICAgX2hhc1JlY2VpdmVkKHN0YXR1cykge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWNlaXZlZFJlc3AgJiYgdGhpcy5yZWNlaXZlZFJlc3Auc3RhdHVzID09PSBzdGF0dXM7XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cHVzaC5qcy5tYXAiLCIvLyBUaGlzIGZpbGUgZHJhd3MgaGVhdmlseSBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9waG9lbml4ZnJhbWV3b3JrL3Bob2VuaXgvY29tbWl0L2NmMDk4ZTljZjdhNDRlZTY0NzlkMzFkOTExYTk3ZDNjNzQzMGM2ZmVcbi8vIExpY2Vuc2U6IGh0dHBzOi8vZ2l0aHViLmNvbS9waG9lbml4ZnJhbWV3b3JrL3Bob2VuaXgvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VyaWFsaXplciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuSEVBREVSX0xFTkdUSCA9IDE7XG4gICAgfVxuICAgIGRlY29kZShyYXdQYXlsb2FkLCBjYWxsYmFjaykge1xuICAgICAgICBpZiAocmF3UGF5bG9hZC5jb25zdHJ1Y3RvciA9PT0gQXJyYXlCdWZmZXIpIHtcbiAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayh0aGlzLl9iaW5hcnlEZWNvZGUocmF3UGF5bG9hZCkpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgcmF3UGF5bG9hZCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayhKU09OLnBhcnNlKHJhd1BheWxvYWQpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2FsbGJhY2soe30pO1xuICAgIH1cbiAgICBfYmluYXJ5RGVjb2RlKGJ1ZmZlcikge1xuICAgICAgICBjb25zdCB2aWV3ID0gbmV3IERhdGFWaWV3KGJ1ZmZlcik7XG4gICAgICAgIGNvbnN0IGRlY29kZXIgPSBuZXcgVGV4dERlY29kZXIoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RlY29kZUJyb2FkY2FzdChidWZmZXIsIHZpZXcsIGRlY29kZXIpO1xuICAgIH1cbiAgICBfZGVjb2RlQnJvYWRjYXN0KGJ1ZmZlciwgdmlldywgZGVjb2Rlcikge1xuICAgICAgICBjb25zdCB0b3BpY1NpemUgPSB2aWV3LmdldFVpbnQ4KDEpO1xuICAgICAgICBjb25zdCBldmVudFNpemUgPSB2aWV3LmdldFVpbnQ4KDIpO1xuICAgICAgICBsZXQgb2Zmc2V0ID0gdGhpcy5IRUFERVJfTEVOR1RIICsgMjtcbiAgICAgICAgY29uc3QgdG9waWMgPSBkZWNvZGVyLmRlY29kZShidWZmZXIuc2xpY2Uob2Zmc2V0LCBvZmZzZXQgKyB0b3BpY1NpemUpKTtcbiAgICAgICAgb2Zmc2V0ID0gb2Zmc2V0ICsgdG9waWNTaXplO1xuICAgICAgICBjb25zdCBldmVudCA9IGRlY29kZXIuZGVjb2RlKGJ1ZmZlci5zbGljZShvZmZzZXQsIG9mZnNldCArIGV2ZW50U2l6ZSkpO1xuICAgICAgICBvZmZzZXQgPSBvZmZzZXQgKyBldmVudFNpemU7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBKU09OLnBhcnNlKGRlY29kZXIuZGVjb2RlKGJ1ZmZlci5zbGljZShvZmZzZXQsIGJ1ZmZlci5ieXRlTGVuZ3RoKSkpO1xuICAgICAgICByZXR1cm4geyByZWY6IG51bGwsIHRvcGljOiB0b3BpYywgZXZlbnQ6IGV2ZW50LCBwYXlsb2FkOiBkYXRhIH07XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c2VyaWFsaXplci5qcy5tYXAiLCIvKipcbiAqIENyZWF0ZXMgYSB0aW1lciB0aGF0IGFjY2VwdHMgYSBgdGltZXJDYWxjYCBmdW5jdGlvbiB0byBwZXJmb3JtIGNhbGN1bGF0ZWQgdGltZW91dCByZXRyaWVzLCBzdWNoIGFzIGV4cG9uZW50aWFsIGJhY2tvZmYuXG4gKlxuICogQGV4YW1wbGVcbiAqICAgIGxldCByZWNvbm5lY3RUaW1lciA9IG5ldyBUaW1lcigoKSA9PiB0aGlzLmNvbm5lY3QoKSwgZnVuY3Rpb24odHJpZXMpe1xuICogICAgICByZXR1cm4gWzEwMDAsIDUwMDAsIDEwMDAwXVt0cmllcyAtIDFdIHx8IDEwMDAwXG4gKiAgICB9KVxuICogICAgcmVjb25uZWN0VGltZXIuc2NoZWR1bGVUaW1lb3V0KCkgLy8gZmlyZXMgYWZ0ZXIgMTAwMFxuICogICAgcmVjb25uZWN0VGltZXIuc2NoZWR1bGVUaW1lb3V0KCkgLy8gZmlyZXMgYWZ0ZXIgNTAwMFxuICogICAgcmVjb25uZWN0VGltZXIucmVzZXQoKVxuICogICAgcmVjb25uZWN0VGltZXIuc2NoZWR1bGVUaW1lb3V0KCkgLy8gZmlyZXMgYWZ0ZXIgMTAwMFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUaW1lciB7XG4gICAgY29uc3RydWN0b3IoY2FsbGJhY2ssIHRpbWVyQ2FsYykge1xuICAgICAgICB0aGlzLmNhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgICAgIHRoaXMudGltZXJDYWxjID0gdGltZXJDYWxjO1xuICAgICAgICB0aGlzLnRpbWVyID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLnRyaWVzID0gMDtcbiAgICAgICAgdGhpcy5jYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgICAgICB0aGlzLnRpbWVyQ2FsYyA9IHRpbWVyQ2FsYztcbiAgICB9XG4gICAgcmVzZXQoKSB7XG4gICAgICAgIHRoaXMudHJpZXMgPSAwO1xuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lcik7XG4gICAgfVxuICAgIC8vIENhbmNlbHMgYW55IHByZXZpb3VzIHNjaGVkdWxlVGltZW91dCBhbmQgc2NoZWR1bGVzIGNhbGxiYWNrXG4gICAgc2NoZWR1bGVUaW1lb3V0KCkge1xuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lcik7XG4gICAgICAgIHRoaXMudGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMudHJpZXMgPSB0aGlzLnRyaWVzICsgMTtcbiAgICAgICAgICAgIHRoaXMuY2FsbGJhY2soKTtcbiAgICAgICAgfSwgdGhpcy50aW1lckNhbGModGhpcy50cmllcyArIDEpKTtcbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD10aW1lci5qcy5tYXAiLCIvKipcbiAqIEhlbHBlcnMgdG8gY29udmVydCB0aGUgY2hhbmdlIFBheWxvYWQgaW50byBuYXRpdmUgSlMgdHlwZXMuXG4gKi9cbi8vIEFkYXB0ZWQgZnJvbSBlcGdzcWwgKHNyYy9lcGdzcWxfYmluYXJ5LmVybCksIHRoaXMgbW9kdWxlIGxpY2Vuc2VkIHVuZGVyXG4vLyAzLWNsYXVzZSBCU0QgZm91bmQgaGVyZTogaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2VwZ3NxbC9lcGdzcWwvZGV2ZWwvTElDRU5TRVxuZXhwb3J0IHZhciBQb3N0Z3Jlc1R5cGVzO1xuKGZ1bmN0aW9uIChQb3N0Z3Jlc1R5cGVzKSB7XG4gICAgUG9zdGdyZXNUeXBlc1tcImFic3RpbWVcIl0gPSBcImFic3RpbWVcIjtcbiAgICBQb3N0Z3Jlc1R5cGVzW1wiYm9vbFwiXSA9IFwiYm9vbFwiO1xuICAgIFBvc3RncmVzVHlwZXNbXCJkYXRlXCJdID0gXCJkYXRlXCI7XG4gICAgUG9zdGdyZXNUeXBlc1tcImRhdGVyYW5nZVwiXSA9IFwiZGF0ZXJhbmdlXCI7XG4gICAgUG9zdGdyZXNUeXBlc1tcImZsb2F0NFwiXSA9IFwiZmxvYXQ0XCI7XG4gICAgUG9zdGdyZXNUeXBlc1tcImZsb2F0OFwiXSA9IFwiZmxvYXQ4XCI7XG4gICAgUG9zdGdyZXNUeXBlc1tcImludDJcIl0gPSBcImludDJcIjtcbiAgICBQb3N0Z3Jlc1R5cGVzW1wiaW50NFwiXSA9IFwiaW50NFwiO1xuICAgIFBvc3RncmVzVHlwZXNbXCJpbnQ0cmFuZ2VcIl0gPSBcImludDRyYW5nZVwiO1xuICAgIFBvc3RncmVzVHlwZXNbXCJpbnQ4XCJdID0gXCJpbnQ4XCI7XG4gICAgUG9zdGdyZXNUeXBlc1tcImludDhyYW5nZVwiXSA9IFwiaW50OHJhbmdlXCI7XG4gICAgUG9zdGdyZXNUeXBlc1tcImpzb25cIl0gPSBcImpzb25cIjtcbiAgICBQb3N0Z3Jlc1R5cGVzW1wianNvbmJcIl0gPSBcImpzb25iXCI7XG4gICAgUG9zdGdyZXNUeXBlc1tcIm1vbmV5XCJdID0gXCJtb25leVwiO1xuICAgIFBvc3RncmVzVHlwZXNbXCJudW1lcmljXCJdID0gXCJudW1lcmljXCI7XG4gICAgUG9zdGdyZXNUeXBlc1tcIm9pZFwiXSA9IFwib2lkXCI7XG4gICAgUG9zdGdyZXNUeXBlc1tcInJlbHRpbWVcIl0gPSBcInJlbHRpbWVcIjtcbiAgICBQb3N0Z3Jlc1R5cGVzW1widGV4dFwiXSA9IFwidGV4dFwiO1xuICAgIFBvc3RncmVzVHlwZXNbXCJ0aW1lXCJdID0gXCJ0aW1lXCI7XG4gICAgUG9zdGdyZXNUeXBlc1tcInRpbWVzdGFtcFwiXSA9IFwidGltZXN0YW1wXCI7XG4gICAgUG9zdGdyZXNUeXBlc1tcInRpbWVzdGFtcHR6XCJdID0gXCJ0aW1lc3RhbXB0elwiO1xuICAgIFBvc3RncmVzVHlwZXNbXCJ0aW1ldHpcIl0gPSBcInRpbWV0elwiO1xuICAgIFBvc3RncmVzVHlwZXNbXCJ0c3JhbmdlXCJdID0gXCJ0c3JhbmdlXCI7XG4gICAgUG9zdGdyZXNUeXBlc1tcInRzdHpyYW5nZVwiXSA9IFwidHN0enJhbmdlXCI7XG59KShQb3N0Z3Jlc1R5cGVzIHx8IChQb3N0Z3Jlc1R5cGVzID0ge30pKTtcbi8qKlxuICogVGFrZXMgYW4gYXJyYXkgb2YgY29sdW1ucyBhbmQgYW4gb2JqZWN0IG9mIHN0cmluZyB2YWx1ZXMgdGhlbiBjb252ZXJ0cyBlYWNoIHN0cmluZyB2YWx1ZVxuICogdG8gaXRzIG1hcHBlZCB0eXBlLlxuICpcbiAqIEBwYXJhbSB7e25hbWU6IFN0cmluZywgdHlwZTogU3RyaW5nfVtdfSBjb2x1bW5zXG4gKiBAcGFyYW0ge09iamVjdH0gcmVjb3JkXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyBUaGUgbWFwIG9mIHZhcmlvdXMgb3B0aW9ucyB0aGF0IGNhbiBiZSBhcHBsaWVkIHRvIHRoZSBtYXBwZXJcbiAqIEBwYXJhbSB7QXJyYXl9IG9wdGlvbnMuc2tpcFR5cGVzIFRoZSBhcnJheSBvZiB0eXBlcyB0aGF0IHNob3VsZCBub3QgYmUgY29udmVydGVkXG4gKlxuICogQGV4YW1wbGUgY29udmVydENoYW5nZURhdGEoW3tuYW1lOiAnZmlyc3RfbmFtZScsIHR5cGU6ICd0ZXh0J30sIHtuYW1lOiAnYWdlJywgdHlwZTogJ2ludDQnfV0sIHtmaXJzdF9uYW1lOiAnUGF1bCcsIGFnZTonMzMnfSwge30pXG4gKiAvLz0+eyBmaXJzdF9uYW1lOiAnUGF1bCcsIGFnZTogMzMgfVxuICovXG5leHBvcnQgY29uc3QgY29udmVydENoYW5nZURhdGEgPSAoY29sdW1ucywgcmVjb3JkLCBvcHRpb25zID0ge30pID0+IHtcbiAgICB2YXIgX2E7XG4gICAgY29uc3Qgc2tpcFR5cGVzID0gKF9hID0gb3B0aW9ucy5za2lwVHlwZXMpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IFtdO1xuICAgIHJldHVybiBPYmplY3Qua2V5cyhyZWNvcmQpLnJlZHVjZSgoYWNjLCByZWNfa2V5KSA9PiB7XG4gICAgICAgIGFjY1tyZWNfa2V5XSA9IGNvbnZlcnRDb2x1bW4ocmVjX2tleSwgY29sdW1ucywgcmVjb3JkLCBza2lwVHlwZXMpO1xuICAgICAgICByZXR1cm4gYWNjO1xuICAgIH0sIHt9KTtcbn07XG4vKipcbiAqIENvbnZlcnRzIHRoZSB2YWx1ZSBvZiBhbiBpbmRpdmlkdWFsIGNvbHVtbi5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gY29sdW1uTmFtZSBUaGUgY29sdW1uIHRoYXQgeW91IHdhbnQgdG8gY29udmVydFxuICogQHBhcmFtIHt7bmFtZTogU3RyaW5nLCB0eXBlOiBTdHJpbmd9W119IGNvbHVtbnMgQWxsIG9mIHRoZSBjb2x1bW5zXG4gKiBAcGFyYW0ge09iamVjdH0gcmVjb3JkIFRoZSBtYXAgb2Ygc3RyaW5nIHZhbHVlc1xuICogQHBhcmFtIHtBcnJheX0gc2tpcFR5cGVzIEFuIGFycmF5IG9mIHR5cGVzIHRoYXQgc2hvdWxkIG5vdCBiZSBjb252ZXJ0ZWRcbiAqIEByZXR1cm4ge29iamVjdH0gVXNlbGVzcyBpbmZvcm1hdGlvblxuICpcbiAqIEBleGFtcGxlIGNvbnZlcnRDb2x1bW4oJ2FnZScsIFt7bmFtZTogJ2ZpcnN0X25hbWUnLCB0eXBlOiAndGV4dCd9LCB7bmFtZTogJ2FnZScsIHR5cGU6ICdpbnQ0J31dLCB7Zmlyc3RfbmFtZTogJ1BhdWwnLCBhZ2U6ICczMyd9LCBbXSlcbiAqIC8vPT4gMzNcbiAqIEBleGFtcGxlIGNvbnZlcnRDb2x1bW4oJ2FnZScsIFt7bmFtZTogJ2ZpcnN0X25hbWUnLCB0eXBlOiAndGV4dCd9LCB7bmFtZTogJ2FnZScsIHR5cGU6ICdpbnQ0J31dLCB7Zmlyc3RfbmFtZTogJ1BhdWwnLCBhZ2U6ICczMyd9LCBbJ2ludDQnXSlcbiAqIC8vPT4gXCIzM1wiXG4gKi9cbmV4cG9ydCBjb25zdCBjb252ZXJ0Q29sdW1uID0gKGNvbHVtbk5hbWUsIGNvbHVtbnMsIHJlY29yZCwgc2tpcFR5cGVzKSA9PiB7XG4gICAgY29uc3QgY29sdW1uID0gY29sdW1ucy5maW5kKCh4KSA9PiB4Lm5hbWUgPT09IGNvbHVtbk5hbWUpO1xuICAgIGNvbnN0IGNvbFR5cGUgPSBjb2x1bW4gPT09IG51bGwgfHwgY29sdW1uID09PSB2b2lkIDAgPyB2b2lkIDAgOiBjb2x1bW4udHlwZTtcbiAgICBjb25zdCB2YWx1ZSA9IHJlY29yZFtjb2x1bW5OYW1lXTtcbiAgICBpZiAoY29sVHlwZSAmJiAhc2tpcFR5cGVzLmluY2x1ZGVzKGNvbFR5cGUpKSB7XG4gICAgICAgIHJldHVybiBjb252ZXJ0Q2VsbChjb2xUeXBlLCB2YWx1ZSk7XG4gICAgfVxuICAgIHJldHVybiBub29wKHZhbHVlKTtcbn07XG4vKipcbiAqIElmIHRoZSB2YWx1ZSBvZiB0aGUgY2VsbCBpcyBgbnVsbGAsIHJldHVybnMgbnVsbC5cbiAqIE90aGVyd2lzZSBjb252ZXJ0cyB0aGUgc3RyaW5nIHZhbHVlIHRvIHRoZSBjb3JyZWN0IHR5cGUuXG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZSBBIHBvc3RncmVzIGNvbHVtbiB0eXBlXG4gKiBAcGFyYW0ge1N0cmluZ30gdmFsdWUgVGhlIGNlbGwgdmFsdWVcbiAqXG4gKiBAZXhhbXBsZSBjb252ZXJ0Q2VsbCgnYm9vbCcsICd0JylcbiAqIC8vPT4gdHJ1ZVxuICogQGV4YW1wbGUgY29udmVydENlbGwoJ2ludDgnLCAnMTAnKVxuICogLy89PiAxMFxuICogQGV4YW1wbGUgY29udmVydENlbGwoJ19pbnQ0JywgJ3sxLDIsMyw0fScpXG4gKiAvLz0+IFsxLDIsMyw0XVxuICovXG5leHBvcnQgY29uc3QgY29udmVydENlbGwgPSAodHlwZSwgdmFsdWUpID0+IHtcbiAgICAvLyBpZiBkYXRhIHR5cGUgaXMgYW4gYXJyYXlcbiAgICBpZiAodHlwZS5jaGFyQXQoMCkgPT09ICdfJykge1xuICAgICAgICBjb25zdCBkYXRhVHlwZSA9IHR5cGUuc2xpY2UoMSwgdHlwZS5sZW5ndGgpO1xuICAgICAgICByZXR1cm4gdG9BcnJheSh2YWx1ZSwgZGF0YVR5cGUpO1xuICAgIH1cbiAgICAvLyBJZiBub3QgbnVsbCwgY29udmVydCB0byBjb3JyZWN0IHR5cGUuXG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgIGNhc2UgUG9zdGdyZXNUeXBlcy5ib29sOlxuICAgICAgICAgICAgcmV0dXJuIHRvQm9vbGVhbih2YWx1ZSk7XG4gICAgICAgIGNhc2UgUG9zdGdyZXNUeXBlcy5mbG9hdDQ6XG4gICAgICAgIGNhc2UgUG9zdGdyZXNUeXBlcy5mbG9hdDg6XG4gICAgICAgIGNhc2UgUG9zdGdyZXNUeXBlcy5pbnQyOlxuICAgICAgICBjYXNlIFBvc3RncmVzVHlwZXMuaW50NDpcbiAgICAgICAgY2FzZSBQb3N0Z3Jlc1R5cGVzLmludDg6XG4gICAgICAgIGNhc2UgUG9zdGdyZXNUeXBlcy5udW1lcmljOlxuICAgICAgICBjYXNlIFBvc3RncmVzVHlwZXMub2lkOlxuICAgICAgICAgICAgcmV0dXJuIHRvTnVtYmVyKHZhbHVlKTtcbiAgICAgICAgY2FzZSBQb3N0Z3Jlc1R5cGVzLmpzb246XG4gICAgICAgIGNhc2UgUG9zdGdyZXNUeXBlcy5qc29uYjpcbiAgICAgICAgICAgIHJldHVybiB0b0pzb24odmFsdWUpO1xuICAgICAgICBjYXNlIFBvc3RncmVzVHlwZXMudGltZXN0YW1wOlxuICAgICAgICAgICAgcmV0dXJuIHRvVGltZXN0YW1wU3RyaW5nKHZhbHVlKTsgLy8gRm9ybWF0IHRvIGJlIGNvbnNpc3RlbnQgd2l0aCBQb3N0Z1JFU1RcbiAgICAgICAgY2FzZSBQb3N0Z3Jlc1R5cGVzLmFic3RpbWU6IC8vIFRvIGFsbG93IHVzZXJzIHRvIGNhc3QgaXQgYmFzZWQgb24gVGltZXpvbmVcbiAgICAgICAgY2FzZSBQb3N0Z3Jlc1R5cGVzLmRhdGU6IC8vIFRvIGFsbG93IHVzZXJzIHRvIGNhc3QgaXQgYmFzZWQgb24gVGltZXpvbmVcbiAgICAgICAgY2FzZSBQb3N0Z3Jlc1R5cGVzLmRhdGVyYW5nZTpcbiAgICAgICAgY2FzZSBQb3N0Z3Jlc1R5cGVzLmludDRyYW5nZTpcbiAgICAgICAgY2FzZSBQb3N0Z3Jlc1R5cGVzLmludDhyYW5nZTpcbiAgICAgICAgY2FzZSBQb3N0Z3Jlc1R5cGVzLm1vbmV5OlxuICAgICAgICBjYXNlIFBvc3RncmVzVHlwZXMucmVsdGltZTogLy8gVG8gYWxsb3cgdXNlcnMgdG8gY2FzdCBpdCBiYXNlZCBvbiBUaW1lem9uZVxuICAgICAgICBjYXNlIFBvc3RncmVzVHlwZXMudGV4dDpcbiAgICAgICAgY2FzZSBQb3N0Z3Jlc1R5cGVzLnRpbWU6IC8vIFRvIGFsbG93IHVzZXJzIHRvIGNhc3QgaXQgYmFzZWQgb24gVGltZXpvbmVcbiAgICAgICAgY2FzZSBQb3N0Z3Jlc1R5cGVzLnRpbWVzdGFtcHR6OiAvLyBUbyBhbGxvdyB1c2VycyB0byBjYXN0IGl0IGJhc2VkIG9uIFRpbWV6b25lXG4gICAgICAgIGNhc2UgUG9zdGdyZXNUeXBlcy50aW1ldHo6IC8vIFRvIGFsbG93IHVzZXJzIHRvIGNhc3QgaXQgYmFzZWQgb24gVGltZXpvbmVcbiAgICAgICAgY2FzZSBQb3N0Z3Jlc1R5cGVzLnRzcmFuZ2U6XG4gICAgICAgIGNhc2UgUG9zdGdyZXNUeXBlcy50c3R6cmFuZ2U6XG4gICAgICAgICAgICByZXR1cm4gbm9vcCh2YWx1ZSk7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAvLyBSZXR1cm4gdGhlIHZhbHVlIGZvciByZW1haW5pbmcgdHlwZXNcbiAgICAgICAgICAgIHJldHVybiBub29wKHZhbHVlKTtcbiAgICB9XG59O1xuY29uc3Qgbm9vcCA9ICh2YWx1ZSkgPT4ge1xuICAgIHJldHVybiB2YWx1ZTtcbn07XG5leHBvcnQgY29uc3QgdG9Cb29sZWFuID0gKHZhbHVlKSA9PiB7XG4gICAgc3dpdGNoICh2YWx1ZSkge1xuICAgICAgICBjYXNlICd0JzpcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICBjYXNlICdmJzpcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG59O1xuZXhwb3J0IGNvbnN0IHRvTnVtYmVyID0gKHZhbHVlKSA9PiB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgY29uc3QgcGFyc2VkVmFsdWUgPSBwYXJzZUZsb2F0KHZhbHVlKTtcbiAgICAgICAgaWYgKCFOdW1iZXIuaXNOYU4ocGFyc2VkVmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gcGFyc2VkVmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xufTtcbmV4cG9ydCBjb25zdCB0b0pzb24gPSAodmFsdWUpID0+IHtcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UodmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYEpTT04gcGFyc2UgZXJyb3I6ICR7ZXJyb3J9YCk7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xufTtcbi8qKlxuICogQ29udmVydHMgYSBQb3N0Z3JlcyBBcnJheSBpbnRvIGEgbmF0aXZlIEpTIGFycmF5XG4gKlxuICogQGV4YW1wbGUgdG9BcnJheSgne30nLCAnaW50NCcpXG4gKiAvLz0+IFtdXG4gKiBAZXhhbXBsZSB0b0FycmF5KCd7XCJbMjAyMS0wMS0wMSwyMDIxLTEyLTMxKVwiLFwiKDIwMjEtMDEtMDEsMjAyMS0xMi0zMl1cIn0nLCAnZGF0ZXJhbmdlJylcbiAqIC8vPT4gWydbMjAyMS0wMS0wMSwyMDIxLTEyLTMxKScsICcoMjAyMS0wMS0wMSwyMDIxLTEyLTMyXSddXG4gKiBAZXhhbXBsZSB0b0FycmF5KFsxLDIsMyw0XSwgJ2ludDQnKVxuICogLy89PiBbMSwyLDMsNF1cbiAqL1xuZXhwb3J0IGNvbnN0IHRvQXJyYXkgPSAodmFsdWUsIHR5cGUpID0+IHtcbiAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICAgIGNvbnN0IGxhc3RJZHggPSB2YWx1ZS5sZW5ndGggLSAxO1xuICAgIGNvbnN0IGNsb3NlQnJhY2UgPSB2YWx1ZVtsYXN0SWR4XTtcbiAgICBjb25zdCBvcGVuQnJhY2UgPSB2YWx1ZVswXTtcbiAgICAvLyBDb25maXJtIHZhbHVlIGlzIGEgUG9zdGdyZXMgYXJyYXkgYnkgY2hlY2tpbmcgY3VybHkgYnJhY2tldHNcbiAgICBpZiAob3BlbkJyYWNlID09PSAneycgJiYgY2xvc2VCcmFjZSA9PT0gJ30nKSB7XG4gICAgICAgIGxldCBhcnI7XG4gICAgICAgIGNvbnN0IHZhbFRyaW0gPSB2YWx1ZS5zbGljZSgxLCBsYXN0SWR4KTtcbiAgICAgICAgLy8gVE9ETzogZmluZCBhIGJldHRlciBzb2x1dGlvbiB0byBzZXBhcmF0ZSBQb3N0Z3JlcyBhcnJheSBkYXRhXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhcnIgPSBKU09OLnBhcnNlKCdbJyArIHZhbFRyaW0gKyAnXScpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChfKSB7XG4gICAgICAgICAgICAvLyBXQVJOSU5HOiBzcGxpdHRpbmcgb24gY29tbWEgZG9lcyBub3QgY292ZXIgYWxsIGVkZ2UgY2FzZXNcbiAgICAgICAgICAgIGFyciA9IHZhbFRyaW0gPyB2YWxUcmltLnNwbGl0KCcsJykgOiBbXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYXJyLm1hcCgodmFsKSA9PiBjb252ZXJ0Q2VsbCh0eXBlLCB2YWwpKTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xufTtcbi8qKlxuICogRml4ZXMgdGltZXN0YW1wIHRvIGJlIElTTy04NjAxLiBTd2FwcyB0aGUgc3BhY2UgYmV0d2VlbiB0aGUgZGF0ZSBhbmQgdGltZSBmb3IgYSAnVCdcbiAqIFNlZSBodHRwczovL2dpdGh1Yi5jb20vc3VwYWJhc2Uvc3VwYWJhc2UvaXNzdWVzLzE4XG4gKlxuICogQGV4YW1wbGUgdG9UaW1lc3RhbXBTdHJpbmcoJzIwMTktMDktMTAgMDA6MDA6MDAnKVxuICogLy89PiAnMjAxOS0wOS0xMFQwMDowMDowMCdcbiAqL1xuZXhwb3J0IGNvbnN0IHRvVGltZXN0YW1wU3RyaW5nID0gKHZhbHVlKSA9PiB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlLnJlcGxhY2UoJyAnLCAnVCcpO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWU7XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dHJhbnNmb3JtZXJzLmpzLm1hcCIsImV4cG9ydCBjb25zdCB2ZXJzaW9uID0gJzIuNy4yJztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXZlcnNpb24uanMubWFwIiwiaW1wb3J0IFN0b3JhZ2VGaWxlQXBpIGZyb20gJy4vcGFja2FnZXMvU3RvcmFnZUZpbGVBcGknO1xuaW1wb3J0IFN0b3JhZ2VCdWNrZXRBcGkgZnJvbSAnLi9wYWNrYWdlcy9TdG9yYWdlQnVja2V0QXBpJztcbmV4cG9ydCBjbGFzcyBTdG9yYWdlQ2xpZW50IGV4dGVuZHMgU3RvcmFnZUJ1Y2tldEFwaSB7XG4gICAgY29uc3RydWN0b3IodXJsLCBoZWFkZXJzID0ge30sIGZldGNoKSB7XG4gICAgICAgIHN1cGVyKHVybCwgaGVhZGVycywgZmV0Y2gpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtIGZpbGUgb3BlcmF0aW9uIGluIGEgYnVja2V0LlxuICAgICAqXG4gICAgICogQHBhcmFtIGlkIFRoZSBidWNrZXQgaWQgdG8gb3BlcmF0ZSBvbi5cbiAgICAgKi9cbiAgICBmcm9tKGlkKSB7XG4gICAgICAgIHJldHVybiBuZXcgU3RvcmFnZUZpbGVBcGkodGhpcy51cmwsIHRoaXMuaGVhZGVycywgaWQsIHRoaXMuZmV0Y2gpO1xuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVN0b3JhZ2VDbGllbnQuanMubWFwIiwiaW1wb3J0IHsgdmVyc2lvbiB9IGZyb20gJy4vdmVyc2lvbic7XG5leHBvcnQgY29uc3QgREVGQVVMVF9IRUFERVJTID0geyAnWC1DbGllbnQtSW5mbyc6IGBzdG9yYWdlLWpzLyR7dmVyc2lvbn1gIH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb25zdGFudHMuanMubWFwIiwiZXhwb3J0IGNsYXNzIFN0b3JhZ2VFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcihtZXNzYWdlKSB7XG4gICAgICAgIHN1cGVyKG1lc3NhZ2UpO1xuICAgICAgICB0aGlzLl9faXNTdG9yYWdlRXJyb3IgPSB0cnVlO1xuICAgICAgICB0aGlzLm5hbWUgPSAnU3RvcmFnZUVycm9yJztcbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gaXNTdG9yYWdlRXJyb3IoZXJyb3IpIHtcbiAgICByZXR1cm4gdHlwZW9mIGVycm9yID09PSAnb2JqZWN0JyAmJiBlcnJvciAhPT0gbnVsbCAmJiAnX19pc1N0b3JhZ2VFcnJvcicgaW4gZXJyb3I7XG59XG5leHBvcnQgY2xhc3MgU3RvcmFnZUFwaUVycm9yIGV4dGVuZHMgU3RvcmFnZUVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcihtZXNzYWdlLCBzdGF0dXMpIHtcbiAgICAgICAgc3VwZXIobWVzc2FnZSk7XG4gICAgICAgIHRoaXMubmFtZSA9ICdTdG9yYWdlQXBpRXJyb3InO1xuICAgICAgICB0aGlzLnN0YXR1cyA9IHN0YXR1cztcbiAgICB9XG4gICAgdG9KU09OKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbmFtZTogdGhpcy5uYW1lLFxuICAgICAgICAgICAgbWVzc2FnZTogdGhpcy5tZXNzYWdlLFxuICAgICAgICAgICAgc3RhdHVzOiB0aGlzLnN0YXR1cyxcbiAgICAgICAgfTtcbiAgICB9XG59XG5leHBvcnQgY2xhc3MgU3RvcmFnZVVua25vd25FcnJvciBleHRlbmRzIFN0b3JhZ2VFcnJvciB7XG4gICAgY29uc3RydWN0b3IobWVzc2FnZSwgb3JpZ2luYWxFcnJvcikge1xuICAgICAgICBzdXBlcihtZXNzYWdlKTtcbiAgICAgICAgdGhpcy5uYW1lID0gJ1N0b3JhZ2VVbmtub3duRXJyb3InO1xuICAgICAgICB0aGlzLm9yaWdpbmFsRXJyb3IgPSBvcmlnaW5hbEVycm9yO1xuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWVycm9ycy5qcy5tYXAiLCJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbmltcG9ydCB7IFN0b3JhZ2VBcGlFcnJvciwgU3RvcmFnZVVua25vd25FcnJvciB9IGZyb20gJy4vZXJyb3JzJztcbmltcG9ydCB7IHJlc29sdmVSZXNwb25zZSB9IGZyb20gJy4vaGVscGVycyc7XG5jb25zdCBfZ2V0RXJyb3JNZXNzYWdlID0gKGVycikgPT4gZXJyLm1zZyB8fCBlcnIubWVzc2FnZSB8fCBlcnIuZXJyb3JfZGVzY3JpcHRpb24gfHwgZXJyLmVycm9yIHx8IEpTT04uc3RyaW5naWZ5KGVycik7XG5jb25zdCBoYW5kbGVFcnJvciA9IChlcnJvciwgcmVqZWN0KSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICBjb25zdCBSZXMgPSB5aWVsZCByZXNvbHZlUmVzcG9uc2UoKTtcbiAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBSZXMpIHtcbiAgICAgICAgZXJyb3JcbiAgICAgICAgICAgIC5qc29uKClcbiAgICAgICAgICAgIC50aGVuKChlcnIpID0+IHtcbiAgICAgICAgICAgIHJlamVjdChuZXcgU3RvcmFnZUFwaUVycm9yKF9nZXRFcnJvck1lc3NhZ2UoZXJyKSwgZXJyb3Iuc3RhdHVzIHx8IDUwMCkpO1xuICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICAgIHJlamVjdChuZXcgU3RvcmFnZVVua25vd25FcnJvcihfZ2V0RXJyb3JNZXNzYWdlKGVyciksIGVycikpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJlamVjdChuZXcgU3RvcmFnZVVua25vd25FcnJvcihfZ2V0RXJyb3JNZXNzYWdlKGVycm9yKSwgZXJyb3IpKTtcbiAgICB9XG59KTtcbmNvbnN0IF9nZXRSZXF1ZXN0UGFyYW1zID0gKG1ldGhvZCwgb3B0aW9ucywgcGFyYW1ldGVycywgYm9keSkgPT4ge1xuICAgIGNvbnN0IHBhcmFtcyA9IHsgbWV0aG9kLCBoZWFkZXJzOiAob3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLmhlYWRlcnMpIHx8IHt9IH07XG4gICAgaWYgKG1ldGhvZCA9PT0gJ0dFVCcpIHtcbiAgICAgICAgcmV0dXJuIHBhcmFtcztcbiAgICB9XG4gICAgcGFyYW1zLmhlYWRlcnMgPSBPYmplY3QuYXNzaWduKHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9LCBvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMuaGVhZGVycyk7XG4gICAgcGFyYW1zLmJvZHkgPSBKU09OLnN0cmluZ2lmeShib2R5KTtcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBwYXJhbXMpLCBwYXJhbWV0ZXJzKTtcbn07XG5mdW5jdGlvbiBfaGFuZGxlUmVxdWVzdChmZXRjaGVyLCBtZXRob2QsIHVybCwgb3B0aW9ucywgcGFyYW1ldGVycywgYm9keSkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBmZXRjaGVyKHVybCwgX2dldFJlcXVlc3RQYXJhbXMobWV0aG9kLCBvcHRpb25zLCBwYXJhbWV0ZXJzLCBib2R5KSlcbiAgICAgICAgICAgICAgICAudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCFyZXN1bHQub2spXG4gICAgICAgICAgICAgICAgICAgIHRocm93IHJlc3VsdDtcbiAgICAgICAgICAgICAgICBpZiAob3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLm5vUmVzb2x2ZUpzb24pXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5qc29uKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC50aGVuKChkYXRhKSA9PiByZXNvbHZlKGRhdGEpKVxuICAgICAgICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IGhhbmRsZUVycm9yKGVycm9yLCByZWplY3QpKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG5leHBvcnQgZnVuY3Rpb24gZ2V0KGZldGNoZXIsIHVybCwgb3B0aW9ucywgcGFyYW1ldGVycykge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIHJldHVybiBfaGFuZGxlUmVxdWVzdChmZXRjaGVyLCAnR0VUJywgdXJsLCBvcHRpb25zLCBwYXJhbWV0ZXJzKTtcbiAgICB9KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBwb3N0KGZldGNoZXIsIHVybCwgYm9keSwgb3B0aW9ucywgcGFyYW1ldGVycykge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIHJldHVybiBfaGFuZGxlUmVxdWVzdChmZXRjaGVyLCAnUE9TVCcsIHVybCwgb3B0aW9ucywgcGFyYW1ldGVycywgYm9keSk7XG4gICAgfSk7XG59XG5leHBvcnQgZnVuY3Rpb24gcHV0KGZldGNoZXIsIHVybCwgYm9keSwgb3B0aW9ucywgcGFyYW1ldGVycykge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIHJldHVybiBfaGFuZGxlUmVxdWVzdChmZXRjaGVyLCAnUFVUJywgdXJsLCBvcHRpb25zLCBwYXJhbWV0ZXJzLCBib2R5KTtcbiAgICB9KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmUoZmV0Y2hlciwgdXJsLCBib2R5LCBvcHRpb25zLCBwYXJhbWV0ZXJzKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgcmV0dXJuIF9oYW5kbGVSZXF1ZXN0KGZldGNoZXIsICdERUxFVEUnLCB1cmwsIG9wdGlvbnMsIHBhcmFtZXRlcnMsIGJvZHkpO1xuICAgIH0pO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZmV0Y2guanMubWFwIiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5leHBvcnQgY29uc3QgcmVzb2x2ZUZldGNoID0gKGN1c3RvbUZldGNoKSA9PiB7XG4gICAgbGV0IF9mZXRjaDtcbiAgICBpZiAoY3VzdG9tRmV0Y2gpIHtcbiAgICAgICAgX2ZldGNoID0gY3VzdG9tRmV0Y2g7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBmZXRjaCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgX2ZldGNoID0gKC4uLmFyZ3MpID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkgeyByZXR1cm4geWllbGQgKHlpZWxkIGltcG9ydCgnY3Jvc3MtZmV0Y2gnKSkuZmV0Y2goLi4uYXJncyk7IH0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgX2ZldGNoID0gZmV0Y2g7XG4gICAgfVxuICAgIHJldHVybiAoLi4uYXJncykgPT4gX2ZldGNoKC4uLmFyZ3MpO1xufTtcbmV4cG9ydCBjb25zdCByZXNvbHZlUmVzcG9uc2UgPSAoKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICBpZiAodHlwZW9mIFJlc3BvbnNlID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICByZXR1cm4gKHlpZWxkIGltcG9ydCgnY3Jvc3MtZmV0Y2gnKSkuUmVzcG9uc2U7XG4gICAgfVxuICAgIHJldHVybiBSZXNwb25zZTtcbn0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aGVscGVycy5qcy5tYXAiLCIvLyBnZW5lcmF0ZWQgYnkgZ2VudmVyc2lvblxuZXhwb3J0IGNvbnN0IHZlcnNpb24gPSAnMi41LjEnO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dmVyc2lvbi5qcy5tYXAiLCJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbmltcG9ydCB7IERFRkFVTFRfSEVBREVSUyB9IGZyb20gJy4uL2xpYi9jb25zdGFudHMnO1xuaW1wb3J0IHsgaXNTdG9yYWdlRXJyb3IgfSBmcm9tICcuLi9saWIvZXJyb3JzJztcbmltcG9ydCB7IGdldCwgcG9zdCwgcHV0LCByZW1vdmUgfSBmcm9tICcuLi9saWIvZmV0Y2gnO1xuaW1wb3J0IHsgcmVzb2x2ZUZldGNoIH0gZnJvbSAnLi4vbGliL2hlbHBlcnMnO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RvcmFnZUJ1Y2tldEFwaSB7XG4gICAgY29uc3RydWN0b3IodXJsLCBoZWFkZXJzID0ge30sIGZldGNoKSB7XG4gICAgICAgIHRoaXMudXJsID0gdXJsO1xuICAgICAgICB0aGlzLmhlYWRlcnMgPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIERFRkFVTFRfSEVBREVSUyksIGhlYWRlcnMpO1xuICAgICAgICB0aGlzLmZldGNoID0gcmVzb2x2ZUZldGNoKGZldGNoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0cmlldmVzIHRoZSBkZXRhaWxzIG9mIGFsbCBTdG9yYWdlIGJ1Y2tldHMgd2l0aGluIGFuIGV4aXN0aW5nIHByb2plY3QuXG4gICAgICovXG4gICAgbGlzdEJ1Y2tldHMoKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSB5aWVsZCBnZXQodGhpcy5mZXRjaCwgYCR7dGhpcy51cmx9L2J1Y2tldGAsIHsgaGVhZGVyczogdGhpcy5oZWFkZXJzIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGEsIGVycm9yOiBudWxsIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNTdG9yYWdlRXJyb3IoZXJyb3IpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IG51bGwsIGVycm9yIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0cmlldmVzIHRoZSBkZXRhaWxzIG9mIGFuIGV4aXN0aW5nIFN0b3JhZ2UgYnVja2V0LlxuICAgICAqXG4gICAgICogQHBhcmFtIGlkIFRoZSB1bmlxdWUgaWRlbnRpZmllciBvZiB0aGUgYnVja2V0IHlvdSB3b3VsZCBsaWtlIHRvIHJldHJpZXZlLlxuICAgICAqL1xuICAgIGdldEJ1Y2tldChpZCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0geWllbGQgZ2V0KHRoaXMuZmV0Y2gsIGAke3RoaXMudXJsfS9idWNrZXQvJHtpZH1gLCB7IGhlYWRlcnM6IHRoaXMuaGVhZGVycyB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhLCBlcnJvcjogbnVsbCB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzU3RvcmFnZUVycm9yKGVycm9yKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiBudWxsLCBlcnJvciB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgU3RvcmFnZSBidWNrZXRcbiAgICAgKlxuICAgICAqIEBwYXJhbSBpZCBBIHVuaXF1ZSBpZGVudGlmaWVyIGZvciB0aGUgYnVja2V0IHlvdSBhcmUgY3JlYXRpbmcuXG4gICAgICogQHBhcmFtIG9wdGlvbnMucHVibGljIFRoZSB2aXNpYmlsaXR5IG9mIHRoZSBidWNrZXQuIFB1YmxpYyBidWNrZXRzIGRvbid0IHJlcXVpcmUgYW4gYXV0aG9yaXphdGlvbiB0b2tlbiB0byBkb3dubG9hZCBvYmplY3RzLCBidXQgc3RpbGwgcmVxdWlyZSBhIHZhbGlkIHRva2VuIGZvciBhbGwgb3RoZXIgb3BlcmF0aW9ucy4gQnkgZGVmYXVsdCwgYnVja2V0cyBhcmUgcHJpdmF0ZS5cbiAgICAgKiBAcGFyYW0gb3B0aW9ucy5maWxlU2l6ZUxpbWl0IHNwZWNpZmllcyB0aGUgbWF4IGZpbGUgc2l6ZSBpbiBieXRlcyB0aGF0IGNhbiBiZSB1cGxvYWRlZCB0byB0aGlzIGJ1Y2tldC5cbiAgICAgKiBUaGUgZ2xvYmFsIGZpbGUgc2l6ZSBsaW1pdCB0YWtlcyBwcmVjZWRlbmNlIG92ZXIgdGhpcyB2YWx1ZS5cbiAgICAgKiBUaGUgZGVmYXVsdCB2YWx1ZSBpcyBudWxsLCB3aGljaCBkb2Vzbid0IHNldCBhIHBlciBidWNrZXQgZmlsZSBzaXplIGxpbWl0LlxuICAgICAqIEBwYXJhbSBvcHRpb25zLmFsbG93ZWRNaW1lVHlwZXMgc3BlY2lmaWVzIHRoZSBhbGxvd2VkIG1pbWUgdHlwZXMgdGhhdCB0aGlzIGJ1Y2tldCBjYW4gYWNjZXB0IGR1cmluZyB1cGxvYWQuXG4gICAgICogVGhlIGRlZmF1bHQgdmFsdWUgaXMgbnVsbCwgd2hpY2ggYWxsb3dzIGZpbGVzIHdpdGggYWxsIG1pbWUgdHlwZXMgdG8gYmUgdXBsb2FkZWQuXG4gICAgICogRWFjaCBtaW1lIHR5cGUgc3BlY2lmaWVkIGNhbiBiZSBhIHdpbGRjYXJkLCBlLmcuIGltYWdlLyosIG9yIGEgc3BlY2lmaWMgbWltZSB0eXBlLCBlLmcuIGltYWdlL3BuZy5cbiAgICAgKiBAcmV0dXJucyBuZXdseSBjcmVhdGVkIGJ1Y2tldCBpZFxuICAgICAqL1xuICAgIGNyZWF0ZUJ1Y2tldChpZCwgb3B0aW9ucyA9IHtcbiAgICAgICAgcHVibGljOiBmYWxzZSxcbiAgICB9KSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSB5aWVsZCBwb3N0KHRoaXMuZmV0Y2gsIGAke3RoaXMudXJsfS9idWNrZXRgLCB7XG4gICAgICAgICAgICAgICAgICAgIGlkLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBpZCxcbiAgICAgICAgICAgICAgICAgICAgcHVibGljOiBvcHRpb25zLnB1YmxpYyxcbiAgICAgICAgICAgICAgICAgICAgZmlsZV9zaXplX2xpbWl0OiBvcHRpb25zLmZpbGVTaXplTGltaXQsXG4gICAgICAgICAgICAgICAgICAgIGFsbG93ZWRfbWltZV90eXBlczogb3B0aW9ucy5hbGxvd2VkTWltZVR5cGVzLFxuICAgICAgICAgICAgICAgIH0sIHsgaGVhZGVyczogdGhpcy5oZWFkZXJzIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGEsIGVycm9yOiBudWxsIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNTdG9yYWdlRXJyb3IoZXJyb3IpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IG51bGwsIGVycm9yIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVXBkYXRlcyBhIFN0b3JhZ2UgYnVja2V0XG4gICAgICpcbiAgICAgKiBAcGFyYW0gaWQgQSB1bmlxdWUgaWRlbnRpZmllciBmb3IgdGhlIGJ1Y2tldCB5b3UgYXJlIHVwZGF0aW5nLlxuICAgICAqIEBwYXJhbSBvcHRpb25zLnB1YmxpYyBUaGUgdmlzaWJpbGl0eSBvZiB0aGUgYnVja2V0LiBQdWJsaWMgYnVja2V0cyBkb24ndCByZXF1aXJlIGFuIGF1dGhvcml6YXRpb24gdG9rZW4gdG8gZG93bmxvYWQgb2JqZWN0cywgYnV0IHN0aWxsIHJlcXVpcmUgYSB2YWxpZCB0b2tlbiBmb3IgYWxsIG90aGVyIG9wZXJhdGlvbnMuXG4gICAgICogQHBhcmFtIG9wdGlvbnMuZmlsZVNpemVMaW1pdCBzcGVjaWZpZXMgdGhlIG1heCBmaWxlIHNpemUgaW4gYnl0ZXMgdGhhdCBjYW4gYmUgdXBsb2FkZWQgdG8gdGhpcyBidWNrZXQuXG4gICAgICogVGhlIGdsb2JhbCBmaWxlIHNpemUgbGltaXQgdGFrZXMgcHJlY2VkZW5jZSBvdmVyIHRoaXMgdmFsdWUuXG4gICAgICogVGhlIGRlZmF1bHQgdmFsdWUgaXMgbnVsbCwgd2hpY2ggZG9lc24ndCBzZXQgYSBwZXIgYnVja2V0IGZpbGUgc2l6ZSBsaW1pdC5cbiAgICAgKiBAcGFyYW0gb3B0aW9ucy5hbGxvd2VkTWltZVR5cGVzIHNwZWNpZmllcyB0aGUgYWxsb3dlZCBtaW1lIHR5cGVzIHRoYXQgdGhpcyBidWNrZXQgY2FuIGFjY2VwdCBkdXJpbmcgdXBsb2FkLlxuICAgICAqIFRoZSBkZWZhdWx0IHZhbHVlIGlzIG51bGwsIHdoaWNoIGFsbG93cyBmaWxlcyB3aXRoIGFsbCBtaW1lIHR5cGVzIHRvIGJlIHVwbG9hZGVkLlxuICAgICAqIEVhY2ggbWltZSB0eXBlIHNwZWNpZmllZCBjYW4gYmUgYSB3aWxkY2FyZCwgZS5nLiBpbWFnZS8qLCBvciBhIHNwZWNpZmljIG1pbWUgdHlwZSwgZS5nLiBpbWFnZS9wbmcuXG4gICAgICovXG4gICAgdXBkYXRlQnVja2V0KGlkLCBvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSB5aWVsZCBwdXQodGhpcy5mZXRjaCwgYCR7dGhpcy51cmx9L2J1Y2tldC8ke2lkfWAsIHtcbiAgICAgICAgICAgICAgICAgICAgaWQsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IGlkLFxuICAgICAgICAgICAgICAgICAgICBwdWJsaWM6IG9wdGlvbnMucHVibGljLFxuICAgICAgICAgICAgICAgICAgICBmaWxlX3NpemVfbGltaXQ6IG9wdGlvbnMuZmlsZVNpemVMaW1pdCxcbiAgICAgICAgICAgICAgICAgICAgYWxsb3dlZF9taW1lX3R5cGVzOiBvcHRpb25zLmFsbG93ZWRNaW1lVHlwZXMsXG4gICAgICAgICAgICAgICAgfSwgeyBoZWFkZXJzOiB0aGlzLmhlYWRlcnMgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YSwgZXJyb3I6IG51bGwgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGlmIChpc1N0b3JhZ2VFcnJvcihlcnJvcikpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogbnVsbCwgZXJyb3IgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGFsbCBvYmplY3RzIGluc2lkZSBhIHNpbmdsZSBidWNrZXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gaWQgVGhlIHVuaXF1ZSBpZGVudGlmaWVyIG9mIHRoZSBidWNrZXQgeW91IHdvdWxkIGxpa2UgdG8gZW1wdHkuXG4gICAgICovXG4gICAgZW1wdHlCdWNrZXQoaWQpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IHlpZWxkIHBvc3QodGhpcy5mZXRjaCwgYCR7dGhpcy51cmx9L2J1Y2tldC8ke2lkfS9lbXB0eWAsIHt9LCB7IGhlYWRlcnM6IHRoaXMuaGVhZGVycyB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhLCBlcnJvcjogbnVsbCB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzU3RvcmFnZUVycm9yKGVycm9yKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiBudWxsLCBlcnJvciB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERlbGV0ZXMgYW4gZXhpc3RpbmcgYnVja2V0LiBBIGJ1Y2tldCBjYW4ndCBiZSBkZWxldGVkIHdpdGggZXhpc3Rpbmcgb2JqZWN0cyBpbnNpZGUgaXQuXG4gICAgICogWW91IG11c3QgZmlyc3QgYGVtcHR5KClgIHRoZSBidWNrZXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gaWQgVGhlIHVuaXF1ZSBpZGVudGlmaWVyIG9mIHRoZSBidWNrZXQgeW91IHdvdWxkIGxpa2UgdG8gZGVsZXRlLlxuICAgICAqL1xuICAgIGRlbGV0ZUJ1Y2tldChpZCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0geWllbGQgcmVtb3ZlKHRoaXMuZmV0Y2gsIGAke3RoaXMudXJsfS9idWNrZXQvJHtpZH1gLCB7fSwgeyBoZWFkZXJzOiB0aGlzLmhlYWRlcnMgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YSwgZXJyb3I6IG51bGwgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGlmIChpc1N0b3JhZ2VFcnJvcihlcnJvcikpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogbnVsbCwgZXJyb3IgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVN0b3JhZ2VCdWNrZXRBcGkuanMubWFwIiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5pbXBvcnQgeyBpc1N0b3JhZ2VFcnJvciwgU3RvcmFnZUVycm9yIH0gZnJvbSAnLi4vbGliL2Vycm9ycyc7XG5pbXBvcnQgeyBnZXQsIHBvc3QsIHJlbW92ZSB9IGZyb20gJy4uL2xpYi9mZXRjaCc7XG5pbXBvcnQgeyByZXNvbHZlRmV0Y2ggfSBmcm9tICcuLi9saWIvaGVscGVycyc7XG5jb25zdCBERUZBVUxUX1NFQVJDSF9PUFRJT05TID0ge1xuICAgIGxpbWl0OiAxMDAsXG4gICAgb2Zmc2V0OiAwLFxuICAgIHNvcnRCeToge1xuICAgICAgICBjb2x1bW46ICduYW1lJyxcbiAgICAgICAgb3JkZXI6ICdhc2MnLFxuICAgIH0sXG59O1xuY29uc3QgREVGQVVMVF9GSUxFX09QVElPTlMgPSB7XG4gICAgY2FjaGVDb250cm9sOiAnMzYwMCcsXG4gICAgY29udGVudFR5cGU6ICd0ZXh0L3BsYWluO2NoYXJzZXQ9VVRGLTgnLFxuICAgIHVwc2VydDogZmFsc2UsXG59O1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RvcmFnZUZpbGVBcGkge1xuICAgIGNvbnN0cnVjdG9yKHVybCwgaGVhZGVycyA9IHt9LCBidWNrZXRJZCwgZmV0Y2gpIHtcbiAgICAgICAgdGhpcy51cmwgPSB1cmw7XG4gICAgICAgIHRoaXMuaGVhZGVycyA9IGhlYWRlcnM7XG4gICAgICAgIHRoaXMuYnVja2V0SWQgPSBidWNrZXRJZDtcbiAgICAgICAgdGhpcy5mZXRjaCA9IHJlc29sdmVGZXRjaChmZXRjaCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFVwbG9hZHMgYSBmaWxlIHRvIGFuIGV4aXN0aW5nIGJ1Y2tldCBvciByZXBsYWNlcyBhbiBleGlzdGluZyBmaWxlIGF0IHRoZSBzcGVjaWZpZWQgcGF0aCB3aXRoIGEgbmV3IG9uZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBtZXRob2QgSFRUUCBtZXRob2QuXG4gICAgICogQHBhcmFtIHBhdGggVGhlIHJlbGF0aXZlIGZpbGUgcGF0aC4gU2hvdWxkIGJlIG9mIHRoZSBmb3JtYXQgYGZvbGRlci9zdWJmb2xkZXIvZmlsZW5hbWUucG5nYC4gVGhlIGJ1Y2tldCBtdXN0IGFscmVhZHkgZXhpc3QgYmVmb3JlIGF0dGVtcHRpbmcgdG8gdXBsb2FkLlxuICAgICAqIEBwYXJhbSBmaWxlQm9keSBUaGUgYm9keSBvZiB0aGUgZmlsZSB0byBiZSBzdG9yZWQgaW4gdGhlIGJ1Y2tldC5cbiAgICAgKi9cbiAgICB1cGxvYWRPclVwZGF0ZShtZXRob2QsIHBhdGgsIGZpbGVCb2R5LCBmaWxlT3B0aW9ucykge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBsZXQgYm9keTtcbiAgICAgICAgICAgICAgICBjb25zdCBvcHRpb25zID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBERUZBVUxUX0ZJTEVfT1BUSU9OUyksIGZpbGVPcHRpb25zKTtcbiAgICAgICAgICAgICAgICBjb25zdCBoZWFkZXJzID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCB0aGlzLmhlYWRlcnMpLCAobWV0aG9kID09PSAnUE9TVCcgJiYgeyAneC11cHNlcnQnOiBTdHJpbmcob3B0aW9ucy51cHNlcnQpIH0pKTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIEJsb2IgIT09ICd1bmRlZmluZWQnICYmIGZpbGVCb2R5IGluc3RhbmNlb2YgQmxvYikge1xuICAgICAgICAgICAgICAgICAgICBib2R5ID0gbmV3IEZvcm1EYXRhKCk7XG4gICAgICAgICAgICAgICAgICAgIGJvZHkuYXBwZW5kKCdjYWNoZUNvbnRyb2wnLCBvcHRpb25zLmNhY2hlQ29udHJvbCk7XG4gICAgICAgICAgICAgICAgICAgIGJvZHkuYXBwZW5kKCcnLCBmaWxlQm9keSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiBGb3JtRGF0YSAhPT0gJ3VuZGVmaW5lZCcgJiYgZmlsZUJvZHkgaW5zdGFuY2VvZiBGb3JtRGF0YSkge1xuICAgICAgICAgICAgICAgICAgICBib2R5ID0gZmlsZUJvZHk7XG4gICAgICAgICAgICAgICAgICAgIGJvZHkuYXBwZW5kKCdjYWNoZUNvbnRyb2wnLCBvcHRpb25zLmNhY2hlQ29udHJvbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBib2R5ID0gZmlsZUJvZHk7XG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcnNbJ2NhY2hlLWNvbnRyb2wnXSA9IGBtYXgtYWdlPSR7b3B0aW9ucy5jYWNoZUNvbnRyb2x9YDtcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyc1snY29udGVudC10eXBlJ10gPSBvcHRpb25zLmNvbnRlbnRUeXBlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBjbGVhblBhdGggPSB0aGlzLl9yZW1vdmVFbXB0eUZvbGRlcnMocGF0aCk7XG4gICAgICAgICAgICAgICAgY29uc3QgX3BhdGggPSB0aGlzLl9nZXRGaW5hbFBhdGgoY2xlYW5QYXRoKTtcbiAgICAgICAgICAgICAgICBjb25zdCByZXMgPSB5aWVsZCB0aGlzLmZldGNoKGAke3RoaXMudXJsfS9vYmplY3QvJHtfcGF0aH1gLCBPYmplY3QuYXNzaWduKHsgbWV0aG9kLCBib2R5OiBib2R5LCBoZWFkZXJzIH0sICgob3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLmR1cGxleCkgPyB7IGR1cGxleDogb3B0aW9ucy5kdXBsZXggfSA6IHt9KSkpO1xuICAgICAgICAgICAgICAgIGlmIChyZXMub2spIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHsgcGF0aDogY2xlYW5QYXRoIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvcjogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVycm9yID0geWllbGQgcmVzLmpzb24oKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogbnVsbCwgZXJyb3IgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNTdG9yYWdlRXJyb3IoZXJyb3IpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IG51bGwsIGVycm9yIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVXBsb2FkcyBhIGZpbGUgdG8gYW4gZXhpc3RpbmcgYnVja2V0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHBhdGggVGhlIGZpbGUgcGF0aCwgaW5jbHVkaW5nIHRoZSBmaWxlIG5hbWUuIFNob3VsZCBiZSBvZiB0aGUgZm9ybWF0IGBmb2xkZXIvc3ViZm9sZGVyL2ZpbGVuYW1lLnBuZ2AuIFRoZSBidWNrZXQgbXVzdCBhbHJlYWR5IGV4aXN0IGJlZm9yZSBhdHRlbXB0aW5nIHRvIHVwbG9hZC5cbiAgICAgKiBAcGFyYW0gZmlsZUJvZHkgVGhlIGJvZHkgb2YgdGhlIGZpbGUgdG8gYmUgc3RvcmVkIGluIHRoZSBidWNrZXQuXG4gICAgICovXG4gICAgdXBsb2FkKHBhdGgsIGZpbGVCb2R5LCBmaWxlT3B0aW9ucykge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudXBsb2FkT3JVcGRhdGUoJ1BPU1QnLCBwYXRoLCBmaWxlQm9keSwgZmlsZU9wdGlvbnMpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVXBsb2FkIGEgZmlsZSB3aXRoIGEgdG9rZW4gZ2VuZXJhdGVkIGZyb20gYGNyZWF0ZVNpZ25lZFVwbG9hZFVybGAuXG4gICAgICogQHBhcmFtIHBhdGggVGhlIGZpbGUgcGF0aCwgaW5jbHVkaW5nIHRoZSBmaWxlIG5hbWUuIFNob3VsZCBiZSBvZiB0aGUgZm9ybWF0IGBmb2xkZXIvc3ViZm9sZGVyL2ZpbGVuYW1lLnBuZ2AuIFRoZSBidWNrZXQgbXVzdCBhbHJlYWR5IGV4aXN0IGJlZm9yZSBhdHRlbXB0aW5nIHRvIHVwbG9hZC5cbiAgICAgKiBAcGFyYW0gdG9rZW4gVGhlIHRva2VuIGdlbmVyYXRlZCBmcm9tIGBjcmVhdGVTaWduZWRVcGxvYWRVcmxgXG4gICAgICogQHBhcmFtIGZpbGVCb2R5IFRoZSBib2R5IG9mIHRoZSBmaWxlIHRvIGJlIHN0b3JlZCBpbiB0aGUgYnVja2V0LlxuICAgICAqL1xuICAgIHVwbG9hZFRvU2lnbmVkVXJsKHBhdGgsIHRva2VuLCBmaWxlQm9keSwgZmlsZU9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIGNvbnN0IGNsZWFuUGF0aCA9IHRoaXMuX3JlbW92ZUVtcHR5Rm9sZGVycyhwYXRoKTtcbiAgICAgICAgICAgIGNvbnN0IF9wYXRoID0gdGhpcy5fZ2V0RmluYWxQYXRoKGNsZWFuUGF0aCk7XG4gICAgICAgICAgICBjb25zdCB1cmwgPSBuZXcgVVJMKHRoaXMudXJsICsgYC9vYmplY3QvdXBsb2FkL3NpZ24vJHtfcGF0aH1gKTtcbiAgICAgICAgICAgIHVybC5zZWFyY2hQYXJhbXMuc2V0KCd0b2tlbicsIHRva2VuKTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbGV0IGJvZHk7XG4gICAgICAgICAgICAgICAgY29uc3Qgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oeyB1cHNlcnQ6IERFRkFVTFRfRklMRV9PUFRJT05TLnVwc2VydCB9LCBmaWxlT3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgY29uc3QgaGVhZGVycyA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5oZWFkZXJzKSwgeyAneC11cHNlcnQnOiBTdHJpbmcob3B0aW9ucy51cHNlcnQpIH0pO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgQmxvYiAhPT0gJ3VuZGVmaW5lZCcgJiYgZmlsZUJvZHkgaW5zdGFuY2VvZiBCbG9iKSB7XG4gICAgICAgICAgICAgICAgICAgIGJvZHkgPSBuZXcgRm9ybURhdGEoKTtcbiAgICAgICAgICAgICAgICAgICAgYm9keS5hcHBlbmQoJ2NhY2hlQ29udHJvbCcsIG9wdGlvbnMuY2FjaGVDb250cm9sKTtcbiAgICAgICAgICAgICAgICAgICAgYm9keS5hcHBlbmQoJycsIGZpbGVCb2R5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIEZvcm1EYXRhICE9PSAndW5kZWZpbmVkJyAmJiBmaWxlQm9keSBpbnN0YW5jZW9mIEZvcm1EYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIGJvZHkgPSBmaWxlQm9keTtcbiAgICAgICAgICAgICAgICAgICAgYm9keS5hcHBlbmQoJ2NhY2hlQ29udHJvbCcsIG9wdGlvbnMuY2FjaGVDb250cm9sKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGJvZHkgPSBmaWxlQm9keTtcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyc1snY2FjaGUtY29udHJvbCddID0gYG1heC1hZ2U9JHtvcHRpb25zLmNhY2hlQ29udHJvbH1gO1xuICAgICAgICAgICAgICAgICAgICBoZWFkZXJzWydjb250ZW50LXR5cGUnXSA9IG9wdGlvbnMuY29udGVudFR5cGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IHJlcyA9IHlpZWxkIHRoaXMuZmV0Y2godXJsLnRvU3RyaW5nKCksIHtcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiAnUFVUJyxcbiAgICAgICAgICAgICAgICAgICAgYm9keTogYm9keSxcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVycyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpZiAocmVzLm9rKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7IHBhdGg6IGNsZWFuUGF0aCB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3I6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBlcnJvciA9IHlpZWxkIHJlcy5qc29uKCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IG51bGwsIGVycm9yIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzU3RvcmFnZUVycm9yKGVycm9yKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiBudWxsLCBlcnJvciB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBzaWduZWQgdXBsb2FkIFVSTC5cbiAgICAgKiBTaWduZWQgdXBsb2FkIFVSTHMgY2FuIGJlIHVzZWQgdG8gdXBsb2FkIGZpbGVzIHRvIHRoZSBidWNrZXQgd2l0aG91dCBmdXJ0aGVyIGF1dGhlbnRpY2F0aW9uLlxuICAgICAqIFRoZXkgYXJlIHZhbGlkIGZvciBvbmUgbWludXRlLlxuICAgICAqIEBwYXJhbSBwYXRoIFRoZSBmaWxlIHBhdGgsIGluY2x1ZGluZyB0aGUgY3VycmVudCBmaWxlIG5hbWUuIEZvciBleGFtcGxlIGBmb2xkZXIvaW1hZ2UucG5nYC5cbiAgICAgKi9cbiAgICBjcmVhdGVTaWduZWRVcGxvYWRVcmwocGF0aCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBsZXQgX3BhdGggPSB0aGlzLl9nZXRGaW5hbFBhdGgocGF0aCk7XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IHlpZWxkIHBvc3QodGhpcy5mZXRjaCwgYCR7dGhpcy51cmx9L29iamVjdC91cGxvYWQvc2lnbi8ke19wYXRofWAsIHt9LCB7IGhlYWRlcnM6IHRoaXMuaGVhZGVycyB9KTtcbiAgICAgICAgICAgICAgICBjb25zdCB1cmwgPSBuZXcgVVJMKHRoaXMudXJsICsgZGF0YS51cmwpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHRva2VuID0gdXJsLnNlYXJjaFBhcmFtcy5nZXQoJ3Rva2VuJyk7XG4gICAgICAgICAgICAgICAgaWYgKCF0b2tlbikge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgU3RvcmFnZUVycm9yKCdObyB0b2tlbiByZXR1cm5lZCBieSBBUEknKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogeyBzaWduZWRVcmw6IHVybC50b1N0cmluZygpLCBwYXRoLCB0b2tlbiB9LCBlcnJvcjogbnVsbCB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzU3RvcmFnZUVycm9yKGVycm9yKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiBudWxsLCBlcnJvciB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlcGxhY2VzIGFuIGV4aXN0aW5nIGZpbGUgYXQgdGhlIHNwZWNpZmllZCBwYXRoIHdpdGggYSBuZXcgb25lLlxuICAgICAqXG4gICAgICogQHBhcmFtIHBhdGggVGhlIHJlbGF0aXZlIGZpbGUgcGF0aC4gU2hvdWxkIGJlIG9mIHRoZSBmb3JtYXQgYGZvbGRlci9zdWJmb2xkZXIvZmlsZW5hbWUucG5nYC4gVGhlIGJ1Y2tldCBtdXN0IGFscmVhZHkgZXhpc3QgYmVmb3JlIGF0dGVtcHRpbmcgdG8gdXBkYXRlLlxuICAgICAqIEBwYXJhbSBmaWxlQm9keSBUaGUgYm9keSBvZiB0aGUgZmlsZSB0byBiZSBzdG9yZWQgaW4gdGhlIGJ1Y2tldC5cbiAgICAgKi9cbiAgICB1cGRhdGUocGF0aCwgZmlsZUJvZHksIGZpbGVPcHRpb25zKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy51cGxvYWRPclVwZGF0ZSgnUFVUJywgcGF0aCwgZmlsZUJvZHksIGZpbGVPcHRpb25zKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE1vdmVzIGFuIGV4aXN0aW5nIGZpbGUgdG8gYSBuZXcgcGF0aCBpbiB0aGUgc2FtZSBidWNrZXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZnJvbVBhdGggVGhlIG9yaWdpbmFsIGZpbGUgcGF0aCwgaW5jbHVkaW5nIHRoZSBjdXJyZW50IGZpbGUgbmFtZS4gRm9yIGV4YW1wbGUgYGZvbGRlci9pbWFnZS5wbmdgLlxuICAgICAqIEBwYXJhbSB0b1BhdGggVGhlIG5ldyBmaWxlIHBhdGgsIGluY2x1ZGluZyB0aGUgbmV3IGZpbGUgbmFtZS4gRm9yIGV4YW1wbGUgYGZvbGRlci9pbWFnZS1uZXcucG5nYC5cbiAgICAgKi9cbiAgICBtb3ZlKGZyb21QYXRoLCB0b1BhdGgpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IHlpZWxkIHBvc3QodGhpcy5mZXRjaCwgYCR7dGhpcy51cmx9L29iamVjdC9tb3ZlYCwgeyBidWNrZXRJZDogdGhpcy5idWNrZXRJZCwgc291cmNlS2V5OiBmcm9tUGF0aCwgZGVzdGluYXRpb25LZXk6IHRvUGF0aCB9LCB7IGhlYWRlcnM6IHRoaXMuaGVhZGVycyB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhLCBlcnJvcjogbnVsbCB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzU3RvcmFnZUVycm9yKGVycm9yKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiBudWxsLCBlcnJvciB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENvcGllcyBhbiBleGlzdGluZyBmaWxlIHRvIGEgbmV3IHBhdGggaW4gdGhlIHNhbWUgYnVja2V0LlxuICAgICAqXG4gICAgICogQHBhcmFtIGZyb21QYXRoIFRoZSBvcmlnaW5hbCBmaWxlIHBhdGgsIGluY2x1ZGluZyB0aGUgY3VycmVudCBmaWxlIG5hbWUuIEZvciBleGFtcGxlIGBmb2xkZXIvaW1hZ2UucG5nYC5cbiAgICAgKiBAcGFyYW0gdG9QYXRoIFRoZSBuZXcgZmlsZSBwYXRoLCBpbmNsdWRpbmcgdGhlIG5ldyBmaWxlIG5hbWUuIEZvciBleGFtcGxlIGBmb2xkZXIvaW1hZ2UtY29weS5wbmdgLlxuICAgICAqL1xuICAgIGNvcHkoZnJvbVBhdGgsIHRvUGF0aCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0geWllbGQgcG9zdCh0aGlzLmZldGNoLCBgJHt0aGlzLnVybH0vb2JqZWN0L2NvcHlgLCB7IGJ1Y2tldElkOiB0aGlzLmJ1Y2tldElkLCBzb3VyY2VLZXk6IGZyb21QYXRoLCBkZXN0aW5hdGlvbktleTogdG9QYXRoIH0sIHsgaGVhZGVyczogdGhpcy5oZWFkZXJzIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IHsgcGF0aDogZGF0YS5LZXkgfSwgZXJyb3I6IG51bGwgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGlmIChpc1N0b3JhZ2VFcnJvcihlcnJvcikpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogbnVsbCwgZXJyb3IgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgc2lnbmVkIFVSTC4gVXNlIGEgc2lnbmVkIFVSTCB0byBzaGFyZSBhIGZpbGUgZm9yIGEgZml4ZWQgYW1vdW50IG9mIHRpbWUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcGF0aCBUaGUgZmlsZSBwYXRoLCBpbmNsdWRpbmcgdGhlIGN1cnJlbnQgZmlsZSBuYW1lLiBGb3IgZXhhbXBsZSBgZm9sZGVyL2ltYWdlLnBuZ2AuXG4gICAgICogQHBhcmFtIGV4cGlyZXNJbiBUaGUgbnVtYmVyIG9mIHNlY29uZHMgdW50aWwgdGhlIHNpZ25lZCBVUkwgZXhwaXJlcy4gRm9yIGV4YW1wbGUsIGA2MGAgZm9yIGEgVVJMIHdoaWNoIGlzIHZhbGlkIGZvciBvbmUgbWludXRlLlxuICAgICAqIEBwYXJhbSBvcHRpb25zLmRvd25sb2FkIHRyaWdnZXJzIHRoZSBmaWxlIGFzIGEgZG93bmxvYWQgaWYgc2V0IHRvIHRydWUuIFNldCB0aGlzIHBhcmFtZXRlciBhcyB0aGUgbmFtZSBvZiB0aGUgZmlsZSBpZiB5b3Ugd2FudCB0byB0cmlnZ2VyIHRoZSBkb3dubG9hZCB3aXRoIGEgZGlmZmVyZW50IGZpbGVuYW1lLlxuICAgICAqIEBwYXJhbSBvcHRpb25zLnRyYW5zZm9ybSBUcmFuc2Zvcm0gdGhlIGFzc2V0IGJlZm9yZSBzZXJ2aW5nIGl0IHRvIHRoZSBjbGllbnQuXG4gICAgICovXG4gICAgY3JlYXRlU2lnbmVkVXJsKHBhdGgsIGV4cGlyZXNJbiwgb3B0aW9ucykge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBsZXQgX3BhdGggPSB0aGlzLl9nZXRGaW5hbFBhdGgocGF0aCk7XG4gICAgICAgICAgICAgICAgbGV0IGRhdGEgPSB5aWVsZCBwb3N0KHRoaXMuZmV0Y2gsIGAke3RoaXMudXJsfS9vYmplY3Qvc2lnbi8ke19wYXRofWAsIE9iamVjdC5hc3NpZ24oeyBleHBpcmVzSW4gfSwgKChvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMudHJhbnNmb3JtKSA/IHsgdHJhbnNmb3JtOiBvcHRpb25zLnRyYW5zZm9ybSB9IDoge30pKSwgeyBoZWFkZXJzOiB0aGlzLmhlYWRlcnMgfSk7XG4gICAgICAgICAgICAgICAgY29uc3QgZG93bmxvYWRRdWVyeVBhcmFtID0gKG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5kb3dubG9hZClcbiAgICAgICAgICAgICAgICAgICAgPyBgJmRvd25sb2FkPSR7b3B0aW9ucy5kb3dubG9hZCA9PT0gdHJ1ZSA/ICcnIDogb3B0aW9ucy5kb3dubG9hZH1gXG4gICAgICAgICAgICAgICAgICAgIDogJyc7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2lnbmVkVXJsID0gZW5jb2RlVVJJKGAke3RoaXMudXJsfSR7ZGF0YS5zaWduZWRVUkx9JHtkb3dubG9hZFF1ZXJ5UGFyYW19YCk7XG4gICAgICAgICAgICAgICAgZGF0YSA9IHsgc2lnbmVkVXJsIH07XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YSwgZXJyb3I6IG51bGwgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGlmIChpc1N0b3JhZ2VFcnJvcihlcnJvcikpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogbnVsbCwgZXJyb3IgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIG11bHRpcGxlIHNpZ25lZCBVUkxzLiBVc2UgYSBzaWduZWQgVVJMIHRvIHNoYXJlIGEgZmlsZSBmb3IgYSBmaXhlZCBhbW91bnQgb2YgdGltZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBwYXRocyBUaGUgZmlsZSBwYXRocyB0byBiZSBkb3dubG9hZGVkLCBpbmNsdWRpbmcgdGhlIGN1cnJlbnQgZmlsZSBuYW1lcy4gRm9yIGV4YW1wbGUgYFsnZm9sZGVyL2ltYWdlLnBuZycsICdmb2xkZXIyL2ltYWdlMi5wbmcnXWAuXG4gICAgICogQHBhcmFtIGV4cGlyZXNJbiBUaGUgbnVtYmVyIG9mIHNlY29uZHMgdW50aWwgdGhlIHNpZ25lZCBVUkxzIGV4cGlyZS4gRm9yIGV4YW1wbGUsIGA2MGAgZm9yIFVSTHMgd2hpY2ggYXJlIHZhbGlkIGZvciBvbmUgbWludXRlLlxuICAgICAqIEBwYXJhbSBvcHRpb25zLmRvd25sb2FkIHRyaWdnZXJzIHRoZSBmaWxlIGFzIGEgZG93bmxvYWQgaWYgc2V0IHRvIHRydWUuIFNldCB0aGlzIHBhcmFtZXRlciBhcyB0aGUgbmFtZSBvZiB0aGUgZmlsZSBpZiB5b3Ugd2FudCB0byB0cmlnZ2VyIHRoZSBkb3dubG9hZCB3aXRoIGEgZGlmZmVyZW50IGZpbGVuYW1lLlxuICAgICAqL1xuICAgIGNyZWF0ZVNpZ25lZFVybHMocGF0aHMsIGV4cGlyZXNJbiwgb3B0aW9ucykge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0geWllbGQgcG9zdCh0aGlzLmZldGNoLCBgJHt0aGlzLnVybH0vb2JqZWN0L3NpZ24vJHt0aGlzLmJ1Y2tldElkfWAsIHsgZXhwaXJlc0luLCBwYXRocyB9LCB7IGhlYWRlcnM6IHRoaXMuaGVhZGVycyB9KTtcbiAgICAgICAgICAgICAgICBjb25zdCBkb3dubG9hZFF1ZXJ5UGFyYW0gPSAob3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLmRvd25sb2FkKVxuICAgICAgICAgICAgICAgICAgICA/IGAmZG93bmxvYWQ9JHtvcHRpb25zLmRvd25sb2FkID09PSB0cnVlID8gJycgOiBvcHRpb25zLmRvd25sb2FkfWBcbiAgICAgICAgICAgICAgICAgICAgOiAnJztcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLm1hcCgoZGF0dW0pID0+IChPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIGRhdHVtKSwgeyBzaWduZWRVcmw6IGRhdHVtLnNpZ25lZFVSTFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gZW5jb2RlVVJJKGAke3RoaXMudXJsfSR7ZGF0dW0uc2lnbmVkVVJMfSR7ZG93bmxvYWRRdWVyeVBhcmFtfWApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBudWxsIH0pKSksXG4gICAgICAgICAgICAgICAgICAgIGVycm9yOiBudWxsLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNTdG9yYWdlRXJyb3IoZXJyb3IpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IG51bGwsIGVycm9yIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRG93bmxvYWRzIGEgZmlsZSBmcm9tIGEgcHJpdmF0ZSBidWNrZXQuIEZvciBwdWJsaWMgYnVja2V0cywgbWFrZSBhIHJlcXVlc3QgdG8gdGhlIFVSTCByZXR1cm5lZCBmcm9tIGBnZXRQdWJsaWNVcmxgIGluc3RlYWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcGF0aCBUaGUgZnVsbCBwYXRoIGFuZCBmaWxlIG5hbWUgb2YgdGhlIGZpbGUgdG8gYmUgZG93bmxvYWRlZC4gRm9yIGV4YW1wbGUgYGZvbGRlci9pbWFnZS5wbmdgLlxuICAgICAqIEBwYXJhbSBvcHRpb25zLnRyYW5zZm9ybSBUcmFuc2Zvcm0gdGhlIGFzc2V0IGJlZm9yZSBzZXJ2aW5nIGl0IHRvIHRoZSBjbGllbnQuXG4gICAgICovXG4gICAgZG93bmxvYWQocGF0aCwgb3B0aW9ucykge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgY29uc3Qgd2FudHNUcmFuc2Zvcm1hdGlvbiA9IHR5cGVvZiAob3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLnRyYW5zZm9ybSkgIT09ICd1bmRlZmluZWQnO1xuICAgICAgICAgICAgY29uc3QgcmVuZGVyUGF0aCA9IHdhbnRzVHJhbnNmb3JtYXRpb24gPyAncmVuZGVyL2ltYWdlL2F1dGhlbnRpY2F0ZWQnIDogJ29iamVjdCc7XG4gICAgICAgICAgICBjb25zdCB0cmFuc2Zvcm1hdGlvblF1ZXJ5ID0gdGhpcy50cmFuc2Zvcm1PcHRzVG9RdWVyeVN0cmluZygob3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLnRyYW5zZm9ybSkgfHwge30pO1xuICAgICAgICAgICAgY29uc3QgcXVlcnlTdHJpbmcgPSB0cmFuc2Zvcm1hdGlvblF1ZXJ5ID8gYD8ke3RyYW5zZm9ybWF0aW9uUXVlcnl9YCA6ICcnO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBjb25zdCBfcGF0aCA9IHRoaXMuX2dldEZpbmFsUGF0aChwYXRoKTtcbiAgICAgICAgICAgICAgICBjb25zdCByZXMgPSB5aWVsZCBnZXQodGhpcy5mZXRjaCwgYCR7dGhpcy51cmx9LyR7cmVuZGVyUGF0aH0vJHtfcGF0aH0ke3F1ZXJ5U3RyaW5nfWAsIHtcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxuICAgICAgICAgICAgICAgICAgICBub1Jlc29sdmVKc29uOiB0cnVlLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSB5aWVsZCByZXMuYmxvYigpO1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGEsIGVycm9yOiBudWxsIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNTdG9yYWdlRXJyb3IoZXJyb3IpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IG51bGwsIGVycm9yIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQSBzaW1wbGUgY29udmVuaWVuY2UgZnVuY3Rpb24gdG8gZ2V0IHRoZSBVUkwgZm9yIGFuIGFzc2V0IGluIGEgcHVibGljIGJ1Y2tldC4gSWYgeW91IGRvIG5vdCB3YW50IHRvIHVzZSB0aGlzIGZ1bmN0aW9uLCB5b3UgY2FuIGNvbnN0cnVjdCB0aGUgcHVibGljIFVSTCBieSBjb25jYXRlbmF0aW5nIHRoZSBidWNrZXQgVVJMIHdpdGggdGhlIHBhdGggdG8gdGhlIGFzc2V0LlxuICAgICAqIFRoaXMgZnVuY3Rpb24gZG9lcyBub3QgdmVyaWZ5IGlmIHRoZSBidWNrZXQgaXMgcHVibGljLiBJZiBhIHB1YmxpYyBVUkwgaXMgY3JlYXRlZCBmb3IgYSBidWNrZXQgd2hpY2ggaXMgbm90IHB1YmxpYywgeW91IHdpbGwgbm90IGJlIGFibGUgdG8gZG93bmxvYWQgdGhlIGFzc2V0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHBhdGggVGhlIHBhdGggYW5kIG5hbWUgb2YgdGhlIGZpbGUgdG8gZ2VuZXJhdGUgdGhlIHB1YmxpYyBVUkwgZm9yLiBGb3IgZXhhbXBsZSBgZm9sZGVyL2ltYWdlLnBuZ2AuXG4gICAgICogQHBhcmFtIG9wdGlvbnMuZG93bmxvYWQgVHJpZ2dlcnMgdGhlIGZpbGUgYXMgYSBkb3dubG9hZCBpZiBzZXQgdG8gdHJ1ZS4gU2V0IHRoaXMgcGFyYW1ldGVyIGFzIHRoZSBuYW1lIG9mIHRoZSBmaWxlIGlmIHlvdSB3YW50IHRvIHRyaWdnZXIgdGhlIGRvd25sb2FkIHdpdGggYSBkaWZmZXJlbnQgZmlsZW5hbWUuXG4gICAgICogQHBhcmFtIG9wdGlvbnMudHJhbnNmb3JtIFRyYW5zZm9ybSB0aGUgYXNzZXQgYmVmb3JlIHNlcnZpbmcgaXQgdG8gdGhlIGNsaWVudC5cbiAgICAgKi9cbiAgICBnZXRQdWJsaWNVcmwocGF0aCwgb3B0aW9ucykge1xuICAgICAgICBjb25zdCBfcGF0aCA9IHRoaXMuX2dldEZpbmFsUGF0aChwYXRoKTtcbiAgICAgICAgY29uc3QgX3F1ZXJ5U3RyaW5nID0gW107XG4gICAgICAgIGNvbnN0IGRvd25sb2FkUXVlcnlQYXJhbSA9IChvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMuZG93bmxvYWQpXG4gICAgICAgICAgICA/IGBkb3dubG9hZD0ke29wdGlvbnMuZG93bmxvYWQgPT09IHRydWUgPyAnJyA6IG9wdGlvbnMuZG93bmxvYWR9YFxuICAgICAgICAgICAgOiAnJztcbiAgICAgICAgaWYgKGRvd25sb2FkUXVlcnlQYXJhbSAhPT0gJycpIHtcbiAgICAgICAgICAgIF9xdWVyeVN0cmluZy5wdXNoKGRvd25sb2FkUXVlcnlQYXJhbSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgd2FudHNUcmFuc2Zvcm1hdGlvbiA9IHR5cGVvZiAob3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLnRyYW5zZm9ybSkgIT09ICd1bmRlZmluZWQnO1xuICAgICAgICBjb25zdCByZW5kZXJQYXRoID0gd2FudHNUcmFuc2Zvcm1hdGlvbiA/ICdyZW5kZXIvaW1hZ2UnIDogJ29iamVjdCc7XG4gICAgICAgIGNvbnN0IHRyYW5zZm9ybWF0aW9uUXVlcnkgPSB0aGlzLnRyYW5zZm9ybU9wdHNUb1F1ZXJ5U3RyaW5nKChvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMudHJhbnNmb3JtKSB8fCB7fSk7XG4gICAgICAgIGlmICh0cmFuc2Zvcm1hdGlvblF1ZXJ5ICE9PSAnJykge1xuICAgICAgICAgICAgX3F1ZXJ5U3RyaW5nLnB1c2godHJhbnNmb3JtYXRpb25RdWVyeSk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHF1ZXJ5U3RyaW5nID0gX3F1ZXJ5U3RyaW5nLmpvaW4oJyYnKTtcbiAgICAgICAgaWYgKHF1ZXJ5U3RyaW5nICE9PSAnJykge1xuICAgICAgICAgICAgcXVlcnlTdHJpbmcgPSBgPyR7cXVlcnlTdHJpbmd9YDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZGF0YTogeyBwdWJsaWNVcmw6IGVuY29kZVVSSShgJHt0aGlzLnVybH0vJHtyZW5kZXJQYXRofS9wdWJsaWMvJHtfcGF0aH0ke3F1ZXJ5U3RyaW5nfWApIH0sXG4gICAgICAgIH07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERlbGV0ZXMgZmlsZXMgd2l0aGluIHRoZSBzYW1lIGJ1Y2tldFxuICAgICAqXG4gICAgICogQHBhcmFtIHBhdGhzIEFuIGFycmF5IG9mIGZpbGVzIHRvIGRlbGV0ZSwgaW5jbHVkaW5nIHRoZSBwYXRoIGFuZCBmaWxlIG5hbWUuIEZvciBleGFtcGxlIFtgJ2ZvbGRlci9pbWFnZS5wbmcnYF0uXG4gICAgICovXG4gICAgcmVtb3ZlKHBhdGhzKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSB5aWVsZCByZW1vdmUodGhpcy5mZXRjaCwgYCR7dGhpcy51cmx9L29iamVjdC8ke3RoaXMuYnVja2V0SWR9YCwgeyBwcmVmaXhlczogcGF0aHMgfSwgeyBoZWFkZXJzOiB0aGlzLmhlYWRlcnMgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YSwgZXJyb3I6IG51bGwgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGlmIChpc1N0b3JhZ2VFcnJvcihlcnJvcikpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogbnVsbCwgZXJyb3IgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgZmlsZSBtZXRhZGF0YVxuICAgICAqIEBwYXJhbSBpZCB0aGUgZmlsZSBpZCB0byByZXRyaWV2ZSBtZXRhZGF0YVxuICAgICAqL1xuICAgIC8vIGFzeW5jIGdldE1ldGFkYXRhKFxuICAgIC8vICAgaWQ6IHN0cmluZ1xuICAgIC8vICk6IFByb21pc2U8XG4gICAgLy8gICB8IHtcbiAgICAvLyAgICAgICBkYXRhOiBNZXRhZGF0YVxuICAgIC8vICAgICAgIGVycm9yOiBudWxsXG4gICAgLy8gICAgIH1cbiAgICAvLyAgIHwge1xuICAgIC8vICAgICAgIGRhdGE6IG51bGxcbiAgICAvLyAgICAgICBlcnJvcjogU3RvcmFnZUVycm9yXG4gICAgLy8gICAgIH1cbiAgICAvLyA+IHtcbiAgICAvLyAgIHRyeSB7XG4gICAgLy8gICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBnZXQodGhpcy5mZXRjaCwgYCR7dGhpcy51cmx9L21ldGFkYXRhLyR7aWR9YCwgeyBoZWFkZXJzOiB0aGlzLmhlYWRlcnMgfSlcbiAgICAvLyAgICAgcmV0dXJuIHsgZGF0YSwgZXJyb3I6IG51bGwgfVxuICAgIC8vICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAvLyAgICAgaWYgKGlzU3RvcmFnZUVycm9yKGVycm9yKSkge1xuICAgIC8vICAgICAgIHJldHVybiB7IGRhdGE6IG51bGwsIGVycm9yIH1cbiAgICAvLyAgICAgfVxuICAgIC8vICAgICB0aHJvdyBlcnJvclxuICAgIC8vICAgfVxuICAgIC8vIH1cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgZmlsZSBtZXRhZGF0YVxuICAgICAqIEBwYXJhbSBpZCB0aGUgZmlsZSBpZCB0byB1cGRhdGUgbWV0YWRhdGFcbiAgICAgKiBAcGFyYW0gbWV0YSB0aGUgbmV3IGZpbGUgbWV0YWRhdGFcbiAgICAgKi9cbiAgICAvLyBhc3luYyB1cGRhdGVNZXRhZGF0YShcbiAgICAvLyAgIGlkOiBzdHJpbmcsXG4gICAgLy8gICBtZXRhOiBNZXRhZGF0YVxuICAgIC8vICk6IFByb21pc2U8XG4gICAgLy8gICB8IHtcbiAgICAvLyAgICAgICBkYXRhOiBNZXRhZGF0YVxuICAgIC8vICAgICAgIGVycm9yOiBudWxsXG4gICAgLy8gICAgIH1cbiAgICAvLyAgIHwge1xuICAgIC8vICAgICAgIGRhdGE6IG51bGxcbiAgICAvLyAgICAgICBlcnJvcjogU3RvcmFnZUVycm9yXG4gICAgLy8gICAgIH1cbiAgICAvLyA+IHtcbiAgICAvLyAgIHRyeSB7XG4gICAgLy8gICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBwb3N0KFxuICAgIC8vICAgICAgIHRoaXMuZmV0Y2gsXG4gICAgLy8gICAgICAgYCR7dGhpcy51cmx9L21ldGFkYXRhLyR7aWR9YCxcbiAgICAvLyAgICAgICB7IC4uLm1ldGEgfSxcbiAgICAvLyAgICAgICB7IGhlYWRlcnM6IHRoaXMuaGVhZGVycyB9XG4gICAgLy8gICAgIClcbiAgICAvLyAgICAgcmV0dXJuIHsgZGF0YSwgZXJyb3I6IG51bGwgfVxuICAgIC8vICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAvLyAgICAgaWYgKGlzU3RvcmFnZUVycm9yKGVycm9yKSkge1xuICAgIC8vICAgICAgIHJldHVybiB7IGRhdGE6IG51bGwsIGVycm9yIH1cbiAgICAvLyAgICAgfVxuICAgIC8vICAgICB0aHJvdyBlcnJvclxuICAgIC8vICAgfVxuICAgIC8vIH1cbiAgICAvKipcbiAgICAgKiBMaXN0cyBhbGwgdGhlIGZpbGVzIHdpdGhpbiBhIGJ1Y2tldC5cbiAgICAgKiBAcGFyYW0gcGF0aCBUaGUgZm9sZGVyIHBhdGguXG4gICAgICovXG4gICAgbGlzdChwYXRoLCBvcHRpb25zLCBwYXJhbWV0ZXJzKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGJvZHkgPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgREVGQVVMVF9TRUFSQ0hfT1BUSU9OUyksIG9wdGlvbnMpLCB7IHByZWZpeDogcGF0aCB8fCAnJyB9KTtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0geWllbGQgcG9zdCh0aGlzLmZldGNoLCBgJHt0aGlzLnVybH0vb2JqZWN0L2xpc3QvJHt0aGlzLmJ1Y2tldElkfWAsIGJvZHksIHsgaGVhZGVyczogdGhpcy5oZWFkZXJzIH0sIHBhcmFtZXRlcnMpO1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGEsIGVycm9yOiBudWxsIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNTdG9yYWdlRXJyb3IoZXJyb3IpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IG51bGwsIGVycm9yIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgX2dldEZpbmFsUGF0aChwYXRoKSB7XG4gICAgICAgIHJldHVybiBgJHt0aGlzLmJ1Y2tldElkfS8ke3BhdGh9YDtcbiAgICB9XG4gICAgX3JlbW92ZUVtcHR5Rm9sZGVycyhwYXRoKSB7XG4gICAgICAgIHJldHVybiBwYXRoLnJlcGxhY2UoL15cXC98XFwvJC9nLCAnJykucmVwbGFjZSgvXFwvKy9nLCAnLycpO1xuICAgIH1cbiAgICB0cmFuc2Zvcm1PcHRzVG9RdWVyeVN0cmluZyh0cmFuc2Zvcm0pIHtcbiAgICAgICAgY29uc3QgcGFyYW1zID0gW107XG4gICAgICAgIGlmICh0cmFuc2Zvcm0ud2lkdGgpIHtcbiAgICAgICAgICAgIHBhcmFtcy5wdXNoKGB3aWR0aD0ke3RyYW5zZm9ybS53aWR0aH1gKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHJhbnNmb3JtLmhlaWdodCkge1xuICAgICAgICAgICAgcGFyYW1zLnB1c2goYGhlaWdodD0ke3RyYW5zZm9ybS5oZWlnaHR9YCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRyYW5zZm9ybS5yZXNpemUpIHtcbiAgICAgICAgICAgIHBhcmFtcy5wdXNoKGByZXNpemU9JHt0cmFuc2Zvcm0ucmVzaXplfWApO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0cmFuc2Zvcm0uZm9ybWF0KSB7XG4gICAgICAgICAgICBwYXJhbXMucHVzaChgZm9ybWF0PSR7dHJhbnNmb3JtLmZvcm1hdH1gKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHJhbnNmb3JtLnF1YWxpdHkpIHtcbiAgICAgICAgICAgIHBhcmFtcy5wdXNoKGBxdWFsaXR5PSR7dHJhbnNmb3JtLnF1YWxpdHl9YCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBhcmFtcy5qb2luKCcmJyk7XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9U3RvcmFnZUZpbGVBcGkuanMubWFwIiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5pbXBvcnQgeyBGdW5jdGlvbnNDbGllbnQgfSBmcm9tICdAc3VwYWJhc2UvZnVuY3Rpb25zLWpzJztcbmltcG9ydCB7IFBvc3RncmVzdENsaWVudCwgfSBmcm9tICdAc3VwYWJhc2UvcG9zdGdyZXN0LWpzJztcbmltcG9ydCB7IFJlYWx0aW1lQ2xpZW50LCB9IGZyb20gJ0BzdXBhYmFzZS9yZWFsdGltZS1qcyc7XG5pbXBvcnQgeyBTdG9yYWdlQ2xpZW50IGFzIFN1cGFiYXNlU3RvcmFnZUNsaWVudCB9IGZyb20gJ0BzdXBhYmFzZS9zdG9yYWdlLWpzJztcbmltcG9ydCB7IERFRkFVTFRfSEVBREVSUyB9IGZyb20gJy4vbGliL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBmZXRjaFdpdGhBdXRoIH0gZnJvbSAnLi9saWIvZmV0Y2gnO1xuaW1wb3J0IHsgc3RyaXBUcmFpbGluZ1NsYXNoLCBhcHBseVNldHRpbmdEZWZhdWx0cyB9IGZyb20gJy4vbGliL2hlbHBlcnMnO1xuaW1wb3J0IHsgU3VwYWJhc2VBdXRoQ2xpZW50IH0gZnJvbSAnLi9saWIvU3VwYWJhc2VBdXRoQ2xpZW50JztcbmNvbnN0IERFRkFVTFRfR0xPQkFMX09QVElPTlMgPSB7XG4gICAgaGVhZGVyczogREVGQVVMVF9IRUFERVJTLFxufTtcbmNvbnN0IERFRkFVTFRfREJfT1BUSU9OUyA9IHtcbiAgICBzY2hlbWE6ICdwdWJsaWMnLFxufTtcbmNvbnN0IERFRkFVTFRfQVVUSF9PUFRJT05TID0ge1xuICAgIGF1dG9SZWZyZXNoVG9rZW46IHRydWUsXG4gICAgcGVyc2lzdFNlc3Npb246IHRydWUsXG4gICAgZGV0ZWN0U2Vzc2lvbkluVXJsOiB0cnVlLFxuICAgIGZsb3dUeXBlOiAnaW1wbGljaXQnLFxufTtcbmNvbnN0IERFRkFVTFRfUkVBTFRJTUVfT1BUSU9OUyA9IHt9O1xuLyoqXG4gKiBTdXBhYmFzZSBDbGllbnQuXG4gKlxuICogQW4gaXNvbW9ycGhpYyBKYXZhc2NyaXB0IGNsaWVudCBmb3IgaW50ZXJhY3Rpbmcgd2l0aCBQb3N0Z3Jlcy5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3VwYWJhc2VDbGllbnQge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG5ldyBjbGllbnQgZm9yIHVzZSBpbiB0aGUgYnJvd3Nlci5cbiAgICAgKiBAcGFyYW0gc3VwYWJhc2VVcmwgVGhlIHVuaXF1ZSBTdXBhYmFzZSBVUkwgd2hpY2ggaXMgc3VwcGxpZWQgd2hlbiB5b3UgY3JlYXRlIGEgbmV3IHByb2plY3QgaW4geW91ciBwcm9qZWN0IGRhc2hib2FyZC5cbiAgICAgKiBAcGFyYW0gc3VwYWJhc2VLZXkgVGhlIHVuaXF1ZSBTdXBhYmFzZSBLZXkgd2hpY2ggaXMgc3VwcGxpZWQgd2hlbiB5b3UgY3JlYXRlIGEgbmV3IHByb2plY3QgaW4geW91ciBwcm9qZWN0IGRhc2hib2FyZC5cbiAgICAgKiBAcGFyYW0gb3B0aW9ucy5kYi5zY2hlbWEgWW91IGNhbiBzd2l0Y2ggaW4gYmV0d2VlbiBzY2hlbWFzLiBUaGUgc2NoZW1hIG5lZWRzIHRvIGJlIG9uIHRoZSBsaXN0IG9mIGV4cG9zZWQgc2NoZW1hcyBpbnNpZGUgU3VwYWJhc2UuXG4gICAgICogQHBhcmFtIG9wdGlvbnMuYXV0aC5hdXRvUmVmcmVzaFRva2VuIFNldCB0byBcInRydWVcIiBpZiB5b3Ugd2FudCB0byBhdXRvbWF0aWNhbGx5IHJlZnJlc2ggdGhlIHRva2VuIGJlZm9yZSBleHBpcmluZy5cbiAgICAgKiBAcGFyYW0gb3B0aW9ucy5hdXRoLnBlcnNpc3RTZXNzaW9uIFNldCB0byBcInRydWVcIiBpZiB5b3Ugd2FudCB0byBhdXRvbWF0aWNhbGx5IHNhdmUgdGhlIHVzZXIgc2Vzc2lvbiBpbnRvIGxvY2FsIHN0b3JhZ2UuXG4gICAgICogQHBhcmFtIG9wdGlvbnMuYXV0aC5kZXRlY3RTZXNzaW9uSW5VcmwgU2V0IHRvIFwidHJ1ZVwiIGlmIHlvdSB3YW50IHRvIGF1dG9tYXRpY2FsbHkgZGV0ZWN0cyBPQXV0aCBncmFudHMgaW4gdGhlIFVSTCBhbmQgc2lnbnMgaW4gdGhlIHVzZXIuXG4gICAgICogQHBhcmFtIG9wdGlvbnMucmVhbHRpbWUgT3B0aW9ucyBwYXNzZWQgYWxvbmcgdG8gcmVhbHRpbWUtanMgY29uc3RydWN0b3IuXG4gICAgICogQHBhcmFtIG9wdGlvbnMuZ2xvYmFsLmZldGNoIEEgY3VzdG9tIGZldGNoIGltcGxlbWVudGF0aW9uLlxuICAgICAqIEBwYXJhbSBvcHRpb25zLmdsb2JhbC5oZWFkZXJzIEFueSBhZGRpdGlvbmFsIGhlYWRlcnMgdG8gc2VuZCB3aXRoIGVhY2ggbmV0d29yayByZXF1ZXN0LlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHN1cGFiYXNlVXJsLCBzdXBhYmFzZUtleSwgb3B0aW9ucykge1xuICAgICAgICB2YXIgX2EsIF9iLCBfYywgX2QsIF9lLCBfZiwgX2csIF9oO1xuICAgICAgICB0aGlzLnN1cGFiYXNlVXJsID0gc3VwYWJhc2VVcmw7XG4gICAgICAgIHRoaXMuc3VwYWJhc2VLZXkgPSBzdXBhYmFzZUtleTtcbiAgICAgICAgaWYgKCFzdXBhYmFzZVVybClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignc3VwYWJhc2VVcmwgaXMgcmVxdWlyZWQuJyk7XG4gICAgICAgIGlmICghc3VwYWJhc2VLZXkpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3N1cGFiYXNlS2V5IGlzIHJlcXVpcmVkLicpO1xuICAgICAgICBjb25zdCBfc3VwYWJhc2VVcmwgPSBzdHJpcFRyYWlsaW5nU2xhc2goc3VwYWJhc2VVcmwpO1xuICAgICAgICB0aGlzLnJlYWx0aW1lVXJsID0gYCR7X3N1cGFiYXNlVXJsfS9yZWFsdGltZS92MWAucmVwbGFjZSgvXmh0dHAvaSwgJ3dzJyk7XG4gICAgICAgIHRoaXMuYXV0aFVybCA9IGAke19zdXBhYmFzZVVybH0vYXV0aC92MWA7XG4gICAgICAgIHRoaXMuc3RvcmFnZVVybCA9IGAke19zdXBhYmFzZVVybH0vc3RvcmFnZS92MWA7XG4gICAgICAgIHRoaXMuZnVuY3Rpb25zVXJsID0gYCR7X3N1cGFiYXNlVXJsfS9mdW5jdGlvbnMvdjFgO1xuICAgICAgICAvLyBkZWZhdWx0IHN0b3JhZ2Uga2V5IHVzZXMgdGhlIHN1cGFiYXNlIHByb2plY3QgcmVmIGFzIGEgbmFtZXNwYWNlXG4gICAgICAgIGNvbnN0IGRlZmF1bHRTdG9yYWdlS2V5ID0gYHNiLSR7bmV3IFVSTCh0aGlzLmF1dGhVcmwpLmhvc3RuYW1lLnNwbGl0KCcuJylbMF19LWF1dGgtdG9rZW5gO1xuICAgICAgICBjb25zdCBERUZBVUxUUyA9IHtcbiAgICAgICAgICAgIGRiOiBERUZBVUxUX0RCX09QVElPTlMsXG4gICAgICAgICAgICByZWFsdGltZTogREVGQVVMVF9SRUFMVElNRV9PUFRJT05TLFxuICAgICAgICAgICAgYXV0aDogT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBERUZBVUxUX0FVVEhfT1BUSU9OUyksIHsgc3RvcmFnZUtleTogZGVmYXVsdFN0b3JhZ2VLZXkgfSksXG4gICAgICAgICAgICBnbG9iYWw6IERFRkFVTFRfR0xPQkFMX09QVElPTlMsXG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IHNldHRpbmdzID0gYXBwbHlTZXR0aW5nRGVmYXVsdHMob3B0aW9ucyAhPT0gbnVsbCAmJiBvcHRpb25zICE9PSB2b2lkIDAgPyBvcHRpb25zIDoge30sIERFRkFVTFRTKTtcbiAgICAgICAgdGhpcy5zdG9yYWdlS2V5ID0gKF9iID0gKF9hID0gc2V0dGluZ3MuYXV0aCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnN0b3JhZ2VLZXkpICE9PSBudWxsICYmIF9iICE9PSB2b2lkIDAgPyBfYiA6ICcnO1xuICAgICAgICB0aGlzLmhlYWRlcnMgPSAoX2QgPSAoX2MgPSBzZXR0aW5ncy5nbG9iYWwpID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy5oZWFkZXJzKSAhPT0gbnVsbCAmJiBfZCAhPT0gdm9pZCAwID8gX2QgOiB7fTtcbiAgICAgICAgdGhpcy5hdXRoID0gdGhpcy5faW5pdFN1cGFiYXNlQXV0aENsaWVudCgoX2UgPSBzZXR0aW5ncy5hdXRoKSAhPT0gbnVsbCAmJiBfZSAhPT0gdm9pZCAwID8gX2UgOiB7fSwgdGhpcy5oZWFkZXJzLCAoX2YgPSBzZXR0aW5ncy5nbG9iYWwpID09PSBudWxsIHx8IF9mID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZi5mZXRjaCk7XG4gICAgICAgIHRoaXMuZmV0Y2ggPSBmZXRjaFdpdGhBdXRoKHN1cGFiYXNlS2V5LCB0aGlzLl9nZXRBY2Nlc3NUb2tlbi5iaW5kKHRoaXMpLCAoX2cgPSBzZXR0aW5ncy5nbG9iYWwpID09PSBudWxsIHx8IF9nID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZy5mZXRjaCk7XG4gICAgICAgIHRoaXMucmVhbHRpbWUgPSB0aGlzLl9pbml0UmVhbHRpbWVDbGllbnQoT2JqZWN0LmFzc2lnbih7IGhlYWRlcnM6IHRoaXMuaGVhZGVycyB9LCBzZXR0aW5ncy5yZWFsdGltZSkpO1xuICAgICAgICB0aGlzLnJlc3QgPSBuZXcgUG9zdGdyZXN0Q2xpZW50KGAke19zdXBhYmFzZVVybH0vcmVzdC92MWAsIHtcbiAgICAgICAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICAgICAgICAgIHNjaGVtYTogKF9oID0gc2V0dGluZ3MuZGIpID09PSBudWxsIHx8IF9oID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfaC5zY2hlbWEsXG4gICAgICAgICAgICBmZXRjaDogdGhpcy5mZXRjaCxcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX2xpc3RlbkZvckF1dGhFdmVudHMoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU3VwYWJhc2UgRnVuY3Rpb25zIGFsbG93cyB5b3UgdG8gZGVwbG95IGFuZCBpbnZva2UgZWRnZSBmdW5jdGlvbnMuXG4gICAgICovXG4gICAgZ2V0IGZ1bmN0aW9ucygpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBGdW5jdGlvbnNDbGllbnQodGhpcy5mdW5jdGlvbnNVcmwsIHtcbiAgICAgICAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICAgICAgICAgIGN1c3RvbUZldGNoOiB0aGlzLmZldGNoLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU3VwYWJhc2UgU3RvcmFnZSBhbGxvd3MgeW91IHRvIG1hbmFnZSB1c2VyLWdlbmVyYXRlZCBjb250ZW50LCBzdWNoIGFzIHBob3RvcyBvciB2aWRlb3MuXG4gICAgICovXG4gICAgZ2V0IHN0b3JhZ2UoKSB7XG4gICAgICAgIHJldHVybiBuZXcgU3VwYWJhc2VTdG9yYWdlQ2xpZW50KHRoaXMuc3RvcmFnZVVybCwgdGhpcy5oZWFkZXJzLCB0aGlzLmZldGNoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUGVyZm9ybSBhIHF1ZXJ5IG9uIGEgdGFibGUgb3IgYSB2aWV3LlxuICAgICAqXG4gICAgICogQHBhcmFtIHJlbGF0aW9uIC0gVGhlIHRhYmxlIG9yIHZpZXcgbmFtZSB0byBxdWVyeVxuICAgICAqL1xuICAgIGZyb20ocmVsYXRpb24pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVzdC5mcm9tKHJlbGF0aW9uKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUGVyZm9ybSBhIGZ1bmN0aW9uIGNhbGwuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZm4gLSBUaGUgZnVuY3Rpb24gbmFtZSB0byBjYWxsXG4gICAgICogQHBhcmFtIGFyZ3MgLSBUaGUgYXJndW1lbnRzIHRvIHBhc3MgdG8gdGhlIGZ1bmN0aW9uIGNhbGxcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIE5hbWVkIHBhcmFtZXRlcnNcbiAgICAgKiBAcGFyYW0gb3B0aW9ucy5oZWFkIC0gV2hlbiBzZXQgdG8gYHRydWVgLCBgZGF0YWAgd2lsbCBub3QgYmUgcmV0dXJuZWQuXG4gICAgICogVXNlZnVsIGlmIHlvdSBvbmx5IG5lZWQgdGhlIGNvdW50LlxuICAgICAqIEBwYXJhbSBvcHRpb25zLmNvdW50IC0gQ291bnQgYWxnb3JpdGhtIHRvIHVzZSB0byBjb3VudCByb3dzIHJldHVybmVkIGJ5IHRoZVxuICAgICAqIGZ1bmN0aW9uLiBPbmx5IGFwcGxpY2FibGUgZm9yIFtzZXQtcmV0dXJuaW5nXG4gICAgICogZnVuY3Rpb25zXShodHRwczovL3d3dy5wb3N0Z3Jlc3FsLm9yZy9kb2NzL2N1cnJlbnQvZnVuY3Rpb25zLXNyZi5odG1sKS5cbiAgICAgKlxuICAgICAqIGBcImV4YWN0XCJgOiBFeGFjdCBidXQgc2xvdyBjb3VudCBhbGdvcml0aG0uIFBlcmZvcm1zIGEgYENPVU5UKCopYCB1bmRlciB0aGVcbiAgICAgKiBob29kLlxuICAgICAqXG4gICAgICogYFwicGxhbm5lZFwiYDogQXBwcm94aW1hdGVkIGJ1dCBmYXN0IGNvdW50IGFsZ29yaXRobS4gVXNlcyB0aGUgUG9zdGdyZXNcbiAgICAgKiBzdGF0aXN0aWNzIHVuZGVyIHRoZSBob29kLlxuICAgICAqXG4gICAgICogYFwiZXN0aW1hdGVkXCJgOiBVc2VzIGV4YWN0IGNvdW50IGZvciBsb3cgbnVtYmVycyBhbmQgcGxhbm5lZCBjb3VudCBmb3IgaGlnaFxuICAgICAqIG51bWJlcnMuXG4gICAgICovXG4gICAgcnBjKGZuLCBhcmdzID0ge30sIG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVzdC5ycGMoZm4sIGFyZ3MsIG9wdGlvbnMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgUmVhbHRpbWUgY2hhbm5lbCB3aXRoIEJyb2FkY2FzdCwgUHJlc2VuY2UsIGFuZCBQb3N0Z3JlcyBDaGFuZ2VzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgUmVhbHRpbWUgY2hhbm5lbC5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0cyAtIFRoZSBvcHRpb25zIHRvIHBhc3MgdG8gdGhlIFJlYWx0aW1lIGNoYW5uZWwuXG4gICAgICpcbiAgICAgKi9cbiAgICBjaGFubmVsKG5hbWUsIG9wdHMgPSB7IGNvbmZpZzoge30gfSkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWFsdGltZS5jaGFubmVsKG5hbWUsIG9wdHMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFsbCBSZWFsdGltZSBjaGFubmVscy5cbiAgICAgKi9cbiAgICBnZXRDaGFubmVscygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVhbHRpbWUuZ2V0Q2hhbm5lbHMoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVW5zdWJzY3JpYmVzIGFuZCByZW1vdmVzIFJlYWx0aW1lIGNoYW5uZWwgZnJvbSBSZWFsdGltZSBjbGllbnQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1JlYWx0aW1lQ2hhbm5lbH0gY2hhbm5lbCAtIFRoZSBuYW1lIG9mIHRoZSBSZWFsdGltZSBjaGFubmVsLlxuICAgICAqXG4gICAgICovXG4gICAgcmVtb3ZlQ2hhbm5lbChjaGFubmVsKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlYWx0aW1lLnJlbW92ZUNoYW5uZWwoY2hhbm5lbCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFVuc3Vic2NyaWJlcyBhbmQgcmVtb3ZlcyBhbGwgUmVhbHRpbWUgY2hhbm5lbHMgZnJvbSBSZWFsdGltZSBjbGllbnQuXG4gICAgICovXG4gICAgcmVtb3ZlQWxsQ2hhbm5lbHMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlYWx0aW1lLnJlbW92ZUFsbENoYW5uZWxzKCk7XG4gICAgfVxuICAgIF9nZXRBY2Nlc3NUb2tlbigpIHtcbiAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIGNvbnN0IHsgZGF0YSB9ID0geWllbGQgdGhpcy5hdXRoLmdldFNlc3Npb24oKTtcbiAgICAgICAgICAgIHJldHVybiAoX2IgPSAoX2EgPSBkYXRhLnNlc3Npb24pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5hY2Nlc3NfdG9rZW4pICE9PSBudWxsICYmIF9iICE9PSB2b2lkIDAgPyBfYiA6IG51bGw7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBfaW5pdFN1cGFiYXNlQXV0aENsaWVudCh7IGF1dG9SZWZyZXNoVG9rZW4sIHBlcnNpc3RTZXNzaW9uLCBkZXRlY3RTZXNzaW9uSW5VcmwsIHN0b3JhZ2UsIHN0b3JhZ2VLZXksIGZsb3dUeXBlLCB9LCBoZWFkZXJzLCBmZXRjaCkge1xuICAgICAgICBjb25zdCBhdXRoSGVhZGVycyA9IHtcbiAgICAgICAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHt0aGlzLnN1cGFiYXNlS2V5fWAsXG4gICAgICAgICAgICBhcGlrZXk6IGAke3RoaXMuc3VwYWJhc2VLZXl9YCxcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIG5ldyBTdXBhYmFzZUF1dGhDbGllbnQoe1xuICAgICAgICAgICAgdXJsOiB0aGlzLmF1dGhVcmwsXG4gICAgICAgICAgICBoZWFkZXJzOiBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIGF1dGhIZWFkZXJzKSwgaGVhZGVycyksXG4gICAgICAgICAgICBzdG9yYWdlS2V5OiBzdG9yYWdlS2V5LFxuICAgICAgICAgICAgYXV0b1JlZnJlc2hUb2tlbixcbiAgICAgICAgICAgIHBlcnNpc3RTZXNzaW9uLFxuICAgICAgICAgICAgZGV0ZWN0U2Vzc2lvbkluVXJsLFxuICAgICAgICAgICAgc3RvcmFnZSxcbiAgICAgICAgICAgIGZsb3dUeXBlLFxuICAgICAgICAgICAgZmV0Y2gsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBfaW5pdFJlYWx0aW1lQ2xpZW50KG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBSZWFsdGltZUNsaWVudCh0aGlzLnJlYWx0aW1lVXJsLCBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIG9wdGlvbnMpLCB7IHBhcmFtczogT2JqZWN0LmFzc2lnbih7IGFwaWtleTogdGhpcy5zdXBhYmFzZUtleSB9LCBvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMucGFyYW1zKSB9KSk7XG4gICAgfVxuICAgIF9saXN0ZW5Gb3JBdXRoRXZlbnRzKCkge1xuICAgICAgICBsZXQgZGF0YSA9IHRoaXMuYXV0aC5vbkF1dGhTdGF0ZUNoYW5nZSgoZXZlbnQsIHNlc3Npb24pID0+IHtcbiAgICAgICAgICAgIHRoaXMuX2hhbmRsZVRva2VuQ2hhbmdlZChldmVudCwgc2Vzc2lvbiA9PT0gbnVsbCB8fCBzZXNzaW9uID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzZXNzaW9uLmFjY2Vzc190b2tlbiwgJ0NMSUVOVCcpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuICAgIF9oYW5kbGVUb2tlbkNoYW5nZWQoZXZlbnQsIHRva2VuLCBzb3VyY2UpIHtcbiAgICAgICAgaWYgKChldmVudCA9PT0gJ1RPS0VOX1JFRlJFU0hFRCcgfHwgZXZlbnQgPT09ICdTSUdORURfSU4nKSAmJlxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VkQWNjZXNzVG9rZW4gIT09IHRva2VuKSB7XG4gICAgICAgICAgICAvLyBUb2tlbiBoYXMgY2hhbmdlZFxuICAgICAgICAgICAgdGhpcy5yZWFsdGltZS5zZXRBdXRoKHRva2VuICE9PSBudWxsICYmIHRva2VuICE9PSB2b2lkIDAgPyB0b2tlbiA6IG51bGwpO1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VkQWNjZXNzVG9rZW4gPSB0b2tlbjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChldmVudCA9PT0gJ1NJR05FRF9PVVQnKSB7XG4gICAgICAgICAgICAvLyBUb2tlbiBpcyByZW1vdmVkXG4gICAgICAgICAgICB0aGlzLnJlYWx0aW1lLnNldEF1dGgodGhpcy5zdXBhYmFzZUtleSk7XG4gICAgICAgICAgICBpZiAoc291cmNlID09ICdTVE9SQUdFJylcbiAgICAgICAgICAgICAgICB0aGlzLmF1dGguc2lnbk91dCgpO1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VkQWNjZXNzVG9rZW4gPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1TdXBhYmFzZUNsaWVudC5qcy5tYXAiLCJpbXBvcnQgU3VwYWJhc2VDbGllbnQgZnJvbSAnLi9TdXBhYmFzZUNsaWVudCc7XG5leHBvcnQgKiBmcm9tICdAc3VwYWJhc2UvZ290cnVlLWpzJztcbmV4cG9ydCB7IEZ1bmN0aW9uc0h0dHBFcnJvciwgRnVuY3Rpb25zRmV0Y2hFcnJvciwgRnVuY3Rpb25zUmVsYXlFcnJvciwgRnVuY3Rpb25zRXJyb3IsIH0gZnJvbSAnQHN1cGFiYXNlL2Z1bmN0aW9ucy1qcyc7XG5leHBvcnQgKiBmcm9tICdAc3VwYWJhc2UvcmVhbHRpbWUtanMnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBTdXBhYmFzZUNsaWVudCB9IGZyb20gJy4vU3VwYWJhc2VDbGllbnQnO1xuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IFN1cGFiYXNlIENsaWVudC5cbiAqL1xuZXhwb3J0IGNvbnN0IGNyZWF0ZUNsaWVudCA9IChzdXBhYmFzZVVybCwgc3VwYWJhc2VLZXksIG9wdGlvbnMpID0+IHtcbiAgICByZXR1cm4gbmV3IFN1cGFiYXNlQ2xpZW50KHN1cGFiYXNlVXJsLCBzdXBhYmFzZUtleSwgb3B0aW9ucyk7XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiaW1wb3J0IHsgR29UcnVlQ2xpZW50IH0gZnJvbSAnQHN1cGFiYXNlL2dvdHJ1ZS1qcyc7XG5leHBvcnQgY2xhc3MgU3VwYWJhc2VBdXRoQ2xpZW50IGV4dGVuZHMgR29UcnVlQ2xpZW50IHtcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgIHN1cGVyKG9wdGlvbnMpO1xuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVN1cGFiYXNlQXV0aENsaWVudC5qcy5tYXAiLCIvLyBjb25zdGFudHMudHNcbmltcG9ydCB7IHZlcnNpb24gfSBmcm9tICcuL3ZlcnNpb24nO1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfSEVBREVSUyA9IHsgJ1gtQ2xpZW50LUluZm8nOiBgc3VwYWJhc2UtanMvJHt2ZXJzaW9ufWAgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvbnN0YW50cy5qcy5tYXAiLCJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbmltcG9ydCBjcm9zc0ZldGNoLCB7IEhlYWRlcnMgYXMgQ3Jvc3NGZXRjaEhlYWRlcnMgfSBmcm9tICdjcm9zcy1mZXRjaCc7XG5leHBvcnQgY29uc3QgcmVzb2x2ZUZldGNoID0gKGN1c3RvbUZldGNoKSA9PiB7XG4gICAgbGV0IF9mZXRjaDtcbiAgICBpZiAoY3VzdG9tRmV0Y2gpIHtcbiAgICAgICAgX2ZldGNoID0gY3VzdG9tRmV0Y2g7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBmZXRjaCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgX2ZldGNoID0gY3Jvc3NGZXRjaDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIF9mZXRjaCA9IGZldGNoO1xuICAgIH1cbiAgICByZXR1cm4gKC4uLmFyZ3MpID0+IF9mZXRjaCguLi5hcmdzKTtcbn07XG5leHBvcnQgY29uc3QgcmVzb2x2ZUhlYWRlcnNDb25zdHJ1Y3RvciA9ICgpID0+IHtcbiAgICBpZiAodHlwZW9mIEhlYWRlcnMgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybiBDcm9zc0ZldGNoSGVhZGVycztcbiAgICB9XG4gICAgcmV0dXJuIEhlYWRlcnM7XG59O1xuZXhwb3J0IGNvbnN0IGZldGNoV2l0aEF1dGggPSAoc3VwYWJhc2VLZXksIGdldEFjY2Vzc1Rva2VuLCBjdXN0b21GZXRjaCkgPT4ge1xuICAgIGNvbnN0IGZldGNoID0gcmVzb2x2ZUZldGNoKGN1c3RvbUZldGNoKTtcbiAgICBjb25zdCBIZWFkZXJzQ29uc3RydWN0b3IgPSByZXNvbHZlSGVhZGVyc0NvbnN0cnVjdG9yKCk7XG4gICAgcmV0dXJuIChpbnB1dCwgaW5pdCkgPT4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgY29uc3QgYWNjZXNzVG9rZW4gPSAoX2EgPSAoeWllbGQgZ2V0QWNjZXNzVG9rZW4oKSkpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IHN1cGFiYXNlS2V5O1xuICAgICAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzQ29uc3RydWN0b3IoaW5pdCA9PT0gbnVsbCB8fCBpbml0ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBpbml0LmhlYWRlcnMpO1xuICAgICAgICBpZiAoIWhlYWRlcnMuaGFzKCdhcGlrZXknKSkge1xuICAgICAgICAgICAgaGVhZGVycy5zZXQoJ2FwaWtleScsIHN1cGFiYXNlS2V5KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWhlYWRlcnMuaGFzKCdBdXRob3JpemF0aW9uJykpIHtcbiAgICAgICAgICAgIGhlYWRlcnMuc2V0KCdBdXRob3JpemF0aW9uJywgYEJlYXJlciAke2FjY2Vzc1Rva2VufWApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmZXRjaChpbnB1dCwgT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBpbml0KSwgeyBoZWFkZXJzIH0pKTtcbiAgICB9KTtcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1mZXRjaC5qcy5tYXAiLCJleHBvcnQgZnVuY3Rpb24gdXVpZCgpIHtcbiAgICByZXR1cm4gJ3h4eHh4eHh4LXh4eHgtNHh4eC15eHh4LXh4eHh4eHh4eHh4eCcucmVwbGFjZSgvW3h5XS9nLCBmdW5jdGlvbiAoYykge1xuICAgICAgICB2YXIgciA9IChNYXRoLnJhbmRvbSgpICogMTYpIHwgMCwgdiA9IGMgPT0gJ3gnID8gciA6IChyICYgMHgzKSB8IDB4ODtcbiAgICAgICAgcmV0dXJuIHYudG9TdHJpbmcoMTYpO1xuICAgIH0pO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHN0cmlwVHJhaWxpbmdTbGFzaCh1cmwpIHtcbiAgICByZXR1cm4gdXJsLnJlcGxhY2UoL1xcLyQvLCAnJyk7XG59XG5leHBvcnQgY29uc3QgaXNCcm93c2VyID0gKCkgPT4gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCc7XG5leHBvcnQgZnVuY3Rpb24gYXBwbHlTZXR0aW5nRGVmYXVsdHMob3B0aW9ucywgZGVmYXVsdHMpIHtcbiAgICBjb25zdCB7IGRiOiBkYk9wdGlvbnMsIGF1dGg6IGF1dGhPcHRpb25zLCByZWFsdGltZTogcmVhbHRpbWVPcHRpb25zLCBnbG9iYWw6IGdsb2JhbE9wdGlvbnMsIH0gPSBvcHRpb25zO1xuICAgIGNvbnN0IHsgZGI6IERFRkFVTFRfREJfT1BUSU9OUywgYXV0aDogREVGQVVMVF9BVVRIX09QVElPTlMsIHJlYWx0aW1lOiBERUZBVUxUX1JFQUxUSU1FX09QVElPTlMsIGdsb2JhbDogREVGQVVMVF9HTE9CQUxfT1BUSU9OUywgfSA9IGRlZmF1bHRzO1xuICAgIHJldHVybiB7XG4gICAgICAgIGRiOiBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIERFRkFVTFRfREJfT1BUSU9OUyksIGRiT3B0aW9ucyksXG4gICAgICAgIGF1dGg6IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgREVGQVVMVF9BVVRIX09QVElPTlMpLCBhdXRoT3B0aW9ucyksXG4gICAgICAgIHJlYWx0aW1lOiBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIERFRkFVTFRfUkVBTFRJTUVfT1BUSU9OUyksIHJlYWx0aW1lT3B0aW9ucyksXG4gICAgICAgIGdsb2JhbDogT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBERUZBVUxUX0dMT0JBTF9PUFRJT05TKSwgZ2xvYmFsT3B0aW9ucyksXG4gICAgfTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWhlbHBlcnMuanMubWFwIiwiZXhwb3J0IGNvbnN0IHZlcnNpb24gPSAnMi4yNC4wJztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXZlcnNpb24uanMubWFwIiwidmFyIGdsb2JhbCA9IHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyA/IHNlbGYgOiB0aGlzO1xudmFyIF9fc2VsZl9fID0gKGZ1bmN0aW9uICgpIHtcbmZ1bmN0aW9uIEYoKSB7XG50aGlzLmZldGNoID0gZmFsc2U7XG50aGlzLkRPTUV4Y2VwdGlvbiA9IGdsb2JhbC5ET01FeGNlcHRpb25cbn1cbkYucHJvdG90eXBlID0gZ2xvYmFsO1xucmV0dXJuIG5ldyBGKCk7XG59KSgpO1xuKGZ1bmN0aW9uKHNlbGYpIHtcblxudmFyIGlycmVsZXZhbnQgPSAoZnVuY3Rpb24gKGV4cG9ydHMpIHtcblxuICB2YXIgc3VwcG9ydCA9IHtcbiAgICBzZWFyY2hQYXJhbXM6ICdVUkxTZWFyY2hQYXJhbXMnIGluIHNlbGYsXG4gICAgaXRlcmFibGU6ICdTeW1ib2wnIGluIHNlbGYgJiYgJ2l0ZXJhdG9yJyBpbiBTeW1ib2wsXG4gICAgYmxvYjpcbiAgICAgICdGaWxlUmVhZGVyJyBpbiBzZWxmICYmXG4gICAgICAnQmxvYicgaW4gc2VsZiAmJlxuICAgICAgKGZ1bmN0aW9uKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIG5ldyBCbG9iKCk7XG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgICB9KSgpLFxuICAgIGZvcm1EYXRhOiAnRm9ybURhdGEnIGluIHNlbGYsXG4gICAgYXJyYXlCdWZmZXI6ICdBcnJheUJ1ZmZlcicgaW4gc2VsZlxuICB9O1xuXG4gIGZ1bmN0aW9uIGlzRGF0YVZpZXcob2JqKSB7XG4gICAgcmV0dXJuIG9iaiAmJiBEYXRhVmlldy5wcm90b3R5cGUuaXNQcm90b3R5cGVPZihvYmopXG4gIH1cblxuICBpZiAoc3VwcG9ydC5hcnJheUJ1ZmZlcikge1xuICAgIHZhciB2aWV3Q2xhc3NlcyA9IFtcbiAgICAgICdbb2JqZWN0IEludDhBcnJheV0nLFxuICAgICAgJ1tvYmplY3QgVWludDhBcnJheV0nLFxuICAgICAgJ1tvYmplY3QgVWludDhDbGFtcGVkQXJyYXldJyxcbiAgICAgICdbb2JqZWN0IEludDE2QXJyYXldJyxcbiAgICAgICdbb2JqZWN0IFVpbnQxNkFycmF5XScsXG4gICAgICAnW29iamVjdCBJbnQzMkFycmF5XScsXG4gICAgICAnW29iamVjdCBVaW50MzJBcnJheV0nLFxuICAgICAgJ1tvYmplY3QgRmxvYXQzMkFycmF5XScsXG4gICAgICAnW29iamVjdCBGbG9hdDY0QXJyYXldJ1xuICAgIF07XG5cbiAgICB2YXIgaXNBcnJheUJ1ZmZlclZpZXcgPVxuICAgICAgQXJyYXlCdWZmZXIuaXNWaWV3IHx8XG4gICAgICBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgcmV0dXJuIG9iaiAmJiB2aWV3Q2xhc3Nlcy5pbmRleE9mKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopKSA+IC0xXG4gICAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gbm9ybWFsaXplTmFtZShuYW1lKSB7XG4gICAgaWYgKHR5cGVvZiBuYW1lICE9PSAnc3RyaW5nJykge1xuICAgICAgbmFtZSA9IFN0cmluZyhuYW1lKTtcbiAgICB9XG4gICAgaWYgKC9bXmEtejAtOVxcLSMkJSYnKisuXl9gfH5dL2kudGVzdChuYW1lKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBjaGFyYWN0ZXIgaW4gaGVhZGVyIGZpZWxkIG5hbWUnKVxuICAgIH1cbiAgICByZXR1cm4gbmFtZS50b0xvd2VyQ2FzZSgpXG4gIH1cblxuICBmdW5jdGlvbiBub3JtYWxpemVWYWx1ZSh2YWx1ZSkge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICB2YWx1ZSA9IFN0cmluZyh2YWx1ZSk7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZVxuICB9XG5cbiAgLy8gQnVpbGQgYSBkZXN0cnVjdGl2ZSBpdGVyYXRvciBmb3IgdGhlIHZhbHVlIGxpc3RcbiAgZnVuY3Rpb24gaXRlcmF0b3JGb3IoaXRlbXMpIHtcbiAgICB2YXIgaXRlcmF0b3IgPSB7XG4gICAgICBuZXh0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gaXRlbXMuc2hpZnQoKTtcbiAgICAgICAgcmV0dXJuIHtkb25lOiB2YWx1ZSA9PT0gdW5kZWZpbmVkLCB2YWx1ZTogdmFsdWV9XG4gICAgICB9XG4gICAgfTtcblxuICAgIGlmIChzdXBwb3J0Lml0ZXJhYmxlKSB7XG4gICAgICBpdGVyYXRvcltTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBpdGVyYXRvclxuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gaXRlcmF0b3JcbiAgfVxuXG4gIGZ1bmN0aW9uIEhlYWRlcnMoaGVhZGVycykge1xuICAgIHRoaXMubWFwID0ge307XG5cbiAgICBpZiAoaGVhZGVycyBpbnN0YW5jZW9mIEhlYWRlcnMpIHtcbiAgICAgIGhlYWRlcnMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwgbmFtZSkge1xuICAgICAgICB0aGlzLmFwcGVuZChuYW1lLCB2YWx1ZSk7XG4gICAgICB9LCB0aGlzKTtcbiAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoaGVhZGVycykpIHtcbiAgICAgIGhlYWRlcnMuZm9yRWFjaChmdW5jdGlvbihoZWFkZXIpIHtcbiAgICAgICAgdGhpcy5hcHBlbmQoaGVhZGVyWzBdLCBoZWFkZXJbMV0pO1xuICAgICAgfSwgdGhpcyk7XG4gICAgfSBlbHNlIGlmIChoZWFkZXJzKSB7XG4gICAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhoZWFkZXJzKS5mb3JFYWNoKGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgICAgdGhpcy5hcHBlbmQobmFtZSwgaGVhZGVyc1tuYW1lXSk7XG4gICAgICB9LCB0aGlzKTtcbiAgICB9XG4gIH1cblxuICBIZWFkZXJzLnByb3RvdHlwZS5hcHBlbmQgPSBmdW5jdGlvbihuYW1lLCB2YWx1ZSkge1xuICAgIG5hbWUgPSBub3JtYWxpemVOYW1lKG5hbWUpO1xuICAgIHZhbHVlID0gbm9ybWFsaXplVmFsdWUodmFsdWUpO1xuICAgIHZhciBvbGRWYWx1ZSA9IHRoaXMubWFwW25hbWVdO1xuICAgIHRoaXMubWFwW25hbWVdID0gb2xkVmFsdWUgPyBvbGRWYWx1ZSArICcsICcgKyB2YWx1ZSA6IHZhbHVlO1xuICB9O1xuXG4gIEhlYWRlcnMucHJvdG90eXBlWydkZWxldGUnXSA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICBkZWxldGUgdGhpcy5tYXBbbm9ybWFsaXplTmFtZShuYW1lKV07XG4gIH07XG5cbiAgSGVhZGVycy5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24obmFtZSkge1xuICAgIG5hbWUgPSBub3JtYWxpemVOYW1lKG5hbWUpO1xuICAgIHJldHVybiB0aGlzLmhhcyhuYW1lKSA/IHRoaXMubWFwW25hbWVdIDogbnVsbFxuICB9O1xuXG4gIEhlYWRlcnMucHJvdG90eXBlLmhhcyA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAuaGFzT3duUHJvcGVydHkobm9ybWFsaXplTmFtZShuYW1lKSlcbiAgfTtcblxuICBIZWFkZXJzLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbihuYW1lLCB2YWx1ZSkge1xuICAgIHRoaXMubWFwW25vcm1hbGl6ZU5hbWUobmFtZSldID0gbm9ybWFsaXplVmFsdWUodmFsdWUpO1xuICB9O1xuXG4gIEhlYWRlcnMucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbihjYWxsYmFjaywgdGhpc0FyZykge1xuICAgIGZvciAodmFyIG5hbWUgaW4gdGhpcy5tYXApIHtcbiAgICAgIGlmICh0aGlzLm1hcC5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgICBjYWxsYmFjay5jYWxsKHRoaXNBcmcsIHRoaXMubWFwW25hbWVdLCBuYW1lLCB0aGlzKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgSGVhZGVycy5wcm90b3R5cGUua2V5cyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBpdGVtcyA9IFtdO1xuICAgIHRoaXMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwgbmFtZSkge1xuICAgICAgaXRlbXMucHVzaChuYW1lKTtcbiAgICB9KTtcbiAgICByZXR1cm4gaXRlcmF0b3JGb3IoaXRlbXMpXG4gIH07XG5cbiAgSGVhZGVycy5wcm90b3R5cGUudmFsdWVzID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGl0ZW1zID0gW107XG4gICAgdGhpcy5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICBpdGVtcy5wdXNoKHZhbHVlKTtcbiAgICB9KTtcbiAgICByZXR1cm4gaXRlcmF0b3JGb3IoaXRlbXMpXG4gIH07XG5cbiAgSGVhZGVycy5wcm90b3R5cGUuZW50cmllcyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBpdGVtcyA9IFtdO1xuICAgIHRoaXMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwgbmFtZSkge1xuICAgICAgaXRlbXMucHVzaChbbmFtZSwgdmFsdWVdKTtcbiAgICB9KTtcbiAgICByZXR1cm4gaXRlcmF0b3JGb3IoaXRlbXMpXG4gIH07XG5cbiAgaWYgKHN1cHBvcnQuaXRlcmFibGUpIHtcbiAgICBIZWFkZXJzLnByb3RvdHlwZVtTeW1ib2wuaXRlcmF0b3JdID0gSGVhZGVycy5wcm90b3R5cGUuZW50cmllcztcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbnN1bWVkKGJvZHkpIHtcbiAgICBpZiAoYm9keS5ib2R5VXNlZCkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBUeXBlRXJyb3IoJ0FscmVhZHkgcmVhZCcpKVxuICAgIH1cbiAgICBib2R5LmJvZHlVc2VkID0gdHJ1ZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZpbGVSZWFkZXJSZWFkeShyZWFkZXIpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICByZWFkZXIub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJlc29sdmUocmVhZGVyLnJlc3VsdCk7XG4gICAgICB9O1xuICAgICAgcmVhZGVyLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmVqZWN0KHJlYWRlci5lcnJvcik7XG4gICAgICB9O1xuICAgIH0pXG4gIH1cblxuICBmdW5jdGlvbiByZWFkQmxvYkFzQXJyYXlCdWZmZXIoYmxvYikge1xuICAgIHZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgIHZhciBwcm9taXNlID0gZmlsZVJlYWRlclJlYWR5KHJlYWRlcik7XG4gICAgcmVhZGVyLnJlYWRBc0FycmF5QnVmZmVyKGJsb2IpO1xuICAgIHJldHVybiBwcm9taXNlXG4gIH1cblxuICBmdW5jdGlvbiByZWFkQmxvYkFzVGV4dChibG9iKSB7XG4gICAgdmFyIHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgdmFyIHByb21pc2UgPSBmaWxlUmVhZGVyUmVhZHkocmVhZGVyKTtcbiAgICByZWFkZXIucmVhZEFzVGV4dChibG9iKTtcbiAgICByZXR1cm4gcHJvbWlzZVxuICB9XG5cbiAgZnVuY3Rpb24gcmVhZEFycmF5QnVmZmVyQXNUZXh0KGJ1Zikge1xuICAgIHZhciB2aWV3ID0gbmV3IFVpbnQ4QXJyYXkoYnVmKTtcbiAgICB2YXIgY2hhcnMgPSBuZXcgQXJyYXkodmlldy5sZW5ndGgpO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2aWV3Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBjaGFyc1tpXSA9IFN0cmluZy5mcm9tQ2hhckNvZGUodmlld1tpXSk7XG4gICAgfVxuICAgIHJldHVybiBjaGFycy5qb2luKCcnKVxuICB9XG5cbiAgZnVuY3Rpb24gYnVmZmVyQ2xvbmUoYnVmKSB7XG4gICAgaWYgKGJ1Zi5zbGljZSkge1xuICAgICAgcmV0dXJuIGJ1Zi5zbGljZSgwKVxuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdmlldyA9IG5ldyBVaW50OEFycmF5KGJ1Zi5ieXRlTGVuZ3RoKTtcbiAgICAgIHZpZXcuc2V0KG5ldyBVaW50OEFycmF5KGJ1ZikpO1xuICAgICAgcmV0dXJuIHZpZXcuYnVmZmVyXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gQm9keSgpIHtcbiAgICB0aGlzLmJvZHlVc2VkID0gZmFsc2U7XG5cbiAgICB0aGlzLl9pbml0Qm9keSA9IGZ1bmN0aW9uKGJvZHkpIHtcbiAgICAgIHRoaXMuX2JvZHlJbml0ID0gYm9keTtcbiAgICAgIGlmICghYm9keSkge1xuICAgICAgICB0aGlzLl9ib2R5VGV4dCA9ICcnO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYm9keSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgdGhpcy5fYm9keVRleHQgPSBib2R5O1xuICAgICAgfSBlbHNlIGlmIChzdXBwb3J0LmJsb2IgJiYgQmxvYi5wcm90b3R5cGUuaXNQcm90b3R5cGVPZihib2R5KSkge1xuICAgICAgICB0aGlzLl9ib2R5QmxvYiA9IGJvZHk7XG4gICAgICB9IGVsc2UgaWYgKHN1cHBvcnQuZm9ybURhdGEgJiYgRm9ybURhdGEucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkpIHtcbiAgICAgICAgdGhpcy5fYm9keUZvcm1EYXRhID0gYm9keTtcbiAgICAgIH0gZWxzZSBpZiAoc3VwcG9ydC5zZWFyY2hQYXJhbXMgJiYgVVJMU2VhcmNoUGFyYW1zLnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mKGJvZHkpKSB7XG4gICAgICAgIHRoaXMuX2JvZHlUZXh0ID0gYm9keS50b1N0cmluZygpO1xuICAgICAgfSBlbHNlIGlmIChzdXBwb3J0LmFycmF5QnVmZmVyICYmIHN1cHBvcnQuYmxvYiAmJiBpc0RhdGFWaWV3KGJvZHkpKSB7XG4gICAgICAgIHRoaXMuX2JvZHlBcnJheUJ1ZmZlciA9IGJ1ZmZlckNsb25lKGJvZHkuYnVmZmVyKTtcbiAgICAgICAgLy8gSUUgMTAtMTEgY2FuJ3QgaGFuZGxlIGEgRGF0YVZpZXcgYm9keS5cbiAgICAgICAgdGhpcy5fYm9keUluaXQgPSBuZXcgQmxvYihbdGhpcy5fYm9keUFycmF5QnVmZmVyXSk7XG4gICAgICB9IGVsc2UgaWYgKHN1cHBvcnQuYXJyYXlCdWZmZXIgJiYgKEFycmF5QnVmZmVyLnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mKGJvZHkpIHx8IGlzQXJyYXlCdWZmZXJWaWV3KGJvZHkpKSkge1xuICAgICAgICB0aGlzLl9ib2R5QXJyYXlCdWZmZXIgPSBidWZmZXJDbG9uZShib2R5KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX2JvZHlUZXh0ID0gYm9keSA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChib2R5KTtcbiAgICAgIH1cblxuICAgICAgaWYgKCF0aGlzLmhlYWRlcnMuZ2V0KCdjb250ZW50LXR5cGUnKSkge1xuICAgICAgICBpZiAodHlwZW9mIGJvZHkgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgdGhpcy5oZWFkZXJzLnNldCgnY29udGVudC10eXBlJywgJ3RleHQvcGxhaW47Y2hhcnNldD1VVEYtOCcpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2JvZHlCbG9iICYmIHRoaXMuX2JvZHlCbG9iLnR5cGUpIHtcbiAgICAgICAgICB0aGlzLmhlYWRlcnMuc2V0KCdjb250ZW50LXR5cGUnLCB0aGlzLl9ib2R5QmxvYi50eXBlKTtcbiAgICAgICAgfSBlbHNlIGlmIChzdXBwb3J0LnNlYXJjaFBhcmFtcyAmJiBVUkxTZWFyY2hQYXJhbXMucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkpIHtcbiAgICAgICAgICB0aGlzLmhlYWRlcnMuc2V0KCdjb250ZW50LXR5cGUnLCAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9VVRGLTgnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICBpZiAoc3VwcG9ydC5ibG9iKSB7XG4gICAgICB0aGlzLmJsb2IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHJlamVjdGVkID0gY29uc3VtZWQodGhpcyk7XG4gICAgICAgIGlmIChyZWplY3RlZCkge1xuICAgICAgICAgIHJldHVybiByZWplY3RlZFxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2JvZHlCbG9iKSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLl9ib2R5QmxvYilcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5QXJyYXlCdWZmZXIpIHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG5ldyBCbG9iKFt0aGlzLl9ib2R5QXJyYXlCdWZmZXJdKSlcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5Rm9ybURhdGEpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NvdWxkIG5vdCByZWFkIEZvcm1EYXRhIGJvZHkgYXMgYmxvYicpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShuZXcgQmxvYihbdGhpcy5fYm9keVRleHRdKSlcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgdGhpcy5hcnJheUJ1ZmZlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy5fYm9keUFycmF5QnVmZmVyKSB7XG4gICAgICAgICAgcmV0dXJuIGNvbnN1bWVkKHRoaXMpIHx8IFByb21pc2UucmVzb2x2ZSh0aGlzLl9ib2R5QXJyYXlCdWZmZXIpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuYmxvYigpLnRoZW4ocmVhZEJsb2JBc0FycmF5QnVmZmVyKVxuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1cblxuICAgIHRoaXMudGV4dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHJlamVjdGVkID0gY29uc3VtZWQodGhpcyk7XG4gICAgICBpZiAocmVqZWN0ZWQpIHtcbiAgICAgICAgcmV0dXJuIHJlamVjdGVkXG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLl9ib2R5QmxvYikge1xuICAgICAgICByZXR1cm4gcmVhZEJsb2JBc1RleHQodGhpcy5fYm9keUJsb2IpXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuX2JvZHlBcnJheUJ1ZmZlcikge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlYWRBcnJheUJ1ZmZlckFzVGV4dCh0aGlzLl9ib2R5QXJyYXlCdWZmZXIpKVxuICAgICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5Rm9ybURhdGEpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdjb3VsZCBub3QgcmVhZCBGb3JtRGF0YSBib2R5IGFzIHRleHQnKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLl9ib2R5VGV4dClcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgaWYgKHN1cHBvcnQuZm9ybURhdGEpIHtcbiAgICAgIHRoaXMuZm9ybURhdGEgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGV4dCgpLnRoZW4oZGVjb2RlKVxuICAgICAgfTtcbiAgICB9XG5cbiAgICB0aGlzLmpzb24gPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLnRleHQoKS50aGVuKEpTT04ucGFyc2UpXG4gICAgfTtcblxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvLyBIVFRQIG1ldGhvZHMgd2hvc2UgY2FwaXRhbGl6YXRpb24gc2hvdWxkIGJlIG5vcm1hbGl6ZWRcbiAgdmFyIG1ldGhvZHMgPSBbJ0RFTEVURScsICdHRVQnLCAnSEVBRCcsICdPUFRJT05TJywgJ1BPU1QnLCAnUFVUJ107XG5cbiAgZnVuY3Rpb24gbm9ybWFsaXplTWV0aG9kKG1ldGhvZCkge1xuICAgIHZhciB1cGNhc2VkID0gbWV0aG9kLnRvVXBwZXJDYXNlKCk7XG4gICAgcmV0dXJuIG1ldGhvZHMuaW5kZXhPZih1cGNhc2VkKSA+IC0xID8gdXBjYXNlZCA6IG1ldGhvZFxuICB9XG5cbiAgZnVuY3Rpb24gUmVxdWVzdChpbnB1dCwgb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIHZhciBib2R5ID0gb3B0aW9ucy5ib2R5O1xuXG4gICAgaWYgKGlucHV0IGluc3RhbmNlb2YgUmVxdWVzdCkge1xuICAgICAgaWYgKGlucHV0LmJvZHlVc2VkKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FscmVhZHkgcmVhZCcpXG4gICAgICB9XG4gICAgICB0aGlzLnVybCA9IGlucHV0LnVybDtcbiAgICAgIHRoaXMuY3JlZGVudGlhbHMgPSBpbnB1dC5jcmVkZW50aWFscztcbiAgICAgIGlmICghb3B0aW9ucy5oZWFkZXJzKSB7XG4gICAgICAgIHRoaXMuaGVhZGVycyA9IG5ldyBIZWFkZXJzKGlucHV0LmhlYWRlcnMpO1xuICAgICAgfVxuICAgICAgdGhpcy5tZXRob2QgPSBpbnB1dC5tZXRob2Q7XG4gICAgICB0aGlzLm1vZGUgPSBpbnB1dC5tb2RlO1xuICAgICAgdGhpcy5zaWduYWwgPSBpbnB1dC5zaWduYWw7XG4gICAgICBpZiAoIWJvZHkgJiYgaW5wdXQuX2JvZHlJbml0ICE9IG51bGwpIHtcbiAgICAgICAgYm9keSA9IGlucHV0Ll9ib2R5SW5pdDtcbiAgICAgICAgaW5wdXQuYm9keVVzZWQgPSB0cnVlO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnVybCA9IFN0cmluZyhpbnB1dCk7XG4gICAgfVxuXG4gICAgdGhpcy5jcmVkZW50aWFscyA9IG9wdGlvbnMuY3JlZGVudGlhbHMgfHwgdGhpcy5jcmVkZW50aWFscyB8fCAnc2FtZS1vcmlnaW4nO1xuICAgIGlmIChvcHRpb25zLmhlYWRlcnMgfHwgIXRoaXMuaGVhZGVycykge1xuICAgICAgdGhpcy5oZWFkZXJzID0gbmV3IEhlYWRlcnMob3B0aW9ucy5oZWFkZXJzKTtcbiAgICB9XG4gICAgdGhpcy5tZXRob2QgPSBub3JtYWxpemVNZXRob2Qob3B0aW9ucy5tZXRob2QgfHwgdGhpcy5tZXRob2QgfHwgJ0dFVCcpO1xuICAgIHRoaXMubW9kZSA9IG9wdGlvbnMubW9kZSB8fCB0aGlzLm1vZGUgfHwgbnVsbDtcbiAgICB0aGlzLnNpZ25hbCA9IG9wdGlvbnMuc2lnbmFsIHx8IHRoaXMuc2lnbmFsO1xuICAgIHRoaXMucmVmZXJyZXIgPSBudWxsO1xuXG4gICAgaWYgKCh0aGlzLm1ldGhvZCA9PT0gJ0dFVCcgfHwgdGhpcy5tZXRob2QgPT09ICdIRUFEJykgJiYgYm9keSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQm9keSBub3QgYWxsb3dlZCBmb3IgR0VUIG9yIEhFQUQgcmVxdWVzdHMnKVxuICAgIH1cbiAgICB0aGlzLl9pbml0Qm9keShib2R5KTtcbiAgfVxuXG4gIFJlcXVlc3QucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG5ldyBSZXF1ZXN0KHRoaXMsIHtib2R5OiB0aGlzLl9ib2R5SW5pdH0pXG4gIH07XG5cbiAgZnVuY3Rpb24gZGVjb2RlKGJvZHkpIHtcbiAgICB2YXIgZm9ybSA9IG5ldyBGb3JtRGF0YSgpO1xuICAgIGJvZHlcbiAgICAgIC50cmltKClcbiAgICAgIC5zcGxpdCgnJicpXG4gICAgICAuZm9yRWFjaChmdW5jdGlvbihieXRlcykge1xuICAgICAgICBpZiAoYnl0ZXMpIHtcbiAgICAgICAgICB2YXIgc3BsaXQgPSBieXRlcy5zcGxpdCgnPScpO1xuICAgICAgICAgIHZhciBuYW1lID0gc3BsaXQuc2hpZnQoKS5yZXBsYWNlKC9cXCsvZywgJyAnKTtcbiAgICAgICAgICB2YXIgdmFsdWUgPSBzcGxpdC5qb2luKCc9JykucmVwbGFjZSgvXFwrL2csICcgJyk7XG4gICAgICAgICAgZm9ybS5hcHBlbmQoZGVjb2RlVVJJQ29tcG9uZW50KG5hbWUpLCBkZWNvZGVVUklDb21wb25lbnQodmFsdWUpKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgcmV0dXJuIGZvcm1cbiAgfVxuXG4gIGZ1bmN0aW9uIHBhcnNlSGVhZGVycyhyYXdIZWFkZXJzKSB7XG4gICAgdmFyIGhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xuICAgIC8vIFJlcGxhY2UgaW5zdGFuY2VzIG9mIFxcclxcbiBhbmQgXFxuIGZvbGxvd2VkIGJ5IGF0IGxlYXN0IG9uZSBzcGFjZSBvciBob3Jpem9udGFsIHRhYiB3aXRoIGEgc3BhY2VcbiAgICAvLyBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjNzIzMCNzZWN0aW9uLTMuMlxuICAgIHZhciBwcmVQcm9jZXNzZWRIZWFkZXJzID0gcmF3SGVhZGVycy5yZXBsYWNlKC9cXHI/XFxuW1xcdCBdKy9nLCAnICcpO1xuICAgIHByZVByb2Nlc3NlZEhlYWRlcnMuc3BsaXQoL1xccj9cXG4vKS5mb3JFYWNoKGZ1bmN0aW9uKGxpbmUpIHtcbiAgICAgIHZhciBwYXJ0cyA9IGxpbmUuc3BsaXQoJzonKTtcbiAgICAgIHZhciBrZXkgPSBwYXJ0cy5zaGlmdCgpLnRyaW0oKTtcbiAgICAgIGlmIChrZXkpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gcGFydHMuam9pbignOicpLnRyaW0oKTtcbiAgICAgICAgaGVhZGVycy5hcHBlbmQoa2V5LCB2YWx1ZSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGhlYWRlcnNcbiAgfVxuXG4gIEJvZHkuY2FsbChSZXF1ZXN0LnByb3RvdHlwZSk7XG5cbiAgZnVuY3Rpb24gUmVzcG9uc2UoYm9keUluaXQsIG9wdGlvbnMpIHtcbiAgICBpZiAoIW9wdGlvbnMpIHtcbiAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICB9XG5cbiAgICB0aGlzLnR5cGUgPSAnZGVmYXVsdCc7XG4gICAgdGhpcy5zdGF0dXMgPSBvcHRpb25zLnN0YXR1cyA9PT0gdW5kZWZpbmVkID8gMjAwIDogb3B0aW9ucy5zdGF0dXM7XG4gICAgdGhpcy5vayA9IHRoaXMuc3RhdHVzID49IDIwMCAmJiB0aGlzLnN0YXR1cyA8IDMwMDtcbiAgICB0aGlzLnN0YXR1c1RleHQgPSAnc3RhdHVzVGV4dCcgaW4gb3B0aW9ucyA/IG9wdGlvbnMuc3RhdHVzVGV4dCA6ICdPSyc7XG4gICAgdGhpcy5oZWFkZXJzID0gbmV3IEhlYWRlcnMob3B0aW9ucy5oZWFkZXJzKTtcbiAgICB0aGlzLnVybCA9IG9wdGlvbnMudXJsIHx8ICcnO1xuICAgIHRoaXMuX2luaXRCb2R5KGJvZHlJbml0KTtcbiAgfVxuXG4gIEJvZHkuY2FsbChSZXNwb25zZS5wcm90b3R5cGUpO1xuXG4gIFJlc3BvbnNlLnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBuZXcgUmVzcG9uc2UodGhpcy5fYm9keUluaXQsIHtcbiAgICAgIHN0YXR1czogdGhpcy5zdGF0dXMsXG4gICAgICBzdGF0dXNUZXh0OiB0aGlzLnN0YXR1c1RleHQsXG4gICAgICBoZWFkZXJzOiBuZXcgSGVhZGVycyh0aGlzLmhlYWRlcnMpLFxuICAgICAgdXJsOiB0aGlzLnVybFxuICAgIH0pXG4gIH07XG5cbiAgUmVzcG9uc2UuZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgcmVzcG9uc2UgPSBuZXcgUmVzcG9uc2UobnVsbCwge3N0YXR1czogMCwgc3RhdHVzVGV4dDogJyd9KTtcbiAgICByZXNwb25zZS50eXBlID0gJ2Vycm9yJztcbiAgICByZXR1cm4gcmVzcG9uc2VcbiAgfTtcblxuICB2YXIgcmVkaXJlY3RTdGF0dXNlcyA9IFszMDEsIDMwMiwgMzAzLCAzMDcsIDMwOF07XG5cbiAgUmVzcG9uc2UucmVkaXJlY3QgPSBmdW5jdGlvbih1cmwsIHN0YXR1cykge1xuICAgIGlmIChyZWRpcmVjdFN0YXR1c2VzLmluZGV4T2Yoc3RhdHVzKSA9PT0gLTEpIHtcbiAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdJbnZhbGlkIHN0YXR1cyBjb2RlJylcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFJlc3BvbnNlKG51bGwsIHtzdGF0dXM6IHN0YXR1cywgaGVhZGVyczoge2xvY2F0aW9uOiB1cmx9fSlcbiAgfTtcblxuICBleHBvcnRzLkRPTUV4Y2VwdGlvbiA9IHNlbGYuRE9NRXhjZXB0aW9uO1xuICB0cnkge1xuICAgIG5ldyBleHBvcnRzLkRPTUV4Y2VwdGlvbigpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBleHBvcnRzLkRPTUV4Y2VwdGlvbiA9IGZ1bmN0aW9uKG1lc3NhZ2UsIG5hbWUpIHtcbiAgICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgdmFyIGVycm9yID0gRXJyb3IobWVzc2FnZSk7XG4gICAgICB0aGlzLnN0YWNrID0gZXJyb3Iuc3RhY2s7XG4gICAgfTtcbiAgICBleHBvcnRzLkRPTUV4Y2VwdGlvbi5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEVycm9yLnByb3RvdHlwZSk7XG4gICAgZXhwb3J0cy5ET01FeGNlcHRpb24ucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gZXhwb3J0cy5ET01FeGNlcHRpb247XG4gIH1cblxuICBmdW5jdGlvbiBmZXRjaChpbnB1dCwgaW5pdCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHZhciByZXF1ZXN0ID0gbmV3IFJlcXVlc3QoaW5wdXQsIGluaXQpO1xuXG4gICAgICBpZiAocmVxdWVzdC5zaWduYWwgJiYgcmVxdWVzdC5zaWduYWwuYWJvcnRlZCkge1xuICAgICAgICByZXR1cm4gcmVqZWN0KG5ldyBleHBvcnRzLkRPTUV4Y2VwdGlvbignQWJvcnRlZCcsICdBYm9ydEVycm9yJykpXG4gICAgICB9XG5cbiAgICAgIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuICAgICAgZnVuY3Rpb24gYWJvcnRYaHIoKSB7XG4gICAgICAgIHhoci5hYm9ydCgpO1xuICAgICAgfVxuXG4gICAgICB4aHIub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBvcHRpb25zID0ge1xuICAgICAgICAgIHN0YXR1czogeGhyLnN0YXR1cyxcbiAgICAgICAgICBzdGF0dXNUZXh0OiB4aHIuc3RhdHVzVGV4dCxcbiAgICAgICAgICBoZWFkZXJzOiBwYXJzZUhlYWRlcnMoeGhyLmdldEFsbFJlc3BvbnNlSGVhZGVycygpIHx8ICcnKVxuICAgICAgICB9O1xuICAgICAgICBvcHRpb25zLnVybCA9ICdyZXNwb25zZVVSTCcgaW4geGhyID8geGhyLnJlc3BvbnNlVVJMIDogb3B0aW9ucy5oZWFkZXJzLmdldCgnWC1SZXF1ZXN0LVVSTCcpO1xuICAgICAgICB2YXIgYm9keSA9ICdyZXNwb25zZScgaW4geGhyID8geGhyLnJlc3BvbnNlIDogeGhyLnJlc3BvbnNlVGV4dDtcbiAgICAgICAgcmVzb2x2ZShuZXcgUmVzcG9uc2UoYm9keSwgb3B0aW9ucykpO1xuICAgICAgfTtcblxuICAgICAgeGhyLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmVqZWN0KG5ldyBUeXBlRXJyb3IoJ05ldHdvcmsgcmVxdWVzdCBmYWlsZWQnKSk7XG4gICAgICB9O1xuXG4gICAgICB4aHIub250aW1lb3V0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJlamVjdChuZXcgVHlwZUVycm9yKCdOZXR3b3JrIHJlcXVlc3QgZmFpbGVkJykpO1xuICAgICAgfTtcblxuICAgICAgeGhyLm9uYWJvcnQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmVqZWN0KG5ldyBleHBvcnRzLkRPTUV4Y2VwdGlvbignQWJvcnRlZCcsICdBYm9ydEVycm9yJykpO1xuICAgICAgfTtcblxuICAgICAgeGhyLm9wZW4ocmVxdWVzdC5tZXRob2QsIHJlcXVlc3QudXJsLCB0cnVlKTtcblxuICAgICAgaWYgKHJlcXVlc3QuY3JlZGVudGlhbHMgPT09ICdpbmNsdWRlJykge1xuICAgICAgICB4aHIud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSBpZiAocmVxdWVzdC5jcmVkZW50aWFscyA9PT0gJ29taXQnKSB7XG4gICAgICAgIHhoci53aXRoQ3JlZGVudGlhbHMgPSBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgaWYgKCdyZXNwb25zZVR5cGUnIGluIHhociAmJiBzdXBwb3J0LmJsb2IpIHtcbiAgICAgICAgeGhyLnJlc3BvbnNlVHlwZSA9ICdibG9iJztcbiAgICAgIH1cblxuICAgICAgcmVxdWVzdC5oZWFkZXJzLmZvckVhY2goZnVuY3Rpb24odmFsdWUsIG5hbWUpIHtcbiAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIobmFtZSwgdmFsdWUpO1xuICAgICAgfSk7XG5cbiAgICAgIGlmIChyZXF1ZXN0LnNpZ25hbCkge1xuICAgICAgICByZXF1ZXN0LnNpZ25hbC5hZGRFdmVudExpc3RlbmVyKCdhYm9ydCcsIGFib3J0WGhyKTtcblxuICAgICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgLy8gRE9ORSAoc3VjY2VzcyBvciBmYWlsdXJlKVxuICAgICAgICAgIGlmICh4aHIucmVhZHlTdGF0ZSA9PT0gNCkge1xuICAgICAgICAgICAgcmVxdWVzdC5zaWduYWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignYWJvcnQnLCBhYm9ydFhocik7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICB4aHIuc2VuZCh0eXBlb2YgcmVxdWVzdC5fYm9keUluaXQgPT09ICd1bmRlZmluZWQnID8gbnVsbCA6IHJlcXVlc3QuX2JvZHlJbml0KTtcbiAgICB9KVxuICB9XG5cbiAgZmV0Y2gucG9seWZpbGwgPSB0cnVlO1xuXG4gIGlmICghc2VsZi5mZXRjaCkge1xuICAgIHNlbGYuZmV0Y2ggPSBmZXRjaDtcbiAgICBzZWxmLkhlYWRlcnMgPSBIZWFkZXJzO1xuICAgIHNlbGYuUmVxdWVzdCA9IFJlcXVlc3Q7XG4gICAgc2VsZi5SZXNwb25zZSA9IFJlc3BvbnNlO1xuICB9XG5cbiAgZXhwb3J0cy5IZWFkZXJzID0gSGVhZGVycztcbiAgZXhwb3J0cy5SZXF1ZXN0ID0gUmVxdWVzdDtcbiAgZXhwb3J0cy5SZXNwb25zZSA9IFJlc3BvbnNlO1xuICBleHBvcnRzLmZldGNoID0gZmV0Y2g7XG5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcblxuICByZXR1cm4gZXhwb3J0cztcblxufSkoe30pO1xufSkoX19zZWxmX18pO1xuX19zZWxmX18uZmV0Y2gucG9ueWZpbGwgPSB0cnVlO1xuLy8gUmVtb3ZlIFwicG9seWZpbGxcIiBwcm9wZXJ0eSBhZGRlZCBieSB3aGF0d2ctZmV0Y2hcbmRlbGV0ZSBfX3NlbGZfXy5mZXRjaC5wb2x5ZmlsbDtcbi8vIENob29zZSBiZXR3ZWVuIG5hdGl2ZSBpbXBsZW1lbnRhdGlvbiAoZ2xvYmFsKSBvciBjdXN0b20gaW1wbGVtZW50YXRpb24gKF9fc2VsZl9fKVxuLy8gdmFyIGN0eCA9IGdsb2JhbC5mZXRjaCA/IGdsb2JhbCA6IF9fc2VsZl9fO1xudmFyIGN0eCA9IF9fc2VsZl9fOyAvLyB0aGlzIGxpbmUgZGlzYWJsZSBzZXJ2aWNlIHdvcmtlciBzdXBwb3J0IHRlbXBvcmFyaWx5XG5leHBvcnRzID0gY3R4LmZldGNoIC8vIFRvIGVuYWJsZTogaW1wb3J0IGZldGNoIGZyb20gJ2Nyb3NzLWZldGNoJ1xuZXhwb3J0cy5kZWZhdWx0ID0gY3R4LmZldGNoIC8vIEZvciBUeXBlU2NyaXB0IGNvbnN1bWVycyB3aXRob3V0IGVzTW9kdWxlSW50ZXJvcC5cbmV4cG9ydHMuZmV0Y2ggPSBjdHguZmV0Y2ggLy8gVG8gZW5hYmxlOiBpbXBvcnQge2ZldGNofSBmcm9tICdjcm9zcy1mZXRjaCdcbmV4cG9ydHMuSGVhZGVycyA9IGN0eC5IZWFkZXJzXG5leHBvcnRzLlJlcXVlc3QgPSBjdHguUmVxdWVzdFxuZXhwb3J0cy5SZXNwb25zZSA9IGN0eC5SZXNwb25zZVxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzXG4iLCJ2YXIgbmFpdmVGYWxsYmFjayA9IGZ1bmN0aW9uICgpIHtcblx0aWYgKHR5cGVvZiBzZWxmID09PSBcIm9iamVjdFwiICYmIHNlbGYpIHJldHVybiBzZWxmO1xuXHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIiAmJiB3aW5kb3cpIHJldHVybiB3aW5kb3c7XG5cdHRocm93IG5ldyBFcnJvcihcIlVuYWJsZSB0byByZXNvbHZlIGdsb2JhbCBgdGhpc2BcIik7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbiAoKSB7XG5cdGlmICh0aGlzKSByZXR1cm4gdGhpcztcblxuXHQvLyBVbmV4cGVjdGVkIHN0cmljdCBtb2RlIChtYXkgaGFwcGVuIGlmIGUuZy4gYnVuZGxlZCBpbnRvIEVTTSBtb2R1bGUpXG5cblx0Ly8gRmFsbGJhY2sgdG8gc3RhbmRhcmQgZ2xvYmFsVGhpcyBpZiBhdmFpbGFibGVcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSBcIm9iamVjdFwiICYmIGdsb2JhbFRoaXMpIHJldHVybiBnbG9iYWxUaGlzO1xuXG5cdC8vIFRoYW5rcyBAbWF0aGlhc2J5bmVucyAtPiBodHRwczovL21hdGhpYXNieW5lbnMuYmUvbm90ZXMvZ2xvYmFsdGhpc1xuXHQvLyBJbiBhbGwgRVM1KyBlbmdpbmVzIGdsb2JhbCBvYmplY3QgaW5oZXJpdHMgZnJvbSBPYmplY3QucHJvdG90eXBlXG5cdC8vIChpZiB5b3UgYXBwcm9hY2hlZCBvbmUgdGhhdCBkb2Vzbid0IHBsZWFzZSByZXBvcnQpXG5cdHRyeSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KE9iamVjdC5wcm90b3R5cGUsIFwiX19nbG9iYWxfX1wiLCB7XG5cdFx0XHRnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sXG5cdFx0XHRjb25maWd1cmFibGU6IHRydWVcblx0XHR9KTtcblx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHQvLyBVbmZvcnR1bmF0ZSBjYXNlIG9mIHVwZGF0ZXMgdG8gT2JqZWN0LnByb3RvdHlwZSBiZWluZyByZXN0cmljdGVkXG5cdFx0Ly8gdmlhIHByZXZlbnRFeHRlbnNpb25zLCBzZWFsIG9yIGZyZWV6ZVxuXHRcdHJldHVybiBuYWl2ZUZhbGxiYWNrKCk7XG5cdH1cblx0dHJ5IHtcblx0XHQvLyBTYWZhcmkgY2FzZSAod2luZG93Ll9fZ2xvYmFsX18gd29ya3MsIGJ1dCBfX2dsb2JhbF9fIGRvZXMgbm90KVxuXHRcdGlmICghX19nbG9iYWxfXykgcmV0dXJuIG5haXZlRmFsbGJhY2soKTtcblx0XHRyZXR1cm4gX19nbG9iYWxfXztcblx0fSBmaW5hbGx5IHtcblx0XHRkZWxldGUgT2JqZWN0LnByb3RvdHlwZS5fX2dsb2JhbF9fO1xuXHR9XG59KSgpO1xuIiwidmFyIF9nbG9iYWxUaGlzO1xuaWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0Jykge1xuXHRfZ2xvYmFsVGhpcyA9IGdsb2JhbFRoaXM7XG59IGVsc2Uge1xuXHR0cnkge1xuXHRcdF9nbG9iYWxUaGlzID0gcmVxdWlyZSgnZXM1LWV4dC9nbG9iYWwnKTtcblx0fSBjYXRjaCAoZXJyb3IpIHtcblx0fSBmaW5hbGx5IHtcblx0XHRpZiAoIV9nbG9iYWxUaGlzICYmIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7IF9nbG9iYWxUaGlzID0gd2luZG93OyB9XG5cdFx0aWYgKCFfZ2xvYmFsVGhpcykgeyB0aHJvdyBuZXcgRXJyb3IoJ0NvdWxkIG5vdCBkZXRlcm1pbmUgZ2xvYmFsIHRoaXMnKTsgfVxuXHR9XG59XG5cbnZhciBOYXRpdmVXZWJTb2NrZXQgPSBfZ2xvYmFsVGhpcy5XZWJTb2NrZXQgfHwgX2dsb2JhbFRoaXMuTW96V2ViU29ja2V0O1xudmFyIHdlYnNvY2tldF92ZXJzaW9uID0gcmVxdWlyZSgnLi92ZXJzaW9uJyk7XG5cblxuLyoqXG4gKiBFeHBvc2UgYSBXM0MgV2ViU29ja2V0IGNsYXNzIHdpdGgganVzdCBvbmUgb3IgdHdvIGFyZ3VtZW50cy5cbiAqL1xuZnVuY3Rpb24gVzNDV2ViU29ja2V0KHVyaSwgcHJvdG9jb2xzKSB7XG5cdHZhciBuYXRpdmVfaW5zdGFuY2U7XG5cblx0aWYgKHByb3RvY29scykge1xuXHRcdG5hdGl2ZV9pbnN0YW5jZSA9IG5ldyBOYXRpdmVXZWJTb2NrZXQodXJpLCBwcm90b2NvbHMpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdG5hdGl2ZV9pbnN0YW5jZSA9IG5ldyBOYXRpdmVXZWJTb2NrZXQodXJpKTtcblx0fVxuXG5cdC8qKlxuXHQgKiAnbmF0aXZlX2luc3RhbmNlJyBpcyBhbiBpbnN0YW5jZSBvZiBuYXRpdmVXZWJTb2NrZXQgKHRoZSBicm93c2VyJ3MgV2ViU29ja2V0XG5cdCAqIGNsYXNzKS4gU2luY2UgaXQgaXMgYW4gT2JqZWN0IGl0IHdpbGwgYmUgcmV0dXJuZWQgYXMgaXQgaXMgd2hlbiBjcmVhdGluZyBhblxuXHQgKiBpbnN0YW5jZSBvZiBXM0NXZWJTb2NrZXQgdmlhICduZXcgVzNDV2ViU29ja2V0KCknLlxuXHQgKlxuXHQgKiBFQ01BU2NyaXB0IDU6IGh0dHA6Ly9iY2xhcnkuY29tLzIwMDQvMTEvMDcvI2EtMTMuMi4yXG5cdCAqL1xuXHRyZXR1cm4gbmF0aXZlX2luc3RhbmNlO1xufVxuaWYgKE5hdGl2ZVdlYlNvY2tldCkge1xuXHRbJ0NPTk5FQ1RJTkcnLCAnT1BFTicsICdDTE9TSU5HJywgJ0NMT1NFRCddLmZvckVhY2goZnVuY3Rpb24ocHJvcCkge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShXM0NXZWJTb2NrZXQsIHByb3AsIHtcblx0XHRcdGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBOYXRpdmVXZWJTb2NrZXRbcHJvcF07IH1cblx0XHR9KTtcblx0fSk7XG59XG5cbi8qKlxuICogTW9kdWxlIGV4cG9ydHMuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgICd3M2N3ZWJzb2NrZXQnIDogTmF0aXZlV2ViU29ja2V0ID8gVzNDV2ViU29ja2V0IDogbnVsbCxcbiAgICAndmVyc2lvbicgICAgICA6IHdlYnNvY2tldF92ZXJzaW9uXG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi9wYWNrYWdlLmpzb24nKS52ZXJzaW9uO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwidmFyIGdldFByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mID8gKG9iaikgPT4gKE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmopKSA6IChvYmopID0+IChvYmouX19wcm90b19fKTtcbnZhciBsZWFmUHJvdG90eXBlcztcbi8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuLy8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4vLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbi8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuLy8gbW9kZSAmIDE2OiByZXR1cm4gdmFsdWUgd2hlbiBpdCdzIFByb21pc2UtbGlrZVxuLy8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuX193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcblx0aWYobW9kZSAmIDEpIHZhbHVlID0gdGhpcyh2YWx1ZSk7XG5cdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG5cdGlmKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUpIHtcblx0XHRpZigobW9kZSAmIDQpICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcblx0XHRpZigobW9kZSAmIDE2KSAmJiB0eXBlb2YgdmFsdWUudGhlbiA9PT0gJ2Z1bmN0aW9uJykgcmV0dXJuIHZhbHVlO1xuXHR9XG5cdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG5cdHZhciBkZWYgPSB7fTtcblx0bGVhZlByb3RvdHlwZXMgPSBsZWFmUHJvdG90eXBlcyB8fCBbbnVsbCwgZ2V0UHJvdG8oe30pLCBnZXRQcm90byhbXSksIGdldFByb3RvKGdldFByb3RvKV07XG5cdGZvcih2YXIgY3VycmVudCA9IG1vZGUgJiAyICYmIHZhbHVlOyB0eXBlb2YgY3VycmVudCA9PSAnb2JqZWN0JyAmJiAhfmxlYWZQcm90b3R5cGVzLmluZGV4T2YoY3VycmVudCk7IGN1cnJlbnQgPSBnZXRQcm90byhjdXJyZW50KSkge1xuXHRcdE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGN1cnJlbnQpLmZvckVhY2goKGtleSkgPT4gKGRlZltrZXldID0gKCkgPT4gKHZhbHVlW2tleV0pKSk7XG5cdH1cblx0ZGVmWydkZWZhdWx0J10gPSAoKSA9PiAodmFsdWUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGRlZik7XG5cdHJldHVybiBucztcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vY29ubmVjdCB0byBEYXRhYmFzZVxuaW1wb3J0IHsgY3JlYXRlQ2xpZW50IH0gZnJvbSAnQHN1cGFiYXNlL3N1cGFiYXNlLWpzJ1xuXG5jb25zdCBzdXBhYmFzZVVybCA9ICdodHRwczovL2V3d2txenpmdnJidGR4eG9raXdxLnN1cGFiYXNlLmNvJ1xuY29uc3Qgc3VwYWJhc2VLZXkgPSBwcm9jZXNzLmVudi5leUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKcGMzTWlPaUp6ZFhCaFltRnpaU0lzSW5KbFppSTZJbVYzZDJ0eGVucG1kbkppZEdSNGVHOXJhWGR4SWl3aWNtOXNaU0k2SW1GdWIyNGlMQ0pwWVhRaU9qRTJPRFUwTURVeE9ESXNJbVY0Y0NJNk1qQXdNRGs0TVRFNE1uMC5hc1Rub2t3QlJSV1dQQ3RPT2dBLXI1QU93UUNIS2RjSDdOYlI2S3Y1ZFBzO1xuY29uc3Qgc3VwYWJhc2UgPSBjcmVhdGVDbGllbnQoc3VwYWJhc2VVcmwsIHN1cGFiYXNlS2V5KTtcblxuXG4vL3JlZGlyZWN0IGZyb20gTG9naW4gdG8gU2lnbnVwIHBhZ2VcbmNvbnN0IGxvZ2luTGluayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9naW5MaW5rXCIpO1xubG9naW5MaW5rLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVMb2dpbik7XG5mdW5jdGlvbiBoYW5kbGVMb2dpbigpIHtcbiAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnYXV0aC5odG1sJztcbn1cblxuLy91c2VyIGRhdGEgaW5wdXQgdmFsaWRhdGlvblxuY29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJmb3JtXCIpO1xuZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBmdW5jdGlvbihlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICBcbiAgICB2YXIgcGFzc3dvcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGFzc3dvcmQnKS52YWx1ZTtcbiAgICB2YXIgY29uZmlybVBhc3N3b3JkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbmZpcm1QYXNzd29yZCcpLnZhbHVlO1xuICBcbiAgICAvLyBWZXJpZmljYSBsYSBsdW5naGV6emEgZGVsbGEgcGFzc3dvcmRcbiAgICBpZiAocGFzc3dvcmQubGVuZ3RoIDwgOCkge1xuICAgICAgYWxlcnQoJ0xhIHBhc3N3b3JkIGRldmUgZXNzZXJlIGRpIGFsbWVubyBvdHRvIGNhcmF0dGVyaS4nKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIFxuICAgIC8vIFZlcmlmaWNhIGxhIHByZXNlbnphIGRpIHVuYSBsZXR0ZXJhIG1haXVzY29sYVxuICAgIGlmICghL1tBLVpdLy50ZXN0KHBhc3N3b3JkKSkge1xuICAgICAgYWxlcnQoJ0xhIHBhc3N3b3JkIGRldmUgY29udGVuZXJlIGFsbWVubyB1bmEgbGV0dGVyYSBtYWl1c2NvbGEuJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICBcbiAgICAvLyBWZXJpZmljYSBsYSBwcmVzZW56YSBkaSBhbG1lbm8gdW4gY2FyYXR0ZXJlIHNwZWNpYWxlXG4gICAgaWYgKCEvWyFAIyQlXiYqXS8udGVzdChwYXNzd29yZCkpIHtcbiAgICAgIGFsZXJ0KCdMYSBwYXNzd29yZCBkZXZlIGNvbnRlbmVyZSBhbG1lbm8gdW4gY2FyYXR0ZXJlIHNwZWNpYWxlICghLCBALCAjLCAkLCAlLCBeLCAmLCAqKS4nKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIFxuICAgIC8vIFZlcmlmaWNhIGxhIHByZXNlbnphIGRpIGFsbWVubyB1bmEgY2lmcmFcbiAgICBpZiAoIS9cXGQvLnRlc3QocGFzc3dvcmQpKSB7XG4gICAgICBhbGVydCgnTGEgcGFzc3dvcmQgZGV2ZSBjb250ZW5lcmUgYWxtZW5vIHVuIGEgY2lmcmEuJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICBcbiAgICAvLyBWZXJpZmljYSBjaGUgbGUgcGFzc3dvcmQgY29ycmlzcG9uZGFub1xuICAgIGlmIChwYXNzd29yZCA9PT0gY29uZmlybVBhc3N3b3JkKSB7XG4gICAgICAgIHNpZ25VcCgpO1xuICAgICAgLy8gUHVvaSBhZ2dpdW5nZXJlIHF1aSBpbCBjb2RpY2UgcGVyIGludmlhcmUgaSBkYXRpIGRlbCBtb2R1bG8gYWwgc2VydmVyXG4gICAgfSBlbHNlIHtcbiAgICAgIGFsZXJ0KCdMZSBwYXNzd29yZCBub24gY29ycmlzcG9uZG9uby4gUmlwcm92YS4nKTtcbiAgICB9XG4gIH0pO1xuICBcblxuLy9zdXBhYmFzZSBzaWdudXBcbmNvbnN0IHNpZ25VcCA9IGFzeW5jICgpID0+IHtcbiAgICB2YXIgcGFzc3dvcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGFzc3dvcmQnKS52YWx1ZTtcbiAgICB2YXIgZW1haWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZW1haWwnKS52YWx1ZTtcbiAgICB2YXIgbmFtZSA9ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZpcnN0TmFtZScpLnZhbHVlOztcbiAgICB2YXIgc3VybmFtZSA9ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xhc3ROYW1lJykudmFsdWU7O1xuICAgIHZhciB1c2VybmFtZSA9ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZXJuYW1lJykudmFsdWU7O1xuICAgIFxuXG5cbiAgICB0cnkge1xuICAgICAgICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLnNpZ25VcChcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlbWFpbDogZW1haWwsXG4gICAgICAgICAgICAgICAgcGFzc3dvcmQ6IHBhc3N3b3JkLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIGZpcnN0X25hbWUgOiBuYW1lLFxuICAgICAgICAgICAgICAgICAgICBsYXN0X25hbWUgOiBzdXJuYW1lLFxuICAgICAgICAgICAgICAgICAgICB1c2VybmFtZTogdXNlcm5hbWUsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICApO1xuXG4gICAgICAgIGlmIChlcnJvcikgdGhyb3cgZXJyb3I7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmxvZyhlLm1lc3NhZ2UpO1xuICAgIH1cbn07XG5cbiAgIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9