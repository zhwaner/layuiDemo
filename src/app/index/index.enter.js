(function (layui) {
  require('config/fixIE')
  let {initMenu} = require('common/js/init')
  layui.use(['element', 'jquery'], () => {
    initMenu()
  })
  // console.log(menus)
  // function timeout (ms) {
  //   return new Promise((resolve) => {
  //     setTimeout(resolve, ms)
  //   })
  // }
  // async function asyncPrint (value, ms) {
  //   await timeout(ms)
  //   console.log(value)
  // }
  // asyncPrint('hello world', 2000)
  console.log('all is ok~~~oook~~~~!!!!!!!!')
  function timeout2 (ms) {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, ms)
    })
  }

  timeout2(1000).then((value) => {
    console.log('promise on')
  })
  class Point {
    constructor (x, y) {
      this.x = x
      this.y = y
    }

    test () {
      return '(' + this.x + ', ' + this.y + ')'
    }
  }
  var point = new Point(2, 3)
  console.log(point.test()) // (2, 3)

  let als = Object.assign({}, {h: 1}, {g: 2})
  console.log(als.g, 'assign')

  let numbers = [1, 5, 10, 15]
  let doubles = numbers.map(x => x ** 2)
  console.log(doubles)
  var flattened = [[0, 1], [2, 3], [4, 5]].reduce(function (a, b) {
    return a.concat(b)
  }, [])
  console.log(flattened)

  let arrkeys = ['a', 'b', 'c']
  console.log(Object.keys(arrkeys).toString())

  let sarr = [2, 5, 88, 5, 6]
  let darr = [42, 45, 48, 66, 76]
  let rsarr = [...sarr, ...darr]
  console.log(rsarr)

  let obja = {a: 1, b: 2}
  let objb = {c: 1, d: 2}
  let objc = {...obja, ...objb}
  console.log(objc.c, objc.a)

  let { sin, cos } = Math
  console.log(typeof sin, typeof cos)

  let [fx, fy] = [1, 2, 3]
  console.log(fx, fy)
  let wins = 'windows flag'
  console.log(`In JavaScript ${wins} is
 not legal.`)
  let arr = [1, 3, 4, 5, 6, 9]
  setTimeout(() => {
    const as = arr.filter((item) => {
      return item > 4
    })
    console.log(as)
  }, 1000)
})(window.layui)
