(function() {
  var element = id => {
    return document.getElementById(id);
  };
  //Get elements
  var status = element("status");
  var messages = element("messages");
  var textarea = element("textarea");
  var username = element("username");
  var clearBtn = element("clear");

  // Set default status
  var statusDefault = status.textContent;

  var setStatus = s => {
    //Set status
    status.textContent = s;
    if (s !== statusDefault) {
      var delay = setTimeout(() => {
        setStatus(statusDefault);
      }, 4000);
    }
  };
  //Connect to socket.io
  var socket = io.connect("http://localhost:3000");

  //Check for connection
  if (socket !== undefined) {
    console.log("Connected to socket...");

    // Handle Output
    socket.on("output", data => {
      //console.log(data)
      if (data.length) {
        for (var x = 0; x < data.length; x++) {
          var tarih = new Date();
          var saat = tarih.getHours();
          var dakika = tarih.getMinutes();
          var saniye = tarih.getSeconds();
          var gun = tarih.getDay();
          var ay = tarih.getMonth();
          var yil = tarih.getFullYear();
          //Build out message div
          var message = document.createElement("div");
          message.setAttribute("class", "chat-message");
          message.textContent =
            data[x].name +
            " : " +
            data[x].message +
            "  " +
            gun +
            "/" +
            ay +
            "/" +
            yil;
          messages.appendChild(message);
          messages.insertBefore(message, messages.firstChild);
        }
      }
    });
    // Get status from server
    socket.on("status", data => {
      // get message status
      setStatus(typeof data === "object" ? data.message : data);

      // if status is clear, clear text
      if (data.clear) {
        textarea.value = "";
      }
    });
    // Handle input
    textarea.addEventListener("keydown", event => {
      if (event.which === 13 && event.shiftKey == false) {
        // Emit to server input
        socket.emit("input", {
          name: username.value,
          message: textarea.value
        });
        event.preventDefault();
      }
    });
    // Handle chat clear
    clearBtn.addEventListener("click", () => {
      socket.emit("clear");
    });
    // Clear message
    socket.on("cleared", () => {
      messages.textContent = "";
    });
  }
})();
