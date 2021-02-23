const crypto = require("crypto");
const NodeRSA = require('node-rsa');

const encryptStringWithRsaPublicKey = (value, key, padding) => {
  const nodeRsa = new NodeRSA(key, 'public', {
		encryptionScheme: padding === 'NO_PADDING' ? undefined : padding.toLowerCase(),
	});
  return this.key.encrypt(
    value,
    'base64',
  );
};

module.exports.templateTags = [{
    name: 'rsa',
    displayName: 'RSA',
    description: 'Encrypt value using RSA',
    args: [
      {
        displayName: 'Public key in base64',
        type: 'string',
        placeholder: 'LS0tLS1......'
      },
      {
        displayName: 'RSA key padding',
        type: 'enum',
        options: [
          {
            displayName: 'NO_PADDING',
            value: crypto.constants.RSA_NO_PADDING,
          },
          {
            displayName: 'PKCS1',
            value: crypto.constants.RSA_PKCS1_PADDING
          },
          {
            displayName: 'PKCS1_OAEP',
            value: crypto.constants.RSA_PKCS1_OAEP_PADDING
          },
        ]
      },
      {
        displayName: 'Secret Text',
        type: 'string',
        placeholder: 'Secret Text'
      }
    ],
    run (_, key, padding, value) {
      value = value || '';
      return encryptStringWithRsaPublicKey(value, key, padding);
    }
  }];