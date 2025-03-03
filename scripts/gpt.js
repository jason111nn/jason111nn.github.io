document.addEventListener("DOMContentLoaded", function () {
    const chatButton = document.createElement("button");
    chatButton.innerText = "聊天 AI";
    chatButton.style.position = "fixed";
    chatButton.style.bottom = "20px";
    chatButton.style.right = "20px";
    chatButton.style.padding = "10px 15px";
    chatButton.style.background = "#ffbb33";
    chatButton.style.border = "none";
    chatButton.style.borderRadius = "10px";
    chatButton.style.cursor = "pointer";

    document.body.appendChild(chatButton);

    chatButton.addEventListener("click", function () {
        Swal.fire({
            title: "AI 助手",
            input: "text",
            inputPlaceholder: "問我任何問題...",
            showCancelButton: true,
            confirmButtonText: "送出",
        }).then((result) => {
            if (result.isConfirmed && result.value.trim() !== "") {
                const userInput = result.value;
                
                // 這裡請填入你的 Google Apps Script 部署網址
                fetch("https://script.google.com/macros/s/AKfycbxZPllKli4FGSkPdG8vPEbDElRRzTAHALPfUrW6iYoIHBJcwypdFbotZAjzsXcnr0GA/exec?text=" + encodeURIComponent(userInput))
                    .then(response => response.json())
                    .then(data => {
                        Swal.fire({
                            title: "AI 回應",
                            text: data.reply,  // 這裡的 data.reply 會是 AI 的回答
                            icon: "info"
                        });
                    })
                    .catch(error => {
                        Swal.fire("錯誤", "AI 目前無法回應，請稍後再試", "error");
                        console.error(error);
                    });
            }
        });
    });
});
