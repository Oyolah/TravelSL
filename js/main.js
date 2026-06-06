// Vanilla JavaScript Test
document.addEventListener('DOMContentLoaded', function() {
  const testBtn = document.getElementById('testBtn');
  const jqueryTest = document.getElementById('jqueryTest');
  
  testBtn.addEventListener('click', function() {
    jqueryTest.innerHTML = 'Vanilla JavaScript status: <strong class="text-success">Working! ✓</strong>';
  });
});
