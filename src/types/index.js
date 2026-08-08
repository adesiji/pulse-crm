/**
 * This is a plain JS project, so we don't have TypeScript's `interface`
 * keyword — but we still want documented shapes so editors (VS Code) can
 * autocomplete and type-check via JSDoc. This file has no runtime code;
 * it's purely for the comments below.
 *
 * If you later migrate this project to TypeScript, these typedefs become
 * your starting `.ts` interfaces almost verbatim — worth trying as a
 * stretch goal once the app is functionally complete.
 */

/**
 * @typedef {Object} Lead
 * @property {string} id
 * @property {string} name
 * @property {string} company
 * @property {string} email
 * @property {'new'|'contacted'|'qualified'|'lost'} status
 * @property {number} value
 * @property {string} source
 * @property {string} createdAt - ISO date string
 */

/**
 * @typedef {Object} Contact
 * @property {string} id
 * @property {string} name
 * @property {string} company
 * @property {string} role
 * @property {string} email
 * @property {string} phone
 */

/**
 * @typedef {Object} Deal
 * @property {string} id
 * @property {string} title
 * @property {string} company
 * @property {number} value
 * @property {'prospecting'|'proposal'|'negotiation'|'won'|'lost'} stage
 * @property {string} owner
 */

/**
 * @typedef {Object} ActivityEvent
 * @property {string} id
 * @property {string} type
 * @property {string} message
 * @property {string} timestamp - ISO date string
 */

export {};
