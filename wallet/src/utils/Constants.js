/*global chrome*/
export const OPEN_IN_WEB = chrome.storage ? false : true;
export const STORAGE = OPEN_IN_WEB ? undefined : chrome.storage.sync;