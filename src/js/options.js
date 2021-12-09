function save_options() {    
  const delay = document.getElementById("delay_input").value
  console.log("delay", delay)
  if (delay < 300) {
    updateStatus("minimum 300 milisecconds.")
  }
  (chrome || browser).storage.sync.set(
    {
      delay: delay,
    },
    function () {
      updateStatus("Options saved.")      
    }
  );
}

function restore_options() {
  (chrome || browser).storage.sync.get(
    {
      delay: 1000,
    },
    function (items) {
      document.getElementById("delay_input").value = items.delay;
    }
  );
}

function updateStatus(text) {
  let status = document.getElementById("status");
  status.textContent = text;
  setTimeout(function () {
    console.log("callback empty")
    status.textContent = "";
  }, 1000);
}

document.addEventListener("DOMContentLoaded", restore_options);
document.getElementById("save").addEventListener("click", save_options);
