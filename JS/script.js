document.addEventListener('DOMContentLoaded', () => {

	const cryptoList = document.querySelector('.crypto-list')
	const Url = 'https://api.coincap.io/v2/assets'
	const refreshButton = document.getElementById('refreshButton')


	const refreshData = () => {
		fetch(Url)
			.then(response => response.json())
			.then(data => {
				cryptoList.innerHTML = ''
				
				data.data.forEach(crypt => {
					const { name, symbol, priceUsd, changePercent24Hr } = crypt

					const listItem = document.createElement('div')
					listItem.classList.add('crypto-item')

					const changeClass = changePercent24Hr < 0 ? 'negative' : 'positive'

					listItem.innerHTML = `
                        <p>Name: ${name}</p>
                        <p>Symbol: ${symbol}</p>
                        <p>Price (USD): $${parseFloat(priceUsd).toFixed(2)}</p>
                        <p>Change (24h): <span class="${changeClass}">${parseFloat(changePercent24Hr).toFixed(
						2
					)}%</span></p>
                    `

					cryptoList.appendChild(listItem)
				})
			})
			.catch(error => console.error('Error', error))
	}

	refreshButton.addEventListener('click', () => {
		refreshData()
		location.reload() 
	})

	refreshData()
})
