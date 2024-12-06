export function CurrencyFormatter({ currency, value}: {currency:string, value:number}) {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    minimumFractionDigits: 2,
    currency
  }) 
  return formatter.format(value)
}

export function MoneyFormatter(amount: number){
  if(amount > 1000000){
    const f = CurrencyFormatter({
      currency: 'MXN',
      value: Number((amount/1000000).toFixed(2))
    });
    if(f.includes('.00')){
      return f.replace('.00', 'M');
    }else{
      if(f[f.length-1]==='0'){
        return f.substring(0, f.length-1)+'M';
      }
      return f+'M';
    }
  }else{
    if(amount > 1000){
      const f = CurrencyFormatter({
        currency: 'MXN',
        value: Number((amount/1000).toFixed(2))
      });
      if(f.includes('.00')){
        return f.replace('.00', 'K');
      }else{
        if(f[f.length-1]==='0'){
          return f.substring(0, f.length-1)+'K';
        }
        return f+'K';
      }
    }else{
      const f = CurrencyFormatter({
        currency: 'MXN',
        value: amount
      });
      return f;
    }
  }
}