require('@nomiclabs/hardhat-waffle')

module.exports = {
	solidity: '0.8.2',
	networks: {
		goerli: {
			url: 'https://eth-goerli.g.alchemy.com/v2/ra3eoW5di89YgM0euN2JaFftXuQv_PYb',
			accounts: [
				'b3c5d9628fd33d6adb8a53f04b30901724d9bcaf60607af7116e50a05688da80',
			],
		},
	},
}

// 0xf44e2e6b438c8f25ac78c6684ddfd46743219bc6
