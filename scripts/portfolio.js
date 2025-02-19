$(document).ready(function () {
    let container = $("#portfolio-container");

    $.get("https://api.github.com/users/jason111nn/repos", function (data) {
        container.empty(); // 清空 "載入中..." 文字

        $(data).each(function (index, repo) {
            if (!repo.fork) { // 過濾 fork 的儲存庫
                let imageUrl = `https://raw.githubusercontent.com/jason111nn/${repo.name}/main/portfolio.img`;
                let demoUrl = `https://jason111nn.github.io/${repo.name}/`;
                let rawHtmlUrl = `https://jason111nn.github.io/${repo.name}`;
                let item = $("<div>").addClass("portfolio-item");
                item.append(`<h2>${repo.name}</h2>`);
                item.append(`<span>最後更新: ${new Date(repo.updated_at).toLocaleDateString()}</span>`);

                let img = $("<img>").attr("src", imageUrl);
                img.on("error", function () {
                    $(this).attr("src", `./portfolio.jpg`); // 預設圖片
                });
                item.prepend(img);

                let buttonContainer = $("<div>");

                let repoBtn = $("<a>")
                    .attr("href", repo.html_url)
                    .attr("target", "_blank")
                    .text("查看專案");

                let demoBtn = $("<button>")
                    .text("線上 Demo")
                    .click(function () {
                        $("#iframe-viewer").attr("src", rawHtmlUrl);
                        $("#iframe-container").fadeIn();
                    });

                buttonContainer.append(repoBtn, demoBtn);
                item.append(buttonContainer);

                // 加入作品
                container.append(item);
                item.fadeIn(500);
            }
        });
    }).fail(function () {
        container.html("<p>無法載入作品集，請稍後再試。</p>");
    });
});