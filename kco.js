var screen = false;

        function show() {
            screen = !screen;
            document.getElementById("bot-container").style.backgroundColor = screen ? "#aa9600" : "transparent";
        }