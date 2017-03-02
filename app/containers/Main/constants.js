/*
 * Main Constants
 *
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weid typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'projectName/ContainerName' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 * Format:
 * export const MY_ACTION_CONSTANT = 'venu/Main/MY_ACTION_CONSTANT';
 */
export const CHANGE_MAP_MODE = 'venu/Main/CHANGE_MAP_MODE';
export const CHANGE_USERNAME = 'venu/Main/CHANGE_USERNAME';
