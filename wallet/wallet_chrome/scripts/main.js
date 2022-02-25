// document.getElementById("start").onclick = function () {
//   // chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
//   //     chrome.tabs.sendMessage(tabs[0].id, {action: "START"}, /* callback */);
//   // });
//   alert('이거 되나');
// };


//클릭 이벤트 처리
document.getElementById("element").style.display = "none";
document.getElementById("start").onclick = function () {
  document.getElementById("element").style.display = "block";
}


//로그인 인증
chrome.storage.local.get('mnemonic', function(result) {
  console.log('저장된 니모닉 ' + result.mnemonic);
  
  //로그인 안되어 있다면
  if(Number(result.mnemonic) < 100) {
    window.location.href = '/popup.html';
  }
});



