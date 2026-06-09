// export function getDate(date: Date){

//   console.log('date => ', date)
  
//   let day = date.getDate()
//   let month = date.getMonth() + 1
//   let year = date.getFullYear()

//   if(month < 10){
//     console.log('parse date => ', `${year}-0${month}-${day}`);
//     return `${year}-0${month}-${day}`;
//   }else{
//     console.log('parse date => ', `${year}-${month}-${day}`);
//     return `${year}-${month}-${day}`;
//   }
// }

// export function getDate(date: Date) {
//   console.log('date => ', date)
//   const year = date.getUTCFullYear();
//   const month = String(date.getUTCMonth() + 1).padStart(2, '0');
//   const day = String(date.getUTCDate()).padStart(2, '0');

//   console.log('parse date => ', `${year}-${month}-${day}`);
//   return `${year}-${month}-${day}`;
// }

export function getDate(date: Date) {
  // console.log('date => ', date)
  // console.log('parse date => ', date.toISOString().split('T')[0]);
  // console.trace('getDate');
  return date.toISOString().split('T')[0];
}