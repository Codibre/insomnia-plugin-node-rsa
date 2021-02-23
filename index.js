const crypto = require("crypto");
const NodeRSA = require('node-rsa');

const encryptStringWithRsaPublicKey = (value, key, encryptionScheme) => {
  const nodeRsa = new NodeRSA(key, 'public', {
		encryptionScheme: encryptionScheme,
	});
  return this.key.encrypt(
    value,
    'base64',
  );
};

module.exports.templateTags = [{
    name: 'nodersa',
    displayName: 'NODE RSA',
    description: 'Encrypt value using NODE-RSA',
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
            value: undefined,
          },
          {
            displayName: 'PKCS1',
            value: 'pkcs1'
          },
          {
            displayName: 'PKCS1_OAEP',
            value: 'pkcs1_oaep'
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