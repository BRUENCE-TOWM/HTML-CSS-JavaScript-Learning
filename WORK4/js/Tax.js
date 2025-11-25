var incomeTax = {
	free: 3500,
	levels: [
		{low: 0,high: 1500,rate: 0.03,sub: 0},
		{low: 1500,high: 4500,rate: 0.10,sub: 105},
		{low: 4500,high: 9000,rate: 0.20,sub: 555},
		{low: 9000,high: 35000,rate: 0.25,sub: 1005},
		{low: 35000,high: 55000,rate: 0.30,sub: 2755},
		{low: 55000,high: 80000,rate: 0.35,sub: 5505},
		{low: 80000,high: Infinity,rate: 0.45,sub: 13505},
	],
	CalcMonthTax:function(MonthIncome){
		var taxIncome=MonthIncome-this.free;
		if(taxIncome<=0) return 0;
		for(var level of this.levels){
			if(taxIncome<level.high) return Math.round((taxIncome*level.rate-level.sub)*100)/100;
		}
	},
	CalcYearTax:function(MonthIncome,YearIncome){
		if(MonthIncome<this.free){
			var taxIncome=(YearIncome-(this.free-MonthIncome))/12;
			for(var level of this.levels){
				if(taxIncome<level.high) return Math.round((YearIncome*level.rate-level.sub)*100)/100;
			}
		}else{
			var taxIncome=YearIncome/12;
			for(var level of this.levels){
				if(taxIncome<level.high) return Math.round((YearIncome*level.rate-level.sub)*100)/100;
			}
		}
	}
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = IncomeTaxCalculator;
} else {
    window.IncomeTaxCalculator = IncomeTaxCalculator;
}