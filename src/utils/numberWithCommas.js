/**
 * @format
 * @param {number?} num - some number
 * @description ham nay lam cai gi do ko ro
 * @returns {string}
 */

const numberWithCommas = (num) => num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

export default numberWithCommas;
