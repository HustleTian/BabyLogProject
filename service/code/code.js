/**
 * Created by TIAN on 2018/7/20.
 */


var CryptoJS = require('aes.js');
var key = CryptoJS.enc.Utf8.parse("十六进制数作为秘钥");
var iv = CryptoJS.enc.Utf8.parse('十六进制数作为秘钥偏移量');
// AES加密
function Encrypt(word) {
	var srcs = CryptoJS.enc.Utf8.parse(word);
	var encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
	return encrypted.ciphertext.toString().toUpperCase();
}
// AES解密
function Decrypt(word) {
	var encryptedHexStr = CryptoJS.enc.Hex.parse(word);
	var srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
	var decrypt = CryptoJS.AES.decrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
	var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
	return decryptedStr.toString();
}
module.exports = {
	Encrypt: Encrypt,
	Decrypt: Decrypt,
}