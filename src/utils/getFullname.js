export function getFullname(data, prams) {
  var arr = []
  data.filter(items => {
    prams.filter(item => {
      var a = {
        value: [],
        name: ''
      }
      //  (items);
      if(item.recruitment.position.fullname==''){
        if (item.recruitment.position.pst_class.name == items.position.pst_class.name) {
          a.name = items.position.pst_class.name
          a.value.push(item)
          arr.push(a)
        }
      }else{
        if (item.recruitment.position.fullname == items.position.fullname) {
          a.name = items.position.fullname
          a.value.push(item)
          arr.push(a)
        }
      }
    })
  })

  //  (arr);
  var namelist = []
  var totals = []
  var arrays = {
    name: '',
    value: []
  }
  arr.forEach((item, index) => {
    namelist.push(item.name)
  })
  namelist = [...new Set(namelist)]
  //  (namelist);
  namelist.forEach((item, index) => {
    arr.forEach((items, indexs) => {
      if (items.name == item) {
        arrays.name = item
        // console.log(items.value[0].candidate_age);
        if(items.value[0].candidate_age==null){
          items.value[0].candidate_age=='未知'
        }
        arrays.value.push(items.value[0])
      }
    })

    //  (totals);
    
    totals.push(arrays)
    // console.log(totals);
    arrays = {
      name: '',
      value: []
    }
  })
  //  (totals);
  // console.log(totals);
  return totals
  // const testArr = [];
  // const resultArr = [];
  // for (let i = 0; i < arr.length; i++) {
  //   if (testArr.indexOf(arr[i].name) === -1) {
  //     resultArr.push({
  //       name: arr[i].name,
  //       value: arr[i].value
  //     });
  //     testArr.push(arr[i].name);
  //   } else {
  //     for (let j = 0; j < resultArr.length; j++) {
  //       if (resultArr[j].name == arr[i].name) {
  //         resultArr[j].value.push(arr[i]);
  //         break;
  //       }
  //     }
  //   }
  // }
  //  (resultArr)
  // return resultArr;
}

