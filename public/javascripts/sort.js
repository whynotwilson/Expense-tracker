var countDate = 0
var countAmount = 0

const sortDate = document.getElementById('sortDate')
const sortAmount = document.getElementById('sortAmount')

const sortParent = document.getElementsByName('sortParent')
const amounts = []
sortParent.forEach(item => {
  amounts.push(item.innerText)
})

console.log('amounts', amounts)
console.log(sortParent)

sortDate.addEventListener('click', function () {

})

sortAmount.addEventListener('click', function () {
  console.log('countAmount')
  countAmount++
  console.log(countAmount)
})
