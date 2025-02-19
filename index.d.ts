export interface KeyUX {
  start(): void
  stop(): void
}

interface MinimalWindow {
  addEventListener(
    type: 'keydown' | 'keyup',
    listener: (event: {}) => void
  ): void

  document: {
    querySelector(selector: string): any
  }

  navigator: {
    platform: string
    userAgent: string
  }

  removeEventListener(
    type: 'keydown' | 'keyup',
    listener: (event: {}) => void
  ): void
}

export interface KeyUXModule {
  (window: MinimalWindow): () => void
}

export interface MenuKeyUXOptions {
  /**
   * Maximum allowed pause between key presses when searching
   * for a list item by name. Default is 300.
   */
  searchDelayMs?: number
}

export type HotkeyOverride = Record<string, string>

/**
 * Press button/a according to `aria-keyshortcuts`.
 *
 * ```js
 * import { startKeyUX, hotkeyKeyUX } from 'keyux'
 *
 * startKeyUX(window, [
 *   hotkeyKeyUX()
 * ])
 * ```
 */
export function hotkeyKeyUX(overrides?: HotkeyOverride): KeyUXModule

/**
 * Add arrow-navigation on `role="menu"`.
 *
 * ```js
 * import { startKeyUX, menuKeyUX } from 'keyux'
 *
 * startKeyUX(window, [
 *   menuKeyUX()
 * ])
 * ```
 */
export function menuKeyUX(options?: MenuKeyUXOptions): KeyUXModule

/**
 * Add pressed style on button activation from keyboard.
 *
 * ```js
 * import { startKeyUX, pressKeyUX } from 'keyux'
 *
 * startKeyUX(window, [
 *   pressKeyUX('is-pressed')
 * ])
 * ```
 */
export function pressKeyUX(className: string): KeyUXModule

/**
 * Add support for focus jump into `aria-controls`.
 *
 * ```js
 * import { startKeyUX, jumpsKeyUX } from 'keyux'
 *
 * startKeyUX(window, [
 *   jumpsKeyUX()
 * ])
 * ```
 */
export function jumpKeyUX(interactives?: string): KeyUXModule

/**
 * Add support for `aria-hidden` block which can’t be archived by Tab,
 * only by jump from another block.
 *
 * ```js
 * import { startKeyUX, hiddenKeyUX } from 'keyux'
 *
 * startKeyUX(window, [
 *   hiddenKeyUX()
 * ])
 * ```
 */
export function hiddenKeyUX(): KeyUXModule

/**
 * Start listeners for key events for better keyboard UX.
 *
 * ```js
 * import {
 *   startKeyUX,
 *   hotkeyKeyUX,
 *   menuKeyUX,
 *   pressKeyUX,
 *   jumpKeyUX,
 *   hiddenKeyUX
 * } from 'keyux'
 *
 * startKeyUX(window, [
 *   hotkeyKeyUX(),
 *   menuKeyUX(),
 *   pressKeyUX('is-pressed'),
 *   jumpKeyUX(),
 *   hiddenKeyUX()
 * ])
 * ```
 */
export function startKeyUX(
  window: MinimalWindow,
  plugins: KeyUXModule[]
): () => void

/**
 * Returns `false` for tablets and phones.
 *
 * They still can have connected physical keyboard, it is just less likely.
 * We recommend still support hot keys, but maybe do not show hints in UI.
 */
export function likelyWithKeyboard(window: MinimalWindow): boolean

/**
 * Return text for `<kbd>` element with hint for hot key.
 *
 * It replaced `Ctrl` with `⌘` on Mac and respects overrides.
 *
 * ```js
 * import { getHotKeyHint, likelyWithKeyboard } from 'keyux'
 *
 * export const Button = ({ hokey, children }) => {
 *   return <button aria-keyshortcuts={hotkey}>
 *     {children}
 *     {likelyWithKeyboard(window) && <kbd>{getHotKeyHint(window, hotkey)}</kbd>}
 *   </button>
 * }
 * ```
 */
export function getHotKeyHint(
  window: MinimalWindow,
  code: string,
  overrides?: HotkeyOverride
): string
