// cotação de moedas do dia
const USD = 5.79
const EUR = 5.96
const GBP = 7.20

//selecionando o input pelo id (obtendo os elementos do formulário)
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const currency = document.getElementById("currency")
const footer = document.querySelector("main footer")
const description = document.getElementById("description")
const result = document.getElementById("result")

// manipulando o input amount para receber som  ente números
amount.addEventListener("input", () => {
  const hasCharactersRegex = /\D+/g
  amount.value = amount.value.replace(hasCharactersRegex, "")
})

//captando o evento de submit (enviar) do formulário
form.onsubmit = (event) => {
  event.preventDefault()

  switch (currency.value) {
    case "USD":
      convertCurrency(amount.value, USD, "US$")
      break
    case "EUR":
      convertCurrency(amount.value, EUR, "€")
      break
    case "GBP":
      convertCurrency(amount.value, GBP, "£")
      break
  }

  // função para converter a moeda
  function convertCurrency(amount, price, symbol) {
    try {
      // exibindno a cotação da moeda selecionada
      description.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)}`

      // calcula o total
      let total = amount * price

      //Verefica se o valor é um número
      if (isNaN(total)) {
        return alert("Por favor, digite um valor corretamente para converter")
      }

      //Formatar o Valor Total.
      total = formatCurrencyBRL(total).replace("R$", "")

      //exibe o resultado total 
      result.textContent = `${total} Reais`

      // aplica a classe que exibe o footer para mostrar o resultado
      footer.classList.add("show-result")
    } catch (error) {

      //Remove a classe  do footer removendo ele
      footer.classList.remove("show-result")

      console.log(error)
      alert("Não foi possível converter. Tente novamente mais tarde")
    }
  }
}

//formata a moeda em Real brasileiro
function formatCurrencyBRL(value) {
  //converte o número para utilizar o toLocalString para formatar no padrão BRL (R$1,00).
  return Number(value).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  })
}
