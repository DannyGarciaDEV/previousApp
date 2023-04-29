
var trash = document.getElementsByClassName("fa fa-trash");
// function getPalindrome(){
//   const nameUser = document.querySelector('#input')
//   const palindrome = document.querySelector('span')

//   fetch(`/api?student=${nameUser}`, {
//     method: 'post',
//     headers: {'Content-Type':'application/json'},
//     body: JSON.stringify({
//       'word': nameUser.value,
//       'result': palindrome.value,
//     })
//   })
//     .then(res => res.json())
//     .then((data) => {
//       console.log(data);
      
//     });
// }
Array.from(trash).forEach(function(element) {
  element.addEventListener('click', function() {
    const word = this.parentNode.parentNode.childNodes[1].innerText;
    const result = this.parentNode.parentNode.childNodes[3].innerText;
    fetch('/palindrome', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        word,
        result
      })
    }).then(function (response) {
      window.location.reload();
    }).catch(function (error) {
      console.error('Error:', error);
    });
  });
});






