/*Значение из текстовых инпутов*/
const totalCost = document.getElementById('total-cost'),
	  anInitialFee = document.getElementById('an-initial-fee'),
	  creditTerm = document.getElementById('credit-term');

/*Значение из range-инпутов*/
const totalCostRange = document.getElementById('total-cost-range'),
	  anInitialFeeRange = document.getElementById('an-initial-fee-range'),
	  creditTermRange = document.getElementById('credit-term-range');

/*Итоговые значения*/
const totalAmountOfCredit = document.getElementById('amount-of-credit'),
	  totalMonthlyPayment = document.getElementById('monthly-payment'),
	  totalRecommendedIncome = document.getElementById('recommended-income');


/*Все range */
const inputsRange = document.querySelectorAll('.input-range');

/*Все кнопки с процентной ставкой*/
const bankBtns = document.querySelectorAll('.bank');

/*Функция, которая отвечает за передачу значений из input и range.*/
const assignValue = () => {
	totalCost.value = totalCostRange.value;
	anInitialFee.value = anInitialFeeRange.value;
	creditTerm.value = creditTermRange.value;
}

assignValue(); 

/*Массив с объектами банков*/
const banks = [
	{
		
		name: 'alfa',
		precents: 8.7
	},
	{
		name: 'sberbank',
		precents: 8.4
	},
	{
		name: 'pochta',
		precents: 7.9
	},
	{
		name: 'tinkoff',
		precents: 9.2
	}
]; 

let currentPrecent = banks[0].precents;/*Переменная текущей ставки*/
/*Следим за событием клика по кнопке банка*/
for (let bank of bankBtns) {
	bank.addEventListener('click', () => {
		for(let item of bankBtns){
			item.classList.remove('active');
		}
		bank.classList.add('active');
		takeActiveBank(bank);

	})
}
 // Стрелочная Функция взятия данных выбранного(сфокусированного) банка
const takeActiveBank = currentActive => {
	const dataAttrValue = currentActive.dataset.name;
	const currentBank = banks.find(bank => bank.name === dataAttrValue);
	currentPrecent = currentBank.precents;
	calculation(totalCost.value, anInitialFee.value, creditTerm.value);
	console.log(currentPrecent);

}; // !

// Связываем каждый range о своим input

for(let input of inputsRange) {
	input.addEventListener('input', () => {
		assignValue(); // "Замапили значения"
		calculation(totalCost.value, anInitialFee.value, creditTerm.value);
	})
} 

// Калькулятор
const calculation = (totalCost = 0, anInitialFee = 100000, creditTerm = 1) => {
	/*
	ЕП - ежемесячный платёж
	РК - размер кредита
	ПС - процентная ставка
	КМ - количество месяцев

	ЕП = (РК + (((РК / 100) * ПС) / 12) * КМ) / КМ

	*/

	let monthlyPayment; // ежемесячный платёж
	let lounAmount = totalCost - anInitialFee; // размер кредита
	let interestRate = currentPrecent; // процентная ставка
	let numberOfYears = creditTerm; // кол-во лет
	let numberOfMonths = 12 * numberOfYears; // кол-во месяцев

	monthlyPayment = (lounAmount + (((lounAmount / 100) * interestRate) / 12) * numberOfMonths) / numberOfMonths;
	const monthlyPaymentArounded = Math.round(monthlyPayment);
	if (monthlyPaymentArounded < 0) {
		return false;
	} else {
		totalAmountOfCredit.innerHTML = `${lounAmount} ₽`;
		totalMonthlyPayment.innerHTML = `${monthlyPaymentArounded} ₽`;
		// Рекоменд. доход должен быть выше на 35%
		totalRecommendedIncome.innerHTML = `${monthlyPaymentArounded + ((monthlyPaymentArounded / 100) * 35)}₽`;
	}
}
