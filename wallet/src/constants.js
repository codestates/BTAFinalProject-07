export const IS_EXTENSION = chrome.storage ? false : true;
export const STORAGE = IS_EXTENSION ? undefined : chrome.storage.sync;